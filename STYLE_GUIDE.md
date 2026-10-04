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
  - Arrodoniment: `border-radius: 12px`.
  - Vora degradada de 4px: `border: 4px solid transparent` amb degradat entre els dos colors oficials de cada robot (`linear-gradient(135deg, var(--robot-c1), var(--robot-c2)) border-box`).
  - Ombra suau: `box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05)`.
  - Transició hover: Lleugera elevació vertical (`translateY(-5px)`) amb increment d'ombra suau (`box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12)`).
- **Àrea d'il·lustració superior (`.robot-card-media`):**
  - Sense arrodoniment propi (`border-radius: 0`), hereta el retall del pare per `overflow: hidden`.
  - Aspect ratio: `16 / 11`.
  - **Fons SVG vectorial isomètric i corbat:** Fons SVG pur (`_assets/robots/bg-[robot].svg`) amb pedestal axonomètric a 30°, línies corbes i combinació tonal dels colors oficials del robot.
  - **Insígnia d'edat flotant (`.robot-age-badge`):**
    - Càpsula flotant a la cantonada superior dreta (`top: 12px; right: 12px`).
    - Fons blanc translúcid (`rgba(255, 255, 255, 0.95)`), `border-radius: 9999px`, padding `4px 12px`.
    - Ombra suau: `box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12)`.
    - Text: Icona de persona `👤` seguida del rang d'edat, acolorit amb el **color primari del robot**.
- **Vora de la targeta:** Vora degradada de **4px** que recorre tot el perímetre de la targeta unint harmònicament els dos colors oficials del robot.
- **Cos de la targeta (`.robot-card-body`):**
  - **Indicador de 2 punts (`.robot-color-dots`):** Dos cercles (`10px` de diàmetre) situats a dalt a l'esquerra del títol, separats `7px`, que mostren de manera elegant la paleta binària del robot.
  - **Títol (`.robot-card-title`):** Font **Sora**, pes 700 (Bold), mida `1.25rem`, color fosc de contrast (`#0f172a`).
  - **Descripció (`.robot-card-desc`):** Font **Plus Jakarta Sans**, pes 400 (Regular), color gris pissarra (`#64748b`), alçada de línia `1.5`.
- **Peu de la targeta (`.robot-card-footer`):**
  - **Comptador de tutorials:** Icona de llibre SVG net + text `X tutorials`, acolorit en el **color primari del robot**.
  - **Enllaç d'acció:** `Entrar a la pàgina →`, en tipografia semibold, acolorit en el **color primari del robot**.

---

## 2. 🎨 Paletes Cromàtiques Oficials per Robot

Cada robot té assignada una **paleta de dos colors associats amb proporció oficial**:
1. Crear la composició d'àrees superposades darrere del robot (Color 1 dominant ~65-70% i Color 2 superposat ~30-35%).
2. Pintar la vora de 4px i els detalls de la targeta (punts indicadors, comptador i botó).

| Robot | Slug Oficial | Color 1 (Dominant 65-70%, Vora 4px, Punt 1) | Color 2 (Secundari 30-35%, Àrees superposades, Punt 2) | Proporció | Rang d'Edat |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Coding Express** | `coding-express` | Vermell `#e4242b` | Groc ambre `#fec002` | 70% + 30% | 👤 2-5 anys |
| **Tale-Bot** | `tale-bot` | Taronja corall `#fc8439` | Violeta `#804cbd` | 65% + 35% | 👤 3-7 anys |
| **Coding Set** | `coding-set` | Taronja mandarí `#fc7813` | Verd fresc `#60a62d` | 65% + 35% | 👤 4-9 anys |
| **Codey Rocky** | `codey-rocky` | Blau cel `#0079dc` | Groc sorra `#fdc80a` | 70% + 30% | 👤 6-12 anys |
| **SPIKE** | `spike` | Fúcsia vibrant `#d82098` | Groc LEGO `#fddc3e` | 65% + 35% | 👤 10-16 anys |
| **micro:bit** | `microbit` | Blau elèctric `#047fdf` | Gris obsidiana `#4a515d` | 70% + 30% | 👤 9-18 anys |

---

## 3. 🎨 Direcció d'Art i Estil Visual Oficial (Estètica EdTech Isomètrica)

La identitat visual dels robots es defineix com una **il·lustració 3D isomètrica tècnica i amable**. No és un simple "3D cartoon" infantil; el component isomètric, axonomètric i geomètric li confereix una identitat més tècnica, rigorosa i pròpia de la robòtica educativa moderna.

