/**
 * Project Detail Modal Component
 * Opens an extensive architectural specification for a selected engineering project idea.
 */

window.ProjectDetailModal = {
  open(project) {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer || !project) return;

    modalContainer.innerHTML = `
      <div class="modal-overlay" id="project-detail-overlay">
        <div class="modal-dialog modal-lg" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
          <!-- Modal Header -->
          <div class="modal-header">
            <div>
              <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
                <span class="badge badge-primary">${project.deptCode} Department</span>
                <span class="badge badge-subtle">${project.domain}</span>
                <span class="badge badge-success">${project.categoryTag || 'Industry-inspired'}</span>
              </div>
              <h2 id="project-modal-title" style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary);">
                ${project.title}
              </h2>
            </div>
            <button class="btn btn-ghost btn-sm" id="close-project-modal" aria-label="Close modal">✕</button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body" style="display: flex; flex-direction: column; gap: 20px;">
            <!-- Key Metadata Row -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-md);">
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Difficulty</span>
                <div style="font-weight: 700; font-size: 0.9375rem; color: var(--text-primary);">${project.difficulty}</div>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Project Scope</span>
                <div style="font-weight: 700; font-size: 0.9375rem; color: var(--text-primary);">${project.projectType}</div>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Department</span>
                <div style="font-weight: 700; font-size: 0.9375rem; color: var(--text-primary);">${project.deptCode}</div>
              </div>
            </div>

            <!-- Problem Statement -->
            <div>
              <h4 style="font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                1. Problem Statement
              </h4>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
                ${project.problemStatement}
              </p>
            </div>

            <!-- Objective -->
            <div>
              <h4 style="font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                2. Core Engineering Objectives
              </h4>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
                ${project.objective}
              </p>
            </div>

            <!-- Features -->
            <div>
              <h4 style="font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
                3. Proposed System Features & Modules
              </h4>
              <ul style="padding-left: 20px; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
                ${(project.features || []).map(f => `<li>${f}</li>`).join('')}
              </ul>
            </div>

            <!-- Technology Stack -->
            <div>
              <h4 style="font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
                4. Suggested Technology Stack
              </h4>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${(project.suggestedTech || []).map(tech => `
                  <span class="badge badge-primary" style="font-size: 0.8125rem; text-transform: none;">
                    💻 ${tech}
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- Expected Outcome & Skills Learned -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
              <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-md);">
                <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--color-primary-600);">🎯 Expected Deliverable</span>
                <p style="font-size: 0.8125rem; color: var(--text-primary); margin-top: 6px; line-height: 1.5;">
                  ${project.expectedOutcome}
                </p>
              </div>

              <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-md);">
                <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-purple);">🧠 Skills Learned</span>
                <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px;">
                  ${(project.skillsLearned || []).map(s => `
                    <span class="badge badge-subtle" style="font-size: 0.75rem;">${s}</span>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Future Enhancement -->
            <div>
              <h4 style="font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                5. Possible Future Enhancements
              </h4>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
                ${project.futureEnhancement || 'Integration with live telemetry and mobile client.'}
              </p>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button class="btn btn-secondary" id="bookmark-project-modal-btn">
              ⭐ ${window.appState.isBookmarked(project.id) ? 'Bookmarked' : 'Save Project'}
            </button>
            <button class="btn btn-primary" id="close-project-footer-btn">
              Done & Close
            </button>
          </div>
        </div>
      </div>
    `;

    modalContainer.setAttribute('aria-hidden', 'false');

    const overlay = document.getElementById('project-detail-overlay');
    const closeBtn = document.getElementById('close-project-modal');
    const footerClose = document.getElementById('close-project-footer-btn');
    const bookmarkBtn = document.getElementById('bookmark-project-modal-btn');

    const close = () => {
      modalContainer.innerHTML = '';
      modalContainer.setAttribute('aria-hidden', 'true');
    };

    closeBtn?.addEventListener('click', close);
    footerClose?.addEventListener('click', close);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    bookmarkBtn?.addEventListener('click', () => {
      const added = window.appState.toggleBookmark({
        id: project.id,
        title: project.title,
        type: 'Project Blueprint',
        category: 'Projects',
        deptCode: project.deptCode,
        regCode: window.appState.regulation
      });
      bookmarkBtn.innerHTML = `⭐ ${added ? 'Bookmarked' : 'Save Project'}`;
      window.Toast.info(added ? 'Project blueprint saved!' : 'Bookmark removed');
    });
  }
};
