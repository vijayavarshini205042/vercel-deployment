# -*- coding: utf-8 -*-
"""
Generator for Fresh, High-Quality Engineering Project Blueprints across ALL 68 Departments.
Clears out old hollow content and newly populates rich, industry-aligned project ideas.
"""

import json
import re
import os

DEPARTMENTS = [
    ("CSE", "Computer Science & Engineering", "Software Systems, Cloud & Distributed Architecture"),
    ("IT", "Information Technology", "Enterprise IT, Cloud Networking & Security Systems"),
    ("ECE", "Electronics & Communication Engineering", "Semiconductors, Embedded Firmware & Wireless RF"),
    ("EEE", "Electrical & Electronics Engineering", "Power Grids, Electric Vehicles & Energy Systems"),
    ("MECH", "Mechanical Engineering", "Kinematics, Thermal Systems, CAD/CAM & Machine Design"),
    ("CIVIL", "Civil Engineering", "Structural Analysis, BIM, Concrete Tech & Geotechnical"),
    ("AIDS", "Artificial Intelligence & Data Science", "Data Pipelines, Predictive Models & Analytics"),
    ("AIML", "Artificial Intelligence & Machine Learning", "Neural Architectures, Vision & Transformers"),
    ("CYS", "Cyber Security", "Penetration Testing, Threat Intelligence & SOC"),
    ("BME", "Biomedical Engineering", "Medical Devices, Biosensors & Clinical Diagnostics"),
    ("CHEM", "Chemical Engineering", "Reaction Kinetics, Separation Processes & Refining"),
    ("BIOTECH", "Biotechnology", "Recombinant DNA, Genetic Engineering & Bioprocess"),
    ("AERO", "Aeronautical Engineering", "Aerodynamics, Propulsion & Airframe Structures"),
    ("AUTO", "Automobile Engineering", "Vehicle Dynamics, EV Powertrains & Telematics"),
    ("MTRX", "Mechatronics Engineering", "Electro-Mechanical Control, PLC & Actuators"),
    ("ROBO", "Robotics & Automation", "Inverse Kinematics, ROS2 & Mobile Manipulation"),
    ("AGRI", "Agricultural Engineering", "Precision Farming, Irrigation Hydraulics & Machinery"),
    ("FOOD", "Food Technology", "Food Preservation, HACCP Quality & Packaging"),
    ("PROD", "Production Engineering", "Lean Six Sigma, CNC Multi-Axis & Plant Logistics"),
    ("EIE", "Electronics & Instrumentation Engineering", "Transducers, SCADA Telemetry & Signal Conditioning"),
    ("ICE", "Instrumentation & Control Engineering", "PID Control Tuning, Closed-Loop & Cyber-Physical"),
    ("MAR", "Marine Engineering", "Ship Propulsion, Heavy Diesels & Maritime Safety"),
    ("MET", "Metallurgical Engineering", "Smelting, Phase Diagrams, Heat Treatment & Alloys"),
    ("MIN", "Mining Engineering", "Rock Blasting, Mine Ventilation & Underground Excavation"),
    ("PET", "Petroleum Engineering", "Drilling Hydraulics, Reservoir Simulation & Wells"),
    ("TXT", "Textile Technology", "Yarn Spinning Mechanics, Looms & Technical Textiles"),
    ("PRT", "Printing Technology", "Offset Lithography, Flexographic Packaging & Digital Press"),
    ("FT", "Fashion Technology", "Pattern Grading, Apparel CAD & Export Garments"),
    ("AEROSPACE", "Aerospace Engineering", "Orbital Astrodynamics, Rocket Propulsion & Hypersonics"),
    ("MAE", "Mechanical and Automation Engineering", "Factory Automation, Pneumatic Circuits & Robotics"),
    ("CCE", "Computer and Communication Engineering", "5G/6G Networks, RF Antennas & Telecom Software"),
    ("MEDEL", "Medical Electronics", "Bio-Potential Amplifiers, Defibrillators & Telehealth"),
    ("ENVENG", "Environmental Engineering", "Wastewater Treatment, Air Modeling & Solid Waste"),
    ("IEM", "Industrial Engineering and Management", "Supply Chain Optimization & Operations Research"),
    ("CIVIL_TM", "Civil Engineering (Tamil Medium)", "Infrastructure Engineering & Bilingual Documentation"),
    ("MECH_TM", "Mechanical Engineering (Tamil Medium)", "Mechanical Manufacturing & Bilingual Reporting"),
    ("SFE", "Safety and Fire Engineering", "HAZOP Studies, Fire Hydraulics & Safety Auditing"),
    ("CSE_TM", "Computer Science and Engineering (Tamil Medium)", "Computer Science & Bilingual Tech Documentation"),
    ("GEO", "Geoinformatics Engineering", "LiDAR Surveying, GIS Cartography & Remote Sensing"),
    ("IE", "Industrial Engineering", "Time-Motion Optimization & Statistical Process Control"),
    ("MFGE", "Manufacturing Engineering", "5-Axis CNC Tooling, Metrology & Additive Mfg"),
    ("MECH_SW", "Mechanical Engineering (Sandwich)", "Industrial Maintenance & Tool Room Practices"),
    ("CSE_AIML", "Computer Science and Engineering (AI & ML)", "AI Algorithms, PyTorch & Deep Learning Systems"),
    ("ECE_ELCO", "Electrical and Computer Engineering", "VLSI Microarchitecture & Embedded Co-Design"),
    ("VLSI", "Electronics Engineering (VLSI Design and Technology)", "Verilog RTL, CMOS Layout & ASIC Flow"),
    ("MECH_SM", "Mechanical Engineering (Smart Manufacturing)", "Industry 4.0, MQTT Telemetry & Digital Twins"),
    ("CIVIL_ENV", "Civil Engineering (Environmental Engineering)", "Water Distribution & Eco-Friendly Concrete"),
    ("MECH_AUTO", "Mechanical Engineering (Automobile)", "Powertrain Testing & Crashworthiness Simulation"),
    ("BDES", "Bachelor of Design (B.Des.)", "UI/UX Architecture, Figma Prototyping & Ergonomics"),
    ("HTT", "Handloom and Textile Technology", "Traditional Dobby/Jacquard Looms & Natural Dyes"),
    ("BBE", "Biotechnology and Biochemical Engineering", "Stirred Bioreactors & Enzyme Kinetics"),
    ("TXCHEM", "Textile Chemistry", "Wet Processing, Reactive Dyeing & Effluent Chemistry"),
    ("PETRO", "Petroleum Engineering", "Crude Refining, Pipelines & Subsea Systems"),
    ("PLASTIC", "Plastic Technology", "Polymer Rheology, Injection Molds & Bioplastics"),
    ("CEE", "Chemical and Electrochemical Engineering", "Lithium Battery Cells, Fuel Cells & Electroplating"),
    ("PHARMA", "Pharmaceutical Technology", "Solid Dosage cGMP, Sterile Injectables & Regulations"),
    ("PCT", "Petrochemical Technology", "Fluid Catalytic Cracking & Polymer Synthesis"),
    ("CSBS", "Computer Science and Business Systems", "Enterprise Architecture & Corporate FinTech"),
    ("ARCH", "Bachelor of Architecture (B.Arch.)", "Architectural Space Planning & Climate BIM"),
    ("CSD", "Computer Science and Design", "Full Stack UI/UX, 3D Web Graphics & HCI"),
    ("EEE_TI", "Electrical and Electronics Engineering (Training Integrated)", "Substation Automation & Motor Drives"),
    ("CSE_IOT", "Computer Science and Engineering (IoT)", "MQTT Protocols, ESP32 Firmware & Cloud IoT"),
    ("RAI", "Robotics and Artificial Intelligence", "Computer Vision SLAM & Neural Motion Planning"),
    ("ELCO", "Electronics and Computer Engineering", "Embedded C, RTOS Kernels & FPGA Peripheral"),
    ("ENV_ST", "Environmental Science and Technology", "Ecological Impact Auditing & Biodiversity GIS"),
    ("IBT", "B.Tech Industrial Biotechnology", "Microbial Fermentation & Industrial Enzymes"),
    ("BTECH_VLSI", "Electronics Engineering (VLSI Design and Technology)", "Physical Layout, DRC/LVS & ASIC"),
    ("BECEE", "Civil Engineering (Environmental Engineering)", "Sewage Network Hydraulics & EIA Compliance")
]

