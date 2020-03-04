'use strict';

(function () {

  var PinsLimits = {
    PINS_X_MIN: 0,
    PINS_X_MAX: 1136,
    PINS_Y_MIN: 130,
    PINS_Y_MAX: 630
  };

  var EDIT_FIELDS = ['INPUT', 'SELECT', 'TEXTAREA'];

  var mapSection = document.querySelector('.map');
  var map = document.querySelector('.map__pins');
  var offers = [];
  var filteredOffers = [];

  // Активирует карту и загружает метки
  var enableMap = function () {
    window.network.load(onPinsLoadSuccess, onPinsLoadError);
    mapSection.classList.remove('map--faded');
    document.addEventListener('keydown', onEscKeydown);
  };

  // Отключает карту
  var disableMap = function () {
    mapSection.classList.add('map--faded');
    document.removeEventListener('keydown', onEscKeydown);
  };

  // Закрытие карточки
  var closeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.removeEventListener('click', onCardCloseClick);
      card.parentElement.removeChild(card);
      window.pins.removePinSelection();
    }
  };

  // Открытие карточки
  var openCard = function (offer) {
    var card = window.card.makeCard(offer);
    closeCard();
    map.insertBefore(card, map.querySelector('.map__filters-container'));
    card.addEventListener('click', onCardCloseClick);
  };

  /* -------------------------Обработчики------------------------- */

  // При удачной загрузке меток
  var onPinsLoadSuccess = function (loadedOffers) {
    window.filters.setMapFilterDisabled(false);
    window.map.offers = loadedOffers;
    window.map.filteredOffers = window.map.offers.slice();
    window.pins.renderPins(map, window.map.offers);
  };

  // При ошибке загрузки меток
  var onPinsLoadError = function (errorText) {
    window.util.showMessage(errorText, 'red');
  };

  // При закрытии карточки
  var onCardCloseClick = function () {
    closeCard();
  };

  // При нажатии ESC
  var onEscKeydown = function (evt) {
    if (evt.key === window.util.KeyCodes.ESC_KEY && EDIT_FIELDS.indexOf(evt.target.tagName) === -1) {
      closeCard();
    }
  };

  // Обработка перетаскивания главного указателя жилья
  var onMainPinMousedown = function (evt) {
    var mouseStart = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMainPinMousemove = function (moveEvt) {
      var shift = {
        x: mouseStart.x - moveEvt.clientX,
        y: mouseStart.y - moveEvt.clientY
      };

      mouseStart.x = moveEvt.clientX;
      mouseStart.y = moveEvt.clientY;

      var pinCoord = {
        x: window.form.mainPin.offsetLeft - shift.x,
        y: window.form.mainPin.offsetTop - shift.y
      };

      if (!(pinCoord.x < PinsLimits.PINS_X_MIN - window.form.MAIN_PIN_WIDTH / 2 || pinCoord.x > PinsLimits.PINS_X_MAX + window.form.MAIN_PIN_WIDTH / 2)) {
        window.form.mainPin.style.left = pinCoord.x + 'px';
      }

      if (!(pinCoord.y < PinsLimits.PINS_Y_MIN - window.form.MAIN_PIN_HEIGHT || pinCoord.y > PinsLimits.PINS_Y_MAX - window.form.MAIN_PIN_HEIGHT)) {
        window.form.mainPin.style.top = pinCoord.y + 'px';
      }

      window.form.setAddressField();
    };

    var onMainPinMouseup = function () {
      window.form.setAddressField();
      document.removeEventListener('mousemove', onMainPinMousemove);
      document.removeEventListener('mouseup', onMainPinMouseup);
    };

    document.addEventListener('mousemove', onMainPinMousemove);
    document.addEventListener('mouseup', onMainPinMouseup);
  };
  /* -------------------------Экспорт------------------------- */

  window.map = {
    map: map,
    offers: offers,
    filteredOffers: filteredOffers,
    enableMap: enableMap,
    disableMap: disableMap,
    closeCard: closeCard,
    openCard: openCard,
    onMainPinMousedown: onMainPinMousedown
  };

})();
