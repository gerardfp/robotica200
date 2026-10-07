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
    const lines = match[1].split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const field = lines[i].match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (!field) continue;
      const key = field[1], raw = field[2];
      if (raw === '>' || raw === '|') {
        const parts = [];
        while (i + 1 < lines.length && /^\s{2,}\S/.test(lines[i + 1])) parts.push(lines[++i].trim());
        data[key] = parts.join(raw === '>' ? ' ' : '\n');
      } else if (!raw && i + 1 < lines.length && /^\s*-\s+/.test(lines[i + 1])) {
        const items = [];
        while (i + 1 < lines.length && /^\s*-\s+/.test(lines[i + 1])) {
          const itemLine = lines[++i].replace(/^\s*-\s+/, '');
          const itemField = itemLine.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
          if (!itemField) { items.push(parseScalar(itemLine)); continue; }
          const item = { [itemField[1]]: parseScalar(itemField[2]) };
          while (i + 1 < lines.length && /^\s{2,}[A-Za-z0-9_-]+:\s*/.test(lines[i + 1])) {
            const nested = lines[++i].trim().match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
            if (nested) item[nested[1]] = parseScalar(nested[2]);
          }
          items.push(item);
        }
        data[key] = items;
      } else if (!raw) data[key] = '';
      else data[key] = parseScalar(raw);
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
      const resolved = safeURL(href, base, false);
      const url = escapeHTML(resolved);
      const titleAttr = title ? ` title="${escapeHTML(title)}"` : '';
      let external = '';
      let ajaxTarget = '';
      try {
        const destination = new URL(resolved, base);
        const source = new URL(base);
        if (destination.origin !== source.origin) external = ' target="_blank" rel="noopener noreferrer"';
        else if (!destination.hash) {
          const path = destination.pathname;
          if (/\/(?:activitat|tutorial|robot|guia|situacio)\/index\.html$/.test(path) || /\/(?:index\.html)?$/.test(path)) {
            ajaxTarget = ' x-target.push="page-content"';
          }
        }
      } catch (_) { /* Keep malformed or unsupported links as ordinary links. */ }
      return stash(`<a href="${url}"${titleAttr}${ajaxTarget}${external}>${escapeHTML(label)}</a>`);
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

  const noteTypes = [
    [/^(situació|punt de partida|context):$/i, 'situation', '🧭'],
    [/^(materials|material|materials i preparació):$/i, 'materials', '🧰'],
    [/^(evidència|evidencia|producte|evidències i avaluació):$/i, 'evidence', '🔎'],
    [/^(pregunta|pregunta guia|repte|repte i intenció):$/i, 'question', '❓'],
    [/^(suport|participació|participació i límits|accessibilitat):$/i, 'support', '♿'],
    [/^(ampliació|extensió):$/i, 'extension', '🚀'],
    [/^(vocabulari|paraules clau):$/i, 'vocabulary', '💬'],
    [/^(aprenentatges|objectius):$/i, 'learning', '🎯'],
    [/^(límit del model|límit|precaució):$/i, 'limit', 'ℹ️'],
    [/^(activació|engage|explore|exploració|construcció|modelatge|programació|programa|proves?|test|explain|explicació|elaborate|evaluate|avaluació|tancament|reflexió|decisió|iteració|revisió|registre|eixida|disseny|ideació|prototip|depuració|presentació|comunicació|exercici|model|implementació|validació|preparació|investigació|contrast|intercanvi|feedback|lectura|planificació|maqueta|definició|pràctica|cas de prova|sortida|demostració|debrief)(?:\b|\s|·)/i, 'phase', '🧩']
  ];

  const listLabels = [
    [/^(evidència|evidencia|producte|resultat esperat)\s*:\s*/i, 'evidence', 'Evidència'],
    [/^(pregunta docent|pregunta per acompanyar|pregunta guia)\s*:\s*/i, 'question', 'Pregunta docent'],
    [/^(criteri(?: d'èxit| de disseny)?)\s*:\s*/i, 'criterion', 'Criteri'],
    [/^(depuració|si hi ha errors|revisió)\s*:\s*/i, 'debug', 'Revisió'],
    [/^(ampliació|extensió|opcional)\s*:\s*/i, 'extension', 'Ampliació'],
    [/^(temps|duració|durada)\s*:\s*/i, 'time', 'Temps']
  ];

  function renderListItem(raw, base) {
    const task = raw.match(/^\[([ xX])\]\s*(.*)$/);
    const text = task ? task[2] : raw;
    let content = inline(text, base);
    const labelMatch = text.match(/^(?:\*\*)?([^:*]{2,36}?)(?:\*\*)?:\s*/);
    const known = labelMatch && listLabels.find(([pattern]) => pattern.test(`${labelMatch[1]}:`));
    let body = content;
    let className = '';
    if (known) {
      const [, kind, label] = known;
      body = `<span class="markdown-list-label markdown-list-label-${kind}">${label}</span><span class="markdown-list-detail">${inline(text.slice(labelMatch[0].length), base)}</span>`;
      className = ` class="markdown-list-item markdown-list-item-${kind}"`;
    }
    if (task) {
      body = `<span class="markdown-task-mark" aria-hidden="true">${task[1].trim() ? '✓' : ''}</span><span class="markdown-list-detail">${body}</span>`;
      className = ' class="markdown-list-item markdown-task-item"';
    }
    return `<li${className}>${body}</li>`;
  }

  function renderParagraph(text, base) {
    const content = inline(text, base);
    const labels = [...content.matchAll(/<strong>([^<]+)<\/strong>/g)];
    const labelled = labels.map(match => ({ match, type: noteTypes.find(([pattern]) => pattern.test(match[1].trim())) }))
      .find(item => item.type);
    if (!labelled) return `<p>${content}</p>`;
    const { match, type } = labelled;
    const [, kind, icon] = type;
    const label = match[1].replace(/:$/, '');
    const before = content.slice(0, match.index).trim();
    const after = content.slice(match.index + match[0].length).trim();
    const prefix = before ? `<p>${before}</p>` : '';
    return `${prefix}<aside class="markdown-note markdown-note-${kind}"><span class="markdown-note-icon" aria-hidden="true">${icon}</span><div><h4>${escapeHTML(label)}</h4><p>${after}</p></div></aside>`;
  }

  function countWords(text) { return (text.match(/\S+/g) || []).length; }

  function splitLongParagraph(text, limit = 82) {
    if (countWords(text) <= limit) return [text];
    const sentences = text.split(/(?<=[.!?;])\s+/);
    const chunks = [];
    let current = '';
    for (const sentence of sentences) {
      const candidate = current + sentence;
      const delimitersBalanced = value => {
        const bold = (value.match(/\*\*/g) || []).length;
        const italic = (value.match(/(?<!\*)\*(?!\*)/g) || []).length;
        return bold % 2 === 0 && italic % 2 === 0;
      };
      if (current && countWords(candidate) > limit && delimitersBalanced(current)) {
        chunks.push(current.trim());
        current = sentence;
      } else current = candidate;
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks.length > 1 ? chunks : [text];
  }

  function canonicalSection(title) {
    const value = title.replace(/^[^\p{L}\p{N}]+/u, '').toLowerCase();
    const suffixMatch = title.match(/\s*(?:·|—)\s*(.+)$/);
    const suffix = suffixMatch ? ` · ${suffixMatch[1]}` : '';
    if (/^(seqüèn|seqüen|itinerari|sessions\b|passos\b|lliçons\b|fases\b)/.test(value)) return { key: 'sequence', title: `📅 Seqüència didàctica${suffix}` };
    if (/^repte\s+\d+/i.test(value)) return { key: 'sequence', title: `📅 ${title.replace(/^[^\p{L}\p{N}]+/u, '')}` };
    if (/^reptes\b/i.test(value)) return { key: 'sequence', title: `📅 Seqüència didàctica · ${title.replace(/^[^\p{L}\p{N}]+/u, '')}` };
    if (/^com usar\b/i.test(value)) return { key: 'intro', title: `🧭 ${title.replace(/^[^\p{L}\p{N}]+/u, '')}` };
    if (/^(repte\b|situació|situacio|punt de partida|punt de trobada|sentit i intenció|context\b|propòsit|proposit)/.test(value)) return { key: 'intro', title: '🌱 Situació, repte i intenció' };
    if (/materials|preparació|preparacio|abans de començar/.test(value)) return { key: 'materials', title: '🧰 Materials i preparació' };
    if (/evidèn|eviden|avaluació|avaluacio|autoavaluació/.test(value)) return { key: 'assessment', title: '🧪 Evidències i avaluació' };
    if (/participació|participacio|manera de participar|inclusió|inclusio|accessibilitat|privacitat|seguretat|salvaguardes|límits|limites|adaptacions|ús responsable/.test(value)) return { key: 'access', title: '♿ Participació, accessibilitat i seguretat' };
    if (/aprenentatge|vocabulari|objectius|resultats d.aprenentatge/.test(value)) return { key: 'learning', title: '🎯 Aprenentatges i vocabulari' };
    if (/oficial|adaptació|adaptacio|referent|font consultada/.test(value)) return { key: 'official', title: '🔗 Referent oficial i adaptació' };
    return { key: '', title };
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
    let introPending = false;
    const closePhase = () => { if (openPhase) { output.push('</section>'); openPhase = false; } };
    const closeStep = () => { closePhase(); if (openStep) { output.push('</section>'); openStep = false; } };
    const closeSection = () => { closeStep(); if (openSection) { output.push('</section>'); openSection = false; } introPending = false; };
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
          const section = canonicalSection(plainTitle);
          sequenceSection = section.key !== 'intro' && /(seqüèn|seqüen|itinerari|sessions|passos|lliçons|repte|reptes|fases|àmbits)/i.test(plainTitle);
          output.push(`<section class="detail-section${section.key === 'intro' ? ' detail-section-intro' : ''}"><h2 id="${id}">${inline(section.title, sourceURL)}</h2>`);
          openSection = true;
          introPending = section.key === 'intro';
        } else if (level === 3 && (isStep(plainTitle) || sequenceSection)) {
          if (!openSection) { output.push('<section class="detail-section">'); openSection = true; }
          closeStep();
          const stepNumber = steps.length + 1;
          output.push(`<section class="learning-step" id="${id}" data-step="${stepNumber}" x-show="step === ${steps.length}" x-cloak><header class="learning-step-header"><span class="learning-step-kicker">Pas ${stepNumber}</span><h3>${inline(title, sourceURL)}</h3></header>`);
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
        const label = content.match(/^<p><strong>([^<]+)<\/strong>\s*(.*?)<\/p>/s);
        const note = label && noteTypes.find(([pattern]) => pattern.test(label[1].trim()));
        if (note) {
          const [, kind, icon] = note;
          output.push(`<aside class="markdown-note markdown-note-${kind}"><span class="markdown-note-icon" aria-hidden="true">${icon}</span><div><h4>${escapeHTML(label[1].replace(/:$/, ''))}</h4><p>${label[2]}</p>${content.replace(label[0], '')}</div></aside>`);
        } else {
          output.push(`<aside class="markdown-callout${isEvidence ? ' markdown-evidence' : ''}">${content}</aside>`);
        }
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
          items.push(item);
          i += 1;
        }
          const renderedItems = items.map(item => renderListItem(item, sourceURL));
          const listClass = renderedItems.some(item => /markdown-(?:list-item|task-item)/.test(item)) ? ' class="markdown-structured-list"' : '';
          output.push(`<${tag}${listClass}>${renderedItems.join('')}</${tag}>`);
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
      for (const chunk of splitLongParagraph(paragraph.join(' '))) {
        let rendered = renderParagraph(chunk, sourceURL);
        if (introPending) {
          introPending = false;
          if (!rendered.includes('markdown-note')) {
            rendered = `<aside class="markdown-note markdown-note-situation"><span class="markdown-note-icon" aria-hidden="true">🧭</span><div><h4>Punt de partida</h4>${rendered}</div></aside>`;
          }
        }
        output.push(rendered);
      }
    }
    closeSection();

    const stepIndex = steps.length ? `<nav class="learning-step-index learning-wizard" aria-label="Passos de la situació">
      <strong>Seqüència de treball</strong>
      <p class="learning-wizard-status" role="status" aria-live="polite" aria-atomic="true" x-text="'Pas ' + (step + 1) + ' de ' + steps.length + ' · ' + steps[step].title"></p>
      <div class="learning-wizard-progress" role="progressbar" aria-label="Progrés de la seqüència" aria-valuemin="1" :aria-valuemax="steps.length" :aria-valuenow="step + 1" :aria-valuetext="'Pas ' + (step + 1) + ' de ' + steps.length">
        <span :style="'width: ' + ((step + 1) / steps.length * 100) + '%'" aria-hidden="true"></span>
      </div>
      <ol class="learning-wizard-picker" aria-label="Tria un pas"><template x-for="(item, index) in steps" :key="item.id"><li><button type="button" class="learning-wizard-step" x-on:click="step = index" :aria-label="'Obrir pas ' + (index + 1) + ': ' + item.title" :aria-current="step === index ? 'step' : null"><span class="learning-wizard-step-number" x-text="index + 1"></span><span class="learning-wizard-step-title" x-text="item.title"></span></button></li></template></ol>
      <div class="learning-wizard-controls"><button type="button" class="btn-wizard-step" x-on:click="step = Math.max(0, step - 1)" :disabled="step === 0">← Pas anterior</button><button type="button" class="btn-wizard-step primary" x-on:click="step = Math.min(steps.length - 1, step + 1)" :disabled="step === steps.length - 1">Pas següent →</button></div>
    </nav>` : '';
    return { data, html: stepIndex + output.join('\n'), steps };
  }

  global.RoboticsMarkdown = { parse: renderMarkdown, splitFrontMatter };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.RoboticsMarkdown;
})(typeof window !== 'undefined' ? window : globalThis);
