/**
 * Level 1: Departmental Roles View
 * Shows ONLY job roles relevant to the selected department, categorized.
 */

window.DeptRolesView = {
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

    // Get roles from the new CareerData
    const roles = window.CareerData.getRoles(currentDeptCode);
    const categories = window.CareerData.getCategories(currentDeptCode);

    container.innerHTML = `
      <div style="max-width: 1200px; margin: 0 auto; width: 100%; padding-bottom: 60px;">
        <!-- Breadcrumb -->
        <div class="flow-breadcrumb" style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">
          <button class="breadcrumb-step completed" id="sbc-dept-roles">🏛️ ${dept.code}</button>
          <span class="breadcrumb-arrow">→</span>
          <span class="breadcrumb-step current">💼 Departmental Job Roles</span>
        </div>

        <!-- Page Header -->
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
          <div style="display: flex; flex-direction: column; gap: 40px;">
            ${categories.map(category => {
              const categoryRoles = roles.filter(r => r.category === category);
              if(categoryRoles.length === 0) return '';
              
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
        
        <div style="text-align: center; margin-top: 40px;">
          <button class="btn btn-ghost" id="dr-back-dashboard-bottom">← Back to Dashboard</button>
        </div>
      </div>
    `;

    // Bind events
    document.getElementById('sbc-dept-roles')?.addEventListener('click', () => {
      window.appState.setView('dashboard');
    });
    document.getElementById('dr-back-dashboard')?.addEventListener('click', () => {
      window.appState.setView('dashboard');
    });
    document.getElementById('dr-back-dashboard-bottom')?.addEventListener('click', () => {
      window.appState.setView('dashboard');
    });

    document.querySelectorAll('.role-nav-card').forEach(card => {
      card.addEventListener('click', () => {
        const roleId = card.getAttribute('data-role-id');
        window.appState.setView('role-detail', { roleId });
      });
    });
  }
};
