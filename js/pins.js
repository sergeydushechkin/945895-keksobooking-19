'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  /* -------------------------Функции------------------------- */

  // Создает метку
  var createPin = function (blank, offerNum) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.dataset.offerNum = offerNum;
    pin.style.top = (blank.location.y - window.util.Enum.PIN_HEIGHT) + 'px';
    pin.style.left = (blank.location.x - window.util.Enum.PIN_WIDTH / 2) + 'px';
    pinImage.src = blank.author.avatar;
    pinImage.alt = blank.offer.title;

    return pin;
  };

  // Отрисовывает метки на карте
  var renderPins = function (container, data) {
    data.forEach(function (pin) {
      if (pin.offer) {
        container.appendChild(createPin(pin));
      }
    });
  };

  /* -------------------------Экспорт------------------------- */

  window.pins = {
    renderPins: renderPins
  };

})();
