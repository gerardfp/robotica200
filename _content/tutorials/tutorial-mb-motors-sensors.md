---
title: 'micro:bit: llegir un sensor extern'
description: Provar la lectura d’un sensor compatible al pin P0 i explorar un servomotor opcional.
robot: microbit
level: Intermedi
duration: 50 min
order: 2
image: _assets/tutorials/mb-motors-sensors.png
---

## 🎯 Repte i objectius

Connecta un sensor d’humitat compatible a P0 i observa com canvia la lectura quan el sensor està sec o humit. El servo és una ampliació opcional i es prova en una activitat diferent.

- Connectar el sensor segons l’esquema del fabricant.
- Mostrar i comparar lectures en dues condicions conegudes.
- Explorar un servomotor opcional amb els components i les instruccions adequats.

## 🧰 Materials i preparació

- micro:bit amb portapiles
- Sensor d'humitat compatible amb micro:bit i instruccions de connexió del fabricant.
- Servomotor i placa auxiliar amb alimentació adequada, si el centre en disposa.
- Cables indicats per les instruccions dels components.

## 🧩 Funcions del robot treballades

- Pins GPIO com a interfície per a un sensor resistiu i un servomotor externs.
- Aquests elements no formen part de la placa micro:bit: cal una alimentació, interfície i muntatge compatibles; no alimenteu el servo des del pin de 3 V.

## 👣 Seqüència guiada

### 1. Comproveu el sensor i els cables

Abans de connectar res, identifica el model exacte del sensor i llig-ne l’esquema. Amb la placa sense alimentació, connecta senyal a P0 i els altres cables als pins que indique el fabricant. No uses aquesta activitat si no tens l’esquema o si el sensor necessita una placa auxiliar que falta.

### 2. Llegir el valor analògic

En MakeCode, posa «mostra el número» dins de «per sempre». En l'espai del número, col·loca la peça de **lectura analògica del pin P0**, disponible a Pins. Així veuràs la lectura del sensor a la pantalla.

```makecode
basic.forever(function () {
    basic.showNumber(pins.analogReadPin(AnalogPin.P0))
})
```

Anota la lectura amb el sensor sec i després amb el sensor humit tal com indica el seu fabricant. No submergisques la placa ni els cables. Sense sensor, prova el programa al simulador, però marca el resultat com a simulat.

La [referència oficial de lectura d'un pin](https://makecode.microbit.org/reference/pins/analog-read-pin) mostra la peça i un exemple de lectura en pantalla.

### 3. Provar un servo opcional

Si tens un servo i una placa auxiliar compatibles, segueix-ne la guia per alimentar-los i provar un moviment curt. Primer acorda quin valor correspon a cada condició del sensor: no tots responen igual. El muntatge és una maqueta; no connectes aigua a l'electrònica.

> **💡 Consell docent:** Si falta algun component o no tens les seues instruccions, mostra les lectures en pantalla i deixa el servo per a una altra sessió.

## 🧪 Prova, depura i reflexiona

Anota dues lectures del sensor en les condicions indicades pel fabricant i compara-les. Si no canvien, revisa el port i les connexions amb l’alimentació desconnectada. Si no tens sensor, fes la prova al simulador i marca les lectures com a simulades.

### Preguntes per comprovar

- Quins dos valors has observat i en quines condicions?
- Què comprovaràs si la lectura no canvia?
- Has provat un sensor real o el simulador?

## ♿ Accessibilitat i seguretat

Una persona pot llegir la pantalla i una altra anotar les lectures. Manteniu l’aigua allunyada de la micro:bit, els cables i la placa auxiliar; mulleu només el sensor de la manera indicada pel fabricant. Desconnecteu l’alimentació abans de canviar cables. El servo no és necessari per a aquesta prova.

## ✅ Evidències d’aprenentatge
- L'esquema de connexió, les dues lectures i una nota que indique si són reals o simulades. Si has provat el servo, anota també què ha fet.

## 🔗 Fonts oficials i límits

micro:bit · Features overview · [https://microbit.org/get-started/features/overview/](https://microbit.org/get-started/features/overview/). Consulteu aquesta documentació per distingir les funcions del model base de les que depenen de complements, accessoris o versions de programari.
