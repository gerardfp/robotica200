// data/tutorials.js - Banco de tutoriales paso a paso de robótica educativa para docentes

const TUTORIALS = [
  {
    id: "microbit-estacion-clima",
    title: "Estación Agro-Climática con Alerta de Sequía",
    subtitle: "Monitoriza temperatura, luz y humedad con micro:bit y aviso sonoro/lumínico",
    platform: "microbit",
    platformName: "BBC micro:bit (V1/V2)",
    level: "primaria-sup",
    levelName: "5º - 6º Primaria y 1º-2º ESO (10-14 años)",
    duration: "3 sesiones (50 min c/u)",
    difficulty: "Iniciación - Intermedia",
    subjects: ["Tecnología", "Ciencias Naturales", "Matemáticas"],
    steamTags: ["Sostenibilidad", "Sensores", "Condicionales", "Variables"],
    summary: "El alumnado construye una estación que mide los factores de un cultivo escolar (luz con el sensor integrado y humedad de suelo con clavos o sonda resistiva). Si la humedad baja de un umbral, suena una alarma y muestra un icono de auxilio.",
    learningGoals: [
      "Comprender la diferencia entre señales analógicas (rango continuo) y digitales.",
      "Aprender a declarar y actualizar variables en entornos de bloques MakeCode.",
      "Usar estructuras condicionales lógicas compuestas (SI ... Y ... ENTONCES).",
      "Conectar y calibrar un sensor de humedad casero o comercial a los pines P0 y GND."
    ],
    materials: [
      "1 placa BBC micro:bit V2 (o V1)",
      "1 cable micro-USB y portapilas (2x AAA)",
      "3 cables con pinzas de cocodrilo",
      "1 sensor de humedad de suelo (o 2 clavos galvanizados)",
      "1 maceta con tierra seca y otra con tierra húmeda para calibración",
      "Zumbador integrado (V2) o mini-altavoz piezoceléctrico (V1)"
    ],
    schematic: {
      description: "Conexión de los pines de la micro:bit con el sensor y la alimentación.",
      connections: [
        { from: "Pin P0 (micro:bit)", to: "Clavo 1 o Pin de Señal (Sensor Humedad)", color: "amarillo", note: "Lectura analógica pin 0 a 1023" },
        { from: "Pin 3V (micro:bit)", to: "VCC sensor (o Clavo 2 a través de resistencia)", color: "rojo", note: "Alimentación 3.3V segura" },
        { from: "Pin GND (micro:bit)", to: "GND sensor", color: "negro", note: "Tierra común de referencia" }
      ],
      diagramSvg: `<svg viewBox="0 0 600 320" class="schematic-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="320" fill="var(--bg-card-subtle)" rx="12"/>
        <rect x="50" y="40" width="220" height="240" rx="20" fill="#1e293b" stroke="#3b82f6" stroke-width="3"/>
        <text x="160" y="75" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">BBC micro:bit V2</text>
        <g transform="translate(115, 95)">
          <circle cx="10" cy="10" r="4" fill="#ef4444"/> <circle cx="30" cy="10" r="4" fill="#ef4444"/> <circle cx="50" cy="10" r="4" fill="#ef4444"/> <circle cx="70" cy="10" r="4" fill="#ef4444"/> <circle cx="90" cy="10" r="4" fill="#ef4444"/>
          <circle cx="10" cy="30" r="4" fill="#ef4444"/> <circle cx="30" cy="30" r="4" fill="#334155"/> <circle cx="50" cy="30" r="4" fill="#ef4444"/> <circle cx="70" cy="30" r="4" fill="#334155"/> <circle cx="90" cy="30" r="4" fill="#ef4444"/>
          <circle cx="10" cy="50" r="4" fill="#ef4444"/> <circle cx="30" cy="50" r="4" fill="#ef4444"/> <circle cx="50" cy="50" r="4" fill="#ef4444"/> <circle cx="70" cy="50" r="4" fill="#ef4444"/> <circle cx="90" cy="50" r="4" fill="#ef4444"/>
          <circle cx="10" cy="70" r="4" fill="#ef4444"/> <circle cx="30" cy="70" r="4" fill="#334155"/> <circle cx="50" cy="70" r="4" fill="#334155"/> <circle cx="70" cy="70" r="4" fill="#334155"/> <circle cx="90" cy="70" r="4" fill="#ef4444"/>
          <circle cx="10" cy="90" r="4" fill="#ef4444"/> <circle cx="30" cy="90" r="4" fill="#ef4444"/> <circle cx="50" cy="90" r="4" fill="#ef4444"/> <circle cx="70" cy="90" r="4" fill="#ef4444"/> <circle cx="90" cy="90" r="4" fill="#ef4444"/>
        </g>
        <rect x="70" y="240" width="26" height="35" fill="#eab308" rx="4"/>
        <text x="83" y="265" fill="#000" font-size="11" font-weight="bold" text-anchor="middle">0</text>
        <rect x="110" y="240" width="26" height="35" fill="#eab308" rx="4"/>
        <text x="123" y="265" fill="#000" font-size="11" font-weight="bold" text-anchor="middle">1</text>
        <rect x="150" y="240" width="26" height="35" fill="#eab308" rx="4"/>
        <text x="163" y="265" fill="#000" font-size="11" font-weight="bold" text-anchor="middle">2</text>
        <rect x="190" y="240" width="26" height="35" fill="#eab308" rx="4"/>
        <text x="203" y="265" fill="#000" font-size="10" font-weight="bold" text-anchor="middle">3V</text>
        <rect x="230" y="240" width="26" height="35" fill="#eab308" rx="4"/>
        <text x="243" y="265" fill="#000" font-size="9" font-weight="bold" text-anchor="middle">GND</text>
        <rect x="420" y="90" width="130" height="150" rx="10" fill="#0f766e" stroke="#14b8a6" stroke-width="2"/>
        <text x="485" y="120" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Sensor Humedad</text>
        <rect x="445" y="170" width="20" height="70" fill="#94a3b8"/>
        <rect x="505" y="170" width="20" height="70" fill="#94a3b8"/>
        <circle cx="440" cy="140" r="5" fill="#eab308"/>
        <text x="430" y="130" fill="#cbd5e1" font-size="9">SIG</text>
        <circle cx="485" cy="140" r="5" fill="#ef4444"/>
        <text x="480" y="130" fill="#cbd5e1" font-size="9">VCC</text>
        <circle cx="530" cy="140" r="5" fill="#000"/>
        <text x="525" y="130" fill="#cbd5e1" font-size="9">GND</text>
        <path d="M 83 275 C 83 310, 440 220, 440 145" fill="none" stroke="#eab308" stroke-width="3" stroke-dasharray="4"/>
        <path d="M 203 275 C 203 315, 485 200, 485 145" fill="none" stroke="#ef4444" stroke-width="3"/>
        <path d="M 243 275 C 243 320, 530 200, 530 145" fill="none" stroke="#334155" stroke-width="3"/>
        <text x="310" y="295" fill="var(--text-muted)" font-size="11" font-style="italic">Cables cocodrilo codificados por color</text>
      </svg>`
    },
    codeBlocks: {
      makeCodeDescription: "Algoritmo en MakeCode con bloques clasificados por color institucional:",
      blocksHtml: `
        <div class="code-block-visual">
          <div class="block-unit block-basic">
            <span class="block-title">al iniciar</span>
            <div class="block-inner">
              <div class="block-unit block-variables">
                fijar <span class="badge-var">umbral_sequia</span> a <span class="badge-num">350</span>
              </div>
              <div class="block-unit block-basic">
                mostrar icono <span class="badge-icon">Cara Feliz 😊</span>
              </div>
            </div>
          </div>
          <div class="block-unit block-basic">
            <span class="block-title">para siempre</span>
            <div class="block-inner">
              <div class="block-unit block-variables">
                fijar <span class="badge-var">humedad_actual</span> a <span class="badge-pins">lectura analógica pin P0</span>
              </div>
              <div class="block-unit block-logic">
                <span class="block-title">si <span class="badge-logic">&lt;</span> <span class="badge-var">humedad_actual</span> &lt; <span class="badge-var">umbral_sequia</span> <span class="badge-logic">&gt;</span> entonces</span>
                <div class="block-inner">
                  <div class="block-unit block-basic">mostrar icono <span class="badge-icon">Calavera ⚠️</span></div>
                  <div class="block-unit block-music">reproducir sonido <span class="badge-sound">Sirena / Tono C5</span></div>
                  <div class="block-unit block-basic">pausa (ms) <span class="badge-num">500</span></div>
                </div>
                <span class="block-title">si no</span>
                <div class="block-inner">
                  <div class="block-unit block-basic">mostrar icono <span class="badge-icon">Planta Sana 🌿</span></div>
                </div>
              </div>
              <div class="block-unit block-basic">pausa (ms) <span class="badge-num">2000</span></div>
            </div>
          </div>
        </div>
      `,
      pythonCode: `# Solución equivalente en MicroPython para micro:bit
from microbit import *
import music

umbral_sequia = 350
display.show(Image.HAPPY)
sleep(1000)

while True:
    # Lectura del pin 0 (valores de 0 a 1023)
    humedad = pin0.read_analog()
    
    if humedad < umbral_sequia:
        # Alerta: tierra seca
        display.show(Image.SKULL)
        music.pitch(523, 200) # C5
        sleep(300)
    else:
        # Estado óptimo
        display.show(Image.YES)
    
    sleep(2000) # Muestreo cada 2 segundos`
    },
    teacherTips: [
      {
        title: "Calibración en el aula (Error común del alumnado)",
        tip: "Los valores analógicos varían según los minerales del agua y el tipo de sustrato. Dedica 10 minutos a que cada equipo anote el valor en tierra seca (ej. 150-200) y en tierra empapada (ej. 700-800). El umbral óptimo debe ser la media aritmética calculada por ellos."
      },
      {
        title: "Atención a la Diversidad (DUA)",
        tip: "Para alumnado con dificultades motrices, utiliza adaptadores tipo 'Edge Connector Breakout Board' con terminales de tornillo para no depender de la fuerza de pinzas de cocodrilo."
      },
      {
        title: "Pregunta socrática de extensión",
        tip: "¿Por qué no dejamos la corriente pasando por los clavos las 24 horas del día? (Provoca electrólisis y corrosión prematura del metal. Reto pro: encender el pin 3V solo un milisegundo antes de leer y apagarlo inmediatamente)."
      }
    ]
  },
  {
    id: "arduino-semaforo-inclusivo",
    title: "Semáforo Inclusivo con Pulsador Accesible y Acústico",
    subtitle: "Diseño de un paso de peatones seguro para personas con baja visión o movilidad reducida",
    platform: "arduino",
    platformName: "Arduino UNO / Nano",
    level: "secundaria-1",
    levelName: "2º - 4º ESO y Formación Profesional Básica (13-17 años)",
    duration: "4 sesiones (50 min c/u)",
    difficulty: "Intermedia",
    subjects: ["Tecnología y Digitalización", "Educación en Valores / Ciudadanía", "Física"],
    steamTags: ["Inclusión", "Electrónica", "Pines Digitales", "Pull-Down", "C++"],
    summary: "El alumnado diseña y programa el ciclo completo de un cruce con semáforo para vehículos (Verde, Ámbar, Rojo) y semáforo peatonal con botón de demanda. Incluye aviso sonoro de pulsos intermitentes para peatones con ceguera o baja visión.",
    learningGoals: [
      "Distinguir el ánodo y cátodo de los diodos LED y calcular su resistencia limitadora (Ley de Ohm).",
      "Entender el funcionamiento de un pulsador con resistencia de polarización (Pull-Down / Pull-Up).",
      "Estructurar un programa en Arduino con `setup()` y `loop()` controlando secuencias temporizadas.",
      "Desarrollar empatía y diseño universal orientado a la accesibilidad urbana."
    ],
    materials: [
      "1 placa Arduino UNO (o compatible) y cable USB",
      "1 placa de prototipado (Breadboard) de 400 puntos",
      "5 diodos LED (2 rojos, 1 ámbar, 2 verdes de 5mm)",
      "5 resistencias de 220 Ω (para los LEDs)",
      "1 resistencia de 10 kΩ (para resistencia pull-down)",
      "1 pulsador táctil de 4 patas",
      "1 zumbador pasivo (Buzzer)",
      "Cables jumper macho-macho"
    ],
    schematic: {
      description: "Esquema de cableado en protoboard con Arduino UNO.",
      connections: [
        { from: "Pin D12", to: "LED Rojo Vehículos (+ Resistencia 220Ω a GND)", color: "rojo", note: "Salida digital HIGH/LOW" },
        { from: "Pin D11", to: "LED Ámbar Vehículos (+ Resistencia 220Ω a GND)", color: "amarillo", note: "Salida digital" },
        { from: "Pin D10", to: "LED Verde Vehículos (+ Resistencia 220Ω a GND)", color: "verde", note: "Salida digital" },
        { from: "Pin D9", to: "LED Rojo Peatones (+ Resistencia 220Ω a GND)", color: "rojo", note: "Salida digital" },
        { from: "Pin D8", to: "LED Verde Peatones (+ Resistencia 220Ω a GND)", color: "verde", note: "Salida digital" },
        { from: "Pin D3", to: "Zumbador piezoeléctrico (+) pin PWM", color: "azul", note: "Tono acústico intermitente" },
        { from: "Pin D2", to: "Pulsador de peatón (con resistencia 10k a GND)", color: "blanco", note: "Entrada digital con pulldown" }
      ],
      diagramSvg: `<svg viewBox="0 0 600 320" class="schematic-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="320" fill="var(--bg-card-subtle)" rx="12"/>
        <rect x="30" y="50" width="220" height="230" rx="10" fill="#008184" stroke="#005d5f" stroke-width="3"/>
        <text x="140" y="80" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Arduino UNO R3</text>
        <rect x="45" y="60" width="40" height="30" fill="#94a3b8" rx="3"/>
        <rect x="40" y="110" width="200" height="20" fill="#1e293b"/>
        <text x="140" y="125" fill="#f8fafc" font-size="9" text-anchor="middle">DIGITAL (PWM ~): 13 12 11 10 9 8 7 6 5 4 3 2</text>
        <rect x="290" y="50" width="280" height="230" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <text x="430" y="75" fill="#475569" font-size="12" font-weight="bold" text-anchor="middle">Protoboard / Semáforos</text>
        <circle cx="340" cy="110" r="10" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
        <circle cx="340" cy="140" r="10" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
        <circle cx="340" cy="170" r="10" fill="#10b981" stroke="#047857" stroke-width="2"/>
        <text x="340" y="195" fill="#475569" font-size="9" text-anchor="middle">Coches</text>
        <circle cx="410" cy="110" r="10" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
        <circle cx="410" cy="150" r="10" fill="#10b981" stroke="#047857" stroke-width="2"/>
        <text x="410" y="175" fill="#475569" font-size="9" text-anchor="middle">Peatón</text>
        <rect x="470" y="105" width="24" height="24" rx="4" fill="#3b82f6"/>
        <circle cx="482" cy="117" r="6" fill="#1d4ed8"/>
        <text x="482" y="145" fill="#475569" font-size="9" text-anchor="middle">Botón</text>
        <circle cx="530" cy="117" r="14" fill="#1e293b"/>
        <text x="530" y="145" fill="#475569" font-size="9" text-anchor="middle">Buzzer</text>
        <path d="M 120 110 C 120 20, 340 30, 340 100" fill="none" stroke="#ef4444" stroke-width="2"/>
        <path d="M 135 110 C 135 25, 340 50, 340 130" fill="none" stroke="#f59e0b" stroke-width="2"/>
        <path d="M 150 110 C 150 35, 340 80, 340 160" fill="none" stroke="#10b981" stroke-width="2"/>
        <path d="M 210 110 C 210 20, 482 40, 482 105" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="3"/>
      </svg>`
    },
    codeBlocks: {
      makeCodeDescription: "Código estructurado en C++ (Arduino IDE) con temporización clara:",
      blocksHtml: `
        <div class="code-block-visual">
          <div class="block-unit block-flow">
            <span class="block-title">Estructura del Algoritmo de Tráfico</span>
            <div class="block-inner">
              <div class="block-step">1. <strong>Estado Base:</strong> Verde coches activado, Rojo peatón activado.</div>
              <div class="block-step">2. <strong>Evento:</strong> El peatón pulsa el botón en pin 2.</div>
              <div class="block-step">3. <strong>Transición Segura:</strong> Coche pasa de Verde a Ámbar (2s) y luego a Rojo (1s margen).</div>
              <div class="block-step">4. <strong>Fase Peatonal:</strong> Verde peatón + Pitido acústico rítmico (tono 800Hz cada 400ms).</div>
              <div class="block-step">5. <strong>Aviso Fin:</strong> Verde peatón parpadea con pitidos rápidos (cada 150ms).</div>
              <div class="block-step">6. <strong>Retorno:</strong> Rojo peatón y verde coches de nuevo.</div>
            </div>
          </div>
        </div>
      `,
      pythonCode: `/* 
   PROYECTO: Semáforo Inclusivo para Peatones
   NIVEL: 2º-3º ESO STEAM
   Docente: Guía y Solución oficial
*/

const int PIN_ROJO_COCHE = 12;
const int PIN_AMBAR_COCHE = 11;
const int PIN_VERDE_COCHE = 10;

const int PIN_ROJO_PEATON = 9;
const int PIN_VERDE_PEATON = 8;
const int PIN_BUZZER = 3;
const int PIN_BOTON = 2;

void setup() {
  pinMode(PIN_ROJO_COCHE, OUTPUT);
  pinMode(PIN_AMBAR_COCHE, OUTPUT);
  pinMode(PIN_VERDE_COCHE, OUTPUT);
  
  pinMode(PIN_ROJO_PEATON, OUTPUT);
  pinMode(PIN_VERDE_PEATON, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);
  
  pinMode(PIN_BOTON, INPUT); // Requiere resistencia pull-down externa
  
  // Estado inicial por defecto: Coches circulan
  digitalWrite(PIN_VERDE_COCHE, HIGH);
  digitalWrite(PIN_ROJO_PEATON, HIGH);
}

void loop() {
  int botonPresionado = digitalRead(PIN_BOTON);
  
  if (botonPresionado == HIGH) {
    ejecutarSecuenciaCruce();
  }
}

void ejecutarSecuenciaCruce() {
  delay(1000); // Pequeña espera para no cambiar bruscamente
  
  // 1. Ámbar a los coches
  digitalWrite(PIN_VERDE_COCHE, LOW);
  digitalWrite(PIN_AMBAR_COCHE, HIGH);
  delay(2500);
  
  // 2. Rojo a los coches
  digitalWrite(PIN_AMBAR_COCHE, LOW);
  digitalWrite(PIN_ROJO_COCHE, HIGH);
  delay(1000); // Margen de seguridad de cruce vacío
  
  // 3. Verde para peatones con sonido accesible
  digitalWrite(PIN_ROJO_PEATON, LOW);
  digitalWrite(PIN_VERDE_PEATON, HIGH);
  
  // Tono rítmico lento (paso seguro)
  for (int i = 0; i < 8; i++) {
    tone(PIN_BUZZER, 800, 150);
    delay(500);
  }
  
  // Tono rápido y parpadeo (aviso de fin de paso)
  for (int i = 0; i < 5; i++) {
    digitalWrite(PIN_VERDE_PEATON, LOW);
    delay(150);
    digitalWrite(PIN_VERDE_PEATON, HIGH);
    tone(PIN_BUZZER, 1200, 80);
    delay(150);
  }
  
  // 4. Vuelta a la normalidad
  digitalWrite(PIN_VERDE_PEATON, LOW);
  digitalWrite(PIN_ROJO_PEATON, HIGH);
  noTone(PIN_BUZZER);
  delay(1500);
  
  digitalWrite(PIN_ROJO_COCHE, LOW);
  digitalWrite(PIN_VERDE_COCHE, HIGH);
}`
    },
    teacherTips: [
      {
        title: "Problema frecuente de los alumnos: Ruido flotante en el pulsador",
        tip: "Si no colocan la resistencia de 10kΩ a masa (pull-down), el pin D2 'flota' en la nada y captará ondas electromagnéticas ambientales, activando el semáforo sin tocarlo. Enseña a tus alumnos a comprobar con un multímetro el voltaje antes y después de pulsar."
      },
      {
        title: "Diferenciación didáctica",
        tip: "Para grupos más avanzados, propón sustituir los `delay()` por control de tiempos con `millis()`, de modo que el botón responda instantáneamente y no bloquee el microprocesador."
      }
    ]
  },
  {
    id: "mbot-seguidor-lineas",
    title: "Robot Seguidor de Línea y Evasión con mBot",
    subtitle: "Algoritmos de visión por infrarrojos y ultrasonidos para vehículos autónomos",
    platform: "mbot",
    platformName: "Makeblock mBot / mBot 2",
    level: "primaria-sup",
    levelName: "5º Primaria a 3º ESO (10-15 años)",
    duration: "4 sesiones (50 min c/u)",
    difficulty: "Iniciación",
    subjects: ["Tecnología", "Matemáticas", "Física (Cinemática)"],
    steamTags: ["Robótica Móvil", "Infrarrojos", "Ultrasonidos", "Bucles"],
    summary: "Los estudiantes programan un robot móvil de dos ruedas motrices para que complete un circuito cerrado siguiendo una cinta negra en el suelo, y se detenga automáticamente si detecta un obstáculo a menos de 15 cm.",
    learningGoals: [
      "Comprender la reflexión de la luz infrarroja sobre superficies negras (absorción) y blancas (reflexión).",
      "Controlar la velocidad diferencial de dos motores de corriente continua para realizar giros.",
      "Crear una máquina de estados con 4 combinaciones posibles de sensores de línea (00, 01, 10, 11).",
      "Implementar un protocolo de seguridad mediante sensor de distancia por ultrasonidos."
    ],
    materials: [
      "1 kit mBot o mBot2 con batería cargada",
      "Sensor seguidor de línea de doble canal (IR)",
      "Sensor de distancia ultrasónico",
      "Pista de pruebas impresa o cinta aislante negra mate de 1.9 cm sobre cartulina blanca",
      "Software mBlock 5 (PC, tablet o web)"
    ],
    schematic: {
      description: "Conexión de sensores RJ25 en la placa mCore/CyberPi de Makeblock.",
      connections: [
        { from: "Sensor Ultrasonidos", to: "Puerto 3 (mCore)", color: "amarillo", note: "Comunicación I2C / Trigger-Echo" },
        { from: "Sensor Seguidor de Línea", to: "Puerto 2 (mCore)", color: "azul", note: "Entradas binarias S1 y S2" },
        { from: "Motor Izquierdo", to: "M1", color: "rojo", note: "Velocidad controlada por PWM" },
        { from: "Motor Derecho", to: "M2", color: "negro", note: "Velocidad con signo invertido" }
      ],
      diagramSvg: `<svg viewBox="0 0 600 300" class="schematic-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="300" fill="var(--bg-card-subtle)" rx="12"/>
        <rect x="180" y="40" width="240" height="210" rx="30" fill="#0284c7" stroke="#0369a1" stroke-width="4"/>
        <circle cx="300" cy="80" r="18" fill="#e0f2fe"/>
        <text x="300" y="85" fill="#0369a1" font-size="12" font-weight="bold" text-anchor="middle">mBot Chassis</text>
        <rect x="150" y="110" width="25" height="90" rx="6" fill="#1e293b"/>
        <text x="135" y="160" fill="var(--text-main)" font-size="10" transform="rotate(-90 135 160)">Rueda Izq (M1)</text>
        <rect x="425" y="110" width="25" height="90" rx="6" fill="#1e293b"/>
        <text x="465" y="160" fill="var(--text-main)" font-size="10" transform="rotate(90 465 160)">Rueda Der (M2)</text>
        <rect x="250" y="25" width="100" height="30" rx="10" fill="#475569"/>
        <circle cx="275" cy="40" r="10" fill="#94a3b8" stroke="#f8fafc" stroke-width="2"/>
        <circle cx="325" cy="40" r="10" fill="#94a3b8" stroke="#f8fafc" stroke-width="2"/>
        <text x="300" y="15" fill="#0284c7" font-size="11" font-weight="bold" text-anchor="middle">Ultrasonidos (Ojos)</text>
        <rect x="270" y="240" width="60" height="25" rx="5" fill="#334155"/>
        <circle cx="285" cy="252" r="4" fill="#38bdf8"/>
        <circle cx="315" cy="252" r="4" fill="#38bdf8"/>
        <text x="300" y="280" fill="var(--text-muted)" font-size="10" text-anchor="middle">Sensor Doble Infrarrojo (Abajo)</text>
      </svg>`
    },
    codeBlocks: {
      makeCodeDescription: "Estructura de decisión lógica en bloques mBlock 5:",
      blocksHtml: `
        <div class="code-block-visual">
          <div class="block-unit block-basic">
            <span class="block-title">cuando se pulsa la bandera verde</span>
            <div class="block-inner">
              <div class="block-unit block-flow">
                <span class="block-title">por siempre</span>
                <div class="block-inner">
                  <div class="block-unit block-logic">
                    <span class="block-title">si <span class="badge-pins">distancia del sensor ultrasonidos (puerto 3)</span> &lt; <span class="badge-num">15</span> cm entonces</span>
                    <div class="block-inner">
                      <div class="block-unit block-motion">detener avance de motores</div>
                      <div class="block-unit block-looks">mostrar LED rojo alerta</div>
                    </div>
                    <span class="block-title">si no</span>
                    <div class="block-inner">
                      <div class="block-comment">-- Control de seguimiento de línea --</div>
                      <div class="block-unit block-logic">
                        si <span class="badge-pins">seguidor de línea (puerto 2) = (0) Ambos en negro</span> entonces
                        <div class="block-inner">
                          <div class="block-unit block-motion">avanzar a velocidad <span class="badge-num">50</span>%</div>
                        </div>
                        si <span class="badge-pins">seguidor = (1) Izq blanco, Der negro</span> entonces
                        <div class="block-inner">
                          <div class="block-unit block-motion">girar a la derecha (M1: 50%, M2: 0%)</div>
                        </div>
                        si <span class="badge-pins">seguidor = (2) Izq negro, Der blanco</span> entonces
                        <div class="block-inner">
                          <div class="block-unit block-motion">girar a la izquierda (M1: 0%, M2: 50%)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      pythonCode: `# Versión en Python para mBot Neo / CyberPi con mBlock Python IDE
from cyberpi import *
import mbot2

UMBRAL_OBSTACULO = 15 # cm
VEL_CRUCERO = 40      # %

while True:
    # 1. Comprobar obstáculo
    dist = mbot2.ultrasonic2.get(1)
    if dist < UMBRAL_OBSTACULO and dist > 0:
        mbot2.drive_speed(0, 0)
        led.on(255, 0, 0) # Alerta roja en CyberPi
    else:
        led.on(0, 255, 0)
        # 2. Leer estado de la línea
        estado = mbot2.quad_rgb_sensor.get_line_sta(1)
        
        if estado == "straight":
            mbot2.drive_speed(VEL_CRUCERO, -VEL_CRUCERO)
        elif estado == "left":
            mbot2.drive_speed(VEL_CRUCERO // 2, 0)
        elif estado == "right":
            mbot2.drive_speed(0, -VEL_CRUCERO // 2)
        else:
            mbot2.drive_speed(VEL_CRUCERO // 3, -VEL_CRUCERO // 3)`
    },
    teacherTips: [
      {
        title: "Dinámica de aula: El Reto de la 'Fórmula STEAM'",
        tip: "En lugar de que compitan por quién es más rápido individualmente, pídeles que compitan por quién consigue completar 3 vueltas completas seguidas sin salirse. Esto prima la precisión del algoritmo sobre la velocidad punta impulsiva."
      },
      {
        title: "Problema de iluminación ambiental",
        tip: "La luz solar directa o los fluorescentes viejos emiten infrarrojos que pueden confundir al sensor de suelo. Si los robots fallan repentinamente, baja las persianas del aula para estabilizar la luz."
      }
    ]
  },
  {
    id: "scratch-makey-piano",
    title: "Piano Gigante de Frutas y Conductividad Eléctrica",
    subtitle: "Conexión de eventos físicos, biología de materiales y composición musical interactiva",
    platform: "scratch",
    platformName: "Scratch 3.0 + Makey Makey",
    level: "primaria-ini",
    levelName: "2º a 5º de Primaria (7-11 años)",
    duration: "2 sesiones (50 min c/u)",
    difficulty: "Muy Fácil - Iniciación",
    subjects: ["Música", "Ciencias de la Naturaleza", "Educación Artística", "Competencia Digital"],
    steamTags: ["Conductividad", "Circuitos", "Eventos", "Arte y Música"],
    summary: "El alumnado crea un instrumento musical conectando plátanos, manzanas o plastilina a la placa Makey Makey. En Scratch, programan cada tecla para que reproduzca notas reales o sonidos grabados con su propia voz.",
    learningGoals: [
      "Experimentar qué materiales conducen la electricidad (metales, frutas con agua y sales, grafito) y cuáles son aislantes.",
      "Asociar el concepto de 'circuito cerrado a tierra' con la pulsación de una tecla.",
      "Programar en Scratch utilizando la categoría de eventos y la extensión de Música (sintetizador MIDI).",
      "Fomentar la expresión artística y el trabajo colaborativo en equipo."
    ],
    materials: [
      "1 placa Makey Makey original o compatible con cable USB",
      "7 cables cocodrilo de diferentes colores",
      "Frutas variadas (plátanos, naranjas, limones), plastilina conductora o papel con lápiz blando (2B/4B)",
      "Ordenador con navegador web y acceso a Scratch 3.0",
      "Pulseras de papel de aluminio para conectar a GND (tierra)"
    ],
    schematic: {
      description: "Esquema de circuito humano-fruta con Makey Makey.",
      connections: [
        { from: "Pin Flecha Arriba", to: "Plátano 1 (Nota Do)", color: "amarillo", note: "Dispara evento Tecla Arriba" },
        { from: "Pin Flecha Abajo", to: "Plátano 2 (Nota Re)", color: "verde", note: "Dispara evento Tecla Abajo" },
        { from: "Pin Flecha Izquierda", to: "Naranja (Nota Mi)", color: "naranja", note: "Dispara evento Flecha Izq" },
        { from: "Pin Flecha Derecha", to: "Manzana (Nota Fa)", color: "rojo", note: "Dispara evento Flecha Der" },
        { from: "Barra EARTH (GND)", to: "Mano del alumno (Pulsera de aluminio)", color: "negro", note: "Cierra el circuito al tocar la fruta" }
      ],
      diagramSvg: `<svg viewBox="0 0 600 280" class="schematic-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="280" fill="var(--bg-card-subtle)" rx="12"/>
        <rect x="60" y="40" width="240" height="200" rx="16" fill="#dc2626" stroke="#991b1b" stroke-width="3"/>
        <text x="180" y="70" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Makey Makey</text>
        <rect x="110" y="90" width="22" height="22" fill="#fcd34d" rx="4"/>
        <rect x="80" y="120" width="22" height="22" fill="#fcd34d" rx="4"/>
        <rect x="140" y="120" width="22" height="22" fill="#fcd34d" rx="4"/>
        <rect x="110" y="150" width="22" height="22" fill="#fcd34d" rx="4"/>
        <rect x="80" y="200" width="200" height="22" fill="#94a3b8" rx="4"/>
        <text x="180" y="216" fill="#0f172a" font-size="11" font-weight="bold" text-anchor="middle">EARTH (Tierra)</text>
        <ellipse cx="450" cy="80" rx="25" ry="18" fill="#eab308"/>
        <text x="450" y="85" fill="#000" font-size="10" font-weight="bold" text-anchor="middle">Plátano (Do)</text>
        <circle cx="450" cy="140" r="22" fill="#ea580c"/>
        <text x="450" y="145" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Naranja (Re)</text>
        <rect x="420" y="200" width="70" height="35" rx="8" fill="#38bdf8"/>
        <text x="455" y="222" fill="#0c4a6e" font-size="10" font-weight="bold" text-anchor="middle">Mano Alumno</text>
        <path d="M 121 90 C 200 40, 425 70, 425 80" fill="none" stroke="#eab308" stroke-width="3"/>
        <path d="M 151 130 C 250 110, 428 135, 428 140" fill="none" stroke="#ea580c" stroke-width="3"/>
        <path d="M 280 211 C 340 211, 400 215, 420 215" fill="none" stroke="#334155" stroke-width="4" stroke-dasharray="4"/>
      </svg>`
    },
    codeBlocks: {
      makeCodeDescription: "Bloques en Scratch 3.0 con la extensión 'Música':",
      blocksHtml: `
        <div class="code-block-visual">
          <div class="block-unit block-events">
            <span class="block-title">al presionar tecla [flecha arriba]</span>
            <div class="block-inner">
              <div class="block-unit block-music">tocar nota <span class="badge-num">(60) Do</span> durante <span class="badge-num">0.25</span> pulsos</div>
              <div class="block-unit block-looks">cambiar tamaño por <span class="badge-num">15</span></div>
              <div class="block-unit block-basic">esperar <span class="badge-num">0.1</span> segundos</div>
              <div class="block-unit block-looks">fijar tamaño al <span class="badge-num">100</span>%</div>
            </div>
          </div>
          <div class="block-unit block-events">
            <span class="block-title">al presionar tecla [flecha abajo]</span>
            <div class="block-inner">
              <div class="block-unit block-music">tocar nota <span class="badge-num">(62) Re</span> durante <span class="badge-num">0.25</span> pulsos</div>
            </div>
          </div>
        </div>
      `,
      pythonCode: `# Scratch no requiere código textual, pero así funcionaría en lógica formal:
def on_key_up():
    play_midi_note(note=60, beats=0.25)
    animate_sprite_bounce()

def on_key_down():
    play_midi_note(note=62, beats=0.25)`
    },
    teacherTips: [
      {
        title: "¡El secreto de la tierra (GND)!",
        tip: "El 90% de las veces que 'no funciona' es porque el alumno no está sosteniendo firmemente el cable de tierra (EARTH) o lleva zapatos con suela de goma muy aislante mientras otra persona toca la fruta. Explica el concepto de que el cuerpo humano actúa como conductor cerrando el circuito hacia la placa."
      },
      {
        title: "Transversalidad con Ciencias",
        tip: "Haz que prueben materiales insospechados: goma de borrar (aislante), papel dibujado con lápiz blando muy oscuro (conductor por el grafito), una cuchara metálica (conductor), un vaso con agua destilada vs un vaso con agua y sal."
      }
    ]
  },
  {
    id: "beebot-cuentacuentos",
    title: "El Robot Cuentacuentos: Pensamiento Desconectado e Infantil",
    subtitle: "Iniciación al algoritmo, secuenciación y lateralidad sin pantallas para Infantil y 1º Primaria",
    platform: "beebot",
    platformName: "Bee-Bot / Blue-Bot / Desconectada",
    level: "infantil",
    levelName: "Educación Infantil (4-6 años) y 1º Primaria",
    duration: "2 a 3 sesiones (40 min c/u)",
    difficulty: "Muy Fácil",
    subjects: ["Lengua y Literatura", "Matemáticas (Geometría)", "Educación Emocional"],
    steamTags: ["Desconectada", "Secuencia", "Lateralidad", "Lectoescritura"],
    summary: "A través de un tapete temático basado en un cuento infantil (ej. 'El monstruo de colores' o 'Caperucita'), el alumnado planifica el camino de la abeja programable utilizando tarjetas de flechas físicas antes de pulsar los botones.",
    learningGoals: [
      "Comprender qué es una instrucción unívoca (Avanzar 1 paso de 15 cm, Girar 90º a derecha o izquierda).",
      "Aprender a anticipar y representar secuencias de órdenes en papel antes de ejecutar.",
      "Identificar y corregir errores ('desbugueo') cuando el robot no llega a la casilla esperada.",
      "Desarrollar el trabajo en pequeños equipos con roles de conductor, cartógrafo y verificador."
    ],
    materials: [
      "1 o 2 robots Bee-Bot o Blue-Bot",
      "1 tapete de cuadrícula de 15x15 cm por casilla con imágenes del cuento",
      "Baraja de cartas de comandos impresas (Avanzar, Retroceder, Giro Izq, Giro Der, GO, PAUSA)",
      "Obstáculos físicos (bloques de madera o cartulinas de zonas bloqueadas)"
    ],
    schematic: {
      description: "Distribución del tapete de aula y orden de las tarjetas.",
      connections: [
        { from: "Casilla Salida (0,0)", to: "Casilla Reto 1 (Casa de la Abuelita)", color: "verde", note: "Secuencia: Adelante, Adelante, Giro Der, Adelante" }
      ],
      diagramSvg: `<svg viewBox="0 0 600 260" class="schematic-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="260" fill="var(--bg-card-subtle)" rx="12"/>
        <g transform="translate(60, 30)">
          <rect x="0" y="0" width="280" height="200" fill="#fff" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="70" y1="0" x2="70" y2="200" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="140" y1="0" x2="140" y2="200" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="210" y1="0" x2="210" y2="200" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="0" y1="66" x2="280" y2="66" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="0" y1="133" x2="280" y2="133" stroke="#cbd5e1" stroke-width="2"/>
          <circle cx="35" cy="165" r="22" fill="#fde047" stroke="#eab308" stroke-width="2"/>
          <text x="35" y="170" font-size="16" text-anchor="middle">🐝</text>
          <text x="35" y="193" font-size="9" fill="#0f172a" text-anchor="middle">Salida</text>
          <rect x="145" y="70" width="60" height="58" fill="#fecaca" rx="4"/>
          <text x="175" y="105" font-size="20" text-anchor="middle">🐺</text>
          <text x="175" y="122" font-size="9" fill="#991b1b" text-anchor="middle">¡Peligro!</text>
          <rect x="215" y="5" width="60" height="58" fill="#bbf7d0" rx="4"/>
          <text x="245" y="40" font-size="20" text-anchor="middle">🏡</text>
          <text x="245" y="57" font-size="9" fill="#166534" text-anchor="middle">Meta</text>
        </g>
        <g transform="translate(370, 40)">
          <text x="0" y="15" fill="var(--text-main)" font-size="12" font-weight="bold">Tarjetas de Secuencia Física:</text>
          <rect x="0" y="30" width="40" height="55" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
          <text x="20" y="65" font-size="20" text-anchor="middle">⬆️</text>
          <rect x="48" y="30" width="40" height="55" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
          <text x="68" y="65" font-size="20" text-anchor="middle">⬆️</text>
          <rect x="96" y="30" width="40" height="55" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
          <text x="116" y="65" font-size="20" text-anchor="middle">➡️</text>
          <rect x="144" y="30" width="40" height="55" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
          <text x="164" y="65" font-size="20" text-anchor="middle">⬆️</text>
          <rect x="0" y="95" width="185" height="40" rx="8" fill="#22c55e"/>
          <text x="92" y="120" font-size="14" fill="#fff" font-weight="bold" text-anchor="middle">¡Pulsar Botón GO!</text>
        </g>
      </svg>`
    },
    codeBlocks: {
      makeCodeDescription: "Secuencia motora de botones en Bee-Bot:",
      blocksHtml: `
        <div class="code-block-visual">
          <div class="block-unit block-events">
            <span class="block-title">Protocolo de Aula 'Pensar - Dibujar - Probar'</span>
            <div class="block-inner">
              <div class="block-step">1. <strong>Botón CLEAR (X):</strong> ¡Obligatorio! Borra la memoria del viaje anterior.</div>
              <div class="block-step">2. <strong>Fase Cartográfica:</strong> Los niños colocan las tarjetas en el suelo en orden horizontal de izquierda a derecha.</div>
              <div class="block-step">3. <strong>Pulsación atenta:</strong> El alumno 'Conductor' pulsa las teclas siguiendo con el dedo las tarjetas.</div>
              <div class="block-step">4. <strong>Botón GO:</strong> El robot emprende el viaje de 15 cm por casilla.</div>
            </div>
          </div>
        </div>
      `,
      pythonCode: `# Pseudocódigo para el docente
borrar_memoria()
avanzar(pasos=2)  # 30 cm
girar_derecha(grados=90)
avanzar(pasos=1)  # 15 cm
celebrar_llegada()`
    },
    teacherTips: [
      {
        title: "Regla de oro: La alfombrilla de Borrado",
        tip: "El fallo más habitual de los más pequeños es no pulsar la tecla 'X' (Clear). Si no lo hacen, la abeja acumula todos los pasos del turno anterior y se escapa de la mesa. Crea la rutina cantada: 'Primero la X, luego la flecha'."
      },
      {
        title: "Empatía corporal",
        tip: "Cuando un niño no entienda si debe girar a la derecha o a la izquierda, haz que se ponga de pie en la misma orientación que mira la abeja y abra sus brazos para descubrir su propio lado derecho."
      }
    ]
  },
  {
    id: "lego-spike-clasificador",
    title: "Brazo Clasificador Automatizado de Residuos",
    subtitle: "Mecatrónica y visión artificial con sensor de color en LEGO Education SPIKE",
    platform: "lego",
    platformName: "LEGO SPIKE Prime / Essential",
    level: "primaria-sup",
    levelName: "5º Primaria a 2º ESO (10-14 años)",
    duration: "4 sesiones (50 min c/u)",
    difficulty: "Intermedia",
    subjects: ["Tecnología", "Ciencias de la Tierra", "Matemáticas"],
    steamTags: ["Mecánica", "Engranajes", "Sensor de Color", "Medioambiente"],
    summary: "Construcción de una cinta transportadora o brazo robótico motorizado que detecta el color de piezas (azul=papel, amarillo=plástico, verde=vidrio) y acciona una compuerta clasificadora hacia el contenedor correspondiente.",
    learningGoals: [
      "Calcular relaciones de transmisión con engranajes para aumentar fuerza o velocidad.",
      "Programar lecturas condicionales basadas en el sensor de color.",
      "Sincronizar el motor de la cinta con el servomotor de desvío.",
      "Concienciar sobre el tratamiento industrial y automatizado de residuos sólidos urbanos."
    ],
    materials: [
      "1 Set LEGO Education SPIKE Prime con Smart Hub",
      "1 Motor mediano y 1 Motor grande",
      "1 Sensor de color SPIKE",
      "Ladrillos y vigas Technic, engranajes de 24 y 8 dientes",
      "Piezas LEGO de colores rojo, azul y verde como 'residuos'"
    ],
    schematic: {
      description: "Puertos de conexión en el Hub LEGO SPIKE Prime.",
      connections: [
        { from: "Motor Cinta Transportadora", to: "Puerto A", color: "azul", note: "Rotación continua a baja velocidad" },
        { from: "Motor Compuerta / Brazo", to: "Puerto B", color: "verde", note: "Posicionamiento angular exacto (grados)" },
        { from: "Sensor de Color", to: "Puerto C", color: "amarillo", note: "Modo detección de color directo" }
      ],
      diagramSvg: `<svg viewBox="0 0 600 240" class="schematic-svg" xmlns="http://www.w3.org/2000/svg">
        <rect width="600" height="240" fill="var(--bg-card-subtle)" rx="12"/>
        <rect x="50" y="40" width="160" height="160" rx="20" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
        <circle cx="130" cy="120" r="28" fill="#1e293b"/>
        <text x="130" y="125" fill="#facc15" font-size="12" font-weight="bold" text-anchor="middle">SPIKE</text>
        <rect x="60" y="45" width="22" height="15" fill="#1e293b" rx="2"/>
        <text x="71" y="57" fill="#fff" font-size="9" text-anchor="middle">A</text>
        <rect x="90" y="45" width="22" height="15" fill="#1e293b" rx="2"/>
        <text x="101" y="57" fill="#fff" font-size="9" text-anchor="middle">B</text>
        <rect x="120" y="45" width="22" height="15" fill="#1e293b" rx="2"/>
        <text x="131" y="57" fill="#fff" font-size="9" text-anchor="middle">C</text>
        <rect x="270" y="80" width="240" height="40" rx="8" fill="#475569"/>
        <circle cx="285" cy="100" r="14" fill="#94a3b8"/>
        <circle cx="495" cy="100" r="14" fill="#94a3b8"/>
        <text x="390" y="105" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">Cinta Transportadora</text>
        <rect x="330" y="45" width="40" height="25" fill="#0284c7" rx="4"/>
        <circle cx="350" cy="57" r="6" fill="#38bdf8"/>
        <rect x="320" y="150" width="45" height="50" fill="#3b82f6" rx="4"/>
        <text x="342" y="180" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">Papel</text>
        <rect x="380" y="150" width="45" height="50" fill="#eab308" rx="4"/>
        <text x="402" y="180" fill="#000" font-size="9" font-weight="bold" text-anchor="middle">Envases</text>
        <rect x="440" y="150" width="45" height="50" fill="#22c55e" rx="4"/>
        <text x="462" y="180" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">Vidrio</text>
      </svg>`
    },
    codeBlocks: {
      makeCodeDescription: "Bloques en la app LEGO SPIKE Prime (Word Blocks):",
      blocksHtml: `
        <div class="code-block-visual">
          <div class="block-unit block-events">
            <span class="block-title">cuando el programa empieza</span>
            <div class="block-inner">
              <div class="block-unit block-motion">ajustar motor B a posición más cercana <span class="badge-num">0</span> grados</div>
              <div class="block-unit block-motion">iniciar motor A al <span class="badge-num">30</span>% de velocidad</div>
              <div class="block-unit block-flow">
                <span class="block-title">por siempre</span>
                <div class="block-inner">
                  <div class="block-unit block-logic">
                    si <span class="badge-pins">sensor de color C es igual a [azul]</span> entonces
                    <div class="block-inner">
                      <div class="block-unit block-motion">mover motor B a <span class="badge-num">45</span> grados</div>
                      <div class="block-unit block-basic">esperar <span class="badge-num">1</span> segundos</div>
                      <div class="block-unit block-motion">mover motor B a <span class="badge-num">0</span> grados</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      pythonCode: `# Versión en Python con SPIKE Prime App
from spike import PrimeHub, Motor, ColorSensor
from spike.control import wait_for_seconds

hub = PrimeHub()
motor_cinta = Motor('A')
motor_brazo = Motor('B')
sensor = ColorSensor('C')

motor_brazo.run_to_position(0)
motor_cinta.start(30)

while True:
    color = sensor.get_color()
    if color == 'blue':
        motor_brazo.run_to_position(45)
        wait_for_seconds(1)
        motor_brazo.run_to_position(0)
    elif color == 'yellow':
        motor_brazo.run_to_position(-45)
        wait_for_seconds(1)
        motor_brazo.run_to_position(0)`
    },
    teacherTips: [
      {
        title: "Reto mecánico de aula",
        tip: "¿La cinta avanza demasiado rápido y el sensor no lee a tiempo? En lugar de bajar la velocidad del motor en el código (que le quita par de fuerza), reta a los alumnos a montar un tren reductor de engranajes (engranaje de 8 dientes en el motor moviendo uno de 24 en el rodillo)."
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.TUTORIALS = TUTORIALS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TUTORIALS };
}
