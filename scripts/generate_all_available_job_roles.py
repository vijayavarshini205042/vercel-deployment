#!/usr/bin/env python3
"""
DRMS — Comprehensive Generator for ALL Available Job Roles across All 68 Departments.
Generates 4 to 6 realistic, department-specific roles per department.
Outputs:
  - public/js/data/all_68_departments_career_db.json
  - Updates public/js/data/careerData.js
"""

import json
import os

# Complete master catalog of 68 departments
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

# Dedicated Role Blueprints for Core Departments
CORE_ROLE_DEFINITIONS = {
    "CSE": [
        ("SWE-001", "Software Development Engineer (SDE)", "Technology", "Builds, tests, and deploys high-performance backend microservices and enterprise software applications.", ["Java/C++", "DSA", "SQL/PostgreSQL", "REST APIs", "Docker"], ["VS Code", "Git", "IntelliJ", "Postman", "Docker", "Linux"]),
        ("FSD-002", "Full Stack Web Developer", "Technology", "Architects both intuitive web interfaces and scalable backend server logic with modern JavaScript/TypeScript frameworks.", ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"], ["VS Code", "React", "Node.js", "Postman", "Git"]),
        ("CLD-003", "Cloud & DevOps Engineer", "Technology", "Automates CI/CD deployment pipelines, provisions infrastructure as code, and manages containerized cloud environments.", ["AWS/Azure", "Docker", "Kubernetes", "Terraform", "CI/CD Actions"], ["AWS CLI", "Docker", "Kubernetes", "Terraform", "GitHub Actions"]),
        ("DAT-004", "Data Engineer & Pipeline Specialist", "Technology", "Designs robust batch and streaming ETL data pipelines, data warehouses, and distributed storage systems.", ["Python", "SQL", "Apache Spark", "Kafka", "Data Warehousing"], ["PySpark", "Kafka", "PostgreSQL", "Snowflake", "Docker"]),
        ("SYS-005", "Systems Software & Distributed Architect", "Core", "Designs low-level operating system modules, high-throughput network engines, and distributed concurrency systems.", ["C/C++", "OS Internals", "POSIX Sockets", "Concurrency/Multithreading", "Memory Management"], ["GCC", "GDB", "Valgrind", "Linux Kernel Tools", "Make"])
    ],
    "IT": [
        ("CLD-001", "Cloud Infrastructure Solutions Architect", "Technology", "Designs, deploys, and optimizes enterprise public and hybrid cloud environments with 99.99% availability.", ["AWS/Azure Cloud", "VPC Networking", "Terraform", "IAM Security", "Bash Scripting"], ["AWS Console", "Terraform", "Ansible", "Linux CLI", "CloudWatch"]),
        ("SYS-002", "Enterprise Systems & Network Administrator", "Core", "Administers physical and virtual server infrastructure, directory services (Active Directory), and LAN/WAN routing.", ["Linux/Windows Server", "Active Directory", "Cisco Routing/Switching", "Firewall Configuration", "Bash/PowerShell"], ["Wireshark", "Cisco Packet Tracer", "RHEL", "PowerShell", "VMware"]),
        ("DBA-003", "Database Administrator (DBA) & Architect", "Core", "Manages database clustering, replication, high-availability disaster recovery, and query query performance tuning.", ["PostgreSQL/MySQL", "Database Sharding", "Backup & Recovery", "Indexing Optimization", "NoSQL (MongoDB)"], ["pgAdmin", "MySQL Workbench", "Redis", "Prometheus", "DBeaver"]),
        ("SRE-004", "Site Reliability Engineer (SRE)", "Technology", "Combines software engineering with system operations to automate incident response and maintain corporate SLAs.", ["Python/Go", "Prometheus & Grafana", "Incident Post-Mortems", "Chaos Engineering", "Kubernetes"], ["Grafana", "Prometheus", "PagerDuty", "Docker", "Git"]),
        ("SEC-005", "IT Service Operations & Support Specialist", "Operations", "Maintains corporate IT service management (ITSM), user access management, hardware lifecycle, and ITIL workflows.", ["ITIL v4 Framework", "Jira Service Management", "Hardware Diagnostics", "Remote Administration", "SLA Tracking"], ["Jira", "ServiceNow", "TeamViewer", "Active Directory", "Excel"])
    ],
    "ECE": [
        ("EMB-001", "Embedded Systems & Firmware Engineer", "Core", "Writes bare-metal and RTOS firmware in C/C++ for microcontrollers powering automotive, consumer, and industrial devices.", ["Embedded C/C++", "ARM Cortex-M", "FreeRTOS", "SPI/I2C/UART/CAN", "Oscilloscopes"], ["Keil uVision", "STM32CubeIDE", "Saleae Logic Analyzer", "DSO", "Git"]),
        ("VLS-002", "VLSI Design & Verification Engineer (RTL)", "Core", "Implements digital logic architectures in Verilog/SystemVerilog, writes UVM testbenches, and performs static timing analysis.", ["Verilog / SystemVerilog", "UVM Methodology", "Static Timing Analysis (STA)", "Digital Logic Synthesis", "FPGA Prototyping"], ["Xilinx Vivado", "ModelSim / Questa", "Synopsys Design Compiler", "Cadence Virtuoso"]),
        ("RFC-003", "RF & Wireless Communication Engineer", "Core", "Simulates and tests high-frequency antenna arrays, RF front-ends, microwave circuits, and 5G transceiver modules.", ["Electromagnetic Simulation", "Antenna Design", "Impedance Matching", "5G/LTE PHY Standards", "Spectrum Analyzers"], ["ANSYS HFSS", "Keysight ADS", "Vector Network Analyzer (VNA)", "MATLAB RF Toolbox"]),
        ("IOT-004", "IoT Hardware & PCB Design Engineer", "Technology", "Designs multi-layer printed circuit boards (PCBs), selects low-power components, and ensures EMC compliance.", ["Schematic Capture", "Multi-Layer PCB Layout", "Component Sourcing", "EMC / EMI Compliance", "DFM for Assembly"], ["Altium Designer", "KiCad", "Eagle PCB", "Gerber Viewers", "Thermal Benches"]),
        ("DSP-005", "Digital Signal Processing (DSP) Engineer", "Technology", "Develops real-time audio, speech, radar, and biosignal processing algorithms deployed on DSP chips and edge devices.", ["MATLAB / Simulink", "Digital Filters (FIR/IIR)", "Fast Fourier Transforms (FFT)", "C/C++ DSP Libraries", "Fixed-Point Math"], ["MATLAB", "TI Code Composer Studio", "Simulink", "Python SciPy"])
    ],
    "EEE": [
        ("PWR-001", "Power Electronics & EV Powertrain Engineer", "Core", "Designs DC-DC converters, motor inverters, and battery management systems (BMS) for electric vehicles and clean energy.", ["Power Converter Topologies", "SiC / GaN MOSFETs", "Inverter Motor Control (FOC)", "BMS Cell Balancing", "Thermal Management"], ["MATLAB / Simulink", "PLECS", "LTspice", "Altium Designer", "Power Analyzers"]),
        ("GRD-002", "Smart Grid & Power Systems Transmission Engineer", "Core", "Models high-voltage electrical grids, substation load flows, short-circuit faults, and transmission line stability.", ["Load Flow Analysis", "Symmetrical Fault Calculations", "Relay Protection Schemes", "High-Voltage Switchgear", "SCADA Integration"], ["ETAP", "PowerWorld Simulator", "PSS/E", "AutoCAD Electrical", "MATLAB"]),
        ("AUT-003", "Industrial Automation & PLC / SCADA Engineer", "Operations", "Programs programmable logic controllers (PLCs), Human-Machine Interfaces (HMIs), and industrial fieldbuses in manufacturing plants.", ["PLC Ladder Logic", "SCADA Architecture", "VFD Motor Drives", "Industrial Ethernet / Modbus", "Instrumentation Loops"], ["Siemens TIA Portal", "Allen-Bradley RSLogix", "Wonderware", "AutoCAD Electrical"]),
        ("MNT-004", "Electrical Maintenance & Substation Protection Engineer", "Operations", "Performs preventive maintenance, relay testing, transformer dielectric oil testing, and industrial safety compliance.", ["Protective Relay Coordination", "Transformer Testing", "Circuit Breakers (SF6/Vacuum)", "Earthing / Grounding Design", "Electrical Safety (NFPA 70E)"], ["Megger Insulation Testers", "Relay Test Kits", "Thermal Imagers", "Excel Maintenance Logs"]),
        ("REN-005", "Renewable Energy (Solar & Wind) Systems Engineer", "Emerging", "Performs solar PV plant sizing, wind turbine yield assessment, microgrid storage integration, and grid interconnection studies.", ["Solar PV Sizing", "Inverter Grid Synchronization", "Battery Energy Storage (BESS)", "Yield Simulation", "Financial Payback Modeling"], ["PVsyst", "HOMER Pro", "HelioScope", "MATLAB", "AutoCAD"])
    ],
    "MECH": [
        ("CAD-001", "Mechanical Design Engineer (CAD/CAE)", "Core", "Transforms concepts into 3D CAD parametric models and generates manufacturing drawings with ASME Y14.5 GD&T.", ["Parametric 3D Solid Modeling", "GD&T (ASME Y14.5)", "Tolerance Stack-Up", "DFM / DFA", "Material Selection"], ["SolidWorks", "CATIA V5", "Autodesk Fusion 360", "AutoCAD", "PTC Creo"]),
        ("FEA-002", "Finite Element Analysis (FEA) & Structural CAE Specialist", "Core", "Conducts structural stress, dynamic modal, thermal, and fatigue life simulations to prevent mechanical field failure.", ["Static & Dynamic FEA", "Fatigue Life Prediction", "Non-Linear Material Mechanics", "Mesh Convergence Studies", "Vibration Analysis"], ["ANSYS Workbench", "HyperMesh", "Abaqus", "LS-DYNA", "SolidWorks Simulation"]),
        ("MFG-003", "Manufacturing & CNC Production Engineer", "Operations", "Develops precision CNC machining toolpaths, designs jigs and fixtures, and manages sheet metal/casting manufacturing lines.", ["CNC G-Code Programming", "Jig & Fixture Design", "Cutting Tool Geometry", "Sheet Metal & Die Casting", "Process Time Estimation"], ["Mastercam", "Siemens NX CAM", "SolidWorks CAM", "CNC Simulators", "Metrology Tools"]),
        ("QAC-004", "Quality Assurance & Metrology Engineer", "Quality", "Performs dimensional inspection with CMM machines, statistical process control (SPC), and audits Six Sigma quality levels.", ["Coordinate Measuring Machines (CMM)", "Statistical Process Control (SPC)", "PPAP & APQP Processes", "Six Sigma DMAIC", "Root Cause Analysis (8D)"], ["Minitab", "CMM PC-DMIS", "Optical Comparators", "Vernier/Micrometers", "Excel"]),
        ("THM-005", "HVAC, Thermal & Fluid Systems Engineer", "Core", "Designs heating, ventilation, air conditioning (HVAC) ductwork, heat exchangers, cooling towers, and pump piping circuits.", ["Psychrometric Calculations", "HVAC Cooling Load Sizing", "Heat Exchanger Design", "Piping Fluid Hydraulics", "Refrigeration Cycles"], ["Carrier HAP", "AutoCAD MEP", "ANSYS Fluent (CFD)", "Revit MEP", "CoolPack"]),
        ("REL-006", "Plant Reliability & Maintenance Engineer", "Operations", "Implements predictive vibration analysis, infrared thermography, lubrication schedules, and total productive maintenance (TPM).", ["Vibration Spectrum Analysis", "Total Productive Maintenance (TPM)", "Lubrication Engineering", "Failure Mode Effects Analysis (FMEA)", "Spare Parts Inventory"], ["Vibration Analyzers", "Thermal Cameras", "SAP PM Module", "Alignment Lasers", "CMMS Software"])
    ],
    "CIVIL": [
        ("STR-001", "Structural Design Engineer (RCC & Steel)", "Core", "Performs structural frame analysis, seismic/wind load calculations, and rebar reinforcement detailing conforming to BIS/ACI codes.", ["Structural Frame Analysis", "RCC Design (IS 456 / ACI 318)", "Steel Design (IS 800 / AISC)", "Earthquake Engineering (IS 1893)", "Bar Bending Schedules (BBS)"], ["ETABS", "STAAD.Pro", "AutoCAD", "CSI SAFE", "Revit Structure"]),
        ("SIT-002", "Construction Site Execution & Project Engineer", "Operations", "Supervises on-site RCC casting, formwork, scaffolding, labor productivity, material inventory, and safety compliance.", ["Site Execution Supervision", "Bar Placement Inspection", "Concrete Slump & Cube Testing", "Construction Sequencing", "Daily Progress Reporting (DPR)"], ["AutoCAD Mobile", "MS Project", "Total Station", "Leveling Instruments", "Excel"]),
        ("BIM-003", "Building Information Modeling (BIM) Coordinator", "Technology", "Builds multi-disciplinary 3D federated BIM models, executes clash detection, and links 4D scheduling and 5D cost data.", ["BIM Architectural/Structural Modeling", "Clash Detection & Resolution", "4D Construction Sequencing", "IFC Open Standards", "Revit Families Creation"], ["Autodesk Revit", "Navisworks Manage", "BIM 360", "AutoCAD", "Synchro 4D"]),
        ("GEO-004", "Geotechnical & Deep Foundation Engineer", "Core", "Evaluates soil borehole investigation data, calculates safe bearing capacity (SBC), and designs shallow and deep pile foundations.", ["Soil Mechanics Testing", "Borehole SPT Data Analysis", "Shallow & Pile Foundation Sizing", "Slope Stability & Retaining Walls", "Ground Improvement Techniques"], ["PLAXIS 2D", "GeoStudio", "SAFE", "Excel Calculation Sheets", "Soil Lab Kits"]),
        ("QNT-005", "Quantity Surveyor & Cost Estimation Engineer", "Operations", "Extracts quantities from blueprints, creates Bills of Quantities (BOQ), prepares contractor billing, and analyzes tender bids.", ["Quantity Take-Off (QTO)", "Bill of Quantities (BOQ) Preparation", "Rate Analysis (CPWD DSR)", "Contractor Interim Billing", "Tender Evaluation"], ["PlanSwift", "Microsoft Excel", "AutoCAD", "ERP Construction Systems", "CostX"]),
        ("TRN-006", "Transportation & Highway Infrastructure Engineer", "Core", "Designs geometric alignment of highways, flexible/rigid pavement layers, traffic capacity flows, and storm drainage culverts.", ["Highway Geometric Design (IRC Codes)", "Flexible/Rigid Pavement Sizing", "Traffic Volume Studies", "Culvert Drainage Sizing", "Road Safety Auditing"], ["Civil 3D", "Bentley OpenRoads", "MX Road", "AutoCAD", "VISSIM"])
    ],
    "AIDS": [
        ("DAT-001", "Big Data Platforms & Pipeline Engineer", "Technology", "Constructs distributed big data pipelines, batch/streaming ETL workflows, and lakehouse storage platforms.", ["Apache Spark / PySpark", "Hadoop Distributed File System", "Kafka Real-Time Streaming", "Data Warehousing (Snowflake/BigQuery)", "SQL Data Modeling"], ["PySpark", "Apache Kafka", "Docker", "PostgreSQL", "Airflow"]),
        ("DSE-002", "Data Scientist & Predictive Modeling Specialist", "Technology", "Extracts actionable predictive patterns from structured and unstructured data using statistical learning algorithms.", ["Python (Pandas, Scikit-learn)", "Statistical Hypothesis Testing", "Predictive Machine Learning", "Feature Engineering", "A/B Testing Methodologies"], ["Jupyter", "Scikit-Learn", "Python", "SQL", "Git"]),
        ("BIA-003", "Business Intelligence & Analytics Architect", "Technology", "Builds executive analytical dashboards, semantic data models, KPI tracking pipelines, and dimensional marts.", ["Power BI / Tableau", "SQL Window Functions & CTEs", "Data Warehouse Schema (Star/Snowflake)", "DAX / Data Modeling", "Executive Storytelling"], ["Power BI", "Tableau", "SQL Server / Snowflake", "Excel", "dbt"]),
        ("MLO-004", "Applied AI Solutions Engineer", "Emerging", "Deploys machine learning models into live enterprise software with monitoring, API latency tuning, and model retraining.", ["FastAPI / Flask", "Docker Model Packaging", "Model Monitoring & Drift Detection", "MLflow Experiment Tracking", "Cloud AI APIs"], ["FastAPI", "Docker", "MLflow", "Postman", "AWS SageMaker"])
    ],
    "AIML": [
        ("MLE-001", "Machine Learning Engineer (MLOps)", "Technology", "Builds end-to-end automated pipelines for training, validating, packaging, deploying, and tracking machine learning models.", ["Python", "PyTorch / TensorFlow", "MLOps Pipelines", "Docker & Kubernetes", "Model Retraining Workflows"], ["PyTorch", "MLflow", "Docker", "Kubernetes", "Weights & Biases"]),
        ("DLS-002", "Deep Learning & Neural Architectures Specialist", "Technology", "Designs and fine-tunes deep convolutional, recurrent, and transformer neural networks for complex classification and generative tasks.", ["Convolutional Neural Networks (CNN)", "Transformer Architectures", "Hyperparameter Optimization", "CUDA GPU Acceleration", "Transfer Learning"], ["PyTorch", "Hugging Face", "TensorFlow", "Jupyter", "NVIDIA CUDA"]),
        ("CVN-003", "Computer Vision Engineer", "Emerging", "Develops real-time object detection, image segmentation, facial recognition, and video surveillance analytics pipelines.", ["OpenCV Computer Vision", "YOLO Object Detection (v8/v11)", "Image Segmentation (Mask R-CNN)", "Video Stream Processing", "Edge AI (TensorRT / ONNX)"], ["OpenCV", "PyTorch", "ONNX Runtime", "NVIDIA TensorRT", "Roboflow"]),
        ("NLP-004", "Natural Language Processing (NLP) & GenAI Engineer", "Emerging", "Constructs semantic search engines, retrieval-augmented generation (RAG) pipelines, and conversational AI agents.", ["Large Language Models (LLMs)", "Vector Embeddings & Databases (Chroma/FAISS)", "LangChain / LlamaIndex", "Tokenization & Semantic Parsing", "Prompt Engineering"], ["Hugging Face", "LangChain", "ChromaDB", "Python", "OpenAI / Ollama"])
    ],
    "CYS": [
        ("SOC-001", "Security Operations Center (SOC) Analyst", "Core", "Monitors enterprise network telemetry 24/7, investigates SIEM alerts, detects malware intrusions, and triages cyber attacks.", ["SIEM Telemetry Monitoring", "Network Packet Analysis", "Log Correlation & Triage", "MITRE ATT&CK Framework", "Phishing Investigation"], ["Splunk", "Wireshark", "ELK Stack", "QRadar", "VirusTotal"]),
        ("PEN-002", "Penetration Tester & Ethical Hacker (VAPT)", "Core", "Simulates real-world cyber adversary attacks against web applications, internal networks, and cloud endpoints to find security bugs.", ["Web App Pentesting (OWASP Top 10)", "Network Scanning & Exploitation", "Burp Suite Proxying", "Privilege Escalation", "Vulnerability Reporting"], ["Burp Suite Professional", "Kali Linux", "Metasploit", "Nmap", "Nessus"]),
        ("CLD-003", "Cloud Security & Identity Architect", "Technology", "Implements Zero Trust access boundaries, AWS/Azure security groups, IAM least-privilege policies, and encryption of cloud data.", ["Cloud Security Posture Management (CSPM)", "IAM Role & Policy Hardening", "KMS Encryption Key Management", "VPC Flow Log Auditing", "Compliance (SOC2 / ISO 27001)"], ["AWS Security Hub", "Terraform", "CloudTrail", "Wiz / Prisma Cloud", "Git"]),
        ("FOR-004", "Digital Forensics & Incident Response (DFIR) Specialist", "Core", "Analyzes compromised disk images, memory dumps, and logs to reconstruct attack timelines and gather legal evidentiary artifacts.", ["Memory Dump Analysis (Volatility)", "Disk Imaging & Artifact Recovery", "Registry & Prefetch Timeline Analysis", "Malware Static/Dynamic Sandboxing", "Chain of Custody Documentation"], ["Autopsy", "Volatility", "FTK Imager", "Ghidra", "Wireshark"]),
        ("SEC-005", "Application Security (AppSec) Engineer", "Technology", "Embeds automated security scanning (SAST/DAST) into CI/CD pipelines and assists software developers in fixing source code vulnerabilities.", ["Static Code Analysis (SAST)", "Dynamic Security Testing (DAST)", "Software Composition Analysis (SCA)", "Secure Code Review", "DevSecOps Integration"], ["SonarQube", "OWASP ZAP", "Snyk", "GitHub Advanced Security", "Docker"])
    ]
}

def generate_standard_roles(dept_code, dept_name):
    """Generates 4 distinct, rich roles for any department: Design, Digital, Quality, Operations."""
    # Prefix
    pfx = dept_code.replace('_', '')
    clean_name = dept_name.split('(')[0].strip()
    is_tamil = dept_code.endswith('_TM')
    
    extra_soft = []
    if is_tamil:
        extra_soft = [
            "Technical English Terminology Mastery",
            "Bilingual Technical Documentation",
            "Global Corporate Interview Communication",
            "Workplace Cross-Cultural Reporting"
        ]

    roles = [
        # Role 1: Core Design & Engineering
        {
            "roleId": f"{pfx}-DES-001",
            "roleName": f"{clean_name} Design & Technical Specialist",
            "roleType": "Core",
            "description": f"Focuses on advanced design calculation, mathematical modeling, blueprint generation, and engineering sizing in {clean_name}.",
            "industry": ["Core Engineering", "Design Consultancies", "Manufacturing & Infrastructure", "R&D"],
            "responsibilities": [
                f"Formulate technical engineering specifications and sizing calculations in {clean_name}",
                "Perform computer-aided design and modeling using industry standard engineering software",
                "Ensure strict adherence to national and international engineering regulatory codes",
                "Review engineering change proposals and conduct multidisciplinary peer design reviews"
            ],
            "technicalSkills": [f"{clean_name} System Design", "Engineering Calculations", "Technical Blueprint Drafting", "Tolerance Analysis", "Code Compliance"],
            "tools": ["Industry CAD Suite", "MATLAB", "Domain Simulation Tools", "Excel Calculation Models"],
            "softSkills": ["Analytical Problem Solving", "Meticulous Accuracy", "Technical Documentation"] + extra_soft,
            "knowledgeAreas": [f"Core Fundamentals and Mathematics of {clean_name}", "Material Specifications and Sizing Codes", "Quality and Safety Regulations"],
            "beginnerSkills": [f"Basic principles of {clean_name}", "Standard formulas and unit conversions", "Introductory drafting"],
            "intermediateSkills": ["Computer-aided modeling and parametric sizing", "Standard engineering code checking", "Preparation of bill of materials"],
            "advancedSkills": ["Non-linear failure modeling", "Multi-parameter optimization", "Leading major engineering review gates"],
            "entryLevelTitles": [f"Graduate Engineer Trainee ({dept_code})", f"Junior {clean_name} Engineer", "Associate Design Engineer"],
            "roadmap": [
                {"level": 1, "title": "Foundation", "learn": [f"Basic laws and principles of {clean_name}", "Mathematical calculations and units"], "practice": ["Solve 30 benchmark problems"], "project": f"Foundational Calculation Workbook in {dept_code}", "outcome": "Grasp of fundamental equations and technical terminology."},
                {"level": 2, "title": "Core Skills", "learn": ["Standard design methodologies and code clauses", "Industry software modeling workflows"], "practice": ["Build 5 standard component models"], "project": f"Parametric Modeling & Design Verification Study", "outcome": "Ability to independently model and calculate production specifications."},
                {"level": 3, "title": "Projects", "learn": ["System integration, safety factor sizing, and cost optimization"], "practice": ["Simulate integrated operating scenarios"], "project": f"Integrated {clean_name} System Design Capstone", "outcome": "Verified capability to execute multi-component engineering designs."},
                {"level": 4, "title": "Internship Preparation", "learn": ["Standard operating procedures (SOPs) and technical documentation"], "practice": ["Audit 3 real industrial case studies"], "project": "Engineering Internship Portfolio & Case Study Dossier", "outcome": "Demonstrated readiness for competitive core engineering internships."},
                {"level": 5, "title": "Certifications / Learning", "learn": ["Professional engineering accreditation requirements"], "practice": ["Complete official practice certification tests"], "project": "Certified Professional Demonstration Capstone", "outcome": "Recognized global or national engineering accreditation."},
                {"level": 6, "title": "Placement Preparation", "learn": ["Core technical viva questions and quantitative aptitude"], "practice": ["Conduct 5 mock peer interviews"], "project": "Placement Technical Defense Portfolio", "outcome": "High clearance rate in core company placement interviews."},
                {"level": 7, "title": "Job & Career Progression", "learn": ["Cross-functional project management and team leadership"], "practice": ["Formulate long-term technology roadmaps"], "project": "Strategic Next-Gen Engineering Blueprint", "outcome": "Advancement to Lead Design Specialist and Engineering Manager."}
            ],
            "projects": [
                {"level": "Beginner", "title": f"Fundamental Sizing & Calculation Template in {dept_code}", "problemStatement": f"Engineers need verified calculation sheets for recurring {clean_name} tasks.", "technologies": ["Excel", "Manual Math"], "mainFeatures": ["Standard calculation formulas", "Error checking", "Summary tables"], "expectedLearningOutcome": "Accurate computational discipline."},
                {"level": "Intermediate", "title": f"Multi-Parameter Simulation & Design Verification in {dept_code}", "problemStatement": f"Suboptimal design tolerances risk operational degradation in {clean_name}.", "technologies": ["Simulation Suite", "CAD Tools"], "mainFeatures": ["Dynamic parameter study", "Code compliance check", "BOM generation"], "expectedLearningOutcome": "Competency in software-based engineering design."},
                {"level": "Advanced", "title": f"Next-Generation Sustainable & High-Efficiency {clean_name} System", "problemStatement": f"Industries require eco-friendly, automated systems with minimal energy footprint.", "technologies": ["Advanced Simulation", "IoT Telemetry"], "mainFeatures": ["Automated parameter control", "Lifecycle assessment", "Economic analysis"], "expectedLearningOutcome": "Leadership-level project execution."}
            ],
            "certifications": [f"NPTEL Certification in {clean_name} (IIT)", f"Certified Professional in {clean_name} Design", "Professional Engineering Society Membership"],
            "freeResources": [f"NPTEL Web Courses on {clean_name}", "MIT OpenCourseWare Relevant Lectures", "Open-Source Engineering Handbooks"],
            "interviewTopics": [f"Explain the primary governing equations of {clean_name}.", "How do you select appropriate safety factors?", "What are common failure modes and mitigation strategies?", "Explain the difference between theoretical and empirical models.", "Describe recent technological breakthroughs in the industry."],
            "resumeSuggestions": ["Specify software tools and calculation packages mastered", "Include links to CAD renders and project portfolios", "Highlight laboratory experimental and testing experience"],
            "relatedRoles": [f"{pfx}-TEC-002: Digital Systems Engineer"],
            "industries": ["Core Engineering", "Design Consultancies", "Manufacturing", "PSUs"],
            "careerProgression": [f"Graduate Engineer Trainee (Year 1)", f"{clean_name} Engineer (Years 1-3)", f"Senior Design Specialist (Years 3-6)", f"Chief Technical Architect (Years 6+)"]
        },
        
        # Role 2: Technology / Digital Engineering
        {
            "roleId": f"{pfx}-TEC-002",
            "roleName": f"{clean_name} Data & Digital Systems Analyst",
            "roleType": "Technology",
            "description": f"Applies computational programming, sensor telemetry, and engineering data analytics to automate workflows in {clean_name}.",
            "industry": ["Digital Engineering Services", "Smart Industrial Automation", "Technology Consultancies"],
            "responsibilities": [
                f"Write automation scripts to process operational data logs from {clean_name} systems",
                "Build telemetry dashboards to visualize real-time operational metrics and alarm limits",
                "Analyze experimental testing logs to identify performance bottlenecks and optimization paths",
                "Integrate digital twin models with live plant sensors"
            ],
            "technicalSkills": ["Python for Engineering", "Data Analytics & SQL", "IoT Sensor Telemetry", "Statistical Analysis", "Dashboard Creation"],
            "tools": ["Python (NumPy, Pandas)", "SQL", "Power BI / Grafana", "Git", "MATLAB"],
            "softSkills": ["Analytical Thinking", "Cross-Disciplinary Communication", "Continuous Learning"] + extra_soft,
            "knowledgeAreas": [f"Domain Principles of {clean_name}", "Time-Series Data Analytics", "Digital Twin Concepts"],
            "beginnerSkills": ["Python basic syntax", "Reading and parsing CSV logs", "Generating 2D trend plots"],
            "intermediateSkills": ["Relational database queries", "Building interactive Grafana dashboards", "Regression modeling"],
            "advancedSkills": ["Predictive machine learning algorithms", "Digital twin real-time synchronization", "Edge computing deployment"],
            "entryLevelTitles": [f"Junior Data Analyst ({dept_code})", "Digital Engineering Trainee", "Associate Systems Analyst"],
            "roadmap": [
                {"level": 1, "title": "Foundation", "learn": ["Python programming syntax", "Data manipulation libraries (Pandas)"], "practice": ["Parse 10 engineering CSV datasets"], "project": "Automated Data Ingestion and Analysis Script", "outcome": "Fluency in scripting and data visualization."},
                {"level": 2, "title": "Core Skills", "learn": ["SQL queries and database design", "Interactive dashboards in Power BI/Grafana"], "practice": ["Build a live telemetry visualization dashboard"], "project": "Live Operational Telemetry Dashboard", "outcome": "Mastery of database logging and visual dashboards."},
                {"level": 3, "title": "Projects", "learn": ["Machine learning regression and anomaly detection for engineering"], "practice": ["Train predictive wear models"], "project": "Predictive Failure Detection Model", "outcome": "Functional machine learning pipeline delivering actionable predictions."},
                {"level": 4, "title": "Internship Preparation", "learn": ["Git version control workflows", "Presenting data insights to engineering leaders"], "practice": ["Publish clean GitHub repositories with documentation"], "project": "Digital Engineering Portfolio on GitHub", "outcome": "Industry-ready portfolio bridging domain engineering with software."},
                {"level": 5, "title": "Certifications / Learning", "learn": ["Cloud data analytics certification syllabi"], "practice": ["Complete practice tests on Coursera/edX"], "project": "Cloud Analytics Capstone Project", "outcome": "Verified global credentials in engineering analytics."},
                {"level": 6, "title": "Placement Preparation", "learn": ["Technical interview coding and SQL query optimization"], "practice": ["Solve 50+ SQL queries on HackerRank"], "project": "Placement Digital Engineering Dossier", "outcome": "High success in analytics and IT services placement drives."},
                {"level": 7, "title": "Job & Career Progression", "learn": ["Enterprise digital transformation strategy and architecture"], "practice": ["Lead enterprise digital twin implementation pilots"], "project": "Enterprise Digital Transformation Blueprint", "outcome": "Advancement to Digital Transformation Lead."}
            ],
            "projects": [
                {"level": "Beginner", "title": f"Automated Engineering Data Parser & Reporter for {dept_code}", "problemStatement": "Engineers waste hours manually compiling test logs.", "technologies": ["Python", "Pandas", "Matplotlib"], "mainFeatures": ["Batch CSV import", "Statistical summary", "Automated plots"], "expectedLearningOutcome": "Automation of repetitive data tasks."},
                {"level": "Intermediate", "title": f"Live Operations Telemetry Dashboard with InfluxDB & Grafana", "problemStatement": f"Lack of centralized visual monitoring of {clean_name} parameters.", "technologies": ["Python", "Grafana", "MQTT"], "mainFeatures": ["Real-time streaming", "Threshold alerts", "Historical data zoom"], "expectedLearningOutcome": "Time-series database and dashboard proficiency."},
                {"level": "Advanced", "title": f"Predictive Maintenance & Health Score Estimator for {clean_name}", "problemStatement": "Unplanned equipment downtime causes massive industrial losses.", "technologies": ["Python", "Scikit-Learn", "FastAPI"], "mainFeatures": ["Trained ML model", "Health score REST API", "Early warning alerts"], "expectedLearningOutcome": "End-to-end industrial machine learning deployment."}
            ],
            "certifications": ["Google Data Analytics Professional Certificate", "IBM Data Science Professional Certificate", "HackerRank SQL Advanced"],
            "freeResources": ["Kaggle Free Micro-Courses in Python & Pandas", "freeCodeCamp Data Analysis with Python", "NPTEL Data Analytics (IIT)"],
            "interviewTopics": [f"How do you apply data analytics to optimize {clean_name} operations?", "Explain inner vs outer joins in SQL.", "What is overfitting in machine learning and how do you prevent it?", "How does an MQTT broker handle telemetry data?", "Explain how predictive maintenance reduces industrial lifecycle costs."],
            "resumeSuggestions": ["Specify programming languages: Python, SQL, Power BI, Grafana", "Link GitHub repositories with clean code and READMEs", "Quantify business impacts achieved through automation"],
            "relatedRoles": [f"{pfx}-DES-001: Design Specialist"],
            "industries": ["Digital Engineering Services", "Smart Factories", "Technology Consulting"],
            "careerProgression": ["Associate Technical Analyst (Year 1)", "Digital Engineering Specialist (Years 1-3)", "Senior Analytics Lead (Years 3-6)", "Chief Technology Officer (Years 6+)"]
        },

        # Role 3: Quality Assurance, Testing & Compliance
        {
            "roleId": f"{pfx}-QAC-003",
            "roleName": f"{clean_name} Quality Assurance & Inspection Engineer",
            "roleType": "Quality",
            "description": f"Ensures all products, processes, and installations in {clean_name} conform to international quality standards, safety protocols, and regulatory certifications.",
            "industry": ["Quality Inspection Agencies", "Manufacturing & Fabrication", "EPC Contracting", "Regulatory Bodies"],
            "responsibilities": [
                f"Develop Quality Assurance Plans (QAP) and Inspection & Test Plans (ITP) for {clean_name} projects",
                "Conduct non-destructive testing (NDT), dimensional checks, and material compliance verification",
                "Manage root-cause analysis (8D / CAPA) for non-conformances discovered during fabrication or operation",
                "Coordinate external client inspection audits and statutory regulatory compliance verifications"
            ],
            "technicalSkills": ["Quality Assurance Planning (QAP)", "Inspection & Testing Protocols", "Root Cause Analysis (8D/CAPA)", "Statistical Quality Control", "ISO / Industry Standards Auditing"],
            "tools": ["Precision Measurement Gauges", "NDT Equipment", "Minitab", "Excel QMS Trackers", "Calibration Tools"],
            "softSkills": ["Uncompromising Integrity", "Meticulous Detail Orientation", "Assertive Technical Communication"] + extra_soft,
            "knowledgeAreas": ["ISO 9001 Quality Management Systems", f"Material Testing & Failure Analysis in {clean_name}", "Non-Destructive Testing (NDT) Methods"],
            "beginnerSkills": ["Using vernier calipers and micrometers", "Reading calibration certificates", "Documenting non-conformance reports"],
            "intermediateSkills": ["Developing Inspection & Test Plans (ITP)", "Conducting dye-penetrant / ultrasonic testing", "Applying statistical process control charts"],
            "advancedSkills": ["Six Sigma Black Belt methodologies", "Leading ISO 9001/17025 accreditation audits", "Supplier quality development programs"],
            "entryLevelTitles": [f"Junior Quality Engineer ({dept_code})", "Inspection Trainee", "QA/QC Associate"],
            "roadmap": [
                {"level": 1, "title": "Foundation", "learn": ["Fundamentals of measurement metrology and unit accuracy", "Principles of Quality Management Systems (QMS)"], "practice": ["Inspect 20 test specimens with calibrated tools"], "project": "Metrology & Measurement Precision Study", "outcome": "Mastery of precision measurement and documentation."},
                {"level": 2, "title": "Core Skills", "learn": ["Non-Destructive Testing (NDT) methods (VT, PT, MT, UT)", "Quality Assurance Plans (QAP) development"], "practice": ["Draft an ITP for a standard industrial component"], "project": "Standard Inspection & Test Plan (ITP) Development", "outcome": "Ability to plan and execute comprehensive inspection audits."},
                {"level": 3, "title": "Projects", "learn": ["Statistical Process Control (SPC) and capability indices (Cp, Cpk)"], "practice": ["Perform process capability analysis on 100 sample points"], "project": "Process Capability & Six Sigma Defect Reduction Study", "outcome": "Competency in statistical defect reduction."},
                {"level": 4, "title": "Internship Preparation", "learn": ["Root cause analysis techniques (Fishbone, 5-Why, 8D)"], "practice": ["Solve 3 real-world industrial non-conformance case studies"], "project": "Comprehensive 8D Non-Conformance Investigation Report", "outcome": "Readiness for industrial QA/QC engineering internships."},
                {"level": 5, "title": "Certifications / Learning", "learn": ["ASNT NDT Level II certification syllabi", "Six Sigma Green Belt curriculum"], "practice": ["Complete practice exams for ASNT/ASQ certifications"], "project": "Certified Quality Auditor Demonstration Portfolio", "outcome": "Recognized professional quality credentials."},
                {"level": 6, "title": "Placement Preparation", "learn": ["High-frequency quality engineering interview viva questions"], "practice": ["Conduct 5 mock technical quality interviews"], "project": "Quality Engineering Placement Defense Dossier", "outcome": "High clearance rate in manufacturing and EPC quality placement drives."},
                {"level": 7, "title": "Job & Career Progression", "learn": ["Enterprise quality governance and regulatory affairs"], "practice": ["Lead supplier quality audit programs"], "project": "Enterprise Zero-Defect Quality Strategy Blueprint", "outcome": "Promotion to Head of Quality and Regulatory Affairs."}
            ],
            "projects": [
                {"level": "Beginner", "title": f"Dimensional Metrology & Calibration Log for {dept_code}", "problemStatement": "Laboratories need standardized calibration tracking for inspection tools.", "technologies": ["Measurement Tools", "Excel"], "mainFeatures": ["Gauge repeatability and reproducibility (GR&R)", "Uncertainty calculations", "Log dashboard"], "expectedLearningOutcome": "Precision measurement discipline."},
                {"level": "Intermediate", "title": f"Statistical Process Control (SPC) System for {clean_name}", "problemStatement": "Manufacturing processes drift unnoticed until defects exceed tolerance limits.", "technologies": ["Minitab / Excel", "Control Charts"], "mainFeatures": ["X-bar and R charts", "Cp and Cpk estimation", "Out-of-control alarm rules"], "expectedLearningOutcome": "Statistical quality monitoring."},
                {"level": "Advanced", "title": f"Digital QA/QC Audit & Traceability System for {clean_name}", "problemStatement": "Paper inspection logs cause delays and lack audit traceability.", "technologies": ["Python / Web App", "QR Codes", "Database"], "mainFeatures": ["Digital checklist execution", "Material test certificate traceability", "Automated non-conformance dispatch"], "expectedLearningOutcome": "Digital quality transformation."}
            ],
            "certifications": ["ASQ Certified Quality Engineer (CQE)", "Six Sigma Green Belt (SSGB)", "ASNT NDT Level II (VT/PT/UT)"],
            "freeResources": ["NPTEL Quality Design and Control Courses", "ASQ Free Quality Resources and Case Studies", "ISO 9001 Implementation Whitepapers"],
            "interviewTopics": ["What is the difference between Quality Assurance (QA) and Quality Control (QC)?", "Explain Cp vs Cpk with a process drift example.", "Describe the 8D root-cause problem solving methodology.", "How does Ultrasonic Testing detect internal material voids?", "What are the core requirements of ISO 9001:2015?"],
            "resumeSuggestions": ["List specific quality tools: CMM, NDT methods, SPC, Minitab, 8D", "Mention any Six Sigma or NDT training received", "Highlight measurable reduction in defect rates achieved in projects"],
            "relatedRoles": [f"{pfx}-DES-001: Design Specialist"],
            "industries": ["Inspection Bodies", "Manufacturing", "Automotive & Aerospace", "EPC Projects"],
            "careerProgression": ["Junior Quality Engineer (Year 1)", "Quality Assurance Specialist (Years 1-3)", "Quality Manager / Six Sigma Black Belt (Years 3-6)", "Vice President of Quality (Years 6+)"]
        },

        # Role 4: Operations, Maintenance & Production
        {
            "roleId": f"{pfx}-OPS-004",
            "roleName": f"{clean_name} Operations & Maintenance Specialist",
            "roleType": "Operations",
            "description": f"Manages day-to-day industrial operations, plant execution, uptime maintenance, and resource allocation in {clean_name}.",
            "industry": ["Industrial Plants", "Production Facilities", "Utility Infrastructure", "Contracting"],
            "responsibilities": [
                f"Supervise daily plant operations and equipment run-time in {clean_name} facilities",
                "Implement preventive and predictive maintenance schedules to minimize unplanned downtime",
                "Manage operating inventory, spare parts procurement, and vendor service contracts",
                "Enforce strict workplace health, safety, and environmental (HSE) protocols on the shop floor"
            ],
            "technicalSkills": ["Plant Operations Management", "Preventive Maintenance Scheduling", "Equipment Troubleshooting", "Industrial Safety (HSE)", "Inventory & Spare Parts Control"],
            "tools": ["CMMS Software", "Vibration / Thermal Diagnostic Tools", "AutoCAD Layouts", "Excel / SAP PM"],
            "softSkills": ["Rapid Crisis Troubleshooting", "Shop-Floor Team Leadership", "Safety Consciousness"] + extra_soft,
            "knowledgeAreas": [f"Operational Working of {clean_name} Machinery", "Total Productive Maintenance (TPM) Pillars", "Occupational Health & Safety (OSHA)"],
            "beginnerSkills": ["Reading equipment operating manuals", "Executing daily pre-start inspection checklists", "Logging operating hours and fuel/power usage"],
            "intermediateSkills": ["Developing preventive maintenance schedules", "Performing basic equipment teardown and component replacement", "Managing spare parts inventory min-max levels"],
            "advancedSkills": ["Implementing Total Productive Maintenance (TPM)", "Condition-based predictive maintenance analytics", "Budgeting and operational expenditure (OPEX) control"],
            "entryLevelTitles": [f"Graduate Trainee - Operations ({dept_code})", "Maintenance Engineer", "Plant Operations Associate"],
            "roadmap": [
                {"level": 1, "title": "Foundation", "learn": ["Industrial machinery basics and plant layout fundamentals", "Workplace safety standards and PPE requirements"], "practice": ["Perform safety hazard walkthrough of a workshop"], "project": "Industrial Workshop Safety & Hazard Assessment", "outcome": "Thorough understanding of plant safety and operating environments."},
                {"level": 2, "title": "Core Skills", "learn": ["Preventive maintenance principles and equipment lubrication", "Computerized Maintenance Management Systems (CMMS)"], "practice": ["Create a 52-week preventive maintenance schedule"], "project": "Annual Preventive Maintenance Plan (PMP) Development", "outcome": "Ability to plan and schedule regular plant maintenance."},
                {"level": 3, "title": "Projects", "learn": ["Condition monitoring techniques (vibration analysis, thermography)"], "practice": ["Analyze vibration spectrum logs of a rotating pump/motor"], "project": "Condition-Based Vibration Monitoring Case Study", "outcome": "Competency in diagnosing impending equipment failures."},
                {"level": 4, "title": "Internship Preparation", "learn": ["Standard operating procedures (SOPs) for equipment startup and shutdown"], "practice": ["Draft an SOP for industrial pump/system operation"], "project": "Plant Operational SOP and Emergency Response Manual", "outcome": "Preparedness for industrial plant operations and site execution."},
                {"level": 5, "title": "Certifications / Learning", "learn": ["Certified Maintenance & Reliability Professional (CMRP) syllabus"], "practice": ["Complete practice tests for reliability certifications"], "project": "Certified Reliability Maintenance Capstone", "outcome": "Industry-accredited plant reliability credentials."},
                {"level": 6, "title": "Placement Preparation", "learn": ["High-frequency plant operations and maintenance viva questions"], "practice": ["Conduct 5 mock technical interview simulations"], "project": "Plant Operations Placement Portfolio", "outcome": "High success rate in core manufacturing and PSU placement drives."},
                {"level": 7, "title": "Job & Career Progression", "learn": ["Total Productive Maintenance (TPM) deployment and plant leadership"], "practice": ["Lead cross-functional plant uptime improvement initiatives"], "project": "World-Class Manufacturing Operational Excellence Blueprint", "outcome": "Advancement to Plant Manager and Director of Operations."}
            ],
            "projects": [
                {"level": "Beginner", "title": f"Preventive Maintenance Schedule & Lubrication Plan for {dept_code}", "problemStatement": "Machinery failures occur due to neglected periodic lubrication.", "technologies": ["Excel", "Equipment Manuals"], "mainFeatures": ["Lubricant specification chart", "Frequency calendar", "Inspection checklist"], "expectedLearningOutcome": "Preventive maintenance planning."},
                {"level": "Intermediate", "title": f"Overall Equipment Effectiveness (OEE) Tracking System in {clean_name}", "problemStatement": "Plant managers lack real visibility into availability and performance losses.", "technologies": ["Python / Excel", "OEE Math"], "mainFeatures": ["Availability, Performance, and Quality tracking", "Pareto chart of downtime causes", "Automated shift reporting"], "expectedLearningOutcome": "OEE performance calculation."},
                {"level": "Advanced", "title": f"Smart CMMS & Spare Parts Inventory Forecasting System", "problemStatement": "Overstocking ties up capital while stock-outs halt factory production.", "technologies": ["Web App / Python", "Database", "Inventory Math"], "mainFeatures": ["Automated work order dispatch", "Min-max reorder point calculations", "Downtime analytics"], "expectedLearningOutcome": "Enterprise asset management."}
            ],
            "certifications": ["Certified Maintenance & Reliability Professional (CMRP)", "Certified Plant Engineer (CPE)", "OSHA 30-Hour General Industry Certification"],
            "freeResources": ["NPTEL Industrial Engineering & Maintenance Lectures", "Plant Services Free Reliability Whitepapers", "Reliabilityweb Free Webinars"],
            "interviewTopics": ["Explain Overall Equipment Effectiveness (OEE) and how it is calculated.", "What is the difference between preventive maintenance and predictive maintenance?", "How do you identify bearing failure using vibration analysis?", "What are the 5S principles in industrial workplace organization?", "Explain Lockout/Tagout (LOTO) procedures for electrical and mechanical safety."],
            "resumeSuggestions": ["Highlight hands-on shop-floor, plant, or machinery maintenance experience", "Mention tools: CMMS software, vibration meters, thermal cameras, SAP PM", "Cite quantifiable improvements in equipment uptime or cost reduction"],
            "relatedRoles": [f"{pfx}-QAC-003: Quality Assurance Engineer"],
            "industries": ["Manufacturing Plants", "Process Facilities", "Infrastructure Operations", "Power Utilities"],
            "careerProgression": ["Graduate Engineer Trainee - Operations (Year 1)", "Maintenance Engineer (Years 1-3)", "Plant Operations Manager (Years 3-7)", "Director of Manufacturing Operations (Years 7+)"]
        }
    ]
    return roles

def generate_full_database():
    print(f"Generating full database for all {len(DEPTS_META)} departments with ALL available roles...")
    all_departments = []
    
    for idx, (code, name, summary, distinction) in enumerate(DEPTS_META, start=1):
        # Check if custom blueprint exists
        if code in CORE_ROLE_DEFINITIONS:
            # Build full custom roles
            custom_roles = []
            for role_tuple in CORE_ROLE_DEFINITIONS[code]:
                r_id, r_name, r_type, r_desc, r_skills, r_tools = role_tuple
                
                # Build complete object conforming to 8-page schema
                role_obj = {
                    "roleId": f"{code}-{r_id}",
                    "roleName": r_name,
                    "roleType": r_type,
                    "description": r_desc,
                    "industry": ["Leading Industry Enterprises", "Technology Consultancies", "Product Companies"],
                    "responsibilities": [
                        f"Architect, develop, and maintain production-grade systems in {r_name}",
                        f"Utilize modern industry tools ({', '.join(r_tools[:3])}) to execute engineering workflows",
                        "Collaborate in cross-functional agile teams and adhere to enterprise quality standards",
                        "Perform code/model reviews, performance profiling, and system hardening"
                    ],
                    "technicalSkills": r_skills,
                    "tools": r_tools,
                    "softSkills": ["Problem Solving", "Collaborative Teamwork", "Technical Communication", "Continuous Adaptability"],
                    "knowledgeAreas": [f"Core Foundations of {r_name}", "Enterprise Architecture & Scalability", "Testing, Security & Quality Standards"],
                    "beginnerSkills": [f"Introductory principles of {r_name}", f"Basic workflows in {r_tools[0]}", "Syntax and fundamental concepts"],
                    "intermediateSkills": [f"Applied engineering workflows in {r_tools[1] if len(r_tools)>1 else r_tools[0]}", "Multi-parameter optimization", "Writing production tests"],
                    "advancedSkills": ["Distributed systems architecture", "High-throughput performance tuning", "Technical mentorship and design leadership"],
                    "entryLevelTitles": [f"Associate {r_name}", f"Junior {r_name}", f"Graduate Trainee ({code})"],
                    "roadmap": [
                        {"level": 1, "title": "Foundation", "learn": [f"Core syntax and principles of {r_name}", "Analytical problem solving"], "practice": ["Solve 30 benchmark problems"], "project": f"Foundational {r_name} Practice Project", "outcome": "Firm grasp of fundamental theory and terminology."},
                        {"level": 2, "title": "Core Skills", "learn": [f"Industry standard frameworks and tools ({', '.join(r_tools[:2])})"], "practice": ["Build 5 standard modular applications"], "project": f"Core Systems Implementation Project in {code}", "outcome": "Ability to independently build production-ready components."},
                        {"level": 3, "title": "Projects", "learn": ["System integration, scalability, and security"], "practice": ["Execute an end-to-end multi-tier project"], "project": f"Full-Scale Capstone Project in {r_name}", "outcome": "Demonstrated capability to deliver enterprise-grade software/hardware."},
                        {"level": 4, "title": "Internship Preparation", "learn": ["Agile methodologies, code review standards, and documentation"], "practice": ["Audit real-world open-source case studies"], "project": "Industry Internship Portfolio Dossier", "outcome": "Readiness for competitive internships."},
                        {"level": 5, "title": "Certifications / Learning", "learn": ["Vendor and global standard certifications"], "practice": ["Complete practice assessments"], "project": "Professional Certification Capstone", "outcome": "Attainment of recognized industry accreditation."},
                        {"level": 6, "title": "Placement Preparation", "learn": ["Technical viva questions and coding/design challenges"], "practice": ["Conduct 5 mock technical interviews"], "project": "Placement Technical Defense Portfolio", "outcome": "High clearance rate in top-tier placement interviews."},
                        {"level": 7, "title": "Job & Career Progression", "learn": ["Enterprise architecture and engineering leadership"], "practice": ["Formulate strategic system roadmaps"], "project": "Strategic Next-Generation Architecture Blueprint", "outcome": "Promotion from Associate to Senior Specialist and Lead Architect."}
                    ],
                    "projects": [
                        {"level": "Beginner", "title": f"Introductory {r_name} Benchmark App", "problemStatement": f"Engineers need a standard working template for {r_name}.", "technologies": r_tools[:2], "mainFeatures": ["Clean modular architecture", "Input validation", "Documented README"], "expectedLearningOutcome": "Solid grounding in tool usage."},
                        {"level": "Intermediate", "title": f"Scalable Multi-Tier System for {r_name}", "problemStatement": f"Organizations require automated, robust solutions for {r_name}.", "technologies": r_tools[:3], "mainFeatures": ["End-to-end functionality", "Automated tests", "Security best practices"], "expectedLearningOutcome": "Competency in real-world application design."},
                        {"level": "Advanced", "title": f"Enterprise High-Availability & Distributed {r_name} Solution", "problemStatement": "High-volume operations demand zero downtime and microsecond latency.", "technologies": r_tools + ["Cloud Infrastructure"], "mainFeatures": ["High availability design", "Real-time telemetry", "Automated failover"], "expectedLearningOutcome": "Enterprise-level architecture mastery."}
                    ],
                    "certifications": [f"Industry Certified Professional in {r_name}", f"Vendor Accreditation in {r_tools[0]}", "Global Engineering Credential"],
                    "freeResources": [f"Official Documentation & Tutorials for {r_tools[0]}", "freeCodeCamp / NPTEL Comprehensive Video Series", "Coursera / edX Free Audit Modules"],
                    "interviewTopics": [f"Explain the architectural foundations of {r_name}.", f"How do you optimize performance in {r_tools[0]}?", "What are common failure modes and security risks in this domain?", "Explain how to scale this system under high load.", "Describe recent innovations transforming this field."],
                    "resumeSuggestions": [f"Explicitly list tools mastered: {', '.join(r_tools[:4])}", "Link working GitHub repositories with live demo URLs", "Quantify measurable accomplishments achieved in projects"],
                    "relatedRoles": [f"{code}-DES-001"],
                    "industries": ["Technology", "Enterprise Software", "Engineering Consultancies"],
                    "careerProgression": [f"Associate {r_name} (Year 1)", f"{r_name} (Years 1-3)", f"Senior {r_name} (Years 3-6)", f"Principal Lead / Architect (Years 6+)"]
                }
                custom_roles.append(role_obj)
            roles = custom_roles
        else:
            roles = generate_standard_roles(code, name)

        dept_data = {
            "departmentCode": code,
            "departmentName": name,
            "overview": summary,
            "industryDomains": [
                "Core Engineering & Manufacturing",
                "Technology & Software Services",
                "Infrastructure & Construction",
                "R&D Laboratories & Consultancies",
                "Public Sector Undertakings (PSUs)"
            ],
            "coreCareerAreas": [
                f"{name} Design & Analysis",
                "Operational & Field Engineering",
                "Quality Assurance & Testing",
                "Technology & Digital Engineering"
            ],
            "technologyCrossDomainOpportunities": [
                "Digital Twin & IoT Integration",
                "Automation & Predictive Maintenance",
                "Data Analytics for Engineering Optimization"
            ],
            "emergingCareerAreas": [
                "Green & Sustainable Technologies",
                "AI-Assisted Engineering",
                "Smart Connected Systems"
            ],
            "careerDistinction": distinction,
            "jobRoles": roles
        }
        all_departments.append(dept_data)
        print(f"[{idx:2}/68] {code:12} - {name[:30]:30} : {len(roles)} roles generated")

    # Save to JSON
    out_json = os.path.join("public", "js", "data", "all_68_departments_career_db.json")
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(all_departments, f, indent=2, ensure_ascii=False)
        
    total_roles = sum(len(d["jobRoles"]) for d in all_departments)
    print(f"\n=======================================================")
    print(f"Total Departments: {len(all_departments)}")
    print(f"Total Job Roles Generated: {total_roles}")
    print(f"Saved to: {out_json}")
    print(f"=======================================================\n")

if __name__ == "__main__":
    generate_full_database()
