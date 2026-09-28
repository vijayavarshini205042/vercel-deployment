/**
 * Project & Skill Corner View Component
 * Features project ideas categorized by Mini Projects, Final Year, Research-oriented,
 * difficulty filters, and full architectural specification modals.
 */

window.ProjectsView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const currentDeptCode = state.department || 'IT';

    let activeCategory = 'All';
    let activeDifficulty = 'All';
    let searchQuery = '';

    const renderProjects = () => {
      // Fetch projects
      const allProjects = (window.AppFallbackData?.projects || []).filter(p => {
        const matchesDept = p.deptCode === currentDeptCode;
        const matchesCategory = activeCategory === 'All' || p.projectType.includes(activeCategory) || p.categoryTag.includes(activeCategory);
        const matchesDifficulty = activeDifficulty === 'All' || p.difficulty === activeDifficulty;
        const matchesSearch = !searchQuery || 
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          p.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.suggestedTech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesDept && matchesCategory && matchesDifficulty && matchesSearch;
      });

      container.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; width: 100%;">
          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <span class="badge badge-primary">💡 Project & Skill Corner</span>
                <span class="badge badge-subtle">${currentDeptCode} Department</span>
              </div>
              <h1 style="font-size: 1.85rem; font-weight: 800;">Engineering Project Blueprints & Ideas</h1>
              <p style="color: var(--text-secondary); max-width: 650px; margin-top: 4px;">
                Verified industry-inspired, research-oriented, and emerging tech project specifications complete with problem statements and architecture.
              </p>
            </div>

            <!-- Search box -->
            <div style="position: relative; width: 300px;">
              <input 
                type="text" 
                id="project-search-input" 
                class="form-input" 
                placeholder="Search domain, tech, or title..." 
                value="${searchQuery}"
                style="padding-left: 36px;"
              >
              <span style="position: absolute; left: 12px; top: 10px; color: var(--text-muted);">🔍</span>
            </div>
          </div>

          <!-- Filters Row: Category chips + Difficulty select -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
            <div class="chip-container" style="margin: 0;">
              <button class="chip proj-cat-chip ${activeCategory === 'All' ? 'active' : ''}" data-cat="All">All Projects</button>
              <button class="chip proj-cat-chip ${activeCategory === 'Mini Project' ? 'active' : ''}" data-cat="Mini Project">Mini Projects</button>
              <button class="chip proj-cat-chip ${activeCategory === 'Final Year' ? 'active' : ''}" data-cat="Final Year">Final Year Projects</button>
              <button class="chip proj-cat-chip ${activeCategory === 'Research-oriented' ? 'active' : ''}" data-cat="Research-oriented">Research Oriented</button>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 0.8125rem; font-weight: 600; color: var(--text-muted);">Difficulty:</span>
              <select id="proj-diff-select" class="form-select" style="width: auto; padding: 4px 10px; font-size: 0.8125rem;">
                <option value="All" ${activeDifficulty === 'All' ? 'selected' : ''}>All Difficulties</option>
                <option value="Beginner" ${activeDifficulty === 'Beginner' ? 'selected' : ''}>Beginner</option>
                <option value="Intermediate" ${activeDifficulty === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                <option value="Advanced" ${activeDifficulty === 'Advanced' ? 'selected' : ''}>Advanced</option>
              </select>
            </div>
          </div>

          <!-- Project Cards Grid -->
          ${allProjects.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon">💡</div>
              <div class="empty-state-title">No Matching Projects Found</div>
              <div class="empty-state-desc">Try resetting your difficulty or category filters.</div>
            </div>
          ` : `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px;">
              ${allProjects.map(p => {
                const isBookmarked = window.appState.isBookmarked(p.id);
                return `
                  <div class="card card-hoverable" style="padding: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 8px;">
                      <div style="display: flex; flex-direction: column; gap: 4px;">
                        <span class="badge badge-success" style="width: fit-content;">${p.categoryTag}</span>
                        <span style="font-size: 0.75rem; color: var(--text-muted);">${p.projectType} • ${p.difficulty}</span>
                      </div>
                      
                      <button 
                        class="btn btn-icon btn-ghost bookmark-proj-btn"
                        data-projid="${p.id}"
                        data-title="${p.title}"
                        title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Project'}"
                      >
                        <span style="font-size: 1.25rem;">${isBookmarked ? '⭐' : '☆'}</span>
                      </button>
                    </div>

                    <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
                      ${p.title}
                    </h3>

                    <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                      ${p.problemStatement}
                    </p>

                    <!-- Tech stack chips -->
                    <div style="margin-bottom: 20px;">
                      <div style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">
                        Tech Stack:
                      </div>
                      <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                        ${(p.suggestedTech || []).slice(0, 4).map(tech => `
                          <span class="badge badge-subtle" style="font-size: 0.7rem;">${tech}</span>
                        `).join('')}
                      </div>
                    </div>

                    <div style="display: flex; gap: 10px; border-top: 1px solid var(--border-subtle); padding-top: 16px; margin-top: auto;">
                      <button 
                        class="btn btn-primary btn-sm view-spec-btn" 
                        style="width: 100%;"
                        data-projid="${p.id}"
                      >
                        📖 View Full Architecture & Specs ➔
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      `;

      // Event listeners
      container.querySelectorAll('.proj-cat-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          activeCategory = chip.getAttribute('data-cat');
          renderProjects();
        });
      });

      container.querySelector('#proj-diff-select')?.addEventListener('change', (e) => {
        activeDifficulty = e.target.value;
        renderProjects();
      });

      container.querySelector('#project-search-input')?.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProjects();
      });

      container.querySelectorAll('.view-spec-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-projid');
          const proj = window.AppFallbackData.projects.find(p => p.id === id);
          if (proj) {
            window.ProjectDetailModal.open(proj);
          }
        });
      });

      container.querySelectorAll('.bookmark-proj-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-projid');
          const title = btn.getAttribute('data-title');
          const added = window.appState.toggleBookmark({
            id,
            title,
            type: 'Project Idea',
            category: 'Projects',
            deptCode: currentDeptCode,
            regCode: window.appState.regulation
          });
          window.Toast.info(added ? `Bookmarked: ${title}` : `Removed bookmark`);
          renderProjects();
        });
      });
    };

    renderProjects();
  }
};
