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

assert.equal(tutorials.length, 34, 'el catàleg local conté les 34 fitxes de tutorials esperades');

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
  const steps = source.match(/^### \d+\. /gm) || [];
  assert.ok(steps.length >= 3, `${name}: organitza la guia en almenys tres passos numerats`);
  assert.match(source, /^### Preguntes per comprovar$/m, `${name}: incorpora preguntes de comprovació`);
  const questionSection = source.split('### Preguntes per comprovar', 2)[1].split('\n## ', 1)[0];
  assert.ok((questionSection.match(/^- .+\?$/gm) || []).length >= 3, `${name}: presenta almenys tres preguntes en llista`);
  for (const heading of commonHeadings) {
    const section = source.split(heading, 2)[1].split('\n## ', 1)[0].trim();
    assert.ok(section.length > 0, `${name}: completa l'apartat ${heading}`);
  }
  assert.match(source, /https:\/\//, `${name}: inclou una font externa consultable`);
}

const voiceTutorial = fs.readFileSync(path.join(tutorialsDir, 'tutorial-tb-reconeixement-veu.md'), 'utf8');
assert.match(voiceTutorial, /^title: Gravació i reproducció de veu$/m, 'Tale-Bot separa la gravació d’àudio del reconeixement de parla');
assert.match(voiceTutorial, /No reconeix ni interpreta la parla com una ordre/, 'la fitxa no atribueix reconeixement de parla al Tale-Bot');

const codingSetRoute = fs.readFileSync(path.join(tutorialsDir, 'tutorial-cs-obstacles-bandera.md'), 'utf8');
assert.match(codingSetRoute, /Obstacle Add-on|Sensor Add-on/, 'la guia diferencia els obstacles físics del complement de sensors');
assert.match(codingSetRoute, /el robot no el detecta ni l’esquiva automàticament/, 'la guia no atribueix detecció al Coding Set base');
assert.match(codingSetRoute, /bandera com a destinació/i, 'la guia treballa la bandera del conjunt base com a destinació');

const taleBotClear = fs.readFileSync(path.join(tutorialsDir, 'tutorial-tb-esborrat-depuracio.md'), 'utf8');
assert.match(taleBotClear, /menys d’un segon elimina l’última ordre/i, 'Tale-Bot documenta esborrat curt');
assert.match(taleBotClear, /més d’un segon esborra totes les ordres/i, 'Tale-Bot documenta esborrat llarg');
const taleBotRepeat = fs.readFileSync(path.join(tutorialsDir, 'tutorial-tb-repeticio-mapes-dansa.md'), 'utf8');
assert.match(taleBotRepeat, /no permet seleccionar només un fragment/i, 'Tale-Bot documenta el límit de la repetició');
const spikePython = fs.readFileSync(path.join(tutorialsDir, 'tutorial-sp-python-motor.md'), 'utf8');
assert.match(spikePython, /motor\.run_for_degrees\(port\.A, 360, 400\)/, 'SPIKE Prime inclou una prova executable en Python');
assert.match(spikePython, /MicroPython/, 'SPIKE Prime diferencia l’editor de MicroPython de Python complet');
const spikeIntro = fs.readFileSync(path.join(tutorialsDir, 'tutorial-sp-primeres-passes.md'), 'utf8');
assert.doesNotMatch(spikeIntro, /Hub SPIKE Prime o Essential/, 'la guia SPIKE Prime no confon els dos hubs');
const microbitPython = fs.readFileSync(path.join(tutorialsDir, 'tutorial-mb-python-microbit.md'), 'utf8');
assert.match(microbitPython, /from microbit import \*/, 'micro:bit inclou sintaxi MicroPython executable');
assert.match(microbitPython, /MakeCode Python.*MicroPython|MicroPython.*MakeCode Python/s, 'micro:bit diferencia els dos entorns Python');
const codeyPython = fs.readFileSync(path.join(tutorialsDir, 'tutorial-cr-python-upload.md'), 'utf8');
assert.match(codeyPython, /mode Upload/, 'Codey Rocky practica Python en el mode Upload oficial');
assert.match(codeyPython, /Live.*Upload|Upload.*Live/s, 'Codey Rocky diferencia Live i Upload');

console.log(`Format comú correcte: ${tutorials.length} tutorials, ${commonHeadings.length} apartats en el mateix ordre.`);
