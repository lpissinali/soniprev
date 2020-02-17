(function($) {
  /**
   * @author donrus
   * @description валидатор ввода символов для полей адреса
   */
  $.validator.addMethod(
    'checkNotSpecial',
    function(value, element) {
      return this.optional(element) || /^[0-9а-яА-ЯеЁ.\s,-\/]*$/i.test(value);
    },
    'только кириллица без спецсимволов'
  );

  /**
   * @author donrus
   * @description валидатор ввода только цифр
   */
  $.validator.addMethod(
    'checkDigits',
    function(value, element) {
      return this.optional(element) || /^[0-9]*$/i.test(value);
    },
    'только цифры'
  );

  $.validator.addMethod(
    'checkSymbols',
    function(value, element) {
      return this.optional(element) || /^[а-яА-ЯеЁ.\s,-]*$/i.test(value);
    },
    'только кириллица'
  );

  $.validator.addMethod(
    'checkEmail',
    function(value, element) {
      const re = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;
      return this.optional(element) || re.test(String(value).toLowerCase());
    },
    'Некорректный email'
  );

  $.validator.addMethod(
    'checkTelephone',
    function(value, element) {
      const re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/g;
      return this.optional(element) || re.test(String(value).toLowerCase());
    },
    'Телефон в формате +7(XXX) XXX-XX-XX'
  );
}(jQuery));
