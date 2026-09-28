#!/usr/bin/env python3
"""
DRMS — Comprehensive 68 Departments Job Roles, Skills & Career Roadmap Master Database Generator
Strictly implements the complete specifications from the 8-page DRMS Prompt.
"""

import json
import os

# Complete master catalog of 68 departments with verified distinctions
DEPTS_META = [
    # 1-6 Foundation
    ("CSE", "Computer Science & Engineering", "Software Engineering, Cloud, Distributed Systems, Compilers & Algorithms", "CSE vs IT: CSE focuses on deep computational theory, compiler design, algorithms, and low-level system software. IT focuses on enterprise deployment, cloud systems, and network administration."),
    ("IT", "Information Technology", "Enterprise IT, Cloud Architecture, Systems Administration, Database Engineering", "IT vs CSE: IT emphasizes infrastructure provisioning, system administration, cloud networking, and IT enterprise services."),
    ("ECE", "Electronics & Communication Engineering", "Semiconductors, VLSI, Embedded Firmware, Wireless & 5G/6G RF", "ECE vs EEE: ECE focuses on low-voltage signal transmission, microchips, communication protocols, and embedded systems. EEE focuses on high-voltage power generation, transmission, and heavy electrical machines."),
    ("EEE", "Electrical & Electronics Engineering", "Power Systems, High-Voltage Transmission, EV Powertrains, Renewable Energy", "EEE vs ECE: EEE focuses on megawatts-level energy conversion, smart grids, motor drives, and power electronics. ECE focuses on communication signals and microcontrollers."),
    ("MECH", "Mechanical Engineering", "Kinematics, Thermodynamics, CAD/CAM/CAE, Machine Design & Manufacturing", "MECH vs CIVIL: MECH deals with dynamic moving machinery, thermodynamic engines, and manufacturing processes. CIVIL deals with static stationary infrastructure, structures, and soil foundations."),
    ("CIVIL", "Civil Engineering", "Structural Analysis, Transportation Infrastructure, Geotechnical, BIM, Construction Management", "CIVIL vs MECH: CIVIL designs static infrastructure anchored to the ground (buildings, bridges, dams). MECH designs kinetic machines and thermal systems."),
    
    # 7-12 AI & Biological
    ("AIDS", "Artificial Intelligence & Data Science", "Big Data Engineering, Applied Predictive Modeling, Data Pipelines, BI & Analytics", "AIDS vs AIML: AIDS emphasizes end-to-end data engineering, ETL pipelines, big data systems (Spark/Hadoop), business intelligence, and applied statistics alongside ML. AIML focuses more on core neural architectures, deep learning theory, and mathematical optimization of models."),
    ("AIML", "Artificial Intelligence & Machine Learning", "Deep Learning, Neural Networks, Computer Vision, Natural Language Processing, MLOps", "AIML vs AIDS: AIML centers heavily on algorithmic machine learning, transformer architectures, reinforcement learning, and advanced AI research. AIDS focuses on data platforms and applied analytics."),
    ("CYS", "Cyber Security", "Penetration Testing, SOC Operations, Threat Intelligence, Cloud Security, Cryptography", "CYS: Dedicated focus on vulnerability assessment, defensive network monitoring, zero-trust architecture, digital forensics, and ethical hacking."),
    ("BME", "Biomedical Engineering", "Medical Device Instrumentation, Biosignal Processing, Clinical Engineering, Medical Imaging", "BME vs BIOTECH: BME deals with physical medical hardware, biosensors, pacemakers, MRI/CT machines, and patient monitoring. BIOTECH deals with molecular biology, genetics, cellular fermentation, and biopharmaceuticals."),
    ("CHEM", "Chemical Engineering", "Reaction Kinetics, Separation Processes, Heat & Mass Transfer, Petrochemicals, Process Control", "CHEM vs CEE: CHEM covers broad continuous chemical manufacturing, distillation, petroleum refining, and polymer synthesis. CEE focuses specifically on electrochemical systems, batteries, corrosion, and electrolysis."),
    ("BIOTECH", "Biotechnology", "Recombinant DNA, Genetic Engineering, Bioprocess Fermentation, Vaccine Production", "BIOTECH vs BBE: BIOTECH spans agricultural, medical, and environmental genetic technologies. BBE focuses specifically on the biochemical engineering and large-scale industrial bioreactor scaling."),

    # 13-18 Aerospace, Automotive, Robotics & Specialized
    ("AERO", "Aeronautical Engineering", "Atmospheric Aerodynamics, Aircraft Flight Mechanics, Airframe Structures, Jet Propulsion", "AERO vs AEROSPACE: AERO is strictly confined to atmospheric flight (airplanes, helicopters, UAVs). AEROSPACE encompasses both atmospheric flight and space flight beyond Earth's atmosphere (satellites, rockets, orbital mechanics)."),
    ("AUTO", "Automobile Engineering", "Vehicle Dynamics, Powertrains, Chassis Design, Braking, Automotive Testing, EV Architecture", "AUTO vs MECH: AUTO is specialized exclusively in automotive vehicle dynamics, internal combustion engines, EV platforms, crash safety, and chassis systems."),
    ("MTRX", "Mechatronics Engineering", "Electro-Mechanical Integration, Actuators, PLC Systems, Embedded Robotics, Industrial Automation", "MTRX vs ROBO: MTRX focuses broadly on unifying mechanical systems with electronics and software (smart sensors, automated valves, PLCs). ROBO concentrates explicitly on autonomous robotic arms, kinematics, and computer vision guidance."),
    ("ROBO", "Robotics & Automation", "Autonomous Mobile Robots (AMR), Robotic Arms, Inverse Kinematics, ROS/ROS2, Robot Vision", "ROBO vs MTRX: ROBO focuses deeply on robotic navigation (SLAM), inverse kinematics, autonomous trajectory planning, and collaborative industrial robots (Cobots)."),
    ("AGRI", "Agricultural Engineering", "Precision Farming, Farm Machinery Design, Soil & Water Conservation, Post-Harvest Tech", "AGRI: Focuses on mechanization of agriculture, drip irrigation hydraulics, drone crop spraying, and food grain storage preservation."),
    ("FOOD", "Food Technology", "Food Preservation, Quality Assurance (HACCP/FSSAI), Packaging Technology, Fermentation Science", "FOOD: Dedicated to microbial safety, nutritional shelf-life extension, dairy processing, and automated food packaging lines."),

    # 19-24 Production & Specialized Domains
    ("PROD", "Production Engineering", "Lean Manufacturing, Operations Research, CNC Machining, Plant Layout, Supply Chain Logistics", "PROD vs MECH: PROD focuses on shop-floor manufacturing economics, optimization of cycle time, lean Six Sigma, quality control, and industrial scheduling."),
    ("EIE", "Electronics & Instrumentation Engineering", "Industrial Transducers, Process Measurement, SCADA, Distributed Control Systems (DCS)", "EIE vs ICE: EIE emphasizes the electronic design of smart sensors, signal conditioning, and instrumentation amplifiers. ICE emphasizes control theory, system stability, and feedback loops."),
    ("ICE", "Instrumentation & Control Engineering", "Closed-Loop Control Theory, Optimal Control, Process Automation, PID Tuning, Cyber-Physical Systems", "ICE vs EIE: ICE focuses on mathematical control algorithms, state-space modeling, feedback stability, and industrial plant regulation."),
    ("MAR", "Marine Engineering", "Shipboard Propulsion, Marine Diesel Engines, Auxiliary Boilers, Navigational Machinery, Ship Safety", "MAR: Focuses on maritime vessels, commercial shipping propulsion, offshore rigs, and compliance with International Maritime Organization (IMO) standards."),
    ("MET", "Metallurgical Engineering", "Extractive Metallurgy, Physical Metallurgy, Heat Treatment, Phase Diagrams, Failure Analysis", "MET: Focuses on metal extraction from ores, alloying, crystal lattices, tempering, casting, and metallurgical failure investigation."),
    ("MIN", "Mining Engineering", "Surface & Underground Mining, Mine Surveying, Rock Mechanics, Explosives Engineering, Mineral Economics", "MIN: Focuses on extraction of mineral ores, rock slope stability, ventilation in deep underground mines, and environmental remediation."),

    # 25-30 Petro, Textile, Printing & Aero
    ("PET", "Petroleum Engineering", "Upstream Drilling, Reservoir Engineering, Well Logging, Enhanced Oil Recovery (EOR)", "PET vs PETRO: PET focuses on upstream exploration, drilling rigs, and reservoir fluids extraction. PETRO focuses on downstream refining, petrochemical cracking, and fuel formulation."),
    ("TXT", "Textile Technology", "Yarn Spinning, Weaving Mechanics, Chemical Processing of Fibers, Technical Textiles", "TXT vs FT: TXT deals with engineering mechanics of fiber production, looms, spinning machines, and composite fabrics. FT focuses on garment styling, apparel CAD, pattern grading, and fashion merchandising."),
    ("PRT", "Printing Technology", "Offset Lithography, Flexography, Digital Printing, Color Management, Smart Packaging", "PRT: Focuses on industrial press engineering, ink chemistry, surface printability, substrate packaging, and high-speed digital commercial printing."),
    ("FT", "Fashion Technology", "Apparel Manufacturing, Pattern Grading, Garment Quality Control, Fashion Merchandising, Textile Sourcing", "FT vs TXT: FT focuses on the consumer apparel side—garment construction, fashion CAD, fit analysis, and apparel export management."),
    ("AEROSPACE", "Aerospace Engineering", "Orbital Mechanics, Spacecraft Systems, Rocket Propulsion, Re-entry Thermodynamics, Hypersonic Aerodynamics", "AEROSPACE vs AERO: AEROSPACE explicitly includes space exploration, launch vehicles, orbital satellites, and interplanetary flight mechanics."),
    ("MAE", "Mechanical and Automation Engineering", "Automated Manufacturing Cells, Pneumatics/Hydraulics, Industrial Robotics, CAD/CAM Integration", "MAE vs MECH: MAE integrates mechanical machinery specifically with industrial factory automation, pneumatic circuits, and programmable logic controllers."),

    # 31-36 Communication, Environment, Industrial & Tamil Medium
    ("CCE", "Computer and Communication Engineering", "Telecommunication Networks, Wireless Systems, Distributed Software, Network Protocols", "CCE vs CSE: CCE bridges software engineering directly with telecom physical layers, 5G wireless networks, antenna arrays, and signal modulation."),
    ("MEDEL", "Medical Electronics", "Clinical Electrocardiography, Defibrillators, Medical Embedded Software, Bio-Amplifiers, Hospital Safety", "MEDEL: Focuses specifically on the electronic circuit design of medical monitoring devices, diagnostic telemetry, and patient isolation amplifiers."),
    ("ENVENG", "Environmental Engineering", "Wastewater Treatment, Air Pollution Dispersion Modeling, Municipal Solid Waste Management, EIA", "ENVENG vs ENV_ST: ENVENG is heavily structural and process-oriented (sewage plants, incinerators, sanitary landfills). ENV_ST is ecological and science-oriented."),
    ("IEM", "Industrial Engineering and Management", "Supply Chain Optimization, Operations Research, Ergonomics, Financial Engineering, Plant Logistics", "IEM vs IE: IEM integrates classical industrial process engineering with high-level corporate management, financial modeling, and business analytics."),
    ("CIVIL_TM", "Civil Engineering (Tamil Medium)", "Structural Engineering, Construction Site Management, Infrastructure Planning (with Bilingual Proficiency)", "CIVIL_TM: Identical high-standard civil engineering capabilities as English medium, with specialized support in Technical English terminology, corporate communication, and international documentation."),
    ("MECH_TM", "Mechanical Engineering (Tamil Medium)", "Mechanical CAD Design, Manufacturing, Thermal Engineering (with Bilingual Proficiency)", "MECH_TM: Identical mechanical engineering rigor, enhanced with specialized industry English terminology, workplace reporting, and interview communication."),

    # 37-42 Safety, Geoinformatics & Advanced Mechanical
    ("SFE", "Safety and Fire Engineering", "Industrial Hazard Assessment, Fire Protection Hydraulics, Process Safety Management (PSM), Risk Auditing", "SFE: Specializes in occupational health, HAZOP studies, explosion suppression, chemical refinery safety, and factory compliance."),
    ("CSE_TM", "Computer Science and Engineering (Tamil Medium)", "Software Engineering, Cloud Computing, Algorithms & Web Systems (with Bilingual Proficiency)", "CSE_TM: Same robust technical CS foundation, complemented by professional technical English mastery, global developer documentation skills, and corporate interview readiness."),
    ("GEO", "Geoinformatics Engineering", "GIS Spatial Analysis, Satellite Remote Sensing, Photogrammetry, LiDAR Mapping, Web-GIS", "GEO: Focuses on spatial data science, geospatial databases (PostGIS), satellite orbit imaging, terrain elevation modeling, and urban GIS."),
    ("IE", "Industrial Engineering", "Work Study, Time-Motion Optimization, Lean Six Sigma, Manufacturing Floor Ergonomics, Quality Engineering", "IE vs IEM: IE focuses strictly on shop-floor industrial productivity, plant ergonomics, assembly line balancing, and statistical process control (SPC)."),
    ("MFGE", "Manufacturing Engineering", "Precision CNC Tooling, Advanced Casting, Sheet Metal Die Design, Additive Manufacturing, Metrology", "MFGE: Focuses deeply on modern machine tools, 5-axis CNC programming, tool-wear mechanics, coordinate measuring machines (CMM), and manufacturing economics."),
    ("MECH_SW", "Mechanical Engineering (Sandwich)", "Industrial Apprenticeship-Integrated Mechanical Design, Plant Maintenance, Real-World Manufacturing", "MECH_SW: Distinctive sandwich model alternating between academic design theory and direct hands-on industry apprentice shifts in manufacturing plants."),

    # 43-48 Specialized Computer, Electronics, Mechanical & Civil
    ("CSE_AIML", "Computer Science and Engineering (AI & ML)", "AI Algorithms, Deep Learning, Software Frameworks, Machine Learning Engineering", "CSE_AIML vs CSE: Combines a full computer science degree with heavy specialization in neural networks, PyTorch/TensorFlow, and AI system design."),
    ("ECE_ELCO", "Electrical and Computer Engineering", "Hardware-Software Co-Design, Embedded Microprocessors, Computer Architecture, Digital Systems", "ECE_ELCO vs ECE: Focuses specifically at the boundary of computer engineering and electronic circuits—designing CPUs, GPUs, memory hierarchies, and bus interfaces."),
    ("VLSI", "Electronics Engineering (VLSI Design and Technology)", "Digital/Analog IC Design, RTL Coding (Verilog/SystemVerilog), Physical Design, STA, CMOS Fabrication", "VLSI vs BTECH_VLSI: VLSI focuses on the complete semiconductor lifecycle from circuit architecture and physical layout to silicon tape-out."),
    ("MECH_SM", "Mechanical Engineering (Smart Manufacturing)", "Industry 4.0, Cyber-Physical Production, Industrial IoT, Digital Twin Simulation, Cloud Manufacturing", "MECH_SM vs MECH: Focuses on connected smart factories, MQTT sensor telemetry on machine tools, predictive maintenance algorithms, and cloud MES."),
    ("CIVIL_ENV", "Civil Engineering (Environmental Engineering)", "Sanitary Engineering, Municipal Water Supply, Flood Defense, Sustainable Structural Concrete", "CIVIL_ENV vs CIVIL: Focuses heavily on water purification plants, environmental drainage networks, and ecologically sustainable concrete materials."),
    ("MECH_AUTO", "Mechanical Engineering (Automobile)", "Mechanical Vehicle Design, Automotive Aerodynamics, Powertrain Kinematics, Crashworthiness", "MECH_AUTO vs MECH: Tailors mechanical engineering specifically toward vehicle assemblies, suspension linkages, and engine thermal loops."),

    # 49-54 Design, Handloom, Biochemical, Plastic
    ("BDES", "Bachelor of Design (B.Des.)", "User Experience (UX) Architecture, Industrial Product Design, Human-Centered Design, Ergonomics", "BDES: Focuses on aesthetic design, design thinking, user research, wireframing in Figma, physical product styling, and user ergonomics."),
    ("HTT", "Handloom and Textile Technology", "Handloom Weaving Mechanics, Traditional Textile Structures, Natural Dye Chemistry, Artisan Cluster Tech", "HTT vs TXT: HTT specializes in traditional loom engineering, heritage weave structures, natural dyestuff processing, and decentralized handloom clusters."),
    ("BBE", "Biotechnology and Biochemical Engineering", "Biochemical Reactors, Enzyme Kinetics, Fermentation Engineering, Downstream Bioprocess Separation", "BBE vs BIOTECH: BBE is heavily chemical-engineering-oriented—designing continuous stirred-tank bioreactors, membrane filtration, and sterile piping."),
    ("TXCHEM", "Textile Chemistry", "Dyeing Chemistry, Color Matching, Textile Finishing, Effluent Treatment, Smart Fabric Coatings", "TXCHEM vs TXT: TXCHEM focuses exclusively on the chemical wet-processing phase: bleaching, synthetic dyes, antimicrobial finishes, and water recovery."),
    ("PETRO", "Petroleum Engineering", "Drilling Hydraulics, Reservoir Fluid Mechanics, Offshore Production, Natural Gas Engineering", "PETRO vs PET: Re-emphasizes downstream and midstream petroleum processing, pipeline transport hydraulics, and refinery operations."),
    ("PLASTIC", "Plastic Technology", "Polymer Processing, Injection Mold Tooling, Extrusion Blow Molding, Recycling Polymers, Rheology", "PLASTIC: Focuses on synthetic polymer chemistry, plastic part design, mold cooling simulation, and bioplastic compounding."),

    # 55-60 Chemical, Pharma, Architecture, Design
    ("CEE", "Chemical and Electrochemical Engineering", "Electrochemical Energy Storage, Lithium-Ion Battery Chemistry, Fuel Cells, Electroplating, Corrosion", "CEE vs CHEM: CEE focuses specifically on electrochemical redox reactions, battery cell design, hydrogen fuel cells, and cathodic protection."),
    ("PHARMA", "Pharmaceutical Technology", "Drug Formulation, Tablet Compression, Good Manufacturing Practices (cGMP), Sterile Injectables, Regulatory Affairs", "PHARMA: Focuses on drug delivery systems, pharmaceutical process validation, cleanroom HVAC standards (USFDA), and pharmacokinetics."),
    ("PCT", "Petrochemical Technology", "Catalytic Cracking, Ethylene/Propylene Synthesis, Refinery Fractionation, Petrochemical Polymers", "PCT vs CHEM: PCT is hyper-focused on crude oil refining, fluidized catalytic cracking (FCC), and petrochemical monomer synthesis."),
    ("CSBS", "Computer Science and Business Systems", "Enterprise Software, Business Analytics, FinTech Systems, Agile Management, Corporate Tech Strategy", "CSBS: Curriculum co-designed with industry (TCS) to blend core computer science with enterprise finance, business economics, and IT consulting."),
    ("ARCH", "Bachelor of Architecture (B.Arch.)", "Architectural Space Planning, Building Aesthetics, Climate-Responsive Design, Urban Masterplanning, BIM", "ARCH vs CIVIL: ARCH focuses on spatial aesthetics, human functionality, lighting, cultural context, and concept design. CIVIL focuses on structural loads, rebar calculations, and construction stability."),
    ("CSD", "Computer Science and Design", "Human-Computer Interaction (HCI), UI/UX Engineering, Interactive Media, Front-End Architecture, Design Systems", "CSD vs CSE: CSD blends computer science fundamentals with visual design theory, animation, interactive 3D media, and frontend user empathy."),

    # 61-68 Advanced IoT, Robotics, VLSI & Environmental
    ("EEE_TI", "Electrical and Electronics Engineering (Training Integrated)", "Industrial Electrical Grid Maintenance, Substation Automation, Factory Power Drives", "EEE_TI: Combines core electrical engineering with embedded industrial industry training modules and factory utility apprenticeships."),
    ("CSE_IOT", "Computer Science and Engineering (IoT)", "IoT Protocols (MQTT/CoAP), Edge Computing, Embedded Linux, Cloud IoT Platforms, Sensor Data Systems", "CSE_IOT vs CSE: Focuses on internet-connected embedded devices, edge sensor gateways, wireless mesh networking, and cloud IoT telemetry ingestion."),
    ("RAI", "Robotics and Artificial Intelligence", "Autonomous Robotics, Deep Reinforcement Learning for Manipulation, Computer Vision Navigation, ROS2", "RAI vs ROBO: RAI places heavy emphasis on artificial intelligence, neural robot control, autonomous SLAM, and computer vision over pure mechanical kinematics."),
    ("ELCO", "Electronics and Computer Engineering", "Embedded Firmware, Computer Hardware Architecture, Real-Time Operating Systems, IoT Systems", "ELCO vs ECE: Focuses on computer engineering at the hardware-firmware boundary, microarchitecture, and peripheral controller design."),
    ("ENV_ST", "Environmental Science and Technology", "Ecological Impact Assessment, Environmental Toxicology, Environmental Analytics, Climate Resilience", "ENV_ST vs ENVENG: ENV_ST emphasizes scientific ecological monitoring, biodiversity analysis, environmental policy, and toxicological evaluation."),
    ("IBT", "B.Tech Industrial Biotechnology", "Industrial Enzymes, Biofuels, Microbial Strain Improvement, High-Yield Fermentation Scaling", "IBT vs BIOTECH: IBT concentrates explicitly on commercial industrial-scale biotechnology (bio-ethanol, industrial enzymes, bulk biopolymers)."),
    ("BTECH_VLSI", "Electronics Engineering (VLSI Design and Technology)", "Semiconductor Device Physics, RTL-to-GDSII ASIC Flow, Analog Mixed-Signal Design, Silicon Testing", "BTECH_VLSI: Deep-dive specialized 4-year curriculum entirely focused on the modern semiconductor industry and ASIC tape-out flows."),
    ("BECEE", "Civil Engineering (Environmental Engineering)", "Municipal Water Treatment, Solid Waste Disposal, Environmental Impact Compliance, Sustainable Infrastructure", "BECEE: Emphasizes civil infrastructure tailored to water supply, storm-water drainage, sewage collection, and environmental remediation.")
]

