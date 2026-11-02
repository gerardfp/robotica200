# Estructura dels tutorials

Cada fitxa és un fitxer Markdown a `_content/tutorials/`. Està pensada perquè una mestra o un mestre puga preparar i provar l'activitat sense experiència prèvia. Cal usar frases curtes, explicar cada acció i evitar sigles sense explicació.

Les metadades inicials indiquen, en aquest ordre, `title`, `description`, `robot`, `level`, `duration`, `order` i `image`. Després venen sempre aquests apartats:

1. **Repte i objectius:** què farà el robot i dos o tres resultats observables.
2. **Materials i preparació:** llista del que cal i què s'ha de comprovar abans de començar.
3. **Funcions del robot treballades:** les funcions que s'utilitzen i els seus límits.
4. **Seqüència guiada:** passos numerats, cadascun amb una acció clara; inclou una imatge o un exemple de programa al punt on ajuda a fer-la.
5. **Prova, depura i reflexiona:** com comprovar el resultat, què revisar si falla i preguntes breus sobre la mateixa pràctica.
6. **Accessibilitat i seguretat:** alternatives de participació i cura del material, aplicades a la pràctica.
7. **Evidències d'aprenentatge:** allò que es pot guardar o observar, sense recollir dades personals innecessàries.
8. **Fonts oficials i límits:** enllaços del fabricant i diferències de versió o d'accessoris quan siguen rellevants.

Per a micro:bit, els exemples de MakeCode usen una tanca `makecode` amb JavaScript de MakeCode. Per a SPIKE i Codey Rocky, les tanques `spikeapp` i `mblock` contenen una representació llegible dels blocs visuals, amb una ordre per línia. El text del pas explica també què cal buscar a l'aplicació: els noms poden variar segons la versió. El codi Python executable utilitza la tanca `python` i s'identifica com a tal. No s'inventen blocs digitals per a robots que es programen amb botons o peces físiques; en eixos casos es descriu la seqüència física.

Els exemples `mblock` i `spikeapp` són esquemes de les accions, no captures literals de l'aplicació. Dins de les etiquetes usen espais inseparables perquè el renderitzador actual no ajunte les paraules; cal conservar-los en editar-les. Els espais dins dels valors entre claudàtors o parèntesis es mantenen normals.

Si el renderitzador local de reserva no representa correctament un exemple MakeCode, es conserva provisionalment en una tanca `javascript` i s'indica com copiar-lo a la pestanya JavaScript de MakeCode i tornar a Blocs. Això afecta especialment sensors, ràdio i l'extensió de registre de dades. El dau de primeres passes conserva `makecode` perquè el projecte ja disposa de la seua imatge oficial en memòria cau. Cal recuperar la representació visual oficial dels altres exemples abans de considerar completa la revisió; canviar la tanca evita mostrar peces incorrectes, però no substitueix aquesta comprovació.

La prova i les preguntes han de correspondre al programa o a la seqüència realment explicats. Una simulació s'identifica com a simulació i no es presenta com una prova del maquinari.
