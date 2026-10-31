/**
 * _js/makecode-blocks.js
 *
 * Suport oficial MakeCode Blocks Embed per a Robòtica²⁰⁰ (Micro:bit).
 * Comunica mitjançant postMessage amb l'iframe del compilador oficial
 * de Microsoft MakeCode (https://makecode.microbit.org/--docs?render=1)
 * per transformar fragments de codi JavaScript/TypeScript en blocs visuals SVG.
 */

(function () {
  'use strict';

  const MAKECODE_URL = 'https://makecode.microbit.org/';
  const RENDERER_SRC = MAKECODE_URL + '--docs?render=1';
  let iframe = null;
  let isReady = false;
  const queue = [];
  const renderedElements = new Set();

  function ensureIframe() {
    if (iframe) return iframe;
    iframe = document.createElement('iframe');
    iframe.id = 'makecode-embed-renderer';
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.bottom = '0';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';
    iframe.style.border = '0';
    iframe.setAttribute('aria-hidden', 'true');
    iframe.src = RENDERER_SRC;
    document.body.appendChild(iframe);
    return iframe;
  }

  function sendRenderRequest(req) {
    if (!iframe || !iframe.contentWindow) return;
    try {
      iframe.contentWindow.postMessage({
        type: 'renderblocks',
        id: req.id,
        code: req.code,
        options: {
          snippetMode: true
        }
      }, MAKECODE_URL);
    } catch (err) {
      console.warn('[MakeCode Embed] Error enviant postMessage:', err);
    }
  }

  // Escolta de missatges de l'iframe MakeCode
  window.addEventListener('message', function (ev) {
    const msg = ev.data;
    if (!msg || msg.source !== 'makecode') return;

    if (msg.type === 'renderready') {
      isReady = true;
      while (queue.length > 0) {
        const req = queue.shift();
        sendRenderRequest(req);
      }
    } else if (msg.type === 'renderblocks') {
      const id = msg.id;
      const targetEl = document.getElementById(id);
      if (!targetEl) return;

      const container = targetEl.closest('.makecode-preview-wrap') || targetEl.parentElement;
      const placeholder = container.querySelector('.makecode-loading');
      if (placeholder) {
        placeholder.style.display = 'none';
      }

      let wrapper = container.querySelector('.makecode-svg-result');
      if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.className = 'makecode-svg-result';
        container.appendChild(wrapper);
      }

      if (msg.svg) {
        wrapper.innerHTML = msg.svg;
        const svgEl = wrapper.querySelector('svg');
        if (svgEl) {
          svgEl.removeAttribute('width');
          svgEl.removeAttribute('height');
          svgEl.style.maxWidth = '100%';
          svgEl.style.height = 'auto';
          svgEl.style.display = 'block';
        }
      } else if (msg.uri) {
        const img = document.createElement('img');
        img.src = msg.uri;
        img.alt = 'Codi de blocs MakeCode micro:bit';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.display = 'block';
        wrapper.innerHTML = '';
        wrapper.appendChild(img);
      }

      const statusEl = container.closest('.blocks-showcase-card')?.querySelector('.makecode-live-badge');
      if (statusEl) {
        statusEl.classList.remove('badge-loading');
        statusEl.classList.add('badge-success');
        statusEl.textContent = '⚡ Renderitzat MakeCode actiu';
      }

      targetEl.style.display = 'none';
      renderedElements.add(id);
    }
  }, false);

  /**
   * Renderitza un element pre>code o un bloc amb codi MakeCode
   * @param {HTMLElement} el
   */
  function renderElement(el) {
    if (!el) return;
    if (!el.id) {
      el.id = 'mc_' + Math.random().toString(36).substring(2, 9);
    }
    if (renderedElements.has(el.id)) return;

    ensureIframe();
    const code = el.getAttribute('data-code') || el.innerText.trim();
    const req = { id: el.id, code: code };

    if (isReady) {
      sendRenderRequest(req);
    } else {
      queue.push(req);
    }

    // Temporitzador de seguretat si no hi ha connexió a MakeCode
    setTimeout(function () {
      if (!renderedElements.has(el.id)) {
        const container = el.closest('.makecode-preview-wrap') || el.parentElement;
        const placeholder = container.querySelector('.makecode-loading');
        if (placeholder) {
          placeholder.innerHTML = `
            <div style="text-align:center; padding:1rem; color:#64748b;">
              <p style="margin:0 0 0.5rem; font-weight:600; color:#334155;">Mode fora de línia / Esperant connexió</p>
              <p style="margin:0 0 0.75rem; font-size:0.82rem;">L'embed oficial de MakeCode requereix connexió a Internet per compilar el bloc en viu.</p>
              <button type="button" class="btn-primary" style="font-size:0.82rem; padding:0.4rem 0.9rem;" onclick="window.makeCodeRender && window.makeCodeRender()">Reintentar càrrega</button>
            </div>
          `;
        }
        el.style.display = 'block';
        el.style.margin = '0';
        el.style.background = '#f1f5f9';
        el.style.color = '#334155';
        el.style.padding = '1rem';
        el.style.borderRadius = '8px';
      }
    }, 4500);
  }

  /**
   * Funció pública MakeCode oficial compatible amb gh-pages-embed.js
   */
  window.makeCodeRender = function (targetUrl, repo) {
    const elements = document.querySelectorAll('pre > code.language-blocks, [data-makecode-render]');
    elements.forEach(renderElement);
  };

  // Inicialització automàtica
  function autoInit() {
    const targets = document.querySelectorAll('pre > code.language-blocks, [data-makecode-render]');
    if (targets.length > 0) {
      targets.forEach(renderElement);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();
