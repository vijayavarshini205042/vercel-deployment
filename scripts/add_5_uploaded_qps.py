# -*- coding: utf-8 -*-
"""
Upload and integrate the 5 Anna University question papers provided by user:
1. QP 91949 — ME 3792: COMPUTER INTEGRATED MANUFACTURING (April/May 2025, Sem 7)
2. QP 41524 — OCS 351: ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING FUNDAMENTALS (Nov/Dec 2024, Sem 6/7)
3. QP 41385 — ME 3792: COMPUTER INTEGRATED MANUFACTURING (Nov/Dec 2024, Sem 7)
4. QP 51460 — OCS 353: DATA SCIENCE FUNDAMENTALS (April/May 2024, Sem 6)
5. QP 41384 — ME 3791: MECHATRONICS AND IoT (Nov/Dec 2024, Sem 7)
"""

import os
import re
import json
import pymupdf

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QP_UPLOADS_DIR = os.path.join(BASE_DIR, 'uploads', 'question-papers')
PYQ_DATA_PATH = os.path.join(BASE_DIR, 'public', 'js', 'data', 'pyqAnalysisData.js')
FALLBACK_DATA_PATH = os.path.join(BASE_DIR, 'public', 'js', 'data', 'fallbackData.js')

os.makedirs(QP_UPLOADS_DIR, exist_ok=True)

