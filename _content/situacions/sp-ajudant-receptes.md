---
active: true
title: "Un ajudant de receptes en maqueta"
description: "Com podem prototipar un ajudant mecànic per a una tasca de cuina i fer que siga fàcil i segur d’utilitzar?"
robot: "spike"
robot_label: "SPIKE Prime"
cycle: "tercer-cicle"
cycle_label: "Tercer cicle"
subject: "medi"
subject_label: "Coneixement del Medi, Matemàtiques i Tecnologia"
theme: "salut"
theme_label: "Alimentació i vida quotidiana"
duration: "5 sessions · 250 min"
challenge: "Com podem prototipar un ajudant mecànic per a una tasca de cuina i fer que siga fàcil i segur d’utilitzar?"
---

![Un muntatge LEGO SPIKE Prime mou targetes de recepta i fitxes de menjar sobre una maqueta de taula.](../../_assets/imatges/sa-sp-receptes.webp)

_El prototip treballa amb targetes i aliments simulats; no toca menjar ni prepara receptes reals._

## 🌱 Situació i intenció

La biblioteca escolar prepara una mostra titulada «De l’horta a la taula» amb receptes inventades a partir de targetes d’ingredients. L’encàrrec és dissenyar un ajudant mecànic de taula que resolga una part concreta de la preparació representada: fer avançar una targeta, prémer una fitxa d’un recorregut o remenar peces lleugeres dins d’una zona de paper. Els aliments, les safates i els estris només apareixen dibuixats; el robot no toca menjar ni participa en una cuina real.

