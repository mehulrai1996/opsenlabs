/* ─── NAV SCROLL ─────────────────────────────────────────────────── */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const check = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', check, { passive: true });
  check();
})();

/* ─── FADE-UP OBSERVER ───────────────────────────────────────────── */
(function () {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
})();

/* ─── COUNTER ANIMATION ──────────────────────────────────────────── */
(function () {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target   = parseFloat(el.dataset.count);
      const suffix   = el.dataset.suffix || '';
      const decimals = el.dataset.count.includes('.') ? el.dataset.count.split('.')[1].length : 0;
      const dur      = 1800;
      const start    = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * ease).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
})();

/* ─── TESTIMONIAL TABS ───────────────────────────────────────────── */
window.switchTab = function(id, btn) {
  document.querySelectorAll('.testi-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.testi-panel').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
  btn.classList.add('active');
  const panel = document.getElementById('tab-' + id);
  if (panel) { panel.classList.add('active'); panel.style.display = 'block'; }
};

/* ─── MOBILE NAV ─────────────────────────────────────────────────── */
(function () {
  const btn   = document.querySelector('.nav__hamburger');
  const links = document.querySelector('.nav__links');
  if (!btn || !links) return;
  let open = false;
  btn.addEventListener('click', () => {
    open = !open;
    Object.assign(links.style, open ? {
      display: 'flex', flexDirection: 'column', position: 'fixed',
      top: '72px', left: '0', right: '0',
      background: '#f7f5f1', padding: '28px 32px',
      gap: '20px', borderBottom: '1px solid #efe9e2',
      zIndex: '998', boxShadow: '0 12px 40px rgba(12,12,12,0.12)'
    } : { display: '' });
  });
})();

/* ─── FORM SUBMIT ────────────────────────────────────────────────── */
window.handleSubmit = function(e, form) {
  e.preventDefault();
  const btn = form.querySelector('button[type=submit]');
  const orig = btn.textContent;
  btn.textContent = 'Sent ✓'; btn.disabled = true; btn.style.background = '#67615d'; btn.style.borderColor = '#67615d';
  setTimeout(() => { btn.textContent = orig; btn.disabled = false; btn.style.background = ''; btn.style.borderColor = ''; form.reset(); }, 3500);
};
