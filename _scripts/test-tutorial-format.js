const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const renderer = require('../_js/markdown.js');

const root = path.resolve(__dirname, '..');
const tutorialsDir = path.join(root, '_content', 'tutorials');
const tutorials = fs.readdirSync(tutorialsDir)
  .filter(name => name.startsWith('tutorial-') && name.endsWith('.md'))
  .sort();

const commonHeadings = [
  '## 🎯 Repte i objectius',
  '## 🧰 Materials i preparació',
  '## 🧩 Funcions del robot treballades',
  '## 👣 Seqüència guiada',
  '## 🧪 Prova, depura i reflexiona',
  '## ♿ Accessibilitat i seguretat',
  '## ✅ Evidències d’aprenentatge',
  '## 🔗 Fonts oficials i límits',
];

assert.equal(tutorials.length, 29, 'el catàleg local conté les 29 fitxes de tutorials esperades');

for (const name of tutorials) {
  const source = fs.readFileSync(path.join(tutorialsDir, name), 'utf8');
  const rendered = renderer.parse(source, `https://example.test/_content/tutorials/${name}`);
  assert.ok(rendered.data.title && rendered.html, `${name}: el Markdown es parsejable per la plantilla compartida`);
  const frontMatter = source.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(frontMatter, `${name}: té metadades YAML`);
  for (const field of ['title', 'description', 'robot', 'level', 'duration', 'order', 'image']) {
    assert.match(frontMatter[1], new RegExp(`^${field}:\\s*.+$`, 'm'), `${name}: declara ${field}`);
  }
  const image = frontMatter[1].match(/^image:\s*(.+)$/m)[1].trim();
  assert.ok(fs.existsSync(path.join(root, image)), `${name}: la portada local existe`);

  const headings = source.split('\n').filter(line => line.startsWith('## '));
  assert.deepEqual(headings, commonHeadings, `${name}: segueix exactament la plantilla i l'ordre comuns`);
  assert.match(source, /^### \d+\. /m, `${name}: organitza la guia en passos numerats`);
  assert.match(source, /^### Preguntes per comprovar$/m, `${name}: incorpora preguntes de comprovació`);
  assert.match(source, /https:\/\//, `${name}: inclou una font externa consultable`);
}

const voiceTutorial = fs.readFileSync(path.join(tutorialsDir, 'tutorial-tb-reconeixement-veu.md'), 'utf8');
assert.match(voiceTutorial, /^title: Gravació i reproducció de veu$/m, 'Tale-Bot separa la gravació d’àudio del reconeixement de parla');
assert.match(voiceTutorial, /No reconeix ni interpreta la parla com una ordre/, 'la fitxa no atribueix reconeixement de parla al Tale-Bot');

console.log(`Format comú correcte: ${tutorials.length} tutorials, ${commonHeadings.length} apartats en el mateix ordre.`);
