/**
 * Job Roles & Skills Component
 * Department-tailored career pathways, core competencies, salary benchmarks,
 * and direct links to visual learning roadmaps.
 */

window.JobRolesView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const currentDeptCode = state.department || 'IT';

    // Fetch department metadata
    const dept = (window.AppFallbackData?.departments || []).find(d => d.code === currentDeptCode) || {
      name: "Information Technology",
      code: "IT"
    };

    // Filter department roles
    const roles = (window.AppFallbackData?.jobRoles || []).filter(r => r.deptCode === currentDeptCode);

    container.innerHTML = `
      <div style="max-width: 1200px; margin: 0 auto; width: 100%;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span class="badge badge-primary">💼 Career Navigation</span>
              <span class="badge badge-subtle">${currentDeptCode} Department</span>
            </div>
            <h1 style="font-size: 1.85rem; font-weight: 800;">Target Job Roles & In-Demand Skills</h1>
            <p style="color: var(--text-secondary); max-width: 650px; margin-top: 4px;">
              Curated career opportunities aligned with ${dept.name} curriculum, current industry hiring demand, and skill roadmaps.
            </p>
          </div>

          <button class="btn btn-primary" id="launch-skill-map-career-btn">
            🧭 Open Department Skill Map
          </button>
        </div>

        <!-- Role Cards -->
        ${roles.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">💼</div>
            <div class="empty-state-title">Career Roles Being Cataloged</div>
            <div class="empty-state-desc">
              Faculty career coordinators are adding mapped industry roles for ${dept.name}. Check back shortly!
            </div>
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px;">
            ${roles.map(role => {
              const isBookmarked = window.appState.isBookmarked(role.id);
              return `
                <div class="card card-hoverable" style="padding: 24px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                    <div>
                      <span class="badge badge-subtle" style="margin-bottom: 6px;">${role.domain}</span>
                      <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">
                        ${role.title}
                      </h3>
                    </div>

                    <button 
                      class="btn btn-icon btn-ghost bookmark-role-btn"
                      data-roleid="${role.id}"
                      data-title="${role.title}"
                      title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Role'}"
                    >
                      <span style="font-size: 1.25rem;">${isBookmarked ? '⭐' : '☆'}</span>
                    </button>
                  </div>

                  <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px; flex: 1;">
                    ${role.description}
                  </p>

                  <div style="background: var(--bg-subtle); padding: 10px 14px; border-radius: var(--radius-md); margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase;">Average Compensation</span>
                    <strong style="font-size: 0.875rem; color: var(--color-accent-emerald); font-family: var(--font-family-mono);">${role.avgSalaryRange}</strong>
                  </div>

                  <!-- Core skills chips -->
                  <div style="margin-bottom: 18px;">
                    <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">
                      Core Competencies:
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                      ${(role.coreSkills || []).map(skill => `
                        <span class="badge badge-primary" style="font-size: 0.75rem; text-transform: none; font-weight: 500;">
                          ${skill}
                        </span>
                      `).join('')}
                    </div>
                  </div>

                  <!-- Action footer -->
                  <div style="display: flex; gap: 10px; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
                    <button 
                      class="btn btn-primary btn-sm view-roadmap-btn" 
                      style="width: 100%;"
                      data-roadmapid="${role.roadmapId}"
                      data-role="${role.title}"
                    >
                      🗺️ View Visual Learning Roadmap ➔
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
    container.querySelector('#launch-skill-map-career-btn')?.addEventListener('click', () => {
      window.appState.setView('skill-map');
    });

    container.querySelectorAll('.view-roadmap-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const roadmapId = btn.getAttribute('data-roadmapid');
        window.appState.setView('roadmaps', { roadmapId });
      });
    });

    container.querySelectorAll('.bookmark-role-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const roleId = btn.getAttribute('data-roleid');
        const title = btn.getAttribute('data-title');
        const added = window.appState.toggleBookmark({
          id: roleId,
          title,
          type: 'Career Role',
          category: 'Careers',
          deptCode: currentDeptCode,
          regCode: window.appState.regulation
        });
        window.Toast.info(added ? `Bookmarked: ${title}` : `Removed bookmark`);
        this.render();
      });
    });
  }
};