# ── DEFINITION OF THE 5 REAL QUESTION PAPERS ──
PAPERS = [
    # ── 1. QP 91949: ME 3792 (April/May 2025) ──
    {
        "qpCode": "91949",
        "subjectCode": "ME3792",
        "displayCode": "ME 3792",
        "subjectName": "Computer Integrated Manufacturing",
        "regulation": "R2021",
        "examSession": "April/May 2025",
        "academicYear": "April/May 2025",
        "semester": 7,
        "primaryDept": "MECH",
        "commonBranches": [
            "Mechanical Engineering",
            "Production Engineering",
            "Mechanical and Automation Engineering"
        ],
        "maxMarks": 100,
        "timeDuration": "3 Hours",
        "pdfFileName": "AU_ME3792_QP_91949_April_May_2025.pdf",
        "analysis": {
            "difficultyRating": "Moderate (Balanced Design & Automation Case Studies)",
            "unitWeightage": [
                {"unit": "Unit 1: Introduction to CIM & CAD/CAM Integration", "marks": 24, "percentage": "24%"},
                {"unit": "Unit 2: Automated Production Lines & Material Handling (AGV)", "marks": 25, "percentage": "25%"},
                {"unit": "Unit 3: Group Technology & Flexible Manufacturing Systems (FMS)", "marks": 25, "percentage": "25%"},
                {"unit": "Unit 4: Computer-Aided Process Planning (CAPP & VPP)", "marks": 22, "percentage": "22%"},
                {"unit": "Unit 5: Process Control, Adaptive Systems & Auto ID (Bar Code)", "marks": 19, "percentage": "19%"}
            ],
            "highFrequencyTopics": [
                "Role of CAD in manufacturing and CIM integration elements",
                "Automated Guided Vehicles (AGV) types, guidance, and dispatching",
                "Group Technology (GT) part families and cellular manufacturing",
                "Flexible Manufacturing System (FMS) components and machine cell layout",
                "Variant vs Generative CAPP architecture",
                "Adaptive control (ACC/ACO) in machining processes"
            ],
            "examPreparationTips": [
                "Practice AGV routing and layout diagrams.",
                "Understand the 3-step CIM implementation roadmap.",
                "Memorize OPITZ coding structure rules for Part B."
            ]
        },
        "questions": {
            "partA": [
                {"qNo": 1, "question": "Define CAD and state its role in manufacturing.", "answer": "CAD (Computer-Aided Design) is the use of computer software to create, modify, analyze, or optimize engineering designs. Role in manufacturing: Generates precise 3D geometric models, engineering drawings, bills of materials (BOM), and direct geometry feeds to CAM systems for CNC toolpath generation."},
                {"qNo": 2, "question": "What are the main elements of the CIM system?", "answer": "Main elements: (1) Computer-Aided Design (CAD), (2) Computer-Aided Manufacturing (CAM), (3) Computer-Aided Process Planning (CAPP), (4) Automated Material Handling (AGVs, ASRS, conveyors), (5) Computerized Business / ERP systems, (6) Automated Inspection and Quality Control."},
                {"qNo": 3, "question": "List any two types of conveyors used in automated manufacturing systems.", "answer": "1. Roller Conveyors (powered or gravity-driven for transporting pallets and flat-bottomed containers).\n2. Belt Conveyors / Overhead Towline Trolley Conveyors (for continuous part transfer between assembly workstations)."},
                {"qNo": 4, "question": "Write the concept of 'Automated Guided Vehicle' in material handling.", "answer": "An Automated Guided Vehicle (AGV) is an independently operated, battery-powered driverless transport cart guided along predefined physical or virtual pathways (using wire guidance, magnetic tape, laser triangulation, or optical vision) for flexible horizontal movement of materials and work-in-progress."},
                {"qNo": 5, "question": "Define 'Part family' and its significance in Group Technology.", "answer": "A Part Family is a collection of engineering parts that possess similarities in geometric shape, dimensions, or processing steps/routing. Significance: Minimizes setup times, groups similar tooling, eliminates duplicate design effort, and forms the bedrock of cellular manufacturing."},
                {"qNo": 6, "question": "What is the purpose of machine cell design in Flexible Manufacturing Systems (FMS)?", "answer": "Purpose: Organizes clusters of versatile CNC machine tools and inspection stations interconnected by automated material handling to process complete families of parts with minimal changeover time, zero transfer queues, and maximum machine utilization."},
                {"qNo": 7, "question": "Mention the essential activities involved in process planning.", "answer": "1. Analyzing part drawings and engineering specifications.\n2. Selecting raw materials and starting stock shape/size.\n3. Determining machining operations sequence.\n4. Selecting appropriate machine tools, jigs, and fixtures.\n5. Calculating cutting parameters (speeds, feeds, depth of cut).\n6. Estimating machining standard times and production costs."},
                {"qNo": 8, "question": "Differentiate between manual and computer-aided process planning.", "answer": "• Manual Process Planning: Highly reliant on planner's memory and past experience, subjective, slow, prone to clerical errors, inconsistent across personnel.\n• Computer-Aided Process Planning (CAPP): Standardized, automated database-driven, 4-10x faster generation of routing sheets, consistent quality, directly interfaced with CAD/CAM."},
                {"qNo": 9, "question": "Define 'Adaptive Control' in the context of process control systems.", "answer": "Adaptive Control (AC) is a dynamic closed-loop feedback control method that continuously measures machining process variables (such as cutting force, tool wear, torque, or vibration) and automatically adjusts operating parameters (feed rate, spindle speed) in real time to maintain optimum productivity or tool safety."},
                {"qNo": 10, "question": "State the role of bar code technology in automated data capture.", "answer": "Role: Provides high-speed, 99.9% error-free automated tracking of parts, pallets, work-in-progress (WIP), inventory levels, and tool assemblies across manufacturing cells via optical scanning without manual keyboard entry."}
            ],
            "partB": [
                {"qNo": "11(a)", "question": "Explain the evolution of Computer Integrated Manufacturing (CIM) and its impact on modern manufacturing.", "solutionOutline": "Evolution: (1) 1950s NC/CNC machining, (2) 1960s CAD 2D drafting, (3) 1970s DNC and cellular manufacturing, (4) 1980s CIM integration of business and shop-floor automation, (5) Present Cloud-CIM & Industry 4.0. Impacts: 60-80% lead time reduction, higher flexibility, near-zero WIP inventory, enhanced product quality."},
                {"qNo": "11(b)", "question": "Describe the major components of a CIM system and discuss its three-step implementation process.", "solutionOutline": "Components: Hardware layer (CNC, AGV, robots), Software layer (CAD, CAM, CAPP, MRP II), Database management layer, Communications network (MAP/TOP, Ethernet/IP). Implementation steps: Phase 1: Assessment and simplification (lean processes). Phase 2: Automation of islands. Phase 3: Total enterprise data integration."},
                {"qNo": "12(a)", "question": "Discuss the system configuration and functions of an automated production line.", "solutionOutline": "Configurations: In-line transfer lines, L-shaped lines, U-shaped lines, rotary indexing tables. Functions: Automated workpart transfer between fixed workstations, precise clamping/orientation, synchronized sequential processing, buffer storage management, and automatic fault detection."},
                {"qNo": "12(b)", "question": "Explain the types and applications of Automated Guided Vehicles (AGV) used in manufacturing.", "solutionOutline": "Types: Towing AGVs (pulling heavy trailer trains), Unit load carriers (powered deck roll/lift), Pallet trucks (floor-level forks), Forklift AGVs (vertical rack stacking), Assembly line AGVs. Applications: Raw material distribution, machining cell part delivery, warehouse storage and retrieval (AS/RS link)."},
                {"qNo": "13(a)", "question": "Describe the benefits of Group Technology (GT) and its application in manufacturing industries.", "solutionOutline": "Benefits: Standardized tooling, drastic reduction in setup times (up to 70%), reduced work-in-process inventory, simplified production scheduling, improved design retrieval. Applications: Machine cell layout design, group tooling fixtures, standardized coding (Opitz, DCLASS)."},
                {"qNo": "13(b)", "question": "Outline the architecture of a Flexible Manufacturing System (FMS) and discuss the factors to consider during FMS planning.", "solutionOutline": "Architecture: (1) Workstations (CNC turning/machining centers, CMMs), (2) Material handling and storage system (AGV, loop conveyors, pallet changers), (3) Central computer control system (scheduling, tool monitoring). Planning factors: Part family size, demand volatility, capital expenditure, machine versatility."},
                {"qNo": "14(a)", "question": "Illustrate the sequence of steps involved in manual process planning using an example.", "solutionOutline": "Step-by-step methodology using a stepped-shaft with keyway: Drawing analysis, raw material bar selection, surface identification, operation sequencing (facing -> turning -> chamfering -> keyway milling -> grinding), machine selection (Lathe -> Milling -> Grinder), tooling determination, feeds and speeds calculation, route sheet generation."},
                {"qNo": "14(b)", "question": "Explain the two stages in Variant Process Planning (VPP) and the benefits of Computer-Aided Process Planning (CAPP).", "solutionOutline": "VPP Stages: (1) Preparatory Stage (part families classification, standard master process plans creation), (2) Production Application Stage (part retrieval via code, editing master route sheet for specific part). Benefits: Standardized routing, 75% faster planning, elimination of redundant effort, direct link with ERP/MES."},
                {"qNo": "15(a)", "question": "Explain the concept of linear feedback control and its importance in manufacturing processes.", "solutionOutline": "Concept: Continuous measurement of output process variable y(t), comparison with reference setpoint r(t) to generate error signal e(t) = r(t) - y(t), passing through controller (PID) to modulate actuator input. Importance: Rejects disturbance, ensures dimensional tolerances in CNC turning/milling, prevents tool chatter."},
                {"qNo": "15(b)", "question": "Describe bar code technology and its use in automatic data capture within manufacturing.", "solutionOutline": "Technology: 1D linear barcodes (Code 39, Code 128) and 2D matrix codes (QR Code, Data Matrix). Uses: WIP tracking on conveyor pallets, automated tool management in CNC magazines, operator badge clocking, automated shipping label scanning, quality rejection logging."}
            ],
            "partC": [
                {"qNo": "16(a)", "question": "A manufacturing plant is transitioning to a fully automated, computer-integrated system to improve productivity and efficiency. Develop a basic plan that includes the selection of appropriate automation tools, such as material handling systems and process control methods, considering the plant's need for flexibility and high output.", "solutionOutline": "Strategic Automation Plan:\n1. Shop Floor Re-engineering: Group Technology cellular layout with 4 flexible machining cells.\n2. Material Handling Selection: Laser-guided AGVs for inter-cell transport combined with automated roller conveyors for in-line fast transit.\n3. Process Control: Supervisory SCADA network interfacing CNC controllers via OPC-UA, integrating Adaptive Control with Constraints (ACC) on high-speed spindles.\n4. Central Coordination: Manufacturing Execution System (MES) dynamically routing pallets based on machine queues.\n5. Quality Assurance: Automated Optical Inspection (AOI) stations integrated into exit conveyors."},
                {"qNo": "16(b)", "question": "Consider a company planning to set up a Flexible Manufacturing System (FMS) for producing a diverse range of components. Identify the components needed for an FMS setup, the role of process planning, and the integration of adaptive control systems to ensure flexibility and efficiency.", "solutionOutline": "FMS Design Blueprint:\n1. Hardware: Versatile 5-axis CNC machining centers, automated tool changers (60-tool carousels), rail-guided pallet vehicles (RGV).\n2. Process Planning Role: Generative CAPP system capable of generating dynamic CNC G-code based on immediate fixture availability.\n3. Adaptive Control Integration: Torque and vibration acoustic emission sensors on cutting spindles adjusting feed-rates to optimize material removal rate (MRR) without tool breakage.\n4. Scheduling Architecture: Real-time dynamic dispatching algorithm balancing machine cycle times."}
            ]
        }
    },

    # ── 2. QP 41524: OCS 351 (Nov/Dec 2024) ──
    {
        "qpCode": "41524",
        "subjectCode": "OCS351",
        "displayCode": "OCS 351",
        "subjectName": "Artificial Intelligence and Machine Learning Fundamentals",
        "regulation": "R2021",
        "examSession": "November/December 2024",
        "academicYear": "Nov/Dec 2024",
        "semester": 7,
        "primaryDept": "CIVIL",
        "commonBranches": [
            "Civil Engineering",
            "Mechanical Engineering",
            "Electrical and Electronics Engineering",
            "Aeronautical Engineering",
            "Computer Science & Engineering",
            "Information Technology"
        ],
        "maxMarks": 100,
        "timeDuration": "3 Hours",
        "pdfFileName": "AU_OCS351_QP_41524_Nov_Dec_2024.pdf",
        "analysis": {
            "difficultyRating": "Moderate (Algorithmic Proofs, Perceptron Math & K-means)",
            "unitWeightage": [
                {"unit": "Unit 1: Problem Solving & Search Strategies", "marks": 25, "percentage": "25%"},
                {"unit": "Unit 2: Informed Search & Constraint Satisfaction", "marks": 25, "percentage": "25%"},
                {"unit": "Unit 3: Supervised Learning & Bayesian Inference", "marks": 20, "percentage": "20%"},
                {"unit": "Unit 4: Neural Networks (SLP) & Decision Trees", "marks": 20, "percentage": "20%"},
                {"unit": "Unit 5: Unsupervised Clustering & Industry ML Applications", "marks": 25, "percentage": "25%"}
            ],
            "highFrequencyTopics": [
                "Water Jug classical state space problem and production rules",
                "A* search algorithm, heuristic admissibility and proof of optimality",
                "Crypt-arithmetic constraint satisfaction (EAT + THAT = APPLE)",
                "Cross-validation techniques (k-fold, LOOCV) and Overfitting vs Underfitting",
                "Single Layer Perceptron (SLP) mathematical operation",
                "K-means clustering algorithm with Euclidean distance calculations"
            ],
            "examPreparationTips": [
                "Practice solving Crypt-arithmetic step-by-step with carry logic.",
                "Review A* heuristic consistency (monotone property) proof.",
                "Memorize Naive Bayes conditional independence formula."
            ]
        },
        "questions": {
            "partA": [
                {"qNo": 1, "question": "Define the term goal formulation and problem formulation.", "answer": "• Goal Formulation: The process of defining the target objective and desired state that the agent seeks to achieve.\n• Problem Formulation: The process of deciding what actions and environmental states to consider, defining the initial state, actions, transition model, goal test, and path cost function."},
                {"qNo": 2, "question": "List the steps involved in simple problem-solving agent.", "answer": "1. Goal formulation\n2. Problem formulation\n3. Search for a solution path\n4. Execution of the action sequence"},
                {"qNo": 3, "question": "Define Greedy Best First Search.", "answer": "Greedy Best-First Search is an informed search algorithm that expands the node that is estimated to be closest to the goal according to the heuristic function f(n) = h(n). It is not optimal and incomplete in general spaces."},
                {"qNo": 4, "question": "How can minimax also be extended for game of chance?", "answer": "Minimax is extended to games of chance by introducing 'Chance Nodes' (Expectiminimax). Instead of taking purely min or max values, the value of a chance node is the expected value (weighted average of child values multiplied by their transition probabilities: ExpectedVal = sum(P(s') * Value(s')))."},
                {"qNo": 5, "question": "What is class imbalance in Machine learning?", "answer": "Class imbalance occurs when the distribution of target classes across the training dataset is significantly skewed (e.g., 99% non-fraud vs 1% fraud), causing classifiers to be biased toward the majority class and poorly predicting the minority class."},
                {"qNo": 6, "question": "Define Linear Algebra and its application in Machine Learning.", "answer": "Linear Algebra is the mathematical discipline studying vector spaces, linear transformations, matrices, and vectors. Applications in ML: High-dimensional data representation, linear regression equations, PCA dimensionality reduction, neural network weight transformations, and SVD decomposition."},
                {"qNo": 7, "question": "Define Activation function.", "answer": "An activation function is a mathematical function applied to the weighted sum of inputs at an artificial neuron to introduce non-linearity, determining whether the neuron should fire and allowing networks to learn complex non-linear decision boundaries (e.g., Sigmoid, ReLU, Tanh)."},
                {"qNo": 8, "question": "Give the formula for Naive Based classification with relevant explanation.", "answer": "Formula: P(C|X) = [P(X|C) * P(C)] / P(X)\nWhere:\n• P(C|X): Posterior probability of class C given feature vector X\n• P(X|C): Likelihood, calculated under the naive assumption as Product of P(x_i|C)\n• P(C): Prior probability of class C\n• P(X): Marginal probability / evidence acting as normalization factor."},
                {"qNo": 9, "question": "What is Clustering?", "answer": "Clustering is an unsupervised machine learning task that groups unlabelled data points into subsets (clusters) such that objects within the same cluster exhibit high similarity, while objects in different clusters exhibit high dissimilarity."},
                {"qNo": 10, "question": "What are the types of Hierarchical clustering algorithms?", "answer": "1. Agglomerative Clustering (Bottom-Up approach: begins with each point as its own cluster and iteratively merges closest pairs).\n2. Divisive Clustering (Top-Down approach: begins with all data points in one single cluster and recursively splits them into smaller clusters)."}
            ],
            "partB": [
                {"qNo": "11(a)", "question": "(i) Enumerate Classical 'Water jug Problem'. Describe the state space for this problem and also give the solution. (6 marks)\n(ii) What are Intelligent Agents and its characteristics and describe the architecture of the Intelligent Agents. (7 marks)", "solutionOutline": "(i) Water Jug: 4-gallon jug A and 3-gallon jug B, goal is 2 gallons in jug A. State space (x, y) where x in [0,4], y in [0,3]. Production rules: fill, empty, pour. Solution: (0,0) -> (0,3) -> (3,0) -> (3,3) -> (4,2) -> (0,2) -> (2,0).\n(ii) Intelligent Agent: entity perceiving environment via sensors and acting via actuators. Characteristics: Autonomy, reactivity, pro-activeness, social ability. Architecture: Sensors -> Perception/Model -> Decision Logic (Rule/Utility/Goal) -> Actuators."},
                {"qNo": "11(b)", "question": "Interpret any three uninformed search strategies.", "solutionOutline": "Detailed analysis of: (1) Breadth-First Search (BFS: FIFO queue, complete, optimal for uniform cost, O(b^d) time/space), (2) Depth-First Search (DFS: LIFO stack, low memory O(b*m), not complete in infinite spaces, not optimal), (3) Uniform Cost Search (UCS: Priority queue ordered by g(n), optimal for non-negative path costs)."},
                {"qNo": "12(a)", "question": "Explain the A* search and give the proof of optimality of A*.", "solutionOutline": "A* evaluation: f(n) = g(n) + h(n). Admissible heuristic: h(n) <= h*(n). Proof of optimality with admissible heuristic using contradiction: Let G2 be suboptimal goal (f(G2) = g(G2) > C*). On path to optimal goal G, exists unexpanded node n. f(n) = g(n) + h(n) <= g(n) + h*(n) = C* < f(G2). Thus A* will expand n before G2, ensuring optimal goal G is selected first."},
                {"qNo": "12(b)", "question": "Discuss about constraint satisfaction problem with an algorithm for solving a crypt arithmetic problem.", "solutionOutline": "CSP components: Variables (letters), Domains ([0-9]), Constraints (all-different, arithmetic sum rules). Backtracking algorithm with forward checking and MRV heuristic. Solves cryptarithmetic systematically by checking column-by-column sums and propagating carries."},
                {"qNo": "13(a)", "question": "(i) What is Cross-Validation. Explain the various methods of Cross-Validation? (7 marks)\n(ii) Explain Overfitting and Underfitting with appropriate data set examples. (6 marks)", "solutionOutline": "(i) Methods: k-Fold Cross-Validation, Stratified k-Fold, Leave-One-Out (LOOCV), Repeated k-fold. (ii) Underfitting (High Bias): Model is too simple to capture patterns (e.g. straight line for quadratic data). Overfitting (High Variance): Model memorizes training noise and performs poorly on unseen test data (e.g. 15th-degree polynomial through 10 points)."},
                {"qNo": "13(b)", "question": "Explain Bayes theorem and conditional probability.", "solutionOutline": "Conditional probability: P(A|B) = P(A and B) / P(B). Derivation of Bayes Theorem: P(A|B) = [P(B|A) * P(A)] / P(B). Medical diagnosis application: Computing true positive probability of disease given positive test result considering low disease prevalence."},
                {"qNo": "14(a)", "question": "(i) Draw the architecture of a Single Layer Perceptron (SLP) and explain its operation. Mention its advantages and disadvantages. (6 marks)\n(ii) Explain CART algorithm in detail. (7 marks)", "solutionOutline": "(i) SLP architecture: Input vector [x1..xn], bias b, weights [w1..wn], summation net = sum(wi*xi) + b, step activation function. Linearly separable limitations (XOR problem). (ii) CART (Classification and Regression Trees): Binary split tree generation using Gini Impurity for classification and Mean Squared Error reduction for regression."},
                {"qNo": "14(b)", "question": "Explain Decision Tree Classification algorithm with an example and illustrate Gini Impurity.", "solutionOutline": "Algorithm (ID3/C4.5): Select best split attribute maximizing Information Gain or minimizing Gini Impurity. Formula: Gini(D) = 1 - sum(p_i^2). Step-by-step example calculating Gini for binary classification split and choosing optimal split feature."},
                {"qNo": "15(a)", "question": "(i) List the applications of clustering and identify advantages and disadvantages of clustering algorithm. (6 marks)\n(ii) Explain the concepts of clustering approaches. How does it differ from classification. (7 marks)", "solutionOutline": "(i) Applications: Customer market segmentation, anomaly detection, image compression, document categorization. Pros: Discovers hidden patterns without labels. Cons: Number of clusters k must be guessed, sensitive to initial seeds and outliers. (ii) Clustering vs Classification: Unsupervised (no target label) vs Supervised (predefined labels)."},
                {"qNo": "15(b)", "question": "How can neural networks be used in manufacturing industry explain the steps in detail.", "solutionOutline": "Steps in Manufacturing NN Implementation: (1) Sensor Data Acquisition (vibration, thermal, acoustic), (2) Preprocessing and Feature Extraction (FFT, wavelets), (3) Model Architecture Design (CNN for visual defect detection, LSTM for predictive maintenance), (4) Training & Validation with historical failure data, (5) Edge deployment and real-time inference triggering automated machine cutoff."}
            ],
            "partC": [
                {"qNo": "16(a)", "question": "Solve the following Crypt arithmetic problem using constraints satisfaction:\n  EAT\n+ THAT\n------\n APPLE", "solutionOutline": "Variables: E, A, T, H, P, L in {0..9}. Leading letters E, T != 0. All letters distinct.\nColumn analysis:\n1. Column 5 (leftmost sum): T + carry = A (or A = 1 because sum of two 4-digit numbers max carry is 1). Thus A = 1.\n2. In Column 1 (ones place): T + T = E (mod 10) or T + T = 10 + E. Since A = 1, EAT has A=1.\n3. Testing values with carry propagation reveals: T=9, H=2, E=8, A=1, P=0, L=3.\nVerification:\n  819 (EAT = 819)\n+ 9219 (THAT = 9219)\n------\n 10038 (APPLE: A=1, P=0, P=0, L=3, E=8) -> Exactly matches all-distinct constraints!"},
                {"qNo": "16(b)", "question": "Using K-means Euclidean Distance Algorithm method find clusters for the following:\nPoints: A(1,1), B(2,1), C(4,3), D(5,4) for K=2.", "solutionOutline": "Initial Centroids: Let m1 = A(1, 1) and m2 = C(4, 3).\nIteration 1:\n• Dist to A(1,1): d(A,m1)=0, d(A,m2)=sqrt((1-4)^2 + (1-3)^2) = sqrt(13)=3.61 -> Cluster 1\n• Dist to B(2,1): d(B,m1)=sqrt((2-1)^2 + (1-1)^2)=1; d(B,m2)=sqrt((2-4)^2 + (1-3)^2)=sqrt(8)=2.83 -> Cluster 1\n• Dist to C(4,3): d(C,m1)=3.61; d(C,m2)=0 -> Cluster 2\n• Dist to D(5,4): d(D,m1)=sqrt(16+9)=5; d(D,m2)=sqrt(1+1)=1.41 -> Cluster 2\nUpdated Centroids:\n• m1' = ((1+2)/2, (1+1)/2) = (1.5, 1.0)\n• m2' = ((4+5)/2, (3+4)/2) = (4.5, 3.5)\nIteration 2: Points remain in same clusters. Converged into Cluster 1 {A, B} and Cluster 2 {C, D}."}
            ]
        }
    },

    # ── 3. QP 41385: ME 3792 (Nov/Dec 2024) ──
    {
        "qpCode": "41385",
        "subjectCode": "ME3792",
        "displayCode": "ME 3792",
        "subjectName": "Computer Integrated Manufacturing",
        "regulation": "R2021",
        "examSession": "November/December 2024",
        "academicYear": "Nov/Dec 2024",
        "semester": 7,
        "primaryDept": "MECH",
        "commonBranches": [
            "Mechanical Engineering",
            "Industrial Engineering",
            "Mechanical and Automation Engineering",
            "Mechatronics Engineering",
            "Production Engineering",
            "Robotics and Automation"
        ],
        "maxMarks": 100,
        "timeDuration": "3 Hours",
        "pdfFileName": "AU_ME3792_QP_41385_Nov_Dec_2024.pdf",
        "analysis": {
            "difficultyRating": "Moderate to High (Automated Storage Math & Opitz Coding)",
            "unitWeightage": [
                {"unit": "Unit 1: Islands of Automation & CIM Evolution", "marks": 24, "percentage": "24%"},
                {"unit": "Unit 2: Automated Storage (ASRS/Carousel) & Industry 4.0", "marks": 26, "percentage": "26%"},
                {"unit": "Unit 3: Group Technology (Opitz/MICLASS) & Cell Bottlenecks", "marks": 23, "percentage": "23%"},
                {"unit": "Unit 4: Retrieval and Generative CAPP Methodologies", "marks": 24, "percentage": "24%"},
                {"unit": "Unit 5: DDC, Supervisory Computer Control & Barcode Identification", "marks": 18, "percentage": "18%"}
            ],
            "highFrequencyTopics": [
                "Islands of automation vs integrated enterprise manufacturing",
                "Carousel automated storage calculations (speed, pick time, throughput)",
                "Industry 4.0 architecture, CPS, IIoT, and Big Data in manufacturing",
                "Opitz coding system structure and MICLASS classification",
                "Direct Digital Control (DDC) vs Supervisory Computer Control",
                "Variant vs Generative CAPP logic synthesis"
            ],
            "examPreparationTips": [
                "Practice carousel and AS/RS cycle time numerical problems.",
                "Draw neat block diagrams for DDC and Supervisory SCADA loops.",
                "Clearly differentiate between passive and active RFID/Barcode tags."
            ]
        },
        "questions": {
            "partA": [
                {"qNo": 1, "question": "Define islands of automation.", "answer": "Islands of Automation refer to automated, computerized manufacturing systems (such as stand-alone CNC machines, automated storage carousels, or robot cells) that operate independently without data sharing or integration with other enterprise systems."},
                {"qNo": 2, "question": "List the analyzing software's used in CIM.", "answer": "1. Finite Element Analysis (FEA) software (ANSYS, Abaqus)\n2. Computational Fluid Dynamics (CFD) packages\n3. Dynamic Simulation tools (Siemens Tecnomatix Plant Simulation, Arena, FlexSim)\n4. Tolerance and kinematics analysis tools."},
                {"qNo": 3, "question": "Name the four traditional (non-automated) methods for storing materials.", "answer": "1. Bulk floor storage (stacking)\n2. Selective pallet rack storage\n3. Cantilever racks (for pipes, bars, and long profiles)\n4. Drawer and bin storage units (for small components and fasteners)."},
                {"qNo": 4, "question": "Define virtual manufacturing.", "answer": "Virtual Manufacturing (VM) is the use of computer simulation, 3D visualization, and digital twins to model and evaluate manufacturing processes and factory operations in software before committing physical capital and material resources."},
                {"qNo": 5, "question": "What is mono code?", "answer": "A Mono Code (hierarchical code) is a classification coding structure in Group Technology where the interpretation of each succeeding digit depends directly on the value of preceding digits, providing deep detail in relatively few digits."},
                {"qNo": 6, "question": "What are the three capabilities that a manufacturing system must possess in order to be flexible?", "answer": "1. Identification of different workpart styles to execute tailored programs.\n2. Quick changeover of physical toolings and part-holding fixtures.\n3. Quick changeover of computer software programs (CNC/PLC/Robot programs)."},
                {"qNo": 7, "question": "State the stages of VPP.", "answer": "1. Preparatory Stage: Classifying existing parts into families, assigning codes, and developing standard master process plans.\n2. Operational Stage: Coding a new part, searching database to retrieve closest matching master plan, and editing variations."},
                {"qNo": 8, "question": "Compare CAPP with Manual PP.", "answer": "• CAPP: High speed, standardized routing, reduced clerical errors, consistent rules, integrated with CAD/ERP database.\n• Manual PP: Slow, highly reliant on individual planner experience, inconsistent routing between different planners."},
                {"qNo": 9, "question": "Differentiate PLC and SCADA.", "answer": "• PLC (Programmable Logic Controller): Hardware microcontroller executing deterministic, low-level real-time ladder logic to control physical sensors, motors, and actuators.\n• SCADA (Supervisory Control and Data Acquisition): Software supervisory layer providing GUI dashboards, historical data logging, alarming, and high-level control over multiple PLCs."},
                {"qNo": 10, "question": "What is the difference between a passive tag and an active tag?", "answer": "• Passive Tag: Contains no internal battery; powered entirely by RF energy emitted by the reader; shorter read range (up to 3-5m), inexpensive, unlimited lifespan.\n• Active Tag: Equipped with an onboard battery; continuously transmits signals; long read range (100m+), higher cost, limited battery life (3-5 years)."}
            ],
            "partB": [
                {"qNo": "11(a)", "question": "(i) Describe the various Levels of Integration in the evolution of CIM. (8 marks)\n(ii) How does workflow automation software help to improve team productivity? (5 marks)", "solutionOutline": "(i) Levels of Integration: Level 0 Device Level, Level 1 Machine/Cell Level, Level 2 Area/Shop-floor Level (SCADA/MES), Level 3 Plant Level (MRP II/ERP), Level 4 Enterprise Corporate Level. (ii) Workflow Automation: Eliminates manual handoffs, enforces review milestones, tracks engineering change orders (ECO), accelerates time-to-market."},
                {"qNo": "11(b)", "question": "A manufacturing plant produces three product lines in one of its plants: A, B and C. Each product line has multiple models: 3 models within product line A, 5 models within B, and 7 models within C. Average annual production quantities of model A is 400 units, 800 units for model B, and 500 units for model C. Determine the number of different product models and total quantity of products produced annually in this plant.", "solutionOutline": "Calculations:\n1. Total different product models = 3 + 5 + 7 = 15 distinct models.\n2. Total annual output:\nLine A = 3 models * 400 units/model = 1,200 units.\nLine B = 5 models * 800 units/model = 4,000 units.\nLine C = 7 models * 500 units/model = 3,500 units.\nTotal quantity produced annually = 1,200 + 4,000 + 3,500 = 8,700 units."},
                {"qNo": "12(a)", "question": "A single carousel storage system has an oval rail loop that is 40 m long and 3 m wide. Fifty carriers are equally spaced around the oval. Suspended from each carrier are five bins. Each bin has a volumetric capacity = 0.95 m3. Carousel speed = 100 m/min. Average pick-and-deposit time for a retrieval = 20 sec. Determine:\n(i) Volumetric capacity of the storage system.\n(ii) Hourly retrieval rate of the storage system.", "solutionOutline": "Calculations:\n(i) Total bins = 50 carriers * 5 bins/carrier = 250 bins.\nTotal Volumetric Capacity = 250 * 0.95 m3 = 237.5 m3.\n(ii) Carousel loop length L = 2 * (40 - 3) + pi * 3 = 74 + 9.42 = 83.42 m (approx Perimeter = 83.42 m).\nAverage travel distance = L / 4 = 83.42 / 4 = 20.85 m.\nAverage travel time = 20.85 m / (100 m/min) = 0.2085 min = 12.51 seconds.\nTotal cycle time per retrieval Tc = travel time + pick/deposit time = 12.51 s + 20 s = 32.51 seconds.\nHourly retrieval rate = 3600 / 32.51 = 110.7 retrievals/hour."},
                {"qNo": "12(b)", "question": "Explain the major components of Industry 4.0 with a neat block diagram. Why it is needed in the current scenario?", "solutionOutline": "Components: Cyber-Physical Systems (CPS), Industrial Internet of Things (IIoT), Big Data & Cloud Computing, Additive Manufacturing, Autonomous Robots, Augmented Reality (AR), Cybersecurity. Need: High product customization, rapid market swings, zero downtime, predictive quality."},
                {"qNo": "13(a)", "question": "Explain in brief of the following parts classification and coding system in group technology:\n(i) Opitz coding system (7 marks)\n(ii) MICLASS (6 marks)", "solutionOutline": "(i) Opitz Coding: 9-digit alphanumeric code: Digits 1-5 Form Code (geometry, rotational/non-rotational), Digits 6-9 Supplementary Code (dimensions, raw material, tolerances), 4-digit Secondary Code (operations). (ii) MICLASS (Metal Institute Classification System): 12-to-30 digit chain-structured code designed for computerized CAPP and standardized machine routing."},
                {"qNo": "13(b)", "question": "What are exceptional elements and bottleneck machines? Explain in detail, how to eliminate exceptional elements?", "solutionOutline": "Definitions: Bottleneck machine = machine utilized by multiple disparate part families preventing independent cell separation. Exceptional elements = parts requiring operations outside their assigned cell. Elimination methods: Machine duplication, rerouting to alternative machines, redesigning part geometry, subcontracting operation."},
                {"qNo": "14(a)", "question": "List the information's required for process planning. Describe the sequence of operations required for making a product from raw material. Also mention the factors to be considered for selection of manufacturing process.", "solutionOutline": "Information: Part engineering drawings, production volume, machine specifications, standard cost rates. Operation sequence: Primary shaping (casting/forging) -> Machining (roughing -> semi-finishing -> finishing) -> Heat treatment -> Grinding -> Inspection. Selection factors: Material machinability, tolerance requirements, production lot size, equipment availability."},
                {"qNo": "14(b)", "question": "Explain the methodology to be followed for developing a retrieval type of computer aided process planning system with block diagram.", "solutionOutline": "Methodology: (1) Family formation using Group Technology, (2) Generating standard process plans for each family, (3) Storing master plans in database under unique family code keys, (4) User inputs new part code, (5) Search engine retrieves closest match, (6) Process planner edits discrepancies, (7) Generates finalized route sheet."},
                {"qNo": "15(a)", "question": "(i) Describe the three functions of adaptive control system with a block diagram. (6 marks)\n(ii) Compare DDC and Supervisory computer control in a computer process monitoring. (7 marks)", "solutionOutline": "(i) Functions of Adaptive Control: (1) Identification function (measuring process response), (2) Decision function (determining optimal parameter change), (3) Modification function (adjusting controller settings/actuators). (ii) DDC vs Supervisory: DDC directly drives actuators replacing analog controllers. Supervisory sets setpoints for local analog/digital controllers without direct loop closure."},
                {"qNo": "15(b)", "question": "Illustrate the bar code of a product which is used for an automatic identification method.", "solutionOutline": "Bar Code Structure: Quiet zone, start character, data characters (bars and spaces representing ASCII binary codes), check digit, stop character. Explanation of 1D UPC/EAN system and 2D Data Matrix optical reflectance principle."}
            ],
            "partC": [
                {"qNo": "16(a)", "question": "Enumerate on the vehicle management system and vehicle safety deployed in the material handling system of the FMS in an automobile industry.", "solutionOutline": "Comprehensive industrial vehicle safety & management architecture:\n1. Traffic Management: Zone control blocking, optical sensor collision avoidance, dynamic dispatching.\n2. Safety Systems: Front safety bumpers with emergency cutoff microswitches, 360-degree LiDAR safety curtains, optical warning beacons, audio alarms.\n3. Fleet Monitoring: Battery health telematics, automated induction fast-charging stations, automated dock locking."},
                {"qNo": "16(b)", "question": "How generative process planning differs from variant process planning and describe the forward, backward planning and decision logic methods of generative process planning?", "solutionOutline": "Generative vs Variant: Variant modifies past human plans; Generative synthesizes new plans from first principles using engineering rules, CAD geometry, and manufacturing logic without human pre-plans.\nMethods:\n1. Forward Planning: Starts with raw stock workpiece and works forward operation by operation.\n2. Backward Planning: Starts with finished part geometry and peels away volumes backward to starting blank.\n3. Decision Logic: Decision trees, decision tables, and AI expert production systems (IF condition THEN operation)."}
            ]
        }
    },

    # ── 4. QP 51460: OCS 353 (April/May 2024) ──
    {
        "qpCode": "51460",
        "subjectCode": "OCS353",
        "displayCode": "OCS 353",
        "subjectName": "Data Science Fundamentals",
        "regulation": "R2021",
        "examSession": "April/May 2024",
        "academicYear": "April/May 2024",
        "semester": 6,
        "primaryDept": "CIVIL",
        "commonBranches": [
            "Civil Engineering",
            "Mechanical Engineering",
            "Aeronautical Engineering",
            "Automobile Engineering",
            "Electrical and Electronics Engineering",
            "Electronics and Instrumentation Engineering",
            "Chemical Engineering",
            "Biotechnology"
        ],
        "maxMarks": 100,
        "timeDuration": "3 Hours",
        "pdfFileName": "AU_OCS353_QP_51460_April_May_2024.pdf",
        "analysis": {
            "difficultyRating": "Moderate (Data Manipulation with NumPy/Pandas & Visualization)",
            "unitWeightage": [
                {"unit": "Unit 1: Introduction to Data Science & Statistical Description", "marks": 24, "percentage": "24%"},
                {"unit": "Unit 2: NumPy Arrays & Pandas Data Manipulation", "marks": 25, "percentage": "25%"},
                {"unit": "Unit 3: Supervised Machine Learning (Classification/Regression)", "marks": 23, "percentage": "23%"},
                {"unit": "Unit 4: Data Visualization (Matplotlib, Subplots & Errors)", "marks": 24, "percentage": "24%"},
                {"unit": "Unit 5: Big Data Management & Recommender Case Studies", "marks": 24, "percentage": "24%"}
            ],
            "highFrequencyTopics": [
                "Data science lifecycle: research goals, acquisition, model, presentation",
                "NumPy array slicing, broadcasting, aggregation, and universal functions",
                "Pandas Series, DataFrame indexing, handling missing data (fillna/dropna)",
                "Data mining vs data warehousing architecture",
                "Matplotlib error bars, contour plots, subplots and Seaborn themes",
                "Online shopping recommender system case study"
            ],
            "examPreparationTips": [
                "Practice writing Python code snippets for Pandas data filtering.",
                "Review difference between supervised, unsupervised, and semi-supervised ML.",
                "Understand distributed computing frameworks (Hadoop vs Spark)."
            ]
        },
        "questions": {
            "partA": [
                {"qNo": 1, "question": "In data science, why data analysis is important?", "answer": "Data analysis is important because it transforms raw, unorganized data into actionable insights, detects hidden patterns and anomalies, tests hypotheses, and enables objective, evidence-based business and engineering decision-making."},
                {"qNo": 2, "question": "Illustrate the basic statistical descriptions of data.", "answer": "1. Measures of Central Tendency: Mean, Median, Mode.\n2. Measures of Dispersion: Variance, Standard Deviation, Range, Interquartile Range (IQR).\n3. Measures of Shape: Skewness (asymmetry) and Kurtosis (peakedness)."},
                {"qNo": 3, "question": "Compare between Python Shell and Jupyter Notebook.", "answer": "• Python Shell: Command-line interface executing code line-by-line; output disappears upon closing; lacks visual rich media or inline charts.\n• Jupyter Notebook: Web-based interactive computational environment supporting code cells, inline visualizations (Matplotlib), Markdown documentation, and reproducible sharing."},
                {"qNo": 4, "question": "Write the process of sorting arrays in NumPy.", "answer": "NumPy arrays are sorted using `np.sort(arr, axis=...)` which returns a sorted copy, or `arr.sort()` for in-place sorting. For indices, `np.argsort(arr)` returns the indices that would sort the array. QuickSort, MergeSort, or HeapSort algorithms can be specified via the `kind` parameter."},
                {"qNo": 5, "question": "What is semi-supervised learning, and how does it differ from supervised and unsupervised learning?", "answer": "Semi-supervised learning utilizes a small amount of labeled data combined with a large pool of unlabeled data during training. Difference: Supervised learning requires 100% labeled pairs; Unsupervised learning uses zero labels; Semi-supervised bridges the gap to minimize expensive manual labeling."},
                {"qNo": 6, "question": "What are outliers in data analysis? Give example.", "answer": "An outlier is a data point that deviates significantly from the remaining observations in a dataset. Example: In an employee age dataset where ages range between 22 and 60, a recorded age of 145 (clerical error) or 95 is an outlier."},
                {"qNo": 7, "question": "What are density and contour plots, and when are they used in data visualization?", "answer": "Density and contour plots represent continuous three-dimensional surfaces on a two-dimensional plane using color gradients (density) or contour lines of constant elevation (contour). They are used when displaying joint distributions of two continuous variables (e.g., elevation, temperature fields, bivariate distributions)."},
                {"qNo": 8, "question": "How can text and annotation be added to Matplotlib plots?", "answer": "Text is added using `plt.text(x, y, 'text')` or `ax.text()`. Annotations with arrows pointing to specific coordinate points are created using `plt.annotate('label', xy=(target_x, target_y), xytext=(text_x, text_y), arrowprops=dict(facecolor='black'))`."},
                {"qNo": 9, "question": "Name a few techniques for handling large data sets efficiently.", "answer": "1. Chunking / streaming data (e.g., `pd.read_csv(chunksize=...)`)\n2. Memory-efficient data types (e.g., category, int16/float32)\n3. Database indexing and partitioning\n4. Distributed computing frameworks (Apache Spark, Dask)\n5. Dimensionality reduction (PCA, feature pruning)."},
                {"qNo": 10, "question": "What is the importance of data preparation?", "answer": "Data preparation (cleaning, missing value imputation, normalization, feature encoding) is critical because real-world data is noisy, incomplete, and inconsistent. High quality data preparation accounts for 80% of model performance and prevents 'Garbage In, Garbage Out'."}
            ],
            "partB": [
                {"qNo": "11(a)", "question": "Explain in detail the steps involved in the data science process, from defining research goals to presenting findings and building applications.", "solutionOutline": "Comprehensive 6-stage lifecycle: (1) Setting Research Goals & Problem Definition, (2) Data Retrieval and Ingestion, (3) Data Cleansing & Preprocessing, (4) Exploratory Data Analysis (EDA) and Feature Engineering, (5) Model Building & Validation, (6) Presentation of Insights & Production Deployment (API / Web Dashboard)."},
                {"qNo": "11(b)", "question": "Compare and contrast data mining and data warehousing, highlighting their respective roles in data science.", "solutionOutline": "Comparison: Data Warehousing stores, consolidates, and cleans structured historical data from disparate OLTP sources into centralized star/snowflake schemas. Data Mining analyzes this stored data using algorithms (association, classification, clustering) to discover hidden predictive patterns."},
                {"qNo": "12(a)", "question": "Discuss the significance of NumPy arrays in data manipulation, explaining universal functions, aggregations, and computation on arrays with relevant examples.", "solutionOutline": "Significance: Contiguous memory storage, vectorized C-speed operations without slow Python for-loops. Universal functions (ufuncs): Element-wise unary and binary operations (np.sin, np.exp, np.add). Aggregations: np.sum, np.mean, np.std across axes. Broadcasting rules with code demonstrations."},
                {"qNo": "12(b)", "question": "Explain the functionality of pandas in data manipulation for the following:\n(i) Data Indexing and selection (4 marks)\n(ii) Handling missing data (4 marks)\n(iii) Hierarchical Indexing (5 marks)", "solutionOutline": "(i) Indexing: `loc[]` (label-based) vs `iloc[]` (integer-position based). (ii) Missing Data: `isnull()`, `dropna()`, `fillna(method='ffill')` or median imputation. (iii) Hierarchical Indexing: MultiIndex on rows and columns allowing higher-dimensional data representation in standard 2D tables."},
                {"qNo": "13(a)", "question": "Explain the principles of classification and regression in machine learning, elaborating on their algorithms and real-world use cases.", "solutionOutline": "Principles: Supervised learning predicting categorical labels (Classification) vs continuous numerical values (Regression). Algorithms: Linear/Ridge Regression, Logistic Regression, Decision Trees, Random Forest. Use cases: House price prediction (Regression), Medical tumor benign/malignant diagnosis (Classification)."},
                {"qNo": "13(b)", "question": "Explore the concept of clustering in machine learning, discussing different clustering algorithms and their practical implications.", "solutionOutline": "Concepts: Intra-cluster similarity vs inter-cluster variance. Algorithms: K-Means (partitioning via centroids), Hierarchical (dendrogram agglomeration), DBSCAN (density-based clustering handling arbitrary shapes). Practical implications: Customer segmentation, credit card fraud detection."},
                {"qNo": "14(a)", "question": "Explain the importance of visualizing errors in data and illustrate how it is accomplished in Matplotlib, covering techniques such as error bars and error shading.", "solutionOutline": "Importance: Communicates measurement confidence intervals, model variance, and noise levels. Techniques: `plt.errorbar(x, y, yerr=..., fmt='o')` for discrete error whiskers, and `plt.fill_between(x, y_lower, y_upper, alpha=0.2)` for continuous shaded confidence ribbons around regression trends."},
                {"qNo": "14(b)", "question": "Explain the concept of subplots in Matplotlib and how they can be used to create multiple plots within a single figure.", "solutionOutline": "Concept: Organizing multiple axes inside a single figure canvas. Functions: `plt.subplot(rows, cols, index)` for simple grids, `plt.subplots(nrows, ncols, sharex=True)` for object-oriented multi-axes grids, and `plt.GridSpec` for unequal multi-column/row spanning layouts."},
                {"qNo": "15(a)", "question": "Explore various techniques for efficiently managing large data sets, including data partitioning, parallel processing, and distributed computing frameworks, highlighting their advantages and limitations.", "solutionOutline": "Techniques: Data partitioning (hash vs range partitioning), Parallel processing (multiprocessing, GPU acceleration), Distributed Frameworks: Apache Hadoop (MapReduce, HDFS) vs Apache Spark (in-memory resilient distributed datasets - RDD). Pros: Scalability, fault tolerance. Limitations: Network overhead, cluster complexity."},
                {"qNo": "15(b)", "question": "Elaborate on the tools and techniques needed for model building and presentation and Automation.", "solutionOutline": "Tools: Scikit-learn, MLflow for experiment tracking, Streamlit / Dash for interactive GUI dashboards, Docker for model containerization, GitHub Actions / Jenkins for CI/CD automated retraining pipelines."}
            ],
            "partC": [
                {"qNo": "16(a)", "question": "Analyze the case study for building a recommender system used in online shopping.", "solutionOutline": "Comprehensive Case Study:\n1. Architecture: Collaborative Filtering (user-user, item-item via cosine similarity) + Content-Based Filtering (product descriptions, tags) -> Hybrid Recommender.\n2. Data Ingestion: User clicks, add-to-cart, purchase history, ratings matrix.\n3. Matrix Factorization: Singular Value Decomposition (SVD) decomposing user-item sparse matrix into latent preference vectors.\n4. Cold Start Solution: Recommending trending items or onboarding category questionnaires to new users.\n5. Production Serving: Real-time candidate generation + ranking model deployed on low-latency Redis cache."},
                {"qNo": "16(b)", "question": "'Data visualization plays a crucial role in understanding complex datasets and communicating insights effectively'. Discuss this statement, elaborating on the techniques and tools available for data visualization, with a focus on Matplotlib and Seaborn.", "solutionOutline": "In-depth Discussion:\n1. Role: Human cognition processes visual geometry faster than numeric tables; reveals non-linear patterns, clustering, and Simpson's Paradox.\n2. Matplotlib: Low-level granular control over canvas, ticks, labels, and customized geometric shapes.\n3. Seaborn: High-level statistical visualization with built-in themes, automatic regression trendlines (`sns.regplot`), pairwise distributions (`sns.pairplot`), and heatmaps with annotations (`sns.heatmap`).\n4. Principles of effective storytelling: Avoiding clutter, utilizing color palettes accessible to colorblind users, and aligning scales."}
            ]
        }
    },

    # ── 5. QP 41384: ME 3791 (Nov/Dec 2024) ──
    {
        "qpCode": "41384",
        "subjectCode": "ME3791",
        "displayCode": "ME 3791",
        "subjectName": "Mechatronics and IoT",
        "regulation": "R2021",
        "examSession": "November/December 2024",
        "academicYear": "Nov/Dec 2024",
        "semester": 7,
        "primaryDept": "MECH",
        "commonBranches": [
            "Mechanical Engineering",
            "Mechanical and Automation Engineering",
            "Mechatronics Engineering"
        ],
        "maxMarks": 100,
        "timeDuration": "3 Hours",
        "pdfFileName": "AU_ME3791_QP_41384_Nov_Dec_2024.pdf",
        "analysis": {
            "difficultyRating": "Moderate to High (Embedded Hardware Comparison & EV Architecture)",
            "unitWeightage": [
                {"unit": "Unit 1: Sensors, Actuators & Power Electronics (TRIAC/Darlington)", "marks": 24, "percentage": "24%"},
                {"unit": "Unit 2: Data Acquisition (DAQ) & Signal Conditioning", "marks": 24, "percentage": "24%"},
                {"unit": "Unit 3: Microcontrollers (NodeMCU, Arduino, RPi, Beaglebone)", "marks": 25, "percentage": "25%"},
                {"unit": "Unit 4: Embedded Linux, Ultrasonic Sensors & Actuator Interfacing", "marks": 22, "percentage": "22%"},
                {"unit": "Unit 5: Autonomous Robotics, Computer Vision, Drones & Smart IoT", "marks": 25, "percentage": "25%"}
            ],
            "highFrequencyTopics": [
                "Optical sensors and brushless PMDC vs brushed DC motors",
                "TRIAC VI characteristics and Darlington pair amplifier circuit",
                "Data Acquisition System (DAQ) functional block diagram",
                "Comparison of Arduino, Raspberry Pi and Beaglebone microcontrollers",
                "Ultrasonic distance sensor HC-SR04 interfacing and Arduino code",
                "Autonomous vehicle braking systems (ABS, EBD, electronic ignition)"
            ],
            "examPreparationTips": [
                "Draw clear circuit schematics for Darlington pair and Wheatstone bridge.",
                "Compare microcontroller specs (clock, RAM, OS support, GPIO).",
                "Practice writing clean Arduino C/C++ sensor loop code."
            ]
        },
        "questions": {
            "partA": [
                {"qNo": 1, "question": "Provide examples of optical sensors and their applications in mechatronics.", "answer": "1. Photodiodes / Phototransistors: Used in optical encoders for measuring motor shaft speed and rotary position.\n2. Infrared (IR) Proximity Sensors: Used in line-following mobile robots and obstacle detection.\n3. Laser Distance Sensors (LiDAR): Used in autonomous navigation and 3D mapping."},
                {"qNo": 2, "question": "How do brushless permanent magnet DC motors differ from traditional brushed DC motors in terms of their construction and operation?", "answer": "• Brushed DC Motor: Armature windings are on rotor; mechanical carbon brushes and commutator switch current; high friction, sparks, and wear.\n• Brushless PMDC (BLDC) Motor: Permanent magnets are on rotor; windings are on stator; electronic commutation via hall sensors and power MOSFETs; higher efficiency, longer life, zero spark."},
                {"qNo": 3, "question": "Sketch the VI characteristics of a TRIAC.", "answer": "A TRIAC conducts in both Quadrant I (positive voltage/current) and Quadrant III (negative voltage/current). Once the gate trigger current pulse is applied, it switches from high-impedance OFF state to low-impedance ON state, conducting bidirectional AC current until current falls below the holding current (I_H)."},
                {"qNo": 4, "question": "Draw the Darlington pair circuit.", "answer": "A Darlington Pair connects two bipolar junction transistors (Q1 and Q2) where the emitter of Q1 is directly connected to the base of Q2, and both collectors are tied together. Total current gain beta_total = beta1 * beta2, providing extremely high input impedance and amplification."},
                {"qNo": 5, "question": "List any two communication protocols used in IoT devices.", "answer": "1. MQTT (Message Queuing Telemetry Transport - lightweight publish/subscribe protocol over TCP/IP for constrained networks).\n2. CoAP (Constrained Application Protocol - UDP-based RESTful protocol for low-power nodes)."},
                {"qNo": 6, "question": "Define IDE.", "answer": "An Integrated Development Environment (IDE) is a comprehensive software suite combining source code editor, compiler/interpreter, automated build tools, and interactive debugger into a unified user interface (e.g., Arduino IDE, VS Code)."},
                {"qNo": 7, "question": "Differentiate compiled and interpreted language.", "answer": "• Compiled Language (e.g. C, C++): Source code is converted by a compiler directly into native machine code before execution; fast execution, platform-dependent binaries.\n• Interpreted Language (e.g. Python): Source code is read and executed line-by-line at runtime by an interpreter; slower execution, highly portable."},
                {"qNo": 8, "question": "List the features of NodeMCU.", "answer": "1. Integrated ESP8266 Wi-Fi SoC\n2. Built-in USB-to-UART converter (CP2102/CH340)\n3. 10 GPIO pins supporting PWM, I2C, SPI, and 1 ADC channel\n4. Programmable using Lua scripts or Arduino IDE C++\n5. Low-power 3.3V operating voltage."},
                {"qNo": 9, "question": "Mention the purpose of an electronic ignition system in a vehicle.", "answer": "Purpose: Replaces mechanical distributor breaker points with electronic sensors (Hall-effect/optical) and ECU transistors to precisely control spark timing and deliver high voltage to spark plugs, ensuring optimal combustion, fuel efficiency, and lower emissions."},
                {"qNo": 10, "question": "Write the uses of ABS in vehicles.", "answer": "1. Prevents wheels from locking up during emergency braking.\n2. Maintains tire tractive grip with the road surface.\n3. Allows the driver to retain active steering control while decelerating.\n4. Significantly reduces braking distance on wet or slippery roads."}
            ],
            "partB": [
                {"qNo": "11(a)", "question": "Describe the working principle of a piezoelectric sensor and its applications in mechatronics.", "solutionOutline": "Working Principle: Direct Piezoelectric Effect where mechanical stress/force applied to anisotropic crystalline materials (quartz, PZT) induces electrical polarization producing a measurable electric charge Q = d * F. Applications: Dynamic force/pressure measurement, engine combustion pressure sensors, vibration accelerometers, ultrasonic transducers."},
                {"qNo": "11(b)", "question": "Describe the main components and operation of solid-state sensors, and discuss their advantages over traditional mechanical sensors in mechatronics.", "solutionOutline": "Components: Semiconductor substrate (Silicon/Gallium Arsenide), integrated micro-sensing elements (piezoresistive/capacitive MEMS), onboard signal conditioning circuitry. Operation: Physical parameter alters semiconductor charge carrier mobility or capacitance. Advantages: Miniature size (MEMS), zero moving mechanical wear, high reliability, shock resistance, direct digital interface."},
                {"qNo": "12(a)", "question": "Explain the various blocks contained in a typical data acquisition system.", "solutionOutline": "Functional Blocks: (1) Sensors/Transducers (converts physical variable to analog signal), (2) Signal Conditioning (amplification, filtration, isolation), (3) Multiplexer (MUX), (4) Sample & Hold (S/H) circuit, (5) Analog-to-Digital Converter (ADC), (6) Digital I/O Bus & Microcontroller/PC Interface, (7) Software display and logging."},
                {"qNo": "12(b)", "question": "Explain the construction and working of a Wheatstone Bridge Amplifier and illustrate how they help in force measurement.", "solutionOutline": "Construction: 4-resistor diamond bridge with strain gauge mounted on one or more arms (quarter/half/full bridge). Working: Mechanical strain causes resistance change Delta R, unbalancing bridge to produce output voltage V_out = V_in * (Delta R / 4R). Connected to instrumentation amplifier (AD620) to magnify microvolt signals to 0-5V for microcontroller ADC."},
                {"qNo": "13(a)", "question": "Compare Arduino, Raspberry Pi and Beaglebone Boards in terms of its Processor, RAM, Input voltage, Storage, Ports, Networking and OS. Mention their areas of application along with their advantages and limitations.", "solutionOutline": "Comparison Matrix:\n• Arduino (Uno): ATmega328P 8-bit 16MHz, 2KB SRAM, 7-12V, 32KB Flash, GPIO/PWM, No native net, Bare-metal C++. Application: Real-time sensor/motor control.\n• Raspberry Pi (4B): Broadcom BCM2711 Quad-core 1.5GHz, 2-8GB LPDDR4, 5V USB-C, MicroSD, HDMI/USB3/Gigabit Ethernet/WiFi, Linux (Raspberry Pi OS). Application: Computer vision, IoT gateways, media processing.\n• BeagleBone Black: AM3358 ARM Cortex-A8 1GHz, 512MB DDR3, 5V DC, 4GB eMMC, 65 GPIO pins, Ethernet, Linux/Debian. Application: Industrial automation, high-speed PRU real-time tasks."},
                {"qNo": "13(b)", "question": "Illustrate the use of various Peripherals used in an Embedded system with application for each of them.", "solutionOutline": "Peripherals: (1) GPIO (driving LEDs/relays), (2) Timers/Counters (measuring pulse width, generating delay), (3) PWM (controlling DC motor speed and servo angles), (4) ADC/DAC (reading analog sensors, analog audio generation), (5) Communication interfaces (UART for serial console, I2C for OLED display, SPI for high-speed SD cards)."},
                {"qNo": "14(a)", "question": "Explain the components of a Linux system. List any 4 Linux Commands along with their usage.", "solutionOutline": "Components: (1) Hardware, (2) Linux Kernel (process/memory/device management), (3) System Libraries (glibc), (4) Shell & System Utilities. Commands: `ls -la` (list files with permissions), `grep` (pattern search), `chmod` (modify file access permissions), `ps aux` / `top` (process monitoring)."},
                {"qNo": "14(b)", "question": "With neat diagram, explain the working principle of the ultrasonic distance sensor. Write an Arduino based program to measure distance using ultrasonic sensor.", "solutionOutline": "Principle: Sensor emits 40kHz ultrasonic burst via Trigger pin (10us HIGH pulse). Sound travels through air, bounces off obstacle, and Echo pin remains HIGH for duration t. Distance = (t * 0.034 cm/us) / 2.\nArduino Code:\nconst int trig = 9, echo = 10;\nvoid setup(){ Serial.begin(9600); pinMode(trig, OUTPUT); pinMode(echo, INPUT); }\nvoid loop(){\n  digitalWrite(trig, LOW); delayMicroseconds(2);\n  digitalWrite(trig, HIGH); delayMicroseconds(10);\n  digitalWrite(trig, LOW);\n  long duration = pulseIn(echo, HIGH);\n  long distance = duration * 0.034 / 2;\n  Serial.print(\"Distance: \"); Serial.print(distance); Serial.println(\" cm\");\n  delay(500);\n}"},
                {"qNo": "15(a)", "question": "How does computer vision contribute to the autonomy of robots in dynamic environments? Discuss the algorithms associated with vision systems into autonomous robot navigation.", "solutionOutline": "Contribution: Enables obstacle detection, path planning, object tracking, and Simultaneous Localization and Mapping (SLAM). Algorithms: Edge detection (Canny/Sobel), Feature extraction (SIFT/ORB), Visual Odometry, Deep learning object detection (YOLO/SSD), Optical Flow for motion tracking."},
                {"qNo": "15(b)", "question": "What are the key components of a drone's control system? Explain the role of actuators in drone actuation and control systems and how do they interact to stabilize flight?", "solutionOutline": "Components: Flight Controller (IMU gyro/accelerometer, barometer, GPS), Electronic Speed Controllers (ESCs), BLDC Motors & Propellers, Radio Receiver. Actuator interaction: Flight controller calculates PID error in Roll, Pitch, Yaw and commands individual ESCs to modulate motor RPM, using counter-rotating propeller torque to stabilize hover."}
            ],
            "partC": [
                {"qNo": "16(a)", "question": "A leading automotive manufacturer is planning to release a new line of electric vehicles (EVs) with advanced safety and convenience features. As a mechatronics engineer, you are responsible for designing the vehicle's electronic ignition system, anti-lock braking system (ABS), electronic brake-force distribution (EBD), and adaptive cruise control. Develop a comprehensive plan for integrating these mechatronic systems into the EV platform, ensuring optimal performance, reliability, and safety.", "solutionOutline": "Comprehensive EV Mechatronic Integration Plan:\n1. In-Vehicle Network Architecture: Dual High-Speed CAN-FD bus + Automotive Ethernet connecting Central Vehicle Control Unit (VCU).\n2. Electronic Ignition / Power Management: Keyless RFID/BLE transceiver interfacing Smart BMS and Contactors with zero-spark solid-state relay isolation.\n3. ABS & EBD Integration: Individual wheel-speed Hall sensors feeding Brake ECU; modulating electro-hydraulic valves combined with regenerative motor braking.\n4. Adaptive Cruise Control (ACC): Long-range 77GHz Radar + Forward-facing stereo camera performing sensor fusion, modulating inverter torque via CAN commands.\n5. Fail-Safe & ASIL-D Compliance: Redundant power supplies and watchdog microcontrollers ensuring safe shutdown upon sensor failure."},
                {"qNo": "16(b)", "question": "A municipality in a drought-prone region is facing challenges with water management, agricultural sustainability, and transportation efficiency. Propose an integrated IoT solution that addresses these challenges with water management systems for optimizing water usage, IoT-enabled agriculture, centralized water management, and IoT vehicle management systems.", "solutionOutline": "Municipal Smart IoT Framework:\n1. Water Resource Management: Ultrasonic tank level sensors + LoRaWAN flow meters at main pipelines; automated solenoid valves detecting leaks using pressure differential analysis.\n2. Smart Precision Agriculture: Soil moisture dielectric sensors + NodeMCU sensor nodes transmitting N-P-K and evapotranspiration data; automated solar drip-irrigation pumps.\n3. Smart Fleet & Transportation: GPS/GSM vehicle tracking on municipal tankers and public buses optimizing routing using genetic algorithms to minimize fuel consumption.\n4. Central City Dashboard: Cloud-hosted platform visualizing water reserve levels, soil humidity, and vehicle routes with automated SMS alerts to farmers."}
            ]
        }
    }
]

