// Program Detail V2 JavaScript
// Handles tab switching and campaign expand/collapse

document.addEventListener('DOMContentLoaded', function() {

  // Tab Navigation
  const tabItems = document.querySelectorAll('.tab-nav__item');

  tabItems.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabItems.forEach(t => t.classList.remove('tab-nav__item--active'));

      // Add active class to clicked tab
      this.classList.add('tab-nav__item--active');

      console.log('Tab clicked:', this.textContent);
    });
  });

  // View toggle (Date/Relationship)
  const viewToggleButtons = document.querySelectorAll('.view-toggle__btn');

  viewToggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      viewToggleButtons.forEach(btn => btn.classList.remove('view-toggle__btn--active'));
      this.classList.add('view-toggle__btn--active');
      console.log('View toggle:', this.textContent);
    });
  });

  // Export Button
  const exportBtn = document.querySelector('.btn-outline');
  if (exportBtn && exportBtn.textContent.includes('Export')) {
    exportBtn.addEventListener('click', function() {
      console.log('Export program data');
      alert('Export functionality\n\nWould export:\n• Program summary\n• Sub-campaign details\n• Performance metrics\n• City-level breakdown');
    });
  }

  // Edit program button
  const editBtn = document.querySelector('.btn-primary');
  if (editBtn && editBtn.textContent.includes('Edit')) {
    editBtn.addEventListener('click', function() {
      console.log('Edit program');
      alert('Edit program functionality\n\nYou would be able to:\n• Modify discount percentages\n• Adjust target cities\n• Update date ranges\n• Configure channels');
    });
  }

  // Analyze buttons
  const analyzeButtons = document.querySelectorAll('.btn-secondary-small');
  analyzeButtons.forEach(button => {
    if (button.textContent.includes('Analyze')) {
      button.addEventListener('click', function() {
        const campaignCard = this.closest('.campaign-card');
        const titleEl = campaignCard.querySelector('.campaign-card__title h3');
        const campaignName = titleEl ? titleEl.textContent : 'Unknown';

        console.log('Analyze clicked for:', campaignName);
        alert(`Analyze Campaign\n\n${campaignName}\n\nWould open detailed analytics view with:\n• Performance trends\n• Conversion funnel\n• User segments\n• Geographic breakdown`);
      });
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + E to edit
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
      e.preventDefault();
      if (editBtn) editBtn.click();
    }

    // Ctrl/Cmd + 1-3 to switch tabs
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '3') {
      e.preventDefault();
      const index = parseInt(e.key) - 1;
      if (tabItems[index]) {
        tabItems[index].click();
      }
    }
  });

  // AI Chat Panel Toggle
  const aiChatButton = document.querySelector('[title="AI Chat"]');
  const aiChatPanel = document.getElementById('aiChatPanel');
  const closeAiPanel = document.getElementById('closeAiPanel');
  const appContainer = document.querySelector('.app-container');

  function toggleAiPanel() {
    aiChatPanel.classList.toggle('ai-chat-panel--open');
    appContainer.classList.toggle('app-container--ai-open');
  }

  if (aiChatButton) {
    aiChatButton.addEventListener('click', function(e) {
      e.preventDefault();
      toggleAiPanel();
    });
  }

  if (closeAiPanel) {
    closeAiPanel.addEventListener('click', function(e) {
      e.preventDefault();
      toggleAiPanel();
    });
  }

  // AI Suggestion Buttons
  const suggestionButtons = document.querySelectorAll('.ai-suggestion-btn');
  suggestionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const suggestionText = this.textContent.trim();
      console.log('AI Suggestion clicked:', suggestionText);

      // Open AI panel if not already open
      if (!aiChatPanel.classList.contains('ai-chat-panel--open')) {
        toggleAiPanel();
      }

      // In a real implementation, this would populate the AI chat input
      // For now, just log the suggestion
      alert('AI Suggestion: ' + suggestionText + '\n\nThis would be sent to the AI chat interface.');
    });
  });

});
