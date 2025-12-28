function summonSpirit() {
  const spirit = document.getElementById('spiritLady');
  if (!spirit) return;

  spirit.style.opacity = 1;
  spirit.style.animation = 'flickerIn 1.5s ease-in-out';

  setTimeout(() => {
    spirit.style.opacity = 0;
    spirit.style.animation = 'none'; // Reset for next summon
  }, 2000);
}

// Trigger on scroll near bottom
window.addEventListener('scroll', () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
  if (nearBottom) {
    summonSpirit();
  }
});

// Trigger on any touch or click (aka "window contact")
window.addEventListener('touchstart', summonSpirit);
window.addEventListener('click', summonSpirit);