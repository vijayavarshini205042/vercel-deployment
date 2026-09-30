/**
 * Skills & Professional Certifications Component
 * Integrates:
 * 1. Department-Specific Skills & Free Certification Pathways (8-step roadmap + verified skill courses)
 * 2. Global Industry Certifications Directory (AWS, Cisco, CNCF, Microsoft, CompTIA, etc.)
 */

window.CertificationsView = {
  activeTab: 'dept-certs', // 'dept-certs' | 'global-certs'
  selectedDept: null,

  deptFilters: {
    search: '',
    platform: 'ALL',
    level: 'ALL',
    category: 'ALL',
    certStatus: 'ALL'
  },

  globalFilters: {
    category: 'All',
    search: ''
  },

  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    if (!this.selectedDept) {
      this.selectedDept = window.appState.state.department || 'CSE';
    }

    const deptList = window.AppFallbackData?.departments || [];
    const dept = deptList.find(d => d.code === this.selectedDept) || {
      name: this.selectedDept + " Engineering", code: this.selectedDept, icon: "🏛️"
    };

    // Get Department Skills & Free Certification data from DeptSkillsCertData
    const skillsData = window.DeptSkillsCertData?.[this.selectedDept] || {
      deptCode: this.selectedDept,
      deptName: dept.name,
      roadmap: [],
      skills: []
    };

    const roadmapSteps = skillsData.roadmap || [];
    const allSkills = skillsData.skills || [];

    // Extract unique platforms and categories for department filters
    const platforms = Array.from(new Set(allSkills.map(s => s.platform))).filter(Boolean);
    const skillCategories = Array.from(new Set(allSkills.map(s => s.category))).filter(Boolean);

    // Global Industry Certifications categories
    const globalCategories = ['All', 'Cloud', 'DevOps', 'Cybersecurity', 'Networking', 'Engineering-specific'];
    const allGlobalCerts = (window.AppFallbackData?.certifications || []);

    container.innerHTML = `
      <div style="max-width: 1200px; margin: 0 auto; width: 100%; padding-bottom: 60px;">
        
        <!-- Breadcrumb & Top Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 24px;">
          <div class="flow-breadcrumb" style="display: flex; align-items: center; gap: 8px; margin: 0;">
            <button class="breadcrumb-step completed" id="sbc-certs-dept">🏛️ ${dept.code}</button>
            <span class="breadcrumb-arrow">→</span>
            <span class="breadcrumb-step current">🏆 Skills & Certifications</span>
          </div>

          <!-- Quick Department Selector -->
          <div style="display: flex; align-items: center; gap: 8px;">
            <label for="certs-dept-switcher" style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted); white-space: nowrap;">
              Switch Department:
            </label>
            <select id="certs-dept-switcher" class="form-select" style="font-size: 0.85rem; padding: 6px 12px; max-width: 280px;">
              ${deptList.map(d => `
                <option value="${d.code}" ${d.code === this.selectedDept ? 'selected' : ''}>
                  ${d.code} – ${d.name}
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- Page Main Header -->
        <div style="margin-bottom: 32px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <span class="badge badge-warning" style="font-size: 0.8rem; padding: 4px 10px;">🏆 Industry Validated Credentials</span>
            <span class="badge badge-primary" style="font-size: 0.8rem; padding: 4px 10px;">🎓 Verified Course Roadmaps</span>
          </div>
          <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">
            Skills & Verified Certifications
          </h1>
          <p style="color: var(--text-secondary); max-width: 780px; font-size: 1.05rem; line-height: 1.6;">
            Explore department-specific skill progression paths, 100% verified official course certifications for <strong>${dept.code}</strong>, and globally recognized engineering credentials.
          </p>
        </div>

        <!-- Dual Mode Navigation Tabs -->
        <div style="display: flex; gap: 12px; border-bottom: 2px solid var(--border-color); margin-bottom: 32px; flex-wrap: wrap;">
          <button 
            id="tab-btn-dept-certs" 
            class="tab-btn ${this.activeTab === 'dept-certs' ? 'active' : ''}" 
            style="display: flex; align-items: center; gap: 8px; padding: 12px 20px; font-weight: 700; font-size: 0.95rem; background: none; border: none; cursor: pointer; border-bottom: 3px solid ${this.activeTab === 'dept-certs' ? 'var(--color-primary-600)' : 'transparent'}; color: ${this.activeTab === 'dept-certs' ? 'var(--color-primary-600)' : 'var(--text-secondary)'}; transition: all 0.2s;"
          >
            <span>🎓 ${dept.code} Skills & Certification Path</span>
            <span class="badge" style="background: var(--bg-surface-elevated); font-size: 0.75rem; border: 1px solid var(--border-color);">${allSkills.length} Courses</span>
          </button>
          
          <button 
            id="tab-btn-global-certs" 
            class="tab-btn ${this.activeTab === 'global-certs' ? 'active' : ''}" 
            style="display: flex; align-items: center; gap: 8px; padding: 12px 20px; font-weight: 700; font-size: 0.95rem; background: none; border: none; cursor: pointer; border-bottom: 3px solid ${this.activeTab === 'global-certs' ? 'var(--color-primary-600)' : 'transparent'}; color: ${this.activeTab === 'global-certs' ? 'var(--color-primary-600)' : 'var(--text-secondary)'}; transition: all 0.2s;"
          >
            <span>🏆 Global Industry Certifications</span>
            <span class="badge" style="background: var(--bg-surface-elevated); font-size: 0.75rem; border: 1px solid var(--border-color);">${allGlobalCerts.length} Programs</span>
          </button>
        </div>

        <!-- ===============================================================
             TAB 1: DEPARTMENT SKILLS & FREE CERTIFICATION PATH
             =============================================================== -->
        <div id="section-dept-certs" style="display: ${this.activeTab === 'dept-certs' ? 'block' : 'none'};">
          
          <!-- Visual 8-Step Certification Roadmap -->
          <div class="cert-roadmap-wrapper">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
              <div>
                <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary); margin: 0; display: flex; align-items: center; gap: 8px;">
                  🗺️ ${dept.code} Certification Roadmap (8-Step Path)
                </h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 4px 0 0;">
                  From first-year foundations to internationally recognized industry credentials.
                </p>
              </div>
              <span class="badge badge-info" style="font-size: 0.8rem; padding: 6px 12px;">Beginner → Industry Standard</span>
            </div>

            <div class="cert-roadmap-timeline">
              ${roadmapSteps.map((step, idx) => `
                <div class="roadmap-step-card" style="animation: semFadeIn ${0.08 + idx * 0.03}s ease-out both;">
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
                    <div style="margin-top: 12px; border-top: 1px dashed var(--border-subtle); padding-top: 8px;">
                      <a href="${step.url}" target="_blank" rel="noopener noreferrer" style="font-size: 0.78rem; font-weight: 700; color: var(--color-primary-600); text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                        Explore Track ↗
                      </a>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Multi-Parameter Filters & Search -->
          <div class="cert-filters-panel">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                🔍 Filter ${dept.code} Skills & Certifications
              </div>
              <div id="dsc-results-counter" style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">
                Showing ${allSkills.length} skills
              </div>
            </div>

            <div class="cert-filter-grid">
              <!-- Search -->
              <div>
                <input 
                  type="text" 
                  id="dsc-filter-search" 
                  class="input" 
                  placeholder="Search skill, course, or tool..." 
                  value="${this.deptFilters.search}"
                  style="width: 100%; font-size: 0.9rem;" 
                />
              </div>

              <!-- Platform Filter -->
              <div>
                <select id="dsc-filter-platform" class="select" style="width: 100%; font-size: 0.85rem;">
                  <option value="ALL">All Platforms</option>
                  ${platforms.map(p => `<option value="${p}" ${p === this.deptFilters.platform ? 'selected' : ''}>${p}</option>`).join('')}
                </select>
              </div>

              <!-- Level Filter -->
              <div>
                <select id="dsc-filter-level" class="select" style="width: 100%; font-size: 0.85rem;">
                  <option value="ALL">All Levels</option>
                  <option value="Beginner" ${this.deptFilters.level === 'Beginner' ? 'selected' : ''}>Beginner</option>
                  <option value="Intermediate" ${this.deptFilters.level === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                  <option value="Advanced" ${this.deptFilters.level === 'Advanced' ? 'selected' : ''}>Advanced</option>
                </select>
              </div>

              <!-- Category Filter -->
              <div>
                <select id="dsc-filter-category" class="select" style="width: 100%; font-size: 0.85rem;">
                  <option value="ALL">All Categories</option>
                  ${skillCategories.map(c => `<option value="${c}" ${c === this.deptFilters.category ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>

              <!-- Certificate Status Filter -->
              <div>
                <select id="dsc-filter-cert" class="select" style="width: 100%; font-size: 0.85rem;">
                  <option value="ALL">All Certificates</option>
                  <option value="Free Certificate" ${this.deptFilters.certStatus === 'Free Certificate' ? 'selected' : ''}>Free Digital Certificate</option>
                  <option value="Paid Exam" ${this.deptFilters.certStatus === 'Paid Exam' ? 'selected' : ''}>Paid Exam (Free Learning)</option>
                </select>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
              <button class="btn btn-ghost" id="dsc-filter-reset" style="font-size: 0.82rem; padding: 4px 10px;">
                ✕ Reset Filters
              </button>
            </div>
          </div>

          <!-- Skills Cards Grid -->
          <div id="dsc-skills-container" class="skill-cards-grid">
            <!-- Dynamically populated via renderDeptSkills -->
          </div>
        </div>

        <!-- ===============================================================
             TAB 2: GLOBAL INDUSTRY CERTIFICATIONS DIRECTORY
             =============================================================== -->
        <div id="section-global-certs" style="display: ${this.activeTab === 'global-certs' ? 'block' : 'none'};">
          
          <!-- Category Chips & Search Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
            <!-- Category Chips -->
            <div class="chip-container" style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${globalCategories.map(cat => `
                <button 
                  class="chip cert-cat-chip ${this.globalFilters.category === cat ? 'active' : ''}" 
                  data-cat="${cat}"
                  style="cursor: pointer;"
                >
                  ${cat}
                </button>
              `).join('')}
            </div>

            <!-- Global Search box -->
            <div style="position: relative; width: 320px;">
              <input 
                type="text" 
                id="cert-search-input" 
                class="form-input" 
                placeholder="Search certification or provider..." 
                value="${this.globalFilters.search}"
                style="padding-left: 36px;"
              >
              <span style="position: absolute; left: 12px; top: 10px; color: var(--text-muted);">🔍</span>
            </div>
          </div>

          <!-- Global Certifications Grid -->
          <div id="global-certs-container">
            <!-- Dynamically populated via renderGlobalCerts -->
          </div>
        </div>

      </div>
    `;

    // Render both sub-views
    this.renderDeptSkills(allSkills);
    this.renderGlobalCerts();

    // Bind all user events
    this.bindEvents(allSkills);
  },

  renderDeptSkills(skills) {
    const container = document.getElementById('dsc-skills-container');
    const counter = document.getElementById('dsc-results-counter');
    if (!container) return;

    // Filter skills according to active deptFilters
    const filtered = skills.filter(skill => {
      const q = this.deptFilters.search.toLowerCase().trim();
      if (q) {
        const matchName = skill.name?.toLowerCase().includes(q);
        const matchWhy = skill.whyUseful?.toLowerCase().includes(q);
        const matchCourse = skill.courseName?.toLowerCase().includes(q);
        const matchTool = skill.toolOrTech?.toLowerCase().includes(q);
        const matchPlatform = skill.platform?.toLowerCase().includes(q);
        if (!matchName && !matchWhy && !matchCourse && !matchTool && !matchPlatform) return false;
      }

      if (this.deptFilters.platform !== 'ALL' && skill.platform !== this.deptFilters.platform) {
        return false;
      }

      if (this.deptFilters.level !== 'ALL' && skill.level !== this.deptFilters.level) {
        return false;
      }

      if (this.deptFilters.category !== 'ALL' && skill.category !== this.deptFilters.category) {
        return false;
      }

      if (this.deptFilters.certStatus !== 'ALL' && skill.certStatus !== this.deptFilters.certStatus) {
        return false;
      }

      return true;
    });

    if (counter) {
      counter.textContent = `Showing ${filtered.length} of ${skills.length} skills & courses`;
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
        this.resetDeptFilters(skills);
      });
      return;
    }

    container.innerHTML = filtered.map((skill, idx) => {
      const isBookmarked = window.appState.isBookmarked(skill.id || ('skill-' + idx));
      return `
        <div class="dept-skill-card" style="animation: semFadeIn ${0.08 + idx * 0.03}s ease-out both;">
          <!-- Card Top Badges & Bookmark -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 14px;">
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <span class="badge" style="background: var(--color-primary-50); color: var(--color-primary-700); border: 1px solid var(--color-primary-200); font-weight: 600; font-size: 0.75rem;">
                🏷️ ${skill.category || 'Skill'}
              </span>
              <span class="badge" style="background: var(--bg-surface-elevated); color: var(--text-secondary); border: 1px solid var(--border-color); font-size: 0.72rem;">
                📊 ${skill.level}
              </span>
            </div>

            <button 
              class="btn btn-icon btn-ghost bookmark-skill-btn" 
              data-skill-id="${skill.id || ('skill-' + idx)}" 
              data-skill-name="${skill.name}"
              title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Skill Course'}"
              style="padding: 2px;"
            >
              <span style="font-size: 1.2rem;">${isBookmarked ? '⭐' : '☆'}</span>
            </button>
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
            <a 
              href="${skill.courseUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn btn-primary" 
              style="display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; text-decoration: none; width: 100%;"
            >
              Start Learning ↗
            </a>
          </div>
        </div>
      `;
    }).join('');

    // Attach bookmark handlers
    container.querySelectorAll('.bookmark-skill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-skill-id');
        const name = btn.getAttribute('data-skill-name');
        const added = window.appState.toggleBookmark({
          id,
          title: name,
          type: 'Certification',
          category: 'Certifications',
          deptCode: this.selectedDept,
          regCode: window.appState.regulation
        });
        window.Toast.info(added ? `Bookmarked: ${name}` : `Removed bookmark`);
        this.renderDeptSkills(skills);
      });
    });
  },

  renderGlobalCerts() {
    const container = document.getElementById('global-certs-container');
    if (!container) return;

    const allCerts = (window.AppFallbackData?.certifications || []).filter(c => {
      const matchesCat = this.globalFilters.category === 'All' || c.category === this.globalFilters.category;
      const q = this.globalFilters.search.toLowerCase().trim();
      const matchesSearch = !q || 
        c.title.toLowerCase().includes(q) || 
        c.provider.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });

    if (allCerts.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🏆</div>
          <div class="empty-state-title">No Certifications Match Criteria</div>
          <div class="empty-state-desc">Try choosing "All" categories or clearing your search keywords.</div>
          <button class="btn btn-secondary" id="global-certs-reset" style="margin-top: 14px;">Reset Filter to "All"</button>
        </div>
      `;
      document.getElementById('global-certs-reset')?.addEventListener('click', () => {
        this.globalFilters.category = 'All';
        this.globalFilters.search = '';
        const searchInput = document.getElementById('cert-search-input');
        if (searchInput) searchInput.value = '';
        this.renderGlobalCerts();
        this.updateGlobalChips();
      });
      return;
    }

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px;">
        ${allCerts.map((cert, idx) => {
          const isBookmarked = window.appState.isBookmarked(cert.id);
          return `
            <div class="card card-hoverable" style="padding: 24px; display: flex; flex-direction: column; animation: semFadeIn ${0.08 + idx * 0.03}s ease-out both;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 8px;">
                <div>
                  <span class="badge badge-primary" style="margin-bottom: 6px;">${cert.category}</span>
                  <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin: 0; line-height: 1.35;">
                    ${cert.title}
                  </h3>
                  <div style="font-size: 0.8125rem; font-weight: 600; color: var(--color-primary-600); margin-top: 4px;">
                    Issued by ${cert.provider}
                  </div>
                </div>

                <button 
                  class="btn btn-icon btn-ghost bookmark-cert-btn"
                  data-certid="${cert.id}"
                  data-title="${cert.title}"
                  title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Certification'}"
                >
                  <span style="font-size: 1.25rem;">${isBookmarked ? '⭐' : '☆'}</span>
                </button>
              </div>

              <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px; flex-grow: 1;">
                ${cert.description}
              </p>

              <!-- Exam format details -->
              <div style="background: var(--bg-subtle); padding: 10px 14px; border-radius: var(--radius-md); margin-bottom: 16px; font-size: 0.8125rem;">
                <div style="font-weight: 600; color: var(--text-muted); margin-bottom: 2px; font-size: 0.7rem; text-transform: uppercase;">Examination Format:</div>
                <div style="color: var(--text-primary); font-weight: 500;">${cert.examFormat}</div>
              </div>

              <!-- Prep resources -->
              <div style="margin-bottom: 20px;">
                <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">
                  Recommended Preparation:
                </div>
                <ul style="margin: 0; padding-left: 18px; font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5;">
                  ${(cert.prepResources || []).map(r => `<li>${r}</li>`).join('')}
                </ul>
              </div>

              <!-- Action button: Official portal link -->
              <div style="border-top: 1px solid var(--border-subtle); padding-top: 16px; margin-top: auto;">
                <a 
                  href="${cert.officialUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-primary btn-sm" 
                  style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px; font-weight: 600;"
                >
                  🌐 Official Exam Portal ↗
                </a>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Bookmark event listeners
    container.querySelectorAll('.bookmark-cert-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-certid');
        const title = btn.getAttribute('data-title');
        const added = window.appState.toggleBookmark({
          id,
          title,
          type: 'Certification',
          category: 'Certifications',
          deptCode: this.selectedDept,
          regCode: window.appState.regulation
        });
        window.Toast.info(added ? `Bookmarked: ${title}` : `Removed bookmark`);
        this.renderGlobalCerts();
      });
    });
  },

  updateGlobalChips() {
    document.querySelectorAll('.cert-cat-chip').forEach(chip => {
      if (chip.getAttribute('data-cat') === this.globalFilters.category) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  },

  resetDeptFilters(skills) {
    this.deptFilters = {
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

    this.renderDeptSkills(skills);
  },

  bindEvents(allSkills) {
    // Breadcrumb
    document.getElementById('sbc-certs-dept')?.addEventListener('click', () => {
      window.appState.setView('dashboard');
    });

    // Department Switcher
    const deptSwitcher = document.getElementById('certs-dept-switcher');
    deptSwitcher?.addEventListener('change', (e) => {
      this.selectedDept = e.target.value;
      this.render();
    });

    // Dual Tab Buttons
    const tabDept = document.getElementById('tab-btn-dept-certs');
    const tabGlobal = document.getElementById('tab-btn-global-certs');
    const secDept = document.getElementById('section-dept-certs');
    const secGlobal = document.getElementById('section-global-certs');

    tabDept?.addEventListener('click', () => {
      this.activeTab = 'dept-certs';
      tabDept.classList.add('active');
      tabDept.style.borderBottomColor = 'var(--color-primary-600)';
      tabDept.style.color = 'var(--color-primary-600)';
      
      tabGlobal.classList.remove('active');
      tabGlobal.style.borderBottomColor = 'transparent';
      tabGlobal.style.color = 'var(--text-secondary)';

      if (secDept) secDept.style.display = 'block';
      if (secGlobal) secGlobal.style.display = 'none';
    });

    tabGlobal?.addEventListener('click', () => {
      this.activeTab = 'global-certs';
      tabGlobal.classList.add('active');
      tabGlobal.style.borderBottomColor = 'var(--color-primary-600)';
      tabGlobal.style.color = 'var(--color-primary-600)';
      
      tabDept.classList.remove('active');
      tabDept.style.borderBottomColor = 'transparent';
      tabDept.style.color = 'var(--text-secondary)';

      if (secGlobal) secGlobal.style.display = 'block';
      if (secDept) secDept.style.display = 'none';
    });

    // Dept Filter Events
    const searchInput = document.getElementById('dsc-filter-search');
    searchInput?.addEventListener('input', (e) => {
      this.deptFilters.search = e.target.value;
      this.renderDeptSkills(allSkills);
    });

    const platformSelect = document.getElementById('dsc-filter-platform');
    platformSelect?.addEventListener('change', (e) => {
      this.deptFilters.platform = e.target.value;
      this.renderDeptSkills(allSkills);
    });

    const levelSelect = document.getElementById('dsc-filter-level');
    levelSelect?.addEventListener('change', (e) => {
      this.deptFilters.level = e.target.value;
      this.renderDeptSkills(allSkills);
    });

    const categorySelect = document.getElementById('dsc-filter-category');
    categorySelect?.addEventListener('change', (e) => {
      this.deptFilters.category = e.target.value;
      this.renderDeptSkills(allSkills);
    });

    const certSelect = document.getElementById('dsc-filter-cert');
    certSelect?.addEventListener('change', (e) => {
      this.deptFilters.certStatus = e.target.value;
      this.renderDeptSkills(allSkills);
    });

    const resetBtn = document.getElementById('dsc-filter-reset');
    resetBtn?.addEventListener('click', () => {
      this.resetDeptFilters(allSkills);
    });

    // Global Filter Events
    document.querySelectorAll('.cert-cat-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.globalFilters.category = chip.getAttribute('data-cat');
        this.updateGlobalChips();
        this.renderGlobalCerts();
      });
    });

    const globalSearchInput = document.getElementById('cert-search-input');
    globalSearchInput?.addEventListener('input', (e) => {
      this.globalFilters.search = e.target.value;
      this.renderGlobalCerts();
    });
  }
};
