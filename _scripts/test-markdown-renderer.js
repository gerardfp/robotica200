#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const renderer = require("../_js/markdown.js");

const root = path.resolve(__dirname, "..");
const pilotPath = path.join(root, "_content/situacions/sp-llistes-condicions.md");
const pilot = renderer.parse(fs.readFileSync(pilotPath, "utf8"), "https://example.test/_content/situacions/sp-llistes-condicions.md");
assert.equal(pilot.data.title, "Lògica per a una escola oberta");
assert.equal(pilot.data.robot, "spike");
assert.equal(pilot.steps.length, 6, "cada lliçó ha de ser una targeta navegable");
assert.match(pilot.html, /x-for="\(item, index\) in steps"/, "els controls del wizard són HTML d'Alpine generat amb la plantilla");
assert.match(pilot.html, /learning-wizard-step-separator/, "el número i el nom del pas tenen un separador visible consistent");
assert.match(pilot.html, /x-show="step === 0" x-cloak/, "el pas actiu es controla amb Alpine");
assert.equal((pilot.html.match(/class="learning-phase"/g) || []).length, 30, "cada lliçó mostra les cinc fases comunes");
assert.equal((pilot.html.match(/class="code-panel"/g) || []).length, 2, "els exemples pseudocodi i Python es renderitzen com a blocs");
assert.equal((pilot.html.match(/class="sa-illustration"/g) || []).length, 1, "la portada Markdown es renderitza com a figura de situació");
assert.match(pilot.html, /<figcaption>Una llista guarda/, "els peus d'imatge separats per una línia en blanc es mantenen dins de la figura");
assert.doesNotMatch(pilot.html, /<p>_[^<]+_<\/p>/, "el peu d'imatge no apareix amb els guions baixos literals");
assert.match(pilot.html, /syntax-keyword/, "el codi Python rep ressaltat sintàctic");

