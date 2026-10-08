---
active: true
title: "Alertes per al bosc i l’hort"
description: "Com poden ajudar les comunicacions de micro:bit a protegir un arbre i com representar un sensor de cultiu amb seguretat?"
robot: "microbit"
robot_label: "micro:bit"
cycle: "tercer-cicle"
cycle_label: "Tercer cicle"
subject: "medi"
subject_label: "Ciències, Tecnologia i Matemàtiques"
theme: "sostenibilitat"
theme_label: "Biodiversitat i cultiu"
duration: "4 sessions · 200 min"
challenge: "Com podem enviar un avís de protecció i representar un sensor de cultiu sense exposar la placa a l’aigua o al sòl?"
---

![Una placa micro:bit acompanya una planta en test i targetes d’observació per imaginar un sistema d’avís.](../../_assets/imatges/sa-hivernacle-microbit.webp)

_Els muntatges són prototips de ràdio i sensor; no vigilen boscos ni controlen el reg real._

## 🌱 Situació i intenció

Una classe de tercer cicle investiga dues preguntes sobre un hort i un espai verd escolar: com podria un node avisar que cal revisar una zona de planter, i com podríem representar una lectura d’humitat abans de decidir què fer? Els dos reptes oficials s’adapten en un prototip de comunicació i un de lectura/decisió. Les proves es fan amb maquetes i valors de laboratori: cap placa vigila un bosc, pren imatges, controla una bomba ni decideix el reg d’una planta real.

La fundació presenta les activitats per a 11–14 i 14–16 anys. Aquesta versió les escala a tercer cicle de primària: simplifica la instrumentació, modela els sensors externs i posa l’accent en el disseny, les dades, la ràdio i els límits. No es presenta com una equivalència d’edat ni com un sistema IoT desplegable.

## 🎯 Aprenentatges i vocabulari

- Convertir una necessitat de protecció o cultiu en criteris observables per a un prototip.
- Programar emissor i receptor de ràdio i comprovar recepció amb missatges ficticis i intents repetits.
- Interpretar lectures simulades o d’un sensor addicional només després de verificar el maquinari i el programa.
- Explicar que el prototip no vigila fauna, no controla un cultiu real i no ha d’exposar la placa a l’aigua o al sòl.

## 🧰 Preparació, materials i coneixements

Necessiteu una o preferiblement dues plaques micro:bit, MakeCode, ordinador o tauleta, cable USB, targetes de condició/missatge, full de dades i materials secs per a construir una maqueta. La ràdio i els botons són funcions integrades. La micro:bit no té sensor d’humitat del sòl, relé ni connexió a internet integrats; per a fer la lectura amb maquinari real cal un sensor analògic i un circuit de baixa tensió compatible que el centre verifique. Si no es disposa d’aquests components, els botons A/B seleccionen valors simulats que s’identifiquen clarament com a dades de prova. No connecteu probes descobertes a terra humida ni cap càrrega a tensió de xarxa.

Abans de la sessió, proveu que les dues plaques comparteixen el mateix grup de ràdio i que poden enviar/rebre missatges; prepareu un receptor de reserva si la connexió falla. Definiu què compta com a “sec” només per a la simulació de classe. No traduïu el valor de maqueta a un llindar de reg real: els sensors, el sòl, l’espècie i l’entorn canvien la lectura.

## 📅 Seqüència didàctica · quatre sessions de 50 minuts

### **Sessió 1 · De la necessitat al criteri del protector d’arbres.**

#### Fase 1 · Activem i prediem

Llegiu una fitxa fictícia d’un viver o d’un arbre jove del pati i relacioneu-la amb la protecció de la biodiversitat i l’ODS 15.

#### Fase 2 · Explorem i construïm

En un diagrama IPO, escriviu l’entrada que inicia la prova (botó que simula una vibració o una incidència), el procés de decidir si cal avisar i les eixides possibles.

#### Fase 3 · Expliquem i registrem

Dibuixeu el node sensor, el missatge per ràdio, el node receptor i la persona responsable que interpreta l’avís; distingiu aquesta xarxa local de prova d’una instal·lació real amb passarel·la a internet.

#### Fase 4 · Apliquem i millorem

Acordeu quatre criteris mesurables: només s’envia el codi acordat, el receptor el mostra, un altre codi no es confon amb l’alerta i cap dada identifica persones o llocs sensibles.

#### Fase 5 · Comprovem i reflexionem

Anoteu una limitació o una situació en què l’avís podria ser fals. Evidència: diagrama, criteris i taula de casos previstos.

### **Sessió 2 · Construir i provar un avís de ràdio.**

#### Fase 1 · Activem i prediem

Trieu dos codis curts i inequívocs, com `REVISA` i `PROVA`, que no incloguen noms, coordenades ni informació sobre una persona. Abans d’enviar-los, cada equip escriu quin missatge espera veure al receptor i què hauria de passar si arriba un codi diferent. Llegiu les regles de ràdio acordades i comproveu que els dos dispositius comparteixen el mateix grup; amb una sola placa, feu la predicció amb targetes i marqueu-la com a simulació, no com a recepció provada.

#### Fase 2 · Explorem i construïm

En una placa, establiu grup de ràdio i envieu el missatge només quan es prema el botó seleccionat; afegiu una icona que indique que s’ha enviat.

