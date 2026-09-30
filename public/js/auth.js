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

    // Strictly ensure sidebar & mobile nav are hidden on login
    const sidebar = document.getElementById('app-sidebar');
    const mobileNav = document.getElementById('mobile-bottom-nav');
    if (sidebar) { sidebar.hidden = true; sidebar.style.display = 'none'; }
    if (mobileNav) { mobileNav.hidden = true; mobileNav.style.display = 'none'; }

    container.innerHTML = `
      <div style="max-width: 860px; margin: 40px auto; padding: 0 16px; width: 100%;">
        
        <!-- Welcome Hero Header -->
        <div style="text-align: center; margin-bottom: 36px;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 68px; height: 68px; border-radius: var(--radius-2xl, 20px); background: linear-gradient(135deg, var(--color-primary-500, #3b82f6), var(--color-accent-purple, #8b5cf6)); color: #ffffff; font-size: 2.2rem; margin-bottom: 16px; box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);">
            🔐
          </div>
          <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin: 0 0 10px 0; letter-spacing: -0.02em;">
            Portal Login & Access Permission
          </h1>
          <p style="font-size: 1.05rem; font-weight: 600; color: var(--color-primary-600); margin: 0 0 6px 0;">
            Are you a Student or an Administrator?
          </p>
          <p style="font-size: 0.9rem; color: var(--text-muted); max-width: 580px; margin: 0 auto; line-height: 1.5;">
            Direct access to the dashboard is protected. Please select your role below to configure your syllabus regulation and department.
          </p>
        </div>

        <!-- Role Selection Dual Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; align-items: stretch;">
          
          <!-- 1. STUDENT ACCESS CARD -->
          <div style="background: var(--bg-surface); border: 2px solid var(--color-primary-400, #60a5fa); border-radius: var(--radius-xl); padding: 32px 28px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow-lg); position: relative; overflow: hidden;">
            <div style="position: absolute; top: 16px; right: 16px;">
              <span class="badge badge-primary" style="font-size: 0.72rem; padding: 4px 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
                Instant Access
              </span>
            </div>

            <div>
              <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(59, 130, 246, 0.1); color: var(--color-primary-600); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin-bottom: 18px;">
                👨‍🎓
              </div>
              <h2 style="margin: 0 0 8px; font-weight: 800; font-size: 1.4rem; color: var(--text-primary);">
                Student Portal
              </h2>
              <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0 0 20px;">
                Complete access to Anna University curriculum, verified lecture notes, previous year question papers, final year projects, and career roadmaps.
              </p>

              <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 26px;">
                <div style="display: flex; align-items: center; gap: 8px; font-size: 0.84rem; color: var(--text-primary);">
                  <span style="color: #10b981;">✓</span> <span>Anna University R2021 & R2025 Syllabi</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; font-size: 0.84rem; color: var(--text-primary);">
                  <span style="color: #10b981;">✓</span> <span>68+ Engineering Departments</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; font-size: 0.84rem; color: var(--text-primary);">
                  <span style="color: #10b981;">✓</span> <span>No registration or password needed</span>
                </div>
              </div>
            </div>

            <div>
              <button type="button" class="btn btn-primary" id="page-student-instant-enter" style="width: 100%; padding: 14px; font-weight: 700; font-size: 1rem; border-radius: var(--radius-md); box-shadow: 0 6px 18px rgba(37, 99, 235, 0.35); cursor: pointer;">
                🚀 Continue as Student ➔
              </button>
              <div style="text-align: center; margin-top: 10px; font-size: 0.75rem; color: var(--text-muted);">
                Select Regulation & Department in next step
              </div>
            </div>
          </div>

          <!-- 2. ADMIN ACCESS CARD -->
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 32px 28px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow-md);">
            <div>
              <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(239, 68, 68, 0.1); color: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin-bottom: 18px;">
                🛡️
              </div>
              <h2 style="margin: 0 0 8px; font-weight: 800; font-size: 1.4rem; color: var(--text-primary);">
                Administrator Sign In
              </h2>
              <p style="margin: 0 0 18px; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
                Authorized portal for department faculty, coordinators, and system administrators to manage academic materials and system settings.
              </p>

              <form id="admin-page-login-form">
                <div class="form-group" style="margin-bottom: 14px;">
                  <label class="form-label" for="alp-email" style="display: block; font-size: 0.825rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Admin Email</label>
                  <input type="email" id="alp-email" class="form-input" placeholder="admin@example.com" required autocomplete="email" style="width: 100%; padding: 10px 12px; border-radius: var(--radius-md);">
                </div>

                <div class="form-group" style="margin-bottom: 16px;">
                  <label class="form-label" for="alp-password" style="display: block; font-size: 0.825rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Password</label>
                  <div style="position: relative;">
                    <input type="password" id="alp-password" class="form-input" placeholder="••••••••" required autocomplete="current-password" style="width: 100%; padding: 10px 12px; padding-right: 40px; border-radius: var(--radius-md);">
                    <button type="button" id="alp-show-pw" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 1rem;">👁️</button>
                  </div>
                </div>

                <div id="alp-error-msg" style="display: none; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 14px; margin-bottom: 14px; color: #dc2626; font-size: 0.8125rem;"></div>

                <button type="submit" class="btn btn-secondary" id="alp-submit-btn" style="width: 100%; padding: 12px; font-weight: 700; font-size: 0.95rem; border-radius: var(--radius-md); cursor: pointer;">
                  🔐 Sign In as Administrator
                </button>
              </form>
            </div>

            <div style="margin-top: 18px; text-align: center; font-size: 0.75rem; color: var(--text-muted);">
              Protected area for university faculty & staff
            </div>
          </div>

        </div>

      </div>
    `;

    // Student Button Click -> starts student flow: sets student user and navigates to regulation-select
    document.getElementById('page-student-instant-enter')?.addEventListener('click', () => {
      if (window.Toast) {
        window.Toast.info('Welcome! Please select your Academic Regulation. 📜');
      }
      window.appState.startStudentFlow();
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

    // 1-Click Student Instant Access from Modal -> routes to regulation selection
    document.getElementById('modal-student-instant-btn')?.addEventListener('click', () => {
      closeModal();
      if (window.Toast) {
        window.Toast.info('Welcome! Please choose your Academic Regulation. 📜');
      }
      window.appState.startStudentFlow();
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
    window.appState.logout();
    if (window.Toast) {
      window.Toast.info('Signed out. Please select your role to continue.');
    }
  }
};
