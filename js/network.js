'use strict';

(function () {

  var STATUS_OK = 200;

  var load = function (onLoad, onError) {
    var URL_PINS = 'https://js.dump.academy/keksobooking/data';

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

  var send = function (data, onLoad, onError) {
    var URL_OFFER_SEND = 'https://js.dump.academy/keksobooking';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        throw new Error('Ошибка отправки данных:' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения при отправке данных: ' + xhr.status + ' ' + xhr.statusText);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос на отправку не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', URL_OFFER_SEND);
    xhr.send(data);
  };

  window.network = {
    load: load,
    send: send
  };

})();
