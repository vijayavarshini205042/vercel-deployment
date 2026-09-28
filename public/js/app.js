/**
 * Main Application Orchestrator & Router
 * Coordinates view transitions, listens to reactive state mutations,
 * and boots the application.
 * Flow: Login → Dashboard → Regulation → Department → Year/Semester → Subject
 *       → Syllabus & Notes → Previous Year QP → Project Ideas → Dept Roles
 */

class AppRouter {
  constructor() {
    // Special fullscreen views that hide sidebar/nav
    this.fullscreenViews = new Set([
      'regulation-select', 'department-select', 'semester-select', 'subject-select'
    ]);

    this.routes = {
      'login': { render: () => window.Auth.renderLoginPage() },
      'dashboard': window.DashboardView,
      'regulation-select': window.RegulationSelectView,
      'department-select': window.DepartmentSelectView,
      'semester-select': window.SemesterSelectView,
      'subject-select': window.SubjectSelectView,
      'notes': window.NotesView,
      'question-papers': window.QuestionPapersView,
      'job-roles': window.JobRolesView,
      'roadmaps': window.RoadmapsView,
      'projects': window.ProjectsView,
      'certifications': window.CertificationsView,
      'skill-map': window.SkillMapView,
      'dept-roles': window.DeptRolesView,
      'role-detail': window.RoleDetailView,
      'bookmarks': window.BookmarksView,
      'admin': window.AdminView
    };
  }

  init() {
    // 1. Initialize user auth session (shows login page if not authenticated)
    window.Auth.init();

    // 2. Render static chrome
    window.HeaderComponent.render();
    window.NavigationComponent.render();

    // 3. Render current active view
    this.renderCurrentView();

    // 4. Subscribe to state changes
    window.appState.subscribe((state, changedKeys) => {
      // Re-render header if user, regulation, or department changed
      if (changedKeys.includes('user') || changedKeys.includes('regulation') || changedKeys.includes('department') || changedKeys.includes('theme')) {
        window.HeaderComponent.render();
      }

      // Re-render navigation if view or user changed
      if (changedKeys.includes('currentView') || changedKeys.includes('user')) {
        window.NavigationComponent.render();
      }
      
      // Only re-render the main view if the view itself changed
      if (changedKeys.includes('currentView')) {
        this.renderCurrentView();
      }
    });

    console.log('✅ Department Resource Management System SPA loaded successfully.');
  }

  async renderCurrentView() {
    let currentView = window.appState.currentView || 'dashboard';

    // ── OPEN ACCESS MODE ──
    // Login page redirect only happens if user explicitly navigates to 'login'
    // All other views are freely accessible (guest mode is active)
    if (currentView === 'login') {
      // If already logged in as admin, go to admin center
      if (window.appState.role === 'admin') {
        window.appState.setView('admin');
        return;
      }
    }

    // ── STRICT ROLE-BASED ROUTE PROTECTION ──
    // Admin routes protection: If student tries to access Admin route, deny access & redirect to Student Dashboard
    if (currentView === 'admin' && window.appState.role !== 'admin') {
      console.warn('Forbidden: Student attempted to access Admin route.');
      if (window.Toast) {
        window.Toast.error('Access Denied: Admin privileges required.');
      }
      window.appState.setView('dashboard');
      return;
    }

    const viewHandler = this.routes[currentView] || this.routes['login'];

    const container = document.getElementById('view-container');
    if (container) {
      container.style.opacity = '0.7';
      container.style.transition = 'opacity 200ms ease';
    }

    try {
      if (viewHandler && typeof viewHandler.render === 'function') {
        await viewHandler.render();
      }
    } catch (err) {
      console.error(`Error rendering view "${currentView}":`, err);
      if (container) {
        container.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">⚠️</div>
            <div class="empty-state-title">Unable to Load View</div>
            <div class="empty-state-desc">${err.message || 'An unexpected error occurred while preparing this resource.'}</div>
            <button class="btn btn-primary" onclick="window.appState.setView('dashboard')">Return to Dashboard</button>
          </div>
        `;
      }
    } finally {
      if (container) {
        container.style.opacity = '1';
      }
    }
  }
}

// Intercept browser back/forward navigation
window.addEventListener('popstate', () => {
  if (window.appRouter) {
    window.appRouter.renderCurrentView();
  }
});

// Bootstrap once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.appRouter = new AppRouter();
  window.appRouter.init();
});

