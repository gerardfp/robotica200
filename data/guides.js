// data/guides.js - Guías didácticas y Situaciones de Aprendizaje STEAM para docentes

const DIDACTIC_GUIDES = [
  {
    id: "guia-smart-city",
    title: "Situación de Aprendizaje: La Ciudad Inteligente y Accesible (Smart City)",
    level: "secundaria-1",
    levelName: "Educación Secundaria Obligatoria (1º a 3º ESO)",
    duration: "6 a 8 sesiones (50 min)",
    methodology: "Aprendizaje Basado en Proyectos (ABP) + Design Thinking",
    steamFields: ["Tecnología y Digitalización", "Física", "Matemáticas", "Valores Cívicos y Éticos"],
    challenge: "¿Cómo podemos transformar nuestro barrio en un entorno más seguro, sostenible e inclusivo para personas con diversidad funcional mediante la robótica?",
    keyCompetencies: [
      { code: "CCL", name: "Competencia en Comunicación Lingüística", desc: "Defensa oral del prototipo final y redacción del cuaderno de bitácora técnico." },
      { code: "STEM", name: "Competencia Matemática, Ciencia, Tecnología e Ingeniería", desc: "Diseño de circuitos electrónicos, cálculo de resistencias, interpretación de sensores y cinemática de motores." },
      { code: "CD", name: "Competencia Digital", desc: "Programación en bloques y texto, depuración de algoritmos y uso ético de datos." },
      { code: "CPSAA", name: "Competencia Personal, Social y de Aprender a Aprender", desc: "Gestión del trabajo cooperativo mediante roles rotativos y autorregulación del aprendizaje." },
      { code: "CE", name: "Competencia Emprendedora", desc: "Resolución creativa de problemas urbanos reales y prototipado rápido." }
    ],
    roles: [
      { role: "Coordinador/a y Portavoz", desc: "Verifica que el equipo sigue los tiempos, modera los debates y presenta los avances al gran grupo." },
      { role: "Ingeniero/a de Hardware y Montaje", desc: "Custodia la caja de componentes, supervisa el cableado correcto y cuida el material físico." },
      { role: "Desarrollador/a de Software", desc: "Lidera la lógica de programación en el ordenador/tablet y documenta las variables y funciones." },
      { role: "Responsable de Calidad y DUA", desc: "Comprueba que el diseño cumple los criterios de accesibilidad, testea casos extremos y redacta la memoria." }
    ],
    sessions: [
      {
        num: 1,
        title: "Fase 1: Empatía y Detección de Barreras Urbanas",
        duration: "50 min",
        activities: "Recorrido o análisis fotográfico del entorno escolar. Identificación de cruces peligrosos, falta de avisos sonoros o farolas encendidas innecesariamente. Formación de equipos de 4 y asignación de roles.",
        deliverable: "Mapa de empatía y definición del reto de cada equipo."
      },
      {
        num: 2,
        title: "Fase 2: Ideación y Bocetado del Prototipo",
        duration: "50 min",
        activities: "Lluvia de ideas mediante SCAMPER. Elección de la tecnología: Arduino (semáforos accesibles / barrera de parking) o micro:bit (farolas automáticas por LDR). Bocetado del esquema en papel o Tinkercad.",
        deliverable: "Croquis de conexión electrónica y lista de materiales verificada."
      },
      {
        num: 3,
        title: "Fase 3: Montaje Electrónico y Primeros Algoritmos",
        duration: "50 min",
        activities: "Conexión en protoboard de actuadores (LEDs, servomotores, buzzers) y sensores (LDR, ultrasonidos). Pruebas unitarias de cada componente antes de integrarlos.",
        deliverable: "Test unitario de funcionamiento (LED enciende y sensor reporta valores por consola serial)."
      },
      {
        num: 4,
        title: "Fase 4: Programación de la Lógica Integrada",
        duration: "50 min",
        activities: "Estructuración de condicionales complejos y bucles de control. Implementación del protocolo accesible (ej. aviso sonoro para personas ciegas). Depuración en vivo (debugging).",
        deliverable: "Código funcional comentado y subido al repositorio del aula."
      },
      {
        num: 5,
        title: "Fase 5: Fabricación del Entorno Maqueta (Cartón / Impresión 3D)",
        duration: "50 min",
        activities: "Integración del circuito dentro de la maqueta de la calle/edificio utilizando materiales reciclados (cartón, bricks) o piezas 3D. Pruebas de resistencia y ordenación del cableado.",
        deliverable: "Maqueta física terminada y operativa."
      },
      {
        num: 6,
        title: "Fase 6: Feria STEAM y Evaluación Colectiva",
        duration: "50 min",
        activities: "Exposición en formato 'Elevator Pitch' de 3 minutos por equipo ante el resto del grupo o familias. Demostración en vivo y coevaluación mediante diana de rúbrica.",
        deliverable: "Presentación final y rúbrica completada."
      }
    ],
    duaMeasures: [
      { principle: "Múltiples formas de representación", measure: "Uso de esquemas interactivos a color, código en bloques visuales y videotutoriales con subtítulos para el montaje." },
      { principle: "Múltiples formas de acción y expresión", measure: "El alumnado puede entregar el informe técnico en formato vídeo explicativo, podcast, póster infográfico o memoria escrita clásica." },
      { principle: "Múltiples formas de implicación", measure: "Elección libre del problema urbano a resolver dentro de los intereses del equipo (seguridad, ocio inclusivo, sostenibilidad)." }
    ],
    rubric: {
      criteria: [
        {
          name: "1. Funcionamiento del Algoritmo y Robótica",
          weight: "35%",
          levels: {
            insufficient: "El circuito o programa no responde a los sensores, presenta bloqueos frecuentes y no cumple la función mínima.",
            basic: "Funciona de manera intermitente o requiere intervención manual. El código carece de estructura limpia.",
            good: "El prototipo responde de forma estable a los estímulos. La lógica condicional está bien planteada y comentada.",
            excellent: "Funcionamiento impecable y robusto. Incluye gestión de casos límite, temporización eficiente y código modular optimizado."
          }
        },
        {
          name: "2. Impacto Social y Criterio de Accesibilidad",
          weight: "25%",
          levels: {
            insufficient: "No se ha considerado la inclusión ni la accesibilidad en la propuesta.",
            basic: "Menciona aspectos de accesibilidad de forma superficial sin integrarlos realmente en el prototipo.",
            good: "El diseño incorpora soluciones reales para personas con diversidad (señales lumínicas y acústicas sincronizadas).",
            excellent: "Diseño universal sobresaliente, empático y documentado con pruebas de usuario reales o simuladas."
          }
        },
        {
          name: "3. Trabajo Cooperativo y Gestión de Roles",
          weight: "20%",
          levels: {
            insufficient: "Conflictos no resueltos en el grupo; uno o dos miembros asumen toda la carga mientras otros quedan al margen.",
            basic: "Los roles se asignaron pero no se respetaron plenamente durante las sesiones prácticas.",
            good: "Distribución equilibrada del trabajo. Los miembros conocen su cometido y colaboran con fluidez.",
            excellent: "Sinergia ejemplar, apoyo mutuo, resolución autónoma de discrepancias y rotación constructiva."
          }
        },
        {
          name: "4. Comunicación y Divulgación del Proyecto",
          weight: "20%",
          levels: {
            insufficient: "Exposición confusa, sin rigor técnico y sin apoyo visual.",
            basic: "Presentación aceptable pero con dificultades para justificar decisiones técnicas ante preguntas.",
            good: "Presentación clara, fluida y con vocabulario tecnológico adecuado. Demostración práctica efectiva.",
            excellent: "Comunicación persuasiva, entusiasta y rigurosa. Excelente capacidad de síntesis y respuesta a dudas complejas."
          }
        }
      ]
    }
  },
  {
    id: "guia-huerto-automatizado",
    title: "Situación de Aprendizaje: El Huerto Escolar Biotecnológico",
    level: "primaria-sup",
    levelName: "Educación Primaria (5º - 6º curso)",
    duration: "5 sesiones (50 min)",
    methodology: "Aprendizaje Basado en la Indagación + ABP",
    steamFields: ["Ciencias de la Naturaleza", "Tecnología", "Matemáticas"],
    challenge: "¿Cómo podemos asegurar el riego y cuidado óptimo de nuestras plantas del colegio incluso durante los fines de semana o vacaciones?",
    keyCompetencies: [
      { code: "STEM", name: "Competencia STEM", desc: "Recogida de datos cuantitativos de humedad y temperatura, gráficas matemáticas y ciclos biológicos de las plantas." },
      { code: "CD", name: "Competencia Digital", desc: "Programación con micro:bit y calibración de umbrales en MakeCode." },
      { code: "CPSAA", name: "Aprender a Aprender", desc: "Método científico: formulación de hipótesis, ensayo-error y ajuste empírico." }
    ],
    roles: [
      { role: "Científico/a Biólogo", desc: "Investiga las necesidades hídricas de la especie vegetal y calcula los litros/semana necesarios." },
      { role: "Técnico/a de Sensores", desc: "Realiza las lecturas en tierra húmeda y seca y determina la media matemática para el código." },
      { role: "Programador/a MakeCode", desc: "Implementa los bucles de alerta y la activación de una mini-bomba de 5V o servoválvula." },
      { role: "Diseñador/a de Riego", desc: "Canaliza las tuberías de silicona o goteros caseros asegurando que no haya fugas hacia la electrónica." }
    ],
    sessions: [
      {
        num: 1,
        title: "Sesión 1: Las plantas y el agua como recurso escaso",
        duration: "50 min",
        activities: "Debate sobre el consumo hídrico y sequía. Exploración de las plantas del centro. Planteamiento del reto de riego autónomo con micro:bit.",
        deliverable: "Ficha botánica con requerimientos de la planta elegida."
      },
      {
        num: 2,
        title: "Sesión 2: Laboratorio de Sensores y Calibración",
        duration: "50 min",
        activities: "Conexión de la micro:bit a la tierra. Medición de datos analógicos: lectura en seco, lectura en húmedo. Creación de una escala en el cuaderno.",
        deliverable: "Tabla de datos experimentales y umbral de activación acordado."
      },
      {
        num: 3,
        title: "Sesión 3: Programación del Algoritmo de Decisión",
        duration: "50 min",
        activities: "Programación en bloques MakeCode del bloque `si humedad < umbral entonces avisar`. Introducción de icono luminoso en matriz 5x5 y zumbido.",
        deliverable: "Simulación exitosa en pantalla y descarga al hardware."
      },
      {
        num: 4,
        title: "Sesión 4: Montaje del Servomotor o Mini-Bomba",
        duration: "50 min",
        activities: "Conexión de un actuador mecánico que abra una compuerta por gravedad o active una bomba de baja tensión protegida por relé/transistor.",
        deliverable: "Circuito de riego completo probado sin tierra."
      },
      {
        num: 5,
        title: "Sesión 5: Instalación en el Huerto y Conclusiones",
        duration: "50 min",
        activities: "Instalación en la jardinera real. Comprobación del ciclo continuo. Rúbrica de autoevaluación por diana.",
        deliverable: "Huerto operativo y conclusiones científicas por equipo."
      }
    ],
    duaMeasures: [
      { principle: "Múltiples formas de representación", measure: "Diagramas de flujo con códigos de colores universales y apoyo visual con objetos tangibles." },
      { principle: "Múltiples formas de implicación", measure: "Gamificación con 'Misiones de supervivencia vegetal' para mantener la motivación constante." }
    ],
    rubric: {
      criteria: [
        {
          name: "1. Rigor Científico y Calibración",
          weight: "30%",
          levels: {
            insufficient: "No se tomaron datos previos; el valor umbral fue colocado al azar sin probar la tierra.",
            basic: "Se tomaron datos pero hubo errores al calcular la media de activación.",
            good: "Calibración experimental correcta respaldada por mediciones reales en seco y mojado.",
            excellent: "Registro minucioso con gráficas comparativas y justificación biológica según la planta."
          }
        },
        {
          name: "2. Eficacia del Sistema Robótico",
          weight: "40%",
          levels: {
            insufficient: "El sistema no detecta el nivel de humedad ni reacciona.",
            basic: "Detecta la humedad pero la alerta o el riego fallan con frecuencia.",
            good: "El sistema riega o alerta de forma fiable cuando la humedad desciende del umbral.",
            excellent: "Sistema totalmente autónomo, seguro contra salpicaduras y energéticamente eficiente."
          }
        },
        {
          name: "3. Cooperación y Cuidado del Material",
          weight: "30%",
          levels: {
            insufficient: "Material maltratado o desorganizado. Reparto desigual.",
            basic: "Manejo adecuado con algunos recordatorios del docente.",
            good: "Excelente cuidado de placas y sensores. Roles respetados.",
            excellent: "Autonomía sobresaliente, orden impecable y apoyo activo entre compañeros."
          }
        }
      ]
    }
  },
  {
    id: "guia-cuentacuentos-infantil",
    title: "Situación de Aprendizaje: La Odisea del Espacio con Bee-Bot",
    level: "infantil",
    levelName: "Educación Infantil (4-5 años) y 1º Primaria",
    duration: "4 sesiones (40 min)",
    methodology: "Aprendizaje Lúdico / Gamificación Desconectada",
    steamFields: ["Lengua", "Educación Plástica", "Matemáticas (Orientación Espacial)"],
    challenge: "¿Podemos ayudar a nuestra pequeña nave astronauta a visitar los planetas sin caer en los agujeros negros ni chocar con asteroides?",
    keyCompetencies: [
      { code: "CCL", name: "Comunicación Lingüística", desc: "Narrativa compartida, expresión oral de trayectorias y vocabulario espacial." },
      { code: "STEM", name: "Pensamiento Espacial y Lógico", desc: "Lateralidad (izquierda/derecha), ordenación secuencial y causa-efecto." },
      { code: "CPSAA", name: "Social y Aprendizaje", desc: "Tolerancia a la frustración cuando la nave se desvía y corrección positiva del error." }
    ],
    roles: [
      { role: "El/La Astrónomo/a (Cartógrafo)", desc: "Elige el planeta destino y coloca las tarjetas de flechas en el orden correcto sobre la mesa." },
      { role: "El/La Piloto (Programador)", desc: "Pulsa con su dedo las teclas del lomo de la abeja exactamente en el orden marcado." },
      { role: "El/La Controlador/a de Misión (Verificador)", desc: "Comprueba que se pulsó la tecla 'X' de borrado y canta la cuenta atrás del despegue." }
    ],
    sessions: [
      {
        num: 1,
        title: "Sesión 1: Mi cuerpo es un robot",
        duration: "40 min",
        activities: "Juego motriz en el suelo: los niños guían a un compañero con los ojos cerrados dándole toques en el hombro (avanzar, girar). Introducción a la idea de instrucción.",
        deliverable: "Comprensión kinestésica del algoritmo de pasos."
      },
      {
        num: 2,
        title: "Sesión 2: Creación del Tapete Galáctico",
        duration: "40 min",
        activities: "Pintura y recorte de planetas, cometas y satélites para introducirlos en las fundas transparentes del tapete de cuadrícula de 15x15 cm.",
        deliverable: "Tapete de retos listo para jugar."
      },
      {
        num: 3,
        title: "Sesión 3: Misiones de exploración guiada",
        duration: "40 min",
        activities: "Tarjetas de misión: 'La nave debe ir de la Tierra a Marte'. Los niños secuencian las cartas físicas y luego programan el robot.",
        deliverable: "Misiones 1 y 2 superadas por todos los equipos."
      },
      {
        num: 4,
        title: "Sesión 4: El laberinto del asteroide (Desbugueo)",
        duration: "40 min",
        activities: "Se introduce un obstáculo imprevisto en la casilla intermedia. Los niños aprenden a buscar caminos alternativos y depurar su código.",
        deliverable: "Resolución del laberinto y diploma de Pequeño Programador Espacial."
      }
    ],
    duaMeasures: [
      { principle: "Múltiples formas de representación", measure: "Flechas con relieve táctil y colores contrastados (Verde=Adelante, Azul=Giro)." },
      { principle: "Múltiples formas de implicación", measure: "Uso de muñecos astronautas y canciones de cuenta atrás para motivar." }
    ],
    rubric: {
      criteria: [
        {
          name: "1. Comprensión de la Secuencia Temporal",
          weight: "40%",
          levels: {
            insufficient: "Pulsa teclas sin orden ni relación con el destino.",
            basic: "Reconoce avanzar pero se confunde sistemáticamente con los giros.",
            good: "Coloca las tarjetas en orden correcto y programa con éxito trayectorias de 3-4 pasos.",
            excellent: "Planifica trayectorias largas y complejas, anticipando los giros y resolviendo desvíos con autonomía."
          }
        },
        {
          name: "2. Actitud frente al Error ('Desbuguear')",
          weight: "30%",
          levels: {
            insufficient: "Se enfada o abandona cuando la abeja no llega a la casilla deseada.",
            basic: "Acepta el error pero necesita que el adulto le diga exactamente qué tecla falló.",
            good: "Revisa las tarjetas junto a sus compañeros para encontrar el paso equivocado.",
            excellent: "Ve el error como un enigma divertido ('¡Oh, hay un bug en el asteroide!'), localiza la orden errónea y la corrige."
          }
        },
        {
          name: "3. Turnos y Convivencia en Equipo",
          weight: "30%",
          levels: {
            insufficient: "Acapara el robot y no permite participar a los demás.",
            basic: "Espera su turno tras insistencia docente.",
            good: "Respeta los roles y anima a su compañero cuando programa.",
            excellent: "Ayuda a sus compañeros con paciencia y comparte las tareas con generosidad."
          }
        }
      ]
    }
  }
];

if (typeof window !== 'undefined') {
  window.DIDACTIC_GUIDES = DIDACTIC_GUIDES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DIDACTIC_GUIDES };
}
