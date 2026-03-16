# WCAG AAA Compliance Statement

## Overview

BS5-WCAG is designed to bring Bootstrap 5.3+ components into compliance with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AAA.

**Last Updated:** March 2026
**WCAG Version:** 2.1
**Conformance Level:** AAA (Target)

## Automated Testing

### Continuous Integration

Every code change is automatically tested using:

| Tool | Purpose | Threshold |
|------|---------|-----------|
| **Lighthouse CI** | Comprehensive accessibility audit | 100% accessibility score |
| **axe-core** | WCAG 2.1 A/AA/AAA violation detection | 0 violations |

**Test Frequency:**
- Every push to main branch
- Every pull request
- Before every release

### Test Results

View the latest test results:
- [GitHub Actions - Accessibility Audit](https://github.com/itr8tech/bs5-wcag/actions/workflows/accessibility-audit.yml)
- Lighthouse reports are available as CI artifacts
- axe results are posted as PR comments

## WCAG 2.1 Level AAA Success Criteria

### Perceivable

| Criterion | Level | Status | Implementation |
|-----------|-------|--------|----------------|
| 1.4.6 Contrast (Enhanced) | AAA | ✅ Pass | All text meets 7:1 ratio. See `_colors.scss` |
| 1.4.7 Low or No Background Audio | AAA | N/A | No audio content |
| 1.4.8 Visual Presentation | AAA | ✅ Pass | Line height 1.6+, adjustable spacing. See `_typography.scss` |
| 1.4.9 Images of Text (No Exception) | AAA | ✅ Pass | All text is actual text, not images |

### Operable

| Criterion | Level | Status | Implementation |
|-----------|-------|--------|----------------|
| 2.1.1 Keyboard | A | ✅ Pass | All components keyboard accessible. See `bs5-wcag.js` |
| 2.1.3 Keyboard (No Exception) | AAA | ✅ Pass | No keyboard traps, all functions available |
| 2.2.3 No Timing | AAA | ✅ Pass | No time limits on interactions |
| 2.2.4 Interruptions | AAA | ✅ Pass | No automatic interruptions |
| 2.2.5 Re-authenticating | AAA | N/A | No authentication in components |
| 2.3.2 Three Flashes | AAA | ✅ Pass | No flashing content |
| 2.4.7 Focus Visible | AA | ✅ Pass | 3px focus indicators. See `_focus.scss` |
| 2.4.8 Location | AAA | ✅ Pass | Breadcrumbs, landmarks, skip links |
| 2.4.9 Link Purpose (Link Only) | AAA | ⚠️ Partial | Examples use descriptive text. Implementation-dependent |
| 2.4.10 Section Headings | AAA | ✅ Pass | Proper heading hierarchy in examples |
| 2.4.11 Focus Appearance | AAA | ✅ Pass | High contrast 3px outlines, 2px offset |
| 2.5.5 Target Size | AAA | ✅ Pass | Minimum 44x44px touch targets. See `_variables.scss` |
| 2.5.6 Concurrent Input Mechanisms | AAA | ✅ Pass | Works with touch, mouse, keyboard |

### Understandable

| Criterion | Level | Status | Implementation |
|-----------|-------|--------|----------------|
| 3.1.3 Unusual Words | AAA | N/A | No unusual terminology |
| 3.1.4 Abbreviations | AAA | ⚠️ Partial | Implementation-dependent |
| 3.1.5 Reading Level | AAA | ⚠️ Partial | Implementation-dependent |
| 3.1.6 Pronunciation | AAA | N/A | No pronunciation requirements |
| 3.2.5 Change on Request | AAA | ✅ Pass | No automatic context changes |
| 3.3.1 Error Identification | A | ✅ Pass | Clear error messages. See `_forms.scss` |
| 3.3.2 Labels or Instructions | A | ✅ Pass | All inputs labeled. See `_forms.scss` |
| 3.3.3 Error Suggestion | AA | ✅ Pass | Specific error guidance provided |
| 3.3.4 Error Prevention (Legal, Financial, Data) | AA | N/A | No legal/financial transactions |
| 3.3.5 Help | AAA | ⚠️ Partial | Form help text provided. Context-dependent |
| 3.3.6 Error Prevention (All) | AAA | ⚠️ Partial | Implementation-dependent |

### Robust

| Criterion | Level | Status | Implementation |
|-----------|-------|--------|----------------|
| 4.1.2 Name, Role, Value | A | ✅ Pass | Complete ARIA implementation. See `bs5-wcag.js` |
| 4.1.3 Status Messages | AA | ✅ Pass | Live regions for dynamic content |

## Known Limitations

### Implementation-Dependent Criteria

Some WCAG AAA criteria depend on how you use BS5-WCAG:

- **Link Purpose (2.4.9)**: Use descriptive link text
- **Reading Level (3.1.5)**: Write clear content
- **Help (3.3.5)**: Provide contextual help where needed
- **Error Prevention (3.3.6)**: Implement confirmation steps

### Content Requirements

BS5-WCAG provides the framework. You must:

1. **Alt text**: Add to all images
2. **Labels**: Associate with all form controls
3. **Heading structure**: Use logical hierarchy
4. **Link text**: Make descriptive and unique
5. **Language**: Set `lang` attribute correctly
6. **Page titles**: Provide descriptive titles

## Testing Evidence

### Lighthouse CI Results

Target scores (all categories):
- **Accessibility:** ≥95/100
- **Best Practices:** ≥90/100

### axe-core Results

- **Critical violations:** 0
- **Serious violations:** 0
- **Moderate violations:** 0
- **Minor violations:** 0

## Manual Testing

Automated tools catch ~30-40% of issues. Manual testing includes:

✅ **Screen Reader Testing:**
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS)

✅ **Keyboard Navigation:**
- All interactive elements reachable
- Logical tab order
- Visible focus indicators
- No keyboard traps

✅ **Browser Testing:**
- Chrome, Firefox, Safari, Edge
- Desktop and mobile viewports
- Touch and mouse interactions

## Accessibility Statement

We are committed to ensuring digital accessibility for all users. BS5-WCAG aims to conform to WCAG 2.1 Level AAA.

### Feedback

If you discover an accessibility barrier:
1. [Open an accessibility issue](https://github.com/itr8tech/bs5-wcag/issues/new?template=accessibility_issue.md)
2. Include WCAG criterion violated
3. Provide steps to reproduce
4. Suggest a solution if possible

### Continuous Improvement

We continuously monitor and improve accessibility through:
- Automated CI testing
- Regular manual audits
- User feedback
- WCAG guideline updates
- New assistive technology testing

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Testing Guide](TESTING.md)
- [Contributing Guide](CONTRIBUTING.md)

## Disclaimer

While BS5-WCAG strives for WCAG AAA compliance, final conformance depends on implementation. Use automated tools, manual testing, and user feedback to verify accessibility in your specific context.

---

**Maintained by:** BS5-WCAG Contributors
**Support:** [GitHub Issues](https://github.com/itr8tech/bs5-wcag/issues)
