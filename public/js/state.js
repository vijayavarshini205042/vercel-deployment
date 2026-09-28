/**
 * Central Reactive Application State Manager
 * Emits change events and persists session state across page reloads.
 */

class AppState {
  constructor() {
    // Load persisted state from localStorage
    const savedTheme = localStorage.getItem('app_theme') || 'light';
    let savedUser = null;
    try {
      savedUser = localStorage.getItem('app_user') ? JSON.parse(localStorage.getItem('app_user')) : null;
    } catch {
      savedUser = null;
    }

    let savedReg = localStorage.getItem('app_regulation') || 'R2021';
    if (savedReg === 'R2017') savedReg = 'R2021';
    const savedDept = localStorage.getItem('app_department') || 'IT';
    const savedBookmarks = localStorage.getItem('app_bookmarks') ? JSON.parse(localStorage.getItem('app_bookmarks')) : [];

    // Default to Student so students can directly browse the entire site without login
    if (!savedUser) {
      savedUser = {
        id: 'student-open',
        name: 'Student',
        email: 'student@eduportal.com',
        role: 'student',
        token: 'student-open-access',
        department: savedDept,
        regulation: savedReg
      };
    }

    this._state = {
      theme: savedTheme,
      user: savedUser, // { id, name, email, role, token }
      regulation: savedReg,
      department: savedDept,
      currentView: 'dashboard', // default view is dashboard
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
    return true; // Site is always open for student viewing
  }

  get role() {
    return this._state.user ? this._state.user.role : 'student';
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
  setUser(user) {
    if (user) {
      this._state.user = user;
      localStorage.setItem('app_user', JSON.stringify(user));
    } else {
      // Revert to Student Guest on logout
      this._state.user = {
        id: 'student-open',
        name: 'Student',
        email: 'student@eduportal.com',
        role: 'student',
        token: 'student-open-access',
        department: this._state.department || 'IT',
        regulation: this._state.regulation || 'R2021'
      };
      localStorage.removeItem('app_user');
    }
    this._notify(['user']);
  }

  setRegulation(regCode) {
    this._state.regulation = regCode;
    localStorage.setItem('app_regulation', regCode);
    this._notify(['regulation']);
  }

  setDepartment(deptCode) {
    this._state.department = deptCode;
    localStorage.setItem('app_department', deptCode);
    this._notify(['department']);
  }

  setView(viewName, params = {}) {
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
