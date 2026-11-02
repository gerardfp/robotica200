# Estructura dels tutorials

Cada fitxa és un fitxer Markdown a `_content/tutorials/`. Està pensada perquè una mestra o un mestre puga preparar i provar l'activitat sense experiència prèvia. Cal usar frases curtes, explicar cada acció i evitar sigles sense explicació.

Les metadades inicials indiquen, en aquest ordre, `title`, `description`, `robot`, `level`, `duration`, `order` i `image`. Després venen sempre aquests apartats:

1. **Repte i objectius:** què farà el robot i dos o tres resultats observables.
2. **Materials i preparació:** llista del que cal i què s'ha de comprovar abans de començar.
3. **Funcions del robot treballades:** les funcions que s'utilitzen i els seus límits.
4. **Seqüència guiada:** passos numerats que agrupen accions curtes en fases de treball; inclou una imatge o un exemple de programa al punt on ajuda a fer-les.
5. **Prova, depura i reflexiona:** com comprovar el resultat, què revisar si falla i preguntes breus sobre la mateixa pràctica.
6. **Accessibilitat i seguretat:** alternatives de participació i cura del material, aplicades a la pràctica.
7. **Evidències d'aprenentatge:** allò que es pot guardar o observar, sense recollir dades personals innecessàries.
8. **Fonts oficials i límits:** enllaços del fabricant i diferències de versió o d'accessoris quan siguen rellevants.

## Regles per redactar cada fitxa

- Parleu directament al docent amb verbs d'acció i una instrucció cada vegada. Expliqueu el nom d'una peça o funció quan aparega per primera vegada.
- Manteniu el repte curt: què es prepara, què es prova i què s'observarà. No repetiu la mateixa explicació en objectius, seqüència i reflexió.
- En cada pas, indiqueu què cal fer, què hauria de passar i què revisar si no passa. Separeu les ampliacions opcionals de la pràctica principal.
- Agrupeu en un mateix pas les accions breus que formen una fase (per exemple, connectar i preparar el primer programa). Obriu un pas nou quan canvie el repte o calga parar per observar i prendre una decisió; eviteu pantalles que només contenen una instrucció curta.
- Feu que les preguntes, les evidències i la depuració comproven el mateix repte. Proposeu resultats observables, no expressions vagues com «entendre el robot».
- Poseu una imatge al costat del pas que ajuda a entendre. La llegenda ha d'explicar què s'hi veu i no donar per fet que la imatge és una instrucció de muntatge.
- No atribuïu al robot una funció que depén d'un accessori, d'una versió concreta o d'una aplicació externa. Digueu-ho abans de la prova.

## Blocs de programa

Els exemples van al pas en què s'han de construir i provar. Useu les etiquetes que reconeix el visor:

- `makecode`: codi JavaScript que es pot obrir en MakeCode i convertir a blocs. Manteniu la sintaxi pròpia de MakeCode.
- `spikeapp`: esquema curt dels blocs que cal buscar en SPIKE App, en l'ordre d'execució.
- `mblock`: esquema curt dels blocs que cal buscar en mBlock, en l'ordre d'execució.
- `python`: només per a un tutorial que ensenye Python; indiqueu sempre en quin editor i en quin mode s'executa.

Les tanques `spikeapp` i `mblock` són representacions textuals dels blocs, no codi executable ni captures literals. El text del pas explica què cal buscar a l'aplicació; els noms poden variar segons la versió. Manteniu una ordre per línia i conserveu els espais inseparables dins de les etiquetes, perquè el visor no les ajunte. No inventeu blocs digitals per als robots que es programen amb botons o peces físiques (per exemple, Coding Express, Coding Set i Tale-Bot): descriviu-hi la seqüència física amb fletxes o llistes.

Els exemples `mblock` i `spikeapp` són esquemes de les accions, no captures literals de l'aplicació. Dins de les etiquetes usen espais inseparables perquè el renderitzador actual no ajunte les paraules; cal conservar-los en editar-les. Els espais dins dels valors entre claudàtors o parèntesis es mantenen normals.

Els exemples de brúixola, llum, pins, ràdio i so s'han contrastat visualment amb el renderitzador oficial de MakeCode. Per generar-ne les imatges en una compilació nova cal que el procés puga iniciar Chrome i accedir a MakeCode; si no pot, el renderitzador de reserva pot mostrar peces incorrectes. Cal revisar la pàgina generada quan no hi haja connexió o no estiga disponible Chrome. El dau de primeres passes ja disposa d'imatge oficial en memòria cau.

El tutorial de registre de dades identifica els dos exemples de MakeCode amb la tanca `makecode`. El que usa l'extensió `datalogger` pot no convertir-se en una imatge de blocs perquè el renderitzador no sempre carrega l'extensió; les instruccions en text continuen indicant com muntar-lo a l'editor. No presenteu una representació de reserva com si fora una captura verificada.

La prova i les preguntes han de correspondre al programa o a la seqüència realment explicats. Una simulació s'identifica com a simulació i no es presenta com una prova del maquinari.
