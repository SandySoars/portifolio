/* ============================================================
   NAVBAR — scroll + mobile
   ============================================================ */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ============================================================
   SCROLL REVEAL — com delay escalonado
   ============================================================ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const parent   = entry.target.parentElement;
    const siblings = Array.from(parent.querySelectorAll('.reveal:not(.visible)'));
    const idx      = siblings.indexOf(entry.target);
    const delay    = idx >= 0 ? idx * 85 : 0;

    setTimeout(() => entry.target.classList.add('visible'), delay);
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ============================================================
   NAV ATIVO por seção
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a[href^="#"]');

const secObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(l => l.style.color = '');
    const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
    if (active && !active.classList.contains('nav-cta')) active.style.color = 'var(--terra)';
  });
}, { threshold: 0.45 });

sections.forEach(s => secObs.observe(s));

/* ============================================================
   SMOOTH SCROLL com offset do navbar
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

/* ============================================================
   ANIMAÇÃO DAS BARRAS DE IDIOMA
   ============================================================ */
const langFills = document.querySelectorAll('.lang-fill');

const langObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    // a largura já está definida via style inline — apenas garante transição
    entry.target.style.transition = 'width 1.2s ease';
    langObs.unobserve(entry.target);
  });
}, { threshold: 0.5 });

langFills.forEach(el => {
  const targetW = el.style.width;
  el.style.width = '0';
  langObs.observe(el);
  // dispara após reveal
  setTimeout(() => { el.style.width = targetW; }, 400);
});