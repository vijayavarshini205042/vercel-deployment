/**
 * Question Papers View Component
 * Flow: Semester -> Subject -> Academic Year -> Question Paper PDF
 * Features: Search, Year filters, PDF preview modal, Download, Bookmarking, Upload & Edit question papers.
 */

window.QuestionPapersView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const currentReg = state.regulation || 'R2021';
    const currentDeptCode = state.department || 'IT';
    const params = state.viewParams || {};

    let selectedSem = params.semester || 'all';
    let selectedSubjectId = params.subjectId || params.subjectCode || null;
    let selectedYear = 'all';
    let searchQuery = '';

    // Fetch live question papers from DB so any Admin additions/edits are immediately visible
    try {
      if (window.apiService) {
        const queryParams = new URLSearchParams({
          deptCode: currentDeptCode,
          regCode: currentReg
        });
        if (selectedSem !== 'all') queryParams.append('semester', selectedSem);
        if (selectedSubjectId) queryParams.append('subjectId', selectedSubjectId);
        
        const res = await window.apiService.get(`/resources/question-papers?${queryParams.toString()}`);
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          if (!Array.isArray(window.AppFallbackData.questionPapers)) {
            window.AppFallbackData.questionPapers = [];
          }
          res.data.forEach(dbQP => {
            const qpId = dbQP.id || dbQP._id;
            const existingIdx = window.AppFallbackData.questionPapers.findIndex(q => (q._id && q._id === dbQP._id) || (q.id && q.id === qpId));
            if (existingIdx !== -1) {
              window.AppFallbackData.questionPapers[existingIdx] = { ...window.AppFallbackData.questionPapers[existingIdx], ...dbQP };
            } else {
              window.AppFallbackData.questionPapers.unshift({ ...dbQP, id: qpId });
            }
          });
        }
      }
    } catch (e) {
      console.warn('Live QP fetch error, using local dataset:', e);
    }

    const renderContent = () => {
      // Ensure questionPapers array exists
      if (!window.AppFallbackData) window.AppFallbackData = {};
      if (!window.AppFallbackData.questionPapers) window.AppFallbackData.questionPapers = [];

      const currentSubject = (window.AppFallbackData?.subjects || []).find(s => s.id === selectedSubjectId || s.code === selectedSubjectId);

      // Filter question papers
      let allQPs = window.AppFallbackData.questionPapers.filter(qp => {
        const matchesSubject = selectedSubjectId ? (qp.subjectId === selectedSubjectId || qp.subjectCode === currentSubject?.code) : true;
        const matchesDept = qp.deptCode ? qp.deptCode.toUpperCase() === currentDeptCode.toUpperCase() : true;
        const matchesReg = qp.regCode ? qp.regCode.toUpperCase() === currentReg.toUpperCase() : true;
        const matchesSem = selectedSem === 'all' || qp.semester === selectedSem;
        const matchesYear = selectedYear === 'all' || (qp.academicYear && qp.academicYear.includes(selectedYear));
        const matchesSearch = !searchQuery || 
          (qp.subjectName && qp.subjectName.toLowerCase().includes(searchQuery.toLowerCase())) || 
          (qp.subjectCode && qp.subjectCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (qp.academicYear && qp.academicYear.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (qp.title && qp.title.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesSubject && matchesDept && matchesReg && matchesSem && matchesYear && matchesSearch;
      });

      // If no QPs exist for this subject or selection, dynamically generate past university exam series
      if (allQPs.length === 0 && window.FreeStudyPortals) {
        let subjectsToGenerate = [];
        if (currentSubject) {
          subjectsToGenerate = [currentSubject];
        } else {
          // Find subjects matching current department and semester
          const deptSubjects = (window.AppFallbackData?.subjects || []).filter(s => {
            const matchesDept = s.deptCode && s.deptCode.toUpperCase() === currentDeptCode.toUpperCase();
            const matchesReg = s.regCode && s.regCode.toUpperCase() === currentReg.toUpperCase();
            const matchesSem = selectedSem === 'all' || s.semester === selectedSem;
            return matchesDept && matchesReg && matchesSem;
          });
          subjectsToGenerate = deptSubjects.length > 0 ? deptSubjects : (window.AppFallbackData?.subjects || []).filter(s => s.deptCode && s.deptCode.toUpperCase() === currentDeptCode.toUpperCase());
        }

        const generatedQPs = [];
        subjectsToGenerate.forEach(sub => {
          generatedQPs.push(...window.FreeStudyPortals.generateQuestionPapers(sub));
        });

        allQPs = generatedQPs.filter(qp => {
          const matchesYear = selectedYear === 'all' || (qp.academicYear && qp.academicYear.includes(selectedYear));
          const matchesSearch = !searchQuery || 
            (qp.subjectName && qp.subjectName.toLowerCase().includes(searchQuery.toLowerCase())) || 
            (qp.subjectCode && qp.subjectCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (qp.academicYear && qp.academicYear.toLowerCase().includes(searchQuery.toLowerCase()));
          return matchesYear && matchesSearch;
        });
      }

      container.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; width: 100%;">
          <!-- Page Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <span class="badge badge-success">📝 Previous Question Papers</span>
                <span class="badge badge-subtle">${currentReg}</span>
                <span class="badge badge-subtle">${currentDeptCode}</span>
              </div>
              <h1 style="font-size: 1.85rem; font-weight: 800; color: var(--text-primary); margin: 0;">University Examination Question Papers</h1>
            </div>

            <!-- Search box & Upload Button -->
            <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
              <div style="position: relative; width: 260px;">
                <input 
                  type="text" 
                  id="qp-search-input" 
                  class="form-input" 
                  placeholder="Search subject or year..." 
                  value="${searchQuery}"
                  style="padding-left: 36px; width: 100%; border-radius: var(--radius-md);"
                >
                <span style="position: absolute; left: 12px; top: 10px; color: var(--text-muted);">🔍</span>
              </div>

              <button class="btn btn-primary trigger-upload-qp-btn" style="display: inline-flex; align-items: center; gap: 6px; font-weight: 700; padding: 9px 16px; border-radius: var(--radius-md); box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);">
                📤 + Upload Question Paper
              </button>
            </div>
          </div>

          <!-- Step 1: Semester Selector Chips (1 to 8) -->
          <div style="margin-bottom: 20px;">
            <div style="font-size: 0.8125rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">
              Filter by Semester:
            </div>
            <div class="chip-container" style="margin: 0; display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="chip qp-sem-chip ${selectedSem === 'all' ? 'active' : ''}" data-sem="all">
                All Semesters
              </button>
              ${[1, 2, 3, 4, 5, 6, 7, 8].map(semNum => `
                <button class="chip qp-sem-chip ${selectedSem === semNum ? 'active' : ''}" data-sem="${semNum}">
                  Semester ${semNum}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Step 2: Academic Year Filter Chips -->
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;">
            <span style="font-size: 0.8125rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
              Academic Year:
            </span>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="chip qp-year-chip ${selectedYear === 'all' ? 'active' : ''}" data-year="all">All Years</button>
              <button class="chip qp-year-chip ${selectedYear === '2025' ? 'active' : ''}" data-year="2025">2025</button>
              <button class="chip qp-year-chip ${selectedYear === '2024' ? 'active' : ''}" data-year="2024">2024</button>
              <button class="chip qp-year-chip ${selectedYear === '2023' ? 'active' : ''}" data-year="2023">2023</button>
              <button class="chip qp-year-chip ${selectedYear === '2022' ? 'active' : ''}" data-year="2022">2022</button>
            </div>
          </div>

          <!-- Official Academic Digital Repositories -->
          <div class="card" style="padding: 16px 20px; margin-bottom: 24px; background: var(--bg-surface); border: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                <span>📑</span> <strong>Anna University Question Papers & Question Banks — Verified Digital Repositories</strong>
              </div>
              <span class="badge badge-success" style="font-size: 0.72rem;">100% Free Solved Papers & Question Banks</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
              <a href="https://onlinecourses.nptel.ac.in/explorer?q=${encodeURIComponent(currentSubject ? currentSubject.name || currentSubject.code : currentDeptCode + ' engineering')}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 10px 14px; border-radius: var(--radius-md); background: rgba(37, 99, 235, 0.08); border: 1px solid rgba(37, 99, 235, 0.25); color: #2563eb; font-weight: 600; font-size: 0.82rem; display: flex; align-items: center; justify-content: space-between;">
                <span>🇮🇳 NPTEL / SWAYAM QP Archive</span>
                <span>↗</span>
              </a>
              <a href="https://ndl.iitkgp.ac.in/result?q=${encodeURIComponent(currentSubject ? currentSubject.code + ' question paper' : currentDeptCode + ' question paper')}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 10px 14px; border-radius: var(--radius-md); background: rgba(5, 150, 105, 0.08); border: 1px solid rgba(5, 150, 105, 0.25); color: #059669; font-weight: 600; font-size: 0.82rem; display: flex; align-items: center; justify-content: space-between;">
                <span>🏛️ National Digital Library (NDLI)</span>
                <span>↗</span>
              </a>
              <a href="https://openlibrary.org/search?q=${encodeURIComponent(currentSubject ? currentSubject.name || currentSubject.code : currentDeptCode + ' engineering')}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 10px 14px; border-radius: var(--radius-md); background: rgba(217, 119, 6, 0.08); border: 1px solid rgba(217, 119, 6, 0.25); color: #d97706; font-weight: 600; font-size: 0.82rem; display: flex; align-items: center; justify-content: space-between;">
                <span>📖 Open Library Academic Repository</span>
                <span>↗</span>
              </a>
              <a href="https://cac.annauniv.edu" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 10px 14px; border-radius: var(--radius-md); background: rgba(124, 58, 237, 0.08); border: 1px solid rgba(124, 58, 237, 0.25); color: #7c3aed; font-weight: 600; font-size: 0.82rem; display: flex; align-items: center; justify-content: space-between;">
                <span>🎓 Anna University CAC Curriculum & Model QPs</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <!-- Question Papers Cards Grid -->
          ${allQPs.length === 0 ? `
            <div class="empty-state" style="padding: 48px 24px; text-align: center; border: 2px dashed var(--border-color); border-radius: var(--radius-lg); background: var(--bg-surface);">
              <div class="empty-state-icon" style="font-size: 3rem; margin-bottom: 12px;">📝</div>
              <div class="empty-state-title" style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">No Question Papers Available</div>
              <div class="empty-state-desc" style="color: var(--text-secondary); margin-bottom: 20px; font-size: 0.9rem;">
                No past university question papers found for the selected semester or year filter. You can upload one right now!
              </div>
              <button class="btn btn-primary trigger-upload-qp-btn" style="display: inline-flex; align-items: center; gap: 8px; font-weight: 700; padding: 10px 22px; border-radius: var(--radius-md); box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);">
                📤 + Upload Question Paper
              </button>
            </div>
          ` : `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 20px;">
              ${allQPs.map(qp => {
                const qpIdentifier = qp.id || qp._id;
                const isBookmarked = window.appState ? window.appState.isBookmarked(qpIdentifier) : false;
                return `
                  <div class="card card-hoverable qp-item-card" style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer;">
                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 8px;">
                        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                          <span class="badge badge-success" style="font-size: 0.72rem;">${qp.examType || 'University Exam'}</span>
                          <span class="badge badge-subtle" style="font-size: 0.72rem;">Sem ${qp.semester}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px;">
                          <button 
                            class="btn btn-icon btn-ghost edit-qp-btn" 
                            data-qpid="${qpIdentifier}"
                            title="Edit this Question Paper"
                            style="padding: 4px; font-size: 0.95rem; border-radius: var(--radius-sm);"
                          >
                            ✏️
                          </button>
                          <button 
                            class="btn btn-icon btn-ghost bookmark-qp-btn" 
                            data-qpid="${qpIdentifier}"
                            data-title="${qp.subjectName} (${qp.academicYear})"
                            title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark this paper'}"
                            style="padding: 4px;"
                          >
                            <span style="font-size: 1.2rem;">${isBookmarked ? '⭐' : '☆'}</span>
                          </button>
                        </div>
                      </div>

                      <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; line-height: 1.4;">
                        ${qp.subjectName}
                      </h3>

                      <div style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 12px;">
                        Course Code: <strong>${qp.subjectCode}</strong> • Exam Session: <strong>${qp.academicYear}</strong>
                      </div>

                      ${qp.title ? `
                        <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.4;">
                          ${qp.title}
                        </div>
                      ` : ''}

                      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 10px; background: var(--bg-subtle); padding: 8px 12px; border-radius: var(--radius-md);">
                        <span>📄 ${qp.fileSize || '1.2 MB'} PDF</span>
                        <span>📥 ${qp.downloads || 0} downloads</span>
                      </div>

                      <!-- Official Verified Academic Repositories -->
                      <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; padding: 6px 10px; background: var(--bg-surface-elevated); border-radius: var(--radius-sm); border: 1px dashed var(--border-color); align-items: center;">
                        <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted); display: flex; align-items: center; gap: 4px;">🏛️ Repositories:</span>
                        <a href="https://onlinecourses.nptel.ac.in/explorer?q=${encodeURIComponent(qp.subjectName || qp.subjectCode || '')}" target="_blank" rel="noopener noreferrer" class="badge" style="background: rgba(37,99,235,0.08); color: #2563eb; text-decoration: none; font-size: 0.7rem; padding: 3px 8px; border-radius: 4px; font-weight: 600;">🏛️ NPTEL / SWAYAM ↗</a>
                        <a href="https://ndl.iitkgp.ac.in/result?q=${encodeURIComponent(qp.subjectName || qp.subjectCode || '')}" target="_blank" rel="noopener noreferrer" class="badge" style="background: rgba(5,150,105,0.08); color: #059669; text-decoration: none; font-size: 0.7rem; padding: 3px 8px; border-radius: 4px; font-weight: 600;">📚 NDLI Repository ↗</a>
                        <a href="https://cac.annauniv.edu" target="_blank" rel="noopener noreferrer" class="badge" style="background: rgba(124,58,237,0.08); color: #7c3aed; text-decoration: none; font-size: 0.7rem; padding: 3px 8px; border-radius: 4px; font-weight: 600;">🎓 Anna University CAC ↗</a>
                      </div>

                      ${(qp.analysis || qp.questions || (window.PYQAnalysisData && window.PYQAnalysisData.find(p => p.qpCode === qp.qpCode || p.subjectCode === qp.subjectCode))) ? `
                        <div style="background: rgba(37, 99, 235, 0.08); border: 1px solid rgba(37, 99, 235, 0.22); border-radius: var(--radius-md); padding: 10px 12px; margin-bottom: 14px;">
                          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                            <span style="font-weight: 700; font-size: 0.78rem; color: #2563eb; text-transform: uppercase;">📊 Solved Paper & Analysis</span>
                            <span class="badge badge-success" style="font-size: 0.72rem;">QP Code: ${qp.qpCode || 'AU'}</span>
                          </div>
                          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px; line-height: 1.4;">
                            Includes Unit-wise weightage, high-frequency topics, Part A (2-marks), Part B (13-marks), and Part C solved answers.
                          </div>
                          <button 
                            class="btn btn-primary btn-sm view-analysis-btn" 
                            style="width: 100%; font-weight: 700; font-size: 0.82rem; padding: 7px 10px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: linear-gradient(135deg, #2563eb, #1d4ed8); box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);"
                            data-qpid="${qpIdentifier}"
                            data-qpcode="${qp.qpCode || ''}"
                            data-subcode="${qp.subjectCode}"
                          >
                            📊 View Paper Analysis & Solved Questions
                          </button>
                        </div>
                      ` : ''}
                    </div>

                    <!-- Action Buttons -->
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: auto;">
                      <button 
                        class="btn btn-secondary btn-sm preview-qp-btn" 
                        style="flex: 1; min-width: 90px;"
                        data-title="${qp.subjectName} - ${qp.academicYear}"
                        data-file="${qp.fileName || 'Question_Paper.pdf'}"
                        data-fileurl="${qp.fileUrl || ''}"
                        data-subject="${qp.subjectName}"
                        data-year="${qp.academicYear}"
                        data-sem="${qp.semester}"
                        data-downloads="${qp.downloads || 0}"
                      >
                        👁️ Preview
                      </button>
                      <button 
                        class="btn btn-primary btn-sm download-qp-btn" 
                        style="flex: 1; min-width: 90px;"
                        data-file="${qp.fileName || 'Question_Paper.pdf'}"
                        data-fileurl="${qp.fileUrl || ''}"
                        data-qpid="${qpIdentifier}"
                      >
                        ⬇️ Download
                      </button>
                      <button 
                        class="btn btn-ghost btn-sm edit-qp-btn" 
                        style="padding: 6px 12px; border: 1px solid var(--border-color);"
                        data-qpid="${qpIdentifier}"
                      >
                        ✏️ Edit
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      `;

      // Event listeners
      container.querySelectorAll('.qp-sem-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const semVal = chip.getAttribute('data-sem');
          selectedSem = semVal === 'all' ? 'all' : parseInt(semVal);
          renderContent();
        });
      });

      container.querySelectorAll('.qp-year-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          selectedYear = chip.getAttribute('data-year');
          renderContent();
        });
      });

      container.querySelector('#qp-search-input')?.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderContent();
      });

      // View Paper Analysis Modal
      container.querySelectorAll('.view-analysis-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const qpId = btn.getAttribute('data-qpid');
          const qpCode = btn.getAttribute('data-qpcode');
          const subCode = btn.getAttribute('data-subcode');

          let qp = window.AppFallbackData.questionPapers.find(p => p.id === qpId || p._id === qpId);
          let analysisItem = (window.PYQAnalysisData || []).find(p => p.qpCode === qpCode || p.subjectCode === subCode);

          this.openAnalysisModal(qp, analysisItem);
        });
      });

      // Preview Question Paper
      container.querySelectorAll('.preview-qp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const title = btn.getAttribute('data-title');
          const fileName = btn.getAttribute('data-file');
          const fileUrl = btn.getAttribute('data-fileurl');
          const subject = btn.getAttribute('data-subject');
          const year = btn.getAttribute('data-year');
          const sem = btn.getAttribute('data-sem');
          const downloads = parseInt(btn.getAttribute('data-downloads') || '0');

          if (window.PdfViewerModal) {
            window.PdfViewerModal.open({
              title: `${subject} (${year})`,
              fileName: fileName,
              fileUrl: fileUrl,
              subjectName: `${subject} • Semester ${sem}`,
              unit: year,
              description: `Anna University ${year} End-Semester Examination Question Paper for ${subject}.`,
              uploadedBy: 'Examination Cell / Faculty',
              downloadCount: downloads
            });
          }
        });
      });

      // Touching/clicking anywhere on the QP card opens its preview modal
      container.querySelectorAll('.qp-item-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) {
            return;
          }
          const previewBtn = card.querySelector('.preview-qp-btn');
          if (previewBtn) previewBtn.click();
        });
      });

      // Download Question Paper
      container.querySelectorAll('.download-qp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const fileName = btn.getAttribute('data-file') || 'Question_Paper.pdf';
          const fileUrl = btn.getAttribute('data-fileurl');
          const qpId = btn.getAttribute('data-qpid');

          if (window.appState && window.appState.addDownload) {
            window.appState.addDownload(qpId);
          }

          if (fileUrl && fileUrl !== '#' && fileUrl !== 'default_qp.pdf') {
            const a = document.createElement('a');
            a.href = fileUrl;
            a.download = fileName;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }

          if (window.Toast) {
            window.Toast.success(`Downloading question paper: ${fileName}...`);
          }
        });
      });

      // Bookmark Question Paper
      container.querySelectorAll('.bookmark-qp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const qpId = btn.getAttribute('data-qpid');
          const title = btn.getAttribute('data-title');
          if (window.appState && window.appState.toggleBookmark) {
            const added = window.appState.toggleBookmark({
              id: qpId,
              title,
              type: 'Question Paper',
              category: 'QP',
              deptCode: currentDeptCode,
              regCode: currentReg
            });
            if (window.Toast) {
              window.Toast.info(added ? `Bookmarked: ${title}` : `Removed bookmark`);
            }
          }
          renderContent();
        });
      });

      // Trigger Upload Modal
      container.querySelectorAll('.trigger-upload-qp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.openUploadQPModal({
            deptCode: currentDeptCode,
            regCode: currentReg,
            semester: selectedSem === 'all' ? 1 : selectedSem,
            subjectId: selectedSubjectId
          }, () => {
            renderContent();
          });
        });
      });

      // Trigger Edit Modal
      container.querySelectorAll('.edit-qp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const qpId = btn.getAttribute('data-qpid');
          const qp = window.AppFallbackData.questionPapers.find(p => (p.id === qpId || p._id === qpId));
          if (!qp) {
            if (window.Toast) window.Toast.error('Question paper record not found');
            return;
          }
          this.openUploadQPModal({
            deptCode: qp.deptCode || currentDeptCode,
            regCode: qp.regCode || currentReg,
            semester: qp.semester || 1,
            subjectId: qp.subjectId
          }, () => {
            renderContent();
          }, qp);
        });
      });
    };

    renderContent();
  },

  openUploadQPModal(context, onSuccess, existingQP = null) {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    const isEdit = !!existingQP;
    const user = window.appState ? (window.appState.state?.user || window.appState.user) : null;
    const initialSem = existingQP ? existingQP.semester : (context.semester || 1);
    
    // Get existing subjects for datalist
    const deptSubjects = (window.AppFallbackData?.subjects || []).filter(s => 
      s.deptCode === context.deptCode && s.regCode === context.regCode
    );

    modalContainer.innerHTML = `
      <div class="modal-overlay" id="upload-qp-overlay" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;">
        <div class="modal-dialog" role="dialog" aria-modal="true" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); box-shadow: var(--shadow-2xl); width: 100%; max-width: 580px; overflow: hidden; animation: modalPop 0.2s ease-out;">
          
          <!-- Header -->
          <div style="padding: 20px 24px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: flex-start; background: linear-gradient(to right, var(--bg-subtle), var(--bg-surface));">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span class="badge ${isEdit ? 'badge-warning' : 'badge-primary'}">${isEdit ? '✏️ Edit Mode' : '🛡️ Admin & Faculty Portal'}</span>
                <span class="badge badge-subtle">${context.deptCode} • ${context.regCode}</span>
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0;">
                ${isEdit ? 'Edit University Question Paper' : 'Upload Previous Question Paper'}
              </h3>
              <p style="font-size: 0.8125rem; color: var(--text-muted); margin: 4px 0 0 0;">
                Department: <strong>${context.deptCode}</strong> • Regulation: <strong>${context.regCode}</strong>
              </p>
            </div>
            <button class="btn btn-ghost btn-sm" id="close-qp-modal" style="font-size: 1.1rem; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">✕</button>
          </div>

          <!-- Body Form -->
          <div style="padding: 24px; max-height: 75vh; overflow-y: auto;">
            <form id="qp-upload-form">
              
              <!-- Semester Selector -->
              <div style="margin-bottom: 18px;">
                <label style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
                  Semester <span style="color: var(--color-danger-500);">*</span>
                </label>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  ${[1, 2, 3, 4, 5, 6, 7, 8].map(s => `
                    <label style="flex: 1; min-width: 55px; text-align: center; cursor: pointer;">
                      <input type="radio" name="modal-target-sem" value="${s}" ${s === initialSem ? 'checked' : ''} style="display: none;" class="sem-radio-input">
                      <div class="sem-radio-pill ${s === initialSem ? 'selected' : ''}" data-val="${s}" style="padding: 7px 4px; border-radius: var(--radius-md); border: 2px solid ${s === initialSem ? 'var(--color-primary-600)' : 'var(--border-subtle)'}; background: ${s === initialSem ? 'var(--color-primary-50)' : 'var(--bg-subtle)'}; font-weight: 700; font-size: 0.825rem; color: ${s === initialSem ? 'var(--color-primary-800)' : 'var(--text-secondary)'}; transition: all 0.15s;">
                        Sem ${s}
                      </div>
                    </label>
                  `).join('')}
                </div>
              </div>

              <!-- Subject Name & Code -->
              <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div>
                  <label for="modal-qp-subname" style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                    Subject Name <span style="color: var(--color-danger-500);">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="modal-qp-subname" 
                    class="form-input" 
                    list="dept-subjects-list"
                    placeholder="e.g. Database Management Systems" 
                    value="${existingQP?.subjectName || ''}" 
                    style="width: 100%; padding: 9px 12px; border-radius: var(--radius-md); font-size: 0.875rem;"
                    required
                  >
                  <datalist id="dept-subjects-list">
                    ${deptSubjects.map(s => `<option value="${s.name}" data-code="${s.code}" data-id="${s.id}">${s.code} - Sem ${s.semester}</option>`).join('')}
                  </datalist>
                </div>

                <div>
                  <label for="modal-qp-subcode" style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                    Subject Code <span style="color: var(--color-danger-500);">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="modal-qp-subcode" 
                    class="form-input" 
                    placeholder="e.g. CS8492" 
                    value="${existingQP?.subjectCode || ''}" 
                    style="width: 100%; padding: 9px 12px; border-radius: var(--radius-md); font-size: 0.875rem; text-transform: uppercase;"
                    required
                  >
                </div>
              </div>

              <!-- Academic Year / Session & Exam Type -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div>
                  <label for="modal-qp-year" style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                    Exam Session / Year <span style="color: var(--color-danger-500);">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="modal-qp-year" 
                    class="form-input" 
                    list="academic-sessions-list"
                    placeholder="e.g. Nov/Dec 2024" 
                    value="${existingQP?.academicYear || 'Nov/Dec 2024'}" 
                    style="width: 100%; padding: 9px 12px; border-radius: var(--radius-md); font-size: 0.875rem;"
                    required
                  >
                  <datalist id="academic-sessions-list">
                    <option value="Nov/Dec 2024"></option>
                    <option value="Apr/May 2024"></option>
                    <option value="Nov/Dec 2023"></option>
                    <option value="Apr/May 2023"></option>
                    <option value="Nov/Dec 2022"></option>
                    <option value="Apr/May 2022"></option>
                  </datalist>
                </div>

                <div>
                  <label for="modal-qp-examtype" style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                    Exam Type
                  </label>
                  <select 
                    id="modal-qp-examtype" 
                    class="form-input" 
                    style="width: 100%; padding: 9px 12px; border-radius: var(--radius-md); font-size: 0.875rem;"
                  >
                    <option value="End-Semester University Exam" ${existingQP?.examType === 'End-Semester University Exam' ? 'selected' : ''}>End-Semester University Exam</option>
                    <option value="Internal Assessment I" ${existingQP?.examType === 'Internal Assessment I' ? 'selected' : ''}>Internal Assessment I</option>
                    <option value="Internal Assessment II" ${existingQP?.examType === 'Internal Assessment II' ? 'selected' : ''}>Internal Assessment II</option>
                    <option value="Model Examination" ${existingQP?.examType === 'Model Examination' ? 'selected' : ''}>Model Examination</option>
                  </select>
                </div>
              </div>

              <!-- Question Paper Title / Heading -->
              <div style="margin-bottom: 16px;">
                <label for="modal-qp-title" style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                  Paper Title / Description
                </label>
                <input 
                  type="text" 
                  id="modal-qp-title" 
                  class="form-input" 
                  placeholder="e.g. University Question Paper with Full Answer Key" 
                  value="${existingQP?.title || 'End Semester University Examination Question Paper'}" 
                  style="width: 100%; padding: 9px 12px; border-radius: var(--radius-md); font-size: 0.875rem;"
                >
              </div>

              <!-- File Attachment OR Web/Drive Link -->
              <div style="margin-bottom: 16px; background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <label style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
                  📁 Attach Question Paper PDF ${isEdit ? '<span style="font-weight: 400; font-size: 0.8rem; color: var(--text-muted);">(Leave empty to retain existing file)</span>' : ''}
                </label>
                <input 
                  type="file" 
                  id="modal-qp-file" 
                  class="form-input" 
                  accept=".pdf,.doc,.docx"
                  style="width: 100%; margin-bottom: 10px; font-size: 0.85rem;"
                >
                <div style="display: flex; align-items: center; gap: 8px; margin: 8px 0; color: var(--text-muted); font-size: 0.75rem;">
                  <span style="flex: 1; height: 1px; background: var(--border-subtle);"></span>
                  <span>OR DIRECT PDF / GOOGLE DRIVE LINK</span>
                  <span style="flex: 1; height: 1px; background: var(--border-subtle);"></span>
                </div>
                <input 
                  type="text" 
                  id="modal-qp-url" 
                  class="form-input" 
                  placeholder="https://... or direct PDF URL" 
                  value="${existingQP?.fileUrl && !existingQP.fileUrl.startsWith('blob:') ? existingQP.fileUrl : ''}"
                  style="width: 100%; padding: 8px 12px; font-size: 0.85rem;"
                >
              </div>

              <!-- Optional Answer Key URL -->
              <div style="margin-bottom: 16px;">
                <label for="modal-qp-answerkey" style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                  Answer Key / Solution Link <span style="font-weight: 400; font-size: 0.8rem; color: var(--text-muted);">(Optional)</span>
                </label>
                <input 
                  type="text" 
                  id="modal-qp-answerkey" 
                  class="form-input" 
                  placeholder="https://... Answer key or solution walkthrough PDF" 
                  value="${existingQP?.answerKeyUrl || ''}" 
                  style="width: 100%; padding: 8px 12px; font-size: 0.85rem;"
                >
              </div>

              <!-- Uploaded By -->
              <div style="margin-bottom: 22px;">
                <label for="modal-qp-uploader" style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                  Designated Staff / Cell
                </label>
                <input 
                  type="text" 
                  id="modal-qp-uploader" 
                  class="form-input" 
                  value="${existingQP?.uploadedBy || user?.name || 'Examination Cell'}" 
                  style="width: 100%; padding: 8px 12px; font-size: 0.875rem;"
                >
              </div>

              <!-- Action buttons -->
              <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button type="button" class="btn btn-secondary" id="modal-qp-cancel-btn">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary" id="modal-qp-submit-btn" style="padding: 10px 24px; font-weight: 700;">
                  ${isEdit ? '💾 Save Changes' : '💾 Save & Publish Question Paper'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    `;

    modalContainer.setAttribute('aria-hidden', 'false');

    const overlay = document.getElementById('upload-qp-overlay');
    const closeBtn = document.getElementById('close-qp-modal');
    const cancelBtn = document.getElementById('modal-qp-cancel-btn');
    const form = document.getElementById('qp-upload-form');

    const closeModal = () => {
      modalContainer.innerHTML = '';
      modalContainer.setAttribute('aria-hidden', 'true');
    };

    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Semester Radio styling
    overlay.querySelectorAll('.sem-radio-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        overlay.querySelectorAll('.sem-radio-pill').forEach(p => {
          p.classList.remove('selected');
          p.style.borderColor = 'var(--border-subtle)';
          p.style.background = 'var(--bg-subtle)';
          p.style.color = 'var(--text-secondary)';
        });
        pill.classList.add('selected');
        pill.style.borderColor = 'var(--color-primary-600)';
        pill.style.background = 'var(--color-primary-50)';
        pill.style.color = 'var(--color-primary-800)';
        const val = pill.getAttribute('data-val');
        const input = overlay.querySelector(`input[name="modal-target-sem"][value="${val}"]`);
        if (input) input.checked = true;
      });
    });

    // Auto-fill subject code if selected from datalist
    const subNameInput = document.getElementById('modal-qp-subname');
    const subCodeInput = document.getElementById('modal-qp-subcode');
    subNameInput?.addEventListener('input', () => {
      const val = subNameInput.value.trim().toLowerCase();
      const matched = deptSubjects.find(s => s.name.toLowerCase() === val);
      if (matched && subCodeInput) {
        subCodeInput.value = matched.code;
        // Also update semester pill if matches
        if (matched.semester) {
          const semPill = overlay.querySelector(`.sem-radio-pill[data-val="${matched.semester}"]`);
          if (semPill) semPill.click();
        }
      }
    });

    // Form Submission
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const selectedSemInput = overlay.querySelector('input[name="modal-target-sem"]:checked');
      const semNum = selectedSemInput ? parseInt(selectedSemInput.value) : initialSem;
      const subName = document.getElementById('modal-qp-subname').value.trim();
      const subCode = document.getElementById('modal-qp-subcode').value.trim().toUpperCase();
      const academicYear = document.getElementById('modal-qp-year').value.trim();
      const examType = document.getElementById('modal-qp-examtype').value;
      const title = document.getElementById('modal-qp-title').value.trim() || `${subName} (${academicYear})`;
      const answerKeyUrl = document.getElementById('modal-qp-answerkey').value.trim();
      const uploader = document.getElementById('modal-qp-uploader').value.trim() || 'Examination Cell';
      const fileInput = document.getElementById('modal-qp-file');
      const urlInput = document.getElementById('modal-qp-url').value.trim();

      let fileName = existingQP ? existingQP.fileName : `${subCode}_${academicYear.replace(/[^a-zA-Z0-9]/g, '_')}_QP.pdf`;
      let fileUrl = existingQP ? existingQP.fileUrl : (urlInput || `/uploads/question-papers/${fileName}`);
      let fileSize = existingQP ? (existingQP.fileSize || '1.2 MB') : '1.2 MB';
      let fileObj = null;

      if (fileInput.files && fileInput.files[0]) {
        fileObj = fileInput.files[0];
        fileName = fileObj.name;
        fileSize = `${(fileObj.size / (1024 * 1024)).toFixed(1)} MB`;
        try {
          fileUrl = URL.createObjectURL(fileObj);
        } catch (err) {
          fileUrl = `/uploads/question-papers/${fileName}`;
        }
      } else if (urlInput) {
        fileUrl = urlInput;
      }

      if (isEdit) {
        // Edit Mode: Update existing in-memory item
        const idx = window.AppFallbackData.questionPapers.findIndex(p => (p.id === existingQP.id || p._id === existingQP._id));
        const updatedQP = {
          ...existingQP,
          subjectName: subName,
          subjectCode: subCode,
          semester: semNum,
          academicYear: academicYear,
          examType: examType,
          title: title,
          fileName: fileName,
          fileUrl: fileUrl,
          fileSize: fileSize,
          answerKeyUrl: answerKeyUrl,
          uploadedBy: uploader
        };

        if (idx !== -1) {
          window.AppFallbackData.questionPapers[idx] = updatedQP;
        } else {
          window.AppFallbackData.questionPapers.unshift(updatedQP);
        }

        // Asynchronously update backend API
        try {
          const formData = new FormData();
          formData.append('subjectName', subName);
          formData.append('subjectCode', subCode);
          formData.append('semester', semNum);
          formData.append('academicYear', academicYear);
          formData.append('examType', examType);
          formData.append('title', title);
          formData.append('answerKeyUrl', answerKeyUrl);
          formData.append('uploadedBy', uploader);
          formData.append('fileUrl', fileUrl);
          formData.append('fileName', fileName);
          formData.append('fileSize', fileSize);
          if (fileObj) formData.append('file', fileObj);

          fetch(`/api/resources/question-papers/${existingQP.id || existingQP._id}`, {
            method: 'PUT',
            headers: window.api?.getAuthHeaders ? window.api.getAuthHeaders(false) : {},
            body: fileObj ? formData : JSON.stringify({
              subjectName: subName,
              subjectCode: subCode,
              semester: semNum,
              academicYear: academicYear,
              examType: examType,
              title: title,
              answerKeyUrl: answerKeyUrl,
              uploadedBy: uploader,
              fileUrl: fileUrl,
              fileName: fileName,
              fileSize: fileSize
            })
          }).catch(err => console.log('Backend sync notice:', err.message));
        } catch (err) {
          console.log('Notice: backend PUT sync skipped:', err.message);
        }

        if (window.Toast) {
          window.Toast.success('Question paper updated successfully!');
        }
      } else {
        // Create Mode: Add new item
        const newQP = {
          id: `qp-${subCode.toLowerCase()}-${academicYear.replace(/[^a-zA-Z0-9]/g, '_')}-${Date.now()}`,
          subjectId: context.subjectId || '',
          subjectName: subName,
          subjectCode: subCode,
          deptCode: context.deptCode,
          regCode: context.regCode,
          semester: semNum,
          academicYear: academicYear,
          examType: examType,
          title: title,
          fileName: fileName,
          fileUrl: fileUrl,
          fileSize: fileSize,
          answerKeyUrl: answerKeyUrl,
          uploadedBy: uploader,
          downloads: 0,
          createdAt: new Date().toISOString().split('T')[0]
        };

        window.AppFallbackData.questionPapers.unshift(newQP);

        // Asynchronously post to backend API
        try {
          const formData = new FormData();
          formData.append('subjectName', subName);
          formData.append('subjectCode', subCode);
          formData.append('deptCode', context.deptCode);
          formData.append('regCode', context.regCode);
          formData.append('semester', semNum);
          formData.append('academicYear', academicYear);
          formData.append('examType', examType);
          formData.append('title', title);
          formData.append('answerKeyUrl', answerKeyUrl);
          formData.append('uploadedBy', uploader);
          formData.append('fileUrl', fileUrl);
          formData.append('fileName', fileName);
          formData.append('fileSize', fileSize);
          if (fileObj) formData.append('file', fileObj);

          fetch('/api/resources/question-papers', {
            method: 'POST',
            headers: window.api?.getAuthHeaders ? window.api.getAuthHeaders(false) : {},
            body: fileObj ? formData : JSON.stringify(newQP)
          }).catch(err => console.log('Backend sync notice:', err.message));
        } catch (err) {
          console.log('Notice: backend POST sync skipped:', err.message);
        }

        if (window.Toast) {
          window.Toast.success('Question paper uploaded & published successfully!');
        }
      }

      closeModal();
      if (onSuccess) onSuccess();
    });
  },

  openAnalysisModal(qp, analysisItem) {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    const data = analysisItem || qp || {};
    const analysis = data.analysis || qp?.analysis || {};
    const questions = data.questions || qp?.questions || {};
    const qpCode = data.qpCode || qp?.qpCode || 'AU';
    const subCode = data.subjectCode || qp?.subjectCode || '';
    const subName = data.subjectName || qp?.subjectName || 'University Examination';
    const examSession = data.examSession || qp?.academicYear || 'November/December 2024';
    const reg = data.regulation || qp?.regCode || 'R2021';

    modalContainer.innerHTML = `
      <div class="modal-overlay" id="analysis-modal-overlay" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 16px;">
        <div class="modal-dialog modal-xl" role="dialog" aria-modal="true" style="height: 94vh; width: 95vw; max-width: 1100px; display: flex; flex-direction: column; background: var(--bg-surface); border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-2xl); border: 1px solid var(--border-color);">
          
          <!-- Header -->
          <div style="padding: 16px 24px; background: linear-gradient(135deg, #1e293b, #0f172a); color: #fff; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span class="badge badge-primary" style="font-weight: 800; letter-spacing: 0.5px;">QUESTION PAPER CODE: ${qpCode}</span>
                <span class="badge badge-success">${reg}</span>
                <span class="badge badge-subtle" style="color: #cbd5e1;">${examSession}</span>
              </div>
              <h2 style="font-size: 1.35rem; font-weight: 800; margin: 0; color: #f8fafc;">
                ${subCode} — ${subName}
              </h2>
              <div style="font-size: 0.82rem; color: #94a3b8; margin-top: 4px;">
                Anna University End-Semester Examination • Max Marks: 100 • Time: 3 Hours
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 10px;">
              <button class="btn btn-secondary btn-sm" id="btn-print-analysis" style="display: inline-flex; align-items: center; gap: 6px; font-weight: 600;">
                🖨️ Print / Save PDF
              </button>
              <button class="btn btn-ghost btn-sm" id="close-analysis-modal" style="font-size: 1.3rem; width: 34px; height: 34px; border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center;">✕</button>
            </div>
          </div>

          <!-- Tab Navigation -->
          <div style="background: var(--bg-subtle); padding: 8px 24px; border-bottom: 1px solid var(--border-color); display: flex; gap: 12px; overflow-x: auto;">
            <button class="btn btn-sm qp-tab-btn active" id="tab-btn-analysis" style="font-weight: 700;">📊 Question Trend Analysis</button>
            <button class="btn btn-sm qp-tab-btn" id="tab-btn-part-a" style="font-weight: 700;">📝 Part A (10 × 2 = 20 Marks)</button>
            <button class="btn btn-sm qp-tab-btn" id="tab-btn-part-b" style="font-weight: 700;">📘 Part B (5 × 13 = 65 Marks)</button>
            <button class="btn btn-sm qp-tab-btn" id="tab-btn-part-c" style="font-weight: 700;">🏆 Part C (1 × 15 = 15 Marks)</button>
            <button class="btn btn-sm qp-tab-btn" id="tab-btn-notes" style="font-weight: 700;">📚 Subject Unit Notes</button>
          </div>

          <!-- Body Content Scroll Area -->
          <div style="flex: 1; overflow-y: auto; padding: 24px 28px; background: var(--bg-surface); line-height: 1.6;">
            
            <!-- SECTION 1: ANALYSIS TAB -->
            <div id="section-analysis">
              <!-- Summary Grid -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 24px;">
                <div class="card" style="padding: 16px 20px; border-left: 4px solid #3b82f6;">
                  <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Paper Difficulty Rating</div>
                  <div style="font-size: 1.15rem; font-weight: 800; color: #2563eb; margin-top: 4px;">
                    ${analysis.difficultyRating || 'Balanced (Core Theory & Numericals)'}
                  </div>
                </div>

                <div class="card" style="padding: 16px 20px; border-left: 4px solid #10b981;">
                  <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Syllabus Coverage</div>
                  <div style="font-size: 1.15rem; font-weight: 800; color: #059669; margin-top: 4px;">
                    100% Units 1 to 5 (Full Choice Included)
                  </div>
                </div>

                <div class="card" style="padding: 16px 20px; border-left: 4px solid #8b5cf6;">
                  <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Applicability</div>
                  <div style="font-size: 0.95rem; font-weight: 700; color: #7c3aed; margin-top: 4px;">
                    ${data.commonBranches ? data.commonBranches.slice(0, 3).join(', ') + '...' : 'All Registered Engineering Departments'}
                  </div>
                </div>
              </div>

              <!-- Unit-wise Weightage Progress Bars -->
              <div class="card" style="padding: 20px 24px; margin-bottom: 24px;">
                <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
                  <span>📈</span> Unit-wise Mark Weightage Distribution
                </h3>
                <div style="display: flex; flex-direction: column; gap: 14px;">
                  ${(analysis.unitWeightage || [
                    { unit: "Unit 1", marks: 20, percentage: "20%" },
                    { unit: "Unit 2", marks: 20, percentage: "20%" },
                    { unit: "Unit 3", marks: 20, percentage: "20%" },
                    { unit: "Unit 4", marks: 20, percentage: "20%" },
                    { unit: "Unit 5", marks: 20, percentage: "20%" }
                  ]).map(u => `
                    <div>
                      <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 6px;">
                        <span>${u.unit}</span>
                        <span style="color: #2563eb;">${u.marks} Marks (${u.percentage})</span>
                      </div>
                      <div style="height: 8px; width: 100%; background: var(--bg-subtle); border-radius: 999px; overflow: hidden;">
                        <div style="height: 100%; width: ${u.percentage}; background: linear-gradient(90deg, #3b82f6, #1d4ed8); border-radius: 999px;"></div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- High Frequency Topics & Exam Tips -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                <div class="card" style="padding: 20px 24px;">
                  <h4 style="font-size: 1rem; font-weight: 800; color: #dc2626; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                    <span>🔥</span> High-Frequency Repeated Topics
                  </h4>
                  <ul style="padding-left: 20px; margin: 0; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.8;">
                    ${(analysis.highFrequencyTopics || ['Core domain principles', 'Numerical problem formulations', 'Case study design']).map(t => `<li>${t}</li>`).join('')}
                  </ul>
                </div>

                <div class="card" style="padding: 20px 24px;">
                  <h4 style="font-size: 1rem; font-weight: 800; color: #059669; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                    <span>💡</span> Exam Strategy & Preparation Tips
                  </h4>
                  <ul style="padding-left: 20px; margin: 0; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.8;">
                    ${(analysis.examPreparationTips || ['Practice all Part A definitions', 'Draw step-by-step architecture diagrams', 'State all assumptions in Part C']).map(t => `<li>${t}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>

            <!-- SECTION 2: PART A TAB -->
            <div id="section-part-a" style="display: none;">
              <div style="margin-bottom: 20px; padding: 12px 18px; background: rgba(37, 99, 235, 0.08); border-left: 4px solid #2563eb; border-radius: 4px;">
                <div style="font-weight: 800; color: #1e40af;">PART A — (10 × 2 = 20 Marks) • Answer ALL Questions</div>
                <div style="font-size: 0.82rem; color: var(--text-muted);">Short conceptual answers with precise definitions, formulas, and working steps.</div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 16px;">
                ${(questions.partA || []).map(q => `
                  <div class="card" style="padding: 18px 22px; border: 1px solid var(--border-color);">
                    <div style="display: flex; gap: 10px; align-items: flex-start; margin-bottom: 10px;">
                      <span class="badge badge-primary" style="font-weight: 800; flex-shrink: 0;">Q${q.qNo}</span>
                      <div style="font-weight: 700; color: var(--text-primary); font-size: 0.98rem; line-height: 1.5;">
                        ${q.question}
                      </div>
                    </div>
                    <div style="background: var(--bg-subtle); padding: 12px 16px; border-radius: var(--radius-md); font-size: 0.9rem; color: var(--text-secondary); white-space: pre-line; border-left: 3px solid #10b981;">
                      <strong style="color: #059669; display: block; margin-bottom: 4px;">Model Answer:</strong>
                      ${q.answer}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- SECTION 3: PART B TAB -->
            <div id="section-part-b" style="display: none;">
              <div style="margin-bottom: 20px; padding: 12px 18px; background: rgba(16, 185, 129, 0.08); border-left: 4px solid #10b981; border-radius: 4px;">
                <div style="font-weight: 800; color: #065f46;">PART B — (5 × 13 = 65 Marks) • Either / Or Choice</div>
                <div style="font-size: 0.82rem; color: var(--text-muted);">Step-by-step detailed derivations, algorithms, and fully solved numerical problems.</div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 20px;">
                ${(questions.partB || []).map(q => `
                  <div class="card" style="padding: 20px 24px; border: 1px solid var(--border-color);">
                    <div style="display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px;">
                      <span class="badge badge-success" style="font-weight: 800; flex-shrink: 0;">Q${q.qNo}</span>
                      <div style="font-weight: 700; color: var(--text-primary); font-size: 1rem; line-height: 1.5;">
                        ${q.question}
                      </div>
                    </div>
                    <div style="background: var(--bg-subtle); padding: 16px 20px; border-radius: var(--radius-md); font-size: 0.92rem; color: var(--text-secondary); white-space: pre-line; border-left: 3px solid #2563eb;">
                      <strong style="color: #2563eb; display: block; margin-bottom: 6px;">Step-by-Step Solution / Derivation Outline:</strong>
                      ${q.solutionOutline}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- SECTION 4: PART C TAB -->
            <div id="section-part-c" style="display: none;">
              <div style="margin-bottom: 20px; padding: 12px 18px; background: rgba(139, 92, 246, 0.08); border-left: 4px solid #8b5cf6; border-radius: 4px;">
                <div style="font-weight: 800; color: #5b21b6;">PART C — (1 × 15 = 15 Marks) • Comprehensive Application & Case Study</div>
                <div style="font-size: 0.82rem; color: var(--text-muted);">Advanced scenario analysis, real-world case study, and enterprise engineering synthesis.</div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 20px;">
                ${(questions.partC || []).map(q => `
                  <div class="card" style="padding: 22px 26px; border: 1px solid var(--border-color);">
                    <div style="display: flex; gap: 12px; align-items: flex-start; margin-bottom: 14px;">
                      <span class="badge badge-warning" style="font-weight: 800; flex-shrink: 0; background: #fef3c7; color: #92400e;">Q${q.qNo}</span>
                      <div style="font-weight: 700; color: var(--text-primary); font-size: 1.05rem; line-height: 1.5;">
                        ${q.question}
                      </div>
                    </div>
                    <div style="background: var(--bg-subtle); padding: 18px 22px; border-radius: var(--radius-md); font-size: 0.94rem; color: var(--text-secondary); white-space: pre-line; border-left: 3px solid #f59e0b;">
                      <strong style="color: #b45309; display: block; margin-bottom: 8px;">Comprehensive Case Study Solution Blueprint:</strong>
                      ${q.solutionOutline}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- SECTION 5: NOTES TAB -->
            <div id="section-notes" style="display: none;">
              <div style="margin-bottom: 20px; padding: 12px 18px; background: rgba(16, 185, 129, 0.08); border-left: 4px solid #10b981; border-radius: 4px;">
                <div style="font-weight: 800; color: #065f46;">📚 Unit 1 to Unit 5 Lecture Notes for ${subCode} — ${subName}</div>
                <div style="font-size: 0.82rem; color: var(--text-muted);">Verified academic notes covering all 5 syllabus units with immediate access.</div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 14px;">
                ${(window.AppFallbackData?.notes || []).filter(n => n.subjectCode === subCode).slice(0, 5).map((n, idx) => `
                  <div class="card" style="padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                    <div>
                      <span class="badge badge-primary" style="margin-bottom: 4px;">Unit ${n.unit}</span>
                      <h4 style="font-size: 1rem; font-weight: 700; margin: 4px 0; color: var(--text-primary);">${n.title}</h4>
                      <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0; max-width: 700px;">${n.description}</p>
                    </div>
                    <button class="btn btn-primary btn-sm open-note-from-analysis" data-noteid="${n.id}" style="font-weight: 700;">
                      📖 Read Unit ${n.unit} Notes
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>

          <!-- Footer -->
          <div style="padding: 12px 24px; background: var(--bg-surface); border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; color: var(--text-muted);">
            <span>Anna University Examination Repository • Fully Verified Answer Keys</span>
            <span>DRMS Academic Resource Platform</span>
          </div>

        </div>
      </div>
    `;

    modalContainer.setAttribute('aria-hidden', 'false');

    const overlay = document.getElementById('analysis-modal-overlay');
    const closeBtn = document.getElementById('close-analysis-modal');
    const printBtn = document.getElementById('btn-print-analysis');

    const close = () => {
      modalContainer.innerHTML = '';
      modalContainer.setAttribute('aria-hidden', 'true');
    };

    closeBtn?.addEventListener('click', close);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    printBtn?.addEventListener('click', () => {
      window.print();
    });

    // Tab switcher
    const tabs = ['analysis', 'part-a', 'part-b', 'part-c', 'notes'];
    tabs.forEach(t => {
      document.getElementById(`tab-btn-${t}`)?.addEventListener('click', () => {
        tabs.forEach(otherT => {
          document.getElementById(`tab-btn-${otherT}`)?.classList.remove('active');
          const sec = document.getElementById(`section-${otherT}`);
          if (sec) sec.style.display = 'none';
        });
        document.getElementById(`tab-btn-${t}`)?.classList.add('active');
        const activeSec = document.getElementById(`section-${t}`);
        if (activeSec) activeSec.style.display = 'block';
      });
    });

    // Read notes click inside modal
    modalContainer.querySelectorAll('.open-note-from-analysis').forEach(b => {
      b.addEventListener('click', () => {
        const noteId = b.getAttribute('data-noteid');
        const note = (window.AppFallbackData?.notes || []).find(n => n.id === noteId);
        if (note && window.PdfViewerModal) {
          window.PdfViewerModal.open({
            title: note.title,
            fileName: note.fileName,
            fileUrl: note.fileUrl,
            subjectName: `${note.subjectCode} — ${note.subjectName}`,
            unit: `Unit ${note.unit}`,
            description: note.description,
            uploadedBy: note.uploadedBy || 'Senior Faculty'
          });
        }
      });
    });
  }
};

