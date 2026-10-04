---
title: "Missió Mart: Disseny i proves d'un rover"
description: Com pot un rover basat en SPIKE Prime avançar per una pista, reaccionar davant d'obstacles i explicar les limitacions de la seua autonomia?
robot: spike
cycles:
- eso
cycle_label: ESO (1r-3r)
theme: espai
subject: tecnologia
duration: 6 sessions
order: 10
theme_label: Exploració espacial i viatges
---

## ❓ Repte o Pregunta Guia

Com pot un rover SPIKE Prime recórrer una pista de proves, evitar alguns obstacles amb el sensor de distància i transportar una mostra simulada fins al punt d'arribada?
{: .sa-challenge }

<figure class="sa-illustration">
  <img src="assets/imatges/sa-missio-mart-spike.webp" alt="Rover construït amb SPIKE Prime en una pista de proves amb obstacles baixos i una zona d'arribada." width="600" height="448" loading="lazy">
  <figcaption>El rover és un prototip d'aula; les roques, la mostra i la missió són una simulació segura.</figcaption>
</figure>

## Intenció d'aprenentatge

Aplicar un cicle de disseny d'enginyeria: definir criteris, construir, programar, provar en condicions conegudes i revisar. El repte no és aconseguir una autonomia perfecta, sinó entendre quines decisions pot prendre l'algorisme i quins casos necessiten supervisió.

Sabrem que avancem quan l'equip:

- representa el recorregut i marca obstacles i zones d'arribada;
- relaciona una lectura del sensor de distància amb una decisió del programa;
- repeteix proves controlant la superfície i la posició d'inici;
- descriu un error, un canvi provat i un límit conegut del rover.

## 🏆 Aprenentatges que hi conflueixen

- Tecnologia i enginyeria: estructura, tracció, estabilitat, motors i sensors.
- Pensament computacional: condicions, bucles, seqüències i depuració.
- Matemàtiques: distàncies, mesures, taules i comparació de resultats.
- Comunicació científica: proves reproduïbles, arguments i limitacions.

## Materials i preparació

- Kit LEGO Education SPIKE Prime amb hub, motors i sensor de distància; sensor de força només si el centre el té i el necessita per al disseny.
- Ordinador amb l'entorn SPIKE, pista plana, obstacles grans i lleugers i mostres simulades.
- Regle o cinta mètrica, graella de pista i full de registre per a cada prova.

No hi ha cap necessitat de fer servir arena, roques pesants ni obstacles d'alçada fixa. Comenceu en una superfície plana, amb obstacles tous i un espai suficient perquè el rover no caiga de cap taula.

## 📅 Itinerari de sis sessions

### Sessió 1 · Definir una missió que es puga provar

Presenteu un mapa de cràter fictici i trieu inici, arribada, una zona prohibida i una mostra lleugera. Acordeu dos criteris d'èxit observables, com ara arribar sense tocar l'obstacle i transportar la mostra sense perdre-la.

- Evidència: plànol de pista amb criteris i predicció inicial.
- Pregunta docent: «Quina part de la missió podem comprovar de manera repetible?»

### Sessió 2 · Construir una base estable

Feu un primer vehicle senzill amb una distància entre rodes estable i el sensor orientat cap endavant. Proveu el moviment recte en una pista buida abans d'afegir una pinça. Anoteu qualsevol desviació i canvieu una sola part del muntatge.

- Evidència: esbós del vehicle i prova curta sense obstacle.
- Repte: transportar la mostra en una safata o suport passiu abans de construir un mecanisme mòbil.

### Sessió 3 · Conéixer la lectura del sensor

Situeu obstacles tous a distàncies conegudes. Recolliu lectures en més d'un intent i observeu quan el programa decideix que l'obstacle és «a prop». Trieu un llindar de treball adequat a aquella pista i marqueu-lo com a aproximació, no com a mesura universal.

- Evidència: taula distància observada/lectura/decisió.
- Pregunta docent: «Què passa si l'obstacle és inclinat o la superfície canvia?»

### Sessió 4 · Programar una resposta segura

Prepareu un algorisme que avance mentre el pas és lliure i s'ature o gire quan detecta l'obstacle. Proveu-lo amb una única barrera i després amb dues disposicions diferents. Afegiu una acció de gir només quan l'aturada inicial siga fiable.

- Evidència: diagrama de flux o explicació de la condició i prova de les dues branques.

### Sessió 5 · Integrar el transport i repetir

Afegiu una mostra lleugera al suport o a una pinça simple construïda amb el kit. Manteniu el mateix punt d'inici i la mateixa pista; feu diverses passades i registreu on es desvia, s'atura o perd la càrrega.

- Evidència: registres comparables, percentatge d'èxit o recompte d'intents complets.
- Seguretat: mans fora de les rodes durant l'execució i parada immediata si una peça queda atrapada.

### Sessió 6 · Presentar i explicar què queda fora

Mostreu la versió final i una prova fallida que haja ajudat a millorar-la. Expliqueu si el rover depén del tipus de superfície, de l'orientació del sensor o de la mostra. Compareu quines decisions faria una persona davant del mateix cas.

- Evidència: demostració o vídeo curt autoritzat, registre i limitació documentada.

## 📋 Criteri d'Avaluació Curricular

Observa si l'alumnat defineix criteris, integra un sensor en una condició de programa, fa proves repetibles i revisa el disseny a partir de dades. No valore l'èxit només perquè el rover complete la ruta: compte també l'explicació i l'iteració.
{: .assessment }

## Abans de començar

Construïu una pista plana amb inici, arribada i obstacles grans i lleugers. Proveu el model que farà servir l'alumnat; fixeu posició inicial, orientació del sensor i superfície abans de comparar lectures.

## 🧭 Evidències que recollirem

- Plànol i criteris d'èxit definits abans de construir.
- Taula de lectures i resultats en diverses proves.
- Programa amb una condició provada i comentari d'una iteració.
- Explicació d'un límit del rover i del paper de la supervisió humana.

## ♿ Comparteix el repte

Les funcions de construcció, programació, prova i registre poden ser rotatives. Mostreu el recorregut amb graella d'alt contrast i permeteu registrar resultats amb marques, fotografies o explicació oral. L'equip pot presentar el raonament encara que el motor no arranque.

## 🔁 Rigor experimental

Canvieu un paràmetre cada vegada i repetiu cada prova. Les diferències de muntatge, bateria, superfície i programari poden canviar els resultats; compareu recorreguts sota les mateixes condicions i registreu qualsevol desviació.

## 🔗 Referent consultat

El cicle de disseny, prova curta i millora s’ha contrastat amb la unitat oficial de LEGO Education [Competition Ready per a SPIKE Prime](https://education.lego.com/en-us/lessons/prime-competition-ready/). La missió Mart és un repte local diferent, pensat per comparar prediccions i respostes del sensor, no per reproduir missions ni muntatges de competició.
