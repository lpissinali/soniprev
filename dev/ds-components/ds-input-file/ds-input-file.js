/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */

/* -- DS-INPUTFILE СТИЛИЗОВАННЫЙ ВЫБОР ФАЙЛА v.2.0.1 */

export default class dsInputFile {
  constructor(incomingConfig) {
    // конфиг по умолчанию
    this.defaultConfig = {
      container: '.ds-input-file', // контейнер компонента
      fileName: '.ds-input-file__file-name', // блок для постановки имени выбранного файла
      htmlField: '.ds-input-file__html-field', // html input type=file
      logging: false, // вывод данных в console.log, true / false
    };
    // входящий конфиг заменяет дефолтный
    this.config = Object.assign({}, this.defaultConfig, incomingConfig);
  }

  // -- логгирование
  log(mes) {
    if (this.config.logging) {
      console.log(`ds-input-file: ${mes}`);
    }
  }

  // -- выбираем html поле в компоненте
  field(elm) {
    return elm.querySelector(this.config.htmlField);
  }

  // -- вносим имя файла в псевдополе
  fileName(elm, value) {
    elm.querySelector(this.config.fileName).innerHTML = value;
    this.log(`value = ${value}`);
  }

  // -- прослушивание изменений в каждом input file
  init() {
    document.querySelectorAll(this.config.container).forEach(elm => {
      this.field(elm).addEventListener('change', e => {
        const value = this.field(elm)
          .value.split(/(\\|\/)/g)
          .pop();
        this.fileName(elm, value);
      });
    });
    // -- отчет о старте модуля
    this.log(`initialized, class: ${this.config.container}`);
  }
}
