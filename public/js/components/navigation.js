/**
 * Navigation Component: Desktop Left Sidebar & Mobile Bottom App Bar
 * Updated for full guided flow:
 * Login → Dashboard → Regulation → Department → Year/Semester → Subject
 * → Syllabus & Notes → Previous Year QP → Project Ideas → Dept Roles (Skills & Certs)
 */

window.NavigationComponent = {
  render() {
    this.renderDesktopSidebar();
    this.renderMobileBottomNav();
  },

  // Views that hide the sidebar entirely (fullscreen flow steps)
  isFlowView(view) {
    return ['regulation-select', 'department-select', 'semester-select', 'subject-select', 'login'].includes(view);
  },

  renderDesktopSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    const currentView = window.appState.currentView;
    const user = window.appState.user;

    // Hide sidebar on guided flow selection screens or until onboarding is complete
    if (this.isFlowView(currentView) || !user || !window.appState.hasCompletedOnboarding) {
      sidebar.hidden = true;
      sidebar.style.display = 'none';
      return;
    }

    sidebar.hidden = false;
    sidebar.style.display = 'flex';

    // ── 1. TOP SECTION (Academic Resources - High Priority) ──
    const academicItems = [
      { id: 'dashboard', label: 'Department Overview', icon: '🏛️' },
      { id: 'semester-select', label: 'Year / Semester Selection', icon: '📅' },
      { id: 'notes', label: 'Syllabus & Notes', icon: '📚' },
      { id: 'question-papers', label: 'Previous Year Question Papers (QP)', icon: '📝' }
    ];

    // ── 2. BOTTOM SECTION (Career & Skills - Separate Pages) ──
    const careerItems = [
      { id: 'dept-roles', label: 'Departmental Roles', icon: '💼', pageBadge: 'Page 1' },
      { id: 'projects', label: 'Project Ideas', icon: '💡', pageBadge: 'Page 2' },
      { id: 'certifications', label: 'Skills & Certifications', icon: '🏆', pageBadge: 'Page 3' },
      { id: 'roadmaps', label: 'Career Roadmaps', icon: '🗺️', pageBadge: 'Page 4' }
    ];

    // ── Personal & Showcase ──
    const personalItems = [
      { id: 'bookmarks', label: 'My Bookmarks', icon: '⭐' }
    ];

    if (user && user.role === 'admin') {
      personalItems.push({ id: 'admin', label: 'Admin Control Center', icon: '🛡️' });
    }

    const renderItem = (item) => `
      <li class="sidebar-nav-item ${currentView === item.id ? 'active' : ''}" data-view="${item.id}" title="${item.label}" style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          <span style="font-size: 1.15rem; flex-shrink: 0;">${item.icon}</span>
          <span style="font-size: 0.85rem; font-weight: ${currentView === item.id ? '700' : '500'};">${item.label}</span>
        </div>
        ${item.pageBadge ? `
          <span class="badge ${currentView === item.id ? 'badge-primary' : 'badge-subtle'}" style="font-size: 0.62rem; padding: 2px 6px; font-weight: 700; margin-left: 6px; flex-shrink: 0;">
            ${item.pageBadge}
          </span>
        ` : ''}
      </li>
    `;

    sidebar.innerHTML = `
      <!-- Guided Flow Quick Steps -->
      <div style="padding: 10px 16px; margin-bottom: 4px;">
        <div style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.06em; margin-bottom: 8px;">
          Quick Context
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <button class="flow-step-btn ${currentView === 'regulation-select' ? 'active' : ''}" data-view="regulation-select">
            📜 Change Regulation
          </button>
          <button class="flow-step-btn ${currentView === 'department-select' ? 'active' : ''}" data-view="department-select">
            🏛️ Change Department
          </button>
        </div>
      </div>

      <div class="sidebar-divider"></div>

      <!-- 1. TOP SECTION: Academic Resources -->
      <div>
        <div style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.06em; padding-left: 12px; margin-bottom: 8px;">
          Academic Resources
        </div>
        <ul class="sidebar-nav-list">
          ${academicItems.map(renderItem).join('')}
        </ul>
      </div>

      <div class="sidebar-divider" style="margin: 12px 0;"></div>

      <!-- 2. BOTTOM SECTION: Career & Skills (Separate Pages) -->
      <div>
        <div style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.06em; padding-left: 12px; margin-bottom: 8px;">
          Career & Skills
        </div>
        <ul class="sidebar-nav-list">
          ${careerItems.map(renderItem).join('')}
        </ul>
      </div>

      <div class="sidebar-divider" style="margin: 12px 0;"></div>

      <!-- Personal & Showcase -->
      <div style="margin-top: auto;">
        <div style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.06em; padding-left: 12px; margin-bottom: 8px;">
          Saved & Tools
        </div>
        <ul class="sidebar-nav-list">
          ${personalItems.map(renderItem).join('')}
        </ul>
      </div>
    `;

    // Bind nav item clicks
    sidebar.querySelectorAll('.sidebar-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const view = item.getAttribute('data-view');
        window.appState.setView(view);
      });
    });

    // Bind flow step buttons
    sidebar.querySelectorAll('.flow-step-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        window.appState.setView(view);
      });
    });
  },

  renderMobileBottomNav() {
    const mobileNav = document.getElementById('mobile-bottom-nav');
    if (!mobileNav) return;

    const currentView = window.appState.currentView;
    const user = window.appState.user;

    // Hide mobile bottom nav on flow screens or until onboarding is complete
    if (this.isFlowView(currentView) || !user || !window.appState.hasCompletedOnboarding) {
      mobileNav.hidden = true;
      mobileNav.style.display = 'none';
      return;
    }

    mobileNav.hidden = false;
    mobileNav.style.display = 'flex';

    // 6-item mobile bar covering Academic + Career sections cleanly
    const items = [
      { id: 'dashboard', label: 'Overview', icon: '🏛️' },
      { id: 'notes', label: 'Notes', icon: '📚' },
      { id: 'dept-roles', label: 'Roles', icon: '💼' },
      { id: 'projects', label: 'Projects', icon: '💡' },
      { id: 'certifications', label: 'Skills', icon: '🏆' },
      { id: 'roadmaps', label: 'Roadmaps', icon: '🗺️' }
    ];

    mobileNav.innerHTML = items.map(item => `
      <button class="mobile-nav-item ${currentView === item.id ? 'active' : ''}" data-view="${item.id}" title="${item.label}">
        <span style="font-size: 1.15rem;">${item.icon}</span>
        <span style="font-size: 0.7rem; font-weight: 600;">${item.label}</span>
      </button>
    `).join('');

    mobileNav.querySelectorAll('.mobile-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        window.appState.setView(view);
      });
    });
  }
};
