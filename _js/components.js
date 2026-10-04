// _js/components.js - Components Web Natius per a Robòtica²⁰⁰
(function () {
  'use strict';

  function cleanRoot(root) {
    if (root === null || root === undefined) root = '';
    if (root && !root.endsWith('/')) root += '/';
    return root;
  }

  function ensureDocumentHead(root, title, description) {
    root = cleanRoot(root);

    // Neteja de preferències de tema antic
    try {
      localStorage.removeItem('robotica200_theme');
      if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
      }
    } catch (e) {}

    // Title
    if (title && (!document.title || document.title.trim() === '')) {
      document.title = `${title} | Robòtica²⁰⁰`;
    }

    // Viewport
    if (!document.querySelector('meta[name="viewport"]')) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(meta);
    }

    // Description
    if (description && !document.querySelector('meta[name="description"]')) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Google Fonts
    if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
      const pre1 = document.createElement('link');
      pre1.rel = 'preconnect';
      pre1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(pre1);

      const pre2 = document.createElement('link');
      pre2.rel = 'preconnect';
      pre2.href = 'https://fonts.gstatic.com';
      pre2.crossOrigin = 'anonymous';
      document.head.appendChild(pre2);

      const fonts = document.createElement('link');
      fonts.rel = 'stylesheet';
      fonts.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Sora:wght@400;600;700;800&display=swap';
      document.head.appendChild(fonts);
    }

    // Stylesheet
    if (!document.querySelector('link[href*="_css/styles.css"]')) {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = `${root}_css/styles.css?v=2`;
      document.head.appendChild(css);
    }

    // Favicon
    if (!document.querySelector('link[rel*="icon"]')) {
      const icon = document.createElement('link');
      icon.rel = 'icon';
      icon.type = 'image/svg+xml';
      icon.href = `${root}_assets/icons/logo.svg`;
      document.head.appendChild(icon);
    }
  }

  function deferRender(element, renderFn) {
    if (element._rendered) return;
    const doRender = () => {
      if (element._rendered) return;
      element._rendered = true;
      renderFn();
      element.setAttribute('rendered', '');
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', doRender, { once: true });
    } else {
      setTimeout(doRender, 0);
    }
  }

  function loadCatalogData(root, callback) {
    if (window.CATALEG) {
      callback();
      return;
    }
    const existing = document.querySelector('script[src*="_js/cataleg.js"]');
    if (existing) {
      existing.addEventListener('load', () => callback());
      return;
    }
    const script = document.createElement('script');
    script.src = `${cleanRoot(root)}_js/cataleg.js`;
    script.onload = () => callback();
    document.head.appendChild(script);
  }

  // 1. Cabecera reutilizable amb navegació
  class SiteHeader extends HTMLElement {
    connectedCallback() {
      const active = (this.getAttribute('active') || '').toLowerCase();
      const root = cleanRoot(this.getAttribute('root'));

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
              <a href="${root}robotica-educativa/index.html" class="nav-btn ${active === 'robots' || active === 'robotica' || active === 'robotica-educativa' ? 'active' : ''}">Robòtica educativa</a>
              <a href="${root}situacions-aprenentatge/index.html" class="nav-btn ${active === 'situacions' ? 'active' : ''}">Situacions d'aprenentatge</a>
            </nav>
          </div>
        </header>
      `;
    }
  }

  // 2. Peu de pàgina corporatiu unificat
  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <footer class="site-footer">
          <div class="site-footer-waves" aria-hidden="true">
            <svg class="footer-wave-svg" viewBox="0 0 1440 60" preserveAspectRatio="none">
              <path class="footer-wave-back" d="M0,24 C320,54 640,6 960,36 C1200,52 1340,20 1440,26 L1440,60 L0,60 Z"></path>
              <path class="footer-wave-front" d="M0,36 C280,10 560,48 840,20 C1120,46 1320,16 1440,32 L1440,60 L0,60 Z"></path>
            </svg>
          </div>
          <div class="container site-footer-inner">
            <p class="site-footer-motto">Aprendre fent, programar per a un futur millor.</p>
            <div class="footer-accent-dashes" aria-hidden="true">
              <span class="dash dash-red"></span>
              <span class="dash dash-yellow"></span>
              <span class="dash dash-blue"></span>
            </div>
            <p class="site-footer-brand">Robòtica<sup>200</sup> • Robòtica per a docents</p>
          </div>
        </footer>
      `;
    }
  }

  // 3. Botó de navegació de retorn accessible
  class NavBack extends HTMLElement {
    connectedCallback() {
      const href = this.getAttribute('href') || 'index.html';
      let label = (this.getAttribute('label') || 'Tornar').trim();
      if (label.startsWith('←')) {
        label = label.replace(/^←\s*/, '');
      } else if (!label.toLowerCase().startsWith('tornar')) {
        label = 'Tornar a ' + label;
      }
      this.innerHTML = `
        <div class="section-nav-back">
          <a href="${href}" class="btn-back">
            <span class="btn-back-arrow" aria-hidden="true">←</span>
            <span class="btn-back-text">${label}</span>
          </a>
        </div>
      `;
    }
  }

  // 4. Plantilla de pàgina d'activitat
  class ActivityPage extends HTMLElement {
    connectedCallback() {
      const title = this.getAttribute('title') || '';
      const tag = this.getAttribute('tag') || '';
      const cicle = this.getAttribute('cicle') || '';
      const durada = this.getAttribute('durada') || '';
      const root = cleanRoot(this.getAttribute('root') || '../../');
      const backHref = this.getAttribute('back-href') || `${root}pensament-computacional/index.html`;
      const backLabel = this.getAttribute('back-label') || 'Pensament Computacional';
      const description = this.getAttribute('description') || '';

      ensureDocumentHead(root, title, description);

      deferRender(this, () => {
        const content = this.innerHTML;
        this.innerHTML = `
          <site-header active="pensament" root="${root}"></site-header>
          <main class="container page-content">
            <nav-back href="${backHref}" label="${backLabel}"></nav-back>
            <article class="detail-page-card">
              <div class="detail-page-header">
                <div class="detail-page-badges">
                  ${tag ? `<span class="tag-badge primary">${tag}</span>` : ''}
                  ${cicle ? `<span class="tag-badge">${cicle}</span>` : ''}
                  ${durada ? `<span class="tag-badge">⏱️ ${durada}</span>` : ''}
                </div>
                <h1 class="detail-page-title">${title}</h1>
              </div>
              <div class="prose">
                ${content}
              </div>
            </article>
          </main>
          <site-footer></site-footer>
        `;
      });
    }
  }

  // 5. Plantilla de pàgina de tutorial
  class TutorialPage extends HTMLElement {
    connectedCallback() {
      const title = this.getAttribute('title') || '';
      const robot = (this.getAttribute('robot') || '').toLowerCase();
      const robotLabel = this.getAttribute('robot-label') || this.getAttribute('robot') || '';
      let robotIcon = this.getAttribute('robot-icon') || '';
      if (!robotIcon && robot) {
        robotIcon = `${robot}.png`;
      }
      const dificultat = this.getAttribute('dificultat') || this.getAttribute('nivell') || '';
      const durada = this.getAttribute('durada') || '';
      const intro = this.getAttribute('intro') || '';
      const root = cleanRoot(this.getAttribute('root') || '../../');
      const backHref = this.getAttribute('back-href') || `${root}robot/${robot}/index.html`;
      const backLabel = this.getAttribute('back-label') || robotLabel;
      const description = this.getAttribute('description') || intro;

      ensureDocumentHead(root, title, description);

      deferRender(this, () => {
        const content = this.innerHTML;
        this.innerHTML = `
          <site-header active="robots" root="${root}"></site-header>
          <main class="container page-content">
            <nav-back href="${backHref}" label="${backLabel}"></nav-back>
            <article class="detail-page-card">
              <div class="detail-page-header">
                <div class="detail-page-badges">
                  ${robotLabel ? `<span class="tag-badge primary">${robotIcon ? `<img src="${root}_assets/icons/${robotIcon}" alt="" class="tag-badge-icon" width="20" height="20">` : ''}${robotLabel}</span>` : ''}
                  ${dificultat ? `<span class="tag-badge">${dificultat}</span>` : ''}
                  ${durada ? `<span class="tag-badge">⏱️ ${durada}</span>` : ''}
                </div>
                <h1 class="detail-page-title">${title}</h1>
                ${intro ? `<p class="detail-intro">${intro}</p>` : ''}
              </div>
              <div class="prose">
                ${content}
              </div>
            </article>
          </main>
          <site-footer></site-footer>
        `;
      });
    }
  }

  // 6. Plantilla de pàgina de situació d'aprenentatge
  class SituationPage extends HTMLElement {
    connectedCallback() {
      const title = this.getAttribute('title') || '';
      const robot = (this.getAttribute('robot') || '').toLowerCase();
      const robotLabel = this.getAttribute('robot-label') || '';
      let robotIcon = this.getAttribute('robot-icon') || '';
      if (!robotIcon && robot && robot !== 'desendollat') {
        robotIcon = `${robot}.png`;
      }
      const cicleLabel = this.getAttribute('cicle-label') || this.getAttribute('cicle') || '';
      const materiaLabel = this.getAttribute('materia-label') || this.getAttribute('materia') || '';
      const tematicaLabel = this.getAttribute('tematica-label') || this.getAttribute('tematica') || '';
      const durada = this.getAttribute('durada') || this.getAttribute('sessions') || '';
      const repte = this.getAttribute('repte') || '';
      const root = cleanRoot(this.getAttribute('root') || '../../');
      const backHref = this.getAttribute('back-href') || `${root}situacions-aprenentatge/index.html`;
      const backLabel = this.getAttribute('back-label') || "Situacions d'Aprenentatge";
      const description = this.getAttribute('description') || repte;

      ensureDocumentHead(root, title, description);

      deferRender(this, () => {
        const content = this.innerHTML;
        const hasRepteInContent = content.includes('sa-challenge') || content.includes('Repte o Pregunta Guia');
        const repteHtml = (repte && !hasRepteInContent) ? `
          <section class="detail-section">
            <h2>❓ Repte o Pregunta Guia</h2>
            <p class="sa-challenge">"${repte}"</p>
          </section>
        ` : '';

        this.innerHTML = `
          <site-header active="situacions" root="${root}"></site-header>
          <main class="container page-content">
            <nav-back href="${backHref}" label="${backLabel}"></nav-back>
            <article class="detail-page-card">
              <div class="detail-page-header">
                <div class="detail-page-badges">
                  ${robotLabel ? `
                    <span class="tag-badge primary">
                      ${robotIcon ? `<img src="${root}_assets/icons/${robotIcon}" alt="" class="tag-badge-icon" width="20" height="20">` : ''}${robotLabel}
                    </span>
                  ` : ''}
                  ${cicleLabel ? `<span class="tag-badge">${cicleLabel}</span>` : ''}
                  ${materiaLabel ? `<span class="tag-badge">${materiaLabel}</span>` : ''}
                  ${durada ? `<span class="tag-badge">⏱️ ${durada}</span>` : ''}
                </div>
                <h1 class="detail-page-title">${title}</h1>
                ${tematicaLabel ? `<span class="tag-badge">🏷️ ${tematicaLabel}</span>` : ''}
              </div>
              <div class="prose">
                ${repteHtml}
                ${content}
              </div>
            </article>
          </main>
          <site-footer></site-footer>
        `;
      });
    }
  }

  // 7. Plantilla de pàgina de guia didàctica
  class GuidePage extends HTMLElement {
    connectedCallback() {
      const title = this.getAttribute('title') || '';
      const tag = this.getAttribute('tag') || '';
      const active = (this.getAttribute('active') || 'inici').toLowerCase();
      const root = cleanRoot(this.getAttribute('root') || '../../');
      const backHref = this.getAttribute('back-href') || `${root}index.html`;
      const backLabel = this.getAttribute('back-label') || 'Inici';
      const description = this.getAttribute('description') || '';

      ensureDocumentHead(root, title, description);

      deferRender(this, () => {
        const content = this.innerHTML;
        this.innerHTML = `
          <site-header active="${active}" root="${root}"></site-header>
          <main class="container page-content">
            <nav-back href="${backHref}" label="${backLabel}"></nav-back>
            <article class="detail-page-card">
              <div class="detail-page-header">
                ${tag ? `<div class="detail-page-badges"><span class="tag-badge primary">${tag}</span></div>` : ''}
                <h1 class="detail-page-title">${title}</h1>
              </div>
              <div class="prose">
                ${content}
              </div>
            </article>
          </main>
          <site-footer></site-footer>
        `;
      });
    }
  }

  // 8. Reixa d'activitats generada automàticament
  class ActivityGrid extends HTMLElement {
    connectedCallback() {
      const root = cleanRoot(this.getAttribute('root') || '../');
      loadCatalogData(root, () => this.render(root));
    }
    render(root) {
      const items = (window.CATALEG && window.CATALEG.activitats) || [];
      this.innerHTML = `
        <div class="clean-grid">
          ${items.map(item => `
            <a id="${item.id}" href="${root}${item.url}" class="item-card">
              <div class="card-top">
                <span class="tag-badge primary">${item.tag}</span>
                ${item.cicle ? `<span class="tag-badge">${item.cicle}</span>` : ''}
              </div>
              <h3 class="item-title">${item.titol}</h3>
              <p class="item-desc">${item.descripcio || ''}</p>
              <div class="item-footer">
                <span>⏱️ ${item.durada}</span>
                <span>Veure activitat →</span>
              </div>
            </a>
          `).join('')}
        </div>
      `;
    }
  }

  // 9. Reixa de situacions generada automàticament amb filtres
  class SituationGrid extends HTMLElement {
    connectedCallback() {
      const root = cleanRoot(this.getAttribute('root') || '../');
      loadCatalogData(root, () => this.render(root));
    }
    render(root) {
      const items = (window.CATALEG && window.CATALEG.situacions) || [];
      this.innerHTML = `
        <div class="clean-grid" id="situations-grid">
          ${items.map(item => `
            <a id="${item.id}" href="${root}${item.url}" class="item-card sa-card"
               data-robot="${item.robot}" data-cicle="${item.cicle}"
               data-tematica="${item.tematica}" data-materia="${item.materia}">
              <div class="card-top">
                <div class="card-robot-info">
                  ${item.robot && item.robot !== 'desendollat' ? `<img src="${root}_assets/icons/${item.robot}.png" alt="" class="card-robot-sa-icon" width="40" height="40">` : ''}
                  <span class="tag-badge primary">${item.robotLabel}</span>
                </div>
                <span class="tag-badge">${item.cicleLabel}</span>
              </div>
              <h3 class="item-title">${item.titol}</h3>
              <div class="sa-challenge">"${item.repte}"</div>
              <div class="card-tags">
                <span class="tag-pill">${item.materiaLabel}</span>
                <span class="tag-pill">${item.tematicaLabel}</span>
              </div>
              <div class="item-footer">
                <span>⏱️ ${item.sessions || item.durada}</span>
                <span>Obrir situació →</span>
              </div>
            </a>
          `).join('')}
        </div>
      `;
      if (typeof window.initSituationFilters === 'function') {
        window.initSituationFilters();
      }
    }
  }

  // 10. Reixa de tutorials generada automàticament per a robots
  class TutorialGrid extends HTMLElement {
    connectedCallback() {
      const root = cleanRoot(this.getAttribute('root') || '../../');
      const robot = (this.getAttribute('robot') || '').toLowerCase();
      loadCatalogData(root, () => this.render(root, robot));
    }
    render(root, robot) {
      let items = (window.CATALEG && window.CATALEG.tutorials) || [];
      if (robot) {
        items = items.filter(it => it.robot === robot);
      }
      this.innerHTML = `
        <div class="clean-grid">
          ${items.map(item => `
            <a id="${item.id}" href="${root}${item.url}" class="item-card tutorial-card">
              <div class="card-top">
                <div class="card-badges">
                  <span class="tag-badge primary">${item.dificultat}</span>
                  <span class="tag-badge">⏱️ ${item.durada}</span>
                </div>
                ${item.robot ? `<img src="${root}_assets/icons/${item.robot}.png" alt="" class="card-robot-icon" width="36" height="36">` : ''}
              </div>
              <h3 class="item-title">${item.titol}</h3>
              <p class="item-desc">${item.descripcio || ''}</p>
              <div class="item-footer">
                <span>Pas a pas d'aula</span>
                <span>Obrir tutorial →</span>
              </div>
            </a>
          `).join('')}
        </div>
      `;
    }
  }

  // Registre de tots els Custom Elements
  const defs = [
    ['site-header', SiteHeader],
    ['site-footer', SiteFooter],
    ['nav-back', NavBack],
    ['activity-page', ActivityPage],
    ['tutorial-page', TutorialPage],
    ['situation-page', SituationPage],
    ['guide-page', GuidePage],
    ['activity-grid', ActivityGrid],
    ['situation-grid', SituationGrid],
    ['tutorial-grid', TutorialGrid]
  ];

  defs.forEach(([tag, cls]) => {
    if (!customElements.get(tag)) {
      customElements.define(tag, cls);
    }
  });
})();
