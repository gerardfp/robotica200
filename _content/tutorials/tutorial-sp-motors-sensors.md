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

- Calcular la relació de transmissió entre un engranatge petit de 8 dents i un de gran de 24 dents.
- Moure el motor exactament un nombre de graus o rotacions determinades.
- Utilitzar el sensor de color en mode detecció de color directe.

## 🧰 Materials i preparació

- Hub SPIKE
- 2 motors angulars
- 1 sensor de color
- Peces Technic i engranatges

## 🧩 Funcions del robot treballades

- Motors angulars amb engranatges i sensor de color SPIKE Prime.
- Lectura de color per condicionar una parada; llindars i orientació depenen del muntatge.

## 👣 Seqüència guiada

### 1. Munteu els engranatges

Munta un eix que connecte el motor a l'engranatge de 8 dents i aquest al de 24 de la roda. Gira'l a mà amb el Hub apagat i observa que les peces giren sense encallar-se. Amb aquest exemple, el motor gira tres voltes per cada volta de l'engranatge gran.

### 2. Connectar al port B i D

Connecta els motors als ports B i D, i el sensor de color al port C apuntant cap a terra.

### 3. Condició de parada

Programa: 'Inicia el moviment dels motors' → 'Espera fins que el sensor C sigui [Vermell]' → 'Atura el moviment'.

```spikeapp
quan comença el programa
activa els motors de moviment
espera fins que el sensor de color [C v] detecte [vermell v]
atura els motors de moviment
```

Aquest dibuix resumeix els passos: tria en SPIKE App els blocs equivalents i configura abans la parella de motors B i D. Comença a velocitat baixa. La parada pot quedar un poc més enllà de la línia; no es promet una posició exacta.

> **💡 Consell docent per a la sessió:** Pregunta socràtica: 'Gira més ràpid la roda o el motor?' (El motor gira 3 vegades per cada volta de roda).

## 🧪 Prova, depura i reflexiona

Prova primer el sensor quiet sobre una targeta blanca i una roja, a la mateixa altura. Després executa el vehicle tres vegades des del mateix punt i observa on s'atura. Si no detecta la línia, comprova el port C, l'altura del sensor i la il·luminació abans de repetir.

### Preguntes per comprovar

- Quins colors s'han detectat en les mateixes condicions?
- Què passa quan canviem llum o distància?
- Quina lectura ha activat el canvi de moviment i quina variable heu mantingut constant?

## ♿ Accessibilitat i seguretat

Deixa una targeta de prova de cada color i afegeix un registre de falses lectures. Treballa amb les peces del conjunt que s'utilitza al centre.

## ✅ Evidències d’aprenentatge
- La taula d'assaigs i la condició del programa triada pel grup. Afegeix també un breu relat de les proves o una fotografia del procés del kit, evitant registrar noms, cares o veus si no cal per a l'activitat.

## 🔗 Fonts oficials i límits

LEGO Education · SPIKE Prime technical specifications · [https://education.lego.com/it-it/product-resources/spike-prime/downloads/technical-specifications/](https://education.lego.com/it-it/product-resources/spike-prime/downloads/technical-specifications/). Consulteu aquesta documentació per distingir les funcions del model base de les que depenen de complements, accessoris o versions de programari.
