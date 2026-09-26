// Highlights the nav link for whichever section is currently in view.
(function () {
  var links = {}, order = [];
  document.querySelectorAll('nav .links a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    if (document.getElementById(id)) { links[id] = a; order.push(id); }
  });
  if (!order.length) return;

  var ticking = false;

  function paint() {
    ticking = false;
    // Normally a section claims the nav once its heading passes under the nav
    // bar. On the last screenful nothing more can scroll up, so we relax the
    // line to mid-viewport - otherwise a short final section would permanently
    // outrank the one above it.
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    var line = atBottom ? window.innerHeight * 0.5 : 100;
    var current = order[0];

    for (var i = 0; i < order.length; i++) {
      if (document.getElementById(order[i]).getBoundingClientRect().top <= line) {
        current = order[i];
      }
    }
    order.forEach(function (id) {
      links[id].classList.toggle('active', id === current);
    });
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(paint); }
  }

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  paint();
})();
