---
title: 'Primeres passes: MakeCode, matriu de 25 LEDs i polsadors'
description: Com programar la placa des del navegador web MakeCode sense instal·lar cap programa i descarregar l'arxiu
  .hex.
robot: microbit
level: Iniciació
duration: 30 min
order: 1
image: _assets/tutorials/mb-primeres-passes-flat.webp
---

## 🎯 Repte i objectius

Construïu un dau electrònic que reaccione a una sacsejada i mostreu-lo tant al simulador com a la placa. La seqüència presenta MakeCode, l’acceleròmetre (el sensor que detecta canvis de moviment), la matriu de 5 × 5 llums i la transferència del programa.

- Obrir un projecte MakeCode i provar-lo al simulador.
- Mostrar un nombre de l’1 al 6 quan se sacseja la placa.
- Transferir el programa a una micro:bit amb el mètode que ofereix l’ordinador.

## 🧰 Materials i preparació

- micro:bit V1 o V2 i cable USB de dades.
- Ordinador amb navegador i accés a MakeCode.

## 🧩 Funcions del robot treballades

- MakeCode i matriu de 5 × 5 llums LED.
- Sacsejada detectada per l’acceleròmetre en les versions V1 i V2.

## 👣 Seqüència guiada

### 1. Creeu el projecte i el dau

Obriu MakeCode, trieu **Nou projecte** i poseu-li el nom «El meu dau». Abans de connectar la placa, comproveu que el simulador mostra la micro:bit.

En **Entrada**, afegiu «si es sacseja» i, dins, «mostra el número» amb «tria a l’atzar de l’1 al 6». Aquest exemple mostra l’ordre dels blocs:


```makecode
input.onGesture(Gesture.Shake, function () {
    basic.showNumber(randint(1, 6))
})
```

Els noms de les peces poden aparéixer en una altra llengua segons la configuració de MakeCode. La primera detecta la sacsejada i la segona mostra un nombre entre 1 i 6.

### 2. Proveu i transferiu el programa

Sacsegeu la micro:bit del simulador i comproveu que mostra un nombre de l’1 al 6. Per provar-ho amb la placa, connecteu-la per USB i premeu **Descarregar**. Si MakeCode desa un fitxer `.hex`, copieu-lo a la unitat **MICROBIT** i espereu que la transferència acabe abans de desconnectar el cable. Sacsegeu la placa i comproveu el resultat.

> **💡 Consell docent per a la sessió:** Mostreu el simulador de MakeCode: permet provar el programa abans de connectar la placa.

## 🧪 Prova, depura i reflexiona

Feu tres proves al simulador i tres amb la placa, i anoteu els nombres. Comproveu que tots estan entre l’1 i el 6. Si el simulador funciona i la placa no, reviseu que el fitxer s’ha transferit i que heu provat la placa correcta.

### Preguntes per comprovar

- Quina acció fa aparéixer un nombre?
- Quins nombres poden eixir al dau?
- Què pots revisar si no apareix cap nombre?

## ♿ Accessibilitat i seguretat

Proveu primer el dau al simulador. Si sacsejar la placa és difícil, una altra persona pot fer el moviment mentre la parella observa i anota el resultat.

## ✅ Evidències d’aprenentatge
- Projecte desat i taula amb els resultats del simulador i de la placa.

## 🔗 Fonts oficials i límits

La [vista general oficial de micro:bit](https://microbit.org/get-started/features/overview/) descriu els botons, la matriu i els sensors integrats. La sacsejada d’aquesta pràctica es detecta amb l’acceleròmetre de la placa.
