---
active: true
title: "Sis projectes per a la biblioteca"
description: "Com podem crear sis projectes de micro:bit per a una biblioteca escolar i programar-los amb blocs o Python?"
robot: "microbit"
robot_label: "micro:bit"
cycle: "segon-cicle"
cycle_label: "Segon cicle"
subject: "llengua"
subject_label: "Llengua, Matemàtiques i Tecnologia"
theme: "art"
theme_label: "Lectura i creació digital"
duration: "6 sessions"
challenge: "Com podem combinar entrades, eixides, sensors i aleatorietat per crear sis projectes útils i lúdics per a la biblioteca?"
---

![Una placa micro:bit entre llibres il·lustra un laboratori de projectes digitals per a la biblioteca escolar.](../../_assets/imatges/sa-mb-raco-lectura.webp)

_Una mateixa placa dona lloc a sis projectes; la ruta es pot programar amb blocs o amb Python._

## 🌱 Situació i intenció

La biblioteca escolar obri un laboratori de projectes digitals per explicar què pot fer una micro:bit. Cada sessió resol un repte curt amb una eixida, una entrada, una estructura de control o un sensor. Els projectes parteixen de la unitat oficial *First lessons with MakeCode and the micro:bit*; es pot repetir la ruta amb el curs paral·lel de Python. Les paraules i personatges dels exemples són ficticis: no es mostren noms ni emocions reals de l’alumnat.

## 🎯 Aprenentatges i vocabulari

- Identificar l’entrada i l’eixida de cadascun dels sis projectes de biblioteca.
- Programar una insígnia, una animació, un comptador o un joc amb seqüència, bucle, botó, sensor o aleatorietat.
- Comparar una versió amb blocs i una versió Python mantenint el mateix objectiu i els mateixos casos de prova.
- Dissenyar prototips amb contingut fictici, sense guardar dades personals de lectores o visitants.

## 📅 Seqüència didàctica · 6 sessions

### **Sessió 1 · Identificador fictici (Name badge).**

Programeu una paraula inventada o una icona per comprendre instruccions, seqüència, càrrega del programa i matriu LED. Expliqueu què és entrada i què és eixida. Per a la via Python, situeu-vos en l’editor i feu que la placa mostre un símbol propi.

### **Sessió 2 · Animació amb bucle (Beating heart).**

Creeu dues imatges senzilles que alternen per donar sensació de batec o moviment. Ajusteu la durada i useu un bucle per repetir-les; compareu la versió repetida amb instruccions escrites una per una.

### **Sessió 3 · Insígnia amb entrada (Emotion badge).**

Dissenyeu dues icones fictícies de preferència lectora i alterneu-les amb els botons A/B. Tracteu el botó com una entrada i la matriu com una eixida; les icones representen personatges inventats, no estats emocionals de companys.

### **Sessió 4 · Comptador de recorreguts (Step counter).**

Feu una ruta curta per la maqueta de prestatgeries amb una fitxa mòbil i compareu-la amb un comptador de sacsejades de la placa. Definiu l’algorisme, incrementeu una variable i proveu quins moviments falsos compten com a pas. El recompte descriu la prova del model, no l’activitat d’una persona.

### **Sessió 5 · Senyal que respon a la llum (Nightlight).**

Useu la lectura de llum disponible per encendre una icona quan el nivell baixa del llindar acordat. Calibreu-la en dos llocs de la biblioteca i canvieu la condició si hi ha falsos activaments. La matriu LED és un senyal visible, no una llum per llegir un llibre ni un dispositiu de seguretat.

### **Sessió 6 · Joc de mans (Rock, paper, scissors).**

Useu el gest “sacsejar” o un botó per iniciar una simulació amb nombre aleatori, variable i selecció. Comproveu que totes les opcions poden aparéixer al cap de moltes proves i parleu de què significa justícia en una simulació. El resultat és un joc, no una predicció.

## 💻 Dues vies de programació

MakeCode permet construir els sis projectes amb blocs i transferir-los a la placa. La ruta Python recorre els mateixos objectius amb codi textual: mostrar text/icones, bucles d’animació, lectura de botons, variables de recompte, condicions de llum i nombres aleatoris. En cada sessió, l’alumnat pot comparar el diagrama de blocs amb una versió Python preparada pel docent o adaptada a l’editor vigent; la situació no substitueix els tutorials específics de sintaxi.

