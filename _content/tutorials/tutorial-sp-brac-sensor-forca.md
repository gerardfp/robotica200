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

Fes que un motor tanque una pinça lentament i s’ature quan es prema el sensor de força. Primer comprova el sensor amb el motor parat; després prova el conjunt amb una esponja.

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

Crea una pinça senzilla amb el motor; prova-la primer amb girs curts i sense objectes. Comprova quin sentit la tanca en el teu muntatge: pot variar segons com col·loques les peces.

### 2. Col·locar el sensor de força

Connecta el sensor al port B i situa’l al punt de contacte de la mandíbula. Amb el motor aturat, obri la icona del Hub a SPIKE App i comprova si l’estat del sensor canvia quan el prems i el deixes anar. Si no canvia, revisa la connexió abans de continuar.

### 3. Lògica de control de pressió

Connecta el motor al port A. Amb una esponja fixa i el motor a baixa velocitat, prepara aquesta seqüència a SPIKE App:

```spikeapp
quan comença el programa
activa el motor [A v] a velocitat baixa
espera fins que el sensor de força [B v] estiga premut
atura el motor [A v]
```

El dibuix resumeix les accions: busca els blocs equivalents a la teua versió. Si uses altres ports, canvia’ls també al programa. Mantín l’aturada manual a mà: el sensor pot no activar-se si està mal col·locat. Quan la prova de contacte funcione, compara les lectures de força només si l’app mostra aquesta opció.

> **💡 Consell docent:** El sensor pot detectar una pressió o mostrar força, segons el bloc. No cal treballar amb nombres per a la primera prova.

## 🧪 Prova, depura i reflexiona

Fixa la base a la taula i posa una esponja lleugera entre les mordasses. Inicia el motor a baixa velocitat i deixa que la pinça toque l’esponja; quan el sensor es prema, ha d’aturar-se. Repeteix tres vegades. Si no s’atura, para’l manualment i revisa els ports i la posició del sensor abans de tornar a provar. No uses persones ni objectes fràgils.

### Preguntes per comprovar

- Què indica el sensor de força en aquest model?
- Com saps que el sensor ha detectat la pressió?
- Què ha passat quan el sensor s'ha premut? Què has hagut de fer per obrir la pinça?

## ♿ Accessibilitat i seguretat

Una persona pot preparar les peces i una altra observar el sensor o registrar les proves. Mantín els dits fora de la pinça mentre el motor gira. La detecció no substitueix l’aturada manual.

## ✅ Evidències d’aprenentatge
- Esquema dels ports i programa amb la condició d’aturada.
- Resultat de tres proves amb l’esponja i una nota sobre si el sensor s’ha activat cada vegada.

## 🔗 Fonts oficials i límits

La [fitxa tècnica del sensor](https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt23df304b05e587b2/5f8801ba721f8178f2e5e626/techspecs_technicforcesensor.pdf?locale=en-us) diferencia detecció de contacte i mesura de força. LEGO també ofereix una [pràctica de sensor i motor](https://education.lego.com/en-us/lessons/spike-python-u3-sensor-control/spike-python-u3l1-start-sensing/); aquella lliçó usa Python, mentre que aquest tutorial fa servir blocs.
