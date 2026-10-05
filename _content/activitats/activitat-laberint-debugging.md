---
title: El Laberint d'Instruccions i Detecció d'Errors
description: Sobre una graella gegant al terra amb fitxes de cartolina, els alumnes col·loquen targetes de fletxes
  per planificar un camí abans d'executar-lo. Quan troben un obstacle, aprenen a aïllar l'ordre equivocada.
topic: Depuració (Debugging) i Seqüenciació
cycle_label: Educació Infantil i primer cicle
duration: 40 min
order: 4
---

## 🎯 Objectiu de l'activitat

Sobre una graella gegant al terra amb fitxes de cartolina, els alumnes col·loquen targetes de fletxes per planificar un camí abans d'executar-lo. Quan troben un obstacle, aprenen a aïllar l'ordre equivocada.

## 📦 Material necessari

- Cinta de pintor o rajoles de l'aula com a graella
- Fletxes de paper (amunt, avall, esquerra, dreta)
- Un objecte premi al final

## 👣 Desenvolupament pas a pas

### 1. Dibuixar la ruta en paper abans d'actuar

No val provar a l'atzar. L'equip ha de col·locar la fila de fletxes a la taula abans que ningú trepitgi la graella.

### 2. Execució pas a pas

Un company llegeix la fletxa i un altre fa la passa sobre la casella corresponent.

### 3. Trobar el 'Bug'

Si la fletxa ens porta a una casella bloquejada, aturem el pas, assenyalem quina fletxa de la fila ha fallat i la substituïm.

> **💡 Consell per a l'aula:** Normalitza l'error: en programació equivocar-se no és un fracàs, sinó una oportunitat per depurar.

## 🧭 Registre de depuració

Abans de començar, numereu les fletxes i feu que qui les executa repeteixi la regla en veu alta. En detectar una desviació, manteniu la seqüència original, assenyaleu la primera ordre que deixa de coincidir amb el trajecte i anoteu-ne la correcció en una segona columna.

| Pas | Predicció | Resultat | Canvi provat |
| --- | --- | --- | --- |
| 1 | Arribar a la casella veïna | Coincideix / no coincideix | Canvi d'una instrucció |

## 🗣️ Preguntes per fer pensar

- Quin és el primer lloc on el recorregut esperat i el real divergeixen?
- Com distingim l'ordre que causa un problema d'un error a l'executar-la?
- Com sabríem que la solució també funciona amb una sortida diferent?

## ♿ Adaptacions i aprofundiment

Comenceu amb dues fletxes i sense obstacle; mostreu la seqüència al costat de la graella. Per aprofundir, feu que el laberint amagui un segon error o compareu una solució fàcil de depurar amb una de més curta.

## ✅ Evidències observables

Guardeu el primer programa i la versió revisada. L'alumnat explica per què ha canviat una instrucció i prova que el recorregut encara acaba al lloc acordat.
