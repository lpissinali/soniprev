/**
 * @module feedbackForm
 * @author donrus
 * @description модуль обработки действий пользователя в форме обратной связи
 */
(function($) {
  $('#feedback').validate({
    errorPlacement(error, element) {
      $(element).tooltipster('content', $(error).text());
      $(element).tooltipster('open');
    },
    success(label, element) {
      $(element).tooltipster('close');
    },
    rules: {
      name: {
        required: true,
        maxlength: 64,
        checkSymbols: true,
      },
      phone: {
        required: true,
        checkTelephone: true,
      },
      email: {
        required: true,
        checkEmail: true,
      },
      msg: {
        required: true,
        maxlength: 2048,
      },
    },
    errorClass: 'validation-error',
    errorElement: 'span',
    submitHandler(form) {
      $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: $(form).serialize(),
        success(response) {
          $('.popup-form').css({ opacity: 0 });
          setTimeout(() => {
            $('.popup-form').css({ display: 'none' });
            $('.main-content').removeClass('modal__blur-filter');
          }, 500);

          $('.popup-info .popup-info__caption').text(' ');
          $('.popup-info .popup-info__text').text(
            'Ваше обращение отправлено, ожидайте ответ в течение 3 рабочих дней'
          );
          $('.popup-info').css({ display: 'flex' });

          setTimeout(() => {
            $('.popup-info').css({ opacity: 1 });
            $('.main-content').addClass('modal__blur-filter');
          }, 800);
          form.reset();
        },
        error(response) {
          $('.popup-form').css({ opacity: 0 });
          setTimeout(() => {
            $('.popup-form').css({ display: 'none' });
            $('.main-content').removeClass('modal__blur-filter');
          }, 500);
          $('.popup-info .popup-info__caption').text(' ');
          $('.popup-info .popup-info__text').text('Ошибка. Попытайтесь позже.');
          $('.popup-info').css({ display: 'flex' });
          setTimeout(() => {
            $('.popup-info').css({ opacity: 1 });
            $('.main-content').addClass('modal__blur-filter');
          }, 800);
        },
      });
      return false;
    },
  });
}(jQuery));
