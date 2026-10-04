// _js/components.js - Components Web Natius per a Robòtica²⁰⁰
(function () {
  'use strict';

  function getThemeIcon() {
    const theme = document.documentElement.getAttribute('data-theme') ||
      localStorage.getItem('robotica200_theme') ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    return theme === 'dark' ? '☀️' : '🌙';
  }

  // 1. Cabecera reutilizable amb navegació i selector de tema
  class SiteHeader extends HTMLElement {
    connectedCallback() {
      const active = (this.getAttribute('active') || '').toLowerCase();
      let root = this.getAttribute('root');
      if (root === null || root === undefined) {
        root = '';
      }
      if (root && !root.endsWith('/')) {
        root += '/';
      }

      this.innerHTML = `
        <header class="header">
          <div class="container header-inner">
            <a href="${root}index.html" class="logo">
              <span class="logo-badge"><img src="${root}_assets/icons/logo.svg" alt="Robòtica200" class="logo-badge-img"></span>
              <div class="logo-text">
                <span class="logo-name">Robòtica<sup>200</sup></span>
                <span class="logo-subtitle">Robòtica per a docents</span>
              </div>
            </a>
            <nav class="header-nav" aria-label="Navegació principal">
              <a href="${root}index.html" class="nav-btn ${active === 'inici' ? 'active' : ''}">Inici</a>
              <a href="${root}pensament-computacional/index.html" class="nav-btn ${active === 'pensament' ? 'active' : ''}">Pensament computacional</a>
              <a href="${root}robotica/index.html" class="nav-btn ${active === 'robotica' ? 'active' : ''}">Robòtica</a>
              <a href="${root}situacions-aprenentatge/index.html" class="nav-btn ${active === 'situacions' ? 'active' : ''}">Situacions d'aprenentatge</a>
            </nav>
            <button class="theme-toggle" id="theme-toggle" aria-label="Canviar tema de color">
              <span id="theme-icon" aria-hidden="true">${getThemeIcon()}</span>
            </button>
          </div>
        </header>
      `;
    }
  }

  // 2. Peu de pàgina corporatiu unificat
  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <footer class="footer">
          <div class="container">
            <p>Robòtica<sup>200</sup> • Robòtica per a docents</p>
          </div>
        </footer>
      `;
    }
  }

  // 3. Botó de navegació de retorn accessible
  class NavBack extends HTMLElement {
    connectedCallback() {
      const href = this.getAttribute('href') || 'index.html';
      let label = this.getAttribute('label') || 'Tornar';
      if (!label.startsWith('←')) {
        label = '← Tornar a ' + label;
      }
      this.innerHTML = `
        <div class="section-nav-back">
          <a href="${href}" class="btn-back">${label}</a>
        </div>
      `;
    }
  }

  if (!customElements.get('site-header')) {
    customElements.define('site-header', SiteHeader);
  }
  if (!customElements.get('site-footer')) {
    customElements.define('site-footer', SiteFooter);
  }
  if (!customElements.get('nav-back')) {
    customElements.define('nav-back', NavBack);
  }
})();
