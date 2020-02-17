/* eslint-disable func-names */
/*
ds-accordion v.1.2 для faq
автор shkredovdmitriy@gmail.com
Сделано:
  - сворачивание всех аккордионов при открытии одного
  - входящий конфиг перебивает дефолтный конфиг
  - раскрываем нужный аккордион по уникальному классу
*/

// -- КОНФИГУРАЦИЯ
// -- конфиг по умолчанию
const configDefault = {
  mainContainer: '.ds-accordion', // контейнер компонента
  dropdownBlock: '.ds-accordion__dropdown', // выпадающий блок
  activeClass: 'active', // класс на раскрытом аккордионе
  openOne: '', // раскрываем нужный аккордион по уникальному классу
  logging: false, // вывод данных в console.log, true / false
};

// -- ХЕЛПЕРЫ
// -- логгирование
function log(config, mes) {
  if (config.logging) {
    console.log(`ds-accordion: ${mes}`);
  }
}

// -- короткий селектор
function qa(cls) {
  return document.querySelectorAll(cls);
}

// -- ОСНОВНОЙ ФУНКЦИОНАЛ
// -- закрываем все аккордионы
function closeAllAccordions(config) {
  qa(config.mainContainer).forEach(element => {
    element.classList.remove(config.activeClass);
    const panel = element.querySelector(config.dropdownBlock);
    panel.style.maxHeight = 0;
  });
}

// -- раскрываем один аккордион
function openCurrentAccordion(config, element) {
  if (element.classList.contains(config.activeClass)) {
    closeAllAccordions(config);
  } else {
    closeAllAccordions(config);
    element.classList.add(config.activeClass);
    const panel = element.querySelector(config.dropdownBlock);
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  }
}

// -- работа аккордиона в автоматическом режиме
// -- раскрываем аккордионы по событию клик
function dsAccordion(configIncoming) {
  // -- входящий конфиг перебивает дефолтный
  const config = Object.assign({}, configDefault, configIncoming);

  // -- подписка на клик для раскрытия аккордиона
  (function() {
    qa(config.mainContainer).forEach(element => {
      element.addEventListener('click', e => {
        openCurrentAccordion(config, element);
      });
    });
  }());

  // -- ОТЧЕТ О СТАРТЕ МОДУЛЯ
  log(config, 'started');
}

// -- работа аккордиона в ручном режиме
// -- раскрываем нужный аккордион по уникальному классу
function dsAccordionManual(configIncoming) {
  // -- входящий конфиг перебивает дефолтный
  const config = Object.assign({}, configDefault, configIncoming);

  if (document.querySelector(config.openOne)) {
    setTimeout(() => {
      openCurrentAccordion(config, document.querySelector(config.openOne));
    }, 300);
  }

  // -- ОТЧЕТ О СТАРТЕ МОДУЛЯ
  log(config, 'started in manual mode');
}

// экспортируем
export { dsAccordion, dsAccordionManual };
