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
            <a href="${root}index.html" x-target.push="page-content" class="logo">
              <span class="logo-badge"><img src="${root}_assets/icons/logo.svg" alt="Robòtica200" class="logo-badge-img"></span>
              <div class="logo-text">
                <span class="logo-name">Robòtica<sup>200</sup></span>
                <span class="logo-subtitle">Robòtica per a docents</span>
              </div>
            </a>
            <nav class="header-nav" aria-label="Navegació principal">
              <a href="${root}index.html" x-target.push="page-content" class="nav-btn ${active === 'inici' ? 'active' : ''}">Inici</a>
              <a href="${root}pensament-computacional/index.html" x-target.push="page-content" class="nav-btn ${active === 'pensament' ? 'active' : ''}">Pensament computacional</a>
              <a href="${root}robotica-educativa/index.html" x-target.push="page-content" class="nav-btn ${active === 'robots' || active === 'robotica' || active === 'robotica-educativa' ? 'active' : ''}">Robòtica educativa</a>
              <a href="${root}situacions-aprenentatge/index.html" x-target.push="page-content" class="nav-btn ${active === 'situacions' ? 'active' : ''}">Situacions d'aprenentatge</a>
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
          <a href="${href}" x-target.replace="page-content" class="btn-back">
            <span class="btn-back-arrow" aria-hidden="true">←</span>
            <span class="btn-back-text">${label}</span>
          </a>
        </div>
      `;
    }
  }

  // Pàgines editorials compartides: activitat, tutorial, robot i guia.
  class ContentDetailPage extends HTMLElement {
    connectedCallback() {
      this.loadFromLocation();
    }


    loadFromLocation(routeKind = '') {
      const routeKinds = { activitat: 'activity', tutorial: 'tutorial', robot: 'robot', guia: 'guide' };
      const kind = routeKind ? routeKinds[routeKind] : (this.getAttribute('kind') || '');
      if (kind) this.setAttribute('kind', kind);
      const requestId = (this._detailRequestId || 0) + 1;
      this._detailRequestId = requestId;
      const root = cleanRoot(this.getAttribute('root') || '../');
      const id = new URLSearchParams(window.location.search).get('id') || '';
      const safeId = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) ? id : '';
      const folders = { activity: 'activitats', tutorial: 'tutorials', robot: 'robots', guide: 'pages' };
      const filePrefix = { activity: 'activitat-', tutorial: 'tutorial-', robot: 'robot-', guide: 'guia-' };
      if (!folders[kind]) { this.textContent = 'Tipus de contingut desconegut.'; return; }
      const markdownPath = kind === 'guide'
        ? `${root}_content/pages/guia-${safeId}.md`
        : `${root}_content/${folders[kind]}/${filePrefix[kind]}${safeId}.md`;
      deferRender(this, async () => {
        this.setAttribute('aria-busy', 'true');
        try {
          const [renderer, templateResponse] = await Promise.all([
            loadMarkdownRenderer(root), fetch(`${root}_templates/content-detail-page.html`)
          ]);
          if (requestId !== this._detailRequestId) return;
          if (!templateResponse.ok) throw new Error('No s’ha pogut carregar la plantilla de contingut.');
          const parsedTemplate = new DOMParser().parseFromString(await templateResponse.text(), 'text/html');
          const copy = name => {
            const template = parsedTemplate.getElementById(name);
            if (!template) throw new Error(`Falta la plantilla ${name}.`);
            return template.content.cloneNode(true);
          };
          this.replaceChildren(copy('content-detail-loading'));
          if (!safeId) throw new Error('Tria un contingut des del catàleg per obrir-ne el detall.');
          const response = await fetch(markdownPath);
          if (requestId !== this._detailRequestId) return;
          if (!response.ok) throw new Error(`No s’ha pogut carregar el contingut (${response.status}).`);
          const source = await response.text();
          if (requestId !== this._detailRequestId) return;
          const rendered = renderer.parse(source.replace(/\]\(_assets\//g, "](../../_assets/"), response.url);
          const data = rendered.data;
          const title = String(data.title || safeId).trim();
          const description = String(data.description || '').trim();
          const guideBack = {
            'pensament-computacional': [`${root}pensament-computacional/index.html`, 'Activitats de pensament computacional', 'pensament'],
            'robotica-educativa': [`${root}robotica-educativa/index.html`, 'Catàleg de robòtica', 'robots'],
            'situacions-aprenentatge': [`${root}situacions-aprenentatge/index.html`, "Situacions d'aprenentatge", 'situacions']
          }[safeId] || [`${root}index.html`, 'Inici', 'inici'];
          const backTarget = kind === 'activity' ? `${root}pensament-computacional/index.html`
            : kind === 'tutorial' ? `${root}robot/index.html?id=${data.robot || safeId.split('-')[0]}`
              : kind === 'robot' ? `${root}robotica-educativa/index.html`
                : guideBack[0];
          const backLabel = kind === 'activity' ? 'Pensament computacional'
            : kind === 'tutorial' ? (data.robot || 'robots')
              : kind === 'robot' ? 'Catàleg de robòtica' : guideBack[1];
          const fragment = copy('content-detail-template');
          const back = fragment.querySelector('[data-back]'); back.setAttribute('href', backTarget); back.setAttribute('label', backLabel);
          const robotBack = fragment.querySelector('[data-robot-back]');
          robotBack.setAttribute('href', backTarget); robotBack.setAttribute('label', backLabel);
          fragment.querySelector('[data-title]').textContent = title;
          const badgeItems = [];
          const badge = (text, primary = false) => { if (text) badgeItems.push({ text, primary }); };
          if (kind === 'activity') { badge(data.topic, true); badge(data.cycle_label || data.cycle); badge(data.duration ? `⏱️ ${data.duration}` : ''); }
          if (kind === 'tutorial') { badge(data.robot_label || data.robot, true); badge(data.level); badge(data.duration ? `⏱️ ${data.duration}` : ''); }
          if (kind === 'robot') badge(data.age, true);
          if (kind === 'guide') badge(data.tag || 'Guia docent', true);
          let tutorialItems = [];
          if (kind === 'robot') {
            tutorialItems = (window.CATALEG?.tutorials || []).filter(item => item.robot === safeId);
          }
          ensureDocumentHead(root, title, description);
          document.title = `${title} | Robòtica²⁰⁰`;
          this.replaceChildren(fragment);
          const alpineRoot = this.querySelector('.detail-page-card');
          if (alpineRoot) setTimeout(() => {
            alpineRoot.dispatchEvent(new CustomEvent('detail-ready', {
              bubbles: true,
              detail: {
                title, description, badges: badgeItems, content: rendered.html, steps: rendered.steps, step: 0,
                robot: kind === 'robot', robotSlug: safeId, root,
                resources: data.official_resources || [], statusNote: data.status_note || '',
                statusSource: data.status_source || '', statusSourceLabel: data.status_source_label || '', specs: data.specs || []
              }
            }));
            this.querySelector('[data-tutorial-grid]')?.dispatchEvent(new CustomEvent('tutorials-ready', {
              bubbles: true, detail: { items: tutorialItems }
            }));
          }, 0);
          const heading = this.querySelector('.detail-page-title, .robot-hero-title');
          if (heading) {
            heading.setAttribute('tabindex', '-1');
            heading.focus({ preventScroll: true });
          }
          window.scrollTo({ top: 0, behavior: 'auto' });
        } catch (error) {
          if (requestId !== this._detailRequestId) return;
          const templates = await fetch(`${root}_templates/content-detail-page.html`).then(response => response.text());
          if (requestId !== this._detailRequestId) return;
          const parsed = new DOMParser().parseFromString(templates, 'text/html');
          const template = parsed.getElementById('content-detail-error');
          if (template) {
            const fragment = template.content.cloneNode(true);
            fragment.querySelector('[data-back]').setAttribute('href', `${root}${kind === 'activity' ? 'pensament-computacional/index.html' : 'robotica-educativa/index.html'}`);
            fragment.querySelector('[data-back]').setAttribute('label', 'Tornar al catàleg');
            fragment.querySelector('[data-error-title]').textContent = 'No s’ha pogut carregar aquest contingut';
            fragment.querySelector('[data-error-message]').textContent = error.message;
            this.replaceChildren(fragment);
          } else this.textContent = error.message;
        } finally {
          if (requestId === this._detailRequestId) this.removeAttribute('aria-busy');
        }
      });
    }
  }

  // 6. Plantilla de pàgina de situació d'aprenentatge
  class SituationPage extends HTMLElement {
    connectedCallback() {
      this.loadSituation();
    }


    loadSituation() {
      const requestId = (this._situationRequestId || 0) + 1;
      this._situationRequestId = requestId;
      const root = cleanRoot(this.getAttribute('root') || '../');
      const backLabel = this.getAttribute('back-label') || "Situacions d'Aprenentatge";
      const requestedId = new URLSearchParams(window.location.search).get('id') || '';
      const safeId = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(requestedId) ? requestedId : '';
      const query = new URLSearchParams(window.location.search);
      const filters = new URLSearchParams();
      ['robot', 'cicle', 'tematica', 'materia'].forEach(key => { if (query.has(key)) filters.set(key, query.get(key)); });
      const fallbackBack = `${root}situacions-aprenentatge/index.html${filters.size ? `?${filters}` : ''}${safeId ? `#situacio-sa-${safeId}` : ''}`;
      const backHref = this.getAttribute('back-href') || fallbackBack;
      const contentSource = safeId ? `${root}_content/situacions/${safeId}.md` : '';

      deferRender(this, async () => {
        const showError = async (title, message, help = '') => {
          if (requestId !== this._situationRequestId) return;
          try {
            const templates = await loadSituationTemplates(root);
            if (requestId !== this._situationRequestId) return;
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
          if (requestId !== this._situationRequestId) return;
          this.replaceChildren(clonePageTemplate(templates, 'situation-page-loading-template'));
          const response = await fetch(contentSource);
          if (requestId !== this._situationRequestId) return;
          if (!response.ok) throw new Error(`No s’ha pogut carregar el contingut (${response.status}).`);
          const source = await response.text();
          if (requestId !== this._situationRequestId) return;
          const parsed = renderer.parse(source, response.url);
          const fragment = clonePageTemplate(templates, 'situation-page-template');
          const back = fragment.querySelector('[data-back-navigation]');
          back.setAttribute('href', backHref);
          back.setAttribute('label', backLabel);

          const value = (key, fallback = '') => String(parsed.data[key] || fallback || '').trim();
          fragment.querySelector('[data-title]').textContent = value('title', safeId);
          const badgeItems = [];
          const appendBadge = (label, { primary = false, icon = '', prefix = '' } = {}) => {
            if (!label) return;
            const safeIcon = icon && /^[a-z0-9-]+\.(?:png|svg)$/i.test(icon) ? `${root}_assets/icons/${icon}` : '';
            badgeItems.push({ text: `${prefix}${label}`, primary, icon: safeIcon });
          };
          const robot = value('robot').toLowerCase();
          const robotIcon = value('robot_icon', robot ? `${robot}.png` : '');
          appendBadge(value('robot_label', robot), { primary: true, icon: robotIcon });
          appendBadge(value('cycle_label', value('cycle')));
          appendBadge(value('subject_label', value('subject')));
          appendBadge(value('duration', value('sessions')), { prefix: '⏱️ ' });

          const themeLabel = value('theme_label', value('theme'));
          const challenge = value('challenge');
          const contentHasChallenge = /<h2\b[^>]*>[^<]*(?:repte|pregunta guia)/i.test(parsed.html);

          const description = value('description', challenge);
          ensureDocumentHead(root, value('title'), description);
          if (parsed.data.title) document.title = `${parsed.data.title} | Situació d’aprenentatge | Robòtica²⁰⁰`;
          const descriptionTag = document.querySelector('meta[name="description"]');
          if (descriptionTag && description) descriptionTag.content = description;
          this.replaceChildren(fragment);
          const alpineRoot = this.querySelector('.detail-page-card');
          if (alpineRoot) setTimeout(() => alpineRoot.dispatchEvent(new CustomEvent('situation-ready', {
            bubbles: true,
            detail: { title: value('title', safeId), badges: badgeItems, theme: themeLabel ? `🏷️ ${themeLabel}` : '', challenge, showChallenge: Boolean(challenge && !contentHasChallenge), content: parsed.html, steps: parsed.steps, step: 0 }
          })), 0);
          const heading = this.querySelector('.detail-page-title');
          if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
          window.scrollTo({ top: 0, behavior: 'auto' });
        } catch (error) {
          if (requestId !== this._situationRequestId) return;
          console.error('Error carregant la situació en Markdown:', error);
          await showError('No s’ha pogut carregar aquesta situació', error.message || 'Comprova la connexió local i el fitxer de contingut.', 'Recarrega la pàgina quan el fitxer Markdown estiga disponible.');
        }
        finally {
          if (requestId === this._situationRequestId) this.removeAttribute('aria-busy');
        }
      });
    }
  }

  // Registre de tots els Custom Elements
  const defs = [
    ['site-header', SiteHeader],
    ['site-footer', SiteFooter],
    ['nav-back', NavBack],
    ['content-detail-page', ContentDetailPage],
    ['situation-page', SituationPage],
  ];

  defs.forEach(([tag, cls]) => {
    if (!customElements.get(tag)) {
      customElements.define(tag, cls);
    }
  });

})();
