// _js/ui.js - Micro-controlador d'interactivitat per a Robòtica²⁰⁰ (0 dependències)
(function () {
  'use strict';

  const FILTER_KEYS = ['robot', 'cicle', 'tematica', 'materia'];

  // 1. Redirecció automàtica d'URLs antigues (?id=slug -> ./slug/index.html)
  function initLegacyRedirect() {
    const redirectBox = document.querySelector('[data-legacy-redirect]');
    if (!redirectBox) return;
    const params = new URLSearchParams(window.location.search);
    const rawId = params.get('id') || '';
    const id = rawId.replace(/^(?:sa-|activitat-|tutorial-|robot-|guia-)/i, '');
    if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
      const filters = new URLSearchParams();
      FILTER_KEYS.forEach(k => { if (params.has(k)) filters.set(k, params.get(k)); });
      const qs = filters.size ? `?${filters}` : '';
      window.location.replace(`./${id}/index.html${qs}${window.location.hash}`);
    } else {
      const fallback = redirectBox.getAttribute('data-legacy-redirect') || '../index.html';
      window.location.replace(fallback);
    }
  }

  // 2. Preservació dels filtres al botó de retorn de les Situacions d'Aprenentatge
  function initBackFilters() {
    const backLink = document.querySelector('a[data-preserve-filters]');
    if (!backLink) return;
    const slug = backLink.getAttribute('data-preserve-filters') || '';
    const query = new URLSearchParams(window.location.search);
    const filters = new URLSearchParams();
    FILTER_KEYS.forEach(k => { if (query.has(k)) filters.set(k, query.get(k)); });
    if (filters.size) {
      backLink.href = `../../situacions-aprenentatge/index.html?${filters}#situacio-sa-${slug}`;
    }
  }

  // 3. Assistent pas a pas (Learning Wizard)
  function initLearningWizards() {
    document.querySelectorAll('[data-learning-wizard]').forEach(wizard => {
      const container = wizard.closest('[data-wizard-container]') || wizard.parentElement;
      if (!container) return;
      const steps = Array.from(container.querySelectorAll('.learning-step'));
      const buttons = Array.from(wizard.querySelectorAll('[data-step-target]'));
      const statusEl = wizard.querySelector('[data-wizard-status]');
      const progressEl = wizard.querySelector('[data-wizard-progress]');
      const barEl = wizard.querySelector('[data-wizard-bar]');
      const prevBtn = wizard.querySelector('[data-step-prev]');
      const nextBtn = wizard.querySelector('[data-step-next]');
      const total = steps.length;
      if (!total) return;

      let current = 0;

      function setStep(index) {
        current = Math.max(0, Math.min(total - 1, index));
        steps.forEach((stepEl, i) => {
          stepEl.hidden = i !== current;
        });
        buttons.forEach((btn, i) => {
          if (i === current) btn.setAttribute('aria-current', 'step');
          else btn.removeAttribute('aria-current');
        });
        const title = steps[current]?.querySelector('h3')?.textContent || '';
        const stepNum = current + 1;
        if (statusEl) statusEl.textContent = `Pas ${stepNum} de ${total} · ${title}`;
        if (progressEl) {
          progressEl.setAttribute('aria-valuenow', String(stepNum));
          progressEl.setAttribute('aria-valuetext', `Pas ${stepNum} de ${total}`);
        }
        if (barEl) barEl.style.width = `${(stepNum / total * 100).toFixed(2)}%`;
        if (prevBtn) prevBtn.disabled = current === 0;
        if (nextBtn) nextBtn.disabled = current === total - 1;
      }

      buttons.forEach(btn => {
        btn.addEventListener('click', () => setStep(Number(btn.getAttribute('data-step-target'))));
      });
      if (prevBtn) prevBtn.addEventListener('click', () => setStep(current - 1));
      if (nextBtn) nextBtn.addEventListener('click', () => setStep(current + 1));
    });
  }

  // 4. Filtres del catàleg de Situacions d'Aprenentatge
  function initSituationsCatalog() {
    const catalog = document.querySelector('[data-situations-catalog]');
    if (!catalog) return;

    const selects = {};
    FILTER_KEYS.forEach(key => {
      selects[key] = catalog.querySelector(`select[data-filter="${key}"]`);
    });
    const cards = Array.from(catalog.querySelectorAll('.sa-card'));
    const countEl = catalog.querySelector('[data-filter-count]');
    const emptyEl = catalog.querySelector('[data-filter-empty]');
    const resetBtn = catalog.querySelector('[data-filter-reset]');
    const total = cards.length;

    const initialParams = new URLSearchParams(window.location.search);
    FILTER_KEYS.forEach(key => {
      const val = initialParams.get(key);
      if (val && selects[key]) selects[key].value = val;
    });

    function applyFilters() {
      const active = {};
      const params = new URLSearchParams();
      FILTER_KEYS.forEach(key => {
        const val = selects[key]?.value || 'all';
        active[key] = val;
        if (val !== 'all') params.set(key, val);
      });

      let visibleCount = 0;
      cards.forEach(card => {
        const matches = FILTER_KEYS.every(key => {
          const currentVal = active[key];
          if (currentVal === 'all') return true;
          const values = String(card.dataset[key] || '').split(/\s+/);
          return values.includes(currentVal) || (key === 'cicle' && values.includes('tots'));
        });
        card.hidden = !matches;
        if (matches) visibleCount += 1;

        const baseHref = card.getAttribute('data-base-href') || card.getAttribute('href');
        if (baseHref) {
          card.href = params.size ? `${baseHref}?${params}` : baseHref;
        }
      });

      if (countEl) countEl.textContent = `Mostrant ${visibleCount} de ${total} situacions`;
      if (emptyEl) emptyEl.hidden = visibleCount > 0;

      const newUrl = window.location.pathname + (params.size ? `?${params}` : '') + window.location.hash;
      window.history.replaceState(window.history.state || {}, '', newUrl);
    }

    FILTER_KEYS.forEach(key => {
      selects[key]?.addEventListener('change', applyFilters);
    });
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        FILTER_KEYS.forEach(key => { if (selects[key]) selects[key].value = 'all'; });
        applyFilters();
      });
    }

    applyFilters();

    if (window.location.hash) {
      const targetId = decodeURIComponent(window.location.hash.slice(1));
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.focus({ preventScroll: true });
    }
  }

  // 5. Micro-animacions del robot a la portada
  function initHomeRobot() {
    const btn = document.querySelector('[data-home-robot]');
    const svg = document.querySelector('[data-home-robot-svg]');
    if (!btn || !svg) return;

    const animations = [
      ['robot-anim-blink', 400],
      ['robot-anim-antenna', 700],
      ['robot-anim-alert', 800],
      ['robot-anim-glitch', 500],
      ['robot-anim-look', 1150],
      ['robot-anim-happy', 700],
      ['robot-anim-tilt', 1000],
      ['robot-anim-scan', 900],
      ['robot-anim-dashes', 1700]
    ];
    let last = -1;
    let timer = null;
    let animTimer = null;
    let activeClass = '';

    function play(index) {
      clearTimeout(animTimer);
      if (activeClass) svg.classList.remove(activeClass);
      const [cls, duration] = animations[index];
      void svg.offsetWidth;
      activeClass = cls;
      svg.classList.add(cls);
      animTimer = setTimeout(() => {
        svg.classList.remove(cls);
        activeClass = '';
      }, duration + 50);
    }

    function next() {
      let index;
      do {
        index = Math.floor(Math.random() * animations.length);
      } while (index === last);
      last = index;
      play(index);
      timer = setTimeout(next, 2000 + Math.random() * 2000);
    }

    timer = setTimeout(next, 600);
    btn.addEventListener('click', () => {
      clearTimeout(timer);
      last = 5;
      play(5);
      timer = setTimeout(next, 700);
    });
  }

  initLegacyRedirect();
  initBackFilters();
  initLearningWizards();
  initSituationsCatalog();
  initHomeRobot();
})();
