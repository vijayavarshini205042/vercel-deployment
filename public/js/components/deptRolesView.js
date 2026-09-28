/**
 * Level 1: Departmental Roles & Skills & Free Certification View
 * Shows:
 * 1. Existing Departmental Job Roles (UNTOUCHED, preserved 100%)
 * 2. New "Department Skills & Free Certification Path" section under EACH department:
 *    - 8-step visual certification roadmap
 *    - Search & multi-parameter filters (Skill, Platform, Level, Certificate type, Category)
 *    - Detailed skill cards with "Start Learning" opening official course links in a new tab
 */

window.DeptRolesView = {
  currentFilters: {
    search: '',
    platform: 'ALL',
    level: 'ALL',
    category: 'ALL',
    certStatus: 'ALL'
  },

  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const currentDeptCode = state.department || 'IT';
    
    // Fallback dept data if not found
    const deptList = window.AppFallbackData?.departments || [];
    const dept = deptList.find(d => d.code === currentDeptCode) || {
      name: currentDeptCode + " Engineering", code: currentDeptCode, icon: "🏛️"
    };

    // 1. Get existing job roles from CareerData (MUST REMAIN COMPLETELY UNCHANGED)
    const roles = window.CareerData?.getRoles(currentDeptCode) || [];
    const categories = window.CareerData?.getCategories(currentDeptCode) || [];

    // 2. Get Department Skills & Free Certification data
    const skillsData = window.DeptSkillsCertData?.[currentDeptCode] || {
      deptCode: currentDeptCode,
      deptName: dept.name,
      roadmap: [],
      skills: []
    };

    const roadmapSteps = skillsData.roadmap || [];
    const allSkills = skillsData.skills || [];

    // Extract unique platforms and categories for dynamic filter dropdowns
    const platforms = Array.from(new Set(allSkills.map(s => s.platform))).filter(Boolean);
    const skillCategories = Array.from(new Set(allSkills.map(s => s.category))).filter(Boolean);

    container.innerHTML = `
      <div style="max-width: 1200px; margin: 0 auto; width: 100%; padding-bottom: 60px;">
        <!-- Breadcrumb -->
        <div class="flow-breadcrumb" style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">
          <button class="breadcrumb-step completed" id="sbc-dept-roles">🏛️ ${dept.code}</button>
          <span class="breadcrumb-arrow">→</span>
          <span class="breadcrumb-step current">💼 Departmental Job Roles & Certifications</span>
        </div>

        <!-- ===============================================================
             SECTION 1: EXISTING DEPARTMENTAL JOB ROLES (PRESERVED 100%)
             =============================================================== -->
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 72px; height: 72px; border-radius: var(--radius-xl); background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-size: 2.5rem; margin-bottom: 16px; box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);">
            💼
          </div>
          <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 12px; color: var(--text-primary);">
            Career Paths in ${dept.code}
          </h1>
          <p style="color: var(--text-secondary); max-width: 650px; margin: 0 auto; font-size: 1.1rem; line-height: 1.6;">
            Select a specific job role below to view required skills, tools, projects, and a step-by-step roadmap to achieve it.
          </p>
        </div>

        ${roles.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">🚧</div>
            <div class="empty-state-title">Roles in Progress</div>
            <div class="empty-state-desc">We are actively curating career roles and roadmaps for ${dept.name}. Please check back later.</div>
            <button class="btn btn-primary" id="dr-back-dashboard">Return to Dashboard</button>
          </div>
        ` : `
          <!-- Categories & Roles -->
          <div style="display: flex; flex-direction: column; gap: 40px; margin-bottom: 60px;">
            ${categories.map(category => {
              const categoryRoles = roles.filter(r => r.category === category);
              if (categoryRoles.length === 0) return '';
              
              return `
                <div class="role-category-section">
                  <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 20px; border-bottom: 2px solid var(--border-color); padding-bottom: 10px;">
                    📌 ${category}
                  </h2>
                  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px;">
                    ${categoryRoles.map((role, idx) => `
                      <div class="card card-hoverable role-nav-card" data-role-id="${role.id}" style="cursor: pointer; animation: semFadeIn ${0.1 + idx * 0.05}s ease-out both;">
                        <div style="padding: 24px;">
                          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-700); margin: 0; line-height: 1.3;">
                              ${role.title}
                            </h3>
                            <span class="badge badge-success" style="font-size: 0.75rem;">${role.salary}</span>
                          </div>
                          <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0 0 16px; line-height: 1.5;">
                            ${role.desc}
                          </p>
                          <div style="display: flex; justify-content: flex-end;">
                            <span style="font-size: 0.875rem; font-weight: 600; color: var(--color-primary-600); display: flex; align-items: center; gap: 6px;">
                              View Skills & Roadmap ➔
                            </span>
                          </div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}

        <!-- ===============================================================
             SECTION 2: NEW DEPARTMENT SKILLS & FREE CERTIFICATION PATH
             =============================================================== -->
        <div id="dept-skills-certification-section" class="dept-skills-cert-container" style="border-top: 3px solid var(--border-color); padding-top: 50px; margin-top: 30px;">
          <!-- Section Header -->
          <div style="text-align: center; margin-bottom: 36px;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: var(--radius-xl); background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; font-size: 2rem; margin-bottom: 16px; box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);">
              🎓
            </div>
            <h2 style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">
              Department Skills & Free Certification Path
            </h2>
            <p style="color: var(--text-secondary); max-width: 720px; margin: 0 auto; font-size: 1.05rem; line-height: 1.6;">
              Structured 8-step roadmap, core technical & emerging skills, and official free certification courses for <strong>${dept.code} – ${dept.name}</strong>.
            </p>
          </div>

          <!-- E. DEPARTMENT-SPECIFIC CERTIFICATION ROADMAP -->
          <div class="cert-roadmap-wrapper">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
              <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0; display: flex; align-items: center; gap: 8px;">
                🗺️ ${dept.code} Certification Roadmap (8-Step Path)
              </h3>
              <span class="badge badge-info" style="font-size: 0.8rem;">Beginner to Industry Standard</span>
            </div>

            <div class="cert-roadmap-timeline">
              ${roadmapSteps.map((step, idx) => `
                <div class="roadmap-step-card" style="animation: semFadeIn ${0.1 + idx * 0.04}s ease-out both;">
                  <div class="roadmap-step-header">
                    <span class="roadmap-step-num">${step.step}</span>
                    <span class="badge" style="font-size: 0.7rem; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--color-primary-600); font-weight: 600;">
                      ${step.badge || 'Step ' + step.step}
                    </span>
                  </div>
                  <div class="roadmap-step-title">${step.title}</div>
                  <p class="roadmap-step-desc">${step.description}</p>
                  ${step.platform ? `
                    <div style="margin-top: 10px; font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 4px;">
                      <span>🏢 <strong>Platform:</strong> ${step.platform}</span>
                    </div>
                  ` : ''}
                  ${step.tools ? `
                    <div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 4px;">
                      ${step.tools.map(t => `<span class="badge" style="font-size: 0.68rem; padding: 2px 6px;">${t}</span>`).join('')}
                    </div>
                  ` : ''}
                  ${step.url ? `
                    <div style="margin-top: 10px;">
                      <a href="${step.url}" target="_blank" rel="noopener noreferrer" style="font-size: 0.78rem; font-weight: 600; color: var(--color-primary-600); text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                        Explore Track ↗
                      </a>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- G. FILTERS & SEARCH -->
          <div class="cert-filters-panel">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                🔍 Filter Department Skills & Certifications
              </div>
              <div id="dsc-results-counter" style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">
                Showing ${allSkills.length} skills
              </div>
            </div>

            <div class="cert-filter-grid">
              <!-- Search -->
              <div>
                <input type="text" id="dsc-filter-search" class="input" placeholder="Search skill, course, or tool..." style="width: 100%; font-size: 0.9rem;" />
              </div>

              <!-- Platform Filter -->
              <div>
                <select id="dsc-filter-platform" class="select" style="width: 100%; font-size: 0.85rem;">
                  <option value="ALL">All Platforms</option>
                  ${platforms.map(p => `<option value="${p}">${p}</option>`).join('')}
                </select>
              </div>

              <!-- Level Filter -->
              <div>
                <select id="dsc-filter-level" class="select" style="width: 100%; font-size: 0.85rem;">
                  <option value="ALL">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <!-- Category / Tech Filter -->
              <div>
                <select id="dsc-filter-category" class="select" style="width: 100%; font-size: 0.85rem;">
                  <option value="ALL">All Categories</option>
                  ${skillCategories.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>

              <!-- Certificate Status Filter -->
              <div>
                <select id="dsc-filter-cert" class="select" style="width: 100%; font-size: 0.85rem;">
                  <option value="ALL">All Certificates</option>
                  <option value="Free Certificate">Free Digital Certificate</option>
                  <option value="Paid Exam">Paid Exam (Free Learning)</option>
                </select>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
              <button class="btn btn-ghost" id="dsc-filter-reset" style="font-size: 0.82rem; padding: 4px 10px;">
                ✕ Reset Filters
              </button>
            </div>
          </div>

          <!-- F. SKILL CARDS GRID -->
          <div id="dsc-skills-container" class="skill-cards-grid">
            <!-- Populated dynamically via renderSkills() -->
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 50px;">
          <button class="btn btn-ghost" id="dr-back-dashboard-bottom">← Back to Dashboard</button>
        </div>
      </div>
    `;

    // Render initial skills cards
    this.renderSkills(allSkills, currentDeptCode);

    // Bind event listeners
    this.bindEvents(currentDeptCode, allSkills);
  },

  renderSkills(skills, currentDeptCode) {
    const container = document.getElementById('dsc-skills-container');
    const counter = document.getElementById('dsc-results-counter');
    if (!container) return;

    // Filter skills according to active filters
    const filtered = skills.filter(skill => {
      const q = this.currentFilters.search.toLowerCase().trim();
      if (q) {
        const matchName = skill.name?.toLowerCase().includes(q);
        const matchWhy = skill.whyUseful?.toLowerCase().includes(q);
        const matchCourse = skill.courseName?.toLowerCase().includes(q);
        const matchTool = skill.toolOrTech?.toLowerCase().includes(q);
        const matchPlatform = skill.platform?.toLowerCase().includes(q);
        if (!matchName && !matchWhy && !matchCourse && !matchTool && !matchPlatform) return false;
      }

      if (this.currentFilters.platform !== 'ALL' && skill.platform !== this.currentFilters.platform) {
        return false;
      }

      if (this.currentFilters.level !== 'ALL' && skill.level !== this.currentFilters.level) {
        return false;
      }

      if (this.currentFilters.category !== 'ALL' && skill.category !== this.currentFilters.category) {
        return false;
      }

      if (this.currentFilters.certStatus !== 'ALL' && skill.certStatus !== this.currentFilters.certStatus) {
        return false;
      }

      return true;
    });

    if (counter) {
      counter.textContent = `Showing ${filtered.length} of ${skills.length} skills`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: var(--bg-surface); border: 1px dashed var(--border-color); border-radius: var(--radius-lg);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
          <h4 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 8px;">No matching skills found</h4>
          <p style="color: var(--text-secondary); margin-bottom: 16px;">Try clearing your search query or selecting "All Platforms" / "All Levels".</p>
          <button class="btn btn-secondary" id="dsc-empty-reset">Reset All Filters</button>
        </div>
      `;
      document.getElementById('dsc-empty-reset')?.addEventListener('click', () => {
        this.resetFilters(skills, currentDeptCode);
      });
      return;
    }

    container.innerHTML = filtered.map((skill, idx) => `
      <div class="dept-skill-card" style="animation: semFadeIn ${0.1 + idx * 0.04}s ease-out both;">
        <!-- Card Top Badges -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 14px; flex-wrap: wrap;">
          <span class="badge" style="background: var(--color-primary-50); color: var(--color-primary-700); border: 1px solid var(--color-primary-200); font-weight: 600; font-size: 0.75rem;">
            🏷️ ${skill.category || 'Skill'}
          </span>
          <span class="badge" style="background: var(--bg-surface-elevated); color: var(--text-secondary); border: 1px solid var(--border-color); font-size: 0.72rem;">
            📊 ${skill.level}
          </span>
        </div>

        <!-- Skill Name -->
        <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin: 0 0 10px; line-height: 1.35;">
          ${skill.name}
        </h3>

        <!-- Why It Is Useful -->
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0 0 16px; flex-grow: 1;">
          ${skill.whyUseful}
        </p>

        <!-- Course / Resource & Platform Box -->
        <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px; margin-bottom: 16px;">
          <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
            <span>🏢 <strong>Where to Learn:</strong></span>
            <span style="color: var(--color-primary-600); font-weight: 600;">${skill.platform}</span>
          </div>
          <div style="font-size: 0.88rem; font-weight: 600; color: var(--text-primary); line-height: 1.35; margin-bottom: 8px;">
            📚 ${skill.courseName}
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; font-size: 0.75rem; color: var(--text-secondary);">
            <span>⏱️ ${skill.duration || 'Self-Paced'}</span>
            <span>•</span>
            <span>💻 ${skill.learningMode || 'Online Learning'}</span>
            ${skill.toolOrTech ? `<span>•</span><span>🔧 ${skill.toolOrTech}</span>` : ''}
          </div>
        </div>

        <!-- Certificate Status Badge (Honest Labeling) -->
        <div style="margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span class="${skill.certStatus === 'Free Certificate' ? 'badge-cert-free' : 'badge-cert-paid'}">
              ${skill.certStatus === 'Free Certificate' ? '✅ Free Learning – Free Digital Certificate' : 'ℹ️ Free Learning – Paid Certification Exam'}
            </span>
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.35;">
            📜 <strong>Certificate:</strong> ${skill.certificateType}
          </div>
        </div>

        <!-- Start Learning Button (Opens Real Official Course/Cert Page in New Tab) -->
        <div style="margin-top: auto;">
          <a href="${skill.courseUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; text-decoration: none; width: 100%;">
            Start Learning ↗
          </a>
        </div>
      </div>
    `).join('');
  },

  resetFilters(skills, currentDeptCode) {
    this.currentFilters = {
      search: '',
      platform: 'ALL',
      level: 'ALL',
      category: 'ALL',
      certStatus: 'ALL'
    };

    const s = document.getElementById('dsc-filter-search');
    const p = document.getElementById('dsc-filter-platform');
    const l = document.getElementById('dsc-filter-level');
    const c = document.getElementById('dsc-filter-category');
    const cert = document.getElementById('dsc-filter-cert');

    if (s) s.value = '';
    if (p) p.value = 'ALL';
    if (l) l.value = 'ALL';
    if (c) c.value = 'ALL';
    if (cert) cert.value = 'ALL';

    this.renderSkills(skills, currentDeptCode);
  },

  bindEvents(currentDeptCode, allSkills) {
    // Navigation / Dashboard buttons
    document.getElementById('sbc-dept-roles')?.addEventListener('click', () => {
      window.appState.setView('dashboard');
    });
    document.getElementById('dr-back-dashboard')?.addEventListener('click', () => {
      window.appState.setView('dashboard');
    });
    document.getElementById('dr-back-dashboard-bottom')?.addEventListener('click', () => {
      window.appState.setView('dashboard');
    });

    // Existing job role cards click event (MUST REMAIN INTACT)
    document.querySelectorAll('.role-nav-card').forEach(card => {
      card.addEventListener('click', () => {
        const roleId = card.getAttribute('data-role-id');
        window.appState.setView('role-detail', { roleId });
      });
    });

    // Filter events
    const searchInput = document.getElementById('dsc-filter-search');
    searchInput?.addEventListener('input', (e) => {
      this.currentFilters.search = e.target.value;
      this.renderSkills(allSkills, currentDeptCode);
    });

    const platformSelect = document.getElementById('dsc-filter-platform');
    platformSelect?.addEventListener('change', (e) => {
      this.currentFilters.platform = e.target.value;
      this.renderSkills(allSkills, currentDeptCode);
    });

    const levelSelect = document.getElementById('dsc-filter-level');
    levelSelect?.addEventListener('change', (e) => {
      this.currentFilters.level = e.target.value;
      this.renderSkills(allSkills, currentDeptCode);
    });

    const categorySelect = document.getElementById('dsc-filter-category');
    categorySelect?.addEventListener('change', (e) => {
      this.currentFilters.category = e.target.value;
      this.renderSkills(allSkills, currentDeptCode);
    });

    const certSelect = document.getElementById('dsc-filter-cert');
    certSelect?.addEventListener('change', (e) => {
      this.currentFilters.certStatus = e.target.value;
      this.renderSkills(allSkills, currentDeptCode);
    });

    const resetBtn = document.getElementById('dsc-filter-reset');
    resetBtn?.addEventListener('click', () => {
      this.resetFilters(allSkills, currentDeptCode);
    });
  }
};
