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
});
