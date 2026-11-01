'use strict';

const { escapeHTML } = require('../layout/utils');

function CodePanel({ lang, codeHTML }) {
  const safeLang = escapeHTML(lang || 'text');
  return `<figure class="code-panel"><figcaption>Exemple de programació · ${safeLang}</figcaption><pre class="code-block" tabindex="0"><code class="language-${safeLang}">${codeHTML}</code></pre></figure>`;
}

const DIALECT_LABELS = {
  makecode: 'MakeCode (micro:bit)',
  mblock: 'mBlock 5 (Codey Rocky)',
  mblocks: 'mBlock 5 (Codey Rocky)',
  spike: 'SPIKE App (LEGO SPIKE)',
  spikeapp: 'SPIKE App (LEGO SPIKE)',
  'spike-app': 'SPIKE App (LEGO SPIKE)',
  scratchblocks: 'Blocs visuals'
};

function VisualBlocksPanel({ lang, rawCode, svgHTML, hash }) {
  const normalizedLang = String(lang || 'scratchblocks').toLowerCase();
  const label = DIALECT_LABELS[normalizedLang] || escapeHTML(lang);
  const hashAttr = hash ? ` data-block-hash="${escapeHTML(hash)}"` : '';

  return `<figure class="code-panel code-panel-blocks" data-block-engine="${escapeHTML(normalizedLang)}"${hashAttr}><figcaption>Programa de blocs · ${label}</figcaption><div class="blocks-visual-frame">${svgHTML}</div></figure>`;
}

module.exports = { CodePanel, VisualBlocksPanel };
