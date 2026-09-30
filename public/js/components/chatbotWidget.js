/**
 * Advanced AI Academic & Career Assistant Chatbot Widget
 * Anna University Student Portal
 * 
 * Deeply integrates with:
 * 1. Departmental Job Roles (Salary Benchmarks, Skills, Industry Tools)
 * 2. Skills & Free Certifications (Coursera, NPTEL, edX, Google, Microsoft)
 * 3. Job Role Roadmaps (Step-by-Step 4-Phase Learning Blueprints)
 * 4. Project Ideas (Mini, Final Year, AI/ML, IoT/Hardware, Industry-oriented)
 * 5. Syllabus & Unit-wise Lecture Notes (Unit 1 to 5)
 * 6. Previous Year Question Papers (Nov/Dec & April/May Exam Series)
 * 
 * Features:
 * - Natural Language Query Intelligence (English, Tamil & Tanglish query support)
 * - Interactive actionable cards rendered in chat with 1-click deep navigation
 * - Speech synthesis (Optional voice answer readout)
 * - Context-aware department detection (detects active branch)
 * - Quick prompt chips for instantaneous recommendations
 */

window.ChatbotWidget = {
  isOpen: false,
  isMaximized: false,
  isVoiceEnabled: false,
  messages: [],

  init() {
    // Prevent duplicate injection
    if (document.getElementById('chatbot-launcher-container')) return;

    this.injectStylesIfNeeded();
    this.render();
    this.bindEvents();
    this.addInitialGreeting();
  },

  injectStylesIfNeeded() {
    if (!document.getElementById('chatbot-stylesheet-link')) {
      const link = document.createElement('link');
      link.id = 'chatbot-stylesheet-link';
      link.rel = 'stylesheet';
      link.href = 'css/chatbot.css';
      document.head.appendChild(link);
    }
  },

  render() {
    const launcherContainer = document.createElement('div');
    launcherContainer.id = 'chatbot-launcher-container';

    launcherContainer.innerHTML = `
      <!-- Floating Launcher Button -->
      <button class="chat-launcher-btn" id="chat-launcher-btn" aria-label="Open AI Academic Assistant" title="Anna University AI Assistant">
        <span id="chat-launcher-icon">💬</span>
        <span class="chat-launcher-ping"></span>
        <span class="chat-launcher-tooltip">Ask AI Academic Assistant ✨</span>
      </button>

      <!-- Chatbot Main Window -->
      <div class="chatbot-window" id="chatbot-window" role="dialog" aria-modal="true" aria-label="AI Academic Assistant">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="chatbot-header-title">
            <div class="chatbot-avatar">🤖</div>
            <div class="chatbot-info">
              <h3>Anna University AI Guide</h3>
              <p>Academic & Career Assistant</p>
            </div>
          </div>

          <div class="chatbot-header-actions">
            <!-- Voice Toggle -->
            <button class="chat-btn-icon" id="chat-toggle-voice" title="Toggle Voice Readout" aria-label="Toggle voice">
              <span id="chat-voice-icon">🔇</span>
            </button>

            <!-- Clear Chat -->
            <button class="chat-btn-icon" id="chat-clear-history" title="Clear Conversation" aria-label="Clear chat">
              🗑️
            </button>

            <!-- Close Button -->
            <button class="chat-btn-icon" id="chat-close-btn" title="Close Assistant" aria-label="Close">
              ✕
            </button>
          </div>
        </div>

        <!-- Quick Topics Bar -->
        <div class="chatbot-chips-bar" id="chat-quick-chips">
          <button class="chat-quick-chip" data-prompt="Show job roles and salaries for my department">💼 Job Roles</button>
          <button class="chat-quick-chip" data-prompt="Show career learning roadmaps">🗺️ Roadmaps</button>
          <button class="chat-quick-chip" data-prompt="Suggest final year and mini project ideas">💡 Project Ideas</button>
          <button class="chat-quick-chip" data-prompt="Show free online certifications with verified badges">🏆 Certifications</button>
          <button class="chat-quick-chip" data-prompt="Help me find lecture notes and syllabus">📚 Subject Notes</button>
          <button class="chat-quick-chip" data-prompt="Show previous year university question papers">📝 Past QPs</button>
        </div>

        <!-- Messages Region -->
        <div class="chatbot-messages" id="chat-messages-container" tabindex="0"></div>

        <!-- Input Bar -->
        <form class="chatbot-input-bar" id="chat-form">
          <input 
            type="text" 
            id="chat-user-input" 
            class="chatbot-input" 
            placeholder="Ask about notes, roles, roadmaps, projects..." 
            autocomplete="off"
            aria-label="Ask AI Assistant"
          >
          <button type="submit" class="chatbot-send-btn" id="chat-send-btn" aria-label="Send message" title="Send message">
            ➤
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(launcherContainer);
  },

  bindEvents() {
    const launcherBtn = document.getElementById('chat-launcher-btn');
    const closeBtn = document.getElementById('chat-close-btn');
    const clearBtn = document.getElementById('chat-clear-history');
    const voiceBtn = document.getElementById('chat-toggle-voice');
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-user-input');
    const chipsBar = document.getElementById('chat-quick-chips');

    launcherBtn?.addEventListener('click', () => this.toggleChat());
    closeBtn?.addEventListener('click', () => this.toggleChat(false));
    clearBtn?.addEventListener('click', () => this.clearChat());

    voiceBtn?.addEventListener('click', () => {
      this.isVoiceEnabled = !this.isVoiceEnabled;
      const icon = document.getElementById('chat-voice-icon');
      if (icon) icon.textContent = this.isVoiceEnabled ? '🔊' : '🔇';
      if (window.Toast) {
        window.Toast.show(this.isVoiceEnabled ? 'Voice readout enabled 🔊' : 'Voice readout muted 🔇', 'info');
      }
    });

    chipsBar?.addEventListener('click', (e) => {
      const chip = e.target.closest('.chat-quick-chip');
      if (chip) {
        const prompt = chip.dataset.prompt;
        if (prompt) this.handleUserMessage(prompt);
      }
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      input.value = '';
      this.handleUserMessage(val);
    });
  },

  toggleChat(forceState) {
    this.isOpen = typeof forceState === 'boolean' ? forceState : !this.isOpen;
    const win = document.getElementById('chatbot-window');
    const icon = document.getElementById('chat-launcher-icon');

    if (win) {
      if (this.isOpen) {
        win.classList.add('open');
        if (icon) icon.textContent = '✕';
        setTimeout(() => document.getElementById('chat-user-input')?.focus(), 250);
      } else {
        win.classList.remove('open');
        if (icon) icon.textContent = '💬';
      }
    }
  },

  clearChat() {
    this.messages = [];
    const container = document.getElementById('chat-messages-container');
    if (container) container.innerHTML = '';
    this.addInitialGreeting();
    if (window.Toast) window.Toast.show('Conversation cleared', 'info');
  },

  addInitialGreeting() {
    const state = window.appState ? window.appState.state : {};
    const deptCode = state.department || 'IT';
    const regCode = state.regulation || 'R2021';
    const deptObj = (window.AppFallbackData?.departments || []).find(d => d.code === deptCode);
    const deptName = deptObj ? deptObj.name : 'Engineering';

    const greetingHtml = `
      <div>
        <p style="margin: 0 0 6px 0;">
          <strong>Vanakkam! 👋 Welcome to Anna University Student Portal!</strong>
        </p>
        <p style="margin: 0 0 8px 0;">
          I am your Anna University AI Academic & Career Assistant. I have live access to all <strong>68 Engineering Departments</strong>, syllabus notes, question papers, departmental roles, project ideas, and career roadmaps.
        </p>
        <div style="background: rgba(124, 58, 237, 0.08); padding: 8px 12px; border-radius: 8px; border-left: 3px solid #7c3aed; font-size: 0.8rem; margin-bottom: 8px;">
          Active Branch: <strong>${deptName} (${deptCode})</strong> • Regulation: <strong>${regCode}</strong>
        </div>
        <p style="margin: 0; font-size: 0.8rem; color: #64748b;">
          Click any quick chip above or type in English / தமிழ் (e.g. <em>"CSE projects", "Cloud notes", "Full Stack roadmap"</em>)!
        </p>
      </div>
    `;

    this.appendMessage('bot', greetingHtml, false);
  },

  appendMessage(sender, textOrHtml, isUser = false) {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgDiv.innerHTML = `
      <div class="chat-msg-avatar">${isUser ? '👤' : '🤖'}</div>
      <div class="chat-msg-bubble">
        <div>${textOrHtml}</div>
        <div class="chat-msg-time">${timeStr}</div>
      </div>
    `;

    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;

    // Optional Speech Synthesis
    if (!isUser && this.isVoiceEnabled && window.speechSynthesis) {
      try {
        const plainText = msgDiv.innerText.replace(/[\n\r]+/g, ' ').slice(0, 180);
        const utterance = new SpeechSynthesisUtterance(plainText);
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    }
  },

  showTypingIndicator() {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    const typingDiv = document.createElement('div');
    typingDiv.id = 'chat-typing-indicator';
    typingDiv.className = 'chat-msg bot';
    typingDiv.innerHTML = `
      <div class="chat-msg-avatar">🤖</div>
      <div class="chat-typing-dots">
        <span class="chat-typing-dot"></span>
        <span class="chat-typing-dot"></span>
        <span class="chat-typing-dot"></span>
      </div>
    `;
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
  },

  hideTypingIndicator() {
    const typing = document.getElementById('chat-typing-indicator');
    if (typing) typing.remove();
  },

  async handleUserMessage(query) {
    // Render user message
    this.appendMessage('user', this.escapeHtml(query), true);

    // Show typing
    this.showTypingIndicator();

    // Natural responsive delay
    setTimeout(() => {
      this.hideTypingIndicator();
      const responseHtml = this.generateResponse(query);
      this.appendMessage('bot', responseHtml, false);
    }, 450);
  },

  generateResponse(query) {
    const q = query.toLowerCase().trim();
    const state = window.appState ? window.appState.state : {};
    const currentDeptCode = state.department || 'IT';
    let targetDept = currentDeptCode;

    // Detect if user is asking about a specific department
    const depts = window.AppFallbackData?.departments || [];
    const foundDept = depts.find(d => 
      q.includes(d.code.toLowerCase()) || 
      q.includes(d.name.toLowerCase()) ||
      (d.name.toLowerCase().includes('computer') && (q.includes('cse') || q.includes('computer'))) ||
      (d.name.toLowerCase().includes('information') && (q.includes('it') || q.includes('info tech'))) ||
      (d.name.toLowerCase().includes('mechanical') && (q.includes('mech') || q.includes('mechanical'))) ||
      (d.name.toLowerCase().includes('civil') && q.includes('civil')) ||
      (d.name.toLowerCase().includes('electrical') && (q.includes('eee') || q.includes('electrical'))) ||
      (d.name.toLowerCase().includes('electronics') && (q.includes('ece') || q.includes('electronics'))) ||
      (d.name.toLowerCase().includes('artificial') && (q.includes('ai') || q.includes('aids')))
    );
    if (foundDept) {
      targetDept = foundDept.code;
    }

    // ── 0. PORTAL & HOD DETAILS ───────────────────────────────────────────
    if (q.includes('hod') || q.includes('rajasekaran') || q.includes('principal') || q.includes('college') || q.includes('creator') || q.includes('varshini') || q.includes('head of department')) {
      return `
        <div>
          <div style="font-weight: 700; color: #7c3aed; margin-bottom: 6px;">
            🏛️ Anna University Student Portal
          </div>
          <div style="background: #f5f3ff; border: 1px solid #ede9fe; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.83rem;">
            <div>👨‍🏫 <strong>Head of Department (IT):</strong> Mr. G. Rajasekaran, HOD/IT</div>
            <div style="margin-top: 4px;">🎓 <strong>Affiliation:</strong> Anna University, Chennai</div>
            <div style="margin-top: 4px;">💻 <strong>Portal Architect:</strong> Vijayavarshini</div>
          </div>
          <p style="font-size: 0.82rem; color: #475569; margin: 0 0 10px 0;">
            This centralized portal serves students across all <strong>68 Engineering Departments</strong> with verified notes, university question papers, and career blueprints.
          </p>
          <button class="chat-card-btn" style="width: 100%;" onclick="window.appState.setView('dashboard'); window.ChatbotWidget.toggleChat(false);">
            🏛️ View Dashboard & HOD Portal ➔
          </button>
        </div>
      `;
    }

    // ── 1. DEPARTMENTAL JOB ROLES & SALARIES ────────────────────────────────
    if (q.includes('job') || q.includes('role') || q.includes('career') || q.includes('salary') || q.includes('lpa') || q.includes('velai') || q.includes('roles') || q.includes('sambalam') || q.includes('placement') || q.includes('package')) {
      const allRoles = window.DepartmentalRolesData || window.AppFallbackData?.jobRoles || [];
      const deptRoles = allRoles.filter(r => (r.deptCode || '').toUpperCase() === targetDept.toUpperCase());
      const displayRoles = deptRoles.length > 0 ? deptRoles.slice(0, 4) : allRoles.slice(0, 4);

      return `
        <div>
          <div style="font-weight: 700; color: #059669; margin-bottom: 6px;">
            💼 Official Industry Career Roles (${targetDept}):
          </div>
          <p style="margin: 0 0 10px 0; font-size: 0.82rem; color: #475569;">
            Curated engineering career paths mapped to <strong>${targetDept}</strong> with compensation benchmarks:
          </p>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${displayRoles.map(r => `
              <div class="chat-card">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <span class="chat-card-title">${r.roleTitle || r.title}</span>
                  <span style="font-size: 0.7rem; font-weight: 800; color: #059669; background: #d1fae5; padding: 2px 6px; border-radius: 4px;">
                    ${r.salaryBenchmark || r.avgSalaryRange || '₹6 - 18 LPA'}
                  </span>
                </div>
                <div class="chat-card-desc">${(r.shortOverview || r.overview || '').slice(0, 110)}...</div>
                <div style="display: flex; gap: 6px; margin-top: 4px;">
                  <button class="chat-card-btn" onclick="window.appState.setView('dept-roles'); window.ChatbotWidget.toggleChat(false);">
                    Explore in Page 1: Roles ➔
                  </button>
                  <button class="chat-card-btn" style="background: #2563eb;" onclick="window.appState.setView('roadmaps'); window.ChatbotWidget.toggleChat(false);">
                    View Roadmap ➔
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // ── 2. CAREER LEARNING ROADMAPS ─────────────────────────────────────────
    if (q.includes('roadmap') || q.includes('phase') || q.includes('how to become') || q.includes('pathway') || q.includes('step by step') || q.includes('blueprint') || q.includes('vali') || q.includes('route')) {
      const roadmaps = window.CareerRoadmapsData || [];
      const match = roadmaps.find(rm => 
        (rm.deptCode && rm.deptCode.toUpperCase() === targetDept.toUpperCase()) || 
        q.includes(rm.roleTitle.toLowerCase()) || 
        q.includes(rm.deptCode.toLowerCase())
      ) || roadmaps[0];

      if (match) {
        return `
          <div>
            <div style="font-weight: 700; color: #2563eb; margin-bottom: 6px;">
              🗺️ 4-Phase Learning Roadmap: <strong>${match.roleTitle} (${targetDept})</strong>
            </div>
            <p style="margin: 0 0 10px 0; font-size: 0.82rem; color: #475569;">
              Step-by-step career blueprint approved by <strong>Mr. G. Rajasekaran, HOD/IT</strong>:
            </p>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              ${(match.phases || []).map(p => `
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
                  <div style="font-size: 0.78rem; font-weight: 700; color: #1e293b;">
                    ${p.phase}: ${p.title} <span style="color: #64748b; font-weight: 500;">(${p.duration})</span>
                  </div>
                  <div style="font-size: 0.72rem; color: #64748b; margin-top: 2px;">
                    Focus: ${(p.topics || []).slice(0, 3).join(', ')}
                  </div>
                </div>
              `).join('')}
            </div>
            <div style="margin-top: 10px;">
              <button class="chat-card-btn" style="width: 100%;" onclick="window.appState.setView('roadmaps'); window.ChatbotWidget.toggleChat(false);">
                📋 Open Full A4 Interactive Roadmap Blueprint ➔
              </button>
            </div>
          </div>
        `;
      }

      return `
        <div>
          <div style="font-weight: 700; color: #2563eb; margin-bottom: 6px;">
            🗺️ Departmental Career Roadmaps (${targetDept})
          </div>
          <p style="font-size: 0.85rem; color: #475569; margin-bottom: 10px;">
            Explore sequential 4-phase learning roadmaps with required skills, milestones, and A4 printable blueprints for your branch!
          </p>
          <button class="chat-card-btn" style="width: 100%;" onclick="window.appState.setView('roadmaps'); window.ChatbotWidget.toggleChat(false);">
            Open Career Roadmaps Section ➔
          </button>
        </div>
      `;
    }

    // ── 3. PROJECT IDEAS (MINI, CAPSTONE, AI/ML, IOT) ───────────────────────
    if (q.includes('project') || q.includes('mini') || q.includes('capstone') || q.includes('final year') || q.includes('idea') || q.includes('hardware') || q.includes('iot')) {
      let deptProjects = [];
      if (window.FinalYearProjectsData && window.FinalYearProjectsData[targetDept]) {
        deptProjects = window.FinalYearProjectsData[targetDept].projects || [];
      }
      if (deptProjects.length === 0 && window.ProjectIdeasData) {
        deptProjects = window.ProjectIdeasData.filter(p => p.deptCode === targetDept);
      }
      if (deptProjects.length === 0 && window.FinalYearProjectsData && window.FinalYearProjectsData[currentDeptCode]) {
        deptProjects = window.FinalYearProjectsData[currentDeptCode].projects || [];
      }
      const topProjects = deptProjects.slice(0, 3);

      return `
        <div>
          <div style="font-weight: 700; color: #d97706; margin-bottom: 6px;">
            💡 Curated Engineering Project Ideas (${targetDept}):
          </div>
          <p style="margin: 0 0 10px 0; font-size: 0.82rem; color: #475569;">
            Approved capstone and mini project concepts spanning AI/ML, IoT, Cloud, and Software:
          </p>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${(topProjects.length > 0 ? topProjects : [
              { title: 'Smart Industrial Telemetry & Edge AI Monitoring', techStack: ['Python', 'TensorFlow Lite', 'ESP32', 'MQTT'], difficultyLevel: 'Intermediate' },
              { title: 'Decentralized Academic Credential Verification System', techStack: ['Node.js', 'Solidity', 'IPFS', 'Express'], difficultyLevel: 'Advanced' }
            ]).map(p => `
              <div class="chat-card">
                <div class="chat-card-title">${p.title || p.projectTitle}</div>
                <div class="chat-card-desc">
                  Tech Stack: <strong>${(p.technologies || p.techStack || []).slice(0, 4).join(', ')}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                  <span style="font-size: 0.68rem; font-weight: 700; color: #d97706; background: #fef3c7; padding: 2px 6px; border-radius: 4px;">
                    ${p.difficultyLevel || 'Intermediate'}
                  </span>
                  <button class="chat-card-btn" style="background: #d97706;" onclick="window.appState.setView('projects'); window.ChatbotWidget.toggleChat(false);">
                    View in Projects Hub ➔
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
          <div style="margin-top: 10px;">
            <button class="chat-card-btn" style="width: 100%; background: #d97706;" onclick="window.appState.setView('projects'); window.ChatbotWidget.toggleChat(false);">
              💡 Explore All Project Tracks (Mini, Final Year, IoT) ➔
            </button>
          </div>
        </div>
      `;
    }

    // ── 4. FREE CERTIFICATIONS & SKILLS ─────────────────────────────────────
    if (q.includes('certif') || q.includes('skill') || q.includes('course') || q.includes('free') || q.includes('nptel') || q.includes('coursera') || q.includes('badge')) {
      const allCerts = window.SkillsCertificationsData || window.AppFallbackData?.certifications || [];
      const topCerts = allCerts.slice(0, 3);

      return `
        <div>
          <div style="font-weight: 700; color: #7c3aed; margin-bottom: 6px;">
            🏆 100% Free Industry Certifications & Skill Paths:
          </div>
          <p style="margin: 0 0 10px 0; font-size: 0.82rem; color: #475569;">
            Verified credentials recognized for Anna University honors and campus placements:
          </p>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${topCerts.map(c => `
              <div class="chat-card">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <span class="chat-card-title">${c.title || c.skillName}</span>
                  <span style="font-size: 0.68rem; font-weight: 700; color: #7c3aed; background: #ede9fe; padding: 2px 6px; border-radius: 4px;">
                    ${c.provider || 'Verified Platform'}
                  </span>
                </div>
                <div class="chat-card-desc">Domain: ${c.category || 'Engineering Core'} • Level: ${c.level || 'All Levels'}</div>
                <div style="display: flex; gap: 6px; margin-top: 4px;">
                  <a href="${c.portalUrl || c.officialUrl || 'https://onlinecourses.nptel.ac.in'}" target="_blank" rel="noopener noreferrer" class="chat-card-btn" style="text-decoration: none;">
                    Enroll on Portal ↗
                  </a>
                  <button class="chat-card-btn" style="background: #475569;" onclick="window.appState.setView('certifications'); window.ChatbotWidget.toggleChat(false);">
                    View All in Page 3 ➔
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
          <div style="margin-top: 10px;">
            <button class="chat-card-btn" style="width: 100%;" onclick="window.appState.setView('certifications'); window.ChatbotWidget.toggleChat(false);">
              🏆 Open Skills & Certifications Hub (Page 3) ➔
            </button>
          </div>
        </div>
      `;
    }

    // ── 5. PREVIOUS YEAR QUESTION PAPERS ────────────────────────────────────
    if (q.includes('question') || q.includes('qp') || q.includes('past paper') || q.includes('exam paper') || q.includes('nov dec') || q.includes('april may')) {
      return `
        <div>
          <div style="font-weight: 700; color: #059669; margin-bottom: 6px;">
            📝 Anna University Previous Year Question Papers:
          </div>
          <p style="margin: 0 0 10px 0; font-size: 0.82rem; color: #475569;">
            Past university end-semester exam papers organized by academic year (Nov/Dec 2024, April/May 2024, 2023, 2022) with marking schemes:
          </p>
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.82rem;">
            📌 <strong>Marking Scheme:</strong> Part A (10 × 2 = 20), Part B (5 × 13 = 65), Part C (1 × 15 = 15).
          </div>
          <button class="chat-card-btn" style="width: 100%; background: #059669;" onclick="window.appState.setView('question-papers'); window.ChatbotWidget.toggleChat(false);">
            📝 Open Question Papers Archive ➔
          </button>
        </div>
      `;
    }

    // ── 6. NOTES, SYLLABUS & SUBJECTS ───────────────────────────────────────
    if (q.includes('note') || q.includes('syllabus') || q.includes('subject') || q.includes('unit') || q.includes('textbook') || q.includes('lab') || q.includes('book')) {
      // Find matching subject if query mentions a subject code or name
      const allSubjects = window.AppFallbackData?.subjects || [];
      const matchingSub = allSubjects.find(s => 
        q.includes(s.code.toLowerCase()) || 
        (s.name && q.includes(s.name.toLowerCase()))
      );

      if (matchingSub) {
        return `
          <div>
            <div style="font-weight: 700; color: #7c3aed; margin-bottom: 6px;">
              📚 Found Course: ${matchingSub.name} (${matchingSub.code})
            </div>
            <p style="margin: 0 0 10px 0; font-size: 0.82rem; color: #475569;">
              Semester ${matchingSub.semester} • ${matchingSub.credits} Credits • Regulation ${matchingSub.regCode || currentReg}
            </p>
            <div style="background: #f5f3ff; border: 1px solid #ede9fe; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.82rem;">
              ✓ Unit 1 to Unit 5 Syllabus Notes<br>
              ✓ Prescribed Reference Textbooks (T1, T2)<br>
              ✓ Practical Lab Manual Experiments
            </div>
            <button class="chat-card-btn" style="width: 100%;" onclick="window.appState.setView('notes', { semester: ${matchingSub.semester}, subjectId: '${matchingSub.id || matchingSub.code}', subjectCode: '${matchingSub.code}' }); window.ChatbotWidget.toggleChat(false);">
              📖 Open Notes & Syllabus for ${matchingSub.code} ➔
            </button>
          </div>
        `;
      }

      const deptSubs = allSubjects.filter(s => (s.deptCode || '').toUpperCase() === targetDept.toUpperCase()).slice(0, 3);
      return `
        <div>
          <div style="font-weight: 700; color: #7c3aed; margin-bottom: 6px;">
            📚 Course Materials & Lecture Notes (${targetDept}):
          </div>
          <p style="margin: 0 0 10px 0; font-size: 0.82rem; color: #475569;">
            Full curriculum coverage for Semester 1 to 8 in <strong>${targetDept}</strong> with instant interactive A4 reader preview (NO 404 errors):
          </p>
          ${deptSubs.length > 0 ? `
            <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px;">
              ${deptSubs.map(s => `
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 10px; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.78rem; font-weight: 600;">${s.code} - ${(s.name || '').slice(0, 24)}...</span>
                  <button class="chat-card-btn" style="padding: 3px 8px; font-size: 0.7rem;" onclick="window.appState.setView('notes', { semester: ${s.semester}, subjectId: '${s.id || s.code}', subjectCode: '${s.code}' }); window.ChatbotWidget.toggleChat(false);">
                    Open Notes ➔
                  </button>
                </div>
              `).join('')}
            </div>
          ` : ''}
          <button class="chat-card-btn" style="width: 100%;" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
            📚 Open Course Materials & Digital Learning ➔
          </button>
        </div>
      `;
    }

    // ── 7. ANNA UNIVERSITY / REGULATION 2021 VS 2025 ────────────────────────
    if (q.includes('regulation') || q.includes('r2021') || q.includes('r2025') || q.includes('anna university') || q.includes('cac') || q.includes('acoe')) {
      return `
        <div>
          <div style="font-weight: 700; color: #4f46e5; margin-bottom: 6px;">
            🏛️ Anna University Regulation Support:
          </div>
          <div style="font-size: 0.82rem; color: #475569; line-height: 1.5; margin-bottom: 10px;">
            • <strong>Regulation 2021:</strong> Established curriculum with 2,305+ subjects across all 68 departments.<br>
            • <strong>Regulation 2025:</strong> Modernized framework focusing on AI integration, sustainability, and modular industry credits.
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="chat-card-btn" onclick="window.appState.setRegulation('R2021'); window.ChatbotWidget.toggleChat(false); window.location.reload();">
              Switch to R2021 ➔
            </button>
            <button class="chat-card-btn" style="background: #4f46e5;" onclick="window.appState.setRegulation('R2025'); window.ChatbotWidget.toggleChat(false); window.location.reload();">
              Switch to R2025 ➔
            </button>
          </div>
        </div>
      `;
    }

    // ── 8. INTELLIGENT FALLBACK / GENERAL HELPER ─────────────────────────────
    return `
      <div>
        <p style="margin: 0 0 8px 0;">
          I can assist you with all academic and career resources for <strong>${currentDeptCode}</strong>:
        </p>
        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.82rem; margin-bottom: 10px;">
          <div>💼 <strong>Job Roles:</strong> Ask <em>"What jobs are in my department?"</em></div>
          <div>🗺️ <strong>Roadmaps:</strong> Ask <em>"Show roadmap for software engineer"</em></div>
          <div>💡 <strong>Projects:</strong> Ask <em>"Give me final year project ideas"</em></div>
          <div>🏆 <strong>Certifications:</strong> Ask <em>"Free online certifications"</em></div>
          <div>📚 <strong>Notes:</strong> Ask <em>"Notes for CS3351"</em> or <em>"Syllabus"</em></div>
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button class="chat-card-btn" onclick="window.appState.setView('dashboard'); window.ChatbotWidget.toggleChat(false);">
            🏛️ Go to Dashboard
          </button>
          <button class="chat-card-btn" style="background: #2563eb;" onclick="window.appState.setView('dept-roles'); window.ChatbotWidget.toggleChat(false);">
            💼 Page 1: Roles
          </button>
          <button class="chat-card-btn" style="background: #d97706;" onclick="window.appState.setView('projects'); window.ChatbotWidget.toggleChat(false);">
            💡 Page 2: Projects
          </button>
        </div>
      </div>
    `;
  },

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};
