/**
 * DRMS — All 68 Departments Job Roles, Skills & Career Roadmap Master Generator
 * Strictly implements the schema from the 8-page DRMS specification.
 * Output: public/js/data/all_68_departments_career_db.json
 */

const fs = require('fs');
const path = require('path');

// Helper to construct a standard 7-level roadmap
function create7LevelRoadmap(deptCode, roleCode, roleName, fLearn, fPrac, fProj, cLearn, cPrac, cProj, pLearn, pPrac, pProj, iLearn, iPrac, iProj, certLearn, certPrac, certProj, placeLearn, placePrac, placeProj, careerLearn, careerPrac, careerProj) {
  return [
    {
      level: 1,
      title: "Foundation",
      learn: fLearn,
      practice: fPrac,
      project: fProj,
      outcome: `Mastery of fundamental theories, mathematics, and beginner tools in ${roleName}.`
    },
    {
      level: 2,
      title: "Core Skills",
      learn: cLearn,
      practice: cPrac,
      project: cProj,
      outcome: `Competency in core domain workflows, software tools, and standard engineering methodologies.`
    },
    {
      level: 3,
      title: "Projects",
      learn: pLearn,
      practice: pPrac,
      project: pProj,
      outcome: `Ability to design and execute modular, multi-disciplinary engineering projects.`
    },
    {
      level: 4,
      title: "Internship Preparation",
      learn: iLearn,
      practice: iPrac,
      project: iProj,
      outcome: `Demonstrated industry readiness, technical documentation, and portfolio verification.`
    },
    {
      level: 5,
      title: "Certifications / Learning",
      learn: certLearn,
      practice: certPrac,
      project: certProj,
      outcome: `Accreditation from recognized industry bodies, vendor certifications, and open standards.`
    },
    {
      level: 6,
      title: "Placement Preparation",
      learn: placeLearn,
      practice: placePrac,
      project: placeProj,
      outcome: `High clearance rate in technical interviews, aptitude rounds, and domain design challenges.`
    },
    {
      level: 7,
      title: "Job & Career Progression",
      learn: careerLearn,
      practice: careerPrac,
      project: careerProj,
      outcome: `Career advancement from entry-level engineer to senior specialist and technical architect.`
    }
  ];
}

// Helper to construct projects
function createProjects(bTitle, bProb, bTech, bFeat, bOut, iTitle, iProb, iTech, iFeat, iOut, aTitle, aProb, aTech, aFeat, aOut) {
  return [
    {
      level: "Beginner",
      title: bTitle,
      problemStatement: bProb,
      technologies: bTech,
      mainFeatures: bFeat,
      expectedLearningOutcome: bOut
    },
    {
      level: "Intermediate",
      title: iTitle,
      problemStatement: iProb,
      technologies: iTech,
      mainFeatures: iFeat,
      expectedLearningOutcome: iOut
    },
    {
      level: "Advanced",
      title: aTitle,
      problemStatement: aProb,
      technologies: aTech,
      mainFeatures: aFeat,
      expectedLearningOutcome: aOut
    }
  ];
}

console.log("Starting master 68-department database generation script...");
