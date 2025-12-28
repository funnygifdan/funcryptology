/* menu.js – footer button controls overlay (open/close + accessibility) */
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
    requestAnimationFrame(() => inner.focus());
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    btn.setAttribute('aria-expanded', 'false');
    backdrop.hidden = true;
    panel.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    } else {
      btn.focus();
    }
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

  // basic focus trap inside overlay
  panel.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const nodes = Array.from(panel.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])'))
      .filter(el => !el.hasAttribute('disabled'));
    if (!nodes.length) return;

    const first = nodes[0], last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
})();