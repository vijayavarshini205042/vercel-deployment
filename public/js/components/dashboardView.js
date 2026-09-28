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
    const allCerts = window.AppFallbackData?.certifications || [];

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
      </section>

      <!-- Department Statistics Metrics -->
      <section class="stats-grid" aria-label="Department Statistics">
        <div class="stat-card">
          <div class="stat-icon" style="background: var(--color-primary-50); color: var(--color-primary-600);">📚</div>
          <div class="stat-info">
            <span class="stat-value">${allNotes.length}</span>
            <span class="stat-label">Lecture Notes & Units</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: #ecfdf5; color: #059669;">📝</div>
          <div class="stat-info">
            <span class="stat-value">${allQPs.length}</span>
            <span class="stat-label">Past Question Papers</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: #eff6ff; color: #2563eb;">💼</div>
          <div class="stat-info">
            <span class="stat-value">${allRoles.length}</span>
            <span class="stat-label">Mapped Job Roles</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: #faf5ff; color: #9333ea;">💡</div>
          <div class="stat-info">
            <span class="stat-value">${allProjects.length}</span>
            <span class="stat-label">Curated Project Ideas</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: #fffbeb; color: #d97706;">🏆</div>
          <div class="stat-info">
            <span class="stat-value">${allCerts.length}</span>
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

          <!-- Departmental Roles & Free Skills -->
          <div class="resource-nav-card" id="card-dept-roles">
            <div class="resource-card-icon" style="background: linear-gradient(135deg, #fef3c7, #fffbeb); color: #d97706;">💼</div>
            <h3 class="resource-card-title">Dept. Roles & Free Skills</h3>
            <p class="resource-card-desc">
              Career roles specific to ${dept.code}, required skills, and 100% free certification paths (freeCodeCamp, Cisco, Kaggle, and more).
            </p>
            <div class="resource-card-footer">
              <span>Explore Skills & Certs</span>
              <span>➔</span>
            </div>
          </div>

          <!-- Visual Roadmaps -->
          <div class="resource-nav-card" id="card-roadmaps">
            <div class="resource-card-icon" style="background: #fdf2f8; color: #db2777;">🗺️</div>
            <h3 class="resource-card-title">Visual Career Roadmaps</h3>
            <p class="resource-card-desc">
              Step-by-step interactive flowcharts guiding you from foundational engineering prerequisites to production-ready mastery and interview questions.
            </p>
            <div class="resource-card-footer">
              <span>View Learning Trees</span>
              <span>➔</span>
            </div>
          </div>

          <!-- Project Corner -->
          <div class="resource-nav-card" id="card-projects">
            <div class="resource-card-icon" style="background: #faf5ff; color: #9333ea;">💡</div>
            <h3 class="resource-card-title">Project & Skill Corner</h3>
            <p class="resource-card-desc">
              High-impact Mini and Final Year project ideas with problem statements, architecture flows, verified technology stacks, and difficulty levels.
            </p>
            <div class="resource-card-footer">
              <span>Discover Project Blueprints</span>
              <span>➔</span>
            </div>
          </div>

          <!-- Certifications -->
          <div class="resource-nav-card" id="card-certifications">
            <div class="resource-card-icon" style="background: #fffbeb; color: #d97706;">🏆</div>
            <h3 class="resource-card-title">Industry Certifications</h3>
            <p class="resource-card-desc">
              Verified credentials from AWS, Cisco, Red Hat, Dassault Systèmes, and Google Cloud with official exam outlines and preparation roadmaps.
            </p>
            <div class="resource-card-footer">
              <span>Explore Credentials</span>
              <span>➔</span>
            </div>
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
    document.getElementById('card-roadmaps')?.addEventListener('click', () => window.appState.setView('roadmaps'));
    document.getElementById('card-projects')?.addEventListener('click', () => window.appState.setView('projects'));
    document.getElementById('card-certifications')?.addEventListener('click', () => window.appState.setView('certifications'));

    // Hero buttons
    document.getElementById('dash-browse-notes-btn')?.addEventListener('click', () => window.appState.setView('notes'));
    document.getElementById('dash-skill-map-btn')?.addEventListener('click', () => window.appState.setView('skill-map'));
    document.getElementById('dash-change-dept-btn')?.addEventListener('click', () => window.appState.setView('department-select'));

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
