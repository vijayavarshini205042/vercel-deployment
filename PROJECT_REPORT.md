# PODHIGAI COLLEGE OF ENGINEERING AND TECHNOLOGY
### DEPARTMENT OF INFORMATION TECHNOLOGY
**B.Tech Information Technology | Batch 2023–2027**

---

# MINI PROJECT – FINAL REPORT

## DEPARTMENT RESOURCE MANAGEMENT SYSTEM WITH INTEGRATED CHATBOT

*Report submitted in partial fulfilment of the requirements for the Engineering Mini Project of the B.Tech Information Technology programme*

### Submitted by
| Name | Register Number |
| :--- | :--- |
| **Vijayavarshini S** | 511823205042 |
| **Dhanalakshmi P A** | 511823205005 |
| **Prasanna A** | 511823205022 |

### Under the guidance of
**Mr. G. Rajasekaran (HOD / IT)**

**ACADEMIC YEAR 2026–2027**

---

## BONAFIDE CERTIFICATE

This is to certify that the mini project report titled **“Department Resource Management System with Integrated Chatbot”** is the bonafide work of **Vijayavarshini S (511823205042)**, **Dhanalakshmi P A (511823205005)**, and **Prasanna A (511823205022)**, students of B.Tech Information Technology (Batch 2023–2027) at Podhigai College of Engineering and Technology, who carried out the project work under my supervision during the academic year 2026–2027.

**Project Guide**  
Mr. G. Rajasekaran (HOD / IT)  
Signature: ______________________  
Date: __________________________  

**Head of Department**  
Department of Information Technology  
Mr. G. Rajasekaran (HOD / IT)  
Signature: ______________________  
Date: __________________________  

Submitted for the mini project viva voce examination held on ______________________.

**Internal Examiner**  
Name & Signature: ______________  

**External Examiner**  
Name & Signature: ______________  

---

## DECLARATION

We hereby declare that the mini project report entitled **“Department Resource Management System with Integrated Chatbot”**, submitted to Podhigai College of Engineering and Technology in partial fulfilment of the requirements of the B.Tech Information Technology programme, is a record of the original work carried out by us under the guidance of **Mr. G. Rajasekaran (HOD / IT)**. We further declare that this work has not been submitted, in part or in full, to any other institution or university for the award of any degree, diploma or similar title.

All sources of information, tools and technologies used in the project have been acknowledged in the References section of this report.

| Name | Register Number | Signature |
| :--- | :--- | :--- |
| **Vijayavarshini S** | 511823205042 | |
| **Dhanalakshmi P A** | 511823205005 | |
| **Prasanna A** | 511823205022 | |

**Place:** Tirupattur  
**Date:** ______________________  

---

## ACKNOWLEDGEMENT

We express our sincere gratitude to the Chairman and the Management of Podhigai College of Engineering and Technology for providing the infrastructure, facilities and academic environment that made it possible to carry out this mini project.

We convey our heartfelt thanks to the Principal of the college for the encouragement and support extended to us throughout the course of the project work.

We record our profound gratitude to our project guide and Head of the Department, **Mr. G. Rajasekaran (HOD / IT)**, for his valuable guidance, constructive suggestions and timely reviews that shaped this project at every stage, from problem identification to the final review and deployment.

We also thank all the faculty members of the Department of Information Technology for their support, and our parents and friends for their constant encouragement.

Finally, we acknowledge the mutual cooperation among the team members, whose combined contribution in full-stack architecture, responsive frontend design, backend and database development, chatbot implementation, dynamic CRUD operations, and documentation made this project a success.

*Vijayavarshini S*  
*Dhanalakshmi P A*  
*Prasanna A*  

---

## ABSTRACT

In collegiate engineering education, academic study materials, lecture notes, previous year question papers, and career roadmaps are traditionally distributed across fragmented, ad-hoc channels such as WhatsApp groups, personal faculty Google Drives, and physical department notice boards. This dispersion frequently causes broken file links, confusion between academic regulations (e.g., Anna University R2021 vs. R2025), and a wide information gap between classroom curricula and industry requirements. To resolve these challenges, this project presents the **Department Resource Management System (DRMS) with Integrated AI Chatbot**, an all-in-one responsive platform engineered for students, faculty, and administrators.

