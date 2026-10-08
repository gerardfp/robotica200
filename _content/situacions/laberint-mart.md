---
active: true
title: "Missió de robòtica cooperativa"
description: "Dissenyem i provem robots cooperatius per a resoldre missions de mobilitat i cura de l'entorn de l'Albufera."
robot: "spike"
robot_label: "SPIKE Prime"
cycle: "tercer-cicle"
cycle_label: "Tercer cicle"
subject: "tecnologia"
subject_label: "Tecnologia, Matemàtiques i Ciències"
theme: "entorn"
theme_label: "L’Albufera i la cura de l’entorn"
duration: "12–15 sessions"
challenge: "Com podem dissenyar un robot fiable que complete missions de cura de l’entorn i explique amb proves les decisions de l’equip?"
---

![Robot LEGO SPIKE Prime en un camp de proves amb una ruta marcada i objectes lleugers per a una missió de l'entorn.](../../_assets/imatges/sa-sp-missio-albufera.webp)

_El camp, les peces de missió i la puntuació són originals. La proposta treballa amb una maqueta escolar inspirada en la cura de l’Albufera._

## 🌱 Situació i intenció

La unitat oficial *Competition Ready* de LEGO Education introdueix la conducció autònoma, l’ús de sensors, la construcció en equip, els blocs reutilitzables i la resolució iterativa de missions. Aquesta adaptació conserva eixa progressió en un projecte de centre: una maqueta de l’Albufera on el robot transporta mostres fictícies, retira residus de maqueta i activa punts d’observació. No s’intervé en l’aiguamoll ni s’hi proven robots.

La seqüència oficial inclou en 2026–27 una missió guiada vinculada a FIRST LEGO League. La sessió 4 conserva l’estructura didàctica de preparar una ruta, alinear el robot, activar un model i valorar fiabilitat i estratègia, però usa un repte, un camp i models propis. No reprodueix ni representa la missió, el tapet o els materials oficials de la temporada.

## 🎯 Aprenentatges i vocabulari

- Construir i calibrar una base mòbil, i registrar com canvien la ruta i la precisió quan s’ajusta una variable.
- Integrar moviment, sensors de línia i mecanismes per resoldre missions de camp amb rols cooperatius.
- Comparar intents, localitzar una fallada i justificar la revisió amb dades de proves repetides.
- Comunicar què ha resolt el robot, quina decisió ha pres l’equip i quins límits conserva la maqueta ambiental.

## 📅 Seqüència didàctica · 12–15 sessions

### **S1 · Base i conducció precisa · [Training Camp 1: Driving Around](https://education.lego.com/en-us/lessons/prime-competition-ready/training-camp-1-driving-around/) (30–45 min).**

#### Fase 1 · Activem i prediem

**Pregunta:** com fem una base simple que avance, gire i es detinga de manera controlada? Predigueu què haurà de canviar per dibuixar un quadrat amb quatre girs.

#### Fase 2 · Explorem i construïm

En parelles, munteu una base de dos motors sense sensors i proveu els programes de mostra. Varieu distància, gir o velocitat d’una cosa cada vegada.

#### Fase 3 · Expliquem i registrem

Escriviu pseudocodi per al quadrat, mesureu la circumferència de la roda (π × diàmetre) i relacioneu-la amb la distància avançada. Registreu el recorregut en segons, graus i rotacions; el giroscopi és una ampliació opcional.

#### Fase 4 · Apliquem i millorem

Afegiu un recorregut entre obstacles grans. Feu tres passades amb paràmetres iguals i després canvieu un control; com a ampliació, recorreu dos metres i compareu també el sensor disponible.

#### Fase 5 · Comprovem i reflexionem

**Evidència:** diagrama, programa de moviment i taula d’error. Expliqueu quan convé cada control; el giroscopi i la base avançada no són requisits d’aquesta sessió.

### **S2 · Acostar-se, agafar i tornar · [Training Camp 2: Playing with Objects](https://education.lego.com/en-us/lessons/prime-competition-ready/training-camp-2-playing-with-objects/) (30–45 min).**

#### Fase 1 · Activem i prediem

**Pregunta:** com decideix el robot quan està prou prop d’un objecte? Predigueu quina lectura podria activar l’aturada i com sabreu que el cub ha sigut arreplegat.

#### Fase 2 · Explorem i construïm

Afegiu sensor de distància, braç lleuger, marcador i cub tou a la base. Compareu dos programes per parar davant del marcador; després programeu el braç perquè baixe, arreplegue el cub a almenys 30 cm i el retorne.

#### Fase 3 · Expliquem i registrem

Ajusteu l’alçada del braç perquè passe per damunt del cub sense interferir amb el sensor. Registreu tres intents i observeu com canvia la lectura en modificar el llindar.

#### Fase 4 · Apliquem i millorem

Feu un relleu: el robot porta un testimoni, una persona el retira i la base continua. Prioritzeu detecció fiable per damunt del temps; proveu comparacions > / < amb distància, llum reflectida o giroscopi només si estan disponibles.

#### Fase 5 · Comprovem i reflexionem

**Evidència:** esquema sensor–condició–motor i ajust justificat. Com a extensió, inventeu regles per al relleu, il·lustreu-les i convideu una altra parella.

### **S3 · Detectar i seguir línies del camp · [Training Camp 3: Reacting to Lines](https://education.lego.com/en-us/lessons/prime-competition-ready/training-camp-3-react-to-lines/) (30–45 min).**

#### Fase 1 · Activem i prediem

**Pregunta:** com pot el sensor fer autònoma una part del recorregut? Predigueu què passarà quan la base trobe una línia negra perpendicular.

#### Fase 2 · Explorem i construïm

Munteu el sensor de color i proveu una línia negra ampla sobre superfície clara. Programeu la base perquè avance i pare en detectar-la; després proveu una segona pila i descriviu la diferència.

#### Fase 3 · Expliquem i registrem

Observeu lectures en mode de color i d’intensitat reflectida sobre blanc i negre. Anoteu què llig el sensor i no confongueu el nom de color amb el valor reflectit.

#### Fase 4 · Apliquem i millorem

Per al seguiment continu, alterneu detecció de fosc i clar amb moviments ràpids. Proveu línies primes, angles rectes, cruïlles T, interrupcions i línies de color; canvieu llindar o velocitat d’un en un.

#### Fase 5 · Comprovem i reflexionem

**Evidència:** lectures, ruta anotada i explicació de la millora. L’extensió de S4 és comparar els modes de sensor; el color i la llum reflectida són lectures diferents.

### **S4 · Missió guiada: elevar el pont de mostreig · [The Guided Mission 2026–27](https://education.lego.com/en-us/lessons/prime-competition-ready/spike-prime-guided-mission-2627/) (90 min; versió breu 45 min).**

#### Fase 1 · Activem i prediem (10 min)

**Pregunta:** com equilibrem velocitat i precisió per a seguir una línia, accionar un mecanisme i acabar en una zona concreta? En un camp propi de la marjal, la base ix de l’àrea esquerra, passa al costat de dues estacions de cartó inactives, arriba al pont de mostreig i acaba a la zona dreta. Abans de construir, dibuixeu el recorregut, assenyaleu on caldrà alinear la base i definiu què vol dir «missió completada»: el pont articulat s’alça, la ruta no desplaça cap estació i el robot s’atura dins de la zona final.

#### Fase 2 · Explorem i construïm (25 min)

Munteu la base de conducció amb el sensor de color SPIKE Prime i reviseu-ne l’orientació i l’alçada respecte del camp. Feu una línia negra ampla sobre una pista clara i un model original amb una palanca de cartó articulada: una peça lleugera a la part frontal empeny la palanca perquè eleve el pont; no useu el model ni el tapet LEGO de la temporada. Proveu la palanca a mà i després amb el robot a potència baixa. Afegiu una zona d’eixida a cada costat i marqueu dos punts d’alineament propers al mecanisme. El pont ha de ser lleuger, estable i sense vores tallants.

![Robot SPIKE Prime de la dotació segueix una línia fins a una palanca de cartó que eleva un pont de mostreig entre dues zones de prova.](../../_assets/imatges/sa-sp-missio-pont.webp)

_Il·lustració generada amb IA del prototip local; el muntatge és conceptual i no reprodueix cap model oficial de FIRST LEGO League._

#### Fase 3 · Expliquem i registrem (15 min)

Calibreu el sensor sobre la línia i el fons en el mode triat —color o intensitat de llum reflectida— i anoteu lectures repetides. Escriviu un programa propi: iniciar en la zona esquerra; seguir la línia amb girs curts a baixa potència; arribar al punt de contacte; empényer la palanca fins que el pont s’alce; continuar cap a la zona dreta i parar. Registreu la posició de partida, el llindar o color seleccionat, la velocitat, l’estat del pont i el lloc d’aturada. Si el sensor no discrimina amb estabilitat, useu una línia més ampla i torneu a mesurar abans de canviar el programa.

#### Fase 4 · Apliquem i millorem (30 min)

Feu quatre intents comparables: dos a baixa velocitat i dos a velocitat moderada, amb la mateixa col·locació inicial i el mateix camp. En cada prova, anoteu si segueix la línia, activa la palanca, passa al costat de les dues estacions sense tocar-les i arriba a la zona final; mesureu també la desviació lateral en acabar. Després canvieu una sola variable —alineament, llindar o velocitat— i repetiu dues vegades. Compareu la fiabilitat amb la rapidesa i justifiqueu quin ajust és més útil, sense convertir el repte en una cursa. Com a extensió, afegiu una segona parada pròpia després del pont i comproveu si la base pot completar les dues tasques en una mateixa ruta; o comenceu des de la zona dreta i redissenyeu el seguiment.

#### Fase 5 · Comprovem i reflexionem (10 min)

Cada membre explica una part de la missió mostrant el robot, el programa i les dades de prova. La graella docent observa quatre indicadors: seguir la línia amb un criteri mesurat; activar el pont; completar la ruta evitant les estacions; explicar una decisió de velocitat/alineament amb evidència. En l’autoavaluació, marqueu «missió iniciada», «missió completada» o «equip ha completat també una segona parada»; no es comparen punts ni temps entre equips. Una parella revisora aporta un comentari concret i una proposta de millora per a la següent execució.

**Evidència:** camp i palanca propis, programa anotat, taula de quatre intents, mesura de desviació, graella d’observació i explicació col·laborativa. La pàgina LEGO indica que la lliçó oficial prepara la Driving Base amb Color Sensor, configura un model de missió, activa el connector, practica l’eixida esquerra–arribada dreta, evita altres missions i conversa sobre la compensació entre rapidesa i precisió. Aquesta proposta adapta eixos d’aprenentatge semblants en un camp i un mecanisme locals, sense reproduir el tapet, el model ni la missió de FIRST LEGO League.

### **S5 · Una base modular construïda en equip · [Assembling an Advanced Driving Base](https://education.lego.com/en-us/lessons/prime-competition-ready/assembling-an-advanced-driving-base/) (90–120 min).**

#### Fase 1 · Activem i prediem

**Pregunta:** com unim mòduls individuals en una base robusta i fem visible la contribució de cadascú? Repartiu quatre mòduls o rols i predigueu què caldrà comprovar abans de connectar-los.

#### Fase 2 · Explorem i construïm

Cada persona munta una part i l’equip uneix els mòduls, revisa ports i gestió de cables. La base avançada usa dos motors grans, dos mitjans i dos sensors de color, i pot requerir l’Expansion Set 45681 a més del 45678.

#### Fase 3 · Expliquem i registrem

Proveu el programa inicial i altres programes de moviment. Escriviu qui ha construït cada part i quin port o cable s’hi connecta.

#### Fase 4 · Apliquem i millorem

Si no hi ha Expansion Set, feu els rols modulars sobre la base de dos motors i marqueu-la com a adaptació reduïda. Per adaptar la dificultat, munteu mòduls en parella; com a ampliació, construïu una roda seguint només les instruccions d’un altre equip i proveu un circuit sense tocar obstacles.

#### Fase 5 · Comprovem i reflexionem

**Evidència:** esquema de mòduls, ports/cables revisats, prova i presentació individual amb autoavaluació. No anomeneu «base avançada» la versió reduïda.

### **S6 · El meu bloc, el nostre programa · [My Code, Our Program](https://education.lego.com/en-us/lessons/prime-competition-ready/my-code-our-program/) (90–120 min en la seqüència oficial; adaptar la durada al kit disponible).**

#### Fase 1 · Activem i prediem

**Pregunta:** com fem que totes les persones entenguen i reorganitzen el programa? Predigueu quines instruccions es repetiran en una ruta quadrada i quines canvien per al triangle.

#### Fase 2 · Explorem i construïm

Amb la base avançada o la base de pràctica amb limitació escrita, construïu dos marcadors i proveu un *My Block* de mostra. Creeu un bloc propi per a una ruta quadrada.

#### Fase 3 · Expliquem i registrem

Feu blocs separats per a cercle aproximat i triangle, decidiu la mida amb els marcadors i registreu quines ordres queden reutilitzades.

#### Fase 4 · Apliquem i millorem

Intercanvieu programes amb una altra parella perquè els execute sense explicació oral. Reordeneu els blocs per a una missió diferent i compareu llegibilitat i facilitat de modificació; el giroscopi o el càlcul per circumferència són ampliacions.

#### Fase 5 · Comprovem i reflexionem

**Evidència:** dos o més *My Blocks*, programes per a quadrat/cercle/triangle, registre de prova i explicació de com el bloc ordena i reutilitza el codi.

### **S7 · Dos útils i un programa amb arrays · [Time for an Upgrade](https://education.lego.com/en-us/lessons/prime-competition-ready/time-for-an-upgrade/) (90–120 min).**

#### Fase 1 · Activem i prediem

**Pregunta:** quin útil serveix per moure cada càrrega i com organitzem les ordres perquè siguen repetibles? Predigueu quan convé la pala i quan el braç elevador.

#### Fase 2 · Explorem i construïm

En la versió completa, connecteu pala i braç a la base avançada i prepareu quatre caixes lleugeres. Observeu que el programa inicial alça el braç i establiu com tornar cada motor a una posició coneguda abans de començar.

#### Fase 3 · Expliquem i registrem

Descomponeu la tasca en acostar, elevar/baixar, empényer o alçar, alliberar i reiniciar. Creeu un array amb valors d’operació i un segon amb resultats; compareu elements del mateix índex i expliqueu què significa cada posició.

#### Fase 4 · Apliquem i millorem

Proveu diversos casos i compareu precisió, força i encaix de cada útil. Si només hi ha arrays en Python, feu aquesta part en Python; sense Expansion Set, useu base de dos motors i útils de cartó i declareu el canvi, sense afirmar que replica el muntatge motoritzat.

#### Fase 5 · Comprovem i reflexionem

**Evidència:** diagrama dels útils, reinici verificat, arrays comentats, taula per índex i presentació. L’abordatge en angle amb giroscopi és una ampliació opcional.

### **S8 · Repte de camp complet i cronometrat · [Mission Ready](https://education.lego.com/en-us/lessons/prime-competition-ready/mission-ready/) (120+ min, més d’una sessió).**

#### Fase 1 · Activem i prediem

**Pregunta:** podem combinar conducció, sensors, útils i blocs per completar una missió? Dissenyeu un camp escolar amb estació, ruta i marcadors propis; definiu fites i predigueu quines poden requerir més d’un intent.

#### Fase 2 · Explorem i construïm

Prepareu cinc fites originals: (1) empényer un actuador per alliberar el pas; (2) pressionar una palanca; (3) passar un marcador sense tocar-lo; (4) seguir la ruta i arreplegar quatre mostres fictícies de llavor; (5) deixar-ne una en una zona segura, a 50 cm del model de niu. Useu pala i braç només amb el kit avançat; amb el set bàsic, simplifiqueu les accions i documenteu-ho.

#### Fase 3 · Expliquem i registrem

Escriviu pseudocodi i reutilitzeu *My Blocks*. Establiu l’objectiu mínim de dues mostres, el reconeixement de les quatre i fins a sis fitxes de penalització pròpies; decidiu-ne el pes abans de provar. Les mostres són peces fictícies i no impliquen animals.

#### Fase 4 · Apliquem i millorem

Feu intents sense cronòmetre fins que el programa siga estable; després feu una prova cronometrada. Registreu temps, puntuació, penalitzacions i fallades, canvieu una cosa i repetiu.

#### Fase 5 · Comprovem i reflexionem

**Evidència:** mapa i regles originals, pseudocodi, programa comentat, resultats i presentació amb contribucions individuals. Les cinc fites mantenen la progressió de la lliçó de referència; camp, objectes i puntuació són propis i no copien models o camp oficials.

### **S9 · Taller desconnectat de resolució creativa · [Mission Training: Creative Problem-Solving](https://education.lego.com/en-us/lessons/prime-competition-ready/mission-training-creative-problem-solving/) (45 min, híbrida).**

#### Fase 1 · Activem i prediem

**Pregunta:** com definim criteris, fem un primer prototip i iterem? Observeu la imatge d’un nus per desfer i proposeu què provaríeu primer i què faríeu si no funciona.

#### Fase 2 · Explorem i construïm

Definiu en grup què vol dir iterar. Trieu un repte: entregar una mostra, activar un senyal, rescatar una llavor d’una zona marcada o voltejar una fitxa plana.

#### Fase 3 · Expliquem i registrem

Genereu idees amb paper i materials reutilitzats. Anoteu el problema, els criteris i la idea triada abans de fer el primer prototip.

#### Fase 4 · Apliquem i millorem

Proveu el prototip, introduïu una millora i demaneu a un altre equip una observació específica. Registreu dues iteracions i prepareu un pòster o relat oral.

#### Fase 5 · Comprovem i reflexionem

**Evidència:** esbossos, criteris, prototip, dues iteracions i pòster/relat sobre estratègia i solució. Es pot fer presencialment, en línia o individualment; no necessita robot ni tasca motoritzada.

## 🧰 Materials i preparació

Per a les sessions amb robot: set SPIKE Prime 45678, base de conducció, sensor de distància i sensor de color, cinta negra, cartó, retoladors, mostres grans i lleugeres i cinta per al camp. La base avançada oficial consta de dos motors grans per a la propulsió, dos motors mitjans per als útils i dos sensors de color; necessita l’Expansion Set 45681 a més del set 45678. Les sessions 5–8 indiquen aquesta dependència i no afirmen que la base de dos motors siga equivalent. Sense l’expansió, es pot seguir l’objectiu didàctic amb un únic motor mitjà del set base i útils alternats/passius; anoteu aquesta reducció. La sessió 9 només necessita paper, llapis i cartó.

Prepareu el camp sobre taules o al terra, amb carrils prou amples, objectes grans i zones de mans fora del moviment. La referència a l’Albufera és una contextualització educativa: useu dades i mostres fictícies i no feu proves ni recollides al medi natural.

## 🎯 Evidències i avaluació

Recolliu pseudocodi, taules de calibratge, lectures del sensor, mapa de missió, esquemes de construcció, blocs propis, comparació d’accessoris, dades de fiabilitat i prototip desconnectat. Valoreu si l’equip pot predir i explicar el comportament, aïllar una variable, justificar una revisió amb dades, documentar el codi i repartir les decisions. Una missió fallida aporta evidència útil quan queda registrada i ajuda a formular la prova següent; els punts i el temps no són l’únic criteri.

## ♿ Participació i inclusió

Abans del robot es pot resoldre cada ruta amb una maqueta i targetes de moviment. Oferiu rols rotatius de construcció, programació, pilotatge de proves i registre; faciliteu instruccions visuals, carrils d’alt contrast, marques tàctils fora de la trajectòria i temps addicional per documentar. Les missions no depenen de velocitat manual: una persona pot dictar o validar el codi mentre una altra manipula el robot. El repte desconnectat és una sessió completa, no un premi de consol ni un requisit per accedir a la resta.

## 🔗 Correspondència amb la unitat oficial

La seqüència adapta les nou lliçons de [Competition Ready · SPIKE Prime](https://education.lego.com/en-us/lessons/prime-competition-ready/): [Driving Around](https://education.lego.com/en-us/lessons/prime-competition-ready/training-camp-1-driving-around/), [Playing with Objects](https://education.lego.com/en-us/lessons/prime-competition-ready/training-camp-2-playing-with-objects/), [Reacting to Lines](https://education.lego.com/en-us/lessons/prime-competition-ready/training-camp-3-react-to-lines/), [The Guided Mission 2026–27](https://education.lego.com/en-us/lessons/prime-competition-ready/spike-prime-guided-mission-2627/), [Assembling an Advanced Driving Base](https://education.lego.com/en-us/lessons/prime-competition-ready/assembling-an-advanced-driving-base/), [My Code, Our Program](https://education.lego.com/en-us/lessons/prime-competition-ready/my-code-our-program/), [Time for an Upgrade](https://education.lego.com/en-us/lessons/prime-competition-ready/time-for-an-upgrade/), [Mission Ready](https://education.lego.com/en-us/lessons/prime-competition-ready/mission-ready/) i la lliçó híbrida [Mission Training](https://education.lego.com/en-us/lessons/prime-competition-ready/mission-training-creative-problem-solving/). El catàleg indica durades d’entre 30 i 120+ minuts; per això les activitats de construcció, projecte i missió s’estenen en més d’una classe. Els textos, el context, les missions, el camp, les regles i els materials visuals són propis. Les especificacions de components es basen en la pàgina oficial de [maquinari SPIKE Prime](https://education.lego.com/en-us/teacher-resources/lego-education-spike-prime/support-technical-info/lego-education-spike-prime-support-technical-info-product-info/); comproveu sempre la dotació física del centre.
