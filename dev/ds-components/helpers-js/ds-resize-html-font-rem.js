// подгоняем html font-size под высоту экрана
// для fullpage сайта
function dsResizeHtmlFontRem() {
  const width = $(window).width();
  const height = $(window).height();
  if (width / height > 1.77) {
    const fontSize = height / 67.5; // 67,5rem высота сайта при верстке
    $('html').css({ fontSize: `${fontSize}px` });
    $('body').css({ fontSize: `${fontSize}px` });
  } else {
    $('html').css({ fontSize: '' });
    $('body').css({ fontSize: '' });
  }
}

export default dsResizeHtmlFontRem;
