---
title: Braç robòtic i sensor de força
description: Construir una pinça que detecti el contacte i utilitzar les lectures del sensor de força per provar
  un límit programat.
robot: spike
level: Avançat
duration: 55 min
order: 3
image: _assets/tutorials/sp-brac-sensor-forca.png
---

## 🎯 Repte i objectius

Feu que un motor tanque una pinça a poc a poc i s’ature quan es prema el sensor de força. Primer proveu el sensor amb el motor parat; després, feu una prova amb una esponja.

- Comprovar quan el sensor detecta una pressió.
- Programar un motor que s’ature en prémer el sensor.
- Observar què passa i saber com aturar manualment la prova.

## 🧰 Materials i preparació

- Hub SPIKE Prime
- 1 motor mitjà
- 1 sensor de força
- Elements de palanca Technic
- Ordinador o tauleta amb SPIKE App i una esponja.

## 🧩 Funcions del robot treballades

- Hub SPIKE Prime, motor angular i sensor de força.
- Lectura de força/contacte i control del motor; el sensor no mesura distància ni substitueix un límit mecànic.

## 👣 Seqüència guiada

### 1. Muntar el mecanisme de palanca

Munteu una pinça senzilla amb un motor. Amb el motor a baixa velocitat i sense objectes, feu un gir curt per comprovar quin sentit la tanca: depén de com heu col·locat les peces. Atureu el motor abans d’acostar-vos al mecanisme.

### 2. Col·locar el sensor de força

Connecteu el sensor al port B i poseu-lo on la pinça puga prémer-lo sense fer força excessiva. Amb el motor aturat, obriu la icona del Hub a SPIKE App i comproveu si l’estat canvia en prémer i deixar anar el sensor. Si no canvia, reviseu el port i el cable abans de continuar.

### 3. Lògica de control de pressió

Connecteu el motor al port A. Fixeu una esponja lleugera entre les mordasses i prepareu aquesta seqüència a SPIKE App:

```spikeapp
quan comença el programa
activa el motor [A v] a velocitat baixa
espera fins que el sensor de força [B v] estiga premut
atura el motor [A v]
```

L’esquema resumeix les accions: busqueu els blocs equivalents en la vostra versió de l’app. Si useu altres ports, canvieu-los també al programa. Manteniu l’aturada manual a mà. Quan la prova de contacte funcione, podeu comparar lectures numèriques només si l’app les ofereix.

> **💡 Consell docent:** Per a la primera prova, feu servir només l’estat «premut/alliberat». La lectura numèrica de força és una ampliació, no és necessària per aconseguir que la pinça s’ature.

## 🧪 Prova, depura i reflexiona

Fixeu la base a la taula i poseu l’esponja entre les mordasses. Inicieu el motor a baixa velocitat: quan la pinça prema el sensor, s’ha d’aturar. Repetiu-ho tres vegades. Si no s’atura, pareu el motor manualment i reviseu els ports i la posició del sensor. No useu dits, persones ni objectes fràgils com a prova.

### Preguntes per comprovar

- Què indica el sensor de força en aquest model?
- Com saps que el sensor ha detectat la pressió?
- Què ha passat quan el sensor s'ha premut? Què has hagut de fer per obrir la pinça?

## ♿ Accessibilitat i seguretat

Una persona pot preparar les peces i una altra observar el sensor o anotar les proves. Manteniu els dits fora de la pinça mentre el motor gira. La detecció no substitueix l’aturada manual.

## ✅ Evidències d’aprenentatge
- Esquema dels ports i programa amb la condició d’aturada.
- Resultat de tres proves amb l’esponja i una nota sobre si el sensor s’ha activat cada vegada.

## 🔗 Fonts oficials i límits

La [fitxa tècnica del sensor](https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt23df304b05e587b2/5f8801ba721f8178f2e5e626/techspecs_technicforcesensor.pdf?locale=en-us) diferencia detecció de contacte i mesura de força. LEGO també ofereix una [pràctica de sensor i motor](https://education.lego.com/en-us/lessons/spike-python-u3-sensor-control/spike-python-u3l1-start-sensing/); aquella lliçó usa Python, mentre que aquest tutorial fa servir blocs.
