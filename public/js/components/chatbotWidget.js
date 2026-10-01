/**
 * Advanced AI Academic & Career Assistant Chatbot Widget
 * Anna University Student Portal
 * 
 * Features:
 * - True Widescreen 2-Column Landscape Mode Workspace
 * - Voice Input (Microphone Speech-to-Text via Web Speech Recognition)
 * - Voice Output (Natural Text-to-Speech Readout via SpeechSynthesis)
 * - Academic Book References: Live Google Books & Internet Archive (Archive.org)
 * - Research Literature: Live Google Scholar & IEEE Xplore Digital Library
 * - Prescribed Anna University Textbooks (T1, T2) & References (R1, R2)
 * - Dynamic Active Branch & Regulation Synchronization
 */

window.ChatbotWidget = {
  isOpen: false,
  isVoiceEnabled: false,
  isListening: false,
  recognition: null,
  messages: [],

  init() {
    if (document.getElementById('chatbot-launcher-container')) return;

    this.injectStylesIfNeeded();
    this.render();
    this.initSpeechRecognition();
    this.bindEvents();
    this.addInitialGreeting();
    this.updateActiveDeptDisplay();
  },

  injectStylesIfNeeded() {
    let link = document.getElementById('chatbot-stylesheet-link');
    if (!link) {
      link = document.createElement('link');
      link.id = 'chatbot-stylesheet-link';
      link.rel = 'stylesheet';
      link.href = 'css/chatbot.css?v=landscape_voice_books_v4';
      document.head.appendChild(link);
    } else {
      link.href = 'css/chatbot.css?v=landscape_voice_books_v4';
    }
  },

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.recognition = null;
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-IN'; // Default Indian English / Tamil context

      this.recognition.onstart = () => {
        this.isListening = true;
        const micBtn = document.getElementById('chat-mic-btn');
        const input = document.getElementById('chat-user-input');
        if (micBtn) {
          micBtn.classList.add('listening');
          micBtn.innerHTML = '🔴';
          micBtn.title = 'Listening... Speak now 🎙️';
        }
        if (input) {
          input.placeholder = '🎙️ Listening... Speak your academic question now...';
        }
        if (window.Toast) window.Toast.show('Microphone listening... Speak now 🎙️', 'info');
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('chat-user-input');
        if (input) {
          input.value = transcript;
        }
        this.stopListening();
        if (transcript.trim()) {
          this.handleUserMessage(transcript);
        }
      };

      this.recognition.onerror = (event) => {
        this.stopListening();
        if (event.error !== 'no-speech' && window.Toast) {
          window.Toast.show(`Voice input: ${event.error}`, 'warning');
        }
      };

      this.recognition.onend = () => {
        this.stopListening();
      };
    } catch (e) {
      this.recognition = null;
    }
  },

  toggleSpeechRecognition() {
    if (!this.recognition) {
      if (window.Toast) {
        window.Toast.show('Speech recognition is not supported in this browser. Please use Chrome/Edge or type your question.', 'warning');
      }
      return;
    }

    if (this.isListening) {
      this.stopListening();
    } else {
      try {
        this.recognition.start();
      } catch (err) {
        this.recognition.stop();
        setTimeout(() => this.recognition.start(), 200);
      }
    }
  },

  stopListening() {
    this.isListening = false;
    const micBtn = document.getElementById('chat-mic-btn');
    const input = document.getElementById('chat-user-input');
    if (micBtn) {
      micBtn.classList.remove('listening');
      micBtn.innerHTML = '🎤';
      micBtn.title = 'Speak Question (Voice Input)';
    }
    if (input) {
      input.placeholder = 'Ask in English or Tamil (e.g. "Cloud notes", "Google Books", "IEEE papers")...';
    }
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
  },

  render() {
    const launcherContainer = document.createElement('div');
    launcherContainer.id = 'chatbot-launcher-container';

    launcherContainer.innerHTML = `
      <!-- Fullscreen Dimming Backdrop Overlay -->
      <div class="chatbot-backdrop" id="chatbot-backdrop" aria-hidden="true"></div>

      <!-- Floating Launcher Button with Futuristic Robot Logo -->
      <button class="chat-launcher-btn" id="chat-launcher-btn" aria-label="Open Anna University AI Robo Guide" title="Anna University AI Robo Assistant">
        <span id="chat-launcher-icon" class="chat-robo-icon">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="2" x2="12" y2="5"></line>
            <circle cx="12" cy="2" r="1.5" fill="#38bdf8" stroke="#38bdf8"></circle>
            <rect x="4" y="5" width="16" height="13" rx="4" fill="rgba(255, 255, 255, 0.2)" stroke="#ffffff"></rect>
            <circle cx="9" cy="10" r="1.75" fill="#38bdf8" stroke="#38bdf8"></circle>
            <circle cx="15" cy="10" r="1.75" fill="#38bdf8" stroke="#38bdf8"></circle>
            <path d="M8.5 14.5c1 .8 2.5 1.2 3.5 1.2s2.5-.4 3.5-1.2" stroke="#ffffff" stroke-width="1.8"></path>
            <line x1="2" y1="11.5" x2="4" y2="11.5"></line>
            <line x1="20" y1="11.5" x2="22" y2="11.5"></line>
          </svg>
        </span>
        <span class="chat-launcher-ping"></span>
        <span class="chat-launcher-tooltip">Ask AI Robo Guide 🤖 (Voice &amp; Books)</span>
      </button>

      <!-- Chatbot Main Window: True Landscape 2-Column Split Workspace -->
      <div class="chatbot-window" id="chatbot-window" role="dialog" aria-modal="true" aria-label="Anna University AI Robo Guide">
        
        <!-- LEFT COLUMN: Landscape Navigator & Quick Knowledge Sidebar -->
        <aside class="chatbot-landscape-sidebar">
          <!-- Brand Header -->
          <div class="chatbot-sidebar-brand">
            <div class="robo-avatar-glow">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="2" x2="12" y2="5"></line>
                <circle cx="12" cy="2" r="1.5" fill="#38bdf8" stroke="#38bdf8"></circle>
                <rect x="4" y="5" width="16" height="13" rx="4" fill="rgba(255, 255, 255, 0.25)" stroke="#ffffff"></rect>
                <circle cx="9" cy="10" r="1.75" fill="#38bdf8" stroke="#38bdf8"></circle>
                <circle cx="15" cy="10" r="1.75" fill="#38bdf8" stroke="#38bdf8"></circle>
                <path d="M8.5 14.5c1 .8 2.5 1.2 3.5 1.2s2.5-.4 3.5-1.2" stroke="#ffffff" stroke-width="1.8"></path>
                <line x1="2" y1="11.5" x2="4" y2="11.5"></line>
                <line x1="20" y1="11.5" x2="22" y2="11.5"></line>
              </svg>
            </div>
            <div class="chatbot-brand-text">
              <div class="chatbot-brand-title">
                <h4>AI Robo Guide</h4>
                <span class="online-indicator">Live</span>
              </div>
              <p class="chatbot-brand-sub">Anna University Academic AI</p>
            </div>
          </div>

          <!-- Active Branch Badge -->
          <div class="chatbot-dept-pill" id="chat-active-dept-pill">
            <div class="dept-pill-icon">🏛️</div>
            <div class="dept-pill-info">
              <div class="dept-pill-name" id="chat-active-dept-name">Information Tech (IT)</div>
              <div class="dept-pill-reg" id="chat-active-reg-name">Regulation: R2021</div>
            </div>
          </div>

          <!-- Category Quick Access Navigation -->
          <div class="chatbot-nav-topics" id="chat-sidebar-topics">
            <div class="chatbot-nav-heading">ACADEMIC &amp; RESEARCH MODULES</div>
            <button class="chatbot-nav-btn" data-prompt="Show prescribed textbooks and book references on Google Books and Internet Archive">
              <span class="nav-icon">📖</span>
              <div class="nav-btn-text">
                <span class="nav-btn-title">Book References</span>
                <span class="nav-btn-sub">Google Books &amp; Internet Archive</span>
              </div>
            </button>
            <button class="chatbot-nav-btn" data-prompt="Search research papers on Google Scholar and IEEE Xplore">
              <span class="nav-icon">🔬</span>
              <div class="nav-btn-text">
                <span class="nav-btn-title">Research Papers</span>
                <span class="nav-btn-sub">Google Scholar &amp; IEEE Xplore</span>
              </div>
            </button>
            <button class="chatbot-nav-btn" data-prompt="Help me find lecture notes, syllabus and textbooks for my branch">
              <span class="nav-icon">📚</span>
              <div class="nav-btn-text">
                <span class="nav-btn-title">Subject Notes &amp; Units</span>
                <span class="nav-btn-sub">Unit 1-5 theory &amp; T1/T2 books</span>
              </div>
            </button>
            <button class="chatbot-nav-btn" data-prompt="Show job roles and salaries for my department">
              <span class="nav-icon">💼</span>
              <div class="nav-btn-text">
                <span class="nav-btn-title">Job Roles &amp; Salaries</span>
                <span class="nav-btn-sub">Salary benchmarks &amp; skills</span>
              </div>
            </button>
            <button class="chatbot-nav-btn" data-prompt="Show career learning roadmaps">
              <span class="nav-icon">🗺️</span>
              <div class="nav-btn-text">
                <span class="nav-btn-title">Career Roadmaps</span>
                <span class="nav-btn-sub">4-Phase step-by-step blueprints</span>
              </div>
            </button>
            <button class="chatbot-nav-btn" data-prompt="Suggest final year and mini project ideas">
              <span class="nav-icon">💡</span>
              <div class="nav-btn-text">
                <span class="nav-btn-title">Engineering Projects</span>
                <span class="nav-btn-sub">Capstone, Mini &amp; IoT/AI</span>
              </div>
            </button>
            <button class="chatbot-nav-btn" data-prompt="Show free online certifications with verified badges">
              <span class="nav-icon">🏆</span>
              <div class="nav-btn-text">
                <span class="nav-btn-title">Free Certifications</span>
                <span class="nav-btn-sub">NPTEL, Coursera, Google</span>
              </div>
            </button>
            <button class="chatbot-nav-btn" data-prompt="Show previous year university question papers">
              <span class="nav-icon">📝</span>
              <div class="nav-btn-text">
                <span class="nav-btn-title">Question Papers</span>
                <span class="nav-btn-sub">Nov/Dec &amp; April/May series</span>
              </div>
            </button>
          </div>

          <!-- Sidebar Footer Actions -->
          <div class="chatbot-sidebar-footer">
            <button class="chat-footer-action-btn" id="chat-toggle-voice" title="Toggle Voice Readout">
              <span id="chat-voice-icon">🔇</span>
              <span>Voice Readout</span>
            </button>
            <button class="chat-footer-action-btn" id="chat-clear-history" title="Clear Conversation">
              <span>🗑️</span>
              <span>Clear</span>
            </button>
          </div>
        </aside>

        <!-- RIGHT COLUMN: Main Landscape Conversation & Cards Workspace -->
        <main class="chatbot-landscape-main">
          <!-- Main Top Header -->
          <div class="chatbot-main-header">
            <div class="chatbot-main-title">
              <span class="landscape-badge">🖥️ Landscape AI Workspace</span>
              <span class="dept-quick-tag" id="chat-header-dept-tag">Active: IT (Information Technology)</span>
            </div>
            <div class="chatbot-main-actions">
              <button class="chat-btn-icon" id="chat-header-voice-btn" title="Toggle Voice Speech Output">
                <span id="chat-header-voice-icon">🔇</span>
              </button>
              <button class="chat-btn-icon chat-close-x-btn" id="chat-close-btn" title="Close Landscape Workspace (Esc)" aria-label="Close">
                ✕
              </button>
            </div>
          </div>

          <!-- Messages Stream Container -->
          <div class="chatbot-messages" id="chat-messages-container" tabindex="0"></div>

          <!-- Bottom Prompt Suggestions + Input Form -->
          <div class="chatbot-bottom-section">
            <div class="chatbot-prompt-pills" id="chat-prompt-pills">
              <button class="chat-pill" data-prompt="Show Google Books &amp; Internet Archive reference textbooks for my subjects">📖 Google Books &amp; Archive</button>
              <button class="chat-pill" data-prompt="Search IEEE Xplore and Google Scholar research papers">🔬 Google Scholar &amp; IEEE</button>
              <button class="chat-pill" data-prompt="What are the highest paying jobs for my department?">💰 Top LPA Jobs</button>
              <button class="chat-pill" data-prompt="Suggest AI/ML final year project ideas with Python">🤖 AI Projects</button>
              <button class="chat-pill" data-prompt="Show NPTEL and Google free certified courses">🏆 Free Courses</button>
              <button class="chat-pill" data-prompt="Enaku syllabus notes and book reference venum">🗣️ தமிழ் / Tanglish</button>
            </div>

            <!-- Input Bar with Voice Mic Button -->
            <form class="chatbot-input-bar" id="chat-form">
              <button type="button" class="chat-mic-btn" id="chat-mic-btn" aria-label="Voice Input (Speech-to-Text)" title="Speak Question (Voice Input)">
                🎤
              </button>
              <input 
                type="text" 
                id="chat-user-input" 
                class="chatbot-input" 
                placeholder="Ask in English or Tamil (e.g. 'Cloud notes', 'Google Books', 'IEEE papers')..." 
                autocomplete="off"
                aria-label="Ask AI Assistant"
              >
              <button type="submit" class="chatbot-send-btn" id="chat-send-btn" aria-label="Send message" title="Send message">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </main>
      </div>
    `;

    document.body.appendChild(launcherContainer);
  },

  updateActiveDeptDisplay() {
    const state = window.appState ? window.appState.state : {};
    const deptCode = state.department || 'IT';
    const regCode = state.regulation || 'R2021';
    const deptObj = (window.AppFallbackData?.departments || []).find(d => d.code === deptCode);
    const deptName = deptObj ? deptObj.name : 'Information Technology';

    const pillName = document.getElementById('chat-active-dept-name');
    const pillReg = document.getElementById('chat-active-reg-name');
    const headerTag = document.getElementById('chat-header-dept-tag');

    if (pillName) pillName.textContent = `${deptName} (${deptCode})`;
    if (pillReg) pillReg.textContent = `Regulation: ${regCode}`;
    if (headerTag) headerTag.textContent = `Active: ${deptCode} (${deptName})`;
  },

  bindEvents() {
    const launcherBtn = document.getElementById('chat-launcher-btn');
    const closeBtn = document.getElementById('chat-close-btn');
    const backdrop = document.getElementById('chatbot-backdrop');
    const clearBtn = document.getElementById('chat-clear-history');
    const voiceBtn = document.getElementById('chat-toggle-voice');
    const headerVoiceBtn = document.getElementById('chat-header-voice-btn');
    const micBtn = document.getElementById('chat-mic-btn');
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-user-input');
    const sidebarTopics = document.getElementById('chat-sidebar-topics');
    const promptPills = document.getElementById('chat-prompt-pills');

    launcherBtn?.addEventListener('click', () => this.toggleChat());
    closeBtn?.addEventListener('click', () => this.toggleChat(false));
    backdrop?.addEventListener('click', () => this.toggleChat(false));
    clearBtn?.addEventListener('click', () => this.clearChat());

    // Microphone Voice Input
    micBtn?.addEventListener('click', () => this.toggleSpeechRecognition());

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.toggleChat(false);
      }
    });

    const toggleVoice = () => {
      this.isVoiceEnabled = !this.isVoiceEnabled;
      const icon1 = document.getElementById('chat-voice-icon');
      const icon2 = document.getElementById('chat-header-voice-icon');
      const symbol = this.isVoiceEnabled ? '🔊' : '🔇';
      if (icon1) icon1.textContent = symbol;
      if (icon2) icon2.textContent = symbol;
      if (window.Toast) {
        window.Toast.show(this.isVoiceEnabled ? 'Voice readout enabled 🔊' : 'Voice readout muted 🔇', 'info');
      }
      if (!this.isVoiceEnabled && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };

    voiceBtn?.addEventListener('click', toggleVoice);
    headerVoiceBtn?.addEventListener('click', toggleVoice);

    // Handle Left Sidebar Topic clicks
    sidebarTopics?.addEventListener('click', (e) => {
      const btn = e.target.closest('.chatbot-nav-btn');
      if (btn) {
        const prompt = btn.dataset.prompt;
        if (prompt) this.handleUserMessage(prompt);
      }
    });

    // Handle Bottom Suggestion Pill clicks
    promptPills?.addEventListener('click', (e) => {
      const pill = e.target.closest('.chat-pill');
      if (pill) {
        const prompt = pill.dataset.prompt;
        if (prompt) this.handleUserMessage(prompt);
      }
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      input.value = '';
      this.stopListening();
      this.handleUserMessage(val);
    });
  },

  toggleChat(forceState) {
    this.isOpen = typeof forceState === 'boolean' ? forceState : !this.isOpen;
    const win = document.getElementById('chatbot-window');
    const backdrop = document.getElementById('chatbot-backdrop');
    const launcherBtn = document.getElementById('chat-launcher-btn');

    if (win) {
      if (this.isOpen) {
        this.updateActiveDeptDisplay();
        win.classList.add('open');
        backdrop?.classList.add('open');
        document.body.classList.add('chatbot-open-lock');
        if (launcherBtn) launcherBtn.style.opacity = '0.2';
        setTimeout(() => document.getElementById('chat-user-input')?.focus(), 250);
      } else {
        this.stopListening();
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        win.classList.remove('open');
        backdrop?.classList.remove('open');
        document.body.classList.remove('chatbot-open-lock');
        if (launcherBtn) launcherBtn.style.opacity = '1';
      }
    }
  },

  clearChat() {
    this.messages = [];
    const container = document.getElementById('chat-messages-container');
    if (container) container.innerHTML = '';
    this.addInitialGreeting();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (window.Toast) window.Toast.show('Conversation cleared', 'info');
  },

  addInitialGreeting() {
    const state = window.appState ? window.appState.state : {};
    const deptCode = state.department || 'IT';
    const regCode = state.regulation || 'R2021';
    const deptObj = (window.AppFallbackData?.departments || []).find(d => d.code === deptCode);
    const deptName = deptObj ? deptObj.name : 'Information Technology';

    const greetingHtml = `
      <div>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="font-size: 1.25rem;">👋</span>
          <strong style="font-size: 1.02rem; color: #1e1b4b;">Vanakkam! Welcome to Anna University Landscape AI Workspace!</strong>
        </div>
        <p style="margin: 0 0 10px 0; color: #334155; line-height: 1.55;">
          I am your Anna University AI Academic, Books &amp; Career Assistant. I have live search and deep discovery across:
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 8px; margin-bottom: 12px;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px; font-size: 0.78rem;">
            📖 <strong>Google Books &amp; Archive:</strong> Prescribed Textbooks (T1, T2)
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px; font-size: 0.78rem;">
            🔬 <strong>Google Scholar &amp; IEEE:</strong> Research Papers &amp; Journals
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px; font-size: 0.78rem;">
            🎤 <strong>Voice Input &amp; Audio:</strong> Speak in Tamil or English
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px; font-size: 0.78rem;">
            💼 <strong>Career &amp; Projects:</strong> 68 Branch Roles, Blueprints &amp; Code
          </div>
        </div>
        <div style="background: rgba(124, 58, 237, 0.08); padding: 8px 12px; border-radius: 8px; border-left: 3px solid #7c3aed; font-size: 0.82rem; margin-bottom: 8px;">
          Active Branch: <strong>${deptName} (${deptCode})</strong> • Regulation: <strong>${regCode}</strong>
        </div>
        <p style="margin: 0; font-size: 0.8rem; color: #64748b;">
          💡 Click <strong>🎤 Mic</strong> to speak, select any topic from the <strong>Left Sidebar</strong>, or type your subject code/topic!
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

    // Speech Synthesis Readout
    if (!isUser && this.isVoiceEnabled && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
        const plainText = msgDiv.innerText
          .replace(/[📖🔬🏛️🎓⚡💼🗺️💡🏆📚📝📌✓]/g, '')
          .replace(/[\n\r]+/g, ' ')
          .slice(0, 220);
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
    this.appendMessage('user', this.escapeHtml(query), true);
    this.showTypingIndicator();

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

    // ── 0. RESEARCH PAPERS: GOOGLE SCHOLAR & IEEE XPLORE ────────────────────
    if (q.includes('scholar') || q.includes('ieee') || q.includes('research') || q.includes('paper') || q.includes('journal') || q.includes('conference') || q.includes('literature') || q.includes('xplore')) {
      const allSubjects = window.AppFallbackData?.subjects || [];
      const matchingSub = allSubjects.find(s => 
        q.includes(s.code.toLowerCase()) || 
        (s.name && q.includes(s.name.toLowerCase()))
      ) || allSubjects.find(s => (s.deptCode || '').toUpperCase() === targetDept.toUpperCase()) || { code: 'CS3351', name: 'Digital Principles and Computer Organization' };

      const subName = matchingSub.name || 'Engineering Research';
      const subCode = matchingSub.code || targetDept;

      const scholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(subName + ' Anna University peer-reviewed research')}`;
      const ieeeUrl = `https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=${encodeURIComponent(subName)}`;

      return `
        <div>
          <div style="font-weight: 700; color: #1d4ed8; margin-bottom: 6px; font-size: 0.95rem;">
            🔬 Academic Research &amp; Peer-Reviewed Literature:
          </div>
          <p style="margin: 0 0 10px 0; font-size: 0.82rem; color: #475569;">
            Live search links to <strong>Google Scholar</strong> and <strong>IEEE Xplore Digital Library</strong> for <em>"${subName}" (${subCode})</em>:
          </p>
          
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 12px; margin-bottom: 12px;">
            <div style="font-weight: 700; color: #1e3a8a; font-size: 0.85rem; margin-bottom: 6px;">
              🎓 Live Research Portals Integration:
            </div>
            <div class="portal-search-grid">
              <a href="${scholarUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn google-scholar">
                <span>🎓 Google Scholar</span>
                <span>↗</span>
              </a>
              <a href="${ieeeUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn ieee-xplore">
                <span>⚡ IEEE Xplore</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div class="chat-card">
              <div class="chat-card-title">1. Google Scholar Citations &amp; Survey Papers</div>
              <div class="chat-card-desc">Access high-impact survey papers, citations, Ph.D. theses, and open-access peer-reviewed preprints for ${subCode}.</div>
              <a href="${scholarUrl}" target="_blank" rel="noopener noreferrer" class="chat-card-btn" style="background: #2563eb; align-self: flex-start;">
                Open in Google Scholar ↗
              </a>
            </div>

            <div class="chat-card">
              <div class="chat-card-title">2. IEEE Xplore Transactions &amp; Conference Proceedings</div>
              <div class="chat-card-desc">Explore authoritative IEEE computer &amp; engineering conference publications, standards, and journal articles.</div>
              <a href="${ieeeUrl}" target="_blank" rel="noopener noreferrer" class="chat-card-btn" style="background: #0891b2; align-self: flex-start;">
                Search IEEE Xplore ↗
              </a>
            </div>
          </div>
        </div>
      `;
    }

    // ── 1. BOOK REFERENCES: GOOGLE BOOKS & INTERNET ARCHIVE ──────────────────
    if (q.includes('book') || q.includes('textbook') || q.includes('reference') || q.includes('google book') || q.includes('archive') || q.includes('open library') || q.includes('author') || q.includes('edition') || q.includes('t1') || q.includes('t2')) {
      const allSubjects = window.AppFallbackData?.subjects || [];
      const matchingSub = allSubjects.find(s => 
        q.includes(s.code.toLowerCase()) || 
        (s.name && q.includes(s.name.toLowerCase()))
      ) || allSubjects.find(s => (s.deptCode || '').toUpperCase() === targetDept.toUpperCase()) || { code: 'CS3351', name: 'Digital Principles and System Design' };

      // Get official prescribed textbooks
      let textbooks = [];
      if (window.AcademicNotesCatalog && window.AcademicNotesCatalog.getTextBooks) {
        textbooks = window.AcademicNotesCatalog.getTextBooks(matchingSub);
      } else if (window.FreeStudyPortals && window.FreeStudyPortals.generateTextbooks) {
        textbooks = window.FreeStudyPortals.generateTextbooks(matchingSub);
      }
      if (!textbooks || textbooks.length === 0) {
        textbooks = [
          { title: `${matchingSub.name} Principles & Systems`, author: 'M. Morris Mano & Michael D. Ciletti', publisher: 'Pearson Education, 6th Edition', type: 'Prescribed Textbook (T1)' },
          { title: `Authoritative Engineering Practice of ${matchingSub.name}`, author: 'Charles H. Roth & Larry L. Kinney', publisher: 'Cengage Learning, 7th Edition', type: 'Prescribed Textbook (T2)' },
          { title: `Advanced Reference Guide in ${matchingSub.name}`, author: 'John F. Wakerly', publisher: 'Prentice Hall International', type: 'Reference Book (R1)' }
        ];
      }

      return `
        <div>
          <div style="font-weight: 700; color: #4f46e5; margin-bottom: 6px; font-size: 0.95rem;">
            📖 Prescribed Textbooks &amp; Live Digital Book Archives:
          </div>
          <p style="margin: 0 0 10px 0; font-size: 0.82rem; color: #475569;">
            Anna University syllabus prescribed books for <strong>${matchingSub.code} - ${matchingSub.name}</strong> with 1-click live search on <strong>Google Books</strong> &amp; <strong>Internet Archive</strong>:
          </p>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${textbooks.slice(0, 3).map((tb, idx) => {
              const queryStr = `${tb.title} ${tb.author || ''}`;
              const googleBooksUrl = `https://books.google.com/books?q=${encodeURIComponent(queryStr)}`;
              const archiveOrgUrl = `https://archive.org/search?query=${encodeURIComponent(queryStr)}`;
              const openLibraryUrl = `https://openlibrary.org/search?q=${encodeURIComponent(tb.title)}`;
              const scholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(queryStr)}`;
              const tagClass = idx === 0 ? 't1' : (idx === 1 ? 't2' : 'r1');
              const tagLabel = tb.type || (idx === 0 ? 'Textbook (T1)' : (idx === 1 ? 'Textbook (T2)' : 'Reference (R1)'));

              return `
                <div class="chat-card" style="border-left-color: ${idx === 0 ? '#4f46e5' : (idx === 1 ? '#7c3aed' : '#d97706')};">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 6px;">
                    <span class="chat-card-title">${tb.title}</span>
                    <span class="book-tag ${tagClass}">${tagLabel}</span>
                  </div>
                  <div class="chat-card-desc">
                    <strong>Author:</strong> ${tb.author || 'Academic Faculty Council'}<br>
                    <strong>Publisher:</strong> ${tb.publisher || 'Pearson / McGraw-Hill'} ${tb.edition ? '• ' + tb.edition : ''}
                  </div>
                  <div class="portal-search-grid">
                    <a href="${googleBooksUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn google-books" title="Read Preview &amp; Chapters on Google Books">
                      <span>📖 Google Books</span>
                      <span>↗</span>
                    </a>
                    <a href="${archiveOrgUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn archive-org" title="Borrow Digital E-Book on Internet Archive">
                      <span>🏛️ Internet Archive</span>
                      <span>↗</span>
                    </a>
                    <a href="${openLibraryUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn google-scholar" title="Search Editions on Open Library">
                      <span>📚 Open Library</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div style="margin-top: 10px; display: flex; gap: 8px;">
            <button class="chat-card-btn" style="flex: 1;" onclick="window.appState.setView('notes', { semester: ${matchingSub.semester || 1}, subjectId: '${matchingSub.id || matchingSub.code}', subjectCode: '${matchingSub.code}', tab: 'textbooks' }); window.ChatbotWidget.toggleChat(false);">
              📖 Open Full Textbooks Tab in Subject Notes ➔
            </button>
          </div>
        </div>
      `;
    }

    // ── 2. PORTAL & HOD DETAILS ───────────────────────────────────────────
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
            🏛️ View Dashboard &amp; HOD Portal ➔
          </button>
        </div>
      `;
    }

    // ── 3. DEPARTMENTAL JOB ROLES & SALARIES ────────────────────────────────
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

    // ── 4. CAREER LEARNING ROADMAPS ─────────────────────────────────────────
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
    }

    // ── 5. PROJECT IDEAS (MINI, CAPSTONE, AI/ML, IOT) ───────────────────────
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

    // ── 6. FREE CERTIFICATIONS & SKILLS ─────────────────────────────────────
    if (q.includes('certif') || q.includes('skill') || q.includes('course') || q.includes('free') || q.includes('nptel') || q.includes('coursera') || q.includes('badge')) {
      const allCerts = window.SkillsCertificationsData || window.AppFallbackData?.certifications || [];
      const topCerts = allCerts.slice(0, 3);

      return `
        <div>
          <div style="font-weight: 700; color: #7c3aed; margin-bottom: 6px;">
            🏆 100% Free Industry Certifications &amp; Skill Paths:
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
        </div>
      `;
    }

    // ── 7. NOTES, SYLLABUS & SUBJECTS ───────────────────────────────────────
    if (q.includes('note') || q.includes('syllabus') || q.includes('subject') || q.includes('unit') || q.includes('lab')) {
      const allSubjects = window.AppFallbackData?.subjects || [];
      const matchingSub = allSubjects.find(s => 
        q.includes(s.code.toLowerCase()) || 
        (s.name && q.includes(s.name.toLowerCase()))
      );

      if (matchingSub) {
        const googleBooksUrl = `https://books.google.com/books?q=${encodeURIComponent(matchingSub.name + ' textbook')}`;
        const archiveOrgUrl = `https://archive.org/search?query=${encodeURIComponent(matchingSub.name)}`;

        return `
          <div>
            <div style="font-weight: 700; color: #7c3aed; margin-bottom: 6px;">
              📚 Found Course: ${matchingSub.name} (${matchingSub.code})
            </div>
            <p style="margin: 0 0 10px 0; font-size: 0.82rem; color: #475569;">
              Semester ${matchingSub.semester} • ${matchingSub.credits} Credits • Regulation ${matchingSub.regCode || currentDeptCode}
            </p>
            <div style="background: #f5f3ff; border: 1px solid #ede9fe; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.82rem;">
              ✓ Unit 1 to Unit 5 Syllabus Notes<br>
              ✓ Prescribed Reference Textbooks (T1, T2)<br>
              ✓ Practical Lab Manual Experiments
            </div>

            <!-- Google Books & Internet Archive Quick Search -->
            <div style="background: #faf5ff; border: 1px solid #ede9fe; border-radius: 8px; padding: 10px; margin-bottom: 10px;">
              <div style="font-size: 0.78rem; font-weight: 700; color: #6d28d9; margin-bottom: 6px;">
                📖 Prescribed Book Search for ${matchingSub.code}:
              </div>
              <div class="portal-search-grid">
                <a href="${googleBooksUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn google-books">
                  <span>📖 Google Books</span>
                  <span>↗</span>
                </a>
                <a href="${archiveOrgUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn archive-org">
                  <span>🏛️ Internet Archive</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            <button class="chat-card-btn" style="width: 100%;" onclick="window.appState.setView('notes', { semester: ${matchingSub.semester}, subjectId: '${matchingSub.id || matchingSub.code}', subjectCode: '${matchingSub.code}' }); window.ChatbotWidget.toggleChat(false);">
              📖 Open Notes &amp; Syllabus for ${matchingSub.code} ➔
            </button>
          </div>
        `;
      }
    }

    // ── 8. INTELLIGENT FALLBACK ─────────────────────────────────────────────
    const activeSub = (window.AppFallbackData?.subjects || []).find(s => (s.deptCode || '').toUpperCase() === targetDept.toUpperCase()) || { code: 'IT Core', name: 'Information Technology' };
    const googleBooksUrl = `https://books.google.com/books?q=${encodeURIComponent(targetDept + ' engineering textbooks')}`;
    const archiveOrgUrl = `https://archive.org/search?query=${encodeURIComponent(targetDept + ' engineering')}`;
    const scholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(targetDept + ' engineering research')}`;
    const ieeeUrl = `https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=${encodeURIComponent(targetDept)}`;

    return `
      <div>
        <p style="margin: 0 0 8px 0;">
          I can assist you with all academic books, research papers, and career blueprints for <strong>${targetDept}</strong>:
        </p>

        <!-- Quick Academic Portals Discovery -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px; margin-bottom: 10px;">
          <div style="font-size: 0.78rem; font-weight: 700; color: #334155; margin-bottom: 6px;">
            🌐 Live Academic &amp; Research Search:
          </div>
          <div class="portal-search-grid">
            <a href="${googleBooksUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn google-books">
              <span>📖 Google Books</span>
              <span>↗</span>
            </a>
            <a href="${archiveOrgUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn archive-org">
              <span>🏛️ Internet Archive</span>
              <span>↗</span>
            </a>
            <a href="${scholarUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn google-scholar">
              <span>🎓 Google Scholar</span>
              <span>↗</span>
            </a>
            <a href="${ieeeUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn ieee-xplore">
              <span>⚡ IEEE Xplore</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.82rem; margin-bottom: 10px;">
          <div>📖 <strong>Book References:</strong> Ask <em>"Show Google Books &amp; Internet Archive textbooks"</em></div>
          <div>🔬 <strong>Research Papers:</strong> Ask <em>"Search IEEE and Google Scholar papers"</em></div>
          <div>🎤 <strong>Voice Input:</strong> Click the <strong>🎤 Mic</strong> to speak in English or Tamil</div>
          <div>💼 <strong>Job Roles:</strong> Ask <em>"What jobs are in my department?"</em></div>
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
