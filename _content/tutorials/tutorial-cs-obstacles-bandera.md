---
title: Coding Set: obstacles, banderes i rutes alternatives
description: Planificar una ruta del MatataBot que evite obstacles i arribe a una bandera, provar-la i depurar els girs.
robot: coding-set
level: Intermedi
duration: 45 min
order: 5
image: _assets/tutorials/cs-obstacles-bandera.png
---

## 🎯 Repte i objectius

Planifiqueu un camí perquè MatataBot arribe a una bandera sense passar per un obstacle. En aquesta activitat el robot no el detecta ni l’esquiva automàticament: sou vosaltres qui decidiu la ruta.

En acabar, cada equip podrà:

- descriure inici, destinació i caselles prohibides;
- construir una seqüència de moviments que evite les peces d’obstacle;
- comprovar si la ruta arriba a la bandera i corregir-la amb una prova cada vegada;
- explicar per què «girar a l’esquerra» no vol dir «desplaçar-se cap a l’esquerra».

## 🧰 Materials i preparació

- Coding Set de la dotació: MatataBot, Control Tower, tauler de control, mapa, fitxes de moviment i bandera.
- Obstacles inclosos amb el conjunt; confirmeu que són les peces del kit base del vostre centre.
- Targetes o quadrícula de paper per a planificar una ruta abans de col·locar les fitxes.
- Registre de predicció, prova i correcció.

Connecteu la torre, el tauler i el robot. Poseu una targeta d’obstacle davant del punt d’inici i una bandera dues caselles més enllà. Deixeu lliure una columna a la dreta per passar-hi. El Sensor Add-on no és necessari per a aquesta pràctica.

## 🧩 Funcions del robot treballades

- Lectura del programa físic per la Control Tower i transmissió al MatataBot.
- Ordres direccionals: avançar, retrocedir i girar 90° a dreta o esquerra.
- Bandera com a destinació visible i obstacles físics com a restriccions de la ruta.
- Execució seqüencial i depuració d’un programa tangible.

## 👣 Seqüència guiada

### 1. Llegiu el mapa des del punt de vista del robot

Poseu MatataBot a l’inici, mirant cap a l’obstacle i la bandera. Dibuixeu les tres posicions en una graella. Assenyaleu la dreta del robot: els girs depenen de cap a on mira.

### 2. Planifiqueu una ruta amb fletxes

Seguiu amb el dit aquesta ruta sobre la graella abans de col·locar les peces. Un gir canvia cap a on mira el robot, però no l’avança:

**Dreta → Endavant → Esquerra → Endavant → Endavant → Esquerra → Endavant**

El recorregut passa pel costat de la targeta i torna a la columna de la bandera. Abans d'usar el robot, seguiu les fletxes amb el dit i comproveu que hi ha prou espai a la graella.

![Kit Matatalab Coding Set real amb el MatataBot, la torre, fitxes de moviment, obstacles i una bandera en una ruta sobre el tauler.](../../_assets/tutorials/cs-obstacles-bandera.png)

_La il·lustració representa el kit Coding Set de la dotació. Les peces d’obstacle i la bandera delimiten la ruta; no són sensors ni ordres programables._

### 3. Traduïu el pla a fitxes físiques

Col·loqueu les fitxes en l’ordre de lectura del tauler. Reviseu cada moviment assenyalant alhora la fitxa i el tram dibuixat. Un company o companya farà de verificador/a: comprovarà que no hi ha un gir confós amb un moviment lateral i que la seqüència acaba quan MatataBot arriba a la bandera.

### 4. Executeu i observeu el trajecte

Poseu el robot a l’inici amb la mateixa orientació que al dibuix i executeu el programa. No mogueu els obstacles mentre es desplaça. En arribar a la bandera, confirmeu si ha seguit el camí previst; si topa amb una peça o passa de llarg, atureu la prova, localitzeu la primera diferència i torneu al tauler de control.

### 5. Depureu canviant una sola instrucció

Si el resultat no és el previst, reviseu la primera fitxa que no correspon a la ruta, canvieu-la i torneu a provar des de l’inici. Si ja funciona, busqueu una altra ruta. El Sensor Add-on és un complement diferent: les barreres del kit base no detecten res.

## 🧪 Prova, depura i reflexiona

Feu la ruta i anoteu si arriba a la bandera. Repetiu-la des de la mateixa posició; després proveu una ruta alternativa. Si cal una correcció, anoteu la fitxa canviada i el resultat.

### Preguntes per comprovar

- Quines caselles representen restriccions i quina representa la destinació?
- En quin moment un gir canvia l’orientació sense canviar de casella?
- Quin error concret heu trobat i quina única fitxa heu modificat?
- El MatataBot ha detectat l’obstacle o l’hem evitat perquè nosaltres hem planificat la ruta?
- Podeu arribar a la mateixa bandera amb una seqüència diferent?


## ♿ Accessibilitat i seguretat

Es pot fer la planificació amb una quadrícula gran, pictogrames o peces tàctils abans de transferir-la al tauler. Repartiu rols rotatius: cartògraf/a, programador/a, verificador/a i observador/a. Si manipular les peces menudes és difícil, una persona pot dictar la seqüència i una altra col·locar-la. Manteniu dits i cables fora del recorregut del robot; no forceu el moviment ni presenteu la ruta com una detecció automàtica d’obstacles.

## ✅ Evidències d’aprenentatge
- Deseu el mapa anotat, la seqüència de fitxes, el registre de les tres proves i una breu explicació de la correcció. La fotografia és opcional; enquadreu només el material i eviteu cares, noms i veus. L’evidència ha de deixar clar quines decisions ha pres l’alumnat i quines accions ha executat el robot.

## 🔗 Fonts oficials i límits

La lliçó oficial [Get to Know Matatalab Coding Set](https://matatalab.com/en/node/60) inclou obstacles i banderes en l’inventari del conjunt; [Hello, Matatalab Robots!](https://matatalab.com/en/node/88) treballa la bandera com a destinació i les ordres de moviment. Aquesta guia adapta aquests elements a un repte propi de planificació i depuració. Les peces físiques no detecten obstacles: la detecció amb fitxes «Obstacle/No Obstacle» pertany al Sensor Add-on, que és un complement diferent.
