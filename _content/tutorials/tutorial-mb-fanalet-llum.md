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

Per usar aquest exemple, obri la pestanya **JavaScript** de MakeCode, copia el text i torna a **Blocs** per veure les peces.

```javascript
basic.forever(function () {
    if (input.lightLevel() < 100) {
        basic.showIcon(IconNames.SmallDiamond)
    } else {
        basic.clearScreen()
    }
})
```

### 3. Provar i calibrar

Descarrega el programa o usa el simulador. Anota la lectura aproximada en un lloc clar i en un altre més fosc. Tapa suaument la matriu amb la mà i observa què passa. Ajusta el llindar perquè el canvi tinga sentit en l’espai de l’aula. La primera lectura pot ser zero mentre s'activa el sensor; espera i torna a observar abans de decidir el valor.

> **💡 Consell docent:** els LED que mostren la icona també s’utilitzen per estimar la llum. Comprova el comportament amb la placa concreta del centre i deixa un breu interval entre lectures si la pantalla parpelleja.

### 4. Dissenyar una versió pròpia

Canvia la lluna per una estrella, una casa o un símbol creat per l’alumnat. Si la placa queda connectada a un portapiles, col·loca-la de manera estable i sense tapar-la completament amb materials que puguen escalfar-se.

## 🧪 Prova, depura i reflexiona

Prova la placa en un lloc clar i després tapa-la suaument. Anota quan apareix el dibuix. La lectura va de 0 (molt fosc) a 255 (molt clar): si el canvi no es veu, ajusta el valor 100 i torna a provar sense canviar l’orientació de la placa.

### Preguntes per comprovar

- Quina diferència heu mesurat entre els dos espais?
- Què passa si el llindar és més alt? I si és més baix?
- Com podem saber si el canvi és causat per la llum o per haver mogut la placa?


## ♿ Accessibilitat i seguretat

Facilita un projecte inicial amb el bucle preparat i deixa que cada parella trie la icona o el llindar. Com a extensió, recolliu cinc lectures per espai i compareu-les; manteniu la placa en la mateixa orientació per fer una comparació més justa.

## ✅ Evidències d’aprenentatge
- Guardeu el projecte MakeCode, la taula de lectures i una explicació del llindar final. La placa només mostra llum en la seua matriu; no és una llum potent per il·luminar una habitació.

## 🔗 Fonts oficials i límits

Proposta pròpia inspirada en [Nightlight de micro:bit](https://www.microbit.org/projects/make-it-code-it/nightlight/) i en la documentació de [lectura del nivell de llum de MakeCode](https://makecode.microbit.org/reference/input/light-level). El recurs oficial explica que la matriu LED actua com a sensor i recomana ajustar el llindar a les condicions locals.

micro:bit · Features overview · [https://microbit.org/get-started/features/overview/](https://microbit.org/get-started/features/overview/). Consulteu aquesta documentació per distingir les funcions del model base de les que depenen de complements, accessoris o versions de programari.
