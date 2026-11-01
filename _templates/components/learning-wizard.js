'use strict';

const { escapeHTML, escapeAttr } = require('../layout/utils');

function LearningWizard(steps = []) {
  if (!steps || !steps.length) return '';
  const total = steps.length;
  const firstTitle = steps[0]?.title || '';
  const initialPct = (1 / total * 100).toFixed(2);

  const itemsHTML = steps.map((item, index) => {
    const stepNum = index + 1;
    const isCurrent = index === 0 ? ' aria-current="step"' : '';
    return `<li><button type="button" class="learning-wizard-step" data-step-target="${index}" aria-label="${escapeAttr(`Obrir pas ${stepNum}: ${item.title}`)}"${isCurrent}><span class="learning-wizard-step-number" aria-hidden="true">${stepNum}</span><span class="learning-wizard-step-title"><span class="learning-wizard-step-separator" aria-hidden="true">&#160;·&#160;</span><span>${escapeHTML(item.title)}</span></span></button></li>`;
  }).join('');

  return `<nav class="learning-step-index learning-wizard" data-learning-wizard aria-label="Passos de la situació">
      <strong>Seqüència de treball</strong>
      <p class="learning-wizard-status" data-wizard-status role="status" aria-live="polite" aria-atomic="true">Pas 1 de ${total} · ${escapeHTML(firstTitle)}</p>
      <div class="learning-wizard-progress" data-wizard-progress role="progressbar" aria-label="Progrés de la seqüència" aria-valuemin="1" aria-valuemax="${total}" aria-valuenow="1" aria-valuetext="Pas 1 de ${total}">
        <span data-wizard-bar style="width: ${initialPct}%" aria-hidden="true"></span>
      </div>
      <ol class="learning-wizard-picker" aria-label="Tria un pas">${itemsHTML}</ol>
      <div class="learning-wizard-controls"><button type="button" class="btn-wizard-step" data-step-prev disabled>← Pas anterior</button><button type="button" class="btn-wizard-step primary" data-step-next${total <= 1 ? ' disabled' : ''}>Pas següent →</button></div>
    </nav>`;
}

module.exports = { LearningWizard };
