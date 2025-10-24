/* script.js
   Separated JS: typewriter, scroll reveal, contact form, theme toggle, smooth anchors.
*/

/* Helper short-hands */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* Set footer year */
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = y;
});

/* -----------------------
   Typewriter effect
   ----------------------- */
(function typewriter(){
  const el = document.getElementById('typewriter');
  if (!el) return;
  const phrases = [
    'aspiring AI & NLP developer',
    'Python enthusiast',
    'future Computer Science student'
  ];
  let pi = 0, idx = 0, deleting = false;
  const TYPING_SPEED = 50;
  const PAUSE = 1200;

  function tick(){
    const current = phrases[pi];
    if(!deleting){
      idx++;
      el.textContent = current.slice(0, idx);
      if(idx === current.length){
        deleting = true;
        setTimeout(tick, PAUSE);
        return;
      }
    } else {
      idx--;
      el.textContent = current.slice(0, idx);
      if(idx === 0){
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? TYPING_SPEED/2 : TYPING_SPEED);
  }
  setTimeout(tick, 500);
})();

/* -----------------------
   Scroll reveal using IntersectionObserver
   ----------------------- */
(function scrollReveal(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, {threshold: 0.12});
  $$('.fade-in').forEach(el => observer.observe(el));
})();

/* -----------------------
   Smooth anchor scrolling for internal links
   ----------------------- */
(function smoothAnchors(){
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const dest = document.querySelector(href);
        if (dest) {
          e.preventDefault();
          dest.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }
    });
  });
})();

/* -----------------------
   Contact form (client-side)
   ----------------------- */
(function contactForm(){
  const form = $('#contactForm');
  if (!form) return;
  const feedback = $('#formFeedback');
  const sendBtn = $('#sendBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const message = $('#message').value.trim();
    if(!name || !email || !message){
      if (feedback) feedback.textContent = 'Please complete all fields before sending.';
      return;
    }
    // Build mailto fallback
    const subject = encodeURIComponent('Portfolio contact from ' + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailto = `mailto:natnaelaklilu617@gmail.com?subject=${subject}&body=${body}`;
    if (feedback) feedback.innerHTML = 'No backend configured. <a href="' + mailto + '">Open your email client</a> to send the message, or use the direct email link above.';
    form.reset();
  });
})();

/* -----------------------
   Theme toggle (persist)
   ----------------------- */
(function themeToggle(){
  const btn = $('#themeToggle');
  const root = document.documentElement;
  const KEY = 'nat-theme';
  function setMode(mode){
    if(mode === 'light') root.classList.add('light');
    else root.classList.remove('light');
    if (btn) btn.setAttribute('aria-pressed', mode === 'light' ? 'true' : 'false');
  }
  // Load preference
  const saved = localStorage.getItem(KEY);
  if (saved) setMode(saved);
  else {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    setMode(prefersLight ? 'light' : 'dark');
  }
  if (btn) {
    btn.addEventListener('click', () => {
      const isLight = root.classList.contains('light');
      const next = isLight ? 'dark' : 'light';
      setMode(next);
      localStorage.setItem(KEY, next);
    });
  }
})();

/* -----------------------
   Accessibility: keyboard focus helper
   ----------------------- */
(function keyboardFocus(){
  function handleFirstTab(e){
    if(e.key === 'Tab'){
      document.body.classList.add('show-focus');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
})();