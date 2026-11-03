# Materials imprimibles

Els continguts de `_content/` continuen sent l’única font editorial. El script
`_scripts/md_to_typst.py` els converteix a Typst i genera un PDF per document,
el fitxer Typst corresponent i un recull global amb salts de pàgina entre
recursos. S’inclouen activitats, tutorials, situacions d’aprenentatge, guies i
fitxes dels robots.

El build guarda una memòria cau local a `.cache/print-pdfs/`; en GitHub Actions
es recupera i desa amb `actions/cache`. Cada fitxer té una empremta del Markdown,
les imatges que utilitza i les versions de Typst/Ghostscript. Per tant, un push
que canvie un tutorial només recompila el PDF d’eixe tutorial i el recull global;
la resta de PDF es reutilitzen. Els canvis de plantilla del convertidor invaliden
les empremtes i regeneren els documents.

## Ús local

Cal Python 3, [Typst](https://typst.app/) i Ghostscript. Des de l’arrel del repositori:

```sh
node _scripts/build.js
```

Els PDF s’optimitzen per a impressió (180 dpi per a imatges); el resultat apareix en `dist/imprimir/`; `dist/imprimir/index.html` conté els
enllaços als PDFs individuals i al recull complet. El mateix build genera els
enllaços de descàrrega en cada fitxa web. La publicació de GitHub Pages genera
els PDF automàticament mitjançant el workflow del repositori.

Per generar únicament els fitxers `.typ` sense instal·lar Typst:

```sh
python3 _scripts/md_to_typst.py --output dist --no-pdf
```

## Markdown admés

El convertidor conserva títols, paràgrafs, negreta, cursiva, codi en línia,
enllaços, imatges locals amb peu, llistes ordenades i no ordenades, cites,
taules i blocs de codi. També accepta els blocs de la web `makecode`, `spikeapp`
i `mblock`; es mostren com a codi imprés. Els enllaços remeten a les fonts
digitals i les imatges es resolen des del Markdown original.

En afegir sintaxi Markdown nova als continguts, cal ampliar el convertidor i
comprovar el PDF resultant. No s’han de mantindre còpies editorials en `.typ`.
