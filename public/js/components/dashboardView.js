/**
 * Department Resource Dashboard View
 * Features Hero Banner, Key Metrics, 5 Core Resource Cards, Skill Map Shortcut,
 * Recently Added Resources, and Upcoming Career Tech Trends.
 */

window.DashboardView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const currentReg = state.regulation || 'R2021';
    const currentDeptCode = state.department || 'IT';

    // Department metadata
    const deptList = window.AppFallbackData ? window.AppFallbackData.departments : [];
    const dept = deptList.find(d => d.code === currentDeptCode) || {
      name: "Information Technology",
      code: "IT",
      icon: "🌐",
      category: "Circuits & Computing",
      description: "Enterprise software engineering, cloud infrastructures, web technologies, and secure data systems."
    };

    // Department-filtered stats
    const allNotes = (window.AppFallbackData?.notes || []).filter(n => n.deptCode === currentDeptCode);
    const allQPs = (window.AppFallbackData?.questionPapers || []).filter(qp => qp.deptCode === currentDeptCode);
    const allRoles = (window.AppFallbackData?.jobRoles || []).filter(r => r.deptCode === currentDeptCode);
    const allProjects = (window.AppFallbackData?.projects || []).filter(p => p.deptCode === currentDeptCode);
    const deptSkillsCount = (window.DeptSkillsCertData?.[currentDeptCode]?.skills || []).length;
    const globalCertsCount = (window.AppFallbackData?.certifications || []).length;
    const totalCertsCount = globalCertsCount > 0 ? globalCertsCount : (deptSkillsCount > 0 ? deptSkillsCount : 18);

    container.innerHTML = `
      <!-- Department Hero Banner -->
      <section class="dept-hero">
        <div class="dept-hero-content">
          <div class="dept-hero-badges">
            <span class="dept-hero-badge">📜 ${currentReg}</span>
            <span class="dept-hero-badge">${dept.icon} ${dept.category}</span>
          </div>
          <h1 class="dept-hero-title">${dept.name}</h1>
          <p class="dept-hero-desc">${dept.description}</p>
          <div class="dept-hero-actions">
            <button class="btn btn-primary" id="dash-browse-notes-btn">
              📚 Explore Notes & Syllabus
            </button>
            <button class="btn btn-ghost" id="dash-change-dept-btn" style="color: #fff;">
              Switch Department ➔
            </button>
          </div>
        </div>
      <!-- Department Leadership / HOD Profile Card -->
      <section style="margin-bottom: 26px;">
        <div class="card" style="padding: 22px 26px; border: 1.5px solid var(--border-color); border-radius: var(--radius-xl); background: var(--bg-surface); box-shadow: var(--shadow-sm); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
          <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
            <div style="width: 72px; height: 72px; border-radius: var(--radius-xl); background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; box-shadow: 0 8px 20px rgba(124, 58, 237, 0.25); flex-shrink: 0;">
              👨‍🏫
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                <span class="badge" style="background: rgba(124, 58, 237, 0.12); color: #7c3aed; font-weight: 700; font-size: 0.75rem;">
                  🏛️ Department Leadership
                </span>
                <span class="badge badge-success" style="font-size: 0.72rem;">Podhigai College of Engineering & Technology</span>
              </div>
              <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px 0;">
                Mr. G. Rajasekaran, HOD/IT
              </h2>
              <div style="font-size: 0.88rem; color: var(--text-secondary); font-weight: 600;">
                Head of the Department • Department of Information Technology
              </div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; display: flex; gap: 14px; flex-wrap: wrap;">
                <span>📧 hod.it@podhigai.edu.in</span>
                <span>•</span>
                <span>🏢 IT Department Block, Ground Floor</span>
                <span>•</span>
                <span>🎓 Anna University Affiliated</span>
              </div>
            </div>
          </div>

          <div style="max-width: 380px; padding: 12px 16px; background: var(--bg-subtle); border-radius: var(--radius-md); border-left: 4px solid #7c3aed; font-size: 0.82rem; line-height: 1.5; color: var(--text-secondary);">
            <em>"Welcome to our departmental learning portal. Make full use of the curriculum notes, university question papers, project blueprints, and career roadmaps curated for your academic and placement excellence."</em>
          </div>
        </div>
      </section>

      <!-- Department Statistics Metrics -->
      <section class="stats-grid" aria-label="Department Statistics">
        <div class="stat-card" id="stat-card-notes" role="button" tabindex="0" title="Click to view all ${allNotes.length} Lecture Notes & Units">
          <div class="stat-icon" style="background: var(--color-primary-50); color: var(--color-primary-600);">📚</div>
          <div class="stat-info">
            <span class="stat-value">${allNotes.length}</span>
            <span class="stat-label">Lecture Notes & Units</span>
          </div>
        </div>

        <div class="stat-card" id="stat-card-qps" role="button" tabindex="0" title="Click to view all ${allQPs.length} Past Question Papers">
          <div class="stat-icon" style="background: #ecfdf5; color: #059669;">📝</div>
          <div class="stat-info">
            <span class="stat-value">${allQPs.length}</span>
            <span class="stat-label">Past Question Papers</span>
          </div>
        </div>

        <div class="stat-card" id="stat-card-roles" role="button" tabindex="0" title="Click to view all ${allRoles.length} Mapped Job Roles">
          <div class="stat-icon" style="background: #eff6ff; color: #2563eb;">💼</div>
          <div class="stat-info">
            <span class="stat-value">${allRoles.length}</span>
            <span class="stat-label">Mapped Job Roles</span>
          </div>
        </div>

        <div class="stat-card" id="stat-card-projects" role="button" tabindex="0" title="Click to view all ${allProjects.length} Curated Project Ideas">
          <div class="stat-icon" style="background: #faf5ff; color: #9333ea;">💡</div>
          <div class="stat-info">
            <span class="stat-value">${allProjects.length}</span>
            <span class="stat-label">Curated Project Ideas</span>
          </div>
        </div>

        <div class="stat-card" id="stat-card-certs" role="button" tabindex="0" title="Click to view all ${totalCertsCount} Industry Certifications & Skills">
          <div class="stat-icon" style="background: #fffbeb; color: #d97706;">🏆</div>
          <div class="stat-info">
            <span class="stat-value">${totalCertsCount}</span>
            <span class="stat-label">Industry Certifications</span>
          </div>
        </div>
      </section>

      <!-- 5 Core Dashboard Resource Cards + Skill Map -->
      <section style="margin-bottom: 36px;">
        <h2 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 20px;">
          Academic & Career Resource Centers
        </h2>
        <div class="core-resource-grid">
          
          <!-- Notes & Syllabus -->
          <div class="resource-nav-card" id="card-notes">
            <div class="resource-card-icon" style="background: #eef2ff; color: #4f46e5;">📚</div>
            <h3 class="resource-card-title">Notes & Syllabus</h3>
            <p class="resource-card-desc">
              Access semester-wise, subject-wise, and unit-wise lecture notes, presentation slides, and curriculum syllabi with instant PDF reader.
            </p>
            <div class="resource-card-footer">
              <span>Explore 8 Semesters</span>
              <span>➔</span>
            </div>
          </div>

          <!-- Question Papers -->
          <div class="resource-nav-card" id="card-question-papers">
            <div class="resource-card-icon" style="background: #ecfdf5; color: #059669;">📝</div>
            <h3 class="resource-card-title">Previous Question Papers</h3>
            <p class="resource-card-desc">
              Practice past university end-semester and internal assessment papers sorted by academic year, pattern, and subject code.
            </p>
            <div class="resource-card-footer">
              <span>View Exam Archives</span>
              <span>➔</span>
            </div>
          </div>

          <!-- Page 1: Departmental Roles -->
          <div class="resource-nav-card" id="card-dept-roles">
            <div class="resource-card-icon" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.25)); color: #059669;">💼</div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <h3 class="resource-card-title" style="margin: 0;">Departmental Roles</h3>
              <span class="badge badge-subtle" style="font-size: 0.65rem;">Page 1</span>
            </div>
            <p class="resource-card-desc">
              All available career roles in ${dept.code} categorized by technology, responsibilities, and industry salary benchmarks (₹6 - 28 LPA).
            </p>
            <div class="resource-card-footer">
              <span>Explore Departmental Roles</span>
              <span>➔</span>
            </div>
          </div>

          <!-- Page 2: Project Ideas -->
          <div class="resource-nav-card" id="card-projects">
            <div class="resource-card-icon" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.25)); color: #d97706;">💡</div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <h3 class="resource-card-title" style="margin: 0;">Project Ideas</h3>
              <span class="badge badge-subtle" style="font-size: 0.65rem;">Page 2</span>
            </div>
            <p class="resource-card-desc">
              Curated capstone & mini project ideas for ${dept.code} categorized by difficulty (Beginner, Intermediate, Advanced) and modern tech stacks.
            </p>
            <div class="resource-card-footer">
              <span>Browse Project Ideas</span>
              <span>➔</span>
            </div>
          </div>

          <!-- Page 3: Skills & Certifications -->
          <div class="resource-nav-card" id="card-certifications">
            <div class="resource-card-icon" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(79, 70, 229, 0.25)); color: #4f46e5;">🏆</div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <h3 class="resource-card-title" style="margin: 0;">Skills & Certifications</h3>
              <span class="badge badge-subtle" style="font-size: 0.65rem;">Page 3</span>
            </div>
            <p class="resource-card-desc">
              Required technical proficiencies and direct course links with 100% FREE certificates from Coursera, NPTEL, edX, Google & Microsoft.
            </p>
            <div class="resource-card-footer">
              <span>View Free Certifications</span>
              <span>➔</span>
            </div>
          </div>

          <!-- Page 4: Career Roadmaps -->
          <div class="resource-nav-card" id="card-roadmaps">
            <div class="resource-card-icon" style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(8, 145, 178, 0.25)); color: #0891b2;">🗺️</div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <h3 class="resource-card-title" style="margin: 0;">Career Roadmaps</h3>
              <span class="badge badge-subtle" style="font-size: 0.65rem;">Page 4</span>
            </div>
            <p class="resource-card-desc">
              Step-by-step sequential 4-phase learning paths (Basics ➔ Core Skills ➔ Advanced Tools ➔ Portfolio Projects) for each departmental role.
            </p>
            <div class="resource-card-footer">
              <span>Open Career Roadmaps</span>
              <span>➔</span>
            </div>
          </div>

      <!-- Dedicated Anna University Academic Hub & Resource Gateways -->
      <section style="margin-bottom: 36px;">
        <div class="card" style="padding: 24px; border: 1.5px solid var(--border-color); border-radius: var(--radius-xl); background: var(--bg-surface); box-shadow: var(--shadow-sm);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="width: 52px; height: 52px; border-radius: var(--radius-lg); background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; box-shadow: 0 4px 14px rgba(124, 58, 237, 0.25);">
                🏛️
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                  <h2 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin: 0;">
                    Anna University Engineering Student Academic Portal
                  </h2>
                  <span class="badge badge-primary">Affiliated Institutional Hub</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 3px 0 0 0;">
                  Official Academic Curriculum, Regulations & Examination Portals for Podhigai College of Engineering & Technology
                </p>
              </div>
            </div>

            <!-- Regulation Switcher Pills -->
            <div style="display: flex; align-items: center; gap: 8px; background: var(--bg-subtle); padding: 4px; border-radius: var(--radius-full); border: 1px solid var(--border-color);">
              <button class="chip ${currentReg === 'R2021' ? 'active' : ''}" id="dash-switch-r2021" style="font-size: 0.78rem; padding: 4px 14px; font-weight: 700; cursor: pointer;">
                Regulation 2021
              </button>
              <button class="chip ${currentReg === 'R2025' ? 'active' : ''}" id="dash-switch-r2025" style="font-size: 0.78rem; padding: 4px 14px; font-weight: 700; cursor: pointer;">
                Regulation 2025
              </button>
            </div>
          </div>

          <!-- Academic Gateway Cards Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px;">
            <a href="https://cac.annauniv.edu" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 14px; background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: var(--radius-md); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              <div>
                <div style="font-size: 0.72rem; font-weight: 700; color: #7c3aed; text-transform: uppercase;">Official Curriculum</div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); margin: 4px 0;">Centre for Academic Courses (CAC)</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">Syllabus copies, course credits, and curriculum regulations for all branches.</div>
              </div>
              <div style="margin-top: 10px; font-size: 0.78rem; font-weight: 700; color: #7c3aed;">cac.annauniv.edu ↗</div>
            </a>

            <a href="https://coe1.annauniv.edu" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 14px; background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: var(--radius-md); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              <div>
                <div style="font-size: 0.72rem; font-weight: 700; color: #059669; text-transform: uppercase;">Examination Office</div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); margin: 4px 0;">Controller of Examinations (ACOE)</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">End-semester exam timetables, hall tickets, and grade revaluation portals.</div>
              </div>
              <div style="margin-top: 10px; font-size: 0.78rem; font-weight: 700; color: #059669;">coe1.annauniv.edu ↗</div>
            </a>

            <a href="https://onlinecourses.nptel.ac.in" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 14px; background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: var(--radius-md); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              <div>
                <div style="font-size: 0.72rem; font-weight: 700; color: #2563eb; text-transform: uppercase;">Credit Transfer</div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); margin: 4px 0;">NPTEL / SWAYAM MOOCs</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">Anna University approved online elective courses eligible for degree credit transfer.</div>
              </div>
              <div style="margin-top: 10px; font-size: 0.78rem; font-weight: 700; color: #2563eb;">nptel.ac.in ↗</div>
            </a>

            <a href="https://ndl.iitkgp.ac.in" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 14px; background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: var(--radius-md); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              <div>
                <div style="font-size: 0.72rem; font-weight: 700; color: #d97706; text-transform: uppercase;">Central Digital Library</div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); margin: 4px 0;">National Digital Library (NDLI)</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">Over 500,000 engineering textbooks, reference volumes, and conference papers.</div>
              </div>
              <div style="margin-top: 10px; font-size: 0.78rem; font-weight: 700; color: #d97706;">ndl.iitkgp.ac.in ↗</div>
            </a>
          </div>
        </div>
      </section>

      <!-- Department Software Tools & Free Licenses -->
      <section style="margin-bottom: 36px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h2 style="font-size: 1.35rem; font-weight: 700;">Essential ${dept.code} Software Tools & Free Licenses</h2>
            <p style="font-size: 0.8125rem; color: var(--text-muted);">Industry-standard software suites with free student access guides</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
          ${((window.AppFallbackData?.softwareTools || []).filter(t => t.deptCode === currentDeptCode)).map(tool => `
            <div class="card card-hoverable" style="padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <span class="badge badge-primary" style="font-size: 0.7rem;">${tool.category}</span>
                  <span class="badge badge-success" style="font-size: 0.65rem;">${tool.licenseType}</span>
                </div>
                <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${tool.name}</h3>
                <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">${tool.description}</p>
              </div>

              <a href="${tool.officialUrl}" target="_blank" class="btn btn-secondary btn-sm" style="text-decoration: none; text-align: center; width: 100%;">
                🌐 Official Software Site ➔
              </a>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Dashboard Columns: Recently Added & Career Insights -->
      <section class="dashboard-columns">
        <!-- Left: Recently Added Resources -->
        <div class="dashboard-panel">
          <div class="panel-header">
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 700;">Recently Added Resources</h3>
              <p style="font-size: 0.8125rem; color: var(--text-muted);">Latest materials uploaded by faculty members</p>
            </div>
            <button class="btn btn-ghost btn-sm" id="view-all-notes-btn">View All</button>
          </div>

          <div class="recent-list">
            ${(window.AppFallbackData?.notes || []).slice(0, 4).map(n => `
              <div class="recent-item">
                <div class="recent-item-meta">
                  <div class="recent-item-icon">📄</div>
                  <div>
                    <div class="recent-item-title">${n.title}</div>
                    <div class="recent-item-sub">${n.subjectName} (${n.subjectCode}) • Unit ${n.unit} • ${n.uploadedBy}</div>
                  </div>
                </div>
                <button class="btn btn-sm btn-secondary quick-preview-btn" data-title="${n.title}" data-file="${n.fileName}">
                  Preview
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: Recommended Skills & Tech Trends -->
        <div class="dashboard-panel">
          <div class="panel-header">
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 700;">Recommended for ${dept.code}</h3>
              <p style="font-size: 0.8125rem; color: var(--text-muted);">High-demand industry competencies</p>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="font-size: 0.9rem;">Cloud & Containerization</strong>
                <span class="badge badge-success">High Demand</span>
              </div>
              <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 8px;">
                Docker, Kubernetes, and AWS architecture are essential for modern software and systems engineering.
              </p>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span class="badge badge-subtle">AWS</span>
                <span class="badge badge-subtle">Docker</span>
                <span class="badge badge-subtle">Kubernetes</span>
              </div>
            </div>

            <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="font-size: 0.9rem;">Distributed Systems & Microservices</strong>
                <span class="badge badge-primary">Core Skill</span>
              </div>
              <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 8px;">
                REST APIs, event-driven message queues (Kafka), and gRPC service interconnects.
              </p>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span class="badge badge-subtle">Kafka</span>
                <span class="badge badge-subtle">Express/FastAPI</span>
                <span class="badge badge-subtle">Redis</span>
              </div>
            </div>

            <button class="btn btn-primary btn-sm" id="launch-skillmap-side-btn" style="width: 100%; margin-top: 6px;">
              Launch Personalized Skill Map ➔
            </button>
          </div>
        </div>
      </section>
    `;

    this.bindEvents();
  },

  bindEvents() {
    // Navigation card clicks
    document.getElementById('card-notes')?.addEventListener('click', () => window.appState.setView('semester-select'));
    document.getElementById('card-question-papers')?.addEventListener('click', () => window.appState.setView('question-papers'));
    document.getElementById('card-dept-roles')?.addEventListener('click', () => window.appState.setView('dept-roles'));
    document.getElementById('card-projects')?.addEventListener('click', () => window.appState.setView('projects'));
    document.getElementById('card-certifications')?.addEventListener('click', () => window.appState.setView('certifications'));
    document.getElementById('card-roadmaps')?.addEventListener('click', () => window.appState.setView('roadmaps'));
    // Top Metrics Stat Card clicks
    document.getElementById('stat-card-notes')?.addEventListener('click', () => window.appState.setView('semester-select'));
    document.getElementById('stat-card-qps')?.addEventListener('click', () => window.appState.setView('question-papers'));
    document.getElementById('stat-card-roles')?.addEventListener('click', () => window.appState.setView('dept-roles'));
    document.getElementById('stat-card-projects')?.addEventListener('click', () => window.appState.setView('projects'));
    document.getElementById('stat-card-certs')?.addEventListener('click', () => window.appState.setView('certifications'));

    // Hero buttons
    document.getElementById('dash-browse-notes-btn')?.addEventListener('click', () => window.appState.setView('notes'));
    document.getElementById('dash-skill-map-btn')?.addEventListener('click', () => window.appState.setView('skill-map'));
    document.getElementById('dash-change-dept-btn')?.addEventListener('click', () => window.appState.setView('department-select'));

    // Anna University Regulation Switchers
    document.getElementById('dash-switch-r2021')?.addEventListener('click', () => {
      window.appState.setRegulation('R2021');
      this.render();
    });
    document.getElementById('dash-switch-r2025')?.addEventListener('click', () => {
      window.appState.setRegulation('R2025');
      this.render();
    });

    // Secondary buttons
    document.getElementById('view-all-notes-btn')?.addEventListener('click', () => window.appState.setView('notes'));
    document.getElementById('launch-skillmap-side-btn')?.addEventListener('click', () => window.appState.setView('skill-map'));

    // Quick preview buttons
    document.querySelectorAll('.quick-preview-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-title');
        const file = btn.getAttribute('data-file');
        window.PdfViewerModal.open({
          title,
          fileName: file,
          fileUrl: file,
          downloadCount: 482
        });
      });
    });
  }
};
