// View Transition: Start State -> Create View
// Handles file upload and view switching

document.addEventListener('DOMContentLoaded', function() {
  const startState = document.getElementById('start-state');
  const createView = document.getElementById('create-view');
  const chatPanel = document.getElementById('chat-panel');
  const chatScrim = document.getElementById('chat-scrim');
  const fileInput = document.getElementById('brief-file-input');
  const uploadBtn = document.getElementById('upload-brief-btn');
  const submitBtn = document.querySelector('.start-input-submit');
  const inputField = document.getElementById('start-input-field');

  // NOTE: File upload and submit button handling is now in scripts.js
  // This file only handles the final transition from template selection to create view

  // Handle quick start chips - transition directly to create view
  const quickChips = document.querySelectorAll('.start-quick-chip');
  quickChips.forEach(chip => {
    chip.addEventListener('click', function() {
      transitionToCreateView();
    });
  });

  function transitionToCreateView(fromView) {
    // Set flag to prevent router from animating
    window.isTransitioning = true;

    // Update URL to reflect view change
    window.location.hash = 'create';

    // Get the view to fade out (start, loading, or template-selection)
    const viewToHide = fromView || startState;

    // Fade out current view
    if (viewToHide) {
      viewToHide.style.opacity = '0';
      viewToHide.style.transition = 'opacity 0.3s ease-out';
    }

    setTimeout(() => {
      // Hide current view
      if (viewToHide) {
        viewToHide.style.display = 'none';
      }

      // Show create view
      if (createView) {
        // Reset progress bar to 0 BEFORE showing the view
        const progressFill = createView.querySelector('.create-progress__fill');
        if (progressFill) {
          progressFill.style.transition = 'none';
          progressFill.style.width = '0%';
        }

        createView.style.display = 'flex';
        createView.style.opacity = '0';

        // Trigger reflow to apply the 0% width
        createView.offsetHeight;

        // Re-enable transition
        if (progressFill) {
          progressFill.style.transition = '';
        }

        // Fade in
        createView.style.transition = 'opacity 0.4s ease-in';
        createView.style.opacity = '1';
      }

      // Animate progress bar after view is visible
      setTimeout(() => {
        const progressFill = document.querySelector('.create-progress__fill');
        if (progressFill) {
          progressFill.style.width = '43%';
        }

        // Clear transition flag after animation
        setTimeout(() => {
          window.isTransitioning = false;
        }, 800);
      }, 500);

      // Open AI chat panel
      setTimeout(() => {
        if (chatPanel) {
          chatPanel.classList.add('chat-panel--open');
          chatPanel.setAttribute('aria-hidden', 'false');
        }
        if (chatScrim) {
          chatScrim.setAttribute('aria-hidden', 'false');
          chatScrim.style.opacity = '1';
          chatScrim.style.pointerEvents = 'auto';
        }
      }, 400);

    }, 300);
  }

  // Expose transition function globally so scripts.js can call it
  window.transitionToCreateView = transitionToCreateView;
});
