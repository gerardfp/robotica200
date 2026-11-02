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

Feu que una placa envie el número 7 i que una altra el mostre. Després canvieu el grup d’una placa i observeu què passa. És una comunicació local: no cal Wi-Fi i no transmet veu.

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

### 1. Prepareu i envieu el missatge

A la placa emissora, poseu «ràdio: fixa grup a 7» a **en iniciar**. Dins de «en prémer el botó A», afegiu «ràdio: envia número 7». Descarregueu el programa. Totes les plaques de la parella han d’usar el mateix grup.

```makecode
radio.setGroup(7)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(7)
})
```

### 2. Prepareu el receptor i feu la prova

A la segona placa, poseu també el grup 7 a **en iniciar**. Afegiu «en rebre número per ràdio» i, dins, «mostra el número» rebut. Descarregueu aquest altre programa a la placa receptora abans de prémer A a l’emissora:

```makecode
radio.setGroup(7)
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber)
})
```

La [referència oficial de recepció per ràdio](https://makecode.microbit.org/reference/radio/on-received-number) mostra la peça de recepció i enllaça les peces d’enviament i de grup.

> **💡 Consell docent per a la sessió:** Assigneu un grup diferent a cada taula perquè les plaques d’un equip no reben els missatges de les altres parelles.

## 🧪 Prova, depura i reflexiona

Premeu A cinc vegades a l’emissora i compteu quantes vegades apareix el 7 a la receptora. Deixeu que el número acabe de mostrar-se abans de tornar a prémer. Després canvieu només el grup de la receptora, descarregueu-li el programa i repetiu la prova. Torneu al grup 7 en acabar.

### Preguntes per comprovar

- Com sabeu a qui pertany un missatge?
- Què passaria si dos equips comparteixen el grup?
- Pot rebre'l algú que no esperàvem?

## ♿ Accessibilitat i seguretat

No envieu dades personals: qualsevol placa del mateix grup pot rebre el missatge. Si l’objectiu és practicar el protocol, prepareu les plaques abans de la sessió perquè cada equip puga centrar-se en enviar i rebre.

## ✅ Evidències d’aprenentatge
- Còpia dels dos programes, amb el grup de ràdio anotat.
- Registre dels cinc intents amb el mateix grup i dels intents amb grups diferents.
- Una frase que explique per què el grup de ràdio no fa privat el missatge.

## 🔗 Fonts oficials i límits

La [guia oficial de funcions de micro:bit](https://microbit.org/get-started/features/overview/) descriu la ràdio integrada i la diferència amb Bluetooth. La ràdio d’aquest exemple envia un número al grup configurat; no és privada i no necessita connexió a Internet.