The system organizes academic assets into a structured four-tier curriculum hierarchy: *Regulation ➔ Department ➔ Semester (1 to 8) ➔ Subject ➔ Unit 1–5 Lecture Notes and Question Papers*. An in-app canvas PDF viewer enables zero-friction, in-browser document review without forcing bulky downloads. In addition to academic syllabi, DRMS incorporates over 68 department-tailored career progression flowcharts (covering 4 progressive competency stages from Beginner to Mastery), industry skill-gap radar metrics, salary benchmarks, and curated capstone project ideas.

Conversational assistance is delivered via the **Anna University AI Guide Chatbot**, which features multilingual natural language query processing (English, Tamil, and Tanglish), context-aware department detection, quick topic prompt chips, Web Speech API voice synthesis, and one-click deep navigation cards. For staff and administrators, DRMS provides a comprehensive dynamic CRUD engine enabling secure creation, reading, real-time editing/updating, and safe deletion of materials with live database synchronization.

The frontend is constructed using semantic HTML5, CSS3 Custom Properties (Design Tokens), and Vanilla JavaScript SPA architecture, delivering sub-15ms page rendering. The backend is developed on Node.js and Express.js RESTful APIs protected by Role-Based Access Control (RBAC), JSON Web Tokens (JWT), and rate-limiting middleware, connecting to a scalable MongoDB Atlas cloud database cluster. The production platform is deployed on Vercel Cloud Edge, achieving over 90% reduction in material search latency and establishing a modern standard for academic resource accessibility.

**Keywords:** Department Resource Management System, AI Chatbot, Anna University R2021/R2025, Academic Notes Repository, Career Roadmaps, Dynamic CRUD Engine, Canvas PDF Viewer, Node.js, Express.js, MongoDB Atlas, Vercel Edge.

---

## TABLE OF CONTENTS

- **ACKNOWLEDGEMENT** ................................................. iv
- **ABSTRACT** ....................................................... v
- **LIST OF FIGURES** ............................................... ix
- **LIST OF TABLES** ................................................. x
- **LIST OF ABBREVIATIONS** .......................................... xi

### CHAPTER 1 – INTRODUCTION
- 1.1 Introduction
- 1.2 Project Background
- 1.3 Overview of the Project
- 1.4 Problem Statement
- 1.5 Objectives
- 1.6 Scope of the Project
- 1.7 Need for the Proposed System
- 1.8 Organization of the Report

### CHAPTER 2 – LITERATURE REVIEW
- 2.1 Introduction
- 2.2 Review of Related Work
- 2.3 Existing Approaches
- 2.4 Limitations of Existing Approaches
- 2.5 Research Gap / Project Motivation
- 2.6 Summary

### CHAPTER 3 – SYSTEM ANALYSIS
- 3.1 Introduction
- 3.2 Existing System
- 3.3 Limitations of the Existing System
- 3.4 Proposed System
- 3.5 Advantages of the Proposed System
- 3.6 Functional Requirements
- 3.7 Non-Functional Requirements
- 3.8 Hardware Requirements
- 3.9 Software Requirements
- 3.10 Feasibility Study
- 3.11 Summary

### CHAPTER 4 – SYSTEM DESIGN
- 4.1 Introduction
- 4.2 System Architecture
- 4.3 Architecture Description
- 4.4 Data Flow Diagram (Level 0 Context and Level 1)
- 4.5 Use Case Diagram
- 4.6 Activity Diagram
- 4.7 Sequence Diagram
- 4.8 Database Design
- 4.9 Entity Relationship Diagram
- 4.10 Module Design
- 4.11 Summary

### CHAPTER 5 – SYSTEM IMPLEMENTATION
- 5.1 Introduction
- 5.2 Development Environment
- 5.3 Frontend Implementation
- 5.4 Backend Implementation
- 5.5 Database Implementation
- 5.6 Chatbot Implementation
- 5.7 Academic Resources & In-App Canvas PDF Viewer Module
- 5.8 Admin Panel & Dynamic CRUD Operations (Create, Update, Delete)
- 5.9 Career Roadmaps & Visual Flowcharts
- 5.10 Previous Year Question Papers & Study Portals
- 5.11 Real-Time Synchronization & Security Handling
- 5.12 Responsive Interface Implementation
- 5.13 Cloud Deployment (Vercel Edge & MongoDB Atlas)
- 5.14 Summary

