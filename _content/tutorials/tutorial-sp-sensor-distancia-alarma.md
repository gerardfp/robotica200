---
title: 'SPIKE Prime: sensor de distància i avís de proximitat'
description: Crear un avís visual i sonor acostant una caixa a un sensor quiet, i observar el gir manual del Hub.
robot: spike
level: Intermedi
duration: 45 min
order: 5
image: _assets/tutorials/sp-sensor-distancia-alarma-flat.webp
---

## 🎯 Repte i objectius

Creeu un avís de proximitat amb el sensor quiet sobre la taula. Moveu una caixa a mà per activar-lo i exploreu després el gir del Hub, també a mà. No cal construir cap base ni encaixar peces LEGO; aquesta activitat no utilitza motors.

- Comparar lectures amb tres distàncies conegudes.
- Programar un avís condicionat per la distància.
- Observar un angle de gir amb el sensor de moviment del Hub.

## 🧰 Materials i preparació

- Hub SPIKE Prime carregat i sensor de distància Technic.
- Caixa de cartó amb una cara plana, regle i paper amb un angle recte dibuixat.
- Ordinador o tauleta amb SPIKE App i connexió USB o Bluetooth.

Deixeu el sensor recolzat sobre la taula, amb les finestres orientades cap a la caixa i sense obstruccions. Només cal connectar-ne el cable al Hub. Comproveu la unitat de lectura que mostra l’app.

## 🧩 Funcions del robot treballades

- Sensor ultrasònic per estimar distància.
- Giroscopi del Hub per observar un gir manual.
- Altaveu integrat i matriu LED com a avisos complementaris.

## 👣 Seqüència guiada

### 1. Comproveu tres distàncies

Connecteu el sensor de distància ultrasònic al port C i obriu la informació del Hub en SPIKE App. Manteniu el sensor quiet i poseu la cara plana de la caixa a 10, 20 i 30 cm de les finestres, mesurant amb el regle. Anoteu la lectura en cada posició. Si varia molt, reviseu l’orientació i deixeu l’espai entre caixa i sensor lliure.

### 2. Programeu un avís de proximitat

Poseu la caixa a 30 cm i prepareu els blocs equivalents de la vostra versió de SPIKE App:

```spikeapp
quan comença el programa
esborra la pantalla
espera fins que la distància del sensor [C v] siga menor de (12) cm
mostra un signe d’exclamació
emet un to curt amb el Hub
```

Comproveu les unitats: 12 cm equivalen a 120 mm. Executeu el programa i acosteu lentament la caixa a mà, sense moure el sensor. Observeu quan apareix la icona i sona el to de l’altaveu del Hub. El programa avisa una vegada; per repetir, allunyeu la caixa i torneu a executar-lo.

### 3. Observeu un gir manual amb el giroscopi

Feu aquesta prova en un projecte separat. Deixeu el Hub pla i quiet, i poseu a zero l’angle de gir amb el bloc corresponent de l’app. Gireu el Hub a mà un quart de volta sobre la taula, seguint l’angle recte del paper. Observeu si la lectura s’acosta a 90° o −90°: el signe depén del sentit. Deixeu marge al cable del sensor, sense estirar-lo. Torneu a la posició inicial, poseu a zero i repetiu tres vegades.

### 4. Compareu els avisos

Repetiu la prova de proximitat amb un altre llindar, per exemple 20 cm. Manteniu la icona com a alternativa al so i compareu a quina distància s’activa. Ajusteu el volum a un nivell còmode amb les opcions disponibles en l’app.

## 🧪 Prova, depura i reflexiona

Anoteu el llindar programat i la distància mesurada amb el regle quan apareix l’avís en tres intents. Si no s’activa, reviseu port, unitats, orientació i lectura. Registreu també els tres angles de la prova manual del Hub.

### Preguntes per comprovar

- Què canvia en passar d’un llindar de 12 a 20 cm?
- Per què cal allunyar la caixa abans de tornar a iniciar el programa?
- Quin signe té el gir del Hub en cada sentit?
- Quina informació ofereix la icona si no sentiu el so?

## ♿ Accessibilitat i seguretat

Una persona pot moure la caixa i una altra llegir o registrar les dades. Oferiu una taula amb les distàncies marcades i manteniu un avís visual equivalent al sonor. Manipuleu el Hub sense estirar els cables. L’avís és una pràctica de programació, no una alarma real de seguretat.

## ✅ Evidències d’aprenentatge

- Programa d’avís i esquema dels ports.
- Taula de distàncies i comparació dels dos llindars.
- Dibuix del gir manual i registre dels angles observats.

## 🔗 Fonts oficials i límits

La fitxa tècnica LEGO del [sensor de distància Technic](https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt64c2b9534cf10f68/5f8801b8bc43790f5c4389ea/techspecs_technicdistancesensor.pdf?locale=en-us) descriu la tecnologia ultrasònica i els rangs; les [especificacions del Hub Prime](https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltf512a371e82f6420/5f8801baf4f4cf0fa39d2feb/techspecs_techniclargehub.pdf?locale=en-us) documenten altaveu i sensor de moviment. Les lectures són aproximades; aquesta activitat no és un sistema de seguretat.
