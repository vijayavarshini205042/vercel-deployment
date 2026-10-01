/**
 * Student Profile View Component
 * Provides student academic identity, registered department, regulation, and progress metrics.
 */

window.ProfileView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const user = state.user || { name: 'Student Scholar', email: 'student@podhigai.edu.in' };
    const deptCode = state.department || 'IT';
    const regCode = state.regulation || 'R2021';
    const deptList = window.AppFallbackData?.departments || [];
    const dept = deptList.find(d => d.code === deptCode) || { name: 'Information Technology', code: 'IT' };

    container.innerHTML = `
      <div style="max-width: 980px; margin: 0 auto; padding-bottom: 40px;">
        <!-- Profile Header Banner -->
        <div style="background: linear-gradient(135deg, #1e3a8a 0%, #4338ca 100%); border-radius: var(--radius-xl); padding: 32px 36px; color: #ffffff; margin-bottom: 24px; box-shadow: var(--shadow-md); position: relative; overflow: hidden;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; position: relative; z-index: 1;">
            <div style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
              <div style="width: 84px; height: 84px; border-radius: 50%; background: #ffffff; color: #4338ca; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 800; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25); border: 3px solid rgba(255, 255, 255, 0.8);">
                👨‍🎓
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
                  <h1 style="font-size: 1.65rem; font-weight: 800; margin: 0; color: #ffffff;">${user.name || 'Vijayavarshini S'}</h1>
                  <span class="badge" style="background: rgba(16, 185, 129, 0.3); color: #34d399; font-size: 0.72rem; border: 1px solid rgba(52, 211, 153, 0.5);">Verified Student</span>
                </div>
                <div style="font-size: 0.95rem; color: rgba(255, 255, 255, 0.9); margin-bottom: 6px;">
                  B.Tech ${dept.name} • Reg No: <strong>911521205042</strong>
                </div>
                <div style="font-size: 0.82rem; color: rgba(255, 255, 255, 0.75); display: flex; gap: 14px; flex-wrap: wrap;">
                  <span>🏛️ Podhigai College of Engineering & Technology</span>
                  <span>•</span>
                  <span>🎓 Anna University Affiliated</span>
                </div>
              </div>
            </div>
            <button class="btn btn-secondary" onclick="window.appState.setView('settings')">
              ⚙️ Account Settings
            </button>
          </div>
        </div>

        <!-- Academic Credentials Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
          <div class="card" style="padding: 20px; border-radius: var(--radius-lg); border: 1.5px solid var(--border-color); background: var(--bg-surface);">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Active Regulation</div>
            <div style="font-size: 1.5rem; font-weight: 900; color: #7c3aed; margin-top: 4px;">${regCode}</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Choice Based Credit System</div>
          </div>

          <div class="card" style="padding: 20px; border-radius: var(--radius-lg); border: 1.5px solid var(--border-color); background: var(--bg-surface);">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Department</div>
            <div style="font-size: 1.5rem; font-weight: 900; color: #2563eb; margin-top: 4px;">${deptCode}</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">${dept.name}</div>
          </div>

          <div class="card" style="padding: 20px; border-radius: var(--radius-lg); border: 1.5px solid var(--border-color); background: var(--bg-surface);">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Cumulative GPA (Est.)</div>
            <div style="font-size: 1.5rem; font-weight: 900; color: #059669; margin-top: 4px;">8.65 / 10</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">First Class with Distinction</div>
          </div>

          <div class="card" style="padding: 20px; border-radius: var(--radius-lg); border: 1.5px solid var(--border-color); background: var(--bg-surface);">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Saved Bookmarks</div>
            <div style="font-size: 1.5rem; font-weight: 900; color: #d97706; margin-top: 4px;">${(window.appState.state.bookmarks || []).length} Items</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Saved notes & QPs</div>
          </div>
        </div>

        <!-- Quick Access Shortcuts -->
        <div class="card" style="padding: 24px; border-radius: var(--radius-xl); border: 1.5px solid var(--border-color); background: var(--bg-surface);">
          <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 14px;">
            🎓 Your Academic Pathways
          </h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button class="btn btn-primary btn-sm" onclick="window.appState.setView('notes')">
              📚 Browse Study Notes
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.appState.setView('question-papers')">
              📝 Practice Past Question Papers
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.appState.setView('roadmaps')">
              🗺️ My Career Roadmap
            </button>
            <button class="btn btn-ghost btn-sm" onclick="window.appState.setView('dashboard')">
              🏛️ Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
