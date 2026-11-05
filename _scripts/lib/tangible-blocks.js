'use strict';

const { escapeHTML } = require('../../_templates/layout/utils');
const DIALECTS = { talebot: 'talebot', 'tale-bot': 'talebot', 'coding-set': 'coding-set', codingset: 'coding-set' };
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
const COMMANDS = {
  forward: ['avanzar', 'avancar', 'adelante', 'endavant', '↑'],
  back: ['retroceder', 'retrocedir', 'atras', 'enrere', '↓'],
  right: ['girar derecha', 'girar a la derecha', 'girar dreta', 'girar a la dreta', 'dreta', 'derecha', '↱'],
  left: ['girar izquierda', "girar a l’esquerra", "girar a l'esquerra", 'girar esquerra', 'esquerra', 'izquierda', '↰']
};
const EXTRA_COMMANDS = {
  talebot: { record: ['gravacio', 'grabacion'], dance: ['dansa', 'baile'] },
  'coding-set': { define: ['defineix funcio', 'definir funcion'], call: ['crida funcio', 'llamar funcion'], random: ['aleatori', 'aleatorio'], music: ['musica'], dance: ['dansa', 'baile'] }
};
const LABELS = { record: 'Reprodueix la gravació (pulsació curta)', dance: 'Dansa predefinida', define: 'Defineix funció', call: 'Crida funció', random: 'Moviment aleatori', music: 'Música predefinida', forward: 'Endavant', back: 'Enrere', right: 'Gir a la dreta', left: 'Gir a l’esquerra', loop: 'Inici del bucle', end: 'Fi del bucle', play: 'Executa', clear: 'Esborra' };

function parseSequence(source, dialect) {
  const tokens = String(source).split(/\r?\n|->|→/).map(s => s.trim()).filter(Boolean);
  if (!tokens.length) throw new Error('La seqüència està buida.');
  const blocks = [];
  let depth = 0;
  for (const token of tokens) {
    const key = normalize(token);
    const command = Object.keys(COMMANDS).find(name => COMMANDS[name].includes(key));
    if (command) { blocks.push({ type: command }); continue; }
    const extra = Object.entries(EXTRA_COMMANDS[dialect] || {}).find(([, aliases]) => aliases.includes(key));
    if (extra) { blocks.push({ type: extra[0] }); continue; }
    const repeat = key.match(/^(?:repetir|repeteix) ([2-5])$/);
    if (dialect === 'coding-set' && repeat) {
      blocks.push({ type: 'loop', number: repeat[1] }); depth++; continue;
    }
    if (dialect === 'coding-set' && /^(fi|fin|end)$/.test(key) && depth) {
      blocks.push({ type: 'end' }); depth--; continue;
    }
    if (dialect === 'coding-set' && /^[2-5]$/.test(key) && blocks.length && ['forward', 'back'].includes(blocks.at(-1).type) && !blocks.at(-1).number) {
      blocks.at(-1).number = key; continue;
    }
    if (dialect === 'talebot' && /^(executa|iniciar|ejecutar|play)$/.test(key)) { blocks.push({ type: 'play' }); continue; }
    if (dialect === 'talebot' && /^(esborra|borrar)$/.test(key)) { blocks.push({ type: 'clear' }); continue; }
    throw new Error(`Instrucció no reconeguda en ${dialect}: «${token}».`);
  }
  if (depth) throw new Error('Falta «fi» per tancar el bucle.');
  return blocks;
}

