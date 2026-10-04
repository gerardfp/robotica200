# Regles del Projecte Robòtica²⁰⁰

## 🚫 Prohibició Total de Diàlegs Modals i Popups (Estricte)
- **Queda absolutament prohibit l'ús de diàlegs modals (`<dialog>`, modales, popups, overlays, lightbox, backdrops foscos o qualsevol element flotant similar).**
- Tota la navegació i visualització de contingut (activitats, robots, tutorials, situacions d'aprenentatge) s'ha de fer mitjançant **pàgines/vistes en línia completes**.
- Cada pàgina de detall ha de disposar d'un botó visible de tornada (`← Tornar...`) que restitueixi l'estat anterior de manera natural i accessible.
- La web ha de mantenir en tot moment una **baixa densitat d'informació**, espaiat generós i netedat visual.

## 🎨 Guia d'Estil de les Imatges dels Robots (Fons Transparent Estricte)
- **2 Imatges Obligatòries per Robot (Format PNG Transparent):**
  1. **Robot Complet (`_assets/robots/[robot].png`):** Model 3D isomètric complet, joguina tecnològica educativa amable, superfícies suaus i arrodonides, perspectiva 3/4. **Canal alfa 100% transparent**.
  2. **Icona Abstracta d'Essència (`_assets/icons/[robot].png`):** Síntesi geomètrica minimalista (512 × 512 px) que capta l'essència icònica amb molt pocs detalls. **Canal alfa 100% transparent**.
- **🚫 Lineless estricte:** Sense línies de contorn (sense outlines, sense traçats negres ni línies de tinta). Formes definides per contrast de colors i volum.
- **🚫 Sense brillantors ni reflexos:** Acabat mat suau, sense reflexos especulars.
- **🚫 Sense ombres al terra:** Cap ombra sota el robot per permetre la integració neta sobre el fons bicolor CSS.
- **🚫 Sense text:** Cap text, paraula, xifra, logotip ni marca d'aigua.

## 🎴 Sistema de Targetes i Paletes de 2 Colors per Robot
- Cada robot té una **paleta de dos colors associats**, que s'utilitzen per:
  1. El fons bicolor corbat/diagonal darrere del robot (generat per CSS).
  2. La vora de la targeta (`border: 2px solid`) i els elements decoratius.
  3. L'indicador de 2 punts cromàtics (`.robot-color-dots`) sobre el títol.
  4. La píndola flotant d'edat a la cantonada superior dreta (`👤 X anys`).
- **Paletes Oficials:**
  - `Coding Express` (`coding-express`): Vermell viu `#E01A27` + Groc ambre `#F5B901` (👤 2-5 anys) — Prefix: `ce-`
  - `Tale-Bot` (`tale-bot`): Taronja corall `#FF7E2D` + Violeta `#784FAD` (👤 3-7 anys) — Prefix: `tb-`
  - `Coding Set` (`coding-set`): Taronja mandarí `#F76D08` + Verd fresc `#5DA22B` (👤 4-9 anys) — Prefix: `cs-`
  - `Codey Rocky` (`codey-rocky`): Blau cel / Atzur `#0377DA` + Groc sorra `#FEC907` (👤 6-12 anys) — Prefix: `cr-`
  - `Spike` (`spike`): Magenta viu `#B92384` + Groc LEGO `#FDDC43` (👤 10-16 anys) — Prefix: `sp-`
  - `Micro:bit` (`microbit`): Blau elèctric `#067CD4` + Negre obsidiana `#18181B` (👤 9-18 anys) — Prefix: `mb-`

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





