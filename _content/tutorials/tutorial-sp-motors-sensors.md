---
title: 'Motors i sensors: Tren d''engranatges i sensor de color'
description: Construir una transmissió amb engranatges i provar una parada en detectar una línia vermella.
robot: spike
level: Intermedi
duration: 50 min
order: 2
image: _assets/tutorials/sp-motors-sensors.png
---

## 🎯 Repte i objectius

Construïu una transmissió amb engranatges i relacioneu les voltes del motor amb el moviment de les rodes. Després, feu que la base s’ature en detectar una targeta roja.

- Explicar que l’engranatge de 8 dents fa tres voltes per cada volta del de 24.
- Fer avançar una base amb dos motors fins que el sensor detecte una targeta roja.
- Utilitzar el sensor de color en mode detecció de color directe.

## 🧰 Materials i preparació

- Hub SPIKE
- Base mòbil amb dos motors angulars i rodes, o muntatge equivalent de la guia LEGO.
- 1 sensor de color
- Peces Technic i engranatges

## 🧩 Funcions del robot treballades

- Motors angulars amb engranatges i sensor de color SPIKE Prime.
- Lectura de color per condicionar una parada; llindars i orientació depenen del muntatge.

## 👣 Seqüència guiada

### 1. Munteu els engranatges

Munteu els engranatges de 8 i 24 dents de manera que encaixen i giren sense encallar-se. Amb el Hub apagat, gireu el menut una volta i observeu el gran: en aquest muntatge, el menut ha de fer tres voltes perquè el gran en faça una. La relació canvia si canvieu la mida o la posició dels engranatges.

### 2. Connecteu els motors i el sensor

Connecteu el motor esquerre al port B, el dret al D i el sensor de color al C. Fixeu el sensor al davant, mirant cap a terra i prou prop per llegir la targeta sense tocar-la. En SPIKE App, seleccioneu B i D com a motors de la base.

### 3. Condició de parada

Programeu la base perquè avance a velocitat baixa i s’ature quan el sensor C detecte el color roig. En SPIKE App, seleccioneu els motors B i D abans d’afegir la condició:

```spikeapp
quan comença el programa
activa els motors [B v] i [D v] a velocitat baixa
espera fins que el sensor de color [C v] detecte [vermell v]
atura els motors [B v] i [D v]
```

Aquest dibuix resumeix les ordres: selecciona els blocs equivalents de SPIKE App. Posa el robot darrere de la targeta roja i prem iniciar. La parada pot quedar un poc més enllà de la línia perquè el robot continua avançant mentre la detecta.

> **💡 Consell docent per a la sessió:** Abans de provar, demaneu: «Quantes voltes farà l’engranatge menut mentre el gran en fa una?» Després, comproveu-ho amb el Hub apagat.

## 🧪 Prova, depura i reflexiona

Prova primer el sensor quiet sobre una targeta blanca i una roja, a la mateixa altura. Després executa el vehicle tres vegades des del mateix punt i observa on s'atura. Si no detecta la línia, comprova el port C, l'altura del sensor i la il·luminació abans de repetir.

### Preguntes per comprovar

- Quins colors s'han detectat en les mateixes condicions?
- Què passa quan canviem llum o distància?
- Quina lectura ha activat el canvi de moviment i quina variable heu mantingut constant?

## ♿ Accessibilitat i seguretat

Comenceu amb una velocitat baixa, una targeta roja ampla i un trajecte curt. Una persona pot observar el sensor i una altra marcar el punt on s’atura. Manteniu mans i cables lluny de les rodes i atureu el Hub abans de canviar la targeta o l’orientació del sensor.

## ✅ Evidències d’aprenentatge
- Muntatge amb engranatges i ports anotats.
- Programa de parada i registre del punt d’aturada en tres intents.
- Explicació senzilla de la diferència entre les voltes del motor i les de la roda.

## 🔗 Fonts oficials i límits

Les [especificacions oficials de SPIKE Prime](https://education.lego.com/it-it/product-resources/spike-prime/downloads/technical-specifications/) descriuen el motor angular i el sensor de color. La parada depén de la posició, l’altura i la llum de l’aula; proveu primer amb una targeta ampla i una velocitat baixa.
