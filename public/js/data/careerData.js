/**
 * Career Data — All Departments, Job Roles, Skills, Roadmaps
 * Anna University Engineering Career Guidance System
 * Covers ALL 66+ departments with department-specific roles.
 */

window.CareerData = (() => {

  // ── SKILL LEVEL HELPER ──────────────────────────────────────────────────────
  const L = (name, from, to) => ({ name, from, to }); // L("Python","🟢 Beginner","🟡 Intermediate")

  // ── SHARED ROLE TEMPLATE BUILDER ────────────────────────────────────────────
  const role = (id, title, category, salary, desc, skills, tools, subjects, certs, projects, internship, interviewTopics, roadmap) => ({
    id, title, category, salary, desc, skills, tools, subjects, certs, projects, internship, interviewTopics, roadmap
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // ROLES DATABASE — keyed by deptCode
  // ═══════════════════════════════════════════════════════════════════════════

  const DB = {};

  // ─────────────────────────────────────────────────────────────────────────────
  // CSE — Computer Science & Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.CSE = [
    role('cse-swe', 'Software Developer', 'Private Sector', '₹4–18 LPA',
      'Build, test and maintain software applications across web, mobile and enterprise domains.',
      [L('C / C++','🟢','🟡'), L('Python','🟢','🟡'), L('OOP Concepts','🟡','🔴'), L('Data Structures & Algorithms','🟡','🔴'), L('DBMS & SQL','🟢','🟡'), L('REST APIs','🟡','🔴'), L('Git & Version Control','🟢','🟡'), L('Problem Solving','🟡','🔴')],
      ['VS Code / IntelliJ','Git / GitHub','Postman','Docker (basics)','MySQL / PostgreSQL','JIRA'],
      ['Programming in C','Object Oriented Programming','Data Structures','DBMS','Software Engineering','Operating Systems'],
      ['freeCodeCamp JavaScript','HackerRank Problem Solving','AWS Cloud Practitioner (Free)','NPTEL Programming Cert'],
      [{ level:'Beginner', title:'To-Do List App (CRUD)', stack:'HTML+CSS+JS' }, { level:'Intermediate', title:'REST API Backend (CRUD + Auth)', stack:'Node.js + Express + MySQL' }, { level:'Advanced', title:'Full-Stack E-Commerce Platform', stack:'React + Node + MongoDB + Docker' }],
      'Apply for internships at software service companies (TCS, Infosys, Wipro) or product startups. Work on real-world bug fixes and feature development.',
      ['What is OOP? Explain with examples.','Difference between process and thread.','Explain DBMS ACID properties.','What is a REST API?','How does Git branching work?','Explain time complexity of sorting algorithms.','Write a program to reverse a linked list.'],
      [
        { step: 1, title: 'Foundation — Programming Basics', desc: 'Master C/C++ or Python fundamentals: variables, loops, functions, arrays, pointers.', duration: '2–3 months' },
        { step: 2, title: 'Core CS — OOP + DBMS', desc: 'Learn Object-Oriented Programming (classes, inheritance, polymorphism) and relational databases (SQL, normalization).', duration: '2 months' },
        { step: 3, title: 'Data Structures & Algorithms', desc: 'Study arrays, linked lists, stacks, queues, trees, graphs, sorting/searching. Practice on LeetCode/HackerRank.', duration: '3 months' },
        { step: 4, title: 'Development Framework', desc: 'Pick a stack: Web (React + Node.js) or Java Spring Boot. Build CRUD applications with REST APIs.', duration: '2 months' },
        { step: 5, title: 'Tools & Version Control', desc: 'Learn Git/GitHub workflow, Postman for API testing, basic Linux commands, Docker basics.', duration: '1 month' },
        { step: 6, title: 'Projects', desc: 'Build 2–3 projects: a portfolio website, a REST API backend, a full-stack app. Push all to GitHub.', duration: '2 months' },
        { step: 7, title: 'Internship', desc: 'Apply for internships at product/service companies. Target campus placements in Year 3.', duration: '3–6 months' },
        { step: 8, title: 'Resume & Portfolio', desc: 'Create a 1-page resume with GitHub links, project descriptions, skills, and certifications.', duration: '2 weeks' },
        { step: 9, title: 'Interview Preparation', desc: 'Revise DSA, DBMS, OS, CN. Practice coding problems daily on LeetCode (Easy → Medium). Do mock interviews.', duration: '2 months' },
        { step: 10, title: 'Job Applications', desc: 'Apply via campus placement, LinkedIn, Naukri, and company career portals. Target 5–10 applications per week.', duration: 'Ongoing' }
      ]
    ),
    role('cse-fsd', 'Full Stack Developer', 'Private Sector', '₹5–22 LPA',
      'Design and develop both frontend (UI) and backend (server, database) components of web applications.',
      [L('HTML / CSS','🟢','🟡'), L('JavaScript / TypeScript','🟡','🔴'), L('React.js / Next.js','🟡','🔴'), L('Node.js / Express','🟡','🔴'), L('SQL + NoSQL','🟢','🟡'), L('REST APIs & GraphQL','🟡','🔴'), L('Git','🟢','🟡'), L('Docker (basics)','🟡','🔴')],
      ['VS Code','React.js','Node.js + Express','MongoDB / PostgreSQL','Git / GitHub','Docker','Postman','Figma (basics)'],
      ['Web Technologies','Database Management Systems','Operating Systems','Computer Networks','Software Engineering'],
      ['freeCodeCamp Responsive Web Design','freeCodeCamp JS Algorithms','FullStackOpen (Univ. Helsinki — Free)','Meta Front-End Developer (Coursera Audit)'],
      [{ level:'Beginner', title:'Responsive Portfolio Website', stack:'HTML+CSS+JS' }, { level:'Intermediate', title:'Blog Platform with Auth', stack:'React + Node.js + MongoDB' }, { level:'Advanced', title:'SaaS Dashboard with Real-time Data', stack:'Next.js + PostgreSQL + Docker' }],
      'Target web development roles at startups. Contribute to open-source React/Node.js projects on GitHub.',
      ['Explain virtual DOM in React.','How does Node.js handle async operations?','What is JWT authentication?','Difference between SQL and NoSQL?','What is CORS and how do you fix it?'],
      [
        { step: 1, title: 'HTML + CSS Foundations', desc: 'Build responsive layouts using HTML5, CSS3 (Flexbox, Grid). Learn CSS variables and animations.', duration: '1 month' },
        { step: 2, title: 'JavaScript & DOM', desc: 'Master JS: ES6+, async/await, fetch API, DOM manipulation. Build interactive UIs.', duration: '2 months' },
        { step: 3, title: 'React.js Frontend', desc: 'Learn React (components, hooks, state, routing). Build 2–3 mini frontend projects.', duration: '2 months' },
        { step: 4, title: 'Node.js + Express Backend', desc: 'Build REST APIs: routing, middleware, authentication (JWT), file uploads.', duration: '2 months' },
        { step: 5, title: 'Database Integration', desc: 'Connect to MongoDB (Mongoose) and PostgreSQL. Design schemas, write complex queries.', duration: '1 month' },
        { step: 6, title: 'Full-Stack Projects', desc: 'Build a complete full-stack app with auth, CRUD, database, and deploy to cloud (Vercel/Render).', duration: '2 months' },
        { step: 7, title: 'DevOps Basics', desc: 'Learn Docker basics, CI/CD with GitHub Actions, deploy to AWS/GCP free tier.', duration: '1 month' },
        { step: 8, title: 'Internship & Resume', desc: 'Apply for web dev internships. Build your GitHub portfolio. Get freelance projects.', duration: 'Ongoing' }
      ]
    ),
    role('cse-aiml', 'AI / ML Engineer', 'Private Sector / Research', '₹6–30 LPA',
      'Design and build machine learning models, train neural networks, and deploy AI solutions at scale.',
      [L('Python','🟢','🔴'), L('Mathematics (Linear Algebra, Probability)','🟡','🔴'), L('Machine Learning Algorithms','🟡','🔴'), L('Deep Learning','🟡','🔴'), L('Data Preprocessing','🟢','🟡'), L('Model Deployment (MLOps)','🟡','🔴'), L('SQL','🟢','🟡')],
      ['Python','NumPy / Pandas','Scikit-learn','TensorFlow / PyTorch','Jupyter Notebook','Hugging Face','MLflow','AWS SageMaker (basics)'],
      ['Artificial Intelligence','Machine Learning','Deep Learning','Data Structures','Statistics & Probability','Linear Algebra'],
      ['Kaggle Learn (Free — ML, Python, SQL)','fast.ai Deep Learning (Free)','Google ML Crash Course (Free)','NPTEL Machine Learning Certificate'],
      [{ level:'Beginner', title:'House Price Prediction (Linear Regression)', stack:'Python + Scikit-learn' }, { level:'Intermediate', title:'Image Classification CNN', stack:'Python + TensorFlow/Keras' }, { level:'Advanced', title:'NLP Chatbot with Fine-tuned LLM', stack:'Python + Hugging Face Transformers' }],
      'Apply for AI/ML research internships at IITs, NIT labs, or product companies with data science teams.',
      ['Explain overfitting and how to prevent it.','What is the difference between supervised and unsupervised learning?','How does backpropagation work?','What is gradient descent?','Explain precision vs recall.'],
      [
        { step: 1, title: 'Python Programming', desc: 'Master Python: OOP, file handling, libraries (NumPy, Pandas). Solve 50 Python problems.', duration: '1–2 months' },
        { step: 2, title: 'Mathematics for ML', desc: 'Study Linear Algebra (matrices, vectors), Calculus (derivatives), Probability & Statistics.', duration: '2 months' },
        { step: 3, title: 'Machine Learning Fundamentals', desc: 'Learn regression, classification, clustering, decision trees using Scikit-learn.', duration: '2 months' },
        { step: 4, title: 'Deep Learning', desc: 'Study Neural Networks, CNNs, RNNs, Transformers. Implement with TensorFlow/PyTorch.', duration: '3 months' },
        { step: 5, title: 'Real Datasets & Kaggle', desc: 'Participate in Kaggle competitions. Work with real-world datasets (EDA, feature engineering, modelling).', duration: '2 months' },
        { step: 6, title: 'Model Deployment', desc: 'Build Flask/FastAPI APIs for ML models. Deploy on Hugging Face Spaces or AWS free tier.', duration: '1 month' },
        { step: 7, title: 'Research & Advanced Topics', desc: 'Read research papers (arXiv). Implement papers in PyTorch. Contribute to open-source AI projects.', duration: 'Ongoing' }
      ]
    ),
    role('cse-cloud', 'Cloud / DevOps Engineer', 'Private Sector', '₹6–25 LPA',
      'Design, build, and maintain cloud infrastructure, CI/CD pipelines, and deployment automation.',
      [L('Linux / Shell Scripting','🟢','🟡'), L('Docker / Kubernetes','🟡','🔴'), L('CI/CD (Jenkins/GitHub Actions)','🟡','🔴'), L('AWS / GCP / Azure','🟡','🔴'), L('Infrastructure as Code','🟡','🔴'), L('Networking Basics','🟢','🟡'), L('Python / Bash scripting','🟢','🟡')],
      ['Docker','Kubernetes','Jenkins','GitHub Actions','Terraform','AWS (EC2, S3, Lambda)','Prometheus + Grafana','Ansible'],
      ['Operating Systems','Computer Networks','Cloud Computing','Distributed Computing'],
      ['AWS Cloud Practitioner (Free Skill Builder)','Kubernetes Basics (Play with K8s — Free)','Linux Foundation Intro to Kubernetes','NPTEL Cloud Computing Certificate'],
      [{ level:'Beginner', title:'Dockerize a Node.js App', stack:'Docker + Docker Compose' }, { level:'Intermediate', title:'CI/CD Pipeline Setup', stack:'GitHub Actions + Docker + AWS EC2' }, { level:'Advanced', title:'Kubernetes Microservices Cluster', stack:'K8s + Helm + Prometheus + Grafana' }],
      'Target DevOps/SRE internships at mid-size tech companies. Contribute to Kubernetes / Terraform open-source projects.',
      ['What is the difference between Docker and Kubernetes?','Explain CI/CD pipeline stages.','What is load balancing?','How does DNS work?','What is Infrastructure as Code?'],
      [
        { step: 1, title: 'Linux & Networking', desc: 'Master Linux commands, file permissions, networking (TCP/IP, DNS, HTTP). Practice on WSL or Ubuntu VM.', duration: '1 month' },
        { step: 2, title: 'Git & Version Control', desc: 'Git branching, merging, rebasing, pull requests, GitHub Actions basics.', duration: '2 weeks' },
        { step: 3, title: 'Docker & Containers', desc: 'Learn containers: Dockerfile, docker-compose, container networking. Dockerize 3 apps.', duration: '1 month' },
        { step: 4, title: 'CI/CD Pipelines', desc: 'Build automated pipelines with GitHub Actions or Jenkins: build → test → deploy.', duration: '1 month' },
        { step: 5, title: 'Cloud Fundamentals', desc: 'Learn AWS (EC2, S3, RDS, Lambda, IAM). Get AWS Cloud Practitioner (free course).', duration: '2 months' },
        { step: 6, title: 'Kubernetes', desc: 'Deploy applications on K8s. Learn pods, services, ingress, Helm charts, horizontal scaling.', duration: '2 months' },
        { step: 7, title: 'Infrastructure as Code', desc: 'Provision cloud resources with Terraform. Manage config with Ansible.', duration: '1 month' },
        { step: 8, title: 'Projects + Certifications', desc: 'Build a full DevOps pipeline project. Get AWS or Google Cloud certified.', duration: 'Ongoing' }
      ]
    ),
    role('cse-cyber', 'Cybersecurity Engineer', 'Private / Government', '₹5–20 LPA',
      'Protect systems, networks, and data from cyber threats through ethical hacking, security audits, and incident response.',
      [L('Networking (TCP/IP, DNS, HTTP)','🟢','🟡'), L('Linux','🟢','🟡'), L('Ethical Hacking Techniques','🟡','🔴'), L('Cryptography','🟡','🔴'), L('Python / Bash Scripting','🟢','🟡'), L('OWASP Top 10','🟡','🔴'), L('Security Auditing','🟡','🔴')],
      ['Kali Linux','Wireshark','Metasploit','Nmap','Burp Suite','Nessus','Splunk (basics)','Ghidra'],
      ['Cryptography & Network Security','Computer Networks','Operating Systems','Cyber Laws & Ethics'],
      ['TryHackMe (Free Rooms)','Hack The Box (Free Tier)','Google Cybersecurity Certificate (Coursera Audit)','CompTIA Security+ Study Materials (Free)'],
      [{ level:'Beginner', title:'Network Scanner with Python', stack:'Python + Scapy' }, { level:'Intermediate', title:'CTF (Capture The Flag) Challenges', stack:'TryHackMe / HackTheBox' }, { level:'Advanced', title:'Web App Penetration Testing Report', stack:'Burp Suite + OWASP Methodology' }],
      'Target SOC Analyst or penetration testing internships. Participate in bug bounty programs.',
      ['What is SQL injection? How do you prevent it?','Explain symmetric vs asymmetric encryption.','What is a firewall? Types?','Describe a man-in-the-middle attack.','What is XSS and CSRF?'],
      [
        { step: 1, title: 'Networking Fundamentals', desc: 'Learn TCP/IP model, DNS, HTTP/HTTPS, subnetting, packet analysis with Wireshark.', duration: '1 month' },
        { step: 2, title: 'Linux & Bash', desc: 'Master Linux for security: file permissions, processes, log analysis, Bash scripting.', duration: '1 month' },
        { step: 3, title: 'Ethical Hacking Basics', desc: 'Study the hacking methodology: reconnaissance, scanning, exploitation, post-exploitation, reporting.', duration: '2 months' },
        { step: 4, title: 'Web Security (OWASP)', desc: 'Learn OWASP Top 10 vulnerabilities. Practice on DVWA, Burp Suite.', duration: '2 months' },
        { step: 5, title: 'CTF Challenges', desc: 'Solve 50+ CTF challenges on TryHackMe and HackTheBox. Get TryHackMe certificate.', duration: '3 months' },
        { step: 6, title: 'Security Tools Mastery', desc: 'Learn Metasploit, Nmap, Nessus. Perform vulnerability assessments on practice labs.', duration: '1 month' },
        { step: 7, title: 'Certifications & Jobs', desc: 'Target CEH, CompTIA Security+, eJPT certifications. Apply for SOC/Pentest internships.', duration: 'Ongoing' }
      ]
    ),
    role('cse-dba', 'Database Administrator', 'Private / PSU', '₹4–15 LPA',
      'Design, implement, maintain, and secure databases ensuring high availability and performance.',
      [L('SQL (Advanced)','🟡','🔴'), L('Database Design & Normalization','🟢','🟡'), L('Query Optimization','🟡','🔴'), L('Backup & Recovery','🟡','🔴'), L('NoSQL Databases','🟢','🟡'), L('Linux Administration','🟢','🟡')],
      ['MySQL / PostgreSQL','MongoDB','Oracle Database','MS SQL Server','Redis','AWS RDS','pgAdmin','MySQL Workbench'],
      ['Database Management Systems','Operating Systems','Computer Networks','Data Warehousing'],
      ['SQLZoo (Free)','Mode Analytics SQL Tutorial (Free)','NPTEL DBMS Certificate','Oracle Academy (Free for Students)'],
      [{ level:'Beginner', title:'Student Database Schema Design', stack:'MySQL' }, { level:'Intermediate', title:'Library Management System with Stored Procedures', stack:'PostgreSQL' }, { level:'Advanced', title:'Real-Time Analytics Pipeline', stack:'PostgreSQL + Redis + Airflow' }],
      'Apply for junior DBA roles at banks, insurance companies, healthcare companies.',
      ['What is ACID in DBMS?','Explain the difference between clustered and non-clustered index.','What is a deadlock and how to prevent it?','Explain normalization forms (1NF, 2NF, 3NF).'],
      [
        { step: 1, title: 'SQL Fundamentals', desc: 'Master SELECT, JOIN, GROUP BY, subqueries, window functions. Solve 100 SQL problems on SQLZoo/LeetCode.', duration: '2 months' },
        { step: 2, title: 'Database Design', desc: 'Learn ER diagrams, normalization (1NF–3NF), denormalization, indexing strategies.', duration: '1 month' },
        { step: 3, title: 'DBMS Internals', desc: 'Study transaction management, concurrency control, locking, query execution plans, EXPLAIN.', duration: '1 month' },
        { step: 4, title: 'Administration Skills', desc: 'Practice backup/restore, user management, performance tuning, monitoring on MySQL/PostgreSQL.', duration: '2 months' },
        { step: 5, title: 'NoSQL & Modern DB', desc: 'Learn MongoDB, Redis. Understand when to use SQL vs NoSQL.', duration: '1 month' },
        { step: 6, title: 'Cloud Databases', desc: 'Practice with AWS RDS, Aurora. Learn managed database services.', duration: '1 month' },
        { step: 7, title: 'Certifications & Jobs', desc: 'Get Oracle, MySQL or PostgreSQL DBA certification. Apply for DBA or data engineer roles.', duration: 'Ongoing' }
      ]
    ),
    role('cse-govt', 'Government IT Officer / Technical Role', 'Government / PSU', '₹5–12 LPA',
      'Work in government IT departments: maintain systems, develop e-governance applications, and support digital India initiatives.',
      [L('C / C++ / Java','🟢','🟡'), L('DBMS & SQL','🟢','🟡'), L('Computer Networks','🟢','🟡'), L('Operating Systems','🟢','🟡'), L('General Aptitude','🟡','🔴'), L('Technical Reasoning','🟡','🔴')],
      ['Oracle / MySQL','Linux','MS Office Suite','JAVA EE (basics)'],
      ['All core CS subjects','Engineering Mathematics','Data Structures','Computer Networks','Operating Systems'],
      ['NPTEL Core CS Courses','GATE CS Preparation Materials','GeeksforGeeks GATE Practice'],
      [{ level:'Beginner', title:'College Management System', stack:'Java + MySQL' }, { level:'Intermediate', title:'E-Governance Portal prototype', stack:'PHP/Java + MySQL' }, { level:'Advanced', title:'GATE Preparation — Mock Test Platform', stack:'React + Node.js + PostgreSQL' }],
      'Prepare for GATE CS exam. Apply to SSC, UPSC, TNPSC, DRDO, NIC, ISRO, HAL recruitment.',
      ['GATE CS past year questions.','Aptitude: Number series, Coding-Decoding, Logical Reasoning.','Technical: DBMS, OS, CN, DSA basics.','General English and GK (for SSC/TNPSC).'],
      [
        { step: 1, title: 'Core CS Foundation', desc: 'Master all GATE CS subjects: DBMS, OS, Networks, Algorithms, Theory of Computation, Digital Logic.', duration: '6–12 months' },
        { step: 2, title: 'GATE Preparation', desc: 'Solve previous years GATE CS papers. Join GATE coaching or self-study with standard books (Cormen, Galvin, Forouzan).', duration: '6 months' },
        { step: 3, title: 'Aptitude & Reasoning', desc: 'Prepare Quantitative Aptitude, Logical Reasoning, Verbal Ability for SSC/TNPSC/NIC exams.', duration: '3 months' },
        { step: 4, title: 'Application & Exam', desc: 'Apply for GATE, NIC, DRDO, ISRO, SSC CGL (Technical), TNPSC Group I/II, HAL, BHEL.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // IT — Information Technology
  // ─────────────────────────────────────────────────────────────────────────────
  DB.IT = [
    role('it-webdev', 'Web Developer', 'Private Sector', '₹3–16 LPA',
      'Build and maintain websites and web applications for businesses and organizations.',
      [L('HTML / CSS','🟢','🟡'), L('JavaScript','🟡','🔴'), L('React.js / Vue.js','🟡','🔴'), L('Node.js','🟢','🟡'), L('SQL / NoSQL','🟢','🟡'), L('Responsive Design','🟢','🟡'), L('Git','🟢','🟡')],
      ['VS Code','React.js','Node.js','MySQL / MongoDB','Git','Figma','Chrome DevTools'],
      ['Web Technologies','Internet of Things','Database Management Systems','Software Engineering'],
      ['freeCodeCamp Web Design (Free)','FullStackOpen (Free — Univ. Helsinki)','MDN Web Docs'],
      [{ level:'Beginner', title:'Personal Portfolio Website', stack:'HTML+CSS+JS' }, { level:'Intermediate', title:'Blog with CMS', stack:'React + Node.js + MongoDB' }, { level:'Advanced', title:'E-commerce with Payment Gateway', stack:'Next.js + Stripe + PostgreSQL' }],
      'Apply at web development agencies, startups. Freelance on Fiverr/Upwork.',
      ['Explain CSS Flexbox vs Grid.','What is the event loop in JavaScript?','How does React reconciliation work?','What is REST vs GraphQL?'],
      [
        { step: 1, title: 'HTML + CSS', desc: 'Build 5 static responsive websites using HTML5 + CSS3. Focus on mobile-first design.', duration: '1 month' },
        { step: 2, title: 'JavaScript', desc: 'Learn JavaScript ES6+, DOM manipulation, fetch API, async/await, local storage.', duration: '2 months' },
        { step: 3, title: 'React.js', desc: 'Build 3 React projects: todo app, weather app, e-commerce product page.', duration: '2 months' },
        { step: 4, title: 'Backend with Node.js', desc: 'Create REST APIs with Express.js, integrate MySQL/MongoDB, add JWT auth.', duration: '2 months' },
        { step: 5, title: 'Deploy & Freelance', desc: 'Deploy on Vercel/Netlify. Start freelancing on Fiverr/Upwork.', duration: 'Ongoing' }
      ]
    ),
    role('it-net', 'Network Engineer', 'Private / PSU / Government', '₹3–14 LPA',
      'Design, configure, and maintain computer networks including LANs, WANs, and enterprise networking infrastructure.',
      [L('Computer Networks (TCP/IP)','🟢','🟡'), L('Routing & Switching','🟡','🔴'), L('Network Security','🟡','🔴'), L('Subnetting & VLANs','🟢','🟡'), L('Wireless Networking','🟢','🟡'), L('Linux Networking','🟢','🟡')],
      ['Cisco IOS (Packet Tracer)','Wireshark','PuTTY','GNS3','Nagios / PRTG','Cisco / Juniper Routers & Switches'],
      ['Computer Networks','Network Security','Operating Systems','Data Communications'],
      ['Cisco NetAcad — CCNA (Free Modules)','Cisco Intro to Networking (Free)','NPTEL Computer Networks Certificate'],
      [{ level:'Beginner', title:'Home Network Setup & Simulation (Packet Tracer)', stack:'Cisco Packet Tracer' }, { level:'Intermediate', title:'VLAN & Inter-VLAN Routing Lab', stack:'GNS3 / Packet Tracer' }, { level:'Advanced', title:'Enterprise Network with BGP & Firewall', stack:'GNS3 + pfSense' }],
      'Apply for Network Technician or Junior Network Engineer roles at ISPs, IT companies, banks.',
      ['What is the OSI model? Explain each layer.','How does DHCP work?','Explain VLAN and trunking.','What is BGP? When is it used?','Difference between hub, switch, and router.'],
      [
        { step: 1, title: 'Networking Basics', desc: 'OSI model, TCP/IP stack, IP addressing, subnetting, MAC addresses, ARP.', duration: '1 month' },
        { step: 2, title: 'Routing & Switching', desc: 'Study RIP, OSPF, EIGRP, STP, VLANs. Practice on Cisco Packet Tracer.', duration: '2 months' },
        { step: 3, title: 'Network Security', desc: 'Firewalls, ACLs, VPN, IPSec, wireless security (WPA2/3), IDS/IPS.', duration: '2 months' },
        { step: 4, title: 'Linux Networking', desc: 'ifconfig/ip, iptables, SSH, network troubleshooting on Linux.', duration: '1 month' },
        { step: 5, title: 'CCNA Certification', desc: 'Study Cisco CCNA curriculum. Get certified (industry recognized).', duration: '3 months' },
        { step: 6, title: 'Internship & Jobs', desc: 'Apply for NOC engineer, network support, or junior network admin roles.', duration: 'Ongoing' }
      ]
    ),
    role('it-sysadmin', 'System Administrator', 'Private / PSU', '₹3–12 LPA',
      'Manage and maintain IT infrastructure including servers, operating systems, hardware, and enterprise software.',
      [L('Linux / Windows Server Admin','🟡','🔴'), L('Virtualization (VMware/KVM)','🟢','🟡'), L('Scripting (Bash / PowerShell)','🟢','🟡'), L('Active Directory','🟢','🟡'), L('Backup & Recovery','🟢','🟡'), L('Monitoring Tools','🟢','🟡')],
      ['Linux (Ubuntu/CentOS)','Windows Server','VMware / VirtualBox','Ansible','Nagios / Zabbix','Active Directory','AWS / Azure (basics)'],
      ['Operating Systems','Computer Networks','System Software','Cloud Computing'],
      ['Linux Foundation Introduction to Linux (Free — edX)','Microsoft Learn (Free — Windows Server)','NPTEL OS Certificate'],
      [{ level:'Beginner', title:'Set up Linux Web Server (Apache)', stack:'Ubuntu + Apache + MySQL' }, { level:'Intermediate', title:'Automated Server Monitoring Script', stack:'Bash + Nagios' }, { level:'Advanced', title:'Infrastructure Automation with Ansible', stack:'Ansible + Linux Cluster' }],
      'Apply for IT support, junior sysadmin roles at companies, banks, hospitals.',
      ['Explain Linux file system structure.','What is virtualization?','How does Active Directory work?','What is RAID? Types?','How do you troubleshoot a server that won\'t boot?'],
      [
        { step: 1, title: 'Linux Administration', desc: 'Master Linux: file system, users, permissions, processes, systemd, networking, logs.', duration: '2 months' },
        { step: 2, title: 'Windows Server', desc: 'Learn Active Directory, DNS, DHCP, Group Policy, file sharing on Windows Server.', duration: '1 month' },
        { step: 3, title: 'Virtualization', desc: 'Set up VMs using VMware/VirtualBox. Learn hypervisor concepts.', duration: '1 month' },
        { step: 4, title: 'Scripting', desc: 'Write Bash and PowerShell scripts for automation: backup, monitoring, user creation.', duration: '1 month' },
        { step: 5, title: 'Cloud & Monitoring', desc: 'Learn AWS basics, set up Nagios/Grafana monitoring. Get Linux Foundation or AWS certified.', duration: '2 months' },
        { step: 6, title: 'Jobs', desc: 'Apply for IT support, junior sysadmin, and cloud admin roles.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // ECE — Electronics & Communication Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.ECE = [
    role('ece-emb', 'Embedded Systems Engineer', 'Private / Defence / PSU', '₹4–18 LPA',
      'Design and program embedded microcontroller-based systems for automotive, IoT, industrial, and consumer electronics.',
      [L('C / Embedded C','🟢','🔴'), L('Microcontrollers (AVR/ARM/PIC)','🟡','🔴'), L('Digital Electronics','🟢','🟡'), L('UART / SPI / I2C / CAN','🟡','🔴'), L('RTOS','🟡','🔴'), L('PCB Design (basics)','🟢','🟡'), L('Debugging (JTAG/Logic Analyzer)','🟡','🔴')],
      ['Keil µVision','Arduino IDE','STM32CubeIDE','MPLAB X','Proteus / LTspice','Logic Analyzer','Oscilloscope','UART Terminal'],
      ['Microprocessors & Microcontrollers','Digital Electronics','Communication Systems','Embedded Systems','VLSI Design'],
      ['Arduino Official Tutorials (Free)','STM32 FreeRTOS Tutorial (Free)','NPTEL Embedded Systems Certificate','ARM Cortex-M Programming (Udemy Audit)'],
      [{ level:'Beginner', title:'Blinking LED & Button Interface (Arduino)', stack:'Arduino UNO + C' }, { level:'Intermediate', title:'Smart Home Automation with RTOS', stack:'STM32 + FreeRTOS + MQTT' }, { level:'Advanced', title:'Automotive ECU Simulation (CAN Bus)', stack:'STM32 + CAN + SocketCAN' }],
      'Target embedded firmware engineer internships at automotive companies (Bosch, Continental), defence PSUs (DRDO, HAL), or electronics startups.',
      ['What is the difference between microprocessor and microcontroller?','Explain interrupt handling in embedded systems.','What is RTOS? When do you use it?','Difference between I2C and SPI.','How does DMA work?'],
      [
        { step: 1, title: 'C Programming', desc: 'Master C: pointers, structures, bit manipulation, memory layout. Write 30+ C programs.', duration: '2 months' },
        { step: 2, title: 'Digital Electronics', desc: 'Logic gates, flip-flops, counters, registers, ADC/DAC. Design circuits in Proteus.', duration: '1 month' },
        { step: 3, title: 'Microcontrollers', desc: 'Program Arduino, then STM32. Implement GPIO, timers, ADC, UART, I2C, SPI.', duration: '3 months' },
        { step: 4, title: 'Communication Protocols', desc: 'Master UART, SPI, I2C, CAN. Build projects using each protocol.', duration: '2 months' },
        { step: 5, title: 'RTOS', desc: 'Learn FreeRTOS: tasks, queues, semaphores, mutexes. Port to STM32.', duration: '2 months' },
        { step: 6, title: 'PCB Design', desc: 'Learn KiCad or EasyEDA for PCB design. Design and order a simple PCB.', duration: '1 month' },
        { step: 7, title: 'Projects & Internship', desc: 'Build 3 embedded projects. Apply for DRDO, Bosch, automotive startup internships.', duration: 'Ongoing' }
      ]
    ),
    role('ece-vlsi', 'VLSI Design Engineer', 'Private / PSU / Research', '₹5–25 LPA',
      'Design and verify digital and analog circuits at the silicon chip level for semiconductors.',
      [L('Digital Logic Design','🟢','🟡'), L('Verilog / VHDL','🟡','🔴'), L('CMOS Circuit Design','🟡','🔴'), L('FPGA Programming','🟡','🔴'), L('RTL Design','🟡','🔴'), L('Functional Verification (UVM)','🔴','🔴'), L('Timing Analysis (STA)','🟡','🔴')],
      ['Cadence Virtuoso / Genus','Synopsys Design Compiler','ModelSim / Vivado','MATLAB','Xilinx / Intel Quartus','Magic VLSI (Free)'],
      ['VLSI Design','Digital Electronics','Analog Circuits','Signals & Systems','Communication Systems'],
      ['NPTEL VLSI Design Certificate','MIT OCW 6.004 Computation Structures (Free)','Xilinx FPGA Academy (Free)'],
      [{ level:'Beginner', title:'4-bit ALU in Verilog', stack:'Verilog + ModelSim' }, { level:'Intermediate', title:'UART Peripheral Design on FPGA', stack:'Verilog + Xilinx Vivado' }, { level:'Advanced', title:'32-bit RISC Processor (MIPS/RV32I)', stack:'Verilog + FPGA' }],
      'Apply for VLSI design internships at Qualcomm, Intel, Samsung Semiconductor, Cadence, ISRO VSSC.',
      ['What is setup and hold time in digital circuits?','Explain the CMOS inverter operation.','What is metastability?','Difference between synchronous and asynchronous reset.','What is RTL and how is it synthesized?'],
      [
        { step: 1, title: 'Digital Electronics Foundation', desc: 'Master logic gates, combinational & sequential circuits, FSMs, timing diagrams.', duration: '2 months' },
        { step: 2, title: 'Verilog HDL', desc: 'Learn Verilog: modules, always blocks, RTL coding, testbenches, simulation in ModelSim.', duration: '2 months' },
        { step: 3, title: 'CMOS Design', desc: 'Study CMOS transistor operation, logic gate design, power dissipation, delay analysis.', duration: '2 months' },
        { step: 4, title: 'FPGA Implementation', desc: 'Implement Verilog designs on Xilinx/Intel FPGAs. Learn synthesis, place & route, timing closure.', duration: '2 months' },
        { step: 5, title: 'Physical Design Basics', desc: 'Floorplanning, placement, routing, DRC/LVS. Use open-source tools (OpenROAD, Magic).', duration: '2 months' },
        { step: 6, title: 'Verification', desc: 'Learn SystemVerilog, UVM methodology basics. Write functional testbenches.', duration: '2 months' },
        { step: 7, title: 'GATE & PSU / Jobs', desc: 'Prepare for GATE ECE (VLSI/Analog circuits section). Apply for Qualcomm, Intel, ISRO.', duration: 'Ongoing' }
      ]
    ),
    role('ece-telecom', 'Telecom / RF Engineer', 'Private / PSU / Government', '₹4–15 LPA',
      'Design, implement, and maintain telecommunications networks and RF systems including 5G, satellite, and wireless communications.',
      [L('Communication Systems','🟢','🟡'), L('RF & Microwave Engineering','🟡','🔴'), L('Signal Processing','🟡','🔴'), L('Antenna Design','🟡','🔴'), L('Wireless Standards (4G/5G)','🟡','🔴'), L('MATLAB/Python (Signal Processing)','🟢','🟡')],
      ['MATLAB / Simulink','ADS (Keysight)','AWR Microwave Office','Ansoft HFSS','Spectrum Analyzer','SDR (GNU Radio)','MATLAB Signal Processing Toolbox'],
      ['Communication Systems','Signals & Systems','Antenna & Wave Propagation','Digital Communication','Microwave Engineering'],
      ['MATLAB Onramp (Free)','GNU Radio Tutorials (Free)','NPTEL Communication Systems Certificate','BSNL GATE-EC Study Materials'],
      [{ level:'Beginner', title:'AM/FM Modulation Simulation in MATLAB', stack:'MATLAB Signal Processing Toolbox' }, { level:'Intermediate', title:'Software Defined Radio (SDR) FM Receiver', stack:'GNU Radio + RTL-SDR' }, { level:'Advanced', title:'5G NR Channel Model Simulation', stack:'MATLAB + 5G Toolbox' }],
      'Apply for RF Engineer, Telecom Engineer roles at BSNL, AIRTEL, Jio, ISRO, DRDO, Nokia, Ericsson.',
      ['Explain Nyquist theorem.','What is OFDM? Why is it used in 4G/5G?','Difference between AM and FM.','What is SNR?','Explain MIMO technology.'],
      [
        { step: 1, title: 'Signals & Systems', desc: 'Fourier series/transform, Laplace transform, Z-transform, convolution, sampling theorem.', duration: '2 months' },
        { step: 2, title: 'Communication Systems', desc: 'AM/FM/PM modulation, digital modulation (ASK, FSK, PSK, QAM), BER analysis.', duration: '2 months' },
        { step: 3, title: 'RF & Microwave', desc: 'Transmission lines, Smith chart, impedance matching, amplifiers, filters, antenna design.', duration: '2 months' },
        { step: 4, title: 'MATLAB Signal Processing', desc: 'Implement modulation/demodulation, filtering, spectrum analysis in MATLAB.', duration: '1 month' },
        { step: 5, title: 'Wireless Standards', desc: 'Study 4G LTE and 5G NR architecture, OFDM, MIMO, beamforming.', duration: '2 months' },
        { step: 6, title: 'GATE & Jobs', desc: 'Prepare GATE ECE. Apply for BSNL/DRDO/ISRO JE and TRAI technical roles.', duration: 'Ongoing' }
      ]
    ),
    role('ece-iot', 'IoT Engineer', 'Private Sector / Startup', '₹4–16 LPA',
      'Design IoT systems connecting physical devices to the internet — sensors, edge computing, cloud integration, and data analytics.',
      [L('Embedded C / MicroPython','🟢','🟡'), L('MQTT / HTTP / CoAP','🟡','🔴'), L('Sensor Integration','🟢','🟡'), L('Cloud IoT (AWS/Azure IoT)','🟡','🔴'), L('Python (Data & Automation)','🟢','🟡'), L('Wireless (WiFi/BLE/LoRa/Zigbee)','🟡','🔴')],
      ['ESP32 / Raspberry Pi','Arduino IDE','MQTT Broker (Mosquitto)','AWS IoT Core / Azure IoT Hub','Node-RED','InfluxDB / Grafana','ThingSpeak','Home Assistant'],
      ['Embedded Systems','Internet of Things','Communication Protocols','Wireless Communications','Sensors & Transducers'],
      ['Arduino IoT Cloud (Free)','AWS IoT Foundation (Free Skill Builder)','Coursera IoT Specialization (Audit)','NPTEL IoT Certificate'],
      [{ level:'Beginner', title:'Temperature & Humidity Monitor (DHT11 + ESP32 + MQTT)', stack:'ESP32 + MQTT + Arduino IDE' }, { level:'Intermediate', title:'Smart Home Automation Dashboard', stack:'ESP32 + MQTT + Node-RED + InfluxDB' }, { level:'Advanced', title:'Industrial IoT Predictive Maintenance System', stack:'Raspberry Pi + AWS IoT + ML' }],
      'Target IoT Engineer internships at smart home companies, industrial automation firms, smart city projects.',
      ['What is MQTT and why is it used in IoT?','Explain edge computing vs cloud computing.','What is the difference between WiFi, Bluetooth, LoRa, and Zigbee?','How does OTA (over-the-air) update work?'],
      [
        { step: 1, title: 'Electronics & Embedded Basics', desc: 'Learn circuits, sensors (temperature, humidity, motion), ESP32/Arduino programming.', duration: '2 months' },
        { step: 2, title: 'Wireless Communication', desc: 'Implement WiFi, Bluetooth, LoRa, Zigbee. Understand each protocol\'s use cases.', duration: '1 month' },
        { step: 3, title: 'IoT Protocols', desc: 'Learn MQTT, HTTP/REST, CoAP. Build a sensor data publisher/subscriber system.', duration: '1 month' },
        { step: 4, title: 'Cloud IoT Integration', desc: 'Connect devices to AWS IoT Core or Azure IoT Hub. Set up device twin/shadow.', duration: '2 months' },
        { step: 5, title: 'Data Visualization', desc: 'Use InfluxDB + Grafana or AWS QuickSight to visualize sensor data in real-time.', duration: '1 month' },
        { step: 6, title: 'Projects & Deployment', desc: 'Build 3 complete IoT systems. Deploy to production. Write documentation.', duration: '2 months' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // EEE — Electrical & Electronics Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.EEE = [
    role('eee-power', 'Power Systems Engineer', 'PSU / Government / Private', '₹4–16 LPA',
      'Design, analyze, and maintain electrical power generation, transmission, and distribution systems.',
      [L('Power System Analysis','🟡','🔴'), L('Protection Systems (Relays)','🟡','🔴'), L('Power Flow Studies','🟡','🔴'), L('Electrical Machines','🟢','🟡'), L('MATLAB/ETAP','🟢','🟡'), L('Substation Design','🟡','🔴')],
      ['MATLAB / Simulink','ETAP','PowerWorld Simulator','PSCAD','AutoCAD Electrical','DIgSILENT PowerFactory'],
      ['Power Systems Analysis','Electrical Machines','Power Electronics','Protection Systems','High Voltage Engineering'],
      ['NPTEL Power Systems Certificate','MATLAB Simulink Onramp (Free)','ETAP Tutorials (YouTube)','GATE EEE Study Materials'],
      [{ level:'Beginner', title:'3-Phase Power System Load Flow (MATLAB)', stack:'MATLAB Power Systems Toolbox' }, { level:'Intermediate', title:'Relay Protection Coordination Study', stack:'ETAP' }, { level:'Advanced', title:'Smart Grid Simulation with Renewable Integration', stack:'MATLAB/PSCAD' }],
      'Apply for internships at TANGEDCO, TNEB, NTPC, POWERGRID, BHEL, Siemens, ABB.',
      ['What is per-unit system in power systems?','Explain Gauss-Seidel load flow method.','What is a distance relay? How does it work?','Explain FACTS devices.','What is the difference between HVDC and HVAC transmission?'],
      [
        { step: 1, title: 'Electrical Engineering Basics', desc: 'Circuit theory, AC/DC circuits, three-phase systems, transformers, generators, motors.', duration: '2 months' },
        { step: 2, title: 'Power Systems Analysis', desc: 'Load flow (Gauss-Seidel, Newton-Raphson), fault analysis, symmetrical components.', duration: '3 months' },
        { step: 3, title: 'Protection Systems', desc: 'Overcurrent, distance, differential protection. Relay coordination using ETAP.', duration: '2 months' },
        { step: 4, title: 'MATLAB/Simulink', desc: 'Model power systems in MATLAB. Simulate load flow, fault, and transient stability.', duration: '2 months' },
        { step: 5, title: 'GATE & PSU Preparation', desc: 'Prepare GATE EEE. Apply for TNEB, NTPC, POWERGRID, BHEL via GATE score.', duration: '6–12 months' },
        { step: 6, title: 'Certifications & Jobs', desc: 'Get ETAP or MATLAB certified. Apply for power sector private companies.', duration: 'Ongoing' }
      ]
    ),
    role('eee-ev', 'Electric Vehicle (EV) Engineer', 'Private / Automotive', '₹5–20 LPA',
      'Design, develop, and test electric vehicle systems including battery management, motor drives, and power electronics.',
      [L('Power Electronics (Converters, Inverters)','🟡','🔴'), L('Battery Management Systems (BMS)','🟡','🔴'), L('Motor Control (FOC/DTC)','🟡','🔴'), L('MATLAB/Simulink','🟢','🟡'), L('CAN Bus / Automotive Protocols','🟡','🔴'), L('Embedded C','🟢','🟡')],
      ['MATLAB / Simulink','PLECS','ANSYS Maxwell','STM32 (Motor Control)','VECTOR CANalyzer','Battery Testing Equipment'],
      ['Power Electronics','Electrical Machines','Control Systems','Embedded Systems','Vehicle Dynamics'],
      ['NPTEL Power Electronics Certificate','MIT OCW Electric Machines (Free)','Coursera EV Basics (Audit)'],
      [{ level:'Beginner', title:'DC-DC Boost Converter Design (MATLAB)', stack:'MATLAB Simulink' }, { level:'Intermediate', title:'BLDC Motor Speed Control (FOC)', stack:'STM32 + MATLAB' }, { level:'Advanced', title:'Li-Ion Battery Management System', stack:'STM32 + CAN + Python BMS' }],
      'Apply at Ola Electric, Ather Energy, TATA Motors EV, Mahindra Electric, Bosch (India EV division).',
      ['What is FOC (Field Oriented Control)?','Explain the working of a BMS.','What types of EV charging are there (Level 1/2/3)?','Explain regenerative braking.','What is SoC and SoH in batteries?'],
      [
        { step: 1, title: 'Power Electronics', desc: 'DC-DC converters (Buck, Boost, Buck-Boost), inverters, rectifiers, PWM techniques.', duration: '2 months' },
        { step: 2, title: 'Electric Machines & Drives', desc: 'BLDC, PMSM, induction motor drives. FOC and DTC algorithms. MATLAB simulation.', duration: '2 months' },
        { step: 3, title: 'Battery Technology & BMS', desc: 'Lithium-ion chemistry, SoC estimation, cell balancing, thermal management.', duration: '2 months' },
        { step: 4, title: 'Embedded Control', desc: 'Implement motor control algorithms on STM32/DSP. CAN bus communication.', duration: '2 months' },
        { step: 5, title: 'Automotive Standards', desc: 'Study ISO 26262 (functional safety), AUTOSAR, IEC 61851 (EV charging).', duration: '1 month' },
        { step: 6, title: 'Projects & Internship', desc: 'Build EV subsystem project. Apply for EV startup internships.', duration: 'Ongoing' }
      ]
    ),
    role('eee-automation', 'Industrial Automation Engineer', 'Private / Manufacturing / PSU', '₹4–15 LPA',
      'Design and implement industrial automation systems using PLCs, SCADA, and industrial networking.',
      [L('PLC Programming (Ladder Logic/Structured Text)','🟡','🔴'), L('SCADA / HMI Development','🟡','🔴'), L('Industrial Networks (Modbus/Profibus)','🟢','🟡'), L('Instrumentation','🟢','🟡'), L('Control Systems','🟡','🔴'), L('Electrical Panel Design','🟢','🟡')],
      ['Siemens TIA Portal','Allen Bradley Studio 5000','WinCC / iFIX / Ignition SCADA','AutoCAD Electrical','MATLAB Control Toolbox','EPLAN'],
      ['Control Systems','Industrial Automation','Sensors & Transducers','Power Electronics','Electrical Machines'],
      ['NPTEL Industrial Automation Certificate','Siemens TIA Portal Basic (Free Tutorials)','ISA Automation Fundamentals (Free)'],
      [{ level:'Beginner', title:'Traffic Light PLC Program (Ladder Logic)', stack:'Siemens TIA Portal' }, { level:'Intermediate', title:'Conveyor Belt Automation with SCADA', stack:'TIA Portal + WinCC' }, { level:'Advanced', title:'Industry 4.0 Plant Monitoring System', stack:'OPC-UA + MQTT + SCADA + Python' }],
      'Apply at Siemens, Schneider Electric, Honeywell, ABB, Larsen & Toubro, cement/steel plants.',
      ['What is a PLC? How does it differ from a microcontroller?','Explain PID control.','What is Modbus RTU vs Modbus TCP?','Describe SCADA architecture.','What is a safety PLC (SIL)?'],
      [
        { step: 1, title: 'Control Systems Theory', desc: 'Transfer functions, PID control, Bode plots, root locus, stability analysis.', duration: '2 months' },
        { step: 2, title: 'PLC Programming', desc: 'Learn Ladder Logic, Function Block Diagram, Structured Text on Siemens TIA Portal.', duration: '2 months' },
        { step: 3, title: 'SCADA & HMI', desc: 'Design SCADA screens in WinCC or Ignition. Connect to PLC via OPC-UA.', duration: '2 months' },
        { step: 4, title: 'Industrial Networks', desc: 'Study Modbus, Profibus, Profinet, EtherNet/IP, OPC-UA. Configure network communication.', duration: '1 month' },
        { step: 5, title: 'Field Instruments', desc: 'Learn about sensors (pressure, temperature, flow), transmitters, control valves, P&ID reading.', duration: '1 month' },
        { step: 6, title: 'Certifications & Jobs', desc: 'Get ISA CCST or Siemens TIA Portal certification. Apply for automation engineer roles.', duration: 'Ongoing' }
      ]
    ),
    role('eee-govt', 'PSU / Government Electrical Engineer', 'PSU / Government', '₹5–14 LPA',
      'Work in public sector undertakings like TNEB, NTPC, BHEL, POWERGRID in power generation, transmission, or distribution roles.',
      [L('Core EEE Subjects (GATE level)','🟡','🔴'), L('Aptitude & Reasoning','🟡','🔴'), L('Power Systems','🟡','🔴'), L('Control Theory','🟡','🔴'), L('Electrical Machines','🟡','🔴')],
      ['MATLAB','ETAP','AutoCAD Electrical','GATE Preparation Tools'],
      ['All core EEE subjects','Engineering Mathematics','Engineering Aptitude'],
      ['GATE EEE Preparation (Ace Academy / Made Easy PDFs)','NPTEL All EEE Courses','TANGEDCO/TNEB Previous Papers'],
      [{ level:'Beginner', title:'Complete GATE EEE Subject Notes', stack:'Self-Study' }, { level:'Intermediate', title:'GATE Mock Test Series (300+ problems)', stack:'Online Practice' }, { level:'Advanced', title:'Full-Length GATE EEE Mock Exam', stack:'GATE Practice Platform' }],
      'No traditional internship — prepare for GATE, TNPSC Engineering Services, TANGEDCO, NTPC, BHEL, POWERGRID, BEL direct exams.',
      ['GATE EEE: all topics (circuit theory, machines, power systems, control, signals, electronics)','Aptitude: Number series, Data Interpretation, English','Technical GK: energy policies, power sector updates'],
      [
        { step: 1, title: 'GATE Foundation', desc: 'Study all GATE EEE subjects systematically: Circuits, Machines, Power Systems, Control, Signals & Systems, Analog/Digital Electronics.', duration: '6–12 months' },
        { step: 2, title: 'Practice & Mock Tests', desc: 'Solve 10+ years GATE EEE papers. Join test series. Aim for GATE rank < 1000.', duration: '3–6 months' },
        { step: 3, title: 'PSU Applications', desc: 'Apply to NTPC, POWERGRID, BHEL, ONGC, ISRO, DRDO, NALCO via GATE score. Also apply for state PSUs via state GATE/PSC.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // AIDS — Artificial Intelligence & Data Science
  // ─────────────────────────────────────────────────────────────────────────────
  DB.AIDS = [
    role('aids-ds', 'Data Scientist', 'Private / Research', '₹6–28 LPA',
      'Analyze complex datasets, build predictive models, and generate actionable insights for business decisions.',
      [L('Python','🟢','🔴'), L('Statistics & Probability','🟡','🔴'), L('Machine Learning','🟡','🔴'), L('SQL','🟢','🟡'), L('Data Visualization','🟢','🟡'), L('Feature Engineering','🟡','🔴'), L('Deep Learning (basics)','🟡','🔴')],
      ['Python (NumPy, Pandas, Scikit-learn)','TensorFlow / PyTorch','Tableau / Power BI','SQL (PostgreSQL/BigQuery)','Jupyter Notebook','Kaggle','Git'],
      ['Machine Learning','Artificial Intelligence','Statistics','Data Mining','Big Data Analytics','Deep Learning'],
      ['Kaggle Learn (Free — Python, ML, SQL, DL)','fast.ai (Free)','Google ML Crash Course (Free)','IBM Data Science (Coursera Audit)'],
      [{ level:'Beginner', title:'EDA on Titanic Dataset (Pandas + Matplotlib)', stack:'Python + Pandas + Seaborn' }, { level:'Intermediate', title:'Customer Churn Prediction', stack:'Python + Scikit-learn + XGBoost' }, { level:'Advanced', title:'Real-Time Recommendation Engine', stack:'Python + Spark + AWS + Redis' }],
      'Apply for data analyst/scientist internships at analytics firms, product companies (Flipkart, Swiggy, Zomato).',
      ['What is bias-variance tradeoff?','Explain cross-validation.','What is regularization? Types?','How do you handle imbalanced datasets?','Explain ensemble methods.'],
      [
        { step: 1, title: 'Python & Mathematics', desc: 'Python (Pandas, NumPy, Matplotlib). Statistics (mean, variance, distributions, hypothesis testing). Linear algebra basics.', duration: '2 months' },
        { step: 2, title: 'SQL for Data Analysis', desc: 'Advanced SQL: window functions, CTEs, GROUP BY, JOIN. Practice on LeetCode/HackerRank.', duration: '1 month' },
        { step: 3, title: 'Machine Learning', desc: 'Regression, classification, clustering. Scikit-learn API. Model evaluation metrics.', duration: '3 months' },
        { step: 4, title: 'Kaggle Competitions', desc: 'Participate in 5+ Kaggle competitions. Study top solutions.', duration: '3 months' },
        { step: 5, title: 'Deep Learning & NLP', desc: 'Neural networks, CNNs, RNNs, Transformers (BERT). Work with Hugging Face models.', duration: '2 months' },
        { step: 6, title: 'Data Engineering Basics', desc: 'ETL pipelines, Apache Spark basics, BigQuery, Airflow for scheduling.', duration: '2 months' },
        { step: 7, title: 'Portfolio & Jobs', desc: 'Document 5 end-to-end projects on GitHub. Get Kaggle Expert/Master. Apply for data scientist roles.', duration: 'Ongoing' }
      ]
    ),
    role('aids-da', 'Data Analyst', 'Private Sector', '₹3–12 LPA',
      'Collect, process, and visualize data to help organizations make data-driven decisions.',
      [L('SQL','🟢','🟡'), L('Excel / Google Sheets','🟢','🟡'), L('Python (basics)','🟢','🟡'), L('Data Visualization','🟢','🟡'), L('Statistics (Descriptive)','🟢','🟡'), L('BI Tools (Tableau/Power BI)','🟡','🔴')],
      ['MySQL / PostgreSQL','Excel / Google Sheets','Tableau / Power BI','Python (Pandas, Matplotlib)','Google Analytics','Looker Studio'],
      ['Statistics','Database Management','Data Mining','Business Analytics','Python Programming'],
      ['Google Data Analytics (Coursera Audit — Free)','Tableau Public Training (Free)','SQLZoo (Free)','Kaggle Learn Python & SQL (Free)'],
      [{ level:'Beginner', title:'Sales Dashboard in Excel', stack:'Excel Pivot Tables + Charts' }, { level:'Intermediate', title:'E-commerce Sales Analysis Dashboard', stack:'Python + Pandas + Tableau' }, { level:'Advanced', title:'Marketing Analytics Pipeline', stack:'SQL + Python + Power BI + API data' }],
      'Apply for business analyst, data analyst at e-commerce, finance, healthcare, and consulting companies.',
      ['Explain the difference between data analyst and data scientist.','How do you handle NULL values in SQL?','What is a A/B test?','Explain the process of EDA.'],
      [
        { step: 1, title: 'Excel & Google Sheets', desc: 'Pivot tables, VLOOKUP, charts, conditional formatting. Build 5 business dashboards.', duration: '1 month' },
        { step: 2, title: 'SQL', desc: 'SELECT, WHERE, JOIN, GROUP BY, subqueries, window functions. Solve 100 SQL problems.', duration: '2 months' },
        { step: 3, title: 'Python for Data', desc: 'Pandas (data cleaning), NumPy (math), Matplotlib/Seaborn (visualization).', duration: '2 months' },
        { step: 4, title: 'BI Tools', desc: 'Create dashboards in Tableau Public or Power BI. Publish 3 interactive dashboards.', duration: '2 months' },
        { step: 5, title: 'Statistics', desc: 'Descriptive statistics, hypothesis testing, correlation, regression analysis.', duration: '1 month' },
        { step: 6, title: 'Portfolio & Jobs', desc: 'Create data portfolio on GitHub + Tableau Public. Apply for data analyst roles.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // AIML — Artificial Intelligence & Machine Learning
  // ─────────────────────────────────────────────────────────────────────────────
  DB.AIML = DB.AIDS; // Same roles, same flow

  // ─────────────────────────────────────────────────────────────────────────────
  // CYS — Cyber Security
  // ─────────────────────────────────────────────────────────────────────────────
  DB.CYS = [
    role('cys-pentest', 'Penetration Tester / Ethical Hacker', 'Private / Government', '₹4–20 LPA',
      'Perform authorized security testing of systems to find and report vulnerabilities before malicious hackers do.',
      [L('Networking (TCP/IP)','🟢','🟡'), L('Linux','🟢','🟡'), L('Web Security (OWASP)','🟡','🔴'), L('Scripting (Python/Bash)','🟢','🟡'), L('Exploitation Techniques','🟡','🔴'), L('Report Writing','🟡','🔴')],
      ['Kali Linux','Metasploit','Burp Suite','Nmap','Wireshark','John the Ripper','Hashcat','CyberChef'],
      ['Cryptography','Computer Networks','Operating Systems','Web Technologies','Cyber Laws'],
      ['TryHackMe (Free)','HackTheBox (Free Tier)','OWASP WebGoat (Free)','PortSwigger Web Security Academy (Free)'],
      [{ level:'Beginner', title:'TryHackMe — Complete 10 Free Rooms', stack:'TryHackMe Platform' }, { level:'Intermediate', title:'DVWA Web App Penetration Test', stack:'Kali Linux + Burp Suite + DVWA' }, { level:'Advanced', title:'Full Network Pentest Report (CTF)', stack:'Kali Linux + Metasploit + Nmap + Report' }],
      'Join bug bounty programs (HackerOne, Bugcrowd). Apply for security internships at IT security firms.',
      ['Explain the phases of penetration testing.','What is SQL injection?','How does a buffer overflow work?','What tools do you use for network scanning?','Explain CVE and CVSS scoring.'],
      [
        { step: 1, title: 'Networking & Linux', desc: 'TCP/IP, OSI model, Wireshark, Linux commands, Bash scripting, file permissions.', duration: '2 months' },
        { step: 2, title: 'Web Security', desc: 'OWASP Top 10 (SQLi, XSS, CSRF, IDOR). Practice on PortSwigger Web Academy (free).', duration: '2 months' },
        { step: 3, title: 'Exploitation & Metasploit', desc: 'Learn Metasploit framework, buffer overflows, privilege escalation techniques.', duration: '2 months' },
        { step: 4, title: 'CTF Challenges', desc: 'Solve 100+ CTF challenges. Join TryHackMe, HackTheBox, CTFtime competitions.', duration: '3 months' },
        { step: 5, title: 'Bug Bounty', desc: 'Create HackerOne/Bugcrowd account. Start hunting on public bug bounty programs.', duration: 'Ongoing' },
        { step: 6, title: 'Certifications', desc: 'Get eJPT (Free), CEH, OSCP (advanced) certifications.', duration: 'Ongoing' }
      ]
    ),
    role('cys-soc', 'SOC Analyst', 'Private / Government', '₹3–12 LPA',
      'Monitor security events, respond to incidents, and investigate alerts in a Security Operations Center.',
      [L('SIEM Tools (Splunk/QRadar)','🟡','🔴'), L('Log Analysis','🟢','🟡'), L('Network Traffic Analysis','🟢','🟡'), L('Threat Intelligence','🟡','🔴'), L('Incident Response','🟡','🔴'), L('Malware Analysis (basics)','🟢','🟡')],
      ['Splunk','Microsoft Sentinel','IBM QRadar','Wireshark','Snort / Suricata','MITRE ATT&CK','VirusTotal','TheHive'],
      ['Computer Networks','Operating Systems','Cryptography','Digital Forensics','Cyber Laws'],
      ['Cybrary SOC Analyst (Free)','TryHackMe SOC Level 1 Path (Free)','Splunk Fundamentals 1 (Free)','MITRE ATT&CK Training (Free)'],
      [{ level:'Beginner', title:'Set up Splunk SIEM & Ingest Sample Logs', stack:'Splunk Free Trial' }, { level:'Intermediate', title:'Incident Response Investigation (TryHackMe Lab)', stack:'TryHackMe SOC Path' }, { level:'Advanced', title:'Threat Hunt using MITRE ATT&CK Framework', stack:'Splunk + MITRE + OSINT tools' }],
      'Apply for Tier 1 SOC Analyst roles at MSSPs (Managed Security Service Providers), banks, large IT companies.',
      ['What is SIEM?','Explain a typical SOC incident workflow.','What is the difference between IDS and IPS?','Describe a phishing attack.','What is MITRE ATT&CK?'],
      [
        { step: 1, title: 'Networking & OS', desc: 'TCP/IP, DNS, HTTP, log files, Windows Event Logs, Linux Syslog.', duration: '1 month' },
        { step: 2, title: 'SIEM Tools', desc: 'Install and configure Splunk free tier. Practice log ingestion, creating dashboards, alerts.', duration: '2 months' },
        { step: 3, title: 'Threat Intelligence', desc: 'Study MITRE ATT&CK framework, threat actors, TTP (Tactics, Techniques, Procedures).', duration: '1 month' },
        { step: 4, title: 'Incident Response', desc: 'Learn IR lifecycle: Prepare → Identify → Contain → Eradicate → Recover → Lessons Learned.', duration: '1 month' },
        { step: 5, title: 'Malware Analysis Basics', desc: 'Static (strings, file headers) and dynamic (sandbox) malware analysis. VirusTotal, Any.run.', duration: '1 month' },
        { step: 6, title: 'Certifications & Jobs', desc: 'Get CompTIA Security+, Splunk Core Certified User, or Blue Team Junior Analyst cert.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // MECH — Mechanical Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.MECH = [
    role('mech-design', 'Mechanical Design Engineer', 'Private / PSU', '₹3–16 LPA',
      'Design mechanical components, assemblies, and systems using CAD tools and engineering analysis.',
      [L('Engineering Drawing & GD&T','🟢','🟡'), L('3D CAD Modelling','🟡','🔴'), L('Machine Design (stress, fatigue)','🟡','🔴'), L('Materials Science','🟢','🟡'), L('Manufacturing Processes','🟢','🟡'), L('FEA (Finite Element Analysis)','🟡','🔴')],
      ['SolidWorks / CATIA V5 / Inventor','AutoCAD','ANSYS Mechanical','MATLAB (basics)','GD&T Standards (ISO/ASME)','PDM/PLM Systems'],
      ['Engineering Drawing','Machine Design','Strength of Materials','Manufacturing Technology','Materials Science','Fluid Mechanics'],
      ['Autodesk Fusion 360 Free Student Access','GrabCAD Community (Free Models)','NPTEL Machine Design Certificate','MIT OCW Mechanical Engineering (Free)'],
      [{ level:'Beginner', title:'3D Model: Spur Gear (SolidWorks/Fusion 360)', stack:'SolidWorks / Autodesk Fusion 360' }, { level:'Intermediate', title:'Stress Analysis of Mechanical Bracket (FEA)', stack:'ANSYS Mechanical / SimScale' }, { level:'Advanced', title:'Complete Product Design: Robotic Arm Assembly', stack:'SolidWorks + ANSYS + GD&T Drawings' }],
      'Apply for design engineering internships at automobile companies, machine tool manufacturers, product design firms.',
      ['Explain stress-strain curve.','What is factor of safety?','Difference between welding and brazing?','What is GD&T? Explain flatness and concentricity.','What FEA software have you used?'],
      [
        { step: 1, title: 'Engineering Fundamentals', desc: 'Statics, Dynamics, Strength of Materials, Thermodynamics basics, Engineering Drawing (2D/3D views, tolerances).', duration: '2 months' },
        { step: 2, title: 'CAD Modelling', desc: 'Master SolidWorks or CATIA V5: Part modelling, assemblies, drawings with GD&T.', duration: '3 months' },
        { step: 3, title: 'Machine Design', desc: 'Shafts, keys, bearings, gears, springs, fasteners. Design calculations and factor of safety.', duration: '2 months' },
        { step: 4, title: 'FEA (Finite Element Analysis)', desc: 'Structural, thermal, modal analysis in ANSYS or SimScale. Interpret results and design iterations.', duration: '2 months' },
        { step: 5, title: 'Manufacturing & DFM', desc: 'Design for Manufacturing (DFM). Understand machining, casting, forging, sheet metal processes.', duration: '1 month' },
        { step: 6, title: 'Projects & Portfolio', desc: 'Build 3 complete design projects with drawings, analysis reports, and CAD files. Upload to GrabCAD.', duration: '2 months' },
        { step: 7, title: 'Internship & Jobs', desc: 'Apply for design engineer roles at automotive, aerospace, and product design companies.', duration: 'Ongoing' }
      ]
    ),
    role('mech-mfg', 'Manufacturing / Production Engineer', 'Private / PSU / Manufacturing', '₹3–14 LPA',
      'Plan, optimize, and manage manufacturing processes to produce components efficiently and to quality standards.',
      [L('Manufacturing Processes','🟡','🔴'), L('Quality Control (SPC/FMEA)','🟡','🔴'), L('Lean Manufacturing','🟡','🔴'), L('CAM Programming','🟢','🟡'), L('Metrology','🟢','🟡'), L('Industrial Engineering Basics','🟢','🟡')],
      ['AutoCAD / CAD','Mastercam (CAM)','CATIA / SolidWorks','SAP (Manufacturing Module)','Minitab (SPC)','FMEA Templates'],
      ['Manufacturing Technology','Metrology & Quality Control','Operations Research','Production Planning','Industrial Engineering'],
      ['NPTEL Manufacturing Technology Certificate','Lean Six Sigma Green Belt (Coursera Audit)','MIT OCW Manufacturing (Free)'],
      [{ level:'Beginner', title:'Process Flow Diagram for a Machined Part', stack:'Flowcharting + AutoCAD' }, { level:'Intermediate', title:'FMEA for a CNC Machining Operation', stack:'Excel FMEA Template + Minitab' }, { level:'Advanced', title:'Lean Production Layout Design for a Manufacturing Cell', stack:'AutoCAD + Arena Simulation' }],
      'Apply for production engineering internships at automobile, machine tool, FMCG, and defence PSU companies.',
      ['What is Lean Manufacturing? Explain 5S.','What is FMEA?','Explain SPC (Statistical Process Control).','What is the difference between tolerance and allowance?','What is a Gantt chart?'],
      [
        { step: 1, title: 'Manufacturing Processes', desc: 'Casting, forging, machining (turning, milling, grinding), welding, sheet metal. Study machine tool operations.', duration: '2 months' },
        { step: 2, title: 'Quality Management', desc: 'ISO 9001, SPC, control charts, FMEA, PPAP, MSA. Practice with Minitab.', duration: '2 months' },
        { step: 3, title: 'Lean & Six Sigma', desc: 'Lean tools: 5S, Kaizen, VSM, SMED. Six Sigma DMAIC methodology.', duration: '2 months' },
        { step: 4, title: 'CAM & CNC', desc: 'Learn Mastercam or Fusion 360 CAM. Generate G-code, simulate CNC machining.', duration: '2 months' },
        { step: 5, title: 'ERP / SAP Basics', desc: 'Learn SAP MM/PP module basics for production planning.', duration: '1 month' },
        { step: 6, title: 'Internship & Certifications', desc: 'Get Lean Six Sigma Green Belt. Apply for production engineer roles.', duration: 'Ongoing' }
      ]
    ),
    role('mech-hvac', 'HVAC Engineer', 'Private / Construction / MEP', '₹3–12 LPA',
      'Design, install, and maintain heating, ventilation, and air conditioning systems for buildings and industrial facilities.',
      [L('Thermodynamics','🟢','🟡'), L('Fluid Mechanics','🟢','🟡'), L('HVAC Load Calculations','🟡','🔴'), L('Refrigeration Cycles','🟡','🔴'), L('AutoCAD MEP','🟡','🔴'), L('HAP / e20-II (Load Calc Software)','🟡','🔴')],
      ['AutoCAD MEP','Carrier HAP (HVAC software)','Revit MEP','TRACE 700','EES (Engineering Equation Solver)','MATLAB'],
      ['Thermodynamics','Refrigeration & Air Conditioning','Fluid Mechanics','Heat Transfer','Building Services Engineering'],
      ['NPTEL Refrigeration & Air Conditioning Certificate','ASHRAE Free Student Access','TRACE 700 Tutorials (Free)'],
      [{ level:'Beginner', title:'Cooling Load Calculation for a 3-BHK Apartment', stack:'Manual calculation + Excel' }, { level:'Intermediate', title:'HVAC System Design for Office Building', stack:'Carrier HAP + AutoCAD MEP' }, { level:'Advanced', title:'Energy Optimization of Chiller Plant', stack:'TRACE 700 + BMS Integration' }],
      'Apply at MEP consulting firms, HVAC contractors (Voltas, Blue Star, Daikin), real estate companies.',
      ['What is COP in refrigeration?','Explain the vapour compression cycle.','What is psychrometric chart?','Difference between VRF and chiller system?','What are ASHRAE standards?'],
      [
        { step: 1, title: 'Thermodynamics & Refrigeration', desc: 'Laws of thermodynamics, vapour compression cycle, refrigerants (R410A, R32), COP.', duration: '2 months' },
        { step: 2, title: 'Psychrometrics & Load Calculation', desc: 'Psychrometric chart, sensible/latent heat, CLTD method, cooling load calculations.', duration: '2 months' },
        { step: 3, title: 'HVAC Equipment Knowledge', desc: 'Chillers, AHUs, FCUs, cooling towers, VRF systems, duct design, pipe sizing.', duration: '2 months' },
        { step: 4, title: 'AutoCAD MEP & Revit', desc: 'Draw HVAC layouts and schematics. Learn BIM for MEP.', duration: '2 months' },
        { step: 5, title: 'Software & Certification', desc: 'Practice Carrier HAP, TRACE 700. Get ASHRAE student member certification.', duration: 'Ongoing' }
      ]
    ),
    role('mech-auto', 'Automobile Engineer', 'Private / Automotive', '₹3–15 LPA',
      'Design, develop, test, and maintain automobiles including vehicle body, chassis, powertrain, and NVH.',
      [L('Vehicle Dynamics','🟡','🔴'), L('IC Engine Theory','🟢','🟡'), L('Automotive Electronics (CAN Bus)','🟡','🔴'), L('CAD (CATIA/SolidWorks)','🟡','🔴'), L('NVH (Noise, Vibration, Harshness)','🟡','🔴'), L('Material Selection','🟢','🟡')],
      ['CATIA V5','ANSYS Mechanical','MATLAB/Simulink','ADAMS (Vehicle Dynamics)','AVL CRUISE (Powertrain)','VECTOR CANalyzer'],
      ['IC Engines','Automotive Technology','Vehicle Dynamics','Strength of Materials','Machine Design'],
      ['MIT OCW Mechanics (Free)','NPTEL Automotive Technology Certificate','Coursera Self-Driving Cars (Audit)'],
      [{ level:'Beginner', title:'Suspension System FEA', stack:'ANSYS Mechanical' }, { level:'Intermediate', title:'Vehicle Performance Simulation', stack:'MATLAB/Simulink + ADVISOR' }, { level:'Advanced', title:'Chassis Topology Optimization for Weight Reduction', stack:'ANSYS + CATIA + Optimization' }],
      'Apply at TATA Motors, Mahindra, Ashok Leyland, Bosch (India), TVS Motors, automotive suppliers.',
      ['Explain the 4-stroke engine cycle.','What is understeer and oversteer?','Explain CAN bus in automotive.','What are Euro/BS emission norms?','What is NVH?'],
      [
        { step: 1, title: 'Engineering Fundamentals', desc: 'Mechanics, Thermodynamics, Materials Science, Manufacturing.', duration: '2 months' },
        { step: 2, title: 'Automotive Systems', desc: 'Engine, transmission, braking, suspension, steering, body structure. IC engines (2-stroke, 4-stroke, diesel, petrol).', duration: '3 months' },
        { step: 3, title: 'CAD & FEA', desc: 'CATIA V5 for body/chassis design. ANSYS for crash/structural analysis.', duration: '2 months' },
        { step: 4, title: 'Vehicle Dynamics', desc: 'Longitudinal, lateral, and vertical dynamics. Use MATLAB or ADAMS for simulation.', duration: '2 months' },
        { step: 5, title: 'Automotive Electronics', desc: 'CAN bus, OBD-II, ECU, ADAS basics, automotive functional safety (ISO 26262 basics).', duration: '1 month' },
        { step: 6, title: 'Internship & GATE', desc: 'Apply for automobile company internships. Prepare GATE Mechanical for PSU roles.', duration: 'Ongoing' }
      ]
    ),
    role('mech-gate', 'PSU / Government Mechanical Engineer', 'PSU / Government', '₹5–15 LPA',
      'Work in public sector companies like NTPC, ISRO, DRDO, BHEL in core mechanical roles.',
      [L('All Core MECH Subjects (GATE)','🟡','🔴'), L('Aptitude & General Awareness','🟡','🔴'), L('General English','🟢','🟡')],
      ['MATLAB','AutoCAD','ANSYS (basic knowledge)'],
      ['All core MECH subjects: Thermodynamics, Fluid Mechanics, Machine Design, Manufacturing, Strength of Materials'],
      ['NPTEL All MECH Courses (Free)','GATE MECH Preparation Resources','Made Easy / Ace Academy Study Material'],
      [{ level:'Beginner', title:'GATE Mechanical Topic-wise Notes (All Subjects)', stack:'Self-Study' }, { level:'Intermediate', title:'500+ GATE MECH Previous Year Problems', stack:'Practice Platform' }, { level:'Advanced', title:'Full Mock GATE Exam with Analysis', stack:'GATE Mock Test Platform' }],
      'No traditional internship — focus on GATE preparation. Apply for ISRO, DRDO, NTPC, BHEL, ONGC, AAI, HAL recruitment via GATE score.',
      ['GATE: Thermodynamics, Fluid Mechanics, Machine Design, Manufacturing, Strength of Materials, Heat Transfer, Theory of Machines.','Aptitude: Quantitative, Logical Reasoning.','GK: technical updates in power/defence/aerospace sectors.'],
      [
        { step: 1, title: 'Systematic GATE Preparation', desc: 'Study one subject at a time. Standard textbooks: Nag (Heat Transfer), Shigley (Machine Design), Modi & Seth (Strength of Materials), Rattan (Theory of Machines).', duration: '6–12 months' },
        { step: 2, title: 'Previous Year Papers & Mock Tests', desc: 'Solve last 15 years GATE MECH papers. Join online mock test series.', duration: '3–6 months' },
        { step: 3, title: 'PSU Application & Interview', desc: 'Apply to ISRO, DRDO, NTPC, BHEL, HPCL, ONGC, AAI, HAL using GATE score. Prepare for GD + Technical Interview.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // CIVIL — Civil Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.CIVIL = [
    role('civil-struct', 'Structural Engineer', 'Private / PSU / Government', '₹3–14 LPA',
      'Analyze and design structural systems for buildings, bridges, and infrastructure to ensure safety and stability.',
      [L('Structural Analysis','🟡','🔴'), L('Concrete Design (IS 456)','🟡','🔴'), L('Steel Design (IS 800)','🟡','🔴'), L('AutoCAD / Revit','🟡','🔴'), L('STAAD.Pro / ETABS','🟡','🔴'), L('Geotechnical Basics','🟢','🟡')],
      ['AutoCAD','STAAD.Pro / ETABS','Revit Structure','SAP2000','MATLAB (basic)','MS Project'],
      ['Structural Analysis','RCC Design','Steel Structures','Geotechnical Engineering','Fluid Mechanics','Surveying'],
      ['NPTEL Structural Analysis Certificate','STAAD.Pro Free Trial Tutorials','MIT OCW Structural Engineering (Free)'],
      [{ level:'Beginner', title:'RCC Beam Design (Manual IS 456)', stack:'Manual + Excel' }, { level:'Intermediate', title:'G+5 Building Analysis in STAAD.Pro', stack:'STAAD.Pro' }, { level:'Advanced', title:'Seismic Analysis of High-Rise Building', stack:'ETABS + IS 1893' }],
      'Apply at construction consultancies, government PWD, NHAI, metro rail projects, structural design firms.',
      ['What is the difference between one-way and two-way slab?','Explain the IS 456:2000 code provisions.','What is the effective length of a column?','What is moment redistribution?','Explain soil bearing capacity.'],
      [
        { step: 1, title: 'Structural Analysis', desc: 'Statics, beam analysis, method of sections, deflection, matrix methods, FEM basics.', duration: '2 months' },
        { step: 2, title: 'RCC Design', desc: 'IS 456:2000 provisions for beams, slabs, columns, footings. Design 5 elements manually.', duration: '2 months' },
        { step: 3, title: 'Steel Design', desc: 'IS 800:2007 limit state design. Connections, bolts, welds, tension/compression members.', duration: '2 months' },
        { step: 4, title: 'Software Tools', desc: 'Model and analyse structures in STAAD.Pro or ETABS. Verify with manual calculations.', duration: '2 months' },
        { step: 5, title: 'Geotechnical', desc: 'Soil classification, bearing capacity, foundation types, settlement analysis.', duration: '1 month' },
        { step: 6, title: 'GATE & Jobs', desc: 'Prepare GATE Civil. Apply for PSU (CPWD, NHAI, State PWD) or private consultancy.', duration: 'Ongoing' }
      ]
    ),
    role('civil-bim', 'BIM Engineer', 'Private / Construction Tech', '₹4–18 LPA',
      'Implement Building Information Modelling (BIM) for construction projects: 3D models, clash detection, quantity takeoff, and coordination.',
      [L('Revit Architecture / Structure / MEP','🟡','🔴'), L('AutoCAD 2D/3D','🟡','🔴'), L('BIM Standards (ISO 19650)','🟡','🔴'), L('Navisworks (Clash Detection)','🟡','🔴'), L('Quantity Takeoff','🟢','🟡'), L('MS Project / Primavera (4D BIM)','🟢','🟡')],
      ['Autodesk Revit','AutoCAD','Navisworks Manage','Tekla Structures','BIM 360 / Autodesk Construction Cloud','MS Project'],
      ['Building Planning & Drawing','Construction Technology','Structural Analysis','Surveying','Quantity Surveying'],
      ['Autodesk Student Access (Free — Revit, AutoCAD)','NPTEL BIM Certificate','BIM Institute Free Resources','Revit Basics on YouTube (Autodesk Official)'],
      [{ level:'Beginner', title:'3D House Model in Revit', stack:'Autodesk Revit' }, { level:'Intermediate', title:'G+3 Commercial Building BIM Model (All Disciplines)', stack:'Revit + Navisworks' }, { level:'Advanced', title:'4D Construction Simulation with BIM', stack:'Revit + Navisworks + MS Project' }],
      'Apply at BIM consultancies, multinational construction companies, Larsen & Toubro, Shapoorji Pallonji, Arup, WSP.',
      ['What is Level of Development (LOD) in BIM?','What is clash detection? How do you resolve clashes?','Explain IFC file format.','What is COBie?','What is the difference between 3D, 4D, and 5D BIM?'],
      [
        { step: 1, title: 'AutoCAD 2D', desc: 'Draw accurate 2D plans, sections, and elevations. Plotting, annotations, layers, blocks.', duration: '1 month' },
        { step: 2, title: 'Revit 3D Modelling', desc: 'Build 3D building models: walls, floors, roofs, doors, windows, stairs, columns. All disciplines.', duration: '3 months' },
        { step: 3, title: 'BIM Coordination', desc: 'Clash detection in Navisworks. Resolve MEP vs structure clashes. Issue tracking.', duration: '2 months' },
        { step: 4, title: 'BIM Standards & LOD', desc: 'Study ISO 19650, EIR, BEP, CDE (Common Data Environment), LOD 100–500.', duration: '1 month' },
        { step: 5, title: 'Quantity Takeoff & 4D', desc: 'Extract quantities from Revit. Link to project schedule for 4D simulation.', duration: '1 month' },
        { step: 6, title: 'Certification & Jobs', desc: 'Get Autodesk Revit Certified Professional. Apply for BIM coordinator/manager roles.', duration: 'Ongoing' }
      ]
    ),
    role('civil-site', 'Site Engineer / Construction Manager', 'Private / Government / Contractor', '₹3–12 LPA',
      'Oversee construction activities on site: quality, safety, labour, materials, and schedule management.',
      [L('Construction Technology','🟢','🟡'), L('IS Codes (456, 383, 269)','🟢','🟡'), L('Bar Bending Schedule (BBS)','🟢','🟡'), L('AutoCAD (Plan reading)','🟢','🟡'), L('Site Safety (IS 7969)','🟢','🟡'), L('Project Scheduling (Primavera/MS Project)','🟢','🟡'), L('Quality Control','🟡','🔴')],
      ['AutoCAD (for reading drawings)','MS Project','Primavera P6 (basics)','Total Station / theodolite','STAAD.Pro (reference)','Excel BBS'],
      ['Construction Technology','Building Materials','Quantity Surveying','Surveying','Project Management','Concrete Technology'],
      ['NPTEL Construction Project Management Certificate','OSHA Construction Safety (Free)','PMI PMBOK Guide (Free Sample Chapters)'],
      [{ level:'Beginner', title:'Bar Bending Schedule for a Ground Floor Slab', stack:'Excel BBS Template' }, { level:'Intermediate', title:'Site Progress Report & Schedule for a G+5 Building', stack:'MS Project + Excel' }, { level:'Advanced', title:'QA/QC Plan for a Residential Complex', stack:'IS Code + ISO 9001 Framework' }],
      'Apply as site engineer trainee at construction companies, infrastructure projects (roads, bridges, metro).',
      ['What concrete tests are done on site? (Slump, cube test)','What is BBS?','Explain IS 456 requirements for RCC bar cover.','What is critical path in project scheduling?','How do you manage labour on a construction site?'],
      [
        { step: 1, title: 'Construction Materials', desc: 'Concrete (grades, mix design, IS codes), steel reinforcement, bricks, timber, bitumen.', duration: '1 month' },
        { step: 2, title: 'Construction Technology', desc: 'Foundation types, masonry, formwork, concrete pouring, curing, shuttering.', duration: '2 months' },
        { step: 3, title: 'Surveying & Setting Out', desc: 'Total station, theodolite, levelling. Setting out columns, grids, reference benchmarks.', duration: '1 month' },
        { step: 4, title: 'Quality & Safety', desc: 'Cube tests, NDT methods, IS quality specifications. Site safety (PPE, toolbox talks).', duration: '1 month' },
        { step: 5, title: 'Project Management', desc: 'WBS, CPM, Gantt chart, earned value management. MS Project or Primavera basics.', duration: '2 months' },
        { step: 6, title: 'Internship & Site Exposure', desc: 'Do a 3–6 month site internship at a construction company. Keep a daily site diary.', duration: 'Ongoing' }
      ]
    ),
    role('civil-govt', 'Government / PSU Civil Engineer', 'Government / PSU', '₹5–14 LPA',
      'Work in government departments (PWD, NHAI, CPWD) or PSUs managing public infrastructure projects.',
      [L('All Core CIVIL Subjects (GATE)','🟡','🔴'), L('IS Codes','🟡','🔴'), L('Aptitude & GK','🟡','🔴')],
      ['AutoCAD','STAAD.Pro','MATLAB (basics)'],
      ['Structural Analysis, RCC Design, Steel Structures, Geotechnical, Fluid Mechanics, Highway Engineering, Surveying, Environmental Engineering'],
      ['NPTEL All Civil Courses (Free)','GATE CIVIL Preparation Resources','Made Easy / Ace Academy CIVIL Material'],
      [{ level:'Beginner', title:'GATE Civil Topic Notes (All Subjects)', stack:'Self-Study' }, { level:'Intermediate', title:'500+ GATE Civil Previous Year Problems', stack:'Practice Platform' }, { level:'Advanced', title:'Full Mock GATE Civil + PSU Interview Prep', stack:'Online Platform + Group Discussion Practice' }],
      'Focus on GATE preparation. Apply to CPWD, NHAI, DMRC, State PWD, WAPCOS, RITES, IRCON, BRO via GATE/direct recruitment.',
      ['GATE: Structural Analysis, RCC/Steel Design, Geotechnical, Hydrology, Transportation, Environmental Engg.','Aptitude: Quantitative, Logical Reasoning.','GK: Infrastructure projects in India, Smart Cities mission.'],
      [
        { step: 1, title: 'Systematic GATE Civil Prep', desc: 'All 8 Civil Engineering subjects. Standard textbooks recommended by GATE syllabus.', duration: '6–12 months' },
        { step: 2, title: 'Mock Tests & Previous Papers', desc: 'Solve 10 years of GATE Civil papers. Join online test series.', duration: '3 months' },
        { step: 3, title: 'Application & Interview', desc: 'Apply to central/state government vacancies. Prepare for technical GD/interview.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // AERO — Aeronautical Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.AERO = [
    role('aero-aero', 'Aerodynamics Engineer', 'Defence / PSU / Private', '₹4–18 LPA',
      'Analyze and optimize aerodynamic performance of aircraft, rockets, and vehicles using CFD and wind tunnel tests.',
      [L('Fluid Mechanics','🟡','🔴'), L('Aerodynamics (Subsonic/Supersonic)','🟡','🔴'), L('CFD (Computational Fluid Dynamics)','🟡','🔴'), L('MATLAB/Python','🟢','🟡'), L('Wind Tunnel Testing','🟡','🔴')],
      ['ANSYS Fluent / OpenFOAM','MATLAB / Simulink','CATIA V5 (aero models)','Python (SciPy, NumPy)','Pointwise (meshing)','AVL (Athena Vortex Lattice)'],
      ['Aerodynamics','Fluid Mechanics','Aircraft Structures','Propulsion Systems','Flight Mechanics'],
      ['NASA OpenFOAM Tutorials (Free)','NPTEL Aerodynamics Certificate','MIT OCW Aeronautics (Free)','Coursera Aircraft Design (Audit)'],
      [{ level:'Beginner', title:'Airfoil Pressure Distribution (XFOIL)', stack:'XFOIL (free)' }, { level:'Intermediate', title:'CFD Analysis of NACA Airfoil in OpenFOAM', stack:'OpenFOAM + Paraview' }, { level:'Advanced', title:'Full Aircraft CFD Simulation (Cruise Conditions)', stack:'ANSYS Fluent + Python post-processing' }],
      'Apply at DRDO, HAL, NAL, ISRO, IAF, Airbus, Boeing India, Mahindra Defence.',
      ['What is boundary layer? Explain transition from laminar to turbulent.','What is angle of attack? How does stall occur?','Explain subsonic vs supersonic flow characteristics.','What is CFD and how does it work?','Explain lift and drag on an airfoil.'],
      [
        { step: 1, title: 'Fluid Mechanics Foundation', desc: 'Continuity, Bernoulli, Navier-Stokes, boundary layer theory, viscous flows.', duration: '2 months' },
        { step: 2, title: 'Aerodynamics', desc: 'Airfoil theory, wing planforms, lift/drag, compressible flow, shock waves, transonic effects.', duration: '3 months' },
        { step: 3, title: 'CFD Tools', desc: 'OpenFOAM (free) basics. Meshing (Gmsh, Pointwise), solver setup, post-processing in Paraview.', duration: '3 months' },
        { step: 4, title: 'Programming for Aero', desc: 'MATLAB/Python for data analysis, optimization, aerodynamic coefficient calculation.', duration: '1 month' },
        { step: 5, title: 'Projects & Research', desc: 'Complete 3 CFD projects. Read research papers on aerodynamic optimization. Apply for DRDO/NAL internships.', duration: 'Ongoing' }
      ]
    ),
    role('aero-struct', 'Aircraft Structures Engineer', 'Defence / PSU / MRO', '₹4–16 LPA',
      'Design and analyze aircraft structural components for strength, fatigue, damage tolerance, and weight optimization.',
      [L('Structural Analysis','🟡','🔴'), L('Composites (CFRP/GFRP)','🟡','🔴'), L('FEA (Finite Element Analysis)','🟡','🔴'), L('Fatigue & Damage Tolerance','🟡','🔴'), L('CATIA V5','🟡','🔴'), L('Metallic Structures (Aluminium)','🟢','🟡')],
      ['CATIA V5 / SolidWorks','ANSYS Mechanical','MSC Nastran / Patran','MATLAB','Python (SciPy)'],
      ['Aircraft Structures','Strength of Materials','Composite Materials','Manufacturing Technology','Structural Analysis'],
      ['NPTEL Composite Materials Certificate','MIT OCW Aerospace Structures (Free)','Coursera Composite Materials (Audit)'],
      [{ level:'Beginner', title:'Wing Spar FEA Analysis', stack:'ANSYS Mechanical' }, { level:'Intermediate', title:'Composite Laminate Design & Analysis', stack:'ANSYS ACP + FEA' }, { level:'Advanced', title:'Fatigue Life Prediction of Aircraft Frame', stack:'MSC Nastran + MATLAB' }],
      'Apply at HAL, DRDO (ARDC), Airbus India Engineering Centre, Boeing India, MRO companies.',
      ['What is monocoque vs semi-monocoque structure?','Explain fatigue life and S-N curve.','What are the advantages of composites in aircraft?','What is damage tolerance design?','Explain pressure vessel design for fuselage.'],
      [
        { step: 1, title: 'Structural Mechanics', desc: 'Stress/strain, bending, torsion, thin-walled structures, fatigue basics.', duration: '2 months' },
        { step: 2, title: 'Aircraft Structure Types', desc: 'Fuselage, wing, empennage, landing gear design. Material selection (Al, Ti, composites).', duration: '2 months' },
        { step: 3, title: 'FEA with ANSYS', desc: 'Structural, modal, thermal analysis. Apply to aircraft components.', duration: '2 months' },
        { step: 4, title: 'Composites', desc: 'CFRP, GFRP laminate design, CLT theory, failure criteria (Tsai-Wu). Use ANSYS ACP.', duration: '2 months' },
        { step: 5, title: 'Projects & Internship', desc: 'Build aircraft structural analysis portfolio. Apply at HAL/DRDO trainee positions.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // AUTO — Automobile Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.AUTO = DB.MECH.filter(r => ['mech-auto','mech-design','mech-mfg'].includes(r.id));

  // ─────────────────────────────────────────────────────────────────────────────
  // MTRX — Mechatronics Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.MTRX = [
    role('mtrx-robo', 'Robotics Engineer', 'Private / Research / Defence', '₹4–20 LPA',
      'Design and build robotic systems integrating mechanical, electrical, and software components.',
      [L('ROS / ROS2','🟡','🔴'), L('C++ / Python','🟢','🟡'), L('Control Systems (PID, MPC)','🟡','🔴'), L('Kinematics & Dynamics','🟡','🔴'), L('Computer Vision (OpenCV)','🟡','🔴'), L('Embedded Systems (Arduino/RPI)','🟢','🟡')],
      ['ROS2','Arduino / Raspberry Pi','OpenCV','Gazebo (Robot Simulator)','MATLAB/Simulink','SolidWorks (Mechanical)','MoveIt (Motion Planning)'],
      ['Robotics','Mechatronics','Control Systems','Embedded Systems','Machine Learning','Kinematics'],
      ['ROS2 Official Tutorials (Free)','Gazebo Tutorials (Free)','NPTEL Robotics Certificate','OpenCV Python Tutorial (Free)'],
      [{ level:'Beginner', title:'Line Following Robot (Arduino)', stack:'Arduino + IR Sensors' }, { level:'Intermediate', title:'ROS2 Mobile Robot Navigation (Simulation)', stack:'ROS2 + Gazebo' }, { level:'Advanced', title:'6-DOF Robotic Arm with Computer Vision', stack:'ROS2 + OpenCV + MoveIt + RPI' }],
      'Apply at robotics startups, defence research labs (DRDO), automotive automation (Bosch, Fanuc India).',
      ['Explain forward and inverse kinematics.','What is a PID controller?','How does ROS2 middleware work?','What is SLAM in robotics?','Explain path planning algorithms (A*, RRT).'],
      [
        { step: 1, title: 'Programming (C++ & Python)', desc: 'Master C++ (OOP, STL, pointers) and Python. Write 30+ programs.', duration: '2 months' },
        { step: 2, title: 'Electronics & Embedded', desc: 'Arduino, Raspberry Pi, sensors (IMU, LIDAR, Camera), actuators (servo, stepper).', duration: '2 months' },
        { step: 3, title: 'Control Systems', desc: 'PID control, state-space, LQR. Implement on real hardware and simulation.', duration: '2 months' },
        { step: 4, title: 'ROS2', desc: 'Learn ROS2 concepts: nodes, topics, services, actions. Build a mobile robot in Gazebo.', duration: '3 months' },
        { step: 5, title: 'Computer Vision', desc: 'OpenCV basics: image processing, object detection, camera calibration.', duration: '2 months' },
        { step: 6, title: 'Projects & Research', desc: 'Build 3 complete robot projects. Submit to robotics competitions (e-Yantra, IIT Robotics).', duration: 'Ongoing' }
      ]
    ),
    role('mtrx-plc', 'Automation & PLC Engineer', 'Manufacturing / Private', '₹3–14 LPA',
      'Program and maintain PLCs, SCADA systems, and industrial automation equipment.',
      [L('PLC Programming','🟡','🔴'), L('SCADA / HMI','🟡','🔴'), L('Pneumatics & Hydraulics','🟢','🟡'), L('Motion Control','🟡','🔴'), L('Industrial Networking','🟢','🟡'), L('Electrical Panel Reading','🟢','🟡')],
      ['Siemens TIA Portal','Allen Bradley RSLogix','Schneider Unity Pro','WinCC / iFIX','AutoCAD Electrical','EPLAN'],
      ['Control Systems','Industrial Automation','Fluid Power','Electrical Machines','Instrumentation'],
      ['Siemens TIA Portal Tutorials (YouTube/Free)','NPTEL Industrial Automation Certificate','ISA Automation Basics (Free)'],
      [{ level:'Beginner', title:'Traffic Light Sequence in Ladder Logic', stack:'Siemens TIA Portal' }, { level:'Intermediate', title:'Pick & Place Machine with Pneumatics', stack:'TIA Portal + Servo Drive' }, { level:'Advanced', title:'Fully Automated Packaging Line with SCADA', stack:'TIA Portal + WinCC + OPC-UA' }],
      'Apply at machine builders, automobile plants, cement/steel manufacturing companies.',
      ['What is a PLC scan cycle?','Explain Ladder Logic vs Function Block.','How does a VFD work?','What is fieldbus?','Describe a typical industrial automation project.'],
      [
        { step: 1, title: 'Electrical Basics', desc: 'Three-phase power, motors, drives, control circuits, P&ID reading.', duration: '1 month' },
        { step: 2, title: 'PLC Programming', desc: 'Ladder Logic, Function Block, Structured Text. Siemens TIA Portal or Allen Bradley.', duration: '2 months' },
        { step: 3, title: 'SCADA/HMI', desc: 'Design operator screens, alarms, trends. Connect to PLC.', duration: '2 months' },
        { step: 4, title: 'Motion Control', desc: 'Servo drives, stepper motors, motion profiles, cam profiles.', duration: '2 months' },
        { step: 5, title: 'Industrial Networks', desc: 'Modbus, Profibus, Profinet, OPC-UA, EtherNet/IP.', duration: '1 month' },
        { step: 6, title: 'Internship & Certification', desc: 'Apply at automation system integrators. Get Siemens or Rockwell certification.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // ROBO — Robotics & Automation
  // ─────────────────────────────────────────────────────────────────────────────
  DB.ROBO = DB.MTRX;
  DB.RAI = DB.MTRX;

  // ─────────────────────────────────────────────────────────────────────────────
  // BME — Biomedical Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.BME = [
    role('bme-inst', 'Biomedical Instrumentation Engineer', 'Healthcare / Medical Devices / Private', '₹3–14 LPA',
      'Design, install, and maintain medical instruments including ECG, MRI, ventilators, and diagnostic equipment.',
      [L('Biomedical Signals (ECG, EEG, EMG)','🟡','🔴'), L('Analog & Digital Electronics','🟢','🟡'), L('Embedded Systems','🟢','🟡'), L('Medical Image Processing','🟡','🔴'), L('MATLAB / LabVIEW','🟢','🟡'), L('Medical Device Regulations (FDA/ISO 13485)','🟢','🟡')],
      ['MATLAB (Signal Processing Toolbox)','LabVIEW','Arduino / Raspberry Pi','Altium Designer (PCB)','ANSYS (Thermal)','Python (BioPython)'],
      ['Biomedical Instrumentation','Medical Electronics','Signals & Systems','Digital Signal Processing','Human Physiology & Anatomy'],
      ['PhysioNet (Free Biomedical Data)','NPTEL Biomedical Engineering Certificate','MIT OCW Biomedical Engineering (Free)','LabVIEW Student Edition (Free)'],
      [{ level:'Beginner', title:'ECG Signal Processing (MATLAB)', stack:'MATLAB Signal Processing Toolbox' }, { level:'Intermediate', title:'Patient Monitoring System (Arduino + Sensors)', stack:'Arduino + ECG/SpO2 sensors' }, { level:'Advanced', title:'Wearable Health Monitor with BLE', stack:'Nordic nRF52 + Python + Dash' }],
      'Apply at medical device companies (Philips Healthcare, Siemens Healthineers, GE Healthcare), hospitals biomedical department.',
      ['What is an ECG? Explain its waveform.','Difference between MRI and CT scan.','What is the purpose of a pacemaker?','Explain the principle of ultrasound imaging.','What medical device standards do you know? (ISO 13485, IEC 60601)'],
      [
        { step: 1, title: 'Electronics & Biomedical Signals', desc: 'Op-amps, instrumentation amplifiers, filters, ADC/DAC, ECG/EEG/EMG signal characteristics.', duration: '2 months' },
        { step: 2, title: 'Medical Imaging Basics', desc: 'X-ray, Ultrasound, CT, MRI, PET fundamentals. Image reconstruction basics.', duration: '2 months' },
        { step: 3, title: 'Signal Processing', desc: 'Digital filtering, FFT, noise removal, feature extraction for biomedical signals in MATLAB.', duration: '2 months' },
        { step: 4, title: 'Embedded Systems for Medical', desc: 'Arduino/RPI sensor integration. Bluetooth/WiFi data transmission. Low-power design.', duration: '2 months' },
        { step: 5, title: 'Regulatory Compliance', desc: 'ISO 13485, IEC 60601, FDA 21 CFR Part 820 basics. Risk management (ISO 14971).', duration: '1 month' },
        { step: 6, title: 'Jobs & Internship', desc: 'Apply at Philips, Siemens, GE Healthcare, hospital biomedical departments.', duration: 'Ongoing' }
      ]
    )
  ];
  DB.MEDEL = DB.BME;

  // ─────────────────────────────────────────────────────────────────────────────
  // CHEM — Chemical Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.CHEM = [
    role('chem-process', 'Process Engineer', 'Private / PSU / Chemical Industry', '₹3–14 LPA',
      'Design, optimize, and troubleshoot chemical processes in refineries, petrochemical plants, and manufacturing facilities.',
      [L('Chemical Thermodynamics','🟡','🔴'), L('Mass & Energy Balance','🟢','🟡'), L('Heat Transfer','🟡','🔴'), L('Mass Transfer (Distillation, Absorption)','🟡','🔴'), L('Process Simulation (Aspen)','🟡','🔴'), L('P&ID Reading','🟢','🟡'), L('Safety (HAZOP)','🟢','🟡')],
      ['Aspen Plus / Aspen HYSYS','MATLAB','AutoCAD (P&IDs)','Python (process data analysis)','DWSIM (free open-source simulator)'],
      ['Chemical Thermodynamics','Mass Transfer','Heat Transfer','Chemical Reaction Engineering','Process Control','Transport Phenomena'],
      ['DWSIM Free Open-Source Simulator','NPTEL Chemical Engineering Certificate','LearnChemE (Free — Univ. of Colorado)','Coursera Process Mining (Audit)'],
      [{ level:'Beginner', title:'Mass & Energy Balance for Distillation Column (DWSIM)', stack:'DWSIM (Free)' }, { level:'Intermediate', title:'Process Simulation of Ethanol Plant', stack:'Aspen Plus / DWSIM' }, { level:'Advanced', title:'HAZOP Study for a Chemical Process Unit', stack:'HAZOP Template + PHA WORKS' }],
      'Apply at ONGC, IOCL, Reliance Industries, BASF, Coromandel International, Fertilizer plants, Cement plants.',
      ['Explain Raoult\'s Law.','What is HAZOP?','How does a distillation column work?','What is the McCabe-Thiele method?','Explain heat exchanger fouling.'],
      [
        { step: 1, title: 'Core Chemical Engineering', desc: 'Thermodynamics, mass/energy balances, reaction kinetics, transport phenomena.', duration: '3 months' },
        { step: 2, title: 'Unit Operations', desc: 'Distillation, absorption, extraction, evaporation, crystallization, drying, filtration.', duration: '2 months' },
        { step: 3, title: 'Process Simulation', desc: 'DWSIM (free) → Aspen Plus. Simulate distillation, heat exchange, reaction systems.', duration: '2 months' },
        { step: 4, title: 'Process Control & Safety', desc: 'PID control loops, P&ID reading, HAZOP, risk assessment, PSM.', duration: '2 months' },
        { step: 5, title: 'GATE & PSU Preparation', desc: 'Prepare GATE Chemical Engineering. Apply to ONGC, IOCL, BPCL, HPCL via GATE.', duration: '6 months' },
        { step: 6, title: 'Internship & Jobs', desc: 'Apply for plant operations, process engineering internships.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // BIOTECH — Biotechnology
  // ─────────────────────────────────────────────────────────────────────────────
  DB.BIOTECH = [
    role('biotech-rd', 'Biotech Research & Development Scientist', 'Private / Research / Government', '₹3–14 LPA',
      'Conduct research in biotechnology fields including pharmaceutical, agricultural, food, and industrial biotechnology.',
      [L('Molecular Biology Techniques','🟡','🔴'), L('Cell Culture','🟡','🔴'), L('PCR / qPCR','🟢','🟡'), L('Bioinformatics (basics)','🟢','🟡'), L('HPLC / Chromatography','🟢','🟡'), L('Fermentation Technology','🟡','🔴')],
      ['NCBI BLAST / GenBank','Bioinformatics: MEGA, Clustal Omega','R / Python (bioinformatics)','MATLAB (basics)','Lab Instruments: PCR, HPLC, Spectrophotometer','FlowCytometer (advanced)'],
      ['Molecular Biology','Genetic Engineering','Biochemistry','Microbiology','Immunology','Fermentation Technology'],
      ['Rosalind Bioinformatics (Free)','NCBI Resources (Free)','NPTEL Biotechnology Certificate','Coursera Genomic Data Science (Audit)'],
      [{ level:'Beginner', title:'BLAST Analysis of a Gene Sequence', stack:'NCBI BLAST (free online)' }, { level:'Intermediate', title:'Phylogenetic Tree Construction', stack:'MEGA Software + Clustal Omega' }, { level:'Advanced', title:'Bioinformatics Pipeline for RNA-seq Analysis', stack:'Python + Biopython + DESeq2 + R' }],
      'Apply at pharma R&D labs, ICMR/DBT-funded research centers, biotech startups, CSIR institutes.',
      ['What is PCR and how does it work?','Explain ELISA assay.','What is a recombinant DNA?','What is CRISPR-Cas9?','What is fermentation technology?'],
      [
        { step: 1, title: 'Molecular Biology Foundation', desc: 'DNA/RNA structure, replication, transcription, translation, gene expression.', duration: '2 months' },
        { step: 2, title: 'Lab Techniques', desc: 'PCR, gel electrophoresis, cloning, cell culture, chromatography, spectrophotometry.', duration: '2 months' },
        { step: 3, title: 'Bioinformatics', desc: 'NCBI databases, BLAST, sequence alignment, phylogenetics. Python (Biopython).', duration: '2 months' },
        { step: 4, title: 'Specialized Area', desc: 'Choose: Medical Biotech / Agricultural Biotech / Industrial Fermentation / Bioinformatics.', duration: '2 months' },
        { step: 5, title: 'Research Internship & M.Sc./M.Tech', desc: 'Apply for ICMR/DBT summer research internships. Consider M.Sc. or M.Tech for better prospects.', duration: 'Ongoing' }
      ]
    )
  ];
  DB.BBE = DB.BIOTECH;
  DB.IBT = DB.BIOTECH;

  // ─────────────────────────────────────────────────────────────────────────────
  // AGRI — Agricultural Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.AGRI = [
    role('agri-engineer', 'Agricultural Engineer', 'Government / PSU / Private', '₹3–12 LPA',
      'Apply engineering principles to farming: farm machinery, irrigation systems, post-harvest technology, and rural electrification.',
      [L('Farm Machinery Design','🟢','🟡'), L('Irrigation & Water Management','🟡','🔴'), L('Soil & Water Conservation','🟡','🔴'), L('Post-Harvest Technology','🟢','🟡'), L('CAD (AutoCAD)','🟢','🟡'), L('GIS / Remote Sensing','🟢','🟡')],
      ['AutoCAD','QGIS (free GIS tool)','MATLAB','HYDRUS (soil water flow)','Google Earth Engine','ArcGIS'],
      ['Farm Machinery','Irrigation Engineering','Soil Conservation','Agricultural Processing','Rural Electrification','Engineering Drawing'],
      ['QGIS Training (Free)','NPTEL Agricultural Engineering Certificate','FAO AgriTech Resources (Free)','Google Earth Engine (Free)'],
      [{ level:'Beginner', title:'Irrigation Canal Design (Manual Calculation + AutoCAD)', stack:'AutoCAD + Excel' }, { level:'Intermediate', title:'Watershed Analysis using QGIS', stack:'QGIS + SWAT' }, { level:'Advanced', title:'Precision Agriculture System (Drone + IoT + Data)', stack:'Drone + IoT sensors + Python + GIS' }],
      'Apply at State Agriculture Departments, ICAR institutes, NABARD, state irrigation departments, agri-tech startups.',
      ['What is drip irrigation?','Explain soil erosion and conservation measures.','What is watershed management?','How does a threshing machine work?','What is precision agriculture?'],
      [
        { step: 1, title: 'Core Agricultural Engineering', desc: 'Farm machinery, tractor mechanics, soil tillage, irrigation systems, drainage.', duration: '2 months' },
        { step: 2, title: 'Water Resources & Irrigation', desc: 'Canal design, drip/sprinkler systems, watershed hydrology, water balance.', duration: '2 months' },
        { step: 3, title: 'GIS & Remote Sensing', desc: 'QGIS for land use mapping, Google Earth Engine for crop monitoring.', duration: '2 months' },
        { step: 4, title: 'Post-Harvest Technology', desc: 'Grain storage, food processing, cold chain logistics, packaging.', duration: '1 month' },
        { step: 5, title: 'GATE & Government Jobs', desc: 'Prepare GATE AG. Apply to ARS (ICAR), State Agri Service, NABARD officers.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // FOOD — Food Technology
  // ─────────────────────────────────────────────────────────────────────────────
  DB.FOOD = [
    role('food-qc', 'Food Quality & Safety Engineer', 'Private / Government / FMCG', '₹3–10 LPA',
      'Ensure food safety, quality control, and regulatory compliance in food processing and manufacturing.',
      [L('Food Safety Standards (FSSAI/ISO 22000)','🟡','🔴'), L('HACCP & GMP','🟡','🔴'), L('Sensory Evaluation','🟢','🟡'), L('Analytical Chemistry','🟢','🟡'), L('Microbiology Testing','🟢','🟡'), L('Statistical Quality Control','🟢','🟡')],
      ['Minitab (SPC)','FSSAI Portal','ISO 22000 Framework','Lab Equipment (HPLC, GC)','MS Excel (data analysis)'],
      ['Food Chemistry','Food Microbiology','Food Processing Technology','Quality Management','Nutrition Science'],
      ['FSSAI FOSCOS (Free)','NPTEL Food Technology Certificate','ISO 22000 Free Training Resources','Codex Alimentarius (Free)'],
      [{ level:'Beginner', title:'HACCP Plan for Biscuit Manufacturing', stack:'HACCP Template + Excel' }, { level:'Intermediate', title:'Shelf Life Study for a Packaged Food Product', stack:'Lab testing + Statistical analysis' }, { level:'Advanced', title:'ISO 22000 Internal Audit Checklist Implementation', stack:'ISO 22000 + Audit tools' }],
      'Apply at Nestle, ITC Foods, Amul, FSSAI, state food testing labs, FMCG companies.',
      ['What is HACCP?','Explain the concept of critical control points (CCP).','What are the FSSAI regulations?','What microbiological tests are done for food safety?','What is shelf life testing?'],
      [
        { step: 1, title: 'Food Science Fundamentals', desc: 'Food chemistry, nutrition, food microbiology, food laws (FSSAI, CODEX).', duration: '2 months' },
        { step: 2, title: 'HACCP & Quality Systems', desc: 'HACCP principles, GMP, GHP, ISO 22000, FSSC 22000 implementation.', duration: '2 months' },
        { step: 3, title: 'Lab Techniques', desc: 'Microbiological testing, proximate analysis, HPLC/GC, sensory evaluation.', duration: '2 months' },
        { step: 4, title: 'Statistical QC', desc: 'Control charts, SPC, sampling plans, Minitab. Apply to food quality data.', duration: '1 month' },
        { step: 5, title: 'Internship & Certification', desc: 'Internship at food company QC lab. Get FSSAI/ISO 22000 Lead Auditor certification.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // ARCH — Architecture
  // ─────────────────────────────────────────────────────────────────────────────
  DB.ARCH = [
    role('arch-designer', 'Architect / Architectural Designer', 'Private / Government', '₹3–16 LPA',
      'Design buildings and spaces that are functional, aesthetic, structurally sound, and compliant with codes.',
      [L('Architectural Design','🟡','🔴'), L('AutoCAD 2D','🟡','🔴'), L('3D Modelling (Revit/SketchUp)','🟡','🔴'), L('Building Codes & Bylaws','🟡','🔴'), L('Structural Coordination','🟢','🟡'), L('Presentation & Rendering','🟡','🔴')],
      ['AutoCAD','Revit Architecture','SketchUp','Lumion / V-Ray (rendering)','Adobe Photoshop / Illustrator','Rhino (advanced)'],
      ['Architectural Design','Building Construction','History of Architecture','Structures for Architects','Environmental Studies','Urban Design'],
      ['SketchUp Free Web','Revit Student Access (Free)','MIT OCW Architecture (Free)','ArchDaily (Design Inspiration — Free)'],
      [{ level:'Beginner', title:'2D Floor Plan of a 2BHK Apartment (AutoCAD)', stack:'AutoCAD' }, { level:'Intermediate', title:'3D Model + Rendered Presentation of Residential Villa', stack:'Revit + Lumion' }, { level:'Advanced', title:'Urban Design Master Plan for a Mixed-Use Development', stack:'AutoCAD + SketchUp + Photoshop' }],
      'Apply at architectural firms, urban design consultancies, CPWD, public works departments, real estate companies.',
      ['Walk us through your portfolio.','What building codes do you know?','How do you approach a new design brief?','Explain passive cooling in building design.','What software are you proficient in?'],
      [
        { step: 1, title: 'Design Fundamentals', desc: 'Space planning, massing, proportion, light, form, function. Study great architects and buildings.', duration: '2 months' },
        { step: 2, title: 'AutoCAD & Technical Drawing', desc: 'Draw accurate 2D plans, sections, elevations, details. BIS/NBC drawing standards.', duration: '2 months' },
        { step: 3, title: '3D Modelling & Rendering', desc: 'SketchUp + Lumion or Revit + V-Ray. Create photorealistic renders for portfolio.', duration: '3 months' },
        { step: 4, title: 'Building Codes & Structure', desc: 'NBC 2016, bye-laws, fire safety, accessibility. RCC fundamentals for coordination.', duration: '1 month' },
        { step: 5, title: 'Portfolio & Internship', desc: 'Create a professional design portfolio (PDF + Issuu/Behance). Apply for architectural internships.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // BDES — B.Des (Industrial / Fashion / Communication Design)
  // ─────────────────────────────────────────────────────────────────────────────
  DB.BDES = [
    role('bdes-ui', 'UI/UX Designer', 'Private / Startup', '₹4–18 LPA',
      'Design digital user interfaces and experiences for web, mobile, and software products.',
      [L('UX Research','🟡','🔴'), L('UI Design (Figma)','🟢','🔴'), L('Interaction Design','🟡','🔴'), L('Prototyping','🟢','🟡'), L('HTML/CSS (basics)','🟢','🟡'), L('Design Systems','🟡','🔴')],
      ['Figma','Adobe XD','Sketch','Adobe Photoshop / Illustrator','Principle (prototyping)','Maze (User Testing)','Miro (UX research)'],
      ['Design Fundamentals','Typography','Colour Theory','Human-Computer Interaction','Visual Communication','User Research Methods'],
      ['Google UX Design (Coursera Audit — Free)','Figma YouTube Course (Free)','Nielsen Norman Group Articles (Free)','Interaction Design Foundation (Free Tier)'],
      [{ level:'Beginner', title:'Redesign of an Existing App (Case Study)', stack:'Figma' }, { level:'Intermediate', title:'Full Mobile App Design System', stack:'Figma + Component Library' }, { level:'Advanced', title:'End-to-End UX Research + Design Sprint + Prototype', stack:'Miro + Figma + Maze user testing' }],
      'Apply at product companies (Swiggy, Myntra, Zomato), design agencies, software startups.',
      ['What is the difference between UX and UI?','How do you conduct user research?','What is a design system?','Explain accessibility in UI design.','Walk me through your portfolio.'],
      [
        { step: 1, title: 'Design Fundamentals', desc: 'Colour theory, typography, grid systems, visual hierarchy, Gestalt principles.', duration: '1 month' },
        { step: 2, title: 'Figma Mastery', desc: 'Components, auto-layout, variants, prototyping, developer handoff. Build 5 UI projects.', duration: '2 months' },
        { step: 3, title: 'UX Research', desc: 'User interviews, usability testing, affinity mapping, personas, user journey maps.', duration: '2 months' },
        { step: 4, title: 'Design System', desc: 'Create a full component design system with tokens, components, patterns, documentation.', duration: '2 months' },
        { step: 5, title: 'Portfolio & Jobs', desc: 'Create 3–5 end-to-end case studies. Publish on Behance/Dribbble. Apply for junior UI/UX roles.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // ENVENG / ENV_ST / CIVIL_ENV — Environmental Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.ENVENG = [
    role('env-eng', 'Environmental Engineer', 'Government / PSU / Consulting', '₹3–12 LPA',
      'Design and implement systems for water treatment, wastewater management, air quality, solid waste, and environmental impact assessment.',
      [L('Water & Wastewater Treatment Design','🟡','🔴'), L('Air Quality Monitoring','🟢','🟡'), L('Environmental Impact Assessment (EIA)','🟡','🔴'), L('GIS & Remote Sensing','🟢','🟡'), L('AutoCAD','🟢','🟡'), L('Environmental Legislation (EP Act/Water Act)','🟢','🟡')],
      ['AutoCAD','QGIS (free GIS)','EPA Storm Water Software','MATLAB','Python (environmental data)','EPANET (water network)'],
      ['Environmental Engineering','Water Supply Engineering','Wastewater Engineering','Air Pollution Control','Solid Waste Management','Environmental Laws'],
      ['NPTEL Environmental Engineering Certificate','QGIS Training (Free)','EPA Free Software (EPANET, SWMM)','Coursera Environmental Science (Audit)'],
      [{ level:'Beginner', title:'Water Quality Analysis Report for a River Sample', stack:'Lab Testing + Excel' }, { level:'Intermediate', title:'Water Supply Network Design (EPANET)', stack:'EPANET (Free EPA Software)' }, { level:'Advanced', title:'Environmental Impact Assessment (EIA) Report', stack:'GIS + Laboratory + EIA Guidelines' }],
      'Apply at TNPCB, CPCB, municipal corporations, environmental consulting firms, NEERI, CSIR institutes.',
      ['Explain primary, secondary, and tertiary treatment.','What is BOD and COD?','What is EIA?','Explain the types of air pollutants.','What are the provisions of the Environment Protection Act?'],
      [
        { step: 1, title: 'Environmental Science & Engineering', desc: 'Ecology, water/air/soil pollution, environmental standards, IS codes for water quality.', duration: '2 months' },
        { step: 2, title: 'Water & Wastewater Treatment', desc: 'Design of treatment units: coagulation, sedimentation, filtration, disinfection, biological treatment.', duration: '2 months' },
        { step: 3, title: 'Air Pollution & Solid Waste', desc: 'Air pollution control devices, solid waste management, composting, landfill design.', duration: '1 month' },
        { step: 4, title: 'EIA & Environmental Laws', desc: 'EIA process, baseline study, impact prediction, mitigation measures. EP Act, Water Act, Air Act.', duration: '2 months' },
        { step: 5, title: 'GIS & Software', desc: 'QGIS for spatial analysis. EPANET for water network. EPA SWMM for stormwater.', duration: '1 month' },
        { step: 6, title: 'GATE & Jobs', desc: 'Prepare GATE Environmental. Apply for TNPCB, CPCB, Municipal Engineer roles.', duration: 'Ongoing' }
      ]
    )
  ];
  DB.ENV_ST = DB.ENVENG;
  DB.CIVIL_ENV = DB.ENVENG;
  DB.BECEE = DB.ENVENG;

  // ─────────────────────────────────────────────────────────────────────────────
  // GEO — Geoinformatics Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.GEO = [
    role('geo-gis', 'GIS / Remote Sensing Specialist', 'Government / Private / Research', '₹3–12 LPA',
      'Collect, analyze, and visualize geospatial data for urban planning, disaster management, agriculture, and infrastructure.',
      [L('GIS Analysis (QGIS/ArcGIS)','🟡','🔴'), L('Remote Sensing Interpretation','🟡','🔴'), L('GPS & Total Station Surveying','🟢','🟡'), L('Python (Geospatial)','🟢','🟡'), L('Google Earth Engine','🟡','🔴'), L('Web Mapping (Leaflet.js)','🟢','🟡')],
      ['QGIS (Free)','ArcGIS','Google Earth Engine (Free)','Python (GeoPandas, Rasterio)','Leaflet.js','R (spatial analysis)','ERDAS IMAGINE','OpenStreetMap'],
      ['GIS & Remote Sensing','Photogrammetry','Surveying','Cartography','Digital Image Processing','Geospatial Databases'],
      ['QGIS Training (Free)','Google Earth Engine Training (Free)','Esri Training (Free basic tier)','NPTEL GIS Certificate'],
      [{ level:'Beginner', title:'Land Use / Land Cover Map using QGIS', stack:'QGIS + Sentinel-2 imagery' }, { level:'Intermediate', title:'Crop Monitoring using Google Earth Engine', stack:'GEE JavaScript API' }, { level:'Advanced', title:'Urban Heat Island Analysis with Python', stack:'Python + GeoPandas + Rasterio + Landsat' }],
      'Apply at ISRO, Survey of India, National Remote Sensing Centre, Smart City projects, urban planning departments.',
      ['What is the difference between raster and vector data?','Explain GPS working principle.','What is NDVI?','What is spatial resolution?','How do you perform change detection using satellite imagery?'],
      [
        { step: 1, title: 'Surveying & Geodesy', desc: 'Total station, GPS/GNSS, levelling, photogrammetry, coordinate systems (WGS84, UTM).', duration: '2 months' },
        { step: 2, title: 'GIS Analysis (QGIS)', desc: 'Vector operations, raster analysis, spatial joins, geoprocessing, map layouts.', duration: '2 months' },
        { step: 3, title: 'Remote Sensing', desc: 'Satellite image interpretation, classification (supervised/unsupervised), change detection.', duration: '2 months' },
        { step: 4, title: 'Programming for Geospatial', desc: 'Python (GeoPandas, Rasterio, Shapely) and/or R for spatial analysis.', duration: '2 months' },
        { step: 5, title: 'Google Earth Engine', desc: 'JavaScript/Python API for cloud-based satellite image processing.', duration: '1 month' },
        { step: 6, title: 'Jobs & Research', desc: 'Apply at ISRO, NRSC, Survey of India, smart city corporations, urban planning agencies.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // MAR — Marine Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.MAR = [
    role('mar-eng', 'Marine Engineer', 'Shipping / Maritime / Private', '₹4–18 LPA',
      'Operate, maintain, and repair ship propulsion systems, auxiliary machinery, and onboard engineering systems.',
      [L('Marine Propulsion (Diesel Engines)','🟡','🔴'), L('Thermodynamics (Marine)','🟢','🟡'), L('Electrical Systems (Marine)','🟢','🟡'), L('Refrigeration & Air Conditioning','🟢','🟡'), L('Maritime Safety & STCW','🟡','🔴'), L('Ship Stability','🟡','🔴')],
      ['MATLAB (simulation)','AutoCAD Marine','Ship monitoring systems (AMOS)','STCW Training Simulators','Excel (maintenance schedules)'],
      ['Marine Propulsion Systems','Ship Construction & Stability','Marine Electrical Technology','Marine Refrigeration','Fluid Mechanics','Thermodynamics'],
      ['IMO Free Publications (some)','NPTEL Marine Engineering Certificate','DG Shipping India STCW Training','MarineInsight Articles (Free)'],
      [{ level:'Beginner', title:'Marine Diesel Engine 2-Stroke Maintenance Schedule', stack:'Excel Template' }, { level:'Intermediate', title:'Ship Stability Calculation (GM, GZ Curve)', stack:'MATLAB / Maxsurf (demo)' }, { level:'Advanced', title:'Ship Energy Efficiency & EEXI/CII Compliance Plan', stack:'IMO EEXI Regulations + Calculation' }],
      'Apply to Merchant Navy companies after passing MMD (Marine) exams. Also target shore jobs at shipyards (Cochin Shipyard, L&T Shipbuilding).',
      ['Explain two-stroke vs four-stroke marine diesel engine.','What is STCW?','Explain ship stability (GM, BM, KM).','What is MARPOL?','How does a marine refrigeration system differ from industrial?'],
      [
        { step: 1, title: 'Marine Engineering Fundamentals', desc: 'Thermodynamics, fluid mechanics, diesel engine theory, ship stability, marine electrical.', duration: '2 months' },
        { step: 2, title: 'Practical Training & STCW', desc: 'Complete STCW Basic Safety Training. Pre-sea training at approved institute (GME/ME course).', duration: '6 months' },
        { step: 3, title: 'Cadet Sea Service', desc: 'Join a shipping company as Engine Room Cadet. Complete sea service days per MMD requirements.', duration: '12–18 months' },
        { step: 4, title: 'MMD Exams', desc: 'Appear for MMD Class 4 → Class 2 → Class 1 Chief Engineer exams. Get Certificate of Competency.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // IEM — Industrial Engineering & Management
  // ─────────────────────────────────────────────────────────────────────────────
  DB.IEM = [
    role('iem-ops', 'Operations Research / Supply Chain Analyst', 'Private / Consulting', '₹4–16 LPA',
      'Optimize production, logistics, inventory, and supply chain using operations research techniques.',
      [L('Operations Research (LP, IP, Simulation)','🟡','🔴'), L('Supply Chain Management','🟡','🔴'), L('ERP Systems (SAP)','🟢','🟡'), L('Data Analysis (Python/Excel)','🟢','🟡'), L('Lean Manufacturing','🟡','🔴'), L('Statistics & Quality','🟢','🟡')],
      ['Python (PuLP, SciPy for optimization)','Microsoft Excel / Tableau','SAP MM/PP','Arena Simulation (student version)','Minitab','MATLAB'],
      ['Operations Research','Supply Chain Management','Industrial Engineering','Production Planning','Quality Engineering','Statistics'],
      ['NPTEL Industrial Engineering Certificate','MIT OCW Operations Research (Free)','Coursera Supply Chain (Audit)','SAP Learning Hub (Free Trial)'],
      [{ level:'Beginner', title:'Linear Programming Problem (Transportation Problem)', stack:'Python + PuLP / Excel Solver' }, { level:'Intermediate', title:'Inventory Optimization Model (EOQ + Safety Stock)', stack:'Python + Simulation' }, { level:'Advanced', title:'Supply Chain Network Design Optimization', stack:'Python PuLP + Gurobi (free academic license)' }],
      'Apply at logistics/supply chain companies (DHL, Maersk, Amazon), FMCG, manufacturing firms.',
      ['What is Linear Programming?','Explain the EOQ model.','What is the difference between push and pull in supply chain?','What is Six Sigma?','Explain a bullwhip effect.'],
      [
        { step: 1, title: 'Industrial Engineering Basics', desc: 'Time & motion study, work measurement, plant layout, ergonomics.', duration: '1 month' },
        { step: 2, title: 'Operations Research', desc: 'Linear programming, transportation, assignment, network models, integer programming.', duration: '2 months' },
        { step: 3, title: 'Supply Chain Management', desc: 'Procurement, inventory management, logistics, demand forecasting.', duration: '2 months' },
        { step: 4, title: 'Quality & Lean', desc: 'Six Sigma DMAIC, Lean tools, SPC, quality management systems (ISO 9001).', duration: '2 months' },
        { step: 5, title: 'Data Analysis & ERP', desc: 'Python/Excel for data analysis, SAP basics, Power BI dashboards.', duration: '2 months' },
        { step: 6, title: 'Internship & Certification', desc: 'Internship at supply chain or manufacturing company. Get Lean Six Sigma Green Belt.', duration: 'Ongoing' }
      ]
    )
  ];
  DB.IE = DB.IEM;
  DB.MFGE = DB.IEM;

  // ─────────────────────────────────────────────────────────────────────────────
  // EIE — Electronics & Instrumentation Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.EIE = [
    role('eie-inst', 'Instrumentation Engineer', 'PSU / Process Industry / Private', '₹3–14 LPA',
      'Design, calibrate, and maintain measurement instruments and control systems in process industries.',
      [L('Process Control (PID)','🟡','🔴'), L('Sensors & Transducers','🟢','🟡'), L('PLC / DCS Programming','🟡','🔴'), L('SCADA','🟡','🔴'), L('Calibration Techniques','🟢','🟡'), L('P&ID Reading','🟢','🟡')],
      ['MATLAB','LabVIEW','Siemens TIA Portal','Honeywell DCS (Experion)','AutoCAD (P&IDs)','Excel'],
      ['Process Control','Sensors & Transducers','Industrial Automation','Analytical Instrumentation','Electrical Circuits','Signal Processing'],
      ['LabVIEW NI Learn (Free)','NPTEL Process Control Certificate','ISA Free Training Resources','Control Guru (Free — PID Tuning)'],
      [{ level:'Beginner', title:'PID Temperature Control Simulation (MATLAB/Simulink)', stack:'MATLAB Simulink' }, { level:'Intermediate', title:'Level Control System with PLC (TIA Portal)', stack:'Siemens TIA Portal' }, { level:'Advanced', title:'DCS Configuration for Chemical Process Plant', stack:'Honeywell Experion / Emerson DeltaV' }],
      'Apply at ONGC, BPCL, HPCL, refinery & chemical plants, Emerson, Yokogawa, Honeywell.',
      ['What is a process variable, setpoint, and manipulated variable?','Explain PID tuning methods.','What are the types of control valves?','What is the difference between PLC and DCS?','Explain pressure measurement using Bourdon tube.'],
      [
        { step: 1, title: 'Measurement & Sensors', desc: 'Temperature, pressure, level, flow measurement principles. Sensor calibration.', duration: '2 months' },
        { step: 2, title: 'Process Control', desc: 'Feedback, feedforward control. PID tuning (Ziegler-Nichols). MATLAB simulation.', duration: '2 months' },
        { step: 3, title: 'PLC / DCS', desc: 'Siemens TIA Portal for PLC. Learn DCS concepts (Honeywell, ABB, Emerson).', duration: '2 months' },
        { step: 4, title: 'SCADA', desc: 'Build SCADA systems with WinCC or Ignition. OPC-UA integration.', duration: '2 months' },
        { step: 5, title: 'GATE & PSU', desc: 'Prepare GATE IN (Instrumentation). Apply to ONGC, BPCL, HPCL, BEL.', duration: '6 months' }
      ]
    )
  ];
  DB.ICE = DB.EIE;

  // ─────────────────────────────────────────────────────────────────────────────
  // AEROSPACE — Aerospace Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.AEROSPACE = DB.AERO;

  // ─────────────────────────────────────────────────────────────────────────────
  // SFE — Safety & Fire Engineering
  // ─────────────────────────────────────────────────────────────────────────────
  DB.SFE = [
    role('sfe-safety', 'Safety Engineer / HSE Officer', 'Manufacturing / Construction / Oil & Gas', '₹3–12 LPA',
      'Implement and enforce health, safety, and environmental (HSE) standards to prevent workplace accidents and ensure compliance.',
      [L('OSHA / ISO 45001','🟡','🔴'), L('Risk Assessment (HAZOP, HAZAN)','🟡','🔴'), L('Fire Safety (NBC/IS codes)','🟢','🟡'), L('Incident Investigation (RCA)','🟡','🔴'), L('Permit to Work (PTW) Systems','🟢','🟡'), L('Emergency Response Planning','🟡','🔴')],
      ['AutoCAD (safety layout)','MS Excel (incident tracking)','PHAST (risk assessment)','BowTie Risk Software','SAP EHS (basics)'],
      ['Industrial Safety','Fire Safety & Fire Protection','Environmental Science','Occupational Health','Risk Assessment Methods','Accident Investigation'],
      ['NEBOSH OSHA Free Resources','NPTEL Industrial Safety Certificate','OSHA Free Training (eTool)','ISO 45001 Free Sample Chapters'],
      [{ level:'Beginner', title:'Job Safety Analysis (JSA) for a Warehouse Operation', stack:'Excel JSA Template' }, { level:'Intermediate', title:'HAZOP Study for a Chemical Process (Process Drawing)', stack:'HAZOP Worksheet + P&ID' }, { level:'Advanced', title:'Emergency Response Plan for an Industrial Facility', stack:'ISO 45001 + IRS System' }],
      'Apply at manufacturing plants, construction sites, oil & gas companies (ONGC, BPCL), civil contractors.',
      ['What is HAZOP?','Explain the hierarchy of hazard controls.','What is a permit to work system?','What are the NBC fire safety provisions?','Explain root cause analysis.'],
      [
        { step: 1, title: 'Safety Laws & Standards', desc: 'Factories Act, Mines Act, OSHA standards, ISO 45001, NEBOSH international syllabus.', duration: '2 months' },
        { step: 2, title: 'Hazard Identification', desc: 'HAZOP, HAZAN, JSA, What-If analysis, bow-tie risk methodology.', duration: '2 months' },
        { step: 3, title: 'Fire Safety', desc: 'NBC 2016 fire provisions, fire extinguishers, sprinkler systems, emergency evacuation.', duration: '1 month' },
        { step: 4, title: 'Incident Investigation', desc: 'Root Cause Analysis (RCA), 5-Why, fault tree analysis. Prepare incident reports.', duration: '1 month' },
        { step: 5, title: 'Certification & Jobs', desc: 'Get NEBOSH IGC, IOSH Managing Safely, or OSHA-30 certificate. Apply for HSE officer roles.', duration: 'Ongoing' }
      ]
    )
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // VLSI / BTECH_VLSI — VLSI Design & Technology
  // ─────────────────────────────────────────────────────────────────────────────
  DB.VLSI = DB.ECE.filter(r => r.id === 'ece-vlsi');
  DB.BTECH_VLSI = DB.VLSI;

  // ─────────────────────────────────────────────────────────────────────────────
  // REMAINING ALIASES
  // ─────────────────────────────────────────────────────────────────────────────
  DB.CCE       = DB.ECE;
  DB.ECE_ELCO  = DB.ECE;
  DB.ELCO      = DB.ECE;
  DB.CSE_AIML  = DB.AIDS;
  DB.CSD       = DB.CSE.filter(r => ['cse-fsd','cse-aiml'].includes(r.id));
  DB.CSE_IOT   = DB.ECE.filter(r => r.id === 'ece-iot');
  DB.CSE_TM    = DB.CSE;
  DB.CSBS      = DB.CSE.filter(r => ['cse-swe','cse-fsd','cse-dba'].includes(r.id));
  DB.MECH_TM   = DB.MECH;
  DB.MECH_SW   = DB.MECH;
  DB.MECH_SM   = DB.MECH;
  DB.MECH_AUTO = DB.MECH.filter(r => r.id === 'mech-auto');
  DB.MAE       = DB.MTRX;
  DB.CIVIL_TM  = DB.CIVIL;
  DB.CHEM      = DB.CHEM;
  DB.CEE       = DB.CHEM;
  DB.PCT       = DB.CHEM;
  DB.PHARMA    = DB.BIOTECH;
  DB.PLASTIC   = DB.CHEM;
  DB.PETRO     = [
    role('pet-res', 'Petroleum / Reservoir Engineer', 'PSU / Private / Oil & Gas', '₹4–18 LPA',
      'Analyze oil & gas reservoirs, design drilling programs, and optimize hydrocarbon production.',
      [L('Reservoir Engineering','🟡','🔴'), L('Drilling Engineering','🟡','🔴'), L('Well Logging Interpretation','🟡','🔴'), L('Production Technology','🟡','🔴'), L('MATLAB/Python (reservoir modelling)','🟢','🟡'), L('Petroleum Geology basics','🟢','🟡')],
      ['Eclipse / CMG (reservoir simulation)','Petrel','WellCAD','MATLAB','Python (reservoir tools)','AutoCAD'],
      ['Petroleum Production Engineering','Reservoir Engineering','Drilling Engineering','Well Logging','Formation Evaluation','Transportation of Oil & Gas'],
      ['NPTEL Petroleum Engineering Certificate','SPE Open Access Papers (Free)','PetroWiki (Free)','Coursera Petroleum Engineering (Audit)'],
      [{ level:'Beginner', title:'Material Balance Calculation for an Oil Reservoir', stack:'MATLAB / Excel' }, { level:'Intermediate', title:'Well Test Analysis (Pressure Buildup)', stack:'Python + Petroleum Engineering Equations' }, { level:'Advanced', title:'Reservoir Simulation (Eclipse/CMG student)', stack:'Eclipse / CMG Student Version' }],
      'Apply at ONGC, OIL India, IOCL, Cairn India, Reliance Industries (petroleum division).',
      ['What is the difference between primary, secondary, and tertiary recovery?','Explain Darcy\'s Law.','What is API gravity?','How do you interpret a well log?','What is material balance equation?'],
      [
        { step: 1, title: 'Petroleum Geology & Basics', desc: 'Origin of oil & gas, reservoir rocks, traps, fluid properties.', duration: '2 months' },
        { step: 2, title: 'Reservoir Engineering', desc: 'Darcy\'s law, relative permeability, material balance, decline curve analysis.', duration: '3 months' },
        { step: 3, title: 'Drilling Engineering', desc: 'Drilling fluids, bit selection, casing design, cementing, well control.', duration: '2 months' },
        { step: 4, title: 'Production Technology', desc: 'Well completion, artificial lift (ESP, sucker rod), surface facilities, oil treatment.', duration: '2 months' },
        { step: 5, title: 'Software & GATE', desc: 'Learn Eclipse/CMG. Prepare GATE Petroleum. Apply to ONGC, OIL India.', duration: 'Ongoing' }
      ]
    )
  ];
  DB.PET = DB.PETRO;

  // Textile / Fashion
  DB.TXT = [
    role('txt-engineer', 'Textile Engineer / Quality Officer', 'Private / Export / Government', '₹2–10 LPA',
      'Manage textile manufacturing processes, quality control, fabric testing, and technical textile development.',
      [L('Yarn & Fabric Manufacturing','🟢','🟡'), L('Textile Testing','🟡','🔴'), L('Quality Management','🟢','🟡'), L('Textile Chemistry','🟢','🟡'), L('CAD for Textiles (NedGraphics)','🟢','🟡')],
      ['NedGraphics (Textile CAD)','AUTOCONER systems (weaving)','Uster Tester','Excel (QC data)','MATLAB (basics)'],
      ['Yarn Manufacture','Fabric Manufacture','Textile Chemistry','Textile Testing','Quality Management','Apparel Technology'],
      ['Textile Institute Open Access (Free)','NPTEL Textile Technology Certificate','ATIRA/BTRA Research Papers (Free access some)'],
      [{ level:'Beginner', title:'Yarn Twist Calculation & Fabric GSM Measurement (Lab)', stack:'Lab + Excel' }, { level:'Intermediate', title:'Quality Control Plan for Denim Manufacturing', stack:'IS/ASTM standards + Excel' }, { level:'Advanced', title:'Technical Textile Product Development (Geotextile)', stack:'Material testing + Design calculation' }],
      'Apply at Textile mills (KG Denim, Raymond), garment exporters, ATIRA, BTRA testing labs, textile PPO companies.',
      ['What is twist per inch (TPI)?','Difference between woven and knit fabric?','What is GSM?','Explain the dyeing process for cotton.','What is OEKO-TEX certification?'],
      [
        { step: 1, title: 'Textile Fundamentals', desc: 'Fiber types (natural/synthetic), yarn structure, fabric structure (woven, knit, nonwoven).', duration: '2 months' },
        { step: 2, title: 'Manufacturing Processes', desc: 'Spinning (ring, open-end), weaving, knitting, finishing, dyeing & printing processes.', duration: '2 months' },
        { step: 3, title: 'Quality Testing', desc: 'Strength, elongation, pilling, colourfastness, wash fastness testing. IS/ASTM standards.', duration: '2 months' },
        { step: 4, title: 'Textile Chemistry', desc: 'Fibre chemistry, dyes (reactive, disperse, acid), chemical finishing.', duration: '1 month' },
        { step: 5, title: 'Industry & Government Jobs', desc: 'Apply for Textile Technology Officer, ATIRA/BTRA Research positions, mill QC roles.', duration: 'Ongoing' }
      ]
    )
  ];
  DB.HTT = DB.TXT;
  DB.TXCHEM = DB.TXT;
  DB.FT = [
    role('ft-designer', 'Fashion Designer / Merchandiser', 'Private / Export / Fashion Industry', '₹2–12 LPA',
      'Design garments, manage product development, and coordinate between buyers and production teams.',
      [L('Garment Construction','🟡','🔴'), L('Pattern Making & Grading','🟡','🔴'), L('Textile Knowledge','🟢','🟡'), L('Fashion CAD (CLO 3D/Adobe Illustrator)','🟡','🔴'), L('Merchandising','🟡','🔴'), L('Trend Forecasting','🟢','🟡')],
      ['CLO 3D (Fashion CAD)','Adobe Illustrator','Adobe Photoshop','MS Excel (costing)','Gerber / Optitex (pattern making CAD)','Canva'],
      ['Fashion Design','Garment Construction','Pattern Making','Textile Technology','Fashion Merchandising','Fashion History'],
      ['CLO 3D Free Trial Tutorials','Adobe Illustrator Free Trial','NPTEL Apparel & Fashion Certificate','Vogue Business (Free Articles)'],
      [{ level:'Beginner', title:'A-Line Skirt Pattern Making & Sewing', stack:'Paper pattern + Sewing machine' }, { level:'Intermediate', title:'Full Outfit Design in CLO 3D', stack:'CLO 3D' }, { level:'Advanced', title:'Mini Fashion Collection with Lookbook (6 outfits)', stack:'CLO 3D + Adobe Illustrator + Photography' }],
      'Apply at garment exporters, fashion brands (Myntra, Nykaa Fashion), retail chains, fashion weeks.',
      ['Walk me through your design process.','What is Tech Pack?','Explain grading in pattern making.','What are the current fashion trends?','What fabrics are best for sustainable fashion?'],
      [
        { step: 1, title: 'Design Fundamentals', desc: 'Colour theory, fashion illustration, design elements and principles.', duration: '1 month' },
        { step: 2, title: 'Pattern Making & Garment Construction', desc: 'Basic blocks, drafting, grading, sewing techniques.', duration: '3 months' },
        { step: 3, title: 'Fashion CAD', desc: 'CLO 3D for virtual garment design. Adobe Illustrator for flat sketches and tech packs.', duration: '2 months' },
        { step: 4, title: 'Merchandising & Costing', desc: 'Product development, buyer communications, cost sheet preparation.', duration: '2 months' },
        { step: 5, title: 'Portfolio & Internship', desc: 'Create a design portfolio. Apply for internships at fashion brands.', duration: 'Ongoing' }
      ]
    )
  ];

  // MET, MIN, PROD, PRT — minimal data
  const genericRole = (prefix, deptName, domain) => [
    role(`${prefix}-core`, `${deptName} Core Engineer`, 'Private / PSU / Government', '₹3–14 LPA',
      `Apply core ${deptName} knowledge in industry: process operations, quality control, design, and R&D.`,
      [L(`${deptName} Fundamentals`,'🟢','🟡'), L('Problem Solving','🟢','🟡'), L('Industry Standards','🟢','🟡'), L('AutoCAD / CAD','🟢','🟡'), L('MATLAB / Python (basics)','🟢','🟡')],
      ['AutoCAD','MATLAB','Excel','Industry-specific simulation software','NPTEL Video Lecture Platform'],
      [`Core ${deptName} Subjects`, 'Engineering Drawing', 'Quality Management', 'Material Science'],
      [`NPTEL ${deptName} Certificate`, 'Coursera ${deptName} (Audit)', 'GATE Subject-wise Study'],
      [{ level:'Beginner', title:`Basic ${deptName} Lab Project`, stack:'Manual + Excel' }, { level:'Intermediate', title:`${deptName} Process Simulation`, stack:'MATLAB / Python' }, { level:'Advanced', title:`Industry-Scale ${deptName} Design Project`, stack:'Relevant Industry Software' }],
      `Apply for ${deptName} core engineer roles at relevant industries (government and private).`,
      [`Core ${deptName} subject questions`, 'Aptitude: Quantitative, Reasoning', 'Subject-specific technical GK'],
      [
        { step: 1, title: `${deptName} Core Foundation`, desc: `Master all core ${deptName} subjects systematically.`, duration: '3–4 months' },
        { step: 2, title: 'GATE Preparation', desc: `Prepare GATE for ${deptName}. Solve previous papers.`, duration: '6 months' },
        { step: 3, title: 'Internship & Jobs', desc: `Apply for core engineering internships and entry-level roles.`, duration: 'Ongoing' }
      ]
    )
  ];

  DB.MET  = genericRole('met',  'Metallurgical Engineering', 'Materials & Metallurgy');
  DB.MIN  = genericRole('min',  'Mining Engineering',        'Mining');
  DB.PROD = genericRole('prod', 'Production Engineering',    'Manufacturing');
  DB.PRT  = genericRole('prt',  'Printing Technology',       'Printing & Packaging');

  // ── PUBLIC API ────────────────────────────────────────────────────────────────
  return {
    /**
     * Get all job roles for a department.
     * @param {string} deptCode
     * @returns {Array}
     */
    getRoles(deptCode) {
      return DB[deptCode] || [];
    },

    /**
     * Get a specific role by ID within a department.
     * @param {string} deptCode
     * @param {string} roleId
     * @returns {Object|null}
     */
    getRole(deptCode, roleId) {
      const roles = this.getRoles(deptCode);
      return roles.find(r => r.id === roleId) || null;
    },

    /**
     * Get all unique categories for a department's roles.
     * @param {string} deptCode
     * @returns {string[]}
     */
    getCategories(deptCode) {
      const roles = this.getRoles(deptCode);
      return [...new Set(roles.map(r => r.category))];
    }
  };
})();
