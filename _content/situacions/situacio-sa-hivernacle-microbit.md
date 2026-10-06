---
title: El Microclima del Racó Verd
description: Què ens poden explicar la llum i la temperatura sobre el racó on creix una planta, i com podem convertir les observacions en una recomanació de cura?
robot: microbit
cycles:
- segon-cicle
cycle_label: Segon cicle
theme: sostenibilitat
subject: medi
duration: 5 sessions
order: 8
---

## ❓ Repte o Pregunta Guia

Quines condicions de llum i temperatura observem al racó verd, i quines dades necessitem abans de proposar un canvi per a la planta?
{: .sa-challenge }

<figure class="sa-illustration">
  <img src="assets/imatges/sa-hivernacle-microbit.webp" alt="Una placa micro:bit de la dotació al costat d'una planta en un test i una targeta d'observació." width="600" height="448" loading="lazy">
  <figcaption>La placa ajuda a mostrar lectures que l'equip anota i interpreta; la planta continua sota la cura de les persones.</figcaption>
</figure>

## Intenció d'aprenentatge

Investigar una variable ambiental del centre, fer observacions repetides amb micro:bit i explicar què indiquen i què no indiquen les dades. L'equip prepararà una recomanació argumentada per a la cura d'una planta sense automatitzar el reg.

Sabrem que avancem quan l'equip:

- distingeix una dada mesurada d'una explicació possible;
- anota hora, lloc i condicions per poder comparar lectures;
- representa una sèrie de mesures en una taula o gràfic;
- formula una recomanació amb prudència i identifica la dada que li falta.

## 🏆 Aprenentatges que hi conflueixen

- Ciències: observació de plantes i relació entre condicions ambientals i creixement.
- Matemàtiques: mesura, unitats, taules, representació gràfica i comparació.
- Tecnologia: lectura de sensors integrats, seqüències i condicions en MakeCode.
- Sostenibilitat: cura responsable i ús raonat dels recursos.

La micro:bit incorpora una aproximació de temperatura del processador i pot usar la matriu LED per estimar llum; no incorpora un sensor d'humitat del sòl. Qualsevol sensor de sòl és un accessori addicional i requereix connexió compatible.

## Materials i preparació

- Una micro:bit de la dotació, portapiles o cable i editor MakeCode.
- Una planta adequada al centre, etiqueta de lloc i quadern de camp.
- Opcional: termòmetre de referència o sensor extern de sòl compatible, si el centre ja en disposa.
- Paper quadriculat o full de càlcul per representar les mesures.

No situeu la placa ni les connexions on puguen mullar-se. La lectura de temperatura de la placa és aproximada i es pot alterar per l'escalfament del dispositiu; useu-la per comparar condicions de manera prudent, no com a instrument de laboratori.

## 📅 Itinerari de cinc sessions

### Sessió 1 · Conéixer la planta i preguntar

Trieu una planta del centre i consulteu les seues necessitats amb una font fiable o amb la persona responsable de l'hort. Observeu el lloc, la llum al llarg del dia i les rutines de cura. Formuleu una pregunta que es puga investigar sense canviar encara el reg.

- Evidència: fitxa de planta amb pregunta, lloc i predicció inicial.
- Pregunta docent: «Quines condicions podem observar i quines encara no sabem mesurar?»

### Sessió 2 · Llegir la llum amb micro:bit

Programeu la matriu LED perquè mostre una lectura de llum o un nivell simplificat. Compareu la placa en dos llocs i repetiu les lectures amb la mateixa orientació. Anoteu data, hora i si hi havia ombra o llum directa.

- Evidència: taula de tres o més lectures i anotació de condicions.
- Recordatori: la placa aprofita la matriu LED per estimar llum; no és un sensor separat de precisió.

### Sessió 3 · Explorar la temperatura aproximada

Mostreu la lectura de temperatura i compareu-la amb un termòmetre de referència, si n'hi ha. Deixeu estabilitzar la placa, manteniu-la allunyada de mans o fonts de calor durant la comparació i expliqueu que el valor depén del processador.

- Evidència: parell de lectures i reflexió sobre diferències possibles.
- Pregunta docent: «Quin canvi podem atribuir a l'entorn i quin pot vindre del mateix dispositiu?»

### Sessió 4 · Interpretar les dades i recomanar

Organitzeu les lectures en un gràfic senzill. Compareu-les amb la informació de la planta i prepareu una recomanació revisable: moure el test, observar un altre dia o preguntar a la persona responsable. No programeu un reg automàtic amb dades incompletes.

- Evidència: gràfic amb unitat o escala i proposta justificada.
- Si es disposa d'un sensor extern de sòl, tracteu-lo com una extensió i calibreu-lo amb mostres segures.

### Sessió 5 · Tornar a mesurar i compartir

Repetiu les lectures en el lloc triat i compareu-les amb la predicció. Presenteu què ha canviat, quina dada continua faltant i qui hauria de validar una acció sobre la planta.

- Evidència: comparació inicial/final i una conclusió que reconeix incerteses.

## 📋 Criteri d'Avaluació Curricular

Observa si l'alumnat planteja una pregunta investigable, recull dades repetibles, representa els resultats i formula una recomanació proporcionada a l'evidència disponible. Afegeix-hi els criteris curriculars vigents del nivell.
{: .assessment }

## Abans de començar

Busqueu una planta del centre que es puga observar durant unes setmanes i definiu quina dada voleu relacionar amb el seu entorn. Consulteu què necessita aquesta espècie abans de proposar canvis: no hi ha un llindar universal de llum, temperatura o reg.

## 🧭 Evidències que recollirem

- Quadern amb data, hora, lloc i condicions de cada observació.
- Programa que mostre la variable i una taula o gràfic de les lectures.
- Comparació entre predicció i dades, amb una recomanació revisable.
- Reflexió sobre la precisió i el límit dels sensors emprats.

## ♿ Dades fiables i cura de l'equip

Compareu dos punts de mesura i repetiu lectures abans d'extreure una conclusió. Manteniu les plaques, els cables i les connexions elèctriques fora de l'aigua; no deixeu el dispositiu a l'hort sense supervisió.

## 🔁 Extensió

Com a ampliació, compareu la llum en tres zones o en diferents hores. L'equip presenta la recomanació amb les dades i la persona responsable de la planta decideix si cal fer cap canvi.

## 🔗 Referent consultat

La proposta es basa en les funcions integrades descrites per la [guia oficial dels sensors micro:bit](https://microbit.org/get-started/features/sensors/). Les lliçons de [Helping plants grow](https://microbit.org/teach/lessons/?selected=helping-plants-grow) poden inspirar preguntes d'investigació; el prototip local es limita a les variables que realment pot mesurar la placa disponible.