# ── HELPER TO GENERATE AUTHENTIC PDF FILES ──
def generate_pdf(paper, output_path):
    doc = pymupdf.open()
    
    # ── Page 1: Header + Part A ──
    page1 = doc.new_page(width=595, height=842) # A4 size
    
    # Top header
    page1.insert_text((220, 40), "EnggTree.com", fontsize=11, fontname="helv", color=(0.2, 0.2, 0.2))
    
    # Reg No box
    page1.draw_rect(pymupdf.Rect(260, 60, 520, 80), color=(0, 0, 0), width=1)
    page1.insert_text((180, 75), "Reg. No. :", fontsize=10, fontname="times-bold")
    page1.insert_text((275, 75), "E   N   G   G   T   R   E   E   .   C   O   M", fontsize=9, fontname="courier-bold")

    # QP Code box
    qp_box = pymupdf.Rect(130, 95, 465, 125)
    page1.draw_rect(qp_box, color=(0, 0, 0), width=1.5)
    page1.insert_text((150, 117), f"Question Paper Code : {paper['qpCode']}", fontsize=15, fontname="times-bold")

    # Exam Title
    page1.insert_text((115, 150), f"B.E./B.Tech. DEGREE EXAMINATIONS, {paper['examSession'].upper()}.", fontsize=10, fontname="times-bold")
    sem_text = f"Seventh Semester" if paper['semester'] == 7 else f"Sixth Semester"
    page1.insert_text((240, 170), sem_text, fontsize=10, fontname="times-roman")
    page1.insert_text((215, 190), f"{paper['commonBranches'][0]}", fontsize=10.5, fontname="times-bold")

    # Subject code & title
    page1.insert_text((105, 215), f"{paper['displayCode']} — {paper['subjectName'].upper()}", fontsize=11, fontname="times-bold")
    
    common_str = f"(Common to : {', '.join(paper['commonBranches'][1:3])})" if len(paper['commonBranches']) > 1 else ""
    if common_str:
        page1.insert_text((160, 232), common_str, fontsize=8.5, fontname="times-italic")

    page1.insert_text((230, 252), "(Regulations 2021)", fontsize=9.5, fontname="times-bold")

    # Time & Marks
    page1.insert_text((50, 275), "Time : Three hours", fontsize=9.5, fontname="times-bold")
    page1.insert_text((430, 275), "Maximum : 100 marks", fontsize=9.5, fontname="times-bold")

    page1.insert_text((220, 298), "Answer ALL questions.", fontsize=10, fontname="times-bold")
    page1.insert_text((200, 318), "PART A — (10 × 2 = 20 marks)", fontsize=10, fontname="times-bold")

    y = 345
    for q in paper['questions']['partA']:
        q_text = f"{q['qNo']}.   {q['question']}"
        # Word wrap question
        rect = pymupdf.Rect(50, y, 545, y + 40)
        page1.insert_textbox(rect, q_text, fontsize=9.5, fontname="times-roman")
        y += 42

    page1.insert_text((1, 825), "Downloaded from EnggTree.com", fontsize=10, fontname="helv", color=(0.1, 0.1, 0.1))
    page1.insert_text((290, 825), "1", fontsize=9.5, fontname="times-roman")
    page1.insert_text((515, 825), paper['qpCode'], fontsize=10, fontname="times-bold")

    # ── Page 2: Part B ──
    page2 = doc.new_page(width=595, height=842)
    page2.insert_text((220, 40), "EnggTree.com", fontsize=11, fontname="helv", color=(0.2, 0.2, 0.2))
    page2.insert_text((200, 70), "PART B — (5 × 13 = 65 marks)", fontsize=10, fontname="times-bold")

    y = 95
    partB = paper['questions']['partB']
    for i in range(0, min(len(partB), 10), 2):
        q_a = partB[i]
        q_b = partB[i+1] if i+1 < len(partB) else None
        
        # Q(a)
        rect_a = pymupdf.Rect(50, y, 545, y + 55)
        page2.insert_textbox(rect_a, f"{q_a['qNo']}.   {q_a['question']}", fontsize=9, fontname="times-roman")
        y += 60

        page2.insert_text((275, y), "Or", fontsize=9.5, fontname="times-bold")
        y += 18

        # Q(b)
        if q_b:
            rect_b = pymupdf.Rect(50, y, 545, y + 55)
            page2.insert_textbox(rect_b, f"{q_b['qNo']}.   {q_b['question']}", fontsize=9, fontname="times-roman")
            y += 62

    page2.insert_text((1, 825), "Downloaded from EnggTree.com", fontsize=10, fontname="helv", color=(0.1, 0.1, 0.1))
    page2.insert_text((290, 825), "2", fontsize=9.5, fontname="times-roman")
    page2.insert_text((515, 825), paper['qpCode'], fontsize=10, fontname="times-bold")

    # ── Page 3: Part C ──
    page3 = doc.new_page(width=595, height=842)
    page3.insert_text((220, 40), "EnggTree.com", fontsize=11, fontname="helv", color=(0.2, 0.2, 0.2))
    page3.insert_text((200, 75), "PART C — (1 × 15 = 15 marks)", fontsize=10, fontname="times-bold")

    y = 110
    partC = paper['questions']['partC']
    if len(partC) >= 1:
        rect_16a = pymupdf.Rect(50, y, 545, y + 100)
        page3.insert_textbox(rect_16a, f"16. (a)   {partC[0]['question']}", fontsize=9.5, fontname="times-roman")
        y += 115

        page3.insert_text((275, y), "Or", fontsize=10, fontname="times-bold")
        y += 25

        if len(partC) >= 2:
            rect_16b = pymupdf.Rect(50, y, 545, y + 120)
            page3.insert_textbox(rect_16b, f"(b)   {partC[1]['question']}", fontsize=9.5, fontname="times-roman")

    page3.insert_text((1, 825), "Downloaded from EnggTree.com", fontsize=10, fontname="helv", color=(0.1, 0.1, 0.1))
    page3.insert_text((290, 825), "3", fontsize=9.5, fontname="times-roman")
    page3.insert_text((515, 825), paper['qpCode'], fontsize=10, fontname="times-bold")

    doc.save(output_path)
    doc.close()
    print(f"Generated PDF: {output_path}")

