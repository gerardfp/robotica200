'use strict';

const { escapeHTML, escapeAttr } = require('../layout/utils');

function BadgeList(badges = []) {
  if (!badges || !badges.length) return '';
  return `<div class="detail-page-badges">
    ${badges.map(badge => `<span class="tag-badge${badge.primary ? ' primary' : ''}">
      ${badge.icon ? `<img src="${escapeAttr(badge.icon)}" alt="" class="tag-badge-icon" width="20" height="20">` : ''}
      <span>${escapeHTML(badge.text)}</span>
    </span>`).join('')}
  </div>`;
}

module.exports = { BadgeList };
