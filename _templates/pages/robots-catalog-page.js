'use strict';

const { Document } = require('../layout/document');
const { SectionHero } = require('../components/section-hero');
const { RobotCard } = require('../components/robot-card');

function RobotsCatalogPage({ robots = [] } = {}) {
  return Document({
    title: "Robòtica Educativa - Els 6 Robots d'Aula | Robòtica200",
    description: "Guies didàctiques i tutorials dels 6 robots educatius d'aula.",
    activeNav: 'robotica-educativa',
    root: '../',
    heroLayout: true,
    body: `${SectionHero({
      title: 'Robòtica educativa',
      description: "Selecciona un robot per accedir a la seva pàgina d'aprenentatge i tutorials específics.",
      bannerSrc: '../_assets/banners/robotica.png',
      bannerAlt: "Robots d'Aula",
      backHref: '../index.html',
      backLabel: 'inici'
    })}
    <div class="clean-grid" id="robots-grid">
      ${robots.map(item => RobotCard({ item, root: '../' })).join('\n      ')}
    </div>`
  });
}

module.exports = { RobotsCatalogPage };
