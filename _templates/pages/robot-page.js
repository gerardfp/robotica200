'use strict';

const { escapeHTML, escapeAttr, cleanRoot } = require('../layout/utils');
const { Document } = require('../layout/document');
const { SectionHero } = require('../components/section-hero');
const { TutorialCard } = require('../components/tutorial-card');

function RobotPage({
  robotSlug = '',
  title = '',
  description = '',
  root = '../../',
  robotLead = '',
  robotHighlightTitle = '',
  robotHighlightBody = '',
  tutorialItems = [],
  resources = [],
  statusNote = '',
  statusSource = '',
  statusSourceLabel = '',
  specs = [],
  printHref = ''
} = {}) {
  const r = cleanRoot(root);

  const highlightHTML = (robotHighlightTitle || robotHighlightBody) ? `
      <aside class="robot-highlight-card robot-highlight-${escapeAttr(robotSlug)}" data-robot="${escapeAttr(robotSlug)}">
        <div class="robot-highlight-icon-wrap" aria-hidden="true">
          <svg class="robot-highlight-icon-svg" width="30" height="30" viewBox="0 0 32 32" fill="none">
            <path d="M16 4C11.58 4 8 7.58 8 12C8 14.85 9.5 17.35 11.75 18.75C12.25 19.06 12.6 19.6 12.6 20.2V22C12.6 22.55 13.05 23 13.6 23H18.4C18.95 23 19.4 22.55 19.4 22V20.2C19.4 19.6 19.75 19.06 20.25 18.75C22.5 17.35 24 14.85 24 12C24 7.58 20.42 4 16 4Z" fill="#F59E0B"/>
            <path d="M13 24.5C13 24.22 13.22 24 13.5 24H18.5C18.78 24 19 24.22 19 24.5C19 24.78 18.78 25 18.5 25H13.5C13.22 25 13 24.78 13 24.5Z" fill="#D97706"/>
            <path d="M14 26C14 25.72 14.22 25.5 14.5 25.5H17.5C17.78 25.5 18 25.72 18 26C18 26.83 17.33 27.5 16.5 27.5H15.5C14.67 27.5 14 26.83 14 26Z" fill="#D97706"/>
            <path d="M11.5 10C12 7.8 13.6 6.2 15.8 6" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M22.5 7.5L24.5 5.5" stroke="#F59E0B" stroke-width="2.2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="robot-highlight-content">
          <h2 class="robot-highlight-title">${robotHighlightTitle}</h2>
          <p class="robot-highlight-desc">${robotHighlightBody}</p>
        </div>
      </aside>` : '';

  const resourcesHTML = (resources && resources.length) ? `
    <section class="robot-official-resources" data-official-resources>
      <h2>Recursos oficials del fabricant</h2>
      <p>Materials, compatibilitat i instruccions actualitzades.</p>
      <ul>
        ${resources.map(res => `<li><a href="${escapeAttr(res.href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(res.title)}</a><span>${escapeHTML(res.description || '')}</span></li>`).join('')}
      </ul>
    </section>` : '';

  const statusHTML = statusNote ? `
    <p class="robot-status-note" data-status>
      <strong>Estat i disponibilitat del kit:</strong>
      <span>${escapeHTML(statusNote)}</span>
      ${statusSource ? `<a href="${escapeAttr(statusSource)}" target="_blank" rel="noopener noreferrer">${escapeHTML(statusSourceLabel || 'Font oficial')}</a>` : ''}
    </p>` : '';

  const specsHTML = (specs && specs.length) ? `
    <div class="robot-specs-list" data-specs>
      ${specs.map(spec => `<span class="robot-spec-pill">${escapeHTML(spec)}</span>`).join('')}
    </div>` : '';

  return Document({
    title: `${title} | Robòtica²⁰⁰`,
    description: description || 'Contingut didàctic de robòtica educativa.',
    activeNav: 'robots',
    root: r,
    heroLayout: true,
    body: `${SectionHero({
      title,
      description,
      bannerSrc: `${r}_assets/robots/${robotSlug}.png`,
      bannerAlt: title,
      backHref: `${r}robotica-educativa/index.html`,
      backLabel: 'Robòtica educativa',
      isRobotHero: true,
      robotSlug
    })}
  <section class="robot-overview-section robot-overview-${escapeAttr(robotSlug)}" data-robot-overview data-robot="${escapeAttr(robotSlug)}">
    <div class="robot-overview-grid">
      <div class="robot-overview-lead">
        <p>${robotLead}</p>
        ${printHref ? `<p class="print-version-link"><a href="${escapeAttr(printHref)}" download>Descarrega la fitxa imprimible (PDF)</a></p>` : ''}
      </div>${highlightHTML}
    </div>
  </section>
  <section data-robot-extra>
    <div class="robot-tutorials-heading">
      <div class="robot-tutorials-heading-main">
        <div>
          <h2 data-tutorial-heading>Tutorials de ${escapeHTML(title)}</h2>
          <p>Tutorials per iniciar-se en les possibilitats del robot, connectar-lo i utilitzar-ne els components.</p>
        </div>
      </div>
    </div>
    <div class="clean-grid tutorial-grid" data-tutorial-grid>
      ${tutorialItems.map(item => TutorialCard({ item, root: r })).join('\n      ')}
    </div>${resourcesHTML}${statusHTML}${specsHTML}
  </section>`
  });
}

module.exports = { RobotPage };
