# Zona de formació presencial

La formació es publica en una ruta independent: `/presencial/` (en GitHub Pages, `/robotica200/presencial/`). La portada, la capçalera i el peu del web no hi afegeixen cap enllaç.

## Accés amb contrasenya

Els HTML i els PDF es xifren abans de copiar-los a `dist/presencial/`. El navegador demana la contrasenya i desxifra el document que es vol obrir. No es publiquen còpies dels PDF ni de les presentacions en clar dins d’aquesta ruta. Els diagrames privats s’incorporen dins dels HTML xifrats; les il·lustracions ja públiques del web es reutilitzen des d’`_assets/`.

La protecció usa AES-256-GCM amb una clau derivada amb PBKDF2-SHA-256 (600.000 iteracions), sal aleatòria per publicació i nonce aleatori per document. La identitat, el format i el nom del document també s’autentiquen. Una contrasenya incorrecta o una alteració del fitxer impedeixen el desxifrat.

La clau derivada es conserva en `sessionStorage`, només durant la pestanya, per navegar sense tornar a escriure la contrasenya. «Tancar sessió» la retira i torna a la pantalla d’accés. L’aplicació no desa la contrasenya en l’emmagatzematge del navegador ni en els fitxers publicats. La publicació incorpora `noindex`, però la restricció d’accés prové del xifrat, no d’aquesta etiqueta.

**Límit important:** el repositori actual és públic. Aquesta protecció impedeix consultar les còpies publicades en `/presencial/` sense la contrasenya, però els Markdown i els originals mantinguts en un repositori públic continuen sent consultables. Per mantindre confidencials els originals cal un repositori privat o separar-los del repositori públic. Qui rep la contrasenya pot descarregar i compartir els materials; no és un sistema de permisos individuals.

## Contrasenya local

El generador llig, per aquest ordre:

1. La variable d’entorn `PRESENCIAL_PASSWORD`.
2. El fitxer local `formacio/.presencial-password`, exclòs de Git.

La clau inicial s’ha generat aleatòriament i el fitxer té permisos de lectura i escriptura només per al propietari. No s’ha d’afegir a Git, a captures ni a fitxers de documentació. La clau ha de tindre almenys 12 caràcters; convé mantindre la clau aleatòria o usar una frase llarga.

```sh
npm --prefix formacio ci
node _scripts/build-presencial.js
```

Aquesta ordre actualitza només la ruta presencial dins de `dist/`, sense regenerar ni eliminar els PDF del web general. Serviu `dist/` amb un servidor HTTP local; obrir l’HTML directament amb `file://` no permet carregar els fitxers xifrats.

La compilació general (`node _scripts/build.js` o `node _scripts/build.js --pdf`) també incorpora la ruta quan hi ha contrasenya. Si no n’hi ha, només genera una pantalla de materials no disponibles: no publica el contingut en clar ni afegeix una contrasenya predeterminada.

## Publicació en fer push

GitHub Actions llig la contrasenya des del secret del repositori **`PRESENCIAL_PASSWORD`**. No s’escriu al workflow. Amb el secret configurat, s’instal·la Marp, es preparen els materials i només es puja l’arbre xifrat de `dist/`.

Els PDF de formació s’aprofiten quan les fonts no han canviat. En local es reutilitza `formacio/export/`; la memòria cau compartida de GitHub Actions conté només PDF xifrats, en `.cache/presencial-encrypted-pdfs/`. Si la clau o la memòria cau no permeten reutilitzar-los, es tornen a generar. Els PDF generals del web mantenen el seu sistema incremental independent.

Per canviar la clau, actualitzeu el secret de GitHub i el fitxer local per separat, i torneu a publicar. No cal tocar els Markdown ni les presentacions. Els fitxers xifrats antics que algú ja haja descarregat continuen depenent de la contrasenya antiga.

## Comprovacions

```sh
node _scripts/tests/check-presencial.cjs
python3 _scripts/tests/check-static-site.py
```

La prova del navegador comprova clau incorrecta, accés correcte, navegació sota `/robotica200/`, sessió, tancament, accés directe a PDF, descàrrega amb els bytes originals i disseny mòbil. També comprova alteracions del xifrat i de les metadades, absència de còpies de presentacions i PDF en clar i absència d’enllaç des de la portada.

La pantalla d’accés i el seu JavaScript són en `_templates/presencial/`; el publicador és `_scripts/lib/presencial.js`. Les fonts de la formació continuen en `formacio/`.

Referències tècniques: [GitHub Pages és un allotjament estàtic](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [derivació de claus Web Crypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey) i [xifrat AES-GCM](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt).
