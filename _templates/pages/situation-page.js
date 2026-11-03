'use strict';

const { escapeHTML, escapeAttr } = require('../layout/utils');
const { Document } = require('../layout/document');
const { NavBack } = require('../layout/nav-back');
const { BadgeList } = require('../components/badge-list');

function SituationPage({
  slug = '',
  title = '',
  description = '',
  root = '../../',
  backHref = '../../situacions-aprenentatge/index.html',
  backLabel = "Situacions d'Aprenentatge",
  badges = [],
  printHref = '',
  themeLabel = '',
  challenge = '',
  showChallenge = false,
  content = ''
} = {}) {
  const challengeSection = showChallenge ? `
      <section class="detail-section" data-challenge-section>
        <h2>Repte o pregunta guia</h2>
        <p class="sa-challenge" data-challenge>${escapeHTML(challenge)}</p>
      </section>` : '';

  return Document({
    title: `${title} | Situació d’aprenentatge | Robòtica²⁰⁰`,
    description: description || challenge || 'Situació d’aprenentatge de robòtica i pensament computacional.',
    activeNav: 'situacions',
    root,
    body: `    ${NavBack({ href: backHref, label: backLabel, preserveFilters: true, slug })}
    <article class="detail-page-card situation-page-card" data-wizard-container>
      <div class="detail-page-header">
        ${BadgeList(badges)}
        <h1 class="detail-page-title" data-title>${escapeHTML(title)}</h1>
        ${themeLabel ? `<span class="tag-badge" data-theme>🏷️ ${escapeHTML(themeLabel)}</span>` : ''}
      </div>
      ${printHref ? `<p class="print-version-link"><a href="${escapeAttr(printHref)}" download>Descarrega la versió imprimible (PDF)</a></p>` : ''}
      <div class="prose">${challengeSection}
        <div data-markdown-content>${content}</div>
      </div>
    </article>`
  });
}

module.exports = { SituationPage };
