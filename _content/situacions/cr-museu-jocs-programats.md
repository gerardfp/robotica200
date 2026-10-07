---
active: true
title: "Museu de jocs programats"
description: "Seqüència pròpia de 24 sessions amb Codey Rocky vinculada als títols públics del curs CSTA de Makeblock i contextualitzada en un museu de jocs."
robot: "codey-rocky"
robot_label: "Codey Rocky"
cycle: "segon-cicle"
cycle_label: "Segon cicle"
subject: "tecnologia"
subject_label: "Tecnologia, Matemàtiques, Art i Pensament Computacional"
theme: "programacio"
theme_label: "Projectes interactius i robòtica"
duration: "24 sessions de 40 minuts"
challenge: "Com dissenyem una exposició de jocs que es puga entendre, provar, depurar i recórrer amb Codey Rocky?"
---

![Codey Rocky real amb pantalla LED i erugues al costat d’una ruta de joc i targetes de colors.](../../_assets/imatges/sa-cr-jocs-24.webp)

_El museu és una proposta pròpia; cada mòdul construeix un joc petit amb codi visible i proves repetibles._

## 🌱 Situació i producte final

L’alumnat prepara una exposició interactiva per a la comunitat educativa. En parelles, dissenya jocs i reptes que combinen pantalla LED, botons, variables, sensors reals i moviment. Cada sessió deixa un artefacte provable i un registre breu de decisions. La progressió proposa una interpretació local per a cadascun dels 24 títols CSTA publicats per Makeblock. Els plans docents s’han contrastat directament per a les lliçons 1, 3, 4, 13, 14, 15, 17 i 18. Per a les lliçons 1–16, els objectius públics del curs diferent *Codey Rocky & Neuron Discovery* permeten una comprovació addicional, però no substitueixen les fitxes CSTA. La resta de sessions s’identifica com a adaptació pròpia del títol i l’objectiu públic. No incorpora Neuron ni cap accessori extern com a requisit.

Quan un repte oficial es basa en una història o joc concret, ací es transforma en un context de barri o centre. Cap activitat utilitza dades personals, velocitat corporal o sons enregistrats. Les proves de moviment es fan en una zona buida i amb una persona observadora.

## 🎯 Aprenentatges i vocabulari

- Reconéixer els components de Codey Rocky que es proven i relacionar botons, sensors i pantalla amb les respostes programades.
- Construir programes amb seqüències, repeticions, condicions, variables i funcions segons el repte de cada lliçó.
- Crear animacions i mecàniques de joc, i provar-les amb casos previstos i casos que poden fer fallar el programa.
- Depurar una instrucció concreta i explicar els límits de cada joc o moviment abans de compartir-lo amb una altra persona.

## 📅 Seqüència completa · 24 sessions

### **L1 · El secret de Codey Rocky · del problema al primer programa (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Mostreu Codey Rocky apagat i un conjunt de targetes amb robots de contextos diferents. En parelles, relacioneu cada robot amb una tasca possible i expliqueu quina observació us ha fet triar-la. Diferencieu una funció comprovada d’una suposició: aquesta activitat no demana activar reconeixement facial ni cap servei d’intel·ligència artificial.

#### Fase 2 · Explorem i construïm (10 min)

Observeu les dues parts del robot de la dotació. Codey conté el controlador, pantalla LED, botons, llums, altaveu i sensors integrats; Rocky n’és la base mòbil, amb motors i sensor frontal inferior. Feu un inventari dibuixat de les peces que realment veieu i assenyaleu una capacitat que vulgueu comprovar. No afegiu accessoris externs al mapa del kit.

#### Fase 3 · Expliquem i registrem (10 min)

Construïu un esquema propi **idea → programa → càrrega → acció**. Expliqueu que un programa és una seqüència d’instruccions que es tradueix a blocs; el robot només executa allò que s’ha programat i carregat. En mBlock 5, localitzeu escenari, categories de blocs i àrea de codi. Feu una predicció abans de connectar cap dispositiu.

#### Fase 4 · Apliquem i millorem (10 min)

Connecteu Codey amb el cable USB, enceneu-lo i seleccioneu el port sèrie correcte en mBlock 5. Creeu una acció mínima amb l’esdeveniment de prémer A i una icona de pantalla; carregueu el programa, desconnecteu el cable de dades i poseu el robot sobre una superfície estable abans de provar-lo. Si no respon, reviseu alimentació, port, mode de càrrega i esdeveniment, d’un en un.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** inventari de Codey/Rocky, diagrama idea-programa-acció, captura o dibuix dels blocs, resultat de la prova i una dificultat resolta. Tanqueu amb les frases «hui he aprés…», «el problema era…» i «l’he resolt…»; es pot respondre amb text, dibuix o explicació oral.

![Codey Rocky de la dotació al costat d’un ordinador amb blocs de programació i quatre targetes de seqüència en blanc.](../../_assets/imatges/sa-cr-primeres-lliçons.webp)

_Les targetes i la interfície són una representació pròpia; el robot parteix del model Codey Rocky treballat a classe._

### **L2 · Botons i expressions programades (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Compareu dues icones que una persona podria interpretar de manera diferent. Acordeu que Codey mostrarà una expressió programada quan reba una entrada; el robot no detecta ni diagnostica com se sent ningú.

#### Fase 2 · Explorem i construïm (10 min)

En una taula, assigneu A a una icona i B a una altra. Abans de provar-les, cada parella dibuixa què espera veure en prémer cada botó i què passarà si no es prem cap. Roteu qui manipula la placa i qui registra.

