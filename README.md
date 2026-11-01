# 🤖 Robòtica²⁰⁰ — Robòtica per a docents

Portal educatiu obert de robòtica educativa, pensament computacional i situacions d'aprenentatge curriculars per a mestres i docents d'Educació Infantil i Primària.

---

## 🏗️ Arquitectura estàtica pre-renderitzada (Build-step en Node.js)

El lloc web manté la definició editorial íntegrament en fitxers **Markdown** (`_content/`) i genera totes les pàgines **HTML5 estàtiques** en un pas de compilació propi (`node _scripts/build.js`) sense cap dependència externa de `npm`.

- **Zero fetch ni parseig Markdown al client:** El navegador rep directament l'HTML complet de cada pàgina amb temps de càrrega immediat (LCP òptim), indexació directa i URLs netes per a cada recurs (`/activitat/<slug>/`, `/robot/<slug>/`, `/tutorial/<slug>/`, `/situacio/<slug>/`, `/guia/<slug>/`).
- **Plantilles modulars per components (`_templates/`):** Dissenyades com a funcions JavaScript pures (Template Literals) organitzades en 3 capes:
  1. **Layout (`_templates/layout/`):** Estructura global de pàgina (`document.js`, `site-header.js`, `site-footer.js`, `nav-back.js`, `utils.js`).
  2. **Components (`_templates/components/`):** Peces visuals reutilitzables (`section-hero.js`, `badge-list.js`, `learning-wizard.js`, `markdown-note.js`, `code-panel.js`, `activity-card.js`, `robot-card.js`, `tutorial-card.js`, `situation-card.js`).
  3. **Pàgines (`_templates/pages/`):** Ensamblatge de cada tipus de vista (`home-page.js`, `activities-catalog-page.js`, `robots-catalog-page.js`, `situations-catalog-page.js`, `detail-page.js`, `robot-page.js`, `situation-page.js`, `redirect-page.js`).
- **Micro-interactivitat al client (`_js/ui.js`):** Un únic controlador lleuger en Vanilla JS (~215 línies, 0 dependències externes, sense Alpine.js ni Web Components) gestiona:
  - El pas a pas interactiu dels wizards (`.learning-wizard`).
  - El filtratge instantani del catàleg de situacions d'aprenentatge i la sincronització amb la URL (`?robot=...&cicle=...`).
  - Les micro-animacions del robot a la portada (`index.html`).
  - La redirecció automàtica d'URLs antigues (`?id=slug` → `./<slug>/index.html`).
- **Flux d'edició de continguts i desenvolupament en local:**
  1. Executa `node _scripts/dev.js` per iniciar el servidor local (`http://localhost:8000`) amb **recompilació automàtica** i **Live Reload** al navegador.
  2. Crea o edita un fitxer Markdown a `_content/` o qualsevol plantilla a `_templates/`, `_css/` o `_js/`: el servidor recompilarà i actualitzarà la pàgina oberta al navegador automàticament.
  3. Per compilar manualment sense servidor, executa `node _scripts/build.js`.
  4. Valida tot el lloc amb `node _scripts/test.js`.

---

## 🤖 Robots Oficials i Slugs

Els 6 robots oficials del projecte i els seus identificadors únics (slugs) normalitzats a tot el repositori:

| Robot | Slug Oficial | Prefix Tutorials | Ruta Fitxa | Rutes de Tutorials |
| :--- | :--- | :--- | :--- | :--- |
| **Coding Express** | `coding-express` | `ce-` | `robot/coding-express/index.html` | `tutorial/ce-*/index.html` |
| **Tale-Bot** | `tale-bot` | `tb-` | `robot/tale-bot/index.html` | `tutorial/tb-*/index.html` |
| **Coding Set** | `coding-set` | `cs-` | `robot/coding-set/index.html` | `tutorial/cs-*/index.html` |
| **Codey Rocky** | `codey-rocky` | `cr-` | `robot/codey-rocky/index.html` | `tutorial/cr-*/index.html` |
| **Spike** | `spike` | `sp-` | `robot/spike/index.html` | `tutorial/sp-*/index.html` |
| **Micro:bit** | `microbit` | `mb-` | `robot/microbit/index.html` | `tutorial/mb-*/index.html` |

---

## 📂 Estructura de Carpetes

