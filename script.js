/* ============================================================
   TessMaedia — Script
   GSAP 3 + ScrollTrigger + Lenis smooth scroll
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   Loader
   ============================================================ */
const loader = document.getElementById('loader');

/* ============================================================
   Loader — build terminal sequence
   ============================================================ */
window.addEventListener('load', () => {
  const linesEl   = document.getElementById('loaderLines');
  const progressEl = document.getElementById('loaderProgressFill');

  const steps = [
    { html: '<span class="ll-prompt">$</span> <span class="ll-ready">tessmaedia.com — building...</span>',                                               progress: 8,  delay: 300 },
    { html: '<span class="ll-arrow">→</span> <span class="ll-key">reading design files</span>                    <span class="ll-check">✓</span>',        progress: 20, delay: 420 },
    { html: '<span class="ll-arrow">→</span> <span class="ll-key">design</span>           <span class="ll-val">pixel-perfect</span>    <span class="ll-check">✓</span>', progress: 33, delay: 380 },
    { html: '<span class="ll-arrow">→</span> <span class="ll-key">compiling</span>        <span class="ll-val">styles.css</span>       <span class="ll-check">✓</span>', progress: 46, delay: 400 },
    { html: '<span class="ll-arrow">→</span> <span class="ll-key">development</span>      <span class="ll-val">premium builds</span>   <span class="ll-check">✓</span>', progress: 58, delay: 390 },
    { html: '<span class="ll-arrow">→</span> <span class="ll-key">optimizing assets</span>                       <span class="ll-check">✓</span>',        progress: 70, delay: 420 },
    { html: '<span class="ll-arrow">→</span> <span class="ll-key">performance</span>      <span class="ll-val">100 / 100</span>        <span class="ll-check">✓</span>', progress: 82, delay: 380 },
    { html: '<span class="ll-arrow">→</span> <span class="ll-key">seo</span>              <span class="ll-val">optimized</span>        <span class="ll-check">✓</span>', progress: 91, delay: 360 },
    { html: '<span class="ll-arrow">→</span> <span class="ll-key">deploying</span>        <span class="ll-val">tessmaedia.com</span>   <span class="ll-check">↗</span>', progress: 98, delay: 440 },
    { html: '<span class="ll-ready">✓ ready to launch</span>',                                                                                             progress: 100, delay: 0   },
  ];

  let i = 0;
  function showNextStep() {
    if (i >= steps.length) {
      setTimeout(() => {
        animateHero();
        gsap.to(loader, {
          yPercent: -100,
          duration: 0.9,
          ease: 'expo.inOut',
          onComplete: () => { loader.style.display = 'none'; },
        });
      }, 500);
      return;
    }
    const step = steps[i++];
    const line = document.createElement('span');
    line.className = 'loader-line';
    line.innerHTML = step.html;
    linesEl.appendChild(line);
    requestAnimationFrame(() => requestAnimationFrame(() => line.classList.add('visible')));
    progressEl.style.width = step.progress + '%';
    setTimeout(showNextStep, step.delay);
  }

  setTimeout(showNextStep, 200);
});

/* ============================================================
   Custom cursor
   ============================================================ */
const cursor = document.getElementById('cursor');
let cx = window.innerWidth / 2;
let cy = window.innerHeight / 2;
let tx = cx, ty = cy;

document.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
document.addEventListener('mouseup',   () => cursor.classList.remove('clicking'));

// Cursor follows mouse via GSAP ticker (no separate RAF)
gsap.ticker.add(() => {
  cx += (tx - cx) * 0.14;
  cy += (ty - cy) * 0.14;
  cursor.style.left = cx + 'px';
  cursor.style.top  = cy + 'px';
});

// Hover state
document.querySelectorAll('a, button, [data-mag], .work-card, .svc-item, .process-step, .code-card, .price-card, .wa-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

/* ============================================================
   Magnetic buttons
   ============================================================ */
document.querySelectorAll('[data-mag]').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    gsap.to(el, { x: x * 0.28, y: y * 0.28, duration: 0.45, ease: 'power2.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' });
  });
});

