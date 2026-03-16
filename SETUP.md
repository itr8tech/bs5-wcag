# Setup Instructions

## Resolving NPM Cache Issues

If you encounter npm cache permission errors during installation:

### Option 1: Fix npm cache permissions (Recommended)
```bash
sudo chown -R $(whoami) ~/.npm
npm cache clean --force
npm install
```

### Option 2: Use a different cache directory
```bash
npm install --cache /tmp/npm-cache
```

### Option 3: Clear the cache and reinstall
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

## Building the Project

Once dependencies are installed:

```bash
# Build CSS and JavaScript
npm run build

# This will create:
# - dist/css/bs5-wcag.css
# - dist/css/bs5-wcag.min.css
# - dist/js/bs5-wcag.js
# - dist/js/bs5-wcag.min.js
```

## Development Workflow

```bash
# Watch for changes and rebuild automatically
npm run watch

# In another terminal, serve the examples
npm run serve
```

Then open http://localhost:3000/examples/index.html in your browser.

## Testing the Build

1. Open `examples/index.html` in a browser
2. Test keyboard navigation (Tab, Shift+Tab, Arrow keys, Escape)
3. Verify focus indicators are visible
4. Check color contrast with browser DevTools
5. Test with a screen reader
6. Verify responsive behavior

## Verifying WCAG Compliance

Use these tools to verify accessibility:
- Chrome/Edge: Lighthouse audit (DevTools > Lighthouse)
- Firefox: Accessibility Inspector
- WAVE browser extension
- axe DevTools extension

All components should achieve WCAG AAA compliance.
