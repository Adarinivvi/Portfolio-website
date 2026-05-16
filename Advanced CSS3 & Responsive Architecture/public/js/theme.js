/**
 * Theme Toggle Module
 * ==================
 * Handles dark/light mode switching with:
 * - localStorage persistence
 * - System preference detection (prefers-color-scheme)
 * - Smooth transitions with reduced-motion support
 * - ARIA attributes for accessibility
 */

(function() {
  'use strict';

  // Constants
  const THEME_KEY = 'portfolio-theme';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';

  // DOM Elements
  const html = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  // Theme colors for meta tag
  const themeColors = {
    dark: '#0a0a0f',
    light: '#fafafa'
  };

  /**
   * Get the user's preferred theme from:
   * 1. localStorage (user's explicit choice)
   * 2. System preference (prefers-color-scheme)
   * 3. Default to dark theme
   */
  function getPreferredTheme() {
    // Check localStorage first
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme) {
      return storedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return LIGHT_THEME;
    }

    // Default to dark
    return DARK_THEME;
  }

  /**
   * Apply the theme to the document
   * @param {string} theme - 'dark' or 'light'
   * @param {boolean} save - Whether to save to localStorage
   */
  function setTheme(theme, save = true) {
    // Set the data-theme attribute
    html.setAttribute('data-theme', theme);

    // Update meta theme-color for mobile browsers
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColors[theme] || themeColors.dark);
    }

    // Update toggle button aria-label
    if (themeToggle) {
      const label = theme === DARK_THEME 
        ? 'Switch to light mode' 
        : 'Switch to dark mode';
      themeToggle.setAttribute('aria-label', label);
      themeToggle.setAttribute('title', label);
    }

    // Save to localStorage
    if (save) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (e) {
        // localStorage might be unavailable (private browsing, etc.)
        console.warn('Could not save theme preference:', e);
      }
    }
  }

  /**
   * Toggle between dark and light themes
   */
  function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme') || DARK_THEME;
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    setTheme(newTheme);
  }

  /**
   * Handle system preference changes
   */
  function handleSystemPreferenceChange(e) {
    // Only auto-switch if user hasn't set a preference
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? LIGHT_THEME : DARK_THEME, false);
    }
  }

  /**
   * Initialize the theme system
   */
  function init() {
    // Apply initial theme (this should already be done inline in HTML for no-flash)
    const theme = getPreferredTheme();
    setTheme(theme, false);

    // Set up toggle button listener
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);

      // Keyboard support (Enter and Space)
      themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      });
    }

    // Listen for system preference changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      
      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleSystemPreferenceChange);
      } else if (mediaQuery.addListener) {
        // Older browsers (Safari < 14)
        mediaQuery.addListener(handleSystemPreferenceChange);
      }
    }

    // Listen for storage events (sync across tabs)
    window.addEventListener('storage', (e) => {
      if (e.key === THEME_KEY && e.newValue) {
        setTheme(e.newValue, false);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for external use if needed
  window.ThemeManager = {
    toggle: toggleTheme,
    set: setTheme,
    get: () => html.getAttribute('data-theme') || DARK_THEME
  };
})();