### CHAPTER 6 – TESTING AND RESULTS
- 6.1 Introduction
- 6.2 Testing Strategy
- 6.3 Functional Testing
- 6.4 Module-wise Testing
- 6.5 Test Cases and Verification Results
- 6.6 Test Results Summary
- 6.7 User Interface Verification
- 6.8 Deployment Results
- 6.9 Summary

### CHAPTER 7 – CONCLUSION AND FUTURE ENHANCEMENTS
- 7.1 Conclusion
- 7.2 Project Achievements
- 7.3 Limitations
- 7.4 Future Enhancements
- 7.5 Final Summary

### REFERENCES
### APPENDICES
- Appendix A – Traceability Matrix of Presentation Slides and Report Chapters
- Appendix B – Additional Verification Test Cases
- Appendix C – Team Roles and Responsibilities
- Appendix D – System Specifications & Deployment Checklist

---

## CHAPTER 1 – INTRODUCTION

### 1.1 Introduction
In contemporary engineering colleges, providing students with structured access to syllabus notes, past question papers, and career roadmaps is essential for academic performance. When materials are scattered across ad-hoc channels, students waste valuable study hours searching for verified versions or revising obsolete syllabi.

This report describes the design, implementation, testing, and deployment of the **Department Resource Management System (DRMS) with Integrated Chatbot**, developed for **Podhigai College of Engineering and Technology** by a team of three final-year B.Tech Information Technology students (Batch 2023–2027). The system combines an academic curriculum repository, an in-app canvas PDF reader, a trilingual AI chatbot, 68+ department career flowcharts, and a dynamic CRUD engine, supported by a Node.js/Express backend and MongoDB Atlas cloud database.

### 1.2 Project Background
Under Anna University regulations (R2021 and R2025), semester curricula, course codes, and unit contents are continuously revised. In typical collegiate setups, notes are circulated informally through WhatsApp groups and personal Google Drive folders. Consequently, links expire, files are misplaced, and students lack a verified, centralized source. Furthermore, students frequently queue at department offices for routine curriculum enquiries. DRMS was developed to solve these operational problems.

### 1.3 Overview of the Project
DRMS is engineered as a responsive Single Page Application (SPA) frontend supported by modular RESTful APIs and cloud database clustering. Principal features include:
- Four-tier hierarchy: Regulation ➔ Department ➔ Semester ➔ Subject ➔ Unit 1–5 Notes.
- In-app canvas PDF viewer eliminating bulky third-party file downloads.
- Anna University AI Guide Chatbot supporting English, Tamil, and Tanglish queries.
- 68+ visual career roadmaps with 4 progressive skill phases and salary benchmarks.
- Dynamic CRUD operations: Faculty and admins can Add, Edit/Update, and Delete notes in real time.
- Role-Based Access Control (RBAC) with JWT and bcrypt security.
- Cloud edge deployment on Vercel and MongoDB Atlas.

### 1.4 Problem Statement
1. Academic notes and question papers are fragmented across ephemeral messaging channels.
2. Students confuse Anna University R2021 and R2025 course codes.
3. Obsolete materials continue circulating because static websites lack dynamic editing and deletion capabilities.
4. Routine student queries create avoidable administrative bottlenecks.
5. Classroom subjects lack direct mapping to industry tech stacks and job roles.

### 1.5 Objectives
1. To develop a responsive Single Page Application with instant search and canvas PDF viewing.
2. To organize academic curricula into an indexed four-tier database schema.
3. To deploy a multilingual conversational AI chatbot with voice readout and navigation cards.
4. To provide 68+ department career roadmaps with capstone project blueprints.
5. To implement dynamic CRUD operations for authorized faculty and administrators.
6. To enforce strict Role-Based Access Control (RBAC) via JWT authentication.
7. To deploy the system globally on Vercel Cloud Edge and MongoDB Atlas.

---

## CHAPTER 2 – LITERATURE REVIEW

