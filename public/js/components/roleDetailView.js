/**
 * Level 2+: Specific Job Role View
 * Shows Skills, Tools, Projects, Certs, and Roadmap specifically for ONE job role.
 */

window.RoleDetailView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const currentDeptCode = state.department || 'IT';
    const params = state.viewParams || {};
    const roleId = params.roleId;

    if (!roleId) {
      window.appState.setView('dept-roles');
      return;
    }

    const role = window.CareerData.getRole(currentDeptCode, roleId);
    if (!role) {
      window.appState.setView('dept-roles');
      return;
    }

    const deptList = window.AppFallbackData?.departments || [];
    const dept = deptList.find(d => d.code === currentDeptCode) || { name: currentDeptCode, code: currentDeptCode, icon: "🏛️" };

    const getLevelBadge = (level) => {
      if(level.includes('🟢')) return `<span class="badge" style="background:#d1fae5; color:#065f46; font-size:0.75rem;">${level}</span>`;
      if(level.includes('🟡')) return `<span class="badge" style="background:#fef3c7; color:#92400e; font-size:0.75rem;">${level}</span>`;
      if(level.includes('🔴')) return `<span class="badge" style="background:#fee2e2; color:#991b1b; font-size:0.75rem;">${level}</span>`;
      return `<span class="badge badge-subtle" style="font-size:0.75rem;">${level}</span>`;
    };

    container.innerHTML = `
      <div style="max-width: 1100px; margin: 0 auto; width: 100%; padding-bottom: 60px;">
        
        <!-- Breadcrumbs -->
        <div class="flow-breadcrumb" style="display: flex; align-items: center; gap: 8px; margin-bottom: 30px; flex-wrap: wrap;">
          <button class="breadcrumb-step completed" id="rd-back-dashboard">🏛️ ${dept.code}</button>
          <span class="breadcrumb-arrow">→</span>
          <button class="breadcrumb-step completed" id="rd-back-roles">💼 Job Roles</button>
          <span class="breadcrumb-arrow">→</span>
          <span class="breadcrumb-step current">🎯 ${role.title}</span>
        </div>

        <!-- Role Header -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 32px; margin-bottom: 32px; box-shadow: var(--shadow-sm);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
            <div>
              <span class="badge badge-primary" style="margin-bottom: 12px;">${role.category}</span>
              <h1 style="font-size: 2.5rem; font-weight: 800; color: var(--text-primary); margin: 0 0 12px; line-height: 1.2;">
                ${role.title}
              </h1>
              <p style="font-size: 1.1rem; color: var(--text-secondary); max-width: 800px; margin: 0; line-height: 1.6;">
                ${role.desc}
              </p>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">Expected Salary</div>
              <div style="font-size: 1.5rem; font-weight: 800; color: #10b981;">${role.salary}</div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; gap: 32px;">
          
          <!-- SKILLS & TOOLS SECTION -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
            <!-- Skills -->
            <div class="card" style="padding: 24px;">
              <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 20px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                <span>🎯</span> Required Skills & Levels
              </h2>
              <div style="display: flex; flex-direction: column; gap: 16px;">
                ${role.skills.map(s => `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);">
                    <span style="font-weight: 600; font-size: 0.95rem; color: var(--text-primary);">${s.name}</span>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      ${getLevelBadge(s.from)}
                      <span style="color: var(--text-muted); font-size: 0.8rem;">➔</span>
                      ${getLevelBadge(s.to)}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Tools & Subjects -->
            <div style="display: flex; flex-direction: column; gap: 24px;">
              <div class="card" style="padding: 24px;">
                <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 16px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                  <span>🔧</span> Tools & Technologies
                </h2>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                  ${role.tools.map(t => `<span class="badge badge-subtle" style="font-size: 0.85rem; border: 1px solid var(--border-color);">${t}</span>`).join('')}
                </div>
              </div>
              <div class="card" style="padding: 24px;">
                <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 16px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                  <span>📚</span> Important Subjects
                </h2>
                <ul style="margin: 0; padding-left: 20px; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">
                  ${role.subjects.map(s => `<li>${s}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <!-- ROADMAP SECTION -->
          <div class="card" style="padding: 32px; background: #fafafa;">
            <h2 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 30px; color: var(--text-primary); text-align: center;">
              🗺️ Step-by-Step Roadmap to Achieve This Role
            </h2>
            
            <div class="roadmap-flow" style="position: relative;">
              ${role.roadmap.map((step, idx) => `
                <div style="display: flex; gap: 24px; margin-bottom: 24px; position: relative; z-index: 2;">
                  <div style="width: 48px; height: 48px; background: var(--color-primary-600); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; flex-shrink: 0; box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3); border: 4px solid white;">
                    ${step.step}
                  </div>
                  <div style="background: white; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px; flex: 1; box-shadow: var(--shadow-sm);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap;">
                      <h3 style="font-size: 1.2rem; font-weight: 700; margin: 0; color: var(--color-primary-700);">${step.title}</h3>
                      <span class="badge" style="background: #f1f5f9; color: #475569; font-size: 0.75rem;">⏱️ ${step.duration}</span>
                    </div>
                    <p style="margin: 0; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">
                      ${step.desc}
                    </p>
                  </div>
                </div>
              `).join('')}
              <!-- Connecting Line -->
              <div style="position: absolute; top: 24px; bottom: 24px; left: 22px; width: 4px; background: #cbd5e1; z-index: 1;"></div>
            </div>
          </div>

          <!-- PROJECTS, CERTS & INTERVIEW -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
            <div class="card" style="padding: 24px;">
              <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 16px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                <span>💡</span> Recommended Projects
              </h2>
              <div style="display: flex; flex-direction: column; gap: 16px;">
                ${role.projects.map(p => `
                  <div style="background: var(--bg-subtle); padding: 12px 16px; border-radius: var(--radius-md); border-left: 3px solid var(--color-primary-500);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <span style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary);">${p.title}</span>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                      ${getLevelBadge(p.level)}
                      <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Stack: ${p.stack}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 24px;">
              <div class="card" style="padding: 24px;">
                <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 16px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                  <span>🏆</span> Recommended Certifications
                </h2>
                <ul style="margin: 0; padding-left: 20px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                  ${role.certs.map(c => `<li>${c}</li>`).join('')}
                </ul>
              </div>

              <div class="card" style="padding: 24px;">
                <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 16px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                  <span>💬</span> Interview Preparation
                </h2>
                <ul style="margin: 0; padding-left: 20px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                  ${role.interviewTopics.map(i => `<li>${i}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <!-- INTERNSHIP -->
          <div class="card" style="padding: 24px; background: #f0fdf4; border-color: #bbf7d0;">
            <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; color: #166534; display: flex; align-items: center; gap: 8px;">
              <span>🚀</span> Internship / Career Path
            </h2>
            <p style="margin: 0; font-size: 1rem; color: #15803d; line-height: 1.6; font-weight: 500;">
              ${role.internship}
            </p>
          </div>

        </div>
      </div>
    `;

    document.getElementById('rd-back-dashboard')?.addEventListener('click', () => window.appState.setView('dashboard'));
    document.getElementById('rd-back-roles')?.addEventListener('click', () => window.appState.setView('dept-roles'));
  }
};
