// URL-based View Router
// Use #start or #create in the URL to preview different states

(function() {
  const startState = document.getElementById('start-state');
  const createView = document.getElementById('create-view');
  const chatPanel = document.getElementById('chat-panel');
  const chatScrim = document.getElementById('chat-scrim');

  function showView(viewName) {
    if (viewName === 'create') {
      // Show create view
      if (startState) {
        startState.style.display = 'none';
      }
      if (createView) {
        createView.style.display = 'flex';
        createView.style.opacity = '1';

        // Only animate progress bar if not already transitioning
        if (!window.isTransitioning) {
          const progressFill = createView.querySelector('.create-progress__fill');
          if (progressFill) {
            progressFill.style.width = '0%';

            // Trigger animation after a brief delay
            setTimeout(() => {
              progressFill.style.width = '43%';
            }, 100);
          }
        }
      }
      if (chatPanel) {
        chatPanel.classList.add('chat-panel--open');
        chatPanel.setAttribute('aria-hidden', 'false');
      }
      if (chatScrim) {
        chatScrim.setAttribute('aria-hidden', 'false');
        chatScrim.style.opacity = '1';
        chatScrim.style.pointerEvents = 'auto';
      }
    } else {
      // Show start state (default)
      if (startState) {
        startState.style.display = 'flex';
        startState.style.opacity = '1';
      }
      if (createView) {
        createView.style.display = 'none';
      }
      if (chatPanel) {
        chatPanel.classList.remove('chat-panel--open');
        chatPanel.setAttribute('aria-hidden', 'true');
      }
      if (chatScrim) {
        chatScrim.setAttribute('aria-hidden', 'true');
        chatScrim.style.opacity = '0';
        chatScrim.style.pointerEvents = 'none';
      }
    }
  }

  // Handle hash changes
  function handleHashChange() {
    const hash = window.location.hash.slice(1); // Remove the '#'
    // Extract view name before any parameters (e.g., "create&figmacapture=..." becomes "create")
    const viewName = hash.split('&')[0] || 'start';
    showView(viewName);
  }

  // Listen for hash changes
  window.addEventListener('hashchange', handleHashChange);

  // Handle initial page load
  document.addEventListener('DOMContentLoaded', handleHashChange);
})();
