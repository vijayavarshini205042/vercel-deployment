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

    // Hide sidebar on guided flow selection screens
    if (this.isFlowView(currentView) || !user) {
      sidebar.hidden = true;
      sidebar.style.display = 'none';
      return;
    }

    sidebar.hidden = false;
    sidebar.style.display = 'flex';

    // ── Academic Resources ──
    const academicItems = [
      { id: 'dashboard', label: 'Department Overview', icon: '🏛️' },
      { id: 'semester-select', label: 'Year / Semester', icon: '📅' },
      { id: 'notes', label: 'Syllabus & Notes', icon: '📚' },
      { id: 'question-papers', label: 'Previous Year QP', icon: '📝' }
    ];

    // ── Career & Skills ──
    const careerItems = [
      { id: 'dept-roles', label: 'Dept. Roles & Skills', icon: '💼' },
      { id: 'projects', label: 'Project Ideas', icon: '💡' },
      { id: 'certifications', label: 'Certifications', icon: '🏆' },
      { id: 'roadmaps', label: 'Career Roadmaps', icon: '🗺️' }
    ];

    // ── Personal ──
    const personalItems = [
      { id: 'bookmarks', label: 'My Bookmarks', icon: '⭐' }
    ];

    if (user && user.role === 'admin') {
      personalItems.push({ id: 'admin', label: 'Admin Control Center', icon: '🛡️' });
    }

    const renderItem = (item) => `
      <li class="sidebar-nav-item ${currentView === item.id ? 'active' : ''}" data-view="${item.id}" title="${item.label}">
        <span>${item.icon}</span>
        <span>${item.label}</span>
      </li>
    `;

    sidebar.innerHTML = `
      <!-- Guided Flow Quick Steps -->
      <div style="padding: 10px 16px; margin-bottom: 4px;">
        <div style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.06em; margin-bottom: 8px;">
          Quick Navigation
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <button class="flow-step-btn ${currentView === 'regulation-select' ? 'active' : ''}" data-view="regulation-select">
            📜 Change Regulation
          </button>
          <button class="flow-step-btn ${currentView === 'department-select' ? 'active' : ''}" data-view="department-select">
            🏛️ Change Department
          </button>
          <button class="flow-step-btn ${['semester-select','subject-select'].includes(currentView) ? 'active' : ''}" data-view="semester-select">
            📅 Year / Semester → Subject
          </button>
        </div>
      </div>

      <div class="sidebar-divider"></div>

      <!-- Academic Resources -->
      <div>
        <div style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.06em; padding-left: 12px; margin-bottom: 8px;">
          Academic Resources
        </div>
        <ul class="sidebar-nav-list">
          ${academicItems.map(renderItem).join('')}
        </ul>
      </div>

      <!-- Career & Skills -->
      <div>
        <div style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.06em; padding-left: 12px; margin-bottom: 8px;">
          Career & Skills
        </div>
        <ul class="sidebar-nav-list">
          ${careerItems.map(renderItem).join('')}
        </ul>
      </div>

      <!-- Personal -->
      <div style="margin-top: auto;">
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

    if (this.isFlowView(currentView) || !user) {
      mobileNav.hidden = true;
      mobileNav.style.display = 'none';
      return;
    }

    mobileNav.hidden = false;
    mobileNav.style.display = 'flex';

    const items = [
      { id: 'dashboard', label: 'Home', icon: '🏛️' },
      { id: 'semester-select', label: 'Subjects', icon: '📅' },
      { id: 'projects', label: 'Projects', icon: '💡' },
      { id: 'dept-roles', label: 'Careers', icon: '💼' },
      { id: 'bookmarks', label: 'Saved', icon: '⭐' }
    ];

    mobileNav.innerHTML = items.map(item => `
      <button class="mobile-nav-item ${currentView === item.id || (item.id === 'semester-select' && currentView === 'subject-select') ? 'active' : ''}" data-view="${item.id}">
        <span style="font-size: 1.25rem;">${item.icon}</span>
        <span>${item.label}</span>
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
