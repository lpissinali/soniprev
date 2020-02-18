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
  });
}

if (document.querySelector('.publicacoes__slider-container')) {
  $('.publicacoes__slider-container').slick({
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    variableWidth: true,
  });
}

if (document.querySelector('.presidencia__card')) {
  $('.presidencia__card').each((i, element) => {
    $(element).click(() => {
      $(element).toggleClass('visible');
    });
  });
}
