/**
 * Department Resource Dashboard View
 * Features Hero Banner, Key Metrics, 5 Core Resource Cards, Skill Map Shortcut,
 * Recently Added Resources, and Upcoming Career Tech Trends.
 */

window.DashboardView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const currentReg = state.regulation || 'R2021';
    const currentDeptCode = state.department || 'IT';

    // Department metadata
    const deptList = window.AppFallbackData ? window.AppFallbackData.departments : [];
    const dept = deptList.find(d => d.code === currentDeptCode) || {
      name: "Information Technology",
      code: "IT",
      icon: "🌐",
      category: "Circuits & Computing",
      description: "Enterprise software engineering, cloud infrastructures, web technologies, and secure data systems."
    };

    // Department-filtered stats
    const allNotes = (window.AppFallbackData?.notes || []).filter(n => n.deptCode === currentDeptCode);
    const allQPs = (window.AppFallbackData?.questionPapers || []).filter(qp => qp.deptCode === currentDeptCode);
    const allRoles = (window.AppFallbackData?.jobRoles || []).filter(r => r.deptCode === currentDeptCode);
    const allProjects = (window.AppFallbackData?.projects || []).filter(p => p.deptCode === currentDeptCode);
    const deptSkillsCount = (window.DeptSkillsCertData?.[currentDeptCode]?.skills || []).length;
    const globalCertsCount = (window.AppFallbackData?.certifications || []).length;
    const totalCertsCount = globalCertsCount > 0 ? globalCertsCount : (deptSkillsCount > 0 ? deptSkillsCount : 18);

    container.innerHTML = `
      <!-- Department Hero Banner -->
      <section class="dept-hero">
        <div class="dept-hero-content">
          <div class="dept-hero-badges">
            <span class="dept-hero-badge">📜 ${currentReg}</span>
            <span class="dept-hero-badge">${dept.icon} ${dept.category}</span>
          </div>
          <h1 class="dept-hero-title">${dept.name}</h1>
          <p class="dept-hero-desc">${dept.description}</p>
          <div class="dept-hero-actions">
            <button class="btn btn-primary" id="dash-browse-notes-btn">
              📚 Explore Notes & Syllabus
            </button>
            <button class="btn btn-ghost" id="dash-change-dept-btn" style="color: #fff;">
              Switch Department ➔
            </button>
          </div>
        </div>
        <div class="dept-hero-mindset" style="max-width: 320px; background: rgba(255, 255, 255, 0.12); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 16px; padding: 16px 20px; color: #ffffff;">
          <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #a5f3fc; margin-bottom: 6px;">
            ✨ Daily Academic Focus
          </div>
          <div style="font-size: 0.88rem; font-style: italic; line-height: 1.5; margin-bottom: 8px;">
            "Live as if you were to die tomorrow. Learn as if you were to live forever."
          </div>
          <div style="font-size: 0.75rem; color: rgba(255, 255, 255, 0.85); font-weight: 700;">
            — Mahatma Gandhi
          </div>
        </div>
      </section>

      <!-- 🌟 INSPIRATIONAL STUDY QUOTES HERO & WELCOME MINDSET SHOWCASE 🌟 -->
      <section class="welcome-quotes-section" aria-label="Daily Inspirational Study Mindset">
        <div class="welcome-quotes-header">
          <div class="quotes-header-badge">
            <span>✨</span>
            <span>DAILY STUDY INSPIRATION &amp; ACADEMIC MINDSET</span>
          </div>
          <h2 class="quotes-header-title">Welcome to Your Academic &amp; Career Hub</h2>
          <p class="quotes-header-subtitle">
            Focus your energy, master one topic at a time, and build engineering excellence every day.
          </p>
        </div>

        <div class="study-quotes-grid">
          <!-- Quote Card 1: Mahatma Gandhi -->
          <div class="study-quote-card quote-featured">
            <div class="quote-card-header">
              <span class="quote-icon">📜</span>
              <span class="quote-author-badge">Mahatma Gandhi</span>
            </div>
            <blockquote class="quote-text">
              &ldquo;Live as if you were to die tomorrow. Learn as if you were to live forever.&rdquo;
            </blockquote>
            <div class="quote-footer">
              <span class="quote-author-name">&mdash; Mahatma Gandhi</span>
              <span class="quote-category-tag">Eternal Learning</span>
            </div>
          </div>

          <!-- Quote Card 2: Believe in Your Potential -->
          <div class="study-quote-card quote-potential">
            <div class="quote-card-header">
              <span class="quote-icon">💡</span>
              <span class="quote-badge-pill">Daily Focus</span>
            </div>
            <div class="quote-title">Believe in your potential:</div>
            <p class="quote-body">
              You don&rsquo;t need to master everything in one day; just master the single topic right in front of you.
            </p>
            <div class="quote-footer">
              <span class="quote-micro-tip">🎯 Step-by-step progress</span>
              <span class="quote-category-tag">Progressive Mastery</span>
            </div>
          </div>

          <!-- Quote Card 3: Push through the resistance -->
          <div class="study-quote-card quote-resistance">
            <div class="quote-card-header">
              <span class="quote-icon">🔥</span>
              <span class="quote-badge-pill resistance-pill">Unstoppable Drive</span>
            </div>
            <div class="quote-title">Push through the resistance:</div>
            <p class="quote-body">
              The hard work you do when you don&rsquo;t feel like studying is what truly separates you from the crowd.
            </p>
            <div class="quote-footer">
              <span class="quote-micro-tip">⚡ Discipline over motivation</span>
              <span class="quote-category-tag">Competitive Edge</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Department Leadership / HOD Profile Card -->
      <section style="margin-bottom: 26px;">
        <div class="card" style="padding: 22px 26px; border: 1.5px solid var(--border-color); border-radius: var(--radius-xl); background: var(--bg-surface); box-shadow: var(--shadow-sm); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
          <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
            <div style="width: 72px; height: 72px; border-radius: var(--radius-xl); background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; box-shadow: 0 8px 20px rgba(124, 58, 237, 0.25); flex-shrink: 0;">
              👨‍🏫
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                <span class="badge" style="background: rgba(124, 58, 237, 0.12); color: #7c3aed; font-weight: 700; font-size: 0.75rem;">
                  🏛️ Department Leadership
                </span>
                <span class="badge badge-success" style="font-size: 0.72rem;">Podhigai College of Engineering & Technology</span>
              </div>
              <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px 0;">
                Mr. G. Rajasekaran, HOD/IT
              </h2>
              <div style="font-size: 0.88rem; color: var(--text-secondary); font-weight: 600;">
                Head of the Department • Department of Information Technology
              </div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; display: flex; gap: 14px; flex-wrap: wrap;">
                <span>📧 hod.it@podhigai.edu.in</span>
                <span>•</span>
                <span>🏢 IT Department Block, Ground Floor</span>
                <span>•</span>
                <span>🎓 Anna University Affiliated</span>
              </div>
            </div>
          </div>

          <div style="max-width: 380px; padding: 12px 16px; background: var(--bg-subtle); border-radius: var(--radius-md); border-left: 4px solid #7c3aed; font-size: 0.82rem; line-height: 1.5; color: var(--text-secondary);">
            <em>"Welcome to our departmental learning portal. Make full use of the curriculum notes, university question papers, project blueprints, and career roadmaps curated for your academic and placement excellence."</em>
          </div>
        </div>
      </section>

      <!-- Department Statistics Metrics -->
      <section class="stats-grid" aria-label="Department Statistics">
        <div class="stat-card" id="stat-card-notes" role="button" tabindex="0" title="Click to view all ${allNotes.length} Lecture Notes & Units">
          <div class="stat-icon" style="background: var(--color-primary-50); color: var(--color-primary-600);">📚</div>
          <div class="stat-info">
            <span class="stat-value">${allNotes.length}</span>
            <span class="stat-label">Lecture Notes & Units</span>
          </div>
        </div>

        <div class="stat-card" id="stat-card-qps" role="button" tabindex="0" title="Click to view all ${allQPs.length} Past Question Papers">
          <div class="stat-icon" style="background: #ecfdf5; color: #059669;">📝</div>
          <div class="stat-info">
            <span class="stat-value">${allQPs.length}</span>
            <span class="stat-label">Past Question Papers</span>
          </div>
        </div>

        <div class="stat-card" id="stat-card-roles" role="button" tabindex="0" title="Click to view all ${allRoles.length} Mapped Job Roles">
          <div class="stat-icon" style="background: #eff6ff; color: #2563eb;">💼</div>
          <div class="stat-info">
            <span class="stat-value">${allRoles.length}</span>
            <span class="stat-label">Mapped Job Roles</span>
          </div>
        </div>

        <div class="stat-card" id="stat-card-projects" role="button" tabindex="0" title="Click to view all ${allProjects.length} Curated Project Ideas">
          <div class="stat-icon" style="background: #faf5ff; color: #9333ea;">💡</div>
          <div class="stat-info">
            <span class="stat-value">${allProjects.length}</span>
            <span class="stat-label">Curated Project Ideas</span>
          </div>
        </div>

        <div class="stat-card" id="stat-card-certs" role="button" tabindex="0" title="Click to view all ${totalCertsCount} Industry Certifications & Skills">
          <div class="stat-icon" style="background: #fffbeb; color: #d97706;">🏆</div>
          <div class="stat-info">
            <span class="stat-value">${totalCertsCount}</span>
            <span class="stat-label">Industry Certifications</span>
          </div>
        </div>
      </section>

      <!-- IDEA 1: SMART ACADEMIC HUB & INSTANT SEMESTER SELECTOR -->
      <section style="margin-bottom: 32px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--color-primary-600); letter-spacing: 0.08em; margin-bottom: 4px;">
              ⚡ Instant Semester Navigation
            </div>
            <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0;">
              Quick Academic Jump — All 8 Semesters
            </h2>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 2px;">
              Directly access syllabus, unit lecture notes (Units 1–5), and model question papers for ${dept.name} (${currentReg}).
            </p>
          </div>
          <button class="btn btn-secondary btn-sm" id="dash-all-semesters-btn">
            View Semester Directory ➔
          </button>
        </div>

        <!-- 8-Semester Quick Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; margin-bottom: 24px;">
          ${[1, 2, 3, 4, 5, 6, 7, 8].map(sem => {
            const yearNum = Math.ceil(sem / 2);
            return `
              <div class="card card-hoverable sem-quick-card" data-sem="${sem}" role="button" tabindex="0" style="padding: 14px 12px; text-align: center; cursor: pointer; border: 1.5px solid var(--border-color); border-radius: var(--radius-lg); transition: all 0.2s ease; background: var(--bg-surface);">
                <div style="font-size: 0.68rem; font-weight: 700; text-transform: uppercase; color: var(--color-primary-600); margin-bottom: 4px;">
                  Year ${yearNum}
                </div>
                <div style="font-size: 1.25rem; font-weight: 900; color: var(--text-primary); margin-bottom: 2px;">
                  Sem ${sem}
                </div>
                <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 8px;">
                  6 Subjects
                </div>
                <span class="badge badge-subtle" style="font-size: 0.65rem; padding: 2px 6px;">
                  Notes & QPs ➔
                </span>
              </div>
            `;
          }).join('')}
        </div>

        <!-- High-Yield / Trending Subjects Quick Access Bar -->
        <div class="card" style="padding: 18px 20px; border-radius: var(--radius-xl); border: 1.5px solid var(--border-color); background: var(--bg-surface);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.3rem;">🔥</span>
              <div>
                <strong style="font-size: 0.95rem; color: var(--text-primary);">High-Yield / Most Revised Subjects in ${dept.code}</strong>
                <div style="font-size: 0.78rem; color: var(--text-muted);">Curated lecture notes with instant in-browser PDF preview</div>
              </div>
            </div>
            <span class="badge badge-success" style="font-size: 0.72rem;">Anna University R2021/R2025</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px;">
            <div class="card" style="padding: 12px 14px; background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span class="badge badge-primary" style="font-size: 0.65rem;">Sem 3 • Core</span>
                  <span style="font-size: 0.72rem; color: var(--text-muted);">5 Units</span>
                </div>
                <strong style="font-size: 0.88rem; color: var(--text-primary); display: block; margin-bottom: 2px;">Data Structures & Algorithms</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Linear lists, trees, graphs, sorting & dynamic programming.</div>
              </div>
              <button class="btn btn-secondary btn-sm quick-sem-btn" data-sem="3" style="width: 100%; margin-top: 10px; font-size: 0.78rem; padding: 4px 8px;">
                Open Sem 3 Notes ➔
              </button>
            </div>

            <div class="card" style="padding: 12px 14px; background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span class="badge badge-primary" style="font-size: 0.65rem;">Sem 4 • Systems</span>
                  <span style="font-size: 0.72rem; color: var(--text-muted);">5 Units</span>
                </div>
                <strong style="font-size: 0.88rem; color: var(--text-primary); display: block; margin-bottom: 2px;">Operating Systems & Virtualization</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Processes, threads, memory paging, deadlocks & Linux kernel.</div>
              </div>
              <button class="btn btn-secondary btn-sm quick-sem-btn" data-sem="4" style="width: 100%; margin-top: 10px; font-size: 0.78rem; padding: 4px 8px;">
                Open Sem 4 Notes ➔
              </button>
            </div>

            <div class="card" style="padding: 12px 14px; background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span class="badge badge-primary" style="font-size: 0.65rem;">Sem 5 • Data</span>
                  <span style="font-size: 0.72rem; color: var(--text-muted);">5 Units</span>
                </div>
                <strong style="font-size: 0.88rem; color: var(--text-primary); display: block; margin-bottom: 2px;">Database Management Systems</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Relational models, SQL queries, normalization & indexing.</div>
              </div>
              <button class="btn btn-secondary btn-sm quick-sem-btn" data-sem="5" style="width: 100%; margin-top: 10px; font-size: 0.78rem; padding: 4px 8px;">
                Open Sem 5 Notes ➔
              </button>
            </div>

            <div class="card" style="padding: 12px 14px; background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span class="badge badge-primary" style="font-size: 0.65rem;">Sem 6 • AI/ML</span>
                  <span style="font-size: 0.72rem; color: var(--text-muted);">5 Units</span>
                </div>
                <strong style="font-size: 0.88rem; color: var(--text-primary); display: block; margin-bottom: 2px;">Artificial Intelligence & Neural Nets</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">Search algorithms, probabilistic reasoning & neural nets.</div>
              </div>
              <button class="btn btn-secondary btn-sm quick-sem-btn" data-sem="6" style="width: 100%; margin-top: 10px; font-size: 0.78rem; padding: 4px 8px;">
                Open Sem 6 Notes ➔
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- IDEA 2: CAREER SPOTLIGHT & INDUSTRY PLACEMENT READINESS -->
      <section style="margin-bottom: 32px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #059669; letter-spacing: 0.08em; margin-bottom: 4px;">
              🚀 Industry Placement & Career Acceleration
            </div>
            <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0;">
              ${dept.code} Career Spotlight & Industry Readiness
            </h2>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 2px;">
              Connecting classroom theory with industry salary benchmarks, roadmap milestones, and capstone project blueprints.
            </p>
          </div>
          <button class="btn btn-primary btn-sm" id="dash-view-all-roadmaps-btn">
            View All 68+ Roadmaps ➔
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px;">
          
          <!-- Career Role of the Month Spotlight Card -->
          <div class="card" style="padding: 22px; border-radius: var(--radius-xl); border: 1.5px solid rgba(16, 185, 129, 0.4); background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(6, 182, 212, 0.05)), var(--bg-surface); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #059669; font-weight: 700; font-size: 0.72rem;">
                  🌟 Career Spotlight • ${dept.code}
                </span>
                <span class="badge badge-success" style="font-size: 0.7rem; font-weight: 700;">
                  ₹8.5 - 18.0 LPA
                </span>
              </div>
              
              <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">
                Cloud & Full Stack AI Engineer
              </h3>
              <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
                High-demand modern role orchestrating serverless cloud backends, intelligent microservices, responsive web clients, and real-time LLM integration.
              </p>

              <div style="margin-bottom: 14px;">
                <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">
                  Core Skills & Tooling:
                </div>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  <span class="badge badge-subtle">React / Next.js</span>
                  <span class="badge badge-subtle">Node.js</span>
                  <span class="badge badge-subtle">Python</span>
                  <span class="badge badge-subtle">Docker</span>
                  <span class="badge badge-subtle">AWS Cloud</span>
                  <span class="badge badge-subtle">MongoDB</span>
                </div>
              </div>
            </div>

            <div style="border-top: 1px solid var(--border-subtle); padding-top: 14px; display: flex; gap: 10px;">
              <button class="btn btn-primary btn-sm" id="dash-open-spotlight-roadmap" style="flex: 1; text-align: center; justify-content: center;">
                🗺️ Start 4-Phase Roadmap ➔
              </button>
              <button class="btn btn-ghost btn-sm" id="dash-open-dept-roles" style="font-size: 0.8rem;">
                More Roles
              </button>
            </div>
          </div>

          <!-- Featured Capstone Project Blueprints Card -->
          <div class="card" style="padding: 22px; border-radius: var(--radius-xl); border: 1.5px solid rgba(139, 92, 246, 0.4); background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(244, 63, 94, 0.05)), var(--bg-surface); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <span class="badge" style="background: rgba(139, 92, 246, 0.15); color: #7c3aed; font-weight: 700; font-size: 0.72rem;">
                  💡 Final Year Capstone Blueprint
                </span>
                <span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #d97706; font-size: 0.7rem; font-weight: 700;">
                  Industry-Grade
                </span>
              </div>

              <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">
                Autonomous Campus Surveillance & IoT Analytics
              </h3>
              <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
                Edge AI vision pipeline detecting unauthorized access, real-time fire hazards, and environmental sensor telemetries with live dashboard alerting.
              </p>

              <div style="margin-bottom: 14px;">
                <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">
                  Recommended Tech Stack:
                </div>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  <span class="badge badge-subtle">OpenCV</span>
                  <span class="badge badge-subtle">YOLOv8</span>
                  <span class="badge badge-subtle">ESP32 / IoT</span>
                  <span class="badge badge-subtle">FastAPI</span>
                  <span class="badge badge-subtle">WebSockets</span>
                </div>
              </div>
            </div>

            <div style="border-top: 1px solid var(--border-subtle); padding-top: 14px; display: flex; gap: 10px;">
              <button class="btn btn-secondary btn-sm" id="dash-explore-projects-btn" style="flex: 1; text-align: center; justify-content: center;">
                💡 Browse 50+ Project Ideas ➔
              </button>
              <button class="btn btn-ghost btn-sm" id="dash-open-certifications-btn" style="font-size: 0.8rem;">
                Free Certs 🏆
              </button>
            </div>
          </div>

        </div>
      </section>

      <!-- Dedicated Anna University Academic Hub & Resource Gateways -->
      <section style="margin-bottom: 36px;">
        <div class="card" style="padding: 24px; border: 1.5px solid var(--border-color); border-radius: var(--radius-xl); background: var(--bg-surface); box-shadow: var(--shadow-sm);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="width: 52px; height: 52px; border-radius: var(--radius-lg); background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; box-shadow: 0 4px 14px rgba(124, 58, 237, 0.25);">
                🏛️
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                  <h2 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin: 0;">
                    Anna University Engineering Student Academic Portal
                  </h2>
                  <span class="badge badge-primary">Affiliated Institutional Hub</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 3px 0 0 0;">
                  Official Academic Curriculum, Regulations & Examination Portals for Podhigai College of Engineering & Technology
                </p>
              </div>
            </div>

            <!-- Regulation Switcher Pills -->
            <div style="display: flex; align-items: center; gap: 8px; background: var(--bg-subtle); padding: 4px; border-radius: var(--radius-full); border: 1px solid var(--border-color);">
              <button class="chip ${currentReg === 'R2021' ? 'active' : ''}" id="dash-switch-r2021" style="font-size: 0.78rem; padding: 4px 14px; font-weight: 700; cursor: pointer;">
                Regulation 2021
              </button>
              <button class="chip ${currentReg === 'R2025' ? 'active' : ''}" id="dash-switch-r2025" style="font-size: 0.78rem; padding: 4px 14px; font-weight: 700; cursor: pointer;">
                Regulation 2025
              </button>
            </div>
          </div>

          <!-- Academic Gateway Cards Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px;">
            <a href="https://cac.annauniv.edu" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 14px; background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: var(--radius-md); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              <div>
                <div style="font-size: 0.72rem; font-weight: 700; color: #7c3aed; text-transform: uppercase;">Official Curriculum</div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); margin: 4px 0;">Centre for Academic Courses (CAC)</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">Syllabus copies, course credits, and curriculum regulations for all branches.</div>
              </div>
              <div style="margin-top: 10px; font-size: 0.78rem; font-weight: 700; color: #7c3aed;">cac.annauniv.edu ↗</div>
            </a>

            <a href="https://coe1.annauniv.edu" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 14px; background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: var(--radius-md); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              <div>
                <div style="font-size: 0.72rem; font-weight: 700; color: #059669; text-transform: uppercase;">Examination Office</div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); margin: 4px 0;">Controller of Examinations (ACOE)</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">End-semester exam timetables, hall tickets, and grade revaluation portals.</div>
              </div>
              <div style="margin-top: 10px; font-size: 0.78rem; font-weight: 700; color: #059669;">coe1.annauniv.edu ↗</div>
            </a>

            <a href="https://onlinecourses.nptel.ac.in" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 14px; background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: var(--radius-md); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              <div>
                <div style="font-size: 0.72rem; font-weight: 700; color: #2563eb; text-transform: uppercase;">Credit Transfer</div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); margin: 4px 0;">NPTEL / SWAYAM MOOCs</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">Anna University approved online elective courses eligible for degree credit transfer.</div>
              </div>
              <div style="margin-top: 10px; font-size: 0.78rem; font-weight: 700; color: #2563eb;">nptel.ac.in ↗</div>
            </a>

            <a href="https://ndl.iitkgp.ac.in" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 14px; background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: var(--radius-md); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              <div>
                <div style="font-size: 0.72rem; font-weight: 700; color: #d97706; text-transform: uppercase;">Central Digital Library</div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); margin: 4px 0;">National Digital Library (NDLI)</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">Over 500,000 engineering textbooks, reference volumes, and conference papers.</div>
              </div>
              <div style="margin-top: 10px; font-size: 0.78rem; font-weight: 700; color: #d97706;">ndl.iitkgp.ac.in ↗</div>
            </a>
          </div>
        </div>
      </section>

      <!-- Department Software Tools & Free Licenses -->
      <section style="margin-bottom: 36px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h2 style="font-size: 1.35rem; font-weight: 700;">Essential ${dept.code} Software Tools & Free Licenses</h2>
            <p style="font-size: 0.8125rem; color: var(--text-muted);">Industry-standard software suites with free student access guides</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
          ${((window.AppFallbackData?.softwareTools || []).filter(t => t.deptCode === currentDeptCode)).map(tool => `
            <div class="card card-hoverable" style="padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <span class="badge badge-primary" style="font-size: 0.7rem;">${tool.category}</span>
                  <span class="badge badge-success" style="font-size: 0.65rem;">${tool.licenseType}</span>
                </div>
                <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${tool.name}</h3>
                <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">${tool.description}</p>
              </div>

              <a href="${tool.officialUrl}" target="_blank" class="btn btn-secondary btn-sm" style="text-decoration: none; text-align: center; width: 100%;">
                🌐 Official Software Site ➔
              </a>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Dashboard Columns: Recently Added & Career Insights -->
      <section class="dashboard-columns">
        <!-- Left: Recently Added Resources -->
        <div class="dashboard-panel">
          <div class="panel-header">
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 700;">Recently Added Resources</h3>
              <p style="font-size: 0.8125rem; color: var(--text-muted);">Latest materials uploaded by faculty members</p>
            </div>
            <button class="btn btn-ghost btn-sm" id="view-all-notes-btn">View All</button>
          </div>

          <div class="recent-list">
            ${(window.AppFallbackData?.notes || []).slice(0, 4).map(n => `
              <div class="recent-item">
                <div class="recent-item-meta">
                  <div class="recent-item-icon">📄</div>
                  <div>
                    <div class="recent-item-title">${n.title}</div>
                    <div class="recent-item-sub">${n.subjectName} (${n.subjectCode}) • Unit ${n.unit} • ${n.uploadedBy}</div>
                  </div>
                </div>
                <button class="btn btn-sm btn-secondary quick-preview-btn" data-title="${n.title}" data-file="${n.fileName}">
                  Preview
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: Recommended Skills & Tech Trends -->
        <div class="dashboard-panel">
          <div class="panel-header">
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 700;">Recommended for ${dept.code}</h3>
              <p style="font-size: 0.8125rem; color: var(--text-muted);">High-demand industry competencies</p>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="font-size: 0.9rem;">Cloud & Containerization</strong>
                <span class="badge badge-success">High Demand</span>
              </div>
              <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 8px;">
                Docker, Kubernetes, and AWS architecture are essential for modern software and systems engineering.
              </p>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span class="badge badge-subtle">AWS</span>
                <span class="badge badge-subtle">Docker</span>
                <span class="badge badge-subtle">Kubernetes</span>
              </div>
            </div>

            <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="font-size: 0.9rem;">Distributed Systems & Microservices</strong>
                <span class="badge badge-primary">Core Skill</span>
              </div>
              <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 8px;">
                REST APIs, event-driven message queues (Kafka), and gRPC service interconnects.
              </p>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span class="badge badge-subtle">Kafka</span>
                <span class="badge badge-subtle">Express/FastAPI</span>
                <span class="badge badge-subtle">Redis</span>
              </div>
            </div>

            <button class="btn btn-primary btn-sm" id="launch-skillmap-side-btn" style="width: 100%; margin-top: 6px;">
              Launch Personalized Skill Map ➔
            </button>
          </div>
        </div>
      </section>
    `;

    this.bindEvents();
  },

  bindEvents() {
    // Idea 1: Semester Quick Jump cards
    document.querySelectorAll('.sem-quick-card').forEach(card => {
      card.addEventListener('click', () => {
        const sem = parseInt(card.getAttribute('data-sem'), 10);
        window.appState.state.semester = sem;
        window.appState.setView('notes');
      });
    });

    // Idea 1: Quick Subject Note Buttons
    document.querySelectorAll('.quick-sem-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sem = parseInt(btn.getAttribute('data-sem'), 10);
        window.appState.state.semester = sem;
        window.appState.setView('notes');
      });
    });

    document.getElementById('dash-all-semesters-btn')?.addEventListener('click', () => {
      window.appState.setView('semester-select');
    });

    // Idea 2: Career Spotlight & Projects Buttons
    document.getElementById('dash-view-all-roadmaps-btn')?.addEventListener('click', () => {
      window.appState.setView('roadmaps');
    });
    document.getElementById('dash-open-spotlight-roadmap')?.addEventListener('click', () => {
      window.appState.setView('roadmaps');
    });
    document.getElementById('dash-open-dept-roles')?.addEventListener('click', () => {
      window.appState.setView('dept-roles');
    });
    document.getElementById('dash-explore-projects-btn')?.addEventListener('click', () => {
      window.appState.setView('projects');
    });
    document.getElementById('dash-open-certifications-btn')?.addEventListener('click', () => {
      window.appState.setView('certifications');
    });

    // Top Metrics Stat Card clicks
    document.getElementById('stat-card-notes')?.addEventListener('click', () => window.appState.setView('semester-select'));
    document.getElementById('stat-card-qps')?.addEventListener('click', () => window.appState.setView('question-papers'));
    document.getElementById('stat-card-roles')?.addEventListener('click', () => window.appState.setView('dept-roles'));
    document.getElementById('stat-card-projects')?.addEventListener('click', () => window.appState.setView('projects'));
    document.getElementById('stat-card-certs')?.addEventListener('click', () => window.appState.setView('certifications'));

    // Hero buttons
    document.getElementById('dash-browse-notes-btn')?.addEventListener('click', () => window.appState.setView('notes'));
    document.getElementById('dash-skill-map-btn')?.addEventListener('click', () => window.appState.setView('skill-map'));
    document.getElementById('dash-change-dept-btn')?.addEventListener('click', () => window.appState.setView('department-select'));

    // Anna University Regulation Switchers
    document.getElementById('dash-switch-r2021')?.addEventListener('click', () => {
      window.appState.setRegulation('R2021');
      this.render();
    });
    document.getElementById('dash-switch-r2025')?.addEventListener('click', () => {
      window.appState.setRegulation('R2025');
      this.render();
    });

    // Secondary buttons
    document.getElementById('view-all-notes-btn')?.addEventListener('click', () => window.appState.setView('notes'));
    document.getElementById('launch-skillmap-side-btn')?.addEventListener('click', () => window.appState.setView('skill-map'));

    // Quick preview buttons
    document.querySelectorAll('.quick-preview-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-title');
        const file = btn.getAttribute('data-file');
        window.PdfViewerModal.open({
          title,
          fileName: file,
          fileUrl: file,
          downloadCount: 482
        });
      });
    });
  }
};
