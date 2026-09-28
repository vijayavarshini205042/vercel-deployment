/**
 * Notes & Syllabus View Component
 * Flow: Semester -> Subject -> Unit -> Notes / Textbooks / Lab Manuals / Video Lectures
 * Features: Search, Semester filter chips, Resource sub-tabs, PDF viewer modal,
 * Bookmark toggle, and Download tracking.
 */

window.NotesView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const currentReg = state.regulation || 'R2021';
    const currentDeptCode = state.department || 'IT';
    const params = state.viewParams || {};

    let selectedSem = params.semester || 7;
    let selectedSubjectId = params.subjectId || null;
    let selectedUnit = params.unit || null;
    let activeResourceType = 'notes'; // 'notes', 'textbooks', 'labs', 'videos'
    let searchQuery = '';

    // Fetch live notes from DB so any Admin additions/edits are immediately visible to students
    try {
      if (window.apiService) {
        const queryParams = new URLSearchParams({
          deptCode: currentDeptCode,
          regCode: currentReg,
          semester: selectedSem
        });
        if (selectedSubjectId) queryParams.append('subjectId', selectedSubjectId);
        
        const res = await window.apiService.get(`/resources/notes?${queryParams.toString()}`);
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          if (!Array.isArray(window.AppFallbackData.notes)) {
            window.AppFallbackData.notes = [];
          }
          res.data.forEach(dbNote => {
            const noteId = dbNote.id || dbNote._id;
            const existingIdx = window.AppFallbackData.notes.findIndex(n => (n._id && n._id === dbNote._id) || (n.id && n.id === noteId));
            if (existingIdx !== -1) {
              window.AppFallbackData.notes[existingIdx] = { ...window.AppFallbackData.notes[existingIdx], ...dbNote };
            } else {
              window.AppFallbackData.notes.unshift({ ...dbNote, id: noteId });
            }
          });
        }
      }
    } catch (e) {
      console.warn('Live notes fetch error, using local dataset:', e);
    }

    const renderContent = () => {
      const user = window.appState ? (window.appState.state?.user || window.appState.user) : null;
      const isAdmin = user && user.role === 'admin';

      const allSubjects = (window.AppFallbackData?.subjects || []).filter(s => 
        s.deptCode === currentDeptCode && s.regCode === currentReg && s.semester === selectedSem
      );

      // Remove fallback that selects the first subject automatically
      const currentSubject = selectedSubjectId ? allSubjects.find(s => s.id === selectedSubjectId) : null;

      // Filter notes strictly by subjectId
      const allNotes = (window.AppFallbackData?.notes || []).filter(n => {
        const matchesSubject = selectedSubjectId ? n.subjectId === selectedSubjectId : false;
        const matchesUnit = !selectedUnit || n.unit === selectedUnit;
        const matchesSearch = !searchQuery || 
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          n.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesSubject && matchesUnit && matchesSearch;
      });

      // Filter Textbooks
      const allTextbooks = (window.AppFallbackData?.textbooks || []).filter(tb => 
        selectedSubjectId && tb.subjectId === selectedSubjectId
      );

      // Filter Lab Manuals
      const allLabs = (window.AppFallbackData?.labManuals || []).filter(lm => 
        selectedSubjectId && lm.subjectId === selectedSubjectId
      );

      // Filter Video Lectures
      const allVideos = (window.AppFallbackData?.videoLectures || []).filter(vl => 
        selectedSubjectId && vl.subjectId === selectedSubjectId
      );

      container.innerHTML = `
        <div style="max-width: 1200px; margin: 0 auto; width: 100%;">
          <!-- Page Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <span class="badge badge-primary">📚 Academic Resource Hub</span>
                <span class="badge badge-subtle">${currentReg}</span>
                <span class="badge badge-subtle">${currentDeptCode}</span>
              </div>
              <h1 style="font-size: 1.85rem; font-weight: 800;">Course Materials & Digital Learning</h1>
            </div>

            <!-- Search box -->
            <div style="position: relative; width: 300px;">
              <input 
                type="text" 
                id="notes-search-input" 
                class="form-input" 
                placeholder="Search notes, books, labs..." 
                value="${searchQuery}"
                style="padding-left: 36px;"
              >
              <span style="position: absolute; left: 12px; top: 10px; color: var(--text-muted);">🔍</span>
            </div>
          </div>

          <!-- Step 1: Semester Selector Chips (1 to 8) -->
          <div style="margin-bottom: 20px;">
            <div style="font-size: 0.8125rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">
              Select Semester:
            </div>
            <div class="chip-container" style="margin: 0;">
              ${[1, 2, 3, 4, 5, 6, 7, 8].map(semNum => `
                <button class="chip sem-chip ${selectedSem === semNum ? 'active' : ''}" data-sem="${semNum}">
                  Semester ${semNum}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Main 2-column layout -->
          <div style="display: grid; grid-template-columns: 300px 1fr; gap: 24px; align-items: start;">
            
            <!-- Left: Subjects in Semester -->
            <div class="card" style="padding: 16px;">
              <div style="font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span>Semester ${selectedSem} Subjects</span>
                <span class="badge badge-subtle">${allSubjects.length} Courses</span>
              </div>

              ${allSubjects.length === 0 ? `
                <div style="padding: 24px 12px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
                  No subjects listed for Semester ${selectedSem} under ${currentReg}.
                </div>
              ` : `
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  ${allSubjects.map(sub => `
                    <button 
                      class="subject-select-btn" 
                      data-subid="${sub.id}"
                      style="
                        text-align: left; 
                        padding: 10px 12px; 
                        border-radius: var(--radius-md); 
                        border: 1px solid ${selectedSubjectId === sub.id ? 'var(--color-primary-600)' : 'var(--border-subtle)'};
                        background: ${selectedSubjectId === sub.id ? 'var(--color-primary-50)' : 'var(--bg-surface)'};
                        color: ${selectedSubjectId === sub.id ? 'var(--color-primary-800)' : 'var(--text-primary)'};
                        cursor: pointer;
                        transition: all var(--transition-fast);
                      "
                    >
                      <div style="font-weight: 700; font-size: 0.875rem;">${sub.name}</div>
                      <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">
                        Code: ${sub.code} • ${sub.credits} Credits
                      </div>
                    </button>
                  `).join('')}
                </div>
              `}
            </div>

            <!-- Right: Resource Content -->
            <div>
              ${currentSubject ? `
                <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 16px 20px; margin-bottom: 20px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
                    <div>
                      <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">
                        ${currentSubject.name}
                      </h2>
                      <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 2px;">
                        Code: <strong>${currentSubject.code}</strong> • Credits: ${currentSubject.credits} • Regulation: ${currentReg}
                      </p>
                    </div>
                  </div>

                  <!-- Resource Category Sub-Tabs -->
                  <div style="display: flex; gap: 10px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 12px; flex-wrap: wrap;">
                    <button class="btn btn-sm ${activeResourceType === 'notes' ? 'btn-primary' : 'btn-ghost'}" id="tab-res-notes">
                      📚 Lecture Notes
                    </button>
                    <button class="btn btn-sm ${activeResourceType === 'textbooks' ? 'btn-primary' : 'btn-ghost'}" id="tab-res-textbooks">
                      📖 Reference Textbooks (${allTextbooks.length})
                    </button>
                    <button class="btn btn-sm ${activeResourceType === 'labs' ? 'btn-primary' : 'btn-ghost'}" id="tab-res-labs">
                      🔬 Lab Manuals & Experiments (${allLabs.length})
                    </button>
                    <button class="btn btn-sm ${activeResourceType === 'videos' ? 'btn-primary' : 'btn-ghost'}" id="tab-res-videos">
                      🎥 Video Lectures (${allVideos.length})
                    </button>
                  </div>

                  <!-- Unit Chips for Notes -->
                  ${activeResourceType === 'notes' ? `
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button class="chip unit-chip ${!selectedUnit ? 'active' : ''}" data-unit="all">
                          All Units
                        </button>
                        ${[1, 2, 3, 4, 5].map(u => `
                          <button class="chip unit-chip ${selectedUnit === u ? 'active' : ''}" data-unit="${u}">
                            Unit ${u}
                          </button>
                        `).join('')}
                      </div>
                      ${isAdmin ? `
                        <button class="btn btn-sm btn-primary trigger-upload-note-modal" data-unit="${selectedUnit || 1}" style="display: inline-flex; align-items: center; gap: 6px; font-weight: 600; padding: 6px 14px; border-radius: var(--radius-md);">
                          ➕ Add Unit Note
                        </button>
                      ` : ''}
                    </div>
                  ` : ''}
                </div>
              ` : ''}

              <!-- Content Renderer based on active tab -->
              ${activeResourceType === 'notes' ? this.renderNotesList(allNotes, selectedUnit, currentSubject, isAdmin) : ''}
              ${activeResourceType === 'textbooks' ? this.renderTextbooksList(allTextbooks) : ''}
              ${activeResourceType === 'labs' ? this.renderLabsList(allLabs) : ''}
              ${activeResourceType === 'videos' ? this.renderVideosList(allVideos) : ''}

            </div>

          </div>
        </div>
      `;

      this.attachEvents(container, renderContent, {
        setSem: (s) => { selectedSem = s; selectedSubjectId = null; selectedUnit = null; },
        setSubject: (c) => { selectedSubjectId = c; selectedUnit = null; },
        setUnit: (u) => { selectedUnit = u; },
        setResourceType: (t) => { activeResourceType = t; },
        setSearch: (q) => { searchQuery = q; },
        getCurrentContext: () => ({
          subject: currentSubject,
          unit: selectedUnit || 1,
          deptCode: currentDeptCode,
          regCode: currentReg,
          semester: selectedSem
        })
      });
    };

    renderContent();
  },

  renderNotesList(notes, selectedUnit, currentSubject, isAdmin) {
    const targetUnit = selectedUnit || 1;
    const unitLabel = selectedUnit ? `Unit ${selectedUnit}` : 'Unit 1';

    if (notes.length === 0) {
      return `
        <div class="empty-state" style="padding: 48px 24px; text-align: center; border: 2px dashed var(--border-color); border-radius: var(--radius-lg); background: var(--bg-surface);">
          <div class="empty-state-icon" style="font-size: 3rem; margin-bottom: 12px;">📄</div>
          <div class="empty-state-title" style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
            No Notes Available
          </div>
          <div class="empty-state-desc" style="color: var(--text-secondary); margin-bottom: 20px; font-size: 0.9rem;">
            No notes found for this filter selection.
          </div>
          ${isAdmin ? `
            <button class="btn btn-primary trigger-upload-note-modal" data-unit="${targetUnit}" style="display: inline-flex; align-items: center; gap: 8px; font-weight: 700; padding: 10px 22px; border-radius: var(--radius-md); box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);">
              📤 + Upload Notes for ${unitLabel}
            </button>
          ` : `
            <div style="font-size: 0.85rem; color: var(--text-muted); background: var(--bg-subtle); padding: 8px 18px; border-radius: 9999px; display: inline-block;">
              📖 Study notes for this unit will be uploaded by department faculty soon.
            </div>
          `}
        </div>
      `;
    }

    return `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${notes.map(note => {
          const isBookmarked = window.appState.isBookmarked(note.id);
          return `
            <div class="card card-hoverable" style="padding: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--color-primary-50); color: var(--color-primary-700); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem;">
                    U${note.unit}
                  </div>
                  <div>
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin: 0;">
                      ${note.title}
                    </h3>
                    <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 2px;">
                      Uploaded by: <strong>${note.uploadedBy}</strong> • ${note.createdAt}
                    </p>
                  </div>
                </div>

                <button class="btn btn-icon btn-ghost bookmark-note-btn" data-noteid="${note.id}" data-title="${note.title}">
                  <span style="font-size: 1.25rem;">${isBookmarked ? '⭐' : '☆'}</span>
                </button>
              </div>

              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">
                ${note.description}
              </p>

              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 10px;">
                <div style="font-size: 0.8125rem; color: var(--text-muted);">
                  <span>📄 ${note.fileSize}</span> • <span>📥 ${note.downloads} Downloads</span>
                </div>

                <div style="display: flex; gap: 8px; align-items: center;">
                  ${isAdmin ? `
                    <button class="btn btn-danger btn-sm admin-delete-note-btn" 
                      data-noteid="${note.id || note._id}" 
                      data-title="${note.title}"
                      style="display: inline-flex; align-items: center; gap: 5px; padding: 6px 12px; font-weight: 700; border-radius: var(--radius-md); background: #ef4444; border-color: #dc2626; color: #fff; cursor: pointer;" 
                      title="Permanently Delete Note (Admin Only)">
                      🗑️ Delete
                    </button>
                  ` : ''}
                  <button class="btn btn-secondary btn-sm preview-note-btn" 
                    data-title="${note.title}" 
                    data-file="${note.fileName}" 
                    data-fileurl="${note.fileUrl || ''}"
                    data-subject="${note.subjectName || ''}"
                    data-unit="${note.unit || ''}"
                    data-description="${note.description || ''}"
                    data-author="${note.uploadedBy || ''}"
                    data-downloads="${note.downloads}">
                    👁️ Preview PDF
                  </button>
                  <button class="btn btn-primary btn-sm download-note-btn" 
                    data-file="${note.fileName}" 
                    data-fileurl="${note.fileUrl || ''}"
                    data-noteid="${note.id}">
                    ⬇️ Download PDF
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderTextbooksList(books) {
    if (books.length === 0) {
      return `<div class="empty-state"><div class="empty-state-icon">📖</div><div class="empty-state-title">No Textbooks Found</div></div>`;
    }

    return `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${books.map(tb => `
          <div class="card card-hoverable" style="padding: 20px;">
            <div style="display: flex; align-items: flex-start; gap: 16px;">
              <div style="font-size: 2.5rem; background: var(--bg-subtle); padding: 12px; border-radius: var(--radius-md);">📖</div>
              <div style="flex: 1;">
                <span class="badge badge-primary" style="margin-bottom: 4px;">Standard Reference Book</span>
                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${tb.title}</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 2px;">
                  Authors: <strong>${tb.author}</strong> • Edition: ${tb.edition} • Publisher: ${tb.publisher}
                </p>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 8px;">${tb.summary}</p>
                <div style="margin-top: 14px; display: flex; gap: 10px;">
                  <a href="${tb.readOnlineUrl}" target="_blank" class="btn btn-primary btn-sm" style="text-decoration: none;">🌐 Read Online (Open Library)</a>
                  <a href="${tb.fileUrl}" target="_blank" class="btn btn-secondary btn-sm" style="text-decoration: none;">📥 Download E-Book PDF</a>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderLabsList(labs) {
    if (labs.length === 0) {
      return `<div class="empty-state"><div class="empty-state-icon">🔬</div><div class="empty-state-title">No Lab Manuals Found</div></div>`;
    }

    return `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${labs.map(lm => `
          <div class="card card-hoverable" style="padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <div>
                <span class="badge badge-success" style="margin-bottom: 4px;">Practical Worksheets</span>
                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${lm.labTitle}</h3>
              </div>
              <a href="${lm.fileUrl}" target="_blank" class="btn btn-primary btn-sm" style="text-decoration: none;">⬇️ Download Lab Manual</a>
            </div>
            
            <div style="margin-top: 12px; background: var(--bg-subtle); padding: 12px; border-radius: var(--radius-md);">
              <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">Core Experiments List:</div>
              <ul style="padding-left: 20px; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
                ${lm.experiments.map(exp => `<li>${exp}</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderVideosList(videos) {
    if (videos.length === 0) {
      return `<div class="empty-state"><div class="empty-state-icon">🎥</div><div class="empty-state-title">No Video Tutorials Found</div></div>`;
    }

    return `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${videos.map(vl => `
          <div class="card card-hoverable" style="padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div>
                <span class="badge badge-warning" style="margin-bottom: 4px;">${vl.provider}</span>
                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${vl.title}</h3>
                <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 2px;">Duration: ${vl.duration}</p>
              </div>
              <a href="${vl.videoUrl}" target="_blank" class="btn btn-primary btn-sm" style="text-decoration: none;">▶️ Watch Video Playlist</a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  attachEvents(container, renderContent, actions) {
    // Semester selection
    container.querySelectorAll('.sem-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        actions.setSem(parseInt(btn.dataset.sem));
        renderContent();
      });
    });

    // Subject selection
    container.querySelectorAll('.subject-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        actions.setSubject(btn.dataset.subid);
        renderContent();
      });
    });

    // Unit selection
    container.querySelectorAll('.unit-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const u = btn.dataset.unit === 'all' ? null : parseInt(btn.dataset.unit);
        actions.setUnit(u);
        renderContent();
      });
    });

    // Sub-tab handlers
    const tNotes = container.querySelector('#tab-res-notes');
    const tBooks = container.querySelector('#tab-res-textbooks');
    const tLabs = container.querySelector('#tab-res-labs');
    const tVideos = container.querySelector('#tab-res-videos');

    if (tNotes) tNotes.addEventListener('click', () => { actions.setResourceType('notes'); renderContent(); });
    if (tBooks) tBooks.addEventListener('click', () => { actions.setResourceType('textbooks'); renderContent(); });
    if (tLabs) tLabs.addEventListener('click', () => { actions.setResourceType('labs'); renderContent(); });
    if (tVideos) tVideos.addEventListener('click', () => { actions.setResourceType('videos'); renderContent(); });

    // Search input
    const searchInput = container.querySelector('#notes-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        actions.setSearch(e.target.value);
        renderContent();
      });
    }

    // PDF Preview & Downloads
    container.querySelectorAll('.preview-note-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.PdfViewerModal) {
          window.PdfViewerModal.open({
            title: btn.dataset.title,
            fileName: btn.dataset.file,
            fileUrl: btn.dataset.fileurl,
            subjectName: btn.dataset.subject,
            unit: btn.dataset.unit,
            description: btn.dataset.description,
            uploadedBy: btn.dataset.author,
            downloads: parseInt(btn.dataset.downloads || 0)
          });
        }
      });
    });

    container.querySelectorAll('.download-note-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const fileUrl = btn.dataset.fileurl;
        const fileName = btn.dataset.file || 'Notes.pdf';
        if (window.appState && window.appState.addDownload) {
          window.appState.addDownload(btn.dataset.noteid);
        }
        if (fileUrl && fileUrl !== '#' && fileUrl !== 'default_note.pdf') {
          const a = document.createElement('a');
          a.href = fileUrl;
          a.download = fileName;
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
        if (window.Toast) {
          window.Toast.show(`Starting download for ${fileName}...`, 'success');
        }
      });
    });

    // Bookmarks
    container.querySelectorAll('.bookmark-note-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.noteid;
        const title = btn.dataset.title;
        if (window.appState.isBookmarked(id)) {
          window.appState.removeBookmark(id);
          if (window.Toast) window.Toast.show('Bookmark removed', 'info');
        } else {
          window.appState.addBookmark({ id, title, type: 'Note', timestamp: new Date().toISOString() });
          if (window.Toast) window.Toast.show('Saved to Bookmarks!', 'success');
        }
        renderContent();
      });
    });

    // Admin Instant Delete Note Trigger
    container.querySelectorAll('.admin-delete-note-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const noteId = btn.dataset.noteid;
        const noteTitle = btn.dataset.title;
        if (confirm(`⚠️ Admin Action:\nAre you sure you want to permanently delete this note:\n"${noteTitle}"?`)) {
          // Remove locally immediately
          if (window.AppFallbackData && Array.isArray(window.AppFallbackData.notes)) {
            const idx = window.AppFallbackData.notes.findIndex(n => n.id === noteId || n._id === noteId);
            if (idx !== -1) window.AppFallbackData.notes.splice(idx, 1);
          }

          // Delete from MongoDB Atlas in background
          try {
            if (window.apiService && noteId) {
              await window.apiService.delete(`/resources/notes/${noteId}`);
            }
          } catch (err) {
            console.warn('API delete note error:', err);
          }

          if (window.Toast) window.Toast.success(`Note "${noteTitle}" deleted!`);
          renderContent();
        }
      });
    });

    // Upload Unit Note Modal Trigger
    container.querySelectorAll('.trigger-upload-note-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetUnit = parseInt(btn.dataset.unit || 1);
        const ctx = actions.getCurrentContext();
        ctx.unit = targetUnit;
        this.openUploadNoteModal(ctx, () => {
          renderContent();
        });
      });
    });
  },

  openUploadNoteModal(context, onSuccess) {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    const user = window.appState ? (window.appState.state?.user || window.appState.user) : null;
    const subName = context.subject ? context.subject.name : 'Selected Subject';
    const subCode = context.subject ? context.subject.code : '';
    const initialUnit = context.unit || 1;

    modalContainer.innerHTML = `
      <div class="modal-overlay" id="upload-note-overlay" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;">
        <div class="modal-dialog" role="dialog" aria-modal="true" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-xl); box-shadow: var(--shadow-xl); width: 100%; max-width: 540px; overflow: hidden; animation: modalPop 0.2s ease-out;">
          
          <!-- Header -->
          <div style="padding: 20px 24px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: flex-start; background: linear-gradient(to right, var(--bg-subtle), var(--bg-surface));">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span class="badge badge-primary">🛡️ Admin Upload Portal</span>
                <span class="badge badge-subtle">${context.deptCode} • ${context.regCode}</span>
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0;">
                Upload Unit Lecture Notes
              </h3>
              <p style="font-size: 0.8125rem; color: var(--text-muted); margin: 4px 0 0 0;">
                Course: <strong>${subName}</strong> (${subCode}) • Semester ${context.semester}
              </p>
            </div>
            <button class="btn btn-ghost btn-sm" id="close-upload-modal" style="font-size: 1.1rem; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">✕</button>
          </div>

          <!-- Body -->
          <div style="padding: 24px; max-height: 75vh; overflow-y: auto;">
            <form id="unit-note-upload-form">
              
              <!-- Unit Selector -->
              <div style="margin-bottom: 18px;">
                <label style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
                  Target Unit <span style="color: var(--color-danger-500);">*</span>
                </label>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                  ${[1, 2, 3, 4, 5].map(u => `
                    <label style="flex: 1; min-width: 80px; text-align: center; cursor: pointer;">
                      <input type="radio" name="modal-target-unit" value="${u}" ${u === initialUnit ? 'checked' : ''} style="display: none;" class="unit-radio-input">
                      <div class="unit-radio-pill ${u === initialUnit ? 'selected' : ''}" data-val="${u}" style="padding: 8px 10px; border-radius: var(--radius-md); border: 2px solid ${u === initialUnit ? 'var(--color-primary-600)' : 'var(--border-subtle)'}; background: ${u === initialUnit ? 'var(--color-primary-50)' : 'var(--bg-subtle)'}; font-weight: 700; font-size: 0.875rem; color: ${u === initialUnit ? 'var(--color-primary-800)' : 'var(--text-secondary)'}; transition: all 0.15s;">
                        Unit ${u}
                      </div>
                    </label>
                  `).join('')}
                </div>
              </div>

              <!-- Note Title -->
              <div style="margin-bottom: 16px;">
                <label for="modal-note-title" style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                  Note Title <span style="color: var(--color-danger-500);">*</span>
                </label>
                <input 
                  type="text" 
                  id="modal-note-title" 
                  class="form-input" 
                  style="width: 100%; padding: 10px 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-primary); font-size: 0.9rem;"
                  placeholder="e.g. Unit ${initialUnit}: Key Concepts, Algorithms & Solved Problems" 
                  value="Unit ${initialUnit}: Lecture Notes & Study Material" 
                  required
                >
              </div>

              <!-- Description -->
              <div style="margin-bottom: 16px;">
                <label for="modal-note-desc" style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                  Description & Topics Covered
                </label>
                <textarea 
                  id="modal-note-desc" 
                  rows="2" 
                  style="width: 100%; padding: 10px 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-primary); font-size: 0.875rem; resize: vertical;"
                  placeholder="Summary of syllabus topics covered in this unit notes..."
                >Complete verified study material with solved examples and review questions.</textarea>
              </div>

              <!-- File Attachment OR Web/Drive Link -->
              <div style="margin-bottom: 16px; background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <label style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
                  📁 Attach Study File (PDF / DOC / PPT)
                </label>
                <input 
                  type="file" 
                  id="modal-note-file" 
                  class="form-input" 
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  style="width: 100%; margin-bottom: 10px; font-size: 0.85rem;"
                >
                <div style="display: flex; align-items: center; gap: 8px; margin: 8px 0; color: var(--text-muted); font-size: 0.75rem;">
                  <span style="flex: 1; height: 1px; background: var(--border-subtle);"></span>
                  <span>OR PASTE DOCUMENT / GOOGLE DRIVE LINK</span>
                  <span style="flex: 1; height: 1px; background: var(--border-subtle);"></span>
                </div>
                <input 
                  type="text" 
                  id="modal-note-url" 
                  class="form-input" 
                  placeholder="https://drive.google.com/... or direct PDF link" 
                  style="width: 100%; padding: 8px 12px; font-size: 0.85rem;"
                >
              </div>

              <!-- Author / Uploader -->
              <div style="margin-bottom: 22px;">
                <label for="modal-note-uploader" style="display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                  Uploaded By
                </label>
                <input 
                  type="text" 
                  id="modal-note-uploader" 
                  class="form-input" 
                  value="${user?.name || 'Department Faculty / Admin'}" 
                  style="width: 100%; padding: 8px 12px; font-size: 0.875rem;"
                >
              </div>

              <!-- Actions -->
              <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button type="button" class="btn btn-secondary" id="modal-cancel-btn">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary" id="modal-submit-btn" style="padding: 10px 24px; font-weight: 700;">
                  💾 Save & Publish Note
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    `;

    modalContainer.setAttribute('aria-hidden', 'false');

    const overlay = document.getElementById('upload-note-overlay');
    const closeBtn = document.getElementById('close-upload-modal');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const form = document.getElementById('unit-note-upload-form');

    const closeModal = () => {
      modalContainer.innerHTML = '';
      modalContainer.setAttribute('aria-hidden', 'true');
    };

    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Handle unit radio click styling
    overlay.querySelectorAll('.unit-radio-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        overlay.querySelectorAll('.unit-radio-pill').forEach(p => {
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
        const input = overlay.querySelector(`input[name="modal-target-unit"][value="${val}"]`);
        if (input) input.checked = true;

        // Auto update default title if untouched
        const titleInput = document.getElementById('modal-note-title');
        if (titleInput && titleInput.value.includes('Lecture Notes & Study Material')) {
          titleInput.value = `Unit ${val}: Lecture Notes & Study Material`;
        }
      });
    });

    // Submit handler
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const selectedUnitInput = overlay.querySelector('input[name="modal-target-unit"]:checked');
      const unitNum = selectedUnitInput ? parseInt(selectedUnitInput.value) : initialUnit;
      const title = document.getElementById('modal-note-title').value.trim();
      const desc = document.getElementById('modal-note-desc').value.trim();
      const author = document.getElementById('modal-note-uploader').value.trim() || 'Admin';
      const fileInput = document.getElementById('modal-note-file');
      const urlInput = document.getElementById('modal-note-url').value.trim();

      let fileName = `${subCode || 'Sub'}_Unit_${unitNum}_Notes.pdf`;
      let fileUrl = urlInput || `/uploads/notes/${fileName}`;
      let fileSize = '2.4 MB';
      let fileObj = null;

      if (fileInput.files && fileInput.files[0]) {
        fileObj = fileInput.files[0];
        fileName = fileObj.name;
        fileSize = `${(fileObj.size / (1024 * 1024)).toFixed(1)} MB`;
        try {
          fileUrl = URL.createObjectURL(fileObj);
        } catch (err) {
          fileUrl = `/uploads/notes/${fileName}`;
        }
      }

      const newNote = {
        id: `note-${context.subject?.id || subCode || 'sub'}-u${unitNum}-${Date.now()}`,
        subjectId: context.subject?.id || '',
        subjectCode: subCode,
        subjectName: subName,
        deptCode: context.deptCode,
        regCode: context.regCode,
        semester: context.semester,
        unit: unitNum,
        title: title,
        description: desc,
        fileName: fileName,
        fileUrl: fileUrl,
        fileSize: fileSize,
        uploadedBy: author,
        downloads: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };

      // Double submission guard
      const submitBtn = document.getElementById('modal-submit-btn');
      if (submitBtn) {
        if (submitBtn.disabled) return;
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Saving...';
      }

      // Upsert into local dataset (replace if matching unit exists to prevent duplicate cards)
      if (window.AppFallbackData) {
        if (!Array.isArray(window.AppFallbackData.notes)) {
          window.AppFallbackData.notes = [];
        }
        const existingIdx = window.AppFallbackData.notes.findIndex(n => 
          (n.deptCode || '').toUpperCase() === context.deptCode.toUpperCase() && 
          (n.regCode || '').toUpperCase() === context.regCode.toUpperCase() && 
          (n.subjectCode || '').toUpperCase() === subCode.toUpperCase() && 
          n.unit === unitNum
        );
        if (existingIdx !== -1) {
          window.AppFallbackData.notes[existingIdx] = { 
            ...window.AppFallbackData.notes[existingIdx], 
            ...newNote, 
            id: window.AppFallbackData.notes[existingIdx].id 
          };
        } else {
          window.AppFallbackData.notes.unshift(newNote);
        }
      }

      // Close modal and refresh UI immediately for instantaneous feedback
      closeModal();
      if (window.Toast) {
        window.Toast.show(`✅ Notes for Unit ${unitNum} saved successfully!`, 'success');
      }
      if (typeof onSuccess === 'function') {
        onSuccess(newNote);
      }

      // Asynchronously persist to MongoDB Atlas backend
      try {
        if (window.apiService && window.apiService.post) {
          if (fileObj) {
            const fd = new FormData();
            fd.append('file', fileObj);
            fd.append('title', title);
            fd.append('description', desc);
            fd.append('subjectId', context.subject?.id || '');
            fd.append('subjectCode', subCode);
            fd.append('subjectName', subName);
            fd.append('deptCode', context.deptCode);
            fd.append('regCode', context.regCode);
            fd.append('semester', context.semester);
            fd.append('unit', unitNum);
            fd.append('uploadedBy', author);
            await window.apiService.post('/resources/notes', fd);
          } else {
            await window.apiService.post('/resources/notes', newNote);
          }
        }
      } catch (err) {
        console.warn('Backend note save notice:', err.message);
      }
    });
  }
};
