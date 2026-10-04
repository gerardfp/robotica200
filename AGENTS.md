# Regles del Projecte Robòtica²⁰⁰

## 🚫 Prohibició Total de Diàlegs Modals i Popups (Estricte)
- **Queda absolutament prohibit l'ús de diàlegs modals (`<dialog>`, modales, popups, overlays, lightbox, backdrops foscos o qualsevol element flotant similar).**
- Tota la navegació i visualització de contingut (activitats, robots, tutorials, situacions d'aprenentatge) s'ha de fer mitjançant **pàgines/vistes en línia completes**.
- Cada pàgina de detall ha de disposar d'un botó visible de tornada (`← Tornar...`) que restitueixi l'estat anterior de manera natural i accessible.
- La web ha de mantenir en tot moment una **baixa densitat d'informació**, espaiat generós i netedat visual.

## 🎨 Guia d'Estil de les Imatges dels Robots (Fons Transparent Estricte)
- **Estil Visual: Estètica EdTech Isomètrica 3D:**
  - Il·lustració 3D estilitzada / joguina tecnològica amable (toy-like), superfícies netes i arrodonides.
  - Isometria suau / perspectiva axonomètrica neta (~30°).
  - Low-poly refinat: geometria simple amb bisells i volums nets, acabat plàstic mat / setinat suau.
  - Colors sòlids i vibrants (paletes binàries netes).
  - Il·luminació difusa de fons d'estudi amb ombres suaus de volum.
  - Identitat tècnica i educativa (no és un simple dibuix animat infantil, té caràcter STEAM).
- **📝 Fórmula Oficial de Prompt ("Estil Robòtica²⁰⁰"):**
  `Polished 3D isometric educational robotics illustration, stylized toy-like low-poly geometry, rounded beveled forms, matte plastic materials, soft diffuse studio lighting, gentle ambient occlusion, clean geometric shapes, vivid but softened STEM colors, compact modular isometric platform, friendly modern edtech aesthetic, transparent background, no text or logos. [SUBJECT: descripció del robot i elements educatius que l'envolten]`
- **2 Imatges Obligatòries per Robot (Format PNG Transparent):**
  1. **Robot Complet (`_assets/robots/[robot].png`):** Model 3D isomètric complet, perspectiva 3/4. **Canal alfa 100% transparent**.
  2. **Icona Abstracta d'Essència (`_assets/icons/[robot].png`):** Síntesi geomètrica minimalista (512 × 512 px) que capta l'essència icònica amb molt pocs detalls. **Canal alfa 100% transparent**.
- **🚫 Lineless estricte:** Sense línies de contorn (sense outlines, sense traçats negres ni línies de tinta).
- **🚫 Sense brillantors especulars:** Acabat mat suau.
- **🚫 Sense ombres al terra:** Cap ombra sota el robot per permetre la integració neta sobre el fons bicolor CSS.
- **🚫 Sense text:** Cap text, paraula, xifra, logotip ni marca d'aigua.

## 🎴 Sistema de Targetes i Paletes de 2 Colors per Robot
- Cada robot té una **paleta de dos colors associats amb proporcions oficials**, que s'utilitzen per:
  1. El fons de la imatge generat amb fitxers vectorials SVG purs (`_assets/robots/bg-[robot].svg`) amb toc isomètric a 30°, línies corbes i diferents tonalitats.
  2. La vora de la targeta (**gruix de 4px degradat** entre els 2 colors de cada robot, `border-radius: 12px` al `.robot-card` i sense border-radius a `.robot-card-media`).
  3. L'indicador de 2 punts cromàtics (`.robot-color-dots`) sobre el títol.
  4. La píndola flotant d'edat a la cantonada superior dreta (`👤 X anys`).
- **Paletes Oficials:**
  - `Coding Express` (`coding-express`): `#e4242b` (70%) + `#fec002` (30%) — (👤 2-5 anys) — Prefix: `ce-`
  - `Tale-Bot` (`tale-bot`): `#fc8439` (65%) + `#804cbd` (35%) — (👤 3-7 anys) — Prefix: `tb-`
  - `Coding Set` (`coding-set`): `#fc7813` (65%) + `#60a62d` (35%) — (👤 4-9 anys) — Prefix: `cs-`
  - `Codey Rocky` (`codey-rocky`): `#0079dc` (70%) + `#fdc80a` (30%) — (👤 6-12 anys) — Prefix: `cr-`
  - `Spike` (`spike`): `#d82098` (65%) + `#fddc3e` (35%) — (👤 10-16 anys) — Prefix: `sp-`
  - `Micro:bit` (`microbit`): `#047fdf` (70%) + `#4a515d` (30%) — (👤 9-18 anys) — Prefix: `mb-`

## 🚩 Banners i Icones de Seccions Temàtiques
- **Seccions:** *Pensament computacional*, *Robots* i *Situacions d'aprenentatge*.
- **Banners:** `_assets/banners/[seccio].jpg` a format 4:3 (800x600 px), amb fons bicolor pla (paret pastís i taula clara), lineless, acabat mat i sense ombres al terra.
- **Icones:** `_assets/icons/[seccio].png` a 512 × 512 px, fons transparent, síntesi geomètrica i lineless.

## 🔤 Guia Tipogràfica Oficial
- **Títols i encapçalaments:** Font **"Sora"** (`font-family: var(--font-heading)`). S'aplica a tots els `h1-h6`, nom de marca (`.logo-name`), títols de targetes (`.pillar-title`, `.item-title`), capçaleres de detall (`.detail-page-title`, `.detail-section h4`, `.robot-profile-title`, `.robot-tutorials-heading h3`).
- **Text continu i interfície (UI):** Font **"Plus Jakarta Sans"** (`font-family: var(--font-sans)`). S'aplica a tot el cos (`body`), botons (`.btn-primary`, `.btn-back`, `.nav-btn`), controls de filtratge (`.filter-select`), etiquetes (`.tag-badge`, `.robot-spec-pill`), textos i descripcions.

## 🏷️ Identitat Corporativa Oficial ("Robòtica per a docents")
- **Concepte:** Disseny geomètric abstracte, net i minimalista ("El Bot Modular STEAM"), que manté l'equilibri entre el to educatiu infantil i la serietat institucional adulta.
- **Logotip / Isotip Vectorial (`_assets/icons/logo.svg`):**
  - **Barra superior:** Es mostra de manera estàtica i neta a la capçalera de totes les pàgines (`.logo-badge-img`).
  - **Favicon:** Utilitzat com a favicon oficial en format SVG (`<link rel="icon" type="image/svg+xml" href="_assets/icons/logo.svg">`).
  - **Portada (`index.html`):** Inserit en línia (`.home-hero-svg`) amb suite dinàmica de 8 micro-animacions robòtiques executades cada 2-4 segons (`_js/robot-animation.js`): parpelleig ràpid d'ulls (`robot-anim-blink`), oscil·lació ràpida d'antena (`robot-anim-antenna`), alerta de sensor i radar (`robot-anim-alert`), micro-glitch de pantalla (`robot-anim-glitch`), mirada curiosa als costats (`robot-anim-look`), salt alegre/hop (`robot-anim-happy`), inclinació de cap pensant (`robot-anim-tilt`) i escaneig cromàtic de mode matrix (`robot-anim-scan`). També reactiu al clic/interacció de l'usuari.
- **Il·lustració corporativa:** `_assets/banners/robotica-docents.jpg` (i `_assets/banners/corporativa.jpg`) a format 4:3 (800 × 600 px), amb fons bicolor pla (paret blau cel pastís i taula clara), lineless, acabat mat i sense ombres al terra.

## ☀️ Tema Clar Exclusiu (Sense Mode Fosc)
- El lloc web funciona **exclusivament en tema clar**.
- Queda absolutament descartat qualsevol selector de mode fosc (`[data-theme="dark"]`, botons d'alternança, `prefers-color-scheme`, etc.).
- Tot l'estil es basa en fons blancs nets (`#ffffff`), fons de pàgina suaus (`#f8fafc`), capçaleres hero i footers en `#ebf5fd` i contrast òptim de text (`#0f172a` i `#64748b`).

## 📐 Layout Unificat de Seccions Principals
- Les pàgines principals de secció (**Robòtica educativa**, **Pensament computacional** i **Situacions d'aprenentatge**) utilitzen exactament la mateixa estructura visual:
  1. **Hero corporatiu (`.robots-hero` / `.section-hero`):** Fons `#ebf5fd` d'amplada completa (100% de la finestra, sense vores ni arrodoniments externs, enganxat a la capçalera), amb contenidor intern (`.container.robots-hero-inner`) en graella i `overflow: visible;`.
     - Botó de retorn (`<nav-back>`): Sempre alineat a la part superior esquerra de l'hero (`grid-column: 1; grid-row: 1; align-self: start;`).
     - Columna esquerra: Títol `h1` en Sora 800 (`#010b40`) amb `margin-top: 0` per garantir que tots els títols de les seccions quedin exactament a la mateixa alçada vertical, descripció clara i guions de color STEAM (`.accent-dashes`).
     - Columna dreta: Banner oficial transparent (`.robots-hero-img`) ocupant tota l'alçada del hero i sobresortint lleugerament per sota (`margin-top: -2.25rem; margin-bottom: -3.75rem; overflow: visible;`) per aportar dinamisme i profunditat 3D sense obstaculitzar el contingut.
  2. **Zona de contingut / Graella:** Graella d'elements (`.clean-grid`) amb targetes de baixa densitat, cantonades arrodonides (20-24px), tipografia Sora en els títols i elevació suau a l'hover.
  3. **Callout inferior de suport (`.catalog-callout`):** Bloc inferior de reflexió/guia pedagògica abans del peu de pàgina.

## 🎓 Nomenclatura Oficial dels Nivells Educatius (Estricte)
- La web utilitza exclusivament els 4 nivells oficials d'educació infantil i primària:
  1. **Educació Infantil** (`infantil`)
  2. **Primer cicle** (`primer-cicle`)
  3. **Segon cicle** (`segon-cicle`)
  4. **Tercer cicle** (`tercer-cicle`)
- **Queda descartada totalment l'ESO**: no s'utilitza com a filtre, etiqueta ni opció a cap activitat, robot o situació d'aprenentatge.
