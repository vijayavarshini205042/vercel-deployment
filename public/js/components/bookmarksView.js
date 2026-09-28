/**
 * My Bookmarks View Component
 * Allows students to quickly retrieve saved notes, question papers, projects, roles, and certifications.
 */

window.BookmarksView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    let activeFilter = 'All';

    const renderBookmarks = () => {
      const allBookmarks = window.appState.bookmarks || [];
      const filtered = allBookmarks.filter(b => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Notes') return b.category === 'Notes' || b.type.includes('Notes');
        if (activeFilter === 'QP') return b.category === 'QP' || b.type.includes('Question');
        if (activeFilter === 'Projects') return b.category === 'Projects' || b.type.includes('Project');
        if (activeFilter === 'Careers') return b.category === 'Careers' || b.type.includes('Role');
        if (activeFilter === 'Certifications') return b.category === 'Certifications' || b.type.includes('Cert');
        return true;
      });

      container.innerHTML = `
        <div style="max-width: 1000px; margin: 0 auto; width: 100%;">
          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <span class="badge badge-warning">⭐ Saved Resources</span>
                <span class="badge badge-subtle">${allBookmarks.length} Bookmarks</span>
              </div>
              <h1 style="font-size: 1.85rem; font-weight: 800;">My Academic & Career Bookmarks</h1>
              <p style="color: var(--text-secondary); margin-top: 4px;">
                Direct access to your pinned lecture notes, exam papers, project blueprints, and certifications.
              </p>
            </div>
          </div>

          <!-- Category filter tabs -->
          <div class="chip-container" style="margin-bottom: 24px;">
            ${['All', 'Notes', 'QP', 'Projects', 'Careers', 'Certifications'].map(cat => `
              <button class="chip bookmark-cat-chip ${activeFilter === cat ? 'active' : ''}" data-cat="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>

          <!-- Bookmarks list -->
          ${filtered.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon">⭐</div>
              <div class="empty-state-title">No Saved Bookmarks Yet</div>
              <div class="empty-state-desc">
                Click the star icon (☆) on any note, past paper, career role, or project blueprint to pin it here for rapid access.
              </div>
              <button class="btn btn-primary" onclick="window.appState.setView('dashboard')">
                Browse Resources
              </button>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 14px;">
              ${filtered.map(b => `
                <div class="card" style="padding: 16px 20px; display: flex; flex-direction: row; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                  <div style="display: flex; align-items: center; gap: 16px;">
                    <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--bg-subtle); display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
                      ${b.category === 'Notes' ? '📚' : b.category === 'QP' ? '📝' : b.category === 'Projects' ? '💡' : b.category === 'Careers' ? '💼' : '🏆'}
                    </div>
                    <div>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0;">
                          ${b.title}
                        </h4>
                        <span class="badge badge-primary" style="font-size: 0.65rem;">${b.type}</span>
                      </div>
                      <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">
                        Department: <strong>${b.deptCode || 'IT'}</strong> • Regulation: <strong>${b.regCode || 'R2021'}</strong> • Pinned on ${new Date(b.addedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 8px;">
                    <button class="btn btn-secondary btn-sm open-bookmark-btn" data-type="${b.type}">
                      Open ➔
                    </button>
                    <button class="btn btn-icon btn-ghost remove-bookmark-btn" data-id="${b.id}" title="Remove bookmark">
                      🗑️
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;

      // Event listeners
      container.querySelectorAll('.bookmark-cat-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          activeFilter = chip.getAttribute('data-cat');
          renderBookmarks();
        });
      });

      container.querySelectorAll('.open-bookmark-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const type = btn.getAttribute('data-type');
          if (type.includes('Notes')) window.appState.setView('notes');
          else if (type.includes('Question')) window.appState.setView('question-papers');
          else if (type.includes('Project')) window.appState.setView('projects');
          else if (type.includes('Role')) window.appState.setView('job-roles');
          else if (type.includes('Cert')) window.appState.setView('certifications');
          else window.appState.setView('dashboard');
        });
      });

      container.querySelectorAll('.remove-bookmark-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          window.appState.toggleBookmark({ id });
          window.Toast.info('Bookmark removed');
          renderBookmarks();
        });
      });
    };

    renderBookmarks();
  }
};
