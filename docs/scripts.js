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

        // Force reflow to ensure content is rendered
        templateSelectionView.offsetHeight;

        // Show progress bar and step text (hidden for now)
        // const progressBarContainer = document.getElementById('progress-bar-container');
        // const progressStepText = document.getElementById('progress-step-text');
        // if (progressBarContainer) {
        //   progressBarContainer.style.display = 'block';
        // }
        // if (progressStepText) {
        //   progressStepText.style.display = 'inline';
        // }
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

  // Handle submit button (navigate to template selection)
  if (startSubmitBtn) {
    startSubmitBtn.addEventListener('click', function() {
      showLoadingThenTemplates();
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

        // Store configuration for all template types
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
        } else if (templateType === 'single') {
          // Store single campaign type
          localStorage.setItem('campaignConfig', JSON.stringify({ type: 'single' }));
        }

        // Navigate to summary view instead of create view
        transitionToSummaryView();
      }
    });
  }

  // Function to transition to summary view
  function transitionToSummaryView() {
    const summaryView = document.getElementById('summary-view');

    if (!summaryView || !templateSelectionView) return;

    // Update URL
    window.location.hash = 'summary';

    // Fade out template selection view
    templateSelectionView.style.opacity = '0';
    templateSelectionView.style.transition = 'opacity 0.3s ease-out';

    setTimeout(() => {
      templateSelectionView.style.display = 'none';

      // Show summary view
      summaryView.style.display = 'flex';
      summaryView.style.opacity = '0';

      // Generate summary text AFTER view is shown
      setTimeout(() => {
        generateSummaryText();
        summaryView.style.transition = 'opacity 0.4s ease-in';
        summaryView.style.opacity = '1';
      }, 50);
    }, 300);
  }

  // Function to generate summary text
  function generateSummaryText() {
    const config = JSON.parse(localStorage.getItem('campaignConfig') || '{}');

    // Get field elements
    const campaignTypeEl = document.getElementById('summary-campaign-type');
    const promotionEl = document.getElementById('summary-promotion');
    const placementsEl = document.getElementById('summary-placements');
    const targetingEl = document.getElementById('summary-targeting');

    console.log('generateSummaryText called', config);

    if (!campaignTypeEl || !promotionEl || !placementsEl || !targetingEl) {
      console.error('Summary field elements not found!');
      return;
    }

    // Populate based on campaign type
    if (config.type === 'promotion') {
      // Campaign Type
      campaignTypeEl.textContent = `Multiple Promotion Campaign (${config.count || 3} campaigns)`;

      // Promotion
      promotionEl.innerHTML = '30% off orders with $12 minimum subtotal, max $10 discount<br>Duration: 30 days, auto-applied at checkout';

      // Placements
      placementsEl.innerHTML = `
        <span class="summary-tag">Email (16)</span>
        <span class="summary-tag">Push (16)</span>
        <span class="summary-tag">SMS (2)</span>
        <span class="summary-tag">Homepage Banner (8)</span>
        <span class="summary-tag">Store Page Banner (8)</span>
      `;

      // Targeting
      targetingEl.textContent = 'Active Customers with 1-3 lifetime orders, excluding fraud and customers in other programs';

    } else if (config.type === 'action') {
      // Campaign Type
      campaignTypeEl.textContent = `Multiple Action-Based Campaign (${config.steps || 4} phases)`;

      // Promotion
      promotionEl.innerHTML = '30% off with $12 min subtotal, max $10 discount per order<br>Auto-applied at checkout, valid for 30 days from signup';

      // Placements
      placementsEl.innerHTML = `
        <span class="summary-tag">Email (30)</span>
        <span class="summary-tag">Push (30)</span>
        <span class="summary-tag">SMS (2)</span>
        <span class="summary-tag">Homepage Banner (8)</span>
        <span class="summary-tag">Store Page Banner (8)</span>
        <span class="summary-tag">Spotlight Banner (8)</span>
        <span class="summary-tag">Immersive Header (8)</span>
      `;

      // Targeting
      targetingEl.textContent = 'New Customers (signed up within 30 days, non-DashPass, <20 duplicate accounts), excluding fraud';

    } else {
      // Single Campaign (default)
      // Campaign Type
      campaignTypeEl.textContent = 'NPWS Promotion. Single Campaign';

      // Promotion
      promotionEl.innerHTML = '40% off 1 order with $15 min subtotal, max $10 discount<br>Code: NEW40OFF<br>Duration: 30 days';

      // Placements
      placementsEl.innerHTML = `
        <span class="summary-tag">Email (16)</span>
        <span class="summary-tag">Push (8)</span>
        <span class="summary-tag">SMS (2)</span>
        <span class="summary-tag">Homepage Banner (4)</span>
        <span class="summary-tag">Immersive Header (8)</span>
        <span class="summary-tag">Spotlight Banner (8)</span>
      `;

      // Targeting
      targetingEl.textContent = 'Non-purchasers within 45 days of signup, excluding fraud and SUMA customers';
    }
  }

  // Setup Campaign Tabs for Multiple Campaigns
  function setupCampaignTabs(templateType, skipHashUpdate) {
    const campaignTabsContainer = document.getElementById('campaign-tabs-container');
    const campaignTabsWrapper = document.getElementById('campaign-tabs');
    const createViewTitle = document.querySelector('.create-view__title');
    const publishBtn = document.getElementById('publish-btn');

    // Get stored campaign configuration
    const configStr = localStorage.getItem('campaignConfig');
    if (!configStr) return;

    const config = JSON.parse(configStr);

    // Only show tabs for multiple campaign templates
    if (config.type === 'promotion' || config.type === 'action') {
      const campaignCount = parseInt(config.count || config.steps || 3);

      // Show campaign tabs
      if (campaignTabsWrapper) {
        campaignTabsWrapper.style.display = 'block';
      }

      // Update title to reflect multiple campaigns
      if (createViewTitle) {
        if (config.type === 'promotion') {
          createViewTitle.textContent = 'Multiple Promotion Campaigns';
        } else if (config.type === 'action') {
          createViewTitle.textContent = 'Multiple Action-Based Campaigns';
        }
      }

      // Update publish button text
      if (publishBtn) {
        publishBtn.textContent = 'Publish All';
      }

      // Generate tabs
      if (campaignTabsContainer) {
        campaignTabsContainer.innerHTML = '';

        for (let i = 1; i <= campaignCount; i++) {
          const tab = document.createElement('button');
          tab.className = 'campaign-tab' + (i === 1 ? ' campaign-tab--active' : '');
          tab.setAttribute('data-campaign-index', i);

          const text = document.createElement('span');
          text.className = 'campaign-tab__text';
          text.textContent = `Campaign ${i}`;

          tab.appendChild(text);
          campaignTabsContainer.appendChild(tab);
        }

        // Add click handlers for tabs
        const tabs = campaignTabsContainer.querySelectorAll('.campaign-tab');
        tabs.forEach(tab => {
          tab.addEventListener('click', function() {
            const campaignIndex = this.getAttribute('data-campaign-index');

            // Update active tab
            tabs.forEach(t => t.classList.remove('campaign-tab--active'));
            this.classList.add('campaign-tab--active');

            // Store current campaign index
            localStorage.setItem('currentCampaignIndex', campaignIndex);

            console.log(`Switched to Campaign ${campaignIndex}`);

            // Refresh sections for the selected campaign
            refreshCampaignSections(campaignIndex);

            // Update URL hash to reflect current campaign (if not from router)
            if (!skipHashUpdate) {
              const config = JSON.parse(localStorage.getItem('campaignConfig') || '{}');
              if (config.type && config.count) {
                window.location.hash = `create&type=${config.type}&count=${config.count}&campaign=${campaignIndex}`;
              }
            }
          });
        });

        // Set initial campaign index and update placeholder
        localStorage.setItem('currentCampaignIndex', '1');

        // Set initial Campaign Name placeholder
        const campaignNameInput = document.getElementById('campaign-name-input');
        if (campaignNameInput) {
          campaignNameInput.placeholder = 'Campaign 1';
          campaignNameInput.value = '';
        }
      }
    } else {
      // Hide campaign tabs for single campaign
      if (campaignTabsWrapper) {
        campaignTabsWrapper.style.display = 'none';
      }

      // Reset title
      if (createViewTitle) {
        createViewTitle.textContent = 'Summer 2026 DashPass Campaign';
      }

      // Reset publish button
      if (publishBtn) {
        publishBtn.textContent = 'Publish';
      }
    }
  }

  // Expose functions to global scope for router
  window.setupCampaignTabsFromRouter = function(templateType) {
    setupCampaignTabs(templateType, true);
  };

  window.refreshCampaignSectionsFromRouter = function(campaignIndex) {
    refreshCampaignSections(campaignIndex);
  };

  // Refresh Campaign Sections when switching tabs
  function refreshCampaignSections(campaignIndex) {
    const sectionsContainer = document.querySelector('.create-sections');
    if (!sectionsContainer) return;

    // Add fade-out transition
    sectionsContainer.style.opacity = '0.4';
    sectionsContainer.style.transition = 'opacity 0.2s ease';

    // After brief delay, update content and fade back in
    setTimeout(() => {
      // Update page title or breadcrumb to show current campaign
      const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
      if (breadcrumbCurrent) {
        breadcrumbCurrent.textContent = `Campaign ${campaignIndex}`;
      }

      // Update Campaign Name input placeholder
      const campaignNameInput = document.getElementById('campaign-name-input');
      if (campaignNameInput) {
        campaignNameInput.placeholder = `Campaign ${campaignIndex}`;
        // Clear value for demo purposes to show different campaigns
        // In real app, this would load saved campaign name from storage
        campaignNameInput.value = '';
      }

      // Update progress based on campaign
      // For demo purposes, show different progress for different campaigns
      const progressFill = document.querySelector('.create-progress__fill');
      const progressLabel = document.querySelector('.create-progress__label');

      if (progressFill && progressLabel) {
        const progressValues = {
          '1': { percent: 43, completed: 3, total: 7 },
          '2': { percent: 14, completed: 1, total: 7 },
          '3': { percent: 0, completed: 0, total: 7 }
        };

        const progress = progressValues[campaignIndex] || progressValues['1'];
        progressFill.style.width = `${progress.percent}%`;
        progressLabel.textContent = `${progress.percent}% complete • ${progress.completed} of ${progress.total} sections filled`;
      }

      // Update section completion states based on campaign
      const sections = sectionsContainer.querySelectorAll('.create-section');
      sections.forEach((section, index) => {
        // Reset all sections first
        section.classList.remove('create-section--completed', 'create-section--incomplete');

        const statusEl = section.querySelector('.create-section__status');
        const badgeEl = section.querySelector('.create-section__badge');

        // For Campaign 1: first 3 sections completed
        // For Campaign 2: first section completed
        // For Campaign 3: no sections completed
        let isCompleted = false;

        if (campaignIndex === '1' && index < 3) {
          isCompleted = true;
        } else if (campaignIndex === '2' && index < 1) {
          isCompleted = true;
        }

        if (isCompleted) {
          section.classList.add('create-section--completed');
          if (statusEl) {
            statusEl.classList.add('create-section__status--completed');
            statusEl.classList.remove('create-section__status--incomplete');
            statusEl.innerHTML = '<svg class="icon" width="12" height="12" viewBox="0 0 16 16" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.7071 3.29289C15.0976 3.68342 15.0976 4.31658 14.7071 4.70711L6.20711 13.2071C5.81658 13.5976 5.18342 13.5976 4.79289 13.2071L1.29289 9.70711C0.902369 9.31658 0.902369 8.68342 1.29289 8.29289C1.68342 7.90237 2.31658 7.90237 2.70711 8.29289L5.5 11.0858L13.2929 3.29289C13.6834 2.90237 14.3166 2.90237 14.7071 3.29289Z" fill="currentColor"/></svg>';
          }
          if (badgeEl) {
            badgeEl.textContent = 'Completed';
            badgeEl.classList.remove('create-section__badge--action');
            badgeEl.classList.add('create-section__badge--completed');
          }
        } else {
          section.classList.add('create-section--incomplete');
          if (statusEl) {
            statusEl.classList.add('create-section__status--incomplete');
            statusEl.classList.remove('create-section__status--completed');
            const ringHtml = '<span class="create-section__status-ring" style="background: conic-gradient(var(--color-primary) 0deg 54deg, var(--color-border) 54deg 360deg);"></span>';
            statusEl.innerHTML = ringHtml;
          }
          if (badgeEl) {
            badgeEl.textContent = 'Action needed';
            badgeEl.classList.remove('create-section__badge--completed');
            badgeEl.classList.add('create-section__badge--action');
          }
        }
      });

      // Fade back in
      sectionsContainer.style.opacity = '1';

      // Store campaign data state (in a real app, this would load from backend)
      console.log(`Loaded data for Campaign ${campaignIndex}`);
    }, 200);
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

  // Create Preview Navigation
  const createPreviewNavBtn = document.getElementById('create-preview-nav-btn');
  const createPreviewView = document.getElementById('create-preview-view');
  const createPreviewCloseButtons = document.querySelectorAll('.create-preview-close');
  const createPreviewSelectBtn = document.getElementById('create-preview-select-option');

  // Show/hide create preview nav button based on template selection
  templateRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      const templateType = this.value;

      if (createPreviewNavBtn) {
        // Show create preview nav button for multiple campaign templates
        if (templateType === 'promotion' || templateType === 'action') {
          createPreviewNavBtn.style.display = 'flex';
        } else {
          createPreviewNavBtn.style.display = 'none';
        }
      }
    });
  });

  // Navigate to create preview view
  if (createPreviewNavBtn) {
    createPreviewNavBtn.addEventListener('click', function() {
      if (createPreviewView && templateSelectionView) {
        templateSelectionView.style.display = 'none';
        createPreviewView.style.display = 'flex';
      }
    });
  }

  // Close/Back from create preview view
  createPreviewCloseButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (createPreviewView && templateSelectionView) {
        createPreviewView.style.display = 'none';
        templateSelectionView.style.display = 'flex';
      }
    });
  });

  // Create Preview - Apply Design button
  if (createPreviewSelectBtn) {
    createPreviewSelectBtn.addEventListener('click', function() {
      // Store that user has approved the tabbed design
      localStorage.setItem('selectedCreateStructure', 'tabbed-campaigns');

      // Show confirmation
      alert('Tabbed campaign design applied. This structure will be used for the create view.');

      // Navigate back to template selection
      if (createPreviewView && templateSelectionView) {
        createPreviewView.style.display = 'none';
        templateSelectionView.style.display = 'flex';
      }
    });
  }

  // Summary View Handlers
  const summaryView = document.getElementById('summary-view');
  const summaryContinueBtn = document.getElementById('summary-continue-btn');
  const summaryModifyBtn = document.getElementById('summary-modify-btn');
  const summaryInputField = document.getElementById('summary-input-field');

  // Continue button - navigate to create view
  if (summaryContinueBtn) {
    summaryContinueBtn.addEventListener('click', function() {
      if (!summaryView || !createView) return;

      // Set up campaign tabs (will hide for single campaign)
      const config = JSON.parse(localStorage.getItem('campaignConfig') || '{}');
      setupCampaignTabs(config.type);

      // Update URL hash for direct access
      if (config.type && config.count) {
        window.location.hash = `create&type=${config.type}&count=${config.count}&campaign=1`;
      } else {
        window.location.hash = 'create';
      }

      // Hide progress bar and step text when navigating to create view
      const progressBarContainer = document.getElementById('progress-bar-container');
      const progressStepText = document.getElementById('progress-step-text');
      if (progressBarContainer) {
        progressBarContainer.style.display = 'none';
      }
      if (progressStepText) {
        progressStepText.style.display = 'none';
      }

      // Navigate to create view using the transition function from view-transition.js
      if (typeof window.transitionToCreateView === 'function') {
        window.transitionToCreateView(summaryView);
      } else {
        // Fallback if view-transition.js hasn't loaded
        summaryView.style.display = 'none';
        if (createView) {
          createView.style.display = 'flex';
        }
      }
    });
  }

  // Modify button - go back to template selection
  if (summaryModifyBtn) {
    summaryModifyBtn.addEventListener('click', function() {
      if (!summaryView || !templateSelectionView) return;

      // Update URL
      window.location.hash = 'select';

      // Fade out summary view
      summaryView.style.opacity = '0';
      summaryView.style.transition = 'opacity 0.3s ease-out';

      setTimeout(() => {
        summaryView.style.display = 'none';

        // Show template selection view
        templateSelectionView.style.display = 'flex';
        templateSelectionView.style.opacity = '0';

        setTimeout(() => {
          templateSelectionView.style.transition = 'opacity 0.4s ease-in';
          templateSelectionView.style.opacity = '1';
        }, 50);
      }, 300);
    });
  }

  // Auto-resize textarea
  if (summaryInputField) {
    summaryInputField.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
  }

  // Typing animation function
  function typeText(element, text, speed = 30) {
    if (!element) return Promise.resolve();

    element.textContent = '';
    element.classList.add('typing');

    return new Promise((resolve) => {
      let index = 0;

      function type() {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          setTimeout(type, speed);
        } else {
          element.classList.remove('typing');
          resolve();
        }
      }

      type();
    });
  }

  // Chat panel question buttons
  const chatLooksGoodBtn = document.getElementById('summary-chat-looks-good-btn');
  const chatModifyBtn = document.getElementById('summary-chat-modify-btn');

  if (chatLooksGoodBtn) {
    chatLooksGoodBtn.addEventListener('click', function() {
      // Hide only the button group, keep the dialog text visible
      const questionEl = document.getElementById('summary-chat-question');
      const actionsEl = questionEl ? questionEl.querySelector('.summary-chat-question__actions') : null;

      if (actionsEl) {
        actionsEl.style.display = 'none';
      }

      // Find the currently active step
      const activeCircle = document.querySelector('.summary-chat-step__circle--active');
      if (!activeCircle) return;

      const activeStep = activeCircle.closest('.summary-chat-step');
      const allSteps = document.querySelectorAll('.summary-chat-step');
      let currentStepIndex = -1;

      allSteps.forEach((step, index) => {
        if (step === activeStep) {
          currentStepIndex = index;
        }
      });

      if (currentStepIndex === -1) return;

      // Get current and next step elements
      const currentCircle = allSteps[currentStepIndex].querySelector('.summary-chat-step__circle');
      const currentLine = allSteps[currentStepIndex].querySelector('.summary-chat-step__line');
      const nextStep = allSteps[currentStepIndex + 1];
      const nextCircle = nextStep ? nextStep.querySelector('.summary-chat-step__circle') : null;

      // Mark current step as completed
      if (currentCircle) {
        currentCircle.classList.remove('summary-chat-step__circle--active');
        currentCircle.classList.add('summary-chat-step__circle--completed');
        currentCircle.textContent = String(currentStepIndex + 1);
      }

      // Fill the line to next step
      if (currentLine) {
        currentLine.classList.add('summary-chat-step__line--completed');
      }

      // Step titles for questions
      const stepTitles = ['Campaign info', 'Promotion', 'Placements', 'Targeting'];

      // Activate next step if it exists
      if (nextCircle && currentStepIndex < 3) {
        nextCircle.classList.add('summary-chat-step__circle--active');
        nextCircle.textContent = String(currentStepIndex + 2);

        // Remove disabled state from the next section in the left panel
        const nextSectionNumber = currentStepIndex + 2;
        const nextSection = document.querySelector(`.summary-section[data-section="${nextSectionNumber}"]`);
        if (nextSection) {
          nextSection.classList.remove('summary-section--disabled');
        }

        // Update question text with typing animation and show buttons again for next step
        setTimeout(() => {
          if (questionEl) {
            const questionText = questionEl.querySelector('.summary-chat-question__text');
            if (questionText) {
              const newQuestion = `Does the ${stepTitles[currentStepIndex + 1]} look good?`;
              typeText(questionText, newQuestion).then(() => {
                // Show buttons after typing completes
                if (actionsEl) {
                  actionsEl.style.display = 'flex';
                }
              });
            }
          }
        }, 300);
      } else {
        // All steps completed - hide the question dialog
        setTimeout(() => {
          if (questionEl) {
            questionEl.style.display = 'none';
          }
        }, 500);
      }
    });
  }

  if (chatModifyBtn) {
    chatModifyBtn.addEventListener('click', function() {
      // Go back to modify (template selection)
      if (summaryView && templateSelectionView) {
        window.location.hash = 'select';
        summaryView.style.display = 'none';
        templateSelectionView.style.display = 'flex';
      }
    });
  }
});
