# 🤖 Robòtica²⁰⁰ — Robòtica per a docents

Portal educatiu obert de robòtica educativa, pensament computacional i situacions d'aprenentatge curriculars per a mestres i professors d'Infantil, Primària i Secundària.

---

## 🚀 Arquitectura: Web Components Natius (Sense Build Step)

La web està construïda exclusivament amb **HTML5, CSS modern i Web Components natius (Custom Elements)**. Funciona de manera 100% autònoma, tant en servidors web (com GitHub Pages) com en local obrint directament qualsevol fitxer amb doble clic (`file://`).

- **Cero dependències i zero eines de compilació:** No requereix Node, npm, Python ni cap pas de construcció per funcionar o editar.
- **Reutilització centralitzada (`_js/components.js`):** La capçalera, la navegació, el peu de pàgina i els botons de retorn estan modularitzats com a elements personalitzats estàndard:
  - `<site-header active="robotica" root="../../"></site-header>`: Capçalera amb logotip, títol, navegació amb pestanya activa i selector de tema clar/fosc.
  - `<site-footer></site-footer>`: Peu de pàgina unificat.
  - `<nav-back href="../../robotica/index.html" label="Robòtica"></nav-back>`: Botó de retorn accessible.
- **Light DOM:** Els components utilitzen el DOM estàndard, de manera que [`_css/styles.css`](_css/styles.css) aplica estils de forma global i coherent a tot el lloc web sense necessitat d'encapsulació aïllada.

---

## 📂 Estructura de Carpetes i URLs Netes

El repositori s'organitza en directoris amb `index.html` per oferir rutes i URLs netes, separant les carpetes navegables dels recursos tècnics (marcats amb prefix `_`):

```
robotica200/
├── index.html                           # Portada principal (/)
├── pensament-computacional/
│   └── index.html                       # Catàleg de pensament computacional (/pensament-computacional/)
├── robotica/
│   └── index.html                       # Catàleg dels 6 robots d'aula (/robotica/)
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
│   ├── theme.js                         # Control del mode clar / fosc
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
