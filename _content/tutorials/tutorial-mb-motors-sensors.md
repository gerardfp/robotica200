---
title: 'Motors i sensors: Sensor d''humitat i servomotors'
description: Connectar sensors externs als pins de la vora (P0, P1, P2) amb pinces de cocodril per automatitzar
  una alarma de reg.
robot: microbit
level: Intermedi
duration: 50 min
order: 2
image: _assets/tutorials/mb-motors-sensors.png
---

## 🎯 Repte i objectius

- Diferenciar senyals digitals (0 o 1) de senyals analògics continus (0 a 1023).
- Connectar un sensor resistiu casolà amb 2 claus a P0 i GND.
- Controlar l'angle d'un servomotor de 0 a 180 graus des del pin P1.

## 🧰 Materials i preparació

- micro:bit amb portapiles
- 3 cables amb pinces de cocodril
- 1 sensor d'humitat o claus
- 1 mini servomotor 9g

## 🧩 Funcions del robot treballades

- Pins GPIO com a interfície per a un sensor resistiu i un servomotor externs.
- Aquests elements no formen part de la placa micro:bit: cal una alimentació, interfície i muntatge compatibles; no alimenteu el servo des del pin de 3 V.

## 👣 Seqüència guiada

### 1. Cablejar els pins

Connecta el senyal del sensor al pin 0, 3V a l'alimentació i GND a terra.

### 2. Llegir el valor analògic

Programa: 'per sempre' → 'guarda a la variable [humitat] el valor de lectura analògica pin P0'.

### 3. Accionar el servo de reg

Si la humitat és inferior a 300, gira el servomotor a 90 graus per obrir la comporta d'aigua.

> **💡 Consell docent per a la sessió:** Perquè no s'oxidin els claus ràpidament per electròlisi, alimenta el sensor només el mil·lisegon que fas la lectura.

## 🧪 Prova, depura i reflexiona

La placa micro:bit no és per si sola una font adequada per alimentar qualsevol servomotor. Comprova el motor, l'alimentació externa, la connexió de terra comuna i la guia de la placa d'expansió abans de connectar-lo.

### Preguntes per comprovar

- Quina lectura fas servir com a entrada?
- El servomotor rep energia de la placa o d'una alimentació apropiada?
- Com has confirmat la connexió comuna?

## ♿ Accessibilitat i seguretat

Simula primer l'entrada de la humitat amb nombres en pantalla. Reserva la connexió del motor per a grups que segueixin l'esquema de la placa auxiliar del centre.

## ✅ Evidències d’aprenentatge

L'esquema etiquetat, dues lectures repetides i una explicació de la relació entre lectura i moviment. Afegeix també un breu relat de les proves o una fotografia del procés del kit, evitant registrar noms, cares o veus si no cal per a l'activitat.

## 🔗 Fonts oficials i límits

micro:bit · Features overview · [https://microbit.org/get-started/features/overview/](https://microbit.org/get-started/features/overview/). Consulteu aquesta documentació per distingir les funcions del model base de les que depenen de complements, accessoris o versions de programari.