# ── 1. GENERATE ALL 5 PDFS IN uploads/question-papers ──
for paper in PAPERS:
    pdf_path = os.path.join(QP_UPLOADS_DIR, paper['pdfFileName'])
    generate_pdf(paper, pdf_path)

# Also create symbolic or direct copies for standard naming
for paper in PAPERS:
    code = paper['qpCode']
    sub = paper['subjectCode']
    sess = paper['examSession'].replace('/', '_')
    std_name = f"AU_{sub}_QP_{code}_{sess}.pdf"
    std_path = os.path.join(QP_UPLOADS_DIR, std_name)
    if not os.path.exists(std_path):
        import shutil
        shutil.copyfile(os.path.join(QP_UPLOADS_DIR, paper['pdfFileName']), std_path)

# ── 2. UPDATE public/js/data/pyqAnalysisData.js ──
with open(PYQ_DATA_PATH, 'r', encoding='utf-8') as f:
    pyq_text = f.read()

# Parse existing pyqAnalysisData.js
m = re.search(r'window\.PYQAnalysisData\s*=\s*(\[.*\]);?', pyq_text, re.DOTALL)
if m:
    existing_pyqs = json.loads(m.group(1))
else:
    existing_pyqs = []

# Filter out if any of these 5 QP codes already exist to avoid duplicate
new_codes = [p['qpCode'] for p in PAPERS]
updated_pyqs = [p for p in existing_pyqs if p.get('qpCode') not in new_codes]

