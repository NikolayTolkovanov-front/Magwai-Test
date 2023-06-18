// swiper

const paginationItems = ["Dogie", "Падение", "Возвращение"]

const customPaginationItem = (index, className) => {
  return '<span class="' + className + '">' + paginationItems[index] + "</span>";
}

const mainSwiper = new Swiper('.main__swiper-container', {
  direction: "vertical",
  
  // loop: true,
  pagination: {
    el: ".main__swiper-pagination",
    clickable: true,
    type: "bullets",
    renderBullet: customPaginationItem,
  },

});