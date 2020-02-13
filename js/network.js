'use strict';

(function () {

  var URL_PINS = 'https://js.dump.academy/keksobooking/data';
  var STATUS_OK = 200;

  var loadPins = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        throw new Error('Ошибка получения данных:' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения при получении данных: ' + xhr.status + ' ' + xhr.statusText);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос на получение данных не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL_PINS);
    xhr.send();
  };

  window.network = {
    loadPins: loadPins
  };

})();
