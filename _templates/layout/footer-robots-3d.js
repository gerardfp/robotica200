'use strict';

// Robots del peu en 3D real (CSS 3D, sense dependències).
// Coordenades en unitats de la graella isomètrica dels SVG d'Inkscape (1 u = 21 unitats del SVG):
//   x → cap avall a la dreta, y → cap avall a l'esquerra, z → amunt.
// La cara +y és el «davant» del robot (on té els ulls), igual que als SVG.
// Cada caixa: [x, y, z, amplada(x), fondària(y), alçada(z), color, colorSuperior?, llum?]

// Les rodes també són volums: es modelen amb cubs arrodonits per CSS.
const wheelsce = (xs, ys, z = 0, size = 1.3) => xs.flatMap(x => ys.map(y =>
  [x, y, z, 0.55, size, size, '#e61e20', '#f7302f', false, 'wheel']));

const wheelscr = (xs, ys, z = 0, size = 1.3) => xs.flatMap(x => ys.map(y =>
  [x, y, z, 0.55, size, size, '#282828', '#383838', false, 'wheel']));
const MODELS_3D = {
  'coding-express': {
    size: [4, 7],
    boxes: [
      ...wheelsce([-0.35, 3.8], [0.6, 4.8]),
      [0, 0, 1, 4, 7, 0.7, '#0270dd', '#0883ef'],
      [0.3, 2.8, 1.7, 3.4, 3.8, 1.7, '#fdb80a', '#ffd724'],
      [0.25, 0.3, 1.7, 3.5, 2.5, 3.1, '#fdb80a', '#ffd724'],
      [0, 0, 4.8, 4, 3.1, 0.5, '#fdb80a', '#ffd724'],
      [0.7, 2.8, 3.3, 2.6, 0.12, 1.1, '#80cbd9', '#bce9ef'],
      [3.75, 0.75, 3.2, 0.12, 1.5, 1.1, '#80cbd9'],
      [1.3, 4.6, 3.4, 1.4, 1.2, 1.4, '#dedee0', '#f0eeef'],
    ]
  },
  'coding-set': {
    size: [5, 5],
    boxes: [
      [0, 0, 0.8, 5, 5, 3, '#e9edf0', '#ffffff'],
      [0.4, 0.4, 3.8, 4.2, 4.2, 1.2, '#fd6404', '#fd7a0d'],
      [1, 1, 5.5, 3, 2.6, 0.3, '#fd6404', '#fd7a0d'],
      [1.8, 1.5, 5.7, 1.4, 1.4, 0.3, '#fd6404', '#fd7a0d', true],
      [0.7, 4.6, 2, 1.1, 0.5, 0.7, '#283d4b'],
      [3.2, 4.6, 2, 1.1, 0.5, 0.7, '#283d4b'],
      [2.1, 4.95, 1.1, 0.8, 0.2, 0.35, '#ef7e30']
    ]
  },
  'codey-rocky': {
    size: [5, 5],
    boxes: [
      ...wheelscr([-0.35, 4.8], [0.3, 2.9], 0, 1.6),
      [0, 0, 0.8, 5, 5, 1.2, '#dce2e7', '#f7f9fa'],
      [0.7, 1.5, 2, 3.6, 1.7, 3.2, '#e7ebef', '#ffffff'],
      [0.9, 3.2, 2.4, 3.2, 0.2, 2.4, '#25323e', '#344553'],
      [1.3, 3.42, 3.3, 0.65, 0.06, 0.65, '#4ad4ed', null, true],
      [3.05, 3.42, 3.3, 0.65, 0.06, 0.65, '#4ad4ed', null, true],
      [2.1, 3.42, 2.8, 0.8, 0.06, 0.2, '#4ad4ed', null, true],
      [0.3, 1.7, 3.7, 0.5, 1.2, 1.2, '#dce2e7'],
      [4.2, 1.7, 3.7, 0.5, 1.2, 1.2, '#dce2e7']
    ]
  },
  spike: {
    size: [5, 4],
    boxes: [
      [0.5, 1, 0, 1.5, 2.7, 0.7, '#343b48'],
      [3, 1, 0, 1.5, 2.7, 0.7, '#343b48'],
      [0.8, 1.3, 0.7, 1, 1.3, 1, '#079cbd', '#20bed7'],
      [3.2, 1.3, 0.7, 1, 1.3, 1, '#079cbd', '#20bed7'],
      [0.6, 0.8, 1.7, 3.8, 2, 2.2, '#eab82d', '#ffdb4d'],
      [-0.2, 1, 1.8, 0.8, 1.2, 1.8, '#079cbd', '#20bed7'],
      [4.4, 1, 1.8, 0.8, 1.2, 1.8, '#079cbd', '#20bed7'],
      [1.1, 1, 3.9, 2.8, 1.8, 1.7, '#e9edf0', '#ffffff'],
      [1.3, 2.8, 4.2, 2.4, 0.15, 1.1, '#283744'],
      [1.65, 2.97, 4.6, 0.5, 0.06, 0.45, '#06cbd6', null, true],
      [2.85, 2.97, 4.6, 0.5, 0.06, 0.45, '#06cbd6', null, true]
    ]
  },
  microbit: {
    size: [5, 2],
    boxes: [
      [0, 0.7, 0.3, 5, 0.55, 3.7, '#263440', '#405363'],
      [0.15, 0.65, 0, 4.7, 0.7, 0.45, '#c39c40', '#f0ce73'],
      [0.25, 1.25, 1.8, 0.65, 0.2, 0.65, '#a6adb4', '#d5dae0'],
      [4.1, 1.25, 1.8, 0.65, 0.2, 0.65, '#a6adb4', '#d5dae0'],
      [1.9, 0.55, 3.7, 1.2, 0.85, 0.5, '#a6adb4', '#d5dae0'],
      ...Array.from({ length: 25 }, (_, i) => {
        const x = i % 5, z = Math.floor(i / 5);
        const heart = ['01110', '11111', '11111', '01110', '00100'];
        return [1.35 + x * 0.48, 1.27, 2.95 - z * 0.46, 0.27, 0.08, 0.27,
          heart[z][x] === '1' ? '#ff2c00' : '#633a36', null, heart[z][x] === '1'];
      }),
      ...[0.45, 1.4, 2.35, 3.3, 4.25].map(x => [x, 1.26, 0.05, 0.3, 0.06, 0.5, '#f0ce73'])
    ]
  },
  'tale-bot': {
    size: [5, 5],
    boxes: [
      // Cos
      [0, 0, 0, 5, 5, 3.5, '#e6e6e6', '#dedede'],
      // Panell lateral taronja
      [5, 0.5, 1, 0.5, 4, 2, '#ff6900', '#fa9565'],
      [-0.5, 0.5, 1, 0.5, 4, 2, '#ff6900', '#fa9565'],
      // Ulls
      [3, 5, 1.5, 1.5, 0.5, 1.5, '#4c6593', '#283753'],
      [0.5, 5, 1.5, 1.5, 0.5, 1.5, '#4c6593', '#283753'],
      // Brillantor dels ulls
      [3, 5.5, 2.5, 0.5, 0.06, 0.5, '#f9f9f9'],
      [0.5, 5.5, 2.5, 0.5, 0.06, 0.5, '#f9f9f9'],
      // Tecles de direcció (s'encenen)
      [2, 0.5, 3.5, 1, 1, 0.5, '#e42d2f', '#dc0000', true],
      [0.5, 1.75, 3.5, 1, 1, 0.5, '#4da0c4', '#5ec0ea', true],
      [1.75, 1.75, 3.5, 1.5, 1.5, 0.5, '#ff7f4f', '#ff6900', true],
      [3.5, 2, 3.5, 1, 1, 0.5, '#c8c844', '#f7f700', true],
      [2, 3.5, 3.5, 1, 1, 0.5, '#38e239', '#30c731', true]
    ]
  }
};

const n = v => +(+v).toFixed(3);

function box3D([x, y, z, w, d, h, c, top, light, shape]) {
  const style = `--x:${n(x)};--y:${n(y)};--z:${n(z)};--w:${n(w)};--d:${n(d)};--h:${n(h)};--c:${c}${top ? `;--ct:${top}` : ''}`;
  return `<div class="v3-box${shape ? ` v3-${shape}` : ''}"${light ? ' data-light' : ''} style="${style}">` +
    '<i class="v3-f v3-t"></i><i class="v3-f v3-px"></i><i class="v3-f v3-nx"></i><i class="v3-f v3-py"></i><i class="v3-f v3-ny"></i>' +
    '</div>';
}

function robot3D(slug) {
  const model = MODELS_3D[slug];
  if (!model) return '';
  const [fw, fd] = model.size;
  return `<div class="fbot-pose"><div class="v3"><div class="v3-iso">` +
    `<div class="v3-yaw" style="--fw:${fw};--fd:${fd}">${model.boxes.map(box3D).join('')}</div>` +
    `</div></div></div>`;
}

module.exports = { MODELS_3D, robot3D };
