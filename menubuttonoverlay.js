/* menubuttonoverlay.js – footer "Open" button controls the overlay (no minus state) */
(function () {
  const btn = document.getElementById('footer-menu-btn');
  const backdrop = document.getElementById('overlay-backdrop');
  const panel = document.getElementById('overlay-panel');
  const inner = panel && panel.querySelector('.overlay-inner');
  const closeBtn = document.getElementById('overlay-close');

  if (!btn || !backdrop || !panel || !inner) return;

  let lastFocused = null;

  function openMenu() {
    lastFocused = document.activeElement;
    btn.setAttribute('aria-expanded', 'true');
    backdrop.hidden = false;
    panel.hidden = false;
    requestAnimationFrame(() => {
      panel.setAttribute('data-open', 'true');
      inner.focus({ preventScroll: true });
    });
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    btn.setAttribute('aria-expanded', 'false');
    panel.removeAttribute('data-open');
    const done = () => {
      backdrop.hidden = true;
      panel.hidden = true;
      panel.removeEventListener('transitionend', done);
    };
    panel.addEventListener('transitionend', done, { once: true });
    document.body.style.overflow = '';
    (lastFocused || btn).focus({ preventScroll: true });
  }

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    open ? closeMenu() : openMenu();
  });

  closeBtn?.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });

  /* simple focus trap */
  panel.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const nodes = Array.from(panel.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])'))
      .filter(el => !el.hasAttribute('disabled'));
    if (!nodes.length) return;
    const first = nodes[0];
    const last  = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
})();