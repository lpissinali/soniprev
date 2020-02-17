/* eslint-disable func-names */
/*
ds-textarea
автор shkredovdmitriy@gmail.com
*/

function dsTextarea(configIncoming) {
  // -- КОНФИГУРАЦИЯ
  // -- конфиг по умолчанию
  const configDefault = {
    mainContainer: '.ds-textarea', // контейнер компонента
    hiddenBlock: '.ds-textarea__hidden-div', // скрытый блок для расчета высоты
    logging: false, // вывод данных в console.log, true / false
  };

  // -- входящий конфиг перебивает дефолтный
  const config = Object.assign({}, configDefault, configIncoming);

  const txt = $('textarea.ds-input__field');
  const hiddenDiv = $('.ds-textarea__hidden-div');
  let content = null;

  txt.on('keyup', function() {
    content = $(this).val();
    content = content.replace(/\n/g, '<br>');
    hiddenDiv.html(`${content}<br class="lbr">`);
    const hiddenHeight = hiddenDiv.height();
    const hiddenHeightInRem = `${hiddenHeight / parseInt($('body').css('font-size')) + 1}rem`;
    $(this).css('height', hiddenHeightInRem);
    console.log(hiddenDiv.height());
  });
}

export default dsTextarea;
