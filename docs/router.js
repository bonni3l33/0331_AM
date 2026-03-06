// URL-based View Router
// Use #start, #select, or #create in the URL to preview different states

(function() {
  const startState = document.getElementById('start-state');
  const loadingState = document.getElementById('loading-state');
  const templateSelectionView = document.getElementById('template-selection-view');
  const summaryView = document.getElementById('summary-view');
  const createView = document.getElementById('create-view');
  const chatPanel = document.getElementById('chat-panel');
  const chatScrim = document.getElementById('chat-scrim');

  function showView(viewName, params) {
    if (viewName === 'create') {
      // Show create view
      if (startState) {
        startState.style.display = 'none';
      }
      if (loadingState) {
        loadingState.style.display = 'none';
      }
      if (templateSelectionView) {
        templateSelectionView.style.display = 'none';
      }
      if (createView) {
        createView.style.display = 'flex';
        createView.style.opacity = '1';

        // Setup campaign tabs from URL parameters
        if (params.type && params.count) {
          const config = {
            type: params.type,
            count: params.count
          };
          localStorage.setItem('campaignConfig', JSON.stringify(config));

          // Setup campaign tabs if function is available
          if (typeof window.setupCampaignTabsFromRouter === 'function') {
            window.setupCampaignTabsFromRouter(params.type);
          }

          // Switch to specific campaign if specified
          if (params.campaign) {
            setTimeout(() => {
              const campaignIndex = params.campaign;
              localStorage.setItem('currentCampaignIndex', campaignIndex);

              // Update active tab
              const tabs = document.querySelectorAll('.campaign-tab');
              tabs.forEach(tab => {
                if (tab.getAttribute('data-campaign-index') === campaignIndex) {
                  tabs.forEach(t => t.classList.remove('campaign-tab--active'));
                  tab.classList.add('campaign-tab--active');
                }
              });

              // Refresh sections if function is available
              if (typeof window.refreshCampaignSectionsFromRouter === 'function') {
                window.refreshCampaignSectionsFromRouter(campaignIndex);
              }
            }, 100);
          }
        }

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
    } else if (viewName === 'select') {
      // Show template selection view
      if (startState) {
        startState.style.display = 'none';
      }
      if (loadingState) {
        loadingState.style.display = 'none';
      }
      if (templateSelectionView) {
        templateSelectionView.style.display = 'flex';
      }
      if (summaryView) {
        summaryView.style.display = 'none';
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
    } else if (viewName === 'summary') {
      // Show summary view
      if (startState) {
        startState.style.display = 'none';
      }
      if (loadingState) {
        loadingState.style.display = 'none';
      }
      if (templateSelectionView) {
        templateSelectionView.style.display = 'none';
      }
      if (summaryView) {
        summaryView.style.display = 'flex';
        summaryView.style.opacity = '1';
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
    } else {
      // Show start state (default)
      if (startState) {
        startState.style.display = 'flex';
        startState.style.opacity = '1';
      }
      // Hide other views
      if (loadingState) {
        loadingState.style.display = 'none';
      }
      if (templateSelectionView) {
        templateSelectionView.style.display = 'none';
      }
      if (summaryView) {
        summaryView.style.display = 'none';
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

  // Parse URL parameters
  function parseHashParams(hash) {
    const params = {};
    const parts = hash.split('&');

    for (let i = 1; i < parts.length; i++) {
      const [key, value] = parts[i].split('=');
      if (key && value) {
        params[key] = decodeURIComponent(value);
      }
    }

    return params;
  }

  // Handle hash changes
  function handleHashChange() {
    const hash = window.location.hash.slice(1); // Remove the '#'
    // Extract view name before any parameters (e.g., "create&figmacapture=..." becomes "create")
    const viewName = hash.split('&')[0] || 'start';
    const params = parseHashParams(hash);

    // Handle routing for start, select, summary, and create views
    if (viewName === 'start' || viewName === 'select' || viewName === 'summary' || viewName === 'create') {
      showView(viewName, params);
    }
  }

  // Listen for hash changes
  window.addEventListener('hashchange', handleHashChange);

  // Handle initial page load - only for explicit hashes
  document.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.slice(1);
    if (hash === 'select' || hash === 'summary' || hash === 'create') {
      handleHashChange();
    }
  });
})();
