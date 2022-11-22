function checkScrolling() {
  window.scrollY > 20
    ? document.body.classList.add("scrolled")
    : document.body.classList.remove("scrolled");
}
window.addEventListener("scroll", checkScrolling);
