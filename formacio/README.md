# Formació presencial · Robòtica per a docents

Sis presentacions Marp per a docents de primària sense experiència. Es poden conduir amb les transparències: inclouen explicacions, consignes, exemples resolts, comprovacions i tancaments. No cal disposar de robots ni consultar altres documents durant la sessió.

## Itineraris

| Sessió | Format de 3 sessions · 6 hores | Format de 4 sessions · 8 hores |
|---|---|---|
| 1 | `01-descobrir-i-triar` | `01-descobrir-i-triar` |
| 2 | `02-format3-programar` | `02-format4-rutes` |
| 3 | `03-format3-aula` | `03-format4-sensors` |
| 4 | — | `04-format4-proposta` |

Les dues sessions finals de disseny comparteixen continguts: canvien la identificació i el lloc dins de l’itinerari. La versió de tres sessions concentra rutes i sensors en una mateixa sessió; la versió de quatre dona més temps a la programació tangible i a les demostracions.

Cada sessió té blocs consecutius que sumen 120 minuts, inclosa una pausa de cinc minuts. Les temporalitzacions es consulten en les notes del presentador, no en la projecció. El temps de cada bloc inclou explicar, pensar, provar i compartir; no són minuts d’exposició per diapositiva. Les activitats amb robot substitueixen la simulació en paper. Els temps són una planificació docent, pendent d’ajustar després d’impartir la primera edició.

## Obrir les presentacions

Obriu `html/index.html`, trieu l’itinerari i inicieu la primera sessió. Les fletxes permeten navegar. Els controls de Marp ofereixen pantalla completa, vista general i vista del presentador. Premeu **P** per obrir la vista del presentador: mostra les notes i el control de la sessió. Manteniu aquesta finestra al portàtil i projecteu la finestra principal amb les diapositives. El bloqueig per contrasenya també funciona amb aquesta vista en `/presencial/`.

Les fonts Sora i Plus Jakarta Sans estan incorporades a l’HTML i als PDF. Les imatges són locals: per compartir HTML, conserveu la carpeta `formacio/` al costat de `_assets/`, com en aquest repositori. Per enviar un únic fitxer, utilitzeu els PDF de `export/`.

## Preparació presencial

- Assegureu la projecció i obriu la presentació abans de començar. Les activitats es poden respondre oralment; paper i retoladors faciliten el treball en parelles.
- Si hi ha robots, assageu abans les proves i reviseu alimentació, connexions, espai i aturada. No pressuposeu que tots els centres disposen de totes les unitats.
- Mostreu primer la pregunta i deixeu temps per anticipar. Avanceu després a la solució.
- Les graelles i els diagrames són models didàctics. La distància d’una casella s’ajusta al material real.
- Les dades de llum de les taules són simulades i estan identificades com a tals. Les lectures reals s’han d’observar abans de triar el llindar.
- La fitxa de `materials/` és opcional: la plantilla també està projectada.

## Editar i generar

La font de cada presentació és `presentacions/*.md`. Els programes s’escriuen amb els mateixos blocs tancats de Markdown del web: `makecode`, `spikeapp`, `mblock`, `talebot` i `coding-set`; no es mantenen dibuixos ni versions alternatives del codi. El tema compartit està en `tema.css`; la seqüència i els temps de les sessions es documenten en `sessions.json`. Si afegiu diapositives, actualitzeu-ne el recompte i reviseu el temps del bloc.

Des de l’arrel del repositori:

```sh
npm --prefix formacio ci
node _scripts/build-training.js
node _scripts/build-training.js --pdf
```

Marp CLI està fixat al fitxer de dependències. La generació HTML no necessita xarxa després d’instal·lar. L’exportació PDF necessita Chrome o Chromium; configureu `CHROME_PATH` si no és a la ruta habitual. Aquest procés no regenera el web ni el recull de 180 documents.

El generador incorpora les fonts i el logotip al tema, processa els programes amb `_scripts/lib/markdown.js` (el mateix pipeline semàntic del web), genera els diagrames explicatius amb `_scripts/lib/training-diagrams.js` i exporta amb Marp oficial. Els diagrames són representacions educatives, no captures de la interfície ni programes que es puguen executar directament.

## Revisió abans de publicar

```sh
node _scripts/tests/check-training.cjs
```

El verificador renderitza totes les diapositives a 1280 × 720, comprova recompte, fonts, imatges, límits de composició i les etiquetes internes dels diagrames SVG. Desa captures i informe en `.revisio/` (ignorat per Git). Reviseu també el contingut i les captures; una comprovació geomètrica no valida per si sola una proposta didàctica.

Les fonts es distribueixen amb les seues llicències OFL en `fonts/`. Les il·lustracions són recursos propis reutilitzats del web. El referent institucional és [Escola 4.0 de la GVA](https://portal.edu.gva.es/escola40/va/inici/). Les transparències de recursos enllacen els tutorials del projecte que serveixen de base a les demostracions.

### Blocs de programació

- `mblock` i `spikeapp`: els mateixos dialectes i el renderitzador ScratchBlocks integrat al web.
- `talebot` i `coding-set`: botons, peces i bucles amb el renderitzador tangible del web.
- `makecode`: programa TypeScript renderitzat amb MakeCode oficial i guardat en `_cache/makecode/`.
- Les imatges dels programes són eixides generades en `diagrames/programa-*.svg`; la font editable continua sent el bloc Markdown.

La memòria cau del programa actual ja està inclosa. Quan afegiu o canvieu un programa MakeCode, executeu una vegada amb connexió:

```sh
node _scripts/build-training.js --warm-makecode
```

Després, les generacions ordinàries tornen a funcionar sense connexió. Si falta un programa a la memòria cau, el generador ho indica en lloc de substituir silenciosament els blocs oficials. El verificador comprova que els SVG dels programes coincidisquen exactament amb el resultat del pipeline del web.

## Accés separat en el web

La publicació de les sessions es fa en `/presencial/`, sense enllaçar-la des de la portada. Els HTML i PDF d’aquesta ruta es xifren amb la contrasenya configurada. Consulteu [`docs/PRESENCIAL.md`](../docs/PRESENCIAL.md) per a la clau local, el secret de GitHub Actions, les proves i els límits d’accés en un repositori públic.

### Notes natives del presentador

S’escriuen sota la diapositiva amb comentaris HTML normals de Marp, separats de les directives de disseny:

```markdown
## Escriviu una ruta

Acordeu les ordres i comproveu la destinació.

<!--
Bloc «Començarem amb un repte»: 00–15 min de sessió.
Temps orientatiu de la dinàmica: 3 minuts.
Deixeu que les parelles anticipen el final abans de mostrar la solució.
-->
```

La vista del presentador les mostra en HTML. El PDF ordinari conté les transparències, sense aquestes notes. Els temps que formen part d’un exemple didàctic (com esperar un segon en un programa) es conserven a la diapositiva.