#### Fase 3 · Expliquem i registrem

En l’altra placa, espereu el missatge i mostreu una icona o paraula curta quan arribe; no feu que el receptor active actuadors.

#### Fase 4 · Apliquem i millorem

Feu cinc intents a distància curta amb el mateix grup; registreu enviaments i recepcions. Repetiu amb un grup diferent per comprovar que no es barregen les proves. No cal allunyar plaques del docent ni provar cobertura fora de l’aula.

#### Fase 5 · Comprovem i reflexionem

Marqueu falsos avisos, missatges perduts i una millora. Amb una sola placa, una persona pot fer d’emissor i una altra de receptor amb targetes de paper, però aquesta alternativa no es compta com a transmissió de ràdio provada.

### **Sessió 3 · Dades d’humitat i decisió de l’Auto-farmer.**

#### Fase 1 · Activem i prediem

Compareu què vol dir “sec”, “intermedi” i “humit” en tres mostres simulades; si hi ha sensor extern, consulteu les seues instruccions, calibreu-lo segons el centre i manteniu-lo separat de la placa.

#### Fase 2 · Explorem i construïm

Useu A/B per seleccionar valors inventats (per exemple 250, 500 i 750) o llegiu l’entrada analògica disponible; mostreu número o barra LED.

#### Fase 3 · Expliquem i registrem

Formuleu una regla com “si lectura simulada < llindar de prova, mostrar ‘cal revisar’”; representeu eixida com a icona, missatge o LED, no com a reg efectiu.

#### Fase 4 · Apliquem i millorem

Proveu valors just per davall, iguals i per damunt del llindar i anoteu què mostra el programa.

#### Fase 5 · Comprovem i reflexionem

Distingiu lectura, interpretació i decisió humana. Evidència: pseudocodi, codi i taula valor/eixida.

### **Sessió 4 · Integrar els nodes i comunicar-ne els límits.**

#### Fase 1 · Activem i prediem

Representeu un planter de maqueta i decidiu quina placa fa de node de dades i quina rep el missatge.

#### Fase 2 · Explorem i construïm

Combineu lectura simulada o externa, comparació amb llindar i missatge de ràdio; feu que l’avís diga “revisió necessària” i no “reg automàtic”.

#### Fase 3 · Expliquem i registrem

Executeu una matriu de cinc casos, incloent lectura baixa, igual al llindar, alta, cap missatge i grup incorrecte; compareu criteris acordats amb resultats.

#### Fase 4 · Apliquem i millorem

Dibuixeu quin sensor compatible o relé de baixa tensió verificat caldria per avançar el prototip, quin risc o error s’hauria de resoldre i qui supervisaria una prova real.

#### Fase 5 · Comprovem i reflexionem

Presenteu diagrama, dades, prototip i límit principal a un altre equip, que deixa una pregunta. Evidència: sistema en maqueta, matriu de proves i revisió de disseny.

## 📋 Criteris d’èxit i avaluació

La proposta és satisfactòria quan l’equip (1) diferencia ràdio integrada, sensor extern, relé i passarel·la; (2) programa un missatge enviat per una condició acordada i comprova que arriba al receptor; (3) representa valors d’humitat amb una font identificada —simulada o externa— i prova el llindar per baix, igual i per damunt; (4) manté una persona en la decisió final; i (5) comunica què no permet concloure el seu prototip. Recolliu diagrama IPO/xarxa, fragments de codi o pseudocodi, taula dels cinc intents, matriu d’entrada/eixida, proposta d’ampliació i reflexió. Valoreu exactitud del registre, depuració basada en evidència i justificació; no es puntua que el senyal arribe lluny ni que la maqueta regue.

## ♿ Accessibilitat, privacitat i seguretat

Oferiu missatges amb icones i paraules, opcions de resposta no oral, valors en targetes de mida gran i rols alterns de programació, observació, registre i explicació. Les transmissions són codis de laboratori, sense noms, ubicacions detallades ni dades personals. Manteniu plaques i circuits secs, useu només alimentació USB/baixa tensió dins les especificacions del fabricant i no connecteu bombes, relés de xarxa o vàlvules. Cap prototip s’instal·la en arbres, boscos, hivernacles ni espais públics.

## 🔗 Reptes oficials adaptats

[Tree protector](https://www.microbit.org/teach/lessons/helping-plants-grow-trees/) proposa usar la ràdio de micro:bit per enviar alertes des d’un sensor prototip i introduir com els nodes IoT es connecten mitjançant passarel·les; el repte destaca l’ODS 15, el producte que compleix criteris i una ampliació. [Auto-farmer](https://www.microbit.org/teach/lessons/helping-plants-grow-auto-farmer/) proposa relés i sensors d’humitat casolans per detectar cultius secs, transmetre dades i estalviar aigua. Aquesta adaptació manté el problema de disseny, el flux de dades, les condicions i la revisió del prototip, però modela les entrades/actuacions quan la dotació no inclou sensor o relé. Les pàgines oficials indiquen franges d’11–14 i 14–16 anys i enllacen guies, diapositives i fulls; el pla local per a primària és una adaptació simplificada pròpia, no una reproducció d’aquests materials docents.
