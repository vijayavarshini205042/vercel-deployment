/**
 * Central Reactive Application State Manager
 * Emits change events and persists session state across page reloads.
 */

class AppState {
  constructor() {
    // Load persisted theme and saved bookmarks
    const savedTheme = localStorage.getItem('app_theme') || 'light';
    let savedReg = localStorage.getItem('app_regulation') || 'R2021';
    if (savedReg === 'R2017') savedReg = 'R2021';
    const savedDept = localStorage.getItem('app_department') || 'IT';
    const savedBookmarks = localStorage.getItem('app_bookmarks') ? JSON.parse(localStorage.getItem('app_bookmarks')) : [];

    // STRICT REQUIREMENT:
    // When the app starts/loads, it must NEVER auto-open into dashboard.
    // It MUST ALWAYS prompt for Login/Permission first!
    // Clear any previous persistent login state so startup always asks for login
    sessionStorage.removeItem('drms_session_active');
    sessionStorage.removeItem('app_user');
    sessionStorage.removeItem('drms_onboarding_complete');
    localStorage.removeItem('app_user');

    this._state = {
      theme: savedTheme,
      user: null, // Always null on initial startup - login required
      sessionActive: false,
      onboardingComplete: false,
      regulation: savedReg,
      department: savedDept,
      currentView: 'login', // ALWAYS start on login screen
      viewParams: {},
      bookmarks: savedBookmarks,
      searchQuery: '',
      activeFilters: {
        semester: null,
        subject: null,
        unit: null,
        category: 'All'
      },
      notifications: window.AppFallbackData ? window.AppFallbackData.demoNotifications : []
    };

    this._listeners = new Set();
    this.applyTheme(this._state.theme);
  }

  // Subscribe to state mutations
  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  _notify(changedKeys = []) {
    this._listeners.forEach(listener => {
      try {
        listener(this._state, changedKeys);
      } catch (err) {
        console.error('State listener error:', err);
      }
    });
  }

  // Getters
  get state() {
    return this._state;
  }

  get user() {
    return this._state.user;
  }

  get isAuth() {
    return !!(this._state.sessionActive && this._state.user);
  }

  get hasCompletedOnboarding() {
    if (!this._state.user) return false;
    if (this._state.user.role === 'admin') return true;
    return !!this._state.onboardingComplete;
  }

  get role() {
    return this._state.user ? this._state.user.role : null;
  }

  get regulation() {
    return this._state.regulation;
  }

  get department() {
    return this._state.department;
  }

  get currentView() {
    return this._state.currentView;
  }

  get bookmarks() {
    return this._state.bookmarks;
  }

  // Actions
  startStudentFlow() {
    const studentUser = {
      id: 'student-' + Date.now(),
      name: 'Student',
      email: 'student@eduportal.com',
      role: 'student',
      token: 'student-access',
      regulationChosen: false,
      departmentChosen: false
    };
    this._state.user = studentUser;
    this._state.sessionActive = true;
    this._state.onboardingComplete = false;

    sessionStorage.setItem('drms_session_active', 'true');
    sessionStorage.setItem('app_user', JSON.stringify(studentUser));
    sessionStorage.setItem('drms_onboarding_complete', 'false');

    this.setView('regulation-select');
    this._notify(['user', 'sessionActive', 'currentView']);
  }

  setUser(user) {
    if (user) {
      this._state.user = user;
      this._state.sessionActive = true;
      if (user.role === 'admin') {
        this._state.onboardingComplete = true;
        sessionStorage.setItem('drms_onboarding_complete', 'true');
      }
      sessionStorage.setItem('drms_session_active', 'true');
      sessionStorage.setItem('app_user', JSON.stringify(user));
    } else {
      this._state.user = null;
      this._state.sessionActive = false;
      this._state.onboardingComplete = false;
      sessionStorage.removeItem('drms_session_active');
      sessionStorage.removeItem('app_user');
      sessionStorage.removeItem('drms_onboarding_complete');
      localStorage.removeItem('app_user');
    }
    this._notify(['user', 'sessionActive', 'onboardingComplete']);
  }

  setRegulation(regCode, advanceFlow = false) {
    this._state.regulation = regCode;
    localStorage.setItem('app_regulation', regCode);

    if (this._state.user && this._state.user.role === 'student') {
      this._state.user.regulationChosen = true;
      sessionStorage.setItem('app_user', JSON.stringify(this._state.user));
    }

    this._notify(['regulation', 'user']);

    if (advanceFlow) {
      this.setView('department-select');
    }
  }

  setDepartment(deptCode, finishFlow = false) {
    this._state.department = deptCode;
    localStorage.setItem('app_department', deptCode);

    if (this._state.user && this._state.user.role === 'student') {
      this._state.user.departmentChosen = true;
      this._state.onboardingComplete = true;
      sessionStorage.setItem('app_user', JSON.stringify(this._state.user));
      sessionStorage.setItem('drms_onboarding_complete', 'true');
    }

    this._notify(['department', 'user', 'onboardingComplete']);

    if (finishFlow) {
      this.setView('dashboard');
    }
  }

  logout() {
    this.setUser(null);
    this.setView('login');
  }

  setView(viewName, params = {}) {
    this._state.currentView = viewName;
    this._state.currentView = viewName;
    this._state.viewParams = params;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this._notify(['currentView', 'viewParams']);
  }

  toggleTheme() {
    const newTheme = this._state.theme === 'light' ? 'dark' : 'light';
    this._state.theme = newTheme;
    localStorage.setItem('app_theme', newTheme);
    this.applyTheme(newTheme);
    this._notify(['theme']);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggleBookmark(resource) {
    const existsIndex = this._state.bookmarks.findIndex(b => b.id === resource.id);
    if (existsIndex >= 0) {
      this._state.bookmarks.splice(existsIndex, 1);
    } else {
      this._state.bookmarks.push({
        id: resource.id,
        title: resource.title || resource.name,
        type: resource.type || 'resource',
        category: resource.category || resource.deptCode,
        deptCode: resource.deptCode,
        regCode: resource.regCode,
        addedAt: new Date().toISOString()
      });
    }
    localStorage.setItem('app_bookmarks', JSON.stringify(this._state.bookmarks));
    this._notify(['bookmarks']);
    return existsIndex < 0; // returns true if added, false if removed
  }

  isBookmarked(resourceId) {
    return this._state.bookmarks.some(b => b.id === resourceId);
  }

  setFilters(filters) {
    this._state.activeFilters = { ...this._state.activeFilters, ...filters };
    this._notify(['activeFilters']);
  }
}

window.appState = new AppState();