const legacyNumberedStep = renderer.parse(`---\ntitle: Pas numerat\n---\n## Seqüència didàctica\n### 1Auditem el problema\nText de prova.`, "https://example.test/legacy.md");
assert.equal(legacyNumberedStep.steps[0].title, "Auditem el problema", "el wizard elimina el número antic enganxat al títol i evita duplicar-lo");
assert.match(pilot.html, /href="https:\/\/assets\.education\.lego\.com\//, "els enllaços externs es conserven");
const wind = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/sp-vent-model.md"), "utf8"), "https://example.test/_content/situacions/sp-vent-model.md");
assert.match(wind.html, /markdown-note-question/, "la pregunta guia es mostra com una nota visual");
assert.match(wind.html, /markdown-note-limit/, "els límits del model es ressalten com a informació contextual");
assert.match(wind.html, /<ol><li>Escriviu una taula/, "les instruccions numerades es renderitzen com una seqüència clara");
assert.match(wind.html, /markdown-note-materials/, "els materials es presenten en un bloc identificable");
assert.match(wind.html, /markdown-note-evidence/, "les evidències es presenten en un bloc identificable");
const trainingTrackers = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/sp-rampa-dades.md"), "utf8"), "https://example.test/_content/situacions/sp-rampa-dades.md");
assert.equal(trainingTrackers.steps.length, 6, "Training Trackers conserva les sis lliçons oficials");
assert.equal((trainingTrackers.html.match(/class="learning-phase"/g) || []).length, 30, "les sis lliçons de Training Trackers es desglossen en cinc fases llegibles cadascuna");
assert.equal(trainingTrackers.steps.filter(item => /Watch Your Steps|Stretch with Data|This Is Uphill|Time for Squat Jumps|Aim for It|The Obstacle Course/.test(item.title)).length, 6, "cada pas manté visible la lliçó oficial de Training Trackers que adapta");
assert.match(trainingTrackers.html, /dibuixa dues o tres idees/i, "The Obstacle Course conserva la ideació de dos o tres prototips per parelles");
assert.match(trainingTrackers.html, /dades i el vídeo sostenen la hipòtesi/i, "The Obstacle Course contrasta el model amb dades i una demostració enregistrada");
assert.match(trainingTrackers.html, /identificar els elements clau del problema/i, "The Obstacle Course inclou criteris d'avaluació alineats amb el pla oficial");
assert.match(trainingTrackers.html, /entrada de portafolis o un vídeo/i, "The Obstacle Course conserva una comunicació multimèdia accessible i sense dades personals");
assert.match(trainingTrackers.html, /adapteu el programa de l’app perquè transmeta en directe les lectures del giroscopi al gràfic de línies/i, "Stretch with Data conserva el registre del sensor en temps real");
assert.match(trainingTrackers.html, /adapteu el programa per a representar dos valors alhora/i, "Stretch with Data manté la comparació de gràfiques amb valors combinats");
assert.match(trainingTrackers.html, /no es recullen dades corporals/i, "l'adaptació elimina la recollida de dades corporals sense perdre les proves de moviment del sensor");
assert.match(trainingTrackers.html, /variable de consum del motor/i, "This Is Uphill registra el mateix indicador del motor que la lliçó oficial");
assert.match(trainingTrackers.html, /no una mesura directa d’energia en joules/i, "This Is Uphill no presenta la lectura del motor com una mesura directa d'energia física");
assert.match(trainingTrackers.html, /sense pressuposar que siga lineal/i, "l'extensió de proporcionalitat de This Is Uphill es contrasta amb dades i no es dona per feta");
assert.match(trainingTrackers.html, /lectura mínima mentre puja/i, "Time for Squat Jumps calcula l'altura a partir del canvi mesurat pel sensor de distància");
assert.match(trainingTrackers.html, /taula de nou proves de distància\/regla/i, "Time for Squat Jumps conserva tres repeticions per a cadascuna de tres altures");
assert.match(trainingTrackers.html, /dona directament una altura exacta/i, "les estimacions alternatives d'altura indiquen el seu marge d'incertesa");
assert.match(trainingTrackers.html, /recompte automàtic/i, "Watch Your Steps contrasta el recompte amb una observació independent");
assert.match(trainingTrackers.html, /tres recorreguts de tres, cinc i set cicles/i, "Watch Your Steps calibra el recompte amb recorreguts repetits");
assert.match(trainingTrackers.html, /fals recompte/i, "Watch Your Steps prova l'efecte d'una variable i fa visible el fals recompte");
assert.match(trainingTrackers.html, /dos canvis de sentit d’un cicle/i, "Watch Your Steps defineix un cicle observable del model");
assert.match(trainingTrackers.html, /cicles detectats × 60 cm/i, "Watch Your Steps converteix el recompte en una distància coneguda del model");
assert.match(trainingTrackers.html, /error relatiu del programa com \|automàtic − manual\| \/ manual × 100/i, "Watch Your Steps quantifica l'error del recompte automàtic");
assert.match(trainingTrackers.html, /rotacions × circumferència/i, "Aim for It converteix les rotacions en distància abans de trobar la velocitat");
assert.match(trainingTrackers.html, /velocitat màxima inicial/i, "Aim for It calcula l'energia a partir de la velocitat màxima observada");
assert.match(trainingTrackers.html, /tres intents per acostar el vehicle/i, "Aim for It conserva els tres intents del repte de precisió");
assert.match(trainingTrackers.html, /sumeu les tres distàncies/i, "Aim for It puntua la distància acumulada dels tres intents");
for (const file of ["hivernacle-microbit.md", "sp-prime-combinat.md"]) {
  const record = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions", file), "utf8"), `https://example.test/_content/situacions/${file}`);
  assert.equal((record.html.match(/data-section-group="sequence"/g) || []).length, 1, `${file} té una sola secció de seqüència`);
  assert.equal((record.html.match(/data-section-group="official"/g) || []).length, 1, `${file} classifica els reptes oficials com a referents, no com a passos`);
}
const computingFoundations = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/mb-fonaments-computacio.md"), "utf8"), "https://example.test/_content/situacions/mb-fonaments-computacio.md");
assert.equal(computingFoundations.steps.length, 6, "Computing fundamentals conserva les sis lliçons oficials");
assert.equal((computingFoundations.html.match(/class="learning-phase"/g) || []).length, 30, "les sis lliçons de Computing fundamentals comparteixen cinc fases cadascuna dins del wizard");
assert.doesNotMatch(computingFoundations.html, /Detall de les sis experiències/, "la seqüència no duplica les sessions en una secció posterior");
const createAiUnit = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/mb-models-moviment.md"), "utf8"), "https://example.test/_content/situacions/mb-models-moviment.md");
assert.equal(createAiUnit.steps.length, 7, "First lessons with CreateAI conserva les set lliçons oficials");
assert.equal((createAiUnit.html.match(/class="learning-phase"/g) || []).length, 35, "les set lliçons de CreateAI comparteixen cinc fases cadascuna");
for (const step of createAiUnit.steps) {
  const start = createAiUnit.html.indexOf(`id="${step.id}"`);
  const end = createAiUnit.html.indexOf('<section class="learning-step"', start + 10);
  const markup = createAiUnit.html.slice(start, end < 0 ? undefined : end);
  assert.equal((markup.match(/class="learning-phase(?: learning-phase-default)?"/g) || []).length, 5, `${step.title} presenta les cinc fases comunes`);
}
assert.match(createAiUnit.html, /eixida neutral per a «unknown»/i, "la seqüència conserva una eixida segura per a les classificacions desconegudes");
assert.match(createAiUnit.html, /conjunt reservat/i, "el model es prova amb dades separades de les dades d'entrenament");
assert.match(createAiUnit.html, /codis anònims/i, "la recollida evita identificar les persones voluntàries");
const responsibleAi = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/mb-ia-exercici-responsable.md"), "utf8"), "https://example.test/_content/situacions/mb-ia-exercici-responsable.md");
assert.equal(responsibleAi.steps.length, 8, "Developing AI literacy conserva les huit lliçons oficials");
assert.equal((responsibleAi.html.match(/class="learning-phase"/g) || []).length, 40, "les huit lliçons d'IA responsable comparteixen cinc fases cadascuna");
for (const step of responsibleAi.steps) {
  const start = responsibleAi.html.indexOf(`id="${step.id}"`);
  const end = responsibleAi.html.indexOf('<section class="learning-step"', start + 10);
  const markup = responsibleAi.html.slice(start, end < 0 ? undefined : end);
  assert.equal((markup.match(/class="learning-phase(?: learning-phase-default)?"/g) || []).length, 5, `${step.title} presenta les cinc fases comunes`);
}
assert.match(responsibleAi.html, /sense classificar/i, "la seqüència preveu una resposta per a prediccions desconegudes");
assert.match(responsibleAi.html, /No envieu alertes/i, "el temporitzador no genera alertes de salut ni puntuacions");
assert.match(responsibleAi.html, /conjunt de prova separat/i, "les dades de prova es mantenen separades de les dades d'entrenament");
const energyAwareness = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/mb-energia-aula.md"), "utf8"), "https://example.test/_content/situacions/mb-energia-aula.md");
assert.equal(energyAwareness.steps.length, 6, "Energy awareness conserva les sis lliçons oficials");
assert.equal((energyAwareness.html.match(/class="learning-phase"/g) || []).length, 30, "les sis lliçons d'Energy awareness comparteixen cinc fases cadascuna");
for (const step of energyAwareness.steps) {
  const start = energyAwareness.html.indexOf(`id="${step.id}"`);
  const end = energyAwareness.html.indexOf('<section class="learning-step"', start + 10);
  const markup = energyAwareness.html.slice(start, end < 0 ? undefined : end);
  assert.equal((markup.match(/class="learning-phase(?: learning-phase-default)?"/g) || []).length, 5, `${step.title} presenta les cinc fases comunes`);
}
assert.match(energyAwareness.html, /el sensor observa la llum que li arriba, no l’electricitat/i, "el model de llum no es confon amb un comptador elèctric");
assert.match(energyAwareness.html, /40 W = 0,04 kW/i, "el càlcul d'energia conserva un exemple explícit amb unitats");
assert.match(energyAwareness.html, /ningú multiplica directament la lectura ambiental/i, "la lectura de llum no s'usa com si fora una mesura de consum");
const dataHandling = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/mb-dades-pati.md"), "utf8"), "https://example.test/_content/situacions/mb-dades-pati.md");
assert.equal(dataHandling.steps.length, 5, "Data handling conserva les cinc lliçons oficials");
assert.equal((dataHandling.html.match(/class="learning-phase"/g) || []).length, 25, "les cinc lliçons de Data handling comparteixen cinc fases cadascuna");
for (const step of dataHandling.steps) {
  const start = dataHandling.html.indexOf(`id="${step.id}"`);
  const end = dataHandling.html.indexOf('<section class="learning-step"', start + 10);
  const markup = dataHandling.html.slice(start, end < 0 ? undefined : end);
  assert.equal((markup.match(/class="learning-phase(?: learning-phase-default)?"/g) || []).length, 5, `${step.title} presenta les cinc fases comunes`);
}
assert.match(dataHandling.html, /no anoteu qui hi era/i, "la caça de dades preserva la privacitat de les persones al pati");
assert.match(dataHandling.html, /repeteix|repetició/i, "el gadget d'exemple integra una lectura repetida de sensor");
assert.match(dataHandling.html, /mapa d’estats/i, "l'assistent digital es prova amb un mapa d'estats i botons A/B");
const codeyCourseSource = fs.readFileSync(path.join(root, "_content/situacions/cr-museu-jocs-programats.md"), "utf8");
const codeyCourse = renderer.parse(codeyCourseSource, "https://example.test/_content/situacions/cr-museu-jocs-programats.md");
const codeySensorsSource = fs.readFileSync(path.join(root, "_content/situacions/cr-entrades-sensors.md"), "utf8");
const codeySensors = renderer.parse(codeySensorsSource, "https://example.test/_content/situacions/cr-entrades-sensors.md");
const codeyColorLesson = codeySensorsSource.slice(codeySensorsSource.indexOf("### **Sessió 9"), codeySensorsSource.indexOf("### **Sessió 10"));
assert.match(codeyColorLesson, /sa-cr-sensor-color-proves\.webp/, "la lliçó de sensor de color intercala una il·lustració específica de la prova");
assert.match(codeyColorLesson, /sensor no identifica què és l’objecte/i, "la il·lustració de color no atribueix reconeixement semàntic al sensor");
assert.match(codeySensors.html, /About Codey Rocky[\s\S]*sensor de color\/proximitat/i, "la fitxa enllaça la verificació del sensor amb la guia del fabricant");
assert.equal(codeyCourse.steps.length, 24, "la situació de Codey Rocky conserva les 24 lliçons oficials com a passos identificables");
assert.equal(codeyCourse.steps[0].title, "El secret de Codey Rocky · del problema al primer programa (40 min)", "el wizard mostra el títol de la lliçó sense duplicar-ne el codi numèric");
assert.equal(codeyCourse.steps[23].title, "Segueix la línia (40 min)", "l'última lliçó manté el títol i la durada en el selector comú");
assert.equal((codeyCourse.html.match(/class="learning-phase"/g) || []).length, 120, "les 24 lliçons de Codey Rocky comparteixen cinc fases navegables cadascuna");
assert.match(codeyCourse.html, /Segueix les instruccions/, "la lliçó 2 conserva el joc desconnectat oficial dels esdeveniments");
assert.match(codeyCourse.html, /quan es prem A.{0,100}B.{0,100}C/s, "la lliçó 2 prova entrades de botó diferents");
assert.match(codeyCourse.html, /esdeveniment d’inici/, "la lliçó 2 diferencia inici i botó com a esdeveniments");
assert.match(codeyCourse.html, /Cada parella presenta una resposta/, "la lliçó 2 acaba amb presentació i comprovació entre equips");
assert.match(codeyCourse.html, /quatre illots de la marjal/, "la lliçó 5 contextualitza la repetició comptada en un itinerari local");
assert.match(codeyCourse.html, /repeteix \(4\)/, "la lliçó 5 fa visible el recompte del bucle en el repte propi");
assert.match(codeyCourse.html, /resultat de la prova entre parelles/, "la lliçó 5 inclou verificació i retorn entre equips");
assert.match(codeyCourse.html, /cicle de llum i foscor/, "la lliçó 6 adapta el patró cíclic infinit a un context de marjal");
assert.match(codeyCourse.html, /repeteix/, "la lliçó 6 manté una animació comptada per comparar");
assert.match(codeyCourse.html, /per sempre/, "la lliçó 6 construeix l'animació amb bucle infinit");
assert.match(codeyCourse.html, /botó C.{0,160}aturar els scripts actius/s, "la lliçó 6 defineix una acció concreta d'aturada");
assert.match(codeyCourse.html, /cap avall per llegir color.{0,80}cap avant per detectar un obstacle/, "la lliçó 7 separa les orientacions físiques del sensor IR");
assert.match(codeyCourse.html, /no dues lectures simultànies/, "la lliçó 7 no atribueix dos sensors simultanis a un únic mòdul orientable");
assert.match(codeyCourse.html, /repeteix 3/, "la lliçó 8 inclou la missió amb repetició comptada");
const codeyLesson8 = codeyCourseSource.slice(codeyCourseSource.indexOf("### **L8 ·"), codeyCourseSource.indexOf("### **L9 ·"));
assert.match(codeyLesson8, /tres orientacions possibles[\s\S]*cap a l’esquerra[\s\S]*cap a la dreta[\s\S]*cap avant/i, "la lliçó 8 enumera les tres orientacions de la missió oficial");
assert.match(codeyLesson8, /paret davant[\s\S]*gireu a la dreta 90°[\s\S]*repetiu la comprovació tres vegades com a màxim/i, "la lliçó 8 repeteix les condicions d'obstacle fins a trobar l'eixida");
assert.match(codeyLesson8, /gireu a l’esquerra 90° per incorporar-vos a la recta/i, "la lliçó 8 conserva el gir d'incorporació del repte oficial");
assert.match(codeyLesson8, /velocitat més alta que hàgeu comprovat/i, "la lliçó 8 adapta la velocitat alta a una comprovació segura del recorregut");
assert.match(codeyLesson8, /sa-cr-estacio-servei\.webp/i, "la lliçó 8 intercala una il·lustració pròpia de l'estació i el túnel de prova");
assert.match(codeyLesson8, /operador `<`[\s\S]*llindar/i, "la lliçó 8 practica un comparador amb el sensor de llum");
assert.match(codeyLesson8, /sensor de llum integrat només en la prova separada/i, "la lliçó 8 separa el sensor de llum del mòdul IR orientable");
assert.match(codeyLesson8, /valors relatius del sensor, no lux calibrats/, "la lliçó 8 no presenta la lectura ambiental com a lux calibrats");
const codeyLesson9 = codeyCourseSource.slice(codeyCourseSource.indexOf("### **L9 ·"), codeyCourseSource.indexOf("### **L10 ·"));
const codeyLesson9Blocks = [...codeyLesson9.matchAll(/```blocks\n([\s\S]*?)```/g)].map(match => match[1]);
assert.equal(codeyLesson9Blocks.length, 1, "la lliçó 9 presenta un sol exemple del programa de la barra sonora");
assert.equal((codeyLesson9Blocks[0].match(/^  per sempre$/gm) || []).length, 0, "la lliçó 9 no introdueix un bucle infinit niat absent del repte oficial");
assert.equal((codeyLesson9Blocks[0].match(/^per sempre$/gm) || []).length, 1, "la lliçó 9 posa la lectura i les condicions dins d'un únic bucle continu");
assert.match(codeyLesson9Blocks[0], /nivell > 20[\s\S]*nivell >= 10 i nivell <= 20[\s\S]*nivell < 10/i, "la lliçó 9 representa els tres rangs oficials i l'operador lògic i");
assert.match(codeyLesson9, /traceu 9, 10, 15, 20 i 21/i, "la lliçó 9 verifica els dos llindars i els valors interiors");
assert.match(codeyLesson9Blocks[0], /si nivell > 20[\s\S]*mostra barra alta\n\s*si nivell >= 10 i nivell <= 20[\s\S]*mostra barra mitjana\n\s*si nivell < 10[\s\S]*mostra barra baixa/i, "la lliçó 9 usa tres condicions independents perquè les lectures tinguen una resposta");
assert.match(codeyLesson9, /convenció pròpia: 10 i 20 també mostren la barra mitjana/i, "la lliçó 9 separa els extrems estrictes de la font de la convenció local inclusiva");
assert.match(codeyLesson9, /\| 10 \| Barra mitjana[\s\S]*\| 20 \| Barra mitjana/i, "la lliçó 9 presenta l'eixida esperada de les lectures de frontera");
assert.match(codeyLesson9, /no enregistreu àudio/i, "la proposta sonora evita gravar converses o veus");
assert.match(codeyLesson9, /sa-cr-barra-sonora\.webp/i, "la lliçó 9 intercala una il·lustració pròpia de la barra LED de Codey Rocky");
const codeyLesson10 = codeyCourseSource.slice(codeyCourseSource.indexOf("### **L10 ·"), codeyCourseSource.indexOf("### **L11 ·"));
assert.match(codeyLesson10, /targetes amb funcions fictícies d’obertura[\s\S]*si alguna sobra[\s\S]*si una s’ha cridat dues vegades/i, "la lliçó 10 adapta el joc desconnectat oficial de funcions i targetes");
assert.match(codeyLesson10, /defineix benvinguda_marjal[\s\S]*quan Codey inicia[\s\S]*crida benvinguda_marjal/i, "la lliçó 10 defineix una funció pròpia i la crida des de l'esdeveniment d'inici");
assert.match(codeyLesson10, /sense representar-la corporalment/i, "la lliçó 10 permet participar sense actuació corporal obligatòria");
const codeyLesson11 = codeyCourseSource.slice(codeyCourseSource.indexOf("### **L11 ·"), codeyCourseSource.indexOf("### **L12 ·"));
assert.match(codeyLesson11, /dos recintes quadrats connectats/i, "la lliçó 11 conserva el mapa oficial de dos quadrats i una connexió");
assert.match(codeyLesson11, /distància que recorre Codey Rocky durant un segon[\s\S]*repetiu tres vegades/i, "la lliçó 11 calibra empíricament distància i velocitat");
assert.match(codeyLesson11, /defineix quadrat[\s\S]*repeteix 4[\s\S]*crida quadrat[\s\S]*crida quadrat/i, "la lliçó 11 encapsula el quadrat en una funció i la crida dues vegades");
assert.match(codeyLesson11, /14 cm per costat i 7 cm\/s/i, "la lliçó 11 contextualitza l'exemple numèric oficial com a dada a verificar");
assert.match(codeyLesson11, /icona lluminosa estacionària/i, "la lliçó 11 adapta de manera segura l'extensió oficial de moviment activat pel so");
assert.match(codeyCourse.html, /2 × \(4 × costat\) \+ connexió/, "la lliçó 11 calcula la distància total dels dos quadrats i el tram connector");
const codeyLesson12 = codeyCourseSource.slice(codeyCourseSource.indexOf("### **L12 ·"), codeyCourseSource.indexOf("### **L13 ·"));
assert.match(codeyLesson12, /patrullar una segona planta/i, "la lliçó 12 conserva el repte oficial de patrullar la segona planta");
assert.match(codeyLesson12, /el robot no puja escales: cada planta és un plànol pla diferent/i, "la lliçó 12 deixa clar que les dues plantes es representen en mapes plans, no com a moviment físic d'escales");
assert.match(codeyLesson12, /defineix planta_2_marjal[\s\S]*crida quadrat[\s\S]*crida passadís_1[\s\S]*crida passadís_2/i, "la lliçó 12 organitza la patrulla de la segona planta amb funcions auxiliars reutilitzades");
assert.match(codeyLesson12, /3 × \(4 × costat\) \+ passadís 1 \+ passadís 2/i, "la lliçó 12 calcula la distància de la ruta complexa");
assert.match(codeyLesson12, /temps previst = distància prevista ÷ velocitat mesurada/i, "la lliçó 12 calcula el temps amb la velocitat calibrada de L11");
const codeyLesson16 = codeyCourseSource.slice(codeyCourseSource.indexOf("### **L16 ·"), codeyCourseSource.indexOf("### **L17 ·"));
assert.match(codeyLesson16, /les nou combinacions/i, "la lliçó 16 verifica la matriu completa del joc");
assert.match(codeyLesson16, /nombre aleatori entre 0 i 2[\s\S]*0 = pedra, 1 = tisora, 2 = paper/i, "la lliçó 16 conserva el gest aleatori i el mapa numèric oficial");
assert.match(codeyLesson16, /A suma 1 a `guanys`, B suma 1 a `derrotes` i C suma 1 a `empats`/i, "la lliçó 16 actualitza els tres comptadors amb els botons oficials");
assert.match(codeyLesson16, /quan hi haja almenys una ronda[\s\S]*supere el llindar de 2/i, "la lliçó 16 adapta l'extensió oficial de llum i evita dividir per zero");
assert.match(codeyLesson16, /sense guardar noms ni puntuacions individuals/i, "la lliçó 16 limita el registre a comptadors agregats del joc");
assert.match(codeyLesson16, /sa-cr-pedra-paper-tisora\.webp/i, "la lliçó 16 té una il·lustració original amb el robot i les tres opcions del joc");
const codeyLesson19 = codeyCourseSource.slice(codeyCourseSource.indexOf("### **L19 ·"), codeyCourseSource.indexOf("### **L20 ·"));
assert.match(codeyLesson19, /què representen els elements de joc[\s\S]*quines accions[\s\S]*quin resultat/i, "la lliçó 19 defineix conceptes, comportaments i resultats com en el pla oficial");
assert.match(codeyLesson19, /envien missatges de control[\s\S]*fletxes del teclat/i, "la lliçó 19 conserva el control amb broadcast i vies alternatives");
assert.match(codeyLesson19, /si toca la vora exterior, torna a l’inici[\s\S]*si arriba a la meta/i, "la lliçó 19 implementa els estats de fora de pista i d'arribada");
assert.match(codeyLesson19, /prova d’ús[\s\S]*canvieu una sola condició/i, "la lliçó 19 inclou playtesting i iteració a partir del retorn");
assert.match(codeyLesson19, /sa-cr-mecanica-joc\.webp/i, "la lliçó 19 intercala una il·lustració local de la ruta i la regla de límit");
const codeyLesson20 = codeyCourseSource.slice(codeyCourseSource.indexOf("### **L20 ·"), codeyCourseSource.indexOf("### **L21 ·"));
assert.match(codeyLesson20, /obstacle fix o mòbil, un oponent i un dilema/i, "la lliçó 20 presenta les tres classes de conflicte oficials");
assert.match(codeyLesson20, /obstacle gràfic mòbil[\s\S]*torna a l’inici[\s\S]*torna a aparéixer/i, "la lliçó 20 adapta l'obstacle mòbil, el contacte i la reaparició");
assert.match(codeyLesson20, /fitxa de ruta[\s\S]*ruta directa més estreta i una alternativa més ampla/i, "la lliçó 20 conserva les extensions de recollida i elecció de drecera");
assert.match(codeyLesson20, /sa-cr-obstacles-joc\.webp/i, "la lliçó 20 il·lustra obstacle, fitxa i opcions de ruta amb Codey Rocky");
const codeyLesson21 = codeyCourseSource.slice(codeyCourseSource.indexOf("### **L21 ·"), codeyCourseSource.indexOf("### **L22 ·"));
assert.match(codeyLesson21, /personatge digital[\s\S]*robot físic es queda quiet/i, "la lliçó 21 adapta la cursa com a joc virtual i no com a desplaçament del robot");
assert.match(codeyLesson21, /línia blava de meta[\s\S]*inici just després de la meta/i, "la lliçó 21 situa la detecció de volta per evitar una victòria en iniciar");
assert.match(codeyLesson21, /obstacle retorna el personatge a l’inici i reinicia la partida/i, "la lliçó 21 conserva les dues condicions oficials de reinici");
assert.match(codeyLesson21, /diverses voltes o una segona meta roja/i, "la lliçó 21 incorpora les extensions de voltes i segona meta");
assert.match(codeyLesson21, /sa-cr-fast-and-furious\.webp/i, "la lliçó 21 té una il·lustració pròpia de Codey com a comandament del joc virtual");
const codeyLesson22 = codeyCourseSource.slice(codeyCourseSource.indexOf("### **L22 ·"), codeyCourseSource.indexOf("### **L23 ·"));
assert.match(codeyLesson22, /dues rodes motrius/i, "la lliçó 22 explica el model diferencial de dues rodes");
assert.match(codeyLesson22, /potència de les rodes de Rocky \(0–100\)/i, "la lliçó 22 conserva el control de potència del quadern oficial");
assert.match(codeyLesson22, /volta circular i una semicircular/i, "la lliçó 22 programa les rutes circular i semicircular oficials");
assert.match(codeyLesson22, /corba en S/i, "la lliçó 22 manté la tasca oficial de la corba en S");
assert.match(codeyLesson22, /corbes consecutives o un huit/i, "la lliçó 22 inclou el repte ampliat oficial");
assert.match(codeyLesson22, /intercanvieu el mapa/i, "la lliçó 22 adapta l'intercanvi de mapes entre equips");
assert.match(codeyLesson22, /sa-cr-fem-un-gir\.webp/i, "la lliçó 22 intercala una il·lustració específica de les trajectòries corbes");
const codeyLesson23 = codeyCourseSource.slice(codeyCourseSource.indexOf("### **L23 ·"), codeyCourseSource.indexOf("### **L24 ·"));
assert.match(codeyLesson23, /sensor IR integrat[\s\S]*orientat cap avant/i, "la lliçó 23 comprova l'orientació del sensor IR frontal");
assert.match(codeyLesson23, /si obstacle detectat[\s\S]*gira a la dreta 90°[\s\S]*potència baixa[\s\S]*gira a l’esquerra 90°[\s\S]*altrament[\s\S]*avança/i, "la lliçó 23 manté separades les branques oficials amb i sense obstacle");
assert.match(codeyLesson23, /«Els meus blocs»[\s\S]*esquivar_obstacle/i, "la lliçó 23 encapsula la maniobra com a funció local opcional");
assert.match(codeyLesson23, /sa-cr-gir-obstacles\.webp/i, "la lliçó 23 té una il·lustració pròpia de l'esquiva física");
const codeyLesson24 = codeyCourseSource.slice(codeyCourseSource.indexOf("### **L24 ·"), codeyCourseSource.indexOf("## 🧰 Maquinari"));
assert.match(codeyLesson24, /punt RGB situat a la vora de la línia/i, "la lliçó 24 mesura la lectura RGB sobre la vora de la línia");
assert.match(codeyLesson24, /Mostreu el valor en la matriu LED[\s\S]*temps real/i, "la lliçó 24 visualitza en directe la intensitat reflectida");
assert.match(codeyLesson24, /Simuleu la regla amb una fitxa[\s\S]*correcció de 45°[\s\S]*correcció oposada/i, "la lliçó 24 adapta el joc de seguiment i girs de 45° com a simulació accessible");
assert.match(codeyLesson24, /sa-cr-segueix-linia\.webp/i, "la lliçó 24 té una il·lustració específica del sensor i la línia");
assert.match(codeyCourse.html, /giroscopi integrat i envie missatges diferenciats/, "la lliçó 18 implementa el control de joc oficial amb giroscopi i missatges");
assert.match(codeyCourse.html, /atureu primer l’script anterior/, "la lliçó 18 prova la transició segura entre scripts de moviment");
assert.match(codeyCourse.html, /variable d’estat/, "la lliçó 18 incorpora l'extensió oficial que substitueix broadcast per variable");
const adaptationAudit = fs.readFileSync(path.join(root, "docs/ADAPTACIO-SITUACIONS.md"), "utf8");
const codeyAuditStart = adaptationAudit.indexOf("## Auditoria lliçó per lliçó · Codey Rocky");
const codeyAuditEnd = adaptationAudit.indexOf("\n## ", codeyAuditStart + 3);
const codeyAudit = adaptationAudit.slice(codeyAuditStart, codeyAuditEnd < 0 ? undefined : codeyAuditEnd);
assert.match(codeyAudit, /\[L18 · Game Control Schemes\]\(https:\/\/res-us\.makeblock\.com\/doc\/course\/Codey%20Rocky\/Lesson%2018%20Game%20Control%20Schemes_Sheet\.pdf\)/, "l'auditoria enllaça el pla docent recuperat de L18");
assert.match(codeyAudit, /L23[^\n]*quadern complementari no es presenta com el pla docent/i, "l'auditoria no confon el material complementari de L23 amb el pla CSTA");
for (const line of codeyAudit.split("\n").filter(line => line.startsWith("|") && !/^\|[-| ]+\|$/.test(line))) {
  assert.equal(line.split("|").length - 2, 2, "la taula de cobertura Codey Rocky conserva les dues columnes declarades");
}
const unpluggedExpress = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/ce-reptes-desconnectats.md"), "utf8"), "https://example.test/_content/situacions/ce-reptes-desconnectats.md");
assert.equal(unpluggedExpress.steps.length, 4, "les quatre activitats desconnectades s'organitzen en quatre passos, sense duplicar-les al final");
assert.equal((unpluggedExpress.html.match(/class="learning-phase"/g) || []).length, 20, "cada activitat desconnectada segueix les mateixes cinc fases de la plantilla");
assert.equal((unpluggedExpress.html.match(/data-section-group="sequence"/g) || []).length, 1, "les quatre sessions comparteixen un únic apartat de seqüència");
const codingExpressFirstTrip = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/ce-primer-viatge.md"), "utf8"), "https://example.test/_content/situacions/ce-primer-viatge.md");
assert.equal(codingExpressFirstTrip.steps.length, 3, "First Trip conserva les tres sessions de l'adaptació");
assert.equal((codingExpressFirstTrip.html.match(/class="learning-phase"/g) || []).length, 15, "les tres sessions de First Trip comparteixen cinc fases");
for (const step of codingExpressFirstTrip.steps) {
  const start = codingExpressFirstTrip.html.indexOf(`id="${step.id}"`);
  const end = codingExpressFirstTrip.html.indexOf('<section class="learning-step"', start + 10);
  const markup = codingExpressFirstTrip.html.slice(start, end < 0 ? undefined : end);
  assert.equal((markup.match(/class="learning-phase(?: learning-phase-default)?"/g) || []).length, 5, `${step.title} presenta les cinc fases comunes`);
}
const codingExpressFork = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/ce-bifurcacio-parc.md"), "utf8"), "https://example.test/_content/situacions/ce-bifurcacio-parc.md");
assert.match(codingExpressFork.html, /sa-ce-bifurcacio-agulla\.webp/, "la bifurcació intercala una imatge del tren Coding Express de la dotació i l’agulla manual");
assert.match(codingExpressFork.html, /el tren no llig el bitllet ni tria el ramal per si mateix/i, "la imatge de la bifurcació s’acompanya del límit funcional del tren");
const codingExpressSafeRoute = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/ce-cami-segur.md"), "utf8"), "https://example.test/_content/situacions/ce-cami-segur.md");
assert.match(codingExpressSafeRoute.html, /sa-ce-cami-segur-senyals\.webp/, "la ruta segura intercala una imatge pròpia de la maqueta Coding Express");
assert.match(codingExpressSafeRoute.html, /no substitueixen ni reprodueixen la senyalització viària oficial/i, "la imatge identifica explícitament els pictogrames com a material de joc");
const codingExpressLine = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/tren-transport.md"), "utf8"), "https://example.test/_content/situacions/tren-transport.md");
assert.equal(codingExpressLine.steps.length, 4, "La línia verda conserva les quatre sessions de la seqüència");
assert.equal((codingExpressLine.html.match(/class="learning-phase"/g) || []).length, 20, "les quatre sessions de La línia verda comparteixen cinc fases");
for (const step of codingExpressLine.steps) {
  const start = codingExpressLine.html.indexOf(`id="${step.id}"`);
  const end = codingExpressLine.html.indexOf('<section class="learning-step"', start + 10);
  const markup = codingExpressLine.html.slice(start, end < 0 ? undefined : end);
  assert.equal((markup.match(/class="learning-phase(?: learning-phase-default)?"/g) || []).length, 5, `${step.title} presenta les cinc fases comunes`);
}
const codingSetStation = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/cs-estacions-codi.md"), "utf8"), "https://example.test/_content/situacions/cs-estacions-codi.md");
assert.equal(codingSetStation.steps.length, 12, "Learning Station conserva les dotze lliçons en una seqüència navegable");
assert.equal((codingSetStation.html.match(/class="learning-phase"/g) || []).length, 60, "les dotze lliçons de Learning Station comparteixen cinc fases cadascuna");
assert.match(codingSetStation.html, /sa-cs-learning-station-laberint\.webp/, "la sessió d'obstacles intercala una il·lustració pròpia amb MatataBot real");
assert.match(codingSetStation.html, /sa-cs-angulos-estrella\.webp/, "la sessió geomètrica intercala una il·lustració pròpia de l'alternativa amb paper");
for (const step of codingSetStation.steps) {
  const start = codingSetStation.html.indexOf(`id="${step.id}"`);
  const end = codingSetStation.html.indexOf('<section class="learning-step"', start + 10);
  const markup = codingSetStation.html.slice(start, end < 0 ? undefined : end);
  assert.equal((markup.match(/class="learning-phase(?: learning-phase-default)?"/g) || []).length, 5, `${step.title} presenta exactament les cinc fases comunes`);
  assert.equal((markup.match(/class="markdown-note markdown-note-evidence"/g) || []).length, 1, `${step.title} identifica una evidència pròpia`);
}
assert.match(codingSetStation.html, /pentagrama \(estrela de cinc puntes\)/i, "la creació d'angles adapta explícitament el contingut oficial de pentagrames o estrelles");
assert.match(codingSetStation.html, /Introduïm|Introducing Maps/i, "la sessió 8 aborda la introducció de mapes abans de les graelles");
assert.match(codingSetStation.html, /Introducing More Advanced Coding Blocks/i, "la sessió 10 explicita el contingut oficial de blocs avançats");
assert.match(codingSetStation.html, /definició se situa en la fila inferior a la crida/i, "la sessió de blocs avançats conserva la regla oficial de disposició de funcions");
const wasteSource = fs.readFileSync(path.join(root, "_content/situacions/residus-lego.md"), "utf8");
const waste = renderer.parse(wasteSource, "https://example.test/_content/situacions/residus-lego.md");
assert.equal(waste.steps.length, 5, "la situació de residus conserva les cinc sessions");
assert.equal(waste.steps[0].title, "Auditem un problema sense tocar residus (50 min)", "els noms dels passos no acaben amb puntuació sobrant");
assert.match(waste.html, /class="learning-wizard-step-number" aria-hidden="true" x-text="index \+ 1"><\/span><span class="learning-wizard-step-title"><span class="learning-wizard-step-separator" aria-hidden="true">&#160;·&#160;<\/span><span x-text="item\.title"/, "el número i el títol dels botons tenen espais no separables al voltant del punt");
assert.equal((waste.html.match(/class="learning-phase"/g) || []).length, 25, "les cinc sessions comparteixen exactament les cinc fases comunes");
assert.equal((waste.html.match(/class="markdown-note markdown-note-evidence"/g) || []).length, 5, "cada sessió té la seua evidència destacada");
assert.equal((waste.html.match(/class="markdown-note markdown-note-question"/g) || []).length, 5, "cada sessió té la seua pregunta docent destacada");
const accessibleMuseum = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/sp-museu-accessible.md"), "utf8"), "https://example.test/_content/situacions/sp-museu-accessible.md");
assert.match(accessibleMuseum.html, /sa-sp-museu\.webp/, "la portada del museu accessible usa una il·lustració local pròpia");
assert.match(accessibleMuseum.html, /il·lustració conceptual generada amb IA[\s\S]*no és una instrucció de construcció/i, "la il·lustració conceptual no s'interpreta com un muntatge SPIKE provat");
const farmTrail = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/tb-rastre-corral.md"), "utf8"), "https://example.test/_content/situacions/tb-rastre-corral.md");
assert.match(farmTrail.html, /markdown-note-situation/, "la introducció contextual de l'SDA rep un format propi");
assert.match(farmTrail.html, /markdown-note-question/, "la pregunta guia es destaca també en l'SDA de Tale-Bot");
assert.equal((farmTrail.html.match(/class="learning-phase"/g) || []).length, 15, "les tres sessions de la granja comparteixen cinc fases comunes");
const taleBotDiscoveries = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/tb-escola-descobertes.md"), "utf8"), "https://example.test/_content/situacions/tb-escola-descobertes.md");
assert.equal(taleBotDiscoveries.steps.length, 8, "la fira de Tale-Bot té una sessió inicial i set sessions temàtiques, sense encapçalaments de pas duplicats");
assert.equal((taleBotDiscoveries.html.match(/class="learning-phase"/g) || []).length, 40, "les huit sessions de la fira comparteixen exactament les cinc fases comunes");
assert.equal(taleBotDiscoveries.steps[0].title, "Hola, Tale-Bot: el coneixem i el cuidem (40 min)", "la sessió d'iniciació de Tale-Bot té un títol únic i accessible al wizard");
assert.match(taleBotDiscoveries.html, /sa-tb-coneguem-tale-bot\.webp/, "la sessió d'iniciació intercala la il·lustració pròpia del robot i els materials de prova");
assert.match(taleBotDiscoveries.html, /no té intencions humanes/i, "la sessió d'iniciació diferencia el comportament programat de la intencionalitat humana");
assert.match(taleBotDiscoveries.html, /deu gots de paper lleugers/i, "la sessió d'iniciació adapta el material públic dels deu gots com a fites segures");
assert.match(taleBotDiscoveries.html, /maqueta de paper anotada[\s\S]*demostració d’encesa\/apagada/i, "la sessió d'iniciació avalua les parts del robot i l'ús correcte dels controls d'alimentació");
assert.match(taleBotDiscoveries.html, /parts i funcions[\s\S]*distingir el robot de les persones[\s\S]*deu gots/i, "la sessió documenta la correspondència amb els objectius i materials públics de L1");
assert.match(taleBotDiscoveries.html, /Predigueu el total abans de comptar[\s\S]*casella, quantitat observada i subtotal acumulat/i, "la sessió de recompte inclou predicció, registre i control de dobles recomptes");
assert.match(taleBotDiscoveries.html, /unitat del patró[\s\S]*correcció justificada/i, "la sessió artística avalua la regla del patró i una revisió explicada");
assert.match(taleBotDiscoveries.html, /sa-tb-formes-monstre\.webp/, "la sessió de formes incorpora una il·lustració pròpia i pertinent");
assert.doesNotMatch(taleBotDiscoveries.html, /Llegiu el repte de la sessió|Feu explícit el procediment: registreu la seqüència|Trieu una sola decisió o instrucció per revisar|Compareu el resultat amb la predicció i expliqueu què heu aprés/, "les sessions temàtiques de la fira no conserven fases genèriques de plantilla");
const taleBotCommandsSource = fs.readFileSync(path.join(root, "_content/situacions/tb-ordres-en-accio.md"), "utf8");
const taleBotCommands = renderer.parse(taleBotCommandsSource, "https://example.test/_content/situacions/tb-ordres-en-accio.md");
assert.match(taleBotCommands.html, /exactament eixe nombre d’ordres/, "A-1 adapta el recompte d'instruccions de l'Activity Card original");
assert.match(taleBotCommands.html, /colors dels indicadors de codificació/, "A-1 conserva la comprovació visual dels indicadors del robot");
assert.match(taleBotCommands.html, /La torre de gots pertany a A-2/, "A-1 i A-2 tenen continguts oficials diferenciats");
const taleBotExplorationSource = fs.readFileSync(path.join(root, "_content/situacions/tb-explora-el-barri.md"), "utf8");
const taleBotExploration = renderer.parse(taleBotExplorationSource, "https://example.test/_content/situacions/tb-explora-el-barri.md");
assert.match(taleBotExploration.html, /programeu Tale-Bot i compareu el recorregut amb la predicció/i, "B-12 prova el trajecte entre la persona i l’eina del servei");
assert.match(taleBotExploration.html, /eviten zones tancades/i, "B-12 manté les zones tancades amb una adaptació local segura");
const taleBotArtistI = taleBotExplorationSource.slice(taleBotExplorationSource.indexOf("### **B-14"), taleBotExplorationSource.indexOf("### **B-15"));
const taleBotArtistII = taleBotExplorationSource.slice(taleBotExplorationSource.indexOf("### **B-15"), taleBotExplorationSource.indexOf("## 🎯 Aprenentatges"));
assert.match(taleBotArtistI, /suport multifunció[\s\S]*un sol retolador/i, "B-14 adapta l'exploració del suport i el primer traç d'un sol retolador");
assert.match(taleBotArtistI, /sa-tb-artista-un-retolador\.webp/, "B-14 té una il·lustració pròpia pertinent de Tale-Bot dibuixant");
assert.match(taleBotArtistII, /dos retoladors[\s\S]*acoloriu/i, "B-15 conserva el contrast d'un/dos retoladors i l'ampliació artística col·lectiva");
assert.match(taleBotArtistII, /sa-tb-artista-dos-retoladors\.webp/, "B-15 té una il·lustració pròpia de la prova amb dos retoladors");
assert.match(taleBotArtistII, /si el suport no admet dos retoladors[\s\S]*dues passades/i, "B-15 declara una variant segura si el suport del centre no és compatible");
const taleBotSpeedModel = taleBotExplorationSource.slice(taleBotExplorationSource.indexOf("### **B-13"), taleBotExplorationSource.indexOf("### **B-14"));
assert.match(taleBotSpeedModel, /tractor avança una casella, el camió dues i el tren tres[\s\S]*dades fictícies/i, "B-13 fa comparable la distància en un mateix interval sense atribuir dades reals als vehicles");
assert.match(taleBotSpeedModel, /situeu les fitxes dels tres vehicles i una destinació[\s\S]*traceu amb llapis/i, "B-13 conserva la preparació oficial de fitxes i ruta pròpia");
assert.match(taleBotSpeedModel, /executeu-la \*\*una vegada\*\*/i, "B-13 manté una única execució com demana la targeta oficial");
assert.match(taleBotSpeedModel, /sa-tb-velocitats-relatives\.webp/, "B-13 intercala una il·lustració pròpia amb Tale-Bot i un mapa local");
assert.match(taleBotSpeedModel, /no ha anat més ràpid quan ha passat pel tren[\s\S]*no mesura ni reprodueix la velocitat real/i, "B-13 distingeix la velocitat del model de les capacitats del robot");
const taleBotCommunity = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/tb-missions-comunitat.md"), "utf8"), "https://example.test/_content/situacions/tb-missions-comunitat.md");
const marketMission = taleBotCommunity.steps.find(step => step.title === "La botiga de queviures");
const zooMission = taleBotCommunity.steps.find(step => step.title === "Visitem un parc zoològic");
const stepMarkup = (record, step) => {
  const start = record.html.indexOf(`id="${step.id}"`);
  const end = record.html.indexOf('<section class="learning-step', start + 10);
  return record.html.slice(start, end < 0 ? undefined : end);
};
assert.ok(marketMission && zooMission, "les missions de botiga i parc zoològic tenen passos identificables");
assert.match(stepMarkup(taleBotCommunity, marketMission), /sa-tb-missions-mercat\.webp/, "la imatge de mercat apareix dins de la missió de botiga D-5");
assert.match(stepMarkup(taleBotCommunity, marketMission), /maqueta narrativa creada per a l’activitat/i, "la missió D-5 diferencia el mercat fictici d’un comerç real");
assert.doesNotMatch(stepMarkup(taleBotCommunity, zooMission), /sa-tb-missions-mercat\.webp/, "la imatge de mercat no queda assignada al pas del parc zoològic D-2");
const pythonCommunicationSource = fs.readFileSync(path.join(root, "_content/situacions/sp-python-comunicacio.md"), "utf8");
const pythonCommunication = renderer.parse(pythonCommunicationSource, "https://example.test/_content/situacions/sp-python-comunicacio.md");
assert.equal(pythonCommunication.steps.length, 7, "la situació de comunicació manté sis lliçons de Python i la sessió professional prevista al seu itinerari");
assert.match(pythonCommunicationSource, /sis lliçons de la unitat 1[\s\S]*una setena sessió pròpia[\s\S]*no comptada com una lliçó/i, "l'extensió de professions no s'atribueix al repertori oficial de sis lliçons");
assert.match(pythonCommunicationSource, /inventari del set[\s\S]*tres motors i els tres sensors/i, "la lliçó d'importació relaciona les biblioteques amb el maquinari físic del set");
assert.match(pythonCommunicationSource, /sa-sp-python-matriu-llum\.webp/, "la lliçó de la matriu de llum intercala una il·lustració pròpia i pertinent");
assert.match(pythonCommunication.html, /graella de 5 × 5/i, "la lliçó de llum modela la graella 5×5 de SPIKE Prime");
assert.match(pythonCommunication.html, /show_image[\s\S]*write[\s\S]*sleep_ms/i, "la lliçó diferencia icones, text desplaçat i temporització");
assert.match(pythonCommunicationSource, /majúscula d’una constant d’imatge[\s\S]*obriu la consola/i, "la lliçó de llum adapta la depuració guiada amb un error de capitalització");
assert.doesNotMatch(pythonCommunication.html, /observeu el missatge de consola<\/p>[\s\S]*<h4>Fase 4/, "la lliçó d’importació no deixa frases tallades entre fases");
assert.match(pythonCommunication.html, /qui interpreta el mapa[\s\S]*programació/i, "la lliçó de parelles concreta els rols de pilot i navegant");
assert.match(pythonCommunication.html, /notes adhesives[\s\S]*recompte de preferències/i, "la lliçó de parelles adapta el registre de les icones triades");
assert.match(pythonCommunication.html, /Joc de depuració[\s\S]*canvieu els papers/i, "la lliçó de parelles practica la depuració alternant rols");
assert.match(pythonCommunication.html, /ordre de tres targetes de colors[\s\S]*codi sonor/i, "la lliçó de so conserva el repte no verbal de seqüenciar elements");
assert.match(pythonCommunication.html, /freqüència, durada en mil·lisegons i volum/i, "la lliçó de so identifica els tres paràmetres del beep");
assert.match(pythonCommunication.html, /inferior a 100[\s\S]*no assumiu que un resultat silenciós és una errada de sintaxi/i, "la lliçó de so interpreta el cas de freqüència inaudible sense confondre'l amb un error de codi");
assert.match(pythonCommunication.html, /efecte pregravat[\s\S]*altaveus del dispositiu/i, "la lliçó diferencia el beep del hub dels sons reproduïts per l'app");
assert.match(pythonCommunication.html, /una cosa que agrada[\s\S]*una que ja funciona bé[\s\S]*una alternativa que es podria provar/i, "la revisió entre parelles dona feedback específic i amable");
assert.match(pythonCommunication.html, /no reconstruïu el model ni escrigueu dins del seu programa/i, "la revisió protegeix l'autoria de l'equip que rep feedback");
assert.match(pythonCommunication.html, /versió anterior, suggeriment, canvi, resultats i decisió final/i, "la lliçó de feedback documenta una iteració i els seus efectes");

const sensoryClassroomSource = fs.readFileSync(path.join(root, "_content/situacions/mb-aula-sensorial.md"), "utf8");
const sensoryClassroom = renderer.parse(sensoryClassroomSource, "https://example.test/_content/situacions/mb-aula-sensorial.md");
assert.equal(sensoryClassroom.steps.length, 4, "la situació sensorial manté la correspondència de quatre lliçons oficials");
assert.equal((sensoryClassroomSource.match(/^#### Fase [1-5] ·/gm) || []).length, 20, "les quatre sessions sensorials conserven cinc fases comunes cadascuna");
assert.match(sensoryClassroom.html, /sa-mb-aula-sensorial-opcions\.webp/, "la construcció intercala una il·lustració pròpia i pertinent al micro:bit");
assert.match(sensoryClassroom.html, /cap entrada[\s\S]*botó A[\s\S]*botó B[\s\S]*ordre d’aturada[\s\S]*cas inesperat/i, "la situació prova estats d'entrada i aturada amb casos explícits");
assert.match(sensoryClassroom.html, /sis casos/i, "les proves i les evidències de la situació usen el mateix recompte");
assert.match(sensoryClassroom.html, /no demana a ningú compartir diagnòstic, preferències personals ni experiències de salut/i, "la situació protegeix la privacitat i no demana testimonis personals");

const caesarCipherSource = fs.readFileSync(path.join(root, "_content/situacions/mb-xifres-que-viatgen.md"), "utf8");
const caesarCipher = renderer.parse(caesarCipherSource, "https://example.test/_content/situacions/mb-xifres-que-viatgen.md");
assert.equal(caesarCipher.steps.length, 4, "la situació del xifrat adapta les tres lliçons i manté una sessió pròpia d'introducció");
assert.match(caesarCipher.html, /sa-mb-xifres-disc-caesar\.webp/, "la sessió desconnectada intercala una il·lustració pròpia del disc de Cèsar");
assert.match(caesarCipher.html, /posicions amb marques de colors[\s\S]*cada posició correspon a una lletra A–Z/i, "la llegenda evita confondre els marcadors esquemàtics amb el material real de l'activitat");
assert.match(caesarCipher.html, /PLAÇA[\s\S]*la Ç es manté/i, "la convenció local tracta explícitament la Ç sense falsejar l'alfabet A–Z");

const wetlandAnimationSource = fs.readFileSync(path.join(root, "_content/situacions/mb-animacions-aiguamoll.md"), "utf8");
const wetlandAnimation = renderer.parse(wetlandAnimationSource, "https://example.test/_content/situacions/mb-animacions-aiguamoll.md");
assert.equal(wetlandAnimation.steps.length, 2, "la situació d'animacions conserva les dues lliçons oficials");
assert.match(wetlandAnimation.html, /sa-mb-animacions-taumatrop\.webp/, "la fase desconnectada intercala una il·lustració pròpia dels fotogrames i el taumàtrop");
assert.match(wetlandAnimation.html, /dos dibuixos poden suggerir moviment/i, "la llegenda situa la imatge dins de l'exploració desconnectada del moviment");

const codingSetStationsSource = fs.readFileSync(path.join(root, "_content/situacions/cs-estacions-codi.md"), "utf8");
const codingSetStations = renderer.parse(codingSetStationsSource, "https://example.test/_content/situacions/cs-estacions-codi.md");
assert.equal(codingSetStations.steps.length, 12, "Learning Station manté les dotze lliçons pròpies en la seqüència comuna");
assert.match(codingSetStations.html, /obstacles i les banderes físics del Coding Set/i, "la situació identifica els accessoris físics reals del kit");
assert.match(codingSetStations.html, /no detecta els obstacles automàticament/i, "la proposta no atribueix sensors inexistents al Coding Set");
assert.match(codingSetStations.html, /sa-cs-learning-station\.webp/, "la portada representa el robot, la torre, els blocs i els mapes del currículum");
assert.match(codingSetStations.html, /sa-cs-learning-station-laberint\.webp/, "la sessió de laberint té un visual propi contextualitzat");
assert.match(codingSetStations.html, /sa-cs-angulos-estrella\.webp/, "la sessió d'angles diferencia el treball en paper dels accessoris opcionals");
assert.match(codingSetStations.html, /bandera de destí[\s\S]*dos o tres obstacles reals del set/i, "el repte de laberint usa obstacles i bandera com en el material oficial");
assert.match(pythonCommunication.html, /activitat fictícia de la setmana cultural[\s\S]*esbós de paper/i, "el cartell digital adapta l'encàrrec publicitari a una activitat cultural local");
assert.match(pythonCommunication.html, /icona de 5 × 5[\s\S]*frase curta[\s\S]*efecte de so/i, "el cartell combina llum i so en un missatge original");
assert.match(pythonCommunication.html, /no usa sensors per afirmar que l’activitat ha començat/i, "el cartell no atribueix al prototip dades d'estat que no pot detectar");
const neighborhoodRoutes = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/tb-carrers-amables.md"), "utf8"), "https://example.test/_content/situacions/tb-carrers-amables.md");
assert.equal(neighborhoodRoutes.steps.length, 4, "la situació de mobilitat manté quatre sessions, sense duplicar la seqüència de treball");
assert.equal((neighborhoodRoutes.html.match(/class="learning-phase"/g) || []).length, 20, "les quatre sessions de mobilitat comparteixen les cinc fases");
assert.match(neighborhoodRoutes.html, /no certifica la seguretat ni l’accessibilitat d’un carrer real/i, "la maqueta no es presenta com una auditoria de carrer");
const planetChallenges = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/mb-reptes-planeta.md"), "utf8"), "https://example.test/_content/situacions/mb-reptes-planeta.md");
const planetChallengeSource = fs.readFileSync(path.join(root, "_content/situacions/mb-reptes-planeta.md"), "utf8");
const bycatchLesson = planetChallenges.steps.find(step => step.title.startsWith("Xarxes més selectives"));
const turtleBeachLesson = planetChallenges.steps.find(step => step.title.startsWith("Platja segura per a tortugues"));
const collarLesson = planetChallenges.steps.find(step => step.title.startsWith("Alerta de protecció del bosc"));
const oceanMonitorLesson = planetChallenges.steps.find(step => step.title.startsWith("Xarxa de sensors en maqueta"));
const oilRouteLesson = planetChallenges.steps.find(step => step.title.startsWith("Ruta eficient per a una taca simulada"));
const fitnessFriendLesson = planetChallenges.steps.find(step => step.title.startsWith("Recordatori triat per l’usuari"));
const heartRateLesson = planetChallenges.steps.find(step => step.title.startsWith("Mesura crítica de pols"));
assert.ok(bycatchLesson, "el repte de xarxes és un pas identificable de la col·lecció micro:bit");
assert.ok(turtleBeachLesson, "el repte de tortugues és un pas identificable de la col·lecció micro:bit");
assert.ok(collarLesson, "el repte de protecció d'espècies és un pas identificable de la col·lecció micro:bit");
assert.ok(oceanMonitorLesson, "el monitor d'oceà és un pas identificable de la col·lecció micro:bit");
assert.ok(oilRouteLesson, "l'algorisme de neteja d'oceà és un pas identificable de la col·lecció micro:bit");
assert.ok(fitnessFriendLesson, "Fitness friend és un pas identificable de la col·lecció micro:bit");
assert.ok(heartRateLesson, "Heart rate monitor és un pas identificable de la col·lecció micro:bit");
const bycatchStart = planetChallenges.html.indexOf(`id="${bycatchLesson.id}"`);
const bycatchEnd = planetChallenges.html.indexOf('<section class="learning-step', bycatchStart + 10);
const bycatchMarkup = planetChallenges.html.slice(bycatchStart, bycatchEnd < 0 ? undefined : bycatchEnd);
assert.match(bycatchMarkup, /input\.lightLevel\(\)[\s\S]*llindar oficial <code>50<\/code>/, "el repte de xarxes conserva el sensor de llum LED i el llindar inicial oficial");
assert.match(bycatchMarkup, /&lt; 50[\s\S]*= 50[\s\S]*&gt; 50/, "el repte prova els tres casos del llindar de llum");
assert.match(bycatchMarkup, /micro:bit V2[\s\S]*V1 sense altaveu/i, "el so opcional distingeix les versions de micro:bit i conserva l'alternativa LED");
assert.match(bycatchMarkup, /sa-mb-xarxes-llum-prototip\.webp/, "el repte intercala una il·lustració pròpia de la xarxa seca i la micro:bit de la dotació");
assert.match(bycatchMarkup, /no està validat per a pesca ni acredita que una llum o un so protegisquen fauna/i, "la maqueta no promet eficàcia de conservació");
assert.match(planetChallengeSource, /projects\/make-it-code-it\/light-up-fishing-nets/, "la fitxa enllaça el projecte oficial detallat de Light-up fishing nets");
const turtleBeachStart = planetChallenges.html.indexOf(`id="${turtleBeachLesson.id}"`);
const turtleBeachEnd = planetChallenges.html.indexOf('<section class="learning-step', turtleBeachStart + 10);
const turtleBeachMarkup = planetChallenges.html.slice(turtleBeachStart, turtleBeachEnd < 0 ? undefined : turtleBeachEnd);
assert.match(turtleBeachMarkup, /input\.lightLevel\(\) &lt; 100[\s\S]*dos segons/i, "la platja de tortugues conserva la condició oficial i el cicle de lectura");
assert.match(turtleBeachMarkup, /sa-mb-tortugues-platja-microbit\.webp/, "la platja de tortugues intercala una il·lustració pròpia de la micro:bit i la maqueta baixa");
assert.match(turtleBeachMarkup, /no una llum que protegisca tortugues/i, "la maqueta no s'atribueix eficàcia de protecció real");
assert.match(planetChallengeSource, /projects\/make-it-code-it\/saving-sea-turtles/, "la fitxa enllaça el projecte oficial detallat de Saving sea turtles");
const collarStart = planetChallenges.html.indexOf(`id="${collarLesson.id}"`);
const collarEnd = planetChallenges.html.indexOf('<section class="learning-step', collarStart + 10);
const collarMarkup = planetChallenges.html.slice(collarStart, collarEnd < 0 ? undefined : collarEnd);
assert.match(collarMarkup, /radio\.setGroup\(42\)[\s\S]*radio\.sendString\([\s\S]*PROVA-ALERTA/, "el collar de maqueta usa dues plaques amb grup de ràdio compartit i missatge curt");
assert.match(collarMarkup, /radio\.onReceivedString[\s\S]*message == [\s\S]*PROVA-ALERTA/, "la receptora filtra el missatge esperat i preveu el desconegut");
assert.match(collarMarkup, /botó A serà l’únic activador manual/i, "l'alarma no simula un sensor automàtic absent");
assert.match(collarMarkup, /sa-mb-collar-radio-prototip\.webp/, "el pas intercala una il·lustració pròpia de dues micro:bit en maqueta seca");
assert.match(collarMarkup, /grup diferent[\s\S]*dos enviaments seguits[\s\S]*cap pressió de botó/i, "les proves cobreixen missatge correcte, grup incorrecte, duplicat i silenci");
assert.match(collarMarkup, /no detecta caça, tala ni moviment[\s\S]*no poseu dispositius a cap animal/i, "la proposta declara explícitament els límits de detecció i desplegament");
assert.match(planetChallengeSource, /teach\/lessons\/protecting-animals-poaching/, "la fitxa enllaça la lliçó oficial Anti-poaching collar");
const oceanMonitorStart = planetChallenges.html.indexOf(`id="${oceanMonitorLesson.id}"`);
const oceanMonitorEnd = planetChallenges.html.indexOf('<section class="learning-step', oceanMonitorStart + 10);
const oceanMonitorMarkup = planetChallenges.html.slice(oceanMonitorStart, oceanMonitorEnd < 0 ? undefined : oceanMonitorEnd);
assert.match(oceanMonitorMarkup, /radio\.sendValue\([\s\S]*ONA[\s\S]*3/, "el node transmet un valor d'onatge fictici amb ràdio");
assert.match(oceanMonitorMarkup, /radio\.onReceivedValue[\s\S]*name[\s\S]*value/, "la passarel·la rep el nom i el valor de cada node");
assert.match(oceanMonitorMarkup, /sa-mb-ocean-health-network\.webp/, "el pas intercala un diagrama visual propi de nodes i passarel·la amb micro:bit de la dotació");
assert.match(oceanMonitorMarkup, /tres intents per cadascun dels dos nodes[\s\S]*grup diferent[\s\S]*cap pressió de botó/i, "la xarxa prova missatges repetits, grup erroni i node inactiu");
assert.match(oceanMonitorMarkup, /no s’ha connectat cap sensor marí ni cap servei d’Internet/i, "la il·lustració i la maqueta no es confonen amb monitoratge real");
assert.match(planetChallengeSource, /teach\/lessons\/healthy-oceans-monitor/, "la fitxa enllaça la pàgina oficial del projecte Ocean health monitor");
const oilRouteStart = planetChallenges.html.indexOf(`id="${oilRouteLesson.id}"`);
const oilRouteEnd = planetChallenges.html.indexOf('<section class="learning-step', oilRouteStart + 10);
const oilRouteMarkup = planetChallenges.html.slice(oilRouteStart, oilRouteEnd < 0 ? undefined : oilRouteEnd);
assert.match(oilRouteMarkup, /sense micro:bit ni maquinari[\s\S]*vehicle autònom/i, "l'algorisme desconnectat i l'extensió de vehicle reflecteixen les dues parts oficials");
assert.match(oilRouteMarkup, /tres vegades[\s\S]*nombre de moviments i els girs/i, "les dues rutes es comparen amb execucions repetides i mètriques explícites");
assert.match(oilRouteMarkup, /sa-mb-vessament-rutes-grid\.webp/, "el repte intercala una imatge pròpia d'algorismes de neteja en quadrícula seca");
assert.match(oilRouteMarkup, /no useu oli, aigua, detergents ni altres líquids/i, "la maqueta evita qualsevol vessament o substància real");
assert.match(planetChallengeSource, /teach\/lessons\/healthy-oceans-oil-spill/, "la fitxa enllaça la pàgina oficial Oil spill cleaner-upper");
const fitnessFriendStart = planetChallenges.html.indexOf(`id="${fitnessFriendLesson.id}"`);
const fitnessFriendEnd = planetChallenges.html.indexOf('<section class="learning-step', fitnessFriendStart + 10);
const fitnessFriendMarkup = planetChallenges.html.slice(fitnessFriendStart, fitnessFriendEnd < 0 ? undefined : fitnessFriendEnd);
assert.match(fitnessFriendMarkup, /input\.onButtonPressed\(Button\.A[\s\S]*enabled = true[\s\S]*Button\.B[\s\S]*enabled = false/i, "Fitness friend permet iniciar i aturar voluntàriament el temporitzador");
assert.match(fitnessFriendMarkup, /interval = [\s\S]*10000[\s\S]*control\.millis\(\)/, "el temporitzador usa el rellotge del programa amb una durada de prova configurable");
assert.match(fitnessFriendMarkup, /sa-mb-fitness-friend-control\.webp/, "Fitness friend intercala una il·lustració pròpia del suport de taula i els controls accessibles");
assert.match(fitnessFriendMarkup, /sis casos/i, "Fitness friend cobreix els estats inactiu, iniciar, avisar, aturar i reiniciar");
assert.match(fitnessFriendMarkup, /cada cas tres vegades/i, "Fitness friend repeteix els casos del temporitzador per comprovar-ne la consistència");
assert.match(fitnessFriendMarkup, /no mesura pols, moviment ni rendiment[\s\S]*no desa dades personals/i, "Fitness friend no converteix l'ajuda opcional en monitoratge de salut");
assert.match(planetChallengeSource, /teach\/lessons\/being-active/, "la fitxa enllaça la unitat oficial Being active");
const heartRateStart = planetChallenges.html.indexOf(`id="${heartRateLesson.id}"`);
const heartRateEnd = planetChallenges.html.indexOf('<section class="learning-step', heartRateStart + 10);
const heartRateMarkup = planetChallenges.html.slice(heartRateStart, heartRateEnd < 0 ? undefined : heartRateEnd);
assert.match(heartRateMarkup, /input\.acceleration\(Dimension\.Strength\)/, "el banc de prova usa l'acceleròmetre real de la placa de la dotació");
assert.match(heartRateMarkup, /count \* <span class="syntax-number">6<\/span>/, "la finestra de deu segons calcula esdeveniments simulats per minut sense anomenar-los bpm");
assert.match(heartRateMarkup, /sa-mb-heart-rate-accelerometre\.webp/, "Heart rate monitor intercala una il·lustració pròpia del banc de prova amb micro:bit");
assert.match(heartRateMarkup, /cinc situacions[\s\S]*tres repeticions per cas/i, "el banc de prova avalua soroll, ritme ràpid/lent i falsos esdeveniments de manera repetible");
assert.match(heartRateMarkup, /no mesura pols real[\s\S]*no el porteu al cos/i, "el prototip no es presenta com a dispositiu mèdic ni com a mesura biomètrica");
assert.match(planetChallengeSource, /teach\/lessons\/heart-rate-monitor/, "la fitxa enllaça l'activitat oficial Heart rate monitor");
assert.match(planetChallengeSource, /education\.theiet\.org\/secondary\/teaching-resources\/design-a-personal-heart-monitoring-system-microbit/, "la fitxa separa la referència tècnica complementària de l'activitat oficial micro:bit");
assert.equal(planetChallenges.steps.length, 12, "els cinc reptes micro:bit conserven les dotze activitats adaptades");
assert.equal((planetChallenges.html.match(/class="learning-phase"/g) || []).length, 60, "les dotze activitats micro:bit comparteixen les cinc fases");
assert.match(planetChallenges.html, /no poseu dispositius a cap animal/i, "els prototips de biodiversitat no es despleguen en animals");
assert.match(planetChallenges.html, /no mesureu el pols de companys/i, "el repte de pulsacions evita dades biomètriques de l’alumnat");
const pythonTransportProject = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/sp-python-projecte-transport.md"), "utf8"), "https://example.test/_content/situacions/sp-python-projecte-transport.md");
assert.equal(pythonTransportProject.steps.length, 10, "el projecte de transport en Python conserva les deu lliçons");
assert.equal((pythonTransportProject.html.match(/class="learning-phase"/g) || []).length, 50, "les deu lliçons del projecte de transport comparteixen les cinc fases");
assert.match(pythonTransportProject.html, /tres intents del mateix cas nominal/i, "el projecte conserva la calibració amb proves repetides");
assert.match(pythonTransportProject.html, /no autònom ni apte per a transportar materials o persones en espais reals/i, "la mostra declara els límits del prototip");
const pythonGames = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/sp-python-jocs.md"), "utf8"), "https://example.test/_content/situacions/sp-python-jocs.md");
assert.equal(pythonGames.steps.length, 8, "la unitat Python de jocs conserva les huit lliçons oficials");
assert.equal((pythonGames.html.match(/class="learning-phase"/g) || []).length, 40, "les huit lliçons de jocs comparteixen les cinc fases");
assert.match(pythonGames.html, /entrada desconeguda/i, "les regles del joc defineixen una resposta per a entrades desconegudes");
assert.match(pythonGames.html, /marcador coherent/i, "la puntuació es comprova amb casos de prova i reinici");
const competitionReadySource = fs.readFileSync(path.join(root, "_content/situacions/laberint-mart.md"), "utf8");
const competitionReady = renderer.parse(competitionReadySource, "https://example.test/_content/situacions/laberint-mart.md");
assert.equal(competitionReady.steps.length, 9, "Competition Ready conserva les nou lliçons oficials");
assert.equal((competitionReady.html.match(/class="learning-phase"/g) || []).length, 45, "les nou lliçons de Competition Ready comparteixen les cinc fases");
assert.match(competitionReady.html, /zona segura, a 50 cm del model de niu/i, "la missió final conserva el lliurament segur de la mostra");
assert.match(competitionReadySource, /quatre intents comparables[\s\S]*dos a baixa velocitat i dos a velocitat moderada/i, "The Guided Mission 2026–27 compara rapidesa i precisió amb intents controlats");
assert.match(competitionReadySource, /la base ix de l’àrea esquerra[\s\S]*acaba a la zona dreta/i, "The Guided Mission conserva els punts d'eixida i d'arribada de la lliçó oficial en un camp local");
assert.match(competitionReadySource, /empényer la palanca fins que el pont s’alce[\s\S]*dues estacions sense tocar-les/i, "la missió guiada adapta l'activació del connector i el pas prop d'altres missions");
assert.match(competitionReady.html, /sa-sp-missio-pont\.webp/, "la missió guiada intercala una il·lustració IA pròpia del sensor, la palanca i el pont locals");
assert.match(competitionReadySource, /missió iniciada[\s\S]*missió completada[\s\S]*segona parada/i, "l'avaluació adapta els nivells de progrés oficials sense classificar els equips");
assert.match(competitionReady.html, /sense reproduir el tapet, el model ni la missió de FIRST LEGO League/i, "la situació no reutilitza el camp ni el model oficial protegit");
assert.match(competitionReady.html, /no necessita robot ni tasca motoritzada/i, "Mission Training continua sent una activitat desconnectada completa");
const testingSolutions = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/sp-proves-avaluacio.md"), "utf8"), "https://example.test/_content/situacions/sp-proves-avaluacio.md");
assert.equal(testingSolutions.steps.length, 8, "Testing and Evaluating Solutions conserva les huit lliçons");
assert.equal((testingSolutions.html.match(/class="learning-phase"/g) || []).length, 40, "les huit lliçons d’avaluació comparteixen les cinc fases");
assert.match(testingSolutions.html, /tres intents per objecte i mètode/i, "la comparació d’agafadors manté els intents repetits");
assert.match(testingSolutions.html, /no un producte mèdic ni una recomanació d’ús/i, "el repte de disseny assistiu declara els límits del prototip");
const sensorLogistics = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/sp-sensors-logistica.md"), "utf8"), "https://example.test/_content/situacions/sp-sensors-logistica.md");
assert.equal(sensorLogistics.steps.length, 8, "Sensors conserva les huit lliçons de la unitat");
assert.equal((sensorLogistics.html.match(/class="learning-phase"/g) || []).length, 40, "les huit lliçons de Sensors comparteixen les cinc fases");
assert.match(sensorLogistics.html, /dos cicles complets/i, "la fàbrica prova dos cicles de classificació i retorn");
assert.match(sensorLogistics.html, /aturar-se i avisar davant d’un codi desconegut/i, "el triatge deté el programa quan no reconeix l’etiqueta");
const kickstartBusiness = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/sp-biblioteca-circulant.md"), "utf8"), "https://example.test/_content/situacions/sp-biblioteca-circulant.md");
assert.equal(kickstartBusiness.steps.length, 7, "Kickstart a Business conserva les set lliçons oficials");
assert.match(kickstartBusiness.html, /quatre combinacions previstes/i, "Keep It Really Safe verifica totes les combinacions de la condició composta");
assert.match(kickstartBusiness.html, /sensibilitat a majúscules/i, "Keep It Really Safe adapta el glossari oficial de seguretat digital");
assert.match(kickstartBusiness.html, /en dues sessions/i, "Keep It Really Safe manté la durada de la fitxa oficial en la programació local");
assert.match(kickstartBusiness.steps[3].title, /^Una condició per controlar l’accés a la capsa de préstec .*90–120 min\)$/i, "Keep It Safe separa el nom propi del pas i conserva la durada oficial");
assert.match(kickstartBusiness.html, /sa-sp-tracador-xy\.webp/, "Track Your Packages intercala una imatge pròpia del model X-Y amb SPIKE Prime");
assert.match(kickstartBusiness.html, /sa-sp-classificador-retorns\.webp/, "Automate It intercala un visual de classificació amb fitxes fictícies i el robot de la dotació");
assert.match(kickstartBusiness.html, /persona construeix la part superior del traçador i l’altra la base i l’agulla/i, "Track Your Packages conserva el repartiment oficial del muntatge en tàndem");
assert.match(kickstartBusiness.html, /reconéixer trams horitzontals, verticals i diagonals/i, "Track Your Packages manté els criteris oficials de reconeixement de patrons");
assert.match(kickstartBusiness.html, /una observació d’una altra parella/i, "Track Your Packages integra coavaluació i retorn entre iguals");
assert.match(fs.readFileSync(path.join(root, "_content/situacions/sp-biblioteca-circulant.md"), "utf8"), /^### \*\*S4 · Una condició per controlar l’accés/m, "la lliçó Keep It Safe té un número de sessió explícit i coherent amb la seqüència");
assert.equal((kickstartBusiness.html.match(/class="learning-phase"/g) || []).length, 35, "les set lliçons de Kickstart a Business comparteixen les cinc fases");
for (const step of kickstartBusiness.steps) {
  const start = kickstartBusiness.html.indexOf(`id="${step.id}"`);
  const end = kickstartBusiness.html.indexOf('<section class="learning-step"', start + 10);
  const markup = kickstartBusiness.html.slice(start, end < 0 ? undefined : end);
  assert.equal((markup.match(/class="learning-phase(?: learning-phase-default)?"/g) || []).length, 5, `${step.title} presenta exactament les cinc fases comunes`);
}
assert.match(kickstartBusiness.html, /executeu el programa inicial/i, "Keep It Safe inclou l'exploració del programa inicial oficial");
assert.match(kickstartBusiness.html, /prova creuada/i, "Keep It Safe adapta el desafiament entre equips");
const longText = Array.from({ length: 34 }, (_, index) => `L'equip registra l'observació ${index + 1} i explica com comprova cada decisió amb una prova concreta.`).join(" ");
const consistentFormat = renderer.parse(`## Situació i intenció\n\n${longText}\n\n## Materials docents\n\n**Exploració · 10 min:** Prepareu el mapa i les targetes.`, "https://example.test/_content/situacions/prova.md");
assert.match(consistentFormat.html, /<h2 id="situacio-i-intencio">🌱 Situació, repte i intenció<\/h2>/, "els títols equivalents es normalitzen sense canviar l'àncora original");
assert.match(consistentFormat.html, /markdown-note-situation/, "la primera explicació de la situació es destaca automàticament");
assert.match(consistentFormat.html, /markdown-note-phase/, "les fases amb duració comparteixen un format visual");
assert.ok((consistentFormat.html.match(/<p>/g) || []).length > 2, "els paràgrafs extensos es divideixen per millorar-ne la lectura");
assert.match(consistentFormat.html, /prova concreta\. L&#39;equip registra l&#39;observació 2/, "la divisió de paràgrafs llargs conserva l'espai entre frases");
const structuredSteps = renderer.parse(`## Itinerari\n### Sessió 1 · Provar\n- Evidència: registre de la prova.\n- **Pregunta docent:** Què canviaríeu?\n- Criteri d'èxit: el recorregut es pot repetir.\n- [ ] Compareu els dos resultats.`, "https://example.test/_content/situacions/prova.md");
assert.match(structuredSteps.html, /learning-step-kicker">Pas 1</, "cada pas té un marcador visual ordenat");
assert.match(structuredSteps.html, /markdown-list-label-evidence/, "les evidències de les llistes queden etiquetades");
assert.match(structuredSteps.html, /markdown-list-label-question/, "les preguntes docents de les llistes queden etiquetades");
assert.match(structuredSteps.html, /markdown-list-label-criterion/, "els criteris de les llistes queden etiquetats");
assert.match(structuredSteps.html, /markdown-task-mark/, "les tasques amb casella conserven una marca accessible");
const semanticContent = renderer.parse(`## Itinerari\n### Sessió 1 · Provar\n#### Llegim les dades · 10 min\n\nFeu una prova i anoteu el resultat.\n\n*Evidència:* registre de la prova.\n\n*Preguntes docents:* Què ha canviat?`, "https://example.test/_content/situacions/prova.md");
assert.equal((semanticContent.html.match(/class="learning-phase"/g) || []).length, 1, "qualsevol subapartat H4 dins d'una sessió es representa com una fase");
assert.match(semanticContent.html, /markdown-note-evidence/, "les evidències en cursiva es transformen en blocs semàntics");
assert.match(semanticContent.html, /markdown-note-question/, "les preguntes docents en cursiva es transformen en blocs semàntics");
const orderedWizard = renderer.parse(`## Repte i intenció\n\nUna classe prepara una ruta per a la biblioteca.\n\n## Itinerari\n### Sessió 1 · Dissenyar\n\nPrepareu el mapa.`, "https://example.test/_content/situacions/prova.md");
assert.ok(orderedWizard.html.indexOf("Una classe prepara") < orderedWizard.html.indexOf('class="learning-step-index learning-wizard"'), "el navegador apareix després de la descripció del repte");
assert.ok(orderedWizard.html.indexOf('class="learning-step-index learning-wizard"') < orderedWizard.html.indexOf('class="learning-step"'), "el navegador apareix immediatament abans de les sessions");
const normalizedOrder = renderer.parse(`## Fonts consultades\n\nFont A.\n\n## Avaluació i evidències\n\nProves.\n\n## Itinerari didàctic\n### Sessió 1 · Provar\n\nAcció.\n\n## Abans de començar\n\nMaterials.\n\n## Repte i context\n\nContext local.\n\n## Aprenentatges i vocabulari\n\nObjectius.\n\n## Accessibilitat i seguretat\n\nAlternatives.`, "https://example.test/_content/situacions/prova.md");
const groups = ["intro", "learning", "materials", "sequence", "assessment", "access", "official"];
const positions = groups.map(group => normalizedOrder.html.indexOf(`data-section-group="${group}"`));
assert.ok(positions.every((position, index) => position >= 0 && (index === 0 || positions[index - 1] < position)), "les seccions de les SDAs s'ordenen amb una jerarquia comuna");
const navigationLink = renderer.parse('[Obri la situació](../../situacio/index.html?id=sp-exemple)', 'https://example.test/_content/situacions/exemple.md');
assert.match(navigationLink.html, /x-target\.push="page-content"/, "els enllaços Markdown interns activen Alpine AJAX");
assert.doesNotMatch(navigationLink.html, /target="_blank"/, "els enllaços interns no s'obrin com si foren externs");

const contentDir = path.join(root, "_content/situacions");
const imageOwners = new Map();
const activeFiles = fs.readdirSync(contentDir)
  .filter(file => file.endsWith(".md") && file !== "TEMPLATE-SITUACIO.md")
  .map(file => ({ file, source: fs.readFileSync(path.join(contentDir, file), "utf8") }))
  .filter(item => /^active:\s*true\s*$/m.test(item.source));
const slugs = new Set();
const robotSituationCounts = new Map();
for (const item of activeFiles) {
  const slug = item.file.slice(0, -3);
  assert.ok(!slugs.has(slug), `${slug} està duplicat`);
  slugs.add(slug);
  const rendered = renderer.parse(item.source, `https://example.test/_content/situacions/${item.file}`);
  {
    assert.equal((rendered.html.match(/class="learning-phase(?: learning-phase-default)?"/g) || []).length, rendered.steps.length * 5, `${slug} segueix les cinc fases comunes en cada sessió`);
    for (const step of rendered.html.matchAll(/<section class="learning-step"[\s\S]*?(?=<section class="learning-step"|$)/g)) {
      assert.deepEqual([...step[0].matchAll(/<h4>(.*?)<\/h4>/g)].map(match => match[1]).filter(title => title.startsWith("Fase ")), [
        "Fase 1 · Activem i prediem",
        "Fase 2 · Explorem i construïm",
        "Fase 3 · Expliquem i registrem",
        "Fase 4 · Apliquem i millorem",
        "Fase 5 · Comprovem i reflexionem"
      ], `${slug} manté els mateixos títols i ordre de fase`);
    }
  }
  for (const [, imageSource] of item.source.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
    const assetPath = path.resolve(contentDir, imageSource);
    const previousOwner = imageOwners.get(assetPath);
    assert.ok(!previousOwner || previousOwner === slug, `${slug} no reutilitza la imatge de portada de ${previousOwner}`);
    imageOwners.set(assetPath, slug);
  }
  assert.ok(rendered.data.title && rendered.data.robot && rendered.data.description, `${slug} necessita metadades editorials`);
  robotSituationCounts.set(rendered.data.robot, (robotSituationCounts.get(rendered.data.robot) || 0) + 1);
  assert.ok(rendered.steps.length > 0, `${slug} necessita passos estructurats`);
  assert.ok(rendered.steps.every(step => step.title && !/[.!?]$/.test(step.title)), `${slug} té tots els noms de pas nets i sense puntuació final`);
  assert.ok(rendered.steps.every(step => !/^(?:(?:sess(?:ió|io)|lliç(?:ó|o)|lesson|session)\s+\d+|s\d+)\s*[·—:.-]/i.test(step.title)), `${slug} no duplica la numeració automàtica dins del títol visible`);
  assert.ok(rendered.steps.every(step => !/^[a-z]{1,3}-?\d+\s*[·—:.-]/i.test(step.title)), `${slug} no repeteix codis de sessió o lliçó al títol visible`);
  assert.deepEqual([...rendered.html.matchAll(/data-section-group="([^"]+)"/g)].map(match => match[1]), ["intro", "learning", "materials", "sequence", "assessment", "access", "official"], `${slug} presenta les mateixes seccions i en el mateix ordre`);
  assert.equal((rendered.html.match(/class="learning-step-index learning-wizard"/g) || []).length, 1, `${slug} usa una única seqüència de navegació comuna`);
  assert.equal((rendered.html.match(/class="learning-wizard-step-number"/g) || []).length, 1, `${slug} defineix el marcador numèric comú del selector`);
  assert.equal((rendered.html.match(/class="learning-wizard-step-title"/g) || []).length, 1, `${slug} defineix el títol en un element separat del número`);
  assert.equal((rendered.html.match(/class="learning-step"/g) || []).length, rendered.steps.length, `${slug} representa cada pas amb la mateixa plantilla visual`);
  assert.equal((rendered.html.match(/class="learning-step-content"/g) || []).length, rendered.steps.length, `${slug} embolcalla cada pas amb el contenidor comú`);
  assert.ok((rendered.html.match(/class="learning-phase(?: learning-phase-default)?"/g) || []).length >= rendered.steps.length, `${slug} presenta cada pas dins d'una fase visual`);
  assert.ok(rendered.steps.every(step => !/^\d+\s*/.test(step.title)), `${slug} no duplica la numeració al nom dels passos`);
  assert.match(rendered.html, /class="sa-illustration"/, `${slug} necessita una imatge editorial`);
  assert.match(rendered.html, /markdown-note-situation/, `${slug} necessita una introducció destacada`);
  const sectionGroups = [...rendered.html.matchAll(/data-section-group="([a-z]+)"/g)].map(match => match[1]);
  const sectionPriority = { intro: 0, learning: 1, materials: 2, sequence: 3, other: 4, assessment: 5, access: 6, official: 7 };
  const priorities = sectionGroups.map(group => sectionPriority[group] ?? 4);
  assert.ok(priorities.every((priority, index) => index === 0 || priorities[index - 1] <= priority), `${slug} no respecta l’ordre comú de seccions: ${sectionGroups.join(", ")}`);
  const standardGroups = ["intro", "learning", "materials", "sequence", "assessment", "access", "official"];
  assert.deepEqual(sectionGroups, standardGroups, `${slug} ha de tindre exactament els set apartats comuns i en el mateix ordre`);
  const standardHeadings = [
    "🌱 Situació, repte i intenció",
    "🎯 Aprenentatges i vocabulari",
    "🧰 Materials i preparació",
    "📅 Seqüència didàctica",
    "🧪 Evidències i avaluació",
    "♿ Participació, accessibilitat i seguretat",
    "🔗 Referents i adaptació"
  ];
  assert.deepEqual(
    [...rendered.html.matchAll(/<section class="detail-section(?: detail-section-intro)?" data-section-group="[a-z]+"[^>]*><h2[^>]*>(.*?)<\/h2>/g)].map(match => match[1]),
    standardHeadings,
    `${slug} usa els mateixos set títols de secció, sense afegir durades variables al títol de la seqüència`
  );
  for (const group of standardGroups) {
    assert.equal(sectionGroups.filter(item => item === group).length, 1, `${slug} ha d’unificar tots els blocs ${group} en un únic apartat`);
  }
  assert.doesNotMatch(rendered.html, /data-section-group="other"/, `${slug} no deixa contingut fora de l’estructura editorial comuna`);
  for (const [, paragraph] of rendered.html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)) {
    const plainText = paragraph.replace(/<[^>]*>/g, "").replace(/&(?:amp|lt|gt|quot|#39);/g, " ");
    assert.ok((plainText.match(/\S+/g) || []).length <= 100, `${slug} té un paràgraf massa llarg després del renderitzat`);
  }
}
for (const robot of ["coding-express", "tale-bot", "coding-set", "codey-rocky", "spike", "microbit"]) {
  assert.ok((robotSituationCounts.get(robot) || 0) >= 5, `${robot} necessita almenys cinc situacions actives pròpies o adaptades`);
}
const catalogText = fs.readFileSync(path.join(root, "_js/cataleg.js"), "utf8");
const catalog = JSON.parse(catalogText.slice(catalogText.indexOf("{")).replace(/;\s*$/, ""));
assert.equal(activeFiles.length, 101, "la validació cobreix totes les SDAs actives");
assert.equal(new Set([...imageOwners.values()]).size, activeFiles.length, "cada SDA activa té almenys una imatge pròpia i no compartida amb una altra fitxa");
assert.equal(catalog.situacions.length, activeFiles.length, "el catàleg conté totes les SDAs actives");
for (const item of catalog.situacions) {
  assert.equal(item.url, `situacio/index.html?id=${item.slug}`, `${item.slug} enllaça amb la pàgina compartida`);
}
const expectedDetailKinds = [
  ["activitat", "activity", "activitats", "activitat-", 10, catalog.activitats],
  ["tutorial", "tutorial", "tutorials", "tutorial-", 34, catalog.tutorials],
  ["robot", "robot", "robots", "robot-", 6, catalog.robots],
  ["guia", "guide", "pages", "guia-", 3, null]
];
for (const [route, kind, folder, prefix, expected, entries] of expectedDetailKinds) {
  const page = fs.readFileSync(path.join(root, route, "index.html"), "utf8");
  assert.match(page, new RegExp(`<content-detail-page kind="${kind}"`), `${route} utilitza el component compartit`);
  assert.match(page, /_js\/components\.js\?v=/, `${route} invalida la memòria cau del router actualitzat`);
  const docs = fs.readdirSync(path.join(root, "_content", folder)).filter(file => file.startsWith(prefix) && file.endsWith(".md"));
  assert.equal(docs.length, expected, `${route} té el nombre esperat de documents Markdown`);
  assert.equal(fs.readdirSync(path.join(root, route)).filter(file => fs.existsSync(path.join(root, route, file, "index.html"))).length, 0, `${route} no manté shells HTML per document`);
  if (entries) {
    assert.equal(entries.length, expected, `catàleg ${route} sincronitzat des del Markdown`);
    assert.ok(entries.every(item => item.url.startsWith(`${route}/index.html?id=`)), `les targetes ${route} usen una ruta compartida`);
  }
}
for (const pageName of ["pensament-computacional", "robotica-educativa", "situacions-aprenentatge"]) {
  const page = fs.readFileSync(path.join(root, pageName, "index.html"), "utf8");
  assert.match(page, /alpine-ajax@/, `${pageName} carrega Alpine AJAX`);
  assert.match(page, /alpinejs@/, `${pageName} carrega Alpine`);
  assert.match(page, /id="page-content"/, `${pageName} defineix la vista AJAX compartida`);
}
const situationCatalogPage = fs.readFileSync(path.join(root, "situacions-aprenentatge/index.html"), "utf8");
assert.match(situationCatalogPage, /x-data="\{[\s\S]*?matches\(item\)/, "els filtres es defineixen declarativament en Alpine");
assert.match(situationCatalogPage, /x-effect="sync\(\)"/, "els filtres mantenen l'estat en la URL amb Alpine");
assert.doesNotMatch(situationCatalogPage, /filters\.js/, "el catàleg no carrega un controlador de filtres separat");
for (const file of ["pensament-computacional/index.html", "robotica-educativa/index.html", "situacions-aprenentatge/index.html", "_templates/content-detail-page.html", "_templates/situation-page.html"]) {
  const markup = fs.readFileSync(path.join(root, file), "utf8");
  for (const [, expression] of markup.matchAll(/x-data="([\s\S]*?)"/g)) {
    assert.doesNotThrow(() => new Function(`return (${expression})`), `${file} té una expressió x-data vàlida`);
  }
}
const robotMarkdown = fs.readFileSync(path.join(root, "_content/robots/robot-spike.md"), "utf8");
const robotRecord = renderer.parse(robotMarkdown, "https://example.test/_content/robots/robot-spike.md");
assert.equal(robotRecord.data.specs.length, 5, "les especificacions de robot es llegeixen del front matter");
assert.equal(robotRecord.data.official_resources.length, 2, "els recursos oficials de robot es llegeixen del front matter");
const sharedPage = fs.readFileSync(path.join(root, "situacio/index.html"), "utf8");
const pageTemplate = fs.readFileSync(path.join(root, "_templates/situation-page.html"), "utf8");
const componentSource = fs.readFileSync(path.join(root, "_js/components.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "_css/styles.css"), "utf8");
assert.match(sharedPage, /<situation-page root="\.\.\/">/, "hi ha una única pàgina de detall compartida");
for (const templateId of ["situation-page-template", "situation-page-loading-template", "situation-page-error-template"]) {
  assert.match(pageTemplate, new RegExp(`id="${templateId}"`), `falta la plantilla ${templateId}`);
}
assert.equal(fs.readdirSync(path.join(root, "situacio")).filter(name => fs.statSync(path.join(root, "situacio", name)).isDirectory()).length, 0, "no hi ha shells HTML individuals");
assert.match(componentSource, /new URLSearchParams\(window\.location\.search\)/, "la pàgina tria el Markdown a partir de l'ID de la URL");
assert.match(componentSource, /x-target\.push="page-content"/, "els enllaços del catàleg usen Alpine AJAX");
assert.doesNotMatch(componentSource, /addEventListener\('popstate'/, "l'historial no es manté amb un router manual");
assert.doesNotMatch(componentSource, /class (?:ActivityGrid|SituationGrid|TutorialGrid|RobotGrid|SituationFilters|RobotHero|AccentDashes)/, "els catàlegs i les peces de presentació ja no tenen renderitzadors JavaScript propis");
assert.match(pageTemplate, /x-data=/, "les plantilles de detall usen estat declaratiu d'Alpine");
assert.match(componentSource, /loadFromLocation\(\)/, "el component carrega Markdown segons la URL actual");
assert.match(componentSource, /heading\.focus\(\{ preventScroll: true \}\)/, "el canvi de contingut mou el focus al títol");
assert.match(pageTemplate, /x-on:situation-ready/, "la plantilla SDA rep les dades amb Alpine");
assert.doesNotMatch(componentSource, /initializeLearningWizard/, "el wizard no necessita un controlador JavaScript propi");
assert.match(pilot.html, /:aria-valuetext=/, "el progrés del wizard té una descripció accessible");
assert.match(pilot.html, /class="learning-wizard-step-title"><span class="learning-wizard-step-separator" aria-hidden="true">&#160;·&#160;<\/span><span x-text="item\.title"/, "el selector separa visualment número i títol amb espais no separables");
assert.match(styles, /\.learning-wizard-step\s*\{[^}]*column-gap:/, "el selector del wizard separa el número del títol amb espai explícit");
assert.match(styles, /\.learning-wizard-step\s*\{[^}]*grid-template-columns: 1\.8rem minmax\(0, 1fr\);[^}]*column-gap: \.8rem/s, "el selector reserva un espai fix i visible entre el número i el títol");
assert.match(styles, /\.learning-wizard-step-title\s*\{[^}]*grid-template-columns: auto minmax\(0, 1fr\)/s, "el separador del títol no pot quedar enganxat al número encara que el títol ocupe dues línies");
const commonPhaseHeadings = [
  "Fase 1 · Activem i prediem",
  "Fase 2 · Explorem i construïm",
  "Fase 3 · Expliquem i registrem",
  "Fase 4 · Apliquem i millorem",
  "Fase 5 · Comprovem i reflexionem"
];
const officialCycles = {
  infantil: "Educació Infantil",
  "primer-cicle": "Primer cicle",
  "segon-cicle": "Segon cicle",
  "tercer-cicle": "Tercer cicle"
};
const activeSituations = fs.readdirSync(path.join(root, "_content/situacions")).filter(file => file.endsWith(".md") && /^active:\s*true\s*$/m.test(fs.readFileSync(path.join(root, "_content/situacions", file), "utf8")));
for (const file of activeSituations) {
  const parsedSituation = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions", file), "utf8"), `https://example.test/_content/situacions/${file}`);
  assert.ok(parsedSituation.steps.length > 0, `${file} té passos navegables`);
  assert.ok(Object.hasOwn(officialCycles, parsedSituation.data.cycle), `${file}: usa un dels quatre cicles oficials`);
  assert.equal(parsedSituation.data.cycle_label, officialCycles[parsedSituation.data.cycle], `${file}: l'etiqueta del cicle coincideix amb la nomenclatura oficial`);
  assert.match(parsedSituation.html, /<nav class="learning-step-index learning-wizard"/, `${file} utilitza el mateix navegador de passos`);
  for (const step of parsedSituation.steps) {
    assert.doesNotMatch(step.title, /^\d+\s*/, `${file}: el títol no duplica el número del selector`);
    const start = parsedSituation.html.indexOf(`id="${step.id}"`);
    const end = parsedSituation.html.indexOf('<section class="learning-step"', start + 10);
    const markup = parsedSituation.html.slice(start, end < 0 ? undefined : end);
    assert.equal((markup.match(/class="learning-phase(?: learning-phase-default)?"/g) || []).length, 5, `${file}: ${step.title} usa les cinc fases comunes`);
    const renderedPhases = [...markup.matchAll(/<h4>(Fase [1-5] · .*?)<\/h4>/g)].map(match => match[1]);
    assert.deepEqual(renderedPhases, commonPhaseHeadings, `${file}: ${step.title} manté els mateixos noms i l'ordre de les cinc fases`);
  }
}
assert.equal(activeSituations.length, 101, "el format comú es comprova en totes les SDAs actives");
assert.ok(componentSource.includes('contentHasChallenge = /<h2\\b[^>]*>[^<]*(?:repte|pregunta guia)/i.test(parsed.html)'), "el repte no es duplica si ja té una secció pròpia");
assert.match(styles, /\.learning-step\[hidden\]/, "els passos no actius es retiren de la lectura visual");

const unsafe = renderer.parse('## Prova\n\n<script>alert(1)</script>\n\n[x](javascript:alert(1))', "https://example.test/a.md");
assert.doesNotMatch(unsafe.html, /<script>/, "el Markdown no interpreta HTML cru");
assert.doesNotMatch(unsafe.html, /href="javascript:/i, "els enllaços amb esquemes no permesos es rebutgen");
assert.match(unsafe.html, /&lt;script&gt;/, "el contingut HTML cru s'escapa com a text");

console.log(`Markdown renderer tests passed: ${activeFiles.length} active situations, ${activeFiles.reduce((total, item) => total + renderer.parse(item.source, "https://example.test/source.md").steps.length, 0)} navigable steps, template states, accessible wizard, code, images, links and escaping.`);
