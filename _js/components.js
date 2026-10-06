// _js/components.js - Components Web Natius per a Robòtica²⁰⁰


(function () {
  'use strict';

  function cleanRoot(root) {
    if (root === null || root === undefined) root = '';
    if (root && !root.endsWith('/')) root += '/';
    return root;
  }

  function escapeTemplate(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
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

  function loadMarkdownRenderer(root) {
    if (window.RoboticsMarkdown) return Promise.resolve(window.RoboticsMarkdown);
    if (window._roboticsMarkdownLoading) return window._roboticsMarkdownLoading;
    window._roboticsMarkdownLoading = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-robotics-markdown]');
      const script = existing || document.createElement('script');
      script.src = `${cleanRoot(root)}_js/markdown.js`;
      script.dataset.roboticsMarkdown = 'true';
      script.onload = () => window.RoboticsMarkdown ? resolve(window.RoboticsMarkdown) : reject(new Error('No s’ha pogut inicialitzar el renderitzador Markdown.'));
      script.onerror = () => reject(new Error('No s’ha pogut carregar _js/markdown.js.'));
      if (!existing) document.head.appendChild(script);
    });
    return window._roboticsMarkdownLoading;
  }

  function loadSituationTemplates(root) {
    if (window._roboticsSituationTemplatesLoading) return window._roboticsSituationTemplatesLoading;
    const templateURL = `${cleanRoot(root)}_templates/situation-page.html`;
    window._roboticsSituationTemplatesLoading = fetch(templateURL)
      .then(response => {
        if (!response.ok) throw new Error(`No s’han pogut carregar les plantilles (${response.status}).`);
        return response.text();
      })
      .then(source => {
        const parsed = new DOMParser().parseFromString(source, 'text/html');
        for (const id of ['situation-page-template', 'situation-page-loading-template', 'situation-page-error-template']) {
          if (!parsed.getElementById(id)) throw new Error(`Falta la plantilla ${id}.`);
        }
        return parsed;
      })
      .catch(error => {
        window._roboticsSituationTemplatesLoading = null;
        throw error;
      });
    return window._roboticsSituationTemplatesLoading;
  }

  function clonePageTemplate(templates, id) {
    const template = templates.getElementById(id);
    if (!template || !template.content) throw new Error(`No està disponible la plantilla ${id}.`);
    return template.content.cloneNode(true);
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

  // 2a. Mini-robots isomètrics low-poly animats del peu de pàgina
  // Cada robot és un SVG pla de pocs polígons (cares superior/esquerra/dreta d'una caixa isomètrica a 30°)
  const isoBox = (cx, ty, s, h, [top, left, right]) => {
    const w = +(s * 0.866).toFixed(1), hh = s / 2;
    return `<polygon fill="${top}" points="${cx},${ty - hh} ${cx + w},${ty} ${cx},${ty + hh} ${cx - w},${ty}"/>` +
      `<polygon fill="${left}" points="${cx - w},${ty} ${cx},${ty + hh} ${cx},${ty + hh + h} ${cx - w},${ty + h}"/>` +
      `<polygon fill="${right}" points="${cx},${ty + hh} ${cx + w},${ty} ${cx + w},${ty + h} ${cx},${ty + hh + h}"/>`;
  };

  const footerBot = ({ c, accent, cargo }) => `
    <svg class="fbot-svg" viewBox="0 0 48 60" focusable="false">
      <g data-part="body">
        ${isoBox(24, 44, 13, 4, ['#475569', '#334155', '#1e293b'])}
        ${isoBox(24, 30, 12, 14, c)}
        <g data-part="arm"><polygon fill="${accent}" points="33,33.5 36.5,31.5 36.5,40.5 33,42.5"/></g>
        <g data-part="head">
          ${isoBox(24, 21, 8, 9, c)}
          <g data-part="eyes" fill="#e0f2fe">
            <polygon points="25.4,27.2 29.5,24.8 29.5,27.8 25.4,30.2"/>
            <polygon points="18.5,24.8 22.6,27.2 22.6,30.2 18.5,27.8"/>
          </g>
          <polygon fill="#334155" points="23.4,17 24.6,17 24.6,11 23.4,11"/>
          <polygon data-part="led" fill="${accent}" points="24,7 26.2,9.5 24,12 21.8,9.5"/>
        </g>
        <g data-part="cargo" opacity="0">${isoBox(24, -8, 8, 6, cargo)}</g>
      </g>
    </svg>`;

  // Paletes oficials: [superior, esquerra, dreta], accent i bloc de càrrega
  const FOOTER_BOTS = [
    { c: ['#ff5a5f', '#e4242b', '#b3151b'], accent: '#fec002', cargo: ['#ffe066', '#fec002', '#c99700'] },
    { c: ['#ffa368', '#fc8439', '#d4621c'], accent: '#804cbd', cargo: ['#a77fd6', '#804cbd', '#5c3394'] },
    { c: ['#8bd152', '#60a62d', '#437a1c'], accent: '#fc7813', cargo: ['#ffb066', '#fc7813', '#c95a08'] },
    { c: ['#3d9cf0', '#0079dc', '#005aa6'], accent: '#fdc80a', cargo: ['#ffe066', '#fdc80a', '#c99a00'] },
    { c: ['#ef54b8', '#d82098', '#a3126f'], accent: '#fddc3e', cargo: ['#fff07a', '#fddc3e', '#cfae12'] },
    { c: ['#7a828f', '#4a515d', '#30353d'], accent: '#047fdf', cargo: ['#4aa8f2', '#047fdf', '#0360a8'] }
  ];

  // Motor de comportament: cada robot tria accions aleatòries i s'anima amb requestAnimationFrame
  const FooterRobots = (() => {
    const BOT_W = 44;
    const rand = (a, b) => a + Math.random() * (b - a);
    const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const env = p => Math.min(1, Math.sin(Math.PI * p) * 3); // entrada/sortida suau
    const ACTIONS = [
      ['walk', 4], ['hop', 2], ['wave', 2], ['scan', 2], ['dance', 1.5], ['lift', 1.5], ['idle', 2]
    ];
    const DUR = { walk: [1800, 3500], hop: [900, 900], wave: [1800, 2600], scan: [2000, 3200], dance: [2400, 3600], lift: [2600, 3800], idle: [600, 1800] };

    const pick = () => {
      const total = ACTIONS.reduce((s, a) => s + a[1], 0);
      let r = Math.random() * total;
      for (const [name, w] of ACTIONS) { if ((r -= w) <= 0) return name; }
      return 'idle';
    };

    function start(stage) {
      const bots = Array.from(stage.querySelectorAll('.fbot')).map((el, i, all) => {
        const part = n => el.querySelector(`[data-part="${n}"]`);
        const home = (i + 0.5) / all.length;
        return {
          el, home, x: home, x0: home, x1: home, dir: Math.random() < 0.5 ? 1 : -1,
          body: part('body'), head: part('head'), arm: part('arm'), eyes: part('eyes'), led: part('led'), cargo: part('cargo'),
          action: 'idle', t0: 0, dur: rand(200, 1500), nextBlink: rand(500, 4000), ledPhase: rand(0, 1000)
        };
      });

      let width = stage.clientWidth;
      let visible = true;
      let rafId = null;
      if ('ResizeObserver' in window) new ResizeObserver(() => { width = stage.clientWidth; }).observe(stage);
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(([e]) => {
          visible = e.isIntersecting;
          if (visible && rafId === null) rafId = requestAnimationFrame(frame);
        }).observe(stage);
      }

      function begin(b, now) {
        b.action = b.action === 'idle' ? pick() : 'idle';
        b.t0 = now;
        const [lo, hi] = DUR[b.action];
        b.dur = rand(lo, hi);
        if (b.action === 'walk') {
          const span = 0.5 / bots.length + 0.06;
          b.x0 = b.x;
          b.x1 = Math.max(0.02, Math.min(0.98, b.home + rand(-span, span)));
          b.dir = b.x1 >= b.x0 ? 1 : -1;
        }
      }

      function animate(b, now) {
        let p = (now - b.t0) / b.dur;
        if (p >= 1) { begin(b, now); p = 0; }

        let body = '', head = '', arm = 0, cargoOp = 0, cargoY = 0, ledSpeed = 800;
        const e = env(p);

        switch (b.action) {
          case 'walk': {
            b.x = b.x0 + (b.x1 - b.x0) * ease(p);
            body = `translate(0 ${(-Math.abs(Math.sin(p * b.dur / 170 * Math.PI)) * 1.6).toFixed(2)})`;
            arm = Math.sin(p * b.dur / 170 * Math.PI) * 12;
            break;
          }
          case 'hop': {
            let y = 0, sx = 1, sy = 1;
            if (p < 0.18) { const q = p / 0.18; sx = 1 + 0.1 * q; sy = 1 - 0.14 * q; }
            else if (p < 0.82) { const q = (p - 0.18) / 0.64; y = -18 * Math.sin(Math.PI * q); sx = 1 - 0.05 * Math.sin(Math.PI * q); sy = 1 + 0.07 * Math.sin(Math.PI * q); }
            else { const q = (p - 0.82) / 0.18; sx = 1 + 0.08 * (1 - q); sy = 1 - 0.1 * (1 - q); }
            body = `translate(0 ${y.toFixed(2)}) translate(24 56) scale(${sx.toFixed(3)} ${sy.toFixed(3)}) translate(-24 -56)`;
            arm = -40 * Math.sin(Math.PI * p);
            break;
          }
          case 'wave':
            arm = e * (-115 + 18 * Math.sin(p * b.dur / 140));
            head = `rotate(${(e * 6).toFixed(2)} 24 30)`;
            break;
          case 'scan':
            head = `rotate(${(e * 15 * Math.sin(p * Math.PI * 4)).toFixed(2)} 24 30)`;
            ledSpeed = 180;
            break;
          case 'dance': {
            const s = Math.sin(p * b.dur / 300 * Math.PI);
            body = `translate(0 ${(-Math.abs(s) * 3 * e).toFixed(2)}) rotate(${(s * 8 * e).toFixed(2)} 24 56)`;
            head = `rotate(${(-s * 10 * e).toFixed(2)} 24 30)`;
            arm = -60 * e + s * 30 * e;
            break;
          }
          case 'lift':
            arm = -150 * e + 8 * Math.sin(p * Math.PI * 4) * e;
            cargoOp = e;
            cargoY = (1 - e) * 10 - 3 * Math.sin(p * Math.PI * 4);
            ledSpeed = 400;
            break;
          default: // idle: petita respiració
            body = `translate(0 ${(Math.sin(now / 500 + b.home * 10) * 0.6).toFixed(2)})`;
        }

        // Parpelleig
        let eyeScale = 1;
        if (now > b.nextBlink) {
          const k = (now - b.nextBlink) / 140;
          if (k >= 1) b.nextBlink = now + rand(2000, 6000);
          else eyeScale = 0.15 + 0.85 * Math.abs(1 - 2 * k);
        }

        const px = b.x * Math.max(0, width - BOT_W);
        b.el.style.transform = `translateX(${px.toFixed(1)}px) scaleX(${b.dir})`;
        b.body.setAttribute('transform', body);
        b.head.setAttribute('transform', head);
        b.arm.setAttribute('transform', `rotate(${arm.toFixed(2)} 35 32.5)`);
        b.eyes.setAttribute('transform', `translate(0 27.5) scale(1 ${eyeScale.toFixed(2)}) translate(0 -27.5)`);
        b.cargo.setAttribute('opacity', cargoOp.toFixed(2));
        b.cargo.setAttribute('transform', `translate(0 ${cargoY.toFixed(2)})`);
        b.led.setAttribute('opacity', Math.floor((now + b.ledPhase) / ledSpeed) % 2 ? '0.35' : '1');
      }

      function frame(now) {
        if (!visible) { rafId = null; return; }
        bots.forEach(b => {
          if (b.el.offsetParent === null) return; // ocult (p. ex. mòbil)
          animate(b, now);
        });
        rafId = requestAnimationFrame(frame);
      }
      rafId = requestAnimationFrame(frame);
    }

    return { start };
  })();

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
              <div class="footer-robots" aria-hidden="true">
                ${FOOTER_BOTS.map(b => `<div class="fbot">${footerBot(b)}</div>`).join('')}
              </div>
          </div>
        </footer>
      `;
      const stage = this.querySelector('.footer-robots');
      if (stage) FooterRobots.start(stage);
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
      const root = cleanRoot(this.getAttribute('root') || '../');
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
      const root = cleanRoot(this.getAttribute('root') || '../');
      const backHref = this.getAttribute('back-href') || `${root}situacions-aprenentatge/index.html`;
      const backLabel = this.getAttribute('back-label') || "Situacions d'Aprenentatge";
      const requestedId = new URLSearchParams(window.location.search).get('id') || '';
      const safeId = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(requestedId) ? requestedId : '';
      const contentSource = safeId ? `${root}_content/situacions/${safeId}.md` : '';

      deferRender(this, async () => {
        const showError = async (title, message, help = '') => {
          this.removeAttribute('aria-busy');
          try {
            const templates = await loadSituationTemplates(root);
            const fragment = clonePageTemplate(templates, 'situation-page-error-template');
            const back = fragment.querySelector('[data-back-navigation]');
            back.setAttribute('href', backHref);
            back.setAttribute('label', backLabel);
            fragment.querySelector('[data-error-title]').textContent = title;
            fragment.querySelector('[data-error-message]').textContent = message;
            const helpElement = fragment.querySelector('[data-error-help]');
            helpElement.textContent = help;
            helpElement.hidden = !help;
            this.replaceChildren(fragment);
          } catch (templateError) {
            this.textContent = `${title}. ${message}`;
          }
        };

        this.setAttribute('aria-busy', 'true');
        if (!contentSource) {
          await showError('Situació no indicada', 'Tria una situació des del catàleg per a obrir-ne el contingut.');
          return;
        }

        try {
          const [renderer, templates] = await Promise.all([loadMarkdownRenderer(root), loadSituationTemplates(root)]);
          this.replaceChildren(clonePageTemplate(templates, 'situation-page-loading-template'));
          const response = await fetch(contentSource);
          if (!response.ok) throw new Error(`No s’ha pogut carregar el contingut (${response.status}).`);
          const source = await response.text();
          const parsed = renderer.parse(source, response.url);
          const fragment = clonePageTemplate(templates, 'situation-page-template');
          const header = fragment.querySelector('[data-site-header]');
          header.setAttribute('root', root);
          const back = fragment.querySelector('[data-back-navigation]');
          back.setAttribute('href', backHref);
          back.setAttribute('label', backLabel);

          const value = (key, fallback = '') => String(parsed.data[key] || fallback || '').trim();
          fragment.querySelector('[data-title]').textContent = value('title', safeId);
          const badges = fragment.querySelector('[data-badges]');
          const appendBadge = (label, { primary = false, icon = '', prefix = '' } = {}) => {
            if (!label) return;
            const badge = document.createElement('span');
            badge.className = `tag-badge${primary ? ' primary' : ''}`;
            if (icon) {
              const image = document.createElement('img');
              const safeIcon = /^[a-z0-9-]+\.(?:png|svg)$/i.test(icon) ? icon : '';
              if (safeIcon) {
                image.src = `${root}_assets/icons/${safeIcon}`;
                image.alt = '';
                image.className = 'tag-badge-icon';
                image.width = 20;
                image.height = 20;
                badge.appendChild(image);
              }
            }
            badge.appendChild(document.createTextNode(`${prefix}${label}`));
            badges.appendChild(badge);
          };
          const robot = value('robot').toLowerCase();
          const robotIcon = value('robot_icon', robot ? `${robot}.png` : '');
          appendBadge(value('robot_label', robot), { primary: true, icon: robotIcon });
          appendBadge(value('cycle_label', value('cycle')));
          appendBadge(value('subject_label', value('subject')));
          appendBadge(value('duration', value('sessions')), { prefix: '⏱️ ' });

          const theme = fragment.querySelector('[data-theme]');
          const themeLabel = value('theme_label', value('theme'));
          if (themeLabel) {
            theme.textContent = `🏷️ ${themeLabel}`;
            theme.hidden = false;
          }

          const challenge = value('challenge');
          const contentHasChallenge = parsed.html.includes('sa-challenge') || /Repte o pregunta guia/i.test(parsed.html);
          if (challenge && !contentHasChallenge) {
            fragment.querySelector('[data-challenge]').textContent = challenge;
            fragment.querySelector('[data-challenge-section]').hidden = false;
          }
          fragment.querySelector('[data-markdown-content]').innerHTML = parsed.html;

          const description = value('description', challenge);
          ensureDocumentHead(root, value('title'), description);
          if (parsed.data.title) document.title = `${parsed.data.title} | Situació d’aprenentatge | Robòtica²⁰⁰`;
          const descriptionTag = document.querySelector('meta[name="description"]');
          if (descriptionTag && description) descriptionTag.content = description;
          this.replaceChildren(fragment);
          this.removeAttribute('aria-busy');
        } catch (error) {
          console.error('Error carregant la situació en Markdown:', error);
          await showError('No s’ha pogut carregar aquesta situació', error.message || 'Comprova la connexió local i el fitxer de contingut.', 'Recarrega la pàgina quan el fitxer Markdown estiga disponible.');
        }
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
                  ${item.robot ? `<img src="${root}_assets/icons/${item.robot}.png" alt="" class="card-robot-sa-icon" width="36" height="36">` : ''}
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
        <div class="clean-grid tutorial-grid">
          ${items.map(item => {
            const difClass = (item.dificultat || '')
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/\s+/g, '-');
            const imgSrc = item.imatge ? `${root}${item.imatge}` : `${root}_assets/robots/${item.robot}.png`;
            return `
              <article id="${item.id}" class="tutorial-card">
                <div class="card-top">
                  <div class="card-badges">
                    <span class="tag-badge badge-${difClass}">${item.dificultat}</span>
                    <span class="tag-badge badge-durada">⏱️ ${item.durada}</span>
                  </div>
                  ${item.robot ? `<img src="${root}_assets/icons/${item.robot}.svg" alt="" class="card-robot-icon" width="28" height="28">` : ''}
                </div>
                <a href="${root}${item.url}" class="tutorial-card-media-link" aria-label="${item.titol}">
                  <div class="tutorial-card-media">
                    <img src="${imgSrc}" alt="${item.titol}" class="tutorial-card-img" loading="lazy">
                  </div>
                </a>
                <h3 class="tutorial-card-title">
                  <a href="${root}${item.url}">${item.titol}</a>
                </h3>
                <p class="tutorial-card-desc">${item.descripcio || ''}</p>
                <div class="tutorial-card-footer">
                  <a href="${root}${item.url}" class="btn-step-by-step">Pas a pas d'aula →</a>
                  <a href="${root}${item.url}" class="btn-open-tutorial">Obrir tutorial →</a>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      `;
    }
  }

  // 11. Guions d'accent cromàtics STEAM
  class AccentDashes extends HTMLElement {
    connectedCallback() {
      this.classList.add('accent-dashes');
      this.setAttribute('aria-hidden', 'true');
      this.innerHTML = `
        <span class="dash dash-red"></span>
        <span class="dash dash-yellow"></span>
        <span class="dash dash-blue"></span>
      `;
    }
  }

  // 12. Hero per a la pàgina de robot individual
  class RobotHero extends HTMLElement {
    connectedCallback() {
      const root = cleanRoot(this.getAttribute('root') || '../../');
      const robot = (this.getAttribute('robot') || '').toLowerCase();
      let title = this.getAttribute('title') || '';
      let subtitle = this.getAttribute('subtitle') || this.getAttribute('sub') || '';
      const backHref = this.getAttribute('back-href') || `${root}robotica-educativa/index.html`;
      const backLabel = this.getAttribute('back-label') || 'Robòtica educativa';

      const renderHero = () => {
        if (!title || !subtitle) {
          const robots = (window.CATALEG && window.CATALEG.robots) || [];
          const found = robots.find(r => r.slug === robot);
          if (found) {
            if (!title) title = found.nom;
            if (!subtitle) subtitle = found.descripcio;
          }
        }
        if (!title) {
          title = robot.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }

        this.classList.add('robot-hero');
        if (robot) {
          this.classList.add(`robot-hero-${robot}`);
          this.setAttribute('data-robot', robot);
        }
        this.innerHTML = `
          <div class="container robot-hero-inner">
            <nav-back href="${backHref}" label="${backLabel}"></nav-back>
            <div class="robot-hero-content">
              <h1 class="robot-hero-title">${title}</h1>
              ${subtitle ? `<p class="robot-hero-sub">${subtitle}</p>` : ''}
              <accent-dashes></accent-dashes>
            </div>
            <div class="robot-hero-media">
              <img src="${root}_assets/robots/${robot}.png" alt="${title}" class="robot-hero-img" width="600" height="448">
            </div>
          </div>
        `;
      };

      if (!title || !subtitle) {
        loadCatalogData(root, renderHero);
      } else {
        renderHero();
      }
    }
  }

  // 12b. Perfil i introducció del robot
  class RobotProfile extends HTMLElement {
    connectedCallback() {
      const root = cleanRoot(this.getAttribute('root') || '../../');
      const robot = (this.getAttribute('robot') || '').toLowerCase();
      const prefixMap = {
        'coding-express': 'ce',
        'tale-bot': 'tb',
        'coding-set': 'cs',
        'codey-rocky': 'cr',
        'spike': 'sp',
        'microbit': 'mb'
      };
      const prefix = prefixMap[robot] || '';

      this.classList.add('robot-profile');
      if (prefix) {
        this.classList.add(`robot-${prefix}`);
      }
      if (robot) {
        this.setAttribute('data-robot', robot);
      }

      deferRender(this, () => {
        const pElem = this.querySelector(':scope > p') || this.querySelector('.robot-profile-desc > p');
        const introHtml = pElem ? pElem.innerHTML : (this.getAttribute('intro') || '');

        const sectionElem = this.querySelector('section.robot-detail-section') || this.querySelector('section.detail-section') || this.querySelector('section');
        let titleHtml = '';
        let textHtml = '';

        if (sectionElem) {
          const hElem = sectionElem.querySelector('h2, h3');
          if (hElem) titleHtml = hElem.innerHTML;
          const bodyPElem = sectionElem.querySelector('.robot-detail-section-body p') || sectionElem.querySelector('.detail-section-body p') || sectionElem.querySelector('p');
          if (bodyPElem) textHtml = bodyPElem.innerHTML;
        }

        if (!titleHtml) titleHtml = this.getAttribute('detail-title') || this.getAttribute('title') || '';
        if (!textHtml) textHtml = this.getAttribute('detail-text') || '';

        const iconPath = this.getAttribute('icon') || `${root}_assets/icons/pack/bulb.png`;

        this.innerHTML = `
          <div class="robot-profile-desc">
            <p>${introHtml}</p>
            <section class="robot-detail-section">
              <div class="robot-detail-section-icon" aria-hidden="true">
                <img src="${iconPath}" alt="" width="34" height="34" class="robot-detail-section-icon-img">
              </div>
              <div class="robot-detail-section-body">
                <h2>${titleHtml}</h2>
                <p>${textHtml}</p>
              </div>
            </section>
          </div>
        `;
      });
    }
  }

  // 13. Targeta individual de robot
  class RobotCard extends HTMLElement {
    connectedCallback() {
      const root = cleanRoot(this.getAttribute('root') || '../');
      const robotSlug = (this.getAttribute('robot') || '').toLowerCase();
      loadCatalogData(root, () => this.render(root, robotSlug));
    }
    render(root, robotSlug) {
      const robots = (window.CATALEG && window.CATALEG.robots) || [];
      const item = robots.find(r => r.slug === robotSlug);
      if (!item) return;
      const tutorials = (window.CATALEG && window.CATALEG.tutorials) || [];
      const tCount = item.tutorials !== undefined ? item.tutorials : tutorials.filter(t => t.robot === item.slug).length;

      this.innerHTML = `
        <a id="${item.id}" href="${root}${item.url}" class="robot-card robot-${item.prefix}">
          <div class="robot-card-media">
            <span class="robot-age-badge"><span class="badge-icon">👤</span> ${item.edat}</span>
            <img src="${root}_assets/robots/${item.slug}.png" alt="${item.nom}" class="robot-card-img" width="400" height="225" loading="lazy">
          </div>
          <div class="robot-card-body">
            <div class="robot-color-dots">
              <span class="dot dot-1"></span>
              <span class="dot dot-2"></span>
            </div>
            <h3 class="robot-card-title">${item.nom}</h3>
            <p class="robot-card-desc">${item.descripcio}</p>
            <div class="robot-card-footer">
              <span class="robot-tutorials-count">
                <svg class="icon-book" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                ${tCount} tutorial${tCount === 1 ? '' : 's'}
              </span>
              <span class="robot-card-action">Entrar a la pàgina →</span>
            </div>
          </div>
        </a>
      `;
    }
  }

  // 14. Graella de targetes de robots educatius
  class RobotGrid extends HTMLElement {
    connectedCallback() {
      const root = cleanRoot(this.getAttribute('root') || '../');
      loadCatalogData(root, () => this.render(root));
    }
    render(root) {
      const items = (window.CATALEG && window.CATALEG.robots) || [];
      const tutorials = (window.CATALEG && window.CATALEG.tutorials) || [];
      this.innerHTML = `
        <div class="clean-grid">
          ${items.map(item => {
            const tCount = item.tutorials !== undefined ? item.tutorials : tutorials.filter(t => t.robot === item.slug).length;
            return `
              <a id="${item.id}" href="${root}${item.url}" class="robot-card robot-${item.prefix}">
                <div class="robot-card-media">
                  <span class="robot-age-badge"><span class="badge-icon">👤</span> ${item.edat}</span>
                  <img src="${root}_assets/robots/${item.slug}.png" alt="${item.nom}" class="robot-card-img" width="400" height="225" loading="lazy">
                </div>
                <div class="robot-card-body">
                  <div class="robot-color-dots">
                    <span class="dot dot-1"></span>
                    <span class="dot dot-2"></span>
                  </div>
                  <h3 class="robot-card-title">${item.nom}</h3>
                  <p class="robot-card-desc">${item.descripcio}</p>
                  <div class="robot-card-footer">
                    <span class="robot-tutorials-count">
                      <svg class="icon-book" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                      ${tCount} tutorial${tCount === 1 ? '' : 's'}
                    </span>
                    <span class="robot-card-action">Entrar a la pàgina →</span>
                  </div>
                </div>
              </a>
            `;
          }).join('')}
        </div>
      `;
    }
  }

  // 15. Barra de filtres dinàmics per a situacions d'aprenentatge
  class SituationFilters extends HTMLElement {
    connectedCallback() {
      const root = cleanRoot(this.getAttribute('root') || '../');
      loadCatalogData(root, () => this.render(root));
    }
    render(root) {
      const situacions = (window.CATALEG && window.CATALEG.situacions) || [];

      // 1. Robots: ordre oficial d'edat + desendollat
      const robotOrder = ['coding-express', 'tale-bot', 'coding-set', 'codey-rocky', 'spike', 'microbit', 'desendollat'];
      const robotMap = new Map();
      robotMap.set('coding-express', 'Coding Express');
      robotMap.set('tale-bot', 'Tale-Bot');
      robotMap.set('coding-set', 'Coding Set');
      robotMap.set('codey-rocky', 'Codey Rocky');
      robotMap.set('spike', 'Spike');
      robotMap.set('microbit', 'Micro:bit');
      robotMap.set('desendollat', 'Desendollat (Sense robot)');

      situacions.forEach(s => {
        if (s.robot && !robotMap.has(s.robot)) {
          robotMap.set(s.robot, s.robotLabel || s.robot);
        }
      });

      const robotOptions = Array.from(robotMap.entries()).sort((a, b) => {
        const ia = robotOrder.indexOf(a[0]);
        const ib = robotOrder.indexOf(b[0]);
        if (ia !== -1 && ib !== -1) return ia - ib;
        if (ia !== -1) return -1;
        if (ib !== -1) return 1;
        return a[1].localeCompare(b[1]);
      });

      // 2. Cicles: 4 nivells educatius oficials estrictes
      const cicleOptions = [
        ['infantil', 'Educació Infantil'],
        ['primer-cicle', 'Primer cicle'],
        ['segon-cicle', 'Segon cicle'],
        ['tercer-cicle', 'Tercer cicle']
      ];

      // 3. Temàtiques: canòniques + situacions
      const tematicaCanonical = {
        'sostenibilitat': 'Medi ambient i sostenibilitat',
        'ciutat': 'Ciutat intel·ligent i accessibilitat',
        'salut': 'Salut, hàbits i benestar',
        'art': 'Art, música i expressió',
        'espai': 'Exploració espacial',
        'societat': 'Convivència i ciutadania'
      };
      const tematicaMap = new Map(Object.entries(tematicaCanonical));
      situacions.forEach(s => {
        if (s.tematica && !tematicaMap.has(s.tematica)) {
          tematicaMap.set(s.tematica, s.tematicaLabel || s.tematica);
        }
      });

      // 4. Matèries: canòniques + situacions
      const materiaCanonical = {
        'medi': 'Coneixement del Medi / Ciències',
        'matematiques': 'Matemàtiques',
        'llengua': 'Llengua i Literatura',
        'artistica': 'Educació Artística',
        'tecnologia': 'Tecnologia i Digitalització'
      };
      const materiaMap = new Map(Object.entries(materiaCanonical));
      situacions.forEach(s => {
        if (s.materia && !materiaMap.has(s.materia)) {
          materiaMap.set(s.materia, s.materiaLabel || s.materia);
        }
      });

      const count = situacions.length;

      this.innerHTML = `
        <div class="filters-bar">
          <div class="filter-group">
            <label class="filter-label" for="filter-robot" style="display: flex; align-items: center; gap: 0.5rem;">
              <img src="${root}_assets/icons/pack/robot.png" alt="" class="filter-label-icon" height="36">
              Robot
            </label>
            <select id="filter-robot" class="filter-select">
              <option value="all">Tots els robots</option>
              ${robotOptions.map(([val, label]) => `<option value="${val}">${label}</option>`).join('')}
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label" for="filter-cicle" style="display: flex; align-items: center; gap: 0.5rem;">
              <img src="${root}_assets/icons/pack/cicle.png" alt="" class="filter-label-icon" height="36">
              Cicle
            </label>
            <select id="filter-cicle" class="filter-select">
              <option value="all">Tots els cicles</option>
              ${cicleOptions.map(([val, label]) => `<option value="${val}">${label}</option>`).join('')}
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label" for="filter-tematica" style="display: flex; align-items: center; gap: 0.5rem;">
              <img src="${root}_assets/icons/pack/tematica.png" alt="" class="filter-label-icon" height="36">
              Temàtica
            </label>
            <select id="filter-tematica" class="filter-select">
              <option value="all">Totes les temàtiques</option>
              ${Array.from(tematicaMap.entries()).map(([val, label]) => `<option value="${val}">${label}</option>`).join('')}
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label" for="filter-materia" style="display: flex; align-items: center; gap: 0.5rem;">
              <img src="${root}_assets/icons/pack/materia.png" alt="" class="filter-label-icon" height="36">
              Matèria
            </label>
            <select id="filter-materia" class="filter-select">
              <option value="all">Totes les matèries</option>
              ${Array.from(materiaMap.entries()).map(([val, label]) => `<option value="${val}">${label}</option>`).join('')}
            </select>
          </div>
          <div class="filter-count">
            <span id="situations-count" role="status" aria-live="polite">Mostrant ${count} de ${count} situacions</span>
            <button type="button" class="btn-reset-filters" id="btn-reset-sa">Restablir filtres</button>
          </div>
        </div>
      `;

      if (typeof window.initSituationFilters === 'function') {
        window.initSituationFilters();
      }
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
    ['tutorial-grid', TutorialGrid],
    ['accent-dashes', AccentDashes],
    ['robot-hero', RobotHero],
    ['robot-profile', RobotProfile],
    ['robot-card', RobotCard],
    ['robot-grid', RobotGrid],
    ['situation-filters', SituationFilters]
  ];

  defs.forEach(([tag, cls]) => {
    if (!customElements.get(tag)) {
      customElements.define(tag, cls);
    }
  });
})();
