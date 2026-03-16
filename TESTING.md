# Accessibility Testing Guide

This project uses automated accessibility testing to ensure WCAG AAA compliance.

## CI/CD Testing

Every push and pull request automatically runs accessibility audits using:

- **Lighthouse CI**: Google's automated tool for web quality audits
- **axe-core**: Deque's accessibility testing engine

### Test Configuration

**Lighthouse** (`lighthouserc.json`):
- Runs 3 times per URL for consistency
- Requires 100% accessibility score (perfect score)
- Tests all WCAG 2.1 Level A, AA, and AAA criteria
- Validates ARIA attributes, color contrast, semantic HTML, and more

**axe-core** (via Puppeteer):
- Tests against WCAG 2.0 Level A, AA, and AAA tags
- Uses Puppeteer (bundled Chrome) - no ChromeDriver version issues
- Fails CI if any violations are found
- Provides detailed violation reports with element selectors

### Viewing Results

**In GitHub Actions:**
1. Go to the Actions tab in your repository
2. Click on the latest workflow run
3. View the accessibility test results in the logs
4. Download artifacts for detailed reports

**In Pull Requests:**
- Automated comments show axe-core results
- Check/X marks indicate pass/fail status

## Local Testing

### Prerequisites

```bash
npm install
npm run build
```

### Run All Accessibility Tests

```bash
# Start local server (in one terminal)
npm run start:server

# Run tests (in another terminal)
npm run test:a11y
```

### Run Individual Tests

**Lighthouse:**
```bash
# Start server first
npm run start:server

# In another terminal
npm run test:lighthouse
```

Results will be in `.lighthouseci/` directory.

**axe-core:**
```bash
# Start server first
npm run start:server

# In another terminal
npm run test:axe
```

### Manual Browser Testing

**Chrome DevTools Lighthouse:**
1. Open `docs/index.html` in Chrome
2. Open DevTools (F12)
3. Go to Lighthouse tab
4. Select "Accessibility" category
5. Click "Generate report"

**Browser Extensions:**
- [axe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
- [WAVE](https://wave.webaim.org/extension/)
- [Accessibility Insights](https://accessibilityinsights.io/)

## Screen Reader Testing

Automated tools catch ~30-40% of accessibility issues. Manual testing is essential.

### Recommended Screen Readers

**Windows:**
- NVDA (free): https://www.nvaccess.org/
- JAWS (commercial): https://www.freedomscientific.com/products/software/jaws/

**macOS:**
- VoiceOver (built-in): Cmd+F5

**Linux:**
- Orca (free): https://help.gnome.org/users/orca/stable/

### Testing Checklist

- [ ] All interactive elements are reachable by keyboard
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] All content is announced by screen reader
- [ ] Form labels and errors are announced
- [ ] Modal focus is trapped
- [ ] ARIA live regions announce dynamic changes
- [ ] Skip links work correctly

## Keyboard Testing

Test with keyboard only (no mouse):

**Essential Keys:**
- `Tab` - Move to next focusable element
- `Shift+Tab` - Move to previous focusable element
- `Enter` - Activate buttons/links
- `Space` - Activate buttons/checkboxes
- `Arrow keys` - Navigate within components (dropdowns, tabs)
- `Escape` - Close modals/dropdowns
- `Home/End` - Jump to first/last in lists

**Test Scenarios:**
1. Navigate entire page using only Tab
2. Open and close all modals
3. Navigate through all dropdown menus
4. Fill out and submit forms
5. Use accordion components
6. Navigate through pagination

## Color Contrast Testing

**Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)
- Chrome DevTools (inspect element → see contrast ratio)

**Requirements:**
- WCAG AAA Normal Text: 7:1 ratio
- WCAG AAA Large Text (18pt+): 4.5:1 ratio

## Common Issues to Check

### Automated Tests Miss These:

- [ ] Misleading link text ("click here", "read more")
- [ ] Images of text (should be actual text)
- [ ] Time limits without extensions
- [ ] Auto-playing media
- [ ] Keyboard traps
- [ ] Confusing navigation
- [ ] Poor heading structure
- [ ] Missing landmarks
- [ ] Ambiguous error messages
- [ ] Complex forms without guidance

## Continuous Monitoring

### GitHub Actions Status Badge

Add to README.md:
```markdown
![Accessibility Tests](https://github.com/itr8tech/bs5-wcag/workflows/Accessibility%20Audit/badge.svg)
```

### Regular Audits

Run accessibility tests:
- Before every commit (using git hooks)
- On every pull request (automatic)
- Before releases (manual verification)
- Monthly comprehensive manual testing

## Resources

**WCAG Guidelines:**
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [How to Meet WCAG](https://www.w3.org/WAI/WCAG21/quickref/)

**Testing Tools:**
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe-core](https://github.com/dequelabs/axe-core)
- [Pa11y](https://pa11y.org/)

**Learning:**
- [WebAIM Articles](https://webaim.org/articles/)
- [A11y Project](https://www.a11yproject.com/)
- [Deque University](https://dequeuniversity.com/)

## Troubleshooting

### Tests Fail Locally

1. Ensure server is running on port 8080
2. Clear browser cache
3. Rebuild project: `npm run build`
4. Check console for errors

### False Positives

If you believe a violation is a false positive:
1. Document the reasoning
2. Test with multiple tools
3. Verify with manual testing
4. Consider excluding specific rules (with caution)

### Performance Issues

Lighthouse runs 3 times by default. To speed up:
```json
// lighthouserc.json
"numberOfRuns": 1
```

## Contact

For accessibility questions or issues, please open a GitHub issue.
