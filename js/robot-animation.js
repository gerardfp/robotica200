// js/robot-animation.js - Micro-animacions robòtiques dinàmiques per a Robòtica200
(function () {
  'use strict';

  var robotSvg = document.querySelector('.home-hero-svg');
  if (!robotSvg) return;

  // Respectar la preferència de moviment reduït per accessibilitat
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion && prefersReducedMotion.matches) return;

  // Catàleg de les 8 animacions típiques de robot
  var animations = [
    { name: 'robot-anim-blink', duration: 400, label: 'Parpelleig ràpid d\'ulls' },
    { name: 'robot-anim-antenna', duration: 700, label: 'Oscil·lació d\'antena' },
    { name: 'robot-anim-alert', duration: 800, label: 'Alerta de sensor' },
    { name: 'robot-anim-glitch', duration: 500, label: 'Micro-glitch cibernètic' },
    { name: 'robot-anim-look', duration: 1150, label: 'Mirada curiosa als costats' },
    { name: 'robot-anim-happy', duration: 700, label: 'Salutació alegre / Hop' },
    { name: 'robot-anim-tilt', duration: 1000, label: 'Inclinació de cap curiosa' },
    { name: 'robot-anim-scan', duration: 900, label: 'Escaneig cromàtic / Mode matrix' }
  ];

  var lastIndex = -1;
  var timerId = null;
  var isAnimating = false;

  function clearAllAnimationClasses() {
    for (var i = 0; i < animations.length; i++) {
      robotSvg.classList.remove(animations[i].name);
    }
  }

  function triggerAnimation(index) {
    if (isAnimating) return;
    isAnimating = true;

    clearAllAnimationClasses();
    // Forçar reflow perquè la nova animació s'executi des de zero
    void robotSvg.offsetWidth;

    var anim = animations[index];
    robotSvg.classList.add(anim.name);

    setTimeout(function () {
      clearAllAnimationClasses();
      isAnimating = false;
      scheduleNext();
    }, anim.duration + 50);
  }

  function scheduleNext() {
    if (timerId) {
      clearTimeout(timerId);
    }
    // Delays aleatoris entre 2, 3 o 4 segons (2000ms a 4000ms)
    var delays = [2000, 2500, 3000, 3500, 4000];
    var delay = delays[Math.floor(Math.random() * delays.length)];

    timerId = setTimeout(function () {
      // Escollir una animació diferent a la prèvia per mantenir varietat
      var nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * animations.length);
      } while (nextIndex === lastIndex && animations.length > 1);

      lastIndex = nextIndex;
      triggerAnimation(nextIndex);
    }, delay);
  }

  // Primera animació poc després de carregar la pàgina (1.8s)
  timerId = setTimeout(function () {
    lastIndex = Math.floor(Math.random() * animations.length);
    triggerAnimation(lastIndex);
  }, 1800);

  // Interacció viva: en fer clic sobre el robot, fa una animació immediata (hop alegre)
  var heroIcon = document.querySelector('.home-hero-icon');
  if (heroIcon) {
    heroIcon.setAttribute('title', 'Fes clic per interactuar amb el robot!');
    heroIcon.style.cursor = 'pointer';

    heroIcon.addEventListener('click', function () {
      if (timerId) clearTimeout(timerId);
      isAnimating = false;
      // Clic activa l'animació de felicitat
      var happyIdx = 5;
      lastIndex = happyIdx;
      triggerAnimation(happyIdx);
    });
  }
})();
