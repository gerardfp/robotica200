# 🤖 Robòtica²⁰⁰ — Robòtica per a docents

Portal educatiu obert de robòtica educativa, pensament computacional i situacions d'aprenentatge curriculars per a mestres i docents d'Educació Infantil i Primària.

---

## 🤖 Robots Oficials i Slugs

Els 6 robots oficials del projecte i els seus identificadors únics (slugs) normalitzats a tot el repositori:

| Robot | Slug Oficial | Color Primari | Color Secundari | Fons Subtil (Hero / Targetes) | Prefix | Ruta Fitxa | Rutes de Tutorials |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Coding Express** | `coding-express` | Roig / Rojo (`#e4242b`) | Groc / Amarillo (`#fec002`) | `#fef2f2` | `ce-` | `robot/coding-express/index.html` | `tutorial/ce-*/index.html` |
| **Tale-Bot** | `tale-bot` | Taronja / Naranja (`#ea580c`) | Lila (`#804cbd`) | `#fff7ed` | `tb-` | `robot/tale-bot/index.html` | `tutorial/tb-*/index.html` |
| **Coding Set** | `coding-set` | Verd / Verde (`#16a34a`) | Taronja / Naranja (`#fc7813`) | `#f0fdf4` | `cs-` | `robot/coding-set/index.html` | `tutorial/cs-*/index.html` |
| **Codey Rocky** | `codey-rocky` | Blau / Azul (`#0079dc`) | Gris (`#64748b`) | `#eff6ff` | `cr-` | `robot/codey-rocky/index.html` | `tutorial/cr-*/index.html` |
| **Spike** | `spike` | Groc / Amarillo (`#ca8a04`) | Blau / Azul (`#0284c7`) | `#fefce8` | `sp-` | `robot/spike/index.html` | `tutorial/sp-*/index.html` |
| **Micro:bit** | `microbit` | Rosa (`#db2777`) | Groc / Amarillo (`#facc15`) | `#fdf2f8` | `mb-` | `robot/microbit/index.html` | `tutorial/mb-*/index.html` |

---

## 🎨 Paleta Oficial de Colors per Robot

Cadascun dels 6 robots disposa d'una parella oficial de colors identificatius (primari i secundari) per a les targetes, punts d'accent (`.dot-1`, `.dot-2`) i fons subtil (`--robot-hero-bg`) utilitzat a les capçaleres `robot-hero`, blocs destacats i targetes de situacions d'aprenentatge:

- **Coding Express:** Primari: Roig / Rojo (`#e4242b`) · Secundari: Groc / Amarillo (`#fec002`) · Fons subtil: `#fef2f2`
- **Tale-Bot:** Primari: Taronja / Naranja (`#ea580c`) · Secundari: Lila (`#804cbd`) · Fons subtil: `#fff7ed`
- **Coding Set:** Primari: Verd / Verde (`#16a34a`) · Secundari: Taronja / Naranja (`#fc7813`) · Fons subtil: `#f0fdf4`
- **Codey Rocky:** Primari: Blau / Azul (`#0079dc`) · Secundari: Gris (`#64748b`) · Fons subtil: `#eff6ff`
- **Spike:** Primari: Groc / Amarillo (`#ca8a04`) · Secundari: Blau / Azul (`#0284c7`) · Fons subtil: `#fefce8`
- **Micro:bit:** Primari: Rosa (`#db2777`) · Secundari: Groc / Amarillo (`#facc15`) · Fons subtil: `#fdf2f8`

---

## 🎨 Guia d'Estil i Bones Pràctiques

- **Sense modales ni popups:** Prohibició total de `<dialog>`, popups i overlays. Tota la navegació es fa mitjançant pàgines completes amb botó de retorn accessible.
- **Tipografia:** **Sora** per a títols i encapçalaments; **Plus Jakarta Sans** per a textos de lectura, controls i botons.
- **Marca:** `Robòtica<sup>200</sup>` (Robòtica²⁰⁰) amb interlineat ajustat a CSS.
- **Estil visual de les imatges:** Lineless (sense línies de contorn), acabat mat (sense brillantors, ni degradats, ni ombrejats), fons bicolor pla i sense ombres al terra. Consulta [`STYLE_GUIDE.md`](STYLE_GUIDE.md) i [`AGENTS.md`](AGENTS.md) per a més detalls.

## Imatges WebP

La web utilitza còpies WebP dels PNG i JPEG d’`_assets/`, conservant els originals.
Per convertir nous recursos, instal·la Pillow i executa `python3 _scripts/convert-images-webp.py`.
El procés conserva dimensions i transparència, utilitza qualitat 88 i no sobreescriu WebP existents.
Els SVG, inclòs el logotip oficial, es mantenen en format vectorial.

## Compilació del web i PDF

- `node _scripts/build.js`: genera el web sense PDF; no necessita Typst ni Ghostscript.
- `node _scripts/build.js --pdf`: genera també els PDF individuals i el recull complet, amb la memòria cau incremental. Necessita Typst; Ghostscript optimitza els PDF si està instal·lat.
- `node _scripts/dev.js`: desenvolupament amb recàrrega automàtica, sempre sense PDF.

Cada compilació reconstrueix `dist/`. Sense `--pdf`, no s’hi conserven PDF anteriors ni es mostren enllaços de descàrrega. La publicació automàtica utilitza `--pdf`.
