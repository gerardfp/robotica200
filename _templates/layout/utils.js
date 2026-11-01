'use strict';

const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
})[char]);

const escapeAttr = escapeHTML;

function cleanRoot(root) {
  if (root === null || root === undefined) return '';
  const r = String(root);
  return r && !r.endsWith('/') ? `${r}/` : r;
}

module.exports = { escapeHTML, escapeAttr, cleanRoot };