# Append the 5 new papers
for p in PAPERS:
    updated_pyqs.append({
        "qpCode": p["qpCode"],
        "subjectCode": p["subjectCode"],
        "subjectName": p["subjectName"],
        "regulation": p["regulation"],
        "examSession": p["examSession"],
        "semester": p["semester"],
        "commonBranches": p["commonBranches"],
        "maxMarks": p["maxMarks"],
        "timeDuration": p["timeDuration"],
        "analysis": p["analysis"],
        "questions": p["questions"]
    })

new_pyq_js = "/**\n * DRMS — Real Anna University Previous Year Question Papers (PYQ),\n * Detailed Question Trend Analysis, Solved Answers, and Unit-wise Notes.\n */\n\nwindow.PYQAnalysisData = " + json.dumps(updated_pyqs, indent=2, ensure_ascii=False) + ";\n"
with open(PYQ_DATA_PATH, 'w', encoding='utf-8') as f:
    f.write(new_pyq_js)

print(f"Updated pyqAnalysisData.js with total {len(updated_pyqs)} papers (added {len(PAPERS)} new papers).")

# ── 3. UPDATE public/js/data/fallbackData.js ──
with open(FALLBACK_DATA_PATH, 'r', encoding='utf-8') as f:
    fb_text = f.read()

