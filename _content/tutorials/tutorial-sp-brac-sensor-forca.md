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

Utilitza el sensor de força SPIKE Prime per detectar una pressió i activar una resposta del Hub. L’equip compararà lectures, provarà un llindar i distingirà la força aplicada al sensor d’una mesura calibrada en newtons.

- Explorar el sensor de força i observar què es pot inferir de les seves lectures.
- Programar el motor en posició relativa de graus per obrir i tancar la pinça.
- Evitar que el motor es forci utilitzant el sensor de força com a parada.

## 🧰 Materials i preparació

- Hub SPIKE Prime
- 1 motor mitjà
- 1 sensor de força
- Elements de palanca Technic

## 🧩 Funcions del robot treballades

- Hub SPIKE Prime, motor angular i sensor de força.
- Lectura de força/contacte i control del motor; el sensor no mesura distància ni substitueix un límit mecànic.

## 👣 Seqüència guiada

### 1. Muntar el mecanisme de palanca

Crea una pinça senzilla amb el motor; prova-la primer amb girs curts i sense objectes. Comprova quin sentit la tanca en el teu muntatge: pot variar segons com col·loques les peces.

### 2. Col·locar el sensor de força

Situa el sensor de força al punt de contacte de la mandíbula de la pinça.

### 3. Lògica de control de pressió

Connecta el motor i el sensor als ports que tries i indica aquests mateixos ports en SPIKE App. Amb una esponja fixa i el motor a baixa velocitat, prova aquesta seqüència:

```spikeapp
quan comença el programa
activa el motor a velocitat baixa
espera fins que el sensor de força estiga premut
atura el motor
```

El dibuix resumeix el programa: busca els blocs equivalents a la teua versió. Mantín accessible l'aturada manual i limita també el recorregut del motor; el sensor pot no activar-se si està mal col·locat. Quan la prova de contacte funcione, compara les lectures de força només si l'app mostra aquesta opció.

> **💡 Consell docent:** El sensor pot detectar una pressió o mostrar força, segons el bloc. No cal treballar amb nombres per a la primera prova.

## 🧪 Prova, depura i reflexiona

Fixa la pinça sobre la taula i utilitza una esponja. Fes tres proves curtes: anota si el sensor s'ha premut i si el motor s'ha aturat. Si no s'atura, para'l manualment i revisa ports i posició del sensor. No uses persones ni objectes fràgils.

### Preguntes per comprovar

- Què indica el sensor de força en aquest model?
- Quin llindar provaràs i quines unitats permet llegir realment el dispositiu?
- Què ha passat quan el sensor s'ha premut? Què has hagut de fer per obrir la pinça?

## ♿ Accessibilitat i seguretat

Comença amb detecció de contacte. El sensor de SPIKE Prime mesura entre 2,5 i 10 N amb una precisió indicada de ±0,65 N; comprova què exposeu a l’aplicació i [consulta la fitxa tècnica del fabricant](https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt23df304b05e587b2/5f8801ba721f8178f2e5e626/techspecs_technicforcesensor.pdf?locale=en-us).

## ✅ Evidències d’aprenentatge
- Un muntatge identificat, els valors enregistrats amb llurs unitats i el límit de força que han triat. Afegeix també un breu relat de les proves o una fotografia del procés del kit, evitant registrar noms, cares o veus si no cal per a l'activitat.

## 🔗 Fonts oficials i límits

LEGO Education · SPIKE Prime technical specifications · [https://education.lego.com/it-it/product-resources/spike-prime/downloads/technical-specifications/](https://education.lego.com/it-it/product-resources/spike-prime/downloads/technical-specifications/). Consulteu aquesta documentació per distingir les funcions del model base de les que depenen de complements, accessoris o versions de programari.
