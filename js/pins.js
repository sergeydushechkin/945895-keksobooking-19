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

  // Наполняет фрагмент метками
  var setPins = function (blanks) {
    var mapPins = document.createDocumentFragment();

    for (var pinIndex = 0; pinIndex < blanks.length; pinIndex++) {
      mapPins.appendChild(createPin(blanks[pinIndex], pinIndex));
    }

    return mapPins;
  };

  /* -------------------------Экспорт------------------------- */

  window.pins = {
    setPins: setPins
  };

})();
