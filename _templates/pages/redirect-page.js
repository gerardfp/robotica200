'use strict';

const { escapeHTML, escapeAttr } = require('../layout/utils');
const { Document } = require('../layout/document');
const { NavBack } = require('../layout/nav-back');

function RedirectPage({
  title = 'Redirigint… | Robòtica²⁰⁰',
  activeNav = 'inici',
  fallbackHref = '../index.html',
  fallbackLabel = 'Tornar al catàleg'
} = {}) {
  return Document({
    title,
    description: 'Contingut didàctic de robòtica educativa.',
    activeNav,
    root: '../',
    body: `    ${NavBack({ href: fallbackHref, label: fallbackLabel })}
    <section class="content-load-error" data-legacy-redirect="${escapeAttr(fallbackHref)}">
      <h1>Redirigint al contingut…</h1>
      <p>Si la redirecció no és automàtica, <a href="${escapeAttr(fallbackHref)}">torna al catàleg</a>.</p>
    </section>`
  });
}

module.exports = { RedirectPage };
