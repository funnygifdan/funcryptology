// Swipe logic
let currentPage = 0;
let startX = 0;
let isSwiping = false;
const totalPages = 3;
const swipeArea = document.getElementById('swipeArea');
const container = document.getElementById('swipeContainer');

swipeArea.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isSwiping = true;
});

swipeArea.addEventListener('touchend', () => {
  isSwiping = false;
});

swipeArea.addEventListener('touchmove', e => {
  if (!isSwiping) return;

  const dx = e.touches[0].clientX - startX;

  if (Math.abs(dx) > 50) {
    isSwiping = false;

    if (dx < 0 && currentPage < totalPages - 1) {
      currentPage++;
    } else if (dx > 0 && currentPage > 0) {
      currentPage--;
    }

    container.style.transform = `translateX(-${currentPage * 100}%)`;
  }
});