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

Connecta un sensor compatible a la micro:bit i mostra la seua lectura a la pantalla. Si el centre també disposa d’un servo i de l’alimentació adequada, podràs provar-ne el moviment per separat.

- Mostrar i comparar dues lectures del sensor.
- Llegir un sensor extern compatible connectat a P0.
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

### 1. Cablejar els pins

Amb l'alimentació desconnectada, segueix l'esquema del fabricant del sensor i de la placa auxiliar. Connecta l'eixida de senyal del sensor a P0 només si és compatible amb la micro:bit. Si no disposes de l'esquema o dels components adequats, fes la pràctica al simulador sense connectar el sensor.

### 2. Llegir el valor analògic

En MakeCode, posa «mostra el número» dins de «per sempre». En l'espai del número, col·loca la peça de **lectura analògica del pin P0**, disponible a Pins. Així veuràs la lectura del sensor a la pantalla.

Per usar aquest exemple, obri la pestanya **JavaScript** de MakeCode, copia el text i torna a **Blocs** per veure les peces.

```javascript
basic.forever(function () {
    basic.showNumber(pins.analogReadPin(AnalogPin.P0))
})
```

Anota dues lectures del sensor en les condicions indicades pel fabricant. Sense sensor, la lectura del simulador és una prova del programa, no una mesura real.

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

Simula primer l'entrada de la humitat amb nombres en pantalla. Reserva la connexió del motor per a grups que segueixin l'esquema de la placa auxiliar del centre.

## ✅ Evidències d’aprenentatge
- L'esquema de connexió, les dues lectures i una nota que indique si són reals o simulades. Si has provat el servo, anota també què ha fet.

## 🔗 Fonts oficials i límits

micro:bit · Features overview · [https://microbit.org/get-started/features/overview/](https://microbit.org/get-started/features/overview/). Consulteu aquesta documentació per distingir les funcions del model base de les que depenen de complements, accessoris o versions de programari.