#### Fase 3 · Expliquem i registrem (10 min)

Localitzeu els blocs d’esdeveniment «quan A» i «quan B» en mBlock. Seguiu el programa amb el dit i expliqueu quina instrucció respon a cada entrada. Compareu una seqüència amb els blocs intercanviats i prediu-ne l’efecte abans de carregar-la.

#### Fase 4 · Apliquem i millorem (10 min)

Creeu una targeta de llegenda pròpia: cada símbol correspon a una icona de pantalla, no a un estat real de l’alumnat. Afegiu una resposta diferent a cada botó i deixeu la pantalla sense canvi si no hi ha una entrada. Proveu una variació de duració o so només si és còmoda per al grup; oferiu sempre una versió silenciosa.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** programa amb dos esdeveniments, llegenda, predicció i resultat d’A/B. Si una resposta no coincidix, identifiqueu el primer bloc que no concorda amb el pla i canvieu només eixe bloc.

### **L3 · Dissenyem una animació amb seqüències (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Presenteu una escena de biblioteca: una persona arriba, deixa un llibre i tanca el prestatge. Ordeneu tres vinyetes i compareu què deixa de tindre sentit si se n’intercanvien dues. Anomeneu *seqüència* el conjunt d’accions ordenades que completa una tasca.

#### Fase 2 · Explorem i construïm (10 min)

Una persona fa de robot i una altra li dona instruccions per a arribar a una marca i dibuixar una icona. La persona-robot executa literalment les ordres, sense completar passos que no s’han dit. Anoteu una ambigüitat i reescriviu-la abans de repetir.

#### Fase 3 · Expliquem i registrem (10 min)

Obriu un programa amb l’esdeveniment «quan es prem A» i encadeneu quatre fotogrames propis de pantalla amb una duració curta per a cadascun: icona inicial, canvi, gest visual i icona final. Expliqueu com l’ordre dels blocs determina l’animació; no cal representar cares o emocions.

#### Fase 4 · Apliquem i millorem (10 min)

Dibuixeu un fotograma en una graella LED de cinc per cinc. Dupliqueu-ne el bloc, canvieu uns pocs píxels i repetiu la seqüència fins que una altra parella puga reconéixer el moviment o missatge. Carregueu-la i ajusteu l’ordre o la duració a partir d’una observació concreta.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** vinyetes ordenades, programa de quatre fotogrames, predicció, comentari de l’audiència i una revisió. Un altre equip explica què ha entés abans de rebre el títol de la peça.

### **L4 · Detectem i corregim un error (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Expliqueu que un *bug* és un defecte del programa que provoca una diferència entre el resultat esperat i l’observat. Poseu un exemple quotidià —una instrucció que omet una parada— i distingiu-lo d’una limitació del sensor o d’un problema de connexió.

#### Fase 2 · Explorem i construïm (15 min)

Prepareu tres programes curts amb un error cadascun: una ruta de maqueta que no arriba a una clau dibuixada; una parada que no s’activa abans d’un obstacle tou; i un compte arrere que no acaba mostrant el missatge final. L’últim cas substitueix la bomba fictícia del material d’origen per una càpsula de missatge segura. Abans d’executar, cada parella escriu el resultat esperat; després registra el punt on la prova es desvia.

#### Fase 3 · Expliquem i registrem (5 min)

Descriviu el símptoma i compareu-lo amb el programa. Reviseu esdeveniment inicial, ordre, valor i condició; separeu els errors de codi dels errors de maquinari. No canvieu simultàniament diversos blocs.

#### Fase 4 · Apliquem i millorem (10 min)

Canvieu una sola instrucció, torneu a executar el mateix cas i comproveu si s’ha resolt la desviació. Si no, desfeu el canvi i proveu una hipòtesi diferent. Una parella revisora intenta reproduir el resultat amb les mateixes condicions.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** predicció, símptoma, hipòtesi, canvi únic, resultat i conclusió. Marqueu si la causa era un bloc, una connexió o una expectativa mal definida; no doneu per corregit un error fins que una prova ho confirme.

### **L5 · Bucle comptat (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Mireu una tira de quatre fotogrames d’un personatge de pa de pessic que intenta botar. Predigueu quantes vegades s’ha de repetir la seqüència perquè l’animació tinga un inici i un final visibles.

#### Fase 2 · Explorem i construïm (10 min)

En mBlock, creeu una animació de paper o d’un símbol de l’exposició amb una repetició comptada. Fixeu el nombre de voltes i distingiu els blocs que formen una volta dels que van abans o després.

#### Fase 3 · Expliquem i registrem (10 min)

Feu una traça en paper: número d’iteració, fotograma mostrat i valor del comptador. Compareu la predicció amb el resultat i marqueu si el programa executa una volta de més o de menys.

#### Fase 4 · Apliquem i millorem (10 min)

Canvieu el nombre de repeticions o un fotograma, però no les dues coses alhora. Una altra parella executa el programa i explica què ha canviat en l’animació.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** programa amb repetició comptada, taula de traça i una revisió justificada.

**Pregunta docent:** què determina que el bucle acabe després del nombre de voltes acordat?

### **L6 · Bucle continu (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Compareu una animació que acaba amb una altra que continua fins que una persona la para. Acordeu una resposta visual tranquil·la que puga repetir-se sense pampallugues ràpides.

#### Fase 2 · Explorem i construïm (10 min)

Programeu una animació ambiental amb un bucle continu i un control explícit d’aturada. Manteniu la freqüència còmoda i deixeu l’opció de veure els fotogrames en paper sense activar la pantalla.

