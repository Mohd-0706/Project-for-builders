// security.js

(function () {
  'use strict';

  /**
   * Force HTTPS if accessed via HTTP (for production)
   */
  if (location.protocol === 'http:') {
    location.href = location.href.replace('http:', 'https:');
  }

  /**
   * Prevent clickjacking using frame busting
   */
  if (window.top !== window.self) {
    window.top.location = window.location;
  }

  /**
   * Disable right-click (optional; can annoy users)
   */
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  /**
   * Block certain keyboard shortcuts (like dev tools)
   */
  document.addEventListener('keydown', function (e) {
    // F12, Ctrl+Shift+I/J/C/U, Ctrl+U
    if (
      e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && e.key.toUpperCase() === 'U')
    ) {
      e.preventDefault();
    }
  });

  /**
   * Warn users about unsafe console use (educational)
   */
  setTimeout(() => {
    console.log('%cStop!', 'font-size: 36px; color: red;');
    console.log('%cThis browser feature is intended for developers. Do not paste code you don’t understand.', 'font-size: 16px; color: orange;');
  }, 1000);
})();
