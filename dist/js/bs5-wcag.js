/*!
 * BS5-WCAG JavaScript v0.1.0
 * Enhanced keyboard navigation and ARIA support for Bootstrap 5.3+
 * Licensed under MIT
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.BS5WCAG = factory());
})(this, (function () {
  'use strict';

  const BS5WCAG = {
    version: '0.1.0',

    /**
     * Initialize all WCAG enhancements
     */
    init: function() {
      this.initDarkMode();
      this.initFocusManagement();
      this.initKeyboardNavigation();
      this.initAriaEnhancements();
      this.initLiveRegions();
      this.initSkipLinks();
      this.initModalEnhancements();
      this.initTooltipEnhancements();
      console.log('BS5-WCAG v' + this.version + ' initialized');
    },

    /**
     * Initialize dark mode support
     * Respects: 1) saved preference, 2) system preference, 3) explicit data-bs-theme
     */
    initDarkMode: function() {
      var html = document.documentElement;

      // If an explicit theme is already set, persist it and leave it alone
      var explicitTheme = html.getAttribute('data-bs-theme');
      if (explicitTheme) {
        return;
      }

      // Check for a stored preference
      var stored = null;
      try { stored = localStorage.getItem('bs5-wcag-theme'); } catch(e) { /* noop */ }

      if (stored === 'dark' || stored === 'light') {
        html.setAttribute('data-bs-theme', stored);
      }
      // Otherwise, leave no attribute set so the CSS @media query handles it automatically

      // Restore saved color scheme
      var savedScheme = null;
      try { savedScheme = localStorage.getItem('bs5-wcag-color-scheme'); } catch(e) { /* noop */ }
      if (savedScheme && this.colorSchemes.indexOf(savedScheme) !== -1) {
        html.setAttribute('data-bs-color-scheme', savedScheme);
      }

      // Listen for system preference changes (only when no explicit override)
      if (window.matchMedia) {
        var mql = window.matchMedia('(prefers-color-scheme: dark)');
        var handler = function(e) {
          var currentStored = null;
          try { currentStored = localStorage.getItem('bs5-wcag-theme'); } catch(ex) { /* noop */ }
          // Only auto-switch if user hasn't manually chosen a theme
          if (!currentStored) {
            html.removeAttribute('data-bs-theme');
          }
        };
        // Safari <14 only supports addListener
        if (mql.addEventListener) {
          mql.addEventListener('change', handler);
        } else if (mql.addListener) {
          mql.addListener(handler);
        }
      }
    },

    /**
     * Get the current effective color mode
     * @returns {string} 'dark' or 'light'
     */
    getColorMode: function() {
      var explicit = document.documentElement.getAttribute('data-bs-theme');
      if (explicit) return explicit;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    },

    /**
     * Set the color mode explicitly
     * @param {string} mode - 'dark', 'light', or 'auto'
     */
    setColorMode: function(mode) {
      var html = document.documentElement;

      if (mode === 'auto') {
        html.removeAttribute('data-bs-theme');
        try { localStorage.removeItem('bs5-wcag-theme'); } catch(e) { /* noop */ }
        this.announce('Color mode set to auto');
        return;
      }

      html.setAttribute('data-bs-theme', mode);
      try { localStorage.setItem('bs5-wcag-theme', mode); } catch(e) { /* noop */ }
      this.announce('Color mode set to ' + mode);
    },

    /**
     * Toggle between dark and light mode
     * @returns {string} the new mode
     */
    toggleColorMode: function() {
      var current = this.getColorMode();
      var next = current === 'dark' ? 'light' : 'dark';
      this.setColorMode(next);
      return next;
    },

    /**
     * Available color schemes
     */
    colorSchemes: ['default', 'teal', 'plum', 'rust', 'slate'],

    /**
     * Get the current color scheme
     * @returns {string} scheme name or 'default'
     */
    getColorScheme: function() {
      return document.documentElement.getAttribute('data-bs-color-scheme') || 'default';
    },

    /**
     * Set the color scheme
     * @param {string} scheme - 'default', 'teal', 'plum', 'rust', or 'slate'
     */
    setColorScheme: function(scheme) {
      var html = document.documentElement;

      if (!scheme || scheme === 'default') {
        html.removeAttribute('data-bs-color-scheme');
        try { localStorage.removeItem('bs5-wcag-color-scheme'); } catch(e) { /* noop */ }
      } else {
        html.setAttribute('data-bs-color-scheme', scheme);
        try { localStorage.setItem('bs5-wcag-color-scheme', scheme); } catch(e) { /* noop */ }
      }

      this.announce('Color scheme set to ' + (scheme || 'default'));
    },

    /**
     * Enhanced focus management for modals and offcanvas
     */
    initFocusManagement: function() {
      // Trap focus within modals
      document.addEventListener('shown.bs.modal', function(event) {
        const modal = event.target;
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }

        // Trap focus within modal
        modal.addEventListener('keydown', function(e) {
          if (e.key === 'Tab') {
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstFocusable) {
              e.preventDefault();
              lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
              e.preventDefault();
              firstFocusable.focus();
            }
          }
        });
      });

      // Return focus when modal closes
      let lastFocusedElement;
      document.addEventListener('show.bs.modal', function(event) {
        lastFocusedElement = document.activeElement;
      });

      document.addEventListener('hidden.bs.modal', function(event) {
        if (lastFocusedElement) {
          lastFocusedElement.focus();
        }
      });

      // Same for offcanvas
      document.addEventListener('shown.bs.offcanvas', function(event) {
        const offcanvas = event.target;
        const focusableElements = offcanvas.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      });

      let lastFocusedBeforeOffcanvas;
      document.addEventListener('show.bs.offcanvas', function(event) {
        lastFocusedBeforeOffcanvas = document.activeElement;
      });

      document.addEventListener('hidden.bs.offcanvas', function(event) {
        if (lastFocusedBeforeOffcanvas) {
          lastFocusedBeforeOffcanvas.focus();
        }
      });
    },

    /**
     * Enhanced keyboard navigation for custom components
     */
    initKeyboardNavigation: function() {
      // Arrow key navigation for dropdown menus
      document.addEventListener('shown.bs.dropdown', function(event) {
        const dropdownMenu = event.target.querySelector('.dropdown-menu');
        const items = dropdownMenu.querySelectorAll('.dropdown-item:not(.disabled)');

        dropdownMenu.addEventListener('keydown', function(e) {
          if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) {
            return;
          }

          e.preventDefault();
          const currentIndex = Array.from(items).indexOf(document.activeElement);

          let nextIndex;
          switch(e.key) {
            case 'ArrowDown':
              nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
              break;
            case 'ArrowUp':
              nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
              break;
            case 'Home':
              nextIndex = 0;
              break;
            case 'End':
              nextIndex = items.length - 1;
              break;
          }

          items[nextIndex].focus();
        });
      });

      // Tab key navigation enhancement
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && !e.shiftKey) {
          // Ensure tab navigation is smooth
          const focusable = document.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );

          const currentIndex = Array.from(focusable).indexOf(document.activeElement);
          if (currentIndex >= 0 && currentIndex < focusable.length - 1) {
            const nextElement = focusable[currentIndex + 1];
            // Ensure the next element is scrolled into view
            if (nextElement) {
              const rect = nextElement.getBoundingClientRect();
              const isInView = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= window.innerHeight &&
                rect.right <= window.innerWidth
              );

              if (!isInView) {
                nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }
          }
        }
      });

      // Escape key to close modals and offcanvas
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          const openModal = document.querySelector('.modal.show');
          if (openModal) {
            const modalInstance = bootstrap.Modal.getInstance(openModal);
            if (modalInstance) {
              modalInstance.hide();
            }
          }

          const openOffcanvas = document.querySelector('.offcanvas.show');
          if (openOffcanvas) {
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(openOffcanvas);
            if (offcanvasInstance) {
              offcanvasInstance.hide();
            }
          }

          const openDropdown = document.querySelector('.dropdown-menu.show');
          if (openDropdown) {
            const dropdownToggle = openDropdown.previousElementSibling;
            if (dropdownToggle) {
              const dropdownInstance = bootstrap.Dropdown.getInstance(dropdownToggle);
              if (dropdownInstance) {
                dropdownInstance.hide();
                dropdownToggle.focus();
              }
            }
          }
        }
      });
    },

    /**
     * Add missing ARIA attributes to Bootstrap components
     */
    initAriaEnhancements: function() {
      // Ensure all interactive elements have appropriate roles
      document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').forEach(function(button) {
        if (!button.textContent.trim() && !button.querySelector('img[alt]')) {
          console.warn('Button without accessible label found:', button);
        }
      });

      // Add aria-current to active navigation items
      document.querySelectorAll('.nav-link.active, .page-item.active .page-link').forEach(function(el) {
        if (!el.hasAttribute('aria-current')) {
          el.setAttribute('aria-current', 'page');
        }
      });

      // Ensure form inputs have associated labels
      document.querySelectorAll('input, select, textarea').forEach(function(input) {
        if (!input.hasAttribute('aria-label') && !input.hasAttribute('aria-labelledby')) {
          const label = document.querySelector('label[for="' + input.id + '"]');
          if (!label && input.id) {
            console.warn('Form input without associated label:', input);
          }
        }
      });

      // Add aria-expanded to collapsible elements
      document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(function(toggle) {
        if (!toggle.hasAttribute('aria-expanded')) {
          const target = document.querySelector(toggle.getAttribute('data-bs-target'));
          if (target) {
            const isExpanded = target.classList.contains('show');
            toggle.setAttribute('aria-expanded', isExpanded);

            toggle.addEventListener('click', function() {
              setTimeout(function() {
                const nowExpanded = target.classList.contains('show');
                toggle.setAttribute('aria-expanded', nowExpanded);
              }, 50);
            });
          }
        }
      });
    },

    /**
     * Initialize live regions for dynamic content
     */
    initLiveRegions: function() {
      // Create a global live region for announcements
      if (!document.getElementById('wcag-live-region')) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'wcag-live-region';
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'visually-hidden';
        document.body.appendChild(liveRegion);
      }

      // Announce toast messages
      document.addEventListener('shown.bs.toast', function(event) {
        const toast = event.target;
        const message = toast.querySelector('.toast-body').textContent;
        BS5WCAG.announce(message);
      });

      // Announce alerts
      document.querySelectorAll('.alert').forEach(function(alert) {
        if (!alert.hasAttribute('role')) {
          alert.setAttribute('role', 'alert');
        }
      });
    },

    /**
     * Announce message to screen readers
     */
    announce: function(message, priority = 'polite') {
      const liveRegion = document.getElementById('wcag-live-region');
      if (liveRegion) {
        liveRegion.setAttribute('aria-live', priority);
        liveRegion.textContent = message;

        // Clear after announcement
        setTimeout(function() {
          liveRegion.textContent = '';
        }, 1000);
      }
    },

    /**
     * Add skip links if they don't exist
     */
    initSkipLinks: function() {
      if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Ensure main content area has id
        const main = document.querySelector('main') || document.querySelector('[role="main"]');
        if (main && !main.id) {
          main.id = 'main-content';
          main.setAttribute('tabindex', '-1');
        }
      }
    },

    /**
     * Enhanced modal accessibility
     */
    initModalEnhancements: function() {
      document.querySelectorAll('.modal').forEach(function(modal) {
        // Ensure modals have proper ARIA attributes
        if (!modal.hasAttribute('role')) {
          modal.setAttribute('role', 'dialog');
        }
        if (!modal.hasAttribute('aria-modal')) {
          modal.setAttribute('aria-modal', 'true');
        }

        // Ensure modal has accessible label
        const modalTitle = modal.querySelector('.modal-title');
        if (modalTitle && !modal.hasAttribute('aria-labelledby')) {
          if (!modalTitle.id) {
            modalTitle.id = 'modal-title-' + Math.random().toString(36).substr(2, 9);
          }
          modal.setAttribute('aria-labelledby', modalTitle.id);
        }
      });
    },

    /**
     * Enhanced tooltip accessibility
     */
    initTooltipEnhancements: function() {
      // Ensure tooltips are keyboard accessible
      document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function(element) {
        element.addEventListener('focus', function() {
          const tooltip = bootstrap.Tooltip.getInstance(element);
          if (tooltip) {
            tooltip.show();
          }
        });

        element.addEventListener('blur', function() {
          const tooltip = bootstrap.Tooltip.getInstance(element);
          if (tooltip) {
            tooltip.hide();
          }
        });
      });
    }
  };

  return BS5WCAG;
}));

// Auto-initialize when DOM is ready
// Runs after the UMD assignment so window.BS5WCAG is always available
(function() {
  function doInit() {
    if (typeof BS5WCAG !== 'undefined' && BS5WCAG.init) {
      try {
        BS5WCAG.init();
      } catch(e) {
        console.error('BS5-WCAG initialization error:', e);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', doInit);
  } else {
    doInit();
  }
})();
