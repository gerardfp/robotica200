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

Crea una pinça que es tanqui quan el motor giri en sentit horari.

### 2. Col·locar el sensor de força

Situa el sensor de força al punt de contacte de la mandíbula de la pinça.

### 3. Lògica de control de pressió

Tanca la pinça lentament fins a activar el sensor i atura el motor; a continuació, prova un llindar superior a 4 N i contrasta les mesures amb la fitxa tècnica i l’aplicació utilitzada.

> **💡 Consell docent per a la sessió:** Comença amb una esponja o un cub d’escuma fix i un moviment curt. A SPIKE Prime, el rang de força és 2,5–10 N i la tolerància és de ±0,65 N; no facis servir persones ni objectes fràgils com a proves.

## 🧪 Prova, depura i reflexiona

Fixa la pinça sobre la taula i utilitza un objecte de prova resistent i tou, amb un límit de motor conservador. No facis servir aquest muntatge per agafar persones ni objectes fràgils.

### Preguntes per comprovar

Què indica el sensor de força en aquest model? Quin llindar provaràs i quines unitats permet llegir realment el dispositiu?

## ♿ Accessibilitat i seguretat

Comença amb detecció de contacte. El sensor de SPIKE Prime mesura entre 2,5 i 10 N amb una precisió indicada de ±0,65 N; comprova què exposeu a l’aplicació i [consulta la fitxa tècnica del fabricant](https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt23df304b05e587b2/5f8801ba721f8178f2e5e626/techspecs_technicforcesensor.pdf?locale=en-us).

## ✅ Evidències d’aprenentatge

Un muntatge identificat, els valors enregistrats amb llurs unitats i el límit de força que han triat. Afegeix també un breu relat de les proves o una fotografia del procés del kit, evitant registrar noms, cares o veus si no cal per a l'activitat.

## 🔗 Fonts oficials i límits

LEGO Education · SPIKE Prime technical specifications · [https://education.lego.com/it-it/product-resources/spike-prime/downloads/technical-specifications/](https://education.lego.com/it-it/product-resources/spike-prime/downloads/technical-specifications/). Consulteu aquesta documentació per distingir les funcions del model base de les que depenen de complements, accessoris o versions de programari.