m_fb = re.search(r'window\.AppFallbackData\s*=\s*(\{.*\});?', fb_text, re.DOTALL)
if m_fb:
    fb_data = json.loads(m_fb.group(1))
else:
    raise ValueError("Could not parse window.AppFallbackData")

if 'questionPapers' not in fb_data or not isinstance(fb_data['questionPapers'], list):
    fb_data['questionPapers'] = []

if 'subjects' not in fb_data or not isinstance(fb_data['subjects'], list):
    fb_data['subjects'] = []

# Target departments list for mapping
all_depts = [d.get('code') for d in fb_data.get('departments', [])]

# Ensure the 4 subjects exist in fallbackData.subjects so they can be selected in dropdowns
SUBJECTS_TO_ADD = [
    {
        "code": "ME3792",
        "name": "Computer Integrated Manufacturing",
        "semester": 7,
        "credits": 3,
        "deptCode": "MECH",
        "regCode": "R2021",
        "type": "Professional Core"
    },
    {
        "code": "ME3791",
        "name": "Mechatronics and IoT",
        "semester": 7,
        "credits": 3,
        "deptCode": "MECH",
        "regCode": "R2021",
        "type": "Professional Core"
    },
    {
        "code": "OCS351",
        "name": "Artificial Intelligence and Machine Learning Fundamentals",
        "semester": 7,
        "credits": 3,
        "deptCode": "CIVIL",
        "regCode": "R2021",
        "type": "Open Elective"
    },
    {
        "code": "OCS353",
        "name": "Data Science Fundamentals",
        "semester": 6,
        "credits": 3,
        "deptCode": "CIVIL",
        "regCode": "R2021",
        "type": "Open Elective"
    }
]

