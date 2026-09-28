/**
 * Authentication and Session Management Service
 * Handles user login, sign up, role permissions, and auth modals.
 * 
 * STRICT FLOW:
 * 1. Student must CREATE ACCOUNT first (data stored in MongoDB)
 * 2. Then SIGN IN with those credentials (verified against MongoDB)
 * 3. Only after successful sign in → dashboard/home page
 */

window.Auth = {
  init() {
    // The AppRouter and AppState now enforce strict routing to 'login' 
    // if the user is unauthenticated. No need to manually render here.
  },

  renderLoginPage() {
    const container = document.getElementById('view-container');
    if (!container) return;

    // Show sidebar & chrome
    const sidebar = document.getElementById('app-sidebar');
    const mobileNav = document.getElementById('mobile-bottom-nav');
    if (sidebar) { sidebar.hidden = false; sidebar.style.display = ''; }
    if (mobileNav) { mobileNav.hidden = false; mobileNav.style.display = ''; }

    container.innerHTML = `
      <div style="max-width: 520px; margin: 30px auto; padding: 32px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); box-shadow: var(--shadow-xl);">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="font-size: 2.8rem; margin-bottom: 8px;">🏛️</div>
          <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin: 0 0 6px 0;">DRMS Portal Access</h2>
          <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5; margin: 0;">
            Choose your role to continue to the academic and career resource hub.
          </p>
        </div>

        <!-- 1. STUDENT DIRECT ACCESS (NO PASSWORD) -->
        <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(99, 102, 241, 0.08)); border: 2px solid var(--color-primary-300, #93c5fd); border-radius: var(--radius-lg); padding: 22px; text-align: center; margin-bottom: 24px;">
          <div style="font-size: 2.2rem; margin-bottom: 6px;">👨‍🎓</div>
          <h3 style="margin: 0 0 4px; font-weight: 800; font-size: 1.2rem; color: var(--text-primary);">Student Portal</h3>
          <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.4; margin: 0 0 16px;">
            Instant access to all verified notes, syllabus copies, question papers & career roadmaps. No registration or password required.
          </p>
          <button type="button" class="btn btn-primary" id="page-student-instant-enter" style="width: 100%; padding: 12px; font-weight: 700; font-size: 1rem; border-radius: var(--radius-md); box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);">
            🚀 Enter as Student (Instant Access)
          </button>
        </div>

        <!-- Divider -->
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
          <span style="flex: 1; height: 1px; background: var(--border-subtle);"></span>
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">OR ADMIN LOGIN</span>
          <span style="flex: 1; height: 1px; background: var(--border-subtle);"></span>
        </div>

        <!-- 2. ADMIN LOGIN WITH EMAIL & PASSWORD -->
        <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 20px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px;">
            <span style="font-size: 1.25rem;">🛡️</span>
            <div>
              <h4 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">Administrator Access</h4>
              <p style="margin: 0; font-size: 0.75rem; color: var(--text-muted);">For Department Faculty & System Admins</p>
            </div>
          </div>

          <form id="admin-page-login-form">
            <div class="form-group" style="margin-bottom: 14px;">
              <label class="form-label" for="alp-email" style="display: block; font-size: 0.825rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Admin Email</label>
              <input type="email" id="alp-email" class="form-input" placeholder="admin@example.com" required autocomplete="email" style="width: 100%; padding: 9px 12px; border-radius: var(--radius-md);">
            </div>

            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" for="alp-password" style="display: block; font-size: 0.825rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Password</label>
              <div style="position: relative;">
                <input type="password" id="alp-password" class="form-input" placeholder="••••••••" required autocomplete="current-password" style="width: 100%; padding: 9px 12px; padding-right: 40px; border-radius: var(--radius-md);">
                <button type="button" id="alp-show-pw" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 0.9rem;">👁️</button>
              </div>
            </div>

            <div id="alp-error-msg" style="display: none; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 14px; margin-bottom: 14px; color: #dc2626; font-size: 0.8125rem;"></div>

            <button type="submit" class="btn btn-secondary" id="alp-submit-btn" style="width: 100%; padding: 11px; font-weight: 700; font-size: 0.9rem; border-radius: var(--radius-md);">
              🔐 Sign In as Administrator
            </button>
          </form>
        </div>

      </div>
    `;

    // 1-Click Student Login
    document.getElementById('page-student-instant-enter')?.addEventListener('click', () => {
      window.appState.setUser({
        id: 'student-' + Date.now(),
        name: 'Student',
        email: 'student@eduportal.com',
        role: 'student',
        token: 'student-open-access'
      });
      if (window.Toast) window.Toast.success('Welcome! Student access active. 🎓');
      window.appState.setView('dashboard');
    });

    document.getElementById('alp-show-pw')?.addEventListener('click', () => {
      const pw = document.getElementById('alp-password');
      if (pw) pw.type = pw.type === 'password' ? 'text' : 'password';
    });

    document.getElementById('admin-page-login-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('alp-submit-btn');
      const errorDiv = document.getElementById('alp-error-msg');
      btn.disabled = true; btn.textContent = 'Verifying credentials...';
      errorDiv.style.display = 'none';

      const email = document.getElementById('alp-email').value.trim();
      const password = document.getElementById('alp-password').value;

      await this._loginAndNavigate(email, password, errorDiv, btn);
    });
  },

  async _loginAndNavigate(email, password, errorDiv, btn) {
    try {
      const response = await fetch(`${window.apiService?.baseUrl || '/api'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const res = await response.json();

      if (response.ok && res.success && res.data) {
        window.appState.setUser(res.data);
        if (window.Toast) window.Toast.success(`Welcome back, ${res.data.name}! 🎉`);
        window.appState.setView(res.data.role === 'admin' ? 'admin' : 'dashboard');
        return;
      }

      const errMsg = res.message || 'Invalid administrator credentials.';
      if (errorDiv) {
        errorDiv.textContent = '❌ ' + errMsg;
        errorDiv.style.display = 'block';
      }
      if (window.Toast) window.Toast.error(errMsg);
    } catch (err) {
      console.error('Login API error:', err);
      if (errorDiv) {
        errorDiv.textContent = '❌ Unable to connect to server. Please try again.';
        errorDiv.style.display = 'block';
      }
      if (window.Toast) window.Toast.error('Server connection failed. Please try again.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = '🔐 Sign In as Administrator';
      }
    }
  },

  showAuthModal() {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="modal-overlay" id="auth-modal-overlay" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;">
        <div class="modal-dialog" role="dialog" aria-modal="true" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); box-shadow: var(--shadow-2xl); width: 100%; max-width: 460px; overflow: hidden; animation: modalPop 0.2s ease-out;">
          
          <div class="modal-header" style="padding: 20px 24px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: flex-start; background: linear-gradient(to right, var(--bg-subtle), var(--bg-surface));">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span class="badge badge-primary">Portal Access</span>
              </div>
              <h3 id="auth-modal-title" style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0;">Sign In / Enter Portal</h3>
            </div>
            <button class="btn btn-ghost btn-sm" id="close-auth-modal" style="font-size: 1.1rem; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">✕</button>
          </div>

          <div class="modal-body" style="padding: 24px;">
            
            <!-- 1. STUDENT ONE-CLICK ENTRY -->
            <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(99, 102, 241, 0.08)); border: 1.5px solid var(--color-primary-300, #93c5fd); border-radius: var(--radius-lg); padding: 18px; text-align: center; margin-bottom: 20px;">
              <div style="font-size: 1.8rem; margin-bottom: 4px;">👨‍🎓</div>
              <h4 style="margin: 0 0 4px; font-weight: 800; color: var(--text-primary); font-size: 1.05rem;">Student Access</h4>
              <p style="font-size: 0.8125rem; color: var(--text-muted); margin: 0 0 12px;">Browse all notes, question papers, and roadmaps without any ID or password!</p>
              <button type="button" class="btn btn-primary" id="modal-student-instant-btn" style="width: 100%; padding: 10px; font-weight: 700; font-size: 0.95rem; border-radius: var(--radius-md);">
                🚀 Enter as Student (Instant Access)
              </button>
            </div>

            <!-- Divider -->
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
              <span style="flex: 1; height: 1px; background: var(--border-subtle);"></span>
              <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">ADMINISTRATOR ONLY</span>
              <span style="flex: 1; height: 1px; background: var(--border-subtle);"></span>
            </div>

            <!-- 2. ADMIN FORM (EMAIL + PASSWORD) -->
            <form id="modal-login-form">
              <div class="form-group" style="margin-bottom: 14px;">
                <label class="form-label" for="auth-email" style="display: block; font-size: 0.825rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Admin Email</label>
                <input type="email" id="auth-email" class="form-input" placeholder="admin@example.com" required autocomplete="email" style="width: 100%; padding: 9px 12px; border-radius: var(--radius-md);">
              </div>

              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" for="auth-password" style="display: block; font-size: 0.825rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Password</label>
                <div style="position: relative;">
                  <input type="password" id="auth-password" class="form-input" placeholder="••••••••" required autocomplete="current-password" style="width: 100%; padding: 9px 12px; padding-right: 40px; border-radius: var(--radius-md);">
                  <button type="button" id="toggle-pw-vis" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 0.9rem;">👁️</button>
                </div>
              </div>

              <div id="modal-login-error" style="display: none; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 14px; margin-bottom: 14px; color: #dc2626; font-size: 0.8125rem;"></div>

              <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button type="button" class="btn btn-secondary" id="modal-cancel-btn">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary" id="modal-login-btn" style="padding: 10px 22px; font-weight: 700;">
                  🔐 Sign In as Admin
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    `;

    modalContainer.setAttribute('aria-hidden', 'false');

    const overlay = document.getElementById('auth-modal-overlay');
    const closeBtn = document.getElementById('close-auth-modal');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const loginForm = document.getElementById('modal-login-form');

    const closeModal = () => {
      modalContainer.innerHTML = '';
      modalContainer.setAttribute('aria-hidden', 'true');
    };

    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // 1-Click Student Instant Access from Modal
    document.getElementById('modal-student-instant-btn')?.addEventListener('click', () => {
      window.appState.setUser({
        id: 'student-' + Date.now(),
        name: 'Student',
        email: 'student@eduportal.com',
        role: 'student',
        token: 'student-open-access'
      });
      if (window.Toast) window.Toast.success('Welcome! Student access active. 🎓');
      closeModal();
      window.appState.setView('dashboard');
    });

    document.getElementById('toggle-pw-vis')?.addEventListener('click', () => {
      const pw = document.getElementById('auth-password');
      if (pw) pw.type = pw.type === 'password' ? 'text' : 'password';
    });

    loginForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('modal-login-btn');
      const errorDiv = document.getElementById('modal-login-error');
      btn.disabled = true; btn.textContent = 'Signing in...';
      errorDiv.style.display = 'none';

      const email = document.getElementById('auth-email').value.trim();
      const password = document.getElementById('auth-password').value;

      try {
        const response = await fetch(`${window.apiService?.baseUrl || '/api'}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const res = await response.json();

        if (response.ok && res.success && res.data) {
          window.appState.setUser(res.data);
          if (window.Toast) window.Toast.success(`Welcome back, ${res.data.name}! 🎉`);
          closeModal();
          window.appState.setView(res.data.role === 'admin' ? 'admin' : 'dashboard');
        } else {
          const errMsg = res.message || 'Invalid administrator email or password.';
          errorDiv.textContent = '❌ ' + errMsg;
          errorDiv.style.display = 'block';
          if (window.Toast) window.Toast.error(errMsg);
        }
      } catch (err) {
        errorDiv.textContent = '❌ Unable to connect to server. Please try again.';
        errorDiv.style.display = 'block';
        if (window.Toast) window.Toast.error('Server connection failed.');
      } finally {
        btn.disabled = false; btn.textContent = '🔐 Sign In as Admin';
      }
    });
  },

  logout() {
    window.appState.setUser(null);
    if (window.Toast) {
      window.Toast.info('Signed out. Student guest access enabled.');
    }
    window.appState.setView('dashboard');
  }
};
