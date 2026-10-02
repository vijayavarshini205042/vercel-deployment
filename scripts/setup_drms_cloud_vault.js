/**
 * DRMS Cloud Vault - 4-Account Folder Structure Generator (Node.js)
 * Creates the complete, organized folder hierarchy for Anna University
 * (All 68 Departments, R2021 & R2025) split across 4 Google Drive Accounts.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const BASE_DIR = path.resolve(__dirname, '..', 'DRMS_Cloud_Vault');
const fallbackPath = path.resolve(__dirname, '..', 'public', 'js', 'data', 'fallbackData.js');

console.log('Loading academic catalog from fallbackData.js...');
const fileContent = fs.readFileSync(fallbackPath, 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fileContent, sandbox);

const departments = sandbox.window.AppFallbackData?.departments || [];
const subjects = sandbox.window.AppFallbackData?.subjects || [];

console.log(`Loaded ${departments.length} departments and ${subjects.length} subjects.`);

// Define 4 Account Allocation (15 GB each = 60 GB total)
const accounts = {
  "Account_1_First_Year_Sem1_Sem2": [1, 2],
  "Account_2_Second_Year_Sem3_Sem4": [3, 4],
  "Account_3_Third_Year_Sem5_Sem6": [5, 6],
  "Account_4_Final_Year_Sem7_Sem8": [7, 8]
};

function cleanName(str) {
  if (!str) return 'GENERAL';
  return str.toString().replace(/[^a-zA-Z0-9_\- ]/g, '').trim().replace(/\s+/g, '_');
}

let totalSubjectsCreated = 0;
let totalFoldersCreated = 0;

if (!fs.existsSync(BASE_DIR)) {
  fs.mkdirSync(BASE_DIR, { recursive: true });
}

for (const [acctFolder, sems] of Object.entries(accounts)) {
  const acctPath = path.join(BASE_DIR, acctFolder);
  fs.mkdirSync(acctPath, { recursive: true });

  // Create ACCOUNT_INFO.txt
  const infoContent = `=== GOOGLE DRIVE ${acctFolder} ===
Target Semesters: Semesters ${sems.join(' & ')}
Storage Allocation: 15 GB Free
Drive Sharing Permission: "Anyone with the link can View"

HOW TO USE THIS FOLDER:
1. Drag and drop this folder directly into your Google Drive for this Account.
2. Inside each subject folder:
   - Drop Lecture Notes (Unit 1 to 5) into the "Notes" folder.
   - Drop Previous Year Question Papers into the "PYQ" folder.
`;
  fs.writeFileSync(path.join(acctPath, 'ACCOUNT_INFO.txt'), infoContent, 'utf8');

  // Filter subjects for this account
  const acctSubjects = subjects.filter(s => sems.includes(s.semester));

  acctSubjects.forEach(sub => {
    const reg = cleanName(sub.regCode || sub.regulation || 'R2021');
    const dept = cleanName(sub.deptCode || sub.department || 'GENERAL');
    const sem = `Sem_0${sub.semester}`;
    const subCode = cleanName(sub.code || 'SUB');
    const subName = cleanName(sub.name || 'Subject').substring(0, 45);

    const folderName = `${subCode}_${subName}`;
    const subjectDir = path.join(acctPath, reg, dept, sem, folderName);

    const notesDir = path.join(subjectDir, 'Notes');
    const pyqDir = path.join(subjectDir, 'PYQ');

    fs.mkdirSync(notesDir, { recursive: true });
    fs.mkdirSync(pyqDir, { recursive: true });

    // Create an empty index file inside subject with quick metadata
    const metaFile = path.join(subjectDir, 'SUBJECT_METADATA.json');
    if (!fs.existsSync(metaFile)) {
      fs.writeFileSync(metaFile, JSON.stringify({
        subjectCode: sub.code,
        subjectName: sub.name,
        department: dept,
        regulation: reg,
        semester: sub.semester,
        credits: sub.credits || 3
      }, null, 2), 'utf8');
    }

    totalSubjectsCreated++;
    totalFoldersCreated += 2;
  });
}

console.log(`\n======================================================`);
console.log(`SUCCESS! Folders successfully generated.`);
console.log(`Total Subjects organized: ${totalSubjectsCreated}`);
console.log(`Total Folders created: ${totalFoldersCreated}`);
console.log(`Vault Location: ${BASE_DIR}`);
console.log(`======================================================`);
