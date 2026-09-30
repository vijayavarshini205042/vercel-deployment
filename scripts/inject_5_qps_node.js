const fs = require('fs');
const path = require('path');

const pyqDataPath = path.join(__dirname, '..', 'public', 'js', 'data', 'pyqAnalysisData.js');
const fallbackPath = path.join(__dirname, '..', 'public', 'js', 'data', 'fallbackData.js');
const papersPath = path.join(__dirname, '..', 'scratch', 'papers.json');

const papers = JSON.parse(fs.readFileSync(papersPath, 'utf8'));
console.log(`Loaded ${papers.length} new question papers.`);

// 1. Update pyqAnalysisData.js
global.window = {};
require(pyqDataPath);
let existingPyqs = global.window.PYQAnalysisData || [];

const newCodes = papers.map(p => p.qpCode);
existingPyqs = existingPyqs.filter(p => !newCodes.includes(p.qpCode));

papers.forEach(p => {
  existingPyqs.push({
    qpCode: p.qpCode,
    subjectCode: p.subjectCode,
    subjectName: p.subjectName,
    regulation: p.regulation,
    examSession: p.examSession,
    semester: p.semester,
    commonBranches: p.commonBranches,
    maxMarks: p.maxMarks,
    timeDuration: p.timeDuration,
    analysis: p.analysis,
    questions: p.questions
  });
});

const newPyqJs = `/**
 * DRMS — Real Anna University Previous Year Question Papers (PYQ),
 * Detailed Question Trend Analysis, Solved Answers, and Unit-wise Notes.
 */

window.PYQAnalysisData = ${JSON.stringify(existingPyqs, null, 2)};
`;
fs.writeFileSync(pyqDataPath, newPyqJs, 'utf8');
console.log(`Updated pyqAnalysisData.js with total ${existingPyqs.length} papers.`);

// 2. Update fallbackData.js
global.window = {};
require(fallbackPath);
const fbData = global.window.AppFallbackData;

if (!Array.isArray(fbData.questionPapers)) fbData.questionPapers = [];
if (!Array.isArray(fbData.subjects)) fbData.subjects = [];

const allDepts = (fbData.departments || []).map(d => d.code);

const subjectsToAdd = [
  { code: "ME3792", name: "Computer Integrated Manufacturing", semester: 7, credits: 3, deptCode: "MECH", regCode: "R2021", type: "Professional Core" },
  { code: "ME3791", name: "Mechatronics and IoT", semester: 7, credits: 3, deptCode: "MECH", regCode: "R2021", type: "Professional Core" },
  { code: "OCS351", name: "Artificial Intelligence and Machine Learning Fundamentals", semester: 7, credits: 3, deptCode: "CIVIL", regCode: "R2021", type: "Open Elective" },
  { code: "OCS353", name: "Data Science Fundamentals", semester: 6, credits: 3, deptCode: "CIVIL", regCode: "R2021", type: "Open Elective" }
];

subjectsToAdd.forEach(sub => {
  const exists = fbData.subjects.some(s => s.code === sub.code && s.deptCode === sub.deptCode);
  if (!exists) {
    const subId = `sub-${sub.code.toLowerCase()}-${sub.deptCode.toLowerCase()}`;
    fbData.subjects.push({
      id: subId,
      _id: subId,
      code: sub.code,
      name: sub.name,
      semester: sub.semester,
      credits: sub.credits,
      deptCode: sub.deptCode,
      regCode: sub.regCode,
      type: sub.type,
      description: `Official Anna University ${sub.regCode} curriculum course for ${sub.name} (${sub.code}).`
    });
    console.log(`Added subject ${sub.code} to ${sub.deptCode}`);
  }
});

// Remove any existing entries for these 5 QPs
fbData.questionPapers = fbData.questionPapers.filter(q => !newCodes.includes(q.qpCode));

const newQPEntries = [];

papers.forEach(paper => {
  let deptsToMap = [];
  if (['ME3792', 'ME3791'].includes(paper.subjectCode)) {
    deptsToMap = ['MECH', 'PROD', 'AUTO', 'ROBOTICS'];
  } else if (['OCS351', 'OCS353'].includes(paper.subjectCode)) {
    deptsToMap = ['CIVIL', 'MECH', 'EEE', 'ECE', 'CSE', 'IT', 'AIDS', 'AIML'];
  } else {
    deptsToMap = [paper.primaryDept];
  }

  deptsToMap = deptsToMap.filter(d => allDepts.includes(d) || d === paper.primaryDept);

  deptsToMap.forEach(dept => {
    const qpId = `qp-${paper.qpCode}-${dept.toLowerCase()}`;
    const fileName = paper.pdfFileName;
    const fileUrl = `/uploads/question-papers/${fileName}`;

    newQPEntries.push({
      id: qpId,
      _id: qpId,
      subjectId: `sub-${paper.subjectCode.toLowerCase()}-${dept.toLowerCase()}`,
      subjectCode: paper.subjectCode,
      subjectName: paper.subjectName,
      title: `${paper.displayCode} — ${paper.subjectName} (QP Code: ${paper.qpCode})`,
      qpCode: paper.qpCode,
      deptCode: dept,
      regCode: paper.regulation,
      semester: paper.semester,
      academicYear: paper.academicYear,
      examType: `Anna University ${paper.examSession} Examination`,
      fileUrl: fileUrl,
      fileName: fileName,
      fileSize: "1.4 MB",
      downloads: 380,
      uploadedBy: "Anna University Examination Cell",
      analysis: paper.analysis,
      questions: paper.questions,
      portals: {
        brainkart: `https://www.brainkart.com/search/?q=${encodeURIComponent(paper.subjectCode + ' question paper')}`,
        enggtree: `https://www.enggtree.com/?s=${encodeURIComponent(paper.subjectCode)}`,
        padeepz: `https://www.padeepz.net/?s=${encodeURIComponent(paper.subjectCode)}`,
        eduengineering: `https://www.eduengineering.net/?s=${encodeURIComponent(paper.subjectCode)}`
      }
    });
  });
});

fbData.questionPapers = [...newQPEntries, ...fbData.questionPapers];
console.log(`Injected ${newQPEntries.length} question paper entries into fallbackData.`);

const newFbJs = `/**
 * Application Fallback Data for Offline/Demo Mode
 */

window.AppFallbackData = ${JSON.stringify(fbData, null, 2)};
`;
fs.writeFileSync(fallbackPath, newFbJs, 'utf8');
console.log('SUCCESS: All 5 uploaded question papers fully injected into both pyqAnalysisData.js and fallbackData.js!');