/* ============================================================
   Nav — sticky style on scroll
   ============================================================ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 60);
}, { passive: true });

/* ============================================================
   Code card typewriter
   ============================================================ */
function startCodeTyping() {
  const el = document.getElementById('codeTyping');
  if (!el) return;
  const lines = [
    '<span class="tok-sel">.website</span> <span class="tok-punct">{</span>',
    '  <span class="tok-prop">design</span><span class="tok-punct">:</span>  <span class="tok-val">pixel-perfect</span><span class="tok-punct">;</span>',
    '  <span class="tok-prop">speed</span><span class="tok-punct">:</span>   <span class="tok-val">100</span><span class="tok-punct"> / </span><span class="tok-val">100</span><span class="tok-punct">;</span>',
    '  <span class="tok-prop">impact</span><span class="tok-punct">:</span>  <span class="tok-val">maximum</span><span class="tok-punct">;</span>',
    '<span class="tok-punct">}</span>',
  ];
  let i = 0;
  (function nextLine() {
    if (i >= lines.length) return;
    el.innerHTML += (i > 0 ? '\n' : '') + lines[i++];
    setTimeout(nextLine, 180);
  })();
}

/* ============================================================
   Hero animation (runs after loader exits)
   ============================================================ */
function animateHero() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.from('.hero-copy .eyebrow', { y: 20, opacity: 0, duration: 0.7 })
    .from('.hero-line',  { yPercent: 115, opacity: 0, duration: 1, stagger: 0.1 }, '-=0.4')
    .from('.hero-desc',  { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
    .from('.hero-actions .btn', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
    .from('.hero-pills li',     { y: 14, opacity: 0, duration: 0.5, stagger: 0.07 }, '-=0.4')
    .from('.hero-frame',  { scale: 0.93, opacity: 0, duration: 1.1 }, '-=1')
    .from('#heroBrowser',  { y: 40, opacity: 0, duration: 0.9, ease: 'expo.out' }, '-=0.4')
    .from('#codeCard',     { x: -24, opacity: 0, duration: 0.7, ease: 'expo.out' }, '-=0.6')
    .from('.hero-scroll',  { opacity: 0, duration: 0.6 }, '-=0.3')
    .add(() => setTimeout(startCodeTyping, 300));
}


/* ============================================================
   Work — drag to scroll
   ============================================================ */
const workDrag     = document.getElementById('workDrag');
const workProgress = document.getElementById('workProgress');
let dragActive = false;
let dragStartX, dragScrollLeft;

workDrag.addEventListener('mousedown', (e) => {
  dragActive    = true;
  dragStartX    = e.pageX - workDrag.offsetLeft;
  dragScrollLeft = workDrag.scrollLeft;
});
workDrag.addEventListener('mouseleave', () => { dragActive = false; });
workDrag.addEventListener('mouseup',    () => { dragActive = false; });
workDrag.addEventListener('mousemove',  (e) => {
  if (!dragActive) return;
  e.preventDefault();
  const x    = e.pageX - workDrag.offsetLeft;
  const walk = (x - dragStartX) * 1.6;
  workDrag.scrollLeft = dragScrollLeft - walk;
});
workDrag.addEventListener('scroll', () => {
  const max      = workDrag.scrollWidth - workDrag.clientWidth;
  const pct      = max > 0 ? (workDrag.scrollLeft / max) * 100 : 0;
  workProgress.style.width = pct + '%';
});


/* ============================================================
   GSAP scroll animations
   ============================================================ */

// Work cards stagger in — no y-offset (overflow-x:auto clips vertical transforms)
gsap.from('.work-card', {
  opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
  scrollTrigger: { trigger: '.work-drag', start: 'top 88%', once: true },
});

// Service items
gsap.from('.svc-item', {
  x: -32, opacity: 0, duration: 0.7, stagger: 0.14, ease: 'expo.out',
  scrollTrigger: { trigger: '.services-list', start: 'top 78%', once: true },
});

// About visual
gsap.from('.about-photo-frame', {
  y: 50, opacity: 0, duration: 1, ease: 'expo.out',
  scrollTrigger: { trigger: '.about-visual', start: 'top 80%', once: true },
});

// About copy
gsap.from('.about-copy > *', {
  y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out',
  scrollTrigger: { trigger: '.about-copy', start: 'top 80%', once: true },
});

// Launch section copy
gsap.from('.launch-copy > *', {
  y: 28, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'expo.out',
  scrollTrigger: { trigger: '.launch-section', start: 'top 78%', once: true },
});

// Launch animation sequence
const launchTl = gsap.timeline({
  scrollTrigger: { trigger: '#launchStage', start: 'top 72%', once: true },
});
launchTl
  // Phone enters
  .from('#launchPhone', { y: 80, opacity: 0, duration: 0.9, ease: 'expo.out' })
  // Screen content loads in
  .from('.lp-nav-bar, .lp-hero-block, .lp-cards', { opacity: 0, y: 8, stagger: 0.15, duration: 0.5, ease: 'expo.out' }, '-=0.3')
  // Wait, then rumble
  .to('#launchPhone', { x: -4, duration: 0.06, repeat: 10, yoyo: true, ease: 'none' }, '+=0.7')
  // Flames ignite
  .to('#launchFlames', { opacity: 1, duration: 0.25 }, '-=0.2')
  // Glow grows
  .to('.launch-glow-base', { opacity: 0.7, scale: 1.4, duration: 0.4 }, '<')
  // LAUNCH — phone + flames rise together
  .to(['#launchPhone', '#launchFlames'], { y: -340, duration: 1.1, ease: 'power2.in' }, '+=0.15')
  // Trails appear as phone rises
  .to('#launchTrails', { opacity: 1, duration: 0.2 }, '-=0.9')
  // Phone exits top, trails stay briefly
  .to(['#launchPhone', '#launchFlames'], { opacity: 0, duration: 0.2 }, '-=0.25')
  // Trails fade
  .to('#launchTrails', { opacity: 0, scaleY: 0.3, transformOrigin: 'top', duration: 0.4 }, '-=0.1')
  // Brief pause — then phone descends from top with LIVE badge
  .set('#launchFlames', { opacity: 0 })
  .set('#launchPhone',  { y: -420, opacity: 1 })
  // Phone glides back down — smooth premium descent
  .to('#launchPhone', { y: 0, duration: 1.4, ease: 'expo.out' }, '+=0.3')
  // Glow pulses gently as phone lands
  .to('.launch-glow-base', { opacity: 0.45, scale: 1.15, duration: 0.4, ease: 'power2.out' }, '-=0.5')
  // LIVE badge pops in on screen as phone settles
  .fromTo('#launchLive', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.55, ease: 'back.out(2.2)' }, '-=0.35')
  // Glow settles
  .to('.launch-glow-base', { opacity: 0.15, scale: 1, duration: 0.8, ease: 'power2.inOut' }, '-=0.1');

// CTA title lines
gsap.from('.cta-title > *', {
  y: 44, opacity: 0, duration: 0.9, stagger: 0.13, ease: 'expo.out',
  scrollTrigger: { trigger: '.cta', start: 'top 75%', once: true },
});
gsap.from('.cta-sub, .cta .btn, .cta-location', {
  y: 24, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'expo.out',
  scrollTrigger: { trigger: '.cta', start: 'top 70%', once: true },
});

// Section headings generic reveal
gsap.utils.toArray('.work-header').forEach(el => {
  gsap.from(el.querySelectorAll('.eyebrow, h2, p'), {
    y: 28, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out',
    scrollTrigger: { trigger: el, start: 'top 82%', once: true },
  });
});

// Services sticky heading
gsap.from('.services-sticky .eyebrow, .services-heading, .services-vis', {
  y: 28, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'expo.out',
  scrollTrigger: { trigger: '.services', start: 'top 78%', once: true },
});

/* ============================================================
   Lighthouse scores counter
   ============================================================ */
ScrollTrigger.create({
  trigger: '#lhScores',
  start: 'top 82%',
  once: true,
  onEnter() {
    document.querySelectorAll('.lh-score').forEach((score, i) => {
      const numEl  = score.querySelector('.lh-num');
      const ring   = score.querySelector('.lh-fill');
      const target = parseInt(numEl.dataset.target);
      const circ   = 2 * Math.PI * 15.9; // stroke circumference

      setTimeout(() => {
        // Animate ring
        const offset = circ - (target / 100) * circ;
        ring.style.strokeDasharray = `${circ} ${circ}`;
        ring.style.strokeDashoffset = circ;
        requestAnimationFrame(() => {
          ring.style.strokeDashoffset = offset;
        });

        // Count number
        let start = 0;
        const dur = 1400;
        const step = 16;
        const inc = target / (dur / step);
        const tick = setInterval(() => {
          start = Math.min(start + inc, target);
          numEl.textContent = Math.round(start);
          if (start >= target) clearInterval(tick);
        }, step);
      }, i * 120);
    });
  }
});

/* ============================================================
   Console.log easter egg
   ============================================================ */
console.log('%c TessMaedia ', 'background:#8A00FF;color:#fff;font-size:14px;font-weight:bold;padding:4px 10px;border-radius:4px;');
console.log('%c Gebouwd door Dominique Bollen — Lanaken, België', 'color:#C478FF;font-size:12px;');
console.log('%c hello@tessmaedia.com', 'color:#6ee7b7;font-size:11px;');

/* ============================================================
   "BOUWEN" scramble build effect
   ============================================================ */
(function initScramble() {
  const el = document.getElementById('scrambleBouwen');
  if (!el) return;

  const original = el.textContent; // "bouwen."
  const glyphs   = 'ABCDEFGHIJKLMNOPRSTUVWXYZ<>/{}[]|#@!=';

  // Wrap each char in a span
  el.innerHTML = original.split('').map(ch =>
    `<span class="sc-char">${ch}</span>`
  ).join('');

  const spans = Array.from(el.querySelectorAll('.sc-char'));

  ScrollTrigger.create({
    trigger: '#scrambleBouwen',
    start: 'top 80%',
    once: true,
    onEnter() {
      spans.forEach((span, i) => {
        const real    = original[i];
        if (real === '.') return; // period stays
        const stagger = i * 90;   // 90 ms per letter
        const dur     = 520;      // scramble duration per letter
        const fps     = 40;       // ms per frame
        let   elapsed = 0;

        span.classList.add('scrambling');
        setTimeout(() => {
          const tick = setInterval(() => {
            elapsed += fps;
            if (elapsed >= dur) {
              span.textContent = real;
              span.classList.remove('scrambling');
              clearInterval(tick);
            } else {
              span.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
            }
          }, fps);
        }, stagger);
      });
    }
  });
})();

/* ============================================================
   Mobile menu
   ============================================================ */
const navBurger  = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

navBurger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  document.body.style.overflow = open ? 'hidden' : '';
  const [s1, s2] = navBurger.querySelectorAll('span');
  if (open) {
    gsap.to(s1, { rotate: 45,  y:  8, duration: 0.3 });
    gsap.to(s2, { rotate: -45, y: -8, duration: 0.3 });
  } else {
    gsap.to(s1, { rotate: 0, y: 0, duration: 0.3 });
    gsap.to(s2, { rotate: 0, y: 0, duration: 0.3 });
  }
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    const [s1, s2] = navBurger.querySelectorAll('span');
    gsap.to(s1, { rotate: 0, y: 0, duration: 0.3 });
    gsap.to(s2, { rotate: 0, y: 0, duration: 0.3 });
  });
});
