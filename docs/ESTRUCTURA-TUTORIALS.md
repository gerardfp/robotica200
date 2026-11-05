# Estructura dels tutorials

Els tutorials són manuals breus de maneig dels robots. Expliquen com connectar, programar i comprovar una funció, sense organització d’aula, treball en grup ni avaluació de l’alumnat.

Les metadades indiquen, en aquest ordre, `title`, `description`, `robot`, `level`, `duration`, `order` i `image`. Després venen aquests apartats:

1. **Què aprendrem?:** resum breu de les operacions que es podran fer.
2. **Materials i preparació:** components, connexions i comprovacions prèvies.
3. **Funcions i controls:** botons, sensors, entrades i eixides utilitzats.
4. **Pas a pas:** instruccions numerades, amb els programes al costat de l’operació corresponent.
5. **Comprovació i resolució de problemes:** resposta esperada i què revisar si falla.
6. **Ús i seguretat:** manipulació, alimentació i precaucions pròpies de la funció.
7. **Fonts i límits:** documentació del fabricant, versions i accessoris necessaris.

## Criteris de redacció

- Adreceu les instruccions directament a qui utilitza el robot, amb verbs d’acció i frases curtes.
- Indiqueu què cal fer, què hauria de passar i què revisar si no passa.
- Manteniu els exemples petits i reproduïbles; separeu les funcions opcionals.
- No inclogueu rols, equips, dinàmiques de classe, preguntes d’avaluació ni evidències d’aprenentatge.
- No exigiu fulls de registre ni informes per comprovar una operació. Les dades guardades pel mateix dispositiu sí que formen part dels tutorials de registre de dades.
- Les portades són decoració de la introducció, amb text alternatiu buit; no representen muntatges ni programes.
- Els passos no tenen contenidors de fase ni el títol automàtic «Desenvolupament del pas».
- Manteniu les dependències i els límits reals de cada model, accessori i aplicació.

## Blocs de programa

Els exemples van al pas en què s'han de construir i provar. Useu les etiquetes que reconeix el visor:

- `makecode`: codi JavaScript que es pot obrir en MakeCode i convertir a blocs. Manteniu la sintaxi pròpia de MakeCode.
- `spikeapp`: esquema curt dels blocs que cal buscar en SPIKE App, en l'ordre d'execució.
- `mblock`: esquema curt dels blocs que cal buscar en mBlock, en l'ordre d'execució.
- `python`: només per a un tutorial que ensenye Python; indiqueu sempre en quin editor i en quin mode s'executa.

Les tanques `spikeapp` i `mblock` són representacions textuals dels blocs, no codi executable ni captures literals. El text del pas explica què cal buscar a l'aplicació; els noms poden variar segons la versió. Manteniu una ordre per línia i conserveu els espais inseparables dins de les etiquetes, perquè el visor no les ajunte. Per a Tale-Bot i Coding Set, useu les tanques de seqüències físiques descrites a continuació. Per a Coding Express, manteniu les fletxes o llistes.

Els exemples `mblock` i `spikeapp` són esquemes de les accions, no captures literals de l'aplicació. Dins de les etiquetes usen espais inseparables perquè el renderitzador actual no ajunte les paraules; cal conservar-los en editar-les. Els espais dins dels valors entre claudàtors o parèntesis es mantenen normals.

Els exemples de brúixola, llum, pins, ràdio i so s'han contrastat visualment amb el renderitzador oficial de MakeCode. Per generar-ne les imatges en una compilació nova cal que el procés puga iniciar Chrome i accedir a MakeCode; si no pot, el renderitzador de reserva pot mostrar peces incorrectes. Cal revisar la pàgina generada quan no hi haja connexió o no estiga disponible Chrome. El dau de primeres passes ja disposa d'imatge oficial en memòria cau.

El tutorial de registre de dades identifica els dos exemples de MakeCode amb la tanca `makecode`. El que usa l'extensió `datalogger` pot no convertir-se en una imatge de blocs perquè el renderitzador no sempre carrega l'extensió; les instruccions en text continuen indicant com muntar-lo a l'editor. No presenteu una representació de reserva com si fora una captura verificada.

La prova i les preguntes han de correspondre al programa o a la seqüència realment explicats. Una simulació s'identifica com a simulació i no es presenta com una prova del maquinari.


## Seqüències físiques de Tale-Bot i Coding Set

Les tanques `talebot` (també `tale-bot`) i `coding-set` (també `codingset`) generen SVG estàtics dels botons o les peces. Són esquemes de la seqüència física. Els colors i símbols es basen en les referències visuals aportades al projecte; no són captures ni executen el programa.

```talebot
avançar -> avançar -> girar dreta
```

```coding-set
repeteix 3
avançar -> girar dreta
fi
```

S'admet una ordre per línia o separadors `->` i `→`. Moviments: `avançar`, `enrere`, `girar dreta` i `girar esquerra`. També s'admeten `avanzar`, `retroceder`, `girar derecha` i `girar izquierda`. Cal indicar sempre el sentit del gir.

Tale-Bot: endavant roig, enrere verd, gir dret groc i gir esquerre blau. Opcionalment, `executa` representa el botó taronja i `esborra` el botó blanc amb una creu roja. No s'afegeixen automàticament.

Coding Set: peces de moviment verdes i bucles verd fosc. `repeteix 2` a `repeteix 5` obri un bucle i `fi` el tanca; el nombre blau apareix davall de la peça inicial. Un nombre de `2` a `5` després d'un moviment recte (`avançar -> 3`) s'enganxa davall d'aquesta peça, sense convertir-lo en tres peces independents.

Una instrucció desconeguda o un bucle sense tancar mostra un avís i conserva el text original, perquè no es perda cap ordre. També s'admeten `gravació` (pulsació curta per reproduir l'àudio enregistrat) i `dansa` en Tale-Bot; i `defineix funció`, `crida funció`, `aleatori`, `música` i `dansa` en Coding Set. Les files de definició i de crida de funció es representen amb tanques separades i etiquetades, per conservar la disposició física del tauler.


Les imatges de portada dels tutorials són decoratives i inspiradores: poseu-les una sola vegada dins de `Què aprendrem?`, amb text alternatiu buit (`![](../../_assets/tutorials/nom.webp)`). No les intercaleu en els passos ni les descriviu com a representacions del programa o del muntatge. Manteniu el camp `image` de les metadades per a les targetes del catàleg. Els passos mostren el programa amb els blocs visuals corresponents.
