const isDesktop = false;

const slideTime = 1000;
let footer_height = $('footer').outerHeight();

let isInit = false;
const mainLandingItems = $('.slider-container .item');
mainLandingItems.eq(mainLandingItems.length - 2).addClass('slider-container_last_item');
let main_landing = new Swiper('.slider-container', {
  init: false,
  speed: 0,
  direction: 'vertical',
  resistanceRatio: 0,
  spaceBetween: 0,
  slidesPerView: 1,
  simulateTouch: false,
  allowTouchMove: true,
  loop: false,
  virtualTranslate: true,
});

main_landing.on('slideChange', landingSlidig);

function landingSlidig() {
  main_landing.allowSlideNext = false;
  main_landing.allowSlidePrev = false;
  console.log('changed');
  setTimeout(() => {
    main_landing.allowSlideNext = true;
    main_landing.allowSlidePrev = true;
  }, slideTime);
  // if (main_landing.activeIndex + 1 === $('.slider-container .item').length) {
  //   // мы на последней сцене
  //   $('#winners').css({
  //     top: `${-footer_height}px`,
  //   });
  //   $('#footer').css({
  //     top: `${-footer_height}px`,
  //   });
  // }
  // if (main_landing.activeIndex + 1 === $('.slider-container .item').length - 1) {
  //   // мы на ПРЕДпоследней сцене
  //   $('#winners').css({
  //     top: '0px',
  //   });
  //   $('#footer').css({
  //     top: '0px',
  //   });
  // }
}

function detectMouseWheelDirection(e) {
  let delta = null;
  let direction = false;
  if (!e) {
    e = window.event;
  }
  if (e.wheelDelta) {
    delta = e.wheelDelta / 60;
  } else if (e.detail) {
    delta = -e.detail / 2;
  }
  if (delta !== null) {
    direction = delta > 0 ? 'up' : 'down';
  }

  return direction;
}

function handleMouseWheelDirection(direction) {
  // console.log( direction );
  if (direction === 'down') {
    if (main_landing.activeIndex + 1 === $('.slider-container .item').length) {
      // мы на последней сцене
    } else {
      main_landing.slideNext();
    }
  } else if (direction === 'up') {
    if (main_landing.activeIndex === 0) {
      // мы на первой сцене
    } else {
      main_landing.slidePrev();
    }
  } else {
    // the direction of the mouse wheel could not be determined
  }
}

const elemIntro = document.getElementById('landing');

elemIntro.onmousewheel = function(e) {
  if (isInit) {
    handleMouseWheelDirection(detectMouseWheelDirection(e));
  }
};

if (window.addEventListener) {
  elemIntro.addEventListener('DOMMouseScroll', e => {
    if (isInit) {
      handleMouseWheelDirection(detectMouseWheelDirection(e));
    }
  });
}

$(window).on('load', () => {
  checkSizes();
  if ($(window).width() >= 1000) {
    setTimeout(() => {
      $(window).scrollTop(0);
    }, 1);
  }
});

$(window).on('resize orientationchange', () => {
  checkSizes();
});

function checkSizes() {
  footer_height = $('footer').outerHeight();
  if ($(window).width() < 1000) {
    if (isInit) {
      main_landing.destroy();
      isInit = false;
    }
  } else if (!isInit) {
    if (main_landing.destroyed) {
      main_landing = new Swiper('.slider-container', {
        init: false,
        speed: 0,
        direction: 'vertical',
        resistanceRatio: 0,
        spaceBetween: 0,
        slidesPerView: 1,
        simulateTouch: false,
        allowTouchMove: true,
        loop: false,
        virtualTranslate: true,
      });
      main_landing.on('slideChange', landingSlidig);
    }
    main_landing.init();

    isInit = true;
  }
}
