/**
 * Final Year Project Ideas & Project Reference View Component
 * Flow: Final Year Projects → Select Department → Select Category → Browse Projects → Open Project Details
 * Strictly supports ALL 68 Departments with dedicated:
 * - Trending real-world problem areas
 * - Project reference topics
 * - Multi-parameter filters (Software/Hardware/Hybrid, Difficulty, Category)
 * - Detailed architectural modal
 */

window.ProjectsView = {
  currentFilters: {
    deptCode: 'CSE',
    category: 'All',
    nature: 'All',
    difficulty: 'All',
    search: '',
    selectedTopic: ''
  },

  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    // Set initial department from app state
    if (state.department && !this.initializedDept) {
      this.currentFilters.deptCode = state.department;
      this.initializedDept = true;
    }

    const deptList = window.AppFallbackData?.departments || [];
    
    const renderContent = () => {
      const activeDeptCode = this.currentFilters.deptCode || 'CSE';
      const dept = deptList.find(d => d.code === activeDeptCode) || {
        name: activeDeptCode + " Engineering", code: activeDeptCode, icon: "🏛️"
      };

      // Retrieve department-specific project data from master database
      const deptMasterData = window.FinalYearProjectsData?.[activeDeptCode] || {
        deptCode: activeDeptCode,
        deptName: dept.name,
        trendingProblemAreas: [],
        projectReferenceTopics: [],
        categories: [],
        projects: []
      };

      const rawProjects = deptMasterData.projects || [];
      const trendingProblems = deptMasterData.trendingProblemAreas || [];
      const refTopics = deptMasterData.projectReferenceTopics || [];
      const availableCategories = ['All', ...(deptMasterData.categories || ['Industry-oriented', 'Research-oriented', 'Sustainability', 'Social Impact'])];

      // Apply multi-parameter filters
      const filteredProjects = rawProjects.filter(p => {
        // Nature filter (Software / Hardware / Hybrid)
        if (this.currentFilters.nature !== 'All' && p.projectNature !== this.currentFilters.nature) {
          return false;
        }

        // Difficulty filter (Beginner / Intermediate / Advanced)
        if (this.currentFilters.difficulty !== 'All' && p.difficulty !== this.currentFilters.difficulty) {
          return false;
        }

        // Category filter
        if (this.currentFilters.category !== 'All' && p.category !== this.currentFilters.category && p.categoryTag !== this.currentFilters.category) {
          return false;
        }

        // Reference topic filter
        if (this.currentFilters.selectedTopic) {
          const t = this.currentFilters.selectedTopic.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(t);
          const matchDomain = (p.domain || '').toLowerCase().includes(t);
          const matchTech = (p.technologies || []).some(tech => tech.toLowerCase().includes(t));
          if (!matchTitle && !matchDomain && !matchTech) return false;
        }

        // Free-text Search
        if (this.currentFilters.search) {
          const q = this.currentFilters.search.toLowerCase().trim();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchProb = (p.realWorldProblem || '').toLowerCase().includes(q);
          const matchTech = (p.technologies || []).some(tech => tech.toLowerCase().includes(q));
          const matchCat = (p.category || '').toLowerCase().includes(q);
          const matchDomain = (p.domain || '').toLowerCase().includes(q);
          if (!matchTitle && !matchProb && !matchTech && !matchCat && !matchDomain) return false;
        }

        return true;
      });

      container.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; width: 100%; padding-bottom: 60px;">
          <!-- Breadcrumb Flow -->
          <div class="flow-breadcrumb" style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">
            <button class="breadcrumb-step completed" id="sbc-home">🏠 Dashboard</button>
            <span class="breadcrumb-arrow">→</span>
            <span class="breadcrumb-step current">💡 Final Year Project Ideas & References</span>
          </div>

          <!-- Page Header & Department Switcher -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px; margin-bottom: 28px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span class="badge badge-primary">🎓 Final Year Capstone & Research</span>
                <span class="badge badge-success">${activeDeptCode} — ${dept.name}</span>
                <span class="badge badge-subtle">68 Departments Library</span>
              </div>
              <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin: 0 0 6px;">
                Final Year Project Ideas & Reference Blueprint
              </h1>
              <p style="color: var(--text-secondary); max-width: 680px; margin: 0; font-size: 0.95rem; line-height: 1.5;">
                Explore department-specific project ideas with real-world problem statements, core engineering objectives, architecture, hardware/software stacks, and future enhancement directions.
              </p>
            </div>

            <!-- Department Switcher Dropdown (Allows switching to ANY of the 68 Departments) -->
            <div style="min-width: 260px; background: var(--bg-surface); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
              <label for="fyp-dept-select" style="display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">
                🏛️ Select Department (68 Branches):
              </label>
              <select id="fyp-dept-select" class="form-select" style="width: 100%; font-size: 0.88rem; font-weight: 600; border-radius: var(--radius-sm);">
                ${deptList.map(d => `
                  <option value="${d.code}" ${d.code === activeDeptCode ? 'selected' : ''}>
                    ${d.code} — ${d.name}
                  </option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- SECTION 1: Trending Real-World Problem Areas -->
          <div class="card" style="padding: 20px; margin-bottom: 24px; background: var(--bg-surface); border: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0; display: flex; align-items: center; gap: 8px;">
                🔥 Trending Real-World Problem Areas in ${activeDeptCode}
              </h3>
              <span class="badge badge-info" style="font-size: 0.72rem;">Industry Benchmark Focus</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 10px;">
              ${trendingProblems.map((prob, idx) => `
                <div style="display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; background: var(--bg-surface-elevated); border-radius: var(--radius-md); border-left: 3px solid var(--color-primary-600); font-size: 0.84rem; color: var(--text-secondary); line-height: 1.4;">
                  <span style="font-weight: 700; color: var(--color-primary-600);">#${idx + 1}</span>
                  <span>${prob}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- SECTION 2: Project Reference Topics -->
          <div class="card" style="padding: 20px; margin-bottom: 28px; background: var(--bg-surface); border: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0; display: flex; align-items: center; gap: 8px;">
                📚 Project Reference Topics for ${activeDeptCode} Students
              </h3>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Click any topic to filter matching blueprints</span>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <button class="chip fyp-ref-topic-chip ${!this.currentFilters.selectedTopic ? 'active' : ''}" data-topic="" style="font-size: 0.78rem;">
                All Reference Topics
              </button>
              ${refTopics.map(topic => `
                <button class="chip fyp-ref-topic-chip ${this.currentFilters.selectedTopic === topic ? 'active' : ''}" data-topic="${topic}" style="font-size: 0.78rem;">
                  📌 ${topic}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- SECTION 3: Filters & Search Toolbar -->
          <div class="card" style="padding: 18px 20px; margin-bottom: 28px; background: var(--bg-surface); border: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
              <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                🔍 <strong>Filter & Search Project Blueprints</strong>
              </div>
              <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary);">
                Showing ${filteredProjects.length} of ${rawProjects.length} project blueprints
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 12px; align-items: center;">
              <!-- Free Text Search -->
              <div>
                <input 
                  type="text" 
                  id="fyp-search-input" 
                  class="form-input" 
                  placeholder="Search project title, problem, or technology..." 
                  value="${this.currentFilters.search}"
                  style="width: 100%; font-size: 0.85rem;"
                />
              </div>

              <!-- Project Nature (Software / Hardware / Hybrid) -->
              <div>
                <select id="fyp-nature-select" class="form-select" style="width: 100%; font-size: 0.85rem;">
                  <option value="All" ${this.currentFilters.nature === 'All' ? 'selected' : ''}>All Natures (SW/HW/Hybrid)</option>
                  <option value="Software" ${this.currentFilters.nature === 'Software' ? 'selected' : ''}>💻 Software Projects</option>
                  <option value="Hardware" ${this.currentFilters.nature === 'Hardware' ? 'selected' : ''}>⚡ Hardware Projects</option>
                  <option value="Hybrid" ${this.currentFilters.nature === 'Hybrid' ? 'selected' : ''}>🔄 Hybrid (SW + HW)</option>
                </select>
              </div>

              <!-- Difficulty Level -->
              <div>
                <select id="fyp-diff-select" class="form-select" style="width: 100%; font-size: 0.85rem;">
                  <option value="All" ${this.currentFilters.difficulty === 'All' ? 'selected' : ''}>All Difficulties</option>
                  <option value="Beginner" ${this.currentFilters.difficulty === 'Beginner' ? 'selected' : ''}>Beginner Level</option>
                  <option value="Intermediate" ${this.currentFilters.difficulty === 'Intermediate' ? 'selected' : ''}>Intermediate Level</option>
                  <option value="Advanced" ${this.currentFilters.difficulty === 'Advanced' ? 'selected' : ''}>Advanced Capstone</option>
                </select>
              </div>

              <!-- Category Theme Filter -->
              <div>
                <select id="fyp-cat-select" class="form-select" style="width: 100%; font-size: 0.85rem;">
                  ${availableCategories.map(cat => `
                    <option value="${cat}" ${this.currentFilters.category === cat ? 'selected' : ''}>${cat}</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
              <button class="btn btn-ghost" id="fyp-reset-filters-btn" style="font-size: 0.8rem; padding: 4px 10px;">
                ✕ Reset All Filters
              </button>
            </div>
          </div>

          <!-- SECTION 4: Projects Grid -->
          ${filteredProjects.length === 0 ? `
            <div class="empty-state" style="padding: 48px 24px; text-align: center; border: 2px dashed var(--border-color); border-radius: var(--radius-lg); background: var(--bg-surface);">
              <div class="empty-state-icon" style="font-size: 3rem; margin-bottom: 12px;">💡</div>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                No Matching Project Blueprints Found
              </h3>
              <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 0.9rem;">
                Try changing your search query or selecting "All Natures" / "All Difficulties".
              </p>
              <button class="btn btn-primary" id="fyp-empty-reset-btn">Reset All Filters</button>
            </div>
          ` : `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px;">
              ${filteredProjects.map((p, idx) => {
                const isBookmarked = window.appState ? window.appState.isBookmarked(p.id) : false;
                const natureBadgeColor = p.projectNature === 'Hardware' ? 'badge-warning' : (p.projectNature === 'Hybrid' ? 'badge-info' : 'badge-primary');
                
                return `
                  <div class="card card-hoverable" style="padding: 24px; display: flex; flex-direction: column; animation: semFadeIn ${0.1 + idx * 0.04}s ease-out both;">
                    <!-- Card Header Badges -->
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 8px;">
                      <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                        <span class="badge ${natureBadgeColor}" style="font-size: 0.72rem;">
                          ${p.projectNature === 'Software' ? '💻 Software' : (p.projectNature === 'Hardware' ? '⚡ Hardware' : '🔄 Hybrid (SW+HW)')}
                        </span>
                        <span class="badge badge-success" style="font-size: 0.72rem;">${p.category || 'Industry'}</span>
                        <span class="badge badge-subtle" style="font-size: 0.72rem;">📊 ${p.difficulty}</span>
                      </div>
                      <button 
                        class="btn btn-icon btn-ghost bookmark-fyp-btn" 
                        data-projid="${p.id}" 
                        data-title="${p.title}"
                        title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark this project'}"
                        style="padding: 4px;"
                      >
                        <span style="font-size: 1.2rem;">${isBookmarked ? '⭐' : '☆'}</span>
                      </button>
                    </div>

                    <!-- Project Title -->
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin: 0 0 10px; line-height: 1.35;">
                      ${p.title}
                    </h3>

                    <!-- Real-World Problem Snippet -->
                    <div style="margin-bottom: 12px;">
                      <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">
                        ⚠️ Real-World Problem:
                      </div>
                      <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.45; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                        ${p.realWorldProblem}
                      </p>
                    </div>

                    <!-- Expected Output Snippet -->
                    <div style="margin-bottom: 14px; background: var(--bg-surface-elevated); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                      <div style="font-size: 0.72rem; font-weight: 700; color: var(--color-primary-600); margin-bottom: 2px;">
                        🎯 Expected Output:
                      </div>
                      <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                        ${p.expectedOutput}
                      </p>
                    </div>

                    <!-- Tech Stack Tags -->
                    <div style="margin-bottom: 18px;">
                      <div style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">
                        🛠️ Tech Stack & Tools:
                      </div>
                      <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                        ${(p.technologies || []).slice(0, 5).map(tech => `
                          <span class="badge badge-subtle" style="font-size: 0.68rem; text-transform: none;">${tech}</span>
                        `).join('')}
                      </div>
                    </div>

                    <!-- Open Full Project Details Action -->
                    <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid var(--border-subtle);">
                      <button 
                        class="btn btn-primary btn-sm view-fyp-spec-btn" 
                        data-projid="${p.id}"
                        style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px; font-weight: 700;"
                      >
                        📖 View Full Blueprint & Specs ➔
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      `;

      // Attach Event Handlers
      container.querySelector('#sbc-home')?.addEventListener('click', () => {
        window.appState.setView('dashboard');
      });

      // Department Switcher
      container.querySelector('#fyp-dept-select')?.addEventListener('change', (e) => {
        this.currentFilters.deptCode = e.target.value;
        this.currentFilters.selectedTopic = '';
        renderContent();
      });

      // Nature Filter
      container.querySelector('#fyp-nature-select')?.addEventListener('change', (e) => {
        this.currentFilters.nature = e.target.value;
        renderContent();
      });

      // Difficulty Filter
      container.querySelector('#fyp-diff-select')?.addEventListener('change', (e) => {
        this.currentFilters.difficulty = e.target.value;
        renderContent();
      });

      // Category Filter
      container.querySelector('#fyp-cat-select')?.addEventListener('change', (e) => {
        this.currentFilters.category = e.target.value;
        renderContent();
      });

      // Search Input
      container.querySelector('#fyp-search-input')?.addEventListener('input', (e) => {
        this.currentFilters.search = e.target.value;
        renderContent();
      });

      // Reference Topic Chips
      container.querySelectorAll('.fyp-ref-topic-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          this.currentFilters.selectedTopic = btn.getAttribute('data-topic');
          renderContent();
        });
      });

      // Reset Buttons
      const reset = () => {
        this.currentFilters.nature = 'All';
        this.currentFilters.difficulty = 'All';
        this.currentFilters.category = 'All';
        this.currentFilters.search = '';
        this.currentFilters.selectedTopic = '';
        renderContent();
      };
      container.querySelector('#fyp-reset-filters-btn')?.addEventListener('click', reset);
      container.querySelector('#fyp-empty-reset-btn')?.addEventListener('click', reset);

      // Open Modal Details
      container.querySelectorAll('.view-fyp-spec-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-projid');
          const proj = rawProjects.find(p => p.id === id) || (window.AppFallbackData?.projects || []).find(p => p.id === id);
          if (proj) {
            window.ProjectDetailModal.open({
              ...proj,
              problemStatement: proj.realWorldProblem || proj.problemStatement,
              objective: proj.mainObjective || proj.objective,
              features: proj.keyModules || proj.features,
              suggestedTech: proj.technologies || proj.suggestedTech,
              categoryTag: `${proj.projectNature || 'Hybrid'} • ${proj.category || 'Industry'}`
            });
          }
        });
      });

      // Bookmark project
      container.querySelectorAll('.bookmark-fyp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-projid');
          const title = btn.getAttribute('data-title');
          const added = window.appState.toggleBookmark({
            id,
            title,
            type: 'Final Year Project',
            category: 'Projects',
            deptCode: activeDeptCode,
            regCode: window.appState.regulation
          });
          window.Toast.info(added ? `Bookmarked: ${title}` : `Removed bookmark`);
          renderContent();
        });
      });
    };

    renderContent();
  }
};
