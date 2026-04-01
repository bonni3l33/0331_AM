// Campaign Edit Mode JavaScript
// Handles manual editing of campaign structure

(function() {
  const hierarchyDiagram = document.getElementById('hierarchy-diagram');
  const editBtn = document.getElementById('edit-campaign-btn');
  const saveBtn = document.getElementById('save-edit-btn');
  const cancelBtn = document.getElementById('cancel-edit-btn');

  if (!hierarchyDiagram) return;

  // Store original values for cancel functionality
  let originalValues = {};

  // ===== TOGGLE CHIP FUNCTIONALITY (for Channels only) =====
  function setupToggleChips() {
    const toggleChips = hierarchyDiagram.querySelectorAll('.toggle-chip');
    toggleChips.forEach(chip => {
      chip.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('toggle-chip--selected');
      });
    });
  }

  // ===== CAPTURE/RESTORE VALUES =====
  function captureOriginalValues() {
    originalValues = {};

    // Capture text inputs (promo and targeting)
    const textInputs = hierarchyDiagram.querySelectorAll('.campaign-input');
    textInputs.forEach(input => {
      const fieldName = input.getAttribute('data-field');
      if (fieldName) {
        originalValues[fieldName] = input.value;
      }
    });

    // Capture toggle chip states (channels only)
    const chipGroups = hierarchyDiagram.querySelectorAll('.toggle-chips-group');
    chipGroups.forEach(group => {
      const fieldName = group.getAttribute('data-field');
      if (fieldName) {
        const selectedChips = Array.from(group.querySelectorAll('.toggle-chip--selected'))
          .map(chip => chip.getAttribute('data-value'));
        originalValues[fieldName] = selectedChips;
      }
    });
  }

  function restoreOriginalValues() {
    // Restore text inputs
    const textInputs = hierarchyDiagram.querySelectorAll('.campaign-input');
    textInputs.forEach(input => {
      const fieldName = input.getAttribute('data-field');
      if (fieldName && originalValues[fieldName] !== undefined) {
        input.value = originalValues[fieldName];
      }
    });

    // Restore toggle chip states
    const chipGroups = hierarchyDiagram.querySelectorAll('.toggle-chips-group');
    chipGroups.forEach(group => {
      const fieldName = group.getAttribute('data-field');
      if (fieldName && originalValues[fieldName]) {
        const chips = group.querySelectorAll('.toggle-chip');
        chips.forEach(chip => {
          const value = chip.getAttribute('data-value');
          if (originalValues[fieldName].includes(value)) {
            chip.classList.add('toggle-chip--selected');
          } else {
            chip.classList.remove('toggle-chip--selected');
          }
        });
      }
    });
  }

  // ===== UPDATE VIEW MODE FROM EDIT VALUES =====
  function updateViewMode() {
    // Update parent promo
    updatePromoFromText('parent-promo-input', 'parent-promo-value', 'parent-promo-sub');

    // Update parent targeting
    updateTargetingFromText('parent-targeting-input', 'parent-targeting-pills');

    // Update parent channels
    updatePillsFromChips('parent-channels-chips', 'parent-channels-pills', 'placement-tag');

    // Update child 1
    updatePromoFromText('child1-promo-input', 'child1-promo');
    updateTargetingFromText('child1-targeting-input', 'child1-targeting-pill', true);
    updatePillsFromChips('child1-channels-chips', 'child1-channels-pills', 'placement-tag');

    // Update child 2
    updatePromoFromText('child2-promo-input', 'child2-promo');
    updateTargetingFromText('child2-targeting-input', 'child2-targeting-pills');
    updatePillsFromChips('child2-channels-chips', 'child2-channels-pills', 'placement-tag');
  }

  // Helper: Update promo display from text input
  function updatePromoFromText(inputField, valueField, subField) {
    const input = hierarchyDiagram.querySelector(`[data-field="${inputField}"]`);
    if (!input) return;

    const text = input.value.trim();
    const parts = text.split('·').map(s => s.trim());

    if (subField) {
      // Parent campaign - split into value and sub
      const valueEl = hierarchyDiagram.querySelector(`[data-field="${valueField}"]`);
      const subEl = hierarchyDiagram.querySelector(`[data-field="${subField}"]`);
      if (valueEl && parts.length > 0) valueEl.textContent = parts[0];
      if (subEl && parts.length > 1) subEl.textContent = parts.slice(1).join(' · ');
    } else {
      // Child campaign - single field
      const valueEl = hierarchyDiagram.querySelector(`[data-field="${valueField}"]`);
      if (valueEl) valueEl.textContent = text;
    }
  }

  // Helper: Update targeting display from text input
  function updateTargetingFromText(inputField, pillsField, isSinglePill = false) {
    const input = hierarchyDiagram.querySelector(`[data-field="${inputField}"]`);
    const pillsContainer = hierarchyDiagram.querySelector(`[data-field="${pillsField}"]`);

    if (!input || !pillsContainer) return;

    const text = input.value.trim();
    const items = text.split(',').map(s => s.trim()).filter(s => s);

    if (isSinglePill) {
      // Single pill (like child1)
      if (items.length > 0) {
        pillsContainer.textContent = items[0];
        pillsContainer.className = 'targeting-pill field-view-mode';
      }
    } else {
      // Multiple pills
      pillsContainer.innerHTML = '';
      items.forEach(item => {
        const pill = document.createElement('span');
        pill.className = 'targeting-pill';
        // Check if it's a market pill
        if (item.match(/^(NY|SF|LA|ny|sf|la)$/i)) {
          pill.classList.add('targeting-pill--market');
        }
        pill.textContent = item;
        pillsContainer.appendChild(pill);
      });
    }
  }

  // Helper: Update pills from toggle chips (for channels)
  function updatePillsFromChips(chipsField, pillsField, pillClass) {
    const chipsGroup = hierarchyDiagram.querySelector(`[data-field="${chipsField}"]`);
    const pillsContainer = hierarchyDiagram.querySelector(`[data-field="${pillsField}"]`);

    if (!chipsGroup || !pillsContainer) return;

    const selectedChips = Array.from(chipsGroup.querySelectorAll('.toggle-chip--selected'));

    pillsContainer.innerHTML = '';
    selectedChips.forEach(chip => {
      const pill = document.createElement('span');
      pill.className = pillClass;
      pill.textContent = chip.textContent;
      pillsContainer.appendChild(pill);
    });
  }

  // ===== EDIT MODE TOGGLE =====
  function enterEditMode() {
    captureOriginalValues();
    hierarchyDiagram.setAttribute('data-edit-mode', 'true');
  }

  function exitEditMode() {
    hierarchyDiagram.setAttribute('data-edit-mode', 'false');
  }

  function saveChanges() {
    updateViewMode();
    exitEditMode();
  }

  function cancelChanges() {
    restoreOriginalValues();
    exitEditMode();
  }

  // ===== EVENT LISTENERS =====
  if (editBtn) {
    editBtn.addEventListener('click', enterEditMode);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', cancelChanges);
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', saveChanges);
  }

  // ===== INITIALIZATION =====
  setupToggleChips();
  captureOriginalValues();
})();
