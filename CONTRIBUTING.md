# Contributing to BS5-WCAG

Thank you for your interest in contributing to BS5-WCAG! This document provides guidelines for contributing to the project.

## Code of Conduct

Be respectful, inclusive, and considerate of others.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS information
   - Screenshots if applicable

### Suggesting Enhancements

1. Check if the enhancement has been suggested
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Proposed implementation (if applicable)

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/bs5-wcag.git
cd bs5-wcag

# Install dependencies
npm install

# Build the project
npm run build

# Watch for changes during development
npm run watch

# Serve examples locally
npm run serve
```

## Coding Standards

### Sass/CSS
- Use 2 spaces for indentation
- Follow Bootstrap's naming conventions
- Add comments for complex logic
- Ensure all colors meet WCAG AAA standards (7:1 ratio)
- Test with multiple browsers

### JavaScript
- Use ES6+ features
- Add JSDoc comments for functions
- Follow existing code style
- Ensure keyboard accessibility
- Test with screen readers

## Testing Checklist

Before submitting a PR, verify:

### Automated Tests
- [ ] Run `./scripts/test-accessibility.sh` and ensure all tests pass
- [ ] Lighthouse CI accessibility score is 95% or higher
- [ ] axe-core reports zero violations
- [ ] GitHub Actions pass on your PR

### Manual Testing
- [ ] All colors meet WCAG AAA contrast ratio (7:1)
- [ ] Focus indicators are visible and consistent
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] ARIA attributes are correct
- [ ] Screen reader announcements work
- [ ] Works with reduced motion preference
- [ ] Responsive across viewport sizes
- [ ] Cross-browser compatible
- [ ] No console errors
- [ ] Documentation updated if needed

See [TESTING.md](TESTING.md) for detailed testing instructions.

## Accessibility Testing Tools

- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)
- Screen readers (NVDA, JAWS, VoiceOver)

## Questions?

Feel free to open an issue for any questions or clarifications.
