/**
 * Visual Career Roadmap Component
 * Interactive visual flowchart with connected stages, skills, projects,
 * recommended learning resources, and interview topics across all 19 departments.
 */

window.RoadmapsView = {
  async render() {
    const container = document.getElementById('view-container');
    if (!container) return;

    const state = window.appState.state;
    const currentDeptCode = state.department || 'IT';
    const params = state.viewParams || {};

    const allRoadmaps = window.AppFallbackData?.roadmaps || [];
    // Default to the specified param, or current department's roadmap, or first available
    let currentRoadmap = (params.roadmapId ? allRoadmaps.find(r => r.id === params.roadmapId) : null) || 
                         allRoadmaps.find(r => r.deptCode === currentDeptCode) || 
                         allRoadmaps[0];

    if (!currentRoadmap) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🗺️</div>
          <div class="empty-state-title">No Roadmaps Found</div>
          <div class="empty-state-desc">Roadmaps for this department are being compiled.</div>
          <button class="btn btn-primary" onclick="window.appState.setView('dashboard')">Back to Dashboard</button>
        </div>
      `;
      return;
    }

    const renderUI = () => {
      container.innerHTML = `
        <div class="roadmap-container">
          <!-- Roadmap Header Card -->
          <div class="roadmap-header-card">
            <div style="flex: 1; min-width: 280px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                <span class="badge badge-primary">🗺️ Visual Career Roadmap</span>
                <span class="badge badge-subtle">${currentRoadmap.deptCode} Department</span>
                <span class="badge badge-success">${currentRoadmap.stages?.length || 5} Milestone Stages</span>
              </div>
              <h1 style="font-size: 1.85rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">
                ${currentRoadmap.roleTitle}
              </h1>
              <div class="roadmap-meta">
                <span style="font-size: 0.875rem; color: var(--text-secondary);">
                  🎯 Target Specialty: <strong>${currentRoadmap.targetCareer}</strong>
                </span>
                <span style="color: var(--text-muted);">•</span>
                <span style="font-size: 0.875rem; color: var(--text-secondary);">
                  ⏱️ Estimated Timeline: <strong>${currentRoadmap.estimatedDuration}</strong>
                </span>
              </div>
            </div>

            <!-- Selector for other department roadmaps -->
            <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-end;">
              <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <label for="roadmap-select-dropdown" style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
                  Switch Roadmap:
                </label>
                <select id="roadmap-select-dropdown" class="form-select" style="min-width: 260px; font-size: 0.8125rem;">
                  ${allRoadmaps.map(r => `
                    <option value="${r.id}" ${r.id === currentRoadmap.id ? 'selected' : ''}>
                      [${r.deptCode}] ${r.roleTitle}
                    </option>
                  `).join('')}
                </select>
              </div>

              <button class="btn btn-secondary btn-sm" id="roadmap-back-roles-btn">
                ← Back to ${currentDeptCode} Roles
              </button>
            </div>
          </div>

          <!-- Realistic Disclaimer Notice -->
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-left: 4px solid var(--color-accent-cyan); border-radius: var(--radius-md); padding: 12px 16px; font-size: 0.8125rem; color: var(--text-secondary);">
            ℹ️ <strong>Pedagogical Progression:</strong> This curriculum pathway was formulated in collaboration with departmental faculty boards and industry advisors. Complete each milestone project before advancing to subsequent stages.
          </div>

          <!-- Visual Flow Timeline -->
          <div class="roadmap-flow" aria-label="Career Milestones">
            ${(currentRoadmap.stages || []).map(stage => {
              const levelBadge = stage.skillLevel.includes('Beginner') 
                ? 'badge-success' 
                : stage.skillLevel.includes('Intermediate') 
                ? 'badge-warning' 
                : 'badge-primary';

              return `
                <div class="roadmap-step">
                  <!-- Circular Node -->
                  <div class="step-node">
                    ${stage.stageNumber}
                  </div>

                  <!-- Stage Content Card -->
                  <div class="step-card">
                    <div class="step-header">
                      <div>
                        <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--color-primary-600); letter-spacing: 0.05em;">
                          Stage 0${stage.stageNumber}
                        </div>
                        <h3 class="step-title">${stage.title}</h3>
                      </div>
                      <span class="badge ${levelBadge}">${stage.skillLevel}</span>
                    </div>

                    <p class="step-desc">${stage.description}</p>

                    <!-- Key Topics Chips -->
                    <div style="margin-bottom: 16px;">
                      <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">
                        Core Concepts to Master:
                      </div>
                      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                        ${(stage.keyTopics || []).map(topic => `
                          <span class="badge badge-subtle" style="font-size: 0.75rem; font-weight: 500; text-transform: none;">
                            ${topic}
                          </span>
                        `).join('')}
                      </div>
                    </div>

                    <!-- Subsections: Resources & Practice Project -->
                    <div class="step-subsections">
                      <div class="subsection-box">
                        <span class="subsection-label">📖 Recommended Resources</span>
                        <ul style="margin: 0; padding-left: 18px; font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5;">
                          ${(stage.recommendedResources || []).map(res => `<li>${res}</li>`).join('')}
                        </ul>
                      </div>

                      <div class="subsection-box">
                        <span class="subsection-label">🛠️ Milestone Practice Project</span>
                        <div class="subsection-content" style="font-weight: 600; font-size: 0.8125rem;">
                          ${stage.practiceProject}
                        </div>
                      </div>
                    </div>

                    <!-- Interview Topics -->
                    ${stage.interviewTopics && stage.interviewTopics.length > 0 ? `
                      <div class="interview-box">
                        <div class="interview-box-title">
                          <span>💬 Technical Interview Checkpoint</span>
                        </div>
                        <ul style="margin: 0; padding-left: 18px; font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5;">
                          ${stage.interviewTopics.map(q => `<li>${q}</li>`).join('')}
                        </ul>
                      </div>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;

      // Event listeners
      container.querySelector('#roadmap-select-dropdown')?.addEventListener('change', (e) => {
        const found = allRoadmaps.find(r => r.id === e.target.value);
        if (found) {
          currentRoadmap = found;
          renderUI();
        }
      });

      container.querySelector('#roadmap-back-roles-btn')?.addEventListener('click', () => {
        window.appState.setView('job-roles');
      });
    };

    renderUI();
  }
};
