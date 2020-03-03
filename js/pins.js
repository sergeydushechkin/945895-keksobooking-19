'use strict';

(function () {

  // Отрисовывать 5 ближайших меток
  var PINS_AMOUNT = 5;

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mainPin = document.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  /* -------------------------Функции------------------------- */

  // Навешивает обработчики на метки
  var addPinListeners = function (pin, data) {
    pin.addEventListener('click', function () {
      window.map.openCard(data);
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.key === window.util.Enum.ENTER_KEY) {
        window.map.openCard(data);
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
  var renderPins = function (container, data) {
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
  var clearPins = function () {
    var pins = window.map.map.querySelectorAll('button[type="button"].map__pin');
    pins.forEach(function (pin) {
      window.map.map.removeChild(pin);
    });
  };

  // Сбрасывает главную метку
  var resetMainPin = function () {
    mainPin.style.top = '375px';
    mainPin.style.left = '570px';
  };

  /* -------------------------Экспорт------------------------- */

  window.pins = {
    mainPin: mainPin,
    renderPins: renderPins,
    clearPins: clearPins,
    resetMainPin: resetMainPin
  };

})();
