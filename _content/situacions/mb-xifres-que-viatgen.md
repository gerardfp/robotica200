---
active: true
title: "Xifres que viatgen"
description: "Com podem crear, provar i programar un xifrat de Cèsar i explicar per què no protegeix informació actual?"
robot: "microbit"
robot_label: "micro:bit"
cycle: "tercer-cicle"
cycle_label: "Tercer cicle"
subject: "tecnologia"
subject_label: "Història, Matemàtiques i Programació"
theme: "historia"
theme_label: "Missatges i patrimoni"
duration: "4 sessions · 200 min"
challenge: "Com podem codificar i descodificar un missatge amb un algorisme, i quins límits té el xifrat de Cèsar?"
---

![Una placa micro:bit acompanya un disc de xifrat de paper i un missatge plegat sense text llegible.](../../_assets/imatges/sa-mb-xifres-viatgen.webp)

_Els missatges són inventats i els xifrats històrics s’estudien com a algoritmes, no com a protecció moderna._

## 🌱 Situació i intenció

L’arxiu imaginari d’un museu local prepara una xicoteta exposició sobre com les persones han transformat missatges per transmetre’ls. Cada equip crea una peça didàctica: una nota inventada, un disc de Cèsar, una explicació de l’algorisme i una demostració programada. Per donar-li arrelament, la nota pot contenir una dada cultural comprovada en una font pública de la localitat —un nom, una data o una ubicació—, però mai informació personal ni cap secret real.

La proposta combina història, llengua, matemàtiques i programació. Està seqüenciada per al tercer cicle de primària; la unitat oficial de micro:bit s’adreça a alumnat d’11 a 14 anys, de manera que ací el context i el codi s’introdueixen amb passos guiats. La programació textual és una ampliació: si el grup encara no coneix Python, pot completar la mateixa lògica amb pseudocodi i taules de seguiment.

## 🎯 Què aprendrem?

- Distingir missatge original, regla de transformació, clau, xifrat i desxifrat.

- Descriure i executar un algorisme reversible, incloent-hi el retorn de Z a A.

- Comparar el resultat manual amb una traça de programa i corregir errors amb proves.

- Explicar per què un xifrat de Cèsar és un model didàctic feble i no protegeix dades actuals.

- Documentar la procedència d’una dada cultural pública i comunicar-la sense revelar dades personals.

## 📅 Seqüència didàctica · 4 sessions de 50 minuts

### **Sessió 1 · Una història, moltes claus.**

En grups, ordeneu quatre targetes: missatge, clau, transformació i resultat. Poseu en comú què necessita saber qui rep el missatge per recuperar-lo. Construïu una línia del temps breu amb exemples documentats de comunicació secreta: un xifrat de substitució antic i el treball de desxiframent durant la Segona Guerra Mundial. Presenteu Alan Turing dins del treball col·lectiu de Bletchley Park i reconeixeu que aquest treball també va aprofitar investigacions poloneses anteriors. Tanqueu amb la pregunta: què pot amagar una regla senzilla i què pot revelar-la?

### **Sessió 2 · El disc i les convencions.**

Fabriqueu dos cercles de cartó amb les lletres A–Z i marqueu un desplaçament acordat. Xifreu una frase breu inventada i intercanvieu-la amb un altre equip, que l’ha de desxifrar amb la mateixa clau. Acord de llengua per a tota la seqüència: es treballa amb A–Z en majúscula; els espais, accents, Ç, números i signes es conserven sense canvis. Així, en «PLAÇA» només es transformen P, L i A; la Ç es manté. Anoteu aquesta convenció al costat de cada missatge: sense una regla compartida, els equips poden obtindre resultats diferents encara que el gir siga el mateix.

### **Sessió 3 · De la regla al pseudocodi.**

Representeu cada lletra com una posició de 0 a 25. Per xifrar, sumeu el desplaçament i feu la volta a l’alfabet quan el valor supera 25; per desxifrar, resteu-lo i feu la volta en sentit contrari. Ompliu una taula de traça amb lletra, posició, desplaçament i resultat. Proveu desplaçaments 0, 1, 3 i 25, i casos de frontera com A amb −1 i Z amb +1. Afegiu espais i puntuació per comprovar que queden intactes. Una parella rep una targeta amb un error deliberat —no fer la volta de Z a A—, el detecta amb un cas mínim i explica quin pas del pseudocodi cal corregir. Com a extensió, proveu totes les claus possibles sobre una frase de mostra i observeu com el context pot revelar el missatge.

