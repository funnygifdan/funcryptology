/* menu.js – footer button controls overlay (open/close + accessibility) */
(function () {
function init(){
const btn = document.getElementById('footer-menu-btn');
const backdrop = document.getElementById('overlay-backdrop');
const panel = document.getElementById('overlay-panel');
const closeBtn = document.getElementById('overlay-close');

if(!btn || !backdrop || !panel){
return;
}

const inner = panel.querySelector('.overlay-inner') || panel;

let lastFocused = null;

function openMenu(){
lastFocused = document.activeElement;
btn.setAttribute('aria-expanded','true');
backdrop.hidden = false;
panel.hidden = false;

requestAnimationFrame(() => {
if(typeof inner.focus === 'function'){
inner.focus();
}
});

document.body.style.overflow = 'hidden';
}

function closeMenu(){
btn.setAttribute('aria-expanded','false');
backdrop.hidden = true;
panel.hidden = true;
document.body.style.overflow = '';

if(lastFocused && typeof lastFocused.focus === 'function'){
lastFocused.focus();
return;
}
btn.focus();
}

btn.addEventListener('click', () => {
const open = btn.getAttribute('aria-expanded') === 'true';
if(open){
closeMenu();
return;
}
openMenu();
});

if(closeBtn){
closeBtn.addEventListener('click', closeMenu);
}

backdrop.addEventListener('click', closeMenu);

window.addEventListener('keydown', (e) => {
if(e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true'){
closeMenu();
}
});

/* ===== basic focus trap inside overlay ===== */
panel.addEventListener('keydown', (e) => {
if(e.key !== 'Tab'){
return;
}

const nodes = Array.from(panel.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])'))
.filter(el => !el.hasAttribute('disabled'));

if(!nodes.length){
return;
}

const first = nodes[0];
const last = nodes[nodes.length - 1];

if(e.shiftKey && document.activeElement === first){
e.preventDefault();
last.focus();
return;
}

if(!e.shiftKey && document.activeElement === last){
e.preventDefault();
first.focus();
return;
}
});
}

/* ===== ensure DOM is ready ===== */
if(document.readyState === 'loading'){
document.addEventListener('DOMContentLoaded', init);
return;
}
init();
})();