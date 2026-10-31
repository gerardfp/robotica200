#!/usr/bin/env node
/**
 * render-scratchblocks.js
 *
 * Build-step renderer for ScratchBlocks.
 * Generates pure, self-contained SVG files from text-based block definitions
 * for Codey Rocky (mBlock 5 custom palette) and LEGO SPIKE Prime (SPIKE palette).
 *
 * No external npm packages or heavy browser runtimes required:
 * Uses a lightweight in-memory DOM shim with the official scratchblocks library.
 */

const fs = require('fs');
const path = require('path');

// 1. Lightweight headless DOM shim
class FakeNode {
  constructor(tag, ns) {
    this.tagName = tag;
    this.namespaceURI = ns || null;
    this.attributes = {};
    this.childNodes = [];
    this._textContent = '';
    this.classList = {
      add: (c) => {
        const cur = this.attributes['class'] || '';
        this.attributes['class'] = cur ? cur + ' ' + c : c;
      }
    };
    this.style = {};
  }
  get textContent() { return this._textContent; }
  set textContent(v) { this._textContent = v; }
  setAttribute(k, v) { this.attributes[k] = String(v); }
  setAttributeNS(ns, k, v) { this.setAttribute(k, v); }
  getAttribute(k) { return this.attributes[k]; }
  appendChild(child) {
    if (child) this.childNodes.push(child);
    return child;
  }
  insertBefore(newNode, refNode) {
    const idx = this.childNodes.indexOf(refNode);
    if (idx === -1) this.childNodes.push(newNode);
    else this.childNodes.splice(idx, 0, newNode);
    return newNode;
  }
  removeChild(child) {
    const idx = this.childNodes.indexOf(child);
    if (idx !== -1) this.childNodes.splice(idx, 1);
    return child;
  }
}

class FakeDoc {
  constructor() {
    this.head = new FakeNode('head');
    this.body = new FakeNode('body');
  }
  createElement(tag) { return new FakeNode(tag); }
  createElementNS(ns, tag) { return new FakeNode(tag, ns); }
  createTextNode(text) {
    const n = new FakeNode('#text');
    n.textContent = text;
    return n;
  }
  createCDATASection(data) {
    return { data, nodeType: 4 };
  }
}

// Proportional character width estimation for scratch block labels (12pt sans-serif)
function charWidth(ch, isBold) {
  if (ch === ' ' || ch === 'i' || ch === 'l' || ch === "'" || ch === '.' || ch === ':' || ch === ';') return isBold ? 4.5 : 3.5;
  if (ch === 'm' || ch === 'w' || ch === 'M' || ch === 'W' || ch === '@') return isBold ? 12 : 11;
  if (/[A-Z]/.test(ch)) return isBold ? 8.5 : 8.0;
  if (/[0-9]/.test(ch)) return isBold ? 7.5 : 7.0;
  return isBold ? 7.2 : 6.8;
}

const fakeCanvas = {
  font: '',
  getContext() {
    return {
      font: '',
      measureText: (text) => {
        const isBold = /bold/i.test(fakeCanvas.font || '');
        let w = 0;
        for (const ch of String(text)) {
          w += charWidth(ch, isBold);
        }
        return { width: Math.round(w) };
      }
    };
  }
};

const fakeDoc = new FakeDoc();
const origCreateElement = fakeDoc.createElement.bind(fakeDoc);
fakeDoc.createElement = (tag) => tag === 'canvas' ? fakeCanvas : origCreateElement(tag);

