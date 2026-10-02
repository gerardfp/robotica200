# 🤖 EduRobótica Docente — Portal STEAM de Robótica Educativa y Guías Didácticas

Plataforma web diseñada **por y para docentes**, enfocada en la enseñanza práctica del pensamiento computacional, la electrónica y la robótica educativa desde **Educación Infantil hasta Bachillerato y Formación Profesional**.

---

## 🌟 Características Principales

### 1. 📖 Banco de Tutoriales Paso a Paso de Aula
Proyectos prácticos listos para el aula con:
- **Esquema de conexionado interactivo (SVG/Pinout):** Cableado codificado por colores reales.
- **Bloques visuales interactivos:** Lógica por bloques con la paleta de MakeCode, Scratch y mBlock.
- **Código textual alternativo:** Código C++ (Arduino IDE) y MicroPython / Python con botón de copiado rápido.
- **Troubleshooting para el Docente:** Sección con los fallos más habituales de los alumnos (ruido flotante en pulsadores, calibración de sensores analógicos, corriente parásita) y preguntas socráticas para el aula.

#### Proyectos Incluidos:
- **BBC micro:bit:** *Estación Agro-Climática con Alerta de Sequía y Sensores de Humedad*.
- **Arduino UNO:** *Semáforo Inclusivo para Peatones con Pulsador Accesible y Aviso Acústico*.
- **Makeblock mBot / mBot 2:** *Robot Seguidor de Línea y Evasión con Sensores IR y Ultrasonidos*.
- **Scratch 3.0 + Makey Makey:** *Piano Gigante de Frutas y Conductividad de Materiales*.
- **Bee-Bot / Desconectada:** *El Robot Cuentacuentos: Algoritmos y Orientación Espacial sin Pantallas*.
- **LEGO SPIKE Prime:** *Brazo Clasificador Automatizado de Residuos con Sensor de Color*.

---

### 2. 📋 Guías Didácticas y Situaciones de Aprendizaje (LOMLOE / STEAM)
Unidades pedagógicas completas diseñadas bajo **Aprendizaje Basado en Proyectos (ABP)** y **Diseño Universal para el Aprendizaje (DUA)**:
- **Competencias Clave y Específicas:** Vinculación con Competencia Digital (CD), STEM, Personal y Social (CPSAA), etc.
- **Reparto de Roles Cooperativos:** Coordinador/a, Ingeniero/a de Hardware, Programador/a Jefe y Responsable de Calidad & DUA.
- **Secuencia Sesión a Sesión:** Temporalización con actividades, dinámicas y entregables verificables.
- **Rúbricas Analíticas Formativas:** 4 niveles de desempeño (Insuficiente, Básico, Notable, Excelente) con ponderaciones porcentuales.

---

### 3. ⚡ Generador Interactivo de Situaciones de Aprendizaje STEAM
Herramienta donde el profesor elige:
1. Etapa educativa (Infantil, Primaria, Secundaria, FP).
2. Plataforma robótica deseada.
3. Eje temático (Sostenibilidad, Ciudad Inteligente, Exploración Espacial, Huerto Automatizado).
4. Duración (de 3 a 8 sesiones).

Genera automáticamente una propuesta pedagógica formal lista para **copiar** o **imprimir**.

---

### 4. 📽️ Modo Proyector de Aula (PDI)
Modo de visualización de **alto contraste** y **tipografía ampliada** pensado para ser proyectado en la Pizarra Digital Interactiva (PDI) del aula sin elementos que distraigan a los estudiantes.

---

### 5. 🤖 Simulador de Algoritmos en la PDI
Demostrador visual en tiempo real para explicar a toda la clase el bucle robótico fundamental: **Sensar → Decidir → Actuar**. Permite avanzar paso a paso o en bucle continuo observando la frenada ante obstáculos con sensores de ultrasonidos.

---

### 6. 🧮 Calculadora de Kits y Materiales de Aula
Permite calcular al instante la dotación óptima para un centro según el número de alumnos:
- Kits de trabajo activos y kits de repuestos sugeridos.
- Estimación económica de presupuesto.
- Ratio ideal de alumnos por equipo (evita alumnos pasivos).

---

### 7. 🖨️ Recursos Imprimibles
- **Tarjetas de Roles de Trabajo Cooperativo:** Listas para recortar y plastificar con cordón identificativo.
- **Diana STEAM de Coevaluación y Autoevaluación:** Instrumento visual de evaluación formativa.
- **Guía Comparativa de Robots Educativos (2026):** Análisis de precios, robustez y software para comisiones pedagógicas y equipos directivos.

---

## 🚀 Cómo Iniciar la Web

### Opción 1: Directamente en el Navegador (Sin instalación)
Haz doble clic sobre el archivo `index.html` o ábrelo con cualquier navegador web (Chrome, Firefox, Safari, Edge). **Funciona 100% offline.**

### Opción 2: Con el Servidor Local
Ejecuta en la terminal dentro de esta carpeta:
```bash
./iniciar.sh
```
O con Python directamente:
```bash
python3 -m http.server 3000
```
Luego abre tu navegador en: [http://localhost:3000](http://localhost:3000)

---

## 📄 Impresión y Exportación a PDF
Todas las fichas de tutoriales y guías didácticas incorporan estilos optimizados `@media print`. Al pulsar **"Imprimir"**, la web oculta barras de navegación, botones y fondos oscuros para generar un documento en papel o PDF limpio en formato DIN-A4.

---

## ⚖️ Licencia
Contenido distribuido bajo licencia abierta **Creative Commons BY-NC-SA 4.0**. Libre para su uso y adaptación en cualquier centro educativo.
