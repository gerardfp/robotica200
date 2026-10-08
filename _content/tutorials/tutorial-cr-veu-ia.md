---
title: Reconeixement de veu i Intel·ligència Artificial
description: Utilitzar l'extensió de Serveis Cognitius per controlar el moviment del robot mitjançant ordres de
  veu en català.
robot: codey-rocky
level: Avançat
duration: 50 min
order: 3
image: _assets/tutorials/cr-veu-ia.png
---

## 🎯 Repte i objectius

- Entendre què són els serveis en el núvol i el processament de llenguatge natural (NLP).
- Convertir veu a text en temps real mitjançant mBlock.
- Vincular ordres parlades ('Arrenca', 'Para', 'Gira') a funcions motores.

## 🧰 Materials i preparació

- Codey Rocky connectat per USB a ordinador amb micròfon i connexió a Internet

## 🧩 Funcions del robot treballades

- Reconeixement de parla mitjançant un servei de programari en línia, si l’extensió i la llengua continuen disponibles.
- No és una funció de reconeixement integrada al robot; el moviment depén dels motors de Rocky i de les ordres que el servei transcriu.

## 👣 Seqüència guiada

### 1. Afegir l'extensió Cognitive Services

Fes clic a la icona '+' d'extensions a mBlock i afegeix 'Serveis cognitius (Cognitive Services)'.

### 2. Configurar l'escolta en català

Fes servir el bloc 'Reconeix la parla en [català] durant 3 segons'.

### 3. Condicional de veu

Si el resultat de la veu és igual a 'marxa', activa els motors endavant al 50% de potència.

> **💡 Consell docent per a la sessió:** Aquesta activitat requereix connexió a Internet per enviar l'àudio als servidors de reconeixement de veu.

## 🧪 Prova, depura i reflexiona

Abans de fer servir un servei de veu, comprova si és compatible amb la versió actual del programari i l'idioma disponible al centre. Fes la prova amb frases inventades i en una aula tranquil·la.

### Preguntes per comprovar

Què ha sentit el programa? Què succeeix amb una frase semblant o quan no pot reconèixer l'ordre?

## ♿ Accessibilitat i seguretat

No feu servir noms ni informació identificativa, i no activeu enregistrament de veu d'infants sense els acords i les autoritzacions del centre. Deixa preparada l'alternativa física amb targetes d'ordre.

## ✅ Evidències d’aprenentatge

La condició de veu, el resultat interpretat i la comparació amb una entrada simulada. Afegeix també un breu relat de les proves o una fotografia del procés del kit, evitant registrar noms, cares o veus si no cal per a l'activitat.

### Privadesa i ús responsable

El procediment existent envia àudio al servei de reconeixement en línia. Consulta les condicions actuals del servei, les normes del centre i les autoritzacions familiars abans d'implicar alumnat; no incorporis noms, dades personals ni veus identificables als exemples. Si no es pot fer amb garanties, simula l'entrada amb targetes de text i programa igualment la condició del robot.

## 🔗 Fonts oficials i límits

Makeblock · Codey Rocky · [https://support.makeblock.com/hc/en-us/articles/1500004392242-About-Codey-Rocky](https://support.makeblock.com/hc/en-us/articles/1500004392242-About-Codey-Rocky). Consulteu aquesta documentació per distingir les funcions del model base de les que depenen de complements, accessoris o versions de programari.
