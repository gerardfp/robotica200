'use strict';

const { cleanRoot } = require('./utils');

function SiteHeader({ activeNav = '', root = '' } = {}) {
  const active = String(activeNav).toLowerCase();
  const r = cleanRoot(root);
  const isRobots = active === 'robots' || active === 'robotica' || active === 'robotica-educativa';

  return `
  <header class="header">
    <div class="container header-inner">
      <a href="${r}index.html" class="logo">
        <span class="logo-badge"><img src="${r}_assets/icons/logo.svg" alt="Robòtica200" class="logo-badge-img"></span>
        <div class="logo-text">
          <span class="logo-name">Robòtica<sup>200</sup></span>
          <span class="logo-subtitle">Robòtica per a docents</span>
        </div>
      </a>
      <nav class="header-nav" aria-label="Navegació principal">
        <a href="${r}index.html" class="nav-btn${active === 'inici' ? ' active' : ''}">Inici</a>
        <a href="${r}pensament-computacional/index.html" class="nav-btn${active === 'pensament' ? ' active' : ''}">Pensament computacional</a>
        <a href="${r}robotica-educativa/index.html" class="nav-btn${isRobots ? ' active' : ''}">Robòtica educativa</a>
        <a href="${r}situacions-aprenentatge/index.html" class="nav-btn${active === 'situacions' ? ' active' : ''}">Situacions d'aprenentatge</a>
      </nav>
    </div>
  </header>`;
}

module.exports = { SiteHeader };
