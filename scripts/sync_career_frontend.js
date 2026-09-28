const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'public', 'js', 'data', 'all_68_departments_career_db.json');
const targetPath = path.join(__dirname, '..', 'public', 'js', 'data', 'careerData.js');

const db = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let content = `/**
 * Career Data — All 68 Departments, Job Roles, Skills, Roadmaps
 * Auto-generated from all_68_departments_career_db.json
 * Full support for both DRMS 8-page schema and SPA component view.
 */

window.CareerData = (() => {
  const ALL_DEPTS = ${JSON.stringify(db, null, 2)};

  const DB = {};

  ALL_DEPTS.forEach(dept => {
    const deptCode = dept.departmentCode;
    DB[deptCode] = dept.jobRoles.map(r => {
      return {
        id: r.roleId,
        roleId: r.roleId,
        title: r.roleName,
        roleName: r.roleName,
        category: r.roleType || 'Core',
        roleType: r.roleType || 'Core',
        salary: r.roleType === 'Technology' ? '₹6–24 LPA' : (r.roleType === 'Emerging' ? '₹8–28 LPA' : '₹4.5–16 LPA'),
        desc: r.description,
        description: r.description,
        industry: r.industry || [],
        responsibilities: r.responsibilities || [],
        skills: (r.technicalSkills || []).map((s, idx) => ({
          name: s,
          from: idx === 0 ? '🟢 Beginner' : (idx === 1 ? '🟡 Intermediate' : '🟡 Intermediate'),
          to: idx === 0 ? '🟡 Intermediate' : '🔴 Advanced'
        })),
        technicalSkills: r.technicalSkills || [],
        tools: r.tools || [],
        softSkills: r.softSkills || [],
        knowledgeAreas: r.knowledgeAreas || [],
        beginnerSkills: r.beginnerSkills || [],
        intermediateSkills: r.intermediateSkills || [],
        advancedSkills: r.advancedSkills || [],
        entryLevelTitles: r.entryLevelTitles || [],
        subjects: r.knowledgeAreas || [],
        certs: r.certifications || [],
        certifications: r.certifications || [],
        freeResources: r.freeResources || [],
        projects: (r.projects || []).map(p => ({
          level: p.level,
          title: p.title,
          stack: Array.isArray(p.technologies) ? p.technologies.join(', ') : p.technologies,
          problemStatement: p.problemStatement,
          technologies: p.technologies,
          mainFeatures: p.mainFeatures,
          expectedLearningOutcome: p.expectedLearningOutcome
        })),
        internship: "Prepare hands-on domain engineering projects in " + r.tools.slice(0, 2).join(' & ') + ". Master engineering documentation and standard protocols.",
        interviewTopics: r.interviewTopics || [],
        resumeSuggestions: r.resumeSuggestions || [],
        relatedRoles: r.relatedRoles || [],
        careerProgression: r.careerProgression || [],
        roadmap: (r.roadmap || []).map(step => ({
          step: step.level,
          level: step.level,
          title: "Level " + step.level + " — " + step.title,
          desc: (step.learn || []).join('. ') + (step.practice ? ' | Practice: ' + step.practice.join(', ') : ''),
          project: step.project,
          outcome: step.outcome,
          duration: step.level === 1 ? '2–3 months' : (step.level <= 3 ? '3–4 months' : 'Ongoing')
        }))
      };
    });
  });

  return {
    getRoles(deptCode) {
      return DB[deptCode] || [];
    },
    getRole(deptCode, roleId) {
      const roles = this.getRoles(deptCode);
      return roles.find(r => r.id === roleId || r.roleId === roleId) || null;
    },
    getCategories(deptCode) {
      const roles = this.getRoles(deptCode);
      return [...new Set(roles.map(r => r.category))];
    },
    getAllDepartments() {
      return ALL_DEPTS;
    }
  };
})();
`;

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Successfully written careerData.js with all 68 departments!');
