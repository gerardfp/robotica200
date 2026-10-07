---
active: true
title: "El laboratori de sensors de Codey Rocky"
description: "Dotze reptes per explorar els botons, la matriu LED, l'infraroig, el potenciòmetre, el sensor de color i el giroscopi de Codey Rocky."
robot: "codey-rocky"
robot_label: "Codey Rocky"
cycle: "tercer-cicle"
cycle_label: "Tercer cicle"
subject: "tecnologia"
subject_label: "Tecnologia, Matemàtiques i Ciències"
theme: "tecnologia"
theme_label: "Sensors i interacció"
duration: "12 sessions"
challenge: "Com pot Codey Rocky percebre senyals del seu entorn i convertir-los en respostes que siguen útils, clares i comprovables?"
---

![Codey Rocky observa targetes de colors i una roda de selecció mentre mostra una expressió a la pantalla LED.](../../_assets/imatges/sa-cr-entrades-sensors.webp)

_El laboratori combina els components integrats de Codey amb materials de prova de l'aula._

## 🧩 Repte i context

La classe obri un laboratori d'interacció per a una exposició tecnològica del centre. En cada repte, un equip tria una entrada, anticipa què llegirà Codey Rocky, programa una resposta i comprova-la amb casos diferents. Les dotze sessions adapten lliçons públiques de *Codey Rocky & Neuron Discovery* que utilitzen botons, matriu LED, infraroig, potenciòmetre, sensor de color o giroscopi integrats. El curs original també conté reptes que necessiten mòduls Neuron; s'identifiquen al final i no es pressuposen ací.

## 🧪 Seqüència de reptes

### **Sessió 1 · *Find the Blue Dot*.**

Fem un tauler de coordenades amb una quadrícula de paper. Un botó inicia el repte; la matriu LED mostra un punt o una fletxa que indica una cel·la. Provem què ocorre si el programa rep una pulsació curta, una de llarga o cap entrada, i documentem la diferència entre llegir el botó i actualitzar la pantalla.

### **Sessió 2 · *Lucky Wheel*.**

Creem una roda de decisions amb opcions neutres —per exemple, quin repte cooperatiu provar— i usem el botó per iniciar i aturar una seqüència de selecció en la matriu. Repetim moltes vegades i comptem resultats: distingim una animació d'una selecció realment aleatòria i parlem de per què les freqüències observades poden variar.

### **Sessió 3 · *Codey Rocky Can Do Addition*.**

Programem un comptador de dues entrades d'infraroig: cada detecció vàlida en una finestra de prova aporta una unitat al registre corresponent. Sumem els dos recomptes, mostrem el resultat i comparem-lo amb el recompte manual. Abans, comprovem quin esdeveniment IR pot generar realment el model i l'equipament disponible; no interpretem lectures no documentades com a distàncies calibrades.

### **Sessió 4 · *Jump! Codey!*.**

En una maqueta de joc de paper, l'infraroig actua com a senyal d'activació: quan el programa rep l'entrada acordada, Codey canvia la icona de la pantalla i Rocky executa un moviment breu. Fem una pista segura i comparem el programa amb i sense pausa, explicant què detecta el sensor i què és només una regla del joc.

### **Sessió 5 · *RC Car*.**

Explorem la transmissió i recepció IR per comandar una ruta de repartiment sobre una quadrícula. Amb dos Codey Rocky, un equip envia ordres i l'altre les rep; intercanvien rols i registren ordres perdudes o repetides. Calen dos dispositius IR compatibles per a la prova entre robots; si només n'hi ha un, es fa la mateixa seqüència alternant el control amb un comandament IR compatible disponible, sense presentar una simulació en paper com a prova de transmissió.

### **Sessió 6 · *When Codey Meets Codey*.**

Amb dos robots, dissenyem una conversa d'icones breu: l'emissor envia una ordre o missatge i el receptor respon amb una expressió LED. Definim un codi compartit, provem missatges vàlids i invàlids, i identifiquem què cal perquè emissor i receptor interpreten igual el senyal. Si la dotació només permet un robot, documentem i assagem el protocol en targetes, deixant clar que la comunicació física queda pendent d'un segon dispositiu.

### **Sessió 7 · *Volume Control*.**

Llegim el potenciòmetre integrat com a control graduat i fem que la seua posició regule el volum d'un senyal de so breu o, si el model/configuració no disposa de so utilitzable, la freqüència d'una animació LED. Anotem valors mínim, intermedi i màxim i convertim la lectura a una escala comprensible sense afirmar que siga una mesura normalitzada.

### **Sessió 8 · *Number Guessing*.**

