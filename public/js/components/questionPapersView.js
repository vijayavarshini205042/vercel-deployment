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
    let selectedSubjectId = params.subjectId || null;
    let selectedYear = 'all';
    let searchQuery = '';

    const renderContent = () => {
      // Ensure questionPapers array exists
      if (!window.AppFallbackData) window.AppFallbackData = {};
      if (!window.AppFallbackData.questionPapers) window.AppFallbackData.questionPapers = [];

      // Filter question papers
      const allQPs = window.AppFallbackData.questionPapers.filter(qp => {
        const matchesSubject = selectedSubjectId ? qp.subjectId === selectedSubjectId : true;
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
              <button class="chip qp-year-chip ${selectedYear === '2024' ? 'active' : ''}" data-year="2024">2024</button>
              <button class="chip qp-year-chip ${selectedYear === '2023' ? 'active' : ''}" data-year="2023">2023</button>
              <button class="chip qp-year-chip ${selectedYear === '2022' ? 'active' : ''}" data-year="2022">2022</button>
              <button class="chip qp-year-chip ${selectedYear === '2021' ? 'active' : ''}" data-year="2021">2021</button>
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
                  <div class="card card-hoverable" style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
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

                      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 16px; background: var(--bg-subtle); padding: 8px 12px; border-radius: var(--radius-md);">
                        <span>📄 ${qp.fileSize || '1.2 MB'} PDF</span>
                        <span>📥 ${qp.downloads || 0} downloads</span>
                      </div>
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
  }
};

