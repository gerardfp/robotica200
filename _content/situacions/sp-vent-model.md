---
active: true
title: "Un indicador per a llegir dades de vent"
description: "Adaptem Wind Speed de SPIKE Prime: representem dades quantitatives del vent amb una escala calibrada, condicions i direcció."
robot: "spike"
robot_label: "SPIKE Prime"
cycle: "tercer-cicle"
cycle_label: "Tercer cicle"
subject: "medi"
subject_label: "Ciències, Matemàtiques i Tecnologia"
theme: "sostenibilitat"
theme_label: "Meteorologia i dades"
duration: "3 sessions de 45–60 min"
challenge: "Com podem convertir la velocitat prevista del vent en una representació calibrada, comparable i comprensible?"
---

![Hub SPIKE Prime i indicador mecànic de vent al costat d'una pantalla que representa dades meteorològiques per categories.](../../_assets/imatges/sa-sp-vent-dades.webp)

_La maqueta mostra dades consultades al núvol; no mesura el vent que fa al pati._

## 🌬️ Repte i intenció

**Situació:** Transformem una previsió meteorològica en una representació que es puga llegir i comparar. En equips, construïm un indicador accionat per motor, calibrem l’escala i programem condicions per classificar quatre intervals inspirats en l’escala Beaufort.

> **Pregunta guia:** Com podem convertir una dada de velocitat del vent en una representació calibrada, comparable i comprensible?

> **Límit del model:** La maqueta representa dades d’una previsió per a una ubicació i una hora. No mesura el vent del pati ni és un dispositiu d’avís o seguretat.

## 🎯 Aprenentatges i vocabulari

- Interpretar una dada quantitativa de velocitat del vent i identificar-ne la font i les unitats.
- Construir i calibrar un indicador amb intervals que es puguen distingir i provar.
- Afegir una segona condició o direcció i comprovar com canvia la representació.
- Comunicar que el prototip representa dades i no mesura el vent ni substitueix els avisos oficials.

## 📅 Seqüència didàctica · 3 sessions

### **S1 · Construïm i interpretem un indicador (45–60 min).**

**Activem les idees prèvies**

- Parleu de com canvien les activitats quotidianes quan fa vent i com distingim una brisa d’un vent fort.
- Presenteu l’escala Beaufort com una classificació de referència, no com una mesura del pati.

**Construïm i observem**

- En parelles, munteu una base estable amb una agulla o placa lleugera i un motor SPIKE.
- Alineeu el motor perquè l’angle programat corresponga al sentit de la fletxa.
- Trieu una ciutat pública a l’app, llegiu la velocitat i executeu el programa inicial.
- Descriviu què mostra l’indicador i com es relaciona la dada amb la posició.

Si no hi ha consulta en viu, feu servir una taula de valors datada i identifiqueu-la com una simulació arxivada.

**Evidència:** dibuix del mecanisme, ciutat, data i unitat consultades, més una primera lectura de l’indicador.

### **S2 · Calibrem quatre intervals amb condicions (45–60 min).**

**Classifiquem abans de programar**

Ordeneu targetes de velocitat i associeu cada banda amb el color acordat. Manteniu les unitats visibles en totes les targetes:

- **Blau · força 1–3:** de 0,5 a 5,5 m/s.
- **Verd · força 4–6:** de 5,5 a 13,8 m/s.
- **Groc · força 7–9:** de 13,8 a 24,4 m/s.
- **Roig · força 10–12:** de 24,4 a 32,7 m/s.

![Quatre grups de línies de vent que augmenten d’intensitat, de blau a verd, groc i roig.](../../_assets/imatges/sa-sp-vent-beaufort.webp)

_Representació qualitativa dels quatre trams; no és una escala de mesura. Per programar, useu els valors i les unitats._

**Dissenyem, programem i provem**

1. Escriviu una taula de llindars amb unitats coherents i decidiu a quin tram pertany cada valor de frontera.
2. Programeu condicions *si / si no* perquè cada tram active el color o l’angle assignat.
3. Tracteu **0 m/s com a calma**, fora de les quatre bandes codificades.
4. Proveu valors dins de cada tram, valors propers als llindars i un valor superior al rang.
5. Anoteu si cada cas queda classificat com esperàveu i corregiu les condicions quan calga.

Cada equip explica com les condicions transformen dades contínues en grups discrets. Com a bastida, es pot començar amb dos intervals; el repte compartit és arribar als quatre i verificar-los.

**Evidència:** taula de llindars, pseudocodi, casos de prova i una correcció explicada.

### **S3 · Compareu ubicacions i afegiu direcció (45–60 min).**

**Compareu i amplieu**

- Executeu el mateix programa amb almenys dues velocitats diferents en cadascuna de tres ciutats públiques, seguint la proposta d’autoavaluació oficial.
- Compareu les categories i distingiu-les de les condicions locals del centre.
- Afegiu la direcció del vent amb fletxes a la matriu LED del hub.
- Si hi ha temps, amplieu l’indicador fins a 180° i mesureu quant tarda l’equip a recalibrar-lo. Un segon motor per al dial és opcional.

**Ampliació:** Repetiu la calibració amb una altra unitat (per exemple, km/h) o amb dades convertides. Feu explícit el factor de conversió, comproveu un valor de frontera i expliqueu com canvia el programa. Si el segon motor està disponible, construïu i programeu un dial per a la direcció; la matriu LED és l’opció base.

![Hub SPIKE Prime connectat a un motor que mou una agulla davant de quatre trams de colors: blau, verd, groc i roig; una cinta blanca representa el vent.](../../_assets/imatges/sa-sp-vent-indicador.webp)

_L’agulla representa la categoria de la previsió seleccionada; la maqueta no capta el vent de l’aula ni del pati._

Prepareu una explicació que cite font, ubicació i hora. Si és possible, contrasteu-la amb una persona experta en meteorologia o amb una font divulgativa fiable. Expliqueu què pot inferir el model i què queda fora del seu abast.

**Evidència:** comparació de tres ubicacions, programa amb velocitat i direcció, i missatge que cita la font i els límits del model.

## 🧰 Materials i preparació

**Materials:** Prepareu els elements necessaris per al muntatge, la consulta de dades i les proves.

- Hub SPIKE Prime, un motor i peces per a una base estable i un indicador lleuger.
- Ordinador o tauleta amb l’app i els blocs meteorològics al núvol.
- Targetes, paper, regla i plantilla d’angles per a l’ampliació a 180°.
- Taula de valors datada i amb unitats per si no hi ha connexió.
- Un segon motor per al dial de direcció, opcional; la matriu LED ja permet representar-la.

Abans de la sessió, confirmeu l’accés a les dades, la ciutat consultable, la unitat disponible i el funcionament del programa. Prepareu també les targetes de classificació desconnectada.

## 🧪 Evidències i avaluació

Recolliu una carpeta de procés amb:

- Predicció inicial i dibuix del muntatge.
- Registre de dades, ubicació, hora i unitats; incloeu la conversió si és necessària.
- Taula de quatre categories i programa condicional.
- Proves dels llindars, casos de frontera i revisió d’una condició.
- Comparació de tres ciutats i representació de la direcció.

**Criteris d’èxit:** l’alumnat calibra l’indicador per a la unitat emprada, justifica els límits, classifica els casos de prova i revisa el programa a partir dels resultats. En l’ampliació, combina velocitat i direcció en el programa. El retorn entre parelles assenyala una prova que falta.

**Autoavaluació:**

- **En procés:** represente dues velocitats en tres ubicacions.
- **Assolit:** classifique les quatre bandes en tres ubicacions i comprove els llindars.
- **Ampliació:** afegisc la direcció; si dispose d’un segon motor, la mostre amb un dial i el recalibre fins a 180°.

## ♿ Participació i límits

- Mostreu cada categoria amb color **i** amb una paraula, símbol, explicació oral o targeta tàctil; no depengueu només del color.
- Consulteu ciutats públiques i no introduïu ubicacions personals.
- Expliqueu que la previsió correspon a una ubicació i una hora, i no descriu necessàriament el pati.
- Davant d’una situació meteorològica adversa, seguiu els canals oficials i les indicacions del centre.

## 🔗 Lliçó oficial adaptada

La seqüència adapta [Wind Speed](https://education.lego.com/en-us/lessons/prime-life-hacks/wind-speed/), quarta lliçó de [Life Hacks](https://education.lego.com/en-us/lessons/prime-life-hacks/). Conserva el muntatge en parelles i l’alineament del motor, la consulta d’una ciutat, la representació de dades del núvol, les quatre bandes Beaufort amb condicions, la comparació d’ubicacions i l’ampliació a la direcció del vent. També incorpora la classificació desconnectada, proves dels llindars, registre de dades i límits d’ús. La situació, el registre, la programació i les il·lustracions són propis; els materials docents complets remeten a l’app SPIKE.
