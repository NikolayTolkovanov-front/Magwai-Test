// swiper

const paginationItems = ["Dogie", "Падение", "Возвращение"];

const customPaginationItem = (index, className) => {
  return (
    '<span class="' + className + '">' + paginationItems[index] + "</span>"
  );
};

const mobilePaginationItem = (index, className) => {
  return '<span class="' + className + '">' + "</span>";
};

const mainSwiper = new Swiper(".main__swiper-container", {
  direction: "vertical",
  pagination: {
    el: ".main__swiper-pagination",
    clickable: true,
    type: "bullets",
    renderBullet: customPaginationItem,
  },

  breakpoints: {
    320: {
      direction: "vertical",
      pagination: {
        el: ".main__swiper-pagination",
        clickable: true,
        type: "bullets",
        renderBullet: mobilePaginationItem,
      },
    },

    768: {
      direction: "vertical",
      pagination: {
        el: ".main__swiper-pagination",
        clickable: true,
        type: "bullets",
        renderBullet: customPaginationItem,
      },
    },
  },
});
