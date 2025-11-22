document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");

  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 4) {
      header.classList.add("site-header--scrolled");
    } else {
      header.classList.remove("site-header--scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = document.getElementById("login-email");
      const passwordInput = document.getElementById("login-password");

      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";

      // Very simple front-end demo check – not secure, only for prototype use
      if (email === "liumgo@gmail.com" && password === "1234") {
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid credentials. Please use the login or contact your admin.");
      }
    });
  }
});