#### Fase 3 · Expliquem i registrem (10 min)

Observeu què passa en iniciar, durant la repetició i en prémer l’aturada. Registreu si la seqüència torna al primer fotograma i si el control interromp el moviment de manera previsible.

#### Fase 4 · Apliquem i millorem (10 min)

Afegiu una segona escena seleccionable amb un botó o una targeta de control. Proveu que el canvi d’escena i l’aturada continuen sent accessibles i no es confonen.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** diagrama d’estats, programa i prova d’inici/aturada.

**Pregunta docent:** com sap l’usuari que el bucle està actiu i com pot acabar-lo?

### **L7 · Cursa I: colors i obstacles (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Presenteu una pista de cartó amb dues portes de color i un obstacle tou. Acordeu que Codey Rocky ha de distingir una porta blava d’una roja i reaccionar quan el sensor frontal detecte un objecte. Abans de connectar-lo, completeu una taula de prediccions: color detectat, obstacle present/absent i resposta esperada. La cursa és una missió de decisions, no una comparació de velocitat.

#### Fase 2 · Explorem i construïm (10 min)

Comproveu en el model i firmware del centre que mBlock ofereix lectures del sensor inferior de color i del sensor frontal de distància/infraroig. Calibreu sobre les targetes reals de la pista —mateixa llum, alçada i superfície— i feu tres lectures per color. Col·loqueu l’obstacle tou fora de la trajectòria de rodes i mans. Si una entrada no està disponible o no és estable, useu targetes de valor simulat i anoteu-ho com a simulació, sense atribuir-la al robot.

#### Fase 3 · Expliquem i registrem (10 min)

Programeu dues decisions separades: si el color llegit és el de la porta blava, mostrar el símbol de continuar; si la distància indica un objecte pròxim, parar i mostrar el símbol d’espera. No avanceu automàticament fins que una persona haja retirat l’obstacle. Registreu les lectures i les dues respostes observades.

```blocks
quan s'inicia la missió
  llig el color de la porta
  si el color és blau
    mostra «continua»
  llig la distància frontal
  si hi ha un obstacle pròxim
    atura els motors
    mostra «espera»
```

#### Fase 4 · Apliquem i millorem (10 min)

Passeu quatre casos controlats: porta blava lliure, porta roja lliure, porta blava amb obstacle i porta roja amb obstacle. Repetiu cada cas tres vegades; canvieu una condició o un llindar només després d’anotar la línia base. Si la lectura varia, amplieu la zona de color o atureu el repte i useu el registre per a explicar el límit del sensor.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** calibratge repetit, taula dels quatre casos, programa o simulació marcada i una revisió justificada.

**Pregunta docent:** quina entrada ha provocat cada resposta i quina variació del material podria canviar la lectura?
### **L8 · Cursa II: missions amb lògica combinada (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Recupereu les lectures de color i obstacle de la sessió anterior. La missió d’avui només mostra «porta segura» quan el color és blau **i** el camí està lliure. Completeu abans de programar les quatre combinacions (blau/roig × lliure/obstacle) i marqueu quina compleix la regla.

#### Fase 2 · Explorem i construïm (10 min)

Construïu la primera solució amb operadors lògics i una condició composta. Després, compareu-la amb una segona estratègia que usa un bucle comptat per revisar tres estacions, una condició dins del bucle i un operador per combinar la lectura de color amb l’estat de la ruta. Useu només blocs equivalents disponibles en la versió de mBlock del centre; si el sensor falla, llegiu les entrades d’una targeta simulada.

```blocks
repeteix 3 vegades
  llig color i distància
  si (color és blau) i (camí està lliure)
    mostra «porta segura»
  si no
    mostra «revisa la ruta»
```

#### Fase 3 · Expliquem i registrem (10 min)

Executeu les quatre combinacions amb cada versió. La taula de resultats ha d’incloure entrada de color, obstacle, valor de l’operador, resposta i coincidència amb la regla. Expliqueu què es repeteix tres vegades i quina part de la decisió continua sent diferent en cada estació.

#### Fase 4 · Apliquem i millorem (10 min)

Afegiu un cas límit: lectura de color dubtosa o obstacle just en el límit de detecció. Compareu les dues solucions amb els mateixos casos i trieu la que una parella revisora puga explicar i depurar millor. No amagueu un cas no resolt amb una resposta aleatòria.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** taula de veritat completa, dues estructures de programa, casos de prova i decisió argumentada.

**Pregunta docent:** quina diferència hi ha entre repetir una missió tres vegades i combinar dues condicions dins d’una missió?
### **L9 · Barra de so: bucles i condicions (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Proposeu una barra visual per a una instal·lació sonora del museu. Definiu tres franges de lectura —baixa, intermèdia i alta— i predigueu quin color o nombre de píxels correspondria a cada franja. Useu un so breu produït expressament o dades de prova; no enregistreu veus ni converses.

#### Fase 2 · Explorem i construïm (10 min)

Comproveu que el sensor de so ambiental integrat apareix en el mBlock instal·lat i feu tres lectures del mateix estímul. Si no hi ha bloc accessible, utilitzeu les mateixes lectures fictícies en paper i identifiqueu-les clarament com a simulació. Creeu una barra LED amb condicions que assignen una eixida a cada interval; el valor és una lectura relativa del sensor, no una mesura certificada en decibels.

#### Fase 3 · Expliquem i registrem (10 min)

