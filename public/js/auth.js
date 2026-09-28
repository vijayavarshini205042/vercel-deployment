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
      <div style="max-width: 480px; margin: 40px auto; padding: 32px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); box-shadow: var(--shadow-xl);">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="font-size: 2.8rem; margin-bottom: 8px;">🛡️</div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin: 0 0 6px 0;">Admin Portal Login</h2>
          <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5; margin: 0;">
            Sign in with authorized administrator credentials. Students can browse all study resources freely without logging in.
          </p>
        </div>

        <div style="background: var(--color-primary-50, #eff6ff); border: 1px solid var(--color-primary-200, #bfdbfe); border-radius: var(--radius-md); padding: 12px 14px; margin-bottom: 20px; font-size: 0.8125rem; color: var(--color-primary-800, #1e40af); line-height: 1.5;">
          👨‍🎓 <strong>Are you a student?</strong> You don't need to log in! 
          <a href="javascript:void(0)" id="back-to-student-dash" style="font-weight: 700; color: var(--color-primary-600); text-decoration: underline; margin-left: 4px;">
            Click here to browse study resources →
          </a>
        </div>

        <form id="admin-page-login-form">
          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label" for="alp-email" style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Admin Email</label>
            <input type="email" id="alp-email" class="form-input" placeholder="admin@example.com" required autocomplete="email" style="width: 100%; padding: 10px 14px; border-radius: var(--radius-md);">
          </div>

          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label" for="alp-password" style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Password</label>
            <div style="position: relative;">
              <input type="password" id="alp-password" class="form-input" placeholder="••••••••" required autocomplete="current-password" style="width: 100%; padding: 10px 14px; padding-right: 44px; border-radius: var(--radius-md);">
              <button type="button" id="alp-show-pw" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 1rem;">👁️</button>
            </div>
          </div>

          <div id="alp-error-msg" style="display: none; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; color: #dc2626; font-size: 0.8125rem;"></div>

          <button type="submit" class="btn btn-primary" id="alp-submit-btn" style="width: 100%; padding: 12px; font-weight: 700; font-size: 1rem; border-radius: var(--radius-md);">
            🛡️ Sign In to Admin Control Center
          </button>
        </form>
      </div>
    `;

    document.getElementById('back-to-student-dash')?.addEventListener('click', () => {
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
        btn.textContent = '🛡️ Sign In to Admin Control Center';
      }
    }
  },

  showAuthModal() {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="modal-overlay" id="auth-modal-overlay" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;">
        <div class="modal-dialog" role="dialog" aria-modal="true" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); box-shadow: var(--shadow-2xl); width: 100%; max-width: 440px; overflow: hidden; animation: modalPop 0.2s ease-out;">
          <div class="modal-header" style="padding: 20px 24px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: flex-start; background: linear-gradient(to right, var(--bg-subtle), var(--bg-surface));">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span class="badge badge-primary">🛡️ Admin Portal</span>
              </div>
              <h3 id="auth-modal-title" style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0;">Admin Login</h3>
              <p style="font-size: 0.8125rem; color: var(--text-muted); margin: 4px 0 0 0;">
                Students can browse freely without login.
              </p>
            </div>
            <button class="btn btn-ghost btn-sm" id="close-auth-modal" style="font-size: 1.1rem; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">✕</button>
          </div>

          <div class="modal-body" style="padding: 24px;">
            <form id="modal-login-form">
              <div class="form-group" style="margin-bottom: 16px;">
                <label class="form-label" for="auth-email" style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Admin Email</label>
                <input type="email" id="auth-email" class="form-input" placeholder="admin@example.com" required autocomplete="email" style="width: 100%; padding: 10px 14px; border-radius: var(--radius-md);">
              </div>

              <div class="form-group" style="margin-bottom: 20px;">
                <label class="form-label" for="auth-password" style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Password</label>
                <div style="position: relative;">
                  <input type="password" id="auth-password" class="form-input" placeholder="••••••••" required autocomplete="current-password" style="width: 100%; padding: 10px 14px; padding-right: 44px; border-radius: var(--radius-md);">
                  <button type="button" id="toggle-pw-vis" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 1rem;">👁️</button>
                </div>
              </div>

              <div id="modal-login-error" style="display: none; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; color: #dc2626; font-size: 0.8125rem;"></div>

              <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button type="button" class="btn btn-secondary" id="modal-cancel-btn">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary" id="modal-login-btn" style="padding: 10px 22px; font-weight: 700;">
                  Sign In to Admin
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
        btn.disabled = false; btn.textContent = 'Sign In to Admin';
      }
    });
  },

  logout() {
    window.appState.setUser(null);
    if (window.Toast) {
      window.Toast.info('Admin signed out. You are now viewing as Student.');
    }
    window.appState.setView('dashboard');
  }
};