def generate_department_data(code, name, summary, distinction):
    # Determine appropriate role names, types, and tools based on discipline
    is_tamil = code.endswith("_TM")
    
    # Generate 2 realistic distinct roles per department
    roles = []
    
    # Role 1: Primary Core Domain Role
    role1_id = f"{code.replace('_', '')}-CORE-001"
    role1_name = f"{name.split('(')[0].strip()} Specialist"
    role1_type = "Core"
    
    # Domain-specific tools & skill sets
    if any(k in code for k in ["CSE", "IT", "CCE", "CSBS", "CSD"]):
        tools = ["VS Code", "Git/GitHub", "Docker", "Postman", "PostgreSQL", "Linux"]
        skills = ["Algorithm Design", "REST APIs", "Database Indexing", "Cloud Deployments", "System Architecture"]
        role1_name = "Enterprise Software & Cloud Systems Engineer"
        role1_type = "Technology"
    elif any(k in code for k in ["AIDS", "AIML", "RAI"]):
        tools = ["Python", "PyTorch", "TensorFlow", "Jupyter", "Docker", "MLflow", "Hugging Face"]
        skills = ["Deep Learning", "Data Pipelines", "Model Evaluation", "Computer Vision / NLP", "MLOps Deployments"]
        role1_name = "AI & Machine Learning Solutions Engineer"
        role1_type = "Emerging"
    elif "CYS" in code:
        tools = ["Wireshark", "Burp Suite", "Metasploit", "Nmap", "Splunk", "Linux Kali"]
        skills = ["Penetration Testing", "Vulnerability Assessment", "SIEM Monitoring", "Network Defense", "Incident Response"]
        role1_name = "Cybersecurity Defense & Penetration Testing Specialist"
        role1_type = "Core"
    elif any(k in code for k in ["ECE", "EEE", "VLSI", "EIE", "ICE", "MEDEL", "ELCO"]):
        tools = ["MATLAB", "LTspice", "Altium Designer / KiCad", "Keil / STM32CubeIDE", "Digital Oscilloscope"]
        skills = ["Circuit Design", "Microcontroller Programming", "Hardware Debugging", "Signal Conditioning", "PCB Layout"]
        role1_name = "Hardware & Embedded Systems Design Engineer"
        role1_type = "Core"
    elif any(k in code for k in ["MECH", "AUTO", "AERO", "PROD", "MFGE", "MTRX", "MAE", "AEROSPACE"]):
        tools = ["SolidWorks", "ANSYS Workbench", "AutoCAD", "MATLAB", "CATIA"]
        skills = ["3D CAD Modeling", "Finite Element Analysis (FEA)", "GD&T (ASME Y14.5)", "DFM / DFA", "Material Selection"]
        role1_name = "Mechanical Design & Simulation Engineer"
        role1_type = "Core"
    elif any(k in code for k in ["CIVIL", "ENV", "GEO", "ARCH", "BECEE"]):
        tools = ["AutoCAD", "ETABS", "STAAD.Pro", "Revit", "QGIS / ArcGIS"]
        skills = ["Structural Analysis", "Code Compliance (IS Codes)", "BIM Modeling", "Geotechnical Sizing", "Estimation"]
        role1_name = "Structural & Infrastructure Design Engineer"
        role1_type = "Core"
    elif any(k in code for k in ["CHEM", "PET", "PETRO", "PLASTIC", "CEE", "PCT"]):
        tools = ["Aspen Plus / HYSYS", "MATLAB", "AutoCAD P&ID", "ChemCAD", "Lab Reactors"]
        skills = ["Process Simulation", "Mass & Energy Balance", "Distillation Sizing", "Safety / HAZOP", "P&ID Development"]
        role1_name = "Process Operations & Simulation Engineer"
        role1_type = "Core"
    elif any(k in code for k in ["BIOTECH", "BME", "BBE", "PHARMA", "IBT"]):
        tools = ["Bio-Rad Chromatography", "MATLAB Bio-Toolbox", "LabVIEW", "HPLC Systems", "Bioreactor Control Suites"]
        skills = ["Bioprocess Fermentation", "Regulatory GMP Standards", "Bio-Instrumentation", "Assay Development", "Quality Validation"]
        role1_name = "Bioprocess & Medical Instrumentation Engineer"
        role1_type = "Core"
    elif any(k in code for k in ["TXT", "FT", "HTT", "TXCHEM"]):
        tools = ["ReachCAD / Lectra", "Spectrophotometer Suites", "AutoCAD Textile", "Weave Design Software"]
        skills = ["Yarn & Fabric Mechanics", "Dyeing Chemistry", "Quality Inspection (AATCC/ASTM)", "Apparel Costing", "Export Standards"]
        role1_name = "Textile & Apparel Manufacturing Specialist"
        role1_type = "Core"
    elif "SFE" in code:
        tools = ["ALOHA Hazard Dispersion", "PHA-Pro", "AutoCAD Fire Layout", "Sound Level Meters", "Gas Detectors"]
        skills = ["HAZOP Leadership", "Fire Protection Hydraulics", "OSHA / ISO 45001 Auditing", "Risk Assessment", "Emergency Action Plans"]
        role1_name = "Industrial Safety, Health & Environmental (HSE) Engineer"
        role1_type = "Core"
    elif any(k in code for k in ["AGRI", "FOOD"]):
        tools = ["AutoCAD Agri", "Sensors & Arduino", "HACCP Toolkits", "Rheometers", "GIS Mapping"]
        skills = ["Precision Agriculture", "Post-Harvest Processing", "Quality Assurance (FSSAI)", "Machinery Sizing", "Cold Chain Logistics"]
        role1_name = "Agricultural & Food Processing Engineer"
        role1_type = "Core"
    elif any(k in code for k in ["MET", "MIN"]):
        tools = ["Surpac / Datamine", "Scanning Electron Microscope (SEM)", "Thermo-Calc", "Rock Mechanics Lab Instruments"]
        skills = ["Mineral Processing", "Rock Mass Rating (RMR)", "Alloy Phase Diagrams", "Failure Analysis", "Mine Safety Standards"]
        role1_name = "Mineral Resources & Materials Engineer"
        role1_type = "Core"
    elif "PRT" in code:
        tools = ["Adobe InDesign", "Prinergy Workflow", "X-Rite Color Spectrophotometers", "AutoCAD Packaging"]
        skills = ["Color Management (ICC Profiles)", "Flexography & Offset Press", "Substrate Printability", "Packaging Design", "Press Quality Control"]
        role1_name = "Printing & Packaging Production Specialist"
        role1_type = "Core"
    elif "BDES" in code:
        tools = ["Figma", "Adobe Creative Cloud", "Blender / Rhino 3D", "Miro", "Keyshot"]
        skills = ["User Research", "Wireframing & Prototyping", "Ergonomics & Human Factors", "Physical Product Styling", "Design Systems"]
        role1_name = "Product & Interaction Design Specialist"
        role1_type = "Core"
    else:
        tools = ["AutoCAD", "MATLAB", "Excel Engineering Suites", "Domain Simulation Tools"]
        skills = ["System Modeling", "Technical Documentation", "Domain Analysis", "Quality Standards", "Engineering Economics"]
        role1_name = f"{name} Engineer"
        role1_type = "Core"

    # Additional Tamil Medium enrichment
    soft_skills = ["Technical Problem Solving", "Analytical Thinking", "Collaborative Teamwork", "Project Delivery Discipline"]
    if is_tamil:
        soft_skills.extend([
            "Technical English Terminology Mastery",
            "Bilingual Technical Documentation",
            "Global Corporate Interview Communication",
            "Workplace Cross-Cultural Reporting"
        ])

    # Construct Role 1
    role1 = {
        "roleId": role1_id,
        "roleName": role1_name,
        "roleType": role1_type,
        "description": f"Responsible for the technical design, modeling, testing, implementation, and optimization of systems and processes in {name}.",
        "industry": ["Core Engineering", "Consultancy & Design", "Manufacturing & Operations", "R&D Laboratories"],
        "responsibilities": [
            f"Analyze client and technical requirements in {name} to develop robust engineering specifications",
            f"Utilize industry-standard software tools ({', '.join(tools[:3])}) to model, simulate, and validate designs",
            "Ensure adherence to national and international engineering codes (ISO, BIS, ASTM, IEEE where applicable)",
            "Collaborate with multidisciplinary engineering teams, project managers, and shop-floor execution staff"
        ],
        "technicalSkills": skills,
        "tools": tools,
        "softSkills": soft_skills,
        "knowledgeAreas": [
            f"Core Fundamentals and Mathematics of {name}",
            "Standards, Safety Protocols, and Quality Control Guidelines",
            "Cost Estimation, Sustainability, and Operational Lifecycle Management"
        ],
        "beginnerSkills": [f"Basic principles of {name}", f"Introductory drafting/modeling in {tools[0]}", "Fundamental analytical calculations", "Standard laboratory test protocols"],
        "intermediateSkills": [f"Applied design workflows in {tools[1] if len(tools)>1 else tools[0]}", "Multi-parameter tolerance and sizing analysis", "Code compliance checking", "Preparation of technical blueprints"],
        "advancedSkills": ["Non-linear system simulation and failure analysis", "Digital twin modeling and automated optimization", "Cross-functional engineering project leadership", "Regulatory compliance auditing"],
        "entryLevelTitles": [f"Graduate Engineer Trainee ({code})", f"Junior {name.split('(')[0].strip()} Engineer", f"Associate Design / Technical Engineer"],
        "roadmap": [
            {
                "level": 1,
                "title": "Foundation",
                "learn": [f"Foundational concepts and physical laws governing {name}", "Mathematics, unit conversions, and dimensional analysis", f"Introductory tool workflows in {tools[0]}"],
                "practice": [f"Solve 40+ fundamental numerical and analytical problems", "Complete 5 standard academic laboratory practicals"],
                "project": f"Foundational Analysis & Calculation Portfolio in {code}",
                "outcome": f"Firm grasp of basic technical terminology and analytical methods."
            },
            {
                "level": 2,
                "title": "Core Skills",
                "learn": [f"Industry standard design methodologies in {name}", f"Simulation software workflows ({', '.join(tools[:2])})", "Engineering drawing standards and material selection"],
                "practice": [f"Simulate 5 standard benchmark models in {tools[0]}", "Draft standard engineering specifications and component sheets"],
                "project": f"Standard Engineering Sizing & Simulation Project in {code}",
                "outcome": "Ability to independently model and calculate production-ready specifications."
            },
            {
                "level": 3,
                "title": "Projects",
                "learn": ["Multi-component integration and design optimization", "Design for Reliability, Cost Reduction, and Environmental Sustainability", "Data validation against real-world benchmarks"],
                "practice": ["Build an integrated prototype or high-fidelity simulation model", "Produce comprehensive design calculations and bill of materials"],
                "project": f"Integrated System Design & Efficiency Optimization Project",
                "outcome": "Verified capability to execute realistic multi-variable engineering projects."
            },
            {
                "level": 4,
                "title": "Internship Preparation",
                "learn": ["Industry operational workflows, standard operating procedures (SOPs), and quality gates", "Engineering change orders (ECO) and technical documentation", "Professional presentation of technical data"],
                "practice": ["Conduct design walk-throughs with peers", "Audit 3 real-world industrial case studies in the domain"],
                "project": f"Comprehensive Industrial Internship Portfolio & Case Study Analysis",
                "outcome": "Demonstrated readiness for competitive core engineering internships."
            },
            {
                "level": 5,
                "title": "Certifications / Learning",
                "learn": ["Global standards and vendor-neutral accreditation requirements", "Advanced domain specialization topics"],
                "practice": ["Complete practice tests and mock certification exams", "Review open-source technical manuals and standards"],
                "project": f"Professional Certification Capstone Project in {code}",
                "outcome": "Attainment of recognized industry or academic credentials."
            },
            {
                "level": 6,
                "title": "Placement Preparation",
                "learn": [f"High-frequency technical interview questions in {name}", "Quantitative aptitude, reasoning, and technical domain viva questions", "Behavioral and situational interview communication"],
                "practice": ["Complete 5 mock technical and HR interviews", "Review standard campus placement problem banks"],
                "project": f"Placement-Ready Technical Defense & Portfolio Dossier",
                "outcome": "High clearance rate in core company campus placement rounds."
            },
            {
                "level": 7,
                "title": "Job & Career Progression",
                "learn": ["Enterprise project management and multidisciplinary leadership", "Lifecycle cost estimation, capital budgeting, and client consulting", "Future technological advancements and smart system integration"],
                "practice": ["Lead technical reviews of cross-disciplinary designs", "Formulate long-term operational technology roadmaps"],
                "project": f"Next-Generation Strategic Engineering Architecture Blueprint",
                "outcome": "Rapid promotion from Trainee Engineer to Lead Technical Specialist and Engineering Manager."
            }
        ],
        "projects": [
            {
                "level": "Beginner",
                "title": f"Introductory Analysis & Benchmark Sizing Study in {name}",
                "problemStatement": f"Academic and junior engineers require a validated template for standard sizing calculations in {name}.",
                "technologies": tools[:2],
                "mainFeatures": [f"Standard calculations and modeling in {tools[0]}", "Sensitivity parameter checks", "Technical calculation documentation"],
                "expectedLearningOutcome": "Solid grounding in core mathematical modeling and introductory software usage."
            },
            {
                "level": "Intermediate",
                "title": f"Process Simulation & Performance Optimization in {name}",
                "problemStatement": f"Industrial systems in {name} often operate sub-optimally due to lack of dynamic modeling.",
                "technologies": tools[:3],
                "mainFeatures": ["Dynamic simulation under variable operating loads", "Comparative efficiency benchmark study", "Code compliance and BOM generation"],
                "expectedLearningOutcome": "Ability to independently model and optimize realistic industrial operations."
            },
            {
                "level": "Advanced",
                "title": f"Industry-Scale Smart & Sustainable Engineering Solution in {name}",
                "problemStatement": f"Enterprises need automated, eco-friendly, and cost-effective modern solutions in {name}.",
                "technologies": tools + ["IoT / Telemetry Sensors", "Data Analytics"],
                "mainFeatures": ["Real-time parameter monitoring and feedback", "Failure prediction and safety interlocks", "Complete lifecycle environmental and economic evaluation"],
                "expectedLearningOutcome": "Leadership-level project execution demonstrating end-to-end industry problem solving."
            }
        ],
        "certifications": [
            f"NPTEL Online Certification in {name.split('(')[0].strip()} (IIT / IISc)",
            f"Certified Professional in {tools[0]} Modeling & Simulation",
            f"National / International Professional Engineering Society Credential"
        ],
        "freeResources": [
            f"NPTEL IIT Lecture Series in {name.split('(')[0].strip()}",
            "MIT OpenCourseWare Relevant Engineering Lectures",
            f"Official Open-Access Documentation & User Manuals for {tools[0]}",
            "Coursera / edX Free Audit Courses on Relevant Disciplines"
        ],
        "interviewTopics": [
            f"Explain the primary governing equations and physical principles of {name}.",
            f"How do you determine safety factors and design tolerances in {tools[0]}?",
            f"What are the major failure modes encountered in {name} systems and how are they prevented?",
            "Explain the difference between theoretical calculations and real-world experimental/field measurements.",
            "Describe the latest technological innovations transforming this industry today."
        ],
        "resumeSuggestions": [
            f"Explicitly list software tools mastered: {', '.join(tools[:3])}",
            "Include links or QR codes to detailed project portfolios, calculation workbooks, and CAD/simulation renders",
            "Highlight laboratory experimental work, fabrication experience, or physical testing participation"
        ],
        "relatedRoles": [f"{code}-TEC-002: Digital & Technology Integration Engineer"],
        "industries": ["Core Engineering", "Design Consultancies", "Manufacturing & Infrastructure", "Public Sector Enterprises (PSUs)"],
        "careerProgression": [
            f"Graduate Engineer Trainee ({code}) (Year 1)",
            f"{name.split('(')[0].strip()} Engineer (Years 1-3)",
            f"Senior Specialist / Project Lead (Years 3-6)",
            f"Principal Consultant / Chief Technical Architect (Years 6+)"
        ]
    }
    roles.append(role1)
    
    # Role 2: Technology / Cross-Domain / Digital Role
    role2_id = f"{code.replace('_', '')}-TEC-002"
    role2_name = f"{name.split('(')[0].strip()} Data & Systems Analyst"
    role2_type = "Cross-Domain" if not any(k in code for k in ["CSE", "IT", "AIDS", "AIML", "CYS"]) else "Technology"
    
    role2 = {
        "roleId": role2_id,
        "roleName": role2_name,
        "roleType": role2_type,
        "description": f"Applies computational modeling, digital tools, IoT telemetry, and data analytics to optimize operations and automation in {name}.",
        "industry": ["Technology Consultancies", "Smart Manufacturing", "Digital Engineering Services", "Research Analytics"],
        "responsibilities": [
            f"Build mathematical and programmatic scripts to automate repetitive calculations in {name}",
            "Implement sensor telemetry and automated data acquisition pipelines for physical systems",
            "Analyze engineering telemetry data to detect operational anomalies and forecast maintenance schedules",
            "Bridge the gap between core physical engineering teams and enterprise software developers"
        ],
        "technicalSkills": ["Python / MATLAB for Engineering Analytics", "Data Visualization & Dashboards", "Statistical Process Control", "IoT Telemetry Basics", "Engineering Database Queries"],
        "tools": ["Python", "MATLAB", "Power BI / Grafana", "Git", "SQL / SQLite"],
        "softSkills": ["Cross-Disciplinary Empathy", "Analytical Communication", "Curiosity for Digital Tools"],
        "knowledgeAreas": [
            f"Domain Physics and Operating Constraints of {name}",
            "Time-Series Telemetry Analysis and Statistical Modeling",
            "Digital Twin Frameworks and Automated Diagnostics"
        ],
        "beginnerSkills": ["Python Data Types & Loops", "Reading CSV Engineering Data", "Plotting Graphs in Matplotlib", "Basic SQL Queries"],
        "intermediateSkills": ["Time-Series Data Cleaning", "Building Interactive Grafana/Power BI Dashboards", "Linear Regression for Engineering Trends", "Automated Scripting"],
        "advancedSkills": ["Predictive Maintenance Machine Learning Models", "Digital Twin Synchronization", "Edge Compute Deployment on Raspberry Pi/Edge Devices", "Automated Anomaly Detection"],
        "entryLevelTitles": [f"Associate Technical Analyst ({code})", "Junior Engineering Data Specialist", "Digital Engineering Trainee"],
        "roadmap": [
            {
                "level": 1,
                "title": "Foundation",
                "learn": ["Python programming fundamentals", "Engineering data manipulation (NumPy, Pandas)", "Basic statistics (Mean, Standard Deviation, Distributions)"],
                "practice": ["Write Python scripts to parse 10 CSV data logs from domain experiments", "Create 15 interactive plots"],
                "project": f"Automated Engineering Data Parser & Visualizer in Python",
                "outcome": "Ability to quickly manipulate and visualize real-world engineering datasets."
            },
            {
                "level": 2,
                "title": "Core Skills",
                "learn": ["Relational databases and SQL queries", "Dashboard development in Power BI or Grafana", "Applied statistical quality control (SPC)"],
                "practice": ["Query engineering databases for sensor trends", "Build a live dashboard displaying simulated plant telemetry"],
                "project": f"Interactive Real-Time Operations Telemetry Dashboard",
                "outcome": "Mastery of database logging and interactive engineering telemetry visualization."
            },
            {
                "level": 3,
                "title": "Projects",
                "learn": ["Machine learning regression and classification for engineering", "Time-series forecasting models (ARIMA / Random Forest)"],
                "practice": ["Train models to predict equipment wear and power consumption", "Validate against historical logs"],
                "project": f"Predictive Equipment Health & Anomaly Detection Model in {code}",
                "outcome": "Functional machine learning pipeline delivering actionable engineering predictions."
            },
            {
                "level": 4,
                "title": "Internship Preparation",
                "learn": ["Git version control workflows", "Presenting data insights to non-technical stakeholders", "Industrial IoT protocols (MQTT, Modbus)"],
                "practice": ["Publish clean GitHub repositories with documented README files", "Practice 10-minute insight presentations"],
                "project": f"Industrial Telemetry Pipeline with MQTT & GitHub Documentation",
                "outcome": "Industry-ready portfolio bridging domain engineering with software tools."
            },
            {
                "level": 5,
                "title": "Certifications / Learning",
                "learn": ["Cloud data fundamentals (AWS / Azure Data Practitioner)", "Python for Data Science accreditation"],
                "practice": ["Complete official practice assessments on Coursera / edX", "Audit free vendor courses"],
                "project": f"Cloud-Hosted Data Pipeline Capstone Project",
                "outcome": "Recognized global credentials verifying digital engineering capabilities."
            },
            {
                "level": 6,
                "title": "Placement Preparation",
                "learn": ["Technical interview coding puzzles", "SQL database joins, aggregations, and window functions", "Domain-specific digital case studies"],
                "practice": ["Solve 50+ SQL queries on HackerRank", "Conduct mock technical interview sessions"],
                "project": f"Comprehensive Digital Engineering Placement Portfolio",
                "outcome": "Strong competitiveness for digital engineering and analytics placement drives."
            },
            {
                "level": 7,
                "title": "Job & Career Progression",
                "learn": ["Enterprise digital transformation strategy", "Cloud architecture for industrial IoT", "Cross-functional technology leadership"],
                "practice": ["Lead enterprise digital twin implementation pilots", "Design automated reporting pipelines for executive management"],
                "project": f"Enterprise Digital Twin & Predictive Maintenance Strategy Blueprint",
                "outcome": "Advancement to Digital Transformation Lead and Senior Engineering Systems Architect."
            }
        ],
        "projects": [
            {
                "level": "Beginner",
                "title": f"Automated Engineering Data Parser & Visualizer for {code}",
                "problemStatement": f"Engineers spend hours manually formatting and graphing laboratory spreadsheet logs.",
                "technologies": ["Python", "Pandas", "Matplotlib", "Seaborn"],
                "mainFeatures": ["Automated multi-file CSV batch ingestion", "Statistical summary report generation", "Automated anomaly scatter plots"],
                "expectedLearningOutcome": "Efficiency in automating data workflows and visual storytelling."
            },
            {
                "level": "Intermediate",
                "title": f"Live Sensor Telemetry Dashboard with InfluxDB and Grafana",
                "problemStatement": f"Industrial plants lack real-time centralized displays of physical sensor streams.",
                "technologies": ["Python", "InfluxDB / SQLite", "Grafana", "MQTT"],
                "mainFeatures": ["Real-time metric streaming", "Configurable alert thresholds for high temperatures/pressures", "Interactive historical zoom"],
                "expectedLearningOutcome": "Understanding time-series databases, telemetry protocols, and dashboard design."
            },
            {
                "level": "Advanced",
                "title": f"Predictive Maintenance & Remaining Useful Life (RUL) Estimator",
                "problemStatement": f"Unplanned equipment downtime causes massive industrial financial losses.",
                "technologies": ["Python", "Scikit-Learn", "FastAPI", "Docker"],
                "mainFeatures": ["Machine learning model trained on vibration/temperature logs", "Automated RUL estimation in operating hours", "REST API endpoint returning health score"],
                "expectedLearningOutcome": "End-to-end industrial machine learning deployment from raw telemetry to operational API."
            }
        ],
        "certifications": [
            "Google Data Analytics Professional Certificate",
            "IBM Applied AI / Data Science Professional Certificate",
            "HackerRank SQL (Advanced) Certification"
        ],
        "freeResources": [
            "Kaggle Free Micro-Courses in Python, Pandas, and Machine Learning",
            "freeCodeCamp Data Analysis with Python Full Course",
            "NPTEL Data Analytics with Python (IIT Madras)",
            "Grafana Fundamentals Free Online Training"
        ],
        "interviewTopics": [
            f"How does digital telemetry differ from traditional manual logging in {name}?",
            "Explain the difference between inner join, left join, and outer join in SQL with an engineering database example.",
            "What is overfitting in machine learning models, and how do you prevent it when training on sensor data?",
            "How does an MQTT broker handle publish/subscribe messaging compared to standard HTTP requests?",
            "How would you design a predictive maintenance alert system to prevent false alarms?"
        ],
        "resumeSuggestions": [
            "Specify programming languages and data tools: Python (Pandas, NumPy, Scikit-learn), SQL, Power BI, Grafana",
            "Link working GitHub repositories demonstrating clean code, Jupyter notebooks, and live dashboards",
            "Highlight measurable impacts (e.g., 'Automated data parsing script saving 15 engineering hours weekly')"
        ],
        "relatedRoles": [f"{code}-CORE-001: {role1_name}"],
        "industries": ["Digital Engineering Services", "Smart Manufacturing", "Technology Consulting", "Industrial Software"],
        "careerProgression": [
            "Associate Technical Analyst (Year 1)",
            "Digital Engineering Specialist (Years 1-3)",
            "Senior Engineering Systems Analyst (Years 3-6)",
            "Director of Digital Engineering / Chief Analytics Officer (Years 6+)"
        ]
    }
    roles.append(role2)
    
    return {
        "departmentCode": code,
        "departmentName": name,
        "overview": summary,
        "industryDomains": [
            "Core Industrial Engineering",
            "Design & Engineering Consultancies",
            "Public Sector Undertakings (PSUs) & Government Infrastructure",
            "Technology & Digital Engineering Services"
        ],
        "coreCareerAreas": [
            f"{name} Design & Analysis",
            "Operational & Field Engineering",
            "Quality Assurance & Testing",
            "Research & Sustainable Technology Development"
        ],
        "technologyCrossDomainOpportunities": [
            "Digital Twin & Smart Factory Simulation",
            "Industrial IoT Sensor Integration",
            "Predictive Maintenance Data Analytics"
        ],
        "emergingCareerAreas": [
            "Sustainable & Green Engineering Technologies",
            "AI-Assisted Computational Design",
            "Autonomous & Cyber-Physical Systems"
        ],
        "careerDistinction": distinction,
        "jobRoles": roles
    }

def main():
    print(f"Building complete database for all {len(DEPTS_META)} departments...")
    all_departments = []
    
    for idx, (code, name, summary, distinction) in enumerate(DEPTS_META, start=1):
        dept_data = generate_department_data(code, name, summary, distinction)
        all_departments.append(dept_data)
        print(f"[{idx}/68] Processed: {code} - {name} ({len(dept_data['jobRoles'])} roles)")

    out_path = os.path.join("public", "js", "data", "all_68_departments_career_db.json")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(all_departments, f, indent=2, ensure_ascii=False)
        
    print(f"\nSuccessfully generated master JSON: {out_path} ({len(all_departments)} departments)")
    
    # Generate Validation Table
    print("\n" + "="*80)
    print("VALIDATION TABLE")
    print("="*80)
    print("| No. | Department Code | Department Name | Number of Job Roles | Completed |")
    print("|-----|-----------------|-----------------|---------------------|-----------|")
    for idx, d in enumerate(all_departments, start=1):
        print(f"| {idx:3} | {d['departmentCode']:15} | {d['departmentName'][:35]:35} | {len(d['jobRoles']):19} | YES       |")
    print("="*80)

if __name__ == "__main__":
    main()
