/**
 * Global Header Component
 * Contains Logo, App Title, Regulation & Department Context Breadcrumbs,
 * Global Live Search, Theme Switcher, Notifications, and Profile/Logout Menu.
 */

window.HeaderComponent = {
  render() {
    const container = document.getElementById('app-header');
    if (!container) return;

    const state = window.appState.state;
    const currentReg = state.regulation || 'R2021';
    const currentDeptCode = state.department || 'IT';
    
    // Look up department object
    const deptList = window.AppFallbackData ? window.AppFallbackData.departments : [];
    const currentDept = deptList.find(d => d.code === currentDeptCode) || {
      name: "Information Technology",
      code: "IT",
      icon: "🌐"
    };

    const user = state.user;
    const currentView = window.appState.currentView;
    const isCompleted = window.appState.hasCompletedOnboarding;
    const isLogin = currentView === 'login' || !window.appState.isAuth;
    const roleBadgeClass = user?.role === 'admin' ? 'badge-danger' : user?.role === 'faculty' ? 'badge-warning' : 'badge-primary';

    container.innerHTML = `
      <!-- Left: Logo & Context Breadcrumbs -->
      <div class="header-left">
        <div class="brand-logo-container" id="header-brand-logo" style="${isCompleted ? 'cursor: pointer;' : 'cursor: default;'}" title="${isCompleted ? 'Back to Dashboard' : 'DRMS Portal'}">
          <div class="brand-logo-icon">🏛️</div>
          <div>
            <div class="brand-title">DRMS</div>
            <div class="brand-subtitle">EduResource Platform</div>
          </div>
        </div>

        ${isCompleted ? `
          <!-- Selected Regulation & Department Breadcrumbs (Unlocked) -->
          <div class="context-breadcrumbs" aria-label="Academic Context">
            <span class="context-pill" id="breadcrumb-regulation" title="Click to change regulation">
              📜 ${currentReg} ▾
            </span>
            <span class="breadcrumb-separator">/</span>
            <span class="context-pill" id="breadcrumb-department" title="Click to change department">
              ${currentDept.icon} ${currentDept.name} (${currentDept.code}) ▾
            </span>
          </div>
        ` : ''}
      </div>

      <!-- Center: Global Debounced Search (Only when portal is unlocked) -->
      ${isCompleted ? `
        <div class="header-search">
          <div class="search-input-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              id="global-search-input" 
              class="form-input" 
              placeholder="Search notes, past question papers, job roles, skills, projects..." 
              aria-label="Search resources globally"
              autocomplete="off"
            >
            <button id="search-clear-btn" class="search-clear-btn" style="display: none;" aria-label="Clear search">✕</button>
          </div>
          <div id="search-results-dropdown" class="search-dropdown-results" style="display: none;"></div>
        </div>
      ` : '<div style="flex: 1;"></div>'}

      <!-- Right: Actions, Theme, Notifications & User Profile -->
      <div class="header-actions">
        ${isCompleted ? `
          <!-- Project Presentation Modal Trigger -->
          <button class="btn btn-outline btn-sm" id="header-presentation-btn" title="View Capstone Project Presentation Deck" style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; font-weight: 600; font-size: 0.8rem; border-color: rgba(99, 102, 241, 0.4); background: rgba(99, 102, 241, 0.08); color: var(--color-primary-400); cursor: pointer;">
            📽️ <span>Presentation</span>
          </button>
        ` : ''}

        <!-- Theme Switcher -->
        <button class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Toggle dark/light theme" title="Toggle dark/light theme">
          ${state.theme === 'dark' ? '☀️' : '🌙'}
        </button>

        ${isCompleted ? `
          <!-- Notifications Dropdown Trigger -->
          <div style="position: relative;">
            <button class="notification-btn" id="notification-toggle-btn" aria-label="Notifications" title="Notifications">
              🔔
              <span style="position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; background: var(--color-accent-rose); border-radius: 50%;"></span>
            </button>
            <div id="notifications-menu" class="search-dropdown-results" style="display: none; width: 320px; right: 0; left: auto; top: 50px;">
              <div style="padding: 12px 16px; border-bottom: 1px solid var(--border-color); font-weight: 700; font-size: 0.875rem;">
                Recent Announcements & Uploads
              </div>
              <div id="notifications-list" style="max-height: 260px; overflow-y: auto;">
                ${(window.AppFallbackData?.demoNotifications || []).map(n => `
                  <div style="padding: 10px 16px; border-bottom: 1px solid var(--border-subtle); font-size: 0.8125rem;">
                    <div style="font-weight: 600; color: var(--text-primary);">${n.title}</div>
                    <div style="color: var(--text-secondary); margin: 2px 0;">${n.message}</div>
                    <div style="font-size: 0.7rem; color: var(--text-muted);">${n.time}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- User Profile & Auth -->
          <div class="user-profile-menu">
            <button class="profile-button" id="profile-dropdown-btn" aria-expanded="false">
              <div class="profile-avatar">${user?.name ? user.name.charAt(0).toUpperCase() : 'U'}</div>
              <div style="display: flex; flex-direction: column; text-align: left; line-height: 1.2;">
                <span style="font-size: 0.875rem; font-weight: 600;">${user?.name ? user.name.split(' ')[0] : 'User'}</span>
                <span class="badge ${roleBadgeClass}" style="font-size: 0.65rem; padding: 1px 4px;">${user?.role || 'student'}</span>
              </div>
              <span style="font-size: 0.7rem; color: var(--text-muted);">▾</span>
            </button>
            <div id="profile-menu-dropdown" class="search-dropdown-results" style="display: none; width: 220px; right: 0; left: auto; top: 50px;">
              <div style="padding: 12px 16px; border-bottom: 1px solid var(--border-subtle);">
                <div style="font-weight: 700; font-size: 0.875rem;">${user?.name || 'User'}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${user?.email || ''}</div>
              </div>
              ${user?.role === 'admin' ? `
                <button class="search-result-item" id="menu-admin-btn" style="text-align: left; width: 100%;">
                  🛡️ <strong>Admin Control Center</strong>
                </button>
              ` : ''}
              <button class="search-result-item" id="menu-bookmarks-btn" style="text-align: left; width: 100%;">
                ⭐ <strong>My Saved Bookmarks</strong>
              </button>
              <button class="search-result-item" id="menu-skillmap-btn" style="text-align: left; width: 100%;">
                🧭 <strong>Department Skill Map</strong>
              </button>
              <button class="search-result-item" id="menu-logout-btn" style="text-align: left; width: 100%; color: var(--color-accent-rose); border-top: 1px solid var(--border-subtle);">
                🚪 <strong>Sign Out / Switch Role</strong>
              </button>
            </div>
          </div>
        ` : (isLogin ? '' : `
          <!-- Onboarding step: Back/Switch Role button -->
          <button class="btn btn-ghost btn-sm" id="header-switch-role-btn" style="color: var(--text-muted); font-size: 0.8rem;">
            ← Switch Role
          </button>
        `)}
      </div>
    `;

    this.bindEvents();
  },


  bindEvents() {
    // Brand click -> dashboard (only when onboarding is complete)
    document.getElementById('header-brand-logo')?.addEventListener('click', () => {
      if (window.appState.hasCompletedOnboarding) {
        window.appState.setView('dashboard');
      }
    });

    // Regulation selector breadcrumb
    document.getElementById('breadcrumb-regulation')?.addEventListener('click', () => {
      window.appState.setView('regulation-select');
    });

    // Department selector breadcrumb
    document.getElementById('breadcrumb-department')?.addEventListener('click', () => {
      window.appState.setView('department-select');
    });

    // Theme toggle
    document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
      window.appState.toggleTheme();
    });

    // Notifications toggle
    const notifBtn = document.getElementById('notification-toggle-btn');
    const notifMenu = document.getElementById('notifications-menu');
    if (notifBtn && notifMenu) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = notifMenu.style.display === 'flex' || notifMenu.style.display === 'block';
        notifMenu.style.display = isOpen ? 'none' : 'block';
      });
    }

    // Profile menu toggle
    const profileBtn = document.getElementById('profile-dropdown-btn');
    const profileMenu = document.getElementById('profile-menu-dropdown');
    if (profileBtn && profileMenu) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = profileMenu.style.display === 'flex' || profileMenu.style.display === 'block';
        profileMenu.style.display = isOpen ? 'none' : 'block';
      });
    }

    // Close popups on outer click
    document.addEventListener('click', () => {
      if (notifMenu) notifMenu.style.display = 'none';
      if (profileMenu) profileMenu.style.display = 'none';
    });

    // Profile menu action links
    document.getElementById('menu-admin-btn')?.addEventListener('click', () => {
      window.appState.setView('admin');
    });
    document.getElementById('menu-bookmarks-btn')?.addEventListener('click', () => {
      window.appState.setView('bookmarks');
    });
    document.getElementById('menu-skillmap-btn')?.addEventListener('click', () => {
      window.appState.setView('skill-map');
    });
    document.getElementById('menu-logout-btn')?.addEventListener('click', () => {
      window.Auth.logout();
    });
    document.getElementById('header-presentation-btn')?.addEventListener('click', () => {
      if (window.PresentationModal) {
        window.PresentationModal.show();
      } else {
        window.open('/presentation.html', '_blank');
      }
    });

    document.getElementById('header-login-btn')?.addEventListener('click', () => {
      window.Auth.showAuthModal('login');
    });

    document.getElementById('header-switch-role-btn')?.addEventListener('click', () => {
      window.Auth.logout();
    });

    // Global Search setup
    this.setupGlobalSearch();
  },

  setupGlobalSearch() {
    const input = document.getElementById('global-search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    const dropdown = document.getElementById('search-results-dropdown');
    if (!input || !dropdown) return;

    let debounceTimer;

    input.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      clearBtn.style.display = q ? 'block' : 'none';

      clearTimeout(debounceTimer);
      if (!q) {
        dropdown.style.display = 'none';
        dropdown.innerHTML = '';
        return;
      }

      debounceTimer = setTimeout(() => {
        this.executeSearch(q, dropdown);
      }, 250);
    });

    clearBtn?.addEventListener('click', () => {
      input.value = '';
      clearBtn.style.display = 'none';
      dropdown.style.display = 'none';
      dropdown.innerHTML = '';
    });
  },

  executeSearch(query, dropdown) {
    const q = query.toLowerCase();
    const data = window.AppFallbackData;
    if (!data) return;

    const results = [];

    // Search Notes
    (data.notes || []).forEach(n => {
      if (n.title.toLowerCase().includes(q) || n.subjectName.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)) {
        results.push({
          type: 'Lecture Notes',
          icon: '📚',
          title: n.title,
          subtitle: `${n.subjectName} (${n.subjectCode}) • Sem ${n.semester} • Unit ${n.unit}`,
          action: () => window.appState.setView('notes', { semester: n.semester, subjectCode: n.subjectCode })
        });
      }
    });

    // Search Question Papers
    (data.questionPapers || []).forEach(qp => {
      if (qp.subjectName.toLowerCase().includes(q) || qp.subjectCode.toLowerCase().includes(q) || qp.academicYear.toLowerCase().includes(q)) {
        results.push({
          type: 'Question Paper',
          icon: '📝',
          title: `${qp.subjectName} (${qp.subjectCode}) - ${qp.academicYear}`,
          subtitle: `Semester ${qp.semester} • ${qp.examType}`,
          action: () => window.appState.setView('question-papers', { semester: qp.semester })
        });
      }
    });

    // Search Job Roles
    (data.jobRoles || []).forEach(role => {
      if (role.title.toLowerCase().includes(q) || role.domain.toLowerCase().includes(q) || role.coreSkills.some(s => s.toLowerCase().includes(q))) {
        results.push({
          type: 'Job Role & Career',
          icon: '💼',
          title: role.title,
          subtitle: `${role.domain} • ${role.avgSalaryRange}`,
          action: () => window.appState.setView('job-roles')
        });
      }
    });

    // Search Projects
    (data.projects || []).forEach(proj => {
      if (proj.title.toLowerCase().includes(q) || proj.domain.toLowerCase().includes(q) || proj.suggestedTech.some(t => t.toLowerCase().includes(q))) {
        results.push({
          type: 'Project Corner',
          icon: '💡',
          title: proj.title,
          subtitle: `${proj.domain} • ${proj.difficulty} • ${proj.projectType}`,
          action: () => window.appState.setView('projects')
        });
      }
    });

    // Search Certifications
    (data.certifications || []).forEach(cert => {
      if (cert.title.toLowerCase().includes(q) || cert.provider.toLowerCase().includes(q) || cert.category.toLowerCase().includes(q)) {
        results.push({
          type: 'Certification',
          icon: '🏆',
          title: cert.title,
          subtitle: `${cert.provider} • ${cert.level} Level`,
          action: () => window.appState.setView('certifications')
        });
      }
    });

    if (results.length === 0) {
      dropdown.innerHTML = `
        <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.875rem;">
          🔍 No matching resources found for "<strong>${query}</strong>"
        </div>
      `;
    } else {
      dropdown.innerHTML = `
        <div style="padding: 8px 16px; background: var(--bg-subtle); font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
          Found ${results.length} results
        </div>
        ${results.slice(0, 8).map((r, idx) => `
          <div class="search-result-item" data-idx="${idx}">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-weight: 600; font-size: 0.875rem; color: var(--text-primary);">
                ${r.icon} ${r.title}
              </span>
              <span class="badge badge-primary" style="font-size: 0.65rem;">${r.type}</span>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-left: 24px;">${r.subtitle}</div>
          </div>
        `).join('')}
      `;

      dropdown.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const idx = parseInt(item.getAttribute('data-idx'));
          results[idx].action();
          dropdown.style.display = 'none';
          document.getElementById('global-search-input').value = '';
          document.getElementById('search-clear-btn').style.display = 'none';
        });
      });
    }

    dropdown.style.display = 'block';
  }
};