### Els 9 Pilars de l'Estil Gràfic:
1. **Ilustración 3D estilizada / cartoon 3D:** Objetos tridimensionales, pero simplificados y sin buscar realismo fotográfico ni suciedad en las texturas.
2. **Isométrico suave:** Perspectiva e isometría casi axonométrica limpia (ángulo cenital de ~30°), especialmente en las plataformas, bloques y componentes.
3. **Toy-like / aspecto de juguete:** Los robots parecen pequeños objetos físicos de juguete o kits educativos amables, con superficies limpias y formas redondeadas.
4. **Low-poly refinado:** Geometría relativamente sencilla y limpia, pero con suficientes volúmenes, biseles curvados y gradaciones de luz para que no parezca un low-poly tosco.
5. **Materiales plásticos mate:** Superficies de plástico ligeramente satinadas / soft-touch, sin reflejos especulares ni brillos fotográficos agresivos.
6. **Colores sólidos y vibrantes:** Colores muy limpios y saturados, con combinaciones binarias de 2–3 colores vivos por robot según su paleta oficial.
7. **Iluminación de estudio suave:** Luz difusa de estudio fotográfico, sombras blandas y pequeños toques de luz que ayudan a recortar y separar los volúmenes en el espacio.
8. **Fondo gráfico abstracto / Transparente:** En la web, el fondo de la imagen se aísla con canal alfa 100% transparente para montarse limpiamente sobre los fondos bicolores CSS.
9. **Estética edtech contemporánea:** Lenguaje visual que recuerda a las ilustraciones de productos tecnológicos educativos punteros y landing pages de startups de tecnología y diseño (estilo Stripe / Linear / Duolingo / Vercel Kids).

### 📝 Fórmula de Prompt Condensada (Estàndard Oficial):
```text
Stylized 3D isometric educational robotics illustration of [Nom del Robot], cute toy-like robots, rounded geometry, simplified low-poly forms, matte plastic materials, soft studio lighting, vibrant solid colors, subtle shadows, isolated on solid white studio background, modern edtech aesthetic.
```

> 💡 **Nota clau d'identitat:** No és un disseny infantil genèric: la combinació d'isometria precisa, bisells nets i geometria modular dota al conjunt d'un caràcter tècnic i professional adequat tant per a mestres d'Infantil com de Secundària.

---

## 4. 🖼️ Les 2 Imatges Obligatòries per Robot (Amb Fons Transparent)

Per a cada robot del projecte es generaran i mantindran **dues representacions visuals amb canal alfa transparent pur (`.png`)**:

### A) Tipus 1: Robot Complet (`_assets/robots/[slug].png`)
- **Funció:** Imatge principal per a la targeta del catàleg de robots i la capçalera de la seva fitxa tècnica.
- **Format:** PNG 32-bit amb **fons 100% transparent** (sense vores blanques, halos ni ombres projectades al terra).
- **Resolució:** 600 × 448 px (proporció 4:3) o 800 × 600 px centrat.
- **Estil visual:**
  - Aplica exactament els 9 pilars EdTech isomètrics descrits anteriorment.
  - Model 3D isomètric complet en perspectiva 3/4 frontal.
  - Sense ombres sota el robot per permetre la integració directa amb el fons corbat CSS.

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
- **Enllaç de retorn:** `<nav-back>` sempre alineat a la part superior de l'hero (`grid-column: 1 / -1; align-self: start`) amb la fletxa en to `#2563eb`.
- **Títol principal:** `Robòtica Educativa` (o `Robots`), amb tipografia **Sora** extra bold (`font-weight: 800`), color blau fosc profund (`#010b40`).
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

---

## 7. ☀️ Tema Clar Exclusiu

- El projecte s'executa **íntegrament en tema clar**. No hi ha suport per a mode fosc.
- No s'admeten selectors `[data-theme="dark"]`, botons d'alternança `#theme-toggle` ni regles `@media (prefers-color-scheme: dark)`.
- El contrast visual es basa en fons blancs nets (`#ffffff`), fons suaus `#f8fafc`, heros i footers corporatius en `#ebf5fd` i tipografia d'alta llegibilitat (`#0f172a` per a títols, `#475569` per a text general).

---

## 8. 📐 Layout Unificat de les Seccions Principals

Totes les pàgines de secció principal (**Robots**, **Pensament computacional** i **Situacions d'aprenentatge**) segueixen estrictament la mateixa arquitectura:

1. **Hero Corporatiu (`.robots-hero` / `.section-hero`):**
   - Fons corporatiu suau `#ebf5fd` amb vora suau `1px solid rgba(0, 121, 220, 0.12)` i `border-radius: 28px`.
   - Grid a 2 columnes (columna de text a l'esquerra amb botó de retorn, títol Sora 800, subtítol i els 3 guions d'accent; columna dreta amb la il·lustració/banner 4:3 oficial arrodonida a 20px).
2. **Graella de Targetes (`.clean-grid`):**
   - Targetes espaiades amb fons blanc, cantons arrodonits (20-24px), títols en Sora Bold i footer d'acció semibold.
3. **Callout Pedagògic Inferior (`.catalog-callout`):**
   - Caixa neta inferior amb suport didàctic i enllaç a la guia docent abans del peu de pàgina corporatiu.

