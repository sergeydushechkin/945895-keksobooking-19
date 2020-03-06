'use strict';

(function () {

  // Отрисовывать 5 ближайших меток
  var PINS_AMOUNT = 5;

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var MAIN_PIN_DEFAULT_TOP = '375px';
  var MAIN_PIN_DEFAULT_LEFT = '570px';

  var main = document.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var lastPin;
  /* -------------------------Функции------------------------- */
  // Снимает выделение с активной метки
  var removeSelection = function () {
    if (lastPin) {
      lastPin.classList.remove('map__pin--active');
    }
  };

  // Активация метки
  var activatePin = function (pin, data) {
    removeSelection();
    window.map.openCard(data);
    lastPin = pin;
    pin.classList.add('map__pin--active');
  };

  // Навешивает обработчики на метки
  var addPinListeners = function (pin, data) {
    pin.addEventListener('click', function () {
      activatePin(pin, data);
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.key === window.util.KeyCodes.ENTER_KEY) {
        activatePin(pin, data);
      }
    });
  };

  // Создает метку
  var createPin = function (offerData) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.style.top = (offerData.location.y - PIN_HEIGHT) + 'px';
    pin.style.left = (offerData.location.x - PIN_WIDTH / 2) + 'px';
    pinImage.src = offerData.author.avatar;
    pinImage.alt = offerData.offer.title;

    addPinListeners(pin, offerData);

    return pin;
  };

  // Отрисовывает метки на карте
  var render = function (container, data) {
    var offerNum = 0;
    var pinNum = 0;
    while (pinNum < PINS_AMOUNT && offerNum < data.length) {
      if (data[offerNum].offer) {
        container.appendChild(createPin(data[pinNum]));
        pinNum++;
      }
      offerNum++;
    }
  };

  // Удаляет метки с карты
  var clear = function () {
    var pins = window.map.container.querySelectorAll('button[type="button"].map__pin');
    pins.forEach(function (pin) {
      window.map.container.removeChild(pin);
    });
  };

  // Сбрасывает главную метку
  var resetMain = function () {
    main.style.top = MAIN_PIN_DEFAULT_TOP;
    main.style.left = MAIN_PIN_DEFAULT_LEFT;
  };

  /* -------------------------Экспорт------------------------- */

  window.pins = {
    main: main,
    removeSelection: removeSelection,
    render: render,
    clear: clear,
    resetMain: resetMain
  };

})();
