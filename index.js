document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeMenu = document.getElementById("closeMenu");
  const contentArea = document.getElementById("dynamicContent");

  function closeMenuOverlay() {
    menuOverlay.classList.remove("open");
  }

  function toggleMenu() {
    menuOverlay.classList.toggle("open");
  }

  if (menuToggle) menuToggle.addEventListener("click", toggleMenu);
  if (closeMenu) closeMenu.addEventListener("click", closeMenuOverlay);

  const menuLinks = menuOverlay.querySelectorAll("a");
  menuLinks.forEach(link => {
    link.addEventListener("click", e => {
      const url = link.getAttribute("href");
      if (url && !url.startsWith("http")) {
        e.preventDefault();
        contentArea.style.opacity = 0.2;

        fetch(url)
          .then(res => res.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const mainContent = doc.querySelector("main");

            if (mainContent) {
              document.querySelectorAll("link[data-dynamic], script[data-dynamic]").forEach(el => el.remove());
              contentArea.innerHTML = mainContent.innerHTML;
              contentArea.style.transition = "opacity 0.3s ease";
              contentArea.style.opacity = 1;

              // === Book Page ===
              if (url.includes("book/book.html")) {
                if (!document.querySelector('link[href="book/book.css"]')) {
                  const style = document.createElement("link");
                  style.rel = "stylesheet";
                  style.href = "book/book.css";
                  style.setAttribute("data-dynamic", "true");
                  document.head.appendChild(style);
                }

                if (!document.querySelector('script[src="book/book.js"]')) {
                  const script = document.createElement("script");
                  script.src = "book/book.js";
                  script.defer = true;
                  script.setAttribute("data-dynamic", "true");
                  document.body.appendChild(script);
                }
              }

              // === Editor Page ===
              if (url.includes("editor/editor.html")) {
                if (!document.querySelector('link[href="editor/editor.css"]')) {
                  const style = document.createElement("link");
                  style.rel = "stylesheet";
                  style.href = "editor/editor.css";
                  style.setAttribute("data-dynamic", "true");
                  document.head.appendChild(style);
                }

                if (!document.querySelector('script[src="editor/editor.js"]')) {
                  const script = document.createElement("script");
                  script.src = "editor/editor.js";
                  script.defer = true;
                  script.setAttribute("data-dynamic", "true");
                  document.body.appendChild(script);
                }
              }

              // === Threat Map Page ===
              if (url.includes("mainthreat/mainthreat.html")) {
                if (!document.querySelector('link[href="mainthreat/mainthreat.css"]')) {
                  const style = document.createElement("link");
                  style.rel = "stylesheet";
                  style.href = "mainthreat/mainthreat.css";
                  style.setAttribute("data-dynamic", "true");
                  document.head.appendChild(style);
                }

                if (!document.querySelector('script[src="mainthreat/mainthreat.js"]')) {
                  const script = document.createElement("script");
                  script.src = "mainthreat/mainthreat.js";
                  script.defer = true;
                  script.setAttribute("data-dynamic", "true");
                  document.body.appendChild(script);
                }
              }

            } else {
              contentArea.innerHTML = "<p style='color:red;'>No <main> content found in loaded file.</p>";
            }

            closeMenuOverlay();
          })
          .catch(err => {
            contentArea.innerHTML = `<p style="color:red;">Error loading ${url}: ${err.message}</p>`;
            closeMenuOverlay();
          });
      } else {
        closeMenuOverlay();
      }
    });
  });
});


