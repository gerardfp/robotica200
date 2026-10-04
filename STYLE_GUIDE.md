# 🎨 Guia d'Estil Visual i Sistema de Disseny — Robòtica²⁰⁰

Aquest document estableix l'estàndard oficial del nou sistema visual de **Robòtica²⁰⁰**, extret directament del disseny de referència de la pàgina de **Robots** (`_assets/banners/mockup-robots-redisseny.jpg`).

---

## 1. 🎴 Anatomia de les Targetes de Robots

Cada robot es presenta en una targeta amb personalitat cromàtica pròpia i una estructura neta i ben jerarquitzada:

```
┌────────────────────────────────────────────────────────┐
│  [ FONS BICOLOR CORBAT / DIAGONAL DEL ROBOT ]          │
│                                           ┌──────────┐ │
│                                           │👤 Edat   │ │
│                 [ ROBOT 3D ]              └──────────┘ │
│           (PNG FONS TRANSPARENT)                       │
├────────────────────────────────────────────────────────┤
│  ● ●  (2 punts de color de la paleta)                  │
│                                                        │
│  Nom del Robot (Sora Bold)                             │
│  Descripció pedagògica en una o dues frases breus.     │
│                                                        │
│  📖 X tutorials                    Entrar a la pàgina →│
└────────────────────────────────────────────────────────┘
```