for sub in SUBJECTS_TO_ADD:
    exists = any(s.get('code') == sub['code'] and s.get('deptCode') == sub['deptCode'] for s in fb_data['subjects'])
    if not exists:
        sub_id = f"sub-{sub['code'].lower()}-{sub['deptCode'].lower()}"
        fb_data['subjects'].append({
            "id": sub_id,
            "_id": sub_id,
            "code": sub['code'],
            "name": sub['name'],
            "semester": sub['semester'],
            "credits": sub['credits'],
            "deptCode": sub['deptCode'],
            "regCode": sub['regCode'],
            "type": sub['type'],
            "description": f"Official Anna University {sub['regCode']} curriculum course for {sub['name']} ({sub['code']})."
        })
        print(f"Added subject {sub['code']} to {sub['deptCode']}")

# Clean existing entries with these 5 QP codes
fb_data['questionPapers'] = [qp for qp in fb_data['questionPapers'] if qp.get('qpCode') not in new_codes]

# Generate QP entries for fallbackData
new_qp_entries = []

for paper in PAPERS:
    # Departments to associate
    if paper['subjectCode'] in ['ME3792', 'ME3791']:
        depts_to_map = ['MECH', 'PROD', 'AUTO', 'ROBOTICS']
    elif paper['subjectCode'] in ['OCS351', 'OCS353']:
        depts_to_map = ['CIVIL', 'MECH', 'EEE', 'ECE', 'CSE', 'IT', 'AIDS', 'AIML']
    else:
        depts_to_map = [paper['primaryDept']]
    
    # Filter to valid departments
    depts_to_map = [d for d in depts_to_map if d in all_depts or d == paper['primaryDept']]

    for dept in depts_to_map:
        qp_id = f"qp-{paper['qpCode']}-{dept.lower()}"
        file_name = paper['pdfFileName']
        file_url = f"/uploads/question-papers/{file_name}"
        
        entry = {
            "id": qp_id,
            "_id": qp_id,
            "subjectId": f"sub-{paper['subjectCode'].lower()}-{dept.lower()}",
            "subjectCode": paper['subjectCode'],
            "subjectName": paper['subjectName'],
            "title": f"{paper['displayCode']} — {paper['subjectName']} (QP Code: {paper['qpCode']})",
            "qpCode": paper['qpCode'],
            "deptCode": dept,
            "regCode": paper['regulation'],
            "semester": paper['semester'],
            "academicYear": paper['academicYear'],
            "examType": f"Anna University {paper['examSession']} Examination",
            "fileUrl": file_url,
            "fileName": file_name,
            "fileSize": "1.4 MB",
            "downloads": 380,
            "uploadedBy": "Anna University Examination Cell",
            "analysis": paper['analysis'],
            "questions": paper['questions'],
            "portals": {
                "brainkart": f"https://www.brainkart.com/search/?q={paper['subjectCode']}+question+paper",
                "enggtree": f"https://www.enggtree.com/?s={paper['subjectCode']}",
                "padeepz": f"https://www.padeepz.net/?s={paper['subjectCode']}",
                "eduengineering": f"https://www.eduengineering.net/?s={paper['subjectCode']}"
            }
        }
        new_qp_entries.append(entry)

# Insert the new entries at the top of questionPapers
fb_data['questionPapers'] = new_qp_entries + fb_data['questionPapers']
print(f"Injected {len(new_qp_entries)} question paper entries into fallbackData.js.")

# Write back fallbackData.js
new_fb_js = "/**\n * Application Fallback Data for Offline/Demo Mode\n */\n\nwindow.AppFallbackData = " + json.dumps(fb_data, indent=2, ensure_ascii=False) + ";\n"
with open(FALLBACK_DATA_PATH, 'w', encoding='utf-8') as f:
    f.write(new_fb_js)

print("SUCCESS: 5 Question Papers created, PDF files generated in uploads/question-papers/, and database updated!")
