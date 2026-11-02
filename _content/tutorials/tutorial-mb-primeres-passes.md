---
title: 'Primeres passes: MakeCode, matriu de 25 LEDs i polsadors'
description: Com programar la placa des del navegador web MakeCode sense instal·lar cap programa i descarregar l'arxiu
  .hex.
robot: microbit
level: Iniciació
duration: 30 min
order: 1
image: _assets/tutorials/mb-primeres-passes.png
---

## 🎯 Repte i objectius

Construeix un dau electrònic que reaccione a una sacsejada i mostra’l tant al simulador com a la placa. La seqüència presenta MakeCode, els esdeveniments de l’acceleròmetre, la matriu de 5 × 5 i la transferència del programa.

- Conèixer l'entorn de programació MakeCode i el seu simulador interactiu.
- Crear un dau digital que mostri un número a l'atzar en sacsejar la placa.
- Passar l'arxiu compilat .hex a la unitat micro:bit com si fos un llapis de memòria USB.

## 🧰 Materials i preparació

- Placa micro:bit (V1 o V2)
- Cable micro-USB
- Ordinador amb navegador web

## 🧩 Funcions del robot treballades

- MakeCode, matriu 5 × 5 i botons A/B.
- Gestos detectats per l’acceleròmetre; els components de so integrat només estan presents en micro:bit V2.

## 👣 Seqüència guiada

### 1. Obrir MakeCode

Entra a makecode.microbit.org i crea un projecte nou anomenat 'El meu dau'.

### 2. Programar l'esdeveniment sacsejar

A la categoria 'Entrada', agafa 'si es sacseja' i a dins posa 'mostra el número [tria a l'atzar de l'1 al 6]'.


```makecode
input.onGesture(Gesture.Shake, function () {
    basic.showNumber(randint(1, 6))
})
```

Els noms de les peces poden aparéixer en una altra llengua segons la configuració de MakeCode. La primera detecta la sacsejada i la segona mostra un nombre entre 1 i 6.

### 3. Descarregar a la placa

Connecta la micro:bit per USB i prem el botó 'Descarregar'. En pocs segons el dau funcionarà de manera autònoma.

> **💡 Consell docent per a la sessió:** Recorda als alumnes que el simulador de l'esquerra permet provar el programa abans fins i tot de tenir la placa connectada.

## 🧪 Prova, depura i reflexiona

Sacseja la placa tres vegades i anota els nombres que apareixen. Comprova que tots estan entre l’1 i el 6. Si no apareix cap nombre, revisa la connexió i que has descarregat el programa correcte.

### Preguntes per comprovar

- Quina acció fa aparéixer un nombre?
- Quins nombres poden eixir al dau?
- Què pots revisar si no apareix cap nombre?

## ♿ Accessibilitat i seguretat

Prova primer el dau al simulador. Si sacsejar la placa és difícil, una altra persona pot fer el moviment mentre la parella observa i anota el resultat.

## ✅ Evidències d’aprenentatge
- El programa guardat i els resultats de tres sacsejades.

## 🔗 Fonts oficials i límits

micro:bit · Features overview · [https://microbit.org/get-started/features/overview/](https://microbit.org/get-started/features/overview/). Consulteu aquesta documentació per distingir les funcions del model base de les que depenen de complements, accessoris o versions de programari.
