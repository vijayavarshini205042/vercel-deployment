/**
 * Departmental Roles & Required Skills View
 * Focuses on departmental job roles, required technical skills, tools, and career roadmaps.
 * (Certification pathways are maintained in the dedicated Skills & Certifications hub)
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

    // Get existing job roles from CareerData
    const roles = window.CareerData?.getRoles(currentDeptCode) || [];
    const categories = window.CareerData?.getCategories(currentDeptCode) || [];

    container.innerHTML = `
      <div style="max-width: 1200px; margin: 0 auto; width: 100%; padding-bottom: 60px;">
        <!-- Breadcrumb -->
        <div class="flow-breadcrumb" style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">
          <button class="breadcrumb-step completed" id="sbc-dept-roles">🏛️ ${dept.code}</button>
          <span class="breadcrumb-arrow">→</span>
          <span class="breadcrumb-step current">💼 Departmental Job Roles & Skills</span>
        </div>

        <!-- Section Header -->
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 72px; height: 72px; border-radius: var(--radius-xl); background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-size: 2.5rem; margin-bottom: 16px; box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);">
            💼
          </div>
          <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 12px; color: var(--text-primary);">
            Departmental Roles & Skill Profiles in ${dept.code}
          </h1>
          <p style="color: var(--text-secondary); max-width: 700px; margin: 0 auto; font-size: 1.1rem; line-height: 1.6;">
            Explore curated career pathways for <strong>${dept.name}</strong>. Each role outlines industry required skills, tools, salary benchmarks, and tailored roadmaps.
          </p>
        </div>

        ${roles.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">🚧</div>
            <div class="empty-state-title">Roles in Progress</div>
            <div class="empty-state-desc">We are actively curating career roles and skill roadmaps for ${dept.name}. Please check back soon.</div>
            <button class="btn btn-primary" id="dr-back-dashboard">Return to Dashboard</button>
          </div>
        ` : `
          <!-- Categories & Roles -->
          <div style="display: flex; flex-direction: column; gap: 40px; margin-bottom: 40px;">
            ${categories.map(category => {
              const categoryRoles = roles.filter(r => r.category === category);
              if (categoryRoles.length === 0) return '';
              
              return `
                <div class="role-category-section">
                  <h2 style="font-size: 1.45rem; font-weight: 700; color: var(--text-primary); margin-bottom: 20px; border-bottom: 2px solid var(--border-color); padding-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                    📌 ${category}
                  </h2>
                  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px;">
                    ${categoryRoles.map((role, idx) => `
                      <div class="card card-hoverable role-nav-card" data-role-id="${role.id}" style="cursor: pointer; display: flex; flex-direction: column; animation: semFadeIn ${0.1 + idx * 0.05}s ease-out both;">
                        <div style="padding: 24px; display: flex; flex-direction: column; height: 100%;">
                          
                          <!-- Title & Salary -->
                          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 10px;">
                            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-700); margin: 0; line-height: 1.3;">
                              ${role.title}
                            </h3>
                            <span class="badge badge-success" style="font-size: 0.75rem; white-space: nowrap;">${role.salary}</span>
                          </div>

                          <!-- Description -->
                          <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0 0 16px; line-height: 1.5;">
                            ${role.desc}
                          </p>

                          <!-- Technical Skills Preview -->
                          ${role.technicalSkills && role.technicalSkills.length > 0 ? `
                            <div style="margin-bottom: 12px;">
                              <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.04em; margin-bottom: 6px;">
                                Required Technical Skills:
                              </div>
                              <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                                ${role.technicalSkills.slice(0, 5).map(skill => `
                                  <span class="badge" style="background: var(--color-primary-50); color: var(--color-primary-700); border: 1px solid var(--color-primary-200); font-size: 0.75rem; font-weight: 600;">
                                    ${skill}
                                  </span>
                                `).join('')}
                              </div>
                            </div>
                          ` : ''}

                          <!-- Tools & Technologies Preview -->
                          ${role.tools && role.tools.length > 0 ? `
                            <div style="margin-bottom: 18px;">
                              <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.04em; margin-bottom: 6px;">
                                Industry Tools:
                              </div>
                              <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                                ${role.tools.slice(0, 4).map(tool => `
                                  <span class="badge" style="background: var(--bg-surface-elevated); color: var(--text-secondary); border: 1px solid var(--border-color); font-size: 0.72rem;">
                                    🔧 ${tool}
                                  </span>
                                `).join('')}
                              </div>
                            </div>
                          ` : ''}

                          <!-- Bottom Action Bar -->
                          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 14px; margin-top: auto;">
                            <span style="font-size: 0.78rem; color: var(--text-muted);">
                              ${(role.roadmap || []).length || 5}-Step Milestone Path
                            </span>
                            <span style="font-size: 0.875rem; font-weight: 600; color: var(--color-primary-600); display: flex; align-items: center; gap: 6px;">
                              Explore Skills & Roadmap ➔
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

        <!-- Helpful CTA Banner to Skills & Certifications -->
        <div class="card" style="padding: 32px; background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: var(--radius-xl); text-align: center; margin-top: 30px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; font-size: 1.8rem; margin-bottom: 14px; box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);">
            🏆
          </div>
          <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">
            Want to Earn Verified Certificates for These Skills?
          </h3>
          <p style="color: var(--text-secondary); max-width: 620px; margin: 0 auto 20px; font-size: 0.95rem; line-height: 1.5;">
            Explore the <strong>${dept.code} 8-Step Certification Roadmap</strong>, free official courses with digital credentials, and global certifications from AWS, Cisco, Microsoft, NPTEL, and CompTIA.
          </p>
          <button class="btn btn-primary" id="dr-go-certifications" style="font-size: 0.95rem; padding: 10px 24px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; margin: 0 auto;">
            🏆 Go to Skills & Certifications ➔
          </button>
        </div>

        <div style="text-align: center; margin-top: 36px;">
          <button class="btn btn-ghost" id="dr-back-dashboard-bottom">← Back to Dashboard</button>
        </div>
      </div>
    `;

    // Bind event listeners
    this.bindEvents();
  },

  bindEvents() {
    // Navigation buttons
    document.getElementById('sbc-dept-roles')?.addEventListener('click', () => {
      window.appState.setView('dashboard');
    });
    document.getElementById('dr-back-dashboard')?.addEventListener('click', () => {
      window.appState.setView('dashboard');
    });
    document.getElementById('dr-back-dashboard-bottom')?.addEventListener('click', () => {
      window.appState.setView('dashboard');
    });

    // Jump to Skills & Certifications
    document.getElementById('dr-go-certifications')?.addEventListener('click', () => {
      window.appState.setView('certifications');
    });

    // Role card clicks
    document.querySelectorAll('.role-nav-card').forEach(card => {
      card.addEventListener('click', () => {
        const roleId = card.getAttribute('data-role-id');
        window.appState.setView('role-detail', { roleId });
      });
    });
  }
};
