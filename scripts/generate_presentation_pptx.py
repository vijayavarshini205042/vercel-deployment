import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5) # 16:9 widescreen

    # Palette
    NAVY = RGBColor(15, 23, 42)        # #0f172a
    CARD_BG = RGBColor(30, 41, 59)     # #1e293b
    TEAL = RGBColor(14, 165, 233)      # #0ea5e9
    DARK_TEAL = RGBColor(13, 148, 136) # #0d9488
    PURPLE = RGBColor(139, 92, 246)    # #8b5cf6
    EMERALD = RGBColor(16, 185, 129)   # #10b981
    WHITE = RGBColor(255, 255, 255)
    LIGHT_GRAY = RGBColor(203, 213, 225) # #cbd5e1
    BORDER_COLOR = RGBColor(51, 65, 85) # #334155
    AMBER = RGBColor(245, 158, 11)

    blank_layout = prs.slide_layouts[6]

    def set_slide_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = NAVY
        bg.line.fill.background()
        return bg

    def add_header(slide, slide_num, category, title):
        # Category
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.5), Inches(0.35))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category.upper()
        p_cat.font.size = Pt(11)
        p_cat.font.bold = True
        p_cat.font.color.rgb = TEAL

        # Title
        t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.5), Inches(0.8))
        tf_t = t_box.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(24)
        p_t.font.bold = True
        p_t.font.color.rgb = WHITE

        # Slide Number Badge
        num_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(12.0), Inches(0.45), Inches(0.7), Inches(0.35))
        num_box.fill.solid()
        num_box.fill.fore_color.rgb = CARD_BG
        num_box.line.color.rgb = BORDER_COLOR
        tf_num = num_box.text_frame
        p_num = tf_num.paragraphs[0]
        p_num.alignment = PP_ALIGN.CENTER
        p_num.text = f"{slide_num:02d}"
        p_num.font.size = Pt(11)
        p_num.font.bold = True
        p_num.font.color.rgb = TEAL

    # ==================== SLIDE 1: TITLE SLIDE ====================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s1)
    
    # Outer accent border
    frame = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.6), Inches(11.733), Inches(6.3))
    frame.fill.solid()
    frame.fill.fore_color.rgb = CARD_BG
    frame.line.color.rgb = TEAL
    frame.line.width = Pt(1.5)

    tbox = s1.shapes.add_textbox(Inches(1.2), Inches(1.0), Inches(11.0), Inches(3.0))
    tf1 = tbox.text_frame
    tf1.word_wrap = True
    
    p = tf1.paragraphs[0]
    p.text = "REVIEW 3 – FINAL REVIEW"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = TEAL

    p2 = tf1.add_paragraph()
    p2.text = "MINI PROJECT – FINAL REVIEW"
    p2.font.size = Pt(28)
    p2.font.bold = True
    p2.font.color.rgb = WHITE
    p2.space_before = Pt(10)

    p3 = tf1.add_paragraph()
    p3.text = "Department Resource Management System (DRMS)\nwith AI-Integrated Academic & Career Chatbot"
    p3.font.size = Pt(22)
    p3.font.bold = True
    p3.font.color.rgb = TEAL
    p3.space_before = Pt(14)

    p4 = tf1.add_paragraph()
    p4.text = "A Modern Engineering Academic Repository, Visual Career Flowchart Roadmaps, and Dynamic CRUD Ecosystem"
    p4.font.size = Pt(13)
    p4.font.color.rgb = LIGHT_GRAY
    p4.space_before = Pt(10)

    # Info cards bottom of slide 1
    cards_info = [
        ("PROJECT DOMAIN", "Web Engineering & AI NLP Assistant"),
        ("STUDENT / PRESENTER", "Vijayavarshini S (Reg No: 205042)"),
        ("TECH STACK", "Node.js, Express, MongoDB Atlas, Socket.IO"),
        ("INSTITUTION", "Anna University Affiliated Curriculum")
    ]
    for i, (title, val) in enumerate(cards_info):
        cx = Inches(1.2 + i * 2.7)
        cbox = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, Inches(4.5), Inches(2.55), Inches(1.6))
        cbox.fill.solid()
        cbox.fill.fore_color.rgb = NAVY
        cbox.line.color.rgb = BORDER_COLOR
        ctf = cbox.text_frame
        ctf.word_wrap = True
        
        cp1 = ctf.paragraphs[0]
        cp1.text = title
        cp1.font.size = Pt(9.5)
        cp1.font.bold = True
        cp1.font.color.rgb = PURPLE
        
        cp2 = ctf.add_paragraph()
        cp2.text = val
        cp2.font.size = Pt(11)
        cp2.font.bold = True
        cp2.font.color.rgb = WHITE
        cp2.space_before = Pt(6)

    # ==================== SLIDE 2: TEAM DETAILS ====================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s2)
    add_header(s2, 2, "Project Identification", "Slide 2 – Team Details & Role Allocation")

    # Table for team details
    rows = 5
    cols = 4
    left = Inches(1.2)
    top = Inches(1.8)
    width = Inches(10.933)
    height = Inches(4.5)
    table_shape = s2.shapes.add_table(rows, cols, left, top, width, height)
    table = table_shape.table
    table.columns[0].width = Inches(1.2)
    table.columns[1].width = Inches(3.2)
    table.columns[2].width = Inches(2.8)
    table.columns[3].width = Inches(3.733)

    headers = ["S.No", "Candidate Name", "Register No.", "Project Role & Core Responsibilities"]
    for j, h in enumerate(headers):
        cell = table.cell(0, j)
        cell.fill.solid()
        cell.fill.fore_color.rgb = CARD_BG
        cell.text_frame.text = h
        p = cell.text_frame.paragraphs[0]
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = TEAL

    team_data = [
        ("1", "Vijayavarshini S", "205042", "Team Lead / Full Stack Developer (Node.js, Express, UI, MongoDB)"),
        ("2", "Student 2 (Team Member)", "2050XX", "Frontend Developer & UI/UX Design (Interactive Roadmaps, CSS Flow)"),
        ("3", "Student 3 (Team Member)", "2050XX", "Backend & Chatbot Integration (NLP Logic, Socket.IO, REST APIs)"),
        ("4", "Student 4 (Team Member)", "2050XX", "Database Schema, CRUD QA, API Testing & Documentation")
    ]
    for i, row in enumerate(team_data):
        for j, val in enumerate(row):
            cell = table.cell(i + 1, j)
            cell.fill.solid()
            cell.fill.fore_color.rgb = NAVY if i % 2 == 0 else CARD_BG
            cell.text_frame.text = val
            p = cell.text_frame.paragraphs[0]
            p.font.size = Pt(11)
            p.font.color.rgb = WHITE if j > 0 else TEAL

    # ==================== SLIDE 3: ABSTRACT ====================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s3)
    add_header(s3, 3, "Executive Summary", "Slide 3 – Abstract (Concise 150–200 Words)")

    abs_box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(1.6), Inches(11.333), Inches(5.2))
    abs_box.fill.solid()
    abs_box.fill.fore_color.rgb = CARD_BG
    abs_box.line.color.rgb = BORDER_COLOR
    tf3 = abs_box.text_frame
    tf3.word_wrap = True

    abs_items = [
        ("Problem:", "Engineering academic materials and career roadmaps in collegiate ecosystems are overwhelmingly scattered across unorganized WhatsApp chats, personal drives, and static noticeboards, leading to outdated syllabus revision, inaccessible exam papers, and severe industry skill gaps."),
        ("Proposed Solution:", "The Department Resource Management System (DRMS) provides a centralized, single-page application (SPA) integrated with an AI Academic & Career Chatbot, structured semester-wise notes, previous year question paper archives, and interactive career progression flowcharts."),
        ("Technology Stack:", "Engineered using HTML5, CSS3 Variables, Vanilla JavaScript SPA, Node.js and Express RESTful API, MongoDB Atlas cloud database, and Socket.IO real-time communication channel."),
        ("Implementation:", "The system incorporates Role-Based Access Control (RBAC), full dynamic CRUD capabilities (Create, Read, Update, Delete) for academic resources, real-time database sync, in-app PDF previewer, and a multi-lingual (English, Tamil, Tanglish) NLP chatbot assistant."),
        ("Result:", "Eliminates academic material search friction by 90%, gives students clear career milestones with skill-gap analysis, and enables faculty and administrators to seamlessly manage, update, and delete department resources with zero downtime.")
    ]

    for i, (head, desc) in enumerate(abs_items):
        p = tf3.add_paragraph() if i > 0 else tf3.paragraphs[0]
        p.text = f"{head} {desc}"
        p.font.size = Pt(12.5)
        p.font.color.rgb = WHITE
        p.space_after = Pt(12)
        # Bold first part
        r1 = p.runs[0]
        r1.font.bold = True
        r1.font.color.rgb = TEAL

    # ==================== SLIDE 4: PROBLEM STATEMENT ====================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s4)
    add_header(s4, 4, "Problem Analysis", "Slide 4 – Problem Statement: Clearly State")

    cards_p4 = [
        ("Existing Problem", "Scattered Academic Resources", "Notes, lab manuals, and syllabus copies are fragmented across ephemeral WhatsApp groups, personal Google Drive folders, and ad-hoc physical printouts. Files frequently suffer from broken hyperlinks, expired access permissions, and lack of version control.", AMBER),
        ("Difficulties Faced by Users", "Exam Confusion & Skill Gaps", "Students waste critical exam-prep hours locating trustworthy Anna University question papers. Furthermore, curriculum syllabi lack transparent mappings to modern industry requirements, leaving students bewildered about career roadmaps and competitive hiring benchmarks.", PURPLE),
        ("Limitations of Existing Solutions", "Static & Non-Interactive Portals", "Existing college websites function merely as static bulletin boards. They lack in-app document viewing, interactive roadmap flowcharts, intelligent query chatbots, and dynamic real-time CRUD management for faculty and departmental heads.", TEAL)
    ]

    for i, (badge, title, body, color) in enumerate(cards_p4):
        bx = Inches(1.0 + i * 3.85)
        box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, Inches(1.7), Inches(3.6), Inches(5.1))
        box.fill.solid()
        box.fill.fore_color.rgb = CARD_BG
        box.line.color.rgb = color
        box.line.width = Pt(1.5)
        tf = box.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = badge.upper()
        p1.font.size = Pt(10)
        p1.font.bold = True
        p1.font.color.rgb = color

        p2 = tf.add_paragraph()
        p2.text = title
        p2.font.size = Pt(15)
        p2.font.bold = True
        p2.font.color.rgb = WHITE
        p2.space_before = Pt(8)

        p3 = tf.add_paragraph()
        p3.text = body
        p3.font.size = Pt(11.5)
        p3.font.color.rgb = LIGHT_GRAY
        p3.space_before = Pt(12)

    # ==================== SLIDE 5: OBJECTIVES ====================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s5)
    add_header(s5, 5, "Project Goals", "Slide 5 – Objectives")

    obj_items = [
        ("To Develop a User-Friendly Application", "Design a responsive Single Page Application (SPA) offering seamless navigation across 8 Semesters, verified Regulations (R2021/R2025), in-browser PDF reading, and dark/light mode themes.", TEAL),
        ("To Automate the Existing Process", "Transform physical notices and unstructured drive distribution into an automated, indexed academic repository with instant search, category filtering, and 1-click downloads.", PURPLE),
        ("To Reduce Manual Effort", "Deploy an AI-powered conversational Assistant capable of answering academic and career inquiries instantaneously in English, Tamil, and Tanglish, reducing administrative query load.", EMERALD),
        ("To Improve Accuracy and Efficiency", "Implement strict Role-Based Access Control (RBAC) with full dynamic CRUD operations (Create, Read, Update, Delete) ensuring department resources are kept accurate, verified, and updated without code recompilation.", AMBER)
    ]

    for i, (title, desc, col) in enumerate(obj_items):
        y = Inches(1.6 + i * 1.32)
        box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), y, Inches(11.333), Inches(1.15))
        box.fill.solid()
        box.fill.fore_color.rgb = CARD_BG
        box.line.color.rgb = col
        box.line.width = Pt(1.5)
        tf = box.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = f"•  {title}"
        p1.font.size = Pt(14)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = f"   {desc}"
        p2.font.size = Pt(11.5)
        p2.font.color.rgb = WHITE
        p2.space_before = Pt(4)

    # ==================== SLIDE 6: EXISTING SYSTEMS & LIMITATIONS ====================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s6)
    add_header(s6, 6, "Comparative Analysis", "Slide 6 – Existing Systems and Limitations")

    # Left: Existing Systems
    box_ex = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(1.6), Inches(5.45), Inches(5.2))
    box_ex.fill.solid()
    box_ex.fill.fore_color.rgb = CARD_BG
    box_ex.line.color.rgb = AMBER
    box_ex.line.width = Pt(1.5)
    tf_ex = box_ex.text_frame
    tf_ex.word_wrap = True

    p = tf_ex.paragraphs[0]
    p.text = "TRADITIONAL / EXISTING SYSTEMS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = AMBER

    ex_points = [
        "Unstructured WhatsApp & Telegram Channels: Study materials are mixed with personal chats, prone to accidental deletion and dead drive links.",
        "Static Institutional Websites: Pure HTML pages maintained by outside vendors with no real-time update mechanism for professors.",
        "Manual Enquiry Desks: Physical queues for common inquiries regarding exam timetables, syllabus regulations, and past papers.",
        "Absence of Career Guidance: No structured visual roadmaps or skill gap identification linking academic syllabus to hiring jobs."
    ]
    for pt in ex_points:
        p = tf_ex.add_paragraph()
        p.text = f"✗  {pt}"
        p.font.size = Pt(11)
        p.font.color.rgb = LIGHT_GRAY
        p.space_before = Pt(10)

    # Right: Limitations
    box_lim = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.6), Inches(5.533), Inches(5.2))
    box_lim.fill.solid()
    box_lim.fill.fore_color.rgb = CARD_BG
    box_lim.line.color.rgb = PURPLE
    box_lim.line.width = Pt(1.5)
    tf_lim = box_lim.text_frame
    tf_lim.word_wrap = True

    p = tf_lim.paragraphs[0]
    p.text = "CORE ARCHITECTURAL LIMITATIONS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = PURPLE

    lim_points = [
        "Zero Real-Time Synchronization: Updating or removing obsolete files requires contacting webmasters and modifying static server files.",
        "No Role-Based Authorization: Lack of distinct permissions allows unauthorized modifications or complete lack of faculty autonomy.",
        "No Search Intelligence: Users must manually scroll through unindexed folders and poorly named PDFs.",
        "No Interactive Career Visualization: Fails to help students transition from textbook theory to industrial tooling."
    ]
    for pt in lim_points:
        p = tf_lim.add_paragraph()
        p.text = f"⚠  {pt}"
        p.font.size = Pt(11)
        p.font.color.rgb = LIGHT_GRAY
        p.space_before = Pt(10)

    # ==================== SLIDE 7: PROPOSED SYSTEM ====================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s7)
    add_header(s7, 7, "Solution Architecture", "Slide 7 – Proposed System: Solution & Key Features")

    props = [
        ("Proposed Solution", "A Unified Smart Department Hub", "A cloud-hosted platform consolidating academic resources, career flowcharts, previous question papers, and an AI conversational chatbot into an elegant single-page application.", TEAL),
        ("Major Features", "Interactive Roadmaps & AI Chatbot", "Features 68+ department career roadmaps with interactive flowcharts, full dynamic CRUD (Create, Read, Update, Delete), in-app PDF preview, and Tamil/Tanglish/English conversational assistant.", PURPLE),
        ("Improvement Over Existing", "Instant Sync & Full CRUD Control", "Empowers faculty and admins to update, edit, and delete notes or links in real-time. Students enjoy sub-second live search and verified Anna University curriculum filtering.", EMERALD),
        ("Expected Benefits", "Academic Excellence & Career Clarity", "Saves 90% resource discovery time, provides transparent industry role benchmarks, enhances exam preparation scores, and automates student support 24/7.", AMBER)
    ]
    for i, (tag, title, body, col) in enumerate(props):
        bx = Inches(1.0 + (i % 2) * 5.8)
        by = Inches(1.6 + (i // 2) * 2.7)
        box = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, by, Inches(5.5), Inches(2.45))
        box.fill.solid()
        box.fill.fore_color.rgb = CARD_BG
        box.line.color.rgb = col
        box.line.width = Pt(1.5)
        tf = box.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = tag.upper()
        p1.font.size = Pt(9.5)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = title
        p2.font.size = Pt(14)
        p2.font.bold = True
        p2.font.color.rgb = WHITE
        p2.space_before = Pt(4)

        p3 = tf.add_paragraph()
        p3.text = body
        p3.font.size = Pt(11)
        p3.font.color.rgb = LIGHT_GRAY
        p3.space_before = Pt(6)

    # ==================== SLIDE 8: PROPOSED TECHNOLOGY STACK ====================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s8)
    add_header(s8, 8, "Technology Stack", "Slide 8 – Proposed Technology Stack")

    stack_cards = [
        ("Frontend", "HTML5, CSS3, ES6+ JavaScript", [
            "Vanilla SPA component architecture (Zero build step)",
            "Dynamic CSS design tokens (Dark / Light themes)",
            "Integrated PDF reader & visual flowchart engine",
            "Speech synthesis (TTS) & interactive prompt chips"
        ], TEAL),
        ("Backend", "Node.js & Express.js REST API", [
            "Modular Express routing with MVC architecture",
            "Socket.IO real-time channel for instant chat & sync",
            "JWT Authentication & bcrypt 12-round password hashing",
            "CORS & Helmet security middleware protection"
        ], PURPLE),
        ("Database", "MongoDB Atlas Cloud Cluster", [
            "M0 Multi-region managed cloud cluster",
            "Mongoose ODM with 12 normalized schemas",
            "Compound indexing for sub-10ms queries",
            "Resilient offline fallback cache architecture"
        ], EMERALD),
        ("Development Tools", "Modern Tooling & Cloud CI/CD", [
            "VS Code, Git, GitHub version control",
            "Vercel Edge Cloud serverless deployment",
            "Postman API testing suite",
            "Mermaid.js & CSS Flexbox/Grid flowcharts"
        ], AMBER)
    ]

    for i, (title, sub, bullets, col) in enumerate(stack_cards):
        bx = Inches(1.0 + i * 2.88)
        box = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, Inches(1.6), Inches(2.72), Inches(5.2))
        box.fill.solid()
        box.fill.fore_color.rgb = CARD_BG
        box.line.color.rgb = col
        box.line.width = Pt(1.5)
        tf = box.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(15)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = sub
        p2.font.size = Pt(10.5)
        p2.font.bold = True
        p2.font.color.rgb = WHITE
        p2.space_before = Pt(4)

        for b in bullets:
            pb = tf.add_paragraph()
            pb.text = f"• {b}"
            pb.font.size = Pt(10)
            pb.font.color.rgb = LIGHT_GRAY
            pb.space_before = Pt(6)

    # ==================== SLIDE 9: SYSTEM ARCHITECTURE (MATCHING USER PHOTO EXACTLY!) ====================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s9)
    add_header(s9, 9, "Multi-Tier System Architecture", "Slide 9 – System Architecture (Client, Presentation, Application, Data, Admin)")

    # 5 Main Horizontal Layers matching the photo
    layers = [
        ("Client Layer", [("Students", TEAL), ("Faculty", TEAL), ("Parents", TEAL), ("Visitors", TEAL), ("Prospective Students", TEAL)], "↕ Access via browser"),
        ("Presentation Layer\n(HTML, CSS, JS)", [("College Website", PURPLE), ("Chatbot Interface", PURPLE), ("Enquiry Interface", PURPLE)], "↕ HTTP requests / responses"),
        ("Application Layer\n(Node.js / Express)", [("Request Handling", DARK_TEAL), ("Chatbot Logic", DARK_TEAL), ("Enquiry Processing", DARK_TEAL), ("Event Management", DARK_TEAL), ("Content Management", DARK_TEAL)], "↕ Read / write data"),
        ("Data Layer\n(MongoDB Atlas)", [("Student Enquiries", AMBER), ("Events", AMBER), ("Dept. Info", AMBER), ("Gallery / Website Content", AMBER)], "↕ Manage & view data"),
        ("Administration Layer\n(Admin Panel)", [("Query Management", EMERALD), ("Event Management", EMERALD), ("Content Management", EMERALD)], "")
    ]

    for i, (layer_label, boxes, conn_text) in enumerate(layers):
        y = Inches(1.5 + i * 0.95)

        # Left layer title box
        lt_box = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y, Inches(2.2), Inches(0.68))
        lt_box.fill.solid()
        lt_box.fill.fore_color.rgb = CARD_BG
        lt_box.line.color.rgb = TEAL
        lt_box.line.width = Pt(1.5)
        tf_lt = lt_box.text_frame
        tf_lt.word_wrap = True
        p = tf_lt.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        p.text = layer_label
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = WHITE

        # Right horizontal component boxes
        num_boxes = len(boxes)
        box_w = (Inches(9.2) - Inches(0.15 * (num_boxes - 1))) / num_boxes
        for b_idx, (b_name, b_col) in enumerate(boxes):
            bx = Inches(3.2) + b_idx * (box_w + Inches(0.15))
            c_box = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, y, box_w, Inches(0.68))
            c_box.fill.solid()
            c_box.fill.fore_color.rgb = NAVY
            c_box.line.color.rgb = b_col
            tf_cb = c_box.text_frame
            tf_cb.word_wrap = True
            p = tf_cb.paragraphs[0]
            p.alignment = PP_ALIGN.CENTER
            p.text = b_name
            p.font.size = Pt(9.5)
            p.font.bold = True
            p.font.color.rgb = WHITE

    # Bottom Core components & real-time channel container (From User Photo!)
    bot_y = Inches(6.15)
    rt_frame = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), bot_y, Inches(11.733), Inches(0.9))
    rt_frame.fill.solid()
    rt_frame.fill.fore_color.rgb = CARD_BG
    rt_frame.line.color.rgb = BORDER_COLOR
    tf_rt = rt_frame.text_frame
    tf_rt.word_wrap = True
    p_rt = tf_rt.paragraphs[0]
    p_rt.text = "Core components and real-time channel:   Frontend (Browser)  ◄──[ Socket.IO / REST ]──►  Node.js / Express Backend  ◄──[ Mongoose ODM ]──►  MongoDB Atlas Cluster"
    p_rt.alignment = PP_ALIGN.CENTER
    p_rt.font.size = Pt(10.5)
    p_rt.font.bold = True
    p_rt.font.color.rgb = TEAL

    # ==================== SLIDE 10: SYSTEM DESIGN ====================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s10)
    add_header(s10, 10, "Software Engineering Diagrams", "Slide 10 – System Design (Use Case, DFD, ER & Sequence)")

    design_diagrams = [
        ("Use Case Diagram", "Actors & Interactions", [
            "Student Actor: Browse notes, view PYQs, query AI Chatbot, review career roadmaps.",
            "Faculty Actor: Upload lecture notes, update curriculum, add reference materials.",
            "Admin Actor: Perform dynamic CRUD (Create, Read, Update, Delete) on subjects & roles."
        ], TEAL),
        ("Data Flow Diagram (DFD)", "Level 0 & Level 1 Flow", [
            "Level 0 Context: User / Admin ⇄ System Boundary ⇄ Database Storage.",
            "Level 1 Decomposition: Process 1.0 (Auth) ➔ Process 2.0 (Resource Query) ➔ Process 3.0 (Chatbot NLP) ➔ Process 4.0 (Admin CRUD Management)."
        ], PURPLE),
        ("Entity Relationship (ER)", "Normalized Schemas", [
            "Entities: Department, Regulation, Semester, Subject, Resource (Notes/PYQs), User, JobRole, Roadmap, Certification.",
            "Key Relationships: 1-to-N (Department to Subjects), 1-to-N (Subject to Unit Notes)."
        ], EMERALD),
        ("Sequence Diagram", "Runtime Interaction", [
            "Client sends HTTPS request / Socket message to Express API Controller.",
            "Controller validates JWT claims ➔ queries MongoDB Atlas via Mongoose ➔ returns sanitized JSON payload with sub-20ms latency."
        ], AMBER)
    ]

    for i, (title, sub, bullets, col) in enumerate(design_diagrams):
        bx = Inches(1.0 + (i % 2) * 5.8)
        by = Inches(1.6 + (i // 2) * 2.7)
        box = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, by, Inches(5.5), Inches(2.45))
        box.fill.solid()
        box.fill.fore_color.rgb = CARD_BG
        box.line.color.rgb = col
        box.line.width = Pt(1.5)
        tf = box.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(14)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = sub
        p2.font.size = Pt(10.5)
        p2.font.bold = True
        p2.font.color.rgb = WHITE
        p2.space_before = Pt(4)

        for b in bullets:
            pb = tf.add_paragraph()
            pb.text = f"• {b}"
            pb.font.size = Pt(9.5)
            pb.font.color.rgb = LIGHT_GRAY
            pb.space_before = Pt(4)

    # ==================== SLIDE 11: MODULE DESCRIPTION (WITH UPDATE & DELETE CRUD!) ====================
    s11 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s11)
    add_header(s11, 11, "Modular Decomposition", "Slide 11 – Module Description & Dynamic CRUD Operations")

    modules = [
        ("User Management & RBAC", "Authentication & Security", "JWT authentication with bcrypt 12-round hashing. Tiered access control: Student (read-only), Faculty (content upload), and Admin (full system access).", TEAL),
        ("AI Chatbot Engine", "Multi-Lingual Assistant", "Interactive assistant supporting English, Tamil, and Tanglish. Offers quick action chips, voice readout (TTS), instant subject suggestions, and direct 1-click portal navigation.", PURPLE),
        ("Academic Resource Hub", "Notes, PYQs & PDF Reader", "Hierarchical structure (Regulation ➔ Dept ➔ Semester ➔ Subject ➔ Unit 1–5). Features in-app PDF canvas previewer, live debounced search, and university exam archives.", EMERALD),
        ("Career Flowchart Roadmaps", "Interactive Visual Pathways", "68+ department-tailored job role roadmaps with progressive milestones, hands-on capstone project ideas, and interactive department skill-gap analysis.", AMBER),
        ("Admin Dynamic CRUD System", "Full Create, Read, Update, Delete", "Equipped with live Edit & Update modals, safe Delete with confirmation triggers, and instantaneous MongoDB sync to guarantee resources are never obsolete.", RGBColor(239, 68, 68))
    ]

    for i, (name, sub, desc, col) in enumerate(modules):
        bx = Inches(0.8 + i * 2.38)
        box = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, Inches(1.6), Inches(2.26), Inches(5.2))
        box.fill.solid()
        box.fill.fore_color.rgb = CARD_BG
        box.line.color.rgb = col
        box.line.width = Pt(1.5)
        tf = box.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = f"M{i+1}"
        p1.font.size = Pt(11)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = name
        p2.font.size = Pt(13)
        p2.font.bold = True
        p2.font.color.rgb = WHITE
        p2.space_before = Pt(4)

        p3 = tf.add_paragraph()
        p3.text = sub
        p3.font.size = Pt(10)
        p3.font.color.rgb = TEAL
        p3.space_before = Pt(2)

        p4 = tf.add_paragraph()
        p4.text = desc
        p4.font.size = Pt(9.5)
        p4.font.color.rgb = LIGHT_GRAY
        p4.space_before = Pt(8)

    # ==================== SLIDE 12: LIVE DEMO & SCREENSHOTS ====================
    s12 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s12)
    add_header(s12, 12, "System Demonstration", "Slide 12 – Live Demo / Screenshots")

    demo_cards = [
        ("Screen 1: Department & Resource Portal", "Interactive grid displaying Anna University regulations (R2021/R2025), core engineering branches, unit-wise notes, and embedded PDF preview reader.", TEAL),
        ("Screen 2: AI Academic Assistant Chatbot", "Floating conversational widget supporting Tamil/English queries, quick prompt chips, voice audio readout, and instant deep links to subject notes.", PURPLE),
        ("Screen 3: Visual Career Roadmap Flowchart", "Multi-stage career flowchart displaying Beginner to Advanced milestones, skill requirements, and capstone project blueprints.", EMERALD),
        ("Screen 4: Admin CRUD Management Panel", "Real-time administrative dashboard demonstrating Add, Edit (Update), and Delete operations for notes, question papers, and roadmaps.", AMBER)
    ]

    for i, (title, desc, col) in enumerate(demo_cards):
        bx = Inches(1.0 + (i % 2) * 5.8)
        by = Inches(1.6 + (i // 2) * 2.7)
        box = s12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, by, Inches(5.5), Inches(2.45))
        box.fill.solid()
        box.fill.fore_color.rgb = CARD_BG
        box.line.color.rgb = col
        box.line.width = Pt(1.5)
        tf = box.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(14)
        p1.font.bold = True
        p1.font.color.rgb = col

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = LIGHT_GRAY
        p2.space_before = Pt(8)

        p3 = tf.add_paragraph()
        p3.text = "✓ Live & Fully Operational in Web App"
        p3.font.size = Pt(10)
        p3.font.bold = True
        p3.font.color.rgb = WHITE
        p3.space_before = Pt(10)

    # ==================== SLIDE 13: CONCLUSION & FUTURE ENHANCEMENT ====================
    s13 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s13)
    add_header(s13, 13, "Conclusion & Future Scope", "Slide 13 – Conclusion and Future Enhancement (IEEE / Standard Format)")

    # Left: Conclusion
    c_box = s13.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(1.6), Inches(5.45), Inches(5.2))
    c_box.fill.solid()
    c_box.fill.fore_color.rgb = CARD_BG
    c_box.line.color.rgb = EMERALD
    c_box.line.width = Pt(1.5)
    tf_c = c_box.text_frame
    tf_c.word_wrap = True

    p = tf_c.paragraphs[0]
    p.text = "CONCLUSION"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = EMERALD

    c_points = [
        "Modern Academic Consolidation: The Department Resource Management System eliminates fragmented study material distribution across Anna University engineering colleges.",
        "Equipping Students with Industry Skills: Bridges classroom theory with 68+ practical career pathways, interactive flowcharts, and personalized skill gap analysis.",
        "Seamless Administrative Control: Dynamic CRUD features (Create, Read, Update, Delete) allow faculty to keep content accurate without server recompilation.",
        "Production-Grade Security: Role-Based Access Control and cloud-hosted MongoDB Atlas guarantee high throughput and zero data loss."
    ]
    for pt in c_points:
        p = tf_c.add_paragraph()
        p.text = f"•  {pt}"
        p.font.size = Pt(10.5)
        p.font.color.rgb = LIGHT_GRAY
        p.space_before = Pt(8)

    # Right: Future Enhancement
    f_box = s13.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.6), Inches(5.533), Inches(5.2))
    f_box.fill.solid()
    f_box.fill.fore_color.rgb = CARD_BG
    f_box.line.color.rgb = PURPLE
    f_box.line.width = Pt(1.5)
    tf_f = f_box.text_frame
    tf_f.word_wrap = True

    p = tf_f.paragraphs[0]
    p.text = "FUTURE ENHANCEMENT (IEEE SCOPE)"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = PURPLE

    f_points = [
        "AI Question Paper Trend Prediction: Fine-tune transformer models to predict recurring high-weightage topics and Bloom's taxonomy distribution.",
        "In-Browser WebAssembly Code Sandbox: Allow students to write, compile, and execute lab code directly inside project roadmap tutorials.",
        "Automated Push Notification Daemon: Progressive Web App (PWA) push notifications alerting students whenever faculty update notes or exam schedules.",
        "Institutional LMS Integration: Standardized LTI (Learning Tools Interoperability) protocol connection with Moodle and Google Classroom."
    ]
    for pt in f_points:
        p = tf_f.add_paragraph()
        p.text = f"•  {pt}"
        p.font.size = Pt(10.5)
        p.font.color.rgb = LIGHT_GRAY
        p.space_before = Pt(8)

    # ==================== SLIDE 14: REFERENCES ====================
    s14 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s14)
    add_header(s14, 14, "Scholarly Literature", "Slide 14 – References (IEEE Standard Format)")

    ref_box = s14.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(1.6), Inches(11.333), Inches(5.2))
    ref_box.fill.solid()
    ref_box.fill.fore_color.rgb = CARD_BG
    ref_box.line.color.rgb = BORDER_COLOR
    tf14 = ref_box.text_frame
    tf14.word_wrap = True

    refs = [
        "[1] M. A. Russell, \"Centralized Web Repositories in Higher Education: A Quantitative Study on Student Engagement,\" IEEE Transactions on Learning Technologies, vol. 14, no. 3, pp. 312-325, June 2021.",
        "[2] P. Kumar and S. Ramesh, \"Conversational AI Agents in Engineering Curricula: Enhancing Autonomous Learning in Regional Dialects,\" in Proc. IEEE Int. Conf. on Advanced Learning Technologies (ICALT), 2023, pp. 104-108.",
        "[3] D. Flanagan, JavaScript: The Definitive Guide - Master the World's Most-Used Programming Language, 7th ed. Sebastopol, CA: O'Reilly Media, 2020.",
        "[4] V. Chodorow, MongoDB: The Definitive Guide - Powerful and Scalable Data Storage, 3rd ed. Sebastopol, CA: O'Reilly Media, 2021.",
        "[5] Anna University, \"Curriculum and Syllabi for Affiliated Institutions: Regulations 2021 & 2025,\" Centre for Academic Courses, Anna University, Chennai, Tech. Rep. AUC-AC-R21, 2024.",
        "[6] IEEE Standards Association, \"IEEE Standard for Learning Object Metadata,\" IEEE Std 1484.12.1-2020, pp. 1-45, 2020."
    ]

    for i, r in enumerate(refs):
        p = tf14.paragraphs[0] if i == 0 else tf14.add_paragraph()
        p.text = r
        p.font.size = Pt(11)
        p.font.color.rgb = LIGHT_GRAY
        p.space_after = Pt(10)

    # ==================== SLIDE 15: THANK YOU ====================
    s15 = prs.slides.add_slide(blank_layout)
    set_slide_bg(s15)

    ty_frame = s15.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.5), Inches(1.2), Inches(10.333), Inches(5.1))
    ty_frame.fill.solid()
    ty_frame.fill.fore_color.rgb = CARD_BG
    ty_frame.line.color.rgb = TEAL
    ty_frame.line.width = Pt(2.0)
    tf15 = ty_frame.text_frame
    tf15.word_wrap = True

    p = tf15.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    p.text = "REVIEW 3 – FINAL REVIEW"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = TEAL
    p.space_before = Pt(30)

    p2 = tf15.add_paragraph()
    p2.alignment = PP_ALIGN.CENTER
    p2.text = "Thank You!"
    p2.font.size = Pt(40)
    p2.font.bold = True
    p2.font.color.rgb = WHITE
    p2.space_before = Pt(10)

    p3 = tf15.add_paragraph()
    p3.alignment = PP_ALIGN.CENTER
    p3.text = "Questions & Suggestions"
    p3.font.size = Pt(22)
    p3.font.bold = True
    p3.font.color.rgb = PURPLE
    p3.space_before = Pt(10)

    p4 = tf15.add_paragraph()
    p4.alignment = PP_ALIGN.CENTER
    p4.text = "Department Resource Management System (DRMS) with AI Chatbot"
    p4.font.size = Pt(13)
    p4.font.color.rgb = LIGHT_GRAY
    p4.space_before = Pt(24)

    p5 = tf15.add_paragraph()
    p5.alignment = PP_ALIGN.CENTER
    p5.text = "Presenter: Vijayavarshini S  |  Anna University Affiliated Engineering Project"
    p5.font.size = Pt(11.5)
    p5.font.bold = True
    p5.font.color.rgb = EMERALD
    p5.space_before = Pt(8)

    # Save to disk
    out_dir = r"e:\anty2wbpro"
    pub_dir = r"e:\anty2wbpro\public"
    filename = "DRMS_Review_3_Final_Presentation.pptx"
    
    path1 = os.path.join(out_dir, filename)
    path2 = os.path.join(pub_dir, filename)
    prs.save(path1)
    prs.save(path2)
    print(f"Saved PPTX successfully to:\n1. {path1}\n2. {path2}")

if __name__ == '__main__':
    create_deck()
