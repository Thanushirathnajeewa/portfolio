

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  /* ---- Highlight the active nav link based on current page ---- */
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
  });

  /* ---- Hero typewriter (only present on index.html) ---- */
  const typeEl = document.querySelector('[data-typewriter]');
  if (typeEl) {
    const phrases = JSON.parse(typeEl.getAttribute('data-typewriter'));
    let phraseIndex = 0, charIndex = 0, deleting = false;
    const target = typeEl.querySelector('.type-out');

    function tick() {
      const phrase = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        target.textContent = phrase.slice(0, charIndex);
        if (charIndex === phrase.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        target.textContent = phrase.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 70);
    }
    tick();
  }

  /* ---- Animate skill bars into view (Skills page) ---- */
  const bars = document.querySelectorAll('.bar > i[data-level]');
  if (bars.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.width = el.getAttribute('data-level') + '%';
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => {
      b.style.width = '0%';
      b.style.transition = 'width 900ms ease';
      observer.observe(b);
    });
  }

  /* ---- Contact form (client-side only demo — replace action for real use) ---- */
  const form = document.querySelector('#contact-form');
  if (form) {
    const status = document.querySelector('#form-status');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        status.textContent = 'Please fill in every field before sending.';
        status.className = 'form-status err';
        return;
      }
      if (!emailPattern.test(email)) {
        status.textContent = 'That email address doesn\'t look right — please check it.';
        status.className = 'form-status err';
        return;
      }

      // NOTE: This is a front-end-only demo. To actually receive messages,
      // connect this form to a service such as Formspree, EmailJS, Netlify
      // Forms, or your own backend endpoint, then swap this handler for a
      // real fetch()/POST call.
      status.textContent = `Thanks, ${name}! Your message has been captured locally. Connect a form backend (see script.js comments) to receive it by email.`;
      status.className = 'form-status ok';
      form.reset();
    });
  }

  /* ---- Certificate viewer ---- */
  const certificateButtons = document.querySelectorAll('.certificate-button');
  if (certificateButtons.length) {
    const viewer = document.createElement('div');
    viewer.className = 'certificate-viewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.setAttribute('aria-label', 'Certificate details');
    viewer.innerHTML = `
      <div class="certificate-viewer-panel">
        <button class="certificate-viewer-close" type="button" aria-label="Close certificate">&times;</button>
        <img class="certificate-viewer-image" alt="">
        <div class="certificate-viewer-details">
          <h2></h2>
          <div class="certificate-viewer-text"></div>
        </div>
      </div>`;
    document.body.appendChild(viewer);

    const viewerImage = viewer.querySelector('.certificate-viewer-image');
    const viewerTitle = viewer.querySelector('h2');
    const viewerText = viewer.querySelector('.certificate-viewer-text');
    const closeViewer = () => {
      viewer.classList.remove('open');
      document.body.classList.remove('certificate-viewer-open');
    };

    certificateButtons.forEach(button => {
      const card = button.closest('.card');
      const certificate = card.querySelector('.certificate');
      button.addEventListener('click', () => {
        viewerImage.src = certificate.src;
        viewerImage.alt = certificate.alt;
        viewerTitle.textContent = card.querySelector('h3').textContent.trim();
        viewerText.innerHTML = '';
        card.querySelectorAll('p').forEach(paragraph => {
          const detail = document.createElement('p');
          detail.textContent = paragraph.textContent.trim();
          viewerText.appendChild(detail);
        });
        viewer.classList.add('open');
        document.body.classList.add('certificate-viewer-open');
        viewer.querySelector('.certificate-viewer-close').focus();
      });
    });

    viewer.querySelector('.certificate-viewer-close').addEventListener('click', closeViewer);
    viewer.addEventListener('click', event => {
      if (event.target === viewer) closeViewer();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && viewer.classList.contains('open')) closeViewer();
    });
  }

  /* ---- Footer year ---- */
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
