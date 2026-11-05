'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const renderer = require('../lib/markdown');
const { ICON_FILES } = require('../../_templates/components/section-icon');
const root = path.resolve(__dirname, '../..');
for (const file of Object.values(ICON_FILES)) {
  assert.ok(fs.existsSync(path.join(root, '_assets/icons/pack', file + '.webp')), `La icona ${file} existeix`);
}
let count = 0;
for (const dir of ['situacions', 'tutorials', 'activitats']) {
  for (const file of fs.readdirSync(path.join(root, '_content', dir)).filter(f => f.endsWith('.md') && !f.startsWith('TEMPLATE'))) {
    const rendered = renderer.parse(fs.readFileSync(path.join(root, '_content', dir, file), 'utf8'), `https://example.test/_content/${dir}/${file}`);
    for (const heading of rendered.html.matchAll(/<section class="detail-section(?: detail-section-intro)?"[^>]*><h2[^>]*>(.*?)<\/h2>/g)) {
      assert.match(heading[1], /<img class="section-icon"[^>]*src="\.\.\/\.\.\/_assets\/icons\/pack\/[^\"]+\.webp"[^>]*alt="" aria-hidden="true"/, `${file}: icona decorativa del pack`);
      assert.doesNotMatch(heading[1], /\p{Extended_Pictographic}/u, `${file}: cap emoji al títol`);
      count++;
    }
    for (const [, src] of rendered.html.matchAll(/<img[^>]+src="([^\"]*icons\/pack\/[^\"]+)"/g)) {
      assert.ok(fs.existsSync(path.join(root, decodeURIComponent(src.replace(/^(\.\.\/)+/, '')))), `${file}: ruta d'icona vàlida`);
    }
  }
}
console.log(`Section icons: ${count} seccions verificades`);

const { PHASE_ICONS, PhaseMarker } = require('../../_templates/components/phase-marker');
assert.equal(new Set(PHASE_ICONS).size, 5, 'cada fase té una icona original diferent');
for (const [index, icon] of PHASE_ICONS.entries()) {
  assert.ok(fs.existsSync(path.join(root, '_assets/icons/phases', icon + '.webp')), `existeix la parella d’icones ${icon}`);
  assert.match(PhaseMarker(index + 1), /icons\/phases\//, 'els marcadors usen les icones noves de dos verbs');
  assert.doesNotMatch(PhaseMarker(index + 1), /icons\/pack\//, 'els marcadors no reutilitzen el pack general');
}
