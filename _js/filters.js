// _js/filters.js - Gestió de filtres interactius per a situacions d'aprenentatge
(function () {
  'use strict';

  const keys = ['robot', 'cicle', 'tematica', 'materia'];

  function handleBackButton() {
    const params = new URLSearchParams(window.location.search);
    const back = document.querySelector('.btn-back');
    if (back && back.getAttribute('href') && back.getAttribute('href').includes('situacions-aprenentatge')) {
      const filters = new URLSearchParams();
      keys.forEach(key => {
        if (params.has(key)) filters.set(key, params.get(key));
      });
      const parts = window.location.pathname.split('/').filter(Boolean);
      let slug = '';
      if (parts.length >= 2 && parts[parts.length - 1] === 'index.html') {
        slug = parts[parts.length - 2];
      } else if (parts.length >= 1) {
        slug = parts[parts.length - 1].replace(/\.html$/, '');
      }
      const baseHref = back.getAttribute('href').split('?')[0].split('#')[0];
      const targetHash = slug ? '#' + (slug.startsWith('situacio-sa-') ? slug : 'situacio-sa-' + slug) : '';
      back.href = baseHref + (filters.size ? '?' + filters : '') + targetHash;
    }
  }

  function initFilters() {
    const filterRobot = document.getElementById('filter-robot');
    if (!filterRobot) {
      handleBackButton();
      return;
    }

    const cards = Array.from(document.querySelectorAll('.sa-card'));
    if (!cards.length) return;

    const params = new URLSearchParams(window.location.search);
    const selects = Object.fromEntries(keys.map(key => [key, document.getElementById('filter-' + key)]));
    const counter = document.getElementById('situations-count');
    const empty = document.getElementById('situations-empty');
    const originalLinks = cards.map(card => card.getAttribute('href'));

    keys.forEach(key => {
      const select = selects[key];
      if (!select) return;
      const value = params.get(key);
      if (Array.from(select.options).some(option => option.value === value)) {
        select.value = value;
      }
    });

    function filterCards(updateURL) {
      const active = new URLSearchParams();
      keys.forEach(key => {
        const select = selects[key];
        if (select && select.value !== 'all') active.set(key, select.value);
      });
      const query = active.size ? '?' + active : '';
      let count = 0;
      cards.forEach((card, index) => {
        const matches = keys.every(key => {
          const select = selects[key];
          if (!select) return true;
          const wanted = select.value;
          const values = (card.getAttribute('data-' + key) || '').split(/\s+/);
          return wanted === 'all' || values.includes(wanted) || (key === 'cicle' && values.includes('tots'));
        });
        card.hidden = !matches;
        if (matches) count++;
        card.href = originalLinks[index] + query;
      });
      if (counter) counter.textContent = `Mostrant ${count} de ${cards.length} situacions`;
      if (empty) empty.hidden = count !== 0;
      if (updateURL) {
        try {
          window.history.replaceState(null, '', window.location.pathname + query);
        } catch (_) {
          // Some file:// browsers restrict History; detail links still carry filters.
        }
      }
    }

    keys.forEach(key => {
      const select = selects[key];
      if (select && !select.__filtersBound) {
        select.addEventListener('change', () => filterCards(true));
        select.__filtersBound = true;
      }
    });

    const resetBtn = document.getElementById('btn-reset-sa');
    if (resetBtn && !resetBtn.__resetBound) {
      resetBtn.addEventListener('click', () => {
        keys.forEach(key => { if (selects[key]) selects[key].value = 'all'; });
        filterCards(true);
      });
      resetBtn.__resetBound = true;
    }

    filterCards(false);
    const returnedCard = cards.find(card => '#' + card.id === window.location.hash);
    if (returnedCard && !returnedCard.hidden) returnedCard.focus({preventScroll: true});
  }

  window.initSituationFilters = initFilters;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFilters);
  } else {
    initFilters();
  }
})();
