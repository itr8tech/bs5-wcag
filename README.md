# BS5-WCAG

A drop-in upgrade to make Bootstrap 5.3+ WCAG AAA compliant

## Overview

BS5-WCAG is a CSS and JavaScript enhancement library that extends Bootstrap 5.3+ to meet WCAG AAA accessibility standards. Simply include the files after Bootstrap to automatically upgrade your site's accessibility.

## Features

### Color Contrast (WCAG 1.4.6)
- All text colors meet AAA contrast ratio of 7:1
- Enhanced contextual colors (primary, secondary, success, danger, etc.)
- Accessible alert, badge, and button color combinations

### Focus Indicators (WCAG 2.4.7, 2.4.11)
- Highly visible 3px focus outlines
- Enhanced focus states for all interactive elements
- Consistent focus styling across all components

### Typography (WCAG 1.4.8, 1.4.12)
- Improved line height (1.6) for better readability
- Enhanced letter spacing and word spacing
- Links underlined by default for non-color identification
- Responsive text that supports 200% zoom

### Forms (WCAG 3.3.1, 3.3.2)
- Clear, visible labels with required field indicators
- Enhanced error messaging with icons and text
- Minimum 44x44px touch targets for all inputs
- High contrast borders (2-3px) for visibility

### Keyboard Navigation (WCAG 2.1.1)
- Full keyboard support for all components
- Arrow key navigation in dropdowns
- Tab trapping in modals and offcanvas
- Enhanced focus management

### ARIA Support (WCAG 4.1.2)
- Automatic ARIA attribute enhancement
- Proper roles for all components
- Live regions for dynamic content
- Screen reader announcements

## Installation

### NPM (Coming Soon)
```bash
npm install bs5-wcag
```

### Manual Installation
1. Download the latest release
2. Include the CSS and JS files after Bootstrap:

```html
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- BS5-WCAG CSS -->
<link href="path/to/bs5-wcag.css" rel="stylesheet">

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- BS5-WCAG JS -->
<script src="path/to/bs5-wcag.js"></script>
```

## Usage

No configuration required! Simply include the files and all Bootstrap components will be automatically enhanced.

### Optional: Skip Link
Add a skip link to your page for keyboard users:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

Then add `id="main-content"` to your main content area:

```html
<main id="main-content" role="main">
  <!-- Your content -->
</main>
```

### Optional: Programmatic Announcements
Use the BS5WCAG JavaScript API to announce messages to screen readers:

```javascript
// Polite announcement
BS5WCAG.announce('Form submitted successfully');

// Assertive announcement
BS5WCAG.announce('Error: Please fix the issues', 'assertive');
```

## Customization

### Using Sass Variables
Import the source Sass files and override variables before compilation:

```scss
// Override WCAG variables
$focus-ring-color: #ff6600;
$min-touch-target-size: 48px;

// Import BS5-WCAG
@import "node_modules/bs5-wcag/scss/bs5-wcag";
```

### Available Variables
```scss
// Focus
$focus-ring-width: 3px;
$focus-ring-color: #0066cc;
$focus-ring-offset: 2px;

// Typography
$line-height-base: 1.6;
$letter-spacing-base: 0.01em;

// Touch targets
$min-touch-target-size: 44px;

// Links
$link-decoration: underline;
```

## Development

### Prerequisites
- Node.js 14+
- npm or yarn

### Build from Source
```bash
# Install dependencies
npm install

# Build CSS and JavaScript
npm run build

# Watch for changes
npm run watch

# Serve examples
npm run serve
```

### Project Structure
```
bs5-wcag/
├── scss/
│   ├── _partials/
│   │   ├── _variables.scss
│   │   ├── _functions.scss
│   │   ├── _colors.scss
│   │   ├── _focus.scss
│   │   ├── _typography.scss
│   │   ├── _forms.scss
│   │   ├── _buttons.scss
│   │   ├── _navigation.scss
│   │   ├── _components.scss
│   │   └── _utilities.scss
│   ├── mixins/
│   │   └── _mixins.scss
│   └── bs5-wcag.scss
├── js/
│   └── bs5-wcag.js
├── dist/
│   ├── css/
│   │   ├── bs5-wcag.css
│   │   └── bs5-wcag.min.css
│   └── js/
│       ├── bs5-wcag.js
│       └── bs5-wcag.min.js
└── examples/
    └── index.html
```

## WCAG AAA Compliance Checklist

- [x] 1.4.6 Contrast (Enhanced) - 7:1 contrast ratio
- [x] 1.4.8 Visual Presentation - Line height, spacing, text sizing
- [x] 1.4.12 Text Spacing - User can adjust spacing
- [x] 2.1.1 Keyboard - Full keyboard access
- [x] 2.4.7 Focus Visible - Enhanced focus indicators
- [x] 2.4.11 Focus Appearance - Highly visible focus
- [x] 3.3.1 Error Identification - Clear error messages
- [x] 3.3.2 Labels or Instructions - Proper form labels
- [x] 4.1.2 Name, Role, Value - ARIA attributes

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Credits

Built with:
- [Bootstrap 5.3](https://getbootstrap.com/)
- [Sass](https://sass-lang.com/)
- [Terser](https://terser.org/)

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Bootstrap Accessibility](https://getbootstrap.com/docs/5.3/getting-started/accessibility/)

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
