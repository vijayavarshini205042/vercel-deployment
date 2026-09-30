/**
 * Page 1: Departmental Roles View Component
 * Dedicated page for displaying all available job roles categorized by department and technology.
 * Data Source: /data/departmental_roles.json (window.DepartmentalRolesData)
 * Schema: Role Title, Department, Category, Short Overview, Salary Benchmark, Top Skills
 */

window.DeptRolesView = {
  currentFilters: {
    deptCode: 'ALL',
    category: 'ALL',
    search: ''
  },
  rolesCache: null,

  async loadData() {
    if (this.rolesCache && this.rolesCache.length > 0) return this.rolesCache;
    if (window.DepartmentalRolesData && window.DepartmentalRolesData.length > 0) {
      this.rolesCache = window.DepartmentalRolesData;
      return this.rolesCache;
    }
    try {
      const res = await fetch('/data/departmental_roles.json');
      if (res.ok) {
        this.rolesCache = await res.json();
        return this.rolesCache;
      }
    } catch (err) {
      console.warn('Could not fetch /data/departmental_roles.json, falling back to embedded', err);
    }
    this.rolesCache = window.DepartmentalRolesData || [];
    return this.rolesCache;
  },

  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const activeDeptCode = state.department || 'IT';
    
    // Default filter to current department on initial visit if not set
    if (this.currentFilters.deptCode === 'ALL' && activeDeptCode) {
      this.currentFilters.deptCode = activeDeptCode;
    }

    const allRoles = await this.loadData();
    const deptList = window.AppFallbackData?.departments || [];

    const renderContent = () => {
      const query = this.currentFilters.search.toLowerCase().trim();
      const selectedDept = this.currentFilters.deptCode;
      const selectedCat = this.currentFilters.category;

      // Extract unique categories for current department or overall
      const availableCategories = ['ALL', ...Array.from(new Set(
        allRoles
          .filter(r => selectedDept === 'ALL' || r.deptCode === selectedDept)
          .map(r => r.category)
      )).filter(Boolean)];

      // Filter roles
      const filtered = allRoles.filter(r => {
        const matchesDept = selectedDept === 'ALL' || r.deptCode === selectedDept;
        const matchesCat = selectedCat === 'ALL' || r.category === selectedCat;
        const matchesSearch = !query || 
          r.roleTitle.toLowerCase().includes(query) || 
          r.department.toLowerCase().includes(query) || 
          r.category.toLowerCase().includes(query) ||
          r.shortOverview.toLowerCase().includes(query) ||
          (r.topSkills && r.topSkills.some(s => s.toLowerCase().includes(query)));
        return matchesDept && matchesCat && matchesSearch;
      });

      container.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; width: 100%; padding-bottom: 60px;">
          
          <!-- Breadcrumb Trail -->
          <div class="flow-breadcrumb" style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">
            <button class="breadcrumb-step completed" id="roles-bc-dashboard">🏛️ Dashboard</button>
            <span class="breadcrumb-arrow">→</span>
            <span class="breadcrumb-step current">💼 Page 1: Departmental Roles</span>
          </div>

          <!-- Section Hero Header -->
          <div style="text-align: center; margin-bottom: 36px;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 68px; height: 68px; border-radius: var(--radius-xl); background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-size: 2.2rem; margin-bottom: 16px; box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);">
              💼
            </div>
            <h1 style="font-size: 2.3rem; font-weight: 800; margin-bottom: 10px; color: var(--text-primary); letter-spacing: -0.02em;">
              Departmental Job Roles & Career Profiles
            </h1>
            <p style="color: var(--text-secondary); max-width: 720px; margin: 0 auto; font-size: 1.05rem; line-height: 1.6;">
              Explore official industry job roles categorized by engineering discipline and technology domain. Each profile details responsibilities, salary benchmarks, and essential technical toolsets.
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
                <select id="role-filter-dept" class="form-input" style="padding: 7px 12px; font-weight: 600; min-width: 220px; border-radius: var(--radius-md);">
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
                  id="role-search-input" 
                  class="form-input" 
                  placeholder="Search roles, skills, technologies..." 
                  value="${this.currentFilters.search}"
                  style="padding-left: 36px; border-radius: var(--radius-md);"
                >
                <span style="position: absolute; left: 12px; top: 9px; color: var(--text-muted);">🔍</span>
              </div>
            </div>

            <!-- Category Pills -->
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; border-top: 1px solid var(--border-subtle); padding-top: 14px;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-right: 4px;">Technology Category:</span>
              ${availableCategories.map(cat => `
                <button class="chip ${selectedCat === cat ? 'active' : ''}" data-cat="${cat}" style="font-size: 0.8rem; padding: 4px 12px;">
                  ${cat === 'ALL' ? 'All Categories' : cat}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Results Stats Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 0 4px;">
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">
              Showing <span style="color: var(--color-primary-600);">${filtered.length}</span> Job Roles
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Data Source: <code>departmental_roles.json</code>
            </div>
          </div>

          <!-- Roles Grid -->
          ${filtered.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon">🔍</div>
              <div class="empty-state-title">No Matching Roles Found</div>
              <div class="empty-state-desc">Try clearing your search query or selecting "All Categories".</div>
              <button class="btn btn-secondary" id="roles-reset-filters">Reset Filters</button>
            </div>
          ` : `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px;">
              ${filtered.map(role => `
                <div class="card card-hoverable role-card-item" style="display: flex; flex-direction: column; justify-content: space-between; border-radius: var(--radius-xl); border: 1.5px solid var(--border-color); background: var(--bg-surface); padding: 24px; transition: all 0.2s ease;">
                  
                  <div>
                    <!-- Top Badge Row -->
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; gap: 10px;">
                      <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                        <span class="badge badge-primary" style="font-weight: 700;">${role.deptCode}</span>
                        <span class="badge badge-subtle" style="font-size: 0.72rem;">${role.category}</span>
                      </div>
                      <!-- Salary Benchmark Badge -->
                      <span class="badge" style="background: rgba(16, 185, 129, 0.12); color: #059669; border: 1px solid rgba(16, 185, 129, 0.25); font-weight: 800; font-size: 0.78rem; white-space: nowrap;">
                        💰 ${role.salaryBenchmark}
                      </span>
                    </div>

                    <!-- Role Title -->
                    <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0 0 10px 0; line-height: 1.35;">
                      ${role.roleTitle}
                    </h3>

                    <!-- Short Overview -->
                    <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; margin: 0 0 18px 0;">
                      ${role.shortOverview}
                    </p>

                    <!-- Top Skills -->
                    ${role.topSkills && role.topSkills.length > 0 ? `
                      <div style="margin-bottom: 14px;">
                        <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.04em; margin-bottom: 6px;">
                          Core Skill Requirements:
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                          ${role.topSkills.map(s => `
                            <span class="badge" style="background: var(--color-primary-50); color: var(--color-primary-700); border: 1px solid var(--color-primary-200); font-size: 0.75rem; font-weight: 600;">
                              ${s}
                            </span>
                          `).join('')}
                        </div>
                      </div>
                    ` : ''}

                    <!-- Industry Tools -->
                    ${role.tools && role.tools.length > 0 ? `
                      <div style="margin-bottom: 18px;">
                        <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.04em; margin-bottom: 6px;">
                          Industry Tools & Systems:
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                          ${role.tools.map(t => `
                            <span class="badge" style="background: var(--bg-subtle); color: var(--text-secondary); border: 1px solid var(--border-color); font-size: 0.72rem;">
                              🔧 ${t}
                            </span>
                          `).join('')}
                        </div>
                      </div>
                    ` : ''}
                  </div>

                  <!-- Footer Navigation to Roadmaps / Certs -->
                  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 14px; margin-top: 16px; font-size: 0.82rem;">
                    <span style="color: var(--text-muted); font-size: 0.78rem;">
                      ${role.department}
                    </span>
                    <button class="btn btn-ghost btn-sm role-view-roadmap-btn" data-role-title="${encodeURIComponent(role.roleTitle)}" data-dept="${role.deptCode}" style="color: var(--color-primary-600); font-weight: 700; padding: 4px 8px;">
                      View Roadmap ➔
                    </button>
                  </div>

                </div>
              `).join('')}
            </div>
          `}

        </div>
      `;

      // Event bindings
      document.getElementById('roles-bc-dashboard')?.addEventListener('click', () => {
        window.appState.setView('dashboard');
      });

      // Dept select change
      document.getElementById('role-filter-dept')?.addEventListener('change', (e) => {
        this.currentFilters.deptCode = e.target.value;
        this.currentFilters.category = 'ALL';
        renderContent();
      });

      // Search input with debounce
      const searchInput = document.getElementById('role-search-input');
      if (searchInput) {
        searchInput.focus();
        // Restore cursor to end
        searchInput.selectionStart = searchInput.selectionEnd = searchInput.value.length;
        searchInput.addEventListener('input', (e) => {
          this.currentFilters.search = e.target.value;
          renderContent();
        });
      }

      // Category chips
      container.querySelectorAll('.chip[data-cat]').forEach(chip => {
        chip.addEventListener('click', () => {
          this.currentFilters.category = chip.getAttribute('data-cat');
          renderContent();
        });
      });

      // Reset filters button
      document.getElementById('roles-reset-filters')?.addEventListener('click', () => {
        this.currentFilters = { deptCode: 'ALL', category: 'ALL', search: '' };
        renderContent();
      });

      // View Roadmap quick transition
      container.querySelectorAll('.role-view-roadmap-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const dept = btn.getAttribute('data-dept');
          if (dept) window.appState.setDepartment(dept);
          window.appState.setView('roadmaps');
        });
      });
    };

    renderContent();
  }
};
