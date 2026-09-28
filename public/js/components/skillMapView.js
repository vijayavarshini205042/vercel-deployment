/**
 * Department Skill Map Component
 * Signature Career Pathway & Skill Gap Analysis Engine:
 * Department -> Career Specialization -> Current Skill Level -> Target Role
 * Outputs: Mastered Skills, Skill Gaps, Tailored Learning Steps, Projects, Certs, and Interview Prep.
 */

window.SkillMapView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const currentDeptCode = state.department || 'IT';

    // State for interactive journey form
    let selectedDept = currentDeptCode;
    let selectedLevel = 'Beginner';

    // Initial role and domain
    const allRoles = window.AppFallbackData?.jobRoles || [];
    let deptRoles = allRoles.filter(r => r.deptCode === selectedDept);
    if (deptRoles.length === 0) {
      deptRoles = allRoles.filter(r => r.deptCode === 'IT');
    }

    let activeRole = deptRoles[0] || {
      title: "Software Engineer",
      domain: "Software Engineering",
      coreSkills: ["Programming", "Data Structures", "Algorithms", "Databases", "Version Control"],
      secondarySkills: ["System Design", "Cloud Basics", "Testing"]
    };

    let selectedCareerGoal = activeRole.domain;
    let selectedRoleTitle = activeRole.title;

    const calculateGaps = () => {
      const allRequired = [...(activeRole.coreSkills || []), ...(activeRole.secondarySkills || [])];
      
      let acquired = [];
      let missing = [];

      if (selectedLevel === 'Beginner') {
        acquired = allRequired.slice(0, Math.min(2, allRequired.length));
        missing = allRequired.slice(acquired.length);
      } else if (selectedLevel === 'Intermediate') {
        acquired = allRequired.slice(0, Math.min(5, allRequired.length));
        missing = allRequired.slice(acquired.length);
      } else { // Advanced
        acquired = allRequired.slice(0, Math.min(7, allRequired.length));
        missing = allRequired.slice(acquired.length);
      }

      return { acquired, missing, allRequired };
    };

    const renderUI = () => {
      deptRoles = (window.AppFallbackData?.jobRoles || []).filter(r => r.deptCode === selectedDept);
      if (deptRoles.length === 0) {
        deptRoles = (window.AppFallbackData?.jobRoles || []).filter(r => r.deptCode === 'IT');
      }

      // Ensure activeRole matches selectedRoleTitle
      activeRole = deptRoles.find(r => r.title === selectedRoleTitle) || deptRoles[0];
      selectedRoleTitle = activeRole.title;
      selectedCareerGoal = activeRole.domain;

      // Extract unique domains for this department
      const uniqueDomains = [...new Set(deptRoles.map(r => r.domain))];

      const { acquired, missing, allRequired } = calculateGaps();
      const progressPercent = Math.round((acquired.length / (allRequired.length || 1)) * 100);

      container.innerHTML = `
        <div style="max-width: 1100px; margin: 0 auto; width: 100%;">
          <!-- Page Header -->
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: var(--radius-xl); background: var(--color-primary-100); color: var(--color-primary-700); font-size: 1.75rem; margin-bottom: 12px;">
              🧭
            </div>
            <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 6px;">Department Skill Map</h1>
            <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto;">
              Personalized career competency matrix. Select your department, career goal, and skill level to perform an instant gap analysis and generate a customized action plan.
            </p>
          </div>

          <!-- Step Selection Controls Form -->
          <div class="card" style="padding: 24px; margin-bottom: 32px; background: var(--bg-surface); border: 1px solid var(--border-color);">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
              
              <!-- 1. Department -->
              <div class="form-group" style="margin: 0;">
                <label class="form-label" for="skillmap-dept-select">1. Department</label>
                <select id="skillmap-dept-select" class="form-select">
                  ${(window.AppFallbackData?.departments || []).map(d => `
                    <option value="${d.code}" ${d.code === selectedDept ? 'selected' : ''}>
                      ${d.name} (${d.code})
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- 2. Career Goal / Domain -->
              <div class="form-group" style="margin: 0;">
                <label class="form-label" for="skillmap-domain-select">2. Specialization Domain</label>
                <select id="skillmap-domain-select" class="form-select">
                  ${uniqueDomains.map(dm => `
                    <option value="${dm}" ${dm === selectedCareerGoal ? 'selected' : ''}>${dm}</option>
                  `).join('')}
                </select>
              </div>

              <!-- 3. Current Skill Level -->
              <div class="form-group" style="margin: 0;">
                <label class="form-label" for="skillmap-level-select">3. Current Proficiency</label>
                <select id="skillmap-level-select" class="form-select">
                  <option value="Beginner" ${selectedLevel === 'Beginner' ? 'selected' : ''}>Beginner (1st / 2nd Year)</option>
                  <option value="Intermediate" ${selectedLevel === 'Intermediate' ? 'selected' : ''}>Intermediate (3rd Year)</option>
                  <option value="Advanced" ${selectedLevel === 'Advanced' ? 'selected' : ''}>Advanced (4th Year / Honors)</option>
                </select>
              </div>

              <!-- 4. Target Role -->
              <div class="form-group" style="margin: 0;">
                <label class="form-label" for="skillmap-role-select">4. Target Role</label>
                <select id="skillmap-role-select" class="form-select">
                  ${deptRoles.map(r => `
                    <option value="${r.title}" ${r.title === activeRole.title ? 'selected' : ''}>
                      ${r.title}
                    </option>
                  `).join('')}
                </select>
              </div>

            </div>
          </div>

          <!-- Dynamic Analysis Output -->
          <div style="display: flex; flex-direction: column; gap: 28px;">
            
            <!-- Progress & Match Metric -->
            <div class="card" style="padding: 20px; background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-subtle) 100%);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
                <div>
                  <h3 style="font-size: 1.15rem; font-weight: 700;">Career Readiness Assessment</h3>
                  <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 2px;">
                    Targeting <strong>${activeRole.title}</strong> in <strong>${selectedDept}</strong> based on ${selectedLevel} baseline.
                  </p>
                </div>
                <div style="font-size: 1.75rem; font-weight: 800; color: var(--color-primary-600);">
                  ${progressPercent}% Readiness
                </div>
              </div>

              <div style="width: 100%; height: 10px; background: var(--border-color); border-radius: var(--radius-full); overflow: hidden;">
                <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, var(--color-primary-600), var(--color-accent-purple)); border-radius: var(--radius-full); transition: width 0.4s ease;"></div>
              </div>
            </div>

            <!-- Side-by-Side: Current Acquired vs Missing Skills -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
              
              <!-- Acquired -->
              <div class="card" style="padding: 20px; border-left: 4px solid var(--color-accent-emerald);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                  <span style="font-size: 1.2rem;">✅</span>
                  <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0;">
                    Currently Mastered Skills (${acquired.length})
                  </h4>
                </div>
                <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 14px;">
                  Solid baseline concepts you can demonstrate in coursework and interviews.
                </p>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                  ${acquired.map(s => `
                    <span class="badge badge-success" style="font-size: 0.75rem; text-transform: none;">
                      ✓ ${s}
                    </span>
                  `).join('')}
                </div>
              </div>

              <!-- Missing Skill Gaps -->
              <div class="card" style="padding: 20px; border-left: 4px solid var(--color-accent-amber);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                  <span style="font-size: 1.2rem;">🎯</span>
                  <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0;">
                    Target Skill Gaps to Bridge (${missing.length})
                  </h4>
                </div>
                <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 14px;">
                  Priority competencies required to unlock shortlisted candidate interviews.
                </p>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                  ${missing.map(s => `
                    <span class="badge badge-warning" style="font-size: 0.75rem; text-transform: none;">
                      + ${s}
                    </span>
                  `).join('')}
                </div>
              </div>

            </div>

            <!-- Recommended Learning Action Plan -->
            <div class="card" style="padding: 24px;">
              <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 16px;">
                Tailored Learning Pathway to Bridge Gaps
              </h3>

              <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; gap: 14px; align-items: flex-start;">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary-600); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">1</div>
                  <div>
                    <h4 style="font-size: 0.9375rem; font-weight: 700;">Complete Missing Foundational Tooling</h4>
                    <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 2px;">
                      Focus on <strong>${missing.slice(0, 2).join(' & ') || 'Advanced Engineering Architecture'}</strong> through guided hands-on lab exercises and daily implementation.
                    </p>
                  </div>
                </div>

                <div style="display: flex; gap: 14px; align-items: flex-start;">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary-600); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">2</div>
                  <div>
                    <h4 style="font-size: 0.9375rem; font-weight: 700;">Implement Portfolio Milestone Project</h4>
                    <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 2px;">
                      Build an end-to-end milestone prototype incorporating <strong>${missing.slice(0, 1)[0] || 'Domain Core Tools'}</strong> with comprehensive technical documentation and performance benchmarks.
                    </p>
                  </div>
                </div>

                <div style="display: flex; gap: 14px; align-items: flex-start;">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary-600); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">3</div>
                  <div>
                    <h4 style="font-size: 0.9375rem; font-weight: 700;">Pursue Verified Domain Certification</h4>
                    <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 2px;">
                      Target recognized professional credentials tailored to <strong>${selectedDept}</strong> industry recruiters to validate your applied skills.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Shortcut CTA Buttons -->
              <div style="display: flex; gap: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle); flex-wrap: wrap;">
                <button class="btn btn-primary btn-sm" id="skillmap-view-roadmap-btn">
                  🗺️ Explore Complete Visual Roadmap
                </button>
                <button class="btn btn-secondary btn-sm" id="skillmap-view-projects-btn">
                  💡 Browse Recommended Projects
                </button>
              </div>
            </div>

          </div>
        </div>
      `;

      // Event listeners for select changes
      container.querySelector('#skillmap-dept-select')?.addEventListener('change', (e) => {
        selectedDept = e.target.value;
        const newRoles = (window.AppFallbackData?.jobRoles || []).filter(r => r.deptCode === selectedDept);
        if (newRoles.length > 0) {
          selectedRoleTitle = newRoles[0].title;
          selectedCareerGoal = newRoles[0].domain;
        }
        renderUI();
      });

      container.querySelector('#skillmap-domain-select')?.addEventListener('change', (e) => {
        selectedCareerGoal = e.target.value;
        const matchingRole = deptRoles.find(r => r.domain === selectedCareerGoal);
        if (matchingRole) {
          selectedRoleTitle = matchingRole.title;
        }
        renderUI();
      });

      container.querySelector('#skillmap-level-select')?.addEventListener('change', (e) => {
        selectedLevel = e.target.value;
        renderUI();
      });

      container.querySelector('#skillmap-role-select')?.addEventListener('change', (e) => {
        selectedRoleTitle = e.target.value;
        const role = deptRoles.find(r => r.title === selectedRoleTitle);
        if (role) {
          selectedCareerGoal = role.domain;
        }
        renderUI();
      });

      container.querySelector('#skillmap-view-roadmap-btn')?.addEventListener('click', () => {
        window.appState.setView('roadmaps', { roadmapId: activeRole.roadmapId });
      });

      container.querySelector('#skillmap-view-projects-btn')?.addEventListener('click', () => {
        window.appState.setView('projects');
      });
    };

    renderUI();
  }
};