# Blueprint templates for domain clusters
PROJECT_TEMPLATES = {
    "CSE_LIKE": [
        {
            "title": "Cloud-Native Microservices Observability & Auto-Remediation Engine",
            "domain": "Cloud Computing & DevOps",
            "categoryTag": "Industry-inspired",
            "projectType": "Final Year Project",
            "difficulty": "Advanced",
            "problemStatement": "Complex cloud microservices experience latency spikes and transient network partitions that lead to cascading service outages when manual operator intervention is required.",
            "objective": "Build an autonomous observability pipeline that ingests OpenTelemetry metrics, uses predictive anomaly scoring, and automatically triggers Kubernetes pod scaling and circuit-breaking.",
            "features": ["Distributed tracing via Jaeger and OpenTelemetry", "Time-series anomaly detection with exponential moving averages", "Automated Kubernetes horizontal pod autoscaling (HPA) webhooks", "Interactive Prometheus/Grafana real-time metrics dashboard", "Role-based administrative control panel with Slack alert webhooks"],
            "suggestedTech": ["Go / Python", "Kubernetes", "Prometheus", "Grafana", "Docker", "FastAPI"],
            "architecture": "Service Mesh Telemetry -> OpenTelemetry Collector -> TimescaleDB/Prometheus -> Anomaly Evaluator Worker -> K8s Admission Controller Webhook",
            "expectedOutcome": "A production-ready containerized microservices ecosystem demonstrating sub-second anomaly detection and 99.9% uptime under simulated load injection.",
            "skillsLearned": ["Kubernetes Cluster Administration", "Distributed Tracing Architecture", "CI/CD Pipeline Automation", "Chaos Engineering Principles"]
        },
        {
            "title": "High-Throughput Cryptographic File Storage with End-to-End Zero-Trust Encryption",
            "domain": "Information Security & Distributed Systems",
            "categoryTag": "Deep Tech",
            "projectType": "Mini Project",
            "difficulty": "Intermediate",
            "problemStatement": "Traditional cloud storage services expose user files to insider data breaches and unencrypted metadata leakage on centralized servers.",
            "objective": "Design an encrypted cloud storage client that performs client-side AES-256-GCM chunking, RSA key exchange, and tamper verification before network transmission.",
            "features": ["Client-side cryptographic chunking and SHA-256 integrity verification", "Zero-knowledge authentication using SRP (Secure Remote Password) protocol", "Deduplication of encrypted blocks using convergent encryption", "Granular time-limited encrypted file sharing links", "Cross-platform responsive web client"],
            "suggestedTech": ["Node.js / Express", "Web Crypto API", "PostgreSQL", "Docker", "React.js"],
            "architecture": "Client Web App (AES-GCM Encryption) -> Chunk Upload Stream -> Object Storage Adapter -> PostgreSQL Hash Index",
            "expectedOutcome": "A fully functional web storage application with verifiable zero-knowledge client decryption and automated file integrity checks.",
            "skillsLearned": ["Cryptographic Primitives Implementation", "Client-Side Buffer Streaming", "Zero-Knowledge Authentication", "Secure Web Architecture"]
        },
        {
            "title": "AI-Powered Code Reviewer & Security Vulnerability Scanner for CI/CD",
            "domain": "Artificial Intelligence & Software Engineering",
            "categoryTag": "Smart Campus",
            "projectType": "Research-oriented",
            "difficulty": "Advanced",
            "problemStatement": "Junior developers frequently commit code containing SQL injection, unhandled null pointer exceptions, and memory leaks that bypass basic linter checks.",
            "objective": "Develop an automated GitHub Action that analyzes pull request diffs using AST parsing and fine-tuned code transformer models to detect subtle security antipatterns.",
            "features": ["Abstract Syntax Tree (AST) parsing for Python and JavaScript", "Deep learning vulnerability classification using CodeBERT", "Automated inline PR commentary via GitHub REST API", "Severity scoring (Critical, High, Medium, Low) based on CVSS metrics", "Comprehensive PDF audit report generation"],
            "suggestedTech": ["Python", "HuggingFace Transformers", "Tree-sitter", "GitHub Actions API", "Flask"],
            "architecture": "GitHub PR Webhook -> AST Extractor -> Transformer Classifier Inference -> GitHub PR Review Commenter Bot",
            "expectedOutcome": "A deployed GitHub App that reviews pull requests in under 15 seconds with >92% accuracy on common CWE vulnerabilities.",
            "skillsLearned": ["AST Manipulation", "Transformer Model Inference", "GitHub Apps API Integration", "Security Static Analysis"]
        },
        {
            "title": "Decentralized Credential Verification System on Permissioned Ledger",
            "domain": "Blockchain & FinTech",
            "categoryTag": "Deep Tech",
            "projectType": "Final Year Project",
            "difficulty": "Intermediate",
            "problemStatement": "Academic certificates and student grade transcripts are susceptible to forgery and require slow, manual verification by employers.",
            "objective": "Create a tamper-evident decentralized credential ledger where universities sign cryptographic hashes of student certificates for instant QR code verification.",
            "features": ["Smart contract for verifiable issuer identity management", "Cryptographic Merkle tree batching for gas-efficient certificate stamping", "Instant public QR code verification portal requiring zero login", "Role-based administrative university registrar portal", "Tamper-evident digital PDF generation with embedded cryptographic seal"],
            "suggestedTech": ["Solidity / Hyperledger", "Ethers.js", "Node.js", "React.js", "IPFS"],
            "architecture": "Registrar Portal -> Hash Digest Generator -> Smart Contract Ledger Event -> IPFS Metadata Pinning -> Public QR Verification Scanner",
            "expectedOutcome": "A live verification portal validating Anna University academic certificates in real time with cryptographic proof.",
            "skillsLearned": ["Smart Contract Development", "Merkle Proof Computation", "IPFS Decentralized Storage", "Full Stack Web3 Integration"]
        }
    ],
    "ECE_LIKE": [
        {
            "title": "Smart Embedded Wearable for Real-Time Cardiac Arrhythmia Telemetry",
            "domain": "Embedded Systems & Biomedical Electronics",
            "categoryTag": "Healthcare Innovation",
            "projectType": "Final Year Project",
            "difficulty": "Advanced",
            "problemStatement": "Patients with intermittent cardiac arrhythmias require continuous ECG telemetry outside clinical environments without cumbersome medical wiring.",
            "objective": "Design an ultra-low-power wearable ECG monitor with on-board pan-tompkins QRS detection, BLE telemetry, and cloud telemetry ingestion.",
            "features": ["Analog frontend with instrumentation bio-amplifier (AD8232)", "Real-time Pan-Tompkins QRS wave detection algorithm running on ARM Cortex-M4", "BLE 5.0 wireless packet transmission to smartphone companion app", "Rechargeable LiPo power management circuit with sleep mode optimization", "Cloud telemetry dashboard with automated abnormal rhythm alerts"],
            "suggestedTech": ["Embedded C", "STM32CubeIDE", "KiCad PCB Design", "FreeRTOS", "Flutter"],
            "architecture": "ECG Electrodes -> AD8232 Analog Filter -> STM32 ADC -> Pan-Tompkins Algorithm -> BLE Telemetry -> Cloud Database",
            "expectedOutcome": "A custom fabricated 2-layer PCB wearable prototype displaying live ECG waveforms with automated tachycardia alert notification.",
            "skillsLearned": ["Analog Bio-Signal Conditioning", "ARM Firmware Programming", "KiCad Multi-Layer PCB Layout", "Low Power Firmware Design"]
        },
        {
            "title": "FPGA-Accelerated Convolutional Neural Network Engine for Edge Vision",
            "domain": "VLSI & Digital Signal Processing",
            "categoryTag": "Deep Tech",
            "projectType": "Research-oriented",
            "difficulty": "Advanced",
            "problemStatement": "Edge vision sensors require real-time object classification under strict power envelopes that general-purpose microprocessors cannot satisfy.",
            "objective": "Implement an optimized integer arithmetic systolic array accelerator in Verilog HDL on a Xilinx FPGA for hardware-accelerated image inferencing.",
            "features": ["8-bit fixed-point (INT8) matrix multiplication processing elements", "Circular line-buffer memory architecture to maximize on-chip BRAM reuse", "AXI4-Stream interface for seamless DMA transfer from host microcontroller", "Pipelined ReLU and max-pooling hardware execution stages", "Power consumption benchmark comparison against ARM Cortex CPU"],
            "suggestedTech": ["Verilog HDL", "Xilinx Vivado", "ModelSim", "FPGA Development Board", "Python PyTorch"],
            "architecture": "Host Camera Stream -> AXI DMA Interface -> FPGA Line Buffers -> Systolic MAC Array -> Output Classification Registers",
            "expectedOutcome": "Synthesized RTL achieving 60 FPS real-time classification on 28x28/64x64 images consuming under 1.5 Watts on FPGA.",
            "skillsLearned": ["RTL Design in Verilog", "Hardware Accelerator Architecture", "Xilinx Vivado Synthesis & Timing", "FPGA BRAM Optimization"]
        },
        {
            "title": "Long-Range Industrial Sensor Telemetry Gateway using LoRaWAN and MQTT",
            "domain": "Wireless Communication & IoT",
            "categoryTag": "Industrial Automation",
            "projectType": "Mini Project",
            "difficulty": "Intermediate",
            "problemStatement": "Industrial plants contain geographically scattered pressure and temperature sensors where cellular data plans are costly and Wi-Fi lacks range.",
            "objective": "Construct an off-grid sensor telemetry node operating on 868MHz LoRaWAN transmitting sensor payloads up to 8 kilometers to a cloud MQTT broker.",
            "features": ["Multi-channel sensor acquisition (vibration, temperature, pressure)", "LoRa SX1276 spread-spectrum transceiver integration with adaptive data rate (ADR)", "Solar-powered battery charge controller with deep sleep power cycles", "Open-source ChirpStack LoRaWAN network gateway integration", "Web dashboard with live gauges and historical trends"],
            "suggestedTech": ["Arduino C++", "ESP32", "LoRa SX1276", "ChirpStack", "Node-RED", "MQTT"],
            "architecture": "Industrial Sensors -> ESP32 Node -> LoRa 868MHz RF Link -> Single-Channel Gateway -> ChirpStack Server -> MQTT Broker -> Dashboard",
            "expectedOutcome": "A deployed field test node transmitting sensor packets across 5+ km with battery longevity exceeding 6 months on solar charge.",
            "skillsLearned": ["LoRaWAN Protocol Stack", "RF Link Budget Analysis", "MQTT Telemetry Ingestion", "Solar Energy Harvesting"]
        },
        {
            "title": "Automated Antenna Radiation Pattern Measurement System with Stepper Gimbal",
            "domain": "RF & Microwave Engineering",
            "categoryTag": "Industry-inspired",
            "projectType": "Final Year Project",
            "difficulty": "Advanced",
            "problemStatement": "Characterizing antenna radiation patterns in anechoic chambers manually is slow, error-prone, and labor intensive.",
            "objective": "Build a motorized 2-axis azimuth/elevation antenna positioner that sweeps angles automatically and plots 2D/3D radiation polar diagrams.",
            "features": ["Dual-axis precision stepper motor gimbal with microstepping control", "RF power detector interface interfacing with USB Spectrum Analyzer / SDR", "Automated angular stepping synchronized with RF power measurement", "Real-time polar plot generation in Python (E-plane & H-plane)", "Beamwidth (-3dB), front-to-back ratio, and directivity calculation"],
            "suggestedTech": ["Python", "MATLAB", "Arduino", "RTL-SDR", "Stepper Drivers"],
            "architecture": "RF Transmitter -> Horn Antenna -> Device Under Test on 2-Axis Gimbal -> RF Power Detector -> Arduino Controller -> PC Polar Plotter",
            "expectedOutcome": "A functioning laboratory measurement apparatus plotting verified radiation patterns for microstrip patch and dipole antennas.",
            "skillsLearned": ["Antenna Characterization Theory", "Motion Control Interfacing", "RF Power Signal Acquisition", "Data Visualization in Polar Coordinates"]
        }
    ],
    "MECH_LIKE": [
        {
            "title": "Design, Aerodynamic CFD & FEA Simulation of an All-Electric Formula Student Vehicle Chassis",
            "domain": "Automotive & Mechanical Design",
            "categoryTag": "Industry-inspired",
            "projectType": "Final Year Project",
            "difficulty": "Advanced",
            "problemStatement": "Electric race vehicles require lightweight chassis structures that resist torsional flexing while maintaining strict occupant impact safety.",
            "objective": "Design a spaceframe tubular chassis, perform static structural torsional analysis, simulate front/side impact crashworthiness, and optimize aerodynamic downforce.",
            "features": ["Parametric 3D CAD modeling of chassis and suspension hardpoints in SolidWorks", "Finite Element Analysis (FEA) under front impact (20G) and side impact crash loads", "Torsional stiffness calculation and structural triangulation optimization", "Computational Fluid Dynamics (CFD) simulation of front wing and undertray diffuser in ANSYS", "Bill of Materials (BOM) and tube cutting notch template generation"],
            "suggestedTech": ["SolidWorks", "ANSYS Workbench", "ANSYS Fluent", "MATLAB", "Excel Engineering"],
            "architecture": "Parametric CAD Geometry -> Meshing & Boundary Constraints -> FEA Stress & Deformation Solving -> CFD Aerodynamic Pressure Mapping -> Iterative Geometry Refinement",
            "expectedOutcome": "Comprehensive CAD blueprints, FEA stress contour reports showing factor of safety > 1.75, and aerodynamic lift/drag coefficients.",
            "skillsLearned": ["Chassis Structural FEA", "Aerodynamic CFD Simulation", "Material Selection (AISI 4130)", "Engineering Drawing Generation"]
        },
        {
            "title": "Automated Smart Sorting Conveyor System with Machine Vision & Pneumatic Actuation",
            "domain": "Industrial Automation & Manufacturing",
            "categoryTag": "Industrial Automation",
            "projectType": "Final Year Project",
            "difficulty": "Intermediate",
            "problemStatement": "Manufacturing packaging lines waste thousands of hours manually segregating defective parts and sorting materials by color and dimension.",
            "objective": "Build a miniature automated sorting conveyor using OpenCV image processing on a Raspberry Pi to trigger pneumatic solenoid ejectors.",
            "features": ["DC motor-driven conveyor belt with variable frequency speed regulation", "Overhead industrial camera inspecting parts for dimensions and surface defects", "Pneumatic double-acting cylinder actuation triggered via 5/2 solenoid valves", "PLC / Relay interface board for industrial electrical isolation", "Digital counter displaying production rate, passed units, and reject percentage"],
            "suggestedTech": ["Raspberry Pi", "OpenCV", "Pneumatics", "Python", "Fusion 360"],
            "architecture": "Conveyor Belt -> Proximity Sensor Trigger -> Camera Capture -> OpenCV Shape/Color Classifier -> GPIO Actuation -> Pneumatic Cylinder Ejection",
            "expectedOutcome": "A physical working automated manufacturing test rig sorting up to 40 items per minute with 98% accuracy.",
            "skillsLearned": ["Pneumatic Circuit Design", "Computer Vision Defect Detection", "Industrial Mechanism Design", "Hardware-Software Integration"]
        },
        {
            "title": "Design & Thermal Performance Analysis of a Solar Parabolic Trough Collector",
            "domain": "Thermal Engineering & Renewable Energy",
            "categoryTag": "Sustainable Tech",
            "projectType": "Research-oriented",
            "difficulty": "Intermediate",
            "problemStatement": "Industrial process heating relies heavily on fossil-fuel boilers contributing to carbon emissions and high energy expenditure.",
            "objective": "Design and fabricate a concentrated solar parabolic trough with selective coated absorber pipe, evaluate thermal efficiency, and model heat transfer.",
            "features": ["Parabolic reflector curve mathematical optimization for maximum concentration ratio", "Single-axis automated astronomical sun-tracking mechanism with LDR sensors", "Copper absorber tube with black chrome selective coating and glass vacuum envelope", "Inlet, outlet, and surface thermocouple data logging", "Thermal efficiency calculation according to ASHRAE standards"],
            "suggestedTech": ["AutoCAD", "MATLAB / Scilab", "Arduino", "Thermocouples (MAX6675)", "Thermal Simulation"],
            "architecture": "Sun Position Sensor -> Microcontroller Tracker -> Stepper Gearbox -> Parabolic Trough -> Fluid Circulation Pump -> Heat Exchanger Calorimeter",
            "expectedOutcome": "A functional parabolic trough heating water to >110°C with verified thermal efficiency exceeding 58% at peak solar irradiance.",
            "skillsLearned": ["Solar Thermal Thermodynamics", "Sun Tracking Kinematics", "Heat Transfer Calculation", "Data Logging & Instrumentation"]
        },
        {
            "title": "Topology Optimization & 3D Metal Additive Manufacturing of an Aerospace Bracket",
            "domain": "Additive Manufacturing & CAE",
            "categoryTag": "Deep Tech",
            "projectType": "Mini Project",
            "difficulty": "Beginner",
            "problemStatement": "Conventional CNC-machined aerospace mounting brackets are heavy, requiring excessive raw material and increasing aircraft fuel consumption.",
            "objective": "Apply SIMP (Solid Isotropic Material with Penalization) topology optimization in Fusion 360 / ANSYS to reduce bracket mass by 45% while preserving stiffness.",
            "features": ["Baseline bracket CAD modeling and load case specification (3-axis forces)", "Topology optimization with 50% target volume fraction constraint", "Lattice structure infill generation in non-critical stress regions", "Direct Metal Laser Sintering (DMLS) 3D printing simulation and support generation", "Comparative stress, strain, and factor of safety validation"],
            "suggestedTech": ["Fusion 360 Generative Design", "ANSYS", "Material Ti-6Al-4V", "UltiMaker Cura"],
            "architecture": "Initial CAD Volume -> Boundary Loads & Fixture Points -> FEA Topology Optimization Solver -> Mesh Reconstruction -> Validation FEA Run",
            "expectedOutcome": "Optimized lightweight CAD model achieving 48% weight reduction while preserving maximum von Mises stress below 350 MPa.",
            "skillsLearned": ["Generative Design", "Finite Element Meshing", "Design for Additive Manufacturing (DfAM)", "Structural Topology Optimization"]
        }
    ],
    "CIVIL_LIKE": [
        {
            "title": "BIM 4D/5D Simulation & Seismic Analysis of an Earthquake-Resistant High-Rise Building",
            "domain": "Structural Engineering & Construction Management",
            "categoryTag": "Industry-inspired",
            "projectType": "Final Year Project",
            "difficulty": "Advanced",
            "problemStatement": "Urban tall buildings in seismic Zone IV/V suffer from shear wall failure during ground shaking and suffer from costly construction schedule delays.",
            "objective": "Model a 15-story residential building in Autodesk Revit, perform dynamic response spectrum seismic analysis in ETABS per IS 1893:2016, and link to Navisworks 4D schedule.",
            "features": ["Full 3D architectural and structural BIM modeling in Autodesk Revit", "Dynamic response spectrum and wind load analysis in ETABS", "Reinforced concrete member design (columns, beams, shear walls) complying with IS 13920 ductile detailing", "4D schedule simulation linking Primavera P6 Gantt chart with Navisworks BIM model", "5D quantity takeoff and cost estimation (Bill of Quantities - BOQ)"],
            "suggestedTech": ["Autodesk Revit", "ETABS", "Autodesk Navisworks", "Primavera P6", "AutoCAD"],
            "architecture": "Architectural Revit Model -> Structural Framing Export -> ETABS Load & Seismic Solver -> Reinforcement Detailing -> Navisworks 4D Time-Cost Simulation",
            "expectedOutcome": "Complete structural calculation drawings, storey drift verification graphs, and interactive 4D construction construction sequence video.",
            "skillsLearned": ["Seismic Code Compliance (IS 1893 / IS 13920)", "ETABS Response Spectrum Analysis", "BIM 4D Construction Simulation", "Structural Reinforcement Detailing"]
        },
        {
            "title": "Development of Sustainable Geopolymer Concrete Utilizing Fly Ash & GGBS",
            "domain": "Materials Technology & Sustainable Construction",
            "categoryTag": "Sustainable Tech",
            "projectType": "Research-oriented",
            "difficulty": "Intermediate",
            "problemStatement": "Traditional Ordinary Portland Cement (OPC) production accounts for ~8% of global CO2 emissions, demanding eco-friendly industrial byproduct alternatives.",
            "objective": "Formulate ambient-cured geopolymer concrete replacing 100% of cement using industrial fly ash and ground granulated blast-furnace slag (GGBS) activated by alkaline solutions.",
            "features": ["Mix proportion design varying sodium silicate (Na2SiO3) to sodium hydroxide (NaOH) molarity ratios", "Workability measurement using standard slump cone and compaction factor apparatus", "Compressive, split tensile, and flexural strength testing at 7, 14, and 28 days", "Durability assessment against acid attack (5% H2SO4) and water absorption", "Embodied carbon calculation comparing geopolymer concrete against M30 OPC concrete"],
            "suggestedTech": ["Compression Testing Machine (CTM)", "SEM / XRD Analysis", "Mix Design Algorithms", "Excel Data Modeling"],
            "architecture": "Industrial Byproduct Sourcing (Fly Ash/GGBS) -> Alkaline Activator Preparation -> Batch Mixing & Casting -> Ambient Curing -> Mechanical Testing -> Microstructural Evaluation",
            "expectedOutcome": "Tested geopolymer concrete specimens achieving >38 MPa 28-day compressive strength with a 65% reduction in embodied carbon.",
            "skillsLearned": ["Geopolymer Polymerization Chemistry", "Concrete Mix Design (IS 10262)", "Material Mechanical Testing", "Life-Cycle Carbon Assessment"]
        },
        {
            "title": "GIS-Based Urban Flood Modeling & Stormwater Drainage Capacity Optimization",
            "domain": "Water Resources Engineering & GIS",
            "categoryTag": "Smart Campus",
            "projectType": "Final Year Project",
            "difficulty": "Intermediate",
            "problemStatement": "Rapid urbanization causes impervious surface expansion leading to severe city flash floods during monsoon cloudbursts.",
            "objective": "Model an urban watershed in QGIS and EPA SWMM to simulate runoff volumes under different return-period storm events and design retention ponds.",
            "features": ["Digital Elevation Model (DEM) hydrological preprocessing (fill, flow direction, flow accumulation)", "Land use land cover (LULC) classification to calculate catchment runoff Curve Numbers (SCS-CN)", "Storm Water Management Model (SWMM) dynamic pipe network routing", "Identification of bottleneck manholes causing street waterlogging", "Design of sustainable urban drainage systems (SUDS) including bioswales and detention basins"],
            "suggestedTech": ["QGIS", "EPA SWMM", "HEC-RAS", "Google Earth Engine", "Python GIS"],
            "architecture": "Satellite DEM & Rainfall Data -> QGIS Catchment Delineation -> EPA SWMM Hydraulic Simulation -> Flood Inundation Map Generation -> Drainage Redesign",
            "expectedOutcome": "Inundation depth maps for 25-year and 50-year storm events and optimized storm pipe diameters eliminating urban flooding.",
            "skillsLearned": ["Hydrological Modeling (SCS-CN)", "Urban Stormwater Network Design", "QGIS Geospatial Analysis", "Hydraulic Flow Routing"]
        },
        {
            "title": "Automated Road Pavement Crack Detection using Smartphone LiDAR & Edge Vision",
            "domain": "Transportation Engineering & AI",
            "categoryTag": "Smart Campus",
            "projectType": "Mini Project",
            "difficulty": "Beginner",
            "problemStatement": "Municipal highway departments inspect road potholes and cracks manually, resulting in delayed repairs and highway accidents.",
            "objective": "Develop an automated vehicle-mounted inspection smartphone system that maps pavement potholes and cracks with GPS coordinates.",
            "features": ["YOLOv8 deep learning model trained on Indian road pothole and crack datasets", "Automated GPS coordinate geotagging when defect severity exceeds threshold", "Interactive web map displaying highway maintenance severity heatmaps", "Pavement Condition Index (PCI) score estimation per road kilometer", "Exportable CSV maintenance work-order generation for city municipal corporations"],
            "suggestedTech": ["Python", "YOLOv8", "OpenCV", "Leaflet.js", "GPS APIs"],
            "architecture": "Dashboard Video Stream -> Object Detection Inference -> GPS Geotagger -> Central Database -> Municipal Maintenance Dashboard",
            "expectedOutcome": "A real-time edge detection application detecting road distress at 30 FPS with automated geographic map pinpointing.",
            "skillsLearned": ["Computer Vision for Civil Infrastructure", "Pavement Distress Evaluation", "Web GIS Mapping", "Field Data Collection"]
        }
    ],
    "CHEMICAL_LIKE": [
        {
            "title": "Simulation & Optimization of a Divided Wall Column for Multi-Component Bioethanol Distillation",
            "domain": "Separation Processes & Process Modeling",
            "categoryTag": "Sustainable Tech",
            "projectType": "Final Year Project",
            "difficulty": "Advanced",
            "problemStatement": "Conventional two-column distillation trains for bioethanol purification consume excessive steam energy and increase operating costs.",
            "objective": "Simulate an energy-efficient Divided Wall Column (DWC) in DWSIM / Aspen Plus to achieve 99.5% ethanol purity with >30% energy reduction.",
            "features": ["Thermodynamic property method selection (NRTL / UNIQUAC with vapor phase association)", "Rigorous multi-stage vapor-liquid equilibrium (VLE) separation modeling", "Internal liquid and vapor split ratio optimization using sensitivity analysis", "Heat integration and reboiler duty minimization comparison against conventional column trains", "Dynamic control loop simulation for feed composition fluctuations"],
            "suggestedTech": ["DWSIM Simulator", "Aspen Plus", "MATLAB", "Python Chemical Engine"],
            "architecture": "Fermentation Broth Feed -> Pre-fractionation Zone -> Dividing Wall Separation -> Condenser & Splitter Reflux -> High-Purity Ethanol Product Stream",
            "expectedOutcome": "Validated flowsheet simulation demonstrating 99.6% ethanol mass recovery and 32% energy savings compared to conventional two-column systems.",
            "skillsLearned": ["Thermodynamic VLE Modeling", "Chemical Process Simulation (DWSIM)", "Distillation Column Hydraulics", "Energy Optimization"]
        },
        {
            "title": "Continuous Biodiesel Production from Waste Cooking Oil via Heterogeneous Catalysis",
            "domain": "Reaction Engineering & Green Chemistry",
            "categoryTag": "Sustainable Tech",
            "projectType": "Final Year Project",
            "difficulty": "Intermediate",
            "problemStatement": "Disposal of used cooking oil pollutes wastewater streams, while homogeneous catalysts in biodiesel synthesis require water-intensive washing stages.",
            "objective": "Synthesize a reusable solid calcium oxide (CaO) catalyst from waste eggshells to convert waste cooking oil into ASTM D6751 biodiesel in a packed-bed reactor.",
            "features": ["Catalyst synthesis and thermal calcination characterization (XRD, basicity testing)", "Transesterification reaction kinetics study varying methanol-to-oil molar ratio and temperature", "Gas Chromatography (GC-MS) analysis of Fatty Acid Methyl Esters (FAME) conversion", "Measurement of fuel properties (flash point, kinematic viscosity, cetane number, density)", "Catalyst reusability assessment over 5 consecutive batch cycles"],
            "suggestedTech": ["Packed Bed Reactor", "Gas Chromatography", "Viscometer", "DWSIM"],
            "architecture": "Waste Oil Pretreatment -> Methanol + Catalyst Mixing -> Packed-bed Transesterification -> Glycerol Gravitational Separation -> Biodiesel Purification",
            "expectedOutcome": "Yield >94% pure biodiesel meeting ASTM standards with zero wastewater discharge from heterogeneous catalyst recovery.",
            "skillsLearned": ["Heterogeneous Reaction Kinetics", "Biofuel Analytical Testing", "Waste-to-Energy Conversion", "Catalyst Characterization"]
        },
        {
            "title": "Industrial Effluent Treatment using Solar-Driven Advanced Photocatalytic Oxidation",
            "domain": "Environmental Chemical Engineering",
            "categoryTag": "Industrial Automation",
            "projectType": "Research-oriented",
            "difficulty": "Intermediate",
            "problemStatement": "Textile and dye industrial wastewater contains recalcitrant azo dye molecules that are immune to conventional biological aerobic digestion.",
            "objective": "Construct a continuous-flow solar photocatalytic reactor using synthesized TiO2/ZnO nanocomposites to degrade organic dyes.",
            "features": ["Nanocatalyst synthesis via sol-gel method and bandgap characterization", "Solar CPC (Compound Parabolic Concentrator) reactor design and fluid flow rate optimization", "Spectrophotometric UV-Vis monitoring of dye degradation kinetics", "Chemical Oxygen Demand (COD) and Total Organic Carbon (TOC) reduction measurement", "Toxicity bioassay evaluation of treated water on plant seed germination"],
            "suggestedTech": ["UV-Vis Spectrophotometer", "COD Digester", "CPC Solar Reactor", "Scilab"],
            "architecture": "Raw Effluent Inflow -> Peristaltic Metering Pump -> Solar Concentrator Tubular Reactor -> Photocatalyst Slurry Settler -> Decolorized Safe Water Discharge",
            "expectedOutcome": "Over 96% decolorization and 85% COD reduction achieved within 90 minutes of solar exposure.",
            "skillsLearned": ["Advanced Oxidation Processes (AOP)", "Spectrophotometric Analysis", "Industrial Wastewater Standards", "Photoreactor Scaling"]
        },
        {
            "title": "Process Safety HAZOP Analysis & Automated Emergency Shutdown Simulation",
            "domain": "Process Safety & Plant Engineering",
            "categoryTag": "Deep Tech",
            "projectType": "Mini Project",
            "difficulty": "Beginner",
            "problemStatement": "Chemical process plants handle flammable pressurized hydrocarbons where unexpected valve failures cause catastrophic explosions.",
            "objective": "Perform a rigorous Hazard and Operability (HAZOP) study on a continuous polymerization reactor and simulate automated Safety Instrumented System (SIS) interlocks.",
            "features": ["Piping and Instrumentation Diagram (P&ID) design following ISA-5.1 standards", "Comprehensive HAZOP node study applying guidewords (More Flow, Less Pressure, Reverse Flow)", "Safety Integrity Level (SIL) allocation using risk matrix and Layer of Protection Analysis (LOPA)", "Simulated high-pressure runaway reaction mitigation in MATLAB / Python", "Automated emergency depressurization and relief valve sizing per API 520"],
            "suggestedTech": ["AutoCAD P&ID", "MATLAB", "Excel Risk Assessment", "API 520 Codes"],
            "architecture": "Reactor P&ID -> Pressure/Temperature Telemetry -> Safety PLC Logic Controller -> Automated Emergency Vent Valve Ejection",
            "expectedOutcome": "Complete professional HAZOP audit worksheet, SIL determination report, and safety valve sizing calculation sheet.",
            "skillsLearned": ["Industrial Process Safety Management (PSM)", "HAZOP Study Methodology", "P&ID Drafting & Interpretation", "Safety Instrumented Systems (SIS)"]
        }
    ]
}