Implementeu la solució de bucles niats indicada pel repte: un bucle infinit exterior conté un segon bucle infinit que llig el sensor i aplica les condicions de la barra. Col·loqueu qualsevol instrucció posterior a banda i prediu si arribarà a executar-se. Proveu la lectura per davall, en la frontera i per damunt de cada llindar.

```blocks
per sempre
  per sempre
    llig el nivell de so
    si nivell < llindar_1
      mostra barra curta
    si no, si nivell < llindar_2
      mostra barra mitjana
    si no
      mostra barra llarga
```

#### Fase 4 · Apliquem i millorem (10 min)

Observeu que el bucle interior infinit no retorna al cos exterior: les instruccions que queden després no s’executen. Refactoreu-ho en un únic bucle continu amb les tres condicions i torneu a passar els mateixos valors. Compareu les dues estructures, expliqueu el comportament i conserveu la versió funcional, sense afegir un segon bucle infinit redundant.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** taula de lectures i llindars, dos programes comparats, resultats en les fronteres i una explicació del bloqueig del bucle niat.

**Pregunta docent:** què aporta cada bucle infinit en aquesta estructura i quin codi queda inaccessible quan el bucle interior no acaba?
### **L10 · Funcions de bon dia (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Llegiu una seqüència de benvinguda amb icona, so opcional i pausa. Busqueu una part que es repetisca en més d’una escena i prediu què canviaria si s’escriguera una sola vegada.

#### Fase 2 · Explorem i construïm (10 min)

Agrupeu la seqüència en una funció pròpia de mBlock i crideu-la des de dos esdeveniments diferents. Useu missatges neutres per als visitants i manteniu una versió sense so.

#### Fase 3 · Expliquem i registrem (10 min)

Seguiu el programa des de cada crida i registreu quina funció s’executa, quin bloc continua després i si el resultat és el mateix en els dos casos.

#### Fase 4 · Apliquem i millorem (10 min)

Afegiu una variació d’icona o duració a una crida sense duplicar tota la funció. Si el curs de mBlock disponible no admet l’opció imaginada, conserveu la funció sense paràmetres i expliqueu la limitació.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** funció reutilitzada dues vegades i esquema de crides.

**Pregunta docent:** quina part del programa hem pogut reutilitzar i per què?

### **L11 · Petit vigilant I: missions i distàncies (40 min).**

#### Fase 1 · Activem i prediem (5 min)

En un plànol fictici del museu, marqueu inici, tres parades numerades i arribada. Definiu una missió que demane visitar les parades en ordre i calculeu quantes unitats de graella recorrerà abans de construir el programa. Una unitat és una convenció del mapa, no una mesura real del sensor.

#### Fase 2 · Explorem i construïm (10 min)

Dissenyeu una escena de patrulla amb tres encàrrecs curts: arribar a una parada, mostrar-ne el símbol i tornar a l’inici. Escriviu `distància = passos × unitat`; useu, per exemple, quatre passos per cada unitat de mapa i calculeu la longitud total de dos trams. Descomponeu les accions comunes en funcions o seqüències amb nom; si la versió de mBlock no admet el format previst, anoteu els valors en variables separades.

#### Fase 3 · Expliquem i registrem (10 min)

Proveu cada funció per separat i compareu el nombre de passos previst amb el recompte del mapa. Registreu les operacions, la distància modelada i qualsevol diferència entre la ruta ideal i el moviment del robot; no presenteu l’estimació com una mesura calibrada en centímetres.

#### Fase 4 · Apliquem i millorem (10 min)

Combineu els trams en una missió completa. Afegiu una condició d’èxit que es complisca quan s’han visitat les tres parades i s’ha tornat a l’inici. Una altra parella segueix només el mapa i les instruccions; reviseu una ambigüitat o operació incorrecta que detecte.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** mapa numerat, càlcul d’almenys dos trams, programa modular, recompte previst/observat i criteri d’èxit.

**Pregunta docent:** quina part és una dada del mapa i quina és una estimació basada en el nostre model?
### **L12 · Petit vigilant II: funcions per a rutes complexes (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Compareu dues missions: una visita tres parades i una altra en visita quatre, però totes dues comparteixen la salutació, la parada de lectura i el retorn. Predigueu quins blocs es poden reutilitzar i calculeu la distància modelada de cada ruta a partir dels trams del mapa.

#### Fase 2 · Explorem i construïm (10 min)

Creeu una funció `visita(parades, passos_per_tram)` amb els paràmetres que permeta la versió de mBlock. Calculeu `distància = parades × passos_per_tram × unitat` i mostreu el resultat abans d’iniciar la ruta. Si el bloc de funció no accepta paràmetres, utilitzeu variables d’entrada i documenteu-ne el valor en cada crida; no dupliqueu la funció sense comparar-ho.

#### Fase 3 · Expliquem i registrem (10 min)

Executeu les missions amb les mateixes unitats i registreu valors d’entrada, operacions, parades visitades i resultat. Verifiqueu la multiplicació amb un càlcul manual i proveu també una ruta de zero trams i una amb un tram addicional. La longitud és una predicció del mapa, no una promesa de precisió física.

#### Fase 4 · Apliquem i millorem (10 min)

Afegiu una condició que trie una missió curta o llarga segons el nombre de parades sol·licitat. Canvieu un paràmetre d’una missió i comproveu que l’altra conserva el seu valor. Una parella revisora ha de trobar on es defineix cada entrada i explicar com es calcula la distància.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** dues missions, funció o alternativa documentada, taula de càlcul, casos límit i comparació amb el programa de L11.

