/**
 * Page 2: Project Ideas View Component
 * Dedicated page for displaying curated capstone and mini project ideas for all departments.
 * Data Source: /data/project_ideas.json (window.ProjectIdeasData)
 * Schema: Project Title, Department, Difficulty Level (Beginner/Intermediate/Advanced), Tech Stack, Key Features
 */

window.ProjectsView = {
  currentFilters: {
    deptCode: 'ALL',
    difficulty: 'ALL',
    category: 'ALL',
    search: ''
  },
  projectsCache: null,

  async loadData() {
    if (this.projectsCache && this.projectsCache.length > 0) return this.projectsCache;
    let list = [];
    if (window.ProjectIdeasData && window.ProjectIdeasData.length > 0) {
      list = [...window.ProjectIdeasData];
    } else {
      try {
        const res = await fetch('/data/project_ideas.json');
        if (res.ok) {
          list = await res.json();
        }
      } catch (err) {
        console.warn('Could not fetch /data/project_ideas.json, falling back to embedded', err);
      }
    }

    // Merge in FinalYearProjectsData for all 68 departments
    if (window.FinalYearProjectsData) {
      Object.keys(window.FinalYearProjectsData).forEach(deptKey => {
        const dObj = window.FinalYearProjectsData[deptKey];
        if (dObj && Array.isArray(dObj.projects)) {
          dObj.projects.forEach(p => {
            if (!list.some(existing => existing.id === p.id)) {
              list.push({
                id: p.id,
                deptCode: p.deptCode || deptKey,
                department: p.department || dObj.deptName || deptKey,
                projectTitle: p.title,
                category: p.category || 'Final Year',
                difficultyLevel: p.difficultyLevel || 'Advanced',
                shortOverview: p.proposedSolution || p.realWorldProblem || '',
                techStack: p.technologies || [],
                keyFeatures: p.keyModules || [],
                scope: p.scope || 'Final Year'
              });
            }
          });
        }
      });
    }

    this.projectsCache = list;
    return this.projectsCache;
  },

  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const activeDeptCode = state.department || 'IT';

    if (this.currentFilters.deptCode === 'ALL' && activeDeptCode) {
      this.currentFilters.deptCode = activeDeptCode;
    }

    const allProjects = await this.loadData();
    const deptList = window.AppFallbackData?.departments || [];

    const renderContent = () => {
      const query = this.currentFilters.search.toLowerCase().trim();
      const selectedDept = this.currentFilters.deptCode;
      const selectedDiff = this.currentFilters.difficulty;
      const selectedCat = this.currentFilters.category;

      // Filter projects
      const filtered = allProjects.filter(p => {
        const matchesDept = selectedDept === 'ALL' || p.deptCode === selectedDept;
        const matchesDiff = selectedDiff === 'ALL' || (p.difficultyLevel || '').toLowerCase() === selectedDiff.toLowerCase();
        
        let matchesCat = true;
        if (selectedCat !== 'ALL') {
          const pCat = ((p.category || '') + ' ' + (p.projectTitle || '') + ' ' + (p.techStack || []).join(' ')).toLowerCase();
          if (selectedCat === 'Mini Project') matchesCat = pCat.includes('mini') || (p.difficultyLevel === 'Beginner');
          else if (selectedCat === 'Final Year') matchesCat = pCat.includes('final') || pCat.includes('capstone') || (p.difficultyLevel === 'Advanced');
          else if (selectedCat === 'AI/ML') matchesCat = pCat.includes('ai') || pCat.includes('machine learning') || pCat.includes('neural') || pCat.includes('deep learning');
          else if (selectedCat === 'IoT/Hardware') matchesCat = pCat.includes('iot') || pCat.includes('sensor') || pCat.includes('arduino') || pCat.includes('raspberry') || pCat.includes('embedded');
          else if (selectedCat === 'Software') matchesCat = pCat.includes('software') || pCat.includes('web') || pCat.includes('cloud') || pCat.includes('app');
          else if (selectedCat === 'Industry') matchesCat = pCat.includes('industry') || pCat.includes('automation') || pCat.includes('commercial');
        }

        const matchesSearch = !query || 
          p.projectTitle.toLowerCase().includes(query) || 
          p.department.toLowerCase().includes(query) || 
          (p.techStack && p.techStack.some(t => t.toLowerCase().includes(query))) ||
          (p.keyFeatures && p.keyFeatures.some(f => f.toLowerCase().includes(query))) ||
          (p.shortOverview && p.shortOverview.toLowerCase().includes(query));
        return matchesDept && matchesDiff && matchesCat && matchesSearch;
      });

      const getDifficultyBadge = (level) => {
        const lvl = (level || 'Intermediate').toLowerCase();
        if (lvl === 'beginner') {
          return `<span class="badge" style="background: rgba(16, 185, 129, 0.12); color: #059669; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 700;">🌱 Beginner</span>`;
        } else if (lvl === 'advanced') {
          return `<span class="badge" style="background: rgba(139, 92, 246, 0.12); color: #7c3aed; border: 1px solid rgba(139, 92, 246, 0.3); font-weight: 700;">🚀 Advanced</span>`;
        } else {
          return `<span class="badge" style="background: rgba(245, 158, 11, 0.12); color: #d97706; border: 1px solid rgba(245, 158, 11, 0.3); font-weight: 700;">⚡ Intermediate</span>`;
        }
      };

      container.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; width: 100%; padding-bottom: 60px;">
          
          <!-- Breadcrumb Trail -->
          <div class="flow-breadcrumb" style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">
            <button class="breadcrumb-step completed" id="proj-bc-dashboard">🏛️ Dashboard</button>
            <span class="breadcrumb-arrow">→</span>
            <span class="breadcrumb-step current">💡 Page 2: Project Ideas</span>
          </div>

          <!-- Section Hero Header -->
          <div style="text-align: center; margin-bottom: 36px;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 68px; height: 68px; border-radius: var(--radius-xl); background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; font-size: 2.2rem; margin-bottom: 16px; box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3);">
              💡
            </div>
            <h1 style="font-size: 2.3rem; font-weight: 800; margin-bottom: 10px; color: var(--text-primary); letter-spacing: -0.02em;">
              Curated Engineering Project Ideas
            </h1>
            <p style="color: var(--text-secondary); max-width: 720px; margin: 0 auto; font-size: 1.05rem; line-height: 1.6;">
              Explore industry-aligned capstone and mini project concepts across all engineering branches. Each idea specifies technical stacks, key operational features, and complexity tiers.
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
                <select id="proj-filter-dept" class="form-input" style="padding: 7px 12px; font-weight: 600; min-width: 220px; border-radius: var(--radius-md);">
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
                  id="proj-search-input" 
                  class="form-input" 
                  placeholder="Search project titles, tech stack..." 
                  value="${this.currentFilters.search}"
                  style="padding-left: 36px; border-radius: var(--radius-md);"
                >
                <span style="position: absolute; left: 12px; top: 9px; color: var(--text-muted);">🔍</span>
              </div>
            </div>

            <!-- Difficulty Pills -->
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; border-top: 1px solid var(--border-subtle); padding-top: 14px;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-right: 4px;">Difficulty Level:</span>
              ${['ALL', 'Beginner', 'Intermediate', 'Advanced'].map(diff => `
                <button class="chip ${selectedDiff.toLowerCase() === diff.toLowerCase() ? 'active' : ''}" data-diff="${diff}" style="font-size: 0.8rem; padding: 4px 14px;">
                  ${diff === 'ALL' ? 'All Levels' : diff}
                </button>
              `).join('')}
            </div>

            <!-- Project Track / Category Pills -->
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; border-top: 1px solid var(--border-subtle); padding-top: 14px; margin-top: 12px;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-right: 4px;">Project Track:</span>
              ${[
                { id: 'ALL', label: '🌟 All Tracks' },
                { id: 'Mini Project', label: '🛠️ Mini Projects' },
                { id: 'Final Year', label: '🎓 Final Year Projects' },
                { id: 'AI/ML', label: '🤖 AI & Machine Learning' },
                { id: 'IoT/Hardware', label: '📡 IoT & Hardware' },
                { id: 'Software', label: '💻 Software & Web' },
                { id: 'Industry', label: '🏭 Industry Oriented' }
              ].map(cat => `
                <button class="chip ${selectedCat === cat.id ? 'active' : ''}" data-cat="${cat.id}" style="font-size: 0.8rem; padding: 4px 14px;">
                  ${cat.label}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Results Stats Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 0 4px;">
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">
              Showing <span style="color: var(--color-primary-600);">${filtered.length}</span> Project Blueprints
            </div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              Data Source: <code>project_ideas.json</code>
            </div>
          </div>

          <!-- Projects Grid -->
          ${filtered.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon">💡</div>
              <div class="empty-state-title">No Matching Projects Found</div>
              <div class="empty-state-desc">Try clearing your search query or selecting "All Levels".</div>
              <button class="btn btn-secondary" id="proj-reset-filters">Reset Filters</button>
            </div>
          ` : `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px;">
              ${filtered.map(proj => `
                <div class="card card-hoverable proj-card-item" style="display: flex; flex-direction: column; justify-content: space-between; border-radius: var(--radius-xl); border: 1.5px solid var(--border-color); background: var(--bg-surface); padding: 24px; transition: all 0.2s ease;">
                  
                  <div>
                    <!-- Top Badge Row -->
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; gap: 10px;">
                      <span class="badge badge-primary" style="font-weight: 700;">${proj.deptCode}</span>
                      ${getDifficultyBadge(proj.difficultyLevel)}
                    </div>

                    <!-- Project Title -->
                    <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0 0 10px 0; line-height: 1.35;">
                      ${proj.projectTitle}
                    </h3>

                    <!-- Short Overview -->
                    <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; margin: 0 0 18px 0;">
                      ${proj.shortOverview}
                    </p>

                    <!-- Tech Stack Pills -->
                    ${proj.techStack && proj.techStack.length > 0 ? `
                      <div style="margin-bottom: 16px;">
                        <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.04em; margin-bottom: 6px;">
                          Recommended Tech Stack:
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                          ${proj.techStack.map(tech => `
                            <span class="badge" style="background: rgba(99, 102, 241, 0.08); color: var(--color-primary-700); border: 1px solid rgba(99, 102, 241, 0.2); font-size: 0.75rem; font-weight: 600;">
                              ⚙️ ${tech}
                            </span>
                          `).join('')}
                        </div>
                      </div>
                    ` : ''}

                    <!-- Key Features -->
                    ${proj.keyFeatures && proj.keyFeatures.length > 0 ? `
                      <div style="margin-bottom: 18px; background: var(--bg-subtle); padding: 12px 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                        <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.04em; margin-bottom: 6px;">
                          Core Architectural Deliverables:
                        </div>
                        <ul style="margin: 0; padding-left: 18px; font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5;">
                          ${proj.keyFeatures.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                      </div>
                    ` : ''}
                  </div>

                  <!-- Footer Actions -->
                  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 14px; margin-top: 16px; font-size: 0.82rem;">
                    <span style="color: var(--text-muted); font-size: 0.78rem;">
                      ${proj.department}
                    </span>
                    <button class="btn btn-outline btn-sm copy-blueprint-btn" data-title="${encodeURIComponent(proj.projectTitle)}" style="font-size: 0.75rem; padding: 4px 10px;">
                      📋 Copy Title
                    </button>
                  </div>

                </div>
              `).join('')}
            </div>
          `}

        </div>
      `;

      // Event bindings
      document.getElementById('proj-bc-dashboard')?.addEventListener('click', () => {
        window.appState.setView('dashboard');
      });

      document.getElementById('proj-filter-dept')?.addEventListener('change', (e) => {
        this.currentFilters.deptCode = e.target.value;
        renderContent();
      });

      const searchInput = document.getElementById('proj-search-input');
      if (searchInput) {
        searchInput.focus();
        searchInput.selectionStart = searchInput.selectionEnd = searchInput.value.length;
        searchInput.addEventListener('input', (e) => {
          this.currentFilters.search = e.target.value;
          renderContent();
        });
      }

      container.querySelectorAll('.chip[data-diff]').forEach(chip => {
        chip.addEventListener('click', () => {
          this.currentFilters.difficulty = chip.getAttribute('data-diff');
          renderContent();
        });
      });

      container.querySelectorAll('.chip[data-cat]').forEach(chip => {
        chip.addEventListener('click', () => {
          this.currentFilters.category = chip.getAttribute('data-cat');
          renderContent();
        });
      });

      document.getElementById('proj-reset-filters')?.addEventListener('click', () => {
        this.currentFilters = { deptCode: 'ALL', difficulty: 'ALL', category: 'ALL', search: '' };
        renderContent();
      });

      container.querySelectorAll('.copy-blueprint-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const title = decodeURIComponent(btn.getAttribute('data-title'));
          navigator.clipboard?.writeText(title);
          if (window.Toast) window.Toast.success(`Copied "${title}" to clipboard! 📋`);
        });
      });
    };

    renderContent();
  }
};
