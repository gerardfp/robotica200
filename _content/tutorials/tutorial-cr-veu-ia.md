---
title: 'Veu i IA: funció externa i simulació amb Codey Rocky'
description: Distingir el sensor de so integrat del reconeixement de parla, provar una extensió en línia només si està disponible i simular les ordres amb seguretat.
robot: codey-rocky
level: Avançat
duration: 50 min
order: 3
image: _assets/tutorials/cr-veu-ia.png
---

## 🎯 Repte i objectius

Compareu què passa quan Codey sent una palmada i què caldria perquè interpretara una paraula. El robot pot indicar si un so és més fort o més fluix, però no inclou un mòdul que reconega paraules.

- Comparar una lectura de so ambiental amb una ordre de veu interpretada per programari.
- Comprovar si l’extensió de serveis cognitius està disponible abans de basar-hi l’activitat.
- Vincular una entrada de prova a una resposta visible i segura, sense activar moviments inesperats.
- Identificar quan una activitat necessita un servei de veu extern.

## 🧰 Materials i preparació

- Codey Rocky de la dotació amb bateria suficient i espai de treball delimitat.
- Ordinador amb mBlock 5, micròfon del dispositiu i connexió de xarxa només si el servei en línia està autoritzat.
- Targetes grans amb les ordres fictícies «marxa», «para» i «gira» per a una simulació sense veu.
- Un registre per anotar component, programa, resposta i dependències de cada prova.

Comenceu amb el sensor de so de Codey. La prova de paraules és opcional i només es fa si el centre disposa d’un servei compatible i n’autoritza l’ús; si no, useu les targetes.

## 🧩 Funcions del robot treballades

- Sensor de so integrat de Codey: permet llegir intensitat sonora i fer que una condició responga a un llindar; no transcriu ni entén paraules.
- Pantalla LED, indicador RGB i altaveu com a eixides per comunicar un estat de prova.
- Reconeixement de parla com a funció de programari o mòdul Neuron compatible, no com a sensor integrat del Codey Rocky base.
- Connexió i serveis en línia com a dependències externes que poden no estar disponibles o tindre límits d’idioma i compte.

## 👣 Seqüència guiada

### 1. Mesureu el so amb el robot base

Connecteu Codey a mBlock i busqueu el bloc que llig el nivell de so. Prepareu un programa que el mostre contínuament a la pantalla. Aquesta representació us ajuda a trobar els blocs equivalents en la vostra versió:

```mblock
quan comença el programa
per sempre
mostra el nivell de so
fi
```

Carregueu o executeu el programa segons el mode triat. Anoteu què mostra en silenci i després amb una palmada suau; repetiu tres vegades. El número ajuda a comparar sons: no és una mesura de decibels ni una paraula reconeguda.

### 2. Reviseu si hi ha reconeixement de parla

Mireu si el centre té una extensió o un servei de reconeixement de parla compatible. Anoteu-ne el nom i la llengua disponible sense activar el micròfon. Si no en teniu, passeu a les targetes del pas 4. Una lectura de so alt no significa que Codey haja entés una paraula.

### 3. Proveu una resposta controlada, si el servei està autoritzat

Si el servei funciona i està autoritzat, proveu una frase fictícia i feu que aparega una icona quan coincidisca amb la paraula prevista. Proveu també una frase diferent i el silenci. Manteniu els motors aturats mentre observeu les respostes.

### 4. Simuleu les mateixes ordres sense enviar veu

Una persona tria una targeta —«marxa», «para» o «gira»— i una altra mostra la icona acordada. Anoteu el resultat com a **simulació**: aquesta prova ajuda a preparar l’activitat, però no comprova que el robot reconega la veu.

![Codey Rocky de la dotació mostra una resposta visual mentre una entrada de veu es representa com una funció externa de programari.](../../_assets/tutorials/cr-veu-ia.png)

_El núvol és una dependència de programari: el robot base no incorpora reconeixement de parla._

## 🧪 Prova, depura i reflexiona

Compareu tres casos: silenci, so breu i, si està autoritzat, una frase de prova. Anoteu què ha llegit el sensor del robot, què ha retornat l’extensió i quina resposta s’ha mostrat. Repetiu el mateix cas sense canviar la distància ni el volum. Si el servei de veu no està disponible, completeu la comparació amb targetes i identifiqueu les dades com a simulades; no presenteu aquest resultat com a reconeixement real.

### Preguntes per comprovar

- Quina informació llig el sensor de so del Codey i quina no pot determinar?
- Quin component o servei hauria d’interpretar les paraules parlades?
- Quina diferència hi ha entre una resposta visual simulada i un reconeixement acústic real?
- Quins permisos i quina connexió calen abans d’enviar veu a un servei extern?

## ♿ Accessibilitat i seguretat

La veu és opcional: oferiu targetes, text fictici o botons com a entrada equivalent. Eviteu noms, converses personals i enregistraments d’infants. No useu el control de veu per activar motors en aquesta prova; delimiteu l’espai i manteniu una resposta visual o sonora suau. Si el servei envia àudio fora del dispositiu, seguiu les normes de privacitat i autorització del centre.

## ✅ Evidències d’aprenentatge

- Programa que mostra la lectura del sensor de so i registre dels valors observats.
- Taula que separa lectura integrada, resultat d’un servei extern i entrada simulada.
- Registre de tres casos de prova, amb les dependències tècniques disponibles.
- Explicació breu de per què Codey Rocky no reconeix parla de manera autònoma.

## 🔗 Fonts oficials i límits

Makeblock descriu el [sensor de so integrat de Codey Rocky](https://support.makeblock.com/hc/en-us/articles/1500004392242-About-Codey-Rocky) com una lectura del nivell sonor, i a les [FAQ oficials](https://support.makeblock.com/hc/en-us/articles/1500004266501-FAQs-on-Codey-Rocky) indica que el model base no té un mòdul de reconeixement de parla; la veu requeriria un mòdul Neuron compatible. La [guia oficial del cas de veu](https://support.makeblock.com/hc/en-us/articles/7463171094295-Case-11-Voice-activated-RGB-LED-indicator) treballa el nivell de so, no la transcripció de paraules. Les extensions d’IA i els serveis en línia depenen de la versió i de la xarxa del centre.
