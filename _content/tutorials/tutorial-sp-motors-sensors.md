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

Construeix una transmissió amb engranatges i relaciona els graus del motor amb el moviment de les rodes. La prova combina el muntatge físic i la programació del motor angular del Hub SPIKE Prime.

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

Munta un eix que connecte el motor a l'engranatge de 8 dents i aquest al de 24 de la roda. Gira'l a mà amb el Hub apagat i observa que les peces giren sense encallar-se. Amb aquest exemple, el motor gira tres voltes per cada volta de l'engranatge gran.

### 2. Connecteu els motors i el sensor

Connecteu el motor esquerre al port B, el dret al D i el sensor de color al C. Fixeu el sensor a la part davantera, orientat cap a terra i prou prop per llegir la targeta sense tocar-la. En SPIKE App, prepareu la base motriu amb els ports B i D.

### 3. Condició de parada

Programa la base perquè avance a velocitat baixa i s’ature quan el sensor C detecte roig. En la teua versió de SPIKE App, configura la parella de motors B i D abans d’afegir la condició:

```spikeapp
quan comença el programa
activa els motors [B v] i [D v] a velocitat baixa
espera fins que el sensor de color [C v] detecte [vermell v]
atura els motors [B v] i [D v]
```

Aquest dibuix resumeix les ordres: selecciona els blocs equivalents de SPIKE App. Posa el robot darrere de la targeta roja i prem iniciar. La parada pot quedar un poc més enllà de la línia perquè el robot continua avançant mentre la detecta.

> **💡 Consell docent per a la sessió:** Pregunta socràtica: 'Gira més ràpid la roda o el motor?' (El motor gira 3 vegades per cada volta de roda).

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

LEGO Education · SPIKE Prime technical specifications · [https://education.lego.com/it-it/product-resources/spike-prime/downloads/technical-specifications/](https://education.lego.com/it-it/product-resources/spike-prime/downloads/technical-specifications/). Consulteu aquesta documentació per distingir les funcions del model base de les que depenen de complements, accessoris o versions de programari.
