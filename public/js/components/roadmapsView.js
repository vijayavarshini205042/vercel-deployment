/**
 * Page 4: Career Roadmaps View Component
 * Displays available Job Roles categorized by department, each with an attached "See Roadmap" button.
 * Clicking "See Roadmap" opens an authentic, step-by-step printable A4 Sheet Document Blueprint.
 * Data Source: /data/career_roadmaps.json (window.CareerRoadmapsData)
 */

window.RoadmapsView = {
  currentFilters: {
    deptCode: 'ALL',
    search: '',
    category: 'ALL'
  },
  roadmapsCache: null,

  async loadData() {
    if (this.roadmapsCache && this.roadmapsCache.length > 0) return this.roadmapsCache;
    if (window.CareerRoadmapsData && window.CareerRoadmapsData.length > 0) {
      this.roadmapsCache = window.CareerRoadmapsData;
      return this.roadmapsCache;
    }
    try {
      const res = await fetch('/data/career_roadmaps.json');
      if (res.ok) {
        this.roadmapsCache = await res.json();
        return this.roadmapsCache;
      }
    } catch (err) {
      console.warn('Could not fetch /data/career_roadmaps.json, falling back to window.CareerRoadmapsData', err);
    }
    this.roadmapsCache = window.CareerRoadmapsData || [];
    return this.roadmapsCache;
  },

  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const activeDeptCode = state.department || 'IT';

    if (this.currentFilters.deptCode === 'ALL' && activeDeptCode) {
      this.currentFilters.deptCode = activeDeptCode;
    }

    const allRoadmaps = await this.loadData();
    const deptList = window.AppFallbackData?.departments || [];

    // Distinct categories
    const categories = ['ALL', ...new Set(allRoadmaps.map(r => r.category).filter(Boolean))];

    const renderContent = () => {
      const query = this.currentFilters.search.toLowerCase().trim();
      const selectedDept = this.currentFilters.deptCode;
      const selectedCat = this.currentFilters.category;

      // Filter roadmaps
      const filtered = allRoadmaps.filter(r => {
        const matchesDept = selectedDept === 'ALL' || r.deptCode === selectedDept;
        const matchesCat = selectedCat === 'ALL' || r.category === selectedCat;
        const skillsText = (r.technicalSkills || []).join(' ').toLowerCase();
        const toolsText = (r.tools || []).join(' ').toLowerCase();
        const matchesSearch = !query || 
          r.roleTitle.toLowerCase().includes(query) || 
          r.department.toLowerCase().includes(query) ||
          (r.shortOverview && r.shortOverview.toLowerCase().includes(query)) ||
          skillsText.includes(query) ||
          toolsText.includes(query);
        return matchesDept && matchesCat && matchesSearch;
      });

      container.innerHTML = `
        <div style="max-width: 1240px; margin: 0 auto; width: 100%; padding-bottom: 60px;">
          
          <!-- Breadcrumb Trail -->
          <div class="flow-breadcrumb" style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">
            <button class="breadcrumb-step completed" id="road-bc-dashboard">🏛️ Dashboard</button>
            <span class="breadcrumb-arrow">→</span>
            <span class="breadcrumb-step current">🗺️ Page 4: Career Roadmaps</span>
          </div>

          <!-- Section Hero Header -->
          <div style="text-align: center; margin-bottom: 34px;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 68px; height: 68px; border-radius: var(--radius-xl); background: linear-gradient(135deg, #0284c7, #2563eb); color: #fff; font-size: 2.2rem; margin-bottom: 16px; box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);">
              🗺️
            </div>
            <h1 style="font-size: 2.3rem; font-weight: 800; margin-bottom: 10px; color: var(--text-primary); letter-spacing: -0.02em;">
              Departmental Job Roles & Career Roadmaps
            </h1>
            <p style="color: var(--text-secondary); max-width: 760px; margin: 0 auto; font-size: 1.05rem; line-height: 1.6;">
              Explore career roles tailored for your engineering department. Each job role features an attached <strong>See Roadmap</strong> button that reveals an official <strong>A4 Sheet Step-by-Step Blueprint</strong> with foundational milestones, core competencies, tools, and interview defense topics.
            </p>
          </div>

          <!-- Control Filter Panel -->
          <div class="card" style="padding: 20px 24px; margin-bottom: 28px; border: 1px solid var(--border-color); background: var(--bg-surface); border-radius: var(--radius-xl); box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
              
              <!-- Department Select Filter -->
              <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
                  Department:
                </label>
                <select id="road-filter-dept" class="form-input" style="padding: 8px 14px; font-weight: 600; min-width: 230px; border-radius: var(--radius-md);">
                  <option value="ALL">🌐 All Engineering Departments</option>
                  ${deptList.map(d => `
                    <option value="${d.code}" ${d.code === selectedDept ? 'selected' : ''}>
                      ${d.icon || '🏛️'} ${d.name} (${d.code})
                    </option>
                  `).join('')}
                </select>
              </div>

              <!-- Search input -->
              <div style="position: relative; width: 340px; max-width: 100%;">
                <input 
                  type="text" 
                  id="road-search-input" 
                  class="form-input" 
                  placeholder="Search role, skill, or tool..." 
                  value="${this.currentFilters.search}"
                  style="padding-left: 36px; border-radius: var(--radius-md);"
                >
                <span style="position: absolute; left: 12px; top: 10px; color: var(--text-muted);">🔍</span>
              </div>
            </div>

            <!-- Categories Pill Bar -->
            ${categories.length > 2 ? `
              <div style="display: flex; gap: 8px; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border-subtle); flex-wrap: wrap; align-items: center;">
                <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Track:</span>
                ${categories.map(cat => `
                  <button 
                    class="btn btn-sm road-cat-btn ${cat === selectedCat ? 'btn-primary' : 'btn-ghost'}" 
                    data-cat="${cat}"
                    style="font-size: 0.8rem; padding: 4px 12px; border-radius: var(--radius-full);"
                  >
                    ${cat === 'ALL' ? 'All Specializations' : cat}
                  </button>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Results Stats Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding: 0 4px; flex-wrap: wrap; gap: 10px;">
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">
              Showing <span style="color: var(--color-primary-600);">${filtered.length}</span> Job Roles with Attached Roadmaps
            </div>
            <div style="display: flex; gap: 12px; font-size: 0.82rem; color: var(--text-muted);">
              <span>📄 Printable A4 Blueprints</span>
              <span>•</span>
              <span>7 Execution Stages</span>
            </div>
          </div>

          <!-- Roadmaps / Roles List Grid -->
          ${filtered.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon">🗺️</div>
              <div class="empty-state-title">No Matching Job Roles Found</div>
              <div class="empty-state-desc">Try clearing your search query or switching departments.</div>
              <button class="btn btn-secondary" id="road-reset-filters">Reset All Filters</button>
            </div>
          ` : `
            <div class="roadmap-roles-grid">
              ${filtered.map(item => {
                const skills = item.technicalSkills || [];
                const tools = item.tools || [];
                const stepsCount = item.roadmapSteps?.length || 4;
                
                return `
                  <div class="roadmap-role-card">
                    <div>
                      <!-- Card Header Badges -->
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 8px;">
                        <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                          <span class="badge badge-primary" style="font-weight: 700;">${item.deptCode}</span>
                          <span class="badge" style="background: rgba(37, 99, 235, 0.08); color: #2563eb; font-weight: 600; font-size: 0.75rem;">
                            ${item.category || 'Engineering'}
                          </span>
                        </div>
                        <span class="badge" style="background: rgba(16, 185, 129, 0.12); color: #059669; font-weight: 700; font-size: 0.78rem;">
                          ${item.salaryBenchmark || '₹6 - 18 LPA'}
                        </span>
                      </div>

                      <!-- Role Title -->
                      <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0 0 6px 0; line-height: 1.35;">
                        ${item.roleTitle}
                      </h3>
                      
                      <!-- Dept Affiliation -->
                      <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                        <span>🏛️ ${item.department}</span>
                        <span>•</span>
                        <span>⏱️ ${item.totalDuration || '6-9 Months'}</span>
                      </div>

                      <!-- Short Overview -->
                      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 16px;">
                        ${item.shortOverview || 'Comprehensive engineering career path with structured learning phases.'}
                      </p>

                      <!-- Key Skills & Tool Tags -->
                      <div style="margin-bottom: 14px;">
                        <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; margin-bottom: 6px;">
                          Core Competencies & Stack:
                        </div>
                        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                          ${skills.slice(0, 4).map(s => `
                            <span class="badge badge-subtle" style="font-size: 0.74rem;">${s}</span>
                          `).join('')}
                          ${tools.slice(0, 3).map(t => `
                            <span class="badge" style="background: rgba(147, 51, 234, 0.08); color: #7e22ce; font-size: 0.74rem; font-weight: 600;">
                              🔧 ${t}
                            </span>
                          `).join('')}
                        </div>
                      </div>
                    </div>

                    <!-- ATTACHED "SEE ROADMAP" ACTION SECTION -->
                    <div class="roadmap-attached-action">
                      <button 
                        class="btn-see-roadmap btn-launch-a4-sheet" 
                        data-roadmap-id="${item.id}"
                        title="Click to view step-by-step A4 sheet blueprint"
                      >
                        <span class="btn-icon">🗺️</span>
                        <span>See Roadmap (A4 Sheet)</span>
                        <span style="opacity: 0.8; font-size: 0.8rem;">→</span>
                      </button>

                      <div style="display: flex; gap: 8px; justify-content: space-between;">
                        <button 
                          class="btn btn-ghost btn-sm road-sub-roles-btn" 
                          data-dept="${item.deptCode}"
                          style="font-size: 0.78rem; font-weight: 600; flex: 1; padding: 6px;"
                        >
                          💼 Role Details
                        </button>
                        <button 
                          class="btn btn-ghost btn-sm road-sub-certs-btn" 
                          data-dept="${item.deptCode}"
                          style="font-size: 0.78rem; font-weight: 600; flex: 1; padding: 6px;"
                        >
                          🏆 Certifications
                        </button>
                      </div>
                    </div>

                  </div>
                `;
              }).join('')}
            </div>
          `}

        </div>
      `;

      // Event bindings
      document.getElementById('road-bc-dashboard')?.addEventListener('click', () => {
        window.appState.setView('dashboard');
      });

      document.getElementById('road-filter-dept')?.addEventListener('change', (e) => {
        this.currentFilters.deptCode = e.target.value;
        renderContent();
      });

      const searchInput = document.getElementById('road-search-input');
      if (searchInput) {
        searchInput.focus();
        searchInput.selectionStart = searchInput.selectionEnd = searchInput.value.length;
        searchInput.addEventListener('input', (e) => {
          this.currentFilters.search = e.target.value;
          renderContent();
        });
      }

      container.querySelectorAll('.road-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.currentFilters.category = btn.getAttribute('data-cat');
          renderContent();
        });
      });

      document.getElementById('road-reset-filters')?.addEventListener('click', () => {
        this.currentFilters = { deptCode: 'ALL', search: '', category: 'ALL' };
        renderContent();
      });

      container.querySelectorAll('.road-sub-roles-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const dept = btn.getAttribute('data-dept');
          if (dept) window.appState.setDepartment(dept);
          window.appState.setView('dept-roles');
        });
      });

      container.querySelectorAll('.road-sub-certs-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const dept = btn.getAttribute('data-dept');
          if (dept) window.appState.setDepartment(dept);
          window.appState.setView('certifications');
        });
      });

      // ATTACHED "SEE ROADMAP" CLICK HANDLER -> OPENS STEP-BY-STEP A4 SHEET MODAL
      container.querySelectorAll('.btn-launch-a4-sheet').forEach(btn => {
        btn.addEventListener('click', () => {
          const roadmapId = btn.getAttribute('data-roadmap-id');
          const item = allRoadmaps.find(r => r.id === roadmapId);
          if (item) {
            this.openA4SheetModal(item);
          }
        });
      });
    };

    renderContent();
  },

  /**
   * Opens an authentic, printable A4 Sheet Document displaying the step-by-step roadmap
   */
  openA4SheetModal(item) {
    // Remove any existing A4 modal
    document.getElementById('a4-roadmap-modal-overlay')?.remove();

    // Prepare steps: either rich 7-stage roadmapSteps, or 4-phase sequentialRoadmapSteps
    let steps = [];
    if (item.roadmapSteps && item.roadmapSteps.length > 0) {
      steps = item.roadmapSteps.map((st, idx) => ({
        stepNumber: idx + 1,
        title: st.title || `Stage ${idx + 1}`,
        learn: Array.isArray(st.learn) ? st.learn : [st.learn || 'Curriculum mastery'],
        practice: Array.isArray(st.practice) ? st.practice : [st.practice || 'Hands-on practice problems'],
        project: st.project || 'Stage Milestone Project',
        outcome: st.outcome || 'Measurable engineering competency achieved.'
      }));
    } else if (item.sequentialRoadmapSteps) {
      const s = item.sequentialRoadmapSteps;
      steps = [
        {
          stepNumber: 1,
          title: "Foundations & Core Principles",
          learn: [s.phase1 ? s.phase1.replace(/^Phase 1:\s*Basics\s*-\s*/i, '') : "Basic theory, mathematical syntax, and engineering foundations."],
          practice: ["Benchmark problem solving", "Foundational code and structural exercises"],
          project: "Introductory Benchmark Implementation",
          outcome: "Firm grasp of fundamental terminology and core paradigms."
        },
        {
          stepNumber: 2,
          title: "Core Technical Competencies",
          learn: [s.phase2 ? s.phase2.replace(/^Phase 2:\s*Core Skills\s*-\s*/i, '') : "Mastery of essential domain frameworks and architecture."],
          practice: ["Modular engineering tasks", "Component assembly and validation"],
          project: "Standard Multi-Tier Engineering Implementation",
          outcome: "Ability to independently develop production-ready modules."
        },
        {
          stepNumber: 3,
          title: "Industrial Tools & Infrastructure",
          learn: [s.phase3 ? s.phase3.replace(/^Phase 3:\s*Advanced Tools\s*-\s*/i, '') : "Enterprise-grade tooling, cloud services, and production testing."],
          practice: ["Automated testing suite", "Continuous deployment workflow"],
          project: "End-to-End Enterprise Scale Solution",
          outcome: "Professional proficiency in industry toolstacks and pipelines."
        },
        {
          stepNumber: 4,
          title: "Capstone Portfolio & Placement Readiness",
          learn: [s.phase4 ? s.phase4.replace(/^Phase 4:\s*Portfolio Projects\s*-\s*/i, '') : "Live project execution, technical defense, and interview viva."],
          practice: ["Mock technical defense", "GitHub documentation & portfolio audit"],
          project: "Final Capstone Engineering Portfolio Dossier",
          outcome: "High placement clearance rate and verified domain competency."
        }
      ];
    }

    const docId = `AU/DRMS/RDMP/${item.deptCode}/${item.roleId || item.id}`;
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    // Create Modal Overlay
    const overlay = document.createElement('div');
    overlay.id = 'a4-roadmap-modal-overlay';
    overlay.className = 'a4-modal-overlay';

    overlay.innerHTML = `
      <!-- Top Action Toolbar (Hidden during print) -->
      <div class="a4-toolbar no-print">
        <div class="a4-toolbar-title">
          <span>📄</span>
          <span>A4 Career Roadmap Blueprint: <strong>${item.roleTitle}</strong></span>
        </div>
        <div class="a4-toolbar-actions">
          <button class="btn-a4-action btn-a4-print" id="a4-btn-print" title="Print as A4 Document or Save as PDF">
            <span>🖨️</span>
            <span>Print / Save PDF</span>
          </button>
          <button class="btn-a4-action btn-a4-copy" id="a4-btn-copy" title="Copy roadmap steps to clipboard">
            <span>📋</span>
            <span>Copy Steps</span>
          </button>
          <button class="btn-a4-action btn-a4-close" id="a4-btn-close" title="Close document">
            <span>✕</span>
            <span>Close</span>
          </button>
        </div>
      </div>

      <!-- THE A4 SHEET DOCUMENT (210mm x 297mm proportion) -->
      <div id="a4-roadmap-sheet" class="a4-sheet-document">
        
        <!-- Institutional Formal Header -->
        <div class="a4-inst-header">
          <div class="a4-inst-crest">🏛️</div>
          <div class="a4-inst-name">Anna University Affiliated Institutions</div>
          <div class="a4-inst-dept">Directorate of Academic Courses & Career Development</div>
          <div class="a4-inst-sub">Department Resource Management System (DRMS) • Regulation 2021</div>
        </div>

        <!-- Document Title Banner -->
        <div class="a4-doc-banner">
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #2563eb; margin-bottom: 2px;">
              OFFICIAL CAREER EXECUTION BLUEPRINT
            </div>
            <h1 class="a4-doc-title">${item.roleTitle}</h1>
            <div class="a4-doc-subtitle">
              Specialized Engineering Track: <strong>${item.department} (${item.deptCode})</strong>
            </div>
          </div>
          <div class="a4-doc-id-badge">
            <div>DOC ID: <strong>${docId}</strong></div>
            <div>ISSUED: <strong>${today}</strong></div>
            <div style="color: #059669; font-weight: 700;">STATUS: VERIFIED</div>
          </div>
        </div>

        <!-- Executive Metadata Table -->
        <div class="a4-meta-grid">
          <div class="a4-meta-item">
            <span class="a4-meta-label">Discipline / Dept</span>
            <span class="a4-meta-val">${item.deptCode} - ${item.department}</span>
          </div>
          <div class="a4-meta-item">
            <span class="a4-meta-label">Specialization Track</span>
            <span class="a4-meta-val">${item.category || 'Core Engineering'}</span>
          </div>
          <div class="a4-meta-item">
            <span class="a4-meta-label">Target Timeline</span>
            <span class="a4-meta-val">${item.totalDuration || '6 - 9 Months'} (${steps.length} Stages)</span>
          </div>
          <div class="a4-meta-item">
            <span class="a4-meta-label">Industry Benchmark</span>
            <span class="a4-meta-val" style="color: #059669;">${item.salaryBenchmark || '₹6 - 18 LPA'}</span>
          </div>
        </div>

        <!-- Executive Role Summary -->
        <div style="margin-bottom: 22px; padding: 12px 16px; background: #f8fafc; border-left: 3px solid #0284c7; border-radius: 4px; font-size: 0.85rem; line-height: 1.6; color: #334155;">
          <strong>Role Profile & Scope:</strong> ${item.shortOverview || 'Specialized professional engineering pathway encompassing rigorous domain foundation, production tooling, project portfolio execution, and placement defense.'}
        </div>

        <!-- Step-by-Step Execution Journey Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #0f172a; padding-bottom: 6px; margin-bottom: 16px;">
          <h2 style="font-size: 1.05rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #0f172a; margin: 0;">
            Sequential Execution Pathway (Step-by-Step Blueprint)
          </h2>
          <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; text-transform: uppercase;">
            ${steps.length} Milestones
          </span>
        </div>

        <!-- Sequential Steps List -->
        <div class="a4-steps-container">
          ${steps.map(step => `
            <div class="a4-step-card">
              <div class="a4-step-header">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="a4-step-badge">STEP 0${step.stepNumber}</span>
                  <h3 class="a4-step-title">${step.title}</h3>
                </div>
                <span style="font-size: 0.74rem; font-weight: 700; color: #059669; background: #ecfdf5; padding: 2px 6px; border-radius: 4px;">
                  ✓ Mandatory
                </span>
              </div>

              <div class="a4-step-body">
                <!-- Topics to Learn -->
                <div class="a4-sub-item">
                  <span class="a4-sub-item-icon">📚</span>
                  <div>
                    <strong>Core Knowledge to Learn:</strong> 
                    ${step.learn.join(', ')}
                  </div>
                </div>

                <!-- Hands-on Practice -->
                <div class="a4-sub-item">
                  <span class="a4-sub-item-icon">⚡</span>
                  <div>
                    <strong>Hands-on Exercises:</strong> 
                    ${step.practice.join(', ')}
                  </div>
                </div>

                <!-- Practical Milestone Project -->
                <div class="a4-sub-item">
                  <span class="a4-sub-item-icon">🚀</span>
                  <div>
                    <strong>Milestone Project:</strong> 
                    <span style="color: #1e3a8a; font-weight: 600;">${step.project}</span>
                  </div>
                </div>

                <!-- Expected Outcome -->
                <div class="a4-sub-item">
                  <span class="a4-sub-item-icon">🎯</span>
                  <div>
                    <strong>Verified Learning Outcome:</strong> 
                    <span style="color: #475569;">${step.outcome}</span>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Two-column Tools & Certifications Matrix -->
        <div class="a4-dual-grid">
          <!-- Required Technical Stack & Tools -->
          <div class="a4-info-box">
            <div class="a4-info-box-title">
              <span>🔧</span>
              <span>Essential Industrial Toolstack & Skills</span>
            </div>
            <div class="a4-pills-wrap">
              ${(item.technicalSkills || []).map(sk => `<span class="a4-pill">💡 ${sk}</span>`).join('')}
              ${(item.tools || []).map(tl => `<span class="a4-pill" style="border-color: #93c5fd; color: #1e3a8a;">⚙️ ${tl}</span>`).join('')}
            </div>
          </div>

          <!-- Professional Certifications & Standards -->
          <div class="a4-info-box">
            <div class="a4-info-box-title">
              <span>🏆</span>
              <span>Recommended Industry Certifications</span>
            </div>
            <div style="font-size: 0.8rem; color: #334155; line-height: 1.5;">
              ${(item.certifications && item.certifications.length > 0) ? `
                <ul style="margin: 0; padding-left: 18px;">
                  ${item.certifications.slice(0, 3).map(c => `<li>${c}</li>`).join('')}
                </ul>
              ` : `
                <ul style="margin: 0; padding-left: 18px;">
                  <li>Global Vendor Accreditation in ${item.roleTitle}</li>
                  <li>NPTEL / SWAYAM Elite Technical Certificate</li>
                  <li>Industry Standard Practical Assessment</li>
                </ul>
              `}
            </div>
          </div>
        </div>

        <!-- Technical Interview Viva Checkpoints -->
        ${(item.interviewTopics && item.interviewTopics.length > 0) ? `
          <div style="border: 1px solid #fed7aa; background: #fffaf5; border-radius: 6px; padding: 12px 16px; margin-bottom: 24px; page-break-inside: avoid;">
            <div style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: #c2410c; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
              <span>🎯</span>
              <span>Technical Interview & Placement Viva Defense Checkpoints:</span>
            </div>
            <ol style="margin: 0; padding-left: 20px; font-size: 0.8rem; color: #431407; line-height: 1.55;">
              ${item.interviewTopics.slice(0, 4).map(q => `<li>${q}</li>`).join('')}
            </ol>
          </div>
        ` : ''}

        <!-- Career Progression Ladder -->
        ${(item.careerProgression && item.careerProgression.length > 0) ? `
          <div style="margin-bottom: 24px; padding: 10px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; page-break-inside: avoid;">
            <div style="font-size: 0.76rem; font-weight: 800; text-transform: uppercase; color: #1e3a8a; margin-bottom: 6px;">
              📈 Official Career Advancement Progression:
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center; font-size: 0.78rem; font-weight: 600; color: #334155;">
              ${item.careerProgression.map((prog, idx) => `
                <span>${prog}</span>
                ${idx < item.careerProgression.length - 1 ? '<span style="color: #94a3b8;">➔</span>' : ''}
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Official Institutional Signatures & Seal Block -->
        <div class="a4-footer-seal">
          <div class="a4-seal-box">
            <span style="font-size: 1.4rem;">🏛️</span>
            <div>
              <div style="font-weight: 800; letter-spacing: 0.05em;">ANNA UNIVERSITY DRMS VERIFIED</div>
              <div style="font-size: 0.65rem; color: #047857;">Affiliated Institutions Career Blueprint • Batch 2024-2028</div>
            </div>
          </div>

          <div style="display: flex; gap: 32px;">
            <div class="a4-signature-block">
              <div class="a4-signature-line"></div>
              <div style="font-weight: 700; color: #1e293b;">Dr. Academic HOD</div>
              <div style="font-size: 0.68rem; color: #64748b;">Dept. of ${item.deptCode}</div>
            </div>

            <div class="a4-signature-block">
              <div class="a4-signature-line"></div>
              <div style="font-weight: 700; color: #1e293b;">Director, Placements</div>
              <div style="font-size: 0.68rem; color: #64748b;">University Career Council</div>
            </div>
          </div>
        </div>

        <!-- Page Footer Number -->
        <div style="text-align: center; margin-top: 18px; font-size: 0.68rem; color: #94a3b8; letter-spacing: 0.05em; text-transform: uppercase;">
          Page 1 of 1 • Official Academic Document • Anna University Affiliated Institutions • Generated by DRMS
        </div>

      </div>
    `;

    document.body.appendChild(overlay);

    // Trap focus and prevent background body scroll
    document.body.style.overflow = 'hidden';

    // Toolbar buttons
    document.getElementById('a4-btn-close')?.addEventListener('click', () => {
      this.closeA4SheetModal();
    });

    document.getElementById('a4-btn-print')?.addEventListener('click', () => {
      window.print();
    });

    document.getElementById('a4-btn-copy')?.addEventListener('click', () => {
      let copyText = `OFFICIAL CAREER ROADMAP BLUEPRINT: ${item.roleTitle}\n`;
      copyText += `Department: ${item.department} (${item.deptCode})\n`;
      copyText += `Benchmark: ${item.salaryBenchmark || '₹6 - 18 LPA'} | Timeline: ${item.totalDuration || '6-9 Months'}\n\n`;
      copyText += `STEP-BY-STEP BLUEPRINT:\n`;
      steps.forEach(s => {
        copyText += `\n[STEP 0${s.stepNumber}: ${s.title}]\n`;
        copyText += `- Learn: ${s.learn.join(', ')}\n`;
        copyText += `- Practice: ${s.practice.join(', ')}\n`;
        copyText += `- Milestone Project: ${s.project}\n`;
        copyText += `- Outcome: ${s.outcome}\n`;
      });
      copyText += `\nTools: ${(item.tools || []).join(', ')}`;

      navigator.clipboard.writeText(copyText).then(() => {
        if (window.showToast) {
          window.showToast('✅ A4 Roadmap steps copied to clipboard!', 'success');
        } else {
          alert('A4 Roadmap steps copied to clipboard!');
        }
      }).catch(() => {
        alert('Could not copy to clipboard. Please print or save as PDF.');
      });
    });

    // Close on overlay click outside document
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.closeA4SheetModal();
      }
    });

    // Close on Escape key
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        this.closeA4SheetModal();
        window.removeEventListener('keydown', onKeyDown);
      }
    };
    window.addEventListener('keydown', onKeyDown);
  },

  closeA4SheetModal() {
    const overlay = document.getElementById('a4-roadmap-modal-overlay');
    if (overlay) {
      overlay.remove();
      document.body.style.overflow = '';
    }
  }
};
