const header = document.querySelector(".header");
const headerMenu = document.querySelector(".header__menu");
const headerBurger = document.querySelector(".header__burger");
const mainContainer = document.querySelector(".main");
const html = document.querySelector('html')


function renderMarginOfMainContainer() {
  if (Number(window.innerWidth) < 1720) {
    let headerHeight = header.clientHeight
    mainContainer.style.marginTop = headerHeight + "px"
  } else {
    mainContainer.style.marginTop = 0 + "px"
  }
}

renderMarginOfMainContainer()

window.addEventListener("resize", () => {
  renderMarginOfMainContainer()
})

headerBurger.addEventListener("click", () => {
  if (
    headerMenu.classList.contains("header__menu--active") &&
    headerBurger.classList.contains("header__burger--active") &&
    html.classList.contains("lock")
  ) {
    headerMenu.classList.remove("header__menu--active");
    headerBurger.classList.remove("header__burger--active");
    html.classList.remove("lock");
  } else {
    headerMenu.classList.add("header__menu--active");
    headerBurger.classList.add("header__burger--active");
    html.classList.add("lock");
  }
});
