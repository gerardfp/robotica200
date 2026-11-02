---
title: 'micro:bit: un fanalet que respon a la llum'
description: Llegir la llum ambiental amb la matriu LED i encendre una icona quan l’entorn s’enfosqueix.
robot: microbit
level: Iniciació
duration: 35 min
order: 5
image: _assets/tutorials/mb-fanalet-llum.png
---
## 🎯 Repte i objectius

![Placa BBC micro:bit amb la matriu LED parcialment tapada per comprovar la lectura de llum.](_assets/imatges/microbit-fanalet.webp)

Construeix un fanalet que responga a la llum ambiental i ajusta el llindar amb proves en espais diferents. La matriu LED de micro:bit pot funcionar alhora com a eixida visual i com a sensor de llum.

- Entendre que la matriu LED també pot llegir la llum ambiental.
- Utilitzar una lectura de sensor dins d’una condició i un bucle.
- Ajustar un llindar a partir de proves en diferents espais.

## 🧰 Materials i preparació

- Placa BBC micro:bit (V1 o V2) o simulador MakeCode.
- Ordinador amb navegador i MakeCode.
- Portapiles opcional per a les proves fora de l’ordinador.

## 🧩 Funcions del robot treballades

- Matriu 5 × 5 com a eixida LED i sensor de llum ambiental.
- Lectura del nivell de llum i condicional amb llindar calibrat.

## 👣 Seqüència guiada

### 1. Crear el projecte

Obri MakeCode, crea un projecte nou i comprova la simulació. El projecte oficial de referència anomena la lectura «light level»; en MakeCode, cerca la lectura del nivell de llum a la categoria Entrada.

### 2. Fer que el fanalet decidisca

Dins de «per sempre», posa una peça «si… aleshores… si no». En la condició, compara **nivell de llum < 100**. Dins de «aleshores», afegeix una icona; dins de «si no», posa «neteja la pantalla». La lectura de llum és a **Entrada** i la comparació a **Lògica**. El valor 100 és un punt de partida que ajustareu després.

```makecode
basic.forever(function () {
    if (input.lightLevel() < 100) {
        basic.showIcon(IconNames.SmallDiamond)
    } else {
        basic.clearScreen()
    }
})
```

### 3. Provar i calibrar

Per saber quin valor convé posar, guarda el fanalet i crea **un altre projecte de prova**. En «en prémer el botó A», posa «mostra el número» amb «nivell de llum» dins:

```makecode
input.onButtonPressed(Button.A, function () {
    basic.showNumber(input.lightLevel())
})
```

Descarrega aquest projecte a la placa. Prem A i anota el número en un lloc clar; repeteix fent ombra suaument a la matriu. La primera lectura pot ser zero mentre s’activa el sensor: torna a prémer A per comprovar-la.

Torna a obrir el projecte del fanalet i posa un valor entre les dues lectures. Per exemple, si has anotat 30 amb ombra i 150 amb llum, prova amb 90. Descarrega’l i comprova que la icona apareix quan fas ombra.

> **💡 Consell docent:** els LED que mostren la icona també s’utilitzen per estimar la llum. Comprova el comportament amb la placa concreta del centre i deixa un breu interval entre lectures si la pantalla parpelleja.

### 4. Dissenyar una versió pròpia

Canvia el diamant per una estrella, una casa o un símbol creat per l’alumnat. Si la placa queda connectada a un portapiles, col·loca-la de manera estable i sense tapar-la completament amb materials que puguen escalfar-se.

## 🧪 Prova, depura i reflexiona

Prova la placa en un lloc clar i després tapa-la suaument. Anota quan apareix el dibuix. La lectura va de 0 (molt fosc) a 255 (molt clar): si el canvi no es veu, ajusta el valor 100 i torna a provar sense canviar l’orientació de la placa.

### Preguntes per comprovar

- Quina diferència heu mesurat entre els dos espais?
- Què passa si el llindar és més alt? I si és més baix?
- Com podem saber si el canvi és causat per la llum o per haver mogut la placa?


## ♿ Accessibilitat i seguretat

Facilita un projecte inicial amb el bucle preparat i deixa que cada parella trie la icona o el llindar. Com a extensió, recolliu cinc lectures per espai i compareu-les; manteniu la placa en la mateixa orientació per fer una comparació més justa.

## ✅ Evidències d’aprenentatge
- Projecte del fanalet i projecte de prova de la llum.
- Dues lectures anotades i una explicació del valor triat entre aquestes.
- Prova de la icona amb llum i amb ombra. La matriu no il·lumina una habitació.

## 🔗 Fonts oficials i límits

Proposta pròpia inspirada en [Nightlight de micro:bit](https://www.microbit.org/projects/make-it-code-it/nightlight/) i en la documentació de [lectura del nivell de llum de MakeCode](https://makecode.microbit.org/reference/input/light-level). El recurs oficial explica que la matriu LED actua com a sensor i recomana ajustar el llindar a les condicions locals.

La proposta està adaptada de [Nightlight de micro:bit](https://www.microbit.org/projects/make-it-code-it/nightlight/) i usa el bloc oficial [nivell de llum](https://makecode.microbit.org/reference/input/light-level). La lectura va de 0 a 255 i pot variar segons la llum i la posició de la placa.
