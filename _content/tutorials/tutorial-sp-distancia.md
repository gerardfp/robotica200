---
title: 'SPIKE Prime: predir i mesurar el gir del motor'
description: Comparar quarts, mitges voltes i voltes completes amb un motor sense rodes ni peces afegides.
robot: spike
level: Intermedi
duration: 40 min
order: 4
image: _assets/tutorials/sp-distancia-flat.png
---

## 🎯 Repte i objectius

Predigueu i observeu el gir d’un motor angular solt. No cal muntar cap vehicle ni encaixar peces LEGO: treballareu amb el motor tal com ve al kit.

- Relacionar 90°, 180° i 360° amb un quart, mitja volta i una volta completa.
- Comparar una predicció amb el moviment observat.
- Distingir l’angle de gir del motor de la distància recorreguda per un vehicle.

## 🧰 Materials i preparació

- Hub SPIKE Prime carregat i un motor angular.
- Paper amb un cercle dividit en quatre parts i llapis per registrar prediccions.
- Ordinador o tauleta amb SPIKE App i connexió USB o Bluetooth.

Recolzeu el motor de manera estable sobre la taula amb la marca de la part giratòria visible. No hi afegiu rodes, braços ni eixos. El paper serveix de referència visual al costat del motor, sense tocar-lo.

## 🧩 Funcions del robot treballades

- Motor angular: gir programat en graus, sentit i velocitat.
- Observació de la posició angular; sense rodes no es calcula una distància lineal.

## 👣 Seqüència guiada

### 1. Connecteu i feu una predicció

Connecteu el motor al port A i comproveu que SPIKE App el reconeix. Observeu la marca de la part giratòria i dibuixeu-ne la posició inicial al paper. Predigueu on quedarà després d’un quart de volta.

### 2. Programeu un gir curt

Seleccioneu els blocs equivalents de la vostra versió de l’app i una velocitat baixa:

```spikeapp
quan comença el programa
fixa la velocitat del motor [A v] a (20) %
motor [A v] gira (90) graus
```

Executeu una vegada i compareu la posició final amb la predicció. No toqueu ni freneu la part giratòria. Si el motor es desplaça sobre la taula, atureu-lo i busqueu una posició de suport estable abans de continuar.

### 3. Compareu tres angles

Proveu 90°, 180° i 360°, mantenint la mateixa velocitat. Abans de cada execució, anoteu la posició de partida i dibuixeu el resultat esperat: el gir és relatiu a aquella posició, no a un zero fix. En una volta completa, la marca torna aproximadament al punt inicial; observeu també el moviment per distingir-la d’una absència de gir.

### 4. Canvieu només la velocitat

Repetiu el gir de 180° amb dues velocitats baixes diferents. Compareu l’angle final i el temps que tarda. Manteniu el mateix port, sentit i angle en totes dues proves.

## 🧪 Prova, depura i reflexiona

Prepareu una taula amb angle demanat, predicció i observació. Si no coincideixen, reviseu la unitat del bloc, el port i la posició inicial abans de repetir.

### Preguntes per comprovar

- Quants quarts de volta hi ha en 180° i en 360°?
- Com distingiu una volta completa d’un motor que no s’ha mogut?
- En canviar la velocitat, canvia l’angle demanat o el temps del gir?

## ♿ Accessibilitat i seguretat

Oferiu el cercle amb quarts marcats i una taula de conversió graus-voltes. Es poden repartir els rols d’observació i registre. Manteniu mans, roba, cabells i cables lluny del motor en marxa i atureu el programa abans de recol·locar-lo.

## ✅ Evidències d’aprenentatge

- Programa del gir i taula de les tres prediccions i resultats.
- Explicació de la diferència entre angle i velocitat.

## 🔗 Fonts oficials i límits

Les [especificacions de SPIKE Prime](https://education.lego.com/it-it/product-resources/spike-prime/downloads/technical-specifications/) descriuen els motors angulars. Aquesta prova observa el gir del motor sense càrrega; no mesura un desplaçament lineal.
