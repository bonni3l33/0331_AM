// Custom Prism-style Dropdown Component
// Replaces native select elements with custom dropdown UI

document.addEventListener('DOMContentLoaded', function() {
  // Convert all select elements with class 'create-field__input' to custom dropdowns
  const selects = document.querySelectorAll('select.create-field__input');

  selects.forEach(select => {
    convertToCustomDropdown(select);
  });

  function convertToCustomDropdown(selectElement) {
    // Get the selected option
    const selectedOption = selectElement.options[selectElement.selectedIndex];

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-dropdown';

    // Create the trigger button
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'custom-dropdown__trigger';
    trigger.innerHTML = `
      <span class="custom-dropdown__value">${selectedOption.text}</span>
      <svg class="custom-dropdown__icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    // Create the dropdown menu
    const menu = document.createElement('div');
    menu.className = 'custom-dropdown__menu';

    // Add options to menu
    Array.from(selectElement.options).forEach((option, index) => {
      const menuItem = document.createElement('button');
      menuItem.type = 'button';
      menuItem.className = 'custom-dropdown__item';
      if (option.selected) {
        menuItem.classList.add('custom-dropdown__item--selected');
      }
      menuItem.textContent = option.text;
      menuItem.dataset.value = option.value;
      menuItem.dataset.index = index;

      menuItem.addEventListener('click', function(e) {
        e.stopPropagation();

        // Update the select element
        selectElement.selectedIndex = parseInt(this.dataset.index);
        selectElement.dispatchEvent(new Event('change'));

        // Update the trigger text
        trigger.querySelector('.custom-dropdown__value').textContent = this.textContent;

        // Update selected state
        menu.querySelectorAll('.custom-dropdown__item').forEach(item => {
          item.classList.remove('custom-dropdown__item--selected');
        });
        this.classList.add('custom-dropdown__item--selected');

        // Close menu
        wrapper.classList.remove('custom-dropdown--open');
      });

      menu.appendChild(menuItem);
    });

    // Toggle dropdown
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();

      // Close other dropdowns
      document.querySelectorAll('.custom-dropdown--open').forEach(dd => {
        if (dd !== wrapper) {
          dd.classList.remove('custom-dropdown--open');
        }
      });

      wrapper.classList.toggle('custom-dropdown--open');
    });

    // Assemble the dropdown
    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);

    // Hide the original select
    selectElement.style.display = 'none';

    // Insert the custom dropdown after the select
    selectElement.parentNode.insertBefore(wrapper, selectElement.nextSibling);
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', function() {
    document.querySelectorAll('.custom-dropdown--open').forEach(dropdown => {
      dropdown.classList.remove('custom-dropdown--open');
    });
  });

  // Close dropdowns on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.custom-dropdown--open').forEach(dropdown => {
        dropdown.classList.remove('custom-dropdown--open');
      });
    }
  });
});
