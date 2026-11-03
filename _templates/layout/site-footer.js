'use strict';

const isoBox = (cx, ty, s, h, [top, left, right]) => {
  const w = +(s * 0.866).toFixed(1), hh = s / 2;
  return `<polygon fill="${top}" points="${cx},${ty - hh} ${cx + w},${ty} ${cx},${ty + hh} ${cx - w},${ty}"/>` +
    `<polygon fill="${left}" points="${cx - w},${ty} ${cx},${ty + hh} ${cx},${ty + hh + h} ${cx - w},${ty + h}"/>` +
    `<polygon fill="${right}" points="${cx},${ty + hh} ${cx + w},${ty} ${cx + w},${ty + h} ${cx},${ty + hh + h}"/>`;
};

const footerBot = ({ c, accent }) => `
  <svg class="fbot-svg" viewBox="0 0 48 60" focusable="false">
    ${isoBox(24, 44, 13, 4, ['#475569', '#334155', '#1e293b'])}
    ${isoBox(24, 30, 12, 14, c)}
    <g><polygon fill="${accent}" points="33,33.5 36.5,31.5 36.5,40.5 33,42.5"/></g>
    <g>
      ${isoBox(24, 21, 8, 9, c)}
      <g fill="#e0f2fe">
        <polygon points="25.4,27.2 29.5,24.8 29.5,27.8 25.4,30.2"/>
        <polygon points="18.5,24.8 22.6,27.2 22.6,30.2 18.5,27.8"/>
      </g>
      <polygon fill="#334155" points="23.4,17 24.6,17 24.6,11 23.4,11"/>
      <polygon fill="${accent}" points="24,7 26.2,9.5 24,12 21.8,9.5"/>
    </g>
  </svg>`;

const FOOTER_BOTS = [
  { c: ['#ff5a5f', '#e4242b', '#b3151b'], accent: '#fec002' },
  { c: ['#ffa368', '#fc8439', '#d4621c'], accent: '#804cbd' },
  { c: ['#8bd152', '#60a62d', '#437a1c'], accent: '#fc7813' },
  { c: ['#3d9cf0', '#0079dc', '#005aa6'], accent: '#fdc80a' },
  { c: ['#ef54b8', '#d82098', '#a3126f'], accent: '#fddc3e' },
  { c: ['#7a828f', '#4a515d', '#30353d'], accent: '#047fdf' }
];

function SiteFooter({ root = '' } = {}) {
  return `
  <footer class="site-footer">
    <div class="site-footer-waves" aria-hidden="true">
      <svg class="footer-wave-svg" viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path class="footer-wave-back" d="M0,24 C320,54 640,6 960,36 C1200,52 1340,20 1440,26 L1440,62 L0,62 Z"></path>
        <path class="footer-wave-front" d="M0,36 C280,10 560,48 840,20 C1120,46 1320,16 1440,32 L1440,62 L0,62 Z"></path>
        <path class="footer-wave-line footer-wave-line-top" d="M0,18 C280,36 560,8 840,28 C1120,12 1300,34 1440,20"></path>
        <path class="footer-wave-line footer-wave-line-back" d="M0,24 C320,54 640,6 960,36 C1200,52 1340,20 1440,26"></path>
        <path class="footer-wave-line footer-wave-line-front" d="M0,36 C280,10 560,48 840,20 C1120,46 1320,16 1440,32"></path>
      </svg>
    </div>
    <div class="site-footer-body">
      <div class="container site-footer-inner">
        <p class="site-footer-motto">Aprendre fent, programar per a un futur millor.</p>
        <div class="footer-accent-dashes" aria-hidden="true">
          <span class="dash dash-red"></span>
          <span class="dash dash-yellow"></span>
          <span class="dash dash-blue"></span>
        </div>
        <p class="site-footer-brand">Robòtica<sup>200</sup> • Robòtica per a docents</p>
        <p class="site-footer-print"><a href="${root}imprimir/index.html">Materials imprimibles · PDF individual i recull complet</a></p>
        <div class="footer-robots" aria-hidden="true">
          ${FOOTER_BOTS.map(b => `<div class="fbot">${footerBot(b)}</div>`).join('')}
        </div>
      </div>
    </div>
  </footer>`;
}

module.exports = { SiteFooter };
