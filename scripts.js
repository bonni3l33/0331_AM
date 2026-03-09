// Campaign Manager - Clean Scripts
// Minimal functionality for view interactions

document.addEventListener('DOMContentLoaded', function() {
  // Chat panel controls
  const chatPanel = document.getElementById('chat-panel');
  const chatScrim = document.getElementById('chat-scrim');
  // Close button removed to match summary view
  // const chatClose = document.getElementById('chat-close');

  // Close chat panel - DISABLED (matching summary view, panel is always open)
  // if (chatClose) {
  //   chatClose.addEventListener('click', function() {
  //     if (chatPanel) {
  //       chatPanel.classList.remove('chat-panel--open');
  //       chatPanel.setAttribute('aria-hidden', 'true');
  //     }
  //     if (chatScrim) {
  //       chatScrim.setAttribute('aria-hidden', 'true');
  //       chatScrim.style.opacity = '0';
  //       chatScrim.style.pointerEvents = 'none';
  //     }
  //   });
  // }

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

          // Enable scrolling for expanded content
          if (templateSelectionView) {
            templateSelectionView.classList.add('template-selection-view--scrollable');
          }

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

          // Enable scrolling for expanded content
          if (templateSelectionView) {
            templateSelectionView.classList.add('template-selection-view--scrollable');
          }

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
        // Disable scrolling for single campaign
        if (templateSelectionView) {
          templateSelectionView.classList.remove('template-selection-view--scrollable');
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
      promotionEl.innerHTML = `
        <ul>
          <li>Promo Type: Phased multi-order discounts (habit restoration)</li>
          <li>Structure: 25% off 3 → 35% off 3 → 40% off 2</li>
        </ul>
      `;

      // Placements
      placementsEl.innerHTML = `
        <span class="summary-tag">Email</span>
        <span class="summary-tag">Push</span>
        <span class="summary-tag">Homepage Banner</span>
        <span class="summary-tag">USI</span>
      `;

      // Targeting
      targetingEl.innerHTML = `
        <ul>
          <li>No order within defined dormant window (e.g., past X days since last order)</li>
          <li>Not yet classified as "Churned" (longer inactivity threshold)</li>
        </ul>
      `;

    } else if (config.type === 'action') {
      // Campaign Type
      campaignTypeEl.textContent = `Multiple Action-Based Campaign (${config.steps || 4} phases)`;

      // Promotion
      promotionEl.innerHTML = '30% off with $12 min subtotal, max $10 discount per order<br>Auto-applied at checkout, valid for 30 days from signup';

      // Placements
      placementsEl.innerHTML = `
        <span class="summary-tag">Email</span>
        <span class="summary-tag">Push</span>
        <span class="summary-tag">SMS</span>
        <span class="summary-tag">Homepage Banner</span>
        <span class="summary-tag">Store Page Banner</span>
        <span class="summary-tag">Spotlight Banner</span>
        <span class="summary-tag">Immersive Header</span>
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
        <span class="summary-tag">Email</span>
        <span class="summary-tag">Push</span>
        <span class="summary-tag">SMS</span>
        <span class="summary-tag">Homepage Banner</span>
        <span class="summary-tag">Spotlight Banner</span>
      `;

      // Targeting
      targetingEl.textContent = 'Non-purchasers within 45 days of signup, excluding fraud and SUMA customers';
    }
  }

  // Expose generateSummaryText globally for router access
  window.generateSummaryText = generateSummaryText;

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
  // Shared function to progress to next step
  function progressToNextStep(currentQuestionEl) {
    // Find the currently active step FIRST
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

    // Update left section number badge to checkmark IMMEDIATELY
    const currentSectionNumber = currentStepIndex + 1;
    const currentSection = document.querySelector(`.summary-section[data-section="${currentSectionNumber}"]`);
    if (currentSection) {
      const numberBadge = currentSection.querySelector('.summary-section__number');
      if (numberBadge) {
        numberBadge.classList.add('summary-section__number--confirmed');
        numberBadge.textContent = ''; // Clear number text immediately
      }

      // Show Edit button for confirmed section
      const editBtn = currentSection.querySelector('.summary-section__edit-btn');
      if (editBtn) {
        editBtn.style.display = 'block';
      }
    }

    // Hide the current question bubble
    if (currentQuestionEl) {
      currentQuestionEl.style.display = 'none';
    }

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

      // Show loading dots first, then question after delay
      setTimeout(() => {
        const chatConversation = document.querySelector('.summary-chat-conversation');
        if (chatConversation) {
          // Create and show loading dots
          const loadingEl = document.createElement('div');
          loadingEl.className = 'summary-chat-loading';
          loadingEl.innerHTML = `
            <div class="summary-chat-loading__dot"></div>
            <div class="summary-chat-loading__dot"></div>
            <div class="summary-chat-loading__dot"></div>
          `;
          chatConversation.appendChild(loadingEl);

          // Scroll to bottom to show loading
          const chatPanel = document.querySelector('.summary-chat-panel__content');
          if (chatPanel) {
            chatPanel.scrollTop = chatPanel.scrollHeight;
          }

          // After loading animation, replace with actual question
          setTimeout(() => {
            // Remove loading dots
            loadingEl.remove();

            // Hide all previous question bubbles
            const allQuestions = chatConversation.querySelectorAll('.summary-chat-question');
            allQuestions.forEach(q => q.style.display = 'none');

            // Create and show question
            const newQuestionEl = document.createElement('div');
            newQuestionEl.className = 'summary-chat-question';
            const newQuestion = `Does the ${stepTitles[currentStepIndex + 1]} look good?`;
            newQuestionEl.innerHTML = `
              <div class="summary-chat-question__text">${newQuestion}</div>
              <div class="summary-chat-question__actions">
                <button class="btn btn--sm btn--tertiary summary-chat-modify-btn-dynamic">Modify</button>
                <button class="btn btn--sm btn--tertiary summary-chat-looks-good-btn-dynamic">Looks good</button>
              </div>
            `;
            chatConversation.appendChild(newQuestionEl);

            // Scroll to bottom again
            if (chatPanel) {
              chatPanel.scrollTop = chatPanel.scrollHeight;
            }

            const questionText = newQuestionEl.querySelector('.summary-chat-question__text');
            const actionsEl = newQuestionEl.querySelector('.summary-chat-question__actions');

          // Attach event listeners to the new buttons
          const modifyBtn = newQuestionEl.querySelector('.summary-chat-modify-btn-dynamic');
          const looksGoodBtn = newQuestionEl.querySelector('.summary-chat-looks-good-btn-dynamic');

          if (looksGoodBtn) {
            looksGoodBtn.addEventListener('click', function() {
              progressToNextStep(newQuestionEl);
            });
          }

          if (modifyBtn) {
            modifyBtn.addEventListener('click', function() {
              // Hide the action buttons
              if (actionsEl) {
                actionsEl.style.display = 'none';
              }

              // The section to edit corresponds to currentStepIndex + 2
              const sectionNumber = currentStepIndex + 2;
              const section = document.querySelector(`.summary-section[data-section="${sectionNumber}"]`);

              if (section) {
                // Remove disabled state
                section.classList.remove('summary-section--disabled');

                // Find and click the Edit button
                const editBtn = section.querySelector('.summary-section__edit-btn');
                if (editBtn) {
                  editBtn.click();
                }
              }
            });
          }
          }, 800); // Delay after loading dots before showing question
        }
      }, 300); // Initial delay before showing loading dots
    } else {
      // All steps completed - show the action buttons
      setTimeout(() => {
        const summaryActions = document.getElementById('summary-actions');
        if (summaryActions) {
          summaryActions.style.display = 'flex';

          // Auto scroll left section to bring buttons into view
          setTimeout(() => {
            const summaryContainer = document.querySelector('.summary-container');
            if (summaryContainer) {
              const actionsTop = summaryActions.offsetTop;
              const containerHeight = summaryContainer.clientHeight;
              const scrollTarget = actionsTop - containerHeight + summaryActions.offsetHeight + 100;

              summaryContainer.scrollTo({
                top: scrollTarget,
                behavior: 'smooth'
              });
            }
          }, 100);
        }
      }, 300);
    }
  }

  // Chat panel question buttons
  const chatLooksGoodBtn = document.getElementById('summary-chat-looks-good-btn');
  const chatModifyBtn = document.getElementById('summary-chat-modify-btn');

  if (chatLooksGoodBtn) {
    chatLooksGoodBtn.addEventListener('click', function() {
      const questionEl = document.getElementById('summary-chat-question');
      progressToNextStep(questionEl);
    });
  }

  if (chatModifyBtn) {
    chatModifyBtn.addEventListener('click', function() {
      // Hide the action buttons
      const questionEl = document.getElementById('summary-chat-question');
      const actionsEl = questionEl ? questionEl.querySelector('.summary-chat-question__actions') : null;
      if (actionsEl) {
        actionsEl.style.display = 'none';
      }

      // Check which step we're on
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

      // Map step index to section number (0->1, 1->2, 2->3, 3->4)
      const sectionNumber = currentStepIndex + 1;
      const section = document.querySelector(`.summary-section[data-section="${sectionNumber}"]`);

      if (section) {
        // Remove disabled state
        section.classList.remove('summary-section--disabled');

        // Find and click the Edit button
        const editBtn = section.querySelector('.summary-section__edit-btn');
        if (editBtn) {
          editBtn.click();
        }
      }
    });
  }

  // Handle chat input submit
  const chatInputField = document.querySelector('.summary-chat-input__field');
  const chatInputSubmit = document.querySelector('.summary-chat-input__submit');

  if (chatInputSubmit && chatInputField) {
    chatInputSubmit.addEventListener('click', function() {
      handleChatInputSubmit();
    });

    chatInputField.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleChatInputSubmit();
      }
    });
  }

  function handleChatInputSubmit() {
    const chatInputField = document.querySelector('.summary-chat-input__field');
    const chatConversation = document.querySelector('.summary-chat-conversation');

    if (!chatInputField || !chatConversation) return;

    const userMessage = chatInputField.value.trim();
    if (!userMessage) return;

    // Add user message bubble
    const userMessageEl = document.createElement('div');
    userMessageEl.className = 'summary-chat-message summary-chat-message--user';
    userMessageEl.innerHTML = `
      <div class="summary-chat-message__bubble">${userMessage}</div>
    `;
    chatConversation.appendChild(userMessageEl);

    // Clear input
    chatInputField.value = '';

    // Check if user wants to add USI
    if (userMessage.toLowerCase().includes('add usi') || userMessage.toLowerCase().includes('usi')) {
      // Add USI to placements
      const placementsField = document.getElementById('summary-placements');
      if (placementsField) {
        const usiTag = document.createElement('span');
        usiTag.className = 'summary-tag';
        usiTag.textContent = 'USI';
        placementsField.appendChild(usiTag);
      }

      // Show loading dots first, then AI response
      setTimeout(() => {
        // Create and show loading dots
        const loadingEl = document.createElement('div');
        loadingEl.className = 'summary-chat-loading';
        loadingEl.innerHTML = `
          <div class="summary-chat-loading__dot"></div>
          <div class="summary-chat-loading__dot"></div>
          <div class="summary-chat-loading__dot"></div>
        `;
        chatConversation.appendChild(loadingEl);

        // Scroll to bottom to show loading
        const chatPanel = document.querySelector('.summary-chat-panel__content');
        if (chatPanel) {
          chatPanel.scrollTop = chatPanel.scrollHeight;
        }

        // After loading animation, replace with actual question
        setTimeout(() => {
          // Remove loading dots
          loadingEl.remove();

          // Create and show question
          const aiResponseEl = document.createElement('div');
          aiResponseEl.className = 'summary-chat-question';
          aiResponseEl.innerHTML = `
            <div class="summary-chat-question__text">Does the Placements look good?</div>
            <div class="summary-chat-question__actions">
              <button class="btn btn--sm btn--tertiary summary-chat-modify-btn-dynamic">Modify</button>
              <button class="btn btn--sm btn--tertiary summary-chat-looks-good-btn-dynamic">Looks good</button>
            </div>
          `;
          chatConversation.appendChild(aiResponseEl);

          // Scroll to bottom again
          if (chatPanel) {
            chatPanel.scrollTop = chatPanel.scrollHeight;
          }

          // Attach event listeners to the new buttons
          const modifyBtn = aiResponseEl.querySelector('.summary-chat-modify-btn-dynamic');
          const looksGoodBtn = aiResponseEl.querySelector('.summary-chat-looks-good-btn-dynamic');

          if (looksGoodBtn) {
            looksGoodBtn.addEventListener('click', function() {
              // Continue with progression logic - will hide the question bubble
              progressToNextStep(aiResponseEl);
            });
          }

          if (modifyBtn) {
            modifyBtn.addEventListener('click', function() {
              // Hide the action buttons
              const actionsEl = aiResponseEl.querySelector('.summary-chat-question__actions');
              if (actionsEl) {
                actionsEl.style.display = 'none';
              }

              // This is for Placements (section 3)
              const sectionNumber = 3;
              const section = document.querySelector(`.summary-section[data-section="${sectionNumber}"]`);

              if (section) {
                // Remove disabled state
                section.classList.remove('summary-section--disabled');

                // Find and click the Edit button
                const editBtn = section.querySelector('.summary-section__edit-btn');
                if (editBtn) {
                  editBtn.click();
                }
              }
            });
          }
        }, 800); // Delay after loading dots before showing question
      }, 300); // Initial delay before showing loading dots
    }
  }

  // Summary action buttons
  const summaryConfirmBtn = document.getElementById('summary-confirm-btn');
  if (summaryConfirmBtn) {
    summaryConfirmBtn.addEventListener('click', function() {
      // Get campaign configuration
      const config = JSON.parse(localStorage.getItem('campaignConfig') || '{}');

      // Navigate to create view with campaign parameters for multiple campaigns
      if (config.type === 'promotion' && config.count) {
        window.location.hash = `create&type=${config.type}&count=${config.count}`;
      } else if (config.type === 'action' && config.steps) {
        window.location.hash = `create&type=${config.type}&count=${config.steps}`;
      } else {
        // Single campaign or no config
        window.location.hash = 'create';
      }
    });
  }

  // Handle Edit/Save buttons for confirmed sections
  document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('summary-section__edit-btn')) {
      const editBtn = e.target;
      const section = editBtn.closest('.summary-section');

      if (!section) return;

      const textFields = section.querySelectorAll('.summary-field:not(.summary-field--tags)');
      const tagsField = section.querySelector('.summary-field--tags');
      const isEditing = editBtn.textContent === 'Edit';

      if (isEditing) {
        // Switch to edit mode
        editBtn.textContent = 'Save';

        // Handle text fields
        textFields.forEach(field => {
          field.setAttribute('contenteditable', 'true');
        });
        if (textFields.length > 0) {
          textFields[0].focus();
        }

        // Handle tags field
        if (tagsField) {
          tagsField.classList.add('editing');

          // Add remove buttons to existing tags
          const tags = tagsField.querySelectorAll('.summary-tag');
          tags.forEach(tag => {
            if (!tag.querySelector('.summary-tag__remove')) {
              const removeBtn = document.createElement('span');
              removeBtn.className = 'summary-tag__remove';
              removeBtn.textContent = '×';
              removeBtn.addEventListener('click', function() {
                tag.remove();
              });
              tag.appendChild(removeBtn);
            }
          });

          // Add input field for new tags
          if (!tagsField.querySelector('.summary-tag-input')) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'summary-tag-input';
            input.addEventListener('keypress', function(e) {
              if (e.key === 'Enter' && input.value.trim()) {
                const newTag = document.createElement('span');
                newTag.className = 'summary-tag';
                newTag.textContent = input.value.trim();

                const removeBtn = document.createElement('span');
                removeBtn.className = 'summary-tag__remove';
                removeBtn.textContent = '×';
                removeBtn.addEventListener('click', function() {
                  newTag.remove();
                });
                newTag.appendChild(removeBtn);

                tagsField.insertBefore(newTag, input);
                input.value = '';
              }
            });
            tagsField.appendChild(input);

            // Focus the input
            setTimeout(() => input.focus(), 0);
          }
        }
      } else {
        // Switch to view mode (save)
        editBtn.textContent = 'Edit';

        // Handle text fields
        textFields.forEach(field => {
          field.setAttribute('contenteditable', 'false');
          field.blur();
        });

        // Handle tags field
        if (tagsField) {
          tagsField.classList.remove('editing');

          // Convert any text in input to a tag before removing
          const input = tagsField.querySelector('.summary-tag-input');
          if (input && input.value.trim()) {
            const newTag = document.createElement('span');
            newTag.className = 'summary-tag';
            newTag.textContent = input.value.trim();
            tagsField.insertBefore(newTag, input);
          }

          // Remove X buttons from tags
          const removeBtns = tagsField.querySelectorAll('.summary-tag__remove');
          removeBtns.forEach(btn => btn.remove());

          // Remove input field
          if (input) {
            input.remove();
          }
        }

        // Mark section as confirmed with checkmark
        const sectionNumber = section.querySelector('.summary-section__number');
        if (sectionNumber) {
          sectionNumber.classList.add('summary-section__number--confirmed');
        }

        // Progress to next step in AI panel
        const currentSectionNumber = parseInt(section.getAttribute('data-section'));
        const nextSectionNumber = currentSectionNumber + 1;

        // Only show next question if there's a next section (1-4)
        if (nextSectionNumber <= 4) {
          // Show loading dots first, then question
          const chatConversation = document.querySelector('.summary-chat-conversation');
          const chatPanel = document.querySelector('.summary-chat-panel__content');

          if (chatConversation) {
            setTimeout(() => {
              // Create and show loading dots
              const loadingEl = document.createElement('div');
              loadingEl.className = 'summary-chat-loading';
              loadingEl.innerHTML = `
                <div class="summary-chat-loading__dot"></div>
                <div class="summary-chat-loading__dot"></div>
                <div class="summary-chat-loading__dot"></div>
              `;
              chatConversation.appendChild(loadingEl);

              // Scroll to bottom to show loading
              if (chatPanel) {
                chatPanel.scrollTop = chatPanel.scrollHeight;
              }

              // After loading animation, replace with actual question
              setTimeout(() => {
                // Remove loading dots
                loadingEl.remove();

                // Hide all previous question bubbles
                const allQuestions = chatConversation.querySelectorAll('.summary-chat-question');
                allQuestions.forEach(q => q.style.display = 'none');

                // Step titles mapping
                const stepTitles = ['Campaign info', 'Promotion', 'Placements', 'Targeting'];
                const nextStepTitle = stepTitles[nextSectionNumber - 1];

                // Create and show question
                const newQuestionEl = document.createElement('div');
                newQuestionEl.className = 'summary-chat-question';
                newQuestionEl.innerHTML = `
                  <div class="summary-chat-question__text">Does the ${nextStepTitle} look good?</div>
                  <div class="summary-chat-question__actions">
                    <button class="btn btn--sm btn--tertiary summary-chat-modify-btn-dynamic">Modify</button>
                    <button class="btn btn--sm btn--tertiary summary-chat-looks-good-btn-dynamic">Looks good</button>
                  </div>
                `;
                chatConversation.appendChild(newQuestionEl);

                // Scroll to bottom again
                if (chatPanel) {
                  chatPanel.scrollTop = chatPanel.scrollHeight;
                }

                // Enable the next section
                const nextSection = document.querySelector(`.summary-section[data-section="${nextSectionNumber}"]`);
                if (nextSection) {
                  nextSection.classList.remove('summary-section--disabled');
                }

                // Attach event listeners to the new buttons
                const modifyBtn = newQuestionEl.querySelector('.summary-chat-modify-btn-dynamic');
                const looksGoodBtn = newQuestionEl.querySelector('.summary-chat-looks-good-btn-dynamic');

                if (looksGoodBtn) {
                  looksGoodBtn.addEventListener('click', function() {
                    progressToNextStep(newQuestionEl);
                  });
                }

                if (modifyBtn) {
                  modifyBtn.addEventListener('click', function() {
                    // Hide the action buttons
                    const actionsEl = newQuestionEl.querySelector('.summary-chat-question__actions');
                    if (actionsEl) {
                      actionsEl.style.display = 'none';
                    }

                    // Enable editing for the next section
                    if (nextSection) {
                      nextSection.classList.remove('summary-section--disabled');
                      const editBtn = nextSection.querySelector('.summary-section__edit-btn');
                      if (editBtn) {
                        editBtn.click();
                      }
                    }
                  });
                }
              }, 800); // Delay after loading dots before showing question
            }, 300); // Initial delay before showing loading dots
          }
        } else {
          // All sections completed - show final action buttons
          setTimeout(() => {
            const summaryActions = document.getElementById('summary-actions');
            if (summaryActions) {
              summaryActions.style.display = 'flex';
            }
          }, 500);
        }
      }
    }
  });

  // Create section Confirm/Edit button interaction
  document.addEventListener('click', function(e) {
    // Handle Confirm button click
    if (e.target && e.target.classList.contains('create-section__confirm-btn')) {
      e.preventDefault();
      e.stopPropagation();

      const section = e.target.closest('.create-section');
      if (section) {
        const confirmBtn = section.querySelector('.create-section__confirm-btn');
        const editBtn = section.querySelector('.create-section__edit-btn');
        const statusBadge = section.querySelector('.create-section__status');

        // Change number badge to checkmark and remove active state
        if (statusBadge) {
          statusBadge.classList.remove('create-section__status--active');
          statusBadge.classList.add('create-section__status--confirmed');
          statusBadge.textContent = '';
        }

        // Disable all form inputs in this section
        const inputs = section.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          input.disabled = true;
          input.setAttribute('disabled', 'disabled');

          // Also disable custom dropdowns
          const customDropdown = input.nextElementSibling;
          if (customDropdown && customDropdown.classList.contains('custom-dropdown')) {
            customDropdown.classList.add('custom-dropdown--disabled');
            customDropdown.style.pointerEvents = 'none';
            customDropdown.style.opacity = '1';
          }
        });

        if (confirmBtn && editBtn) {
          confirmBtn.style.display = 'none';
          editBtn.style.display = 'block';
        }

        // Auto scroll to next section and make it active
        const nextSection = section.nextElementSibling;
        if (nextSection && nextSection.classList.contains('create-section')) {
          const nextStatusBadge = nextSection.querySelector('.create-section__status');
          if (nextStatusBadge && !nextStatusBadge.classList.contains('create-section__status--confirmed')) {
            nextStatusBadge.classList.remove('create-section__status--incomplete');
            nextStatusBadge.classList.add('create-section__status--active');
          }

          setTimeout(() => {
            nextSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 300);
        }
      }
    }

    // Handle Edit button click
    if (e.target && e.target.classList.contains('create-section__edit-btn')) {
      e.preventDefault();
      e.stopPropagation();

      const section = e.target.closest('.create-section');
      if (section) {
        const confirmBtn = section.querySelector('.create-section__confirm-btn');
        const editBtn = section.querySelector('.create-section__edit-btn');
        const statusBadge = section.querySelector('.create-section__status');

        // Change checkmark back to number badge and make it active
        if (statusBadge && statusBadge.classList.contains('create-section__status--confirmed')) {
          statusBadge.classList.remove('create-section__status--confirmed');
          statusBadge.classList.add('create-section__status--active');
          // Get the section number from the section ID
          const sectionId = section.getAttribute('id');
          let sectionNumber = '';
          if (sectionId === 'section-campaign-info') sectionNumber = '1';
          else if (sectionId === 'section-targeting') sectionNumber = '2';
          else if (sectionId === 'section-experiment') sectionNumber = '3';
          else if (sectionId === 'section-channel') sectionNumber = '4';
          else if (sectionId === 'section-promotion') sectionNumber = '5';
          else if (sectionId === 'section-placement') sectionNumber = '6';
          else if (sectionId === 'section-content') sectionNumber = '7';
          statusBadge.textContent = sectionNumber;
        }

        // Enable all form inputs in this section
        const inputs = section.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          input.disabled = false;
          input.removeAttribute('disabled');

          // Also enable custom dropdowns
          const customDropdown = input.nextElementSibling;
          if (customDropdown && customDropdown.classList.contains('custom-dropdown')) {
            customDropdown.classList.remove('custom-dropdown--disabled');
            customDropdown.style.pointerEvents = 'auto';
          }
        });

        if (confirmBtn && editBtn) {
          confirmBtn.style.display = 'block';
          editBtn.style.display = 'none';
        }
      }
    }
  });
});
