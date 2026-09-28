/**
 * Database Cleanup Script
 * Cleans detailed department data from MongoDB Atlas while preserving:
 * - All 68 Departments
 * - Year 1 - 4 & Semester 1 - 8 Structure
 * - All Subject Titles & Codes
 * - Users, Admin Accounts, Authentication & MongoDB Configuration
 *
 * Removes:
 * - All Notes, PDFs, Study Materials, Links
 * - All Question Papers (PYQs)
 * - Detailed Syllabus Outline & Units inside Subjects
 * - Detailed Project descriptions/tech (keeps only title & deptCode)
 * - Detailed Job-role skills/tools/descriptions (keeps only title & deptCode)
 * - Detailed Roadmaps & Certifications
 */

require('dotenv').config();
const mongoose = require('mongoose');

// Models
const Regulation = require('../models/Regulation');
const Department = require('../models/Department');
const Semester = require('../models/Semester');
const Subject = require('../models/Subject');
const Note = require('../models/Note');
const QuestionPaper = require('../models/QuestionPaper');
const JobRole = require('../models/JobRole');
const Roadmap = require('../models/Roadmap');
const Project = require('../models/Project');
const Certification = require('../models/Certification');
const User = require('../models/User');

async function cleanDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI not found in .env');
    process.exit(1);
  }

  console.log('🔄 Connecting to MongoDB Atlas...');
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
  console.log(`✅ Connected to database: ${mongoose.connection.name}`);

  console.log('\n--- PRE-CLEANUP INSPECTION ---');
  const preDepts = await Department.countDocuments();
  const preRegs = await Regulation.countDocuments();
  const preSems = await Semester.countDocuments();
  const preSubs = await Subject.countDocuments();
  const preNotes = await Note.countDocuments();
  const preQPs = await QuestionPaper.countDocuments();
  const preRoles = await JobRole.countDocuments();
  const preRoadmaps = await Roadmap.countDocuments();
  const preProjects = await Project.countDocuments();
  const preCerts = await Certification.countDocuments();
  const preUsers = await User.countDocuments();

  console.log(`• Departments:       ${preDepts} (WILL KEEP ALL 68)`);
  console.log(`• Regulations:       ${preRegs} (WILL KEEP ALL)`);
  console.log(`• Semesters:         ${preSems} (WILL KEEP ALL 8)`);
  console.log(`• Subjects:          ${preSubs} (WILL KEEP ALL TITLES/CODES, CLEAR DETAILS)`);
  console.log(`• Notes:             ${preNotes} (WILL REMOVE ALL)`);
  console.log(`• Question Papers:   ${preQPs} (WILL REMOVE ALL)`);
  console.log(`• Projects:          ${preProjects} (WILL RETAIN TITLE ONLY, CLEAR DETAILS)`);
  console.log(`• Job Roles:         ${preRoles} (WILL RETAIN TITLE ONLY, CLEAR DETAILS)`);
  console.log(`• Roadmaps:          ${preRoadmaps} (WILL REMOVE ALL)`);
  console.log(`• Certifications:    ${preCerts} (WILL REMOVE ALL)`);
  console.log(`• Users / Admins:    ${preUsers} (WILL KEEP ALL UNTOUCHED)`);

  console.log('\n🧹 Starting cleanup process...');

  // 1. Remove all Notes
  const delNotes = await Note.deleteMany({});
  console.log(`✓ Removed ${delNotes.deletedCount} Notes & study materials.`);

  // 2. Remove all Question Papers (PYQs)
  const delQPs = await QuestionPaper.deleteMany({});
  console.log(`✓ Removed ${delQPs.deletedCount} Question Papers.`);

  // 3. Clean detailed content inside Subjects (preserve code, name, deptCode, regCode, semester, year)
  const subUpdate = await Subject.updateMany({}, {
    $set: {
      syllabusOutline: []
    }
  });
  console.log(`✓ Cleaned detailed syllabus/unit content from ${subUpdate.matchedCount} Subjects.`);

  // 4. Clean detailed content in Projects (keep title and deptCode only)
  const projUpdate = await Project.updateMany({}, {
    $set: {
      problemStatement: '',
      objective: '',
      description: '',
      architecture: '',
      instructions: '',
      features: [],
      suggestedTech: [],
      technologies: [],
      expectedOutcome: '',
      skillsLearned: [],
      futureEnhancement: '',
      relatedJobRoles: [],
      relatedCertifications: []
    }
  });
  console.log(`✓ Cleaned detailed specifications from ${projUpdate.matchedCount} Project blueprints (retained titles & dept mappings).`);

  // 5. Clean detailed content in Job Roles (keep title and deptCode only)
  const roleUpdate = await JobRole.updateMany({}, {
    $set: {
      coreSkills: [],
      skills: [],
      secondarySkills: [],
      tools: [],
      companies: [],
      description: '',
      avgSalary: '',
      avgSalaryRange: '',
      roadmapId: ''
    }
  });
  console.log(`✓ Cleaned detailed skills and resources from ${roleUpdate.matchedCount} Job Roles (retained titles & dept mappings).`);

  // 6. Remove Roadmaps & Certifications
  const delRoadmaps = await Roadmap.deleteMany({});
  console.log(`✓ Removed ${delRoadmaps.deletedCount} Roadmaps.`);

  const delCerts = await Certification.deleteMany({});
  console.log(`✓ Removed ${delCerts.deletedCount} Certifications.`);

  console.log('\n--- POST-CLEANUP VERIFICATION ---');
  const postDepts = await Department.countDocuments();
  const postRegs = await Regulation.countDocuments();
  const postSems = await Semester.countDocuments();
  const postSubs = await Subject.countDocuments();
  const postNotes = await Note.countDocuments();
  const postQPs = await QuestionPaper.countDocuments();
  const postRoles = await JobRole.countDocuments();
  const postProjects = await Project.countDocuments();
  const postUsers = await User.countDocuments();

  console.log(`• Departments:       ${postDepts} (Kept intact: ${postDepts === 68 ? 'YES' : 'NO'})`);
  console.log(`• Semesters:         ${postSems} (Kept intact: ${postSems === 8 ? 'YES' : 'NO'})`);
  console.log(`• Subjects:          ${postSubs} (Titles kept: ${postSubs === 3015 ? 'YES' : 'NO'})`);
  console.log(`• Notes:             ${postNotes} (Empty: ${postNotes === 0 ? 'YES' : 'NO'})`);
  console.log(`• Question Papers:   ${postQPs} (Empty: ${postQPs === 0 ? 'YES' : 'NO'})`);
  console.log(`• Projects:          ${postProjects} (Details stripped: YES)`);
  console.log(`• Job Roles:         ${postRoles} (Details stripped: YES)`);
  console.log(`• Admin / Users:     ${postUsers} (Untouched: ${postUsers === preUsers ? 'YES' : 'NO'})`);

  await mongoose.disconnect();
  console.log('\n✅ Database disconnected cleanly. Cleanup complete!');
}

if (require.main === module) {
  cleanDatabase()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('❌ Cleanup failed:', err);
      process.exit(1);
    });
}

module.exports = cleanDatabase;
