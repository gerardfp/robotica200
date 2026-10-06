# Contingut editorial actiu

Les 99 fitxes actives de `_content/situacions/*.md` són la font editorial de les situacions d’aprenentatge. Els seus front matter contenen les metadades del catàleg i el cos és Markdown; el Web Component carrega, renderitza i mostra cada document al navegador. Encara hi ha fitxers Markdown antics que no són referenciats per cap ruta: només són històrics i no s’han de tractar com a fonts actives.

La publicació continua sent estàtica: no hi ha pas de build ni dependències npm. Cal servir el repositori per HTTP (per exemple, `python3 -m http.server`) perquè el navegador puga llegir el Markdown amb `fetch`. El mateix comportament funciona a GitHub Pages.

Les pàgines de situació no dupliquen el cos editorial en HTML ni tenen una shell individual. Una sola pàgina (`situacio/index.html?id=slug`) carrega el Markdown actiu a partir de l’identificador de la URL. El disseny és a `_templates/situation-page.html`; el JavaScript només gestiona la càrrega, les metadades i la interacció. Les metadades i el contingut viuen en un únic document Markdown. Les fitxes de robots i tutorials encara poden utilitzar els components HTML actuals.

Consulta [`situacions/TEMPLATE-SITUACIO.md`](situacions/TEMPLATE-SITUACIO.md) per a l’esquema, els passos de sessió, les imatges, els blocs de programació i els exemples amb ressaltat de sintaxi.
