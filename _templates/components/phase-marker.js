'use strict';

// Cada icona original conté dos pictogrames, un per cada verb de la fase.
const PHASE_ICONS = [
  'activem-prediem-simple-v2',
  'explorem-construim-simple-v2',
  'expliquem-registrem-simple-v2',
  'apliquem-millorem-simple-v2',
  'comprovem-reflexionem-simple-v2'
];

function PhaseMarker(number) {
  const icon = PHASE_ICONS[number - 1] || PHASE_ICONS[0];
  return `<span class="phase-timeline-marker" aria-hidden="true"><img class="phase-timeline-icon" src="../../_assets/icons/phases/${icon}.webp" alt="" width="72" height="36" loading="lazy"></span>`;
}

module.exports = { PhaseMarker, PHASE_ICONS };
