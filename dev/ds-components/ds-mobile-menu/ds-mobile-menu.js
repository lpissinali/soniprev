/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */

/* -- DS-MOBILE-MENU МОБИЛЬНОЕ МЕНЮ v.2.0.1 */

export default class dsMobileMenu {
  constructor(incomingConfig) {
    // конфиг по умолчанию
    this.defaultConfig = {
      container: '.main-menu', // уникальный класс контейнера компонента
      menuSandwich: '.mob-menu__sandwich', // сендвич меню
      openButton: '.main-menu__open-button', // кнопки для раскрытия меню
      closeButton: '.main-menu__close-button', // кнопки для закрытия меню
      activeClass: 'active', // класс для активации меню
      bodyOverflow: 'main-menu__overflow-hidden', // класс для блокировки скролла
      logging: false, // вывод данных в console.log, true / false
    };
    // входящий конфиг заменяет дефолтный
    this.config = Object.assign({}, this.defaultConfig, incomingConfig);
  }

  // -- ХЕЛПЕРЫ
  // -- логгирование
  log(mes) {
    if (this.config.logging) {
      console.log(`ds-mobile-menu: ${mes}`);
    }
  }

  // открываем меню
  open() {
    document.querySelector(this.config.menuSandwich).classList.add(this.config.activeClass);
    document.querySelector(this.config.container).classList.add(this.config.activeClass);
    document.querySelector('body').classList.add(this.config.bodyOverflow);
  }

  // закрываем меню
  close() {
    document.querySelector(this.config.menuSandwich).classList.remove(this.config.activeClass);
    document.querySelector(this.config.container).classList.remove(this.config.activeClass);
    document.querySelector('body').classList.remove(this.config.bodyOverflow);
  }

  // подписка на открытие
  addOpenListener() {
    if (document.querySelector(this.config.openButton)) {
      document.querySelector(this.config.openButton).addEventListener('click', () => {
        this.open();
      });
    }
  }

  // подписка на закрытие
  addCloseListener() {
    if (document.querySelector(this.config.closeButton)) {
      document.querySelectorAll(this.config.closeButton).forEach(element => {
        element.addEventListener('click', () => {
          this.close();
        });
      });
    }
  }

  // подписка на переключатель
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
    // -- ОТЧЕТ О СТАРТЕ МОДУЛЯ
    this.log(`initialized, class: ${this.config.container}`);
  }
}
