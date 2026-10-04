# 🤖 Robòtica²⁰⁰ — Robòtica per a docents

Portal educatiu obert de robòtica educativa, pensament computacional i situacions d'aprenentatge curriculars per a mestres i professors d'Infantil, Primària i Secundària.

---

## 🚀 Arquitectura: Web Components Natius (Sense Build Step)

La web està construïda exclusivament amb **HTML5, CSS modern i Web Components natius (Custom Elements)**. Funciona de manera 100% autònoma, tant en servidors web (com GitHub Pages) com en local obrint directament qualsevol fitxer amb doble clic (`file://`).

- **Cero dependències i zero eines de compilació:** No requereix Node, npm, ni dependències externes per funcionar. Tot és HTML estàndard i JavaScript natiu executable en local amb doble clic (`file://`).
- **Reutilització centralitzada (`_js/components.js`):**
  - **Elements d'estructura:** `<site-header>`, `<site-footer>`, `<nav-back>`.
  - **Plantilles de pàgina (Layout Components):**
    - `<activity-page title="..." tag="..." cicle="..." durada="...">`: Plantilla per a activitats desendollades.
    - `<tutorial-page title="..." robot="..." robot-label="..." dificultat="..." durada="..." intro="...">`: Plantilla per a tutorials tècnics de robots.
    - `<situation-page title="..." robot="..." cicle="..." materia="..." tematica="..." durada="..." repte="...">`: Plantilla per a situacions d'aprenentatge curriculars.
    - `<guide-page title="..." tag="...">`: Plantilla per a guies didàctiques.
  - **Reixes de catàleg automàtiques:**
    - `<activity-grid root="../"></activity-grid>`: Renderitza automàticament les targetes de pensament computacional.
    - `<situation-grid root="../"></situation-grid>`: Renderitza la graella de situacions connectada als filtres interactius.
    - `<tutorial-grid robot="codey-rocky" root="../../"></tutorial-grid>`: Renderitza la llista de tutorials per a cada robot.
- **Autodescobriment automàtic de continguts (Opció B):**
  - Per crear un nou contingut (activitat, situació o tutorial), només cal crear la carpeta amb el seu `index.html` utilitzant la plantilla corresponent.
  - L'script `_scripts/sync-catalog.py` (executat automàticament pel hook de git `pre-commit` o a GitHub Actions) escaneja les carpetes, n'extreu les metadades i actualitza el registre central `_js/cataleg.js`.
- **Light DOM:** Els components utilitzen el DOM estàndard, de manera que [`_css/styles.css`](_css/styles.css) aplica estils de forma global i coherent a tot el lloc web sense necessitat d'encapsulació aïllada.

---

## 🤖 Robots Oficials i Slugs

Els 6 robots oficials del projecte i els seus identificadors únics (slugs) normalitzats a tot el repositori:

| Robot | Slug Oficial | Prefix Tutorials | Carpeta Fitxa | Carpetes de Tutorials |
| :--- | :--- | :--- | :--- | :--- |
| **Coding Express** | `coding-express` | `ce-` | `robot/coding-express/` | `tutorial/ce-*/` |
| **Tale-Bot** | `tale-bot` | `tb-` | `robot/tale-bot/` | `tutorial/tb-*/` |
| **Coding Set** | `coding-set` | `cs-` | `robot/coding-set/` | `tutorial/cs-*/` |
| **Codey Rocky** | `codey-rocky` | `cr-` | `robot/codey-rocky/` | `tutorial/cr-*/` |
| **Spike** | `spike` | `sp-` | `robot/spike/` | `tutorial/sp-*/` |
| **Micro:bit** | `microbit` | `mb-` | `robot/microbit/` | `tutorial/mb-*/` |

---

## 📂 Estructura de Carpetes i URLs Netes

El repositori s'organitza en directoris amb `index.html` per oferir rutes i URLs netes, separant les carpetes navegables dels recursos tècnics (marcats amb prefix `_`):

```
robotica200/
├── index.html                           # Portada principal (/)
├── pensament-computacional/
│   └── index.html                       # Catàleg de pensament computacional (/pensament-computacional/)
├── robots/
│   └── index.html                       # Catàleg dels 6 robots d'aula (/robots/)
├── situacions-aprenentatge/
│   └── index.html                       # Catàleg curricular filtrable (/situacions-aprenentatge/)
├── activitat/
│   └── [nom-activitat]/index.html       # 10 activitats desendollades (/activitat/[nom]/)
├── robot/
│   └── [nom-robot]/index.html           # 6 fitxes tècniques de robots (/robot/[nom]/)
├── tutorial/
│   └── [nom-tutorial]/index.html        # 21 tutorials pràctics pas a pas (/tutorial/[nom]/)
├── situacio/
│   └── [nom-situacio]/index.html        # 10 situacions d'aprenentatge (/situacio/[nom]/)
├── guia/
│   └── [nom-guia]/index.html            # Guies didàctiques (/guia/[nom]/)
├── _css/
│   └── styles.css                       # Full d'estils unificat (Sora + Plus Jakarta Sans)
├── _js/
│   ├── components.js                    # Web Components natius (<site-header>, <site-footer>, <nav-back>)
│   ├── filters.js                       # Filtres multicriteri per a situacions d'aprenentatge
│   └── robot-animation.js               # Suite de 8 micro-animacions del robot de portada
└── _assets/
    ├── banners/                         # Banners il·lustrats lineless (format 4:3)
    ├── icons/                           # Icones minimalistes transparents i logotip SVG
    ├── imatges/                         # Fotografies i il·lustracions d'aula en WebP
    └── robots/                          # Imatges oficials lineless dels 6 robots d'aula
```

---

## 💻 Ús i Visualització Local

Pots obrir directament el fitxer [`index.html`](index.html) amb qualsevol navegador o servir-lo amb qualsevol servidor estàtic senzill:

```bash
# Servidor local opcional en Python (sense dependències)
python3 -m http.server 3000
```

Obre <http://localhost:3000> al navegador.

---

## 🎨 Guia d'Estil i Bones Pràctiques

- **Sense modales ni popups:** Prohibició total de `<dialog>`, popups i overlays. Tota la navegació es fa mitjançant pàgines completes amb botó de retorn accessible.
- **Tipografia:** **Sora** per a títols i encapçalaments; **Plus Jakarta Sans** per a textos de lectura, controls i botons.
- **Marca:** `Robòtica<sup>200</sup>` (Robòtica²⁰⁰) amb interlineat ajustat a CSS.
- **Estil visual de les imatges:** Lineless (sense línies de contorn), acabat mat (sense brillantors), fons bicolor pla i sense ombres al terra. Consulta [`STYLE_GUIDE.md`](STYLE_GUIDE.md) i [`AGENTS.md`](AGENTS.md) per a més detalls.
