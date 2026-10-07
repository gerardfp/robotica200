---
active: true
title: "Un provador de materials"
description: "Com podem escriure un algorisme i programar un prototip segur per classificar materials conductors?"
robot: "microbit"
robot_label: "micro:bit"
cycle: "segon-cicle"
cycle_label: "Segon cicle"
subject: "medi"
subject_label: "Ciències, Matemàtiques i Tecnologia"
theme: "ciencia"
theme_label: "Materials i circuits"
duration: "5 sessions"
challenge: "Com podem usar una entrada de micro:bit i una condició per investigar quins materials condueixen electricitat?"
---

![Una placa micro:bit al costat de mostres seques de paper, plàstic, fusta i paper d’alumini per a una investigació de conductivitat.](../../_assets/imatges/sa-mb-provador-conductivitat.webp)

_La prova és de baixa tensió i només usa mostres aïllades i circuits revisats pel docent._

## 🌱 Situació i intenció

El taller de ciències vol saber quins materials podrien formar part d’un interruptor senzill per a una maqueta. L’alumnat compara circuits de baixa tensió, representa decisions amb diagrames de flux i programa una entrada perquè micro:bit mostre una icona. La situació adapta les cinc lliçons oficials de *Electrical conductors*; els materials es proven com a mostres, no com a objectes connectats a instal·lacions elèctriques.

## 🎯 Aprenentatges i vocabulari

- Formular una predicció sobre la conductivitat d’una mostra segura i registrar les condicions de prova.
- Construir un circuit de baixa tensió i descriure l’entrada i l’eixida de micro:bit.
- Programar una selecció condicional i provar materials coneguts, secs i no perillosos.
- Distingir el resultat del prototip de l’evidència científica i rebutjar proves amb endolls, líquids o materials desconeguts.

## 📅 Seqüència didàctica · 5 sessions

### **Sessió 1 · Selecció i conductivitat (Selection & conductivity investigation).**

Amb un circuit escolar de baixa tensió ja revisat pel docent, observeu què passa quan el circuit inclou un material conductor o aïllant. Identifiqueu entrada, procés i eixida i escriviu una regla “si… aleshores…” que descriga la resposta. No canvieu connexions mentre el circuit està alimentat.

### **Sessió 2 · Caixes de decisió (Decision boxes).**

Convertiu la regla en un diagrama de flux amb una caixa de decisió: si el circuit tanca, mostrar una icona; altrament, mostrar-ne una altra. Un altre equip segueix el diagrama pas a pas i assenyala instruccions ambigües.

### **Sessió 3 · Entrades i eixides de micro:bit (Inputs).**

Exploreu amb MakeCode els botons i, si la placa i els accessoris ho permeten, les entrades dels pins. Relacioneu el canvi de pin amb una eixida LED. Dibuixeu el circuit de prova abans de tocar connexions i identifiqueu quines parts són internes i quines externes.

### **Sessió 4 · Construir i depurar el provador (Making a conductivity tester).**

Només amb un muntatge aprovat i revisat pel docent, proveu mostres seques i separades, com paper, plàstic, fusta o una làmina menuda d’alumini. Programeu la lectura d’entrada amb selecció, registreu resultats i depureu el codi amb una mostra coneguda conductora i una d’aïllant. Si falta l’accessori segur, simuleu els valors d’entrada amb els botons.

### **Sessió 5 · Revisió i reflexió (Review & reflection).**

Desmunteu el prototip amb l’alimentació desconnectada. Escriviu de nou l’algorisme en passos menuts i marqueu les entrades, condicions i eixides. Compareu el diagrama inicial amb el programa final i expliqueu què caldria controlar per repetir la prova de manera justa.

## 🧰 Materials i condicions

BBC micro:bit, MakeCode, mostres menudes, seques i aïllades, pinces/ponts adequats i el circuit protector especificat pel fabricant o pel centre. Les pinces de cocodril i components externs només s’usen si formen part de la dotació i el docent ha verificat el muntatge. Sense aquests materials, feu la prova amb simulació de botons i diagrames.

## 🧪 Evidències i avaluació

Recolliu circuit esquemàtic, diagrama de flux, taula de prediccions, codi amb condició, resultats de dues mostres conegudes i revisió de depuració. Valoreu si l’algorisme es pot seguir, si les entrades i eixides estan identificades i si les conclusions es limiten a les mostres i condicions provades.

## Quadern d'investigació

Abans de tocar el muntatge, cada equip dibuixa el circuit previst i identifica font d'energia, camí conductor, punt on s'interromp el circuit, entrada de micro:bit i eixida LED. En una taula, registreu nom genèric de la mostra, predicció, resultat observat, repetició i possible causa d'error. Useu peces de mida semblant i subjecteu-les sempre pels mateixos punts quan siga possible. Una prova inconsistent es marca com a «no concloent»; no s'esborra perquè no encaixe amb la predicció.

En el diagrama de flux, la pregunta de decisió ha de tindre dues eixides etiquetades, «sí» i «no». Una parella executa l'algorisme amb targetes de valors simulats abans de connectar cap circuit. Això permet trobar una branca sense resposta i comprovar que cada resultat activa una icona diferent. En la sessió de MakeCode, comenceu amb una condició i una eixida LED, després afegiu-hi una segona mostra i una rutina de reinici perquè les proves no arrosseguen el valor anterior.

## Depuració i lectura de resultats

Si dues mostres semblen donar la mateixa resposta, reviseu per separat el programa i el muntatge: la lectura d'entrada canvia quan es tanca el circuit?, la pinça toca una superfície neta?, el programa mostra l'eixida després de llegir el pin?, s'ha reiniciat entre casos? Canvieu una variable per prova i anoteu el resultat. La conclusió es limita als objectes provats i a les condicions del circuit escolar; no es generalitza automàticament a totes les peces del mateix material ni a productes reals.

Com a ampliació desconnectada, doneu a l'equip targetes «circuit obert/tancat» i feu que seguisca el diagrama de decisió. També es pot comparar el resultat amb una predicció inicial i explicar quin tipus de dada addicional ajudaria a confiar més en la prova. No cal manipular cap component per demostrar la comprensió dels algorismes.

## Rols i protocol de seguretat

Assigneu rols de lector/a del diagrama, encarregat/da de les mostres, observador/a del LED i registrador/a. Només l'adult connecta o revisa el prototip si les peces no són específicament compatibles o el grup no pot verificar el muntatge. Manteniu mans i taula seques, treballeu amb baixa tensió, desconnecteu l'alimentació abans de canviar mostres i no connecteu mai la micro:bit a la xarxa elèctrica. Si no hi ha accessori de protecció adequat, substituïu tota la prova física per dades simulades; el repte d'entrades, condicions i fluxos continua complet.

## ⚡ Seguretat elèctrica

Només s’utilitzen circuits educatius de baixa tensió i accessoris compatibles, amb revisió del docent. Mai connecteu la placa a la xarxa elèctrica ni uniu directament els pins d’alimentació 3V i GND. No proveu líquids, cossos, piles, endolls, aparells, objectes connectats ni materials calents o tallants. Desconnecteu abans de canviar mostres i manteniu-ho tot sec.

## 🔗 Unitat oficial adaptada

Aquesta situació adapta les cinc lliçons de micro:bit [Electrical conductors](https://microbit.org/teach/lessons/electrical-conductors-unit-of-work/): investigació de circuits i selecció, caixes de decisió, exploració d’entrades, provador programat amb MakeCode i reflexió desconnectada. El context del taller, la selecció de mostres i els criteris són propis.
