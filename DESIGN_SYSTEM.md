# Prism Design System Guide

**CRITICAL REQUIREMENT**: All UI components MUST use the DoorDash Prism design system.

## Form Components

### Form Field
```html
<div class="form-field">
  <label class="form-field__label">Field Label</label>
  <input type="text" class="form-field__input" placeholder="Enter value" />
</div>
```

**Styles:**
- Label: 14px, 600 weight, #111318, -0.01px letter-spacing
- Input: 40px height, 8px border-radius, 1px solid #d3d6d9
- Focus: 2px solid rgba(25, 25, 25, 0.66)

---

### Checkbox (Prism)
```html
<label class="promo-checkbox-item">
  <input type="checkbox" class="prism-checkbox">
  <span>Checkbox Label</span>
</label>
```

**Styles:**
- Size: 18px × 18px
- Border: 2px solid #111318, 4px border-radius
- Checked: Background #111318 with white checkmark SVG
- Hover: Background #f6f7f8

---

### Radio Button
```html
<label class="promo-radio-option">
  <input type="radio" name="group" class="promo-radio">
  <span class="promo-radio-text">Radio Label</span>
</label>
```

**Styles:**
- Size: 20px × 20px, circular
- Border: 2px solid #d0d0d0
- Checked: Inset shadow creating filled center dot
- Hover: Border #111318

---

### Input with Prefix/Suffix
```html
<!-- With Prefix ($) -->
<div class="input-with-prefix">
  <span class="input-prefix">$</span>
  <input type="number" class="form-field__input input-with-prefix-field" value="12.00">
</div>

<!-- With Suffix (%) -->
<div class="input-with-suffix">
  <input type="number" class="form-field__input" value="40">
  <span class="input-suffix">%</span>
</div>
```

**Styles:**
- Prefix/Suffix: 14px, 400 weight, #51545d
- Input padding-left: 28px (with prefix)

---

## Buttons

### Primary Button
```html
<button class="btn btn--primary">Primary Action</button>
```

**Styles:**
- Background: #00855f
- Color: white
- Height: 40px
- Border-radius: 8px
- Font: 14px, 700 weight

### Secondary Button
```html
<button class="btn btn--secondary">Secondary Action</button>
```

**Styles:**
- Background: white
- Color: #111318
- Border: 1px solid #d3d6d9
- Height: 40px

---

## Layout

### Two-Column Field Row
```html
<div class="promo-field-row">
  <div class="form-field">...</div>
  <div class="form-field">...</div>
</div>
```

**Styles:**
- Grid: 1fr 1fr
- Gap: 20px

---

## Color Palette

### Text
- Primary: `#111318`
- Subdued: `#51545d`

### Borders
- Default: `#d3d6d9`
- Focus: `rgba(25, 25, 25, 0.66)`
- Active: `#111318`

### Backgrounds
- White: `#ffffff`
- Hover: `#f6f7f8`
- Selected: `#111318`

### Buttons
- Primary: `#00855f`
- Primary Hover: `#006d4a`

---

## Typography

### Font Family
```css
font-family: var(--font-primary, Arial, sans-serif);
```

### Font Weights
- Regular: 400
- Medium: 600
- Bold: 700

### Font Sizes
- Label: 14px
- Input: 14px
- Small: 12px

### Letter Spacing
- Default: -0.01px

---

## Reference Files

### Source Files
- `/bonnie-prototype/create-program.html` - Complete form examples
- `/bonnie-prototype/create-program-styles.css` - Full Prism styles

### Implementation Files
- `programs-styles.css` (lines 892-1105) - Prism components
- `styles.css` (lines 1-28) - Design system documentation header

### Documentation
For React implementation, reference `@doordash/prism-react` components.

---

## Usage Examples

### Complete Promotion Form
```html
<div class="promo-form-container">
  <!-- Discount Type Radio -->
  <div class="form-field">
    <label class="form-field__label">Discount Type</label>
    <div class="promo-radio-group">
      <label class="promo-radio-option">
        <input type="radio" name="type" class="promo-radio">
        <span class="promo-radio-text">Flat Amount Off</span>
      </label>
      <label class="promo-radio-option">
        <input type="radio" name="type" class="promo-radio" checked>
        <span class="promo-radio-text">Percentage Discount</span>
      </label>
    </div>
  </div>

  <!-- Two-Column Inputs -->
  <div class="promo-field-row">
    <div class="form-field">
      <label class="form-field__label">Percentage</label>
      <div class="input-with-suffix">
        <input type="number" class="form-field__input" value="40">
        <span class="input-suffix">%</span>
      </div>
    </div>
    <div class="form-field">
      <label class="form-field__label">Max Amount</label>
      <div class="input-with-prefix">
        <span class="input-prefix">$</span>
        <input type="number" class="form-field__input input-with-prefix-field" value="12">
      </div>
    </div>
  </div>

  <!-- Checkboxes -->
  <div class="form-field">
    <label class="form-field__label">Incentives</label>
    <div class="promo-checkbox-list">
      <label class="promo-checkbox-item">
        <input type="checkbox" class="prism-checkbox" checked>
        <span>Cash Discount</span>
      </label>
      <label class="promo-checkbox-item">
        <input type="checkbox" class="prism-checkbox">
        <span>Free Delivery</span>
      </label>
    </div>
  </div>
</div>
```

---

**Last Updated**: March 31, 2026
**Maintained by**: DoorDash Marketing Platform Team
