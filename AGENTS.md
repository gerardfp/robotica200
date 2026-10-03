# Regles del Projecte Robòtica200

## 🚫 Prohibició Total de Diàlegs Modals i Popups (Estricte)
- **Queda absolutament prohibit l'ús de diàlegs modals (`<dialog>`, modales, popups, overlays, lightbox, backdrops foscos o qualsevol element flotant similar).**
- Tota la navegació i visualització de contingut (activitats, robots, tutorials, situacions d'aprenentatge) s'ha de fer mitjançant **pàgines/vistes en línia completes**.
- Cada pàgina de detall ha de disposar d'un botó visible de tornada (`← Tornar...`) que restitueixi l'estat anterior de manera natural i accessible.
- La web ha de mantenir en tot moment una **baixa densitat d'informació**, espaiat generós i netedat visual.

## 🎨 Guia d'Estil de les Imatges de Portada dels Robots
- **Estil visual:** Il·lustració digital 3D/vectorial estilitzada, joguina tecnològica educativa amable, superfícies suaus i arrodonides, idèntic a l'estil de referència de *CodeyRocky*.
- **🚫 Sense contorns ni línies (Lineless estricte):** **Completament sense línies de contorn (sense outlines, sense traçats negres ni línies de tinta).** Les formes, peces i volums s'han de definir exclusivament mitjançant el contrast de colors, llum i volum, exactament com a *CodeyRocky*.
- **🚫 Sense brillantors:** Acabat mat, sense reflexos especulars ni lluentors de plàstic brillant.
- **🚫 Sense degradats ni ombrejats:** Sense degradats de color, sense ombrejat suau ni oclusió ambiental.
- **🎨 Cada forma és d'un únic color:** Estil pla (flat cel-shading / vectorial). Cada faceta, peça o forma geomètrica s'omple amb un únic color sòlid uniforme, exactament igual que a *CodeyRocky*.
- **Composició de fons bicolor (2 meitats):**
  - Fons dividit horitzontalment en dues meitats netes (efecte paret i taula).
  - Meitat superior: color pastís pla que harmonitzi amb els tons del robot.
  - Meitat inferior: color pla de superfície/taula que acompanyi la paleta del robot.
  - Línia d'horitzó horitzontal neta darrere el robot.
- **🚫 Sense ombres:** **No hi ha d'haver cap ombra sota el robot** (sense ombra de contacte, sense ombra projectada al terra).
- **🚫 Sense text:** **Cap text, paraula, xifra, logotip ni marca d'aigua.**
- **Mida:** Amplada exacta de 600px (format 4:3, 600x448 px).

## 🧩 Guia d'Estil de les Icones de Robots (Format Quadrat 1:1, Fons Transparent)
- **Objectiu:** Captar l'essència icònica de cada robot amb molt pocs detalls (alt minimalisme), mantenint exactament la mateixa quantitat i nivell de detall visual a tots els robots.
- **Estil visual:** Lineless estricte (sense contorns ni línies negres), acabat mat (sense brillantors ni reflexos), colors plans uniformes (sense degradats ni ombrejats suaus), sense cap ombra al terra.
- **Fons Transparent:** Format PNG amb canal alfa transparent completament net, sense halos ni vores d'adhesiu.
- **Mida i Ubicació:** `assets/icons/[robot].png` a 512 × 512 px.

## 🚩 Banners i Icones de Seccions Temàtiques
- **Seccions:** *Pensament computacional*, *Robòtica* i *Situacions d'aprenentatge*.
- **Banners:** `assets/banners/[seccio].jpg` a format 4:3 (800x600 px), amb fons bicolor pla (paret pastís i taula clara), lineless, acabat mat i sense ombres al terra.
- **Icones:** `assets/icons/[seccio].png` a 512 × 512 px, fons transparent, síntesi geomètrica i lineless.

## 🔤 Guia Tipogràfica Oficial
- **Títols i encapçalaments:** Font **"Sora"** (`font-family: var(--font-heading)`). S'aplica a tots els `h1-h6`, nom de marca (`.logo-name`), títols de targetes (`.pillar-title`, `.item-title`), capçaleres de detall (`.detail-page-title`, `.detail-section h4`, `.robot-profile-title`, `.robot-tutorials-heading h3`).
- **Text continu i interfície (UI):** Font **"Plus Jakarta Sans"** (`font-family: var(--font-sans)`). S'aplica a tot el cos (`body`), botons (`.btn-primary`, `.btn-back`, `.nav-btn`), controls de filtratge (`.filter-select`), etiquetes (`.tag-badge`, `.robot-spec-pill`), textos i descripcions.

## 🏷️ Identitat Corporativa Oficial ("Robòtica per a docents")
- **Concepte:** Disseny geomètric abstracte, net i minimalista ("El Bot Modular STEAM"), que manté l'equilibri entre el to educatiu infantil i la serietat institucional adulta.
- **Logotip / Isotip Vectorial (`assets/icons/logo.svg`):**
  - **Barra superior:** Es mostra de manera estàtica i neta a la capçalera de totes les pàgines (`.logo-badge-img`).
  - **Favicon:** Utilitzat com a favicon oficial en format SVG (`<link rel="icon" type="image/svg+xml" href="assets/icons/logo.svg">`).
  - **Portada (`index.html`):** Inserit en línia (`.home-hero-svg`) amb animacions CSS integrades: parpelleig orgànic (`#right_eye`, `#left_eye` amb lleuger desfase), microinterferència de color i translació cibernètica (`eye-glitch`), oscil·lació periòdica de l'antena (`#antenna`) i micro-glitch de pantalla (`#face`).
- **Il·lustració corporativa:** `assets/banners/robotica-docents.jpg` (i `assets/banners/corporativa.jpg`) a format 4:3 (800 × 600 px), amb fons bicolor pla (paret blau cel pastís i taula clara), lineless, acabat mat i sense ombres al terra.