## 🧪 Evidències i avaluació

Guardeu sis programes breus o captures impreses, el diagrama d’entrada-procés-eixida, una taula de proves i una revisió final de la ruta. Valoreu l’ordre dels passos, l’ús de bucles, variables i condicions, la depuració i si el grup pot explicar què limita cada projecte.

## Guió comú per als sis prototips

En cada sessió, seguiu la mateixa rutina: llegir la targeta del repte, dibuixar una predicció, construir o programar una primera versió, provar dos casos, anotar una diferència i fer una revisió. La micro:bit és l'objecte d'estudi; no necessita quedar permanentment instal·lada a la biblioteca ni mostrar informació d'usuaris. Cada fitxa de projecte indica quina entrada rep, quin procés aplica i quina eixida s'observa.

### **Insígnia fictícia:**

useu un nom inventat de personatge, una paraula comuna o una icona. Compareu text i imatge a la matriu LED i expliqueu per què un missatge llarg pot desplaçar-se.

### **Animació:**

dibuixeu dos fotogrames, decidiu-ne l'ordre i compareu una animació amb pausa curta i una de pausa més llarga. La repetició del bucle ha de correspondre amb el guió visual.

### **Insígnia d'opcions:**

representeu dos personatges ficticis amb botons A i B. Una persona provadora prem cada botó i comprova si apareix la icona prevista; no s'infereixen emocions de ningú.

### **Comptador de maqueta:**

una fitxa recorre un plànol de prestatgeries i el grup compara el recompte manual amb un programa d'entrada de moviment. Registreu falses deteccions i reinicieu la variable entre assaigs.

### **Indicador de llum:**

col·loqueu la placa en dos punts de prova i ajusteu un llindar local. Proveu lectura baixa, lectura alta i una situació de frontera; expliqueu que l'eixida no il·lumina prou per llegir ni certifica la il·luminació.

### **Joc aleatori:**

proveu les tres opcions del joc en una seqüència de casos, incloent el mínim i el màxim del rang. Comproveu que la condició associa cada nombre amb una eixida i que cap opció ha quedat sense correspondència.

## Comparar MakeCode i Python sense duplicar la dificultat

Per a qui ja estiga preparat per a codi textual, mostreu un únic projecte equivalent en blocs i Python i associeu cada part visible amb la instrucció textual corresponent. Manteniu els objectius de la sessió estables: primer la lògica i la prova, després la sintaxi. El docent pot proporcionar un esquelet de codi perquè la classe complete una línia o una condició; la situació no pressuposa experiència prèvia en Python ni un editor concret.

En acabar, cada equip tria un dels sis prototips i el presenta en una targeta amb repte, entrada, eixida, dos casos provats i una limitació. La classe pot muntar una petita exposició de projectes amb plaques desconnectades o simulacions, sense recollir dades personals dels visitants.

## 🧰 Materials, versions i inclusió

BBC micro:bit, MakeCode o Python Editor, llibres i targetes de la maqueta. Confirmeu les funcions de la placa i l’entorn, especialment el sensor de llum i l’acceleròmetre. Si sacsejar o observar LED parpellejant no és accessible, oferiu botó, targeta estàtica o simulació. Cap activitat necessita guardar dades d’alumnes.

## ♿ Participació, accessibilitat i seguretat

Si sacsejar la placa, mirar LED intermitents o llegir codi textual no és accessible per a alguna persona, oferiu una targeta estàtica, un botó o un programa de mostra equivalent. La via Python és opcional i no condiciona l’accés als mateixos objectius. Els prototips de lectura usen identificadors ficticis i no guarden dades de visitants.

## 🔗 Unitats oficials adaptades

La seqüència cobreix els sis projectes de micro:bit [First lessons with MakeCode and the micro:bit](https://microbit.org/teach/lessons/first-lessons-with-makecode-and-the-microbit/): *Name badge*, *Beating heart*, *Emotion badge*, *Step counter*, *Nightlight* i *Rock, paper, scissors*. La mateixa seqüència ofereix la via paral·lela de [First lessons with Python and the micro:bit](https://microbit.org/teach/lessons/first-lessons-with-python-and-the-microbit/), que reutilitza aquests sis projectes per introduir codi textual. La narrativa de biblioteca i les proves són pròpies.