def get_template_for_dept(code):
    c = code.upper()
    if any(k in c for k in ["CSE", "IT", "AIDS", "AIML", "CYS", "CSBS", "CSD", "CCE", "CSE_AIML", "CSE_IOT", "CSE_TM"]):
        return PROJECT_TEMPLATES["CSE_LIKE"]
    elif any(k in c for k in ["ECE", "EEE", "VLSI", "ELCO", "MEDEL", "BME", "EIE", "ICE", "EEE_TI", "BTECH_VLSI"]):
        return PROJECT_TEMPLATES["ECE_LIKE"]
    elif any(k in c for k in ["CIVIL", "GEO", "ENVENG", "ENV_ST", "BECEE", "ARCH", "CIVIL_TM", "CIVIL_ENV"]):
        return PROJECT_TEMPLATES["CIVIL_LIKE"]
    elif any(k in c for k in ["CHEM", "BIOTECH", "BBE", "IBT", "PHARMA", "CEE", "PLASTIC", "PET", "PETRO", "PCT", "TXCHEM", "FOOD"]):
        return PROJECT_TEMPLATES["CHEMICAL_LIKE"]
    else:
        return PROJECT_TEMPLATES["MECH_LIKE"]

def generate_projects():
    projects = []
    
    for code, name, summary in DEPARTMENTS:
        templates = get_template_for_dept(code)
        
        for idx, tmpl in enumerate(templates, start=1):
            proj_id = f"proj-{code.lower()}-{idx}"
            
            # Tailor title to department identity
            title = tmpl["title"]
            if idx == 1 and code not in ["CSE", "ECE", "MECH", "CIVIL", "CHEM"]:
                title = f"{code}: {title}"
                
            project = {
                "id": proj_id,
                "deptCode": code,
                "department": name,
                "title": title,
                "domain": tmpl["domain"],
                "categoryTag": tmpl["categoryTag"],
                "projectType": tmpl["projectType"],
                "difficulty": tmpl["difficulty"],
                "problemStatement": tmpl["problemStatement"],
                "objective": tmpl["objective"],
                "features": tmpl["features"],
                "suggestedTech": tmpl["suggestedTech"],
                "architecture": tmpl["architecture"],
                "expectedOutcome": tmpl["expectedOutcome"],
                "skillsLearned": tmpl["skillsLearned"]
            }
            projects.append(project)

    return projects

if __name__ == "__main__":
    fallback_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "js", "data", "fallbackData.js"))
    text = open(fallback_path, encoding='utf-8').read()
    m = re.search(r'window\.AppFallbackData\s*=\s*(\{.*\});', text, re.DOTALL)
    if not m:
        print("Could not parse fallbackData.js")
        exit(1)

    data = json.loads(m.group(1))
    
    # 1. Clear old hollow content completely
    old_count = len(data.get("projects", []))
    print(f"Clearing old projects content (previous count: {old_count})...")
    
    # 2. Newly add complete, rich project ideas
    new_projects = generate_projects()
    data["projects"] = new_projects
    print(f"Newly added {len(new_projects)} high-quality engineering project ideas across all {len(DEPARTMENTS)} departments!")

    new_js = "/**\n * Application Fallback Data for Offline/Demo Mode\n */\n\nwindow.AppFallbackData = " + json.dumps(data, indent=2, ensure_ascii=False) + ";\n"
    with open(fallback_path, "w", encoding="utf-8") as f:
        f.write(new_js)

    print(f"Successfully saved fresh project ideas to {fallback_path}.")
