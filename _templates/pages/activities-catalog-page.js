'use strict';

const { Document } = require('../layout/document');
const { SectionHero } = require('../components/section-hero');
const { ActivityCard } = require('../components/activity-card');

function ActivitiesCatalogPage({ activitats = [] } = {}) {
  return Document({
    title: 'Pensament Computacional Desendollat | Robòtica200',
    description: "Activitats desendollades de pensament computacional per a l'aula.",
    activeNav: 'pensament',
    root: '../',
    heroLayout: true,
    body: `${SectionHero({
      title: 'Pensament Computacional',
      description: "Activitats desendollades per treballar instruccions, patrons, decisions i dades amb el cos i materials d'aula.",
      bannerSrc: '../_assets/banners/pensament-computacional.webp',
      bannerAlt: 'Pensament Computacional',
      backHref: '../index.html',
      backLabel: 'inici'
    })}
    <div class="clean-grid" id="activities-grid">
      ${activitats.map(item => ActivityCard({ item, root: '../' })).join('\n      ')}
    </div>`
  });
}

module.exports = { ActivitiesCatalogPage };
