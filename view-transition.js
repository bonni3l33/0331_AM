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

  // Handle file upload button click
  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      // Reset file input to allow re-uploading the same file
      fileInput.value = '';

      // Small delay to ensure event propagation is complete
      setTimeout(() => {
        fileInput.click();
      }, 0);
    }, { capture: true });
  }

  // Handle file selection
  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      e.preventDefault();
      e.stopPropagation();

      const file = e.target.files[0];
      if (file) {
        handleFileUpload(file);
      }
    });
  }

  // Handle submit button (for text input)
  if (submitBtn && inputField) {
    submitBtn.addEventListener('click', function() {
      const value = inputField.value.trim();
      if (value) {
        transitionToCreateView();
      }
    });

    // Handle enter key
    inputField.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const value = inputField.value.trim();
        if (value) {
          transitionToCreateView();
        }
      }
    });
  }

  // Handle quick start chips
  const quickChips = document.querySelectorAll('.start-quick-chip');
  quickChips.forEach(chip => {
    chip.addEventListener('click', function() {
      transitionToCreateView();
    });
  });

  function handleFileUpload(file) {
    // Show loading state
    showUploadingState(file.name);

    // Simulate processing time
    setTimeout(() => {
      transitionToCreateView(file.name);
    }, 1500);
  }

  function showUploadingState(fileName) {
    const uploadBtn = document.getElementById('upload-brief-btn');
    const inputField = document.getElementById('start-input-field');

    if (inputField) {
      inputField.value = `📄 ${fileName}`;
      inputField.disabled = true;
    }

    if (uploadBtn) {
      const originalHTML = uploadBtn.innerHTML;
      uploadBtn.innerHTML = `
        <svg class="icon" width="20" height="20" style="animation: spin 1s linear infinite;"><use href="#icon-spinner"/></svg>
        Processing...
      `;
      uploadBtn.disabled = true;

      // Add spin animation if not exists
      if (!document.querySelector('#spin-animation')) {
        const style = document.createElement('style');
        style.id = 'spin-animation';
        style.textContent = `
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `;
        document.head.appendChild(style);
      }
    }
  }

  function transitionToCreateView(fileName) {
    // Set flag to prevent router from animating
    window.isTransitioning = true;

    // Update URL to reflect view change
    window.location.hash = 'create';

    // Fade out start state
    if (startState) {
      startState.style.opacity = '0';
      startState.style.transition = 'opacity 0.3s ease-out';
    }

    setTimeout(() => {
      // Hide start state
      if (startState) {
        startState.style.display = 'none';
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
          progressFill.style.width = '50%';
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
});
