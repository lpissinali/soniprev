/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */

/* -- DS-INPUTPASS СТИЛИЗОВАННЫЙ ВВОД ПАРОЛЯ v.2.0.1 */

export default class dsInputPass {
  constructor(incomingConfig) {
    // конфиг по умолчанию
    this.defaultConfig = {
      container: '.ds-input-pass', // контейнер компонента
      eyeIcon: '.ds-input__eye-icon', // иконка с глазом
      htmlField: '.ds-input__field', // html input type=password
      status: 0,
      logging: false, // вывод данных в console.log, true / false
    };
    // входящий конфиг заменяет дефолтный
    this.config = Object.assign({}, this.defaultConfig, incomingConfig);
  }

  // -- логгирование
  log(mes) {
    if (this.config.logging) {
      console.log(`ds-input-passw: ${mes}`);
    }
  }

  init() {
    document.querySelectorAll(this.config.container).forEach(element => {
      element.querySelector(this.config.eyeIcon).addEventListener('click', () => {
        if (this.config.status === 0) {
          element.querySelector(this.config.htmlField).setAttribute('type', 'text');
          this.config.status = 1;
          this.log('type: text');
        } else {
          element.querySelector(this.config.htmlField).setAttribute('type', 'password');
          this.config.status = 0;
          this.log('type: password');
        }
      });
    });
    // -- отчет о старте модуля
    this.log(`initialized, class: ${this.config.container}`);
  }
}
