/**
 * Page 4: Career Roadmaps View Component
 * Dedicated page for displaying step-by-step career path roadmaps for each departmental role.
 * Data Source: /data/career_roadmaps.json (window.CareerRoadmapsData)
 * Schema: Role Title, Department, Sequential Roadmap Steps (Phase 1: Basics, Phase 2: Core Skills, Phase 3: Advanced Tools, Phase 4: Portfolio Projects)
 */

window.RoadmapsView = {
  currentFilters: {
    deptCode: 'ALL',
    search: ''
  },
  roadmapsCache: null,

  async loadData() {
    if (this.roadmapsCache && this.roadmapsCache.length > 0) return this.roadmapsCache;
    if (window.CareerRoadmapsData && window.CareerRoadmapsData.length > 0) {
      this.roadmapsCache = window.CareerRoadmapsData;
      return this.roadmapsCache;
    }
    try {
      const res = await fetch('/data/career_roadmaps.json');
      if (res.ok) {
        this.roadmapsCache = await res.json();
        return this.roadmapsCache;
      }
    } catch (err) {
      console.warn('Could not fetch /data/career_roadmaps.json, falling back to embedded', err);
    }
    this.roadmapsCache = window.CareerRoadmapsData || [];
    return this.roadmapsCache;
  },

  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const activeDeptCode = state.department || 'IT';

    if (this.currentFilters.deptCode === 'ALL' && activeDeptCode) {
      this.currentFilters.deptCode = activeDeptCode;
    }

    const allRoadmaps = await this.loadData();
    const deptList = window.AppFallbackData?.departments || [];

    const renderContent = () => {
      const query = this.currentFilters.search.toLowerCase().trim();
      const selectedDept = this.currentFilters.deptCode;

      // Filter roadmaps
      const filtered = allRoadmaps.filter(r => {
        const matchesDept = selectedDept === 'ALL' || r.deptCode === selectedDept;
        const steps = r.sequentialRoadmapSteps || {};
        const stepsText = Object.values(steps).join(' ').toLowerCase();
        const matchesSearch = !query || 
          r.roleTitle.toLowerCase().includes(query) || 
          r.department.toLowerCase().includes(query) ||
          stepsText.includes(query);
        return matchesDept && matchesSearch;
      });

      container.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; width: 100%; padding-bottom: 60px;">
          
          <!-- Breadcrumb Trail -->
          <div class="flow-breadcrumb" style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">
            <button class="breadcrumb-step completed" id="road-bc-dashboard">🏛️ Dashboard</button>
            <span class="breadcrumb-arrow">→</span>
            <span class="breadcrumb-step current">🗺️ Page 4: Career Roadmaps</span>
          </div>

          <!-- Section Hero Header -->
          <div style="text-align: center; margin-bottom: 36px;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 68px; height: 68px; border-radius: var(--radius-xl); background: linear-gradient(135deg, #06b6d4, #0891b2); color: #fff; font-size: 2.2rem; margin-bottom: 16px; box-shadow: 0 8px 24px rgba(6, 182, 212, 0.3);">
              🗺️
            </div>
            <h1 style="font-size: 2.3rem; font-weight: 800; margin-bottom: 10px; color: var(--text-primary); letter-spacing: -0.02em;">
              Step-by-Step Career Path Roadmaps
            </h1>
            <p style="color: var(--text-secondary); max-width: 720px; margin: 0 auto; font-size: 1.05rem; line-height: 1.6;">
              Sequential 4-phase milestone roadmaps tailored for departmental engineering professions. Master foundational theory, core technical abilities, industrial toolsets, and portfolio capstones.
            </p>
          </div>

          <!-- Control Panel -->
          <div class="card" style="padding: 20px 24px; margin-bottom: 30px; border: 1px solid var(--border-color); background: var(--bg-surface); border-radius: var(--radius-xl); box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
              
              <!-- Department Select Filter -->
              <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
                  Filter Department:
                </label>
                <select id="road-filter-dept" class="form-input" style="padding: 7px 12px; font-weight: 600; min-width: 220px; border-radius: var(--radius-md);">
                  <option value="ALL">🌐 All Engineering Departments</option>
                  ${deptList.map(d => `
                    <option value="${d.code}" ${d.code === selectedDept ? 'selected' : ''}>
                      ${d.icon || '🏛️'} ${d.name} (${d.code})
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Search input -->
              <div style="position: relative; width: 320px; max-width: 100%;">
                <input 
                  type="text" 
                  id="road-search-input" 
                  class="form-input" 
                  placeholder="Search role roadmaps, skills..." 
                  value="${this.currentFilters.search}"
                  style="padding-left: 36px; border-radius: var(--radius-md);"
                >
                <span style="position: absolute; left: 12px; top: 9px; color: var(--text-muted);">🔍</span>
              </div>
            </div>
          </div>

          <!-- Results Stats Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding: 0 4px;">
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">
              Showing <span style="color: var(--color-primary-600);">${filtered.length}</span> Sequential Career Roadmaps
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Data Source: <code>career_roadmaps.json</code>
            </div>
          </div>

          <!-- Roadmaps List -->
          ${filtered.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon">🗺️</div>
              <div class="empty-state-title">No Matching Roadmaps Found</div>
              <div class="empty-state-desc">Try clearing your search query or selecting a different department.</div>
              <button class="btn btn-secondary" id="road-reset-filters">Reset Filters</button>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 32px;">
              ${filtered.map(roadmap => {
                const steps = roadmap.sequentialRoadmapSteps || {};
                return `
                  <div class="card" style="border: 1.5px solid var(--border-color); border-radius: var(--radius-xl); background: var(--bg-surface); padding: 28px; box-shadow: var(--shadow-sm);">
                    
                    <!-- Roadmap Header -->
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 18px; flex-wrap: wrap; gap: 14px;">
                      <div>
                        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
                          <span class="badge badge-primary" style="font-weight: 700;">${roadmap.deptCode}</span>
                          <span class="badge badge-subtle">⏱️ Timeline: ${roadmap.totalDuration || '6-9 Months'}</span>
                          <span class="badge" style="background: rgba(16, 185, 129, 0.12); color: #059669; font-weight: 700;">4 Milestone Phases</span>
                        </div>
                        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin: 0;">
                          ${roadmap.roleTitle}
                        </h2>
                        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
                          ${roadmap.department} Specialization Path
                        </div>
                      </div>

                      <div style="display: flex; gap: 8px;">
                        <button class="btn btn-outline btn-sm road-jump-roles-btn" data-dept="${roadmap.deptCode}" style="font-size: 0.8rem; font-weight: 700;">
                          💼 View Role Details
                        </button>
                        <button class="btn btn-primary btn-sm road-jump-certs-btn" data-dept="${roadmap.deptCode}" style="font-size: 0.8rem; font-weight: 700;">
                          🏆 Earn Certificates
                        </button>
                      </div>
                    </div>

                    <!-- 4-Phase Sequential Flow Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; position: relative;">
                      
                      <!-- Phase 1 -->
                      <div style="background: var(--bg-subtle); border-radius: var(--radius-lg); padding: 18px; border-left: 4px solid #3b82f6; position: relative;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                          <span style="font-size: 0.72rem; font-weight: 800; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.05em;">Step 1 • Foundation</span>
                          <span style="font-size: 1.2rem;">🌱</span>
                        </div>
                        <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0 0 8px 0;">Phase 1: Basics</h4>
                        <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
                          ${steps.phase1 ? steps.phase1.replace(/^Phase 1:\s*Basics\s*-\s*/i, '') : 'Fundamental theory and syntax'}
                        </p>
                      </div>

                      <!-- Phase 2 -->
                      <div style="background: var(--bg-subtle); border-radius: var(--radius-lg); padding: 18px; border-left: 4px solid #10b981; position: relative;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                          <span style="font-size: 0.72rem; font-weight: 800; color: #10b981; text-transform: uppercase; letter-spacing: 0.05em;">Step 2 • Technical</span>
                          <span style="font-size: 1.2rem;">⚡</span>
                        </div>
                        <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0 0 8px 0;">Phase 2: Core Skills</h4>
                        <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
                          ${steps.phase2 ? steps.phase2.replace(/^Phase 2:\s*Core Skills\s*-\s*/i, '') : 'Domain systems and engineering principles'}
                        </p>
                      </div>

                      <!-- Phase 3 -->
                      <div style="background: var(--bg-subtle); border-radius: var(--radius-lg); padding: 18px; border-left: 4px solid #f59e0b; position: relative;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                          <span style="font-size: 0.72rem; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.05em;">Step 3 • Industrial</span>
                          <span style="font-size: 1.2rem;">🔧</span>
                        </div>
                        <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0 0 8px 0;">Phase 3: Advanced Tools</h4>
                        <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
                          ${steps.phase3 ? steps.phase3.replace(/^Phase 3:\s*Advanced Tools\s*-\s*/i, '') : 'Professional software, cloud, and test tooling'}
                        </p>
                      </div>

                      <!-- Phase 4 -->
                      <div style="background: var(--bg-subtle); border-radius: var(--radius-lg); padding: 18px; border-left: 4px solid #8b5cf6; position: relative;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                          <span style="font-size: 0.72rem; font-weight: 800; color: #8b5cf6; text-transform: uppercase; letter-spacing: 0.05em;">Step 4 • Production</span>
                          <span style="font-size: 1.2rem;">🚀</span>
                        </div>
                        <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0 0 8px 0;">Phase 4: Portfolio Projects</h4>
                        <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
                          ${steps.phase4 ? steps.phase4.replace(/^Phase 4:\s*Portfolio Projects\s*-\s*/i, '') : 'Production-grade deployed capstone projects'}
                        </p>
                      </div>

                    </div>

                  </div>
                `;
              }).join('')}
            </div>
          `}

        </div>
      `;

      // Event bindings
      document.getElementById('road-bc-dashboard')?.addEventListener('click', () => {
        window.appState.setView('dashboard');
      });

      document.getElementById('road-filter-dept')?.addEventListener('change', (e) => {
        this.currentFilters.deptCode = e.target.value;
        renderContent();
      });

      const searchInput = document.getElementById('road-search-input');
      if (searchInput) {
        searchInput.focus();
        searchInput.selectionStart = searchInput.selectionEnd = searchInput.value.length;
        searchInput.addEventListener('input', (e) => {
          this.currentFilters.search = e.target.value;
          renderContent();
        });
      }

      document.getElementById('road-reset-filters')?.addEventListener('click', () => {
        this.currentFilters = { deptCode: 'ALL', search: '' };
        renderContent();
      });

      container.querySelectorAll('.road-jump-roles-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const dept = btn.getAttribute('data-dept');
          if (dept) window.appState.setDepartment(dept);
          window.appState.setView('dept-roles');
        });
      });

      container.querySelectorAll('.road-jump-certs-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const dept = btn.getAttribute('data-dept');
          if (dept) window.appState.setDepartment(dept);
          window.appState.setView('certifications');
        });
      });
    };

    renderContent();
  }
};
