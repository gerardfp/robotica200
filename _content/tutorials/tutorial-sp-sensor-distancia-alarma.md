---
title: SPIKE Prime: sensor de distància, gir i avís
description: Fer que una base s'ature davant d'una caixa, provar un gir i afegir un avís sonor.
robot: spike
level: Intermedi
duration: 55 min
order: 5
image: _assets/tutorials/sp-sensor-distancia-alarma.webp
---

## 🎯 Repte i objectius

Construïu una base mòbil que s’acoste a una caixa, s’ature abans de tocar-la i emeta un senyal curt. Després feu un gir controlat amb el sensor de moviment del Hub.

- Comparar la lectura del sensor amb tres distàncies conegudes.
- Programar una parada a partir de la lectura del sensor.
- Mesurar un gir aproximat i comunicar l’estat amb un so del Hub.

## 🧰 Materials i preparació

- Hub SPIKE Prime carregat, dos motors angulars i una base de conducció estable.
- Sensor de distància Technic i cables connectats als ports identificats en el programa.
- Paret de blocs o caixa de cartó estable, regle i cinta per marcar línies de prova.
- Espai pla lliure de persones i objectes fràgils.
- Ordinador o tauleta amb SPIKE App i cable USB o connexió Bluetooth compatible.

El sensor calcula la distància amb ultrasons. Comproveu quina unitat mostra SPIKE App i deixeu prou espai davant de la caixa: la lectura és aproximada.

## 🧩 Funcions del robot treballades

- Sensor ultrasònic per saber si hi ha un objecte al davant i estimar-ne la distància.
- Sensor de moviment del Hub per observar i repetir un gir aproximat.
- Altaveu integrat del Hub per emetre un to curt com a eixida.
- Un bloc «si» per decidir quan parar. Manteniu la mà a prop del botó d’aturada: la lectura pot variar.

## 👣 Seqüència guiada

### 1. Comproveu el sensor a distàncies conegudes

Connecteu el sensor ultrasònic al port C i fixeu-lo al davant de la base. Amb el Hub connectat a SPIKE App, obriu la icona del Hub per veure la lectura del sensor. Poseu una caixa plana a 10, 20 i 30 cm, mesurats amb un regle, i anoteu el valor en cada posició. Manteniu la base quieta. Si no apareix cap lectura estable, reviseu la connexió i l’orientació del sensor abans de continuar.

### 2. Programeu una parada amb marge

Connecteu el sensor al port C i configureu en l’app els ports dels motors. Feu avançar la base molt lentament; quan detecte la caixa a 12 cm o menys, atureu-la. El dibuix següent resumeix els blocs que cal buscar en la vostra versió de SPIKE App:

```spikeapp
quan comença el programa
activa els motors de moviment a velocitat baixa
espera fins que la distància del sensor [C v] siga menor de (12) cm
atura els motors de moviment
```

Si el sensor està connectat a un altre port, seleccioneu-lo en el bloc. Comproveu que l’app mostra centímetres: 12 cm equivalen a 120 mm. Proveu primer amb una caixa ampla i manteniu a mà el botó d’aturada. Els 12 cm són una primera referència: no garanteixen que el robot pare abans de tocar la caixa.

### 3. Mesureu un gir amb el giroscopi

Feu aquesta prova en **un projecte separat**, amb la caixa apartada:

1. Deixeu el Hub quiet i poseu a zero l’angle de gir amb el bloc corresponent de l’app.
2. Gireu la base a mà un quart de volta i observeu la lectura de l’angle. Anoteu si s’acosta a **90** o a **−90**; el signe depén del sentit i de la posició del Hub.
3. Torneu a la posició inicial i poseu l’angle a zero. Programeu un gir lent en el mateix sentit fins que la lectura arribe al valor observat; després atureu els motors.
4. Compareu l’orientació final amb un angle recte dibuixat en paper. Repetiu tres vegades des de la mateixa marca.

Si el robot gira en el sentit contrari o no s’atura, pareu-lo manualment. Reviseu el sentit del gir i la condició de l’angle abans de tornar a provar.

### 4. Afegiu un senyal de so

Quan el programa s’ature per distància, feu sonar un to breu amb l’altaveu del Hub i mostreu alhora una icona a la matriu LED. Proveu el comportament amb so activat i amb el volum desconnectat/silenciat si l’app o la configuració ho permeten; manteniu una alternativa visual equivalent. No utilitzeu l’avís com a alarma real de seguretat.

![Il·lustració d’una base amb rodes i un sensor davant d’una caixa.](../../_assets/tutorials/sp-sensor-distancia-alarma.webp)

_Il·lustració decorativa: no és una guia de muntatge ni mostra una mesura real del marge._

## 🧪 Prova, depura i reflexiona

Anoteu en una taula des d’on comença el robot, la distància que mostra el sensor i l’espai que queda en aturar-se. Repetiu tres vegades des de la mateixa marca. Si no s’atura, pareu-lo manualment i reviseu port, orientació i lectura abans de tornar a provar. Compareu després amb la prova per voltes de roda, si l’heu feta.

### Preguntes per comprovar

- Quina diferència hi ha entre que el sensor detecte l’obstacle i calcular el trajecte amb les voltes de roda?
- En quines condicions la lectura es fa més variable?
- Què heu canviat per millorar l’angle de gir i quina dada ho demostra?
- Quin avís alternatiu veu l’usuari si no vol sentir el so?


## ♿ Accessibilitat i seguretat

Useu velocitat baixa, un obstacle tou i una zona de prova delimitada. Manteniu el botó d’aturada accessible i no confieu en el sensor com a sistema de protecció. Oferiu taula de dades o simulador si una persona prefereix no conduir el robot; el senyal LED ha d’oferir la mateixa informació que el so.

## ✅ Evidències d’aprenentatge
- Programa de parada i esquema dels ports utilitzats.
- Taula amb les lectures i l’espai que queda davant de la caixa en tres intents.
- Dibuix del gir i anotació de l’angle observat en cada prova.

## 🔗 Fonts oficials i límits

La fitxa tècnica LEGO del [sensor de distància Technic](https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt64c2b9534cf10f68/5f8801b8bc43790f5c4389ea/techspecs_technicdistancesensor.pdf?locale=en-us) descriu la tecnologia ultrasònica i els rangs; les [especificacions del Hub Prime](https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltf512a371e82f6420/5f8801baf4f4cf0fa39d2feb/techspecs_techniclargehub.pdf?locale=en-us) documenten altaveu i sensor de moviment. La lliçó oficial [Going the Distance](https://education.lego.com/en-us/lessons/prime-extra-resources/going-the-distance/) proposa una altra manera d’estimar el moviment amb les rodes. Les lectures depenen de la superfície i de la versió de l’app; no és un sistema de seguretat certificat.
