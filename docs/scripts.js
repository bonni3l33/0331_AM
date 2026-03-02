// Campaign Manager - Clean Scripts
// Minimal functionality for view interactions

document.addEventListener('DOMContentLoaded', function() {
  // Chat panel controls
  const chatPanel = document.getElementById('chat-panel');
  const chatScrim = document.getElementById('chat-scrim');
  const chatClose = document.getElementById('chat-close');

  // Close chat panel
  if (chatClose) {
    chatClose.addEventListener('click', function() {
      if (chatPanel) {
        chatPanel.classList.remove('chat-panel--open');
        chatPanel.setAttribute('aria-hidden', 'true');
      }
      if (chatScrim) {
        chatScrim.setAttribute('aria-hidden', 'true');
        chatScrim.style.opacity = '0';
        chatScrim.style.pointerEvents = 'none';
      }
    });
  }

  // Close on scrim click
  if (chatScrim) {
    chatScrim.addEventListener('click', function() {
      if (chatPanel) {
        chatPanel.classList.remove('chat-panel--open');
        chatPanel.setAttribute('aria-hidden', 'true');
      }
      chatScrim.setAttribute('aria-hidden', 'true');
      chatScrim.style.opacity = '0';
      chatScrim.style.pointerEvents = 'none';
    });
  }

  // Tab switcher on start page
  const tabs = document.querySelectorAll('.start-input-tab');
  const inputField = document.getElementById('start-input-field');
  const uploadSection = document.querySelector('.start-input-actions-left');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('start-input-tab--active'));
      this.classList.add('start-input-tab--active');

      const tabType = this.getAttribute('data-tab');

      if (tabType === 'brief') {
        // Show upload button and update placeholder
        if (uploadSection) uploadSection.style.visibility = 'visible';
        if (inputField) inputField.placeholder = 'Paste your brief text or upload a file below';
      } else if (tabType === 'scratch') {
        // Hide upload button and update placeholder
        if (uploadSection) uploadSection.style.visibility = 'hidden';
        if (inputField) inputField.placeholder = 'Tell me what campaign you want to create...';
      }
    });
  });

  // Placement tabs switching
  const placementTabs = document.querySelectorAll('.placement-tab');
  const placementPanels = document.querySelectorAll('.placement-panel');

  placementTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetPanel = this.getAttribute('data-tab');

      // Remove active class from all tabs
      placementTabs.forEach(t => t.classList.remove('placement-tab--active'));

      // Add active class to clicked tab
      this.classList.add('placement-tab--active');

      // Hide all panels
      placementPanels.forEach(p => p.classList.remove('placement-panel--active'));

      // Show target panel
      const panel = document.querySelector(`.placement-panel[data-panel="${targetPanel}"]`);
      if (panel) {
        panel.classList.add('placement-panel--active');
      }
    });
  });

  // Toggle status label update
  function updatePlacementToggles() {
    const toggles = document.querySelectorAll('.placement-item__status .placement-item__toggle input[type="checkbox"]');

    toggles.forEach(toggle => {
      const statusLabel = toggle.closest('.placement-item__status').querySelector('.placement-item__status-label');

      // Update label on change
      toggle.addEventListener('change', function() {
        if (statusLabel) {
          statusLabel.textContent = this.checked ? 'Active' : 'Inactive';
        }
      });
    });
  }

  // Initialize toggle handlers
  updatePlacementToggles();

  // Chat action items - scroll to section on click
  const chatActions = document.querySelectorAll('.chat-action');

  chatActions.forEach(action => {
    action.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      const section = document.getElementById(sectionId);

      if (section) {
        // Remove highlight from any previously highlighted sections
        document.querySelectorAll('.create-section--highlighted').forEach(s => {
          s.classList.remove('create-section--highlighted');
        });

        // Expand the section if it's collapsed
        if (section.classList.contains('create-section--collapsed')) {
          const toggle = section.querySelector('.create-section__toggle');
          if (toggle) {
            toggle.click();
          }
        }

        // Scroll to the section with smooth behavior
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Add gradient highlight class
        section.classList.add('create-section--highlighted');

        // Remove highlight after animation
        setTimeout(() => {
          section.classList.remove('create-section--highlighted');
        }, 2000);
      }
    });
  });

  // Confirm button - hide after click to indicate acceptance
  const confirmButtons = document.querySelectorAll('.create-section__footer .btn');
  const publishBtn = document.getElementById('publish-btn');
  let confirmedSections = 0;
  const totalSections = confirmButtons.length;

  function checkAllSectionsConfirmed() {
    if (confirmedSections === totalSections && publishBtn) {
      // Enable publish button
      publishBtn.disabled = false;

      // Add checkmark icon to publish button (Prism 16px check icon)
      const checkmark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      checkmark.setAttribute('class', 'icon');
      checkmark.setAttribute('width', '16');
      checkmark.setAttribute('height', '16');
      checkmark.setAttribute('viewBox', '0 0 16 16');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill-rule', 'evenodd');
      path.setAttribute('clip-rule', 'evenodd');
      path.setAttribute('d', 'M14.7071 3.29289C15.0976 3.68342 15.0976 4.31658 14.7071 4.70711L6.20711 13.2071C5.81658 13.5976 5.18342 13.5976 4.79289 13.2071L1.29289 9.70711C0.902369 9.31658 0.902369 8.68342 1.29289 8.29289C1.68342 7.90237 2.31658 7.90237 2.70711 8.29289L5.5 11.0858L13.2929 3.29289C13.6834 2.90237 14.3166 2.90237 14.7071 3.29289Z');
      path.setAttribute('fill', 'currentColor');

      checkmark.appendChild(path);
      publishBtn.insertBefore(checkmark, publishBtn.firstChild);

      // Add animation
      publishBtn.classList.add('btn--enabled-animation');
      setTimeout(() => {
        publishBtn.classList.remove('btn--enabled-animation');
      }, 400);
    }
  }

  confirmButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Add confirmed state with checkmark briefly
      this.classList.add('btn--confirmed');

      // Add checkmark icon (Prism 16px check icon)
      const checkmark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      checkmark.setAttribute('class', 'btn__checkmark');
      checkmark.setAttribute('width', '16');
      checkmark.setAttribute('height', '16');
      checkmark.setAttribute('viewBox', '0 0 16 16');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill-rule', 'evenodd');
      path.setAttribute('clip-rule', 'evenodd');
      path.setAttribute('d', 'M14.7071 3.29289C15.0976 3.68342 15.0976 4.31658 14.7071 4.70711L6.20711 13.2071C5.81658 13.5976 5.18342 13.5976 4.79289 13.2071L1.29289 9.70711C0.902369 9.31658 0.902369 8.68342 1.29289 8.29289C1.68342 7.90237 2.31658 7.90237 2.70711 8.29289L5.5 11.0858L13.2929 3.29289C13.6834 2.90237 14.3166 2.90237 14.7071 3.29289Z');
      path.setAttribute('fill', 'currentColor');

      checkmark.appendChild(path);
      this.insertBefore(checkmark, this.firstChild);

      // Increment confirmed sections counter
      confirmedSections++;
      checkAllSectionsConfirmed();

      // Fade out and hide after brief confirmation
      setTimeout(() => {
        this.classList.add('btn--fade-out');

        setTimeout(() => {
          const footer = this.closest('.create-section__footer');
          if (footer) {
            footer.style.display = 'none';
          }
        }, 300);
      }, 600);
    });
  });

  // Template Selection View Navigation
  const startState = document.getElementById('start-state');
  const loadingState = document.getElementById('loading-state');
  const templateSelectionView = document.getElementById('template-selection-view');
  const createView = document.getElementById('create-view');
  const startSubmitBtn = document.querySelector('.start-input-submit');
  const uploadBriefBtn = document.getElementById('upload-brief-btn');
  const briefFileInput = document.getElementById('brief-file-input');

  // Show loading animation, then template selection
  function showLoadingThenTemplates() {
    if (startState && loadingState && templateSelectionView) {
      // Hide start, show loading
      startState.style.display = 'none';
      loadingState.style.display = 'flex';

      // After 2 seconds, hide loading and show templates
      setTimeout(() => {
        loadingState.style.display = 'none';
        templateSelectionView.style.display = 'flex';
        // Update URL to #select
        window.location.hash = 'select';
      }, 2000);
    }
  }

  // Handle file upload
  if (uploadBriefBtn && briefFileInput) {
    uploadBriefBtn.addEventListener('click', function() {
      briefFileInput.click();
    });

    briefFileInput.addEventListener('change', function() {
      if (this.files && this.files.length > 0) {
        // File uploaded, show loading then template selection
        showLoadingThenTemplates();
      }
    });
  }

  // Handle submit button (for pasted text)
  if (startSubmitBtn) {
    startSubmitBtn.addEventListener('click', function() {
      const inputValue = inputField?.value.trim();
      if (inputValue) {
        showLoadingThenTemplates();
      }
    });
  }

  // Template selection radio buttons with inline config
  const templateRadios = document.querySelectorAll('.template-option__radio');
  const templateContinueBtn = document.querySelector('.template-selection__continue');
  const templateConfigSection = document.getElementById('template-config-section');
  const configPromotion = document.getElementById('config-promotion');
  const configAction = document.getElementById('config-action');
  const previewNavBtn = document.getElementById('preview-nav-btn');

  templateRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      const templateType = this.value;

      if (templateContinueBtn) {
        templateContinueBtn.disabled = false;
      }

      // Show/hide inline configuration based on selection
      if (templateType === 'promotion') {
        // Show inline config for Multiple Promotion Campaigns
        if (templateConfigSection && configPromotion && configAction) {
          templateConfigSection.style.display = 'block';
          configPromotion.style.display = 'flex';
          configAction.style.display = 'none';

          // Show preview nav button
          if (previewNavBtn) {
            previewNavBtn.style.display = 'flex';
          }

          // Gentle scroll to show config, but keep templates visible above
          setTimeout(() => {
            templateConfigSection.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
          }, 150);
        }
      } else if (templateType === 'action') {
        // Show inline config for Multiple Action-Based Campaigns
        if (templateConfigSection && configPromotion && configAction) {
          templateConfigSection.style.display = 'block';
          configPromotion.style.display = 'none';
          configAction.style.display = 'flex';

          // Show preview nav button
          if (previewNavBtn) {
            previewNavBtn.style.display = 'flex';
          }

          // Gentle scroll to show config, but keep templates visible above
          setTimeout(() => {
            templateConfigSection.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
          }, 150);
        }
      } else {
        // Hide config for Single Campaign
        if (templateConfigSection) {
          templateConfigSection.style.display = 'none';
        }
        // Hide preview nav button
        if (previewNavBtn) {
          previewNavBtn.style.display = 'none';
        }
      }
    });
  });

  // Preview Nav Button - Navigate to preview view
  if (previewNavBtn) {
    previewNavBtn.addEventListener('click', function() {
      const previewView = document.getElementById('preview-options-view');
      if (previewView && templateSelectionView) {
        templateSelectionView.style.display = 'none';
        previewView.style.display = 'block';
      }
    });
  }

  // Template selection continue button
  if (templateContinueBtn) {
    templateContinueBtn.addEventListener('click', function() {
      const selectedTemplate = document.querySelector('.template-option__radio:checked');

      if (selectedTemplate && templateSelectionView) {
        // Store selected template type for future use
        const templateType = selectedTemplate.value;
        console.log('Selected template:', templateType);

        // Store configuration if multiple campaigns selected
        if (templateType === 'promotion') {
          const campaignCount = document.getElementById('campaign-count')?.value;
          const structure = document.querySelector('input[name="campaign-structure"]:checked')?.value;
          console.log('Promotion config:', { campaignCount, structure });
          localStorage.setItem('campaignConfig', JSON.stringify({ type: 'promotion', count: campaignCount, structure }));
        } else if (templateType === 'action') {
          const stepCount = document.getElementById('action-steps-count')?.value;
          const journeyType = document.querySelector('input[name="journey-type"]:checked')?.value;
          console.log('Action config:', { stepCount, journeyType });
          localStorage.setItem('campaignConfig', JSON.stringify({ type: 'action', steps: stepCount, journeyType }));
        }

        // Navigate to create view using the transition function from view-transition.js
        if (typeof window.transitionToCreateView === 'function') {
          window.transitionToCreateView(templateSelectionView);
        } else {
          // Fallback if view-transition.js hasn't loaded
          templateSelectionView.style.display = 'none';
          if (createView) {
            createView.style.display = 'flex';
          }
        }
      }
    });
  }

  // Preview Options View - Tab Switching
  const previewTabs = document.querySelectorAll('.preview-tab');
  const previewPanels = document.querySelectorAll('.preview-panel');
  const previewSelectBtn = document.getElementById('preview-select-option');
  let selectedPreviewOption = 'option-a'; // Default

  previewTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetPreview = this.getAttribute('data-preview');

      // Update active tab
      previewTabs.forEach(t => t.classList.remove('preview-tab--active'));
      this.classList.add('preview-tab--active');

      // Update active panel
      previewPanels.forEach(panel => {
        panel.classList.remove('preview-panel--active');
        if (panel.id === targetPreview) {
          panel.classList.add('preview-panel--active');
        }
      });

      // Update selected option
      selectedPreviewOption = targetPreview;

      // Enable select button
      if (previewSelectBtn) {
        previewSelectBtn.disabled = false;
      }
    });
  });

  // Preview Options - Close/Back buttons
  const previewCloseButtons = document.querySelectorAll('.preview-options-close');
  const previewView = document.getElementById('preview-options-view');

  previewCloseButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (previewView && templateSelectionView) {
        previewView.style.display = 'none';
        templateSelectionView.style.display = 'flex';
      }
    });
  });

  // Preview Options - Select Option button
  if (previewSelectBtn) {
    previewSelectBtn.addEventListener('click', function() {
      console.log('Selected preview option:', selectedPreviewOption);

      // Store the selected option for implementation
      localStorage.setItem('selectedInteractionPattern', selectedPreviewOption);

      // Show confirmation
      alert(`You've selected ${selectedPreviewOption.replace('-', ' ').toUpperCase()}. This interaction pattern will be saved for implementation.`);

      // Navigate back to template selection for now
      if (previewView && templateSelectionView) {
        previewView.style.display = 'none';
        templateSelectionView.style.display = 'flex';
      }
    });
  }
});