### **Sessió 4 · Programar, comparar i explicar.**

Escriviu funcions separades per xifrar i desxifrar. El programa passa el text a majúscules, transforma només les lletres A–Z i conserva la resta; per a cada lletra, calcula la posició amb la regla modular. Executeu les mateixes proves que al disc i compareu, caràcter per caràcter, el resultat manual i el del programa. La micro:bit serveix de dispositiu per executar el programa; la matriu LED no és adequada per mostrar frases llargues, així que useu la consola de l’entorn quan estiga disponible o una traça impresa/visualitzada en l’ordinador. Prepareu una cartel·la per a l’exposició que incloga la clau, la convenció, una prova de reversibilitat i una advertència sobre els límits del mètode.

## 🧰 Materials i preparació

Micro:bit, ordinador amb un entorn Python compatible, paper o cartolina, tisores, enquadernador o llapis per al centre del disc, retoladors i targetes de proves. Prepareu missatges inventats i una plantilla amb l’alfabet A–Z. Si no hi ha plaques, ordinadors o experiència prèvia amb Python, les sessions 3 i 4 es poden completar amb pseudocodi, taula de traça i targetes de paper; l’objectiu conceptual continua sent el mateix.

Abans de començar, comproveu que tot el grup usa la mateixa convenció d’alfabet i que les frases no inclouen noms, contrasenyes, ubicacions privades ni informació identificable. Si s’incorpora una dada del patrimoni local, l’equip n’anota la font pública i la contrasta amb la fitxa original.

## 🧪 Evidències i avaluació

Recolliu una línia del temps amb fonts, el disc i la convenció escrita, un exemple xifrat i desxifrat, el pseudocodi, una taula de traça amb casos normals i de frontera, el codi o model de paper i la cartel·la final. Observeu si l’alumnat:

- identifica correctament clau, missatge i transformació;

- aplica el desplaçament i el retorn circular sense perdre caràcters que no són lletres;

- usa proves que inclouen límits i explica què revela cada prova;

- compara el resultat manual amb el programa i localitza un error de manera raonada;

- comunica amb precisió que el mètode és vulnerable i cita les fonts de les dades culturals.

Per a l’autoavaluació, cada alumne completa: «La meua regla és reversible perquè…», «el cas que més m’ha ajudat a trobar errors és…» i «no compartiria aquest mètode per a…».

## ♿ Accés i participació

Oferiu el disc amb lletres grans i contrastades, una plantilla ja retallada, lectura en veu alta de les instruccions i una versió digital accessible. Repartiu rols rotatius —historiador/a de fonts, operador/a del disc, verificador/a i programador/a— perquè la manipulació, la lectura i l’escriptura de codi no recaiguen sempre en la mateixa persona. Qui necessite més suport pot treballar amb un desplaçament fix i frases curtes; qui avance amb facilitat pot implementar una segona convenció o provar l’atac per força bruta i explicar-ne el cost.

## 🔒 Límits i ús responsable

El xifrat de Cèsar té només 25 desplaçaments útils i es pot trencar provant-los tots o aprofitant paraules previsibles. Serveix per estudiar algoritmes, modularitat i història; no és una protecció per a comptes, missatges reals o dades personals. Tots els textos de prova són inventats. La mostra de patrimoni local, si n’hi ha, és una dada ja pública i es publica amb la seua font, mai associada a una persona.

## 🔗 Unitat oficial adaptada

Aquesta situació adapta la unitat de micro:bit [Introduction to cryptography](https://www.microbit.org/teach/lessons/cryptography/) i les seues tres lliçons: [What is cryptography?](https://www.microbit.org/teach/lessons/cryptography-what-is/), [Caesar cipher algorithms](https://www.microbit.org/teach/lessons/cryptography-caesar-cipher/) i [Ciphers and text-based programming](https://www.microbit.org/teach/lessons/cryptography-text-based-programming/). Es conserven els eixos de context històric, creació i descodificació del xifrat de Cèsar, disseny i depuració d’algorismes i programació textual amb Python; la seqüència, els missatges, les proves i la narrativa del museu són propis. L’original està pensat per a 11–14 anys: ací s’adapta al tercer cicle amb bastides, convencions explícites i l’opció de fer l’extensió de Python de manera guiada.
