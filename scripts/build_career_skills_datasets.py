import json
import re
import os

print("Starting generation of 4 separate Career & Skills datasets...")

# 1. Load career_db
with open('public/js/data/all_68_departments_career_db.json', 'r', encoding='utf-8') as f:
    career_db = json.load(f)

# 2. Load skills cert data
with open('public/js/data/departmentSkillsCertData.js', 'r', encoding='utf-8') as f:
    content = f.read()
    start = content.find('{')
    end = content.rfind('}') + 1
    skills_cert_db = json.loads(content[start:end])

# 3. Load final year projects data
with open('public/js/data/finalYearProjectsData.js', 'r', encoding='utf-8') as f:
    content = f.read()
    start = content.find('{')
    end = content.rfind('}') + 1
    projects_db = json.loads(content[start:end])

# Salary benchmark generator
def get_salary_benchmark(role_name, category, dept_code):
    role_lower = role_name.lower()
    if any(k in role_lower for k in ['architect', 'lead', 'principal', 'manager']):
        return "₹14 - 32 LPA"
    elif any(k in role_lower for k in ['ai', 'machine learning', 'deep learning', 'data scientist', 'cloud', 'devops', 'blockchain', 'cybersecurity']):
        return "₹10 - 28 LPA"
    elif any(k in role_lower for k in ['senior', 'specialist', 'analyst', 'vlsi', 'embedded']):
        return "₹8 - 22 LPA"
    elif any(k in role_lower for k in ['developer', 'engineer', 'consultant']):
        return "₹6 - 18 LPA"
    else:
        return "₹5 - 15 LPA"

# ── DATASET 1: departmental_roles.json ──
all_roles = []
for dept in career_db:
    dept_code = dept.get('departmentCode', 'IT')
    dept_name = dept.get('departmentName', 'Information Technology')
    for role in dept.get('jobRoles', []):
        role_title = role.get('roleName', 'Engineering Role')
        category = role.get('roleType', 'Technology')
        if not category:
            category = 'Technology'
        
        salary = get_salary_benchmark(role_title, category, dept_code)
        overview = role.get('description', f"Professional role specializing in {dept_name} applications and industrial systems.")
        
        all_roles.append({
            "id": role.get('roleId', f"{dept_code}-ROLE-{len(all_roles)+1}"),
            "roleTitle": role_title,
            "department": dept_name,
            "deptCode": dept_code,
            "category": category,
            "shortOverview": overview,
            "salaryBenchmark": salary,
            "topSkills": role.get('technicalSkills', [])[:5],
            "tools": role.get('tools', [])[:4]
        })

# ── DATASET 2: project_ideas.json ──
all_projects = []
diff_cycle = ["Beginner", "Intermediate", "Advanced", "Intermediate", "Advanced"]
tech_defaults = {
    "IT": ["React", "Node.js", "MongoDB", "Docker", "AWS"],
    "CSE": ["Python", "FastAPI", "PostgreSQL", "Docker", "TensorFlow"],
    "AIDS": ["Python", "PyTorch", "HuggingFace", "Streamlit", "MLflow"],
    "ECE": ["Embedded C", "ESP32", "MQTT", "FreeRTOS", "Altium"],
    "EEE": ["MATLAB/Simulink", "Arduino", "LabVIEW", "Power Electronics", "SCADA"],
    "MECH": ["SolidWorks", "ANSYS", "Python", "CNC Programming", "3D Printing"],
    "CIVIL": ["AutoCAD", "Revit BIM", "ETABS", "GIS", "Staad Pro"],
    "ROBOTICS": ["ROS2", "Python", "Gazebo", "OpenCV", "Raspberry Pi"]
}

for dept_code, dept_data in projects_db.items():
    dept_name = dept_data.get('deptName', dept_code)
    projects = dept_data.get('projects', [])
    for idx, p in enumerate(projects):
        title = p.get('title', f"{dept_code} Engineering Capstone Project {idx+1}")
        difficulty = diff_cycle[idx % len(diff_cycle)]
        
        # Tech stack
        tech_stack = tech_defaults.get(dept_code, ["Python", "C++", "MATLAB", "IoT", "Cloud"])
        if p.get('hardwareComponents'):
            tech_stack = p.get('hardwareComponents')[:3] + p.get('softwareTools', [])[:3]
        elif p.get('softwareTools'):
            tech_stack = p.get('softwareTools')[:5]

        # Key features
        key_features = p.get('keyModules', [])[:3]
        if not key_features:
            key_features = [
                f"Real-world application for {dept_name} domain",
                "High-performance architecture with modular execution",
                "Automated benchmarking and verifiable metrics telemetry"
            ]

        # Short overview
        overview = p.get('realWorldProblem', '')
        if len(overview) > 180:
            overview = overview[:177] + "..."
        if not overview:
            overview = f"Innovative academic and industry-focused engineering design in {dept_name} addressing real-world problem statements."

        all_projects.append({
            "id": p.get('id', f"proj-{dept_code.lower()}-{idx+1}"),
            "projectTitle": title,
            "department": dept_name,
            "deptCode": dept_code,
            "difficultyLevel": difficulty,
            "techStack": tech_stack[:5],
            "keyFeatures": key_features[:3],
            "shortOverview": overview
        })

# ── DATASET 3: skills_certifications.json ──
all_skills_certs = []
free_platforms = [
    ("Coursera", "https://www.coursera.org/courses?query=free"),
    ("NPTEL / SWAYAM", "https://onlinecourses.nptel.ac.in"),
    ("freeCodeCamp", "https://www.freecodecamp.org/learn"),
    ("Google Cloud Skills Boost", "https://www.cloudskillsboost.google"),
    ("Microsoft Learn", "https://learn.microsoft.com/training"),
    ("edX", "https://www.edx.org/search?q=free+courses"),
    ("Cisco Networking Academy", "https://www.netacad.com/courses/all-courses")
]

