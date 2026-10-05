---
title: Un Classificador de Mostres per a l'Ecoaula
description: Pot un prototip amb SPIKE Prime classificar mostres de colors, reconéixer els casos dubtosos i explicar per què el color no identifica tots els materials?
robot: spike
cycles:
- cicle-superior
- eso
cycle_label: Cicle Superior (5è-6è) i ESO
theme: sostenibilitat
subject: medi
duration: 5 sessions
order: 2
---

## ❓ Repte o Pregunta Guia

Com podem ajudar a classificar mostres simulades de residus sense confondre el color d'un objecte amb el material de què està fet?
{: .sa-challenge }

<figure class="sa-illustration">
  <img src="assets/imatges/sa-classificador-residus.webp" alt="Un muntatge de SPIKE Prime al costat de safates i peces de prova de colors per simular una classificació." width="600" height="448" loading="lazy">
  <figcaption>Les peces i els colors representen mostres de prova; el sensor no pot deduir universalment de quin material està fet un objecte.</figcaption>
</figure>

## Intenció d'aprenentatge

Dissenyar un prototip que aplique una regla visible de classificació a un conjunt de mostres controlat. L'equip comprovarà el sensor de color, mesurarà els errors i afegirà una eixida d'incertesa que demane revisió humana.

Sabrem que avancem quan l'equip:

- explica la diferència entre detectar un color i identificar un material;
- manté les mateixes condicions de distància i llum en les proves;
- registra encerts, errors i casos dubtosos amb el mateix conjunt de mostres;
- proposa una millora basant-se en les dades i no en una impressió.

## 🏆 Aprenentatges que hi conflueixen

- Ciències i sostenibilitat: identificació de materials, circuits de gestió local i límits dels models.
- Matemàtiques: taules de recompte, proporcions senzilles i comparació de resultats.
- Tecnologia: entrada de sensor, condicions i retroacció amb un prototip programat.
- Comunicació: justificació d'una regla i exposició de dubtes sense ocultar errors.

Adapta els criteris curriculars i la terminologia sobre residus a la normativa i a la recollida selectiva del municipi.

## Materials i preparació

- Set SPIKE Prime amb el sensor de color, hub i elements de construcció; motor només si l'equip vol afegir un mecanisme de desviament.
- Peces netes i no perilloses de colors coneguts, targetes de categories i una safata de «revisió».
- Una plantilla de registre per a lectura, decisió del programa i classificació correcta segons la regla acordada.
- Informació local sobre els contenidors o el sistema de recollida del centre.

No utilitzeu residus reals del menjador ni vidre. La prova principal es fa amb mostres netes o peces de construcció; l'objectiu és estudiar una regla, no automatitzar la gestió real del centre.

## 📅 Itinerari de cinc sessions

### Sessió 1 · Investigar el problema real

Consulteu com se separen els residus al centre i al municipi. Separeu tres idees: de quin material és l'objecte, de quin color el veu el sensor i a quin flux local correspondria. Trieu una pregunta que es puga respondre amb mostres simulades.

- Evidència: mapa del procés local i llista de dubtes que el prototip no podrà resoldre.
- Pregunta docent: «Quins objectes diferents poden tindre el mateix color?»

### Sessió 2 · Preparar dades i criteris

Seleccioneu una col·lecció menuda de peces que varie en color i forma. Definiu abans de programar quina etiqueta de color rebrà cada mostra i quines situacions aniran a «revisió». Establiu una distància aproximada i una superfície de lectura comunes.

- Evidència: taula de mostres amb color, forma, etiqueta prevista i resultat esperat.
- Predicció: quines dues peces penseu que el sensor podria confondre?

### Sessió 3 · Construir i llegir el sensor

Munteu una base estable per al sensor de color i programeu primer una lectura simple. Apropeu les peces una a una sense canviar l'angle ni la llum de la taula. Compareu què retorna el sensor amb allò que havíeu previst.

- Evidència: registre de lectura i una observació sobre les condicions que l'afecten.
- Extensió mecànica opcional: afegiu una comporta amb motor només si la lectura bàsica ja és fiable.

### Sessió 4 · Programar la regla i el cas dubtós

Convertiu les etiquetes acordades en condicions del programa. Mostreu la categoria amb la matriu del hub o una eixida visible del model. Si una lectura queda fora de les categories, el prototip ha de parar o mostrar que cal revisar-la; no ha d'inventar una certesa.

- Evidència: diagrama «lectura → regla → resposta» i prova de cada branca.
- Pregunta docent: «Què hauria de fer el prototip si dos colors semblen iguals?»

### Sessió 5 · Provar, comptar i explicar

Executeu el mateix lot de proves en la primera i la segona versió. Compteu encerts, errors i revisions necessàries; compareu la proporció d'encerts sense convertir-la en una afirmació sobre tots els residus reals.

- Evidència: taula comparativa, millora implementada i presentació del límit principal.

## 📋 Criteri d'Avaluació Curricular

Observa si l'alumnat defineix una regla comprovable, utilitza dades del sensor amb condicions consistents, registra errors i millora la solució amb arguments. Relaciona-ho amb els criteris curriculars vigents que corresponguen al curs.
{: .assessment }

## Abans de començar

Consulteu la separació de residus vigent al municipi o al centre. El contenidor adequat depén del material, de l'estat de l'objecte i de les instruccions locals; una lectura cromàtica no ho resol. Feu tota la prova amb peces netes i segures.

## 🧭 Evidències que recollirem

- Una regla de classificació documentada i una taula de proves reproduïble.
- Una comparació entre predicció i lectura real del sensor.
- Un recompte d'encerts, errors i casos que el sistema deriva a revisió.
- Una explicació de per què la maqueta no identifica per si sola els materials reals.

## ♿ Un sistema amb validació humana

El color o la forma de l'envàs no sempre n'identifica el material. Incloeu un estat «no ho sé» per demanar revisió, amplieu el conjunt de proves i mesureu en quins casos el criteri falla. No presenteu una maqueta com una classificació universal de tots els residus.

## 🔁 Revisió

Compareu el rendiment de la primera i la segona versió amb la mateixa col·lecció de proves. Cada equip explica quina classe costa de distingir, quina dada addicional ajudaria i per què en un sistema real continuaria sent necessària la validació humana.

## 🔗 Consulta tècnica

El sensor de color de SPIKE Prime pot llegir color, llum ambiental i reflectivitat; això no equival a identificar la composició d'un residu. Consulta la [fitxa tècnica oficial del sensor](https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt62a78c227edef070/5f8801b9a302dc0d859a732b/techspecs_techniccolorsensor.pdf) abans de definir distància i condicions de lectura.
