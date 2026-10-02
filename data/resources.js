// data/resources.js - Recursos imprimibles, herramientas de aula y comparativa para centros

const CLASSROOM_RESOURCES = [
  {
    id: "tarjetas-roles-cooperativo",
    title: "Pack Imprimible: Tarjetas de Roles STEAM de Aula",
    category: "Metodología",
    format: "Ficha Imprimible A4",
    icon: "👥",
    description: "Tarjetas listas para imprimir y colgar al cuello con cordón. Definen claramente las 4 responsabilidades clave: Coordinador/a, Diseñador/a de Hardware, Programador/a y Responsable de Calidad y DUA.",
    content: {
      instructions: "Imprime en cartulina de 180g, plastifica y añade una pinza o cordón para que cada alumno luzca visiblemente su rol en cada sesión de robótica.",
      roles: [
        {
          title: "🎯 Coordinador/a & Portavoz",
          color: "#3b82f6",
          badge: "Liderazgo y Tiempos",
          duties: [
            "Comprueba los minutos que quedan para finalizar la sesión.",
            "Asegura que todos los miembros del equipo dan su opinión.",
            "Es la única persona autorizada para consultar al docente cuando el equipo agota sus opciones.",
            "Presenta el proyecto final ante la clase."
          ]
        },
        {
          title: "⚙️ Ingeniero/a de Hardware",
          color: "#059669",
          badge: "Montaje y Material",
          duties: [
            "Recoge la caja del robot al inicio y revisa el inventario al terminar.",
            "Manipula los cables, motores y sensores en la protoboard/chasis.",
            "Asegura que los cables no sufran tirones ni cortocircuitos.",
            "Verifica el nivel de batería antes de empezar las pruebas."
          ]
        },
        {
          title: "💻 Programador/a Jefe",
          color: "#7c3aed",
          badge: "Algoritmos y Código",
          duties: [
            "Maneja el ordenador o tablet con el software (MakeCode, Scratch, Arduino).",
            "Nombra y guarda las versiones del archivo del proyecto con fecha.",
            "Traduce los diagramas de flujo pensados por el equipo a bloques o texto.",
            "Comparte la pantalla con el equipo para que todos sigan la lógica."
          ]
        },
        {
          title: "🔍 Inspector/a de Calidad & DUA",
          color: "#d97706",
          badge: "Verificación y Accesibilidad",
          duties: [
            "Supervisa la hoja de ruta y la rúbrica de evaluación.",
            "Comprueba que el diseño es accesible para personas con dificultades.",
            "Anota los errores que van ocurriendo (Bitácora de fallos y soluciones).",
            "Toma las fotos o evidencias para la memoria final."
          ]
        }
      ]
    }
  },
  {
    id: "diana-autoevaluacion",
    title: "Diana STEAM de Coevaluación y Autoevaluación",
    category: "Evaluación",
    format: "Plantilla Gráfica Imprimible",
    icon: "🎯",
    description: "Instrumento visual formativo donde el alumnado puntúa del 1 al 4 su desempeño en Trabajo en equipo, Lógica de programación, Solución al reto y Cuidado del material.",
    content: {
      axes: [
        { name: "Trabajo en Equipo", min: "Descoordinados", max: "Sinergia Total" },
        { name: "Lógica y Código", min: "Copia pasiva", max: "Autonomía y Algoritmo Limpio" },
        { name: "Creatividad y Reto", min: "Mínimo exigido", max: "Innovación y Valor Añadido" },
        { name: "Respeto al Material", min: "Desordenado", max: "Impecable y Ordenado" }
      ],
      svgDiana: `<svg viewBox="0 0 360 360" class="diana-svg" xmlns="http://www.w3.org/2000/svg">
        <circle cx="180" cy="180" r="150" fill="none" stroke="#cbd5e1" stroke-width="2"/>
        <circle cx="180" cy="180" r="110" fill="none" stroke="#cbd5e1" stroke-width="2"/>
        <circle cx="180" cy="180" r="70" fill="none" stroke="#cbd5e1" stroke-width="2"/>
        <circle cx="180" cy="180" r="30" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2"/>
        <line x1="180" y1="30" x2="180" y2="330" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4"/>
        <line x1="30" y1="180" x2="330" y2="180" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4"/>
        <text x="180" y="22" fill="var(--text-main)" font-size="11" font-weight="bold" text-anchor="middle">Trabajo en Equipo (Nivel 1 a 4)</text>
        <text x="345" y="184" fill="var(--text-main)" font-size="11" font-weight="bold" text-anchor="end">Lógica y Algoritmos</text>
        <text x="180" y="348" fill="var(--text-main)" font-size="11" font-weight="bold" text-anchor="middle">Cuidado del Material</text>
        <text x="15" y="184" fill="var(--text-main)" font-size="11" font-weight="bold">Creatividad y Reto</text>
        <polygon points="180,60 270,180 180,270 90,180" fill="rgba(37, 99, 235, 0.25)" stroke="#2563eb" stroke-width="3"/>
        <circle cx="180" cy="60" r="5" fill="#2563eb"/>
        <circle cx="270" cy="180" r="5" fill="#2563eb"/>
        <circle cx="180" cy="270" r="5" fill="#2563eb"/>
        <circle cx="90" cy="180" r="5" fill="#2563eb"/>
      </svg>`
    }
  },
  {
    id: "guia-compra-centros",
    title: "Guía Comparativa de Robots para Centros Educativos (2026)",
    category: "Gestión de Centro",
    format: "Tabla Técnica y Presupuestaria",
    icon: "📊",
    description: "Análisis objetivo de las principales plataformas: coste por alumno, robustez, software libre vs propietario, y progresión por etapas educativas.",
    content: {
      platforms: [
        {
          name: "BBC micro:bit (V2)",
          age: "8 a 16 años (Primaria a Bachillerato)",
          costPerUnit: "25€ - 35€ (placa base)",
          software: "MakeCode (web/offline), Python, Scratch",
          openSource: "Sí (Hardware y Software abierto)",
          pros: "Económica, sensores integrados (micrófono, altavoz, acelerómetro, brújula, luz), conexión por radio mesh entre placas.",
          cons: "Para motores requiere una placa de expansión adicional.",
          recommendedRatio: "1 placa por cada 2 alumnos."
        },
        {
          name: "Arduino UNO / Nano",
          age: "12 a 18+ años (ESO, Bachillerato, FP)",
          costPerUnit: "15€ - 30€ (kit básico con componentes)",
          software: "Arduino IDE (C++), mBlock, Tinkercad Circuits",
          openSource: "Sí (100% abierto y estándar industrial)",
          pros: "Máxima versatilidad con componentes estándar reales. Ideal para proyectos Maker y conexión con el mundo laboral.",
          cons: "Requiere aprender electrónica básica y mayor cuidado al manipular patas de componentes.",
          recommendedRatio: "1 kit por cada 2-3 alumnos."
        },
        {
          name: "Makeblock mBot 2 (CyberPi)",
          age: "9 a 15 años (Primaria a 3º ESO)",
          costPerUnit: "120€ - 150€",
          software: "mBlock 5 (Bloques Scratch y Python)",
          openSource: "Hardware semipropietario, conectores RJ25/mBuild",
          pros: "Chasis metálico hiper-robusto de aluminio anodizado. Motores con encoder de alta precisión. Pantalla a color.",
          cons: "Coste más elevado por unidad.",
          recommendedRatio: "1 robot por cada 3 alumnos."
        },
        {
          name: "LEGO SPIKE Prime",
          age: "10 a 16 años",
          costPerUnit: "380€ - 420€",
          software: "LEGO Education App (Bloques y Python)",
          openSource: "No (Ecosistema propietario LEGO)",
          pros: "Montaje rápido sin tornillos, engranajes y piezas de construcción de máxima calidad.",
          cons: "Inversión inicial muy alta y piezas pequeñas fáciles de extraviar en el aula.",
          recommendedRatio: "1 caja por cada 3-4 alumnos."
        },
        {
          name: "Bee-Bot / Blue-Bot",
          age: "3 a 7 años (Infantil y 1º Primaria)",
          costPerUnit: "90€ - 110€",
          software: "Sin pantalla (botones físicos) / App Bluetooth (Blue-Bot)",
          openSource: "No",
          pros: "Perfecto para iniciación sin pantallas ni necesidad de leer textos. Batería recargable.",
          cons: "Rango de aplicación acotado a infantil.",
          recommendedRatio: "1 robot por cada 4-5 alumnos (rincones de aula)."
        }
      ]
    }
  }
];

if (typeof window !== 'undefined') {
  window.CLASSROOM_RESOURCES = CLASSROOM_RESOURCES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CLASSROOM_RESOURCES };
}
