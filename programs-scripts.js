// Programs View JavaScript
// Handles tab switching and navigation

document.addEventListener('DOMContentLoaded', function() {
  // Tab switching
  const tabs = document.querySelectorAll('.programs-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('programs-tab--active'));
      // Add active class to clicked tab
      this.classList.add('programs-tab--active');

      // In a real application, this would filter the programs grid
      console.log('Tab clicked:', this.textContent);
    });
  });

  // Side navigation items
  const sidenavItems = document.querySelectorAll('.programs-sidenav__item');
  sidenavItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      // Remove active class from all items
      sidenavItems.forEach(i => i.classList.remove('programs-sidenav__item--active'));
      // Add active class to clicked item
      this.classList.add('programs-sidenav__item--active');

      // In a real application, this would navigate to different views
      console.log('Navigation clicked:', this.textContent);
    });
  });

  // View details buttons - now handled by anchor tags
  // No longer needed since buttons are now links

  // Create program button
  const createButton = document.querySelector('.btn-primary');
  if (createButton) {
    createButton.addEventListener('click', function() {
      window.location.href = 'campaign-builder.html';
    });
  }

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
      alert('AI Suggestion: ' + suggestionText + '\n\nThis would be sent to the AI chat interface.');
    });
  });
});
