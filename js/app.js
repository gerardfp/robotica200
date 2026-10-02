// js/app.js - Lógica interactiva para la plataforma EduRobótica Docente

// Obtener datos globales cargados
const getTutorials = () => window.TUTORIALS || [];
const getGuides = () => window.DIDACTIC_GUIDES || [];
const getResources = () => window.CLASSROOM_RESOURCES || [];

// Estado global de la aplicación
const state = {
  currentTab: 'tutorials',
  selectedPlatform: 'all',
  selectedLevel: 'all',
  searchQuery: '',
  theme: localStorage.getItem('edurobotica_theme') || 'light',
  projectorMode: false,
  activeTutorial: null,
  activeGuide: null,
  // Simulador
  sim: {
    robotPos: 10,
    obstaclePos: 75,
    speed: 40,
    running: false,
    interval: null,
    currentStep: 0,
    stateMessage: 'Robot listo en línea de salida. Esperando orden.'
  }
};

// Inicialización cuando carga el DOM
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();
  renderTutorials();
  renderGuides();
  renderResources();
  initSimulator();
  initCalculator();
  generateLearningSituation(); // Genera una por defecto
});

// ==========================================
// TEMA Y MODO PROYECTOR
// ==========================================
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeIcon();
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('edurobotica_theme', state.theme);
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) {
    icon.textContent = state.theme === 'light' ? '🌙' : '☀️';
  }
}

function toggleProjectorMode() {
  state.projectorMode = !state.projectorMode;
  document.body.classList.toggle('projector-mode', state.projectorMode);
  const btn = document.getElementById('btn-projector-toggle');
  if (btn) {
    btn.innerHTML = state.projectorMode ? '🖥️ Salir Modo PDI' : '📽️ Modo PDI / Proyector';
  }
}

