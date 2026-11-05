'use strict';

// Cada símbol integra els dos verbs seguint els esbossos de referència.
const PHASE_ICONS = [
  'activem-prediem-concept-v3',
  'explorem-construim-concept-v3',
  'expliquem-registrem-concept-v3',
  'apliquem-millorem-concept-v3',
  'comprovem-reflexionem-concept-v3'
];

function PhaseMarker(number) {
  const icon = PHASE_ICONS[number - 1] || PHASE_ICONS[0];
  return `<span class="phase-timeline-marker" aria-hidden="true"><img class="phase-timeline-icon" src="../../_assets/icons/phases/${icon}.svg" alt="" width="52" height="52" loading="lazy"></span>`;
}

module.exports = { PhaseMarker, PHASE_ICONS };
