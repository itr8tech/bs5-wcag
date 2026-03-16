## Description

<!-- Provide a brief description of your changes -->

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Accessibility improvement

## Accessibility Checklist

Please ensure your PR meets these accessibility requirements:

- [ ] Automated tests pass (Lighthouse CI + axe-core)
- [ ] All new colors meet WCAG AAA contrast ratio (7:1)
- [ ] Focus indicators are visible on all interactive elements
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Proper ARIA attributes are used
- [ ] Tested with screen reader (specify which: NVDA/JAWS/VoiceOver)
- [ ] Works with `prefers-reduced-motion`
- [ ] Touch targets meet 44x44px minimum
- [ ] Forms have proper labels and error messaging

## Testing

Describe how you tested your changes:

```bash
# Example:
npm run build
npm run test:a11y
# Manual keyboard testing
# Screen reader testing with [NVDA/JAWS/VoiceOver]
```

## Screenshots (if applicable)

<!-- Add screenshots showing before/after or new features -->

## Additional Context

<!-- Add any other context about the PR here -->

---

By submitting this PR, I confirm that:
- [ ] I have read and followed the [CONTRIBUTING.md](../CONTRIBUTING.md) guidelines
- [ ] I have tested these changes for accessibility
- [ ] I have updated documentation as needed
- [ ] All automated accessibility tests pass
