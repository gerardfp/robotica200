'use strict';

/**
 * _scripts/lib/html-dom.js
 *
 * Parser i serialitzador lleuger d'arbres HTML5 (DOM/AST) per a la Fase 2
 * del pipeline de compilació (HTML estàndard de markdown-it → HTML semàntic).
 */

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

const NAMED_ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: '\u00a0'
};

function decodeEntities(str) {
  return String(str).replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[a-zA-Z]+);/g, (match, entity) => {
    if (entity[0] === '#') {
      const code = entity[1].toLowerCase() === 'x'
        ? parseInt(entity.slice(2), 16)
        : parseInt(entity.slice(1), 10);
      return Number.isNaN(code) ? match : String.fromCodePoint(code);
    }
    return Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, entity)
      ? NAMED_ENTITIES[entity]
      : match;
  });
}

class DomNode {
  get textContent() {
    return '';
  }
  get innerHTML() {
    return '';
  }
  get outerHTML() {
    return '';
  }
}

class TextNode extends DomNode {
  constructor(rawHtmlText) {
    super();
    this.type = 'text';
    // Guardem el text tal com apareix en l'HTML (amb entitats escapades si ve de markdown-it)
    this.raw = String(rawHtmlText);
  }
  get textContent() {
    return decodeEntities(this.raw);
  }
  get outerHTML() {
    return this.raw.replace(/'/g, '&#39;');
  }
}

class CommentNode extends DomNode {
  constructor(data) {
    super();
    this.type = 'comment';
    this.data = String(data);
  }
  get outerHTML() {
    return `<!--${this.data}-->`;
  }
}

class RawHtmlNode extends DomNode {
  constructor(html) {
    super();
    this.type = 'raw';
    this.html = String(html);
  }
  get textContent() {
    return decodeEntities(this.html.replace(/<[^>]+>/g, ''));
  }
  get innerHTML() {
    return this.html;
  }
  get outerHTML() {
    return this.html;
  }
}

class ElementNode extends DomNode {
  constructor(tagName, attrs = {}, children = [], selfClosing = false) {
    super();
    this.type = 'element';
    this.tagName = String(tagName).toLowerCase();
    this.attrs = { ...attrs };
    this.children = children;
    this.selfClosing = selfClosing;
  }

  get textContent() {
    return this.children.map(child => child.textContent).join('');
  }

  get innerHTML() {
    return serializeNodes(this.children);
  }

  get outerHTML() {
    const attrStr = Object.entries(this.attrs)
      .filter(([, val]) => val !== undefined && val !== null && val !== false)
      .map(([key, val]) => (val === true || val === '' && key === 'hidden') ? ` ${key}` : ` ${key}="${String(val).replace(/"/g, '&quot;')}"`)
      .join('');

    if (VOID_ELEMENTS.has(this.tagName)) {
      return `<${this.tagName}${attrStr}>`;
    }
    if (this.selfClosing && this.children.length === 0) {
      return `<${this.tagName}${attrStr}/>`;
    }
    return `<${this.tagName}${attrStr}>${this.innerHTML}</${this.tagName}>`;
  }
}

function parseAttributes(attrText) {
  const attrs = {};
  if (!attrText || !attrText.trim()) return attrs;
  const regex = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of attrText.matchAll(regex)) {
    const name = match[1];
    const value = match[2] ?? match[3] ?? match[4];
    attrs[name] = value !== undefined ? decodeEntities(value) : true;
  }
  return attrs;
}

/**
 * Parsea una cadena HTML en un arbre DOM lleuger (ElementNode arrel 'root').
 */
function parseHTML(html) {
  const root = new ElementNode('root');
  const stack = [root];

  const tokenRegex = /<!--([\s\S]*?)-->|<script\b([^>]*)>([\s\S]*?)<\/script>|<style\b([^>]*)>([\s\S]*?)<\/style>|<\/([a-zA-Z][-a-zA-Z0-9:_]*)\s*>|<([a-zA-Z][-a-zA-Z0-9:_]*)((?:\s+[^/>"'=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*(\/?)>/gi;

  let lastIndex = 0;
  for (const match of html.matchAll(tokenRegex)) {
    if (match.index > lastIndex) {
      const textChunk = html.slice(lastIndex, match.index);
      stack[stack.length - 1].children.push(new TextNode(textChunk));
    }
    lastIndex = match.index + match[0].length;

    const [
      ,
      commentBody,
      scriptAttrs,
      scriptBody,
      styleAttrs,
      styleBody,
      closingTag,
      openingTag,
      attrString,
      slash
    ] = match;

    const currentParent = stack[stack.length - 1];

    if (commentBody !== undefined) {
      currentParent.children.push(new CommentNode(commentBody));
      continue;
    }

    if (scriptBody !== undefined) {
      const el = new ElementNode('script', parseAttributes(scriptAttrs), [new TextNode(scriptBody)]);
      currentParent.children.push(el);
      continue;
    }

    if (styleBody !== undefined) {
      const el = new ElementNode('style', parseAttributes(styleAttrs), [new TextNode(styleBody)]);
      currentParent.children.push(el);
      continue;
    }

    if (closingTag !== undefined) {
      const lowerClose = closingTag.toLowerCase();
      for (let i = stack.length - 1; i >= 1; i--) {
        if (stack[i].tagName === lowerClose) {
          stack.length = i;
          break;
        }
      }
      continue;
    }

    if (openingTag !== undefined) {
      const lowerOpen = openingTag.toLowerCase();
      const isSelfClosing = Boolean(slash) || VOID_ELEMENTS.has(lowerOpen);
      const el = new ElementNode(lowerOpen, parseAttributes(attrString), [], Boolean(slash) && !VOID_ELEMENTS.has(lowerOpen));
      currentParent.children.push(el);
      if (!isSelfClosing) {
        stack.push(el);
      }
    }
  }

  if (lastIndex < html.length) {
    stack[stack.length - 1].children.push(new TextNode(html.slice(lastIndex)));
  }

  return root;
}

function serializeNodes(nodes) {
  return nodes.map(n => n.outerHTML).join('');
}

module.exports = {
  VOID_ELEMENTS,
  decodeEntities,
  TextNode,
  CommentNode,
  RawHtmlNode,
  ElementNode,
  parseHTML,
  serializeNodes
};
