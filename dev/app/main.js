// подключаем стили проекта
import '../common/scss/main.scss';

import { dsMobileMenu } from '../ds-components/ds-components';

// подключаем полифиллы
require('./polyfills/polyfills');

const mobileMenu = new dsMobileMenu({
  container: '.main-header__navigation',
  menuSandwich: '.main-header__mobile-menu-container',
  closeButton: '.mob-menu-close-btn',
}); 

mobileMenu.init();

if (document.querySelector('.main-slider__wrapper')) {
  $('.main-slider__wrapper').slick({
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    // prevArrow: document.querySelector('.reviews__slider-prev-button'),
    // nextArrow: document.querySelector('.reviews__slider-next-button'),
    // responsive: [
    //   {
    //     breakpoint: 1200,
    //     settings: {
    //       slidesToShow: 3,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 3,
    //     },
    //   },
    // ],
  });
}
