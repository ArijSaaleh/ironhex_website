document.addEventListener("DOMContentLoaded", function () {
  // Function to load HTML includes
  function loadHTML(url, elementId, callback) {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById(elementId).innerHTML = data;
        if (callback) callback();
      })
      .catch((error) => console.error(`Error loading ${url}:`, error));
  }

  // Load Navbar
  loadHTML("navbar.html", "navbar-placeholder", function () {
    // Mark active link after navbar is loaded
    const path = window.location.pathname;
    const page = path.split("/").pop(); 

    let activeId = "";
    if (page === "index.html" || page === "") {
      activeId = "nav-home";
    } else if (page === "iot-services.html") {
      activeId = "nav-iot";
    } else if (page === "pricing.html") {
      activeId = "nav-pricing";
    } else if (page === "cybersecurity-services.html") {
      activeId = "nav-cybersecurity";
    } else if (page === "about-us.html") {
      activeId = "nav-about";
    }
    if (activeId) {
      const activeLink = document.getElementById(activeId);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }

    // Mobile nav toggle behavior (works on injected content)
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', String(!expanded));
        navLinks.classList.toggle('open');
      });

      // Close menu when a link is clicked (helpful on mobile)
      navLinks.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', function () {
          if (navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
          }
        });
      });

      // Ensure menu closes on window resize to larger screens
      window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  // Load Footer
  loadHTML("footer.html", "footer-placeholder");
});
