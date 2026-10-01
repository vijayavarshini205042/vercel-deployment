/**
 * Presentation Modal Component
 * Renders an interactive, responsive presentation slide deck modal inside the SPA.
 * Allows instant presentation viewing, fullscreen presentation, and opening in a new tab.
 */

window.PresentationModal = {
  isOpen: false,

  show() {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) {
      window.open('/presentation.html', '_blank');
      return;
    }

    this.isOpen = true;
    modalContainer.setAttribute('aria-hidden', 'false');

    modalContainer.innerHTML = `
      <div class="modal-overlay presentation-modal-overlay" id="presentation-overlay" style="display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(5, 10, 25, 0.88); backdrop-filter: blur(8px); z-index: 9999;">
        <div class="presentation-modal-dialog" style="width: 95vw; max-width: 1400px; height: 90vh; background: #0f172a; border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 18px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.85); display: flex; flex-direction: column; overflow: hidden; position: relative;">
          
          <!-- Modal Top Bar -->
          <div style="height: 52px; background: rgba(15, 23, 42, 0.95); border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: space-between; padding: 0 20px; flex-shrink: 0;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.25rem;">🏛️</span>
              <strong style="color: #fff; font-size: 0.95rem; font-weight: 700;">DRMS Capstone Project Presentation Deck</strong>
              <span class="badge badge-primary" style="font-size: 0.7rem; padding: 2px 8px;">Presenter: Vijayavarshini S</span>
            </div>

            <div style="display: flex; align-items: center; gap: 10px;">
              <a href="/DRMS_Review_3_Final_Presentation.pptx" download class="btn btn-ghost btn-sm" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.82rem; text-decoration: none; color: #10b981;" title="Download Editable PowerPoint File">
                <span>📥 Download .PPTX</span>
              </a>
              <a href="/presentation.html" target="_blank" class="btn btn-ghost btn-sm" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.82rem; text-decoration: none;" title="Open in dedicated tab (Projector Mode)">
                <span>↗ Open Standalone</span>
              </a>
              <button class="btn btn-ghost btn-sm" id="pres-modal-fullscreen" style="font-size: 0.85rem;" title="Toggle Fullscreen">
                ⛶
              </button>
              <button class="btn btn-ghost btn-sm" id="close-presentation-modal" style="font-size: 1.1rem; line-height: 1; padding: 4px 8px; border-radius: 6px;" title="Close (Esc)">
                ✕
              </button>
            </div>
          </div>

          <!-- Embedded Presentation Frame -->
          <div style="flex: 1; position: relative; background: #0b0f19;">
            <iframe 
              id="presentation-iframe"
              src="/presentation.html" 
              style="width: 100%; height: 100%; border: none;"
              title="DRMS Project Presentation"
              allow="fullscreen"
            ></iframe>
          </div>
        </div>
      </div>
    `;

    const overlay = document.getElementById('presentation-overlay');
    const closeBtn = document.getElementById('close-presentation-modal');
    const fsBtn = document.getElementById('pres-modal-fullscreen');

    const handleClose = () => this.close();

    closeBtn?.addEventListener('click', handleClose);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) handleClose();
    });

    fsBtn?.addEventListener('click', () => {
      const iframe = document.getElementById('presentation-iframe');
      if (iframe && iframe.requestFullscreen) {
        iframe.requestFullscreen().catch(() => {});
      }
    });

    const escListener = (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
        document.removeEventListener('keydown', escListener);
      }
    };
    document.addEventListener('keydown', escListener);
  },

  close() {
    this.isOpen = false;
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      modalContainer.innerHTML = '';
      modalContainer.setAttribute('aria-hidden', 'true');
    }
  }
};
