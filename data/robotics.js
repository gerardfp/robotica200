// data/robotics.js - Els 6 robots educatius amb els seus tutorials dedicats

const ROBOTS_DATA = [
  {
    id: "lego-coding-express",
    name: "Lego Coding Express",
    badge: "Educació Infantil (2-5 anys)",
    icon: "🚂",
    subtitle: "El tren interactiu dels colors i el pensament computacional primerenc",
    description: "Lego Coding Express combina les clàssiques vies i peces DUPLO amb una locomotora intel·ligent equipada amb un sensor de llum inferior. Mitjançant maons d'acció de colors col·locats a la via, els infants controlen parades, canvis de sentit, xiulets i llums sense necessitat de pantalles.",
    specs: ["Sensor de color inferior", "Llums LED frontals", "Altaveu amb sons reals de tren", "Motor elèctric suau Push & Go"],
    tutorials: [
      {
        id: "lce-primeres-passes",
        title: "Primeres passes: El circuit bàsic i el motor Push & Go",
        difficulty: "Iniciació",
        duration: "30 min",
        summary: "Com encendre la locomotora, comprendre la mecànica 'empeny per arrencar i atura amb la mà' i muntar el primer circuit tancat de vies.",
        goals: [
          "Familiaritzar-se amb el botó d'encesa i el mecanisme Push & Go.",
          "Construir un circuit ovalat o circular que no tingui talls.",
          "Comprendre el concepte de cicle continu (bucle físic)."
        ],
        materials: ["1 locomotora Lego Coding Express", "12 trams de via corba", "Peces de decoració DUPLO"],
        steps: [
          {
            title: "1. Encesa de la locomotora",
            desc: "Prem el botó verd superior de la locomotora. S'il·luminarà el far davanter indicant que el tren està llest."
          },
          {
            title: "2. La màgia del Push & Go",
            desc: "Dóna una petita empenta suau cap endavant: el tren continuarà en marxa tot sol. Per aturar-lo, només cal posar la mà a sobre o agafar-lo."
          },
          {
            title: "3. Construcció del circuit cooperatiu",
            desc: "En equips de 3 o 4 infants, cadascú afegeix un tram de via fins a tancar el cercle."
          }
        ],
        teacherTip: "Assegura't que les vies estiguin sobre una superfície plana (terra o taula baixa) perquè les rodes motrius tinguin bona tracció."
      },
      {
        id: "lce-motors-sensors",
        title: "Motors i sensors: Els maons d'acció de colors",
        difficulty: "Iniciació",
        duration: "45 min",
        summary: "Descobrir la relació causa-efecte col·locant els 5 maons de colors a les vies per activar sensors, sons i canvis de marxa.",
        goals: [
          "Identificar la funció de cada maó de color (vermell, blau, groc, verd, blanc).",
          "Anticipar el comportament del tren abans que arribi al sensor.",
          "Col·locar senyals d'aturada a l'estació de forma precisa."
        ],
        materials: ["Vies DUPLO", "Locomotora", "5 maons d'acció (vermell, blau, groc, verd, blanc)"],
        steps: [
          {
            title: "1. Experimentació amb el maó vermell (Aturada)",
            desc: "Col·loca el maó vermell a la via. Quan el sensor inferior el detecta, el motor s'atura immediatament."
          },
          {
            title: "2. Sons i llums (Groc, Blau i Blanc)",
            desc: "El maó groc fa sonar el xiulet del tren; el blau reprodueix el so de carregar aigua; el blanc encén o apaga els fars."
          },
          {
            title: "3. Canvi de sentit (Maó verd)",
            desc: "El maó verd inverteix la rotació del motor i fa recular el tren."
          }
        ],
        teacherTip: "Fes que els infants cantin o verbalitzin l'acció abans que passi: 'Arriba al blau... xip-xap, aigua!'."
      },
      {
        id: "lce-bifurcacions",
        title: "Canvis d'agulla i bifurcacions en Y",
        difficulty: "Intermedi",
        duration: "45 min",
        summary: "Utilitzar peces de canvi de via per crear rutes alternatives i prendre decisions de transport segons el destí.",
        goals: [
          "Entendre les bifurcacions condicionals a l'espai físic.",
          "Dirigir el tren cap a la ciutat o cap a la granja canviant la palanca d'agulla.",
          "Treballar la planificació estratègica en grup."
        ],
        materials: ["Vies DUPLO amb canvi d'agulla (peça en Y)", "2 estacions diferents construïdes amb peces"],
        steps: [
          {
            title: "1. Muntar la bifurcació",
            desc: "Insereix la via de desviament. Mostra la palanqueta vermella manual que decideix quin camí pren la roda."
          },
          {
            title: "2. Assignar rutes temàtiques",
            desc: "La via dreta porta al bosc (animals) i la via esquerra a la ciutat (persones). Els infants decideixen on enviar la càrrega."
          },
          {
            title: "3. Retorn automàtic",
            desc: "Col·loca un maó verd al final de cada via morta perquè el tren canviï de marxa i torni a la via principal."
          }
        ],
        teacherTip: "És la introducció perfecta a l'estructura condicional ('SI la palanca està a l'esquerra, LLAVORS el tren va a la ciutat')."
      }
    ]
  },
  {
    id: "talebot",
    name: "TaleBot",
    badge: "Infantil i Cicle Inicial (3-7 anys)",
    icon: "🦔",
    subtitle: "El robot narrador que parla, llegeix mapes interactius i dibuixa",
    description: "TaleBot Pro és un robot tangible pensat per desenvolupar el pensament computacional, el llenguatge oral i la creativitat. Reconeix mapes temàtics mitjançant un sensor òptic OID, permet enregistrar la pròpia veu a cada casella i dibuixa figures geomètriques amb retoladors.",
    specs: ["Botons superiors direccionals", "Sensor OID de lectura de mapes", "Micròfon i altaveu integrats", "Suport de retoladors per dibuix"],
    tutorials: [
      {
        id: "tb-primeres-passes",
        title: "Primeres passes: Botons direccionals i la tecla Delete",
        difficulty: "Iniciació",
        duration: "30 min",
        summary: "Descobrir els comandaments bàsics de TaleBot, la mesura del seu pas (10 cm) i la importància de buidar la memòria.",
        goals: [
          "Distingir les tecles Endavant, Enrere, Gir Dreta i Gir Esquerra.",
          "Aprendre la rutina del botó Delete (X) per evitar acumular ordres velles.",
          "Calcular desplaçaments de casella en casella."
        ],
        materials: ["1 robot TaleBot Pro", "Graella al terra o mapa bàsic"],
        steps: [
          {
            title: "1. Engegar el robot",
            desc: "Gira la rodeta posterior fins a sentir la salutació sonora de TaleBot. Els ulls LED s'il·luminaran de color blau."
          },
          {
            title: "2. La regla d'or de la X",
            desc: "Abans de començar un camí nou, prem el botó vermell 'X' per esborrar les passes anteriors."
          },
          {
            title: "3. Programar una recta",
            desc: "Prem dos cops 'Endavant' i el botó taronja central 'Play'. TaleBot caminarà exactament 2 caselles (20 cm) i s'aturarà amb alegria."
          }
        ],
        teacherTip: "Per als girs, ensenya als infants que TaleBot gira sobre si mateix sense avançar casella."
      },
      {
        id: "tb-reconeixement-veu",
        title: "Reconeixement i enregistrament de veu",
        difficulty: "Iniciació",
        duration: "40 min",
        summary: "Gravar pistes d'àudio i diàlegs personalitzats amb la veu de l'alumnat a cada etapa del recorregut.",
        goals: [
          "Treballar l'expressió oral i la dicció clara.",
          "Vincular missatges de veu a esdeveniments de programació.",
          "Crear rutes narratives de contacontes interactius."
        ],
        materials: ["TaleBot", "Targetes de personatges o dibuixos fets a mà"],
        steps: [
          {
            title: "1. Activar el micròfon",
            desc: "Mantingues premut el botó del micròfon fins a sentir el senyal sonor 'Bip'."
          },
          {
            title: "2. Gravar el missatge",
            desc: "L'infant parla a prop del robot: 'Hola, sóc el conill i busco pastanagues!'. En deixar anar el botó, l'àudio queda desat."
          },
          {
            title: "3. Seqüenciar el conte",
            desc: "Programa: Endavant → Reprodueix veu → Gira a la dreta → Endavant."
          }
        ],
        teacherTip: "Molt recomanable per a infants amb dificultats d'escriptura: s'expressen oralment amb total comoditat."
      },
      {
        id: "tb-motors-sensors",
        title: "Motors i sensors: Dibuix geomètric amb retoladors",
        difficulty: "Intermedi",
        duration: "45 min",
        summary: "Inserir dos retoladors a les ales de TaleBot per traçar formes geomètriques de colors exactes sobre paper continu.",
        goals: [
          "Relacionar la geometria espacial amb seqüències d'ordres repetitives.",
          "Dibuixar quadrats, rectangles i figures simètriques.",
          "Ajustar la precisió de gir i velocitat dels motors de tracció."
        ],
        materials: ["2 retoladors de punta cònica", "Full gran de paper continu o cartolina A2"],
        steps: [
          {
            title: "1. Col·locar els retoladors",
            desc: "Insereix els retoladors als forats laterals de TaleBot assegurant que les puntes toquin suaument el paper."
          },
          {
            title: "2. El repte del quadrat",
            desc: "Planifica el codi: (Endavant → Gira 90º) repetit 4 vegades. En prémer Play, TaleBot pintarà un quadrat tancat."
          },
          {
            title: "3. Crear patrons artístics",
            desc: "Combina girs repetits per crear mandales i estrelles geomètriques."
          }
        ],
        teacherTip: "Posa una cartolina gruixuda a sota per evitar que els retoladors traspassin a la taula."
      }
    ]
  },
  {
    id: "codingset",
    name: "CodingSet",
    badge: "Infantil i Primària (4-9 anys)",
    icon: "🧩",
    subtitle: "Programació tangible sense pantalles amb Matatalab",
    description: "El Coding Set de Matatalab elimina la necessitat d'ordinadors o tauletes mitjançant un tauler físic on els alumnes col·loquen fitxes de plàstic dures. Una torre amb càmera escaneja els blocs i envia les instruccions al robot mòbil MatataBot per Bluetooth.",
    specs: ["Torre de reconeixement visual", "Tauler de programació matricial", "Blocs físics de moviment, números i bucles", "Robot mòbil amb ulls expressius"],
    tutorials: [
      {
        id: "cs-primeres-passes",
        title: "Primeres passes: La torre de lectura i el tauler físic",
        difficulty: "Iniciació",
        duration: "30 min",
        summary: "Descobrir la connexió entre la torre d'escaneig i el MatataBot, i l'ordre seqüencial d'esquerra a dreta.",
        goals: [
          "Entendre que les fitxes es llegeixen com un text: d'esquerra a dreta i de dalt a baix.",
          "Emparellar per Bluetooth la torre i el robot.",
          "Executar una seqüència de tres passos simples."
        ],
        materials: ["Tauler de control", "Torre Matatalab", "Robot MatataBot", "Fitxes de moviment (fletxes)"],
        steps: [
          {
            title: "1. Engegar el sistema",
            desc: "Encén el robot i la torre prement el seu botó durant 2 segons. La llum blava fixa indica emparellament correcte."
          },
          {
            title: "2. Col·locar les fitxes",
            desc: "Posa les fletxes sobre les caselles buides del tauler seguint una línia horitzontal contínua."
          },
          {
            title: "3. Prémer el gran botó Play",
            desc: "Prem el botó gran taronja de la torre. La càmera escaneja les fitxes i el robot comença a moure's immediatament pel tapís."
          }
        ],
        teacherTip: "Si la torre no llegeix una fitxa, comprova que la il·luminació no creï ombres intenses sobre el tauler."
      },
      {
        id: "cs-motors-sensors",
        title: "Motors i paràmetres numèrics",
        difficulty: "Intermedi",
        duration: "40 min",
        summary: "Optimitzar el codi combinant les fitxes direccionals amb blocs de números (1, 2, 3, 4, 5) per estalviar espai al tauler.",
        goals: [
          "Introduir el concepte de paràmetre o argument en una ordre.",
          "Reduir el nombre de fitxes necessàries per fer un recorregut llarg.",
          "Treballar la correspondència quantitat-desplaçament."
        ],
        materials: ["Blocs de fletxes", "Blocs numèrics de colors", "Tapís de mapa"],
        steps: [
          {
            title: "1. El problema de les fitxes esgotades",
            desc: "Per avançar 4 caselles, podem posar 4 fletxes... però ens quedem sense fitxes al calaix!"
          },
          {
            title: "2. Acoblar la fitxa numèrica",
            desc: "Col·loca 1 fletxa d'avançar i encaixa just a sota el número '4'. El robot avançarà 4 caselles d'un sol cop."
          },
          {
            title: "3. Girs per graus d'angle",
            desc: "Fes el mateix amb els blocs de gir angular (90º, 45º, 30º)."
          }
        ],
        teacherTip: "És la millor manera per entendre que un programa eficient és aquell que fa el mateix amb menys línies de codi."
      },
      {
        id: "cs-bucles",
        title: "Bucles de repetició i estructures de control",
        difficulty: "Intermedi",
        duration: "45 min",
        summary: "Empaquetar conjunts d'instruccions dins de blocs de bucle per crear figures regulars i camins repetitius.",
        goals: [
          "Comprendre el concepte de bucle (Loop).",
          "Distingir el bloc d'inici de bucle i el de tancament.",
          "Programar el recorregut d'un quadrat perfecte amb només 4 fitxes."
        ],
        materials: ["Blocs de bucle (morats)", "Blocs direccionals", "Fitxa numèrica x4"],
        steps: [
          {
            title: "1. Obrir el bucle",
            desc: "Posa la fitxa morada d'inici de bucle amb el número 4 a sota."
          },
          {
            title: "2. Les instruccions interiors",
            desc: "Posa a dins: Avança 1 pas → Gira 90 graus a la dreta."
          },
          {
            title: "3. Tancar el bucle",
            desc: "Posa la fitxa morada de tancament. En prémer Play, el robot repetirà 4 cops el patró completant el quadrat."
          }
        ],
        teacherTip: "Fes que els alumnes comparin el tauler sense bucles (8 fitxes) amb el tauler amb bucles (4 fitxes) per veure la diferència d'elegància."
      }
    ]
  },
  {
    id: "codeyrocky",
    name: "CodeyRocky",
    badge: "Primària (6-12 anys)",
    icon: "🐼",
    subtitle: "El robot amb pantalla matriu LED de 16x8, orugues i IA",
    description: "Codey Rocky està format per dues parts desacoblables: 'Codey' (el cervell amb pantalla matriu de 128 LEDs, sensor de llum, micròfon, altaveu i giroscopi) i 'Rocky' (el xassís oruga amb sensors de color i d'infrarojos). Es programa amb blocs tipus Scratch o Python a través del software mBlock 5.",
    specs: ["Pantalla matriu 16x8 LEDs", "Giroscopi de 6 eixos", "Tracció per erugues", "Sensor infraroig i de color", "Connexió USB/Bluetooth"],
    tutorials: [
      {
        id: "cr-primeres-passes",
        title: "Primeres passes: Connexió a mBlock 5 i cares a la matriu LED",
        difficulty: "Iniciació",
        duration: "35 min",
        summary: "Connectar Codey al software de l'ordinador o tauleta i programar animacions facials i missatges lliscants.",
        goals: [
          "Connectar el dispositiu per cable USB o Bluetooth a mBlock 5.",
          "Dibuixar a la graella de píxels de 16x8 de la pantalla.",
          "Gestionar esdeveniments bàsics: 'Quan es prem el botó A'."
        ],
        materials: ["Robot Codey Rocky", "Ordinador o tauleta amb mBlock 5", "Cable micro-USB"],
        steps: [
          {
            title: "1. Afegir el dispositiu",
            desc: "A mBlock 5, fes clic a 'Dispositius' → 'Afegir' i selecciona 'Codey'. Prem 'Connectar'."
          },
          {
            title: "2. Dibuixar una cara somrient",
            desc: "Arrossega el bloc blau 'Mostra la imatge [ ] durant 2 segons' i fes clic per pintar els LEDs dels ulls i la boca."
          },
          {
            title: "3. Interacció amb botons",
            desc: "Programa: 'Quan es prem el botó A' → Mostra cara feliç; 'Quan es prem el botó B' → Mostra text 'Hola'."
          }
        ],
        teacherTip: "En mode 'En viu', el codi s'executa a l'instant sense haver de carregar el programa cada vegada a la memòria."
      },
      {
        id: "cr-motors-sensors",
        title: "Motors i sensors: Esquivador d'obstacles amb infrarojos",
        difficulty: "Intermedi",
        duration: "45 min",
        summary: "Utilitzar les erugues de Rocky i el sensor frontal per aturar-se o girar abans de xocar contra una paret.",
        goals: [
          "Llegir dades del sensor frontal d'infrarojos en centímetres.",
          "Controlar la velocitat diferencial de les dues erugues.",
          "Crear un bucle indefinit amb condicional: Si hi ha obstacle → Esquivar."
        ],
        materials: ["Codey acoblat a Rocky", "Obstacles tous (capsetes de cartó)"],
        steps: [
          {
            title: "1. Acoblar Codey a Rocky",
            desc: "Insereix Codey dins el xassís Rocky fins a sentir el 'clic'. Els dos components ara comparteixen alimentació i bus de dades."
          },
          {
            title: "2. L'estructura de control condicional",
            desc: "Afegeix un bloc 'per sempre' amb un 'si <distància de l'obstacle < 15 cm> llavors: atura els motors i gira 90 graus'."
          },
          {
            title: "3. Prova en laberint",
            desc: "Col·loca el robot dins un passadís de llibres i observa com navega de forma autònoma."
          }
        ],
        teacherTip: "Si el sensor reflecteix superfícies negres o miralls, la lectura pot variar; utilitza obstacles de colors clars."
      },
      {
        id: "cr-veu-ia",
        title: "Reconeixement de veu i Intel·ligència Artificial",
        difficulty: "Avançat",
        duration: "50 min",
        summary: "Utilitzar l'extensió de Serveis Cognitius per controlar el moviment del robot mitjançant ordres de veu en català.",
        goals: [
          "Entendre què són els serveis en el núvol i el processament de llenguatge natural (NLP).",
          "Convertir veu a text en temps real mitjançant mBlock.",
          "Vincular ordres parlades ('Arrenca', 'Para', 'Gira') a funcions motores."
        ],
        materials: ["Codey Rocky connectat per USB a ordinador amb micròfon i connexió a Internet"],
        steps: [
          {
            title: "1. Afegir l'extensió Cognitive Services",
            desc: "Fes clic a la icona '+' d'extensions a mBlock i afegeix 'Serveis cognitius (Cognitive Services)'."
          },
          {
            title: "2. Configurar l'escolta en català",
            desc: "Fes servir el bloc 'Reconeix la parla en [català] durant 3 segons'."
          },
          {
            title: "3. Condicional de veu",
            desc: "Si el resultat de la veu és igual a 'marxa', activa els motors endavant al 50% de potència."
          }
        ],
        teacherTip: "Aquesta activitat requereix connexió a Internet per enviar l'àudio als servidors de reconeixement de veu."
      }
    ]
  },
  {
    id: "spike",
    name: "Spike",
    badge: "Cicle Superior i ESO (10-16 anys)",
    icon: "⚙️",
    subtitle: "Mecatrònica, engranatges i sensors d'alta precisió de LEGO Education",
    description: "LEGO Education SPIKE (Essential i Prime) és el referent de construcció STEAM per a primària avançada i secundària. Incorpora un Hub programable amb 6 ports universals, motors angulars amb mesurador de posició absolut i sensors industrials de distància, color i força.",
    specs: ["Smart Hub amb giroscopi de 6 eixos", "Motors angulars amb mesura de graus", "Sensor de distància ultrasònic", "Sensor de color i llum", "Sensor de força (Newtons)"],
    tutorials: [
      {
        id: "sp-primeres-passes",
        title: "Primeres passes: El Hub intel·ligent i el primer programa",
        difficulty: "Iniciació",
        duration: "35 min",
        summary: "Connexió del Hub per Bluetooth a l'App SPIKE, gestió de la matriu 5x5 de LEDs i bateria recarregable.",
        goals: [
          "Actualitzar el firmware i emparellar el Hub amb l'ordinador.",
          "Programar la matriu de 25 píxels per mostrar icones i animacions.",
          "Comprendre la numeració dels 6 ports universals (A, B, C, D, E, F)."
        ],
        materials: ["Hub SPIKE Prime o Essential", "App LEGO SPIKE instal·lada", "Cable USB"],
        steps: [
          {
            title: "1. Connexió Bluetooth",
            desc: "Prem el botó central del Hub. Obre l'app LEGO Education SPIKE i selecciona 'Connecta per Bluetooth'."
          },
          {
            title: "2. Primer bloc de llum",
            desc: "Crea un projecte nou i arrossega: 'Quan comenci el programa' → 'Mostra a la pantalla el cor'."
          },
          {
            title: "3. Prova del sensor giroscòpic",
            desc: "Programa: 'Quan s'inclini cap a l'esquerra' → Mostra fletxa esquerra."
          }
        ],
        teacherTip: "Posa una etiqueta de color o número a cada Hub perquè els alumnes no es connectin per Bluetooth al robot del grup del costat."
      },
      {
        id: "sp-motors-sensors",
        title: "Motors i sensors: Tren d'engranatges i sensor de color",
        difficulty: "Intermedi",
        duration: "50 min",
        summary: "Muntar un vehicle amb reductora d'engranatges per guanyar força i aturar-lo exactament davant d'una línia vermella.",
        goals: [
          "Calcular la relació de transmissió entre un engranatge petit de 8 dents i un de gran de 24 dents.",
          "Moure el motor exactament un nombre de graus o rotacions determinades.",
          "Utilitzar el sensor de color en mode detecció de color directe."
        ],
        materials: ["Hub SPIKE", "2 motors angulars", "1 sensor de color", "Peces Technic i engranatges"],
        steps: [
          {
            title: "1. Muntatge mecatrònic",
            desc: "Munta un eix que connecti el motor a l'engranatge de 8 dents i aquest al de 24 de la roda."
          },
          {
            title: "2. Connectar al port B i D",
            desc: "Connecta els motors als ports B i D, i el sensor de color al port C apuntant cap a terra."
          },
          {
            title: "3. Condició de parada",
            desc: "Programa: 'Inicia el moviment dels motors' → 'Espera fins que el sensor C sigui [Vermell]' → 'Atura el moviment'."
          }
        ],
        teacherTip: "Pregunta socràtica: 'Gira més ràpid la roda o el motor?' (El motor gira 3 vegades per cada volta de roda)."
      },
      {
        id: "sp-brac-sensor-forca",
        title: "Braç robòtic i sensor de pressió (Newtons)",
        difficulty: "Avançat",
        duration: "55 min",
        summary: "Construir una pinça articulada que ajusti la seva força d'agafada segons si l'objecte és tou o dur.",
        goals: [
          "Comprendre el concepte de força mesurada en Newtons (N).",
          "Programar el motor en posició relativa de graus per obrir i tancar la pinça.",
          "Evitar que el motor es forci utilitzant el sensor de pressió com a parada."
        ],
        materials: ["Hub SPIKE", "1 motor mitjà", "1 sensor de força", "Elements de palanca Technic"],
        steps: [
          {
            title: "1. Muntar el mecanisme de palanca",
            desc: "Crea una pinça que es tanqui quan el motor giri en sentit horari."
          },
          {
            title: "2. Col·locar el sensor de força",
            desc: "Situa el sensor de força al punt de contacte de la mandíbula de la pinça."
          },
          {
            title: "3. Lògica de control de pressió",
            desc: "Tanca la pinça fins que la força sigui superior a 2 Newtons; després atura el motor immediatament."
          }
        ],
        teacherTip: "Aquest exercici simula exactament les pinces dels robots quirúrgics i industrials d'embalatge."
      }
    ]
  },
  {
    id: "microbit",
    name: "Microbit",
    badge: "Primària, ESO i Batxillerat (9-18 anys)",
    icon: "📟",
    subtitle: "La placa microcontroladora per a projectes oberts i ciutadans",
    description: "BBC micro:bit (V1 i V2) és una petita placa programable amb un cost molt accessible. Incorpora 25 LEDs vermells, dos polsadors, sensor de temperatura, brúixola magnètica, acceleròmetre de moviment, micròfon amb reconeixement de soroll, altaveu i emissor de ràdio freqüència entre plaques.",
    specs: ["Matriu 5x5 de LEDs vermells", "Sensor de llum, temperatura i micròfon", "Acceleròmetre i brúixola 3D", "Antena de ràdio 2.4GHz", "Pins P0, P1, P2 amb sortides analògiques"],
    tutorials: [
      {
        id: "mb-primeres-passes",
        title: "Primeres passes: MakeCode, matriu de 25 LEDs i polsadors",
        difficulty: "Iniciació",
        duration: "30 min",
        summary: "Com programar la placa des del navegador web MakeCode sense instal·lar cap programa i descarregar l'arxiu .hex.",
        goals: [
          "Conèixer l'entorn de programació MakeCode i el seu simulador interactiu.",
          "Crear un dau digital que mostri un número a l'atzar en sacsejar la placa.",
          "Passar l'arxiu compilat .hex a la unitat micro:bit com si fos un llapis de memòria USB."
        ],
        materials: ["Placa micro:bit (V1 o V2)", "Cable micro-USB", "Ordinador amb navegador web"],
        steps: [
          {
            title: "1. Obrir MakeCode",
            desc: "Entra a makecode.microbit.org i crea un projecte nou anomenat 'El meu dau'."
          },
          {
            title: "2. Programar l'esdeveniment sacsejar",
            desc: "A la categoria 'Entrada', agafa 'si es sacseja' i a dins posa 'mostra el número [tria a l'atzar de l'1 al 6]'."
          },
          {
            title: "3. Descarregar a la placa",
            desc: "Connecta la micro:bit per USB i prem el botó 'Descarregar'. En pocs segons el dau funcionarà de manera autònoma."
          }
        ],
        teacherTip: "Recorda als alumnes que el simulador de l'esquerra permet provar el programa abans fins i tot de tenir la placa connectada."
      },
      {
        id: "mb-motors-sensors",
        title: "Motors i sensors: Sensor d'humitat i servomotors",
        difficulty: "Intermedi",
        duration: "50 min",
        summary: "Connectar sensors externs als pins de la vora (P0, P1, P2) amb pinces de cocodril per automatitzar una alarma de reg.",
        goals: [
          "Diferenciar senyals digitals (0 o 1) de senyals analògics continus (0 a 1023).",
          "Connectar un sensor resistiu casolà amb 2 claus a P0 i GND.",
          "Controlar l'angle d'un servomotor de 0 a 180 graus des del pin P1."
        ],
        materials: ["micro:bit amb portapiles", "3 cables amb pinces de cocodril", "1 sensor d'humitat o claus", "1 mini servomotor 9g"],
        steps: [
          {
            title: "1. Cablejar els pins",
            desc: "Connecta el senyal del sensor al pin 0, 3V a l'alimentació i GND a terra."
          },
          {
            title: "2. Llegir el valor analògic",
            desc: "Programa: 'per sempre' → 'guarda a la variable [humitat] el valor de lectura analògica pin P0'."
          },
          {
            title: "3. Accionar el servo de reg",
            desc: "Si la humitat és inferior a 300, gira el servomotor a 90 graus per obrir la comporta d'aigua."
          }
        ],
        teacherTip: "Perquè no s'oxidin els claus ràpidament per electròlisi, alimenta el sensor només el mil·lisegon que fas la lectura."
      },
      {
        id: "mb-radio-mesh",
        title: "Xarxa de ràdio sense fils: Walkie-talkie i sensors remots",
        difficulty: "Intermedi",
        duration: "45 min",
        summary: "Connectar diverses micro:bits de l'aula entre si utilitzant l'antena de ràdio integrada sense necessitat de Wi-Fi.",
        goals: [
          "Entendre què és un canal de ràdio freqüència i com evitar interferències.",
          "Enviar paquets de dades (números i cadenes de text).",
          "Crear una estació meteorològica exterior que envia dades a una pantalla interior."
        ],
        materials: ["2 o més plaques micro:bit amb portapiles"],
        steps: [
          {
            title: "1. Fixar el grup de ràdio",
            desc: "Al bloc 'a l'iniciar', afegeix 'ràdio: fixa grup a [7]'. Totes les plaques del mateix equip han de compartir grup."
          },
          {
            title: "2. L'emissor",
            desc: "A la placa de l'hort: 'Quan es prem el botó A' → 'ràdio: envia número [temperatura]'."
          },
          {
            title: "3. El receptor a l'aula",
            desc: "A la placa de classe: 'en rebre per ràdio [receivedNumber]' → 'mostra el número [receivedNumber]' a la matriu de LEDs."
          }
        ],
        teacherTip: "Assigna un número de grup diferent a cada taula (Grup 1, Grup 2, etc.) perquè les ràdios no es barregin els missatges."
      },
      {
        id: "mb-so-microfon",
        title: "Micròfon i so: Detector de soroll i aplaudiments (V2)",
        difficulty: "Iniciació",
        duration: "35 min",
        summary: "Utilitzar el micròfon MEMS de la versió 2 per controlar el nivell de decibels de l'aula o encendre un llum en picar de mans.",
        goals: [
          "Calibrar el nivell de soroll ambiental de l'aula.",
          "Crear un semàfor de silenci que mostri una icona d'alerta si hi ha massa xivarri.",
          "Reproduir melodies d'èxit amb l'altaveu integrat."
        ],
        materials: ["micro:bit V2 (amb micròfon i altaveu integrats)"],
        steps: [
          {
            title: "1. Esdeveniment d'aplaudiment",
            desc: "Fes servir el bloc 'a l'escoltar un so fort': canvia l'estat d'una variable 'llum' entre encès i apagat."
          },
          {
            title: "2. Mesurador continu de decibels",
            desc: "Fes que una barra de LEDs s'ompli proporcionalment al nivell de so ambiental (0 a 255)."
          },
          {
            title: "3. Alarma acústica",
            desc: "Si el so supera el llindar 180 durant més de 3 segons, fes sonar un to greu per recordar baixar el to de veu."
          }
        ],
        teacherTip: "Els nens i nenes aprendran a autoregular el volum de treball cooperatiu mirant el semàfor."
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.ROBOTS_DATA = ROBOTS_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ROBOTS_DATA };
}
