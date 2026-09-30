/**
 * Page 3: Skills & Certifications View Component
 * Dedicated page for displaying required skills along with FREE certification links/courses.
 * Data Source: /data/skills_certifications.json (window.SkillsCertificationsData)
 * Schema: Skill Name, Recommended Platform offering FREE certificates (Coursera, NPTEL, edX, Google), Direct Resource Link, Skill Level
 */

window.CertificationsView = {
  currentFilters: {
    deptCode: 'ALL',
    level: 'ALL',
    platform: 'ALL',
    search: ''
  },
  skillsCache: null,

  async loadData() {
    if (this.skillsCache && this.skillsCache.length > 0) return this.skillsCache;
    if (window.SkillsCertificationsData && window.SkillsCertificationsData.length > 0) {
      this.skillsCache = window.SkillsCertificationsData;
      return this.skillsCache;
    }
    try {
      const res = await fetch('/data/skills_certifications.json');
      if (res.ok) {
        this.skillsCache = await res.json();
        return this.skillsCache;
      }
    } catch (err) {
      console.warn('Could not fetch /data/skills_certifications.json, falling back to embedded', err);
    }
    this.skillsCache = window.SkillsCertificationsData || [];
    return this.skillsCache;
  },

  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const activeDeptCode = state.department || 'IT';

    if (this.currentFilters.deptCode === 'ALL' && activeDeptCode) {
      this.currentFilters.deptCode = activeDeptCode;
    }

    const allSkills = await this.loadData();
    const deptList = window.AppFallbackData?.departments || [];

    const renderContent = () => {
      const query = this.currentFilters.search.toLowerCase().trim();
      const selectedDept = this.currentFilters.deptCode;
      const selectedLevel = this.currentFilters.level;
      const selectedPlatform = this.currentFilters.platform;

      // Extract unique platforms
      const availablePlatforms = ['ALL', ...Array.from(new Set(
        allSkills.map(s => s.recommendedPlatform)
      )).filter(Boolean)];

      // Filter skills
      const filtered = allSkills.filter(s => {
        const matchesDept = selectedDept === 'ALL' || s.deptCode === selectedDept;
        const matchesLevel = selectedLevel === 'ALL' || s.skillLevel.toLowerCase() === selectedLevel.toLowerCase();
        const matchesPlatform = selectedPlatform === 'ALL' || s.recommendedPlatform.toLowerCase().includes(selectedPlatform.toLowerCase());
        const matchesSearch = !query || 
          s.skillName.toLowerCase().includes(query) || 
          s.department.toLowerCase().includes(query) || 
          s.recommendedPlatform.toLowerCase().includes(query) ||
          (s.category && s.category.toLowerCase().includes(query));
        return matchesDept && matchesLevel && matchesPlatform && matchesSearch;
      });

      const getLevelBadge = (level) => {
        const lvl = (level || 'Intermediate').toLowerCase();
        if (lvl === 'beginner') {
          return `<span class="badge" style="background: rgba(16, 185, 129, 0.12); color: #059669; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 700;">🌱 Beginner</span>`;
        } else if (lvl === 'advanced') {
          return `<span class="badge" style="background: rgba(139, 92, 246, 0.12); color: #7c3aed; border: 1px solid rgba(139, 92, 246, 0.3); font-weight: 700;">🚀 Advanced</span>`;
        } else {
          return `<span class="badge" style="background: rgba(59, 130, 246, 0.12); color: #2563eb; border: 1px solid rgba(59, 130, 246, 0.3); font-weight: 700;">⚡ Intermediate</span>`;
        }
      };

      container.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; width: 100%; padding-bottom: 60px;">
          
          <!-- Breadcrumb Trail -->
          <div class="flow-breadcrumb" style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">
            <button class="breadcrumb-step completed" id="certs-bc-dashboard">🏛️ Dashboard</button>
            <span class="breadcrumb-arrow">→</span>
            <span class="breadcrumb-step current">🏆 Page 3: Skills & Certifications</span>
          </div>

          <!-- Section Hero Header -->
          <div style="text-align: center; margin-bottom: 36px;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 68px; height: 68px; border-radius: var(--radius-xl); background: linear-gradient(135deg, #6366f1, #4f46e5); color: #fff; font-size: 2.2rem; margin-bottom: 16px; box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);">
              🏆
            </div>
            <h1 style="font-size: 2.3rem; font-weight: 800; margin-bottom: 10px; color: var(--text-primary); letter-spacing: -0.02em;">
              Industry Skills & Free Certification Courses
            </h1>
            <p style="color: var(--text-secondary); max-width: 720px; margin: 0 auto; font-size: 1.05rem; line-height: 1.6;">
              Master essential engineering proficiencies with recognized free certificate programs and direct course portals from Coursera, NPTEL, edX, Google, and Microsoft.
            </p>
          </div>

          <!-- Multi-Parameter Control Panel -->
          <div class="card" style="padding: 20px 24px; margin-bottom: 30px; border: 1px solid var(--border-color); background: var(--bg-surface); border-radius: var(--radius-xl); box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 16px;">
              
              <!-- Department Select Filter -->
              <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
                  Filter Department:
                </label>
                <select id="cert-filter-dept" class="form-input" style="padding: 7px 12px; font-weight: 600; min-width: 220px; border-radius: var(--radius-md);">
                  <option value="ALL">🌐 All Engineering Departments</option>
                  ${deptList.map(d => `
                    <option value="${d.code}" ${d.code === selectedDept ? 'selected' : ''}>
                      ${d.icon || '🏛️'} ${d.name} (${d.code})
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Search input -->
              <div style="position: relative; width: 300px; max-width: 100%;">
                <input 
                  type="text" 
                  id="cert-search-input" 
                  class="form-input" 
                  placeholder="Search skills, platforms..." 
                  value="${this.currentFilters.search}"
                  style="padding-left: 36px; border-radius: var(--radius-md);"
                >
                <span style="position: absolute; left: 12px; top: 9px; color: var(--text-muted);">🔍</span>
              </div>
            </div>

            <!-- Platform & Level Pills -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; border-top: 1px solid var(--border-subtle); padding-top: 14px;">
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">Skill Level:</span>
                ${['ALL', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => `
                  <button class="chip ${selectedLevel.toLowerCase() === lvl.toLowerCase() ? 'active' : ''}" data-lvl="${lvl}" style="font-size: 0.8rem; padding: 4px 12px;">
                    ${lvl === 'ALL' ? 'All Levels' : lvl}
                  </button>
                `).join('')}
              </div>

              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">Platform:</span>
                <select id="cert-filter-platform" class="form-input" style="padding: 4px 10px; font-size: 0.82rem; border-radius: var(--radius-md);">
                  ${availablePlatforms.slice(0, 8).map(plat => `
                    <option value="${plat}" ${selectedPlatform === plat ? 'selected' : ''}>
                      ${plat === 'ALL' ? 'All Platforms' : plat}
                    </option>
                  `).join('')}
                </select>
              </div>
            </div>
          </div>

          <!-- Results Stats Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 0 4px;">
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">
              Showing <span style="color: var(--color-primary-600);">${filtered.length}</span> Verified Certification Courses
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Data Source: <code>skills_certifications.json</code>
            </div>
          </div>

          <!-- Skills & Certifications Grid -->
          ${filtered.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon">🏆</div>
              <div class="empty-state-title">No Matching Certifications Found</div>
              <div class="empty-state-desc">Try clearing your search query or selecting "All Platforms".</div>
              <button class="btn btn-secondary" id="certs-reset-filters">Reset Filters</button>
            </div>
          ` : `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px;">
              ${filtered.map(cert => `
                <div class="card card-hoverable cert-card-item" style="display: flex; flex-direction: column; justify-content: space-between; border-radius: var(--radius-xl); border: 1.5px solid var(--border-color); background: var(--bg-surface); padding: 24px; transition: all 0.2s ease;">
                  
                  <div>
                    <!-- Top Badge Row -->
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; gap: 10px;">
                      <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                        <span class="badge badge-primary" style="font-weight: 700;">${cert.deptCode}</span>
                        ${getLevelBadge(cert.skillLevel)}
                      </div>
                      <span class="badge" style="background: rgba(16, 185, 129, 0.12); color: #059669; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 800; font-size: 0.75rem;">
                        ✓ FREE Access
                      </span>
                    </div>

                    <!-- Skill Name -->
                    <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0 0 10px 0; line-height: 1.35;">
                      ${cert.skillName}
                    </h3>

                    <!-- Platform Box -->
                    <div style="display: flex; align-items: center; gap: 10px; background: var(--bg-subtle); padding: 10px 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 14px;">
                      <div style="font-size: 1.3rem;">🎓</div>
                      <div>
                        <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.04em;">
                          Recommended Course Platform:
                        </div>
                        <div style="font-size: 0.92rem; font-weight: 700; color: var(--text-primary);">
                          ${cert.recommendedPlatform}
                        </div>
                      </div>
                    </div>

                    <!-- Details Row -->
                    <div style="display: flex; gap: 12px; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 16px;">
                      <span>⏱️ ${cert.duration || 'Self-paced'}</span>
                      <span>•</span>
                      <span>🏛️ ${cert.department}</span>
                    </div>
                  </div>

                  <!-- Direct Course Action Button -->
                  <div style="border-top: 1px solid var(--border-subtle); padding-top: 14px; margin-top: 14px;">
                    <a 
                      href="${cert.directResourceLink}" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      class="btn btn-primary" 
                      style="width: 100%; padding: 10px; font-size: 0.88rem; font-weight: 700; border-radius: var(--radius-md); box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);"
                    >
                      🚀 Access Free Course ➔
                    </a>
                  </div>

                </div>
              `).join('')}
            </div>
          `}

        </div>
      `;

      // Event bindings
      document.getElementById('certs-bc-dashboard')?.addEventListener('click', () => {
        window.appState.setView('dashboard');
      });

      document.getElementById('cert-filter-dept')?.addEventListener('change', (e) => {
        this.currentFilters.deptCode = e.target.value;
        renderContent();
      });

      document.getElementById('cert-filter-platform')?.addEventListener('change', (e) => {
        this.currentFilters.platform = e.target.value;
        renderContent();
      });

      const searchInput = document.getElementById('cert-search-input');
      if (searchInput) {
        searchInput.focus();
        searchInput.selectionStart = searchInput.selectionEnd = searchInput.value.length;
        searchInput.addEventListener('input', (e) => {
          this.currentFilters.search = e.target.value;
          renderContent();
        });
      }

      container.querySelectorAll('.chip[data-lvl]').forEach(chip => {
        chip.addEventListener('click', () => {
          this.currentFilters.level = chip.getAttribute('data-lvl');
          renderContent();
        });
      });

      document.getElementById('certs-reset-filters')?.addEventListener('click', () => {
        this.currentFilters = { deptCode: 'ALL', level: 'ALL', platform: 'ALL', search: '' };
        renderContent();
      });
    };

    renderContent();
  }
};