// ==========================================
// RENDERIZADO DE TUTORIALES
// ==========================================
function renderTutorials() {
  const container = document.getElementById('tutorials-grid');
  if (!container) return;

  const tutorials = getTutorials();
  const filtered = tutorials.filter(tut => {
    const matchPlatform = state.selectedPlatform === 'all' || tut.platform === state.selectedPlatform;
    const matchLevel = state.selectedLevel === 'all' || tut.level === state.selectedLevel;
    const matchQuery = state.searchQuery === '' || 
      tut.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      tut.summary.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      tut.steamTags.some(t => t.toLowerCase().includes(state.searchQuery.toLowerCase()));
    
    return matchPlatform && matchLevel && matchQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
        <span style="font-size: 2.5rem;">🔍</span>
        <h3 style="margin-top: 0.5rem;">No se encontraron tutoriales con esos criterios</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Prueba a cambiar los filtros de plataforma o nivel educativo.</p>
        <button class="btn btn-outline" style="margin-top: 1rem;" id="btn-reset-filters">Limpiar Filtros</button>
      </div>
    `;
    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.selectedPlatform = 'all';
        state.selectedLevel = 'all';
        state.searchQuery = '';
        const searchInput = document.getElementById('search-tutorials');
        if (searchInput) searchInput.value = '';
        updateActiveChips();
        renderTutorials();
      });
    }
    return;
  }

  container.innerHTML = filtered.map(tut => `
    <article class="card-tutorial" data-id="${tut.id}">
      <div class="card-badge-row">
        <span class="platform-pill">${tut.platformName}</span>
        <span class="level-pill">${tut.duration}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${tut.title}</h3>
        <p class="card-subtitle">${tut.subtitle}</p>
        <div class="card-tags">
          ${tut.steamTags.map(tag => `<span class="mini-tag">#${tag}</span>`).join('')}
        </div>
      </div>
      <div class="card-footer">
        <span class="card-meta">
          <span>📶 ${tut.difficulty}</span>
        </span>
        <button class="btn btn-outline btn-sm view-tutorial-btn" data-id="${tut.id}">
          Ver Tutorial 📖
        </button>
      </div>
    </article>
  `).join('');

  // Eventos de apertura de modal
  container.querySelectorAll('.view-tutorial-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openTutorialModal(id);
    });
  });
}

// ==========================================
// MODAL DE TUTORIAL DETALLADO
// ==========================================
function openTutorialModal(id) {
  const tutorials = getTutorials();
  const tut = tutorials.find(t => t.id === id);
  if (!tut) return;

  state.activeTutorial = tut;
  const modal = document.getElementById('tutorial-modal');
  const title = document.getElementById('tut-modal-title');
  const content = document.getElementById('tut-modal-content');

  title.textContent = tut.title;

  content.innerHTML = `
    <!-- Cabecera de metadatos del tutorial -->
    <div style="background: var(--bg-card-subtle); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between;">
      <div>
        <strong>Plataforma:</strong> ${tut.platformName} | 
        <strong>Nivel:</strong> ${tut.levelName} | 
        <strong>Duración:</strong> ${tut.duration}
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-outline btn-sm" id="btn-print-tutorial">🖨️ Imprimir Ficha de Aula</button>
      </div>
    </div>

    <!-- Pestañas del Modal -->
    <div class="modal-tabs">
      <button class="modal-tab-btn active" data-tab="tab-tut-step">1. Montaje & Conexiones</button>
      <button class="modal-tab-btn" data-tab="tab-tut-code">2. Programación & Bloques</button>
      <button class="modal-tab-btn" data-tab="tab-tut-pedagogy">3. Didáctica & Errores Frecuentes</button>
    </div>

    <!-- Panel 1: Montaje y Esquema -->
    <div class="tab-pane active" id="tab-tut-step">
      <h4 style="margin-bottom: 0.75rem;">🎯 Objetivos de Aprendizaje</h4>
      <ul style="padding-left: 1.25rem; margin-bottom: 1.25rem;">
        ${tut.learningGoals.map(goal => `<li style="margin-bottom: 0.35rem;">${goal}</li>`).join('')}
      </ul>

      <h4 style="margin-bottom: 0.75rem;">📦 Lista de Materiales por Equipo</h4>
      <ul style="padding-left: 1.25rem; margin-bottom: 1.5rem;">
        ${tut.materials.map(mat => `<li style="margin-bottom: 0.35rem;">${mat}</li>`).join('')}
      </ul>

      <h4 style="margin-bottom: 0.5rem;">⚡ Esquema de Conexiones Interactivo</h4>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.75rem;">${tut.schematic.description}</p>
      
      <div class="schematic-box">
        ${tut.schematic.diagramSvg}
      </div>

      <h4 style="margin-bottom: 0.5rem;">Pinout y Cableado Detallado:</h4>
      <div class="table-responsive">
        <table class="edu-table">
          <thead>
            <tr>
              <th>Origen (Placa)</th>
              <th>Destino (Componente)</th>
              <th>Color Sugerido</th>
              <th>Función Técnica</th>
            </tr>
          </thead>
          <tbody>
            ${tut.schematic.connections.map(conn => `
              <tr>
                <td><strong>${conn.from}</strong></td>
                <td>${conn.to}</td>
                <td><span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:${getColorHex(conn.color)}; vertical-align:middle; margin-right:5px;"></span>${conn.color}</td>
                <td style="color: var(--text-muted);">${conn.note}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Panel 2: Código y Bloques -->
    <div class="tab-pane" id="tab-tut-code">
      <div style="margin-bottom: 1rem;">
        <h4>${tut.codeBlocks.makeCodeDescription}</h4>
      </div>
      
      ${tut.codeBlocks.blocksHtml}

      <div class="code-editor-box">
        <div class="code-editor-header">
          <span>Código Equivalente / Avanzado</span>
          <button class="btn btn-outline btn-sm" id="btn-copy-code" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;">📋 Copiar Código</button>
        </div>
        <pre class="code-pre"><code id="code-snippet">${escapeHtml(tut.codeBlocks.pythonCode)}</code></pre>
      </div>
    </div>

    <!-- Panel 3: Didáctica y Docencia -->
    <div class="tab-pane" id="tab-tut-pedagogy">
      <h4 style="margin-bottom: 1rem;">💡 Guía de Apoyo Docente y Solución de Problemas en el Aula</h4>
      <div class="teacher-tips-container">
        ${tut.teacherTips.map(item => `
          <div class="tip-card">
            <div class="tip-title">⚠️ ${item.title}</div>
            <p style="font-size: 0.95rem;">${item.tip}</p>
          </div>
        `).join('')}
      </div>

      <div style="background: var(--primary-subtle); padding: 1.25rem; border-radius: var(--radius-md); margin-top: 1.5rem;">
        <h5 style="color: var(--primary); font-weight: 700; margin-bottom: 0.5rem;">🤝 Dinámica de Roles Sugerida</h5>
        <p style="font-size: 0.9rem; color: var(--text-main);">
          Organiza a los estudiantes en parejas o tríos: 
          <strong>Alumno A:</strong> Programación y pruebas de código. 
          <strong>Alumno B:</strong> Conexión de cables y manipulación física. 
          <strong>Alumno C:</strong> Cuaderno de bitácora y verificación de la lista de comprobación de seguridad.
        </p>
      </div>
    </div>
  `;

  setupModalTabs(content);

  const copyBtn = content.querySelector('#btn-copy-code');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(tut.codeBlocks.pythonCode);
      copyBtn.textContent = '✅ ¡Copiado!';
      setTimeout(() => { copyBtn.textContent = '📋 Copiar Código'; }, 2000);
    });
  }

  const printBtn = content.querySelector('#btn-print-tutorial');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  modal.classList.add('active');
}

function setupModalTabs(container) {
  const tabBtns = container.querySelectorAll('.modal-tab-btn');
  const panes = container.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = container.querySelector(`#${btn.getAttribute('data-tab')}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

function getColorHex(colorName) {
  const map = {
    amarillo: '#eab308',
    rojo: '#ef4444',
    negro: '#1e293b',
    azul: '#3b82f6',
    verde: '#10b981',
    blanco: '#94a3b8',
    naranja: '#f97316'
  };
  return map[colorName.toLowerCase()] || '#64748b';
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================
// RENDERIZADO DE GUÍAS DIDÁCTICAS
// ==========================================
function renderGuides() {
  const container = document.getElementById('guides-grid');
  if (!container) return;

  const guides = getGuides();
  container.innerHTML = guides.map(guide => `
    <article class="card-guide">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
        <span class="platform-pill" style="background:var(--accent-subtle); color:var(--accent);">${guide.levelName}</span>
        <span class="level-pill">⏱️ ${guide.duration}</span>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">${guide.title}</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.75rem;"><strong>Metodología:</strong> ${guide.methodology}</p>
      
      <div class="guide-challenge">
        <strong>Reto STEAM:</strong> "${guide.challenge}"
      </div>

      <div class="competencies-pills">
        ${guide.keyCompetencies.map(c => `<span class="comp-badge" title="${c.name}">${c.code}</span>`).join('')}
      </div>

      <div style="margin-top:auto; padding-top: 1rem; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:0.8rem; color:var(--text-muted);">Incluye rúbrica y sesiones</span>
        <button class="btn btn-outline btn-sm view-guide-btn" data-id="${guide.id}">
          Ver Guía Completa 📋
        </button>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('.view-guide-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openGuideModal(btn.getAttribute('data-id'));
    });
  });
}

