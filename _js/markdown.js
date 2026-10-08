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

  function orderDetailSections(html) {
    const priority = { intro: 0, learning: 1, materials: 2, sequence: 3, other: 4, assessment: 5, access: 6, official: 7 };
    const sections = [];
    const tags = /<\/?section\b[^>]*>/g;
    let depth = 0, start = -1, cursor = 0;
    for (const match of html.matchAll(tags)) {
      const opening = !/^<\//.test(match[0]);
      if (opening) {
        if (depth === 0) {
          if (sections.length && cursor < match.index) sections[sections.length - 1].markup += html.slice(cursor, match.index);
          start = match.index;
        }
        depth += 1;
      } else if (depth > 0) {
        depth -= 1;
        if (depth === 0 && start >= 0) {
          const markup = html.slice(start, match.index + match[0].length);
          const group = markup.match(/^<section\b[^>]*\bdata-section-group="([a-z]+)"/)?.[1] || 'other';
          sections.push({ markup, group, order: sections.length, start });
          cursor = match.index + match[0].length;
          start = -1;
        }
      }
    }
    if (sections.length < 2) return html;
    const prefix = html.slice(0, sections[0].start);
    const suffix = html.slice(cursor);
    sections.sort((a, b) => (priority[a.group] ?? priority.other) - (priority[b.group] ?? priority.other) || a.order - b.order);
    return prefix + sections.map(section => section.markup).join('\n') + suffix;
  }

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
    [/^(pregunt(?:a|es) docents?|pregunta|pregunta guia|repte|repte i intenció):$/i, 'question', '❓'],
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
    const labels = [...content.matchAll(/<(strong|em)>([^<]+)<\/\1>/g)];
    const labelled = labels.map(match => ({ match, label: match[2].trim(), type: noteTypes.find(([pattern]) => pattern.test(match[2].trim())) }))
      .find(item => item.type);
    if (!labelled) return `<p>${content}</p>`;
    const { match, label, type } = labelled;
    const [, kind, icon] = type;
    const title = label.replace(/:$/, '');
    const before = content.slice(0, match.index).trim();
    const after = content.slice(match.index + match[0].length).trim();
    const prefix = before ? `<p>${before}</p>` : '';
    return `${prefix}<aside class="markdown-note markdown-note-${kind}"><span class="markdown-note-icon" aria-hidden="true">${icon}</span><div><h4>${escapeHTML(title)}</h4><p>${after}</p></div></aside>`;
  }

  function countWords(text) { return (text.match(/\S+/g) || []).length; }

  function splitLongParagraph(text, limit = 82) {
    if (countWords(text) <= limit) return [text];
    const sentences = text.split(/(?<=[.!?;])\s+/);
    const chunks = [];
    let current = '';
    for (const sentence of sentences) {
      const candidate = current ? `${current} ${sentence}` : sentence;
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
    const value = title.replace(/^[^\p{L}\p{N}]+/u, '').trim().toLowerCase();
    const suffixMatch = title.match(/\s*(?:·|—)\s*(.+)$/);
    const suffix = suffixMatch ? ` · ${suffixMatch[1]}` : '';
    if (/^repte\s+\d+/i.test(value)) return { key: 'sequence', title: '📅 Seqüència didàctica' };
    if (/^(seqüèn|seqüen|itinerari|sessions\b|passos\b|lliçons\b|fases\b|activitats\b|desenvolupament\b|projecte en\b|set (?:reptes|estands)\b|deu reptes\b|guió de treball\b|conducció de les sessions\b|ritme i conducció\b|procés de disseny\b|detall de les sis experiències\b)/.test(value)) return { key: 'sequence', title: '📅 Seqüència didàctica' };
    if (/^reptes(?!\s+oficial)/i.test(value)) return { key: 'sequence', title: '📅 Seqüència didàctica' };
    if (/^com usar\b/i.test(value)) return { key: 'intro', title: '🌱 Situació, repte i intenció' };
    if (/^(repte\b|situació|situacio|punt de partida|punt de trobada|sentit i intenció|context\b|propòsit|proposit)/.test(value)) return { key: 'intro', title: '🌱 Situació, repte i intenció' };
    if (/^(participació|participacio|participar|accessibilitat|inclusió|inclusio|privacitat|seguretat|salvaguardes|diferenciació|diferenciacio|variacions|benestar|confort sensorial)/.test(value)) return { key: 'access', title: '♿ Participació, accessibilitat i seguretat' };
    if (/^(aprenent|vocabulari|objectius|resultats d.aprenentatge|què aprendrem|que aprendrem|competències clau)/.test(value)) return { key: 'learning', title: '🎯 Aprenentatges i vocabulari' };
    const assessmentSignal = /evidèn|eviden|avaluació|avaluacio|autoavaluació|rúbrica|criteris? d.èxit|registre de prova|registres de prova|documentació i retroacció|diari de proves|producte final i evidències|observació|mostra final/.test(value);
    if (!assessmentSignal && /aprenent|objectius|resultats d.aprenentatge|vocabulari|què aprendrem|que aprendrem|competències clau/.test(value)) return { key: 'learning', title: '🎯 Aprenentatges i vocabulari' };
    if (/materials|preparació|preparacio|abans de començar|maquinari|programari|requisits?|muntatge|organització i materials/.test(value)) return { key: 'materials', title: '🧰 Materials i preparació' };
    if (assessmentSignal) return { key: 'assessment', title: '🧪 Evidències i avaluació' };
    if (/participació|participacio|manera de participar|inclusió|inclusio|accessibilitat|privacitat|seguretat|salvaguardes|límits|limites|adaptacions|ús responsable|variacions|benestar|confort sensorial|diferenciació|diferenciacio|inclusió i variacions/.test(value)) return { key: 'access', title: '♿ Participació, accessibilitat i seguretat' };
    if (/oficial|adaptació|adaptacio|referent|fonts?|recursos|unitat oficial|dotació i fonts/.test(value)) return { key: 'official', title: '🔗 Referents i adaptació' };
    if (/rols|organitzaci[oó]|disseny accessible|equitat|consentiment|dades responsables/.test(value)) return { key: 'access', title: '♿ Participació, accessibilitat i seguretat' };
    if (/retorn|portafoli|portafolis|quadern|registre|fitxa de recerca|taula de proves|criteris observables|lectura crítica|lectura critica|resultats|mostra final/.test(value)) return { key: 'assessment', title: '🧪 Evidències i avaluació' };
    if (/sostenibilitat|connexi[oó]|cultural|raonament|continguts|llenguatge|idees clau|vies de programació|programacio|vocabulari/.test(value)) return { key: 'learning', title: '🎯 Aprenentatges i vocabulari' };
    if (/opci[oó]|mapes interactius|activity box|materials|versions|programari|accessoris/.test(value)) return { key: 'materials', title: '🧰 Materials i preparació' };
    return { key: 'sequence', title: '📅 Seqüència didàctica' };
  }

  function normalizeSectionOrder(body) {
    const lines = body.replace(/\r\n?/g, '\n').split('\n');
    const preamble = [];
    const sections = [];
    let current = null;
    let inFence = false;
    for (const line of lines) {
      if (/^```/.test(line.trim())) inFence = !inFence;
      const heading = !inFence && line.match(/^##\s+(.+?)\s*#*\s*$/);
      if (heading) {
        if (current) sections.push(current);
        current = { key: canonicalSection(heading[1]).key || 'other', lines: [line] };
      } else if (current) current.lines.push(line);
      else preamble.push(line);
    }
    if (current) sections.push(current);
    if (!sections.length) return body;
    const priority = { intro: 0, learning: 1, materials: 2, sequence: 3, assessment: 5, access: 6, official: 7 };
    const ordered = sections.map((section, index) => ({ ...section, index })).sort((a, b) => (priority[a.key] ?? 4) - (priority[b.key] ?? 4) || a.index - b.index);
    return [...preamble, ...ordered.flatMap(section => section.lines)].join('\n');
  }

  function renderMarkdown(source, sourceURL) {
    const { data, body: sourceBody } = splitFrontMatter(source);
    const body = normalizeSectionOrder(sourceBody);
    const lines = body.replace(/\r\n?/g, '\n').split('\n');
    const output = [];
    const steps = [];
    let openSection = false;
    let openStep = false;
    let openPhase = false;
    let fallbackPhase = false;
    let sequenceSection = false;
    let openSectionGroup = '';
    let introPending = false;
    let wizardInserted = false;
    const closePhase = () => { if (openPhase) { output.push('</section>'); openPhase = false; } };
    const closeStep = () => {
      closePhase();
      if (openStep) { output.push('</div></section>'); openStep = false; }
      fallbackPhase = false;
    };
    const closeSection = () => { closeStep(); if (openSection) { output.push('</section>'); openSection = false; } introPending = false; };
    const isStep = title => /^(sessió|sessio|lliçó|lliço|lliço|lesson|session)\s+\d+/i.test(title);

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
      const displayTitle = plainTitle
        .replace(/^(?:(?:sess(?:ió|io)|lliç(?:ó|o)|lesson|session)\s+\d+|s\d+)\s*[·—:.-]\s*/i, '')
        .replace(/^(?:[a-z]{1,3}-?\d+)\s*[·—:.-]\s*/i, '')
        // Old merged SDAs sometimes put the step number directly before the
        // title (for example, "1Auditem..."). The wizard already numbers
        // every item, so remove that duplicate whether or not it has a dot.
        .replace(/^\d+(?:[.)]\s*|\s+|(?=[A-ZÀ-ÖØ-Þ]))/, '')
          .replace(/[.!?]+$/, '')
          .trim();
        const id = slugify(plainTitle);
        if (level === 2) {
          const section = canonicalSection(plainTitle);
          if (openSection && section.key === openSectionGroup) {
            closeStep();
            output.push(`<h3 class="detail-subsection-title" id="${id}">${inline(plainTitle.replace(/[.!?]+$/, '').replace(/^\d+\s*/, ''), sourceURL)}</h3>`);
            sequenceSection = section.key === 'sequence' && !/oficial|adaptació|adaptacio|referent/i.test(plainTitle) && /(seqüèn|seqüen|itinerari|sessions|passos|lliçons|activitats|desenvolupament|projecte en|reptes|estands|fases|àmbits|repte\s+\d)/i.test(plainTitle);
            i += 1;
            continue;
          }
          closeSection();
          sequenceSection = section.key === 'sequence' && !/oficial|adaptació|adaptacio|referent/i.test(plainTitle) && /(seqüèn|seqüen|itinerari|sessions|passos|lliçons|activitats|desenvolupament|projecte en|reptes|estands|fases|àmbits|repte\s+\d)/i.test(plainTitle);
          output.push(`<section class="detail-section${section.key === 'intro' ? ' detail-section-intro' : ''}" data-section-group="${section.key || 'other'}"><h2 id="${id}">${inline(section.title, sourceURL)}</h2>`);
          openSection = true;
          openSectionGroup = section.key || 'other';
          introPending = section.key === 'intro';
        } else if (level === 3 && (isStep(plainTitle) || sequenceSection)) {
          if (!openSection) { output.push('<section class="detail-section" data-section-group="sequence">'); openSection = true; }
          closeStep();
          const stepNumber = steps.length + 1;
          if (!wizardInserted) { output.push('<!--LEARNING_WIZARD-->'); wizardInserted = true; }
          const untilNextStep = lines.slice(i + 1).findIndex(candidate => /^###\s+/.test(candidate));
          const stepLines = lines.slice(i + 1, untilNextStep < 0 ? undefined : i + 1 + untilNextStep);
          const hasPhaseInStep = stepLines.some(candidate => /^####\s+/.test(candidate));
          output.push(`<section class="learning-step" id="${id}" data-step="${stepNumber}" x-show="step === ${steps.length}" x-cloak><header class="learning-step-header"><span class="learning-step-kicker">Pas ${stepNumber}</span><h3>${inline(displayTitle, sourceURL)}</h3></header><div class="learning-step-content">`);
          openStep = true;
          steps.push({ id, title: displayTitle });
          if (!hasPhaseInStep) {
            output.push('<section class="learning-phase learning-phase-default"><h4>Desenvolupament del pas</h4>');
            openPhase = true;
            fallbackPhase = true;
          }
        } else if (level === 4 && openStep) {
          if (!openSection) { output.push('<section class="detail-section" data-section-group="other">'); openSection = true; }
          closePhase();
          const phaseTitle = title.match(/^(Fase [1-5] · (?:Activem i prediem|Explorem i construïm|Expliquem i registrem|Apliquem i millorem|Comprovem i reflexionem))(?:\s*\(([^)]+)\))?$/);
          const phaseHeading = phaseTitle ? inline(phaseTitle[1], sourceURL) : inline(title, sourceURL);
          output.push(`<section class="learning-phase"><h4>${phaseHeading}</h4>`);
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
      <ol class="learning-wizard-picker" aria-label="Tria un pas"><template x-for="(item, index) in steps" :key="item.id"><li><button type="button" class="learning-wizard-step" x-on:click="step = index" :aria-label="'Obrir pas ' + (index + 1) + ': ' + item.title" :aria-current="step === index ? 'step' : null"><span class="learning-wizard-step-number" aria-hidden="true" x-text="index + 1"></span><span class="learning-wizard-step-title"><span class="learning-wizard-step-separator" aria-hidden="true">&#160;·&#160;</span><span x-text="item.title"></span></span></button></li></template></ol>
      <div class="learning-wizard-controls"><button type="button" class="btn-wizard-step" x-on:click="step = Math.max(0, step - 1)" :disabled="step === 0">← Pas anterior</button><button type="button" class="btn-wizard-step primary" x-on:click="step = Math.min(steps.length - 1, step + 1)" :disabled="step === steps.length - 1">Pas següent →</button></div>
    </nav>` : '';
    const rendered = output.join('\n').replace('<!--LEARNING_WIZARD-->', stepIndex);
    return { data, html: orderDetailSections(rendered), steps };
  }

  global.RoboticsMarkdown = { parse: renderMarkdown, splitFrontMatter };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.RoboticsMarkdown;
})(typeof window !== 'undefined' ? window : globalThis);
