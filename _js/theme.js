// _js/theme.js - Tema clar estricte (eliminació de mode fosc i neteja de preferències)
(function () {
  'use strict';
  try {
    localStorage.removeItem('robotica200_theme');
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    }
  } catch (e) {}
})();
