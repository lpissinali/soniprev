/* eslint-disable no-inner-declarations */
/* eslint-disable for-direction */
/* eslint-disable func-names */
/**
 * @module FullPageScroll
 * @author donrus
 * @description Модуль для организации постраничной прокрутки в виде слайд эффекта
 */

(function($) {
  const DIRECTION_UP = 'up';
  const DIRECTION_DOWN = 'down';
  const SECTIONS_ARRAY = [];
  SECTIONS_ARRAY.push(document.querySelector('.first-screen'));
  SECTIONS_ARRAY.push(document.querySelector('.prizes'));
  // SECTIONS_ARRAY.push(document.querySelector('.winners'));
  const lastSection = SECTIONS_ARRAY[SECTIONS_ARRAY.length - 1];

  let direction = DIRECTION_DOWN;
  let currentSectionNumber = 0;
  let scrolling = false;

  /**
   *
   * @param {Event} e - событие скролл
   */
  function detectMouseWheelDirection(e) {
    let delta = null;
    if (!e) {
      e = window.event;
    }
    if (e.wheelDelta) {
      delta = e.wheelDelta / 60;
    } else if (e.detail) {
      delta = -e.detail / 2;
    }
    if (delta !== null) {
      direction = delta > 0 ? DIRECTION_UP : DIRECTION_DOWN;
    }
  }

  function detectScrollOportunity() {
    /**
     * прокрутка футера
     */
    if (currentSectionNumber === SECTIONS_ARRAY.length - 1) {
      return true;
    }
    /**
     * запретить прокрутку вниз
     */
    if (direction === DIRECTION_DOWN && currentSectionNumber + 1 >= SECTIONS_ARRAY.length) {
      return false;
    }
    /**
     * запретить прокрутку вверх
     */
    if (direction === DIRECTION_UP && currentSectionNumber - 1 < 0) {
      return false;
    }
    return true;
  }

  function createCSSClass(className, styles) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `.${className} {${styles}}`;
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  function isMobileDevice() {
    let isMobile = false;
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      )
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      isMobile = true;
    }
    return isMobile;
  }

  function cssAnimation(animatedElement, animationClass, directionFlag = true) {
    return new Promise((resolve, reject) => {
      if (directionFlag) {
        animatedElement.classList.add(animationClass);
      } else {
        animatedElement.classList.remove(animationClass);
      }
      const onCssAnimationEnd = event => {
        if (event.target === animatedElement) {
          resolve();
          animatedElement.removeEventListener('animationend', onCssAnimationEnd);
          animatedElement.removeEventListener('transitionend', onCssAnimationEnd);
        }
      };
      animatedElement.addEventListener('animationend', onCssAnimationEnd);
      animatedElement.addEventListener('transitionend', onCssAnimationEnd);
    });
  }

  function scrollUp(section) {
    cssAnimation(section, 'show-up').then(() => {
      if (section.classList.contains('first-screen')) {
      }
      if (section.classList.contains('prizes')) {
      }
      section.className = section.className.replace(/hide-up/g, '');
      section.className = section.className.replace(/show-up/g, '');
      currentSectionNumber -= 1;
      scrolling = false;
    });
  }

  function scrollDown(section) {
    cssAnimation(section, 'hide-up').then(() => {
      if (section.classList.contains('first-screen')) {
      }
      if (section.classList.contains('prizes')) {
      }
      currentSectionNumber += 1;
      scrolling = false;
    });
  }

  // function scrollFooter() {
  //   if (lastSection.classList.contains('show-footer') && direction === DIRECTION_DOWN) {
  //     scrolling = false;
  //     return;
  //   }
  //   if (direction === DIRECTION_DOWN) {
  //     cssAnimation(lastSection, 'show-footer').then(() => {
  //       scrolling = false;
  //     });
  //   }
  //   if (direction === DIRECTION_UP) {
  //     cssAnimation(lastSection, 'hide-footer').then(() => {
  //       scrolling = false;
  //       lastSection.className = lastSection.className.replace(/hide-footer/g, '');
  //       lastSection.className = lastSection.className.replace(/show-footer/g, '');
  //     });
  //   }
  // }

  function scrollSection() {
    if (!detectScrollOportunity()) {
      scrolling = false;
      return;
    }

    /**
     * если текущая - это последняя секция и у нее есть класс show-footer, т.е. футер уже на экране, то прокручиваем футер
     * если текущая - это последняя секция и у нее нет класса show-footer, т.е. футера нет на экране и скрол вниз, то прокручиваем футер
     */
    // if (
    //   (lastSection.classList.contains('show-footer')
    //     && currentSectionNumber === SECTIONS_ARRAY.length - 1)
    //   || (!lastSection.classList.contains('show-footer')
    //     && currentSectionNumber === SECTIONS_ARRAY.length - 1
    //     && direction === DIRECTION_DOWN)
    // ) {
    //   /**
    //    * прокручиваем футер
    //    */
    //   scrollFooter();
    //   return;
    // }

    if (direction === DIRECTION_DOWN && currentSectionNumber === 1) {
      scrolling = false;
    } else {
      if (direction === DIRECTION_DOWN) {
        scrollDown(SECTIONS_ARRAY[currentSectionNumber]);
      }

      if (direction === DIRECTION_UP) {
        scrollUp(SECTIONS_ARRAY[currentSectionNumber - 1]);
      }
    }
  }

  function scrollFromMenu(scrollToSectionIndex) {
    const deltaScroll = scrollToSectionIndex - currentSectionNumber;

    if (deltaScroll > 0) {
      for (let i = 0; i < deltaScroll; i++) {
        scrollDown(SECTIONS_ARRAY[currentSectionNumber + i]);
      }
    }

    if (deltaScroll < 0) {
      for (let i = scrollToSectionIndex; i < currentSectionNumber; i++) {
        scrollUp(SECTIONS_ARRAY[i]);
      }
    }
  }

  function initNavEventListeners() {
    $('.first-section-link').click(e => {
      scrollFromMenu(0);
    });
    $('.rules-link').click(e => {
      scrollFromMenu(1);
    });
    // $('.winners-link').click(e => {
    //   scrollFromMenu(2);
    // });
  }

  if (!isMobileDevice()) {
    $(document).on('DOMMouseScroll', e => {
      if (!scrolling) {
        // проверка на модалку если true то не скролим
        if (!document.body.classList.contains('ds-modal__overflow-hidden')) {
          console.log('scrolling');
          scrolling = true;
          detectMouseWheelDirection(e);
          requestAnimationFrame(scrollSection);
        }
      }
    });
    window.onmousewheel = function(e) {
      if (!scrolling) {
        scrolling = true;
        detectMouseWheelDirection(e);
        requestAnimationFrame(scrollSection);
      }
    };
    initNavEventListeners();
  } else {
    for (let i = 0; i < SECTIONS_ARRAY.length; i++) {
      SECTIONS_ARRAY[i].classList.remove('position-absolute', 'display-none');
    }
    document.querySelector('.main-content').classList.remove('main-content-for-scrolling');

    // мобильное меню
    function showHideMobileMenu() {
      if ($('.main-header__sandwich-menu').hasClass('active')) {
        $('.main-header__sandwich-menu').removeClass('active');
        $('.main-header__nav').removeClass('active');
        $('body').removeClass('overflow-hidden');
      } else {
        $('.main-header__sandwich-menu').addClass('active');
        $('.main-header__nav').addClass('active');
        $('body').addClass('overflow-hidden');
      }
    }
    // открытие закрытие моб меню с кнопки сендвича
    $('.main-header__sandwich-menu').click(() => {
      showHideMobileMenu();
    });
    // открытие закрытие моб меню при клике по меню
    $('.main-header__nav-item').click(() => {
      showHideMobileMenu();
    });

    // переходы по моб меню
    $('.rules-link').click(() => {
      const { top } = $('.prizes').offset();
      $('body,html').animate({ scrollTop: top }, 300);
    });
    // $('.winners-link').click(() => {
    //   const { top } = $('.winners').offset();
    //   $('body,html').animate({ scrollTop: top }, 500);
    // });
  }
}(jQuery));
