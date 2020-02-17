/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */

/* -- DS-MODAL МОДАЛЬНОЕ ОКНО v.2.0.1 */

export default class dsModal {
  constructor(incomingConfig) {
    // конфиг по умолчанию
    this.defaultConfig = {
      container: '.modal', // уникальный класс контейнера компонента
      openButton: '.modal-open', // кнопки для раскрытия модального окна
      closeButton: '.modal-close', // кнопки для закрытия модального окна
      animBlock: 'fade-in-scale-block', // первый шаг анимации
      animBg: 'fade-in-scale-bg', // второй шаг анимации
      animBody: 'fade-in-scale-body', // третий шаг анимации
      bodyOverflow: 'ds-modal__overflow-hidden', // класс для блокировки скролла
      logging: false, // вывод данных в console.log, true / false
    };
    // входящий конфиг заменяет дефолтный
    this.config = Object.assign({}, this.defaultConfig, incomingConfig);
  }

  // -- ХЕЛПЕРЫ
  // -- логгирование
  log(mes) {
    if (this.config.logging) {
      console.log(`ds-modal: ${mes}`);
    }
  }

  // -- МАНИПУЛЯЦИИ С DOM И CLASSLIST
  // -- добавляем классы + timeout
  addClass(element, style, time) {
    setTimeout(() => {
      document.querySelector(element).classList.add(style);
    }, time);
  }

  // -- убираем классы + timeout
  remClass(element, style, time) {
    setTimeout(() => {
      document.querySelector(element).classList.remove(style);
    }, time);
  }

  // -- метод открытия модального окна
  open() {
    this.addClass('body', this.config.bodyOverflow, 100);
    this.addClass(this.config.container, this.config.animBlock, 1);
    this.addClass(this.config.container, this.config.animBg, 10);
    this.addClass(this.config.container, this.config.animBody, 300);
    this.log(`opened, class: ${this.config.container}`);
  }

  // -- метод закрытия модального окна
  close() {
    this.remClass('body', this.config.bodyOverflow, 100);
    this.remClass(this.config.container, this.config.animBody, 1);
    this.remClass(this.config.container, this.config.animBg, 300);
    this.remClass(this.config.container, this.config.animBlock, 600);
    this.log(`close, class: ${this.config.container}`);
  }

  // -- ЗАКРЫТЫЕ МЕТОДЫ
  // -- подписка на открытие модалки
  _addOpenButtons() {
    document.querySelectorAll(this.config.openButton).forEach(element => {
      element.addEventListener('click', () => {
        this.open();
      });
    });
  }

  // -- подписка на закрытие модалки
  _addCloseButtons() {
    document.querySelectorAll(this.config.closeButton).forEach(element => {
      element.addEventListener('click', () => {
        this.close();
      });
    });
  }

  // -- ОТКРЫТЫЕ МЕТОДЫ
  // -- инициализация модалки
  init() {
    this._addOpenButtons();
    this._addCloseButtons();
    // -- ОТЧЕТ О СТАРТЕ МОДУЛЯ
    this.log(`initialized, class: ${this.config.container}`);
  }
}
