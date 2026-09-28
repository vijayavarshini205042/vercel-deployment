/**
 * Engineering Department Selection Component
 * Displays all engineering departments with category filters and search.
 * Works with all departments from fallbackData (R2021 + R2025).
 */

window.DepartmentSelectView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    let departments = [];
    try {
      const res = await window.apiService.get('/departments');
      departments = res.data || window.AppFallbackData.departments;
    } catch {
      departments = window.AppFallbackData.departments;
    }

    const currentDept = window.appState.department;
    const currentReg = window.appState.regulation;

    container.innerHTML = `
      <div style="max-width: 1200px; margin: 30px auto; width: 100%;">
        <!-- Header banner -->
        <div style="text-align: center; margin-bottom: 28px;">
          <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <span class="badge badge-primary" style="font-size: 0.8125rem;">Active Regulation: ${currentReg}</span>
            <button class="btn btn-ghost btn-sm" id="change-reg-link" style="color: var(--color-primary-600);">Change</button>
          </div>
          <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 8px;">Select Engineering Department</h1>
          <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto;">
            Explore customized curriculum syllabi, previous university question papers, department career roles, and recommended projects.
          </p>
        </div>

        <!-- Filter and Search Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div class="chip-container" id="dept-category-chips" style="margin: 0;">
            <button class="chip active" data-category="All">All Departments (${departments.length})</button>
            <button class="chip" data-category="Circuits & Computing">Circuits & Computing</button>
            <button class="chip" data-category="Electrical & Energy">Electrical & Energy</button>
            <button class="chip" data-category="Mechanical & Materials">Mechanical</button>
            <button class="chip" data-category="Infrastructure & Environment">Infrastructure</button>
            <button class="chip" data-category="Aerospace & Automotive">Aerospace</button>
            <button class="chip" data-category="Robotics & Automation">Robotics</button>
            <button class="chip" data-category="Bio & Chemical">Bio & Chemical</button>
            <button class="chip" data-category="Specialized Engineering">Specialized</button>
          </div>

          <div style="position: relative; width: 280px;">
            <input 
              type="text" 
              id="dept-search-input" 
              class="form-input" 
              placeholder="Filter departments..." 
              style="padding-left: 36px;"
            >
            <span style="position: absolute; left: 12px; top: 10px; color: var(--text-muted);">🔍</span>
          </div>
        </div>

        <!-- Department Grid -->
        <div id="dept-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
          <!-- Injected via helper -->
        </div>
      </div>
    `;

    // Render department cards
    this.renderCards(departments, 'All', '');

    // Category chip click
    container.querySelectorAll('#dept-category-chips .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        container.querySelectorAll('#dept-category-chips .chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const category = chip.getAttribute('data-category');
        const search = document.getElementById('dept-search-input').value;
        this.renderCards(departments, category, search);
      });
    });

    // Search input
    const searchInput = document.getElementById('dept-search-input');
    searchInput.addEventListener('input', (e) => {
      const search = e.target.value;
      const activeChip = container.querySelector('#dept-category-chips .chip.active');
      const category = activeChip ? activeChip.getAttribute('data-category') : 'All';
      this.renderCards(departments, category, search);
    });

    document.getElementById('change-reg-link')?.addEventListener('click', () => {
      window.appState.setView('regulation-select');
    });
  },

  renderCards(departments, selectedCategory, searchQuery) {
    const grid = document.getElementById('dept-cards-grid');
    if (!grid) return;

    const currentDept = window.appState.department;
    const query = searchQuery.toLowerCase().trim();

    const filtered = departments.filter(d => {
      const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
      const desc = (d.description || d.desc || '').toLowerCase();
      const matchesSearch = !query || d.name.toLowerCase().includes(query) || d.code.toLowerCase().includes(query) || desc.includes(query);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-title">No Departments Match Your Filter</div>
          <div class="empty-state-desc">Try clearing your search query or selecting "All Departments".</div>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(dept => {
      const isSelected = dept.code === currentDept;
      return `
        <div 
          class="card card-hoverable dept-card-item" 
          data-code="${dept.code}"
          style="cursor: pointer; border: 1.5px solid ${isSelected ? 'var(--color-primary-600)' : 'var(--border-color)'}; background-color: var(--bg-surface);"
        >
          <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px;">
            <div style="width: 52px; height: 52px; border-radius: var(--radius-lg); background: var(--bg-subtle); display: flex; align-items: center; justify-content: center; font-size: 1.8rem;">
              ${dept.icon || '🏛️'}
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
              <span class="badge ${isSelected ? 'badge-primary' : 'badge-subtle'}">${dept.code}</span>
              <span style="font-size: 0.7rem; color: var(--text-muted);">${dept.category || 'Engineering'}</span>
            </div>
          </div>

          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 8px; color: var(--text-primary);">
            ${dept.name}
          </h3>

          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px; flex: 1;">
            ${dept.description || dept.desc || 'Engineering curriculum — Anna University.'}
          </p>

          <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--border-subtle); font-size: 0.8125rem; font-weight: 600; color: var(--color-primary-600);">
            <span>Access Dashboard</span>
            <span>➔</span>
          </div>
        </div>
      `;
    }).join('');

    // Bind card clicks
    grid.querySelectorAll('.dept-card-item').forEach(card => {
      card.addEventListener('click', () => {
        const code = card.getAttribute('data-code');
        window.appState.setDepartment(code);
        window.Toast.success(`Switched to ${code} — now select your Year & Semester`);
        // Flow: Department → Year/Semester selection
        window.appState.setView('semester-select');
      });
    });
  }
};
