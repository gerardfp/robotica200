---
active: true
title: "Repartiment amb una ruta segura"
description: "Com pot un vehicle programat avançar per una ruta de repartiment i reaccionar davant d’un obstacle previsible?"
robot: "codey-rocky"
robot_label: "Codey Rocky"
cycle: "segon-cicle"
cycle_label: "Segon cicle"
subject: "matematiques"
subject_label: "Matemàtiques i Tecnologia"
theme: "ciutat"
theme_label: "Entorn i mobilitat"
duration: "4 sessions"
challenge: "Com pot un vehicle programat avançar per una ruta de repartiment i reaccionar davant d’un obstacle previsible?"
---

![Codey Rocky recorre una pista baixa de cartró amb una capsa de paper al final.](../../_assets/imatges/sa-cr-repartiment.webp)

_La pista és tancada, baixa i preparada perquè les proves siguen lentes i supervisades._

## 🧩 Repte i context

El grup dissenya un servei de repartiment de joguina entre un punt de preparació, una parada de barri i una destinació com una biblioteca o un hort escolar. Codey Rocky segueix una ruta de baixa velocitat i prova una resposta programada davant d’obstacles de cartró. La maqueta serveix per estudiar decisions i límits d’un sensor; no representa un vehicle segur per a lliuraments reals ni substitueix la supervisió humana.

**Aprenentatges:** planificar un itinerari, controlar una variable, usar una condició, registrar deteccions i errors, revisar un programa i justificar per què un sistema automàtic necessita una persona responsable.

## 📅 Seqüència didàctica · quatre sessions de 45 minuts

### **Dissenyem el mapa de repartiment (45 min).**

Dibuixeu una pista tancada i estable amb un punt de càrrega, una parada i una destinació. Marqueu distàncies amb unitats de paper, trams rectes i llocs on el robot podria girar. Col·loqueu una capsa lleugera de paper només com a símbol de paquet: no la fixeu damunt del robot si pot tapar el sensor o desestabilitzar-lo. En plànol, cada equip traça una ruta i prediu quines accions necessitaria.

Parleu de què vol dir «obstacle» en el model i quina informació no pot donar el robot: no sap si una persona vol travessar, si una zona és privada ni si el paquet ha arribat a una persona concreta. *Evidència:* mapa amb recorregut, punts de parada i dos riscos potencials de la maqueta. *Pregunta docent:* «Què pot fer el robot amb una detecció i quina decisió continua sent nostra?»

### **Establim una línia base (45 min).**

Comproveu el Codey Rocky i l’entorn mBlock 5. Per a usar la detecció d’obstacles del tutorial Makeblock, orienteu cap a davant el sensor IR/color integrat, seguint les instruccions del fabricant; no afegiu sensors que no formen part de la dotació. Creeu un programa de prova curt que inicie el moviment amb el botó A i el pare amb una acció accessible o supervisada. Primer feu-lo circular sense obstacle, a baixa velocitat, en la pista tancada i lliure.

Marqueu el punt d’inici, el temps aproximat i el lloc final. Repetiu la mateixa ruta tres vegades i compareu els resultats. Si la desviació és gran, comproveu superfície, bateria, velocitat i posició abans de canviar el codi. *Evidència:* línia base amb tres registres, velocitat/configuració provada i una observació sobre la variabilitat. *Pregunta docent:* «Quines condicions s’han mantingut igual en les tres proves?»

### **Provem una condició davant d’obstacles (45 min).**

Afegiu un obstacle gran, tou, estable i visible per al sensor, com una paret baixa de cartró. Programeu una condició: quan el sensor detecta l’obstacle, el robot tria un gir a esquerra o dreta i, després de superar-lo, reprén l’avanç. El tutorial oficial descriu aquesta resposta; la direcció aleatòria pot fer que el resultat varie i no garanteix arribar a una destinació concreta. Feu primer una demostració d’una sola detecció i manteniu les mans fora de la ruta mentre el motor està actiu.

Canvieu una variable cada vegada: posició de l’obstacle, angle o distància inicial. Anoteu si s’ha detectat, si el gir l’ha evitat en aquesta prova i si el programa ha continuat endavant. Incloeu casos en què no detecta o reacciona massa prompte; no els oculteu ni els interpreteu com a negligència de qui programa. *Evidència:* taula de proves amb configuració, resposta esperada, resposta real i incidència. *Pregunta docent:* «Quina prova mostra que el sensor pot fallar? Què faríem llavors si hi haguera una persona?»

### **Revisem el servei i comuniquem els límits (45 min).**

Ajusteu el recorregut perquè tinga una zona de gir ampla i cap eixida a terra. Una altra parella executa el mateix protocol sense rebre l’explicació prèvia i comprova si pot reproduir la prova. Reviseu si el programa pot completar el repartiment en més d’una situació i quines fallades requeririen una intervenció humana. Feu una presentació amb el mapa, les dades i una afirmació prudent: per exemple, «en dues de tres proves ha detectat aquesta paret de cartró a aquesta distància».

Tanqueu amb un cartell d’ús responsable: el prototip només funciona dins la pista de prova, sota supervisió i amb obstacles triats pel docent. *Evidència:* programa comentat, plànol revisat, taula de proves i recomanació per a la persona supervisora. *Pregunta docent:* «Què podem afirmar amb les dades i què no podem prometre sobre un robot real?»

## 🎯 Aprenentatges i evidències

Recolliu el plànol, el programa amb comentaris, tres proves de línia base, les observacions amb obstacle i la recomanació final. Observeu si l’alumnat:

- descriu ruta i instruccions abans de moure el robot;

- identifica la condició que activa la resposta i anticipa què hauria de passar;

- separa una detecció correcta d’una falsa alarma o d’un obstacle no detectat;

- canvia una variable a la vegada i usa resultats per depurar;

- explica per què cal supervisió humana i quins límits té el prototip.

Valoreu la qualitat del protocol i la interpretació honesta, no que el robot complete sempre la ruta.

## 🧰 Preparació i seguretat

Verifiqueu que el sensor IR/color està muntat i orientat cap endavant, que el programa mBlock 5 el pot llegir i que la bateria permet proves curtes. Manteniu velocitat baixa, pista delimitada sobre una taula gran o al terra llis, obstacles lleugers i supervisió directa. No proveu prop d’escales, persones en moviment, animals, objectes fràgils o accessos de pas. L’infraroig pot no detectar materials o angles diversos; una absència de detecció no significa que el camí estiga lliure.

## ♿ Variants de participació

Permeteu dissenyar el recorregut en paper abans de manipular el robot i assigneu rols rotatius de planificació, programació, observació, registre i seguretat. Una ruta curta, una ordre per targeta o la lectura en veu alta faciliten la participació sense reduir el repte de raonament. Oferiu taules amb pictogrames per registrar resultats i deixeu que una persona dicte instruccions mentre una altra opera el robot. Qualsevol participant pot optar per observar les proves a una distància còmoda.

## 🔗 Referent oficial adaptat

Hem pres com a punt de partida [Case 18: Codey Rocky avoids obstacles](https://support.makeblock.com/hc/en-us/articles/7463724329879-Case-18-Codey-Rocky-avoids-obstacles). Aquesta situació és una proposta pròpia amb context, seqüència i materials verificables per al centre; no reprodueix ni substitueix el material oficial. Comproveu sempre el model de robot i els accessoris disponibles.