El potenciòmetre selecciona una conjectura d'un rang menut; el botó la confirma i la matriu mostra pistes de «més», «menys» o «encert». Provem els extrems, els valors repetits i un rang diferent. Expliquem la relació entre lectura analògica, conversió a enter i condicions del programa.

### **Sessió 9 · *I'm a Good Guesser*.**

Rocky llig targetes de colors i les classifica per a una galeria del pati. Recollim diverses lectures per targeta, fixem condicions de llum i posició i comprovem si una regla de classificació funciona amb targetes que no s'han utilitzat per ajustar-la. El color llegit pel sensor depén de la superfície i de la il·luminació; no el tractem com una etiqueta infal·lible.

### **Sessió 10 · *Stoplight*.**

Construïm una maqueta de pas escolar amb targetes de color. Quan Rocky detecta la targeta acordada, el programa canvia l'estat LED i mostra també una forma o patró diferenciat. Revisem els casos límit i expliquem que és un prototip didàctic: no controla trànsit real ni substitueix senyalització accessible homologada.

### **Sessió 11 · *Sensing Motions*.**

Investiguem què comuniquen els valors del giroscopi quan inclinem suaument Codey en diferents direccions. Fem una posició inicial de referència, registrem eixos i canvis i creem una visualització per a una maqueta d'edifici accessible. Distingim orientació relativa, moviment i posició absoluta; no fem girar ni deixem caure el robot.

### **Sessió 12 · *Jumping Game 2.0*.**

Programem un joc curt governat per una inclinació detectada pel giroscopi: el personatge de la matriu evita obstacles i suma punts amb una regla comprensible. Ajustem el llindar perquè el repte no exigisca gestos bruscos i oferim una alternativa amb botons per a qui la preferisca. Tanquem amb una prova d'usabilitat i una explicació de com el sensor transforma moviment en dades.

## 🎯 Aprenentatges i vocabulari

- Identificar les entrades disponibles de Codey Rocky i relacionar-les amb una resposta del programa.
- Construir una prova repetible que compare la predicció amb la lectura observada.
- Interpretar dades de botons, infraroig, color, llum o giroscopi sense atribuir-los capacitats que no tenen.
- Documentar errors, límits del sensor i una decisió de disseny basada en evidències.


## 🧰 Materials, accessibilitat i límits

Cal Codey Rocky, mBlock en una versió compatible, paper, targetes de color, quadrícula i material tou per a la maqueta. Les sessions 5 i 6 necessiten dos dispositius amb transmissió/recepció IR compatibles per a completar la comunicació física; sense el segon dispositiu es conserva el disseny de protocol i s'identifica l'assaig com a no executat. El resultat de cada sensor s'ha de verificar al model i al programari disponibles.

El catàleg oficial associa també altres lliçons a interruptors tàctils externs, sensor d'ultrasons i tira LED Neuron. Aquests components no es consideren part del Codey Rocky bàsic d'aquesta proposta. No substituïm eixos reptes per una activitat que fingisca tindre els mòduls: queden marcats per a adaptar-los quan es confirme l'accessori corresponent.

## ♿ Participació, accessibilitat i seguretat

Oferim instruccions orals i visuals, torns de control, opcions amb botons i rols de programació, observació i registre. Evitem gestos bruscos i mantenim el robot sobre una superfície estable; les lectures es comproven al model i al programari disponibles.

## 🎯 Evidències d'aprenentatge

Cada equip lliura sis registres d'entrada i resposta, diagrames o fragments de codi, taules de proves amb casos límit i una explicació d'una limitació del sensor. La mostra final pot ser una demostració presencial, un pòster o una descripció accessible del prototip. Valorem la predicció, la prova repetible, la depuració i la justificació de decisions, no la velocitat ni la competició entre equips.

## 🔗 Font oficial i abast de l'adaptació

La traçabilitat parteix de les lliçons 17, 18 i 21–30 de [Codey Rocky & Neuron Discovery](https://support.makeblock.com/hc/en-us/articles/25494707612823-Codey-Rocky-Neuron-Discovery), segons els títols i objectius publicats per Makeblock. Les lliçons 19–20 (interruptors tàctils), 31–32 (ultrasons) i 33–34 (tira LED) depenen dels mòduls Neuron i queden fora mentre no es confirme que són a la dotació. La pàgina oficial remet a materials docents que requereixen accés de compte; aquesta adaptació crea reptes, seqüència i visuals propis a partir de la informació pública i no afirma reproduir instruccions privades. La llista general de les 24 lliçons CSTA de Codey Rocky es troba en la [pàgina de Codey Rocky de Makeblock](https://www.makeblock.com/pages/codey-rocky-robot-toys-for-kids).
