/**
 * Industry Certifications View Component
 * Verified certifications directory categorized by Cloud, DevOps, Cybersecurity,
 * Networking, and Engineering-specific with direct links to official exam portals.
 */

window.CertificationsView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    let activeCategory = 'All';
    let searchQuery = '';

    const categories = ['All', 'Cloud', 'DevOps', 'Cybersecurity', 'Networking', 'Engineering-specific'];

    const renderCerts = () => {
      const allCerts = (window.AppFallbackData?.certifications || []).filter(c => {
        const matchesCat = activeCategory === 'All' || c.category === activeCategory;
        const matchesSearch = !searchQuery || 
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          c.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCat && matchesSearch;
      });

      container.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; width: 100%;">
          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <span class="badge badge-warning">🏆 Verified Credentials</span>
                <span class="badge badge-subtle">Industry Recognitions</span>
              </div>
              <h1 style="font-size: 1.85rem; font-weight: 800;">Professional Engineering Certifications</h1>
              <p style="color: var(--text-secondary); max-width: 650px; margin-top: 4px;">
                Direct links to official global certification programs from AWS, Cisco, CNCF, CompTIA, and Dassault Systèmes.
              </p>
            </div>

            <!-- Search box -->
            <div style="position: relative; width: 300px;">
              <input 
                type="text" 
                id="cert-search-input" 
                class="form-input" 
                placeholder="Search certification or provider..." 
                value="${searchQuery}"
                style="padding-left: 36px;"
              >
              <span style="position: absolute; left: 12px; top: 10px; color: var(--text-muted);">🔍</span>
            </div>
          </div>

          <!-- Category filter chips -->
          <div class="chip-container" style="margin-bottom: 24px;">
            ${categories.map(cat => `
              <button class="chip cert-cat-chip ${activeCategory === cat ? 'active' : ''}" data-cat="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>

          <!-- Certifications Grid -->
          ${allCerts.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon">🏆</div>
              <div class="empty-state-title">No Certifications Match Criteria</div>
              <div class="empty-state-desc">Try choosing "All" categories or adjusting search keywords.</div>
            </div>
          ` : `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px;">
              ${allCerts.map(cert => {
                const isBookmarked = window.appState.isBookmarked(cert.id);
                return `
                  <div class="card card-hoverable" style="padding: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                      <div>
                        <span class="badge badge-primary" style="margin-bottom: 6px;">${cert.category}</span>
                        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">
                          ${cert.title}
                        </h3>
                        <div style="font-size: 0.8125rem; font-weight: 600; color: var(--color-primary-600); margin-top: 2px;">
                          Issued by ${cert.provider}
                        </div>
                      </div>

                      <button 
                        class="btn btn-icon btn-ghost bookmark-cert-btn"
                        data-certid="${cert.id}"
                        data-title="${cert.title}"
                        title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Certification'}"
                      >
                        <span style="font-size: 1.25rem;">${isBookmarked ? '⭐' : '☆'}</span>
                      </button>
                    </div>

                    <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">
                      ${cert.description}
                    </p>

                    <!-- Exam format details -->
                    <div style="background: var(--bg-subtle); padding: 10px 14px; border-radius: var(--radius-md); margin-bottom: 16px; font-size: 0.8125rem;">
                      <div style="font-weight: 600; color: var(--text-muted); margin-bottom: 2px; font-size: 0.7rem; text-transform: uppercase;">Examination Format:</div>
                      <div style="color: var(--text-primary);">${cert.examFormat}</div>
                    </div>

                    <!-- Prep resources -->
                    <div style="margin-bottom: 20px;">
                      <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">
                        Recommended Preparation:
                      </div>
                      <ul style="margin: 0; padding-left: 18px; font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5;">
                        ${(cert.prepResources || []).map(r => `<li>${r}</li>`).join('')}
                      </ul>
                    </div>

                    <!-- Action buttons: Official portal link & related roles -->
                    <div style="display: flex; gap: 8px; border-top: 1px solid var(--border-subtle); padding-top: 16px; margin-top: auto;">
                      <a 
                        href="${cert.officialUrl}" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="btn btn-primary btn-sm" 
                        style="width: 100%;"
                      >
                        🌐 Official Exam Portal ↗
                      </a>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      `;

      // Event listeners
      container.querySelectorAll('.cert-cat-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          activeCategory = chip.getAttribute('data-cat');
          renderCerts();
        });
      });

      container.querySelector('#cert-search-input')?.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderCerts();
      });

      container.querySelectorAll('.bookmark-cert-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-certid');
          const title = btn.getAttribute('data-title');
          const added = window.appState.toggleBookmark({
            id,
            title,
            type: 'Certification',
            category: 'Certifications',
            deptCode: window.appState.department,
            regCode: window.appState.regulation
          });
          window.Toast.info(added ? `Bookmarked: ${title}` : `Removed bookmark`);
          renderCerts();
        });
      });
    };

    renderCerts();
  }
};
