// data/unplugged.js - Activitats desendollades de Pensament Computacional

const UNPLUGGED_ACTIVITIES = [
  {
    id: "robot-huma",
    title: "El Robot Humà i el Llenguatge Precís",
    cicle: "infantil-inicial",
    cicleLabel: "Infantil i Cicle Inicial",
    duration: "45 min",
    concept: "Algorismes i Precisió",
    summary: "Un alumne fa de 'robot' amb els ulls tapats i ha de moure's per l'aula seguint únicament instruccions exactes dels seus companys ('un pas endavant', 'gir 90º a la dreta').",
    materials: ["Mocador per tapar els ulls", "Cadires o cons per fer d'obstacles tous"],
    steps: [
      {
        title: "1. Introducció al concepte de programa",
        desc: "Expliquem que els robots no 'endevinen' el que volem: només executen ordres literals. Si diem 'ves allà', el robot no sap on és 'allà'."
      },
      {
        title: "2. Definir el repertori d'instruccions",
        desc: "Acordem les úniques 4 ordres permeses: Avança 1 pas, Retrocedeix 1 pas, Gira a la dreta, Gira a l'esquerra."
      },
      {
        title: "3. El repte del circuit",
        desc: "Per parelles, un alumne fa de programador i l'altre de robot. Han de portar el robot des de la sortida fins a la meta evitant els cons."
      },
      {
        title: "4. Reflexió i depuració (Debug)",
        desc: "Quan el robot topa o s'atura, analitzem quina instrucció ha fallat i com corregir la seqüència."
      }
    ],
    teacherTip: "És ideal per treballar la lateralitat i la importància de donar ordres sense ambigüitats."
  },
  {
    id: "pixels-binaris",
    title: "Dibuix per Píxels i Imatges Binàries",
    cicle: "inicial-mitja",
    cicleLabel: "Cicle Inicial i Mitjà",
    duration: "45 min",
    concept: "Representació de Dades (Binari)",
    summary: "Com 'veu' i guarda un ordinador un dibuix? L'alumnat codifica i descodifica imatges senzilles en quadrícules utilitzant només els valors 0 (blanc) i 1 (negre).",
    materials: ["Fulls de quadrícula de 8x8 o 10x10 caselles", "Llapis o retoladors"],
    steps: [
      {
        title: "1. Què és un píxel?",
        desc: "Mostrem una imatge a la pantalla fent molt de zoom fins que es vegin els quadradets individuals (píxels)."
      },
      {
        title: "2. La regla del codi",
        desc: "Cada casella blanca és un 0 i cada casella pintada de negre és un 1. Una línia com '0 1 1 0' vol dir: blanc, negre, negre, blanc."
      },
      {
        title: "3. Desxifrar el dibuix misteriós",
        desc: "Cada alumne rep una targeta amb files de números binaris i ha de pintar la seva quadrícula per descobrir quina figura s'amaga (un cor, una fletxa, una cara)."
      },
      {
        title: "4. Crear el propi missatge",
        desc: "Ara fan el procés invers: dibuixen la seva icona i escriuen el codi numèric per passar-lo al company."
      }
    ],
    teacherTip: "Connecta directament amb la compressió d'imatges i el funcionament de les pantalles digitals."
  },
  {
    id: "xarxa-ordenacio",
    title: "Xarxa d'Ordenació al Terra (Sorting Networks)",
    cicle: "mitja-superior",
    cicleLabel: "Cicle Mitjà i Superior",
    duration: "50 min",
    concept: "Algorismes de Comparació i Processament Paral·lel",
    summary: "Dibuixem una xarxa de línies amb guix al pati. Sis alumnes amb números desordenats avancen per les línies; en cada encreuament es comparen de dos en dos i el més petit sempre va cap a l'esquerra.",
    materials: ["Guix de colors per dibuixar la xarxa al terra", "Targetes de cartolina amb números de l'1 al 6"],
    steps: [
      {
        title: "1. Dibuixar el diagrama al terra",
        desc: "Es tracen 6 canals paral·lels que s'uneixen en diferents punts formant encreuaments de comparació."
      },
      {
        title: "2. Posició de sortida",
        desc: "Sis alumnes agafen cadascun un número desordenat (ex: 5, 2, 6, 1, 4, 3) i es col·loquen a les línies d'entrada."
      },
      {
        title: "3. Avançar i comparar",
        desc: "Caminen endavant. Quan dos alumnes coincideixen en un cercle d'encreuament, mostren la seva targeta: el número més petit segueix pel camí esquerre i el més gran pel dret."
      },
      {
        title: "4. La màgia de la sortida",
        desc: "En arribar al final de la xarxa, tots els alumnes surten ordenats de menor a major de forma automàtica (1, 2, 3, 4, 5, 6)."
      }
    ],
    teacherTip: "Demostra de manera kinestèsica com els ordinadors processen i ordenen milions de dades per comparacions paral·leles."
  },
  {
    id: "laberint-debugging",
    title: "El Laberint d'Instruccions i Detecció d'Errors",
    cicle: "infantil-inicial",
    cicleLabel: "Infantil i Cicle Inicial",
    duration: "40 min",
    concept: "Depuració (Debugging) i Seqüenciació",
    summary: "Sobre una graella gegant al terra amb fitxes de cartolina, els alumnes col·loquen targetes de fletxes per planificar un camí abans d'executar-lo. Quan troben un obstacle, aprenen a aïllar l'ordre equivocada.",
    materials: ["Cinta de pintor o rajoles de l'aula com a graella", "Fletxes de paper (amunt, avall, esquerra, dreta)", "Un objecte premi al final"],
    steps: [
      {
        title: "1. Dibuixar la ruta en paper abans d'actuar",
        desc: "No val provar a l'atzar. L'equip ha de col·locar la fila de fletxes a la taula abans que ningú trepitgi la graella."
      },
      {
        title: "2. Execució pas a pas",
        desc: "Un company llegeix la fletxa i un altre fa la passa sobre la casella corresponent."
      },
      {
        title: "3. Trobar el 'Bug'",
        desc: "Si la fletxa ens porta a una casella bloquejada, aturem el pas, assenyalem quina fletxa de la fila ha fallat i la substituïm."
      }
    ],
    teacherTip: "Normalitza l'error: en programació equivocar-se no és un fracàs, sinó una oportunitat per depurar."
  },
  {
    id: "condicionals-moviment",
    title: "El Joc dels Condicionals (Si... Llavors... Si no...)",
    cicle: "tots",
    cicleLabel: "Tots els Cicles",
    duration: "30 min",
    concept: "Estructures de Control Condicional",
    summary: "Joc d'acció corporal on el docent o un alumne estableix regles lògiques d'execució: 'SI portes cordons a les sabates, LLAVORS fes 3 salts; SI NO, pica de mans'.",
    materials: ["Cap material necessari (o targetes amb regles escrites)"],
    steps: [
      {
        title: "1. Condició simple: SI (Condició) LLAVORS (Acció)",
        desc: "Exemple: Si portes jersei vermell, llavors aixeca la mà dreta. Els que no en portin es queden quiets."
      },
      {
        title: "2. Condició completa: SI ... LLAVORS ... SI NO ...",
        desc: "Exemple: Si el teu nom comença per vocal, toca't el nas; si no, toca't els genolls."
      },
      {
        title: "3. Condicionals compostos (I / O)",
        desc: "Per cicles mitjà i superior: 'Si el teu mes de naixement és parell I portes sabates fosques...'"
      }
    ],
    teacherTip: "Permet interioritzar com les màquines prenen decisions lògiques a partir de l'estat dels seus sensors."
  },
  {
    id: "criptografia-cesar",
    title: "Missatges Secrets i Xifratge Cèsar",
    cicle: "mitja-superior",
    cicleLabel: "Cicle Mitjà, Superior i ESO",
    duration: "50 min",
    concept: "Ciberseguretat i Criptografia",
    summary: "Construcció d'una roda de xifratge de dos cercles concèntrics per comprendre com es protegeix la informació a Internet desplaçant les lletres de l'alfabet un nombre fix de posicions.",
    materials: ["Plantilla de roda de Cèsar retallable (2 cercles)", "Una agulla d'enquadernar de dues potes per unir el centre"],
    steps: [
      {
        title: "1. La necessitat de protegir dades",
        desc: "Com feia Juli Cèsar per enviar missatges als seus generals sense que els enemics els llegissin si capturaven el missatger?"
      },
      {
        title: "2. La clau de desplaçament",
        desc: "Si la clau és +3, la lletra A es converteix en D, la B en E, etc. Girem la roda interior 3 posicions."
      },
      {
        title: "3. Xifrar i desxifrar missatges",
        desc: "Cada parella s'intercanvia missatges codificats i ha d'endevinar la clau o aplicar la clau pactada per desxifrar-los."
      }
    ],
    teacherTip: "Introducció perfecta a la privadesa digital i a la seguretat de les contrasenyes."
  }
];

if (typeof window !== 'undefined') {
  window.UNPLUGGED_ACTIVITIES = UNPLUGGED_ACTIVITIES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UNPLUGGED_ACTIVITIES };
}
