# Guía de Estilo Visual para las Imágenes de Robòtica200

Este documento establece el estándar visual obligatorio para todas las imágenes de portada de robots y elementos ilustrados de la web.

## 1. Reglas Fundamentales de las Ilustraciones
- **Estilo Gráfico:** Ilustración digital estilizada (3D suave / vectorial limpio), diseño moderno de tecnología educativa para niños, formas limpias y redondeadas, estética de juguete tecnológico amigable (inspirado exactamente en el estilo de *CodeyRocky*).
- **🚫 Estricto Estilo Sin Líneas (Lineless):** **Sin líneas de contorno (outlines), sin trazos negros, sin rebordes oscuros ni entintado.** Las formas, piezas y límites se definen exclusivamente a través del contraste de color, luz y sombreado suave de volumen, exactamente igual que en *CodeyRocky*.
- **Fondo Bicolor Dividido (Mesa y Pared):**
  - El fondo está dividido horizontalmente en dos mitades limpias por una línea de horizonte detrás de la parte media del robot.
  - **Mitad superior (Pared):** Color pastel plano suave que armoniza con los colores primarios del robot.
  - **Mitad inferior (Mesa/Superficie):** Color plano suave de mesa que complementa la paleta cromática del dispositivo.
- **🚫 Prohibición Estricta de Sombras en el Suelo:**
  - **No debe haber ninguna sombra debajo del robot.** Ni sombra proyectada (cast shadow), ni sombra de contacto (contact shadow), ni oclusión ambiental en la mesa.
- **🚫 Prohibición Total de Texto:**
  - Sin ningún tipo de texto, letras, números, marcas comerciales, logotipos o marcas de agua.
- **Perspectiva y Encuadre:**
  - Robot centrado en el encuadre, ocupando un 70-75% del ancho.
  - Vista isométrica en perspectiva 3/4 frontal.
- **Dimensiones:**
  - Ancho de **600px** (proporción 4:3, resolución estándar de 600 × 448 px).

---

## 2. Paletas de Fondo por Robot

| Robot | Mitad Superior (Pared) | Mitad Inferior (Mesa) | Tonos del Robot |
| :--- | :--- | :--- | :--- |
| **CodeyRocky** | Azul cielo pastel suave (`#dbeafe`) | Blanco roto / gris neutro claro (`#f1f5f9`) | Blanco, cian/turquesa brillante, negro |
| **Coding Express** | Amarillo crema pastel suave | Verde menta pastel claro | Amarillo, azul DUPLO, rojo, verde |
| **TaleBot Pro** | Melocotón / albaricoque pastel cálido | Turquesa muy pálido / crema claro | Azul cielo, naranja, botones de colores |
| **CodingSet** | Naranja pastel suave / crema cálido | Blanco marfil / salvia muy claro | Blanco, cúpula naranja, botones amarillos |
| **Spike Prime** | Lavanda / lila pastel suave | Gris cálido claro / crema suave | Amarillo vivo, turquesa, magenta, negro |
| **Microbit** | Rosa pastel suave / coral pálido | Arena dorada clara / blanco cálido | Negro PCB, rojo LED, dorado conector |

---

## 3. Plantilla de Prompt Obligatoria para Generación
```text
3D digital stylized illustration of [Robot Name] from the reference image, in the exact smooth lineless 3D toy style of Codey Rocky. Smooth curved plastic surfaces, soft volume shading, friendly toy tech design, completely lineless without any black outlines, stroke lines, or ink contours. Centered composition, 3/4 front isometric perspective view. The background is divided horizontally into two flat two-tone halves like a clean studio room: upper half is a solid [Color Superior] wall, and lower half is a solid [Color Inferior] flat table surface, with a clean horizontal horizon line dividing them behind the robot. Strictly NO shadow beneath the robot, no drop shadow, no ground shadow, no contact shadow on the table. Completely textless, strictly no text, no words, no numbers, no letters, no labels, no watermarks.
```
