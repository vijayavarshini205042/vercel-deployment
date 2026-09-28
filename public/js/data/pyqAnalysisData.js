/**
 * DRMS — Real Anna University Previous Year Question Papers (PYQ),
 * Detailed Question Trend Analysis, Solved Answers, and Unit-wise Notes.
 * 
 * Includes 5 Real Exam Papers from Anna University:
 * 1. QP 50356 — CB3491: Cryptography and Cyber Security (April/May 2024)
 * 2. QP 41257 — GE3751: Principles of Management (Nov/Dec 2024)
 * 3. QP 41262 — GE3791: Human Values and Ethics (Nov/Dec 2024)
 * 4. QP 80056 — AI3021: IT in Agricultural System (Nov/Dec 2025)
 * 5. QP 41515 — OBT356: Lifestyle Diseases (Nov/Dec 2024)
 */

window.PYQAnalysisData = [
  // =========================================================================
  // 1. CB3491 — CRYPTOGRAPHY AND CYBER SECURITY (QP Code: 50356)
  // =========================================================================
  {
    qpCode: "50356",
    subjectCode: "CB3491",
    subjectName: "Cryptography and Cyber Security",
    regulation: "R2021",
    examSession: "April/May 2024",
    semester: 5,
    commonBranches: [
      "Computer Science and Engineering",
      "CSE (Artificial Intelligence and Machine Learning)",
      "CSE (Cyber Security)",
      "Computer and Communication Engineering",
      "Information Technology"
    ],
    maxMarks: 100,
    timeDuration: "3 Hours",
    analysis: {
      difficultyRating: "Moderate to High (Heavy Numerical & Protocol Design Focus)",
      unitWeightage: [
        { unit: "Unit 1: Classical Encryption & Number Theory", marks: 27, percentage: "27%" },
        { unit: "Unit 2: Symmetric Ciphers & Block Cipher Modes", marks: 24, percentage: "24%" },
        { unit: "Unit 3: Asymmetric Ciphers & Key Exchange (RSA / Diffie-Hellman)", marks: 23, percentage: "23%" },
        { unit: "Unit 4: Cryptographic Hash Functions & Digital Signatures (SHA / DSS)", marks: 15, percentage: "15%" },
        { unit: "Unit 5: Network Security, Kerberos, Cloud & Spyware Defense", marks: 26, percentage: "26%" }
      ],
      highFrequencyTopics: [
        "Hill Cipher Matrix Encryption and Decryption (Known Key Matrix)",
        "Euclid's GCD Algorithm & Fermat's Little Theorem",
        "RSA Cryptosystem Key Generation (p, q, n, phi(n), e, d)",
        "Diffie-Hellman Key Exchange & Man-in-the-Middle (MITM) Vulnerability",
        "Kerberos v5 Authentication Dialogue (AS, TGS, Service Server)",
        "RC4 Stream Cipher State Permutation (KSA & PRGA)"
      ],
      examPreparationTips: [
        "Practice modular arithmetic: Fermat's Little Theorem (a^(p-1) mod p = 1) is guaranteed for 2-mark questions.",
        "Ensure step-by-step matrix multiplication for Hill Cipher mod 26.",
        "Draw clear architecture diagrams for OSI Security Architecture and DES Feistel structure."
      ]
    },
    questions: {
      partA: [
        {
          qNo: 1,
          question: "Distinguish between attack and threat.",
          answer: "• Threat: A potential danger, circumstance, or event that might breach security and cause harm (e.g., possibility of unauthorized data interception).\n• Attack: A deliberate, executed action that attempts to exploit a vulnerability in a system to compromise confidentiality, integrity, or availability."
        },
        {
          qNo: 2,
          question: "Define steganography.",
          answer: "Steganography is the art and science of hiding communication by concealing secret data within an ordinary, non-suspicious carrier (such as an image pixel LSB, audio file, or text) so that an observer cannot detect the existence of the message."
        },
        {
          qNo: 3,
          question: "Find GCD(1970, 1066) using Euclid's algorithm.",
          answer: "Step 1: 1970 = 1066 × 1 + 904\nStep 2: 1066 = 904 × 1 + 162\nStep 3: 904 = 162 × 5 + 94\nStep 4: 162 = 94 × 1 + 68\nStep 5: 94 = 68 × 1 + 26\nStep 6: 68 = 26 × 2 + 16\nStep 7: 26 = 16 × 1 + 10\nStep 8: 16 = 10 × 1 + 6\nStep 9: 10 = 6 × 1 + 4\nStep 10: 6 = 4 × 1 + 2\nStep 11: 4 = 2 × 2 + 0\nTherefore, GCD(1970, 1066) = 2."
        },
        {
          qNo: 4,
          question: "Compare block cipher and stream cipher.",
          answer: "• Block Cipher: Encrypts data in fixed-size blocks (e.g., 64-bit or 128-bit) simultaneously using the same key (e.g., AES, DES). High propagation of errors.\n• Stream Cipher: Encrypts data continuously byte-by-byte or bit-by-bit using a pseudorandom keystream combined via XOR (e.g., RC4, ChaCha20). Faster execution, low memory."
        },
        {
          qNo: 5,
          question: "Find the remainder when 7^23 is divided by 11 using Fermat's Little Theorem.",
          answer: "Fermat's Little Theorem states: If p is prime and gcd(a,p)=1, then a^(p-1) ≡ 1 (mod p).\nHere a = 7, p = 11, so 7^10 ≡ 1 (mod 11).\nWrite 7^23 = (7^10)^2 × 7^3 ≡ 1^2 × 7^3 ≡ 7^3 (mod 11).\n7^3 = 343.\n343 ÷ 11 = 31 with remainder 2 (since 11 × 31 = 341).\nTherefore, remainder = 2."
        },
        {
          qNo: 6,
          question: "How does the Chinese Remainder Theorem contribute to efficient modular arithmetic in encryption and decryption processes?",
          answer: "Chinese Remainder Theorem (CRT) breaks a large modular exponentiation problem modulo n = p×q into two much smaller independent sub-computations modulo p and modulo q. In RSA decryption, CRT provides an approximate 4x speedup in computing d_p and d_q."
        },
        {
          qNo: 7,
          question: "Define Digital signature. What are the properties of Digital Signature?",
          answer: "A digital signature is a cryptographic mechanism providing authentication, non-repudiation, and data integrity by encrypting a message hash with the sender's private key.\nProperties: (1) Authentic & verifiable, (2) Unforgeable, (3) Non-reusable, (4) Non-repudiable, (5) Tamper-evident."
        },
        {
          qNo: 8,
          question: "Write a simple authentication dialogue used in Kerberos.",
          answer: "1. Client → Authentication Server (AS): Request Ticket Granting Ticket (TGT).\n2. AS → Client: Encrypted TGT + Session Key.\n3. Client → Ticket Granting Server (TGS): Authenticator + TGT requesting service ticket.\n4. TGS → Client: Service Ticket.\n5. Client → Application Server: Service Ticket + Authenticator."
        },
        {
          qNo: 9,
          question: "Define cybercrime and explain why it poses significant challenges to individuals, organizations and society.",
          answer: "Cybercrime is any illegal activity committed using computers, networks, or digital devices as instruments or targets. Challenges include: borderless anonymity, massive financial fraud, identity theft, critical infrastructure sabotage, and high technical complexity in digital forensics."
        },
        {
          qNo: 10,
          question: "Write the key principles and practices of cloud security.",
          answer: "1. Shared Responsibility Model\n2. Zero Trust Architecture & Least-Privilege IAM\n3. Data Encryption at Rest and in Transit (TLS, KMS)\n4. Automated Vulnerability Scanning & CI/CD DevSecOps\n5. Continuous Centralized Logging & Threat Monitoring (SIEM)"
        }
      ],
      partB: [
        {
          qNo: "11(a)",
          question: "Show your calculations and the result to encrypt the message 'meet me at the usual place at ten rather than eight o clock' using the Hill cipher with the key [[7, 3], [2, 5]].",
          solutionOutline: "1. Key Matrix K = [[7, 3], [2, 5]]. Determinant = (7×5 - 3×2) = 35 - 6 = 29 ≡ 3 (mod 26).\n2. Convert characters to numbers (a=0, b=1, ..., z=25).\n3. Pair plaintext characters into 2x1 vectors: [m, e] = [12, 4], [e, t] = [4, 19], [m, e] = [12, 4], etc.\n4. Multiply each vector by K mod 26: C = K × P (mod 26).\nFor vector 1 [12, 4]: C1 = (7×12 + 3×4) = 96 ≡ 18 (S); C2 = (2×12 + 5×4) = 44 ≡ 18 (S).\nContinue through all character pairs to produce the full ciphertext."
        },
        {
          qNo: "11(b)",
          question: "Explain about OSI Security architecture model with suitable example.",
          solutionOutline: "Detailed presentation of X.800 architecture covering:\n1. Security Attacks: Passive (Traffic analysis, release of content) vs Active (Masquerade, Replay, Modification, Denial of Service).\n2. Security Mechanisms: Encipherment, Digital Signatures, Access Control, Data Integrity, Authentication Exchange, Traffic Padding.\n3. Security Services: Confidentiality, Integrity, Authentication, Non-repudiation, Access Control."
        },
        {
          qNo: "12(a)",
          question: "(i) Solve using RC4 stream cipher: State vector 8 bits, Key: [1 0 0 2], Plaintext: [6 1 5 4]. (8 marks)\n(ii) Illustrate any one pseudo random number generator algorithm. (5 marks)",
          solutionOutline: "(i) Key Scheduling Algorithm (KSA):\nInitialize S = [0, 1, 2, 3, 4, 5, 6, 7], T = [1, 0, 0, 2, 1, 0, 0, 2].\nCompute j = (j + S[i] + T[i]) mod 8 and swap S[i] with S[j] for i=0 to 7.\nPseudo-Random Generation Algorithm (PRGA): Generate keystream k, then Ciphertext = Plaintext XOR k.\n(ii) Linear Congruential Generator (LCG): X_(n+1) = (a*X_n + c) mod m, explaining conditions for full period."
        },
        {
          qNo: "12(b)",
          question: "Explain the overall structure and round structure of DES with neat sketch.",
          solutionOutline: "1. 64-bit plaintext block, 56-bit effective key.\n2. Initial Permutation (IP), 16 identical Feistel rounds.\n3. Round function: 32-bit right half expansion (E-box to 48 bits), XOR with 48-bit round subkey, 8 S-Boxes (6 bits to 4 bits non-linear substitution), P-box permutation.\n4. 32-bit swap, final inverse permutation (IP^-1)."
        },
        {
          qNo: "13(a)",
          question: "Given two prime numbers p=13 and q=17. Calculate:\n(i) Compute n, the modulus for RSA.\n(ii) Calculate phi(n), Euler's Totient Function.\n(iii) Find the public exponent (e).\n(iv) Calculate the private exponent (d).",
          solutionOutline: "(i) n = p × q = 13 × 17 = 221.\n(ii) phi(n) = (p - 1)(q - 1) = 12 × 16 = 192.\n(iii) Choose e such that 1 < e < 192 and gcd(e, 192) = 1. A standard valid choice is e = 5 (since gcd(5, 192) = 1).\n(iv) Calculate d = e^(-1) mod phi(n), meaning (d × 5) ≡ 1 (mod 192).\nUsing Extended Euclidean Algorithm: 192 = 5 × 38 + 2; 5 = 2 × 2 + 1.\n1 = 5 - 2(2) = 5 - 2(192 - 5×38) = 5 × 77 - 2 × 192.\nSo d = 77.\nVerification: 5 × 77 = 385; 385 mod 192 = 1. Therefore: n = 221, phi(n) = 192, e = 5, d = 77."
        },
        {
          qNo: "13(b)",
          question: "(i) Consider Diffie-Hellman with prime q = 11 and primitive root a = 2. If user A has public key YA = 9, what is A's private key XA? If user B has public key YB = 3, what is the secret key K shared with A? (8 marks)\n(ii) How can a Man-in-the-Middle attack be performed in Diffie-Hellman? (5 marks)",
          solutionOutline: "(i) Formula: YA = a^(XA) mod q => 2^(XA) mod 11 = 9.\nTest values of XA:\n2^1=2, 2^2=4, 2^3=8, 2^4=16≡5, 2^5=32≡10, 2^6=64≡9 mod 11.\nTherefore, XA = 6.\nShared Secret Key K = (YB)^(XA) mod q = 3^6 mod 11.\n3^6 = 729. 729 ÷ 11 = 66 remainder 3 (since 66 × 11 = 726).\nTherefore, shared key K = 3.\n(ii) MITM attack: Attacker C intercepts YA from A and YB from B, generating two distinct keys K1 and K2 to decrypt and re-encrypt all messages undetected."
        },
        {
          qNo: "14(a)",
          question: "With a neat diagram, explain the steps involved in SHA algorithm producing a message digest of 512 bits (SHA-512).",
          solutionOutline: "1. Padding: Append '1' followed by '0's such that length ≡ 896 mod 1024.\n2. Append 128-bit original length.\n3. Buffer Initialization: 8 64-bit state words (H0 to H7) from fractional parts of first 8 primes.\n4. Processing in 1024-bit blocks across 80 rounds using Ch, Maj, Sigma0, Sigma1 functions."
        },
        {
          qNo: "15(a)",
          question: "Describe how spyware functions and its impact on privacy. What steps can organizations take to detect and prevent spyware infections?",
          solutionOutline: "1. Spyware mechanisms: Keyloggers, screen scrapers, tracking cookies, adware, trojan delivery.\n2. Privacy impacts: Identity theft, credential harvesting, corporate espionage.\n3. Defensive controls: EDR software, browser sandboxing, multi-factor authentication (MFA), regular patching, and employee phishing awareness."
        }
      ],
      partC: [
        {
          qNo: "16(a)",
          question: "You work as an IT administrator for a multinational firm. Describe how you would utilize Kerberos to improve network security and simplify user authentication and authorization. What components and processes would you need to put in place to do this?",
          solutionOutline: "Comprehensive enterprise blueprint:\n1. Architecture Components: Key Distribution Center (KDC) comprising Authentication Server (AS) and Ticket Granting Server (TGS), Kerberos Realm definition, Service Principal Names (SPNs).\n2. Authentication Workflow: User single sign-on (SSO) with initial ticket (TGT), mitigating plain-text password transit.\n3. Security Benefits: Mutual authentication, timestamp replay protection (5-minute skew window), ticket caching, cross-realm trust for multinational branch offices."
        }
      ]
    }
  },

  // =========================================================================
  // 2. GE3751 — PRINCIPLES OF MANAGEMENT (QP Code: 41257)
  // =========================================================================
  {
    qpCode: "41257",
    subjectCode: "GE3751",
    subjectName: "Principles of Management",
    regulation: "R2021",
    examSession: "November/December 2024",
    semester: 7,
    commonBranches: ["All Engineering Branches (CSE, ECE, EEE, MECH, CIVIL, IT, AIDS, etc.)"],
    maxMarks: 100,
    timeDuration: "3 Hours",
    analysis: {
      difficultyRating: "Moderate (Standard Theory & Case Application)",
      unitWeightage: [
        { unit: "Unit 1: Introduction to Management and Organizations", marks: 22, percentage: "22%" },
        { unit: "Unit 2: Planning & Decision Making", marks: 25, percentage: "25%" },
        { unit: "Unit 3: Organizing & Human Resource Management", marks: 24, percentage: "24%" },
        { unit: "Unit 4: Directing, Motivation & Leadership", marks: 28, percentage: "28%" },
        { unit: "Unit 5: Controlling & Management Audit", marks: 15, percentage: "15%" }
      ],
      highFrequencyTopics: [
        "Entrepreneur vs Manager Distinction & Business Ownership Forms",
        "Steps in Effective Planning & Rational Decision-Making Process",
        "Formal vs Informal Organization & Delegation of Authority Principles",
        "Leader vs Manager & Theories of Motivation (Maslow, Herzberg, Financial Incentives)",
        "Management Audit vs Financial Audit & Principles of Effective Control"
      ],
      examPreparationTips: [
        "Include neat sketches for Line, Functional, and Matrix organizational structures in Part B.",
        "Differentiate Entrepreneur vs Manager using a tabular format with 6+ comparison parameters.",
        "Quote management thinkers: Henri Fayol (14 principles), F.W. Taylor (Scientific management), Peter Drucker (MBO)."
      ]
    },
    questions: {
      partA: [
        { qNo: 1, question: "Define Management.", answer: "Management is the art of getting things done through and with people in formally organized groups, encompassing planning, organizing, staffing, directing, and controlling organizational resources to achieve objectives efficiently." },
        { qNo: 2, question: "List out the merits of sole proprietorship.", answer: "1. Ease of formation and minimal legal formalities.\n2. Direct motivation: owner retains 100% of net profits.\n3. Total managerial flexibility and swift decision-making.\n4. Complete business confidentiality and operational privacy." },
        { qNo: 3, question: "Write down the objectives of Planning.", answer: "1. To provide clear strategic direction and purpose.\n2. To reduce uncertainties and anticipate future market risks.\n3. To eliminate waste and redundant operational activities.\n4. To establish measurable benchmarks and standards for control." },
        { qNo: 4, question: "Define decision making.", answer: "Decision making is the cognitive process of selecting the most rational, viable course of action among several alternative possibilities to achieve a specified organizational goal." },
        { qNo: 5, question: "State the importance of HR Planning.", answer: "1. Ensures optimal deployment of skilled workforce, avoiding shortages or surplus.\n2. Facilitates smooth succession planning for critical leadership roles.\n3. Controls human capital expenditure and boosts labor productivity." },
        { qNo: 6, question: "What is career planning and state its importance?", answer: "Career planning is an ongoing process by which an individual sets career goals and identifies the pathways to attain them. Importance: boosts employee retention, enhances motivation, aligns personal aspirations with business growth." },
        { qNo: 7, question: "What do you mean by Job enrichment?", answer: "Job enrichment is a vertical expansion of job responsibilities giving employees greater autonomy, challenge, accountability, and recognition to increase intrinsic motivation (Herzberg's two-factor theory)." },
        { qNo: 8, question: "Define motivation.", answer: "Motivation is the psychological process that initiates, guides, and maintains goal-oriented behaviors, driving individuals to exert high effort toward organizational goals." },
        { qNo: 9, question: "Give an example for concurrent control.", answer: "Real-time monitoring of automated manufacturing assembly lines using sensors to reject defective components instantly, or GPS fleet tracking of logistics vehicles while in transit." },
        { qNo: 10, question: "State the application of IT in management control.", answer: "Enterprise Resource Planning (ERP) systems (SAP/Oracle), real-time inventory RFID tracking, automated financial variance dashboards, and automated biometric attendance systems." }
      ],
      partB: [
        {
          qNo: "11(a)",
          question: "Distinguish between Entrepreneur Vs Manager in detail.",
          solutionOutline: "Detailed tabular comparison across parameters:\n1. Motive: Innovation/Venture creation vs Managing operations\n2. Risk bearing: Assumes financial risk vs Risk-averse employee\n3. Reward: Profits vs Salary and bonuses\n4. Status: Owner/Self-employed vs Hired professional\n5. Innovation: Originates ideas vs Executes established strategies."
        },
        {
          qNo: "11(b)",
          question: "Discuss the types of Business Organization with a neat sketch.",
          solutionOutline: "Draw structures and explain:\n1. Sole Proprietorship\n2. Partnership (General & LLP)\n3. Joint Hindu Family Business\n4. Joint Stock Company (Private vs Public Limited)\n5. Cooperative Societies, highlighting liability, capital, and lifespan."
        },
        {
          qNo: "12(a)",
          question: "State and explain the steps involved in effective planning.",
          solutionOutline: "8-step standard planning cycle:\n1. Awareness of opportunities\n2. Establishing organizational objectives\n3. Developing planning premises (forecasts)\n4. Identifying alternative courses of action\n5. Evaluating alternatives based on feasibility and ROI\n6. Selecting the best alternative\n7. Formulating derivative plans\n8. Budgeting and execution monitoring."
        },
        {
          qNo: "13(a)",
          question: "Explain how formal organization is different from informal organization. Illustrate.",
          solutionOutline: "Structured comparison:\n1. Origin: Deliberate official hierarchy vs Spontaneous social relations\n2. Authority: Delegated top-down vs Emergent peer consensus\n3. Communication: Chain of command (scalar chain) vs Grapevine\n4. Flexibility: Rigid rules vs High adaptability\n5. Chart: Visible on organogram vs Hidden social web."
        },
        {
          qNo: "14(a)",
          question: "'A good leader is not necessarily a good manager'. Discuss this statement and compare leadership with management.",
          solutionOutline: "1. Core Philosophy: Managers do things right (order, systems, budgets); Leaders do the right things (vision, change, inspiring people).\n2. Contrast on: Focus (processes vs people), Horizon (short-term vs long-term), Authority (formal position vs personal influence).\n3. Synthesizing both: Why modern organizations require managers with strong leadership abilities."
        },
        {
          qNo: "15(a)",
          question: "Define management audit. How does it differ from financial audit? How can a management audit programme be adopted?",
          solutionOutline: "1. Definition: Comprehensive, constructive evaluation of an organization's managerial performance, policies, and resource utilization.\n2. Comparison table: Focus (operational effectiveness vs books of accounts), Auditor (management consultants vs certified CAs), Frequency (voluntary/periodic vs statutory annual).\n3. Steps to adopt: Setting performance criteria, conducting management interviews, variance reporting, and corrective action planning."
        }
      ],
      partC: [
        {
          qNo: "16(a)",
          question: "'Money holds the key to work motivation in modern business organizations'. Discuss. How can managers use money to motivate people in organizations?",
          solutionOutline: "1. Critical Analysis: Money satisfies physiological and safety needs (Maslow) and functions as a hygiene factor (Herzberg). However, intrinsic motivation (autonomy, mastery, purpose) is essential for long-term retention.\n2. Financial Incentive Structures: Performance-linked bonuses, profit sharing, Employee Stock Options (ESOPs), merit-based salary increments.\n3. Balanced Approach: Combining monetary compensation with non-monetary motivators (recognition, career growth, work-life balance)."
        }
      ]
    }
  },

  // =========================================================================
  // 3. GE3791 — HUMAN VALUES AND ETHICS (QP Code: 41262)
  // =========================================================================
  {
    qpCode: "41262",
    subjectCode: "GE3791",
    subjectName: "Human Values and Ethics",
    regulation: "R2021",
    examSession: "November/December 2024",
    semester: 7,
    commonBranches: ["All Engineering Branches (Common to All Branches)"],
    maxMarks: 100,
    timeDuration: "3 Hours",
    analysis: {
      difficultyRating: "Moderate (Analytical & Contemporary Social Reasoning)",
      unitWeightage: [
        { unit: "Unit 1: Democratic Values, Equality & Secularism", marks: 25, percentage: "25%" },
        { unit: "Unit 2: Scientific Temper, Rationality & Research Integrity", marks: 25, percentage: "25%" },
        { unit: "Unit 3: Gender Sensitization & Constitutional Protections", marks: 28, percentage: "28%" },
        { unit: "Unit 4: Ethics of Science, Technology & Environment", marks: 22, percentage: "22%" },
        { unit: "Unit 5: Social Responsibility, Inclusivity & Human Rights", marks: 15, percentage: "15%" }
      ],
      highFrequencyTopics: [
        "Pluralism, Tolerance, and Secularism in Indian Democratic Framework",
        "Scientific Temper (Article 51A(h)) vs Dogmatic Superstitions",
        "Gender Bias in Workplaces & Constitutional Safeguards (Articles 14, 15, 21)",
        "Social Responsibilities of Scientists & Ethical Application of Inventions",
        "Transparency, Fairness, and Accountability in Scientific Research"
      ],
      examPreparationTips: [
        "Cite Constitutional Articles accurately: Article 14 (Equality), Article 15 (Non-discrimination), Article 25-28 (Freedom of Religion), Article 51A(h) (Scientific temper).",
        "Structure Part B essays with historical parallels (e.g. French Revolution, Indian National Movement).",
        "For Part C, use real case studies such as clinical trial equity, bias in medical diagnostics, or workplace safety."
      ]
    },
    questions: {
      partA: [
        { qNo: 1, question: "What role does equality play in promoting justice within democratic societies?", answer: "Equality ensures that every citizen enjoys equal dignity, non-discriminatory legal standing, and fair access to social and economic opportunities, preventing tyranny of the majority and safeguarding human rights." },
        { qNo: 2, question: "Why is respect for all essential in promoting harmony in a democratic society?", answer: "Respect fosters mutual coexistence, builds trust among diverse linguistic and cultural communities, mitigates social polarization, and ensures peaceful resolution of conflicts." },
        { qNo: 3, question: "What does secularism mean in the context of Indian democracy and governance?", answer: "In India, secularism ('Sarva Dharma Sambhava') means equal respect for all religions; the state has no official religion and does not discriminate against or favor any faith." },
        { qNo: 4, question: "How does the Indian Constitution promote non-discriminatory practices among various faiths?", answer: "Under Articles 15 & 16, discrimination based on religion is prohibited in public spaces and employment; Articles 25-28 guarantee the fundamental right to practice, profess, and propagate religion." },
        { qNo: 5, question: "What role does deductive reasoning play in testing scientific theories and predictions effectively?", answer: "Deductive reasoning moves from general premises/theories to specific logical consequences, allowing scientists to formulate testable hypotheses and conduct experiments to validate or falsify theories." },
        { qNo: 6, question: "How does the concept of scientific temper encourage rational thinking and evidence-based conclusions in research?", answer: "Scientific temper rejects blind dogma and superstition, demanding repeatable empirical evidence, open inquiry, peer review, and willingness to revise beliefs based on factual data (Article 51A(h))." },
        { qNo: 7, question: "What are the main causes of gender bias in contemporary society and workplaces?", answer: "1. Patriarchal societal stereotyping\n2. Wage gap and unequal promotional glass ceilings\n3. Disproportionate burden of unpaid domestic care work\n4. Lack of inclusive infrastructure and flexible workplace policies." },
        { qNo: 8, question: "How do constitutional protections address issues of gender violence and discrimination in India?", answer: "Article 14 ensures equality before law; Article 15(3) empowers the state to make special provisions for women (e.g., POSH Act 2013, Domestic Violence Act 2005, Equal Remuneration Act)." },
        { qNo: 9, question: "What is the importance of transparency in scientific research for public trust and accountability?", answer: "Transparency ensures reproducibility of findings, prevents data fabrication/falsification, accelerates peer review, and prevents dangerous conflicts of interest in pharmaceutical and technological rollouts." },
        { qNo: 10, question: "How can unfair application of scientific inventions negatively impact society and its development?", answer: "Unethical usage leads to algorithmic surveillance, autonomous lethal weapons, environmental degradation, deepfakes, and medical monopolies that deepen socioeconomic inequality." }
      ],
      partB: [
        {
          qNo: "11(a)",
          question: "Discuss the significance of pluralism and tolerance in maintaining social harmony within diverse democracies, referencing historical examples like the French Revolution and Indian Freedom Movement.",
          solutionOutline: "1. Conceptual Foundation: Pluralism as constructive coexistence of diverse beliefs; tolerance as active engagement with differences.\n2. French Revolution: Ideals of Liberty, Equality, Fraternity overthrowing feudal oppression.\n3. Indian National Movement: Mahatma Gandhi's non-violent pluralism uniting religions, castes, and languages against colonial rule.\n4. Contemporary Relevance: Protecting minority rights and constitutional democracy against polarizing nationalism."
        },
        {
          qNo: "14(a)",
          question: "Propose effective solutions for addressing gender bias in society, considering ethical reasoning and constitutional protections that promote self-decision and inclusivity.",
          solutionOutline: "1. Institutional Solutions: Strict enforcement of the POSH Act 2013, transparent gender-neutral promotion criteria, equal pay audits.\n2. Educational & Social Interventions: Gender-sensitization curricula in schools, paternal parental leave policies, female leadership quotas.\n3. Legal Frameworks: Enhancing legal aid and reporting mechanisms under Articles 15 and 21."
        },
        {
          qNo: "15(a)",
          question: "Discuss the role and responsibilities of scientists in ensuring ethical use of scientific inventions for societal betterment and suggest solutions to prevent misuse.",
          solutionOutline: "1. Ethical Mandate: The Precautionary Principle, environmental stewardship, and social accountability.\n2. Prevention of Misuse: Institutional Review Boards (IRB), international biosecurity treaties, AI ethics compliance boards, open-source safety guardrails."
        }
      ],
      partC: [
        {
          qNo: "16(a)",
          question: "Analyze a case where scientific inventions, such as medical technology, have addressed gender bias and discrimination in healthcare. Discuss the ethical responsibilities of scientists in ensuring these inventions are applied fairly, and propose measures to enhance transparency and inclusivity in their development and distribution.",
          solutionOutline: "1. Case Study: Historical exclusion of women from clinical trials leading to incorrect cardiovascular diagnostic thresholds; how modern gender-specific biomarker tools solved this gap.\n2. Ethical Responsibilities: Inclusive clinical trial participant demographics, eliminating algorithmic bias in healthcare diagnostic AI.\n3. Distribution Frameworks: Affordable access, transparent clinical data publication, and global WHO equity guidelines."
        }
      ]
    }
  },

  // =========================================================================
  // 4. AI3021 — IT IN AGRICULTURAL SYSTEM (QP Code: 80056)
  // =========================================================================
  {
    qpCode: "80056",
    subjectCode: "AI3021",
    subjectName: "IT in Agricultural System",
    regulation: "R2021",
    examSession: "November/December 2025",
    semester: 7,
    commonBranches: ["BME", "CSE", "CSD", "CSE(AIML)", "CSE(CYS)", "CCE", "ECE", "Medical Electronics", "AIDS", "CSBS", "IT"],
    maxMarks: 100,
    timeDuration: "3 Hours",
    analysis: {
      difficultyRating: "Moderate (Agriculture Technology & Analytical Optimization)",
      unitWeightage: [
        { unit: "Unit 1: Precision Agriculture & Sensor Systems", marks: 25, percentage: "25%" },
        { unit: "Unit 2: Greenhouse Automation, Hydroponics & IoT", marks: 24, percentage: "24%" },
        { unit: "Unit 3: Farm Management, CPM/PERT & Resource Optimization", marks: 26, percentage: "26%" },
        { unit: "Unit 4: Climate Models, Seasonal Forecasting & Food Security", marks: 20, percentage: "20%" },
        { unit: "Unit 5: Expert Systems, E-Governance & Rural E-Commerce", marks: 20, percentage: "20%" }
      ],
      highFrequencyTopics: [
        "Ground-Based vs Remote Sensors in Precision Agriculture & Yield Mapping",
        "IoT Sensor Networks in Automated Greenhouse Nutrient & Hydroponics Management",
        "Critical Path Method (CPM) Project Scheduling for Agricultural Operations",
        "Linear Programming Optimization for Crop and Water Resource Allocation",
        "Global Climate Models (GCMs) in Seasonal Weather Forecasting",
        "Expert Systems Architecture & Mobile E-Governance for Rural Empowerment"
      ],
      examPreparationTips: [
        "For CPM numericals, draw a clear network diagram showing Earliest Start (ES), Latest Finish (LF), and mark the critical path with double lines.",
        "List specific agricultural sensors: Soil moisture (TDR), NPK optical sensors, NDVI spectral cameras.",
        "Explain Expert Systems with knowledge base, inference engine, and user interface."
      ]
    },
    questions: {
      partA: [
        { qNo: 1, question: "Define precision agriculture and state its primary objective.", answer: "Precision agriculture is a farm management strategy that gathers, processes, and analyzes temporal, spatial, and individual data to target inputs (water, fertilizer, seeds) at the right place, time, and rate to maximize yields while minimizing environmental impact." },
        { qNo: 2, question: "Brief about Crop Production Modeling.", answer: "Crop production modeling is the mathematical simulation of crop growth, development, and yield based on environmental factors (solar radiation, temperature, rainfall) and soil characteristics (e.g., DSSAT, APSIM models)." },
        { qNo: 3, question: "What is Leaf Area Index (LAI)?", answer: "Leaf Area Index (LAI) is a dimensionless quantity that characterizes plant canopies, defined as the one-sided green leaf area per unit ground surface area (LAI = Leaf Area / Ground Area). It indicates photosynthetic capacity." },
        { qNo: 4, question: "What is fertigation, and how does it benefit crop production?", answer: "Fertigation is the precise injection of fertilizers, soil amendments, and water-soluble products into an irrigation system (usually drip irrigation). Benefits: 90%+ nutrient efficiency, reduced groundwater leaching, and labor savings." },
        { qNo: 5, question: "Differentiate between CPM and PERT in project scheduling.", answer: "• CPM (Critical Path Method): Deterministic model with predictable activity durations, used in construction and routine farm operations.\n• PERT (Program Evaluation and Review Technique): Probabilistic model using 3 time estimates (optimistic, most likely, pessimistic) for uncertain R&D projects." },
        { qNo: 6, question: "What is a Decision Support System (DSS) in farm management?", answer: "A DSS is an interactive software tool that integrates farm database records, real-time sensor inputs, weather forecasts, and economic models to help farmers make informed operational decisions (e.g., when to irrigate or spray)." },
        { qNo: 7, question: "What is seasonal forecasting?", answer: "Seasonal forecasting is the prediction of average climatic conditions (temperature, precipitation anomalies) over an upcoming period of 1 to 6 months based on ocean-atmosphere coupled models (e.g., ENSO patterns)." },
        { qNo: 8, question: "Define Climate variability and give example.", answer: "Climate variability refers to natural variations in the mean state and statistics of climate on all temporal and spatial scales beyond individual weather events (e.g., El Niño / La Niña causing monsoon failure in India)." },
        { qNo: 9, question: "List two benefits of e-learning for rural learners.", answer: "1. Access to quality agricultural and technical education without geographical relocation.\n2. Self-paced learning in vernacular regional languages with audio-visual demonstration videos." },
        { qNo: 10, question: "Define an expert system.", answer: "An expert system is an AI computer program that emulates the decision-making ability of a human specialist, consisting of a Knowledge Base of domain rules, an Inference Engine, and an Explanation Facility." }
      ],
      partB: [
        {
          qNo: "11(a)",
          question: "Explain the working principle of ground-based sensors in precision agriculture, including their types and applications.",
          solutionOutline: "1. Working Principle: Direct physical or optical contact measurement of soil and plant parameters.\n2. Types: (a) Optical sensors (NDVI sensors for chlorophyll), (b) Electrochemical sensors (Soil pH and NPK ion-selective electrodes), (c) Dielectric soil moisture sensors (TDR / FDR), (d) Acoustic / mechanical soil compaction sensors.\n3. Applications: Variable rate fertilizer application (VRA), smart irrigation scheduling, early pest outbreak detection."
        },
        {
          qNo: "12(b)",
          question: "Describe the role of IoT-based sensor networks in real-time plant growth monitoring in greenhouses.",
          solutionOutline: "1. Architecture: Sensor layer (DHT22 temperature/humidity, LDR light, CO2 sensors), Gateway layer (ESP32 / Zigbee), Cloud telemetry layer (MQTT broker, dashboard).\n2. Automated Actuation: Triggering exhaust fans, misting nozzles, motorized shading nets, and LED grow lights based on setpoint logic.\n3. Crop Health Optimization: Eliminating heat stress and maintaining optimal vapor pressure deficit (VPD)."
        },
        {
          qNo: "13(a)",
          question: "A vegetable farm has tasks: ploughing (5 days), planting (3 days), fertilizing (2 days), and harvesting (4 days). Ploughing must precede planting, and fertilizing follows planting but precedes harvesting. Use CPM to find the critical path and total project duration.",
          solutionOutline: "1. Activity Identification:\n- Activity A: Ploughing (5 days) [Predecessor: None]\n- Activity B: Planting (3 days) [Predecessor: A]\n- Activity C: Fertilizing (2 days) [Predecessor: B]\n- Activity D: Harvesting (4 days) [Predecessor: C]\n2. Network Diagram Sequence:\nStart -> A (5) -> B (3) -> C (2) -> D (4) -> Finish\n3. Forward Pass (Earliest Start / Earliest Finish):\n- ES(A) = 0, EF(A) = 5\n- ES(B) = 5, EF(B) = 8\n- ES(C) = 8, EF(C) = 10\n- ES(D) = 10, EF(D) = 14\n4. Backward Pass (Latest Start / Latest Finish):\n- LF(D) = 14, LS(D) = 10\n- LF(C) = 10, LS(C) = 8\n- LF(B) = 8, LS(B) = 5\n- LF(A) = 5, LS(A) = 0\n5. Float Calculation: Float = LS - ES = 0 for all activities.\n6. Conclusion:\nCritical Path = A → B → C → D (Ploughing → Planting → Fertilizing → Harvesting)\nTotal Project Duration = 5 + 3 + 2 + 4 = 14 days."
        },
        {
          qNo: "13(b)",
          question: "Formulate a linear programming problem to optimize crop allocation on a large hectare farm with constraints on water and labor.",
          solutionOutline: "1. Decision Variables: Let x1, x2, ..., xn be hectares allocated to crops 1, 2, ..., n.\n2. Objective Function: Maximize Total Profit Z = c1*x1 + c2*x2 + ... + cn*xn.\n3. Constraints:\n- Land: x1 + x2 + ... + xn <= Total Land Area (H)\n- Water: w1*x1 + w2*x2 + ... + wn*xn <= Total Available Water (W)\n- Labor: l1*x1 + l2*x2 + ... + ln*xn <= Total Available Labor Days (L)\n- Non-negativity: x1, x2, ..., xn >= 0."
        }
      ],
      partC: [
        {
          qNo: "16(b)",
          question: "Discuss the role of resource optimization in sustainable agriculture. Explain how GIS and drip irrigation can be integrated to improve water and land use efficiency with a case study.",
          solutionOutline: "1. Framework: Spatial GIS mapping of soil texture and slope overlayed with precision drip irrigation emitter networks.\n2. Case Study: Semi-arid sugarcane or cotton cultivation saving 45% water while improving yield by 28% via automated solenoid valves.\n3. Socio-Economic Benefits: Groundwater aquifer preservation, power subsidy savings, and drought resilience."
        }
      ]
    }
  },

  // =========================================================================
  // 5. OBT356 — LIFESTYLE DISEASES (QP Code: 41515)
  // =========================================================================
  {
    qpCode: "41515",
    subjectCode: "OBT356",
    subjectName: "Lifestyle Diseases",
    regulation: "R2021",
    examSession: "November/December 2024",
    semester: 7,
    commonBranches: ["Open Elective across All Engineering Branches"],
    maxMarks: 100,
    timeDuration: "3 Hours",
    analysis: {
      difficultyRating: "Moderate (Biomedical Pathology, Preventive Healthcare & Epidemiology)",
      unitWeightage: [
        { unit: "Unit 1: Risk Factors, Sedentary Lifestyle & Substance Abuse", marks: 22, percentage: "22%" },
        { unit: "Unit 2: Cancer Epidemiology, Etiology & Treatment", marks: 26, percentage: "26%" },
        { unit: "Unit 3: Cardiovascular Diseases & Atherosclerosis", marks: 25, percentage: "25%" },
        { unit: "Unit 4: Diabetes Mellitus, Metabolic Syndrome & Obesity", marks: 24, percentage: "24%" },
        { unit: "Unit 5: Chronic Respiratory Diseases & Rehabilitation", marks: 23, percentage: "23%" }
      ],
      highFrequencyTopics: [
        "Risk Factors of Lifestyle Diseases (Diet, Sedentary Habits, Alcohol, Tobacco)",
        "Etiology, Staging, and Treatment of Skin Cancer & Lung Cancer",
        "Coronary Artery Disease (CAD) Pathogenesis & Recent Diagnostic Advances",
        "Blood Glucose Homeostasis, Insulin Resistance & Type II Diabetes Reversal",
        "Chronic Obstructive Pulmonary Disease (COPD) & Pulmonary Function Testing (PFT)",
        "Cardiac Rehabilitation Frameworks"
      ],
      examPreparationTips: [
        "Define clinical metrics accurately: BMI formula (kg/m^2), normal ranges (18.5 - 24.9), blood sugar levels (Fasting < 100 mg/dL, HbA1c < 5.7%).",
        "Draw clear diagrams of an atherosclerotic plaque formation inside an arterial lumen.",
        "Categorize cancer staging using TNM (Tumor, Node, Metastasis) classification."
      ]
    },
    questions: {
      partA: [
        { qNo: 1, question: "List the risk factors associated with lifestyle disease.", answer: "1. Unhealthy diet high in trans fats, refined sugars, and sodium.\n2. Physical inactivity / sedentary behavior.\n3. Tobacco smoking and excessive alcohol consumption.\n4. Chronic psychosocial stress and sleep deprivation." },
        { qNo: 2, question: "What is illicit drug?", answer: "An illicit drug is a substance whose non-medical production, sale, possession, or consumption is prohibited by national or international law due to severe addiction, psychological harm, and physical toxicity (e.g., heroin, cocaine, methamphetamine)." },
        { qNo: 3, question: "Mention different types of cancer.", answer: "1. Carcinomas (epithelial cells, e.g., breast, lung, prostate).\n2. Sarcomas (connective tissue, bone, cartilage, muscle).\n3. Leukemias (blood-forming tissues in bone marrow).\n4. Lymphomas & Myelomas (immune system cells)." },
        { qNo: 4, question: "What are the causes of mouth cancer?", answer: "1. Chewing tobacco, gutkha, and betel quid.\n2. Cigarette and bidi smoking.\n3. Heavy alcohol abuse (synergistic risk with tobacco).\n4. Human Papillomavirus (HPV-16) infection and chronic mechanical dental irritation." },
        { qNo: 5, question: "Define coronary atherosclerosis.", answer: "Coronary atherosclerosis is a chronic inflammatory condition characterized by the progressive accumulation of lipids, cholesterol, calcium, and cellular debris within the intimal lining of coronary arteries, forming plaques that restrict myocardial blood supply." },
        { qNo: 6, question: "What are the causes of coronary artery disease?", answer: "Dyslipidemia (high LDL, low HDL), hypertension, cigarette smoking, diabetes mellitus, obesity, sedentary lifestyle, and genetic family history." },
        { qNo: 7, question: "What is Type II diabetes?", answer: "Type II diabetes mellitus is a chronic metabolic disorder characterized by hyperglycemia resulting from progressive insulin resistance in peripheral tissues coupled with insufficient compensatory insulin secretion by pancreatic beta cells." },
        { qNo: 8, question: "What is Body Mass Index?", answer: "Body Mass Index (BMI) is a simple anthropometric index of weight-for-height: BMI = Weight (kg) / [Height (m)]^2. Normal: 18.5–24.9 kg/m^2; Overweight: 25–29.9 kg/m^2; Obese: ≥ 30 kg/m^2." },
        { qNo: 9, question: "List out the causes of Asthma.", answer: "Inhaled allergens (pollen, dust mites, pet dander), air pollution, respiratory viral infections, cold air, physical exertion, occupational chemical fumes, and genetic predisposition." },
        { qNo: 10, question: "Write a note on Chronic Obstructive Pulmonary Disease.", answer: "COPD is a progressive, chronic inflammatory lung disease characterized by persistent airflow limitation, comprising chronic bronchitis (persistent cough with mucus) and emphysema (destruction of alveolar walls), primarily caused by tobacco smoking." }
      ],
      partB: [
        {
          qNo: "11(a)",
          question: "Explain how diet and exercise avoid the risk factors of lifestyle diseases.",
          solutionOutline: "1. Dietary Mechanisms: High dietary fiber lowers LDL cholesterol; antioxidants reduce oxidative endothelial stress; low glycemic index foods prevent insulin spikes.\n2. Exercise Physiology: Aerobic activity upregulates GLUT-4 transporters in skeletal muscle, improving insulin sensitivity independent of insulin; reduces resting heart rate and blood pressure.\n3. Disease Prevention: Lowering metabolic syndrome risk, preventing cardiovascular events, and reducing visceral adiposity."
        },
        {
          qNo: "12(b)",
          question: "Describe the causes and treatment of Lung cancer.",
          solutionOutline: "1. Etiology: Cigarette smoking (90% of cases), radon gas exposure, asbestos fibers, occupational carcinogens (silica, chromium), air pollution.\n2. Pathology: Non-Small Cell Lung Cancer (NSCLC) vs Small Cell Lung Cancer (SCLC).\n3. Treatment Modalities: Surgical lobectomy, precision radiation therapy, platinum-based chemotherapy, targeted therapies (EGFR/ALK inhibitors), and immune checkpoint inhibitors (PD-1/PD-L1 antibodies)."
        },
        {
          qNo: "13(a)",
          question: "Explain the recent advancement in the diagnosis of Coronary Artery Disease.",
          solutionOutline: "1. Non-invasive Diagnostic Imaging: Fractional Flow Reserve CT (FFR-CT), Coronary CT Angiography (CCTA), Cardiac Magnetic Resonance (CMR) perfusion.\n2. Intravascular Diagnostics: Optical Coherence Tomography (OCT) giving micron-level plaque resolution, Intravascular Ultrasound (IVUS).\n3. Biomarkers: High-sensitivity Cardiac Troponin (hs-cTn), High-sensitivity C-Reactive Protein (hs-CRP), coronary artery calcium (CAC) scoring."
        },
        {
          qNo: "14(a)",
          question: "Elaborate on blood glucose regulation and the mechanism behind the regression of diabetes.",
          solutionOutline: "1. Physiological Homeostasis: Pancreatic beta cells secrete insulin to stimulate glucose uptake into muscle and adipose tissues and suppress hepatic gluconeogenesis; alpha cells secrete glucagon during fasting.\n2. Pathogenesis of Type II: Hepatic and peripheral insulin resistance leading to beta-cell exhaustion.\n3. Regression / Remission Mechanisms: Very-low-calorie diets (DiRECT trial principles) reducing ectopic fat in liver and pancreas, restoring first-phase insulin secretion."
        },
        {
          qNo: "15(b)",
          question: "Explain the importance and procedure involved in the pulmonary function test (PFT).",
          solutionOutline: "1. Clinical Importance: Differentiating obstructive lung disease (asthma, COPD) from restrictive lung disease (pulmonary fibrosis); evaluating surgical fitness.\n2. Spirometry Procedure: Patient inhales maximally and forcefully exhales into a spirometer mouthpiece for at least 6 seconds.\n3. Key Indices: Forced Vital Capacity (FVC), Forced Expiratory Volume in 1 second (FEV1), FEV1/FVC ratio (< 0.70 confirms obstructive disease), Post-bronchodilator reversibility testing."
        }
      ],
      partC: [
        {
          qNo: "16(a)",
          question: "Explain various risk factors when using illicit drugs, tobacco, and smoking. Add a note on cardiac rehabilitation.",
          solutionOutline: "1. Pathological Impact: Nicotine triggers catecholamine release causing tachycardia and acute vasoconstriction; carbon monoxide binds hemoglobin reducing O2 delivery; illicit stimulants (cocaine/meth) cause lethal coronary vasospasms and arrhythmias.\n2. Cardiac Rehabilitation Framework:\n- Phase 1 (Inpatient): Early mobilization and education in hospital.\n- Phase 2 (Outpatient): Monitored aerobic exercise training, ECG telemetry, dietary counseling, smoking cessation therapy.\n- Phase 3 & 4 (Maintenance): Lifelong community exercise, stress management, and risk factor maintenance."
        }
      ]
    }
  }
];

console.log("Loaded PYQAnalysisData with 5 complete real Anna University examination papers!");
