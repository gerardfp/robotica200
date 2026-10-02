// js/filters.js - Filtratge interactiu del catàleg de Situacions d'Aprenentatge
(function () {
  const selectRobot = document.getElementById('filter-robot');
  const selectCicle = document.getElementById('filter-cicle');
  const selectTematica = document.getElementById('filter-tematica');
  const selectMateria = document.getElementById('filter-materia');
  const btnReset = document.getElementById('btn-reset-sa');
  const counter = document.getElementById('situations-count');
  const cards = Array.from(document.querySelectorAll('.sa-card'));

  if (!cards.length) return;

  function filterCards() {
    const rVal = selectRobot ? selectRobot.value : 'all';
    const cVal = selectCicle ? selectCicle.value : 'all';
    const tVal = selectTematica ? selectTematica.value : 'all';
    const mVal = selectMateria ? selectMateria.value : 'all';

    let visibleCount = 0;

    cards.forEach(card => {
      const cardRobot = card.getAttribute('data-robot') || '';
      const cardCicle = card.getAttribute('data-cicle') || '';
      const cardTematica = card.getAttribute('data-tematica') || '';
      const cardMateria = card.getAttribute('data-materia') || '';

      const matchRobot = (rVal === 'all' || cardRobot === rVal);
      const matchCicle = (cVal === 'all' || cardCicle.includes(cVal) || cardCicle === 'tots');
      const matchTematica = (tVal === 'all' || cardTematica === tVal);
      const matchMateria = (mVal === 'all' || cardMateria === mVal);

      if (matchRobot && matchCicle && matchTematica && matchMateria) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (counter) {
      counter.textContent = `Mostrant ${visibleCount} de ${cards.length} situacions`;
    }
  }

  [selectRobot, selectCicle, selectTematica, selectMateria].forEach(sel => {
    if (sel) sel.addEventListener('change', filterCards);
  });

  if (btnReset) {
    btnReset.addEventListener('click', function () {
      if (selectRobot) selectRobot.value = 'all';
      if (selectCicle) selectCicle.value = 'all';
      if (selectTematica) selectTematica.value = 'all';
      if (selectMateria) selectMateria.value = 'all';
      filterCards();
    });
  }

  // Estat inicial
  filterCards();
})();
