// Filters travel in the URL: shared links and the visible back button keep state,
// including when the generated website is opened directly via file://.
(function () {
  const keys = ['robot', 'cicle', 'tematica', 'materia'];
  const params = new URLSearchParams(window.location.search);
  const cards = Array.from(document.querySelectorAll('.sa-card'));
  const back = document.querySelector('.btn-back');

  if (!document.getElementById('filter-robot')) {
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
    return;
  }

  const selects = Object.fromEntries(keys.map(key => [key, document.getElementById('filter-' + key)]));
  const counter = document.getElementById('situations-count');
  const empty = document.getElementById('situations-empty');
  const originalLinks = cards.map(card => card.getAttribute('href'));

  keys.forEach(key => {
    const value = params.get(key);
    if (Array.from(selects[key].options).some(option => option.value === value)) {
      selects[key].value = value;
    }
  });

  function filterCards(updateURL) {
    const active = new URLSearchParams();
    keys.forEach(key => {
      if (selects[key].value !== 'all') active.set(key, selects[key].value);
    });
    const query = active.size ? '?' + active : '';
    let count = 0;
    cards.forEach((card, index) => {
      const matches = keys.every(key => {
        const wanted = selects[key].value;
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

  keys.forEach(key => selects[key].addEventListener('change', () => filterCards(true)));
  document.getElementById('btn-reset-sa').addEventListener('click', () => {
    keys.forEach(key => { selects[key].value = 'all'; });
    filterCards(true);
  });
  filterCards(false);
  const returnedCard = cards.find(card => '#' + card.id === window.location.hash);
  if (returnedCard && !returnedCard.hidden) returnedCard.focus({preventScroll: true});
})();
