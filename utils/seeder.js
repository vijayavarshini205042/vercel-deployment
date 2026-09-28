/**
 * Database Seeder Script
 * Safely imports existing departments, subjects, notes, PYQs, project ideas,
 * job roles, and roadmaps into MongoDB Atlas using idempotent bulk operations (upserts).
 * Running this script multiple times will NOT create duplicate records.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
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

// Helper to batch process operations in chunks to optimize network roundtrips to Atlas
async function executeBatchUpsert(Model, operations, label, batchSize = 1000) {
  if (!operations || operations.length === 0) return 0;
  console.log(`⏳ Seeding ${label} (${operations.length} records)...`);
  
  let processed = 0;
  for (let i = 0; i < operations.length; i += batchSize) {
    const chunk = operations.slice(i, i + batchSize);
    await Model.bulkWrite(chunk, { ordered: false });
    processed += chunk.length;
    process.stdout.write(`   ✓ Progress: ${processed}/${operations.length} ${label} synced\r`);
  }
  console.log(`\n✅ Synced ${processed} ${label} successfully.`);
  return processed;
}

async function seedDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in .env');
    process.exit(1);
  }

  console.log('🔄 Connecting to MongoDB Atlas...');
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
  console.log(`✅ Connected to database: ${mongoose.connection.name}`);

  // Load fallback dataset from public/js/data/fallbackData.js
  const fallbackPath = path.join(__dirname, '../public/js/data/fallbackData.js');
  console.log('📖 Reading fallback data from disk...');
  const fileContent = fs.readFileSync(fallbackPath, 'utf8');
  const jsonString = fileContent.replace(/^window\.AppFallbackData\s*=\s*/, '').replace(/;\s*$/, '');
  const data = JSON.parse(jsonString);

  console.log('📦 Data payload loaded into memory.');

  // 1. Regulations
  if (data.regulations && data.regulations.length > 0) {
    const ops = data.regulations.map(r => ({
      updateOne: {
        filter: { code: r.code.toUpperCase() },
        update: {
          $set: {
            code: r.code.toUpperCase(),
            name: r.name,
            year: r.year,
            status: r.status || 'Active',
            isDefault: !!r.isDefault,
            description: r.description || ''
          }
        },
        upsert: true
      }
    }));
    await executeBatchUpsert(Regulation, ops, 'Regulations');
  }

  // 2. Departments
  if (data.departments && data.departments.length > 0) {
    const ops = data.departments.map(d => ({
      updateOne: {
        filter: { code: d.code.toUpperCase() },
        update: {
          $set: {
            code: d.code.toUpperCase(),
            name: d.name,
            icon: d.icon || '🏛️',
            category: d.category || 'Circuits & Computing',
            description: d.description || `${d.name} Department`,
            coreSkills: d.coreSkills || [],
            headOfDepartment: d.headOfDepartment || '',
            isActive: d.isActive !== false
          }
        },
        upsert: true
      }
    }));
    await executeBatchUpsert(Department, ops, 'Departments');
  }

  // 3. Semesters
  if (data.semesters && data.semesters.length > 0) {
    const ops = data.semesters.map(s => ({
      updateOne: {
        filter: { number: s.number },
        update: {
          $set: {
            number: s.number,
            name: s.name || `Semester ${s.number}`,
            yearOfStudy: s.yearOfStudy || Math.ceil(s.number / 2)
          }
        },
        upsert: true
      }
    }));
    await executeBatchUpsert(Semester, ops, 'Semesters');
  }

  // 4. Subjects
  if (data.subjects && data.subjects.length > 0) {
    const ops = data.subjects.map(s => ({
      updateOne: {
        filter: {
          code: s.code.toUpperCase(),
          regCode: s.regCode.toUpperCase(),
          deptCode: s.deptCode.toUpperCase()
        },
        update: {
          $set: {
            code: s.code.toUpperCase(),
            name: s.name,
            deptCode: s.deptCode.toUpperCase(),
            regCode: s.regCode.toUpperCase(),
            semester: s.semester,
            credits: s.credits || 3,
            id: s.id,
            category: s.category || '',
            categoryName: s.categoryName || '',
            yearNumber: s.yearNumber || Math.ceil(s.semester / 2),
            year: s.year || '',
            academicYear: s.academicYear || '',
            ltp: s.ltp || '3-0-0'
          }
        },
        upsert: true
      }
    }));
    await executeBatchUpsert(Subject, ops, 'Subjects', 1000);
  }

  // 5. Notes
  if (data.notes && data.notes.length > 0) {
    const ops = data.notes.map(n => ({
      updateOne: {
        filter: {
          deptCode: n.deptCode.toUpperCase(),
          regCode: n.regCode.toUpperCase(),
          subjectCode: n.subjectCode.toUpperCase(),
          unit: n.unit
        },
        update: {
          $set: {
            id: n.id,
            title: n.title,
            description: n.description || `Lecture notes for ${n.subjectName} Unit ${n.unit}`,
            subjectId: n.subjectId || '',
            subjectCode: n.subjectCode.toUpperCase(),
            subjectName: n.subjectName,
            deptCode: n.deptCode.toUpperCase(),
            regCode: n.regCode.toUpperCase(),
            semester: n.semester,
            unit: n.unit,
            fileUrl: n.fileUrl || n.fileName || 'default_note.pdf',
            fileName: n.fileName || 'Lecture_Notes.pdf',
            fileSize: n.fileSize || '2.5 MB',
            uploadedBy: n.uploadedBy || 'Faculty Member',
            downloads: n.downloads || 0
          }
        },
        upsert: true
      }
    }));
    await executeBatchUpsert(Note, ops, 'Notes', 1000);
  }

  // 6. Question Papers
  if (data.questionPapers && data.questionPapers.length > 0) {
    const ops = data.questionPapers.map(q => ({
      updateOne: {
        filter: {
          deptCode: q.deptCode.toUpperCase(),
          regCode: q.regCode.toUpperCase(),
          subjectCode: q.subjectCode.toUpperCase(),
          academicYear: q.academicYear,
          title: q.title || ''
        },
        update: {
          $set: {
            id: q.id,
            subjectId: q.subjectId || '',
            subjectCode: q.subjectCode.toUpperCase(),
            subjectName: q.subjectName,
            title: q.title || `${q.subjectName} (${q.academicYear})`,
            deptCode: q.deptCode.toUpperCase(),
            regCode: q.regCode.toUpperCase(),
            semester: q.semester,
            academicYear: q.academicYear,
            examType: q.examType || 'End-Semester University Exam',
            fileUrl: q.fileUrl || q.fileName || 'default_qp.pdf',
            fileName: q.fileName || 'Question_Paper.pdf',
            answerKeyUrl: q.answerKeyUrl || '',
            fileSize: q.fileSize || '1.2 MB',
            downloads: q.downloads || 0,
            uploadedBy: q.uploadedBy || 'Examination Cell'
          }
        },
        upsert: true
      }
    }));
    await executeBatchUpsert(QuestionPaper, ops, 'Question Papers', 1000);
  }

  // 7. Job Roles
  if (data.jobRoles && data.jobRoles.length > 0) {
    const ops = data.jobRoles.map(j => ({
      updateOne: {
        filter: {
          title: j.title,
          deptCode: j.deptCode.toUpperCase()
        },
        update: {
          $set: {
            id: j.id,
            title: j.title,
            deptCode: j.deptCode.toUpperCase(),
            domain: j.domain || 'Engineering',
            avgSalaryRange: j.avgSalaryRange || j.avgSalary || '₹6 - 12 LPA',
            avgSalary: j.avgSalary || j.avgSalaryRange || '₹6 - 12 LPA',
            description: j.description || `${j.title} role in ${j.deptCode}`,
            coreSkills: j.coreSkills || j.skills || [],
            skills: j.skills || j.coreSkills || [],
            secondarySkills: j.secondarySkills || [],
            tools: j.tools || [],
            companies: j.companies || [],
            demandLevel: j.demandLevel || 'High'
          }
        },
        upsert: true
      }
    }));
    await executeBatchUpsert(JobRole, ops, 'Job Roles', 500);
  }

  // 8. Roadmaps
  if (data.roadmaps && data.roadmaps.length > 0) {
    const ops = data.roadmaps.map(r => ({
      updateOne: {
        filter: { roadmapId: r.roadmapId || r.id },
        update: {
          $set: {
            roadmapId: r.roadmapId || r.id,
            id: r.id || r.roadmapId,
            roleTitle: r.roleTitle,
            deptCode: r.deptCode.toUpperCase(),
            targetCareer: r.targetCareer,
            estimatedDuration: r.estimatedDuration || '6 to 9 Months',
            description: r.description || '',
            stages: r.stages || []
          }
        },
        upsert: true
      }
    }));
    await executeBatchUpsert(Roadmap, ops, 'Roadmaps', 500);
  }

  // 9. Projects
  if (data.projects && data.projects.length > 0) {
    const ops = data.projects.map(p => ({
      updateOne: {
        filter: {
          title: p.title,
          deptCode: p.deptCode.toUpperCase()
        },
        update: {
          $set: {
            id: p.id,
            title: p.title,
            deptCode: p.deptCode.toUpperCase(),
            domain: p.domain || 'Engineering',
            categoryTag: p.categoryTag || 'Industry-inspired',
            difficulty: p.difficulty || 'Intermediate',
            projectType: p.projectType || 'Mini Project',
            description: p.description || '',
            architecture: p.architecture || '',
            instructions: p.instructions || '',
            problemStatement: p.problemStatement || '',
            objective: p.objective || '',
            features: p.features || [],
            suggestedTech: p.suggestedTech || p.technologies || [],
            technologies: p.technologies || p.suggestedTech || [],
            expectedOutcome: p.expectedOutcome || '',
            skillsLearned: p.skillsLearned || []
          }
        },
        upsert: true
      }
    }));
    await executeBatchUpsert(Project, ops, 'Projects', 500);
  }

  // 10. Certifications
  if (data.certifications && data.certifications.length > 0) {
    const ops = data.certifications.map(c => ({
      updateOne: {
        filter: {
          title: c.title,
          provider: c.provider
        },
        update: {
          $set: {
            id: c.id,
            title: c.title,
            provider: c.provider,
            category: c.category || 'Engineering-specific',
            level: c.level || 'Intermediate',
            officialUrl: c.officialUrl || c.url || '',
            url: c.url || c.officialUrl || '',
            details: c.details || '',
            description: c.description || '',
            examFormat: c.examFormat || 'Online / Assessment Exam',
            prepResources: c.prepResources || [],
            relatedRoles: c.relatedRoles || [],
            targetDepts: c.targetDepts || []
          }
        },
        upsert: true
      }
    }));
    await executeBatchUpsert(Certification, ops, 'Certifications', 500);
  }

  console.log('\n🎉 ALL DATASETS IMPORTED TO MONGODB ATLAS SUCCESSFULLY!');
  
  // Summary counts from live database
  console.log('\n📊 Live Atlas Database Record Counts:');
  console.log(`- Regulations:     ${await Regulation.countDocuments()}`);
  console.log(`- Departments:     ${await Department.countDocuments()}`);
  console.log(`- Semesters:       ${await Semester.countDocuments()}`);
  console.log(`- Subjects:        ${await Subject.countDocuments()}`);
  console.log(`- Notes:           ${await Note.countDocuments()}`);
  console.log(`- Question Papers: ${await QuestionPaper.countDocuments()}`);
  console.log(`- Job Roles:       ${await JobRole.countDocuments()}`);
  console.log(`- Roadmaps:        ${await Roadmap.countDocuments()}`);
  console.log(`- Projects:        ${await Project.countDocuments()}`);
  console.log(`- Certifications:  ${await Certification.countDocuments()}`);

  await mongoose.disconnect();
  console.log('\n🔌 Database disconnected cleanly.');
}

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('❌ Seeding failed with error:', err);
      process.exit(1);
    });
}

module.exports = seedDatabase;
