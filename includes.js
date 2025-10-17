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
    const page = path.split("/").pop(); // Get filename, e.g., "index.html"

    let activeId = "";
    if (page === "index.html" || page === "") {
      activeId = "nav-home";
    } else if (page === "iot-services.html") {
      activeId = "nav-iot";
    } else if (page === "cybersecurity-services.html") {
      // ADD THIS BLOCK
      activeId = "nav-cybersecurity";
    } else if (page === "about-us.html") {
      // ADD THIS LINE
      activeId = "nav-about"; // ADD THIS LINE
    }
    if (activeId) {
      const activeLink = document.getElementById(activeId);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });

  // Load Footer
  loadHTML("footer.html", "footer-placeholder");
});
