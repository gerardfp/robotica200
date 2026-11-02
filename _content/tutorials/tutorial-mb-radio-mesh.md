---
title: 'micro:bit: enviar un número per ràdio'
description: Fer que dues plaques intercanvien un número de prova sense utilitzar Wi-Fi.
robot: microbit
level: Intermedi
duration: 45 min
order: 3
image: _assets/tutorials/mb-radio-mesh.png
---

## 🎯 Repte i objectius

Fes que una placa envie el número 7 i que una altra el mostre. Després canvia el grup d’una de les plaques i observa què passa. És una comunicació local: no cal Wi-Fi i no és una conversa de veu.

- Posar dues plaques en el mateix grup de ràdio.
- Enviar un número de prova i mostrar-lo a l’altra placa.
- Comprovar què passa quan canvia el grup.

## 🧰 Materials i preparació

- 2 o més plaques micro:bit amb portapiles
- Ordinador amb MakeCode per preparar i transferir un programa a cada placa.
- Full de registre per anotar grup, missatge enviat i missatge rebut.

Prepareu un programa emissor i un de receptor. Si l’aula té més de dues plaques, assigneu un grup diferent a cada parella per evitar rebre els missatges de la resta.

## 🧩 Funcions del robot treballades

- Ràdio integrada per enviar i rebre missatges dins d’un grup configurat.
- Comunicació per ràdio entre plaques sense Wi-Fi; és difusió local, no un canal privat ni un servei meteorològic.

## 👣 Seqüència guiada

### 1. Fixar el grup de ràdio

Al bloc 'a l'iniciar', afegeix 'ràdio: fixa grup a [7]'. Totes les plaques del mateix equip han de compartir grup.

### 2. L'emissor

A la primera placa, posa «ràdio: fixa grup a 7» a **en iniciar**. Dins de «en prémer el botó A», afegeix «ràdio: envia número 7». Descarrega aquest programa a la placa emissora:

```makecode
radio.setGroup(7)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(7)
})
```

### 3. El receptor a l'aula

A la segona placa, posa també el grup 7 a **en iniciar**. Afegeix «en rebre número per ràdio» i, dins, «mostra el número» rebut. Descarrega aquest altre programa a la placa receptora. Fes aquesta càrrega abans de prémer A a l’emissora:

```makecode
radio.setGroup(7)
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber)
})
```

La [referència oficial de recepció per ràdio](https://makecode.microbit.org/reference/radio/on-received-number) mostra la peça de recepció i enllaça la d'enviament i la de grup.

> **💡 Consell docent per a la sessió:** Assigna un número de grup diferent a cada taula (Grup 1, Grup 2, etc.) perquè les ràdios no es barregin els missatges.

## 🧪 Prova, depura i reflexiona

Prem A cinc vegades a l'emissora i compta quantes vegades apareix el 7 a la receptora. Deixa que el número acabe de mostrar-se abans de tornar a prémer. Després canvia només el grup de la receptora, descarrega-li el programa i repeteix. Torna al grup 7 en acabar.

### Preguntes per comprovar

- Com sabeu a qui pertany un missatge?
- Què passaria si dos equips comparteixen el grup?
- Pot rebre'l algú que no esperàvem?

## ♿ Accessibilitat i seguretat

Evita enviar dades personals. Una activitat amb missatges públics simulats funciona també sense wi-fi; proporciona les plaques ja carregades si l'objectiu és el protocol.

## ✅ Evidències d’aprenentatge
- Còpia dels dos programes, amb el grup de ràdio anotat.
- Registre dels cinc intents amb el mateix grup i dels intents amb grups diferents.
- Una frase que explique per què el grup de ràdio no fa privat el missatge.

## 🔗 Fonts oficials i límits

micro:bit · Features overview · [https://microbit.org/get-started/features/overview/](https://microbit.org/get-started/features/overview/). Consulteu aquesta documentació per distingir les funcions del model base de les que depenen de complements, accessoris o versions de programari.
