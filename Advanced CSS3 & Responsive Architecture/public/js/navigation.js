/**
 * Navigation Module
 * =================
 * Handles responsive navigation with:
 * - Mobile hamburger menu toggle
 * - Keyboard accessibility
 * - Focus trapping in mobile menu
 * - Smooth scroll to sections
 * - Active section highlighting
 * - ARIA attributes management
 */

(function() {
  'use strict';

  // DOM Elements
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionNavLinks = document.querySelectorAll('.section-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const header = document.querySelector('.site-header');

  // State
  let isMenuOpen = false;
  let focusableElements = [];
  let firstFocusable = null;
  let lastFocusable = null;

  /**
   * Toggle mobile menu open/closed state
   */
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    // Update ARIA attributes
    navToggle.setAttribute('aria-expanded', isMenuOpen.toString());
    
    // Toggle menu visibility class
    navMenu.classList.toggle('is-open', isMenuOpen);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    
    // Handle focus management
    if (isMenuOpen) {
      // Get focusable elements in menu
      focusableElements = navMenu.querySelectorAll('a[href], button');
      firstFocusable = focusableElements[0];
      lastFocusable = focusableElements[focusableElements.length - 1];
      
      // Focus first menu item
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100);
      }
    } else {
      // Return focus to toggle button
      navToggle.focus();
    }
  }

  /**
   * Close mobile menu
   */
  function closeMenu() {
    if (isMenuOpen) {
      isMenuOpen = false;
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  /**
   * Handle keyboard navigation in mobile menu
   * @param {KeyboardEvent} e
   */
  function handleMenuKeydown(e) {
    if (!isMenuOpen) return;

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        closeMenu();
        navToggle.focus();
        break;
        
      case 'Tab':
        // Trap focus within menu
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
        break;
    }
  }

  /**
   * Smooth scroll to target section
   * @param {string} targetId - The ID of the target section (without #)
   */
  function scrollToSection(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    // Calculate offset (accounting for fixed header)
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - headerHeight - 20;

    // Smooth scroll (respects prefers-reduced-motion via CSS)
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Update URL hash without jumping
    history.pushState(null, '', `#${targetId}`);
  }

  /**
   * Handle navigation link clicks
   * @param {Event} e
   */
  function handleNavClick(e) {
    const href = e.currentTarget.getAttribute('href');
    
    // Only handle internal anchor links
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      
      // Close mobile menu if open
      closeMenu();
      
      // Scroll to section
      scrollToSection(targetId);
      
      // Update active state
      updateActiveNavLink(targetId);
    }
  }

  /**
   * Update active state on navigation links
   * @param {string} activeId - The ID of the active section
   */
  function updateActiveNavLink(activeId) {
    // Update main nav links
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isActive = href === `#${activeId}`;
      link.classList.toggle('active', isActive);
    });

    // Update section nav links (sidebar)
    sectionNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isActive = href === `#${activeId}`;
      link.classList.toggle('active', isActive);
    });
  }

  /**
   * Determine which section is currently in view
   * Uses Intersection Observer for performance
   */
  function setupScrollSpy() {
    if (!sections.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateActiveNavLink(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  /**
   * Handle header appearance on scroll
   * Adds shadow/background when scrolled
   */
  function setupScrollHeader() {
    if (!header) return;

    let lastScrollY = 0;
    let ticking = false;

    function updateHeader() {
      const scrollY = window.pageYOffset;
      
      // Add shadow when scrolled
      if (scrollY > 10) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }

      lastScrollY = scrollY;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Close menu when clicking outside
   * @param {Event} e
   */
  function handleOutsideClick(e) {
    if (isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      closeMenu();
    }
  }

  /**
   * Close menu on window resize (if resizing to desktop)
   */
  function handleResize() {
    if (window.innerWidth >= 768 && isMenuOpen) {
      closeMenu();
    }
  }

  /**
   * Initialize navigation
   */
  function init() {
    // Mobile menu toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', toggleMenu);
      
      // Keyboard support for toggle
      navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleMenu();
        }
      });
      
      // Menu keyboard navigation
      navMenu.addEventListener('keydown', handleMenuKeydown);
    }

    // Navigation link clicks
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    // Section nav link clicks
    sectionNavLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    // Scroll spy for active section
    setupScrollSpy();

    // Header scroll behavior
    setupScrollHeader();

    // Click outside to close
    document.addEventListener('click', handleOutsideClick);

    // Handle resize
    window.addEventListener('resize', handleResize, { passive: true });

    // Handle initial hash in URL
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      setTimeout(() => {
        scrollToSection(targetId);
        updateActiveNavLink(targetId);
      }, 100);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for external use
  window.Navigation = {
    close: closeMenu,
    scrollTo: scrollToSection
  };
})();
