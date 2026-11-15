# Revisió editorial i visual · Formació presencial

Revisió de publicació: 15 de novembre de 2026.

## Materials revisats

| Presentació | Transparències | Durada planificada |
|---|---:|---:|
| Descobrir i triar | 59 | 120 min |
| Programar · format de tres sessions | 52 | 120 min |
| Rutes · format de quatre sessions | 51 | 120 min |
| Aula · format de tres sessions | 38 | 120 min |
| Sensors · format de quatre sessions | 41 | 120 min |
| Proposta · format de quatre sessions | 38 | 120 min |

Total: 279 transparències. Les dues versions de la sessió final comparteixen contingut i diferencien la posició dins de cada itinerari.

## Contingut

- Les consignes, dades, programes, solucions i plantilles necessàries estan dins de les transparències. No s’han de consultar notes ocultes per conduir les activitats.
- Els exemples de rutes expliciten inici, orientació i significat del gir. Les respostes s’han comprovat ordre a ordre.
- Els exemples de llum identifiquen les dades simulades, la lectura relativa, el valor límit i la necessitat de calibrar amb material real.
- Les funcions dels sis dispositius es diferencien i es limiten a prestacions descrites en el contingut del web.
- La sessió inicial presenta possibilitats i criteris de tria; les sessions següents desenvolupen exemples i transferència a l’aula.
- Cada itinerari es pot seguir amb projector. Les respostes poden ser orals; paper i retoladors faciliten el treball en parelles. La dotació física permet substituir les simulacions per proves.
- Cada sessió té blocs consecutius que sumen dues hores, amb pausa inclosa. El temps inclou treball dels participants i conversa; no pressuposa explicació contínua.

### Fonts dins del repositori

- `_content/tutorials/tutorial-cr-primeres-passes.md`: Codey, connexió i botons.
- `_content/tutorials/tutorial-mb-fanalet-llum.md`: lectura de llum, condicions i calibratge.
- `_content/tutorials/tutorial-sp-motors-sensors.md`: ports, sensor de color i motor sense accessoris.
- `_content/tutorials/tutorial-ce-primeres-passes.md`: via, impuls i aturada del tren.
- `_content/tutorials/tutorial-cs-primeres-passes.md`: torre, tauler i ordre de lectura.
- `_content/robots/robot-tale-bot.md` i la resta de fitxes de robots: funcions i límits.
- `_content/situacions/tb-mapa-sonor.md` i `tb-biblioteca-barri.md`: contextos didàctics adaptats.

Els programes visuals són representacions simplificades amb el renderitzador de blocs del web. Els noms concrets s’han d’identificar en la versió d’idioma de cada app. La formació no exigeix copiar text com a codi executable.

## Identitat visual i composició

- Tema clar exclusiu; fons blanc i blau suau, text fosc i blau corporatiu.
- Sora en títols i Plus Jakarta Sans en text i interfície, incorporades a HTML i PDF.
- Logotip oficial del repositori i peus de sessió consistents.
- Un únic tema Marp, amb variants per a portada, inici de bloc, activitat, solució, graella i programa visual.
- Imatges pròpies reutilitzades, sense substituir robots per models ficticis. Les il·lustracions contextuals es presenten com a tals.
- Revisió visual de totes les transparències mitjançant captures, amb inspecció ampliada de taules, programes, diapositives amb imatges i recursos.
- Comprovació de mostres rasteritzades del PDF. Es va corregir un retall de logotip i peu en les imatges laterals passant-les a elements de la diapositiva en lloc de fons dividits.

## Verificació tècnica

`node _scripts/tests/check-training.cjs` renderitza les 279 transparències amb Chrome a 1280 × 720. La passada final no detecta desbordaments verticals o horitzontals, fonts absents ni imatges trencades. Els recomptes coincideixen amb `sessions.json`.

Els sis PDF s’han generat amb Marp CLI 4.5.1. El nombre de pàgines de cada PDF coincideix amb el seu Markdown. Les fonts corporatives estan incorporades. Les imatges i els enllaços interns al catàleg de recursos es corresponen amb fitxers existents del web generat.

Les captures i l’informe tècnic es guarden en `.revisio/`; els PDF en `export/`. Són eixides locals regenerables. Les fonts Markdown i el tema són els originals que cal mantindre.

## Límit de la revisió

S’han revisat els continguts, la composició i les exportacions. La planificació de temps no substitueix un assaig presencial amb participants. Després de la primera edició, convé ajustar el ritme a partir dels dubtes i del temps real de treball del grup.

## Ampliació visual i aclariments

S’han incorporat 18 diagrames explicatius regenerables des de `_scripts/lib/training-diagrams.js`, a més dels programes visuals. Mostren posicions, orientació, repeticions, decisions amb dues branques, seqüències temporals, flux d’informació, ports, torns i relació entre repte i evidència.

La revisió comprova també les etiquetes internes dels SVG: una diapositiva pot tindre la imatge ben situada i, tanmateix, amagar text retallat dins del gràfic. Els diagrames de rutes s’han contrastat amb les ordres i les coordenades; les solucions apareixen després de les activitats.

Les noves il·lustracions acompanyen la preparació, la repetició amb Coding Set, les proves del tren, la investigació al pati, els suports i la revisió d’evidències. Les comparacions visuals aclareixen En viu/Càrrega, lectura inicial/revisió contínua i producte/evidència. Quan una imatge mostra un nombre de repeticions diferent del model anterior, s’explicita al text.

## Fidelitat dels blocs de programació

Els programes de les transparències s’escriuen en Markdown amb `mblock`, `spikeapp`, `makecode`, `talebot` i `coding-set`. La generació usa directament el pipeline de `_scripts/lib/markdown.js`, inclosos els dialectes de ScratchBlocks i la memòria cau oficial de MakeCode. S’han retirat els tres SVG de programa que es generaven a partir de definicions pròpies en JavaScript.

La prova de regressió compara tots els SVG de programa generats amb el resultat del mateix pipeline del web. El programa MakeCode usa una lectura menor que 80, la icona de diamant i neteja de pantalla a l’altra branca, coherent amb les explicacions i dades de les transparències.

Les seqüències de botons Tale-Bot, les peces de Coding Set i el seu bucle es generen amb `_scripts/lib/tangible-blocks.js` a través del mateix pipeline Markdown del web. La presentació explicita que la seqüència de botons no representa la disposició física del panell.