function openGuideModal(id) {
  const guides = getGuides();
  const guide = guides.find(g => g.id === id);
  if (!guide) return;

  state.activeGuide = guide;
  const modal = document.getElementById('guide-modal');
  const title = document.getElementById('guide-modal-title');
  const content = document.getElementById('guide-modal-content');

  title.textContent = guide.title;

  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem;">
      <div>
        <span class="platform-pill">${guide.levelName}</span>
        <span class="level-pill" style="margin-left: 0.5rem;">${guide.duration}</span>
      </div>
      <button class="btn btn-primary btn-sm" id="btn-print-guide">🖨️ Imprimir Guía Oficial (A4)</button>
    </div>

    <div class="guide-challenge" style="font-size: 1rem; margin-bottom: 1.5rem;">
      <strong>Pregunta Motriz / Desafío:</strong> ${guide.challenge}
    </div>

    <h4 style="margin-bottom: 0.75rem;">🎯 Competencias Clave y Conexión Curricular</h4>
    <div class="table-responsive">
      <table class="edu-table">
        <thead>
          <tr>
            <th>Competencia</th>
            <th>Descripción Curricular en la Situación de Aprendizaje</th>
          </tr>
        </thead>
        <tbody>
          ${guide.keyCompetencies.map(c => `
            <tr>
              <td><strong>${c.code}</strong> - ${c.name}</td>
              <td style="color: var(--text-muted);">${c.desc}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <h4 style="margin: 1.5rem 0 0.75rem;">👥 Roles de Equipo Cooperativo</h4>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
      ${guide.roles.map(r => `
        <div style="background: var(--bg-card-subtle); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem;">
          <h5 style="color: var(--primary); font-weight: 700; margin-bottom: 0.35rem;">${r.role}</h5>
          <p style="font-size: 0.85rem; color: var(--text-muted);">${r.desc}</p>
        </div>
      `).join('')}
    </div>

    <h4 style="margin: 1.5rem 0 0.75rem;">📅 Secuencia Didáctica Sesión a Sesión</h4>
    <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
      ${guide.sessions.map(s => `
        <div style="border-left: 3px solid var(--primary); padding-left: 1rem; background: var(--bg-card-subtle); padding: 0.85rem 1rem; border-radius: 0 var(--radius-md) var(--radius-md) 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
            <strong>${s.title}</strong>
            <span style="font-size: 0.75rem; color: var(--text-muted);">⏱️ ${s.duration}</span>
          </div>
          <p style="font-size: 0.9rem; color: var(--text-main); margin-bottom: 0.35rem;">${s.activities}</p>
          <div style="font-size: 0.8rem; color: var(--primary); font-weight: 600;">Entregable: ${s.deliverable}</div>
        </div>
      `).join('')}
    </div>

    <h4 style="margin: 1.5rem 0 0.75rem;">♿ Medidas DUA (Diseño Universal para el Aprendizaje)</h4>
    <ul style="padding-left: 1.25rem; margin-bottom: 1.5rem;">
      ${guide.duaMeasures.map(m => `
        <li style="margin-bottom: 0.4rem; font-size: 0.9rem;">
          <strong>${m.principle}:</strong> ${m.measure}
        </li>
      `).join('')}
    </ul>

    <h4 style="margin: 1.5rem 0 0.75rem;">📊 Rúbrica de Evaluación Analítica Formativa</h4>
    <div class="table-responsive">
      <table class="edu-table">
        <thead>
          <tr>
            <th>Criterio y Peso</th>
            <th>Insuficiente (1-4)</th>
            <th>Básico (5)</th>
            <th>Notable (6-8)</th>
            <th>Excelente (9-10)</th>
          </tr>
        </thead>
        <tbody>
          ${guide.rubric.criteria.map(crit => `
            <tr>
              <td><strong>${crit.name}</strong><br><small style="color:var(--primary); font-weight:700;">${crit.weight}</small></td>
              <td style="font-size:0.85rem; color:var(--text-muted);">${crit.levels.insufficient}</td>
              <td style="font-size:0.85rem; color:var(--text-muted);">${crit.levels.basic}</td>
              <td style="font-size:0.85rem; color:var(--text-muted);">${crit.levels.good}</td>
              <td style="font-size:0.85rem; color:var(--primary-text); font-weight:600;">${crit.levels.excellent}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  const printBtn = content.querySelector('#btn-print-guide');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  modal.classList.add('active');
}

// ==========================================
// RENDERIZADO DE RECURSOS DESCARGABLES
// ==========================================
function renderResources() {
  const container = document.getElementById('resources-container');
  if (!container) return;

  const resources = getResources();
  container.innerHTML = resources.map(res => `
    <div class="card-guide" style="border-top: 4px solid var(--primary);">
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">${res.icon}</div>
      <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;">${res.title}</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">${res.description}</p>
      
      <div style="margin-top: auto;">
        <button class="btn btn-outline btn-sm open-resource-btn" data-id="${res.id}" style="width: 100%;">
          Ver y Utilizar 📄
        </button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.open-resource-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openResourceModal(btn.getAttribute('data-id'));
    });
  });
}

function openResourceModal(id) {
  const resources = getResources();
  const res = resources.find(r => r.id === id);
  if (!res) return;

  const modal = document.getElementById('guide-modal');
  const title = document.getElementById('guide-modal-title');
  const content = document.getElementById('guide-modal-content');

  title.textContent = res.title;

  let bodyHtml = '';

  if (res.id === 'tarjetas-roles-cooperativo') {
    bodyHtml = `
      <p style="margin-bottom: 1rem; color: var(--text-muted);">${res.content.instructions}</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem;">
        ${res.content.roles.map(r => `
          <div style="border: 2px solid ${r.color}; border-radius: var(--radius-md); padding: 1.25rem; background: var(--bg-card);">
            <h4 style="color: ${r.color}; margin-bottom: 0.25rem;">${r.title}</h4>
            <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: bold; color: var(--text-muted); display: block; margin-bottom: 0.75rem;">${r.badge}</span>
            <ul style="padding-left: 1.1rem; font-size: 0.85rem; color: var(--text-main);">
              ${r.duties.map(d => `<li style="margin-bottom: 0.35rem;">${d}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
      <div style="margin-top: 1.5rem; text-align: right;">
        <button class="btn btn-primary" onclick="window.print()">🖨️ Imprimir Tarjetas de Equipo</button>
      </div>
    `;
  } else if (res.id === 'diana-autoevaluacion') {
    bodyHtml = `
      <p style="margin-bottom: 1rem; color: var(--text-muted);">Pide a cada estudiante que pinte con un punto del 1 al 4 cada eje y una los puntos para formar la superficie de aprendizaje de su equipo.</p>
      <div style="text-align: center; margin: 1.5rem 0;">
        ${res.content.svgDiana}
      </div>
      <div style="margin-top: 1.5rem; text-align: right;">
        <button class="btn btn-primary" onclick="window.print()">🖨️ Imprimir Dianas de Evaluación</button>
      </div>
    `;
  } else if (res.id === 'guia-compra-centros') {
    bodyHtml = `
      <div class="table-responsive">
        <table class="edu-table">
          <thead>
            <tr>
              <th>Plataforma</th>
              <th>Edad / Etapa</th>
              <th>Coste Aprox.</th>
              <th>Software</th>
              <th>Ventajas Clave</th>
              <th>Ratio Alumno/Kit</th>
            </tr>
          </thead>
          <tbody>
            ${res.content.platforms.map(p => `
              <tr>
                <td><strong>${p.name}</strong></td>
                <td>${p.age}</td>
                <td><span style="color: var(--primary); font-weight: 700;">${p.costPerUnit}</span></td>
                <td>${p.software}</td>
                <td style="font-size: 0.85rem;">${p.pros}</td>
                <td><span class="mini-tag">${p.recommendedRatio}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  content.innerHTML = bodyHtml;
  modal.classList.add('active');
}

// ==========================================
// GENERADOR DE SITUACIONES DE APRENDIZAJE
// ==========================================
function generateLearningSituation() {
  const level = document.getElementById('gen-level')?.value || 'primaria-sup';
  const tech = document.getElementById('gen-tech')?.value || 'microbit';
  const topic = document.getElementById('gen-topic')?.value || 'sostenibilidad';
  const sessions = parseInt(document.getElementById('gen-sessions')?.value || '5', 10);

  const preview = document.getElementById('generator-preview-content');
  if (!preview) return;

  const topicsMap = {
    sostenibilidad: {
      title: 'Misión Eco-Planeta: Automatización y Gestión de Residuos',
      challenge: '¿Cómo diseñar un dispositivo inteligente que reduzca el desperdicio o fomente el reciclaje en nuestro colegio?'
    },
    smartcity: {
      title: 'Ciudades Inclusivas del Futuro',
      challenge: '¿De qué forma la robótica puede eliminar barreras físicas y sensoriales para personas con discapacidad en nuestro barrio?'
    },
    espacio: {
      title: 'Exploración Lunar: Rover Autónomo de Muestras',
      challenge: '¿Cómo programar un robot explorador para recolectar minerales en terrenos hostiles sin comunicación en tiempo real?'
    },
    agricultura: {
      title: 'Bio-Invernadero Inteligente Escolar',
      challenge: '¿Cómo optimizar el riego y la luz de un cultivo hidropónico escolar con sensores de bajo consumo?'
    }
  };

  const techNames = {
    microbit: 'BBC micro:bit',
    arduino: 'Arduino UNO / C++',
    mbot: 'Makeblock mBot',
    scratch: 'Scratch 3.0 + Makey Makey',
    beebot: 'Bee-Bot / Robótica Desconectada',
    lego: 'LEGO Education SPIKE'
  };

  const selectedTopic = topicsMap[topic] || topicsMap.sostenibilidad;
  const techName = techNames[tech] || tech;

  preview.innerHTML = `
    <div style="background: var(--bg-card); padding: 1.5rem; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <span class="platform-pill" style="margin-bottom: 0.35rem; display: inline-block;">Situación de Aprendizaje Personalizada</span>
          <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--text-main);">${selectedTopic.title}</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Tecnología: <strong>${techName}</strong> | Duración: <strong>${sessions} sesiones</strong></p>
        </div>
        <button class="btn btn-outline btn-sm" id="btn-copy-generated">📋 Copiar Guía</button>
      </div>

      <div class="guide-challenge" style="margin-bottom: 1.25rem;">
        <strong>Reto Conductor:</strong> "${selectedTopic.challenge}"
      </div>

      <h4 style="margin-bottom: 0.5rem; font-size: 1rem;">📅 Planificación Temporal (${sessions} Sesiones):</h4>
      <div style="display: grid; gap: 0.6rem; margin-bottom: 1.25rem;">
        ${Array.from({ length: sessions }).map((_, i) => {
          const sessionTitles = [
            'Sesión 1: Planteamiento del reto, empatía y formación de equipos cooperativos',
            'Sesión 2: Investigación técnica y diseño del diagrama de flujo',
            'Sesión 3: Montaje físico de sensores y actuadores con ' + techName,
            'Sesión 4: Programación de la lógica, condicionales y depuración',
            'Sesión 5: Prototipado del chasis/maqueta y pruebas en entorno simulado',
            'Sesión 6: Test de estrés y optimización de código',
            'Sesión 7: Documentación de la memoria técnica y cuaderno de bitácora',
            'Sesión 8: Feria STEAM del Centro y Coevaluación con rúbrica'
          ];
          return `
            <div style="font-size: 0.88rem; padding: 0.5rem 0.75rem; background: var(--bg-card-subtle); border-radius: var(--radius-sm); border-left: 3px solid var(--primary);">
              <strong>Sesión ${i + 1}:</strong> ${sessionTitles[i] || 'Sesión práctica de iteración'}
            </div>
          `;
        }).join('')}
      </div>

      <h4 style="margin-bottom: 0.5rem; font-size: 1rem;">🎯 Competencias Específicas Evaluadas:</h4>
      <p style="font-size: 0.88rem; color: var(--text-muted);">
        <strong>Competencia Digital (CD):</strong> Resolución algorítmica y gestión de dispositivos de hardware abierto.<br>
        <strong>Competencia STEM:</strong> Aplicación de variables físicas (resistencia, luz, cinemática) en el diseño ingenieril.<br>
        <strong>Competencia Personal y Social (CPSAA):</strong> Distribución efectiva de roles y mediación pacífica de errores técnicos.
      </p>
    </div>
  `;

  const copyBtn = document.getElementById('btn-copy-generated');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = `SITUACIÓN DE APRENDIZAJE: ${selectedTopic.title}\nTecnología: ${techName} (${sessions} sesiones)\nReto: ${selectedTopic.challenge}`;
      navigator.clipboard.writeText(textToCopy);
      copyBtn.textContent = '✅ ¡Copiado!';
      setTimeout(() => { copyBtn.textContent = '📋 Copiar Guía'; }, 2000);
    });
  }
}

// ==========================================
// CALCULADORA DE KITS STEAM PARA EL AULA
// ==========================================
function initCalculator() {
  const studentsInput = document.getElementById('calc-students');
  const kitSelect = document.getElementById('calc-kit-type');

  if (!studentsInput || !kitSelect) return;

  const updateCalc = () => {
    const students = parseInt(studentsInput.value, 10) || 24;
    const kitType = kitSelect.value;

    const kitData = {
      microbit: { name: 'BBC micro:bit Club (10 packs)', unitCost: 30, studentsPerKit: 2 },
      arduino: { name: 'Kit Arduino UNO Starter Docente', unitCost: 35, studentsPerKit: 2 },
      mbot: { name: 'Makeblock mBot 2 / Explorer', unitCost: 130, studentsPerKit: 3 },
      lego: { name: 'LEGO SPIKE Prime Set', unitCost: 390, studentsPerKit: 4 },
      beebot: { name: 'Bee-Bot + Tapete Infantil', unitCost: 95, studentsPerKit: 4 }
    };

    const chosen = kitData[kitType] || kitData.microbit;
    const recommendedKits = Math.ceil(students / chosen.studentsPerKit);
    const spareKits = Math.max(1, Math.round(recommendedKits * 0.1));
    const totalKits = recommendedKits + spareKits;
    const estimatedCost = totalKits * chosen.unitCost;
    const groupsCount = recommendedKits;

    const resKits = document.getElementById('res-total-kits');
    const resCost = document.getElementById('res-total-cost');
    const resGroups = document.getElementById('res-groups');
    const resTip = document.getElementById('res-advice');

    if (resKits) resKits.textContent = `${totalKits} kits (${recommendedKits} activos + ${spareKits} de repuesto)`;
    if (resCost) resCost.textContent = `${estimatedCost.toLocaleString('es-ES')} €`;
    if (resGroups) resGroups.textContent = `${groupsCount} equipos de ${chosen.studentsPerKit} alumnos`;
    if (resTip) {
      resTip.innerHTML = `
        💡 <strong>Recomendación pedagógica:</strong> 
        Para ${students} alumnos con ${chosen.name}, distribuye en <strong>${groupsCount} grupos</strong>. 
        Asigna siempre 1 responsable de material por grupo para evitar pérdidas de cables y sensores.
      `;
    }
  };

  studentsInput.addEventListener('input', updateCalc);
  kitSelect.addEventListener('change', updateCalc);
  updateCalc();
}

// ==========================================
// SIMULADOR INTERACTIVO DE ROBÓTICA
// ==========================================
function initSimulator() {
  const robotEl = document.getElementById('sim-robot');
  const obstacleEl = document.getElementById('sim-obstacle');
  const btnStep = document.getElementById('btn-sim-step');
  const btnRun = document.getElementById('btn-sim-run');
  const btnReset = document.getElementById('btn-sim-reset');
  const logEl = document.getElementById('sim-status-log');

  if (!robotEl || !obstacleEl) return;

  const updateSimView = () => {
    robotEl.style.left = `${state.sim.robotPos}%`;
    obstacleEl.style.left = `${state.sim.obstaclePos}%`;
    if (logEl) logEl.textContent = state.sim.stateMessage;
  };

  const stepSimulation = () => {
    const distance = state.sim.obstaclePos - state.sim.robotPos - 8;

    if (distance <= 6) {
      state.sim.stateMessage = `🛑 ¡OBSTÁCULO DETECTADO! Ultrasonidos: ${distance * 2} cm. Frenado de emergencia activado.`;
      robotEl.style.transform = 'scale(1.1)';
      robotEl.style.background = '#dc2626';
      stopSimulation();
    } else {
      state.sim.robotPos += 4;
      state.sim.stateMessage = `🟢 Avanzando en línea recta. Distancia al obstáculo: ${Math.round(distance * 2)} cm. Motores: 50%`;
      robotEl.style.transform = 'scale(1)';
      robotEl.style.background = '#0284c7';
    }
    updateSimView();
  };

  const startSimulation = () => {
    if (state.sim.running) return;
    state.sim.running = true;
    if (btnRun) btnRun.textContent = '⏸️ Pausar Simulación';
    state.sim.interval = setInterval(stepSimulation, 400);
  };

  const stopSimulation = () => {
    state.sim.running = false;
    if (btnRun) btnRun.textContent = '▶️ Iniciar Bucle';
    if (state.sim.interval) clearInterval(state.sim.interval);
  };

  const resetSimulation = () => {
    stopSimulation();
    state.sim.robotPos = 10;
    state.sim.stateMessage = 'Robot reiniciado en posición inicial. Listo para el algoritmo.';
    robotEl.style.transform = 'scale(1)';
    robotEl.style.background = '#0284c7';
    updateSimView();
  };

  if (btnStep) btnStep.addEventListener('click', stepSimulation);
  if (btnRun) {
    btnRun.addEventListener('click', () => {
      if (state.sim.running) stopSimulation();
      else startSimulation();
    });
  }
  if (btnReset) btnReset.addEventListener('click', resetSimulation);

  updateSimView();
}

// ==========================================
// EVENT LISTENERS GENERALES
// ==========================================
function setupEventListeners() {
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  const projBtn = document.getElementById('btn-projector-toggle');
  if (projBtn) projBtn.addEventListener('click', toggleProjectorMode);

  const bannerProjExit = document.getElementById('btn-exit-projector-banner');
  if (bannerProjExit) bannerProjExit.addEventListener('click', toggleProjectorMode);

  const searchInput = document.getElementById('search-tutorials');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      renderTutorials();
    });
  }

  document.querySelectorAll('.chip[data-platform]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-platform]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.selectedPlatform = chip.getAttribute('data-platform');
      renderTutorials();
    });
  });

  const levelSelect = document.getElementById('filter-level');
  if (levelSelect) {
    levelSelect.addEventListener('change', (e) => {
      state.selectedLevel = e.target.value;
      renderTutorials();
    });
  }

  const genBtn = document.getElementById('btn-generate-situation');
  if (genBtn) {
    genBtn.addEventListener('click', generateLearningSituation);
  }

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    }
  });
}

function updateActiveChips() {
  document.querySelectorAll('.chip[data-platform]').forEach(c => {
    c.classList.toggle('active', c.getAttribute('data-platform') === state.selectedPlatform);
  });
  const levelSelect = document.getElementById('filter-level');
  if (levelSelect) levelSelect.value = state.selectedLevel;
}