function icon(type) {
  const straight = '<path d="M32 47V18m-12 12 12-12 12 12"/>';
  if (type === 'forward') return straight;
  if (type === 'back') return `<g transform="rotate(180 32 32)">${straight}</g>`;
  if (type === 'right' || type === 'left') {
    const turn = '<path d="M29 21h17m-10-10 10 10-10 10"/><g fill="white" stroke="none"><circle cx="18" cy="21" r="2.5"/><circle cx="15" cy="30" r="2.5"/><circle cx="21" cy="38" r="2.5"/><circle cx="27" cy="46" r="2.5"/></g>';
    return type === 'left' ? `<g transform="translate(64 0) scale(-1 1)">${turn}</g>` : turn;
  }
  if (type === 'loop' || type === 'end') return '<path d="M42 19a18 18 0 0 0-25 23m5-13-5 13-8-9M22 45a18 18 0 0 0 25-23m-5 13 5-13 8 9"/>';
  if (type === 'record') return '<rect x="27" y="15" width="10" height="22" rx="5"/><path d="M21 30v3a11 11 0 0 0 22 0v-3M32 44v7m-7 0h14"/>';
  if (type === 'music') return '<path d="M26 43V20l20-4v23M26 24l20-4"/><ellipse cx="20" cy="44" rx="6" ry="4"/><ellipse cx="40" cy="40" rx="6" ry="4"/>';
  if (type === 'dance' || type === 'random') return `<circle cx="32" cy="15" r="4" fill="currentColor" stroke="none"/><path d="M32 24v15m0-12-13-7m13 7 13-10M32 39l-11 12m11-12 12 10"/>${type === 'random' ? '<path d="M45 33h9m-4-4 4 4-4 4" stroke-width="3"/>' : ''}`;
  if (type === 'define' || type === 'call') return `<text x="32" y="43" text-anchor="middle" fill="white" stroke="none" font-family="Plus Jakarta Sans, sans-serif" font-style="italic" font-size="30" font-weight="700">fn</text>${type === 'call' ? '<path d="M17 45a23 23 0 1 1 31 0M12 39l5 6 5-5" stroke-width="2"/>' : ''}`;
  if (type === 'play') return '<path d="m24 17 22 15-22 15Z" fill="white" stroke="none"/>';
  return '<path d="M20 32h24M32 20v24"/>';
}

function renderTangibleBlocks(source, language) {
  const dialect = DIALECTS[language];
  if (!dialect) throw new Error('Robot desconegut.');
  const blocks = parseSequence(source, dialect);
  const tale = dialect === 'talebot';
  const colors = tale ? { forward: '#ff625f', back: '#a4e83b', right: '#f3e529', left: '#4db9f4', record: '#ffffff', dance: '#ffffff', play: '#ff8849', clear: '#ffffff' } : { forward: '#8fc32c', back: '#8fc32c', right: '#8fc32c', left: '#8fc32c', loop: '#006c3d', end: '#006c3d', define: '#f4df13', call: '#f4df13', random: '#922785', music: '#922785', dance: '#922785' };
  const width = blocks.length * 88 + 16;
  const description = blocks.map(b => `${LABELS[b.type]}${b.number ? ` (${b.number})` : ''}`).join(' → ');
  const pieces = blocks.map((block, i) => {
    const x = i * 88 + 12;
    const shape = tale ? `<rect x="0" y="0" width="64" height="64" rx="23" fill="${colors[block.type]}" stroke="#cbd5e1"/>` : `<path d="M5 0H59Q64 0 64 5V59Q64 64 59 64H39L35 60H29L25 64H5Q0 64 0 59V5Q0 0 5 0Z" fill="${colors[block.type]}"/>`;
    const number = block.number ? `<rect y="66" width="64" height="28" rx="4" fill="#12aff0"/><text x="32" y="86" text-anchor="middle" fill="white" font-family="Plus Jakarta Sans, sans-serif" font-weight="700" font-size="20">${block.number}</text>` : '';
    const connector = tale && i < blocks.length - 1 ? '<path d="M71 32h10m-4-4 4 4-4 4" stroke="#64748b" stroke-width="2" fill="none"/>' : '';
    return `<g transform="translate(${x} 12)"><title>${escapeHTML(LABELS[block.type])}</title>${shape}<g color="${tale && block.type === 'dance' ? '#d94bc8' : 'white'}" fill="none" stroke="${block.type === 'clear' ? '#ff454c' : tale && block.type === 'record' ? '#00c9cd' : tale && block.type === 'dance' ? '#d94bc8' : 'white'}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${icon(block.type)}</g>${number}${connector}</g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" class="tangible-sequence" role="img" aria-label="${escapeHTML(description)}" width="${width}" height="118" viewBox="0 0 ${width} 118"><title>${escapeHTML(description)}</title>${pieces}</svg>`;
}

module.exports = { DIALECTS, parseSequence, renderTangibleBlocks };
