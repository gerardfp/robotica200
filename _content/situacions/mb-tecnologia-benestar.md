---
active: true
title: "Tecnologia per al benestar quotidià"
description: "Investiguem necessitats de benestar i dissenyem un prototip responsable amb micro:bit, sense fer diagnòstics ni recollir dades de salut."
robot: "microbit"
robot_label: "micro:bit"
cycle: "tercer-cicle"
cycle_label: "Tercer cicle"
subject: "tecnologia"
subject_label: "Tecnologia, Ciències i Ciutadania"
theme: "ciutadania"
theme_label: "Disseny responsable i benestar"
duration: "5 sessions"
challenge: "Com podem dissenyar una ajuda tecnològica senzilla que facilite una rutina de benestar sense vigilar ni diagnosticar ningú?"
---

![Prototip de cartó amb micro:bit i polsador gran per demanar ajuda o una pausa a l’aula.](../../_assets/imatges/sa-mb-tecnologia-benestar.webp)

_El prototip comunica una petició triada per l’usuari; no avalua salut ni substitueix l’acompanyament humà._

## 🌱 Situació i intenció

El centre vol millorar una rutina quotidiana: demanar una pausa, recordar una tasca de descans visual o avisar discretament que cal suport. Els equips investiguen exemples de tecnologia de salut i benestar, delimiten què pot fer un prototip escolar i dissenyen una ajuda amb micro:bit. El repte parteix de necessitats fictícies o consultades voluntàriament amb persones adultes; ningú ha de revelar informació personal.

La proposta transforma la unitat oficial en un projecte de disseny accessible. La placa mostra icones o missatges breus quan l’usuari prem un botó; la decisió de quan usar-la continua sent seua. No hi ha sensors corporals, monitoratge, diagnòstic ni registre d’identitat.

## 🎯 Aprenentatges i vocabulari

- Investigar un repte de rutina amb situacions fictícies i criteris definits per les persones usuàries.
- Dissenyar un prototip opcional amb entrada, resposta, cancel·lació i aturada accessibles.
- Provar diversos casos d’ús i revisar si la persona manté el control i pot ignorar o desactivar l’ajuda.
- Comunicar que el prototip no diagnostica, vigila ni substitueix el suport d’una persona adulta.

## 📅 Seqüència didàctica · 5 sessions

### **Sessió 1 · Investiguem tecnologia per a la salut (Health of the nation).**

Analitzeu casos de tecnologia que donen suport a la comunicació, l’accessibilitat o rutines de benestar. Distingiu benefici, usuari, dades necessàries, risc i supervisió humana. Creeu un glossari de salut digital sense buscar ni compartir dades personals de l’aula.

### **Sessió 2 · Definim una necessitat i ideem solucions (Health tech innovations).**

Trieu una situació fictícia —per exemple, demanar una pausa o recordar una rutina— i redacteu criteris d’èxit amb una persona usuària voluntària o un perfil inventat. Dibuixeu tres idees; compareu-les per accessibilitat, privacitat, cost i facilitat d’aturada; seleccioneu-ne una i construïu un model de cartó.

### **Sessió 3 · Algorisme, programa i depuració (Prototyping innovations).**

Escriviu pseudocodi d’entrada, resposta, retorn a l’estat inicial i cancel·lació. Programeu el botó A de micro:bit perquè mostre una icona; proveu polsacions curtes, llargues i repetides. Si es necessita un avís sonor, useu només un accessori compatible i volum baix, amb alternativa visual. Registreu errors del prototip, no de les persones.

### **Sessió 4 · Completem i preparem la presentació (Preparing presentations).**

Refineu el muntatge, afegiu instruccions clares i feu una prova d’ús amb consentiment. L’equip prepara una explicació de necessitat, límits i decisió de privacitat, amb diagrama del programa i una demostració sense dades personals.

### **Sessió 5 · Mostra i avaluació (Health tech showcase).**

