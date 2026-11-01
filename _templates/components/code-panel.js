'use strict';

const { escapeHTML } = require('../layout/utils');

function CodePanel({ lang, codeHTML }) {
  const safeLang = escapeHTML(lang || 'text');
  return `<figure class="code-panel"><figcaption>Exemple de programació · ${safeLang}</figcaption><pre class="code-block" tabindex="0"><code class="language-${safeLang}">${codeHTML}</code></pre></figure>`;
}

module.exports = { CodePanel };
