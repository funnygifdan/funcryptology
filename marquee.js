/* ===== MARQUEE CONVEYOR (two tracks, no DOM moves) ===== */
(function () {
  const root = document.documentElement;
  const tape = document.querySelector('.tape');
  const rail = tape && tape.querySelector('.rail');
  if (!tape || !rail) return;

  function getSpeed() {
    const v = parseFloat(getComputedStyle(root).getPropertyValue('--pxPerSec')) || 60;
    return Math.max(1, v);
  }

  // clone the strip once; position to the right
  const clone = rail.cloneNode(true);
  clone.classList.add('rail--clone');
  tape.appendChild(clone);

  const dpr = Math.max(1, window.devicePixelRatio || 1);
  function snap(val) {
    return Math.round(val * dpr) / dpr;
  }

  function itemWidth(el) {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const ml = parseFloat(cs.marginLeft) || 0;
    const mr = parseFloat(cs.marginRight) || 0;
    return r.width + ml + mr;
  }

  function measureStripWidth(strip) {
    let sum = 0;
    strip.querySelectorAll(':scope > *').forEach(el => { sum += itemWidth(el); });
    return sum;
  }

  function whenImagesReady(node, cb) {
    const imgs = node.querySelectorAll('img');
    let pending = 0;
    imgs.forEach(img => {
      if (!img.complete) {
        pending++;
        const done = () => { if (--pending <= 0) cb(); };
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      }
    });
    if (pending === 0) cb();
  }

  let total = 0;          /* width of one belt */
  let speed = getSpeed(); /* px/sec */
  let x = 0;              /* offset we scroll by */
  let prev = performance.now();

  function layout() {
    // compute belt width after images have sizes
    total = measureStripWidth(rail);

    // if content is narrower than viewport, duplicate silently inside original
    // so we avoid visible “reset”. This keeps the conveyor seamless.
    const viewportW = tape.getBoundingClientRect().width;
    if (total < viewportW) {
      // add enough copies to exceed viewport
      const kids = Array.from(rail.children);
      let sum = total;
      while (sum < viewportW * 1.5) {
        for (let i = 0; i < kids.length && sum < viewportW * 1.5; i++) {
          rail.appendChild(kids[i].cloneNode(true));
          sum += itemWidth(kids[i]);
        }
      }
      total = measureStripWidth(rail);
    }

    // place clone exactly to the right of the first strip
    rail.style.transform = 'translate3d(0,0,0)';
    clone.style.transform = 'translate3d(' + snap(total) + 'px,0,0)';
  }

  function tick(now) {
    const dt = Math.min(0.05, (now - prev) / 1000);
    prev = now;
    x += speed * dt; // move left visually by adding positive offset

    if (total > 0) x = x % total;

    const tx = snap(-x);
    rail.style.transform = 'translate3d(' + tx + 'px,0,0)';
    clone.style.transform = 'translate3d(' + snap(tx + total) + 'px,0,0)';

    requestAnimationFrame(tick);
  }

  function rebuild() {
    speed = getSpeed();
    x = 0;
    layout();
  }

  whenImagesReady(rail, () => {
    layout();
    requestAnimationFrame(t => { prev = t; tick(t); });
  });

  window.addEventListener('resize', rebuild);
  window.addEventListener('orientationchange', rebuild);
})();