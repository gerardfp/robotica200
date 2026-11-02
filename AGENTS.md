# Regles del Projecte Robòtica²⁰⁰

## 🔤 Guia Tipogràfica Oficial
- **Títols i encapçalaments:** Font **"Sora"** (`font-family: var(--font-heading)`). S'aplica a tots els `h1-h6`, nom de marca (`.logo-name`), títols de targetes (`.pillar-title`, `.item-title`), capçaleres de detall (`.detail-page-title`, `.detail-section h4`, `.robot-profile-title`, `.robot-tutorials-heading h3`).
- **Text continu i interfície (UI):** Font **"Plus Jakarta Sans"** (`font-family: var(--font-sans)`). S'aplica a tot el cos (`body`), botons (`.btn-primary`, `.btn-back`, `.nav-btn`), controls de filtratge (`.filter-select`), etiquetes (`.tag-badge`, `.robot-spec-pill`), textos i descripcions.

## 🏷️ Identitat Corporativa Oficial ("Robòtica per a docents")
- **Logotip / Isotip Vectorial (`_assets/icons/logo.svg`):**
  - **Barra superior:** Es mostra de manera estàtica i neta a la capçalera de totes les pàgines (`.logo-badge-img`).
  - **Favicon:** Utilitzat com a favicon oficial en format SVG (`<link rel="icon" type="image/svg+xml" href="_assets/icons/logo.svg">`).

## ☀️ Tema Clar Exclusiu (Sense Mode Fosc)
- El lloc web funciona **exclusivament en tema clar**.
- Queda absolutament descartat qualsevol selector de mode fosc (`[data-theme="dark"]`, botons d'alternança, `prefers-color-scheme`, etc.).
- Tot l'estil es basa en fons blancs nets (`#ffffff`), fons de pàgina suaus (`#f8fafc`), capçaleres hero i footers en `#ebf5fd` i contrast òptim de text (`#0f172a` i `#64748b`).

## 🎓 Nomenclatura Oficial dels Nivells Educatius (Estricte)
- La web utilitza exclusivament els 4 nivells oficials d'educació infantil i primària:
  1. **Educació Infantil** (`infantil`)
  2. **Primer cicle** (`primer-cicle`)
  3. **Segon cicle** (`segon-cicle`)
  4. **Tercer cicle** (`tercer-cicle`)
- **Queda descartada totalment l'ESO**: no s'utilitza com a filtre, etiqueta ni opció a cap activitat, robot o situació d'aprenentatge.
