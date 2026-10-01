/**
 * Student Settings & Preferences View Component
 * Theme toggles, regulation switcher, department switcher, and audio/voice preferences.
 */

window.SettingsView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const currentTheme = state.theme || 'light';
    const currentReg = state.regulation || 'R2021';
    const currentDeptCode = state.department || 'IT';
    const deptList = window.AppFallbackData?.departments || [];

    container.innerHTML = `
      <div style="max-width: 860px; margin: 0 auto; padding-bottom: 40px;">
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">
            ⚙️ Preferences &amp; Settings
          </h1>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0;">
            Customize your portal experience, academic context, theme mode, and accessibility options.
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          <!-- 1. Theme Configuration -->
          <div class="card" style="padding: 22px 26px; border-radius: var(--radius-xl); border: 1.5px solid var(--border-color); background: var(--bg-surface);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
              <div>
                <strong style="font-size: 1rem; color: var(--text-primary); display: block; margin-bottom: 2px;">Interface Theme Mode</strong>
                <span style="font-size: 0.82rem; color: var(--text-muted);">Switch between daylight clean contrast and night-shift dark workspace.</span>
              </div>
              <div style="display: flex; gap: 10px;">
                <button class="btn ${currentTheme === 'light' ? 'btn-primary' : 'btn-secondary'} btn-sm" id="settings-theme-light">
                  ☀️ Light Theme
                </button>
                <button class="btn ${currentTheme === 'dark' ? 'btn-primary' : 'btn-secondary'} btn-sm" id="settings-theme-dark">
                  🌙 Dark Theme
                </button>
              </div>
            </div>
          </div>

          <!-- 2. Academic Regulation Switcher -->
          <div class="card" style="padding: 22px 26px; border-radius: var(--radius-xl); border: 1.5px solid var(--border-color); background: var(--bg-surface);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
              <div>
                <strong style="font-size: 1rem; color: var(--text-primary); display: block; margin-bottom: 2px;">Anna University Regulation</strong>
                <span style="font-size: 0.82rem; color: var(--text-muted);">Switch between Regulation 2021 (CBCS) and the upcoming modernized Regulation 2025.</span>
              </div>
              <div style="display: flex; gap: 10px;">
                <button class="btn ${currentReg === 'R2021' ? 'btn-primary' : 'btn-secondary'} btn-sm" id="settings-reg-r2021">
                  📜 R2021 (Active)
                </button>
                <button class="btn ${currentReg === 'R2025' ? 'btn-primary' : 'btn-secondary'} btn-sm" id="settings-reg-r2025">
                  ✨ R2025 (Next Gen)
                </button>
              </div>
            </div>
          </div>

          <!-- 3. Active Department Quick Switcher -->
          <div class="card" style="padding: 22px 26px; border-radius: var(--radius-xl); border: 1.5px solid var(--border-color); background: var(--bg-surface);">
            <div style="margin-bottom: 14px;">
              <strong style="font-size: 1rem; color: var(--text-primary); display: block; margin-bottom: 2px;">Department Selection (All 68 Engineering Branches)</strong>
              <span style="font-size: 0.82rem; color: var(--text-muted);">Current Active Department: <strong>${currentDeptCode}</strong></span>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <button class="btn btn-secondary btn-sm" onclick="window.appState.setView('department-select')">
                🏛️ Open 68-Department Directory ➔
              </button>
              <button class="btn btn-ghost btn-sm" onclick="window.appState.setDepartment('IT'); window.location.reload();">
                Reset to IT Core
              </button>
            </div>
          </div>

          <!-- 4. Chatbot Voice Assistant Preferences -->
          <div class="card" style="padding: 22px 26px; border-radius: var(--radius-xl); border: 1.5px solid var(--border-color); background: var(--bg-surface);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
              <div>
                <strong style="font-size: 1rem; color: var(--text-primary); display: block; margin-bottom: 2px;">AI Assistant Voice Readout</strong>
                <span style="font-size: 0.82rem; color: var(--text-muted);">Enable speech readout and voice inputs in the AI Robo Guide.</span>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="window.ChatbotWidget?.toggleChat(true);">
                🤖 Open AI Assistant
              </button>
            </div>
          </div>

          <div style="margin-top: 10px;">
            <button class="btn btn-primary" onclick="window.appState.setView('dashboard')">
              🏛️ Save &amp; Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  },

  bindEvents() {
    document.getElementById('settings-theme-light')?.addEventListener('click', () => {
      window.appState.setTheme('light');
      this.render();
      if (window.Toast) window.Toast.show('Switched to Light Theme ☀️', 'info');
    });

    document.getElementById('settings-theme-dark')?.addEventListener('click', () => {
      window.appState.setTheme('dark');
      this.render();
      if (window.Toast) window.Toast.show('Switched to Dark Theme 🌙', 'info');
    });

    document.getElementById('settings-reg-r2021')?.addEventListener('click', () => {
      window.appState.setRegulation('R2021');
      this.render();
      if (window.Toast) window.Toast.show('Regulation set to R2021 📜', 'success');
    });

    document.getElementById('settings-reg-r2025')?.addEventListener('click', () => {
      window.appState.setRegulation('R2025');
      this.render();
      if (window.Toast) window.Toast.show('Regulation set to R2025 ✨', 'success');
    });
  }
};
