# 🤖 Robòtica²⁰⁰ — Robòtica per a docents

Portal educatiu obert de robòtica educativa, pensament computacional i situacions d'aprenentatge curriculars per a mestres i professors d'Infantil, Primària i Secundària.

---

## Arquitectura estàtica amb Web Components

La web és estàtica i està construïda amb **HTML5, CSS modern i Web Components natius**. Els `index.html` defineixen les rutes i els Web Components; les fitxes editorials es poden carregar des de Markdown en temps d’execució, sense compilar ni generar HTML. Es poden servir localment amb qualsevol servidor estàtic o publicar directament a GitHub Pages. La tipografia de Google Fonts necessita connexió; el renderitzador, els continguts i les imatges són locals.

- **Sense pas de compilació:** No requereix Node, npm ni dependències Python per mostrar o publicar les pàgines. En local, és preferible servir la carpeta amb `python3 -m http.server` perquè les rutes relatives funcionen de la mateixa manera que al web.
- **Reutilització centralitzada (`_js/components.js`):**
  - **Elements d'estructura:** `<site-header>`, `<site-footer>`, `<nav-back>`.
  - **Plantilles de pàgina (Layout Components):**
    - `<activity-page title="..." tag="..." cicle="..." durada="...">`: Plantilla per a activitats desendollades.
    - `<tutorial-page title="..." robot="..." robot-label="..." dificultat="..." durada="..." intro="...">`: Plantilla per a tutorials tècnics de robots.
    - `<situation-page root="../">`: llig `?id=slug` i carrega el Markdown corresponent; el layout editable és a `_templates/situation-page.html`.
    - `<guide-page title="..." tag="...">`: Plantilla per a guies didàctiques.
  - **Reixes de catàleg automàtiques:**
    - `<activity-grid root="../"></activity-grid>`: Renderitza automàticament les targetes de pensament computacional.
    - `<situation-grid root="../"></situation-grid>`: Renderitza la graella de situacions connectada als filtres interactius.
    - `<tutorial-grid robot="codey-rocky" root="../../"></tutorial-grid>`: Renderitza la llista de tutorials per a cada robot.
- **Catàleg derivat del front matter:** Per afegir una situació, crea un Markdown actiu segons [`_content/situacions/TEMPLATE-SITUACIO.md`](_content/situacions/TEMPLATE-SITUACIO.md). El component carrega el Markdown al navegador. Després executa `python3 _scripts/sync-catalog.py` perquè el catàleg filtre també les metadades del front matter. Aquest script només actualitza l’índex; no compila ni genera pàgines.
- **Validació estàtica:** `python3 _scripts/check-static-site.py` comprova les referències locals, l'estructura de les fitxes de situacions i el mínim de cinc situacions per robot. GitHub Actions també verifica el renderitzador Markdown i la sintaxi del JavaScript abans de publicar.
- **Cobertura de situacions oficials:** [`docs/ADAPTACIO-SITUACIONS.md`](docs/ADAPTACIO-SITUACIONS.md) relaciona les fonts oficials amb les fitxes pròpies i registra el progrés d’auditoria. SPIKE Prime té identificades 35 lliçons de les unitats temàtiques, cinc *Activity Briefs*, cinc lliçons suplementàries, l’activitat híbrida *Design for You* i dos reptes *Prime Combined*. La identificació i l’associació de fitxes no es consideren adaptació integral fins que es complete la revisió de cada seqüència.
- **Contingut editorial:** Les 99 situacions d’aprenentatge actives tenen Markdown amb front matter com a font única. Una única pàgina compartida (`situacio/index.html?id=slug`) carrega el document triat i el Web Component renderitza els passos, imatges, notes i exemples de codi. Les fitxes d’altres tipus que encara usen HTML continuen compatibles.
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
├── robotica-educativa/
│   └── index.html                       # Catàleg dels 6 robots d'aula (/robotica-educativa/)
├── situacions-aprenentatge/
│   └── index.html                       # Catàleg curricular filtrable (/situacions-aprenentatge/)
├── activitat/
│   └── [nom-activitat]/index.html       # 10 activitats desendollades (/activitat/[nom]/)
├── robot/
│   └── [nom-robot]/index.html           # 6 fitxes tècniques de robots (/robot/[nom]/)
├── tutorial/
│   └── [nom-tutorial]/index.html        # Tutorials pràctics pas a pas (/tutorial/[nom]/)
├── situacio/
│   └── index.html                      # Pàgina compartida de detall (?id=slug)
├── guia/
│   └── [nom-guia]/index.html            # Guies didàctiques (/guia/[nom]/)
├── _css/
│   └── styles.css                       # Full d'estils unificat (Sora + Plus Jakarta Sans)
├── _templates/
│   └── situation-page.html              # Layout de situació, càrrega i error
├── _js/
│   ├── components.js                    # Comportament dels Web Components
│   ├── filters.js                       # Filtres multicriteri per a situacions d'aprenentatge
│   └── robot-animation.js               # Suite de 8 micro-animacions del robot de portada
├── _scripts/
│   ├── sync-catalog.py                  # Sincronitza metadades a _js/cataleg.js
│   └── check-static-site.py             # Validació de referències i estructura
├── docs/
│   └── ADAPTACIO-SITUACIONS.md          # Registre de fonts i cobertura d'adaptacions
└── _assets/
    ├── banners/                         # Banners il·lustrats lineless (format 4:3)
    ├── icons/                           # Icones PNG transparents (512×512) i logotip SVG
    ├── imatges/                         # Il·lustracions i fotografies d'aula en WebP
    └── robots/                          # Imatges oficials lineless dels 6 robots d'aula
```

---

## 🎨 Guia d'Estil i Bones Pràctiques

- **Sense modales ni popups:** Prohibició total de `<dialog>`, popups i overlays. Tota la navegació es fa mitjançant pàgines completes amb botó de retorn accessible.
- **Tipografia:** **Sora** per a títols i encapçalaments; **Plus Jakarta Sans** per a textos de lectura, controls i botons.
- **Marca:** `Robòtica<sup>200</sup>` (Robòtica²⁰⁰) amb interlineat ajustat a CSS.
- **Estil visual de les imatges:** Lineless (sense línies de contorn), acabat mat (sense brillantors), fons bicolor pla i sense ombres al terra. Consulta [`STYLE_GUIDE.md`](STYLE_GUIDE.md) i [`AGENTS.md`](AGENTS.md) per a més detalls.
