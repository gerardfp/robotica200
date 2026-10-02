// js/app.js - Lògica minimalista i neta per a EduRobòtica

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouter();
  renderUnplugged();
  renderRobotics();
  initLearningSituations();
  setupModalHandlers();
});

// ==========================================
// TEMA CLAR / FOSC
// ==========================================
function initTheme() {
  const saved = localStorage.getItem('edurobotica_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);

  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('edurobotica_theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// ==========================================
// NAVEGACIÓ ENTRE ELS APARTATS
// ==========================================
function initRouter() {
  const views = {
    home: document.getElementById('view-home'),
    pc: document.getElementById('view-pc'),
    robotica: document.getElementById('view-robotica'),
    robotDetail: document.getElementById('view-robot-detail'),
    situacions: document.getElementById('view-situacions')
  };

  const navButtons = document.querySelectorAll('[data-route]');

  window.navigateTo = function(route) {
    Object.keys(views).forEach(key => {
      if (views[key]) views[key].classList.remove('active');
    });

    if (views[route]) {
      views[route].classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Actualitzar estats de botons de la capçalera
    navButtons.forEach(btn => {
      const btnRoute = btn.getAttribute('data-route');
      const isActive = btnRoute === route || (route === 'robotDetail' && btnRoute === 'robotica');
      btn.classList.toggle('active', isActive);
    });
  };

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-route');
      window.navigateTo(target);
    });
  });
}

