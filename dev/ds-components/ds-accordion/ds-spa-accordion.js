
/* eslint-disable func-names */
/* -- DS-ACCORDION v.1.0.2
  В планах:
    - входящий конфиг должен перебивать дефолтный конфиг
    - входящий конфиг с вариантами анимации модалки
  Сделано:
    - сворачивание всех аккордионов при открытии любого
*/

const dsAccordion = (function($) {
  // -- КОНФИГУРАЦИЯ МОДУЛЯ
  // -- конфиг по умолчанию
  const config = {
    mainContainer: '.ds-accordion__component', // контейнер компонента
    dropdownBlock: '.ds-accordion__dropdown', // выпадающий блок
    activeClass: 'active', // класс на раскрытом аккордионе
    logging: false, // вывод данных в console.log, true / false
  };

  // -- ПЕРЕМЕННЫЕ
  let state = 0; // состояние модуля, 0 - закрыт, 1 - открыт

  // -- ХЕЛПЕРЫ
  // -- логгирование
  const log = function(mes) {
    if (config.modalLogging) {
      console.log(`ds-accordion: ${mes}`);
    }
  };

  // -- МАНИПУЛЯЦИИ С DOM И CLASSLIST
  // -- закрываем все аккордионы
  const closeAllAccordions = function() {
    $(config.mainContainer).each((i, element) => {
      element.classList.remove(config.activeClass);
      const panel = element.querySelector(config.dropdownBlock);
      panel.style.maxHeight = 0;
    });
  };

  // -- раскрываем один аккордион
  const openCurrentAccordion = function(element) {
    if (element.classList.contains(config.activeClass)) {
      closeAllAccordions();
      state = 0;
    } else {
      closeAllAccordions();
      element.classList.add(config.activeClass);
      const panel = element.querySelector(config.dropdownBlock);
      panel.style.maxHeight = `${panel.scrollHeight}px`;
      state = 1;
    }
  };

  // -- ЗАКРЫТЫЕ МЕТОДЫ
  // -- подписка на раскрытие аккордиона по клику
  const addOpenList = function() {
    $(config.mainContainer).each((i, element) => {
      element.addEventListener('click', e => {
        openCurrentAccordion(element);
      });
    });
  };

  // сначала блок пустой с надписью Загрузка... - заполняем его данными
  const parser = function(data){
    let html = '';
    for(let i=0; i<data.length; i++) {
      html += '<div class="ds-accordion__component"><div class="ds-accordion__headline">'+data[i].ask+'<div class="ds-arrow-pointer"></div></div><div class="ds-accordion__dropdown"><div class="ds-accordion__description">'+data[i].answer+'</div></div></div>';
    }
    $('.ds-accordion').html(html); // заполняем юлок вопросами и ответами
    addOpenList(); // развешиваем обработчики для раскрытия и скрытия
  }

  // получаем вопросы ответы из апи
  const dsAjaxRequest = function(){
    $.ajax({
      url: 'http://localhost/index.php',
      dataType: "json",
      body: "request=faq",          
      success: (data) => {
        parser(data);
      },
      error: function(error) {
          console.log("FAIL answer from api/faq");
      }
    });
  }

  // -- автостарт методов при старте модуля
  dsAjaxRequest();

  // -- ОТЧЕТ О СТАРТЕ МОДУЛЯ
  log('started');

  // -- ЭКСПОРТ ОТКРЫТЫХ МЕТОДОВ
  return {
    state,
  };
}(jQuery));