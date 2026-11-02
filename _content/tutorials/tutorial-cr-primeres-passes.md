---
title: 'Primeres passes: Connexió a mBlock 5 i cares a la matriu LED'
description: Connectar Codey al software de l'ordinador o tauleta i programar animacions facials i missatges lliscants.
robot: codey-rocky
level: Iniciació
duration: 35 min
order: 1
image: _assets/tutorials/cr-primeres-passes.png
---

## 🎯 Repte i objectius

Dibuixa una cara a la pantalla de Codey i fes que aparega quan prems A. Després programa B perquè mostre una salutació.

- Connectar el dispositiu per cable USB o Bluetooth a mBlock 5.
- Dibuixar una cara a la pantalla LED.
- Assignar una resposta als botons A i B.

## 🧰 Materials i preparació

- Controlador Codey de la dotació (Rocky és opcional per a aquesta pràctica).
- Ordinador amb mBlock 5 i cable micro-USB de dades.

## 🧩 Funcions del robot treballades

- Connexió a mBlock 5, pantalla LED 16 × 8 i botons programables A/B.
- Lectura del nivell de bateria disponible a mBlock per comprovar l’estat d’alimentació abans d’una prova.
- Execució en viu i càrrega de codi segons la connexió triada.

## 👣 Seqüència guiada

### 1. Afegir el dispositiu

A mBlock 5, afegeix el dispositiu **Codey**, connecta’l amb el cable i encén-lo. Comprova que l’estat indica que està connectat. Per aquesta primera prova, no cal muntar-lo sobre Rocky.

### 2. Dibuixar una cara somrient

Arrossega el bloc de mostrar una imatge i dibuixa dos ulls i una boca a la graella. Guarda el projecte abans de provar-lo.

### 3. Interacció amb botons

Prepara dues piles separades: quan es prem A, mostra la cara; quan es prem B, mostra el text «Hola».

```mblock
quan es prem el botó [A v]
mostra una cara feliç

quan es prem el botó [B v]
mostra el text [Hola]
```

Busca els blocs equivalents en la teua versió de mBlock: els noms poden variar.

> **💡 Consell docent per a la sessió:** En mode 'En viu', el codi s'executa a l'instant sense haver de carregar el programa cada vegada a la memòria.

## 🧪 Prova, depura i reflexiona

Amb Codey connectat en mode **En viu**, prem A: ha d'aparéixer la cara que has dibuixat. Prem B: ha d'aparéixer «Hola». Repeteix cada prova tres vegades. Si no passa res, comprova la connexió i que cada bloc estiga unit al botó corresponent.

### Preguntes per comprovar

- Què mostra Codey quan prems A?
- Què mostra quan prems B?
- Què revisaràs si un dels botons no respon?

## ♿ Accessibilitat i seguretat

Proporciona una plantilla de la pantalla perquè l’alumnat dibuixe abans de programar. Una persona pot dibuixar la cara i una altra provar els botons. Manteniu el cable allunyat de la zona de pas.

## ✅ Evidències d’aprenentatge
- Projecte amb les dues piles dels botons A i B.
- Dibuix de la cara i registre del resultat de cada botó.

## 🔗 Fonts oficials i límits

Makeblock · Codey Rocky · [About Codey Rocky](https://support.makeblock.com/hc/en-us/articles/1500004392242-About-Codey-Rocky) i [Display the battery level](https://support.makeblock.com/hc/en-us/articles/7462863296535-Case-7-Display-the-battery-level). La lectura depén del bloc disponible en la versió de mBlock instal·lada.
