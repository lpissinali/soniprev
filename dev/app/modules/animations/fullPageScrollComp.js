import './fullPageScroll.scss';

const DIRECTION_UP = 'up';
const DIRECTION_DOWN = 'down';

const defaultOptions = {
  sectionsArray: [
    {
      linkSelector: '',
      sectionSelector: '',
      beforeScrollIn: () => {},
      beforeScrollOut: () => {},
      scrollOut: () => {},
      scrollIn: () => {},
      afterScrollIn: () => {},
      afterScrollOut: () => {},
    },
  ],
  footerOptions: {
    footerSelector: '',
    footerWithinLastSection: true,
    beforeScrollIn: () => {},
    beforeScrollOut: () => {},
    scrollOut: () => {},
    scrollIn: () => {},
    afterScrollIn: () => {},
    afterScrollOut: () => {},
  },
};

const createCSSClass = (className, styles) => {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `.${className} {${styles}}`;
  document.getElementsByTagName('head')[0].appendChild(style);
};

const isMobileDevice = () => {
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
};

const cssAnimation = (animatedElement, animationClass, directionFlag = true) => {
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
};

const FullPageScroll = class FullPageScroll {
  constructor(options) {
    this.options = { defaultOptions, ...options };
    this.initSectionsArray();
    this.state = {
      lastSectionIndex: this.options.sectionsArray[this.options.sectionsArray.length - 1],
      direction: DIRECTION_DOWN,
      currentSectionNumber: 0,
      scrolling: false,
      isFooterShowed: false,
    };
  }

  init() {
    if (!isMobileDevice()) {
      this.initSectionsArray();
      this.initSections();
      if (this.options.footerOptions) {
        this.initFooter();
      }
      this.initMouseEventListeners();
      this.initNavEventListeners();
    }
  }

  initSectionsArray() {
    for (let i = 0; i < this.options.sectionsArray.length; i++) {
      const sectionElement = document.querySelector(this.options.sectionsArray[i].sectionSelector);
      this.options.sectionsArray[i].sectionElement = sectionElement;
    }
  }

  initNavEventListeners() {
    for (let i = 0; i < this.options.sectionsArray.length; i++) {
      if (this.options.sectionsArray[i].linkSelector !== '') {
        document
          .querySelector(this.options.sectionsArray[i].linkSelector)
          .addEventListener('click', event => {
            this.scrollFromMenu(i);
          });
      }
    }
  }

  initMouseEventListeners() {
    document.addEventListener('DOMMouseScroll', event => {
      if (!this.state.scrolling) {
        this.state.scrolling = true;
        this.detectMouseWheelDirection(event);
        requestAnimationFrame(this.scrollSection.bind(this));
      }
    });
    window.onmousewheel = event => {
      if (!this.state.scrolling) {
        this.state.scrolling = true;
        this.detectMouseWheelDirection(event);
        requestAnimationFrame(this.scrollSection.bind(this));
      }
    };
  }

  initFooter() {
    const footerHeight = document.querySelector(this.options.footerOptions.footerSelector)
      .offsetHeight;
    createCSSClass(
      'show-footer',
      `transform: translate3d(0,-${footerHeight}px,0); transition: transform .5s; transition-delay: 1ms;`
    );

    createCSSClass(
      'hide-footer',
      'transform: translate3d(0,0,0); transition: transform .5s; transition-delay: 1ms;'
    );

    createCSSClass(
      'footer-fixed',
      `position: fixed; z-index: 15; width: 100%; bottom: -${footerHeight}px;`
    );

    this.options.footerOptions.footerElement = document.querySelector(
      this.options.footerOptions.footerSelector
    );

    this.options.footerOptions.footerElement.classList.add('footer-fixed');
  }

  initSections() {
    for (let i = 0; i < this.options.sectionsArray.length; i++) {
      this.options.sectionsArray[i].sectionElement.classList.add('position-fixed');
      if (i > 0) {
        this.options.sectionsArray[i].sectionElement.classList.add('display-none');
      }
    }
    this.options.sectionsArray[0].sectionElement.parentNode.classList.add(
      'main-content-for-scrolling'
    );
  }

  /**
   *
   * @param {Event} event - событие скролл
   */
  detectMouseWheelDirection(event) {
    let delta = null;
    if (!event) {
      event = window.event;
    }
    if (event.wheelDelta) {
      delta = event.wheelDelta / 60;
    } else if (event.detail) {
      delta = -event.detail / 2;
    }
    if (delta !== null) {
      this.state.direction = delta > 0 ? DIRECTION_UP : DIRECTION_DOWN;
    }
  }

  canScroll(currentSectionNumber, sectionsArrayLength, direction) {
    if (
      direction === DIRECTION_DOWN
      && currentSectionNumber === sectionsArrayLength - 1
      && this.state.isFooterShowed
    ) {
      return false;
    }
    if (direction === DIRECTION_UP && currentSectionNumber === 0) {
      return false;
    }
    return true;
  }

  async scrollActions(currentSection, nextSection) {
    let isParallel = false;
    if (currentSection.isParallel && nextSection.isParallel) {
      isParallel = true;
    }
    if (this.state.direction === DIRECTION_DOWN) {
      if (currentSection.beforeScrollDownOut) {
        await currentSection.beforeScrollDownOut();
      }
      if (nextSection.beforeScrollDownIn) {
        await nextSection.beforeScrollDownIn();
      }
      if (currentSection.scrollDownOut && nextSection.scrollDownIn) {
        if (isParallel) {
          await Promise.all([currentSection.scrollDownOut(), nextSection.scrollDownIn()]);
        } else {
          await currentSection.scrollDownOut();
          await nextSection.scrollDownIn();
        }
      } else {
        if (currentSection.scrollDownOut) {
          await currentSection.scrollDownOut();
        }
        if (nextSection.scrollDownIn) {
          await nextSection.scrollDownIn();
        }
      }

      if (currentSection.afterScrollDownOut) {
        await currentSection.afterScrollDownOut();
      }
      if (nextSection.afterScrollDownIn) {
        await nextSection.afterScrollDownIn();
      }
    }
    if (this.state.direction === DIRECTION_UP) {
      if (currentSection.beforeScrollUpOut) {
        await currentSection.beforeScrollUpOut();
      }
      if (nextSection.beforeScrollUpIn) {
        await nextSection.beforeScrollUpIn();
      }
      if (currentSection.scrollUpOut && nextSection.scrollUpIn) {
        if (isParallel) {
          await Promise.all([currentSection.scrollUpOut(), nextSection.scrollUpIn()]);
        } else {
          await currentSection.scrollUpOut();
          await nextSection.scrollUpIn();
        }
      } else {
        if (currentSection.scrollUpOut) {
          await currentSection.scrollUpOut();
        }
        if (nextSection.scrollUpIn) {
          await nextSection.scrollUpIn();
        }
      }
      if (currentSection.afterScrollUpOut) {
        await currentSection.afterScrollUpOut();
      }
      if (nextSection.afterScrollUpIn) {
        await nextSection.afterScrollUpIn();
      }
    }
  }

  async scrollSection() {
    if (
      !this.canScroll(
        this.state.currentSectionNumber,
        this.options.sectionsArray.length,
        this.state.direction
      )
    ) {
      this.state.scrolling = false;
      return;
    }

    if (this.state.direction === DIRECTION_DOWN) {
      if (this.state.currentSectionNumber === this.options.sectionsArray.length - 1) {
        if (this.options.footerOptions) {
          await this.scrollActions(
            this.options.sectionsArray[this.state.currentSectionNumber],
            this.options.footerOptions
          );
          this.state.isFooterShowed = true;
        }
        this.state.scrolling = false;
      } else {
        await this.scrollActions(
          this.options.sectionsArray[this.state.currentSectionNumber],
          this.options.sectionsArray[this.state.currentSectionNumber + 1]
        );
        this.state.currentSectionNumber += 1;
        this.state.scrolling = false;
      }
    }

    if (this.state.direction === DIRECTION_UP) {
      if (
        this.state.currentSectionNumber === this.options.sectionsArray.length - 1
        && this.state.isFooterShowed
      ) {
        await this.scrollActions(
          this.options.footerOptions,
          this.options.sectionsArray[this.state.currentSectionNumber]
        );
        this.state.isFooterShowed = false;
        this.state.scrolling = false;
      } else {
        await this.scrollActions(
          this.options.sectionsArray[this.state.currentSectionNumber],
          this.options.sectionsArray[this.state.currentSectionNumber - 1]
        );
        this.state.currentSectionNumber -= 1;
        this.state.scrolling = false;
      }
    }
  }

  scrollFromMenu(scrollToSectionIndex) {
    const deltaScroll = scrollToSectionIndex - this.state.currentSectionNumber;

    if (deltaScroll > 0) {
      this.state.direction = DIRECTION_DOWN;
      for (let i = this.state.currentSectionNumber; i < deltaScroll; i++) {
        this.scrollSection();
      }
    }
  }
};

export default FullPageScroll;
