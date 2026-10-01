/**
 * Advanced AI Academic & Career Assistant Chatbot Widget
 * Anna University Student Portal
 * 
 * Features:
 * - Exact Greeting Handler: 'hii' -> "Hiii! How is your day? How can I help you today?" / 'hello' -> "Hello! How is your day? How can I help you today?"
 * - True Multilingual Engine: English, தமிழ் (Tamil), and Tanglish responses with live toggle
 * - Universal Student Academic Question Answerer: Concepts (Cloud, AI, Python, DSA, OS, DBMS, Networks, etc.),
 *   9+ CGPA & Sem Exam Tips, Arrear Clear Strategies, Syllabus Notes, Textbooks (T1, T2),
 *   Research Papers (Scholar, IEEE), Placements, Roadmaps & Projects.
 * - True Widescreen 2-Column Landscape Mode Workspace
 * - Voice Input (Speech-to-Text via Web Speech Recognition)
 * - Voice Output (SpeechSynthesis in en-IN and ta-IN)
 */

window.ChatbotWidget = {
  isOpen: false,
  isVoiceEnabled: false,
  isListening: false,
  recognition: null,
  messages: [],
  currentLang: 'en', // 'en' | 'ta' | 'tanglish'
  lastQuery: '',

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
      link.href = 'css/chatbot.css?v=landscape_voice_multilingual_v5';
      document.head.appendChild(link);
    } else {
      link.href = 'css/chatbot.css?v=landscape_voice_multilingual_v5';
    }
  },

  setLanguage(lang, triggerRerun = false) {
    if (!['en', 'ta', 'tanglish'].includes(lang)) lang = 'en';
    this.currentLang = lang;

    // Update active class on header language switcher buttons
    document.querySelectorAll('.chat-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update active class on any visible message pills
    document.querySelectorAll('.chat-msg-lang-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.lang === lang);
    });

    // Update input placeholder to match active language
    const input = document.getElementById('chat-user-input');
    if (input) {
      if (lang === 'ta') {
        input.placeholder = 'தமிழில் கேளுங்கள் (எ.கா: "Cloud computing விளக்கம்", "9+ CGPA", "Arrear pass tips")...';
      } else if (lang === 'tanglish') {
        input.placeholder = 'Tanglish la kelunga (e.g. "Cloud computing explain pannu", "9+ CGPA tips", "Arrear clear tips")...';
      } else {
        input.placeholder = 'Ask in English, Tamil, or Tanglish (e.g. "Cloud Computing", "9+ CGPA", "IEEE papers")...';
      }
    }

    if (window.Toast) {
      const langNames = { en: 'English 🇬🇧', ta: 'தமிழ் 🇮🇳', tanglish: 'Tanglish 🗣️' };
      window.Toast.show(`Language set to ${langNames[lang]}`, 'info');
    }

    // Re-run the last student question in the newly selected language if requested
    if (triggerRerun && this.lastQuery) {
      this.handleUserMessage(this.lastQuery, true, lang);
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
      this.recognition.lang = this.currentLang === 'ta' ? 'ta-IN' : 'en-IN';

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
          input.placeholder = this.currentLang === 'ta' 
            ? '🎙️ கேட்கிறது... இப்போது பேசுங்கள்...' 
            : (this.currentLang === 'tanglish' ? '🎙️ Listening... Ippo pesunga...' : '🎙️ Listening... Speak your academic question now...');
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
        if (this.recognition) {
          this.recognition.lang = this.currentLang === 'ta' ? 'ta-IN' : 'en-IN';
        }
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
      if (this.currentLang === 'ta') {
        input.placeholder = 'தமிழில் கேளுங்கள் (எ.கா: "Cloud computing விளக்கம்", "9+ CGPA")...';
      } else if (this.currentLang === 'tanglish') {
        input.placeholder = 'Tanglish la kelunga (e.g. "Cloud computing explain pannu", "9+ CGPA tips")...';
      } else {
        input.placeholder = 'Ask in English, Tamil, or Tanglish (e.g. "Cloud notes", "9+ CGPA", "IEEE papers")...';
      }
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
        <span class="chat-launcher-tooltip">Ask AI Robo Guide 🤖 (English / தமிழ் / Tanglish)</span>
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
            <div class="chatbot-nav-heading">ACADEMIC &amp; EXAM MODULES</div>
            <button class="chatbot-nav-btn" data-prompt="How to get 9+ CGPA in Anna University?">
              <span class="nav-icon">🎯</span>
              <div class="nav-btn-text">
                <span class="nav-btn-title">9+ CGPA &amp; Sem Tips</span>
                <span class="nav-btn-sub">Exam score strategy &amp; Part A/B/C</span>
              </div>
            </button>
            <button class="chatbot-nav-btn" data-prompt="Arrear clear panrathu epdi? Easy tips sollu">
              <span class="nav-icon">📝</span>
              <div class="nav-btn-text">
                <span class="nav-btn-title">Arrear Clear Strategy</span>
                <span class="nav-btn-sub">Pass formula &amp; High scoring units</span>
              </div>
            </button>
            <button class="chatbot-nav-btn" data-prompt="What is Cloud Computing? Explain in simple terms">
              <span class="nav-icon">☁️</span>
              <div class="nav-btn-text">
                <span class="nav-btn-title">Cloud &amp; Core Concepts</span>
                <span class="nav-btn-sub">IaaS, PaaS, SaaS &amp; syllabus notes</span>
              </div>
            </button>
            <button class="chatbot-nav-btn" data-prompt="Explain Artificial Intelligence and Machine Learning">
              <span class="nav-icon">🤖</span>
              <div class="nav-btn-text">
                <span class="nav-btn-title">AI &amp; Machine Learning</span>
                <span class="nav-btn-sub">Supervised, Unsupervised &amp; Python</span>
              </div>
            </button>
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
            <button class="chatbot-nav-btn" data-prompt="Show job roles and salaries for my department">
              <span class="nav-icon">💼</span>
              <div class="nav-btn-text">
                <span class="nav-btn-title">Job Roles &amp; Salaries</span>
                <span class="nav-btn-sub">Salary benchmarks &amp; skills</span>
              </div>
            </button>
            <button class="chatbot-nav-btn" data-prompt="Suggest final year and mini project ideas">
              <span class="nav-icon">💡</span>
              <div class="nav-btn-text">
                <span class="nav-btn-title">Engineering Projects</span>
                <span class="nav-btn-sub">Capstone, Mini &amp; IoT/AI</span>
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
              <!-- Multilingual Selector in Header -->
              <div class="chat-lang-switcher" id="chat-lang-switcher" title="Choose Language / மொழியைத் தேர்ந்தெடுக்கவும்">
                <button type="button" class="chat-lang-btn active" data-lang="en">🇬🇧 English</button>
                <button type="button" class="chat-lang-btn" data-lang="ta">🇮🇳 தமிழ்</button>
                <button type="button" class="chat-lang-btn" data-lang="tanglish">🗣️ Tanglish</button>
              </div>

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
              <button class="chat-pill" data-prompt="Hii">👋 Hii</button>
              <button class="chat-pill" data-prompt="Hello">👋 Hello</button>
              <button class="chat-pill" data-prompt="Tamil la content venum">🇮🇳 தமிழ் (Tamil)</button>
              <button class="chat-pill" data-prompt="Tanglish la content sollu">🗣️ Tanglish</button>
              <button class="chat-pill" data-prompt="How to get 9+ CGPA in Anna University?">🎯 9+ CGPA Tips</button>
              <button class="chat-pill" data-prompt="Arrear clear panrathu epdi? Pass aagura tips sollu">📝 Arrear Clear Tips</button>
              <button class="chat-pill" data-prompt="What is Cloud Computing? Explain in simple terms">☁️ Cloud Computing</button>
              <button class="chat-pill" data-prompt="Explain Artificial Intelligence and Machine Learning">🤖 AI &amp; ML</button>
              <button class="chat-pill" data-prompt="Show prescribed textbooks on Google Books &amp; Internet Archive">📖 Google Books &amp; Archive</button>
              <button class="chat-pill" data-prompt="What are the highest paying jobs for my department?">💰 Top Salary Jobs</button>
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
                placeholder="Ask in English, Tamil, or Tanglish (e.g. 'Cloud notes', '9+ CGPA', 'Arrear clear tips')..." 
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
    const langSwitcher = document.getElementById('chat-lang-switcher');

    launcherBtn?.addEventListener('click', () => this.toggleChat());
    closeBtn?.addEventListener('click', () => this.toggleChat(false));
    backdrop?.addEventListener('click', () => this.toggleChat(false));
    clearBtn?.addEventListener('click', () => this.clearChat());

    // Language switcher click in header
    langSwitcher?.addEventListener('click', (e) => {
      const btn = e.target.closest('.chat-lang-btn');
      if (btn && btn.dataset.lang) {
        this.setLanguage(btn.dataset.lang, false);
      }
    });

    // Delegate clicks for in-message language pill buttons
    document.getElementById('chat-messages-container')?.addEventListener('click', (e) => {
      const pill = e.target.closest('.chat-msg-lang-pill');
      if (pill && pill.dataset.lang) {
        this.setLanguage(pill.dataset.lang, true);
      }
      const quickAction = e.target.closest('.chat-quick-action-btn');
      if (quickAction && quickAction.dataset.prompt) {
        this.handleUserMessage(quickAction.dataset.prompt);
      }
    });

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
          <span style="font-size: 1.3rem;">👋</span>
          <strong style="font-size: 1.05rem; color: #1e1b4b;">Vanakkam! Anna University AI Multilingual Robo Guide!</strong>
        </div>
        <p style="margin: 0 0 10px 0; color: #334155; line-height: 1.55; font-size: 0.86rem;">
          Welcome! I am your 24/7 Academic AI Companion for all <strong>68 Engineering Branches</strong>. I can speak and answer in <strong>English</strong>, <strong>தமிழ் (Tamil)</strong>, and <strong>Tanglish</strong>:
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; margin-bottom: 12px;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px; font-size: 0.78rem;">
            🎯 <strong>9+ CGPA &amp; Sem Tips:</strong> Anna University Exam Strategy
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px; font-size: 0.78rem;">
            📝 <strong>Arrear Clear Strategy:</strong> High-scoring units &amp; presentation
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px; font-size: 0.78rem;">
            ☁️ <strong>Cloud &amp; Tech Concepts:</strong> Simple explanations in 3 languages
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px; font-size: 0.78rem;">
            📖 <strong>Google Books &amp; Archive:</strong> Prescribed T1/T2 textbooks
          </div>
        </div>

        <div style="background: rgba(124, 58, 237, 0.08); padding: 8px 12px; border-radius: 8px; border-left: 3px solid #7c3aed; font-size: 0.82rem; margin-bottom: 10px;">
          Active Branch: <strong>${deptName} (${deptCode})</strong> • Regulation: <strong>${regCode}</strong>
        </div>

        <div style="font-size: 0.78rem; color: #64748b; margin-bottom: 6px;">
          💡 Try saying <strong>"Hii"</strong>, <strong>"Hello"</strong>, or switch language using top pills: <strong>English</strong>, <strong>தமிழ்</strong>, <strong>Tanglish</strong>!
        </div>
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
          .replace(/[📖🔬🏛️🎓⚡💼🗺️💡🏆📚📝📌✓🇬🇧🇮🇳🗣️☁️🤖🎯]/g, '')
          .replace(/[\n\r]+/g, ' ')
          .slice(0, 220);
        const utterance = new SpeechSynthesisUtterance(plainText);
        utterance.lang = this.currentLang === 'ta' ? 'ta-IN' : 'en-IN';
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

  async handleUserMessage(query, isRerun = false, forcedLang = null) {
    if (!isRerun) {
      this.appendMessage('user', this.escapeHtml(query), true);
    }
    this.showTypingIndicator();

    // Auto-detect language if not forced
    if (forcedLang) {
      this.currentLang = forcedLang;
    } else {
      const qLower = query.toLowerCase().trim();
      if (/[\u0B80-\u0BFF]/.test(query)) {
        // Pure Tamil script detected
        this.currentLang = 'ta';
      } else if (/\b(tanglish|thanglish)\b/i.test(qLower) || qLower.includes('tanglish')) {
        this.currentLang = 'tanglish';
      } else if (/\b(tamil|tamizh)\b/i.test(qLower) || qLower.includes('tamil')) {
        this.currentLang = 'ta';
      } else if (/\b(english)\b/i.test(qLower) || qLower.includes('english')) {
        this.currentLang = 'en';
      } else if (/\b(epdi|enna|venum|sollunga|solla|kedaikuma|padikkanum|iruku|irukku|panrathu|pannunga|panna|illai|ila|aachu|achu|romba|ketta|keta|paravala|mudiyum|theriyuma|pathu|pathina|paththi|eppadi|yaar|edhu|engae|innaiku|innaikku|nalla|sollu|sollungalen|solren|pannalam|panradhu|padikanum|theriyala)\b/i.test(qLower)) {
        // Tanglish markers detected
        this.currentLang = 'tanglish';
      }
    }

    // Update header language button active state
    document.querySelectorAll('.chat-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
    });

    this.lastQuery = query;

    setTimeout(() => {
      this.hideTypingIndicator();
      const responseHtml = this.generateResponse(query, this.currentLang);
      this.appendMessage('bot', responseHtml, false);
    }, 380);
  },

  generateResponse(query, lang = 'en') {
    const rawQ = query.trim();
    const q = rawQ.toLowerCase();
    const state = window.appState ? window.appState.state : {};
    const currentDeptCode = state.department || 'IT';
    let targetDept = currentDeptCode;

    // Detect if student is asking about a specific department
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

    // ── Helper to wrap with Top Multilingual Switcher Header Bar ───────────
    const wrapLang = (bodyContent) => {
      const activeBadge = lang === 'ta' 
        ? '🇮🇳 தமிழ் பயன்முறை' 
        : (lang === 'tanglish' ? '🗣️ Tanglish Mode' : '🇬🇧 English Mode');

      return `
        <div>
          <div class="chat-msg-lang-bar">
            <span class="chat-msg-active-badge">${activeBadge}</span>
            <div class="chat-msg-lang-pills">
              <button type="button" class="chat-msg-lang-pill ${lang === 'en' ? 'active' : ''}" data-lang="en" title="View in English">🇬🇧 English</button>
              <button type="button" class="chat-msg-lang-pill ${lang === 'ta' ? 'active' : ''}" data-lang="ta" title="தமிழில் பார்க்க">🇮🇳 தமிழ்</button>
              <button type="button" class="chat-msg-lang-pill ${lang === 'tanglish' ? 'active' : ''}" data-lang="tanglish" title="Tanglish la paaka">🗣️ Tanglish</button>
            </div>
          </div>
          ${bodyContent}
        </div>
      `;
    };

    // ─────────────────────────────────────────────────────────────────────────
    // 1. EXACT GREETINGS HANDLER (As explicitly requested by USER):
    //    - If 'hii': "Hiii! How is your day? How can I help you today?"
    //    - If 'hello': "Hello! How is your day? How can I help you today?"
    //    - Plus Tamil & Tanglish adaptations and interactive action options
    // ─────────────────────────────────────────────────────────────────────────
    const isHiiPattern = /^(hi+|hey+|heyy+|howdy|வணக்கம்)(\s*!*|\?*)*$/i.test(q) || /^(hi+|hey+)\b/i.test(q);
    const isHelloPattern = /^(hello+|helloo+|hola|ஹலோ)(\s*!*|\?*)*$/i.test(q) || /^(hello+|helloo+)\b/i.test(q);

    if (isHiiPattern || isHelloPattern) {
      const isHii = isHiiPattern && !q.includes('hello');
      const greetingWord = isHii ? 'Hiii' : 'Hello';

      let greetingText = '';
      let subPromptText = '';

      if (lang === 'ta') {
        greetingText = `${greetingWord}! இன்றைய நாள் எப்படி போகிறது? (How is your day?) உங்களுக்கு நான் எவ்வாறு உதவ முடியும்? (How can I help you?)`;
        subPromptText = `அண்ணா பல்கலைக்கழக பாடத்திட்டம், 9+ CGPA எடுக்கும் வழிகள், அறியர் பாஸ் டிப்ஸ், நோட்ஸ் மற்றும் வேலைவாய்ப்புகள் பற்றி நீங்கள் என்ன வேண்டுமானாலும் தமிழில் கேட்கலாம்:`;
      } else if (lang === 'tanglish') {
        greetingText = `${greetingWord}! How is your day? Innaiku ungalukku naan eppadi help panna mudiyum?`;
        subPromptText = `Anna University syllabus, notes, 9+ CGPA tips, arrear clear panra secrets, Cloud/AI concepts, jobs—neenga enna ketalum ungalukku naan answer panna ready:`;
      } else {
        greetingText = `${greetingWord}! How is your day? How can I help you today?`;
        subPromptText = `I am your Anna University Academic & Career AI Robo Guide. Ask me anything about syllabus, exams, notes, textbooks, or concepts:`;
      }

      return wrapLang(`
        <div>
          <div style="font-size: 1.08rem; font-weight: 800; color: #1e1b4b; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
            <span>👋</span>
            <span>${greetingText}</span>
          </div>
          <p style="margin: 0 0 12px 0; color: #334155; font-size: 0.85rem; line-height: 1.5;">
            ${subPromptText}
          </p>

          <!-- Interactive Action Buttons -->
          <div class="chat-quick-actions-grid">
            <button type="button" class="chat-quick-action-btn" data-prompt="How to get 9+ CGPA in Anna University?">
              <span>🎯</span>
              <div>
                <strong>9+ CGPA Strategy</strong>
                <div style="font-size: 0.68rem; color: #64748b;">Part A/B/C scoring guide</div>
              </div>
            </button>

            <button type="button" class="chat-quick-action-btn" data-prompt="Arrear clear panrathu epdi? Easy tips sollu">
              <span>📝</span>
              <div>
                <strong>Arrear Clear Tips</strong>
                <div style="font-size: 0.68rem; color: #64748b;">Pass formula &amp; easy units</div>
              </div>
            </button>

            <button type="button" class="chat-quick-action-btn" data-prompt="What is Cloud Computing? Explain in simple terms">
              <span>☁️</span>
              <div>
                <strong>Cloud Computing</strong>
                <div style="font-size: 0.68rem; color: #64748b;">Concept, IaaS/PaaS &amp; Notes</div>
              </div>
            </button>

            <button type="button" class="chat-quick-action-btn" data-prompt="Explain Artificial Intelligence and Machine Learning">
              <span>🤖</span>
              <div>
                <strong>AI &amp; Machine Learning</strong>
                <div style="font-size: 0.68rem; color: #64748b;">Concepts &amp; Python tools</div>
              </div>
            </button>

            <button type="button" class="chat-quick-action-btn" data-prompt="Show prescribed textbooks on Google Books &amp; Internet Archive">
              <span>📖</span>
              <div>
                <strong>Textbooks (T1, T2)</strong>
                <div style="font-size: 0.68rem; color: #64748b;">Google Books &amp; Archive</div>
              </div>
            </button>

            <button type="button" class="chat-quick-action-btn" data-prompt="What are the highest paying jobs for my department?">
              <span>💼</span>
              <div>
                <strong>Job Roles &amp; Salaries</strong>
                <div style="font-size: 0.68rem; color: #64748b;">${targetDept} LPA benchmarks</div>
              </div>
            </button>
          </div>
        </div>
      `);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 2. EXPLICIT LANGUAGE SWITCH REQUEST (e.g. "tamil", "tanglish", "english")
    // ─────────────────────────────────────────────────────────────────────────
    if (q === 'tamil' || q.includes('tamil la content') || q.includes('tamil la sollunga') || q.includes('tamil please') || q === 'தமிழ்' || q.includes('தமிழில்')) {
      return wrapLang(`
        <div>
          <div style="font-weight: 800; color: #059669; font-size: 1rem; margin-bottom: 6px;">
            🇮🇳 தமிழ் மொழி உதவிப் பிரிவு தயார்! (Tamil Mode Activated)
          </div>
          <p style="margin: 0 0 10px 0; font-size: 0.85rem; color: #334155; line-height: 1.55;">
            வணக்கம்! இனி நீங்கள் கேட்கும் அனைத்து அண்ணா பல்கலைக்கழக வினாக்கள், பாடப் பகுதிகள் (Syllabus), நோட்ஸ் (Notes), 9+ CGPA எடுப்பதற்கான வழிகள், அறியர் தேர்வுகளை எளிதில் கிளியர் செய்யும் வழிகள் மற்றும் தொழில்நுட்ப கருத்துக்களுக்கு <strong>முழுமையான தமிழில்</strong> பதில் அளிக்கப்படும்.
          </p>
          <div class="chat-quick-actions-grid">
            <button type="button" class="chat-quick-action-btn" data-prompt="அண்ணா பல்கலைக்கழக தேர்வில் 9+ CGPA எடுப்பது எப்படி?">
              <span>🎯</span>
              <div><strong>9+ CGPA எடுக்கும் வழிகள்</strong><div style="font-size: 0.68rem; color: #64748b;">செமஸ்டர் தேர்வு உத்திகள்</div></div>
            </button>
            <button type="button" class="chat-quick-action-btn" data-prompt="அறியர் தேர்வை எளிதில் பாஸ் செய்வது எப்படி?">
              <span>📝</span>
              <div><strong>அறியர் கிளியர் டிப்ஸ்</strong><div style="font-size: 0.68rem; color: #64748b;">முக்கிய வினாக்கள் &amp; உத்திகள்</div></div>
            </button>
            <button type="button" class="chat-quick-action-btn" data-prompt="கிளவுட் கம்ப்யூட்டிங் என்றால் என்ன? விளக்கம் தாருங்கள்">
              <span>☁️</span>
              <div><strong>கிளவுட் கம்ப்யூட்டிங்</strong><div style="font-size: 0.68rem; color: #64748b;">தமிழில் எளிய விளக்கம்</div></div>
            </button>
          </div>
        </div>
      `);
    }

    if (q === 'tanglish' || q.includes('tanglish la content') || q.includes('tanglish la sollu') || q.includes('tanglish please')) {
      return wrapLang(`
        <div>
          <div style="font-weight: 800; color: #7c3aed; font-size: 1rem; margin-bottom: 6px;">
            🗣️ Super! Tanglish Mode Activated!
          </div>
          <p style="margin: 0 0 10px 0; font-size: 0.85rem; color: #334155; line-height: 1.55;">
            Super student! Ini ungalukku Anna University syllabus, Unit 1-5 notes, 9+ CGPA tips, arrear clear panra secrets, Cloud/AI concepts, jobs, roadmaps—ellathayum ungalukku <strong>pure student-friendly Tanglish la</strong> explain pannuven! Ippo ungalukku enna help venum?
          </p>
          <div class="chat-quick-actions-grid">
            <button type="button" class="chat-quick-action-btn" data-prompt="How to get 9+ CGPA in Anna University?">
              <span>🎯</span>
              <div><strong>9+ CGPA Tips</strong><div style="font-size: 0.68rem; color: #64748b;">Tanglish la sem tips</div></div>
            </button>
            <button type="button" class="chat-quick-action-btn" data-prompt="Arrear clear panrathu epdi? Easy tips sollu">
              <span>📝</span>
              <div><strong>Arrear Clear Strategy</strong><div style="font-size: 0.68rem; color: #64748b;">Pass aagura simple formula</div></div>
            </button>
            <button type="button" class="chat-quick-action-btn" data-prompt="What is Cloud Computing? Explain in simple terms">
              <span>☁️</span>
              <div><strong>Cloud Computing</strong><div style="font-size: 0.68rem; color: #64748b;">Easy concept breakdown</div></div>
            </button>
          </div>
        </div>
      `);
    }

    if (q === 'english' || q.includes('in english') || q.includes('english please') || q.includes('english content')) {
      return wrapLang(`
        <div>
          <div style="font-weight: 800; color: #2563eb; font-size: 1rem; margin-bottom: 6px;">
            🇬🇧 English Assistance Mode Activated!
          </div>
          <p style="margin: 0 0 10px 0; font-size: 0.85rem; color: #334155; line-height: 1.55;">
            Great! I will now respond in clear, comprehensive academic English. You can ask any question regarding Anna University syllabus, lecture notes, previous question papers, 9+ CGPA strategies, textbook references, research publications, or career pathways.
          </p>
          <div class="chat-quick-actions-grid">
            <button type="button" class="chat-quick-action-btn" data-prompt="How to get 9+ CGPA in Anna University?">
              <span>🎯</span>
              <div><strong>9+ CGPA Strategy</strong><div style="font-size: 0.68rem; color: #64748b;">University exam formula</div></div>
            </button>
            <button type="button" class="chat-quick-action-btn" data-prompt="What is Cloud Computing? Explain in simple terms">
              <span>☁️</span>
              <div><strong>Cloud Computing</strong><div style="font-size: 0.68rem; color: #64748b;">Concepts &amp; T1/T2 books</div></div>
            </button>
          </div>
        </div>
      `);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 3. ANNA UNIVERSITY 9+ CGPA & SEMESTER EXAM PREPARATION TIPS
    // ─────────────────────────────────────────────────────────────────────────
    if (q.includes('cgpa') || q.includes('gpa') || q.includes('9+') || q.includes('score') || q.includes('sem tip') || q.includes('exam tip') || q.includes('mark') || q.includes('pass mark')) {
      if (lang === 'ta') {
        return wrapLang(`
          <div>
            <div style="font-weight: 800; color: #7c3aed; font-size: 1rem; margin-bottom: 6px;">
              🎯 அண்ணா பல்கலைக்கழகத்தில் 9+ CGPA பெறுவதற்கான 5 முக்கிய உத்திகள்:
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
              <div style="background: #f8fafc; border-left: 3px solid #7c3aed; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem;">
                <strong>1. பகுதி-A (2 மதிப்பெண்) கேள்விகளில் முழு கவனம்:</strong><br>
                10 x 2 = 20 மதிப்பெண்கள். இதில் 16-18 மதிப்பெண்கள் பெற்றாலே 'O' அல்லது 'A+' கிரேடு பெறுவது உறுதியாகிவிடும். வரையறைகள் (Definitions), சூத்திரங்கள் (Formulas) தெளிவாக எழுதுங்கள்.
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #2563eb; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem;">
                <strong>2. விடைத்தாள் வடிவமைப்பு (Neat Presentation):</strong><br>
                கருப்பு பேனாவில் துணைத் தலைப்புகள் (Sub-headings), பென்சிலில் பிளாக் டயகிராம்கள் (Block Diagrams), ஃப்ளோசார்ட்டுகள் வரையவும். பெரிய பத்திகளை தவிர்த்து புல்லட் பாயிண்ட்களாக எழுதுங்கள்.
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #059669; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem;">
                <strong>3. முந்தைய 5 ஆண்டு வினாத்தாள்கள் (PYQ):</strong><br>
                Nov/Dec மற்றும் Apr/May வினாத்தாள்களை தீர்த்து பாருங்கள். அண்ணா பல்கலைக்கழகத்தில் 60-70% வினாக்கள் மீண்டும் மீண்டும் கேட்கப்படும் முதன்மை தலைப்புகளில் இருந்தே வரும்.
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #d97706; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem;">
                <strong>4. கல்லூரி அகமதிப்பீட்டுத் தேர்வுகள் (IAT Internal Marks):</strong><br>
                R2021 விதிகளின்படி 40% அகமதிப்பீட்டு மதிப்பெண்கள் இருப்பதால், IAT 1, 2, 3 தேர்வுகளில் 18+ மதிப்பெண்கள் எடுப்பது உங்கள் இறுதி CGPA-வை மிக உயர்த்தும்.
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #dc2626; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem;">
                <strong>5. பரிந்துரைக்கப்பட்ட பாடப்புத்தகங்கள் (T1, T2 Textbooks):</strong><br>
                லோக்கல் நோட்ஸ்களை விட பாடத்திட்டத்தில் குறிப்பிடப்பட்டுள்ள T1, T2 புத்தகங்களின் எடுத்துக்காட்டுகளை படியுங்கள்.
              </div>
            </div>
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📚 பாடக் குறிப்புகள் (Notes) &amp; வினாத்தாள்களை பார்க்க ➔
            </button>
          </div>
        `);
      } else if (lang === 'tanglish') {
        return wrapLang(`
          <div>
            <div style="font-weight: 800; color: #7c3aed; font-size: 1rem; margin-bottom: 6px;">
              🎯 Anna University-la 9+ CGPA Score Panna 5 Golden Tips:
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
              <div style="background: #f8fafc; border-left: 3px solid #7c3aed; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem;">
                <strong>1. Part-A 2 Marks la Full Marks Edukkavum:</strong><br>
                10 x 2 = 20 marks. Idhula 16-18 marks eduthuttaale ungaluku 'O' illana 'A+' grade easy-a kedaikum! Formula &amp; definition neat-a ezhudhunga.
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #2563eb; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem;">
                <strong>2. Answer Paper Presentation (Diagrams &amp; Headings):</strong><br>
                Staff paper correct pannum bothu neat diagrams and flowcharts paathale 13-mark questions la full marks poduvaanga. Pencil use panni neat-a box podunga.
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #059669; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem;">
                <strong>3. Last 5 Years University Question Papers:</strong><br>
                Nov/Dec and Apr/May previous question papers la irundhu 60% to 70% questions repeat aagum. Previous year questions solve pannunga.
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #d97706; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem;">
                <strong>4. College Internal Marks (IAT 1, 2, 3):</strong><br>
                R2021 regulation la 40 marks internal weightage irukku! IAT exams la 18-20 marks maintain panna semester exam tension illama 9+ CGPA score pannalam.
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #dc2626; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem;">
                <strong>5. Official Prescribed Textbooks (T1, T2):</strong><br>
                Local duplicate Xerox notes vida, syllabus book la irukura T1, T2 textbooks paathutu pona questions straight-a match aagum!
              </div>
            </div>
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📚 Open Subject Notes &amp; Textbooks ➔
            </button>
          </div>
        `);
      } else {
        return wrapLang(`
          <div>
            <div style="font-weight: 800; color: #7c3aed; font-size: 1rem; margin-bottom: 6px;">
              🎯 5 Proven Strategies to Score 9+ CGPA in Anna University:
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
              <div style="background: #f8fafc; border-left: 3px solid #7c3aed; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem;">
                <strong>1. Master Part-A (2-Mark Questions):</strong><br>
                10 x 2 = 20 marks. Scoring 16-18 here creates an instant 'O' or 'A+' grade foundation. Focus on exact definitions, laws, and key formulas.
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #2563eb; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem;">
                <strong>2. High-Impact Presentation in Part-B &amp; Part-C:</strong><br>
                Use black pen for headings, draw labeled block diagrams and architecture flowcharts with pencil. Evaluators award maximum marks for structured points over long essays.
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #059669; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem;">
                <strong>3. Solve 5 Years Previous University Question Papers (PYQ):</strong><br>
                60-70% of 13-mark and 15-mark questions are derived from recurring university core concepts in Nov/Dec and Apr/May exams.
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #d97706; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem;">
                <strong>4. Maximize Internal Assessment Tests (IAT):</strong><br>
                Under Regulation R2021, internal marks carry a 40% weightage. Scoring 18+ out of 20 across IAT 1, 2, and 3 guarantees a high baseline GPA.
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #dc2626; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem;">
                <strong>5. Follow Prescribed Textbooks (T1, T2):</strong><br>
                Stick to official syllabus textbook authors (e.g., Pearson, McGraw-Hill, Cengage) available via our Google Books &amp; Internet Archive integration.
              </div>
            </div>
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📚 Open Notes &amp; Question Papers ➔
            </button>
          </div>
        `);
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 4. ARREAR CLEARING & PASSING STRATEGY
    // ─────────────────────────────────────────────────────────────────────────
    if (q.includes('arrear') || q.includes('fail') || q.includes('clear') || q.includes('pass aaguradhu') || q.includes('pass pann') || q.includes('ra grade')) {
      if (lang === 'ta') {
        return wrapLang(`
          <div>
            <div style="font-weight: 800; color: #dc2626; font-size: 1rem; margin-bottom: 6px;">
              📝 அண்ணா பல்கலைக்கழக அறியர் தேர்வுகளை எளிதில் கிளியர் செய்யும் ரகசியம்:
            </div>
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.83rem; line-height: 1.55;">
              <strong>1. 3 முழு அலகுகளில் (Units) முழு தேர்ச்சி:</strong> ஏதேனும் 3 யூனிட்களை முழுமையாக படித்தால் 3 x 13 = 39 மதிப்பெண்கள் + பகுதி A-யில் 10 மதிப்பெண்கள் என எளிதில் 50+ மதிப்பெண்கள் பெறலாம்.<br>
              <strong>2. விடைத்தாளை காலியாக விடாதீர்கள்:</strong> தெரியாத கேள்வியாக இருந்தாலும் தொடர்புடைய பிளாக் டயகிராம், ஃபார்முலா மற்றும் விளக்கங்களை எழுதுங்கள்.<br>
              <strong>3. கடைசி 3 ஆண்டு வினாத்தாள்களை மட்டும் பாருங்கள்:</strong> 13 மதிப்பெண் Either/Or கேள்விகளில் அடிக்கடி கேட்கப்படும் தலைப்புகளை மட்டும் குறித்து படியுங்கள்.
            </div>
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📝 வினாத்தாள்களை பார்க்க ➔
            </button>
          </div>
        `);
      } else if (lang === 'tanglish') {
        return wrapLang(`
          <div>
            <div style="font-weight: 800; color: #dc2626; font-size: 1rem; margin-bottom: 6px;">
              📝 Arrear Clear Panna 3 Simple Steps (Guaranteed Pass Strategy):
            </div>
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.83rem; line-height: 1.55;">
              <strong>1. Any 3 Units Thorough-a Padinga:</strong> 5 units-um half-boiled-a padikaama, Unit 1, Unit 2 and Unit 4 or 5 nalla padinga. 3 questions x 13 marks = 39 marks confirm!<br>
              <strong>2. Endha Question-ayum Blank-a Vidaadheenga:</strong> Part B la theriyatha question vanthaalum, related block diagram, algorithm, flow chart and keywords ezhudhunga. Anna university paper evaluation la step marks undu.<br>
              <strong>3. Previous 3 Years Papers Repeat Questions:</strong> Last 3 years question papers la repeat aana 10 important topics list panni first athai mudiinga!
            </div>
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📝 Open Question Papers ➔
            </button>
          </div>
        `);
      } else {
        return wrapLang(`
          <div>
            <div style="font-weight: 800; color: #dc2626; font-size: 1rem; margin-bottom: 6px;">
              📝 Arrear Clearance Blueprint: How to Clear Pending Papers Easily
            </div>
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.83rem; line-height: 1.55;">
              <strong>1. The 3-Unit Mastery Rule:</strong> Rather than skimming all 5 units, master 3 selected units completely (e.g. Unit 1, 2, and 5). This guarantees attempting 3 x 13 = 39 marks in Part-B plus 10-12 marks in Part-A.<br>
              <strong>2. Never Leave Any Answer Blank:</strong> Always draw relevant block diagrams, equations, and architectural models. Evaluators grant partial step-marking for diagrams and structured bullet points.<br>
              <strong>3. Repeated Question Bank:</strong> 70% of passing marks come from 15 recurring university questions in the last 4 semester exam series.
            </div>
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📝 Open University Question Papers ➔
            </button>
          </div>
        `);
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 5. CLOUD COMPUTING (Academic Concept Explanation)
    // ─────────────────────────────────────────────────────────────────────────
    if (q.includes('cloud') || q.includes('iaas') || q.includes('paas') || q.includes('saas') || q.includes('virtualization') || q.includes('aws') || q.includes('azure')) {
      if (lang === 'ta') {
        return wrapLang(`
          <div>
            <div style="font-weight: 800; color: #2563eb; font-size: 1rem; margin-bottom: 6px;">
              ☁️ கிளவுட் கம்ப்யூட்டிங் (Cloud Computing) - எளிய விளக்கம்:
            </div>
            <p style="font-size: 0.84rem; color: #334155; line-height: 1.55; margin: 0 0 10px 0;">
              சொந்தமாக விலை உயர்ந்த சர்வர்கள் வாங்காமல், இணையம் (Internet) வழியாக சேமிப்பகம் (Storage), சர்வர்கள் (Servers), மற்றும் மென்பொருட்களை (Software) வாடகைக்கு பயன்படுத்தும் தொழில்நுட்பமே <strong>கிளவுட் கம்ப்யூட்டிங்</strong> ஆகும்.
            </p>
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.82rem;">
              <strong>முக்கிய 3 சேவைகள் (Service Models):</strong><br>
              • <strong>IaaS (Infrastructure as a Service):</strong> கணினி வன்பொருள் &amp; சர்வர்கள் (எ.கா: AWS EC2, Google Compute Engine)<br>
              • <strong>PaaS (Platform as a Service):</strong> புரோகிராம் உருவாக்க தளம் (எ.கா: Google App Engine, Heroku)<br>
              • <strong>SaaS (Software as a Service):</strong> இணைய வழி மென்பொருள் பயன்பாடு (எ.கா: Gmail, Google Drive, Microsoft 365)
            </div>
            <div style="font-size: 0.8rem; color: #475569; margin-bottom: 10px;">
              அண்ணா பல்கலைக்கழக பாடக்குறியீடு: <strong>CS3491 / IT3501 (Cloud Computing)</strong> • பரிந்துரைக்கப்பட்ட புத்தகம்: <em>Kai Hwang - Distributed and Cloud Computing</em>
            </div>
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📖 கிளவுட் நோட்ஸ் &amp; புத்தகங்களை திறக்க ➔
            </button>
          </div>
        `);
      } else if (lang === 'tanglish') {
        return wrapLang(`
          <div>
            <div style="font-weight: 800; color: #2563eb; font-size: 1rem; margin-bottom: 6px;">
              ☁️ Cloud Computing na Enna? (Easy Tanglish Explanation):
            </div>
            <p style="font-size: 0.84rem; color: #334155; line-height: 1.55; margin: 0 0 10px 0;">
              Namaku thevayana servers, storage, databases, networking ellathayum internet vazhiya 'Pay-as-you-go' basis la rent panni use panrathu dhaan <strong>Cloud Computing</strong>!
            </p>
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.82rem;">
              <strong>3 Main Cloud Service Models:</strong><br>
              • <strong>IaaS (Infrastructure as a Service):</strong> Raw hardware, VMs and storage (e.g. AWS EC2, Azure VMs)<br>
              • <strong>PaaS (Platform as a Service):</strong> Coding run panna ready-made environment (e.g. Heroku, AWS Elastic Beanstalk)<br>
              • <strong>SaaS (Software as a Service):</strong> Direct-a use panra web apps (e.g. Google Drive, Netflix, Zoom)
            </div>
            <div style="font-size: 0.8rem; color: #475569; margin-bottom: 10px;">
              Anna University Subject: <strong>CS3491 / IT3501 Cloud Computing</strong>. Unit 1 to 5 notes and T1 textbook Google Books la available!
            </div>
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📖 Open Cloud Notes &amp; Textbooks ➔
            </button>
          </div>
        `);
      } else {
        return wrapLang(`
          <div>
            <div style="font-weight: 800; color: #2563eb; font-size: 1rem; margin-bottom: 6px;">
              ☁️ Cloud Computing: Core Concepts &amp; Architecture:
            </div>
            <p style="font-size: 0.84rem; color: #334155; line-height: 1.55; margin: 0 0 10px 0;">
              Cloud computing is the on-demand delivery of IT resources (computing power, storage, databases, networking) over the Internet with pay-as-you-go pricing without direct active management by the user.
            </p>
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.82rem;">
              <strong>Key Service Models (NIST Definition):</strong><br>
              • <strong>IaaS (Infrastructure as a Service):</strong> Provides physical/virtual machines and raw storage (AWS EC2, Google Compute Engine).<br>
              • <strong>PaaS (Platform as a Service):</strong> Provides hardware + application development environment (AWS Elastic Beanstalk, Heroku).<br>
              • <strong>SaaS (Software as a Service):</strong> Delivers complete end-user software applications over web browsers (Microsoft 365, Salesforce).
            </div>
            <div style="font-size: 0.8rem; color: #475569; margin-bottom: 10px;">
              Anna University Syllabus: <strong>CS3491 / IT3501 Cloud Computing</strong> • Prescribed Textbook (T1): <em>Distributed and Cloud Computing by Kai Hwang &amp; Geoffrey C. Fox</em>.
            </div>
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📖 Open Cloud Notes &amp; T1 Textbooks ➔
            </button>
          </div>
        `);
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 6. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
    // ─────────────────────────────────────────────────────────────────────────
    if (q.includes('artificial') || (q.includes('ai') && !q.includes('email') && !q.includes('fail')) || q.includes('machine learning') || q.includes('deep learning') || q.includes('neural') || q.includes('nlp')) {
      if (lang === 'ta') {
        return wrapLang(`
          <div>
            <div style="font-weight: 800; color: #7c3aed; font-size: 1rem; margin-bottom: 6px;">
              🤖 செயற்கை நுண்ணறிவு (AI) &amp; மெஷின் லேர்னிங் (ML) விளக்கம்:
            </div>
            <p style="font-size: 0.84rem; color: #334155; line-height: 1.55; margin: 0 0 10px 0;">
              மனிதனைப் போலவே சிந்தித்து, தரவுகளில் இருந்து கற்றுக்கொண்டு சுயமாக முடிவெடுக்கும் கணினி மென்பொருளை உருவாக்குவதே <strong>செயற்கை நுண்ணறிவு (AI)</strong> ஆகும்.
            </p>
            <div style="background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.82rem;">
              <strong>3 முக்கிய ML வகைகள்:</strong><br>
              • <strong>Supervised Learning:</strong> விடையுடன் கூடிய பயிற்சித் தரவு (எ.கா: Linear Regression)<br>
              • <strong>Unsupervised Learning:</strong> விடையில்லாத தரவுகளில் இருந்து அமைப்புகளைக் கண்டறிதல் (எ.கா: K-Means Clustering)<br>
              • <strong>Reinforcement Learning:</strong> பரிசு மற்றும் தண்டனை மூலம் சுயமாக கற்றுக்கொள்ளுதல் (எ.கா: Robot navigation, Chess AI)
            </div>
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📚 AI பாடத்திட்டம் &amp; குறிப்புகள் ➔
            </button>
          </div>
        `);
      } else if (lang === 'tanglish') {
        return wrapLang(`
          <div>
            <div style="font-weight: 800; color: #7c3aed; font-size: 1rem; margin-bottom: 6px;">
              🤖 AI &amp; Machine Learning (Simple Tanglish Concept):
            </div>
            <p style="font-size: 0.84rem; color: #334155; line-height: 1.55; margin: 0 0 10px 0;">
              Manushan maadhiri computer-um data-va paathu learn panni own-a predictions and decisions edukra technology dhaan <strong>Artificial Intelligence (AI)</strong>.
            </p>
            <div style="background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.82rem;">
              <strong>Core ML Types:</strong><br>
              • <strong>Supervised Learning:</strong> Labeled data vechu train panrathu (Classification, Regression)<br>
              • <strong>Unsupervised Learning:</strong> Pattern and clustering கண்டுபிடிப்பது (K-Means, PCA)<br>
              • <strong>Deep Learning:</strong> Neural networks vechu complex images, voice and text process panrathu
            </div>
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📚 View AI/ML Notes &amp; Projects ➔
            </button>
          </div>
        `);
      } else {
        return wrapLang(`
          <div>
            <div style="font-weight: 800; color: #7c3aed; font-size: 1rem; margin-bottom: 6px;">
              🤖 Artificial Intelligence &amp; Machine Learning Fundamentals:
            </div>
            <p style="font-size: 0.84rem; color: #334155; line-height: 1.55; margin: 0 0 10px 0;">
              Artificial Intelligence (AI) enables machines to emulate human cognition. Machine Learning (ML) is a subset of AI where mathematical models learn patterns directly from empirical datasets.
            </p>
            <div style="background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.82rem;">
              <strong>Key Paradigms:</strong><br>
              • <strong>Supervised Learning:</strong> Maps inputs to labeled targets (Linear Regression, Random Forests, SVM).<br>
              • <strong>Unsupervised Learning:</strong> Uncovers latent clusters in unlabeled data (K-Means, PCA).<br>
              • <strong>Deep Learning:</strong> Multi-layer artificial neural networks powering LLMs, Computer Vision, and Speech.
            </div>
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📚 View AI/ML Syllabus &amp; T1 Textbooks ➔
            </button>
          </div>
        `);
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 7. PROGRAMMING, DSA, DBMS, OS, NETWORKS & PYTHON
    // ─────────────────────────────────────────────────────────────────────────
    if (q.includes('python') || q.includes('java') || q.includes('dsa') || q.includes('data structure') || q.includes('dbms') || q.includes('database') || q.includes('operating system') || q.includes('network') || q.includes('os') || q.includes('sql')) {
      const topicName = q.includes('python') ? 'Python' : (q.includes('java') ? 'Java' : (q.includes('dsa') ? 'Data Structures & Algorithms' : (q.includes('dbms') ? 'DBMS & SQL' : 'Computer Networks / Operating Systems')));
      
      if (lang === 'ta') {
        return wrapLang(`
          <div>
            <div style="font-weight: 800; color: #0284c7; font-size: 1rem; margin-bottom: 6px;">
              💻 ${topicName} - அண்ணா பல்கலைக்கழக முக்கிய கருத்துக்கள்:
            </div>
            <p style="font-size: 0.84rem; color: #334155; line-height: 1.55; margin: 0 0 10px 0;">
              ${topicName} பாடத்தின் அடிப்படை கோட்பாடுகள் மற்றும் செமஸ்டர் தேர்வுக்கான முக்கியமான 2 மதிப்பெண் மற்றும் 13 மதிப்பெண் வினாக்கள் போர்ட்டலில் உள்ளன.
            </p>
            <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.82rem;">
              ✓ அனைத்து 5 யூனிட் விரிவான குறிப்புகள்<br>
              ✓ செய்முறை லேப் மேனுவல் மற்றும் பயிற்சிகள்<br>
              ✓ பரிந்துரைக்கப்பட்ட T1, T2 பாடப்புத்தகங்கள்
            </div>
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📖 ${topicName} குறிப்புகளை திறக்க ➔
            </button>
          </div>
        `);
      } else if (lang === 'tanglish') {
        return wrapLang(`
          <div>
            <div style="font-weight: 800; color: #0284c7; font-size: 1rem; margin-bottom: 6px;">
              💻 ${topicName} - Core Concepts &amp; Exam Tips:
            </div>
            <p style="font-size: 0.84rem; color: #334155; line-height: 1.55; margin: 0 0 10px 0;">
              ${topicName} subject-ku thevayana Unit 1 to 5 notes, 2 marks with answers and lab programs namadhu portal-la available-a irukku!
            </p>
            <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.82rem;">
              ✓ Unit 1 to 5 Complete Theory &amp; Code<br>
              ✓ Previous Year Question Papers &amp; 2-Marks<br>
              ✓ Prescribed T1, T2 Textbooks on Google Books
            </div>
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📖 Open ${topicName} Notes &amp; Lab Manual ➔
            </button>
          </div>
        `);
      } else {
        return wrapLang(`
          <div>
            <div style="font-weight: 800; color: #0284c7; font-size: 1rem; margin-bottom: 6px;">
              💻 ${topicName}: Anna University Core Engineering Foundations:
            </div>
            <p style="font-size: 0.84rem; color: #334155; line-height: 1.55; margin: 0 0 10px 0;">
              Access comprehensive lecture notes, 2-mark solved banks, lab manual experiments, and prescribed syllabus textbooks for <strong>${topicName}</strong>.
            </p>
            <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.82rem;">
              ✓ Unit 1 to Unit 5 Syllabus Notes<br>
              ✓ Solved 2-Mark &amp; 16-Mark University Question Banks<br>
              ✓ Official Prescribed Textbooks (T1, T2) with Google Books &amp; Archive
            </div>
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📖 Open ${topicName} Notes ➔
            </button>
          </div>
        `);
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 8. RESEARCH PAPERS: GOOGLE SCHOLAR & IEEE XPLORE
    // ─────────────────────────────────────────────────────────────────────────
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

      return wrapLang(`
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
              <a href="${scholarUrl}" target="_blank" rel="noopener noreferrer" class="chat-card-btn" style="background: #2563eb; align-self: flex-start; text-decoration: none;">
                Open in Google Scholar ↗
              </a>
            </div>

            <div class="chat-card">
              <div class="chat-card-title">2. IEEE Xplore Transactions &amp; Conference Proceedings</div>
              <div class="chat-card-desc">Explore authoritative IEEE computer &amp; engineering conference publications, standards, and journal articles.</div>
              <a href="${ieeeUrl}" target="_blank" rel="noopener noreferrer" class="chat-card-btn" style="background: #0891b2; align-self: flex-start; text-decoration: none;">
                Search IEEE Xplore ↗
              </a>
            </div>
          </div>
        </div>
      `);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 9. BOOK REFERENCES: GOOGLE BOOKS & INTERNET ARCHIVE
    // ─────────────────────────────────────────────────────────────────────────
    if (q.includes('book') || q.includes('textbook') || q.includes('reference') || q.includes('google book') || q.includes('archive') || q.includes('open library') || q.includes('author') || q.includes('edition') || q.includes('t1') || q.includes('t2')) {
      const allSubjects = window.AppFallbackData?.subjects || [];
      const matchingSub = allSubjects.find(s => 
        q.includes(s.code.toLowerCase()) || 
        (s.name && q.includes(s.name.toLowerCase()))
      ) || allSubjects.find(s => (s.deptCode || '').toUpperCase() === targetDept.toUpperCase()) || { code: 'CS3351', name: 'Digital Principles and System Design' };

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

      return wrapLang(`
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
                    <a href="${googleBooksUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn google-books" title="Read Preview on Google Books">
                      <span>📖 Google Books</span>
                      <span>↗</span>
                    </a>
                    <a href="${archiveOrgUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn archive-org" title="Borrow Digital E-Book on Internet Archive">
                      <span>🏛️ Internet Archive</span>
                      <span>↗</span>
                    </a>
                    <a href="${openLibraryUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn google-scholar" title="Search Open Library">
                      <span>📚 Open Library</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div style="margin-top: 10px;">
            <button type="button" class="chat-card-btn" style="width: 100%;" onclick="window.appState.setView('notes', { semester: ${matchingSub.semester || 1}, subjectId: '${matchingSub.id || matchingSub.code}', subjectCode: '${matchingSub.code}', tab: 'textbooks' }); window.ChatbotWidget.toggleChat(false);">
              📖 Open Full Textbooks Tab in Subject Notes ➔
            </button>
          </div>
        </div>
      `);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 10. JOB ROLES & SALARIES
    // ─────────────────────────────────────────────────────────────────────────
    if (q.includes('job') || q.includes('role') || q.includes('career') || q.includes('salary') || q.includes('lpa') || q.includes('velai') || q.includes('roles') || q.includes('sambalam') || q.includes('placement') || q.includes('package')) {
      const allRoles = window.DepartmentalRolesData || window.AppFallbackData?.jobRoles || [];
      const deptRoles = allRoles.filter(r => (r.deptCode || '').toUpperCase() === targetDept.toUpperCase());
      const displayRoles = deptRoles.length > 0 ? deptRoles.slice(0, 4) : allRoles.slice(0, 4);

      return wrapLang(`
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
                  <button type="button" class="chat-card-btn" onclick="window.appState.setView('dept-roles'); window.ChatbotWidget.toggleChat(false);">
                    Explore in Page 1: Roles ➔
                  </button>
                  <button type="button" class="chat-card-btn" style="background: #2563eb;" onclick="window.appState.setView('roadmaps'); window.ChatbotWidget.toggleChat(false);">
                    View Roadmap ➔
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 11. CAREER ROADMAPS
    // ─────────────────────────────────────────────────────────────────────────
    if (q.includes('roadmap') || q.includes('phase') || q.includes('how to become') || q.includes('pathway') || q.includes('step by step') || q.includes('blueprint') || q.includes('vali') || q.includes('route')) {
      const roadmaps = window.CareerRoadmapsData || [];
      const match = roadmaps.find(rm => 
        (rm.deptCode && rm.deptCode.toUpperCase() === targetDept.toUpperCase()) || 
        q.includes(rm.roleTitle.toLowerCase()) || 
        q.includes(rm.deptCode.toLowerCase())
      ) || roadmaps[0];

      if (match) {
        return wrapLang(`
          <div>
            <div style="font-weight: 700; color: #2563eb; margin-bottom: 6px;">
              🗺️ 4-Phase Learning Roadmap: <strong>${match.roleTitle} (${targetDept})</strong>
            </div>
            <p style="margin: 0 0 10px 0; font-size: 0.82rem; color: #475569;">
              Step-by-step career blueprint approved by faculty and industry mentors:
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
              <button type="button" class="chat-card-btn" style="width: 100%;" onclick="window.appState.setView('roadmaps'); window.ChatbotWidget.toggleChat(false);">
                📋 Open Full Interactive Roadmap Blueprint ➔
              </button>
            </div>
          </div>
        `);
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 12. PROJECT IDEAS (MINI, CAPSTONE, AI/ML, IOT)
    // ─────────────────────────────────────────────────────────────────────────
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

      return wrapLang(`
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
                  <button type="button" class="chat-card-btn" style="background: #d97706;" onclick="window.appState.setView('projects'); window.ChatbotWidget.toggleChat(false);">
                    View in Projects Hub ➔
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
          <div style="margin-top: 10px;">
            <button type="button" class="chat-card-btn" style="width: 100%; background: #d97706;" onclick="window.appState.setView('projects'); window.ChatbotWidget.toggleChat(false);">
              💡 Explore All Project Tracks ➔
            </button>
          </div>
        </div>
      `);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 13. NOTES, SYLLABUS & SUBJECTS
    // ─────────────────────────────────────────────────────────────────────────
    if (q.includes('note') || q.includes('syllabus') || q.includes('subject') || q.includes('unit') || q.includes('lab') || q.includes('question paper') || q.includes('pyq')) {
      const allSubjects = window.AppFallbackData?.subjects || [];
      const matchingSub = allSubjects.find(s => 
        q.includes(s.code.toLowerCase()) || 
        (s.name && q.includes(s.name.toLowerCase()))
      );

      if (matchingSub) {
        const googleBooksUrl = `https://books.google.com/books?q=${encodeURIComponent(matchingSub.name + ' textbook')}`;
        const archiveOrgUrl = `https://archive.org/search?query=${encodeURIComponent(matchingSub.name)}`;

        return wrapLang(`
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

            <button type="button" class="chat-card-btn" style="width: 100%;" onclick="window.appState.setView('notes', { semester: ${matchingSub.semester}, subjectId: '${matchingSub.id || matchingSub.code}', subjectCode: '${matchingSub.code}' }); window.ChatbotWidget.toggleChat(false);">
              📖 Open Notes &amp; Syllabus for ${matchingSub.code} ➔
            </button>
          </div>
        `);
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 14. UNIVERSAL STUDENT QUESTION ANSWERER (Fallback with intelligent breakdown)
    // ─────────────────────────────────────────────────────────────────────────
    const safeTopic = this.escapeHtml(rawQ);
    const googleBooksUrl = `https://books.google.com/books?q=${encodeURIComponent(rawQ + ' ' + targetDept + ' engineering')}`;
    const archiveOrgUrl = `https://archive.org/search?query=${encodeURIComponent(rawQ)}`;
    const scholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(rawQ + ' Anna University research')}`;
    const ieeeUrl = `https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=${encodeURIComponent(rawQ)}`;

    if (lang === 'ta') {
      return wrapLang(`
        <div>
          <div style="font-weight: 800; color: #1e1b4b; font-size: 0.95rem; margin-bottom: 6px;">
            🎓 "${safeTopic}" குறித்த அண்ணா பல்கலைக்கழக வழிகாட்டல்:
          </div>
          <p style="font-size: 0.84rem; color: #334155; line-height: 1.55; margin: 0 0 10px 0;">
            நீங்கள் கேட்ட <strong>"${safeTopic}"</strong> தொடர்பான விரிவான பாடக்குறிப்புகள், தேர்வுக்கு உதவும் முக்கிய 2 மற்றும் 13 மதிப்பெண் வினாக்கள் மற்றும் பாடப்புத்தகங்கள் நம் போர்ட்டலில் இணைக்கப்பட்டுள்ளன.
          </p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.82rem;">
            📌 <strong>பாடப்பிரிவு:</strong> ${targetDept} (Anna University Regulation R2021)<br>
            📚 <strong>பாடப்புத்தகங்கள்:</strong> Google Books மற்றும் Internet Archive வழியே T1, T2 புத்தகங்களை உடனே படிக்கலாம்.<br>
            🔬 <strong>ஆராய்ச்சித் தாள்கள்:</strong> Google Scholar மற்றும் IEEE Xplore மூலம் தொடர்புடைய ஆய்வுக் கட்டுரைகளை அணுகலாம்.
          </div>
          <div class="portal-search-grid" style="margin-bottom: 10px;">
            <a href="${googleBooksUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn google-books">
              <span>📖 Google Books</span>
              <span>↗</span>
            </a>
            <a href="${scholarUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn google-scholar">
              <span>🎓 Google Scholar</span>
              <span>↗</span>
            </a>
          </div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📚 பாடக் குறிப்புகள் (Notes) ➔
            </button>
            <button type="button" class="chat-card-btn" style="background: #2563eb;" onclick="window.appState.setView('dept-roles'); window.ChatbotWidget.toggleChat(false);">
              💼 வேலைவாய்ப்புகள் ➔
            </button>
          </div>
        </div>
      `);
    } else if (lang === 'tanglish') {
      return wrapLang(`
        <div>
          <div style="font-weight: 800; color: #1e1b4b; font-size: 0.95rem; margin-bottom: 6px;">
            🎓 "${safeTopic}" pathina Information &amp; Study Links:
          </div>
          <p style="font-size: 0.84rem; color: #334155; line-height: 1.55; margin: 0 0 10px 0;">
            Neenga keta <strong>"${safeTopic}"</strong> topic-ku Anna University syllabus notes, important questions, Google Books and research papers ready-a irukku!
          </p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.82rem;">
            📌 <strong>Target Department:</strong> ${targetDept} • Regulation R2021<br>
            📖 <strong>Textbooks:</strong> Prescribed T1, T2 books Google Books &amp; Archive.org-la browse pannalam.<br>
            🔬 <strong>Research Papers:</strong> Live Google Scholar &amp; IEEE Xplore literature available.
          </div>
          <div class="portal-search-grid" style="margin-bottom: 10px;">
            <a href="${googleBooksUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn google-books">
              <span>📖 Google Books</span>
              <span>↗</span>
            </a>
            <a href="${scholarUrl}" target="_blank" rel="noopener noreferrer" class="portal-ref-btn google-scholar">
              <span>🎓 Google Scholar</span>
              <span>↗</span>
            </a>
          </div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📚 Open Notes &amp; Syllabus ➔
            </button>
            <button type="button" class="chat-card-btn" style="background: #2563eb;" onclick="window.appState.setView('dept-roles'); window.ChatbotWidget.toggleChat(false);">
              💼 View Careers &amp; Salaries ➔
            </button>
          </div>
        </div>
      `);
    } else {
      return wrapLang(`
        <div>
          <div style="font-weight: 800; color: #1e1b4b; font-size: 0.95rem; margin-bottom: 6px;">
            🎓 Academic Guidance for "${safeTopic}":
          </div>
          <p style="font-size: 0.84rem; color: #334155; line-height: 1.55; margin: 0 0 10px 0;">
            Here are the Anna University academic resources, reference textbooks, and research publications for <strong>"${safeTopic}"</strong> (${targetDept}):
          </p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; font-size: 0.82rem;">
            📌 <strong>Department:</strong> ${targetDept} • Anna University Regulation R2021<br>
            📖 <strong>Prescribed Textbooks:</strong> Instant lookup across Google Books and Internet Archive (T1, T2).<br>
            🔬 <strong>Research Literature:</strong> Live discovery across Google Scholar and IEEE Xplore.
          </div>
          <div class="portal-search-grid" style="margin-bottom: 10px;">
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
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button type="button" class="chat-card-btn" onclick="window.appState.setView('notes'); window.ChatbotWidget.toggleChat(false);">
              📚 Subject Notes &amp; Units
            </button>
            <button type="button" class="chat-card-btn" style="background: #2563eb;" onclick="window.appState.setView('dept-roles'); window.ChatbotWidget.toggleChat(false);">
              💼 Department Careers
            </button>
            <button type="button" class="chat-card-btn" style="background: #d97706;" onclick="window.appState.setView('projects'); window.ChatbotWidget.toggleChat(false);">
              💡 Engineering Projects
            </button>
          </div>
        </div>
      `);
    }
  },

  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};
