'use strict';

const { SectionIcon, NOTE_ICONS } = require('./section-icon');
const { escapeHTML } = require('../layout/utils');

function MarkdownNote({ kind, icon, title, bodyHTML, extraHTML = '', prefixHTML = '' }) {
  return `${prefixHTML}<aside class="markdown-note markdown-note-${escapeHTML(kind)}"><span class="markdown-note-icon" aria-hidden="true">${SectionIcon(NOTE_ICONS[kind], 'note-pack-icon')}</span><div><h4>${escapeHTML(title)}</h4><p>${bodyHTML}</p>${extraHTML}</div></aside>`;
}

module.exports = { MarkdownNote };
