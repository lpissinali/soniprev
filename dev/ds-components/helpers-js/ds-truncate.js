/*
библиотека часто используемых функций
автор shkredovdmitriy@gmail.com
*/

// обрезка строки до num + ...
function dsTruncateStr(str, num) {
  if (str.length > num) {
    return `${str.slice(0, num)}…`;
  }
  return str;
}

// обрезка содержимого class до num + ...
function dsTruncateHtml(cls, num) {
  const list = document.querySelectorAll(cls);
  list.forEach(elm => {
    const text = elm.innerHTML;
    if (text.length > num) {
      elm.innerHTML = `${text.slice(0, num)}…`;
    }
  });
}

// экспортируем все функции
export { dsTruncateStr, dsTruncateHtml };
