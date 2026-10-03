// js/robot-animation.js - Micro-animacions robòtiques dinàmiques per a Robòtica²⁰⁰
(function () {
  'use strict';

  function initRobotAnimation() {
    var robotSvg = document.querySelector('.home-hero-svg');
    if (!robotSvg) return;

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
      // Forçar reflow en SVG usant getBoundingClientRect per garantir reinici net
      if (robotSvg.getBoundingClientRect) {
        robotSvg.getBoundingClientRect();
      }

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
      // Interval entre 2, 3 i 4 segons (2000ms a 4000ms)
      var delays = [2000, 2500, 3000, 3500, 4000];
      var delay = delays[Math.floor(Math.random() * delays.length)];

      timerId = setTimeout(function () {
        // Garantir varietat: triar una animació diferent a la darrera
        var nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * animations.length);
        } while (nextIndex === lastIndex && animations.length > 1);

        lastIndex = nextIndex;
        triggerAnimation(nextIndex);
      }, delay);
    }

    // Llançar la primera animació molt aviat (600ms després de carregar) perquè sigui immediatament visible
    timerId = setTimeout(function () {
      lastIndex = Math.floor(Math.random() * animations.length);
      triggerAnimation(lastIndex);
    }, 600);

    // Interacció manual: en fer clic sobre el robot, fa un salt alegre immediat
    var heroIcon = document.querySelector('.home-hero-icon');
    if (heroIcon) {
      heroIcon.setAttribute('title', 'Fes clic per interactuar amb el robot!');
      heroIcon.style.cursor = 'pointer';

      heroIcon.addEventListener('click', function () {
        if (timerId) clearTimeout(timerId);
        isAnimating = false;
        var happyIdx = 5; // index de robot-anim-happy
        lastIndex = happyIdx;
        triggerAnimation(happyIdx);
      });
    }
  }

  // Executar immediatament o al carregar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRobotAnimation);
  } else {
    initRobotAnimation();
  }
})();
