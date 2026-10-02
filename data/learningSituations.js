// data/learningSituations.js - Catàleg de Situacions d'Aprenentatge curriculars

const LEARNING_SITUATIONS = [
  {
    id: "sa-ciutat-accessible",
    title: "La Ciutat Accessible per a Tothom",
    robot: "microbit",
    robotName: "Microbit",
    cicle: "cicle-superior",
    cicleLabel: "Cicle Superior (5è-6è)",
    tematica: "ciutat",
    tematicaLabel: "Ciutat intel·ligent i accessibilitat",
    materia: "tecnologia",
    materiaLabel: "Tecnologia i Digitalització",
    challenge: "Com podem eliminar les barreres arquitectòniques i sensorials del nostre barri perquè una persona cega o amb cadira de rodes es desplaci amb seguretat?",
    duration: "6 sessions",
    competencies: [
      "Competència Digital (CD): Programació de dispositius físics.",
      "Competència STEM: Disseny d'estructures i circuits elèctrics.",
      "Competència Ciutadana (CC): Sensibilització envers la diversitat funcional."
    ],
    sessions: [
      "S1: Mapeig d'obstacles reals al voltant de l'escola i empatia.",
      "S2: Disseny d'un semàfor sonor per a vianants amb micro:bit.",
      "S3: Programació de la seqüència lluminosa i tons acústics per polsos.",
      "S4: Construcció de la maqueta del carrer amb cartó reutilitzat.",
      "S5: Integració de la placa a la maqueta i proves d'accessibilitat.",
      "S6: Fira urbana a l'escola: presentació dels projectes a la comunitat."
    ],
    evaluationCriteria: "Avalua la capacitat d'analitzar problemes de l'entorn proper i crear solucions digitals inclusives que responguin a necessitats reals."
  },
  {
    id: "sa-residus-lego",
    title: "Eco-Planta de Reciclatge Intel·ligent",
    robot: "spike",
    robotName: "Spike",
    cicle: "cicle-superior",
    cicleLabel: "Cicle Superior (5è-6è) i ESO",
    tematica: "sostenibilitat",
    tematicaLabel: "Medi ambient i sostenibilitat",
    materia: "medi",
    materiaLabel: "Coneixement del Medi / Ciències",
    challenge: "Com podem automatitzar la separació d'envasos, vidre i paper al menjador de l'escola per augmentar el percentatge de reciclatge?",
    duration: "5 sessions",
    competencies: [
      "Competència STEM: Mecanismes d'engranatges i mesura amb sensors de color.",
      "Competència Emprenedora (CE): Resolució creativa de reptes mediambientals.",
      "Competència Lingüística (CCL): Exposició oral del procés tecnològic."
    ],
    sessions: [
      "S1: Auditoria de residus escolars i cicle de vida dels materials.",
      "S2: Muntatge de la cinta transportadora amb motors angulars SPIKE.",
      "S3: Calibració del sensor òptic per reconèixer colors dels contenidors.",
      "S4: Lògica de desviament: programar la comporta separadora amb bucles.",
      "S5: Test d'estrès amb 20 peces de colors i càlcul d'eficiència percentual."
    ],
    evaluationCriteria: "Dissenya i programa prototips mecatrònics que apliquen relacions de transmissió mecànica per resoldre problemes de gestió ambiental."
  },
  {
    id: "sa-emocions-codey",
    title: "La Mascota de les Emocions i el Benestar",
    robot: "codeyrocky",
    robotName: "CodeyRocky",
    cicle: "cicle-mitja",
    cicleLabel: "Cicle Mitjà (3r-4t)",
    tematica: "salut",
    tematicaLabel: "Salut, hàbits i benestar",
    materia: "llengua",
    materiaLabel: "Llengua i Literatura",
    challenge: "Com podem crear un company robòtic que ens ajudi a expressar i gestionar les nostres emocions quan estem enfadats, tristos o eufòrics?",
    duration: "4 sessions",
    competencies: [
      "Competència Personal i Social (CPSAA): Autoconeixement emocional i empatia.",
      "Competència Digital (CD): Dibuix a la matriu LED i reproducció de sons.",
      "Competència en Comunicació (CCL): Descripció verbal d'estats d'ànim."
    ],
    sessions: [
      "S1: Diari de les emocions: Quina cara i quin so té la calma o la ràbia?",
      "S2: Dibuix de patrons i carones a la matriu de 16x8 de Codey.",
      "S3: Associació de gestos físics (giròscop) i sons expressius.",
      "S4: 'El racó de la calma': posada en funcionament de la mascota a l'aula."
    ],
    evaluationCriteria: "Reconeix estats emocionals propis i aliens, traduint-los a un llenguatge simbòlic i digital comunicatiu."
  },
  {
    id: "sa-mercat-tangible",
    title: "Ruta Saludable pel Mercat del Barri",
    robot: "codingset",
    robotName: "CodingSet",
    cicle: "cicle-inicial",
    cicleLabel: "Cicle Inicial (1r-2n)",
    tematica: "salut",
    tematicaLabel: "Salut, hàbits i benestar",
    materia: "matematiques",
    materiaLabel: "Matemàtiques",
    challenge: "Com podem planificar la compra de fruites i verdures de temporada al mercat gastant el pressupost just i fent el camí més curt?",
    duration: "4 sessions",
    competencies: [
      "Competència Matemàtica: Càlcul de distàncies, diners senzills i geometria en graella.",
      "Competència Digital: Pensament algorítmic tangible sense pantalles.",
      "Competència en Hàbits Saludables: Dieta mediterrània de proximitat."
    ],
    sessions: [
      "S1: Selecció dels ingredients saludables per a una macedònia de temporada.",
      "S2: Creació del mapa del mercat amb parades de fruita i preus simbòlics.",
      "S3: Planificació de la ruta amb fitxes físiques de moviment i bucles Matatalab.",
      "S4: Execució i depuració: comprar tots els ingredients sense xocar."
    ],
    evaluationCriteria: "Aplica estratègies de càlcul bàsic i orientació espacial per resoldre problemes de la vida quotidiana en entorns manipulatius."
  },
  {
    id: "sa-conte-talebot",
    title: "Els Viatges del Conte Màgic",
    robot: "talebot",
    robotName: "TaleBot",
    cicle: "infantil",
    cicleLabel: "Educació Infantil (4-5 anys)",
    tematica: "art",
    tematicaLabel: "Art, música i expressió",
    materia: "llengua",
    materiaLabel: "Llengua i Literatura",
    challenge: "Podem ajudar el protagonista del nostre conte a trobar els seus amics superant el bosc misteriós tot explicant la història amb les nostres veus?",
    duration: "3 sessions",
    competencies: [
      "Competència en Comunicació Oral: Enregistrament de veu i expressivitat.",
      "Pensament Computacional Primerenc: Ordre seqüencial d'esdeveniments.",
      "Competència Artística: Il·lustració dels personatges i escenografies."
    ],
    sessions: [
      "S1: Lectura compartida del conte i distribució dels capítols.",
      "S2: Enregistrament de les pistes d'àudio al TaleBot pas a pas.",
      "S3: Sessió de contacontes: el robot es mou pel mapa i narra la història."
    ],
    evaluationCriteria: "Estructura relats senzills seguint un fil narratiu temporal (inici, nus, desenllaç) mitjançant el moviment d'un dispositiu robòtic."
  },
  {
    id: "sa-tren-transport",
    title: "La Línia Verda del Tren Sostenible",
    robot: "lego-coding-express",
    robotName: "Lego Coding Express",
    cicle: "infantil",
    cicleLabel: "Educació Infantil (3-5 anys)",
    tematica: "sostenibilitat",
    tematicaLabel: "Medi ambient i sostenibilitat",
    materia: "medi",
    materiaLabel: "Coneixement del Medi / Ciències",
    challenge: "Com transportem les mercaderies del camp a la ciutat utilitzant un tren elèctric que no contamina i respecta els senyals de trànsit?",
    duration: "3 sessions",
    competencies: [
      "Sensibilitat mediambiental: Mitjans de transport col·lectius nets.",
      "Relació causa-efecte i associació de colors a normes de convivència.",
      "Treball en equip: Construcció cooperativa de vies ferroviàries."
    ],
    sessions: [
      "S1: Muntatge del circuit de vies cooperatiu unint diferents barris.",
      "S2: Assignació dels maons d'acció: vermell per aturar-se a la ciutat, verd per girar.",
      "S3: El repte de la càrrega: transportar les verdures sense descarrilar."
    ],
    evaluationCriteria: "Reconeix elements del transport públic sostenible i relaciona codis de color amb accions mecàniques coordinades."
  },
  {
    id: "sa-desendollada-cripto",
    title: "Espies Escolars i Secrets Criptogràfics",
    robot: "desendollat",
    robotName: "Desendollat (Sense robot)",
    cicle: "cicle-superior",
    cicleLabel: "Cicle Superior i ESO",
    tematica: "societat",
    tematicaLabel: "Convivència i ciutadania digital",
    materia: "matematiques",
    materiaLabel: "Matemàtiques",
    challenge: "Com podem protegir els nostres missatges i dades privades a la xarxa perquè ningú pugui suplantar la nostra identitat?",
    duration: "3 sessions",
    competencies: [
      "Competència Digital: Fonaments de seguretat a Internet i privadesa.",
      "Competència Matemàtica: Aritmètica modular i patrons de desplaçament.",
      "Competència Ètica: Ús responsable de la informació compartida."
    ],
    sessions: [
      "S1: Què és una contrasenya segura i com viatgen les dades per Internet?",
      "S2: Construcció de la roda de Cèsar i desxifratge de missatges secrets.",
      "S3: Creació d'un protocol de ciberseguretat per als dispositius de l'escola."
    ],
    evaluationCriteria: "Comprèn els principis bàsics de la codificació de dades i adopta hàbits de navegació segura i respectuosa."
  },
  {
    id: "sa-hivernacle-microbit",
    title: "L'Hivernacle Escolar Automatitzat",
    robot: "microbit",
    robotName: "Microbit",
    cicle: "cicle-mitja",
    cicleLabel: "Cicle Mitjà i Superior",
    tematica: "sostenibilitat",
    tematicaLabel: "Medi ambient i sostenibilitat",
    materia: "medi",
    materiaLabel: "Coneixement del Medi / Ciències",
    challenge: "Com podem garantir que les plantes del nostre hort rebin l'aigua i la llum adequades fins i tot durant el cap de setmana?",
    duration: "5 sessions",
    competencies: [
      "Competència STEM: Mesura de variables ambientals (humitat, llum i temperatura).",
      "Competència Digital: Programació de condicions llindar en MakeCode.",
      "Competència per a la Sostenibilitat: Ús eficient de l'aigua de reg."
    ],
    sessions: [
      "S1: Anàlisi botànica: Necessitats hídriques de les plantes de l'hort.",
      "S2: Calibració del sensor d'humitat a terra seca i terra humida.",
      "S3: Programació de l'alerta sonora i visual a la matriu de LEDs.",
      "S4: Connexió d'un servomotor per obrir la comporta del dipòsit d'aigua.",
      "S5: Proves reals a l'hort i registre de dades setmanals."
    ],
    evaluationCriteria: "Aplica el mètode científic mitjançant la recollida de dades amb sensors i automatitza respostes per conservar recursos naturals."
  },
  {
    id: "sa-coreografia-codey",
    title: "La Festa dels Autòmats: Art i Programació",
    robot: "codeyrocky",
    robotName: "CodeyRocky",
    cicle: "cicle-inicial",
    cicleLabel: "Cicle Inicial i Mitjà",
    tematica: "art",
    tematicaLabel: "Art, música i expressió",
    materia: "artistica",
    materiaLabel: "Educació Artística i Plàstica",
    challenge: "Podem sincronitzar una colla de robots perquè ballin una cançó tradicional al compàs de la música amb llums i disfresses creades per nosaltres?",
    duration: "4 sessions",
    competencies: [
      "Competència Artística: Disseny plàstic d'escenografies i disfresses de personatges.",
      "Competència Musical: Ritme, pulsació i sincronització temporal.",
      "Competència Digital: Programació de bucles sincronitzats per temps."
    ],
    sessions: [
      "S1: Elecció de la cançó i compàs dels moviments (endavant, gir, llums).",
      "S2: Taller de disfresses amb cartolines i materials reciclats per a Rocky.",
      "S3: Programació dels blocs de ritme i llum RGB al programa mBlock.",
      "S4: Ballada final conjunta i gravació del videoclip musical de l'aula."
    ],
    evaluationCriteria: "Combina llenguatges artístics plàstics i musicals amb el moviment robòtic per expressar idees i sentiments de forma col·laborativa."
  },
  {
    id: "sa-laberint-mart",
    title: "Missió Mart: El Rover de Rescat",
    robot: "spike",
    robotName: "Spike",
    cicle: "eso",
    cicleLabel: "ESO (1r-3r)",
    tematica: "espai",
    tematicaLabel: "Exploració espacial i viatges",
    materia: "tecnologia",
    materiaLabel: "Tecnologia i Digitalització",
    challenge: "Com programar un vehicle no tripulat per explorar un cràter marcià, esquivar roques per ultrasons i agafar una mostra mineral sense intervenció humana directa?",
    duration: "6 sessions",
    competencies: [
      "Competència en Enginyeria: Centre de gravetat, tracció i robustesa mecànica.",
      "Competència Digital: Algorismes de navegació reactiva i presa de decisions.",
      "Aprendre a Aprendre: Gestió de la frustració i millora iterativa de prototips."
    ],
    sessions: [
      "S1: El repte espacial: retard de comunicació i necessitat d'autonomia.",
      "S2: Disseny del xassís tot-terreny capaç de superar obstacles de 4 cm.",
      "S3: Muntatge de la pinça articulada amb sensor de pressió.",
      "S4: Algorisme de navegació amb ultrasons i comprovació de perill.",
      "S5: Proves a la pista de sorra i roques (simulació marciana).",
      "S6: Memòria tècnica i avaluació per rúbrica entre equips."
    ],
    evaluationCriteria: "Dissenya solucions d'enginyeria complexes que integren múltiples sensors i actuadors per navegar autònomament en entorns desafiants."
  }
];

if (typeof window !== 'undefined') {
  window.LEARNING_SITUATIONS = LEARNING_SITUATIONS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LEARNING_SITUATIONS };
}
