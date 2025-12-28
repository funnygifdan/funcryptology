// auth-panel.loader.js
(() => {
  const PANEL_SRC = './loginregsubs/auth-panel.html'; // the off-panel markup file
  const ROOT_ID   = 'auth-panel-root';
  const OPEN_BTN  = 'footer-menu-btn';                // your existing menu button id

  async function injectPanel() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return console.warn('[auth-panel] mount not found');

    try {
      const res = await fetch(PANEL_SRC, { cache: 'no-store' });
      if (!res.ok) throw new Error(`fetch ${PANEL_SRC} ${res.status}`);
      const html = await res.text();
      root.innerHTML = html;

      // wire up open/close after HTML is in
      const openBtn  = document.getElementById(OPEN_BTN);
      const closeBtn = root.querySelector('#overlay-close, .overlay-close');
      const backdrop = root.querySelector('#overlay-backdrop');
      const panel    = root.querySelector('#overlay-panel');

      const open  = () => { panel?.classList.add('is-open'); backdrop?.classList.add('is-visible'); };
      const close = () => { panel?.classList.remove('is-open'); backdrop?.classList.remove('is-visible'); };

      openBtn?.addEventListener('click', open);
      closeBtn?.addEventListener('click', close);
      backdrop?.addEventListener('click', close);

      // optional: expose for other scripts
      window.AuthPanel = { open, close, root };
    } catch (e) {
      console.error('[auth-panel] failed to load:', e);
    }
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', injectPanel)
    : injectPanel();
})();