global.window = {
  document: fakeDoc,
  DOMParser: class {
    parseFromString() {
      return {
        createCDATASection(d) { return { data: d, nodeType: 4 }; }
      };
    }
  },
  XMLSerializer: class {
    serializeToString(node) {
      function serialize(n) {
        if (!n) return '';
        if (n.nodeType === 4) return '<![CDATA[' + n.data + ']]>';
        if (n.tagName === '#text') {
          return n.textContent
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        }
        let attrs = '';
        for (const [k, v] of Object.entries(n.attributes)) {
          attrs += ` ${k}="${String(v).replace(/"/g, '&quot;')}"`;
        }
        if (n.childNodes.length === 0 && !n.textContent) {
          return `<${n.tagName}${attrs}/>`;
        }
        let inner = n.childNodes.map(serialize).join('');
        if (n.textContent && n.childNodes.length === 0) {
          inner = n.textContent
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        }
        return `<${n.tagName}${attrs}>${inner}</${n.tagName}>`;
      }
      return serialize(node);
    }
  }
};

// 2. Load scratchblocks
const scratchblocksPath = path.join(__dirname, 'scratchblocks.js');
if (!fs.existsSync(scratchblocksPath)) {
  throw new Error(`scratchblocks.js not found at ${scratchblocksPath}`);
}
require(scratchblocksPath);
const scratchblocks = global.window.scratchblocks;

/**
 * Render scratchblocks code string into an SVG string.
 * @param {string} code - The scratchblocks code.
 * @param {object} [options] - Optional settings (style, scale, languages).
 * @returns {string} Fully self-contained SVG string.
 */
function renderScratchBlocks(code, options = {}) {
  const opts = {
    style: options.style || 'scratch3',
    scale: options.scale || 0.8,
    languages: options.languages || ['en']
  };

  const doc = scratchblocks.parse(code.trim(), { languages: opts.languages });
  const view = scratchblocks.newView(doc, { style: opts.style, scale: opts.scale });
  view.render();
  const svg = view.exportSVGString();
  return svg;
}

// 3. Official Sample Programs
const SAMPLES = {
  // Codey Rocky (mBlock 5): Track wheels, LED matrix, optical sensor, speaker
  'codey-rocky-sample': `
quan s'iniciï Codey :: hat #0079dc
mostra la imatge [cor v] :: #0096ff
per sempre :: cstart #ffab19
  mou endavant a potència (50) % :: #0079dc
  si <obstacle detectat? :: #00bebe> aleshores :: cstart #ffab19
    reprodueix el so [alarma v] :: #8a3ffc
    atura el moviment :: #0079dc
    mostra la imatge [sorpresa v] :: #0096ff
    gira a la dreta (90) graus :: #0079dc
  fi :: cend
fi :: cend
`,

  // LEGO SPIKE Prime: Motors A/B/C, distance sensor, 5x5 matrix Hub, buzzer
  'spike-sample': `
quan comenci el programa :: hat #fddc3e
assigna els motors de moviment a [B + C v] :: #cf2478
defineix la velocitat de moviment al (50) % :: #cf2478
encén la matriu 5x5 amb [somriure v] durant (2) segons :: #00a8a8
mou [endavant v] durant (20) cm :: #cf2478
espera fins que <distància sensor < (15) cm :: #047fdf>
reprodueix el to (60) durant (0.5) s :: #785ef0
activa el motor [A v] durant (1) rotacions :: #d82098
atura-ho tot :: cap #ff8c00
`
};

/**
 * Build all registered block samples to _assets/blocks/
 */
function buildAllBlocks() {
  const outDir = path.resolve(__dirname, '../_assets/blocks');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const results = [];
  for (const [name, code] of Object.entries(SAMPLES)) {
    const svg = renderScratchBlocks(code, { style: 'scratch3', scale: 0.8 });
    const targetFile = path.join(outDir, `${name}.svg`);
    fs.writeFileSync(targetFile, svg, 'utf8');
    results.push({ name, file: targetFile, size: svg.length });
    console.log(`[build-blocks] Generated: ${name}.svg (${(svg.length / 1024).toFixed(1)} KB)`);
  }
  return results;
}

if (require.main === module) {
  buildAllBlocks();
}

module.exports = {
  renderScratchBlocks,
  buildAllBlocks,
  SAMPLES
};
