/* Petit renderitzador Markdown local per a les fitxes editorials.
 * Admet front matter YAML pla, títols, paràgrafs, llistes, cites, taules,
 * imatges, enllaços, codi i les targetes de sessió/fase del projecte.
 * No interpreta HTML cru: el contingut editorial no pot injectar markup.
 */
(function (global) {
  'use strict';

  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  function parseScalar(raw) {
    const value = raw.trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      try { return JSON.parse(value); } catch (_) { return value.slice(1, -1); }
    }
    if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1).replace(/''/g, "'");
    if (/^(true|false)$/i.test(value)) return value.toLowerCase() === 'true';
    return value;
  }

  function splitFrontMatter(source) {
    const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
    if (!match) return { data: {}, body: source };
    const data = {};
    for (const line of match[1].split(/\r?\n/)) {
      const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (field) data[field[1]] = parseScalar(field[2]);
    }
    return { data, body: source.slice(match[0].length) };
  }

  function safeURL(raw, base, image) {
    const value = raw.trim();
    if (value.startsWith('#')) return value;
    try {
      const url = new URL(value, base);
      if (!['http:', 'https:', 'mailto:'].includes(url.protocol)) return '#';
      if (image && url.protocol === 'mailto:') return '#';
      return url.href;
    } catch (_) { return '#'; }
  }

  function inline(text, base) {
    const tokens = [];
    const stash = html => `\u0000${tokens.push(html) - 1}\u0000`;
    let value = String(text);
    value = value.replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g, (_, alt, href, title) => {
      const src = escapeHTML(safeURL(href, base, true));
      const titleAttr = title ? ` title="${escapeHTML(title)}"` : '';
      return stash(`<img src="${src}" alt="${escapeHTML(alt)}"${titleAttr} width="600" height="448" loading="lazy">`);
    });
    value = value.replace(/\[([^\]]+)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g, (_, label, href, title) => {
      const url = escapeHTML(safeURL(href, base, false));
      const titleAttr = title ? ` title="${escapeHTML(title)}"` : '';
      const external = /^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : '';
      return stash(`<a href="${url}"${titleAttr}${external}>${escapeHTML(label)}</a>`);
    });
    value = escapeHTML(value);
    value = value.replace(/`([^`]+)`/g, '<code>$1</code>');
    value = value.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    value = value.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    return value.replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)]);
  }

  const slugify = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  function highlight(code, language) {
    const lang = language.toLowerCase();
    if (lang === 'blocks' || lang === 'scratch') {
      return code.split('\n').map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '<span class="program-line program-line-blank">&nbsp;</span>';
        let kind = 'action';
        if (/^(if|si|quan|when)\b/i.test(trimmed)) kind = 'event';
        else if (/^(repeat|repeat until|forever|repet|repeteix|mentre|for)\b/i.test(trimmed)) kind = 'control';
        else if (/^(read|sensor|llegeix|afegeix|append|set|estableix|variable)\b/i.test(trimmed)) kind = 'data';
        else if (/^(say|show|play|sound|mostra|so|llum|light)\b/i.test(trimmed)) kind = 'output';
        return `<span class="program-line"><span class="block-chip block-${kind}">${escapeHTML(line)}</span></span>`;
      }).join('');
    }
    const pattern = /(#[^\n]*|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:if|else|elif|for|while|in|def|return|and|or|not|True|False|None|repeat|until|forever|when|set|to|read|append|if|then|otherwise|end|si|altrament|repeteix|fins|llegeix|afegeix|estableix|mostra|atura)\b|\b\d+(?:\.\d+)?\b)/g;
    let result = '';
    let cursor = 0;
    for (const match of code.matchAll(pattern)) {
      result += escapeHTML(code.slice(cursor, match.index));
      const token = match[0];
      let kind = 'keyword';
      if (/^(#|\/\/)/.test(token)) kind = 'comment';
      else if (/^["']/.test(token)) kind = 'string';
      else if (/^\d/.test(token)) kind = 'number';
      result += `<span class="syntax-${kind}">${escapeHTML(token)}</span>`;
      cursor = match.index + token.length;
    }
    return result + escapeHTML(code.slice(cursor));
  }

  function renderMarkdown(source, sourceURL) {
    const { data, body } = splitFrontMatter(source);
    const lines = body.replace(/\r\n?/g, '\n').split('\n');
    const output = [];
    const steps = [];
    let openSection = false;
    let openStep = false;
    let openPhase = false;
    let sequenceSection = false;
    const closePhase = () => { if (openPhase) { output.push('</section>'); openPhase = false; } };
    const closeStep = () => { closePhase(); if (openStep) { output.push('</section>'); openStep = false; } };
    const closeSection = () => { closeStep(); if (openSection) { output.push('</section>'); openSection = false; } };
    const isStep = title => /^(sessió|sessio|lliçó|lliço|lliço|lesson|session)\s+\d+/i.test(title);
    const isPhase = title => /^(fase|pas|phase|step)\s+\d+/i.test(title);

    for (let i = 0; i < lines.length;) {
      const line = lines[i];
      if (!line.trim()) { i += 1; continue; }

      const fence = line.match(/^```\s*([\w+-]*)\s*$/);
      if (fence) {
        const lang = fence[1] || 'text';
        const code = [];
        i += 1;
        while (i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i++]);
        if (i < lines.length) i += 1;
        const safeLang = escapeHTML(lang);
        const codeHTML = highlight(code.join('\n'), lang);
        output.push(`<figure class="code-panel"><figcaption>Exemple de programació · ${safeLang}</figcaption><pre class="code-block" tabindex="0"><code class="language-${safeLang}">${codeHTML}</code></pre></figure>`);
        continue;
      }

      const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
      if (heading) {
        const level = heading[1].length;
        const title = heading[2].trim();
        const plainTitle = title.replace(/\*\*|__|`/g, '').trim();
        const id = slugify(plainTitle);
        if (level === 2) {
          closeSection();
          sequenceSection = /(seqüèn|seqüen|itinerari|sessions|passos|lliçons|repte|reptes|fases|àmbits)/i.test(plainTitle);
          output.push(`<section class="detail-section"><h2 id="${id}">${inline(title, sourceURL)}</h2>`);
          openSection = true;
        } else if (level === 3 && (isStep(plainTitle) || sequenceSection)) {
          if (!openSection) { output.push('<section class="detail-section">'); openSection = true; }
          closeStep();
          output.push(`<section class="learning-step" id="${id}"><h3>${inline(title, sourceURL)}</h3>`);
          openStep = true;
          steps.push({ id, title: plainTitle });
        } else if (level === 4 && isPhase(plainTitle)) {
          if (!openSection) { output.push('<section class="detail-section">'); openSection = true; }
          closePhase();
          output.push(`<section class="learning-phase"><h4>${inline(title, sourceURL)}</h4>`);
          openPhase = true;
        } else {
          output.push(`<h${level} id="${id}">${inline(title, sourceURL)}</h${level}>`);
        }
        i += 1;
        continue;
      }

      if (/^\s*---+\s*$/.test(line)) { closeSection(); output.push('<hr>'); i += 1; continue; }

      const image = line.match(/^\s*!\[([^\]]*)\]\(([^)]+)\)\s*$/);
      if (image) {
        const src = escapeHTML(safeURL(image[2], sourceURL, true));
        let caption = '';
        let captionLine = i + 1;
        while (captionLine < lines.length && !lines[captionLine].trim()) captionLine += 1;
        if (lines[captionLine] && /^\s*_[^_].*_[ \t]*$/.test(lines[captionLine])) {
          caption = inline(lines[captionLine].trim().slice(1, -1), sourceURL);
          i = captionLine;
        }
        output.push(`<figure class="sa-illustration"><img src="${src}" alt="${escapeHTML(image[1])}" width="600" height="448" loading="lazy">${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`);
        i += 1;
        continue;
      }

      if (/^\s*>/.test(line)) {
        const quote = [];
        while (i < lines.length && /^\s*>/.test(lines[i])) quote.push(lines[i++].replace(/^\s*>\s?/, ''));
        const content = quote.map(text => `<p>${inline(text, sourceURL)}</p>`).join('');
        const isEvidence = /<strong>(evidència|evidencia|producte|pregunta docent|repte)/i.test(content);
        output.push(`<aside class="markdown-callout${isEvidence ? ' markdown-evidence' : ''}">${content}</aside>`);
        continue;
      }

      if (/^\s*[-*+]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
        const ordered = /^\s*\d+[.)]\s+/.test(line);
        const tag = ordered ? 'ol' : 'ul';
        const items = [];
        while (i < lines.length) {
          if (!lines[i].trim() && i + 1 < lines.length && (ordered ? /^\s*\d+[.)]\s+/.test(lines[i + 1]) : /^\s*[-*+]\s+/.test(lines[i + 1]))) { i += 1; continue; }
          if (!(ordered ? /^\s*\d+[.)]\s+/.test(lines[i]) : /^\s*[-*+]\s+/.test(lines[i]))) break;
          const item = lines[i].replace(/^\s*(?:[-*+]|\d+[.)])\s+/, '');
          items.push(`<li>${inline(item, sourceURL)}</li>`);
          i += 1;
        }
        output.push(`<${tag}>${items.join('')}</${tag}>`);
        continue;
      }

      if (line.includes('|') && i + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[i + 1])) {
        const cells = value => value.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());
        const headers = cells(line);
        i += 2;
        const rows = [];
        while (i < lines.length && lines[i].includes('|')) { rows.push(cells(lines[i++])); }
        output.push(`<div class="markdown-table-wrap"><table><thead><tr>${headers.map(cell => `<th scope="col">${inline(cell, sourceURL)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${headers.map((_, index) => `<td>${inline(row[index] || '', sourceURL)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
        continue;
      }

      const paragraph = [line.trim()];
      i += 1;
      while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|```|\s*>|\s*[-*+]\s|\s*\d+[.)]\s|\s*---+\s*$)/.test(lines[i])) {
        paragraph.push(lines[i++].trim());
      }
      output.push(`<p>${inline(paragraph.join(' '), sourceURL)}</p>`);
    }
    closeSection();

    const stepIndex = steps.length ? `<nav class="learning-step-index" aria-label="Passos de la situació"><strong>Ves directament a un pas</strong><ol>${steps.map(step => `<li><a href="#${step.id}">${escapeHTML(step.title)}</a></li>`).join('')}</ol></nav>` : '';
    return { data, html: stepIndex + output.join('\n'), steps };
  }

  global.RoboticsMarkdown = { parse: renderMarkdown, splitFrontMatter };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.RoboticsMarkdown;
})(typeof window !== 'undefined' ? window : globalThis);
