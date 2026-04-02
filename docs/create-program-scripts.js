// Create Program Flow JavaScript
// Handles stepper navigation and brief upload

document.addEventListener('DOMContentLoaded', function() {
  // Progress bar step navigation
  const progressSteps = document.querySelectorAll('.progress-bar-step');
  progressSteps.forEach((step, index) => {
    step.addEventListener('click', function(e) {
      e.preventDefault();
      const stepNum = index + 1;

      // Only allow navigation to step 1 or already completed steps
      if (stepNum === 1) {
        goToStep(1);
        showStep1();
      }
    });
  });

  // File upload button for brief
  const uploadBriefBtn = document.getElementById('upload-brief-button');
  const briefFileInput = document.getElementById('brief-file-upload');

  if (uploadBriefBtn && briefFileInput) {
    uploadBriefBtn.addEventListener('click', function() {
      briefFileInput.click();
    });

    briefFileInput.addEventListener('change', function(e) {
      if (e.target.files.length > 0) {
        const fileName = e.target.files[0].name;
        console.log('Brief file selected:', fileName);
        // In a real implementation, this would process the file
        uploadBriefBtn.innerHTML = `
          <svg class="icon" width="20" height="20"><use href="#icon-check"/></svg>
          ${fileName}
        `;
      }
    });
  }

  // Goal selection radio buttons with inline config
  const goalRadios = document.querySelectorAll('input[name="goal"]');
  const goalConfigSection = document.getElementById('goal-config-section');
  const configPromotion = document.getElementById('config-promotion');
  const configAction = document.getElementById('config-action');

  goalRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      const goalType = this.value;

      // Show/hide inline configuration based on selection
      if (goalType === 'promotion') {
        // Show inline config for Multiple Promotion Campaigns
        if (goalConfigSection && configPromotion && configAction) {
          goalConfigSection.style.display = 'block';
          configPromotion.style.display = 'flex';
          configAction.style.display = 'none';

          // Gentle scroll to show config
          setTimeout(() => {
            goalConfigSection.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
          }, 150);
        }
      } else if (goalType === 'action') {
        // Show inline config for Multiple Action-Based Campaigns
        if (goalConfigSection && configPromotion && configAction) {
          goalConfigSection.style.display = 'block';
          configPromotion.style.display = 'none';
          configAction.style.display = 'flex';

          // Gentle scroll to show config
          setTimeout(() => {
            goalConfigSection.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
          }, 150);
        }
      } else {
        // Hide config for other campaigns
        if (goalConfigSection) {
          goalConfigSection.style.display = 'none';
        }
      }
    });
  });

  // Continue/Next button handler
  const continueToStep2Btn = document.getElementById('continue-to-step2');
  const mainContent = document.getElementById('main-content');

  if (continueToStep2Btn && mainContent) {
    continueToStep2Btn.addEventListener('click', function() {
      // Check which step we're on
      const currentStep = mainContent.getAttribute('data-step');
      const isStep1 = currentStep === '1';

      if (isStep1) {
        // Step 1 validation
        const selectedGoal = document.querySelector('input[name="goal"]:checked');

        if (!selectedGoal) {
          alert('Please select a campaign goal');
          return;
        }

        console.log('Selected goal:', selectedGoal.value);

        // Check if parent-child structure is selected
        let isParentChild = false;
        let campaignCount = 1; // Default to 1

        if (selectedGoal.value === 'promotion') {
          const structureRadio = document.querySelector('input[name="campaign-structure"]:checked');
          if (structureRadio && structureRadio.value === 'parent-child') {
            isParentChild = true;
          }
          const countInput = document.getElementById('campaign-count');
          if (countInput) {
            campaignCount = parseInt(countInput.value) || 1;
          }
        } else if (selectedGoal.value === 'action') {
          const journeyRadio = document.querySelector('input[name="journey-type"]:checked');
          if (journeyRadio && journeyRadio.value === 'parent-child') {
            isParentChild = true;
          }
          const countInput = document.getElementById('action-steps-count');
          if (countInput) {
            campaignCount = parseInt(countInput.value) || 1;
          }
        }

        // Store campaign count in sessionStorage
        sessionStorage.setItem('campaignCount', campaignCount);

        // Navigate to appropriate page
        if (isParentChild) {
          // Go to confirmation page for parent-child structure
          window.location.href = 'confirm-campaign-structure.html';
        } else {
          // Go directly to segmentation page for other structures
          window.location.href = 'campaigns-segmentation-inline.html';
        }
      } else {
        // Step 2 - final continue
        const selectedTemplate = document.querySelector('input[name="template"]:checked');
        if (selectedTemplate) {
          console.log('Template selected:', selectedTemplate.value);
          // In a real implementation, this would submit the form
          alert('Program created successfully!');
        }
      }
    });
  }

  // Back to Step 1 button
  const backToStep1Btn = document.getElementById('back-to-step1');
  if (backToStep1Btn) {
    backToStep1Btn.addEventListener('click', function() {
      goToStep(1);
      showStep1();
    });
  }

  // Helper functions
  function showStep1() {
    const mainContent = document.getElementById('main-content');
    const backBtn = document.getElementById('back-to-step1');
    const continueBtn = document.getElementById('continue-to-step2');

    if (mainContent) mainContent.setAttribute('data-step', '1');
    if (backBtn) backBtn.style.display = 'none';
    if (continueBtn) continueBtn.textContent = 'Next';
  }

  function showStep2() {
    const mainContent = document.getElementById('main-content');
    const backBtn = document.getElementById('back-to-step1');
    const continueBtn = document.getElementById('continue-to-step2');

    if (mainContent) mainContent.setAttribute('data-step', '2');
    if (backBtn) backBtn.style.display = 'block';
    if (continueBtn) continueBtn.textContent = 'Continue';
  }

  // Progress bar navigation
  function goToStep(stepNumber) {
    console.log('Navigating to step:', stepNumber);

    // Update progress bar visual state
    const progressSteps = document.querySelectorAll('.progress-bar-step');
    const progressText = document.getElementById('progress-bar-text');

    progressSteps.forEach((step, index) => {
      const stepNum = index + 1;
      step.classList.remove('progress-bar-step--active', 'progress-bar-step--completed', 'progress-bar-step--disabled');

      if (stepNum < stepNumber) {
        step.classList.add('progress-bar-step--completed');
      } else if (stepNum === stepNumber) {
        step.classList.add('progress-bar-step--active');
      } else {
        step.classList.add('progress-bar-step--disabled');
      }
    });

    // Update progress text
    if (progressText) {
      progressText.textContent = `Step ${stepNumber} of 2`;
    }
  }

  // Make goToStep available globally for future use
  window.goToStep = goToStep;

  // ==========================================
  // Step 2: Segmentation Interface
  // ==========================================

  let segmentIdCounter = 2; // Start from 2 since we have segment 1 by default

  // Add new segment
  const addSegmentBtn = document.getElementById('add-segment-btn');
  const segmentTableBody = document.getElementById('segmentation-table-body');

  if (addSegmentBtn && segmentTableBody) {
    addSegmentBtn.addEventListener('click', function() {
      const newSegmentId = segmentIdCounter++;
      const newRow = createSegmentRow(newSegmentId);
      segmentTableBody.insertAdjacentHTML('beforeend', newRow);
    });
  }

  // Delete segment
  document.addEventListener('click', function(e) {
    if (e.target.closest('.icon-btn--delete')) {
      const row = e.target.closest('.segmentation-table__row');
      if (row) {
        // Check if it's the last row
        const allRows = document.querySelectorAll('.segmentation-table__row');
        if (allRows.length > 1) {
          row.remove();
        } else {
          alert('You must have at least one segment');
        }
      }
    }
  });

  // Helper function to create a new segment row
  function createSegmentRow(id) {
    const variantName = `#${id}`;
    const promotionChecked = id === 1 ? 'checked' : '';

    return `
      <div class="segmentation-table__row" data-segment-id="${id}">
        <div class="segmentation-table__cell segmentation-table__cell--variant">
          <span class="variant-label">${variantName}</span>
        </div>
        <div class="segmentation-table__cell segmentation-table__cell--name">
          <input type="text" class="segment-name-input" placeholder="Campaign ${id}" value="" />
        </div>
        <div class="segmentation-table__cell segmentation-table__cell--segid">
          <input type="text" class="segment-segid-input" placeholder="Enter segmentation ID" />
        </div>
        <div class="segmentation-table__cell segmentation-table__cell--channels">
          <div class="channel-checkboxes">
            <label class="channel-checkbox">
              <input type="checkbox" name="channel-${id}-promotion" ${promotionChecked} />
              <span>Promotion</span>
            </label>
            <label class="channel-checkbox">
              <input type="checkbox" name="channel-${id}-inapp" />
              <span>In-app placement</span>
            </label>
            <label class="channel-checkbox">
              <input type="checkbox" name="channel-${id}-crm" />
              <span>Off-channel CRM</span>
            </label>
          </div>
        </div>
        <div class="segmentation-table__cell segmentation-table__cell--delete">
          <button class="icon-btn icon-btn--delete" title="Delete">
            <svg class="icon" width="16" height="16"><use href="#icon-trash"/></svg>
          </button>
        </div>
      </div>
    `;
  }
});