**Pregunta docent:** com ens ajuden les funcions i les operacions a ampliar una missió sense perdre de vista els valors que la controlen?
### **L13 · La caixa de llavors de l’hort (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Presenteu una caixa fictícia amb 10 fitxes de llavor. Expliqueu la variable com un contenidor amb nom i valor que pot canviar. En parelles, proposeu un nom clar per al comptador i prediu què passa quan n’afegim o en traiem.

#### Fase 2 · Explorem i construïm (10 min)

Prepareu targetes d’esdeveniment locals: «plantem 2» (−2), «arriba una donació de 5» (+5), «usem 3» (−3) o «recollim 4» (+4). Partiu de `reserva = 10`, llegiu les targetes en ordre i actualitzeu el valor en una taula. Afegiu una segona variable anomenada `equip` per registrar fitxes en una altra safata i compareu els dos valors sense barrejar-los.

#### Fase 3 · Expliquem i registrem (10 min)

Traduïu dos esdeveniments a blocs de variables. Proveu també una regla de comparació pròpia: si la reserva baixa de 5, mostrar «cal revisar la caixa»; si supera 12, mostrar «repartim l’excedent». Anoteu valor anterior, operació, valor nou i resposta de la condició. Els llindars són regles del joc d’aula, no recomanacions agronòmiques.

#### Fase 4 · Apliquem i millorem (10 min)

Comproveu com una variable pot controlar una acció física només en zona lliure: amb el botó A, assigneu `velocitat = 30` i feu avançar Codey Rocky durant un segon; atureu-lo i registreu què ha passat. Com a extensió guiada, assigneu `angle = 70`, feu un gir a l’esquerra i després canvieu el valor a 140 per provar el gir contrari. Si el moviment no és segur o el valor depén d’una configuració diferent, feu aquesta part amb una fitxa en quadrícula i marqueu-la com a simulació.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** taula de traça de dues variables, condicions de reserva, programa o simulació de velocitat i una revisió. Expliqueu quina informació guarda cada variable i com es reemplaça el valor.

**Pregunta docent:** quin canvi del valor ha provocat la resposta del programa?
### **L14 · Operacions amb el marcador del mercat (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Obriu un marcador fictici que comença a zero. Predigueu què mostrarà després d’afegir una unitat amb A o llevar-ne una amb B; decidiu com representareu valors negatius sense convertir el joc en una puntuació d’alumnes.

#### Fase 2 · Explorem i construïm (10 min)

Creeu una variable `marcador` i assigneu-li el valor 0 en iniciar el programa. Configureu A perquè l’incremente en 1 i B perquè el decremente en 1. Mostreu el resultat en la matriu LED després de cada canvi. Compareu l’operació manual amb el bloc de canvi de variable i observeu què significa restar quan el valor és zero.

#### Fase 3 · Expliquem i registrem (10 min)

Afegiu dos esdeveniments nous amb els blocs d’operadors: A multiplica el valor per 2; B el divideix per 2. Després de cada operació, assigneu el resultat a la mateixa variable i mostreu-lo. Registreu entrada, operació i eixida per a `0`, `4` i `−4`, i compareu el càlcul manual amb el programa.

#### Fase 4 · Apliquem i millorem (10 min)

Canvieu el valor inicial o el factor de multiplicació/divisió i repetiu els mateixos casos. Verifiqueu quin tipus de forma accepta el bloc de variable com a operand i manteniu la mateixa variable en tots els esdeveniments. Recordeu que la pantalla mostra valors entre −999 i 9999; si el càlcul ix d’aquest interval, anoteu el límit en lloc d’interpretar la pantalla com un resultat complet.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** programa amb inicialització, A/B, multiplicació/divisió, taula de casos i una comparació manual-programa.

**Pregunta docent:** per què cal guardar el resultat nou en la mateixa variable perquè el marcador continue acumulant els canvis?
### **L15 · La càpsula d’arribada (40 min).**

El pla oficial treballa variables, compte arrere i aleatorietat dins d’un joc d’explosió. Ací en conservem la lògica de programació i eliminem l’explosiu, la por i el pas ràpid del robot entre persones: usem una càpsula de missatge en una taula estable, amb cancel·lació clara i senyal final neutre.

#### Fase 1 · Activem i prediem (5 min)

Mostreu una variable `temps` que comença en 30 i una càpsula de paper. Predigueu quantes actualitzacions hi haurà si el programa resta una unitat cada segon i què ha de mostrar la pantalla quan arribe a zero.

#### Fase 2 · Explorem i construïm (10 min)

En iniciar, assigneu 30 a `temps`. En prémer A, comenceu el compte arrere: espereu un segon, resteu 1, mostreu el valor i repetiu 30 vegades. Quan `temps` arriba a 0, atureu el bucle i mostreu «missatge llest» amb una llum d’un color acordat; el so és opcional i sempre hi ha versió silenciosa. El robot no es passa de mà en mà: els equips roten una targeta de torn.

#### Fase 3 · Expliquem i registrem (10 min)

Traceu els primers tres segons i el final. Comproveu que el valor inicial, la repetició i la condició d’aturada donen 30 actualitzacions, no 29 ni 31. Registreu què passa si el programa s’inicia dues vegades i si una persona prem el control abans que acabe.

#### Fase 4 · Apliquem i millorem (10 min)

