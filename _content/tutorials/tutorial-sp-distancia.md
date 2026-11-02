---
title: 'SPIKE Prime: calcular una parada sense tocar l’obstacle'
description: Ajustar el recorregut d’una base motriu amb girs de roda i comparar el càlcul amb una parada per contacte.
robot: spike
level: Intermedi
duration: 45 min
order: 4
image: _assets/tutorials/sp-distancia.png
---
## 🎯 Repte i objectius

![Robot mòbil SPIKE Prime davant d’un bloc, amb un espai visible entre tots dos.](_assets/imatges/spike-parada-distancia.webp)

Estima quant avançarà la base motriu i compara el resultat amb la distància real al bloc. La pràctica utilitza els graus del motor i la geometria de les rodes per planificar la parada, i reserva el sensor de força per detectar el contacte en una prova comparativa.

- Relacionar els girs de les rodes amb la distància que recorre la base.
- Fer una estimació, provar-la i ajustar-la amb dades.
- Distingir una parada calculada d’una parada activada per contacte.

## 🧰 Materials i preparació

- Conjunt LEGO Education SPIKE Prime amb Hub, dos motors i sensor de força opcional per a la comparació final.
- Peces Technic per muntar una base motriu estable.
- Un bloc LEGO vertical com a obstacle i cinta de paper per marcar la sortida.
- Regle o cinta mètrica.

## 🧩 Funcions del robot treballades

- Motor angular i càlcul de desplaçament a partir de rotacions i geometria de roda.
- La comparació amb el sensor de força detecta contacte; no s’utilitza el sensor d’ultrasons/distància en aquesta pràctica.

## 👣 Seqüència guiada

### 1. Prepareu la base i el punt de partida

Construeix una base que avance recta amb dos motors. Anota els ports dels motors i marca la posició inicial del davant de la base. Per a la primera prova, deixa el camí lliure; col·locaràs el bloc després d’haver comprovat quant avança el robot.

### 2. Estimeu el desplaçament

Mesura el diàmetre de la roda. Per a una primera estimació, multiplica el diàmetre per 3: això aproxima la distància recorreguda en una volta. Tria quantes voltes vols provar i anota el desplaçament que preveus. En SPIKE App, busca el bloc de moviment per voltes o graus.

### 3. Fer una prova lenta

Programa l’avanç a velocitat baixa i executa’l des de la marca **sense posar encara el bloc davant del robot**. Mesura quant s’ha desplaçat i comprova que la predicció és raonable. Repetiu tres vegades i anoteu voltes, distància real i diferències entre intents.

```spikeapp
quan comença el programa
configura els motors de moviment [B i D v]
mou endavant (1) voltes a velocitat baixa
```

El dibuix és una guia per buscar els blocs equivalents en SPIKE App. Canvia els ports si els motors estan connectats en uns altres, i substitueix una volta per l'estimació del teu equip. Prova primer una volta en un espai lliure. Només després de conéixer el desplaçament, situa el bloc a la distància que vols aconseguir i prova el recorregut amb supervisió.

> **💡 Repte d’equip:** aconseguiu quedar-vos tan a prop com pugueu sense tocar el bloc. Quan funcione a un metre, canvieu la distància d’eixida i reutilitzeu les dades per fer una nova predicció.

### 4. Comparar amb una parada per contacte

Si el muntatge incorpora un sensor de força al davant, afegiu-lo com a topall tou contra una paret feta amb blocs. Programeu el moviment perquè s’ature quan el sensor detecte el contacte. Feu aquesta comparació a velocitat baixa i amb un obstacle estable; el sensor de força no és un sensor de distància i aquesta segona prova sí que acaba en contacte.

## 🧪 Prova, depura i reflexiona

Repeteix tres vegades des de la mateixa marca i compara la distància recorreguda amb la predicció. Quan ja conegues el desplaçament, posa el bloc més enllà del punt on preveus que s’aturarà i fes una prova supervisada. Si el robot s’acosta massa, atura’l manualment i redueix les voltes per a l’intent següent. El sensor de força de la comparació detecta contacte, no mesura l’espai que queda.

### Preguntes per comprovar

- Quantes voltes havíeu previst i quantes n’han calgut després de provar?
- Què ha canviat quan heu modificat la velocitat?
- En quin cas el robot s’atura abans del contacte i en quin cas espera a tocar?


## ♿ Accessibilitat i seguretat

Per començar, facilita una taula de conversions roda-voltes-distància o una distància que corresponga a voltes completes. Com a extensió, compareu rodes de diàmetres diferents o representeu les proves en un gràfic. Repartiu els rols: conducció, mesura i registre.

## ✅ Evidències d’aprenentatge
- Recolliu una taula amb les prediccions i resultats, una explicació de l’ajust triat i una demostració de cada tipus de parada. Eviteu fotografiar cares o dades personals.

## 🔗 Fonts oficials i límits

Adaptació pròpia del repte [Going the Distance de LEGO Education](https://education.lego.com/en-us/lessons/prime-extra-resources/going-the-distance/), que proposa calcular el recorregut d’un Rhino i comparar-lo després amb una parada per sensor de força. Ací canviem el context i el registre de proves; consulta la lliçó oficial per a les instruccions específiques del model.

LEGO Education · SPIKE Prime technical specifications · [https://education.lego.com/it-it/product-resources/spike-prime/downloads/technical-specifications/](https://education.lego.com/it-it/product-resources/spike-prime/downloads/technical-specifications/). Consulteu aquesta documentació per distingir les funcions del model base de les que depenen de complements, accessoris o versions de programari.