### Especificacions Tècniques de la Targeta:
- **Contenidor exterior:**
  - Fons: Blanc sòlid (`#ffffff`).
  - Arrodoniment: `border-radius: 22px` - `24px`.
  - Vora decorativa: `border: 2px solid var(--robot-border)` (feta amb el color primari de cada robot o una variant suau d'aquest).
  - Ombra suau: `box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05)`.
  - Transició hover: Lleugera elevació vertical (`translateY(-4px)`) amb increment d'ombra suau.
- **Àrea d'il·lustració superior (`.robot-card-media`):**
  - Arrodoniment superior: `border-radius: 20px 20px 0 0`.
  - Alçada: ~210px - 230px.
  - **Fons bicolor corbat:** Composició de fons generada per CSS (o màscara SVG) amb els **dos colors associats** de cada robot (efecte paret pastís superior i terra/ona suau inferior).
  - **Insígnia d'edat (`.age-badge`):**
    - Càpsula flotant a la cantonada superior dreta (`top: 14px; right: 14px`).
    - Fons blanc pur (`#ffffff`), `border-radius: 9999px`, padding `4px 12px`.
    - Ombra suau: `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)`.
    - Text: Icona de persona `👤` seguida del rang d'edat, acolorit amb el **color primari del robot**.
- **Cos de la targeta (`.card-body`):**
  - **Indicador de 2 punts (`.robot-color-dots`):** Dos cercles (`8px` o `10px` de diàmetre) situats a dalt a l'esquerra del títol, separats `6px`, que mostren de manera elegant la paleta binària del robot.
  - **Títol (`.item-title`):** Font **Sora**, pes 700 (Bold), mida `1.25rem`, color fosc de contrast (`#0f172a`).
  - **Descripció (`.item-desc`):** Font **Plus Jakarta Sans**, pes 400 (Regular), color gris pissarra (`#64748b`), alçada de línia `1.5`.
- **Peu de la targeta (`.item-footer`):**
  - **Comptador de tutorials:** Icona de llibre `📖` o SVG net + text `X tutorials`, acolorit en el **color primari del robot**.
  - **Enllaç d'acció:** `Entrar a la pàgina →`, en tipografia semibold, acolorit en el **color primari del robot**.

---

## 2. 🎨 Paletes Cromàtiques Oficials per Robot

Cada robot té assignada una **paleta de dos colors associats**, que s'utilitzen per:
1. Crear el seu fons bicolor corbat/diagonal darrere del robot.
2. Pintar la vora i els detalls de la targeta (punts indicadors, badge d'edat, comptador i botó).

| Robot | Slug Oficial | Color Primari (Vora, Punt 1, Accents) | Color Secundari (Punt 2, Fons) | Fons Bicolor Recomanat (CSS) | Rang d'Edat |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Coding Express** | `coding-express` | Vermell viu `#E01A27` | Groc ambre `#F5B901` | Superior: `#FF4D5A` / `#EF4444`<br>Inferior: `#FEF08A` / `#FDE047` | 👤 2-5 anys |
| **Tale-Bot** | `tale-bot` | Taronja corall `#FF7E2D` | Violeta / Lavanda `#784FAD` | Superior: `#C4B5FD` / `#A78BFA`<br>Inferior: `#FFEDD5` / `#FED7AA` | 👤 3-7 anys |
| **Coding Set** | `coding-set` | Taronja mandarí `#F76D08` | Verd gespa fresc `#5DA22B` | Superior: `#BBF7D0` / `#86EFAC`<br>Inferior: `#FFEDD5` / `#FED7AA` | 👤 4-9 anys |
| **Codey Rocky** | `codey-rocky` | Blau cel / Atzur `#0377DA` | Groc sorra suau `#FEC907` | Superior: `#7DD3FC` / `#38BDF8`<br>Inferior: `#FEF3C7` / `#FDE68A` | 👤 6-12 anys |
| **Spike** | `spike` | Magenta / Fúcsia viu `#B92384` | Groc LEGO vibrant `#FDDC43` | Superior: `#F5D0FE` / `#E879F9`<br>Inferior: `#FEF08A` / `#FDE047` | 👤 10-16 anys |
| **Micro:bit** | `microbit` | Blau elèctric `#067CD4` | Negre obsidiana `#18181B` | Superior: `#38BDF8` / `#60A5FA`<br>Inferior: `#FEF3C7` / `#FDE68A` | 👤 9-18 anys |

---

## 3. 🖼️ Les 2 Imatges Obligatòries per Robot (Amb Fons Transparent)

Per a cada robot del projecte es generaran i mantindran **dues representacions visuals amb canal alfa transparent pur (`.png`)**:

### A) Tipus 1: Robot Complet (`_assets/robots/[slug].png`)
- **Funció:** Imatge principal per a la targeta del catàleg de robots i la capçalera de la seva fitxa tècnica.
- **Format:** PNG 32-bit amb **fons 100% transparent** (sense vores blanques ni halos).
- **Resolució:** 600 × 448 px (proporció 4:3) o 800 × 600 px centrat.
- **Estil visual:**
  - Model 3D isomètric estilitzat de joguina tecnològica educativa amable.
  - **🚫 Lineless estricte:** Sense línies negres de contorn (sense outlines ni traços de tinta). El volum i les formes es defineixen exclusivament pel contrast de color, llum i plans suaus.
  - **🚫 Sense brillantors ni reflexos:** Acabat mat suau (soft-matte / clay-morphism subtil).
  - **🚫 Sense ombres al terra:** No hi ha d'haver ombres projectades al terra a la imatge PNG; el fons ha de ser transparent fins a la mateixa base del robot perquè s'integri sobre el fons bicolor CSS.
  - **Perspectiva:** Perspectiva isomètrica 3/4 frontal, orientat lleugerament cap a l'esquerra o dreta segons el dinamisme de la peça.

### B) Tipus 2: Icona Abstracta d'Essència (`_assets/icons/[slug].png`)
- **Funció:** Icona d'identificació ràpida per a miniatures d'activitats, insígnies curriculars de situacions d'aprenentatge, filtres i taules.
- **Format:** PNG quadrat 1:1 (resolució estàndard: 512 × 512 px) amb **fons 100% transparent**.
- **Estil visual:**
  - Síntesi geomètrica abstracta i alt minimalisme (mateix nivell de detall sintètic a tots els robots).
  - Captura exclusivament l'element més icònic:
    - `coding-express`: Cabina de locomotora groga DUPLO amb 4 studs i xemeneia.
    - `tale-bot`: Cub blanc/blau amb els dos grans ulls amables i botons superiors.
    - `coding-set`: Petit MatataBot cilíndric blanc amb cúpula taronja.
    - `codey-rocky`: Cap de Codey amb orelletes i matriu LED cian somrient.
    - `spike`: Hub rectangular groc amb ulls de sensor d'ultrasons.
    - `microbit`: Placa negra cantonades arrodonides amb matriu 5x5 i pins daurats.
  - Lineless estricte, acabat mat, colors sòlids plans.

---

## 4. 🌟 Elements d'Entorn de la Pàgina de Robots

### A) Capçalera Hero de la Pàgina
- **Enllaç de retorn:** `← Tornar a inici` en to blau corporatiu suau.
- **Títol principal:** `Robòtica Educativa` (o `Robots`), amb tipografia **Sora** extra bold (`font-weight: 800`), color blau fosc profund (`#0f172a`).
- **Subtítol:** `"Selecciona un robot per accedir a la seva pàgina d'aprenentatge i tutorials específics."` en Plus Jakarta Sans.
- **Indicador de 3 barres decoratives:**
  - Barra vermella (`#EF4444`)
  - Barra groga (`#F59E0B`)
  - Barra blava (`#3B82F6`)
- **Escena gràfica dreta:**
  - Il·lustració isomètrica 3D STEAM amb el robotet blau somrient sobre un mapa amb línia discontínua i cubs/blocs modulars de colors (vermell, verd, groc, blau).

### B) Peu de Pàgina Pedagògic
- **Costat esquerre:**
  - Logotip/avatar del robot somrient de Robòtica²⁰⁰ amb antena.
  - Lema curricular: **"Aprendre fent, programar per a un futur millor."**
  - Les 3 barres decoratives (vermell, groc, blau).
- **Costat dret:**
  - Composició isomètrica amb cubs modulars STEAM (verd amb icona, vermell, blau, groc) acompanyats pel mini-robot blau.

---

## 5. 🔬 Valoració Tècnica: Full Únic (Grid/Sheet) vs. Imatges Individuals

Per garantir la màxima coherència estilística entre els robots, es valora la proposta de generar un full conjunt:

### Avantatges de Generar un Full Únic (Grid/Sprite Sheet):
1. **Coherència d'Estil Impecable:** El model d'IA aplica exactament la mateixa il·luminació, nivell de cel-shading, acabat mat i paleta harmònica a tots els elements en una sola passada.
2. **Harmonia d'Escala i Angle:** Els 6 robots comparteixen el mateix angle de cambra isomètric (30 graus) i una escala relativa natural.
3. **Optimització de Tokens i Iteració:** Una sola generació permet avaluar la coherència del conjunt d'un cop d'ull.

### Reptes Tècnics i Riscos a Controlar:
1. **Confusió de Característiques (Creuament de Detalls):** En demanar 6 robots educatius concrets en un sol prompt, l'IA pot barrejar components (p. ex., posar rodes a la Micro:bit o peces LEGO al Tale-Bot).
2. **Resolució per Element:** Una imatge quadrada de 1024 × 1024 px dividida en 6 caselles (3 columnes × 2 files) deixa aproximadament 300 × 400 px per robot, que un cop retallada i escalada pot perdre nitidesa comparat amb un render dedicat.
3. **Retall i Transparència:** Cal generar sobre un fons pla d'alt contrast (p. ex., blanc pur o verd croma) per poder executar un script de màscara alfa en Python (rembg o PIL) que aïlli cadascun dels 6 robots sense vores dentades ni halos de color.

### Estratègia Òptima Adoptada:
- **Pas 1:** Intentar la generació del full conjunt (Sprite Sheet 3x2) amb els 6 robots sobre fons blanc d'estudi amb perspectiva uniforme.
- **Pas 2:** Extreure i retallar en Python cada robot amb fons transparent (`_assets/robots/[slug].png`).
- **Pas 3:** Si algun robot presenta deformacions o pèrdua de detalls fidels al model real, es regenera aquest robot individualment utilitzant la mateixa llavor visual i el prompt d'estil de la guia.

---

## 6. 🔤 Sistema Tipogràfic i Identitat

- **Títols i Encapçalaments:** **"Sora"** (`font-family: var(--font-heading)`).
- **Text Continu i Controls:** **"Plus Jakarta Sans"** (`font-family: var(--font-sans)`).
- **Identitat Oficial:** `Robòtica<sup>200</sup>` — *Robòtica per a docents*.
