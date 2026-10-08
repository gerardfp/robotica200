# 🤖 Robòtica²⁰⁰ — Robòtica per a docents

Portal educatiu obert de robòtica educativa, pensament computacional i situacions d'aprenentatge curriculars per a mestres i professors d'Infantil, Primària i Secundària.

---

## Arquitectura estàtica amb Alpine i Web Components

La web és estàtica i està construïda amb **HTML5, CSS modern, Alpine.js i Web Components natius**. Les plantilles HTML defineixen la presentació amb directives Alpine; els Web Components es reserven als elements d'estructura reutilitzables. Les fitxes editorials es carreguen des de Markdown en temps d’execució, sense compilar ni generar HTML. Es poden servir localment amb qualsevol servidor estàtic o publicar directament a GitHub Pages. Alpine i Alpine AJAX es carreguen des de CDN; el renderitzador, els continguts i les imatges són locals.

- **Sense pas de compilació:** No requereix Node, npm ni dependències Python per mostrar o publicar les pàgines. En local, és preferible servir la carpeta amb `python3 -m http.server` perquè les rutes relatives funcionen de la mateixa manera que al web.
- **Interfície declarativa:**
  - Els catàlegs i els filtres es defineixen en HTML amb `x-data`, `x-for`, `x-model` i `x-show`; les fitxes Markdown omplin les plantilles separades d'`_templates/` amb bindings Alpine.
  - Alpine AJAX carrega les vistes dins de `#page-content`, sincronitza capçalera i títol, i manté l'historial del navegador.
- **Web Components estructurals (`_js/components.js`):**
  - **Elements d'estructura:** `<site-header>`, `<site-footer>`, `<nav-back>`.
  - **Plantilla de detall compartida:** `<content-detail-page kind="activity|tutorial|robot|guide">` llig `?id=slug` i carrega el Markdown corresponent. El layout editable és a `_templates/content-detail-page.html`.
  - **Situacions d’aprenentatge:** `<situation-page root="../">` llig `?id=slug`; el layout amb passos i estat de càrrega és a `_templates/situation-page.html`.
- **Catàleg derivat del front matter:** Per afegir una situació, crea un Markdown actiu segons [`_content/situacions/TEMPLATE-SITUACIO.md`](_content/situacions/TEMPLATE-SITUACIO.md). El component carrega el Markdown al navegador. Després executa `python3 _scripts/sync-catalog.py` perquè el catàleg filtre també les metadades del front matter. Aquest script només actualitza l’índex; no compila ni genera pàgines.
- **Validació estàtica:** `python3 _scripts/check-static-site.py` comprova les referències locals, l'estructura de les fitxes de situacions i el mínim de cinc situacions per robot. GitHub Actions també verifica el renderitzador Markdown i la sintaxi del JavaScript abans de publicar.
- **Cobertura de situacions oficials:** [`docs/ADAPTACIO-SITUACIONS.md`](docs/ADAPTACIO-SITUACIONS.md) relaciona les fonts oficials amb les fitxes pròpies i registra el progrés d’auditoria. SPIKE Prime té identificades 36 lliçons de les unitats temàtiques (inclosa la missió guiada 2026–27), cinc *Activity Briefs*, cinc lliçons suplementàries, l’activitat híbrida *Design for You* i dos reptes *Prime Combined*. La identificació i l’associació de fitxes no es consideren adaptació integral fins que es complete la revisió de cada seqüència.
- **Contingut editorial:** Activitats, tutorials, robots, guies i les 100 situacions d’aprenentatge tenen Markdown com a font única. Les pàgines compartides (`activitat/index.html?id=slug`, `tutorial/index.html?id=slug`, `robot/index.html?id=slug`, `guia/index.html?id=slug` i `situacio/index.html?id=slug`) carreguen el document triat. Les metadades alimenten també els catàlegs i els filtres.
- **Light DOM:** Els components utilitzen el DOM estàndard, de manera que [`_css/styles.css`](_css/styles.css) aplica estils de forma global i coherent a tot el lloc web sense necessitat d'encapsulació aïllada.

---

## 🤖 Robots Oficials i Slugs

Els 6 robots oficials del projecte i els seus identificadors únics (slugs) normalitzats a tot el repositori:

| Robot | Slug Oficial | Prefix Tutorials | Carpeta Fitxa | Carpetes de Tutorials |
| :--- | :--- | :--- | :--- | :--- |
| **Coding Express** | `coding-express` | `ce-` | `robot/index.html?id=coding-express` | `tutorial/ce-*/` |
| **Tale-Bot** | `tale-bot` | `tb-` | `robot/index.html?id=tale-bot` | `tutorial/tb-*/` |
| **Coding Set** | `coding-set` | `cs-` | `robot/index.html?id=coding-set` | `tutorial/cs-*/` |
| **Codey Rocky** | `codey-rocky` | `cr-` | `robot/index.html?id=codey-rocky` | `tutorial/cr-*/` |
| **Spike** | `spike` | `sp-` | `robot/index.html?id=spike` | `tutorial/sp-*/` |
| **Micro:bit** | `microbit` | `mb-` | `robot/index.html?id=microbit` | `tutorial/mb-*/` |

---

## 📂 Estructura de Carpetes i rutes compartides

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
│   └── index.html                       # Detall compartit (?id=slug)
├── robot/
│   └── index.html                       # Detall compartit (?id=slug)
├── tutorial/
│   └── index.html                       # Detall compartit (?id=slug)
├── situacio/
│   └── index.html                      # Pàgina compartida de detall (?id=slug)
├── guia/
│   └── index.html                       # Detall compartit (?id=slug)
├── _content/
│   ├── activitats/                      # 10 activitats en Markdown
│   ├── tutorials/                       # 22 tutorials en Markdown
│   ├── robots/                          # 6 fitxes de robot en Markdown
│   ├── pages/                           # 3 guies docents en Markdown
│   └── situacions/                      # 100 situacions d'aprenentatge
├── _css/
│   └── styles.css                       # Full d'estils unificat (Sora + Plus Jakarta Sans)
├── _templates/
│   ├── content-detail-page.html         # Layout compartit de contingut i estats
│   └── situation-page.html              # Layout de situació, càrrega i error
├── _js/
│   ├── components.js                    # Comportament dels Web Components
│   └── markdown.js                      # Renderitzador client dels continguts Markdown
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
