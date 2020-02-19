// project styles
import '../common/scss/main.scss';

import { dsMobileMenu } from '../ds-components/ds-components';
import initMap from "./modules/googleMaps";

require('./polyfills/polyfills');

require('./libs/jquery-custom-select/jquery.custom-select');

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

/**
 * map init
 */
if (document.querySelector(".main-map__map-container") !== null) {
  initMap();
}

/**
 * forms test validation
 */
if ($('form').length > 0) {
  $('form').each(function () {
    $(this)[0].addEventListener('submit', function(event) {
      if ($(this)[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      $(this)[0].classList.add('was-validated');
    }, false);          
  });
}

/**
 * datepickers init
 */
if ($('.datepicker').length > 0) {
  $('.datepicker').each(function () {
      let id = $(this).attr('id');
      $('#' + id + ' input').datepicker({
          maxViewMode: 2,
          orientation: "bottom left",
          autoclose: true,
          format: 'dd/mm/yyyy',
          container: '#' + id,
      });
  });
}

//custom selects
if ($('select').length > 0) {
  $('select').each(function () {
    $(this).customSelect({});
  });
}

/**
 * file inputs
 */
if ($('.custom-file-input').length > 0) {
  $('.custom-file-input').each(function () {
    $(this).on('change',function(e){
      var fileName = $(this)[0].files[0].name;
      var nextSibling = e.target.nextElementSibling;
      nextSibling.innerText = fileName;
      $(nextSibling).addClass('custom-file-label--value');
    })
  });
}
