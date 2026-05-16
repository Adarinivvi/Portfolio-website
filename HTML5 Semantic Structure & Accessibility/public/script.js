/**
 * ==========================================================================
 * ACCESSIBLE PORTFOLIO - JAVASCRIPT
 * ==========================================================================
 * 
 * This JavaScript file provides progressive enhancement for the portfolio.
 * The site works without JavaScript - JS only enhances the experience.
 * 
 * Accessibility Features:
 * - Keyboard navigation support
 * - ARIA attribute management
 * - Focus management
 * - Screen reader announcements via live regions
 * - Respect for reduced motion preferences
 * 
 * Table of Contents:
 * 1. Theme Toggle (Dark/Light Mode)
 * 2. Mobile Navigation
 * 3. Form Validation
 * 4. Utility Functions
 * 5. Initialization
 * ==========================================================================
 */

(function() {
  'use strict';

  /* ==========================================================================
     1. THEME TOGGLE (DARK/LIGHT MODE)
     ========================================================================== */

  /**
   * Theme Manager
   * Handles dark/light mode toggle with persistence and accessibility
   */
  const ThemeManager = {
    storageKey: 'theme-preference',
    
    /**
     * Initialize theme based on user preference or system setting
     */
    init() {
      // Get stored preference or fall back to system preference
      const storedTheme = localStorage.getItem(this.storageKey);
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
      
      this.setTheme(theme);
      this.bindEvents();
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.storageKey)) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    },
    
    /**
     * Set the current theme
     * @param {string} theme - 'light' or 'dark'
     */
    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      
      // Update toggle button aria-label for screen readers
      const toggleButton = document.querySelector('.theme-toggle');
      if (toggleButton) {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        toggleButton.setAttribute('aria-label', `Switch to ${newTheme} mode`);
      }
    },
    
    /**
     * Toggle between light and dark themes
     */
    toggle() {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      this.setTheme(newTheme);
      localStorage.setItem(this.storageKey, newTheme);
      
      // Announce theme change to screen readers
      this.announceThemeChange(newTheme);
    },
    
    /**
     * Announce theme change to screen readers
     * @param {string} theme - The new theme
     */
    announceThemeChange(theme) {
      const announcement = `Switched to ${theme} mode`;
      announceToScreenReader(announcement);
    },
    
    /**
     * Bind event listeners
     */
    bindEvents() {
      const toggleButton = document.querySelector('.theme-toggle');
      if (toggleButton) {
        toggleButton.addEventListener('click', () => this.toggle());
        
        // Support keyboard activation
        toggleButton.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggle();
          }
        });
      }
    }
  };

  /* ==========================================================================
     2. MOBILE NAVIGATION
     ========================================================================== */

  /**
   * Navigation Manager
   * Handles mobile menu toggle with accessibility support
   */
  const NavigationManager = {
    init() {
      this.navToggle = document.querySelector('.nav-toggle');
      this.navMenu = document.querySelector('.nav-menu');
      
      if (this.navToggle && this.navMenu) {
        this.bindEvents();
      }
    },
    
    /**
     * Toggle mobile menu visibility
     */
    toggle() {
      const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';
      
      this.navToggle.setAttribute('aria-expanded', !isExpanded);
      this.navMenu.classList.toggle('is-open', !isExpanded);
      
      if (!isExpanded) {
        // Menu is opening - focus first link
        const firstLink = this.navMenu.querySelector('.nav-link');
        if (firstLink) {
          firstLink.focus();
        }
      }
      
      // Announce state change to screen readers
      const state = !isExpanded ? 'opened' : 'closed';
      announceToScreenReader(`Navigation menu ${state}`);
    },
    
    /**
     * Close menu when clicking outside
     * @param {Event} event - Click event
     */
    handleOutsideClick(event) {
      if (!this.navToggle.contains(event.target) && !this.navMenu.contains(event.target)) {
        if (this.navMenu.classList.contains('is-open')) {
          this.navToggle.setAttribute('aria-expanded', 'false');
          this.navMenu.classList.remove('is-open');
        }
      }
    },
    
    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeydown(event) {
      // Close menu on Escape
      if (event.key === 'Escape' && this.navMenu.classList.contains('is-open')) {
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navMenu.classList.remove('is-open');
        this.navToggle.focus();
      }
    },
    
    /**
     * Bind event listeners
     */
    bindEvents() {
      this.navToggle.addEventListener('click', () => this.toggle());
      document.addEventListener('click', (e) => this.handleOutsideClick(e));
      document.addEventListener('keydown', (e) => this.handleKeydown(e));
      
      // Close menu on window resize if desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && this.navMenu.classList.contains('is-open')) {
          this.navToggle.setAttribute('aria-expanded', 'false');
          this.navMenu.classList.remove('is-open');
        }
      });
    }
  };

  /* ==========================================================================
     3. FORM VALIDATION
     ========================================================================== */

  /**
   * Form Validator
   * Provides accessible form validation with ARIA support
   */
  const FormValidator = {
    init() {
      this.form = document.querySelector('#contact-form');
      
      if (this.form) {
        this.setupValidation();
      }
    },
    
    /**
     * Setup form validation
     */
    setupValidation() {
      const inputs = this.form.querySelectorAll('input, textarea');
      
      // Add blur validation for each input
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearError(input));
      });
      
      // Handle form submission
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },
    
    /**
     * Validate a single field
     * @param {HTMLElement} field - The input/textarea to validate
     * @returns {boolean} - Whether the field is valid
     */
    validateField(field) {
      const value = field.value.trim();
      const fieldName = field.name;
      const errorElement = document.getElementById(`${fieldName}-error`);
      
      let isValid = true;
      let errorMessage = '';
      
      // Required field validation
      if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${this.getFieldLabel(field)} is required`;
      }
      
      // Email validation
      if (isValid && field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
      }
      
      // Minimum length validation
      if (isValid && field.minLength > 0 && value.length < field.minLength) {
        isValid = false;
        errorMessage = `${this.getFieldLabel(field)} must be at least ${field.minLength} characters`;
      }
      
      // Update UI based on validation result
      this.updateFieldState(field, isValid, errorMessage, errorElement);
      
      return isValid;
    },
    
    /**
     * Get human-readable field label
     * @param {HTMLElement} field - The input field
     * @returns {string} - The field label
     */
    getFieldLabel(field) {
      const label = document.querySelector(`label[for="${field.id}"]`);
      return label ? label.textContent.replace(' *', '') : field.name;
    },
    
    /**
     * Update field state (valid/invalid) with ARIA attributes
     * @param {HTMLElement} field - The input field
     * @param {boolean} isValid - Whether the field is valid
     * @param {string} errorMessage - Error message to display
     * @param {HTMLElement} errorElement - Error message element
     */
    updateFieldState(field, isValid, errorMessage, errorElement) {
      if (isValid) {
        field.setAttribute('aria-invalid', 'false');
        field.removeAttribute('aria-describedby');
        if (errorElement) {
          errorElement.classList.remove('is-visible');
          errorElement.textContent = '';
        }
      } else {
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', errorElement ? errorElement.id : '');
        if (errorElement) {
          errorElement.classList.add('is-visible');
          errorElement.textContent = errorMessage;
        }
      }
    },
    
    /**
     * Clear error state on input
     * @param {HTMLElement} field - The input field
     */
    clearError(field) {
      const errorElement = document.getElementById(`${field.name}-error`);
      if (field.getAttribute('aria-invalid') === 'true') {
        // Re-validate on input to clear error when fixed
        this.validateField(field);
      }
    },
    
    /**
     * Handle form submission
     * @param {Event} event - Submit event
     */
    handleSubmit(event) {
      event.preventDefault();
      
      const inputs = this.form.querySelectorAll('input, textarea');
      let isFormValid = true;
      let firstInvalidField = null;
      
      // Validate all fields
      inputs.forEach(input => {
        const isFieldValid = this.validateField(input);
        if (!isFieldValid && !firstInvalidField) {
          firstInvalidField = input;
          isFormValid = false;
        } else if (!isFieldValid) {
          isFormValid = false;
        }
      });
      
      if (!isFormValid) {
        // Focus first invalid field
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
        
        // Announce error to screen readers
        announceToScreenReader('Form has errors. Please correct them and try again.');
        return;
      }
      
      // Form is valid - simulate submission
      this.submitForm();
    },
    
    /**
     * Submit the form (simulated for demo)
     */
    submitForm() {
      const statusElement = document.getElementById('form-status');
      const submitButton = this.form.querySelector('button[type="submit"]');
      
      // Disable submit button
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Simulate API call
      setTimeout(() => {
        // Show success message
        statusElement.className = 'form-status form-status-success is-visible';
        statusElement.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
        
        // Announce success to screen readers
        announceToScreenReader('Message sent successfully');
        
        // Reset form
        this.form.reset();
        
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        
        // Hide status after 5 seconds
        setTimeout(() => {
          statusElement.classList.remove('is-visible');
        }, 5000);
      }, 1500);
    }
  };

  /* ==========================================================================
     4. UTILITY FUNCTIONS
     ========================================================================== */

  /**
   * Create and manage ARIA live region for screen reader announcements
   */
  let liveRegion = null;
  
  function createLiveRegion() {
    liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  }
  
  /**
   * Announce message to screen readers
   * @param {string} message - Message to announce
   */
  function announceToScreenReader(message) {
    if (!liveRegion) {
      createLiveRegion();
    }
    
    // Clear and set message (needed for repeated announcements)
    liveRegion.textContent = '';
    
    // Use setTimeout to ensure the change is detected
    setTimeout(() => {
      liveRegion.textContent = message;
    }, 100);
  }

  /**
   * Check if user prefers reduced motion
   * @returns {boolean}
   */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Smooth scroll to element (respects reduced motion)
   * @param {string} targetId - Target element ID
   */
  function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    
    if (prefersReducedMotion()) {
      target.scrollIntoView();
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Focus the target for keyboard users
    target.setAttribute('tabindex', '-1');
    target.focus();
  }

  /**
   * Initialize skip link functionality
   */
  function initSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = skipLink.getAttribute('href').slice(1);
        smoothScrollTo(targetId);
      });
    }
  }

  /**
   * Initialize smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        if (targetId && document.getElementById(targetId)) {
          e.preventDefault();
          smoothScrollTo(targetId);
        }
      });
    });
  }

  /**
   * Lazy load images
   * Uses Intersection Observer for performance
   */
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px'
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  /**
   * Set current year in copyright
   */
  function setCurrentYear() {
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  /* ==========================================================================
     5. INITIALIZATION
     ========================================================================== */

  /**
   * Initialize all modules when DOM is ready
   */
  function init() {
    // Create live region for announcements
    createLiveRegion();
    
    // Initialize modules
    ThemeManager.init();
    NavigationManager.init();
    FormValidator.init();
    
    // Initialize utilities
    initSkipLink();
    initSmoothScroll();
    initLazyLoading();
    setCurrentYear();
    
    console.log('[v0] Portfolio JavaScript initialized successfully');
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
