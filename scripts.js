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

  // Drag and drop for placement cards
  function initPlacementDragDrop() {
    const placementLists = document.querySelectorAll('.placement-list');

    placementLists.forEach(list => {
      let draggedElement = null;

      const items = list.querySelectorAll('.placement-item');

      items.forEach(item => {
        // Make the entire card draggable when clicking the drag handle
        const dragHandle = item.querySelector('.placement-item__drag');

        if (dragHandle) {
          dragHandle.addEventListener('mousedown', function() {
            item.setAttribute('draggable', 'true');
          });

          item.addEventListener('dragstart', function(e) {
            draggedElement = this;
            this.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
          });

          item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
            this.setAttribute('draggable', 'false');
          });

          item.addEventListener('dragover', function(e) {
            e.preventDefault();

            if (draggedElement !== this) {
              const bounding = this.getBoundingClientRect();
              const offset = e.clientY - bounding.top;

              if (offset > bounding.height / 2) {
                this.parentNode.insertBefore(draggedElement, this.nextSibling);
              } else {
                this.parentNode.insertBefore(draggedElement, this);
              }
            }
          });
        }
      });
    });
  }

  // Initialize drag and drop after DOM is loaded
  initPlacementDragDrop();

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
});
