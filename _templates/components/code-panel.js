'use strict';

const { escapeHTML } = require('../layout/utils');

function CodePanel({ lang, codeHTML }) {
  const safeLang = escapeHTML(lang || 'text');
  return `<figure class="code-panel"><figcaption>Exemple de programació · ${safeLang}</figcaption><pre class="code-block" tabindex="0"><code class="language-${safeLang}">${codeHTML}</code></pre></figure>`;
}

function VisualBlocksPanel({ lang, svgHTML, hash }) {
  const normalizedLang = String(lang || 'scratchblocks').toLowerCase();
  const hashAttr = hash ? ` data-block-hash="${escapeHTML(hash)}"` : '';

  return `<div class="blocks-visual-frame" data-block-engine="${escapeHTML(normalizedLang)}"${hashAttr}>${svgHTML}</div>`;
}

module.exports = { CodePanel, VisualBlocksPanel };
