# Contingut editorial actiu

El contingut de detall viu en Markdown amb front matter a `activitats/`, `tutorials/`, `robots/`, `guies/` i `situacions/`. Els documents són la font única del text; els Web Components carreguen el document triat des d’una ruta compartida i mostren les metadades, les imatges i els blocs de contingut.

El contingut editorial és Markdown; el build genera les pàgines HTML i els catàlegs estàtics dins de `dist/`. Les fitxes publicades tenen una URL per recurs i comparteixen les plantilles Web Components del lloc.

La publicació és estàtica: GitHub Actions construeix `dist/` en cada push i GitHub Pages el serveix. Per fer-ho localment, executa `node _scripts/build.js`; per veure el resultat, serveix `dist/` per HTTP, per exemple amb `python3 -m http.server --directory dist`. La generació de PDF requereix Python 3, Typst i Ghostscript.

Consulta les plantilles base per mantindre la mateixa estructura editorial i visual en totes les fitxes:
- Activitats de pensament computacional: [`activitats/TEMPLATE-ACTIVITAT.md`](activitats/TEMPLATE-ACTIVITAT.md) (`_content/activitats/activitat-[slug].md`).
- Tutorials de robòtica educativa: [`tutorials/TEMPLATE-TUTORIAL.md`](tutorials/TEMPLATE-TUTORIAL.md) (`_content/tutorials/tutorial-[prefix]-[slug].md`).
- Situacions d'aprenentatge: [`situacions/TEMPLATE-SITUACIO.md`](situacions/TEMPLATE-SITUACIO.md) (`_content/situacions/[slug].md`).

## Versions imprimibles

Els PDF individuals i el recull complet es generen des del mateix Markdown amb
Typst; no hi ha una segona versió dels continguts. Consulta
[`docs/IMPRIMIBLES.md`](../docs/IMPRIMIBLES.md) per als requisits i l’ús local.
