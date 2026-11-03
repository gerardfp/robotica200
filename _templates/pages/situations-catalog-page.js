'use strict';

const { escapeHTML, escapeAttr } = require('../layout/utils');
const { Document } = require('../layout/document');
const { SectionHero } = require('../components/section-hero');
const { SituationCard } = require('../components/situation-card');

function renderOptions(options = []) {
  return options.map(([val, label]) => `<option value="${escapeAttr(val)}">${escapeHTML(label)}</option>`).join('');
}

function SituationsCatalogPage({
  situacions = [],
  robotOptions = [],
  cycleOptions = [],
  topicOptions = [],
  subjectOptions = []
} = {}) {
  const total = situacions.length;

  return Document({
    title: "Situacions d'Aprenentatge Curriculars | Robòtica200",
    description: "Catàleg de situacions d'aprenentatge curriculars de robòtica i pensament computacional.",
    activeNav: 'situacions',
    root: '../',
    heroLayout: true,
    body: `${SectionHero({
      title: "Situacions d'Aprenentatge",
      description: "Propostes curriculars i reptes d'aula per connectar la robòtica i el pensament computacional amb contextos significatius.",
      bannerSrc: '../_assets/banners/situacions-aprenentatge.webp',
      bannerAlt: "Situacions d'Aprenentatge",
      backHref: '../index.html',
      backLabel: 'inici'
    })}
    <div data-situations-catalog data-total="${total}">
      <div class="filters-bar">
        <div class="filter-group">
          <label class="filter-label" for="filter-robot"><img src="../_assets/icons/pack/robot.webp" alt="" class="filter-label-icon" height="36">Robot</label>
          <select id="filter-robot" class="filter-select" data-filter="robot">
            <option value="all">Tots els robots</option>
            ${renderOptions(robotOptions)}
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label" for="filter-cicle"><img src="../_assets/icons/pack/cicle.webp" alt="" class="filter-label-icon" height="36">Cicle</label>
          <select id="filter-cicle" class="filter-select" data-filter="cicle">
            <option value="all">Tots els cicles</option>
            ${renderOptions(cycleOptions)}
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label" for="filter-tematica"><img src="../_assets/icons/pack/tematica.webp" alt="" class="filter-label-icon" height="36">Temàtica</label>
          <select id="filter-tematica" class="filter-select" data-filter="tematica">
            <option value="all">Totes les temàtiques</option>
            ${renderOptions(topicOptions)}
          </select>
        </div>
        <div class="filter-group">
          <label class="filter-label" for="filter-materia"><img src="../_assets/icons/pack/materia.webp" alt="" class="filter-label-icon" height="36">Matèria</label>
          <select id="filter-materia" class="filter-select" data-filter="materia">
            <option value="all">Totes les matèries</option>
            ${renderOptions(subjectOptions)}
          </select>
        </div>
        <div class="filter-count">
          <span id="situations-count" data-filter-count role="status" aria-live="polite">Mostrant ${total} de ${total} situacions</span>
          <button type="button" class="btn-reset-filters" data-filter-reset>Restablir filtres</button>
        </div>
      </div>
      <div class="clean-grid" id="situations-grid">
        ${situacions.map(item => SituationCard({ item, root: '../' })).join('\n        ')}
      </div>
      <p id="situations-empty" data-filter-empty hidden>No hi ha situacions amb aquests filtres. Prova de canviar-los o restablir-los.</p>
    </div>`
  });
}

module.exports = { SituationsCatalogPage };