Afegiu una cancel·lació amb B que ature el compte i mostre «pausa»; torneu a iniciar des d’un valor conegut. Després, creeu una segona modalitat: en prémer A, genereu `objectiu` a l’atzar entre 1 i 20; cada B incrementa `comptador` en 1 i una condició d’igualtat mostra «objectiu assolit». Proveu els extrems 1 i 20 amb valors forçats abans de deixar l’aleatorietat activa. El nombre aleatori serveix per al joc, no per a seguretat o xifratge.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** diagrama d’estats, traça del compte arrere, cancel·lació i proves del valor aleatori, inclosos els extrems.

**Pregunta docent:** quina part de la lògica continua sent útil quan canviem el context de bomba a càpsula de missatge?
### **L16 · Pedra, paper i tisora (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Representeu pedra, paper i tisora amb tres símbols i acordeu la regla de victòria i empat. Predigueu els resultats de les nou combinacions abans de programar-les.

#### Fase 2 · Explorem i construïm (10 min)

Creeu una ronda amb una elecció d’usuari i una resposta aleatòria del programa, si la funció està disponible. Manteniu l’atzar dins del joc i no useu el resultat per prendre decisions reals sobre l’alumnat.

#### Fase 3 · Expliquem i registrem (10 min)

Proveu les tres opcions contra cada resultat possible i marqueu victòria, derrota o empat en una matriu. Compareu cada eixida amb la regla acordada.

#### Fase 4 · Apliquem i millorem (10 min)

Afegiu un botó per iniciar una ronda nova i comproveu que es reinicien els símbols i el resultat. Una parella revisora prova un cas triat a l’atzar.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** matriu completa, programa i reinici verificat.

**Pregunta docent:** quina combinació faltava o estava classificada de manera incorrecta?

### **L17 · Un circuit jugable per al museu (40 min).**

La guia docent oficial de *My Speedway* demana dissenyar una escena i un personatge, animar un cotxe amb les fletxes, tornar a l’inici si ix de la pista, mostrar una victòria en arribar a meta i explorar arbres que es mouen en sentit contrari. Aquesta adaptació crea un joc original de recorregut pel barri: no utilitza cotxes reals, rànquings ni proves de conducció.

#### Fase 1 · Activem i prediem (5 min)

Mostreu una escena en blanc i tres esbossos de circuits possibles. Trieu un espai fictici —pati, plaça o camí de l’horta— i definiu què vol dir «dins de la ruta», on comença el personatge i quin senyal confirma l’arribada.

#### Fase 2 · Explorem i construïm (10 min)

En mBlock, dibuixeu un fons original amb pista ampla, inici, meta i una zona fora de ruta. Creeu o trieu un personatge propi del museu, assigneu-li un nom i programeu les fletxes amunt/avall/esquerra/dreta perquè es moga en la direcció indicada. Una opció de teclat en pantalla o targetes permet participar sense prémer tecles ràpidament.

#### Fase 3 · Expliquem i registrem (10 min)

Escriviu les regles com a casos: si el personatge continua dins la pista, conserva la posició; si ix pels límits, torna a l’inici; si toca la meta, mostra «Arribada!» i bloqueja o pausa el control. Dibuixeu un mapa d’estats i proveu una ruta vàlida, una eixida pels límits i una arribada.

#### Fase 4 · Apliquem i millorem (10 min)

Afegiu un efecte dinàmic senzill: arbres o fites es mouen cap arrere mentre el personatge avança, amb una velocitat baixa i pausa disponible. Una altra parella juga amb les mateixes regles i registra una ambigüitat o error; reviseu una cosa cada vegada. No puntueu la velocitat ni compareu persones.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** fons i personatge originals, esquema de controls, regles de límit i meta, tres casos de prova i una millora derivada del retorn.

**Pregunta docent:** quina regla fa que el joc continue sent comprensible quan el personatge arriba al límit o a la meta?
### **L18 · Un joc amb el giroscopi de Codey (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Compareu com es controla un joc en ordinador, mòbil o consola i trieu una idea pròpia de recorregut. Definiu què representa inclinar Codey cap a l’esquerra i cap a la dreta, quin missatge rebrà el personatge del joc i com s’aturarà la partida. Inclinar el robot és una opció voluntària; es pot seguir la mateixa predicció des del diagrama o amb tecles.

#### Fase 2 · Explorem i construïm (10 min)

Dissenyeu una escena i un personatge originals en mBlock. Creeu un programa que llija el giroscopi integrat i envie missatges diferenciats per a inclinació esquerra i dreta; configureu l’sprite perquè els reba i es moga en la direcció acordada. Manteniu Codey sobre la taula i inclineu-lo suaument, sense alçar-lo ni sacsar-lo.

#### Fase 3 · Expliquem i registrem (10 min)

Traçeu la cadena entrada del giroscopi → missatge → resposta de l’sprite. Proveu inclinació esquerra, inclinació dreta i posició neutra. En passar d’un gir a l’altre, atureu primer l’script anterior perquè dos moviments simultanis no continuen controlant el personatge. Registreu quan apareix el conflicte si no s’atura.

#### Fase 4 · Apliquem i millorem (10 min)

Feu un repte curt, proveu-lo i corregiu una incidència cada vegada. Compareu el broadcast amb una alternativa pròpia basada en una variable d’estat; manteniu la solució que siga més fàcil de seguir i depurar. Una parella pot millorar el circuit o dibuixar un personatge alternatiu. Afegiu controls de teclat com a via equivalent per a qui no vulga inclinar Codey.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** escena/personatge, diagrama d’entrada–missatge–sprite, prova dels dos sentits i del punt neutre, i nota de depuració sobre l’aturada dels scripts.

