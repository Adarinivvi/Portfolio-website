/**
 * Main JavaScript Module
 * ======================
 * Handles:
 * - Form validation and submission
 * - Scroll animations (with reduced-motion support)
 * - Back to top button
 * - Scroll progress indicator
 * - Greeting time-based update
 * - Intersection Observer animations
 */

(function() {
  'use strict';

  // ========================================
  // Greeting Time Update
  // ========================================

  function updateGreeting() {
    const greeting = document.querySelector('.hero-greeting');
    if (!greeting) return;

    const hour = new Date().getHours();
    let timeGreeting;

    if (hour >= 5 && hour < 12) {
      timeGreeting = 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      timeGreeting = 'Good afternoon';
    } else if (hour >= 17 && hour < 21) {
      timeGreeting = 'Good evening';
    } else {
      timeGreeting = 'Good night';
    }

    greeting.textContent = timeGreeting;
  }

  // ========================================
  // Form Validation & Submission
  // ========================================

  function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');
    const submitBtn = form.querySelector('.btn-submit');

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /**
     * Show error message
     */
    function showError(input, message) {
      const errorEl = document.getElementById(`${input.id}-error`);
      if (errorEl) {
        errorEl.textContent = message;
        input.classList.add('has-error');
        input.setAttribute('aria-invalid', 'true');
      }
    }

    /**
     * Clear error message
     */
    function clearError(input) {
      const errorEl = document.getElementById(`${input.id}-error`);
      if (errorEl) {
        errorEl.textContent = '';
        input.classList.remove('has-error');
        input.removeAttribute('aria-invalid');
      }
    }

    /**
     * Validate single field
     */
    function validateField(input) {
      const value = input.value.trim();
      
      // Required check
      if (!value) {
        showError(input, 'This field is required');
        return false;
      }

      // Email validation
      if (input.type === 'email' && !emailPattern.test(value)) {
        showError(input, 'Please enter a valid email address');
        return false;
      }

      // Message minimum length
      if (input.id === 'message' && value.length < 10) {
        showError(input, 'Please enter at least 10 characters');
        return false;
      }

      clearError(input);
      return true;
    }

    /**
     * Validate entire form
     */
    function validateForm() {
      let isValid = true;

      [nameInput, emailInput, messageInput].forEach(input => {
        if (input && !validateField(input)) {
          isValid = false;
        }
      });

      return isValid;
    }

    // Real-time validation on blur
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('has-error')) {
            validateField(input);
          }
        });
      }
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        // Focus first error field
        const firstError = form.querySelector('.has-error');
        if (firstError) firstError.focus();
        return;
      }

      // Show loading state
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <span class="spinner"></span>
        Sending...
      `;

      // Simulate form submission (replace with actual API call)
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success state
        submitBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Message Sent!
        `;
        submitBtn.classList.add('btn-success');
        
        // Reset form
        form.reset();
        
        // Reset button after delay
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('btn-success');
        }, 3000);
        
      } catch (error) {
        // Error state
        submitBtn.innerHTML = 'Error - Try Again';
        submitBtn.classList.add('btn-error');
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('btn-error');
        }, 3000);
      }
    });
  }

  // ========================================
  // Back to Top Button
  // ========================================

  function initBackToTop() {
    // Create button if it doesn't exist
    let backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) {
      backToTop = document.createElement('button');
      backToTop.className = 'back-to-top';
      backToTop.setAttribute('aria-label', 'Back to top');
      backToTop.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      `;
      document.body.appendChild(backToTop);
    }

    // Show/hide based on scroll position
    let ticking = false;
    
    function updateButton() {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateButton);
        ticking = true;
      }
    }, { passive: true });

    // Click handler
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================
  // Scroll Progress Indicator
  // ========================================

  function initScrollProgress() {
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-indicator');
    
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.className = 'scroll-indicator';
      progressBar.setAttribute('role', 'progressbar');
      progressBar.setAttribute('aria-label', 'Page scroll progress');
      document.body.appendChild(progressBar);
    }

    let ticking = false;

    function updateProgress() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;
      
      progressBar.style.transform = `scaleX(${progress})`;
      progressBar.setAttribute('aria-valuenow', Math.round(progress * 100));
      
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });

    // Initial update
    updateProgress();
  }

  // ========================================
  // Scroll Animations (Intersection Observer)
  // ========================================

  function initScrollAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show all elements immediately if reduced motion is preferred
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
      '.section, .project-card, .experience-item, .about-content, .about-skills'
    );

    animatedElements.forEach(el => {
      el.classList.add('animate-on-scroll');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optionally unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // ========================================
  // Image Lazy Loading Enhancement
  // ========================================

  function initLazyLoading() {
    // Native lazy loading is already in HTML, this adds fallback
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported
      return;
    }

    // Fallback for older browsers
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // ========================================
  // Add CSS for scroll animations
  // ========================================

  function injectAnimationStyles() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    const style = document.createElement('style');
    style.textContent = `
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      
      .animate-on-scroll.is-visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Stagger animation for cards */
      .projects-grid .project-card:nth-child(1) { transition-delay: 0ms; }
      .projects-grid .project-card:nth-child(2) { transition-delay: 100ms; }
      .projects-grid .project-card:nth-child(3) { transition-delay: 200ms; }
      .projects-grid .project-card:nth-child(4) { transition-delay: 300ms; }
      
      .experience-item:nth-child(1) { transition-delay: 0ms; }
      .experience-item:nth-child(2) { transition-delay: 100ms; }
      .experience-item:nth-child(3) { transition-delay: 200ms; }
      
      /* Button success/error states */
      .btn-success {
        background-color: var(--color-success) !important;
        border-color: var(--color-success) !important;
      }
      
      .btn-error {
        background-color: var(--color-error) !important;
        border-color: var(--color-error) !important;
      }
      
      /* Form error state */
      .form-input.has-error,
      .form-textarea.has-error {
        border-color: var(--color-error);
      }
      
      .form-input.has-error:focus,
      .form-textarea.has-error:focus {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
      }
      
      /* Header scrolled state */
      .site-header.is-scrolled {
        box-shadow: var(--shadow-md);
      }
    `;
    document.head.appendChild(style);
  }

  // ========================================
  // Initialize Everything
  // ========================================

  function init() {
    updateGreeting();
    initContactForm();
    initBackToTop();
    initScrollProgress();
    injectAnimationStyles();
    initScrollAnimations();
    initLazyLoading();

    // Log initialization (for debugging)
    console.log('[Portfolio] Initialized successfully');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
