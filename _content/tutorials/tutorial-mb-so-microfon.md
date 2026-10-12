---
title: 'Micròfon i so: Detector de soroll i aplaudiments (V2)'
description: Utilitzar el micròfon MEMS de la versió 2 per controlar el nivell de decibels de l'aula o encendre
  un llum en picar de mans.
robot: microbit
level: Iniciació
duration: 35 min
order: 4
image: _assets/tutorials/mb-so-microfon.png
---

## 🎯 Repte i objectius

Dissenya un indicador que reaccione al nivell sonor de l’entorn i compare lectures en condicions diferents. La proposta identifica la versió de la placa abans d’utilitzar el micròfon, disponible de manera integrada en micro:bit V2.

- Calibrar el nivell de soroll ambiental de l'aula.
- Crear un semàfor de silenci que mostri una icona d'alerta si hi ha massa xivarri.
- Reproduir melodies d'èxit amb l'altaveu integrat.

## 🧰 Materials i preparació

- micro:bit V2 (amb micròfon i altaveu integrats)
- Ordinador amb MakeCode i cable USB per transferir el programa.
- Espai on provar sons breus a volum moderat; una placa V1 necessita un perifèric extern compatible.

## 🧩 Funcions del robot treballades

- Micròfon i LED indicador, lectura del nivell de so i altaveu integrat en micro:bit V2.
- No reconeix paraules ni mesura decibels calibrats; en V1 cal un perifèric extern per a aquestes entrades/eixides de so.

## 👣 Seqüència guiada

### 1. Esdeveniment d'aplaudiment

En una placa micro:bit V2, el micròfon integrat permet provar l’esdeveniment «quan s’escolta un so fort». Fes servir eixe bloc per canviar l’estat d’una variable `llum` entre encés i apagat; en V1 aquesta funció requerix un mòdul extern compatible.

### 2. Mesurador continu de decibels

Fes que una barra de LEDs s'ompli proporcionalment al nivell de so ambiental (0 a 255).

### 3. Alarma acústica

Si el nivell de so supera el llindar que heu calibrat durant més de tres segons, fes sonar un to breu amb l’altaveu integrat de V2 per indicar que cal baixar el volum. El valor no mesura decibels calibrats ni identifica qui ha parlat.

> **💡 Consell docent per a la sessió:** Els nens i nenes aprendran a autoregular el volum de treball cooperatiu mirant el semàfor.

## 🧪 Prova, depura i reflexiona

Identifica primer si les plaques són V2 i comprova el micròfon i el bloc disponible al programari. A continuació, tria sons voluntaris i mesura'n la resposta per separat.

### Preguntes per comprovar

- La placa detecta parla o només nivells de so?
- Què passa si varia el soroll de fons?
- Quin nivell s’ha llegit en silenci i quin després del so, i quantes vegades heu repetit cada mesura?

## ♿ Accessibilitat i seguretat

La sessió no necessita enregistrar veus ni reconèixer paraules. Permet que qui ho prefereixi activi la prova amb un senyal visual o un so generat per l'adult.

## ✅ Evidències d’aprenentatge
- Dues mesures de so en condicions definides i una explicació de què pot detectar aquest muntatge. Afegeix també un breu relat de les proves o una fotografia del procés del kit, evitant registrar noms, cares o veus si no cal per a l'activitat.

## 🔗 Fonts oficials i límits

micro:bit · Features overview · [https://microbit.org/get-started/features/overview/](https://microbit.org/get-started/features/overview/). Consulteu aquesta documentació per distingir les funcions del model base de les que depenen de complements, accessoris o versions de programari.
