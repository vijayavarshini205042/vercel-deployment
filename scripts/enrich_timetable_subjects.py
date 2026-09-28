"""
Enrich fallbackData.js with any branch-specific subjects from the Anna University Timetable (R2025 & R2021)
that may be missing, ensuring 100% coverage.
"""

import json
import re
import os

TIMETABLE_NEW_SUBJECTS = [
    # R2025 Sem 2 branch-specific subjects from timetable
    {"code": "CE25201", "name": "Construction Materials and Technology", "deptCode": "CIVIL", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "CE25201T", "name": "Construction Materials and Technology", "deptCode": "CIVIL_TM", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "CH25201", "name": "Chemical Process Calculations", "deptCode": "CHEM", "semester": 2, "regCode": "R2025", "credits": 4, "category": "PCC"},
    {"code": "BT25201", "name": "Bioorganic Chemistry", "deptCode": "BIOTECH", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "BT25201", "name": "Bioorganic Chemistry", "deptCode": "IBT", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "IT25201", "name": "Foundations of Data Science using Python", "deptCode": "IT", "semester": 2, "regCode": "R2025", "credits": 4, "category": "PCC"},
    {"code": "IT25202", "name": "Digital Principles and System Design", "deptCode": "IT", "semester": 2, "regCode": "R2025", "credits": 4, "category": "PCC"},
    {"code": "AD25201", "name": "Python for Data Science", "deptCode": "AIDS", "semester": 2, "regCode": "R2025", "credits": 4, "category": "PCC"},
    {"code": "CW25201", "name": "Computer Organization and Architecture", "deptCode": "CSBS", "semester": 2, "regCode": "R2025", "credits": 4, "category": "PCC"},
    {"code": "FD25201", "name": "Environmental Monitoring in Food Industries", "deptCode": "FOOD", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "FD25202", "name": "Principles of Thermodynamics", "deptCode": "FOOD", "semester": 2, "regCode": "R2025", "credits": 4, "category": "PCC"},
    {"code": "PE25201", "name": "Solid Mechanics and Offshore Structures", "deptCode": "PET", "semester": 2, "regCode": "R2025", "credits": 4, "category": "PCC"},
    {"code": "PE25201", "name": "Solid Mechanics and Offshore Structures", "deptCode": "PETRO", "semester": 2, "regCode": "R2025", "credits": 4, "category": "PCC"},
    {"code": "AI25201", "name": "Principles and Practices of Crop Production", "deptCode": "AGRI", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "EL25201", "name": "Introduction to Electrochemical Engineering", "deptCode": "CEE", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "PC25201", "name": "Chemistry of Hydrocarbons", "deptCode": "PCT", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "TC25201", "name": "Textile Fiber Science", "deptCode": "TXCHEM", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "FT25201", "name": "Fibre Science", "deptCode": "FT", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "RI25201", "name": "Sensors and Signal Processing", "deptCode": "RAI", "semester": 2, "regCode": "R2025", "credits": 4, "category": "PCC"},
    {"code": "GI25201", "name": "Geoinformatics Systems", "deptCode": "GEO", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "BS25201", "name": "Design Appreciation through History II", "deptCode": "BDES", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "BS25202", "name": "Ergonomics - Fundamentals and Advanced", "deptCode": "BDES", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "BS25203", "name": "Visual Arts and Crafts - II", "deptCode": "BDES", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "BS25204", "name": "Geometrical Drawing II", "deptCode": "BDES", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "BS25205", "name": "Computer Modelling and Simulation Techniques - I", "deptCode": "BDES", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "AR25201", "name": "World Architecture: Early Civilizations to Renaissance", "deptCode": "ARCH", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "AR25202", "name": "Structural Mechanics", "deptCode": "ARCH", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "AR25203", "name": "Environmental Studies", "deptCode": "ARCH", "semester": 2, "regCode": "R2025", "credits": 3, "category": "PCC"},
    {"code": "AR25204", "name": "Building Components and Measured Drawing", "deptCode": "ARCH", "semester": 2, "regCode": "R2025", "credits": 4, "category": "PCC"}
]

fallback_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "js", "data", "fallbackData.js"))
text = open(fallback_path, encoding='utf-8').read()
m = re.search(r'window\.AppFallbackData\s*=\s*(\{.*\});', text, re.DOTALL)
if not m:
    print("Could not parse fallbackData.js")
    exit(1)

data = json.loads(m.group(1))
existing_subs = data.get("subjects", [])
existing_keys = set((s.get("deptCode"), s.get("regCode"), s.get("semester"), s.get("code")) for s in existing_subs)

added_count = 0
for sub in TIMETABLE_NEW_SUBJECTS:
    key = (sub["deptCode"], sub["regCode"], sub["semester"], sub["code"])
    if key not in existing_keys:
        sub_id = f"sub-{sub['code'].lower()}-{sub['deptCode'].lower()}-{sub['regCode'].lower()}-s{sub['semester']}"
        entry = {
            "id": sub_id,
            "code": sub["code"],
            "name": sub["name"],
            "deptCode": sub["deptCode"],
            "department": sub["deptCode"],
            "regCode": sub["regCode"],
            "regulation": sub["regCode"],
            "semester": sub["semester"],
            "credits": sub.get("credits", 3),
            "category": sub.get("category", "PCC"),
            "yearNumber": 1,
            "year": "1st Year",
            "academicYear": "1st Year",
            "categoryName": "Professional Core Course",
            "ltp": "3-0-0",
            "syllabusOutline": []
        }
        existing_subs.append(entry)
        existing_keys.add(key)
        added_count += 1

print(f"Added {added_count} timetable-specific subjects to fallbackData.js. Total subjects now: {len(existing_subs)}")

new_js = "/**\n * Application Fallback Data for Offline/Demo Mode\n */\n\nwindow.AppFallbackData = " + json.dumps(data, indent=2, ensure_ascii=False) + ";\n"
with open(fallback_path, "w", encoding="utf-8") as f:
    f.write(new_js)

print("Saved enriched fallbackData.js successfully!")
