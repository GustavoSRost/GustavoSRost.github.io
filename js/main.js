function detectmob() {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
}
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

function slickExp() {
  if (detectmob()) {
    $(".experiencia .empresas").slick({
      dots: true,
      infinite: true,
      speed: 600,
      arrows: false,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
    });
  }
}

function scriptReady() {
  try {
    dropdownMenu();
    checkScroll();
    slickExp();
  } catch (e) {
    throw new Error(e.message);
  }
}
window.addEventListener("DOMContentLoaded", scriptReady);
