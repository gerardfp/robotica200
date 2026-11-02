# Contingut editorial actiu

El contingut de detall viu en Markdown amb front matter a `activitats/`, `tutorials/`, `robots/`, `guies/` i `situacions/`. Els documents són la font única del text; els Web Components carreguen el document triat des d’una ruta compartida i mostren les metadades, les imatges i els blocs de contingut.

Les pàgines compartides són `activitat/index.html?id=slug`, `tutorial/index.html?id=slug`, `robot/index.html?id=slug`, `guia/index.html?id=slug` i `situacio/index.html?id=slug`. No es creen fitxers HTML individuals per a cada document. El catàleg es regenera amb `python3 _scripts/sync-catalog.py`.

La publicació continua sent estàtica: no hi ha pas de build ni dependències npm. Cal servir el repositori per HTTP (per exemple, `python3 -m http.server`) perquè el navegador puga llegir el Markdown amb `fetch`. El mateix comportament funciona a GitHub Pages.

Consulta les plantilles base per mantindre la mateixa estructura editorial i visual en totes les fitxes:
- Activitats de pensament computacional: [`activitats/TEMPLATE-ACTIVITAT.md`](activitats/TEMPLATE-ACTIVITAT.md) (`_content/activitats/activitat-[slug].md`).
- Tutorials de robòtica educativa: [`tutorials/TEMPLATE-TUTORIAL.md`](tutorials/TEMPLATE-TUTORIAL.md) (`_content/tutorials/tutorial-[prefix]-[slug].md`).
- Situacions d'aprenentatge: [`situacions/TEMPLATE-SITUACIO.md`](situacions/TEMPLATE-SITUACIO.md) (`_content/situacions/[slug].md`).
