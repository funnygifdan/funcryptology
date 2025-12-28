// Toggle menu open/close
document.getElementById('menuToggle').addEventListener('click', () => {
  const footer = document.getElementById('footer');
  footer.classList.toggle('open');
});

// Only handle internal links with data-link that DON'T start with "http"
document.querySelectorAll('[data-link]').forEach(link => {
  const target = link.getAttribute('data-link');

  if (!target.startsWith('http')) {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Stop normal link behavior

      fetch(`${target}.html`)
        .then(res => res.text())
        .then(html => {
          document.getElementById('mainDynamicContent').innerHTML = html;
          window.scrollTo(0, 0);
        })
        .catch(err => {
          document.getElementById('mainDynamicContent').innerHTML =
            "<p style='color:red;'>Error loading content.</p>";
          console.error(err);
        });
    });
  }
});

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