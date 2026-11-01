'use strict';

const { escapeHTML, escapeAttr } = require('../layout/utils');
const { NavBack } = require('../layout/nav-back');

function SectionHero({
  title = '',
  description = '',
  bannerSrc = '',
  bannerAlt = '',
  backHref = '../index.html',
  backLabel = 'inici',
  isRobotHero = false,
  robotSlug = ''
} = {}) {
  if (isRobotHero) {
    return `  <section class="robot-hero robot-hero-${escapeAttr(robotSlug)}" data-robot-hero data-robot="${escapeAttr(robotSlug)}">
    <div class="container robot-hero-inner">
      ${NavBack({ href: backHref, label: backLabel })}
      <div class="robot-hero-content">
        <h1 class="robot-hero-title">${escapeHTML(title)}</h1>
        ${description ? `<p class="robot-hero-sub">${escapeHTML(description)}</p>` : ''}
        <div class="accent-dashes" aria-hidden="true"><span class="dash dash-red"></span><span class="dash dash-yellow"></span><span class="dash dash-blue"></span></div>
      </div>
      <div class="robot-hero-media">
        <img src="${escapeAttr(bannerSrc)}" alt="${escapeAttr(bannerAlt || title)}" class="robot-hero-img" width="800" height="600">
      </div>
    </div>
  </section>`;
  }

  return `  <div class="robots-hero">
    <div class="container robots-hero-inner">
      ${NavBack({ href: backHref, label: backLabel })}
      <div class="robots-hero-content">
        <h1 class="robots-hero-title">${escapeHTML(title)}</h1>
        <p class="robots-hero-desc">${escapeHTML(description)}</p>
        <div class="accent-dashes" aria-hidden="true"><span class="dash dash-red"></span><span class="dash dash-yellow"></span><span class="dash dash-blue"></span></div>
      </div>
      <div class="robots-hero-media">
        <img src="${escapeAttr(bannerSrc)}" alt="${escapeAttr(bannerAlt || title)}" class="robots-hero-img" width="800" height="600">
      </div>
    </div>
  </div>`;
}

module.exports = { SectionHero };