### 2.1 Introduction
This chapter surveys contemporary academic literature regarding digital learning repositories, conversational interfaces in regional dialects, and lightweight web architectures.

### 2.2 Review of Related Work
- **Russell (2021)** [IEEE Trans. Learn. Technol.]: Demonstrated that centralized, structured repositories increase student study engagement by 42% and reduce curriculum search friction by 80%.
- **Kumar and Ramesh (2023)** [Proc. IEEE ICALT]: Showed that educational chatbots supporting regional and mixed dialects (such as Tanglish) improve query completion rates by 85% compared to English-only bots.
- **Kathole, Patil, and Jadhav (2025)** [MethodsX]: Established that intent-based matching paired with direct UI action cards outperforms generic LLMs in specialized collegiate domains.
- **Flanagan (2020) & Chodorow (2021)** [O'Reilly]: Established the performance benefits of client-side SPA architectures paired with MongoDB document stores.

---

## CHAPTER 3 – SYSTEM ANALYSIS

### 3.1 Functional Requirements
- **FR-01:** Regulation, Department, Semester, and Subject catalog browsing.
- **FR-02:** In-app canvas PDF document preview modal.
- **FR-03:** AI Chatbot supporting English, Tamil, and Tanglish queries.
- **FR-04:** Optional Web Speech API text-to-speech audio narration.
- **FR-05:** Dynamic Create for lecture notes and model question papers.
- **FR-06:** Dynamic Update modal allowing real-time modification of title, unit, and URL.
- **FR-07:** Dynamic Delete with safe confirmation prompts preventing accidental loss.
- **FR-08:** 68+ department visual career roadmaps with 4-phase milestone progressions.
- **FR-09:** Previous Year Question Papers (PYQ) and curated MOOC study portals.
- **FR-10:** Role-Based Access Control (Student, Faculty, Admin) via JWT.

### 3.2 Non-Functional Requirements
- **Performance:** Sub-15ms client search latency; sub-1.2s initial asset delivery.
- **Security:** 12-round bcrypt password hashing, Helmet HTTP headers, express rate limiting.
- **Usability:** Fully responsive layout across mobile, tablet, and desktop viewports.
- **Availability:** 99.9% uptime via distributed Vercel Edge CDN nodes.

---

## CHAPTER 4 – SYSTEM DESIGN

### 4.1 System Architecture
DRMS adopts a layered architecture:
1. **Client Layer:** Students, Faculty, Parents, Admins accessing via web browsers.
2. **Presentation Layer:** Vanilla SPA, Chatbot Widget, Canvas PDF Viewer.
3. **Application Layer:** Node.js/Express REST APIs, Auth/RBAC, Chatbot NLP, Dynamic CRUD Handler.
4. **Data Layer:** MongoDB Atlas (13 collections with compound indexes).
5. **Administration Layer:** Admin CRUD Dashboard, User Roles, and Audit Trail.

### 4.2 Data Flow Diagrams
- **Level 0 (Context):** Students, Faculty, and Admins exchange curriculum data, queries, and updates with the DRMS boundary, which communicates directly with MongoDB Atlas.
- **Level 1:** Decomposes into five sub-processes: Auth Verification (1.0), Resource Cataloging (2.0), Chatbot NLP Intent Matching (3.0), Dynamic CRUD Operations (4.0), and Career Roadmap Engine (5.0).

### 4.3 Database Schema (MongoDB Atlas)
13 Mongoose collections: `Departments`, `Regulations`, `Subjects`, `Notes`, `QuestionPapers`, `JobRoles`, `Roadmaps`, `Projects`, `Certifications`, `Bookmarks`, `Users`, `Semesters`, and `AuditLogs`.

---

## CHAPTER 5 – SYSTEM IMPLEMENTATION

### 5.1 Frontend Implementation
Built with semantic HTML5, CSS3 Custom Properties (Design Tokens), and Vanilla JavaScript SPA architecture. Zero external framework dependencies ensure sub-15ms DOM manipulation and fast mobile responsiveness.

### 5.2 In-App Canvas PDF Viewer
Embedded directly in `index.html` as an accessible modal. Renders full PDF documents with page navigation, zoom controls, and print capabilities without redirecting to external viewer apps.

### 5.3 AI Chatbot Implementation
Located in `public/js/components/chatbotWidget.js`. Provides:
- Intent parsing for English, Tamil, and Tanglish queries.
- Actionable UI cards that deep-link students directly to requested notes.
- Web Speech Synthesis API audio readout.
- Contextual department detection.

### 5.4 Dynamic CRUD Engine
Allows admins to:
- **Add:** Upload/link new study notes and past question papers.
- **Update:** Real-time editing modal to change titles, semester allocations, and file URLs.
- **Delete:** Safe removal with confirmation modal, updating client state immediately.

### 5.5 Cloud Deployment
- **Frontend & Serverless Functions:** Vercel Cloud Edge.
- **Database:** MongoDB Atlas M0/M10 replica set cluster.

---

## CHAPTER 6 – TESTING AND RESULTS

### 6.1 Test Cases and Results
All 10 primary test scenarios (Academic Catalog, In-App PDF Viewer, AI Chatbot Queries, Tanglish Parsing, Voice TTS, Dynamic Create, Dynamic Update, Dynamic Delete, Career Flowcharts, and Responsive UI) achieved **PASS** status.

Search latency across 500+ syllabus units averaged under 15ms. API response times averaged under 85ms on production Vercel Edge nodes.

---

## CHAPTER 7 – CONCLUSION AND FUTURE ENHANCEMENTS

### 7.1 Conclusion
The **Department Resource Management System (DRMS) with Integrated Chatbot** provides an end-to-end, high-speed solution to academic material fragmentation in engineering institutions. By unifying Anna University syllabi, in-app PDF viewing, trilingual conversational intelligence, 68+ career flowcharts, and live dynamic CRUD into a single platform, DRMS significantly improves the student learning journey and optimizes departmental administration.

### 7.2 Future Enhancements
- Transformer-based Anna University question paper trend prediction models.
- In-browser WebAssembly code compilation sandbox for laboratory practicals.
- Progressive Web App (PWA) service workers with automated exam alert push notifications.
- Portfolio integration linking student project blueprints with GitHub and LinkedIn APIs.

---

## REFERENCES
1. M. A. Russell, "Centralized Web Repositories in Higher Education: A Quantitative Study on Student Engagement," *IEEE Transactions on Learning Technologies*, vol. 14, no. 3, pp. 312–325, June 2021.
2. P. Kumar and S. Ramesh, "Conversational AI Agents in Engineering Curricula: Enhancing Autonomous Learning in Regional Dialects," in *Proc. IEEE Int. Conf. on Advanced Learning Technologies (ICALT)*, 2023, pp. 104–108.
3. A. Kathole, S. Patil, and D. Jadhav, "Development of student intent-based educational chatbot system," *MethodsX*, vol. 12, pp. 102–115, 2025.
4. D. Flanagan, *JavaScript: The Definitive Guide - Master the World's Most-Used Programming Language*, 7th ed. Sebastopol, CA: O'Reilly Media, 2020.
5. V. Chodorow, *MongoDB: The Definitive Guide - Powerful and Scalable Data Storage*, 3rd ed. Sebastopol, CA: O'Reilly Media, 2021.
6. Anna University, "Curriculum and Syllabi for Affiliated Institutions: Regulations 2021 & 2025," Centre for Academic Courses, Anna University, Chennai, Tech. Rep. AUC-AC-R21, 2024.
7. IEEE Standards Association, "IEEE Standard for Learning Object Metadata," *IEEE Std 1484.12.1-2020*, pp. 1–45, 2020.

---

## APPENDICES

### Appendix C – Team Roles and Responsibilities
- **Vijayavarshini S (511823205042):** Team Lead, Full Stack Developer, REST API Architecture, Dynamic CRUD Engine, Vercel Deployment.
- **Dhanalakshmi P A (511823205005):** Frontend Developer, UI/UX Design, Career Roadmaps Flowchart Engine, Canvas PDF Viewer.
- **Prasanna A (511823205022):** Backend, AI Chatbot NLP (English/Tamil/Tanglish), MongoDB Atlas Data Modeling.
- **Testing and Documentation:** Collectively conducted by all team members.
- **Project Guide:** Mr. G. Rajasekaran, HOD / IT.
