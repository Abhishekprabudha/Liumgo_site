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
