/**
 * Year / Semester Selection View Component
 * Flow Step: Regulation → Department → Year/Semester → Subject
 * Shows semesters grouped by academic year (Year 1–4) with rich animated cards.
 */

window.SemesterSelectView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const currentReg = state.regulation || 'R2021';
    const currentDeptCode = state.department || 'IT';

    const dept = (window.AppFallbackData?.departments || []).find(d => d.code === currentDeptCode) || {
      name: "Information Technology", code: "IT", icon: "🌐"
    };

    const semesters = window.AppFallbackData?.semesters || [
      { number: 1, name: "Semester 1", label: "Year 1 - Sem 1" },
      { number: 2, name: "Semester 2", label: "Year 1 - Sem 2" },
      { number: 3, name: "Semester 3", label: "Year 2 - Sem 3" },
      { number: 4, name: "Semester 4", label: "Year 2 - Sem 4" },
      { number: 5, name: "Semester 5", label: "Year 3 - Sem 5" },
      { number: 6, name: "Semester 6", label: "Year 3 - Sem 6" },
      { number: 7, name: "Semester 7", label: "Year 4 - Sem 7" },
      { number: 8, name: "Semester 8", label: "Year 4 - Sem 8" }
    ];

    // Group semesters by year
    const years = [
      { year: 1, label: "First Year", sems: semesters.filter(s => s.number <= 2), color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)', icon: '🌱' },
      { year: 2, label: "Second Year", sems: semesters.filter(s => s.number >= 3 && s.number <= 4), color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', icon: '📈' },
      { year: 3, label: "Third Year", sems: semesters.filter(s => s.number >= 5 && s.number <= 6), color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', icon: '🚀' },
      { year: 4, label: "Final Year", sems: semesters.filter(s => s.number >= 7 && s.number <= 8), color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #059669)', icon: '🎓' }
    ];

    // Count subjects per semester for the current dept
    const allSubjects = window.AppFallbackData?.subjects || [];
    const getSubjectCount = (semNum) => allSubjects.filter(s =>
      s.deptCode === currentDeptCode && s.regCode === currentReg && s.semester === semNum
    ).length;

    container.innerHTML = `
      <div style="max-width: 960px; margin: 30px auto; width: 100%;">
        <!-- Breadcrumb Trail -->
        <div class="flow-breadcrumb" style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">
          <button class="breadcrumb-step completed" id="bc-regulation">📜 ${currentReg}</button>
          <span class="breadcrumb-arrow">→</span>
          <button class="breadcrumb-step completed" id="bc-department">${dept.icon} ${dept.code}</button>
          <span class="breadcrumb-arrow">→</span>
          <span class="breadcrumb-step current">📅 Year / Semester</span>
          <span class="breadcrumb-arrow">→</span>
          <span class="breadcrumb-step upcoming">📖 Subject</span>
        </div>

        <!-- Page Header -->
        <div style="text-align: center; margin-bottom: 36px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: var(--radius-xl); background: linear-gradient(135deg, var(--color-primary-500), var(--color-accent-purple)); color: #fff; font-size: 2rem; margin-bottom: 16px; box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);">
            📅
          </div>
          <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 8px; background: linear-gradient(135deg, var(--color-primary-600), var(--color-accent-purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Select Academic Year & Semester
          </h1>
          <p style="color: var(--text-secondary); max-width: 550px; margin: 0 auto; line-height: 1.6;">
            Choose your current year and semester to access subject-wise syllabus, notes, previous question papers, and curated resources for <strong>${dept.name}</strong>.
          </p>
        </div>

        <!-- Year Groups -->
        <div style="display: flex; flex-direction: column; gap: 28px;">
          ${years.map((yearGroup, yIdx) => `
            <div class="year-group-card" style="animation: semFadeIn ${0.3 + yIdx * 0.15}s ease-out both;">
              <!-- Year Header -->
              <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 18px;">
                <div style="width: 48px; height: 48px; border-radius: var(--radius-lg); background: ${yearGroup.gradient}; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #fff; box-shadow: 0 4px 12px ${yearGroup.color}44;">
                  ${yearGroup.icon}
                </div>
                <div>
                  <h2 style="font-size: 1.35rem; font-weight: 700; margin: 0; color: var(--text-primary);">
                    ${yearGroup.label}
                  </h2>
                  <p style="font-size: 0.8125rem; color: var(--text-muted); margin: 0;">
                    ${yearGroup.sems.length} semesters • Academic Year ${yearGroup.year}
                  </p>
                </div>
              </div>

              <!-- Semester Cards Row -->
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
                ${yearGroup.sems.map(sem => {
                  const subCount = getSubjectCount(sem.number);
                  return `
                    <div class="semester-card" data-sem="${sem.number}" style="--accent-color: ${yearGroup.color}; --accent-gradient: ${yearGroup.gradient};">
                      <div class="sem-card-header">
                        <div class="sem-number-badge" style="background: ${yearGroup.gradient};">
                          S${sem.number}
                        </div>
                        <div>
                          <h3 class="sem-card-title">${sem.name}</h3>
                          <span class="sem-card-label">${sem.label}</span>
                        </div>
                      </div>
                      <div class="sem-card-stats">
                        <div class="sem-stat">
                          <span class="sem-stat-value">${subCount}</span>
                          <span class="sem-stat-label">Subjects</span>
                        </div>
                        <div class="sem-stat">
                          <span class="sem-stat-value">${subCount * 3}</span>
                          <span class="sem-stat-label">Credits</span>
                        </div>
                      </div>
                      <div class="sem-card-footer">
                        <span>Choose Semester</span>
                        <span class="sem-arrow">→</span>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Quick Links -->
        <div style="text-align: center; margin-top: 36px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-ghost" id="sem-back-dept" style="color: var(--color-primary-600);">
            ← Back to Department
          </button>
          <button class="btn btn-secondary" id="sem-skip-dashboard">
            Skip to Dashboard →
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
  },

  bindEvents() {
    // Semester card clicks
    document.querySelectorAll('.semester-card').forEach(card => {
      card.addEventListener('click', () => {
        const sem = parseInt(card.getAttribute('data-sem'));
        window.appState.setFilters({ semester: sem });
        window.Toast.success(`Selected Semester ${sem}`);
        window.appState.setView('subject-select', { semester: sem });
      });
    });

    // Breadcrumb navigation
    document.getElementById('bc-regulation')?.addEventListener('click', () => {
      window.appState.setView('regulation-select');
    });
    document.getElementById('bc-department')?.addEventListener('click', () => {
      window.appState.setView('department-select');
    });

    // Quick links
    document.getElementById('sem-back-dept')?.addEventListener('click', () => {
      window.appState.setView('department-select');
    });
    document.getElementById('sem-skip-dashboard')?.addEventListener('click', () => {
      window.appState.setView('dashboard');
    });
  }
};
