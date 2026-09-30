/**
 * Subject Selection View Component
 * Flow Step: Regulation → Department → Year/Semester → Subject → Resources
 * Shows subjects for a selected semester with rich cards and links to Notes, QP, etc.
 */

window.SubjectSelectView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const currentReg = state.regulation || 'R2021';
    const currentDeptCode = state.department || 'IT';
    const params = state.viewParams || {};
    const selectedSem = params.semester || state.activeFilters?.semester || 7;

    const dept = (window.AppFallbackData?.departments || []).find(d => d.code === currentDeptCode) || {
      name: "Information Technology", code: "IT", icon: "🌐"
    };

    // Get subjects for this dept / reg / semester
    const subjects = (window.AppFallbackData?.subjects || []).filter(s =>
      s.deptCode === currentDeptCode && s.regCode === currentReg && s.semester === selectedSem
    );

    // Count notes and QPs per subject
    const notesData = window.AppFallbackData?.notes || [];
    const qpData = window.AppFallbackData?.questionPapers || [];

    const getNotesCount = (subCode) => notesData.filter(n =>
      n.subjectCode === subCode && n.deptCode === currentDeptCode
    ).length;
    const getQPCount = (subCode) => qpData.filter(qp =>
      qp.subjectCode === subCode && qp.deptCode === currentDeptCode
    ).length;

    // Determine year label
    const yearNum = Math.ceil(selectedSem / 2);
    const yearLabel = ['First', 'Second', 'Third', 'Final'][yearNum - 1] || 'Final';

    // Subject icon palette
    const subjectIcons = ['📐', '💻', '🔬', '📊', '🧮', '⚡', '🔧', '📡', '🌐', '🧪'];

    container.innerHTML = `
      <div style="max-width: 1100px; margin: 30px auto; width: 100%;">
        <!-- Breadcrumb Trail -->
        <div class="flow-breadcrumb" style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">
          <button class="breadcrumb-step completed" id="sbc-regulation">📜 ${currentReg}</button>
          <span class="breadcrumb-arrow">→</span>
          <button class="breadcrumb-step completed" id="sbc-department">${dept.icon} ${dept.code}</button>
          <span class="breadcrumb-arrow">→</span>
          <button class="breadcrumb-step completed" id="sbc-semester">📅 Sem ${selectedSem}</button>
          <span class="breadcrumb-arrow">→</span>
          <span class="breadcrumb-step current">📖 Select Subject</span>
        </div>

        <!-- Page Header -->
        <div style="text-align: center; margin-bottom: 36px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: var(--radius-xl); background: linear-gradient(135deg, #8b5cf6, #6366f1); color: #fff; font-size: 2rem; margin-bottom: 16px; box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);">
            📖
          </div>
          <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 8px; background: linear-gradient(135deg, #8b5cf6, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Semester ${selectedSem} — ${yearLabel} Year Subjects
          </h1>
          <p style="color: var(--text-secondary); max-width: 550px; margin: 0 auto; line-height: 1.6;">
            Choose a subject to access its syllabus, lecture notes, previous year question papers, and related learning resources.
          </p>
          <div style="display: flex; gap: 8px; justify-content: center; margin-top: 12px;">
            <span class="badge badge-primary">${dept.name}</span>
            <span class="badge badge-subtle">${subjects.length} Subjects</span>
          </div>
        </div>

        ${subjects.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">📖</div>
            <div class="empty-state-title">No Subjects Found</div>
            <div class="empty-state-desc">
              Subjects for Semester ${selectedSem} of ${dept.name} (${currentReg}) haven't been catalogued yet. Check another semester or regulation.
            </div>
            <button class="btn btn-primary" id="empty-back-sem">← Back to Semester Selection</button>
          </div>
        ` : `
          <!-- Subject Cards Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px;">
            ${subjects.map((sub, idx) => {
              const noteCount = getNotesCount(sub.code) || 5;
              const qpCount = getQPCount(sub.code) || 4;
              const icon = subjectIcons[idx % subjectIcons.length];
              return `
                <div class="subject-select-card" data-id="${sub.id}" data-name="${sub.name}" style="animation: semFadeIn ${0.2 + idx * 0.1}s ease-out both;">
                  <div class="subject-card-top">
                    <div class="subject-icon-wrap">
                      <span class="subject-icon">${icon}</span>
                    </div>
                    <div class="subject-code-badge">${sub.code}</div>
                  </div>

                  <h3 class="subject-card-name">${sub.name}</h3>

                  <div class="subject-meta-row" style="display: flex; gap: 6px; flex-wrap: wrap; margin: 8px 0;">
                    <span class="badge badge-primary" style="font-size: 0.7rem;">${sub.category || 'PCC'}</span>
                    <span class="badge badge-subtle" style="font-size: 0.7rem;">L-T-P: ${sub.ltp || '3-0-0'}</span>
                    <span class="badge badge-subtle" style="font-size: 0.7rem;">${sub.credits} Credits</span>
                    <span class="badge badge-subtle" style="font-size: 0.7rem;">${sub.year || 'Year'} • Sem ${sub.semester}</span>
                  </div>

                  <!-- Official Verified Academic Repositories -->
                  <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; padding: 6px 8px; background: var(--bg-surface-elevated); border-radius: var(--radius-sm); border: 1px dashed var(--border-color);">
                    <span style="font-size: 0.68rem; font-weight: 700; color: var(--text-muted); align-self: center;">Repositories:</span>
                    <a href="https://onlinecourses.nptel.ac.in/explorer?q=${encodeURIComponent(sub.name || sub.code)}" target="_blank" rel="noopener noreferrer" class="badge" style="background: rgba(37,99,235,0.08); color: #2563eb; text-decoration: none; font-size: 0.68rem; padding: 2px 6px;" onclick="event.stopPropagation();" title="Search ${sub.code} on NPTEL / SWAYAM">
                      🏛️ NPTEL ↗
                    </a>
                    <a href="https://ndl.iitkgp.ac.in/result?q=${encodeURIComponent(sub.name || sub.code)}" target="_blank" rel="noopener noreferrer" class="badge" style="background: rgba(5,150,105,0.08); color: #059669; text-decoration: none; font-size: 0.68rem; padding: 2px 6px;" onclick="event.stopPropagation();" title="Search ${sub.code} on National Digital Library">
                      📚 NDLI ↗
                    </a>
                    <a href="https://openlibrary.org/search?q=${encodeURIComponent(sub.name || sub.code)}" target="_blank" rel="noopener noreferrer" class="badge" style="background: rgba(217,119,6,0.08); color: #d97706; text-decoration: none; font-size: 0.68rem; padding: 2px 6px;" onclick="event.stopPropagation();" title="Search ${sub.code} Textbooks on Open Library">
                      📖 E-Books ↗
                    </a>
                    <a href="https://cac.annauniv.edu" target="_blank" rel="noopener noreferrer" class="badge" style="background: rgba(124,58,237,0.08); color: #7c3aed; text-decoration: none; font-size: 0.68rem; padding: 2px 6px;" onclick="event.stopPropagation();" title="Anna University Curriculum Syllabus">
                      🎓 AU CAC ↗
                    </a>
                  </div>

                  <!-- Quick Resource Stats -->
                  <div class="subject-resource-stats">
                    <div class="subject-stat-item" title="Lecture Notes Available">
                      <span class="subject-stat-icon">📚</span>
                      <span class="subject-stat-count">${noteCount}</span>
                      <span class="subject-stat-label">Notes (U1-5)</span>
                    </div>
                    <div class="subject-stat-item" title="Question Papers Available">
                      <span class="subject-stat-icon">📝</span>
                      <span class="subject-stat-count">${qpCount}</span>
                      <span class="subject-stat-label">Past QPs</span>
                    </div>
                  </div>

                  <!-- Quick Action Links -->
                  <div class="subject-quick-actions">
                    <button class="subject-action-btn syllabus-btn" data-id="${sub.id}" data-name="${sub.name}" title="View Syllabus & Notes">
                      📚 Syllabus & Notes
                    </button>
                    <button class="subject-action-btn qp-btn" data-id="${sub.id}" data-name="${sub.name}" title="View Previous Year Questions">
                      📝 Prev. Year QP
                    </button>
                  </div>

                  <div class="subject-card-footer">
                    <span>View All Resources</span>
                    <span class="sem-arrow">→</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Additional Resource Links -->
          <div style="margin-top: 36px; display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px;">
            <div class="resource-quick-card" id="sq-projects">
              <span class="rqc-icon">💡</span>
              <span class="rqc-label">Project Ideas for Sem ${selectedSem}</span>
            </div>
            <div class="resource-quick-card" id="sq-roles">
              <span class="rqc-icon">💼</span>
              <span class="rqc-label">Dept. Roles & Skill Paths</span>
            </div>
            <div class="resource-quick-card" id="sq-certs">
              <span class="rqc-icon">🏆</span>
              <span class="rqc-label">Free Certifications & Skills</span>
            </div>
          </div>
        `}

        <!-- Navigation Footer -->
        <div style="text-align: center; margin-top: 32px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-ghost" id="sub-back-sem" style="color: var(--color-primary-600);">
            ← Back to Semester
          </button>
          <button class="btn btn-secondary" id="sub-skip-dashboard">
            Go to Dashboard →
          </button>
        </div>
      </div>
    `;

    this.bindEvents(selectedSem);
  },

  bindEvents(selectedSem) {
    // Subject card clicks → go to notes for that subject
    document.querySelectorAll('.subject-select-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't trigger if clicking action buttons
        if (e.target.closest('.subject-action-btn')) return;
        const id = card.getAttribute('data-id');
        const name = card.getAttribute('data-name');
        window.Toast.success(`Viewing resources for ${name}`);
        window.appState.setView('notes', { semester: selectedSem, subjectId: id });
      });
    });

    // Syllabus & Notes buttons
    document.querySelectorAll('.syllabus-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        window.appState.setView('notes', { semester: selectedSem, subjectId: id });
      });
    });

    // Previous Year QP buttons
    document.querySelectorAll('.qp-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        window.appState.setView('question-papers', { semester: selectedSem, subjectId: id });
      });
    });

    // Quick resource cards
    document.getElementById('sq-projects')?.addEventListener('click', () => {
      window.appState.setView('projects');
    });
    document.getElementById('sq-roles')?.addEventListener('click', () => {
      window.appState.setView('dept-roles');
    });
    document.getElementById('sq-certs')?.addEventListener('click', () => {
      window.appState.setView('dept-roles');
    });

    // Breadcrumb navigation
    document.getElementById('sbc-regulation')?.addEventListener('click', () => {
      window.appState.setView('regulation-select');
    });
    document.getElementById('sbc-department')?.addEventListener('click', () => {
      window.appState.setView('department-select');
    });
    document.getElementById('sbc-semester')?.addEventListener('click', () => {
      window.appState.setView('semester-select');
    });

    // Back/Skip
    document.getElementById('sub-back-sem')?.addEventListener('click', () => {
      window.appState.setView('semester-select');
    });
    document.getElementById('sub-skip-dashboard')?.addEventListener('click', () => {
      window.appState.setView('dashboard');
    });
    document.getElementById('empty-back-sem')?.addEventListener('click', () => {
      window.appState.setView('semester-select');
    });
  }
};
