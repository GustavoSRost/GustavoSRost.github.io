function checkScroll() {
  function checkScrolling() {
    window.scrollY > 20
      ? document.body.classList.add("scrolled")
      : document.body.classList.remove("scrolled");
  }
  window.addEventListener("scroll", checkScrolling);
}

function dropdownMenu() {
  const button = document.querySelector(".hamburger-button");
  const menu = document.querySelector(".header-menu");
  function toggleMenu(e) {
    e.preventDefault();
    document.body.classList.toggle("hamburgerOpened");
    button.classList.toggle("opened");
    menu.classList.toggle("opened");
  }
  button.addEventListener("click", toggleMenu);
}
function scriptReady() {
  dropdownMenu();
  checkScroll();
}
window.addEventListener("DOMContentLoaded", scriptReady);
