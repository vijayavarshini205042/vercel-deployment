/**
 * Regulation Selection Component
 * Allows students and faculty to choose their academic syllabus regulation.
 * Fetches regulations dynamically from the database / API.
 */

window.RegulationSelectView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    let regulations = [];
    try {
      const res = await window.apiService.get('/regulations');
      regulations = res.data || window.AppFallbackData.regulations;
    } catch {
      regulations = window.AppFallbackData.regulations;
    }

    const currentReg = window.appState.regulation;
    const isOnboarding = window.appState.role === 'student' && !window.appState.hasCompletedOnboarding;

    container.innerHTML = `
      <div style="max-width: 760px; margin: 30px auto; width: 100%; padding: 0 16px;">
        
        <!-- Onboarding Progress Flow Indicator -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 28px; flex-wrap: wrap;">
          <div class="breadcrumb-step current" style="cursor: default;">
            <span>1</span> <span>📜 Choose Regulation</span>
          </div>
          <span class="breadcrumb-arrow">→</span>
          <div class="breadcrumb-step ${isOnboarding ? 'upcoming' : 'completed'}" style="cursor: default;">
            <span>2</span> <span>🏛️ Choose Department</span>
          </div>
          <span class="breadcrumb-arrow">→</span>
          <div class="breadcrumb-step upcoming" style="cursor: default;">
            <span>3</span> <span>🚀 Enter Portal</span>
          </div>
        </div>

        <!-- Back to Role link if during onboarding -->
        <div style="margin-bottom: 16px; text-align: left;">
          <button class="btn btn-ghost btn-sm" id="reg-back-role-btn" style="color: var(--text-muted); font-size: 0.8rem; display: inline-flex; align-items: center; gap: 4px;">
            ← Back to Role Selection
          </button>
        </div>

        <!-- Header card -->
        <div style="text-align: center; margin-bottom: 28px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: var(--radius-xl); background: var(--color-primary-100); color: var(--color-primary-700); font-size: 1.75rem; margin-bottom: 14px;">
            📜
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 8px;">Select Academic Regulation</h1>
          <p style="color: var(--text-secondary); max-width: 520px; margin: 0 auto; font-size: 0.95rem; line-height: 1.5;">
            Engineering syllabus copies, credits, question papers and courses are categorized by university regulation. Please pick your active regulation:
          </p>
        </div>

        <!-- Regulation Cards -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${regulations.map(reg => {
            const isSelected = reg.code === currentReg;
            const regColor = reg.code === 'R2025' ? '#8b5cf6' : '#3b82f6';
            const regGradient = reg.code === 'R2025'
              ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
              : 'linear-gradient(135deg, #3b82f6, #2563eb)';
            return `
              <div 
                class="card card-hoverable reg-select-card" 
                data-code="${reg.code}"
                style="cursor: pointer; padding: 22px; border: 2px solid ${isSelected ? regColor : 'var(--border-color)'}; background-color: ${isSelected ? 'var(--color-primary-50)' : 'var(--bg-surface)'}; border-radius: var(--radius-lg); transition: all 0.2s ease;"
              >
                <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
                  <div style="display: flex; align-items: center; gap: 16px; flex: 1;">
                    <div style="width: 54px; height: 54px; border-radius: var(--radius-lg); background: ${isSelected ? regGradient : 'var(--bg-subtle)'}; color: ${isSelected ? '#fff' : regColor}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem; flex-shrink: 0; box-shadow: ${isSelected ? '0 4px 14px ' + regColor + '44' : 'none'};">
                      ${reg.code}
                    </div>
                    <div>
                      <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin: 0 0 4px 0;">
                        ${reg.name}
                      </h3>
                      <p style="font-size: 0.875rem; color: var(--text-secondary); margin: 0 0 10px;">
                        ${reg.description || 'Curriculum framework introduced in ' + reg.year}
                      </p>
                      <!-- Stats Row -->
                      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <span style="font-size: 0.78rem; font-weight: 600; color: var(--text-muted); background: var(--bg-subtle); padding: 3px 10px; border-radius: 99px;">
                          📅 Year ${reg.year}
                        </span>
                        ${reg.deptCount ? `<span style="font-size: 0.78rem; font-weight: 600; color: var(--text-muted); background: var(--bg-subtle); padding: 3px 10px; border-radius: 99px;">🏛️ ${reg.deptCount} Departments</span>` : ''}
                        ${reg.subjectCount ? `<span style="font-size: 0.78rem; font-weight: 600; color: var(--text-muted); background: var(--bg-subtle); padding: 3px 10px; border-radius: 99px;">📖 ${reg.subjectCount} Subjects</span>` : ''}
                        <span style="font-size: 0.78rem; font-weight: 600; color: ${reg.status === 'Active' ? '#10b981' : '#f59e0b'}; background: ${reg.status === 'Active' ? '#d1fae5' : '#fef3c7'}; padding: 3px 10px; border-radius: 99px;">
                          ● ${reg.status || 'Active'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 12px; align-self: center;">
                    ${isSelected ? `
                      <span class="badge badge-primary">Active</span>
                    ` : ''}
                    <span style="font-size: 1.3rem; color: ${regColor};">➔</span>
                  </div>
                </div>

                ${reg.highlights && reg.highlights.length ? `
                  <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border-subtle);">
                    ${reg.highlights.map(h => `
                      <span style="font-size: 0.75rem; color: ${regColor}; background: ${isSelected ? 'white' : 'var(--bg-subtle)'}; border: 1px solid ${regColor}22; padding: 2px 10px; border-radius: 99px;">
                        ✓ ${h}
                      </span>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>

        <!-- Navigation helper -->
        <div style="text-align: center; margin-top: 28px;">
          <button class="btn btn-primary" id="skip-reg-btn" style="padding: 12px 28px; font-weight: 700;">
            Continue with Selected Regulation ➔
          </button>
        </div>
      </div>
    `;

    // Back to Role selection
    document.getElementById('reg-back-role-btn')?.addEventListener('click', () => {
      window.Auth.logout();
    });

    // Bind event clicks on regulation cards
    container.querySelectorAll('.reg-select-card').forEach(card => {
      card.addEventListener('click', () => {
        const code = card.getAttribute('data-code');
        window.appState.setRegulation(code, true);
        if (window.Toast) {
          window.Toast.success(`Academic Regulation set to ${code}. Now select your department.`);
        }
      });
    });

    document.getElementById('skip-reg-btn')?.addEventListener('click', () => {
      const code = window.appState.regulation || 'R2021';
      window.appState.setRegulation(code, true);
      if (window.Toast) {
        window.Toast.success(`Academic Regulation set to ${code}. Now select your department.`);
      }
    });
  }
};