```
robotica200/
├── index.html                           # Portada principal (/)
├── pensament-computacional/
│   └── index.html                       # Catàleg de pensament computacional (/pensament-computacional/)
├── robotica-educativa/
│   └── index.html                       # Catàleg dels 6 robots d'aula (/robotica-educativa/)
├── situacions-aprenentatge/
│   └── index.html                       # Catàleg curricular filtrable (/situacions-aprenentatge/)
├── activitat/<slug>/index.html          # Pàgines pre-renderitzades de les 10 activitats
├── robot/<slug>/index.html              # Pàgines pre-renderitzades dels 6 robots
├── tutorial/<slug>/index.html           # Pàgines pre-renderitzades dels 36 tutorials
├── situacio/<slug>/index.html           # Pàgines pre-renderitzades de les 124 situacions
├── guia/<slug>/index.html               # Pàgines pre-renderitzades de les 4 guies docents
├── _content/
│   ├── activitats/                      # 10 activitats en Markdown (font editorial)
│   ├── tutorials/                       # 36 tutorials en Markdown (font editorial)
│   ├── robots/                          # 6 fitxes de robot en Markdown (font editorial)
│   ├── pages/                           # 4 guies docents en Markdown (font editorial)
│   └── situacions/                      # 124 situacions d'aprenentatge actives en Markdown
├── _templates/
│   ├── layout/                          # Capa 1: Document, SiteHeader, SiteFooter, NavBack, utils
│   ├── components/                      # Capa 2: SectionHero, LearningWizard, Notes, CodePanel, Cards
│   └── pages/                           # Capa 3: Plantilles de pàgines de catàleg i detall
├── _cache/
│   └── makecode/                        # Memòria cau en fitxers (<hash>.svg) per a blocs MakeCode
├── _css/
│   └── styles.css                       # Full d'estils unificat (Sora + Plus Jakarta Sans)
├── _js/
│   └── ui.js                            # Controlador lleuger Vanilla JS (wizards, filtres, animació)
├── _scripts/
│   ├── build.js                         # CLI: Generador estàtic principal (Markdown → HTML + Blocs SVG)
│   ├── dev.js                           # CLI: Servidor de desenvolupament amb watch + Live Reload SSE
│   ├── test.js                          # CLI: Executor unificat de totes les proves i validacions
│   ├── lib/
│   │   ├── markdown.js                  # Fase 1: Front-matter YAML + markdown-it (HTML estàndard)
│   │   ├── semantic-html.js             # Fase 2: Transformador semàntic sobre el DOM HTML
│   │   ├── html-dom.js                  # Parser i serialitzador DOM lleuger
│   │   ├── blocks.js                    # Renderitzador SVG de blocs (mBlock 5 / SPIKE App / ScratchBlocks)
│   │   └── makecode-cache.js            # Gestor de memòria cau en fitxers per a blocs MakeCode
│   ├── vendor/
│   │   ├── markdown-it.min.js           # Motor Markdown estàndard (markdown-it v14.3.3)
│   │   └── scratchblocks.js             # Motor gràfic de blocs (scratchblocks v3.6.4)
│   └── tests/
│       ├── check-static-site.py         # Validació d'enllaços, imatges i cobertura estàtica
│       ├── test-markdown-renderer.js    # Suite de tests del pipeline Markdown → HTML semàntic
│       └── test-tutorial-format.js      # Validació de format canònic dels 36 tutorials
├── docs/
│   └── ADAPTACIO-SITUACIONS.md          # Registre de fonts i cobertura d'adaptacions
└── _assets/
    ├── banners/                         # Banners il·lustrats lineless (format 4:3)
    ├── icons/                           # Icones PNG/SVG transparents i logotip SVG
    ├── imatges/                         # Il·lustracions d'aula i diagrames
    └── robots/                          # Imatges oficials lineless dels 6 robots i fons SVG
```

---

## 🎨 Guia d'Estil i Bones Pràctiques

- **Sense modales ni popups:** Prohibició total de `<dialog>`, popups i overlays. Tota la navegació es fa mitjançant pàgines completes amb botó de retorn accessible.
- **Tipografia:** **Sora** per a títols i encapçalaments; **Plus Jakarta Sans** per a textos de lectura, controls i botons.
- **Marca:** `Robòtica<sup>200</sup>` (Robòtica²⁰⁰) amb interlineat ajustat a CSS.
- **Estil visual de les imatges:** Lineless (sense línies de contorn), acabat mat (sense brillantors), fons bicolor pla i sense ombres al terra. Consulta [`STYLE_GUIDE.md`](STYLE_GUIDE.md) i [`AGENTS.md`](AGENTS.md) per a més detalls.