Per arrelar el repte al territori, cada equip tria una hortalissa o un altre producte que puga documentar amb una font pública de la Comunitat Valenciana, com les fitxes de cultiu del [Portal Agrari de la Generalitat](https://portalagrari.gva.es/va/formacio-i-transferencia/cerca-divulgacio-tecnica), i prepara una targeta que en cita la procedència. La recepta i el procés són ficticis: no s’hi fan afirmacions sobre temporada, nutrició o tècniques culinàries sense una font contrastada. L’objectiu tecnològic és convertir una necessitat d’ús en un prototip fàcil d’activar, repetible, revisable i segur.

## 🎯 Objectius i criteris de disseny

- Definir una tasca delimitada i identificar qui l’utilitzaria i en quin punt del procés.

- Transformar el gir del motor en una acció útil mitjançant una palanca, corró o mecanisme de moviment.

- Relacionar la longitud del braç amb el recorregut i comparar configuracions amb una prova justa.

- Ajustar velocitat, durada o rotacions a materials de maqueta diferents, registrar resultats i iterar.

- Reutilitzar una part del programa en una eina nova i explicar què cal adaptar.

- Comunicar la limitació del prototip i distingir la maqueta d’un dispositiu alimentari real.

Abans de construir, l’equip acorda quatre criteris observables: l’acció s’entén sense una explicació llarga; s’activa amb un control accessible; completa la tasca tres vegades de manera semblant; i s’atura sense colpejar, atrapar dits ni eixir de la zona de prova.

## 📅 Seqüència didàctica · 5 sessions de 50 minuts

### **Sessió 1 · Investiguem la tasca i qui la farà servir.**

Observeu les targetes de la recepta de mostra i marqueu el pas que podria beneficiar-se d’una ajuda: allisar una tira de paper, avançar una targeta d’un punt a un altre o moure fitxes d’un recorregut. No es demana reproduir cap tasca real amb aliments. Cada parella completa un mapa «persona / tasca / dificultat / ajuda possible» i formula una necessitat en una frase: «Una persona que ___ necessita que ___ perquè ___». Després ordena les targetes del procés i tria una sola acció per al primer prototip.

Compareu els exemples del brief —corró sense mànec, sandvitxera i batedor automàtic— i valoreu quins es poden representar amb seguretat. Cada equip dibuixa dues solucions, assenyala l’entrada, l’acció, la zona de treball i l’aturada, i selecciona una amb una justificació basada en els criteris acordats. **Evidència:** mapa de necessitat, dues idees anotades i decisió raonada. **Suport:** oferiu targetes visuals de tasques i frases iniciadores; **ampliació:** compareu quina part ha de fer el robot i quina convé deixar a la persona.

### **Sessió 2 · Fem una primera maqueta mecànica.**

Construïu una base SPIKE Prime estable amb un motor i un corró o braç que actue sobre paper. En el repte del corró sense mànec, connecteu una peça LEGO llarga al radi del motor tal com proposa el brief. Abans de programar, feu girar el mecanisme a mà només si el muntatge ho permet sense forçar-lo i dibuixeu què espereu que faça el paper. Marqueu una línia d’inici i una de final perquè el recorregut siga mesurable. Comproveu que cap peça pot caure sobre les mans i que hi ha espai per desconnectar l’alimentació o aturar el programa.

Compareu un braç curt i un de llarg mantenint iguals el material, la velocitat i el temps d’activació. Anoteu la distància que recorre el punt final i si l’estructura es balanceja. No conclogueu que «més llarg és sempre millor»: el braç llarg pot ampliar el recorregut i alhora reduir estabilitat o control. **Evidència:** esbós del muntatge, dues configuracions i predicció abans de la prova. **Alternativa:** si no hi ha motor lliure, feu primer la comparació amb una palanca manual i reserveu l’execució motora per a la sessió següent.

### **Sessió 3 · Programem una acció controlada.**

Activeu el motor amb el botó del hub o amb una ordre inicial simple. Creeu una seqüència d’inici, moviment i aturada, primer amb blocs i, si el grup ja en té experiència, amb Python. Proveu durada i nombre de rotacions com a dues maneres de delimitar l’acció; trieu una velocitat baixa per a la primera execució. Cada intent comença amb una predicció («amb quatre rotacions espere que la tira avance fins a…») i acaba amb un registre de valor programat, distància, desviació i incidència.

Canvieu una sola variable en cada prova. Si el corró patina, identifiqueu si la causa és el contacte, la base o el valor del programa abans de reconstruir-ho tot. Introduïu una pausa o una ordre d’aturada clara quan l’acció es complete. **Evidència:** codi comentat o diagrama, tres intents comparables i una decisió de millora. **Repte d’ampliació:** feu que l’acció es puga repetir amb un segon botó només si el programa continua tenint una aturada accessible.

### **Sessió 4 · Adaptem el programa i el reutilitzem.**

Prepareu dues tires de prova, per exemple paper fi i cartolina lleugera, amb les diferències anotades al full. No les descriviu com a aliments ni atribuïu al sensor una capacitat de detectar-ne la duresa. Modifiqueu només la configuració del motor —velocitat, potència o durada— i determineu quina funciona millor per a cada tira. Després canvieu l’eina: reutilitzeu la lògica del corró en una palanca que mou una fitxa, o en un remenador de fitxes dins d’un cercle dibuixat. Ressalteu al codi quines instruccions es conserven i quines depenen del mecanisme nou.

Com a extensió del repte oficial, afegiu un sensor del set només si aporta una entrada comprensible. Una opció és el sensor de color per llegir una marca de color gran en la targeta de recepta i seleccionar una configuració predefinida; calibreu-lo amb la llum de l’aula i oferiu sempre el botó manual equivalent. El color representa una etiqueta que ha col·locat l’equip, no reconeix un ingredient ni mesura el material. **Evidència:** taula de dues configuracions i esquema «codi que reutilitze / codi que canvie».

### **Sessió 5 · Combinem, provem i presentem.**

Combineu dues accions senzilles en una seqüència —per exemple, ordenar una targeta i avançar una fitxa— sense fer el prototip més complex del que podeu provar. Un altre equip rep la consigna sense veure el vostre esbós: ha d’explicar què fa l’ajudant, trobar el control i assenyalar com s’atura. Feu tres execucions amb la mateixa configuració; si els resultats varien, decidiu si cal ajustar la base, el recorregut o la instrucció. Prepareu una cartel·la per a la mostra amb nom de la tasca, esquema d’entrada i eixida, font de la targeta local, una dada de prova i una limitació explícita.

Tanqueu comparant el prototip amb la seqüència manual. No valoreu si el robot és «millor» en abstracte: expliqueu què fa amb més repetibilitat, què continua fent la persona i quines comprovacions serien imprescindibles abans de qualsevol ús fora de la maqueta. **Evidència:** demostració, registre final, retorn d’un altre equip i reflexió individual.

## 🧰 Materials i preparació

Set LEGO Education SPIKE Prime 45678 per equip o parella, hub carregat, un motor, peces estructurals, paper fi i cartolina lleugera, targetes pròpies amb símbols, retoladors, regla i full de registre. Sensor de color opcional si forma part de la dotació disponible. No cal expansió, utensili de cuina, menjar, líquid ni peça addicional no indicada.

Abans de la sessió, reviseu l’app i la versió del kit, proveu el port del motor, prepareu una base estable de demostració i una alternativa manual per a les targetes. Retalleu les proves a mida que no puga quedar atrapada dins del mecanisme. Organitzeu rols rotatius —disseny, muntatge, programació, registre i portaveu— perquè cada membre participe en la predicció i la prova, no sols en la construcció.

## 🧪 Evidències i criteris d’avaluació

La carpeta de procés reuneix mapa de necessitat, esbossos, criteris, esquema mecànic, codi o pseudocodi, taula de proves, adaptació a un segon material, tros de programa reutilitzat, font local i cartel·la. Useu aquesta escala breu per donar retorn durant la feina:

- **Necessitat i ús:** identifica una tasca concreta i descriu qui la faria servir; comprova si una altra persona entén l’acció.

- **Mecanisme:** relaciona braç/radi i recorregut amb mesures i reconeix el compromís amb estabilitat.

- **Programació i iteració:** delimita l’acció, registra almenys tres proves comparables i modifica una variable amb una raó.

- **Adaptació:** diferencia entre canviar el programa i canviar el mecanisme, i justifica què reutilitza.

- **Comunicació responsable:** cita la font d’una dada local i declara que la maqueta no prepara aliments ni valida seguretat alimentària.

Autoavaluació: «La prova que més m’ha ensenyat és…», «el canvi que he fet a partir d’una dada és…» i «una persona encara ha de…». El retorn entre equips ha d’incloure una fortalesa observada i una pregunta que ajude a millorar.

## ♿ Participació, cura i límits

Presenteu consignes en text i pictogrames, deixeu que la persona trie entre programació, construcció, documentació o presentació i permeteu participar sense manipular el mecanisme. Marqueu la zona de moviment amb una base clara, useu baixa velocitat i peces de prova lleugeres; ningú posa els dits davant del corró ni bloqueja el motor amb la mà. Atureu i desconnecteu el hub abans d’ajustar engranatges o retirar paper encallat. Si una peça es desprén o el muntatge es mou, pareu la prova i estabilitzeu-lo abans de continuar.

Aquest prototip no és apte per a cuinar, manipular aliments, líquids, ganivets, superfícies calentes o recipients. Una lectura de color només reconeix la marca preparada per a l’activitat. Les targetes de recepta són una representació educativa, no consell nutricional ni recepta per a consumir.

## 🔗 Referent oficial i correspondència

Partim del [SPIKE Activity Brief: RoboChef](https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt5cf523e9f737c7ac/6324c446556fbc660c8ca4ba/LE_14x8.5_LessonMat_RoboChef_WB_Mech_NoCrops.pdf?locale=en-us) de LEGO Education. La proposta conserva el repte obert d’ajudar en una tasca de preparació, les preguntes sobre què costa fer i quines eines serien útils, els tres exemples del full —corró sense mànec, sandvitxera i batedor—, el criteri de disseny fàcil d’usar, la peça LEGO llarga que amplia el radi del motor, el canvi de configuració segons el material, la reutilització del programa en altres eines, la incorporació opcional de sensors i el repte de combinar més d’una tasca. Aquests elements apareixen en el brief oficial de dues pàgines; la seqüència de cinc sessions, la temàtica valenciana, les targetes, les proves, els criteris i la il·lustració són elaboració pròpia. La programació per blocs o Python es tria segons la versió de l’app i l’experiència de l’equip.
