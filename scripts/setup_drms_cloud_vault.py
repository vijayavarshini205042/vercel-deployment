"""
DRMS Cloud Vault - 4-Account Folder Structure Generator
Creates the complete, organized folder hierarchy for Anna University (All 68 Departments, R2021 & R2025)
Split intelligently across the 4 Google Drive Accounts.
"""

import os
import json
import re

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'DRMS_Cloud_Vault'))

# Load fallbackData.js to get all actual departments and subjects
fallback_file = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'public', 'js', 'data', 'fallbackData.js'))

with open(fallback_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Parse subjects and departments
# Extract JSON portion
start_idx = content.find('{')
end_idx = content.rfind('}')
raw_json = content[start_idx:end_idx+1]

# Quick extraction using regex/json parsing
import subprocess
node_cmd = """
const fs = require('fs');
let code = fs.readFileSync('public/js/data/fallbackData.js', 'utf8');
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const d = sandbox.window.AppFallbackData;
console.log(JSON.stringify({
    departments: d.departments || [],
    subjects: d.subjects || []
}));
"""

p = subprocess.Popen(['node', '-e', node_cmd], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, cwd=os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
stdout, stderr = p.communicate()
data = json.loads(stdout)

departments = data.get('departments', [])
subjects = data.get('subjects', [])

print(f"Loaded {len(departments)} departments and {len(subjects)} subjects from DRMS database.")

# Define 4 Account Allocation:
# Account 1: 1st Year Common (Sem 1 & Sem 2 for all depts) - ~15 GB
# Account 2: 2nd Year (Sem 3 & Sem 4 - all depts) - ~15 GB
# Account 3: 3rd Year (Sem 5 & Sem 6 - all depts) - ~15 GB
# Account 4: 4th Year (Sem 7 & Sem 8 + Projects & Electives) - ~15 GB

accounts = {
    "Account_1_First_Year_Sem1_Sem2": [1, 2],
    "Account_2_Second_Year_Sem3_Sem4": [3, 4],
    "Account_3_Third_Year_Sem5_Sem6": [5, 6],
    "Account_4_Final_Year_Sem7_Sem8": [7, 8]
}

def clean_name(s):
    return re.sub(r'[^a-zA-Z0-9_\- ]', '', str(s)).strip().replace(' ', '_')

created_folders = 0

for acct_folder, sems in accounts.items():
    acct_path = os.path.join(BASE_DIR, acct_folder)
    os.makedirs(acct_path, exist_ok=True)
    
    # Write Account Info README
    readme_path = os.path.join(acct_path, "ACCOUNT_INFO.txt")
    with open(readme_path, "w", encoding="utf-8") as rf:
        rf.write(f"=== GOOGLE DRIVE {acct_folder} ===\n")
        rf.write(f"Target Semesters: {sems}\n")
        rf.write("Storage Limit: 15 GB Free\n")
        rf.write("Google Drive Share Setting: 'Anyone with the link can View'\n\n")
        rf.write("Instructions:\n")
        rf.write("1. Upload this whole folder into your Google Account corresponding to this account.\n")
        rf.write("2. Inside each subject folder, drop your Unit 1-5 Notes in 'Notes/' and question papers in 'PYQ/'.\n")

    # Filter subjects for these semesters
    acct_subjects = [s for s in subjects if s.get('semester') in sems]
    
    # Group by Regulation -> Department -> Semester -> Subject
    for sub in acct_subjects:
        reg = clean_name(sub.get('regCode') or sub.get('regulation') or 'R2021')
        dept = clean_name(sub.get('deptCode') or sub.get('department') or 'GENERAL')
        sem = f"Sem_0{sub.get('semester')}"
        sub_code = clean_name(sub.get('code') or 'SUB')
        sub_name = clean_name(sub.get('name') or 'Subject')[:40]
        
        folder_name = f"{sub_code}_{sub_name}"
        subject_dir = os.path.join(acct_path, reg, dept, sem, folder_name)
        
        notes_dir = os.path.join(subject_dir, "Notes")
        pyq_dir = os.path.join(subject_dir, "PYQ")
        
        os.makedirs(notes_dir, exist_ok=True)
        os.makedirs(pyq_dir, exist_ok=True)
        created_folders += 2

print(f"\nSUCCESS! Created {created_folders} folder endpoints across 4 Accounts.")
print(f"Location on your PC: {BASE_DIR}")
