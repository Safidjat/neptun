const swiper1 = new Swiper(".mySwiper1", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        init: function () {
            document.querySelectorAll('.swiper-button-prev, .swiper-button-next').forEach(button => {
                button.style.color = '#ff8300'; 
                button.style.opacity = '.8'; 
            });
        },
        slideChange: function () {
            document.querySelectorAll('.swiper-button-prev, .swiper-button-next').forEach(button => {
                button.style.color = '#ff8300'; 
                button.style.opacity = '.8'; 
            });

        },
      },
      slidesPerView: 1, 
      spaceBetween: 0,  
      watchOverflow: true,
      breakpoints: {
          770: {
              slidesPerView: 2,
              spaceBetween: 5,
          },
          1000:{
              slidesPerView: 3,
              spaceBetween: 5,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
      },
});
const swiper2 = new Swiper(".mySwiper2", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 2,
  spaceBetween: 5,
  watchOverflow: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      let breakpoint = window.innerWidth >= 1000 ? 2 : 3;
      if(window.innerWidth>=1200) breakpoint =5
      if (index < breakpoint) {
        return `<span class="${className}" data-index="${index}"></span>`;
      }
      return '';
    },
  },
  speed: 6000,
  autoplay: {
    delay: 10000,
  },
  on: {
    init: function () {
      updateCustomPagination(this);
    },
    slideChange: function () {
      updateCustomPagination(this);
    },
    resize: function () {
      this.pagination.render(); 
      updateCustomPagination(this); 
    },
    touchStart: function () {
      this.params.speed = 600;
      this.autoplay.stop();
    },
    transitionEnd: function () {
      if (!this.autoplay.running) {
        // this.params.speed = 3500;
        this.autoplay.start();
      }
    },
  },
  breakpoints: {
    1000: {
      slidesPerView: 3,
      spaceBetween: 5,
    },
    1200: {
      slidesPerView: 1,
    },
  },
});

function updateCustomPagination(swiper) {
  const paginationBullets = document.querySelectorAll(".pag .swiper-pagination .swiper-pagination-bullet");
   let breakpoint = window.innerWidth >= 1000 ? 2 : 3;
   if(window.innerWidth>=1200) breakpoint =5

  paginationBullets.forEach((bullet, index) => {
    if (
      (breakpoint === 3 && (
        (index === 0 && swiper.realIndex < 2) ||
        (index === 1 && swiper.realIndex >= 2 && swiper.realIndex < 4) ||
        (index === 2 && swiper.realIndex >= 4)
      )) ||
      (breakpoint === 2 && (
        (index === 0 && swiper.realIndex <= 2) ||
        (index === 1 && swiper.realIndex >= 3)
      )) ||
      (breakpoint === 5 && (
        (index === 0 && swiper.realIndex == 0) ||
        (index === 1 && swiper.realIndex == 1) ||
        (index === 2 && swiper.realIndex == 2) ||
        (index === 3 && swiper.realIndex == 3) ||
        (index === 4 && swiper.realIndex == 4) 
      ))
    ) {
      bullet.classList.add("swiper-pagination-bullet-active");
    } else {
      bullet.classList.remove("swiper-pagination-bullet-active");
    }
  });
}

document.querySelectorAll('.pag .swiper-pagination-bullet').forEach((bullet, index) => {
  bullet.addEventListener('click', () => {
    // swiper2.params.speed = 600;
    if (index === 0) {
      swiper2.slideTo(0); 
    } else if (index === 1) {
      swiper2.slideTo(2); 
    } else if (index === 2) {
      swiper2.slideTo(4); 
    }
  });
});

const swiper3 = new Swiper(".mySwiper3", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        init: function () {
            document.querySelectorAll('.swiper-button-prev, .swiper-button-next').forEach(button => {
                button.style.color = '#ff8300'; 
                button.style.opacity = '.8'; 
            });
        },
        slideChange: function () {
            document.querySelectorAll('.swiper-button-prev, .swiper-button-next').forEach(button => {
                button.style.color = '#ff8300'; 
                button.style.opacity = '.8'; 
            });

        },
      },
      slidesPerView: 2, 
      spaceBetween: 10,  
      watchOverflow: true,
      breakpoints: {
          495: {
              slidesPerView: 3,
              spaceBetween: 10,
          },
          776:{
              slidesPerView: 4,
              spaceBetween: 10,
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
      },
});


const swiper4 = new Swiper(".mySwiper4", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        init: function () {
            document.querySelectorAll('.swiper-button-prev, .swiper-button-next').forEach(button => {
                button.style.color = '#ff8300'; 
                button.style.opacity = '.8'; 
            });
        },
        slideChange: function () {
            document.querySelectorAll('.swiper-button-prev, .swiper-button-next').forEach(button => {
                button.style.color = '#ff8300'; 
                button.style.opacity = '.8'; 
            });

        },
      },
      slidesPerView: 1, 
      effect: "fade",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop:true,
});