for dept_code, dept_data in skills_cert_db.items():
    dept_name = dept_data.get('deptName', dept_code)
    skills = dept_data.get('skills', [])
    for idx, s in enumerate(skills):
        skill_name = s.get('name', f"Skill {idx+1}")
        platform_info = free_platforms[idx % len(free_platforms)]
        platform_name = s.get('platform', platform_info[0])
        course_url = s.get('courseUrl', platform_info[1])
        level = s.get('level', 'Intermediate')
        if level not in ['Beginner', 'Intermediate', 'Advanced']:
            level = 'Intermediate'

        all_skills_certs.append({
            "id": s.get('id', f"cert-{dept_code.lower()}-{idx+1}"),
            "skillName": skill_name,
            "department": dept_name,
            "deptCode": dept_code,
            "recommendedPlatform": platform_name,
            "directResourceLink": course_url,
            "skillLevel": level,
            "isFree": True,
            "category": s.get('category', 'Core Technical'),
            "duration": s.get('duration', '8 Weeks')
        })

# ── DATASET 4: career_roadmaps.json ──
all_roadmaps = []
for dept in career_db:
    dept_code = dept.get('departmentCode', 'IT')
    dept_name = dept.get('departmentName', 'Information Technology')
    for idx, role in enumerate(dept.get('jobRoles', [])):
        role_title = role.get('roleName', 'Role')
        top_skills = role.get('technicalSkills', ['Core Principles', 'Data Analysis', 'Engineering Tools'])
        tools = role.get('tools', ['VS Code', 'Git', 'Linux', 'Docker'])
        category = role.get('roleType', 'Technology')
        salary = get_salary_benchmark(role_title, category, dept_code)
        
        phase1 = f"Phase 1: Basics - Core fundamentals of {role_title}, {dept_name} mathematical foundations, and basic programming/analytical syntax."
        phase2 = f"Phase 2: Core Skills - In-depth mastery of {', '.join(top_skills[:3])}, system workflows, and domain architectural standards."
        phase3 = f"Phase 3: Advanced Tools - Industry-grade tools including {', '.join(tools[:3])}, cloud/hardware integration, and production testing."
        phase4 = f"Phase 4: Portfolio Projects - End-to-end capstone deployment in {role_title} addressing live enterprise problems and GitHub documentation."

        all_roadmaps.append({
            "id": f"roadmap-{dept_code.lower()}-{idx+1}",
            "roleId": role.get('roleId', f"{dept_code}-ROLE-{idx+1}"),
            "roleTitle": role_title,
            "department": dept_name,
            "deptCode": dept_code,
            "category": category,
            "shortOverview": role.get('description', f"Specialized professional career pathway in {dept_name}."),
            "salaryBenchmark": salary,
            "technicalSkills": top_skills,
            "tools": tools,
            "roadmapSteps": role.get('roadmap', []),
            "certifications": role.get('certifications', []),
            "projects": role.get('projects', []),
            "interviewTopics": role.get('interviewTopics', []),
            "resumeSuggestions": role.get('resumeSuggestions', []),
            "careerProgression": role.get('careerProgression', []),
            "sequentialRoadmapSteps": {
                "phase1": phase1,
                "phase2": phase2,
                "phase3": phase3,
                "phase4": phase4
            },
            "totalDuration": "6 - 9 Months"
        })

print(f"Generated:")
print(f" - departmental_roles.json: {len(all_roles)} roles")
print(f" - project_ideas.json: {len(all_projects)} projects")
print(f" - skills_certifications.json: {len(all_skills_certs)} certifications")
print(f" - career_roadmaps.json: {len(all_roadmaps)} roadmaps")

# Write JSON files in public/data/
os.makedirs('public/data', exist_ok=True)
with open('public/data/departmental_roles.json', 'w', encoding='utf-8') as f:
    json.dump(all_roles, f, indent=2, ensure_ascii=False)

with open('public/data/project_ideas.json', 'w', encoding='utf-8') as f:
    json.dump(all_projects, f, indent=2, ensure_ascii=False)

with open('public/data/skills_certifications.json', 'w', encoding='utf-8') as f:
    json.dump(all_skills_certs, f, indent=2, ensure_ascii=False)

with open('public/data/career_roadmaps.json', 'w', encoding='utf-8') as f:
    json.dump(all_roadmaps, f, indent=2, ensure_ascii=False)

# Write preloaded JS files in public/js/data/
with open('public/js/data/departmentalRolesData.js', 'w', encoding='utf-8') as f:
    f.write("/** Departmental Roles Dataset **/\nwindow.DepartmentalRolesData = " + json.dumps(all_roles, ensure_ascii=False) + ";\n")

with open('public/js/data/projectIdeasData.js', 'w', encoding='utf-8') as f:
    f.write("/** Project Ideas Dataset **/\nwindow.ProjectIdeasData = " + json.dumps(all_projects, ensure_ascii=False) + ";\n")

with open('public/js/data/skillsCertificationsData.js', 'w', encoding='utf-8') as f:
    f.write("/** Skills & Certifications Dataset **/\nwindow.SkillsCertificationsData = " + json.dumps(all_skills_certs, ensure_ascii=False) + ";\n")

with open('public/js/data/careerRoadmapsData.js', 'w', encoding='utf-8') as f:
    f.write("/** Career Roadmaps Dataset **/\nwindow.CareerRoadmapsData = " + json.dumps(all_roadmaps, ensure_ascii=False) + ";\n")

print("All JSON and JS datasets generated successfully!")