**Autoavaluació:** «he creat un control interactiu», «el conflicte que he trobat era…», «l’he resolt aturant…».

**Pregunta docent:** què passa si no parem l’altre script abans d’enviar el missatge de gir contrari?
### **L19 · Mecàniques de joc I (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Trieu l’objectiu d’un joc de col·lecció de símbols del museu. Escriviu quan comença, què compta com a èxit i quina condició el fa acabar.

#### Fase 2 · Explorem i construïm (10 min)

Programeu l’inici, una variable de puntuació i una condició de finalització. Manteniu l’escena curta i useu símbols, no dades o rànquings de visitants.

#### Fase 3 · Expliquem i registrem (10 min)

Feu la traça d’una partida prevista i una d’interrompuda. Comproveu que el marcador i l’estat final coincideixen amb les regles escrites.

#### Fase 4 · Apliquem i millorem (10 min)

Demaneu a una parella que jugue sense explicació oral. Ajusteu una instrucció o una condició que haja resultat ambigua i repetiu la prova.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** regla, codi, dos casos i retorn de la parella.

**Pregunta docent:** com sap el programa que la partida ha acabat?

### **L20 · Mecàniques de joc II (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Recupereu el joc anterior i identifiqueu una manera de fer-lo més variat sense augmentar la pressió sobre qui juga. Predigueu quin canvi tindrà més efecte.

#### Fase 2 · Explorem i construïm (10 min)

Afegiu un nivell, una opció o un obstacle virtual i feu explícita la condició que el activa. Manteniu una eixida clara per a pausar o acabar.

#### Fase 3 · Expliquem i registrem (10 min)

Proveu el cas habitual, els límits de puntuació i el cas d’aturada. Registreu errors i dubtes amb dades fictícies, mai amb classificacions personals.

#### Fase 4 · Apliquem i millorem (10 min)

Compareu la versió nova amb la inicial amb els mateixos casos. Retireu el canvi si fa el joc menys comprensible o no millora el criteri triat.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** versions comparades, casos límit i decisió argumentada.

**Pregunta docent:** quin criteri ens ha permés decidir si la mecànica nova millorava el joc?

### **L21 · Ràpid i segur (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Observeu una pista de sobretaula tancada i marqueu una zona d’aturada. Predigueu què pot canviar si augmenta la velocitat del motor i quin risc cal evitar.

#### Fase 2 · Explorem i construïm (10 min)

Programeu una ruta curta amb velocitat baixa i increments petits. Manteniu el Codey Rocky lluny de vores, cables i persones; no es cronometra ni es compara el rendiment entre equips.

#### Fase 3 · Expliquem i registrem (10 min)

Feu tres intents amb la mateixa ruta i registreu temps aproximat i desviació sense convertir-los en una competició. Atureu la prova si el robot s’acosta a la vora o entra algú a la zona.

#### Fase 4 · Apliquem i millorem (10 min)

Canvieu només la velocitat o el temps de motor i repetiu els tres intents. Compareu control i estabilitat, no sols el temps mínim.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** registre d’intents, límit de seguretat i canvi justificat.

**Pregunta docent:** quina velocitat permet mantindre el control en aquesta pista concreta?

### **L22 · Fem un gir (40 min).**

#### Fase 1 · Activem i prediem (5 min)

En una graella de paper, dibuixeu un gir de 90 graus i predigueu quina ordre o combinació de motors pot aproximar-lo en la superfície disponible.

#### Fase 2 · Explorem i construïm (10 min)

Calibreu el gir amb una velocitat baixa i un temps o angle de motor que mBlock permeta controlar. Feu una marca inicial i no canvieu alhora el punt de partida i la duració.

#### Fase 3 · Expliquem i registrem (10 min)

Registreu dos intents per cada configuració i mesureu la desviació amb una plantilla de paper. Indiqueu que és una aproximació de la maqueta, no una especificació exacta del robot.

#### Fase 4 · Apliquem i millorem (10 min)

Canvieu una variable, repetiu les mesures i trieu la configuració que complisca el criteri del mapa. Documenteu el valor que ha funcionat en aquesta superfície.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** mapa, valors de prova, desviació aproximada i configuració triada.

**Pregunta docent:** quina variable hem aïllat per entendre millor el gir?

### **L23 · Gir i obstacles (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Afegiu al mapa una targeta d’obstacle tou i ample. Predigueu on hauria d’aturar-se o canviar de direcció el robot sense tocar l’objecte.

#### Fase 2 · Explorem i construïm (10 min)

Programeu una ruta tancada amb un punt de gir i una condició de parada. Useu un sensor frontal només si el seu comportament s’ha verificat al model; altrament, simuleu la detecció amb una targeta o un botó i etiqueteu-la com a simulació.

#### Fase 3 · Expliquem i registrem (10 min)

Proveu la ruta lliure i la ruta amb la targeta, mantenint la mateixa posició inicial. Observeu si el robot s’atura abans de l’obstacle i registreu qualsevol contacte o desviació.

#### Fase 4 · Apliquem i millorem (10 min)

Ajusteu una condició a la vegada i repetiu la prova. La persona observadora pot aturar manualment el programa; ningú no col·loca dits davant de les rodes ni del sensor.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** esquema de la condició, casos amb/sense obstacle i límit del sensor.

**Pregunta docent:** com distingim una detecció real del sensor d’una entrada simulada?

### **L24 · Segueix la línia (40 min).**

#### Fase 1 · Activem i prediem (5 min)

Dibuixeu una línia d’alt contrast amb inici, corba i final. Predigueu quina lectura del sensor inferior permetrà distingir línia i superfície, i com ho comprovaríeu.

