export default class dsMobileMenu {
  constructor(incomingConfig) {
    this.defaultConfig = {
      container: '.main-menu',
      menuSandwich: '.mob-menu__sandwich',
      openButton: '.main-menu__open-button',
      closeButton: '.main-menu__close-button',
      activeClass: 'active',
      bodyOverflow: 'main-menu__overflow-hidden',
      logging: false,
    };

    this.config = Object.assign({}, this.defaultConfig, incomingConfig);
  }

  log(mes) {
    if (this.config.logging) {
      console.log(`ds-mobile-menu: ${mes}`);
    }
  }

  open() {
    document.querySelector(this.config.menuSandwich).classList.add(this.config.activeClass);
    document.querySelector(this.config.container).classList.add(this.config.activeClass);
    document.querySelector('body').classList.add(this.config.bodyOverflow);
  }

  close() {
    document.querySelector(this.config.menuSandwich).classList.remove(this.config.activeClass);
    document.querySelector(this.config.container).classList.remove(this.config.activeClass);
    document.querySelector('body').classList.remove(this.config.bodyOverflow);
  }

  addOpenListener() {
    if (document.querySelector(this.config.openButton)) {
      document.querySelector(this.config.openButton).addEventListener('click', () => {
        this.open();
      });
    }
  }

  addCloseListener() {
    if (document.querySelector(this.config.closeButton)) {
      document.querySelectorAll(this.config.closeButton).forEach(element => {
        element.addEventListener('click', () => {
          this.close();
        });
      });
    }
  }

  addTriggerListener() {
    if (document.querySelector(this.config.menuSandwich)) {
      document.querySelector(this.config.menuSandwich).addEventListener('click', () => {
        if (!document.querySelector(this.config.menuSandwich).classList.contains('active')) {
          this.open();
        } else {
          this.close();
        }
      });
    }
  }

  init() {
    this.addOpenListener();
    this.addCloseListener();
    this.addTriggerListener();
    this.log(`initialized, class: ${this.config.container}`);
  }
}
