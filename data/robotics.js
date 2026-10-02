// data/robotics.js - Tutorials dels 6 robots educatius

const ROBOTICS_TUTORIALS = [
  {
    id: "lego-coding-express",
    robot: "Lego Coding Express",
    badge: "Educació Infantil (2-5 anys)",
    title: "El Tren Intel·ligent dels Colors i les Accions",
    subtitle: "Iniciació primerenca a la seqüenciació amb maons d'acció de colors",
    description: "Lego Coding Express combina les clàssiques vies de tren DUPLO amb un sensor òptic sota la locomotora. Els infants col·loquen maons de colors a la via per activar llums, sons, parades o canvis de sentit.",
    keyConcepts: ["Causa-efecte", "Seqüenciació d'esdeveniments", "Llenguatge de símbols"],
    hardwareSetup: [
      "Locomotora elèctrica amb sensor de color inferior",
      "Vies rectes i corbes de plàstic DUPLO",
      "5 maons d'acció de colors (vermell, blau, groc, verd, blanc)"
    ],
    colorCodes: [
      { color: "#ef4444", name: "Vermell", action: "Aturar el tren immediatament" },
      { color: "#3b82f6", name: "Blau", action: "Omplir d'aigua (so de xipolleig)" },
      { color: "#eab308", name: "Groc", action: "Tocar el xiulet del tren" },
      { color: "#10b981", name: "Verd", action: "Canviar de direcció (marxa enrere)" },
      { color: "#f8fafc", name: "Blanc", action: "Encendre i apagar els fars davanters" }
    ],
    activityGuide: [
      {
        session: "1. Exploració lliure",
        goal: "Construir un circuit tancat i descobrir què fa la locomotora quan passa per damunt de cada maó de color."
      },
      {
        session: "2. La missió de l'estació",
        goal: "Col·locar el maó vermell just davant de l'estació de viatgers i el maó groc abans d'un pas a nivell."
      },
      {
        session: "3. El repte de la càrrega d'aigua",
        goal: "Organitzar el circuit perquè el tren pari a beure aigua (blau) i canviï de sentit (verd) per tornar al punt d'inici."
      }
    ],
    classroomTip: "Per als més petits, és ideal fer hipòtesis abans de posar el tren en marxa: 'Què creieu que passarà quan trepitgi el maó groc?'"
  },
  {
    id: "talebot",
    robot: "TaleBot",
    badge: "Infantil i Cicle Inicial (3-7 anys)",
    title: "Contes Interactius, Gravació de Veu i Dibuix",
    subtitle: "Robot de terra que parla, llegeix mapes interactius i dibuixa amb retoladors",
    description: "TaleBot Pro és un robot tangible que llegeix mapes temàtics mitjançant tecnologia OID (reconeixement de patrons òptics invisibles), permet gravar la veu de l'alumnat a cada pas i incorporar retoladors per dibuixar formes geomètriques.",
    keyConcepts: ["Orientació espacial", "Narrativa oral", "Desbugueig (Clear)"],
    hardwareSetup: [
      "Robot TaleBot amb botons superiors (Endavant, Enrere, Gir Esquerra, Gir Dreta, Play, Delete)",
      "Mapes interactius temàtics de doble cara",
      "Adaptadors de retolador i ales de disfressa"
    ],
    colorCodes: [
      { color: "#22c55e", name: "Botó Endavant", action: "Avança 1 casella (10 cm)" },
      { color: "#f59e0b", name: "Botons de Gir", action: "Gira 90º sobre el seu propi eix" },
      { color: "#ef4444", name: "Botó Delete (X)", action: "Esborra la memòria de l'ordre anterior" },
      { color: "#3b82f6", name: "Botó Rec (Micro)", action: "Grava 30 segons de veu del nen o nena" }
    ],
    activityGuide: [
      {
        session: "1. Els viatges del conte",
        goal: "Sobre el mapa d'animals, programar el TaleBot perquè visiti el lleó i després la girafa explicant una pista amb la seva pròpia veu gravada."
      },
      {
        session: "2. Geometria dibuixada",
        goal: "Inserir dos retoladors a les ales del TaleBot i programar un quadrat perfecte sobre un full gran (Avança, Gira 90º, 4 vegades)."
      },
      {
        session: "3. La ruleta de les emocions",
        goal: "Identificar situacions emocionals al mapa: el robot ha d'arribar al personatge trist i reproduir un missatge de consol gravat pels infants."
      }
    ],
    classroomTip: "Recorda crear la rutina: abans de programar una nova ruta, cal prémer el botó 'Delete' (vermell) per buidar la memòria del viatge anterior."
  },
  {
    id: "codingset",
    robot: "CodingSet",
    badge: "Infantil i Primària (4-9 anys)",
    title: "Programació Tangible sense Pantalles (Matatalab)",
    subtitle: "Torre de lectura òptica i fitxes físiques per a una comprensió intuïtiva",
    description: "El Coding Set (Matatalab) utilitza un tauler on els nens col·loquen fitxes de plàstic dures amb símbols (moviment, bucles de repetició, números i notes musicals). Una torre escaneja el tauler i transmet per Bluetooth les ordres al robot petit.",
    keyConcepts: ["Pensament tangible", "Bucles de repetició", "Composició musical i angles"],
    hardwareSetup: [
      "Tauler de programació amb caselles",
      "Torre de lectura amb càmera integrada",
      "Robot mòbil (MatataBot)",
      "Caixa de blocs físics de direcció, números i bucles"
    ],
    colorCodes: [
      { color: "#f97316", name: "Blocs de Moviment", action: "Fletxes endavant, enrere i girs d'angle (30º, 60º, 90º)" },
      { color: "#3b82f6", name: "Blocs Numèrics", action: "Defineixen quantes vegades s'executa l'acció (1 a 5)" },
      { color: "#a855f7", name: "Blocs de Bucle", action: "Envolten un grup d'ordres per repetir-les sense gastar fitxes" },
      { color: "#10b981", name: "Botó Gran Play", action: "Escaneja el tauler i arrenca el robot" }
    ],
    activityGuide: [
      {
        session: "1. Camí d'anada i tornada",
        goal: "Portar el MatataBot a recollir un tresor i tornar a la base d'inici amb una seqüència lineal ordenada d'esquerra a dreta."
      },
      {
        session: "2. El descobriment dels bucles",
        goal: "En lloc de posar 'Endavant, Endavant, Endavant', utilitzar la fitxa 'Endavant' amb el número '3' a sota, estalviant fitxes."
      },
      {
        session: "3. Coreografia i música",
        goal: "Combinar el bloc d'animació amb notes musicals perquè el robot balli i toqui una petita melodia en assolir la meta."
      }
    ],
    classroomTip: "L'esquema d'esquerra a dreta reforça el sentit de la lectoescriptura occidental i l'ordre seqüencial de lectura de codi."
  },
  {
    id: "codeyrocky",
    robot: "CodeyRocky",
    badge: "Primària (6-12 anys)",
    title: "El Robot Intel·ligent amb Pantalla i IA",
    subtitle: "Programació en blocs mBlock 5, reconeixement de veu i emocions",
    description: "Codey Rocky està format per dues parts: Codey (el cervell amb pantalla matriu LED de 16x8, botons, altaveu i sensors) i Rocky (el xassís oruga amb sensors de color i d'infrarojos). Es programa amb blocs tipus Scratch o Python a través de mBlock.",
    keyConcepts: ["Matriu LED", "Sensors de llum i color", "Inteligència artificial bàsica"],
    hardwareSetup: [
      "Controlador 'Codey' (giròscop, micròfon, llum, altaveu, matriu de 128 LEDs)",
      "Xassís mòbil 'Rocky' (tracció per erugues, sensor de color/IR de terra)",
      "Connexió USB / Bluetooth a ordinador o tauleta"
    ],
    colorCodes: [
      { color: "#0284c7", name: "Blocs Pantalla", action: "Dibuixar carones, textos lliscants i números a la matriu LED" },
      { color: "#8b5cf6", name: "Blocs So", action: "Reproduir efectes (rialles, maulats de gat, xiulets, tons)" },
      { color: "#f59e0b", name: "Sensors Rocky", action: "Llegir escala de grisos del terra o detectar obstacles frontals" },
      { color: "#10b981", name: "Blocs Motors", action: "Controlar la velocitat de les dues orugues de forma independent" }
    ],
    activityGuide: [
      {
        session: "1. La mascota emocional",
        goal: "Programar Codey perquè mostri una cara alegre quan li donem un copet a la taula (giròscop) i s'enfadi si el posem panxa enlaire."
      },
      {
        session: "2. Seguidor de línia i barrera",
        goal: "Utilitzar el sensor de terra per seguir una cinta negra al terra i aturar-se amb un so d'alarma si algú posa la mà a 10 cm."
      },
      {
        session: "3. Reconeixement de veu amb IA",
        goal: "Utilitzar l'extensió Cognitive Services de mBlock perquè el robot avanci quan escolti la paraula 'Marxa' pel micròfon."
      }
    ],
    classroomTip: "Com que Codey es pot desacoblar de Rocky, el pots fer servir com a consola de videojocs portàtil per crear jocs interactius a l'aula."
  },
  {
    id: "spike",
    robot: "Spike",
    badge: "Cicle Superior i ESO (10-16 anys)",
    title: "Mecatrònica i Enginyeria LEGO Education SPIKE",
    subtitle: "Construcció STEAM avançada amb motors angulars, engranatges i sensors",
    description: "SPIKE (Essential i Prime) combina elements de construcció Technic amb un Hub intel·ligent programable, motors amb mesura de posició angular (encoders) i sensors d'alta precisió (color, distància per ultrasons i força). Permet passar fàcilment de blocs Scratch a Python.",
    keyConcepts: ["Engranatges i relacions de transmissió", "Control angular precís", "Prototipatge de màquines reals"],
    hardwareSetup: [
      "Smart Hub SPIKE amb giroscopi de 6 eixos i matriu de llum 5x5",
      "Motors mitjans i grans amb alta precisió de gir",
      "Sensor de distància per ultrasons i sensor de color",
      "Bigues Technic, eixos, cremalleres i engranatges"
    ],
    colorCodes: [
      { color: "#facc15", name: "Hub SPIKE", action: "Gestió central de dades, bateria recarregable i 6 ports de connexió" },
      { color: "#3b82f6", name: "Motor Angular", action: "Gira a velocitat constant o fins a un angle de graus exacte" },
      { color: "#06b6d4", name: "Sensor Ultrasons", action: "Mesura la distància a objectes amb precisió mil·limètrica" },
      { color: "#ec4899", name: "Sensor de Pressió", action: "Mesura força en Newtons i funciona com a polsador tàctil" }
    ],
    activityGuide: [
      {
        session: "1. La porta automàtica d'aparcament",
        goal: "Muntar una barrera que s'obri automàticament a 90 graus quan un cotxe s'apropi al sensor de distància i es tanqui als 3 segons."
      },
      {
        session: "2. El robot explorador amb tracció per engranatges",
        goal: "Calcular quins engranatges permeten pujar una rampa inclinada augmentant la força (parell) a canvi de reduir velocitat."
      },
      {
        session: "3. Braç classificador de peces",
        goal: "Construir un braç robòtic que detecti peces grogues i vermelles i les distribueixi en dos contenidors diferents."
      }
    ],
    classroomTip: "Exigeix que l'alumnat mantingui les safates de peces classificades ordenades per colors i mides; estalvia més de 15 minuts en cada sessió."
  },
  {
    id: "microbit",
    robot: "Microbit",
    badge: "Primària, ESO i Batxillerat (9-18 anys)",
    title: "La Micro-computadora Versàtil BBC micro:bit",
    subtitle: "Projectes lliures des de codi senzill MakeCode fins a Python i ràdio sense fils",
    description: "La placa BBC micro:bit (V1 i V2) és una de les eines més econòmiques i potents per a les escoles. Inclou 25 LEDs vermells, dos polsadors, sensor de temperatura, brúixola, acceleròmetre, micròfon, altaveu i emissor de ràdio freqüència entre plaques.",
    keyConcepts: ["Variables i condicionals", "Xarxes de ràdio (Mesh)", "Connectivitat amb pins analògics i digitals"],
    hardwareSetup: [
      "Placa BBC micro:bit V2 amb cable micro-USB",
      "Portapiles per a 2 piles AAA de 1.5V",
      "Pins de connexió ràpida 0, 1, 2, 3V i GND per a pinces de cocodril",
      "Sensors externs opcionals (humitat, llum LDR, servos de 180º)"
    ],
    colorCodes: [
      { color: "#0284c7", name: "Matriu 5x5 LEDs", action: "Mostra text, números, gràfiques de barres i icones expressives" },
      { color: "#e11d48", name: "Sensor Ràdio", action: "Envia dades i missatges instantanis d'una placa a una altra sense Wi-Fi" },
      { color: "#7c3aed", name: "Pins 0, 1, 2", action: "Lectura de valors analògics (0 a 1023) o sortides de polsos digitals" },
      { color: "#059669", name: "Acceleròmetre", action: "Detecta gestos: sacsejar, inclinar, caiguda lliure i passos caminats" }
    ],
    activityGuide: [
      {
        session: "1. Dau digital i comptapassos",
        goal: "En sacsejar la micro:bit, triar un número a l'atzar de l'1 al 6 i mostrar-lo a la pantalla de LEDs."
      },
      {
        session: "2. Walkie-talkie secret per ràdio",
        goal: "Connectar les plaques de l'aula al mateix canal de ràdio per enviar-se icones d'alerta o codi Morse en prémer els botons A i B."
      },
      {
        session: "3. Alarma anti-robatori per la motxilla",
        goal: "Detectar si la motxilla es mou quan està a les fosques (sensor de llum + acceleròmetre) i disparar un so d'alarma pel brunzidor."
      }
    ],
    classroomTip: "L'entorn web MakeCode permet simular la placa completament a la pantalla; pots treballar fins i tot si no disposes de plaques físiques suficients."
  }
];

if (typeof window !== 'undefined') {
  window.ROBOTICS_TUTORIALS = ROBOTICS_TUTORIALS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ROBOTICS_TUTORIALS };
}
