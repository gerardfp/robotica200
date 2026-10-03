# Guía de Estilo Visual para las Imágenes de Robòtica200

Este documento establece el estándar visual obligatorio para todas las imágenes de portada de robots y elementos ilustrados de la web.

## 1. Reglas Fundamentales de las Ilustraciones
- **Estilo Gráfico:** Ilustración digital estilizada (3D suave / vectorial limpio), diseño moderno de tecnología educativa para niños, formas limpias y redondeadas, estética de juguete tecnológico amigable (inspirado exactamente en el estilo de *CodeyRocky*).
- **🚫 Estricto Estilo Sin Líneas (Lineless):** **Sin líneas de contorno (outlines), sin trazos negros, sin rebordes oscuros ni entintado.** Las formas, piezas y límites se definen exclusivamente a través del contraste de color, luz y sombreado suave de volumen, exactamente igual que en *CodeyRocky*.
- **🚫 Sin brillos:** Acabado mate estricto, sin reflejos especulares, brillos plásticos ni brillos blancos.
- **🚫 Sin degradados ni sombreados suaves:** Sin transiciones de color degradadas ni sombreados continuos o sombras suaves.
- **🎨 Cada forma es de un único color:** Estilo plano (flat cel-shaded / vectorial). Cada plano, faceta o pieza geométrica se rellena con un solo color plano uniforme, exactamente igual que en *CodeyRocky*.
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
Minimalist flat vector 3D-isometric illustration of [Robot Name] from the reference image, in the exact flat minimalist art style of Codey Rocky. CRITICAL ART STYLE RULES: Strictly NO outlines, no black contours, no line strokes. Strictly NO glossy shine, NO specular reflections, NO highlights, matte finish. Strictly NO gradients, NO soft shading, NO ambient occlusion, NO shadow gradients. Every shape and surface is a single flat solid color (flat cel-shaded vector look). Each facet and part is filled with one uniform flat solid color, exactly like Codey Rocky. Centered 3/4 isometric perspective. Background is two flat solid halves: top half flat solid [Color Superior], bottom half flat solid [Color Inferior], divided by a straight horizontal line behind the robot. Strictly NO shadow under the robot on the table, no drop shadow. Strictly textless, no words, no numbers, no letters, no logos.
```

---

## 4. Iconos de Esencia de los Robots (Formato 1:1 Cuadrado, Fondo Transparente)

Para tarjetas de actividades, insignias curriculares, avatares y elementos compactos de la interfaz, se utilizan iconos cuadrados que capturan la **esencia icónica con muy pocos detalles** (alto minimalismo, con igual nivel de detalle entre todos los robots):

- **Ubicación:** `assets/icons/[robot].png` (resolución estándar: 512 × 512 px).
- **Fondo Transparente:** Formato PNG con canal alfa limpio y transparente, sin halos ni siluetas de borde.
- **Proporción y Encuadre:** Formato cuadrado 1:1, centrado, ocupando ~75% del marco.
- **🚫 Lineless estricto:** Sin líneas de contorno ni trazos de tinta oscuros, idéntico al estilo plano de *CodeyRocky*.
- **🚫 Sin brillos ni degradados:** Acabado mate cel-shaded, cada forma es de un único color plano.
- **🚫 Sin sombras en el suelo y sin texto.**

### Elementos de esencia por robot:
- **CodeyRocky (`codeyrocky.png`):** Cabeza de Codey con orejitas redondeadas, pantalla oscura con sonrisa pixelada LED cian y botones redondos A y B.
- **TaleBot (`talebot.png`):** Cubo rechoncho azul con frontal blanco, dos grandes ojos negros redondos, aleta lateral naranja y cuatro botones circulares de colores arriba.
- **CodingSet (`codingset.png`):** Pequeño MatataBot cilíndrico blanco con cúpula naranja, dos pequeños ojos negros y ruedas naranjas.
- **Spike (`spike.png`):** Hub inteligente rectangular amarillo con ojos ultrasónicos circulares, sonrisa LED roja, orificios Technic, dos motores angulares azul verdoso con ruedas y dos cables limpios conectados al hub.
- **Coding Express (`coding-express.png`):** Cabina de locomotora amarilla LEGO DUPLO con 4 studs redondeados en el techo, chimenea gris, ventana arqueada diáfana, chasis azul y ruedas rojas.
- **Microbit (`microbit.png`):** Placa rectangular negra de esquinas redondeadas, matriz LED 5x5 con sonrisa roja, botones A y B y conectores dorados inferiores.

---

## 5. Banners e Iconos de Secciones Temáticas

Para las 3 secciones principales de la web (*Pensament computacional*, *Robòtica*, *Situacions d'aprenentatge*), se han diseñado tanto banners bicolores de cabecera como iconos minimalistas con fondo transparente:

### A) Banners de Sección (`assets/banners/[seccion].jpg`)
- **Pensament computacional (`pensament-computacional.jpg`):** Pared pastel lavanda y mesa crema, con bloques táctiles de flechas algorítmicas y bombilla de ideas estilizada.
- **Robòtica (`robotica.jpg`):** Pared pastel azul cielo y mesa menta/arena, con robot amigo sonriente y bloques modulares STEAM con ojos de sensor.
- **Situacions d'aprenentatge (`situacions-aprenentatge.jpg`):** Pared pastel melocotón y mesa crema cálida, con tapiz de misión isométrica con bandera roja y estrella dorada.

### B) Iconos de Sección (`assets/icons/[seccion].png`)
- **Pensament computacional (`pensament-computacional.png`):** Bombilla de ideas cálida con flechas de programación tangibles (avance y giro) en su interior, fondo transparente.
- **Robòtica (`robotica.png`):** Rostro de robot amigo con antena esférica, pantalla con sonrisa pixelada LED cian y sensores laterales, fondo transparente.
- **Situacions d'aprenentatge (`situacions-aprenentatge.png`):** Portapapeles de desafío/misión con bandera de meta roja y estrella dorada de consecución, fondo transparente.

