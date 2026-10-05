---
title: 'Xarxa de ràdio sense fils: Walkie-talkie i sensors remots'
description: Connectar diverses micro:bits de l'aula entre si utilitzant l'antena de ràdio integrada sense necessitat
  de Wi-Fi.
robot: microbit
level: Intermedi
duration: 45 min
order: 3
---

## 🎯 Objectius d'aprenentatge

- Entendre què és un canal de ràdio freqüència i com evitar interferències.
- Enviar paquets de dades (números i cadenes de text).
- Crear una estació meteorològica exterior que envia dades a una pantalla interior.

## 📦 Material necessari

- 2 o més plaques micro:bit amb portapiles

## 👣 Passos de la pràctica a l'aula

### 1. Fixar el grup de ràdio

Al bloc 'a l'iniciar', afegeix 'ràdio: fixa grup a [7]'. Totes les plaques del mateix equip han de compartir grup.

### 2. L'emissor

A la placa de l'hort: 'Quan es prem el botó A' → 'ràdio: envia número [temperatura]'.

### 3. El receptor a l'aula

A la placa de classe: 'en rebre per ràdio [receivedNumber]' → 'mostra el número [receivedNumber]' a la matriu de LEDs.

> **💡 Consell docent per a la sessió:** Assigna un número de grup diferent a cada taula (Grup 1, Grup 2, etc.) perquè les ràdios no es barregin els missatges.

## 🎯 Planifica l'observació

Assegura't que l'emissor i el receptor utilitzen el mateix grup de ràdio; comença enviant una dada inventada des de dos equips separats.

### Preguntes per a la parella

Com sabeu a qui pertany un missatge? Què passaria si dos equips comparteixen el grup? Pot rebre'l algú que no esperàvem?

## ♿ Suport i extensió

Evita enviar dades personals. Una activitat amb missatges públics simulats funciona també sense wi-fi; proporciona les plaques ja carregades si l'objectiu és el protocol.

## ✅ Evidències que pots recollir

Un esquema emissor–receptor, el missatge de prova i una descripció del límit de privadesa. Afegeix també un breu relat de les proves o una fotografia del procés del kit, evitant registrar noms, cares o veus si no cal per a l'activitat.
