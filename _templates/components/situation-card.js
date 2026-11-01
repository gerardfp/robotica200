'use strict';

const { escapeHTML, escapeAttr, cleanRoot } = require('../layout/utils');

function SituationCard({ item, root = '../' }) {
  const r = cleanRoot(root);
  const href = `${r}${item.url}`;

  return `<a id="${escapeAttr(item.id)}" href="${escapeAttr(href)}" data-base-href="${escapeAttr(href)}" class="item-card sa-card" data-robot="${escapeAttr(item.robot)}" data-cicle="${escapeAttr(item.cicle)}" data-tematica="${escapeAttr(item.tematica)}" data-materia="${escapeAttr(item.materia)}">
    <div class="card-top">
      <div class="card-robot-info">
        ${item.robot ? `<img src="${escapeAttr(`${r}_assets/icons/${item.robot}.png`)}" alt="" class="card-robot-sa-icon" width="36" height="36">` : ''}
        <span class="tag-badge primary">${escapeHTML(item.robotLabel)}</span>
      </div>
      <span class="tag-badge">${escapeHTML(item.cicleLabel)}</span>
    </div>
    <h3 class="item-title">${escapeHTML(item.titol)}</h3>
    <div class="sa-challenge">“${escapeHTML(item.repte)}”</div>
    <div class="card-tags"><span class="tag-pill">${escapeHTML(item.materiaLabel)}</span><span class="tag-pill">${escapeHTML(item.tematicaLabel)}</span></div>
    <div class="item-footer"><span>⏱️ ${escapeHTML(item.sessions || item.durada)}</span><span>Obrir situació →</span></div>
  </a>`;
}

module.exports = { SituationCard };
