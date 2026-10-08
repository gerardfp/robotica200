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
assert.match(pilot.html, /x-show="step === 0" x-cloak/, "el pas actiu es controla amb Alpine");
assert.equal((pilot.html.match(/class="learning-phase"/g) || []).length, 30, "cada lliçó mostra les cinc fases comunes");
assert.equal((pilot.html.match(/class="code-panel"/g) || []).length, 2, "els exemples pseudocodi i Python es renderitzen com a blocs");
assert.equal((pilot.html.match(/class="sa-illustration"/g) || []).length, 1, "la portada Markdown es renderitza com a figura de situació");
assert.match(pilot.html, /<figcaption>Una llista guarda/, "els peus d'imatge separats per una línia en blanc es mantenen dins de la figura");
assert.doesNotMatch(pilot.html, /<p>_[^<]+_<\/p>/, "el peu d'imatge no apareix amb els guions baixos literals");
assert.match(pilot.html, /syntax-keyword/, "el codi Python rep ressaltat sintàctic");
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
const codeyCourse = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/cr-museu-jocs-programats.md"), "utf8"), "https://example.test/_content/situacions/cr-museu-jocs-programats.md");
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
assert.match(codeyCourse.html, /tres possibles sentits inicials/, "la lliçó 8 prova les tres orientacions de sortida de l'estació");
assert.match(codeyCourse.html, /sensor de llum integrat en Codey.{0,80}prova separada/s, "la lliçó 8 separa el sensor de llum del mòdul IR orientable");
assert.match(codeyCourse.html, /valors del sensor, no lux calibrats/, "la lliçó 8 no presenta la lectura ambiental com a lux calibrats");
assert.match(codeyCourse.html, /bucle infinit exterior conté un segon bucle infinit/, "la lliçó 9 tracta explícitament els bucles infinits niats");
assert.match(codeyCourse.html, /distància = passos × unitat/, "la lliçó 11 relaciona les missions amb operacions matemàtiques");
assert.match(codeyCourse.html, /distància = parades × passos_per_tram × unitat/, "la lliçó 12 combina funcions i càlcul de missions");
assert.match(codeyCourse.html, /giroscopi integrat i envie missatges diferenciats/, "la lliçó 18 implementa el control de joc oficial amb giroscopi i missatges");
assert.match(codeyCourse.html, /atureu primer l’script anterior/, "la lliçó 18 prova la transició segura entre scripts de moviment");
assert.match(codeyCourse.html, /variable d’estat/, "la lliçó 18 incorpora l'extensió oficial que substitueix broadcast per variable");
const adaptationAudit = fs.readFileSync(path.join(root, "docs/ADAPTACIO-SITUACIONS.md"), "utf8");
const codeyAuditStart = adaptationAudit.indexOf("## Auditoria lliçó per lliçó · Codey Rocky");
const codeyAuditEnd = adaptationAudit.indexOf("\n## ", codeyAuditStart + 3);
const codeyAudit = adaptationAudit.slice(codeyAuditStart, codeyAuditEnd < 0 ? undefined : codeyAuditEnd);
assert.match(codeyAudit, /\[L18 · Game Control Schemes\]\(https:\/\/res-us\.makeblock\.com\/doc\/course\/Codey%20Rocky\/Lesson%2018%20Game%20Control%20Schemes_Sheet\.pdf\)/, "l'auditoria enllaça el pla docent recuperat de L18");
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
for (const step of codingSetStation.steps) {
  const start = codingSetStation.html.indexOf(`id="${step.id}"`);
  const end = codingSetStation.html.indexOf('<section class="learning-step"', start + 10);
  const markup = codingSetStation.html.slice(start, end < 0 ? undefined : end);
  assert.equal((markup.match(/class="learning-phase(?: learning-phase-default)?"/g) || []).length, 5, `${step.title} presenta exactament les cinc fases comunes`);
}
assert.match(codingSetStation.html, /pentagrama \(estrela de cinc puntes\)/i, "la creació d'angles adapta explícitament el contingut oficial de pentagrames o estrelles");
assert.match(codingSetStation.html, /Introduïm|Introducing Maps/i, "la sessió 8 aborda la introducció de mapes abans de les graelles");
assert.match(codingSetStation.html, /Introducing More Advanced Coding Blocks/i, "la sessió 10 explicita el contingut oficial de blocs avançats");
assert.match(codingSetStation.html, /definició se situa en la fila inferior a la crida/i, "la sessió de blocs avançats conserva la regla oficial de disposició de funcions");
const wasteSource = fs.readFileSync(path.join(root, "_content/situacions/residus-lego.md"), "utf8");
const waste = renderer.parse(wasteSource, "https://example.test/_content/situacions/residus-lego.md");
assert.equal(waste.steps.length, 5, "la situació de residus conserva les cinc sessions");
assert.equal(waste.steps[0].title, "Auditem un problema sense tocar residus (50 min)", "els noms dels passos no acaben amb puntuació sobrant");
assert.match(waste.html, /class="learning-wizard-step-number" aria-hidden="true" x-text="index \+ 1"><\/span><span class="learning-wizard-step-separator" aria-hidden="true">·<\/span><span class="learning-wizard-step-title" x-text="item\.title"/, "el número i el títol dels botons queden clarament separats");
assert.equal((waste.html.match(/class="learning-phase"/g) || []).length, 25, "les cinc sessions comparteixen exactament les cinc fases comunes");
assert.equal((waste.html.match(/class="markdown-note markdown-note-evidence"/g) || []).length, 5, "cada sessió té la seua evidència destacada");
assert.equal((waste.html.match(/class="markdown-note markdown-note-question"/g) || []).length, 5, "cada sessió té la seua pregunta docent destacada");
const farmTrail = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/tb-rastre-corral.md"), "utf8"), "https://example.test/_content/situacions/tb-rastre-corral.md");
assert.match(farmTrail.html, /markdown-note-situation/, "la introducció contextual de l'SDA rep un format propi");
assert.match(farmTrail.html, /markdown-note-question/, "la pregunta guia es destaca també en l'SDA de Tale-Bot");
assert.equal((farmTrail.html.match(/class="learning-phase"/g) || []).length, 15, "les tres sessions de la granja comparteixen cinc fases comunes");
const taleBotCommandsSource = fs.readFileSync(path.join(root, "_content/situacions/tb-ordres-en-accio.md"), "utf8");
const taleBotCommands = renderer.parse(taleBotCommandsSource, "https://example.test/_content/situacions/tb-ordres-en-accio.md");
assert.match(taleBotCommands.html, /exactament eixe nombre d’ordres/, "A-1 adapta el recompte d'instruccions de l'Activity Card original");
assert.match(taleBotCommands.html, /colors dels indicadors de codificació/, "A-1 conserva la comprovació visual dels indicadors del robot");
assert.match(taleBotCommands.html, /La torre de gots pertany a A-2/, "A-1 i A-2 tenen continguts oficials diferenciats");
const taleBotExploration = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/tb-explora-el-barri.md"), "utf8"), "https://example.test/_content/situacions/tb-explora-el-barri.md");
assert.match(taleBotExploration.html, /programeu Tale-Bot i compareu el recorregut amb la predicció/i, "B-12 prova el trajecte entre la persona i l’eina del servei");
assert.match(taleBotExploration.html, /eviten zones tancades/i, "B-12 manté les zones tancades amb una adaptació local segura");
const neighborhoodRoutes = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/tb-carrers-amables.md"), "utf8"), "https://example.test/_content/situacions/tb-carrers-amables.md");
assert.equal(neighborhoodRoutes.steps.length, 4, "la situació de mobilitat manté quatre sessions, sense duplicar la seqüència de treball");
assert.equal((neighborhoodRoutes.html.match(/class="learning-phase"/g) || []).length, 20, "les quatre sessions de mobilitat comparteixen les cinc fases");
assert.match(neighborhoodRoutes.html, /no certifica la seguretat ni l’accessibilitat d’un carrer real/i, "la maqueta no es presenta com una auditoria de carrer");
const planetChallenges = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/mb-reptes-planeta.md"), "utf8"), "https://example.test/_content/situacions/mb-reptes-planeta.md");
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
const competitionReady = renderer.parse(fs.readFileSync(path.join(root, "_content/situacions/laberint-mart.md"), "utf8"), "https://example.test/_content/situacions/laberint-mart.md");
assert.equal(competitionReady.steps.length, 9, "Competition Ready conserva les nou lliçons oficials");
assert.equal((competitionReady.html.match(/class="learning-phase"/g) || []).length, 45, "les nou lliçons de Competition Ready comparteixen les cinc fases");
assert.match(competitionReady.html, /zona segura, a 50 cm del model de niu/i, "la missió final conserva el lliurament segur de la mostra");
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
  assert.equal((rendered.html.match(/class="learning-wizard-step-separator"/g) || []).length, 1, `${slug} separa visualment el número del títol en el selector comú`);
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
assert.equal(activeFiles.length, 100, "la validació cobreix totes les SDAs actives");
assert.equal(new Set([...imageOwners.values()]).size, activeFiles.length, "cada SDA activa té almenys una imatge pròpia i no compartida amb una altra fitxa");
assert.equal(catalog.situacions.length, activeFiles.length, "el catàleg conté totes les SDAs actives");
for (const item of catalog.situacions) {
  assert.equal(item.url, `situacio/index.html?id=${item.slug}`, `${item.slug} enllaça amb la pàgina compartida`);
}
const expectedDetailKinds = [
  ["activitat", "activity", "activitats", "activitat-", 10, catalog.activitats],
  ["tutorial", "tutorial", "tutorials", "tutorial-", 22, catalog.tutorials],
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
assert.match(pilot.html, /class="learning-wizard-step-title" x-text="item\.title"/, "el selector del wizard separa el número del títol en un element propi");
assert.match(styles, /\.learning-wizard-step\s*\{[^}]*column-gap:/, "el selector del wizard separa el número del títol amb espai explícit");
assert.match(styles, /\.learning-wizard-step-separator\s*\{[^}]*flex: 0 0 \.8rem/, "el separador del número i el títol sempre conserva un espai visible");
assert.ok(componentSource.includes('contentHasChallenge = /<h2\\b[^>]*>[^<]*(?:repte|pregunta guia)/i.test(parsed.html)'), "el repte no es duplica si ja té una secció pròpia");
assert.match(styles, /\.learning-step\[hidden\]/, "els passos no actius es retiren de la lectura visual");

const unsafe = renderer.parse('## Prova\n\n<script>alert(1)</script>\n\n[x](javascript:alert(1))', "https://example.test/a.md");
assert.doesNotMatch(unsafe.html, /<script>/, "el Markdown no interpreta HTML cru");
assert.doesNotMatch(unsafe.html, /href="javascript:/i, "els enllaços amb esquemes no permesos es rebutgen");
assert.match(unsafe.html, /&lt;script&gt;/, "el contingut HTML cru s'escapa com a text");

console.log(`Markdown renderer tests passed: ${activeFiles.length} active situations, ${activeFiles.reduce((total, item) => total + renderer.parse(item.source, "https://example.test/source.md").steps.length, 0)} navigable steps, template states, accessible wizard, code, images, links and escaping.`);