// ==========================================
// 1. PENSAMENT COMPUTACIONAL (DESENDOLLADES)
// ==========================================
function renderUnplugged() {
  const container = document.getElementById('unplugged-grid');
  if (!container || !window.UNPLUGGED_ACTIVITIES) return;

  container.innerHTML = window.UNPLUGGED_ACTIVITIES.map(act => `
    <article class="item-card" data-unplugged-id="${act.id}">
      <div class="card-top">
        <span class="tag-badge primary">${act.concept}</span>
        <span class="tag-badge">${act.cicleLabel}</span>
      </div>
      <h3 class="item-title">${act.title}</h3>
      <p class="item-desc">${act.summary}</p>
      <div class="item-footer">
        <span>⏱️ ${act.duration}</span>
        <span>Veure activitat →</span>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('[data-unplugged-id]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-unplugged-id');
      const act = window.UNPLUGGED_ACTIVITIES.find(a => a.id === id);
      if (act) openUnpluggedModal(act);
    });
  });
}

function openUnpluggedModal(act) {
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  title.textContent = act.title;
  body.innerHTML = `
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
      <span class="tag-badge primary">${act.concept}</span>
      <span class="tag-badge">${act.cicleLabel}</span>
      <span class="tag-badge">⏱️ ${act.duration}</span>
    </div>

    <div class="detail-section">
      <h4>🎯 Objectiu de l'activitat</h4>
      <p>${act.summary}</p>
    </div>

    <div class="detail-section">
      <h4>📦 Material necessari</h4>
      <ul style="padding-left: 1.25rem;">
        ${act.materials.map(m => `<li style="margin-bottom: 0.25rem;">${m}</li>`).join('')}
      </ul>
    </div>

    <div class="detail-section">
      <h4>👣 Desenvolupament pas a pas</h4>
      <div style="display: flex; flex-direction: column; gap: 0.85rem;">
        ${act.steps.map(s => `
          <div style="background: var(--bg-card-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--primary);">
            <strong style="display:block; margin-bottom: 0.25rem;">${s.title}</strong>
            <p style="font-size: 0.92rem; margin: 0;">${s.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="teacher-tip-box">
      <strong>💡 Consell per a l'aula:</strong> ${act.teacherTip}
    </div>
  `;

  openModal();
}

// ==========================================
// 2. ROBÒTICA (ELS 6 ROBOTS AMB PÀGINA DEDICADA)
// ==========================================
function renderRobotics() {
  const container = document.getElementById('robotics-grid');
  if (!container || !window.ROBOTS_DATA) return;

  container.innerHTML = window.ROBOTS_DATA.map(bot => `
    <article class="item-card" data-robot-id="${bot.id}">
      <div class="card-top">
        <span class="tag-badge primary">${bot.badge}</span>
        <span style="font-size: 1.5rem;">${bot.icon}</span>
      </div>
      <h3 class="item-title">${bot.name}</h3>
      <p class="item-desc">${bot.subtitle}</p>
      <div class="item-footer">
        <span>${bot.tutorials.length} tutorials</span>
        <span>Entrar a la pàgina →</span>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('[data-robot-id]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-robot-id');
      openRobotDetailPage(id);
    });
  });
}

function openRobotDetailPage(robotId) {
  const bot = (window.ROBOTS_DATA || []).find(b => b.id === robotId);
  if (!bot) return;

  const profileContainer = document.getElementById('robot-profile-container');
  const tutorialsTitle = document.getElementById('robot-tutorials-title');
  const tutorialsGrid = document.getElementById('robot-tutorials-grid');

  if (profileContainer) {
    profileContainer.innerHTML = `
      <div class="robot-profile-top">
        <div class="robot-big-icon">${bot.icon}</div>
        <div>
          <span class="tag-badge primary" style="margin-bottom: 0.35rem; display: inline-block;">${bot.badge}</span>
          <h2 class="robot-profile-title">${bot.name}</h2>
        </div>
      </div>
      <p class="robot-profile-sub">${bot.subtitle}</p>
      <p class="robot-profile-desc">${bot.description}</p>
      <div class="robot-specs-list">
        ${bot.specs.map(s => `<span class="robot-spec-pill">✓ ${s}</span>`).join('')}
      </div>
    `;
  }

  if (tutorialsTitle) {
    tutorialsTitle.textContent = `Tutorials de ${bot.name}`;
  }

  if (tutorialsGrid) {
    tutorialsGrid.innerHTML = bot.tutorials.map(tut => `
      <article class="item-card" data-tut-id="${tut.id}">
        <div class="card-top">
          <span class="tag-badge primary">${tut.difficulty}</span>
          <span class="tag-badge">⏱️ ${tut.duration}</span>
        </div>
        <h4 class="item-title">${tut.title}</h4>
        <p class="item-desc">${tut.summary}</p>
        <div class="item-footer">
          <span>Pas a pas d'aula</span>
          <span>Obrir tutorial →</span>
        </div>
      </article>
    `).join('');

    tutorialsGrid.querySelectorAll('[data-tut-id]').forEach(card => {
      card.addEventListener('click', () => {
        const tutId = card.getAttribute('data-tut-id');
        const tut = bot.tutorials.find(t => t.id === tutId);
        if (tut) openTutorialModal(tut, bot.name);
      });
    });
  }

  window.navigateTo('robotDetail');
}

function openTutorialModal(tut, robotName) {
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  title.textContent = `${robotName}: ${tut.title}`;
  body.innerHTML = `
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
      <span class="tag-badge primary">${tut.difficulty}</span>
      <span class="tag-badge">⏱️ ${tut.duration}</span>
      <span class="tag-badge">${robotName}</span>
    </div>

    <div class="detail-section">
      <h4>🎯 Objectius d'aprenentatge</h4>
      <ul style="padding-left: 1.25rem;">
        ${tut.goals.map(g => `<li style="margin-bottom: 0.25rem;">${g}</li>`).join('')}
      </ul>
    </div>

    <div class="detail-section">
      <h4>📦 Materials recomanats</h4>
      <ul style="padding-left: 1.25rem;">
        ${tut.materials.map(m => `<li style="margin-bottom: 0.25rem;">${m}</li>`).join('')}
      </ul>
    </div>

    <div class="detail-section">
      <h4>👣 Pas a pas del tutorial</h4>
      <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
        ${tut.steps.map(s => `
          <div style="background: var(--bg-card-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--primary);">
            <strong style="display: block; margin-bottom: 0.25rem;">${s.title}</strong>
            <p style="font-size: 0.92rem; margin: 0;">${s.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="teacher-tip-box">
      <strong>💡 Consell per al docent:</strong> ${tut.teacherTip}
    </div>
  `;

  openModal();
}

// ==========================================
// 3. CATÀLEG DE SITUACIONS D'APRENENTATGE
// ==========================================
function initLearningSituations() {
  const container = document.getElementById('situations-grid');
  const countEl = document.getElementById('situations-count');
  const resetBtn = document.getElementById('btn-reset-sa');

  const filterRobot = document.getElementById('filter-robot');
  const filterCicle = document.getElementById('filter-cicle');
  const filterTematica = document.getElementById('filter-tematica');
  const filterMateria = document.getElementById('filter-materia');

  const render = () => {
    if (!container || !window.LEARNING_SITUATIONS) return;

    const valRobot = filterRobot ? filterRobot.value : 'all';
    const valCicle = filterCicle ? filterCicle.value : 'all';
    const valTematica = filterTematica ? filterTematica.value : 'all';
    const valMateria = filterMateria ? filterMateria.value : 'all';

    const filtered = window.LEARNING_SITUATIONS.filter(item => {
      const matchRobot = valRobot === 'all' || item.robot === valRobot;
      const matchCicle = valCicle === 'all' || item.cicle === valCicle || (valCicle === 'cicle-superior' && item.cicle.includes('superior'));
      const matchTematica = valTematica === 'all' || item.tematica === valTematica;
      const matchMateria = valMateria === 'all' || item.materia === valMateria;
      return matchRobot && matchCicle && matchTematica && matchMateria;
    });

    if (countEl) {
      countEl.textContent = `Mostrant ${filtered.length} de ${window.LEARNING_SITUATIONS.length} situacions d'aprenentatge`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">Cap situació coincideix amb aquests filtres combinats.</p>
          <button class="btn-primary" style="margin-top: 0.5rem;" id="btn-empty-reset">Restablir filtres</button>
        </div>
      `;
      const btnEmpty = document.getElementById('btn-empty-reset');
      if (btnEmpty) btnEmpty.addEventListener('click', resetFilters);
      return;
    }

    container.innerHTML = filtered.map(sa => `
      <article class="item-card" data-sa-id="${sa.id}">
        <div class="card-top">
          <span class="tag-badge primary">${sa.robotName}</span>
          <span class="tag-badge">${sa.cicleLabel}</span>
        </div>
        <h3 class="item-title">${sa.title}</h3>
        <div class="sa-challenge">
          "${sa.challenge}"
        </div>
        <p class="item-desc" style="margin-bottom: 0.5rem;">
          <strong>Matèria:</strong> ${sa.materiaLabel}<br>
          <strong>Temàtica:</strong> ${sa.tematicaLabel}
        </p>
        <div class="item-footer">
          <span>⏱️ ${sa.duration}</span>
          <span>Veure guia didàctica →</span>
        </div>
      </article>
    `).join('');

    container.querySelectorAll('[data-sa-id]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-sa-id');
        const sa = window.LEARNING_SITUATIONS.find(s => s.id === id);
        if (sa) openLearningSituationModal(sa);
      });
    });
  };

  const resetFilters = () => {
    if (filterRobot) filterRobot.value = 'all';
    if (filterCicle) filterCicle.value = 'all';
    if (filterTematica) filterTematica.value = 'all';
    if (filterMateria) filterMateria.value = 'all';
    render();
  };

  [filterRobot, filterCicle, filterTematica, filterMateria].forEach(select => {
    if (select) select.addEventListener('change', render);
  });

  if (resetBtn) resetBtn.addEventListener('click', resetFilters);

  render();
}

function openLearningSituationModal(sa) {
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  title.textContent = sa.title;
  body.innerHTML = `
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
      <span class="tag-badge primary">${sa.robotName}</span>
      <span class="tag-badge">${sa.cicleLabel}</span>
      <span class="tag-badge">⏱️ ${sa.duration}</span>
      <span class="tag-badge">${sa.materiaLabel}</span>
    </div>

    <div class="sa-challenge" style="font-size: 1rem; padding: 1rem; margin-bottom: 1.75rem;">
      <strong>Repte / Pregunta guia:</strong> "${sa.challenge}"
    </div>

    <div class="detail-section">
      <h4>🎯 Competències clau i específiques</h4>
      <ul style="padding-left: 1.25rem;">
        ${sa.competencies.map(c => `<li style="margin-bottom: 0.35rem;">${c}</li>`).join('')}
      </ul>
    </div>

    <div class="detail-section">
      <h4>📅 Seqüència d'activitats de les sessions</h4>
      <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.5rem;">
        ${sa.sessions.map(sess => `
          <div style="background: var(--bg-card-subtle); padding: 0.75rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--primary); font-size: 0.92rem;">
            ${sess}
          </div>
        `).join('')}
      </div>
    </div>

    <div class="detail-section">
      <h4>📊 Criteri d'avaluació principal</h4>
      <p style="background: var(--bg-card-subtle); padding: 1rem; border-radius: var(--radius-sm); font-size: 0.95rem;">
        ${sa.evaluationCriteria}
      </p>
    </div>
  `;

  openModal();
}

// ==========================================
// CONTROL DEL MODAL
// ==========================================
function setupModalHandlers() {
  const modal = document.getElementById('detail-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const actionCloseBtn = document.getElementById('modal-action-close');

  window.openModal = function() {
    if (modal) modal.classList.add('active');
  };

  window.closeModal = function() {
    if (modal) modal.classList.remove('active');
  };

  if (closeBtn) closeBtn.addEventListener('click', window.closeModal);
  if (actionCloseBtn) actionCloseBtn.addEventListener('click', window.closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) window.closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeModal();
  });
}
