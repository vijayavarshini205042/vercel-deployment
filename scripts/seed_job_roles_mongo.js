/**
 * Seeder Script for All 68 Departments Job Roles and Roadmaps
 * Reads: public/js/data/all_68_departments_career_db.json
 * Upserts to MongoDB Atlas: JobRole & Roadmap models
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const JobRole = require('../models/JobRole');
const Roadmap = require('../models/Roadmap');

async function seedJobRolesAndRoadmaps() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI not found in .env');
    process.exit(1);
  }

  console.log('📡 Connecting to MongoDB Atlas...');
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB Atlas successfully.');

  const dbPath = path.join(__dirname, '..', 'public', 'js', 'data', 'all_68_departments_career_db.json');
  const allDepts = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  console.log(`📦 Loaded ${allDepts.length} departments from master JSON.`);

  const roleOps = [];
  const roadmapOps = [];

  allDepts.forEach(dept => {
    const deptCode = dept.departmentCode;

    dept.jobRoles.forEach(r => {
      // 1. Prepare JobRole upsert
      roleOps.push({
        updateOne: {
          filter: { id: r.roleId },
          update: {
            $set: {
              title: r.roleName,
              deptCode: deptCode,
              domain: r.roleType || 'Core',
              avgSalaryRange: r.roleType === 'Technology' ? '₹6–24 LPA' : (r.roleType === 'Emerging' ? '₹8–28 LPA' : '₹4.5–16 LPA'),
              description: r.description,
              coreSkills: r.technicalSkills || [],
              secondarySkills: r.softSkills || [],
              roadmapId: `roadmap-${r.roleId}`,
              id: r.roleId,
              skills: r.technicalSkills || [],
              tools: r.tools || [],
              companies: r.industry || [],
              avgSalary: r.roleType === 'Technology' ? '₹12 LPA' : '₹7.5 LPA',
              demandLevel: 'High'
            }
          },
          upsert: true
        }
      });

      // 2. Prepare Roadmap upsert
      roadmapOps.push({
        updateOne: {
          filter: { id: `roadmap-${r.roleId}` },
          update: {
            $set: {
              id: `roadmap-${r.roleId}`,
              title: `${r.roleName} Learning Path`,
              deptCode: deptCode,
              roleId: r.roleId,
              steps: (r.roadmap || []).map(step => ({
                step: step.level,
                title: `Level ${step.level} — ${step.title}`,
                desc: (step.learn || []).join('. ') + (step.practice ? ' | Practice: ' + step.practice.join(', ') : ''),
                duration: step.level === 1 ? '2–3 months' : (step.level <= 3 ? '3–4 months' : 'Ongoing')
              }))
            }
          },
          upsert: true
        }
      });
    });
  });

  console.log(`⏳ Upserting ${roleOps.length} Job Roles into MongoDB...`);
  await JobRole.bulkWrite(roleOps, { ordered: false });
  console.log(`✅ Synced ${roleOps.length} Job Roles to MongoDB Atlas successfully.`);

  console.log(`⏳ Upserting ${roadmapOps.length} Roadmaps into MongoDB...`);
  await Roadmap.bulkWrite(roadmapOps, { ordered: false });
  console.log(`✅ Synced ${roadmapOps.length} Roadmaps to MongoDB Atlas successfully.`);

  await mongoose.disconnect();
  console.log('🔌 Disconnected from MongoDB. Seeding complete!');
}

seedJobRolesAndRoadmaps().catch(err => {
  console.error('❌ Error during seeding:', err);
  process.exit(1);
});