#### Fase 2 · Explorem i construïm (10 min)

Verifiqueu que el Rocky del centre disposa del sensor i del bloc de seguiment compatibles. Calibreu amb la línia i el fons reals; si el sensor o la versió no són disponibles, completeu el mateix algorisme amb entrades simulades i declareu-ho.

#### Fase 3 · Expliquem i registrem (10 min)

Proveu el programa en un tram recte curt i registreu lectures sobre la línia i fora d’ella. Afegiu la corba només després que la regla bàsica funcione; manteniu una zona d’aturada lliure.

#### Fase 4 · Apliquem i millorem (10 min)

Canvieu el llindar o la velocitat, una variable cada vegada, i repetiu el tram. Compareu el recorregut amb un algorisme en paper i expliqueu qualsevol desviació.

#### Fase 5 · Comprovem i reflexionem (5 min)

**Evidència:** calibratge, codi o pseudocodi, resultats i alternativa en paper.

**Pregunta docent:** quin cas de prova ens ha confirmat que el robot distingia la línia del fons?
## 🧰 Maquinari, programari i dependències

Codey Rocky, ordinador amb versió compatible de mBlock, cable USB o connexió provada i materials plans de cartó. Useu exclusivament mòduls integrats comprovats en la unitat: botons, pantalla, indicador RGB, altaveu, sensor de so/llum, potenciòmetre, giroscopi, emissor/receptor IR i sensor de color/distància del xassís, segons el model i firmware. Les activitats L21–L24 necessiten el Rocky i el seu sensor corresponent; si no està disponible, feu el mateix algorisme en simulació. Neuron queda fora d’aquesta adaptació.

## 🛡️ Seguretat, privacitat i inclusió

Limiteu les proves mòbils a una taula estable o pista tancada sense vores, cablatge ni obstacles durs. El sensor de so no registra ni identifica veus. Oferiu botons o teclat com a alternatives al giroscopi, codi en paper quan hi haja dificultats de connexió i funcions equivalents per a qui no manipule el robot.

## 🧪 Evidències i avaluació

Al llarg de les 24 sessions, cada parella conserva un guió de disseny, pseudocodi, programa, taula de proves i canvi justificat. El museu final incorpora instruccions accessibles, una demostració i una nota que explica què mesura cada sensor i què no pot concloure. S’avaluen descomposició, seqüència, bucles, condicions, variables, funcions, depuració, prova i col·laboració.

## 🔗 Repertori oficial adaptat

Aquesta seqüència adapta les 24 lliçons CSTA publicades per Makeblock: [The Secret of Codey Rocky](https://www.makeblock.com/pages/codey-rocky-robot-toys-for-kids), *Press Buttons to Change Emotions*, *To Be an Animation Designer*, *Identify the Bug*, *The Steamed Bread Can’t Jump*, *The Jumping Steamed Bread*, *The Racing Game I/II*, *Volume Bar*, *Good Morning! Functions*, *The Tiny Patroller I/II*, *The Squirrel’s Nuts Box*, *Mathematical Operations*, *The Bomb*, *Rock-Paper-Scissors*, *My Speedway*, *Game Control Schemes*, *Game Mechanics I/II*, *Fast and Furious*, *Make a Turn*, *Make a Turn Avoid Obstacles* i *Line-Following Car*. Cada repte s’ha reinterpretat amb materials i context propis. Les fitxes consultables directament s’enllacen a la [pàgina oficial del curs CSTA](https://www.makeblock.com/pages/codey-rocky-robot-toys-for-kids): [L1](https://res-us.makeblock.com/doc/course/Codey%20Rocky/Lesson%2001%20The%20Secret%20of%20Codey%20Rocky_Sheet.pdf), [L3](https://res-us.makeblock.com/doc/course/Codey%20Rocky/Lesson%2003%20To%20Be%20an%20Animation%20Designer_Sheet.pdf), [L4](https://res-us.makeblock.com/doc/course/Codey%20Rocky/Lesson%2004%20Identify%20the%20Bug_Sheet.pdf), [L13](https://res-us.makeblock.com/doc/course/Codey%20Rocky/Lesson%2013%20The%20Squirrel%E2%80%99s%20Nuts%20Box_Sheet.pdf), [L14](https://res-us.makeblock.com/doc/course/Codey%20Rocky/Lesson%2014%20Mathematical%20Operations_Sheet.pdf), [L15](https://res-us.makeblock.com/doc/course/Codey%20Rocky/Lesson%2015%20The%20Bomb_Sheet.pdf), [L17](https://res-us.makeblock.com/doc/course/Codey%20Rocky/Lesson%2017%20My%20Speedway_Sheet.pdf) i [L18](https://res-us.makeblock.com/doc/course/Codey%20Rocky/Lesson%2018%20Game%20Control%20Schemes_Sheet.pdf). Els objectius del curs separat [Codey Rocky & Neuron Discovery](https://support.makeblock.com/hc/en-us/articles/25494707612823-Codey-Rocky-Neuron-Discovery) només s’usen com a comprovació complementària per a L1–L16; no es barregen els dos repertoris.

Makeblock publica a banda el curs [Codey Rocky & Neuron Discovery](https://support.makeblock.com/hc/en-us/articles/25494707612823-Codey-Rocky-Neuron-Discovery), de 34 lliçons. Només s’hi podran adaptar unitats compatibles amb la dotació quan es confirme quins components Neuron hi ha disponibles; aquesta fitxa no els pressuposa.
