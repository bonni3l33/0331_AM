// Section Toggle Functionality
// Makes all sections expandable/collapsable by clicking the header

document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.create-section');

  sections.forEach(section => {
    const header = section.querySelector('.create-section__header');
    const content = section.querySelector('.create-section__content');
    const toggleBtn = section.querySelector('.create-section__toggle');

    if (!header || !content) return;

    // Make entire header clickable
    header.style.cursor = 'pointer';

    // Handle header click
    header.addEventListener('click', function() {
      toggleSection(section, content, toggleBtn);
    });
  });

  function toggleSection(section, content, toggleBtn) {
    const isCollapsed = section.classList.contains('create-section--collapsed');

    if (isCollapsed) {
      // Expand
      section.classList.remove('create-section--collapsed');
      content.style.display = 'block';
    } else {
      // Collapse
      section.classList.add('create-section--collapsed');
      content.style.display = 'none';
    }
  }
});