Presenteu el prototip a una audiència, rebeu comentaris sobre accessibilitat i claredat, i reviseu-lo. Acabeu amb una pregunta crítica: en quin cas no seria adequat usar-lo i quina persona o servei hauria de donar suport real?

## 🧰 Materials i programació

Micro:bit, ordinador amb MakeCode, cable USB i cartó reutilitzat. La placa incorpora botons, matriu LED, acceleròmetre i sensor de llum; aquesta proposta només necessita els botons i la matriu. Si es munta un interruptor extern, reviseu connexions i pin disponible abans d’afirmar-ne la compatibilitat. La simulació de MakeCode i un guió de paper permeten provar l’algorisme sense placa.

## 🛡️ Privacitat, seguretat i inclusió

No recolliu diagnòstics, noms, imatges, veu, ritmes corporals ni registres d’ús. La persona ha de poder no participar, aturar el dispositiu i triar si vol resposta visual o sonora. Eviteu llums intermitents ràpides i sons inesperats; oferiu instruccions en text, pictogrames i demostració. Expliqueu que és un prototip educatiu, no un dispositiu mèdic ni un servei d’emergència.

## 🧪 Evidències i avaluació

Carpeta de casos investigats, mapa de necessitat fictícia, tres esbossos, criteris de selecció, pseudocodi, programa, proves d’ús voluntàries i millores. Valoreu la justificació del disseny, la depuració, l’accessibilitat i la capacitat d’explicar dades que deliberadament no s’han recollit.

## Procés de disseny en cinc fases

**Investigar:** analitzeu tres casos preparats pel docent —una ajuda per comunicar una elecció, un temporitzador de pausa i un senyal d'accessibilitat— i completeu una fitxa: quin problema pràctic aborda?, qui decideix activar-lo?, quines dades necessita?, com s'atura?, qui pot donar suport si no funciona? No investigueu la salut de companys ni demaneu relats personals. **Idear:** redacteu la necessitat com una oportunitat de disseny, no com una etiqueta sobre una persona; per exemple, «cal una manera senzilla d'indicar que vull fer una pausa». Dibuixeu tres solucions i compareu-les amb criteris de claredat, control de l'usuari, privacitat, materials i facilitat d'aturada.

**Prototipar:** construïu una maqueta de cartó amb un botó de paper i dues possibles eixides LED. Escriviu pseudocodi que incloga inici, acció, resposta, cancel·lació i estat de repòs. Després programeu un botó real o simulat i proveu cinc casos: activació breu, activació repetida, cap activació, reinici i cancel·lació. Si apareix una resposta inesperada, reviseu l'esdeveniment i l'estat del programa; no canvieu la necessitat definida per adaptar-la a un error del codi.

**Preparar la presentació:** creeu una fitxa d'ús amb el propòsit, els passos, com demanar ajuda i què no fa el dispositiu. El text ha de dir clarament que la persona controla quan usa el prototip i que no envia cap avís a un servei real. **Mostrar i revisar:** una audiència prova el prototip amb consentiment i pot rebutjar la prova; aporta retorn sobre si sap iniciar-lo, cancel·lar-lo i entendre la icona. L'equip incorpora un canvi i explica què ha millorat i què encara no ha resolt.

## Criteris d'avaluació i límits

Valoreu si l'equip defineix una necessitat sense estigmatitzar, considera opcions abans de construir, representa tots els estats del programa, prova entrades vàlides i repetides, incorpora una alternativa accessible i declara un límit concret. El prototip només és una demostració de comunicació local amb micro:bit. No contacta amb famílies, personal sanitari ni emergències, i no pot substituir una conversa o un pla de suport del centre. Esborreu qualsevol projecte de prova al final segons les normes del centre.

## 🔗 Unitat oficial adaptada

Adapta les cinc lliçons de [Health tech](https://microbit.org/teach/lessons/health-tech-unit-of-work/): *Health of the nation*, *Health tech innovations*, *Prototyping innovations*, *Preparing presentations* i *Health tech showcase*. El context de rutines escolars i el prototip de comunicació són propis; s’han exclòs aplicacions diagnòstiques i mesures de salut.
