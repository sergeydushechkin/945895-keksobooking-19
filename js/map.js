'use strict';

(function () {

  var PinsLimits = {
    PINS_X_MIN: 0,
    PINS_X_MAX: 1136,
    PINS_Y_MIN: 130,
    PINS_Y_MAX: 630
  };

  var map = document.querySelector('.map__pins');
  var offers = [];
  var filteredOffers = [];

  // Изменяет состояние карты и загружает метки
  var setMapDisabled = function (state) {
    if (!state) {
      window.network.load(onPinsLoadSuccess, onPinsLoadError);
      document.querySelector('.map').classList.remove('map--faded');
    } else {
      document.querySelector('.map').classList.add('map--faded');
    }
  };

  // Закрытие карточки
  var closeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      card.removeEventListener('click', onCardCloseClick);
      card.parentElement.removeChild(card);
    }
  };

  // Открытие карточки
  var openCard = function (offer) {
    var card = window.card.makeCard(offer);
    closeCard();
    map.insertBefore(card, map.querySelector('.map__filters-container'));
    card.addEventListener('click', onCardCloseClick);
  };

  // Добавляет обработчики событий карты
  var addMapListeners = function () {
    document.addEventListener('keydown', onEscKeydown);
    map.addEventListener('click', onMapClick);
    map.addEventListener('keydown', onMapKeydown);
  };

  // Удаляет обработчики событий карты
  var removeMapListeners = function () {
    document.removeEventListener('keydown', onEscKeydown);
    map.removeEventListener('click', onMapClick);
    map.removeEventListener('keydown', onMapKeydown);
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
    if (evt.key === window.util.Enum.ESC_KEY) {
      closeCard();
    }
  };

  // При клике на метках карты
  var onMapClick = function (evt) {
    var parent = evt.target.parentElement;
    if (parent.classList.contains('map__pin') && !parent.classList.contains('map__pin--main')) {
      openCard(window.map.filteredOffers[parent.dataset.offerNum]);
      evt.stopPropagation();
    }
  };

  // При нажатии ENTER на карте
  var onMapKeydown = function (evt) {
    if (evt.key === window.util.Enum.ENTER_KEY) {
      var target = evt.target;
      if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
        openCard(window.map.filteredOffers[target.dataset.offerNum]);
        evt.stopPropagation();
      }
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
    setMapDisabled: setMapDisabled,
    closeCard: closeCard,
    openCard: openCard,
    addMapListeners: addMapListeners,
    removeMapListeners: removeMapListeners,
    onMainPinMousedown: onMainPinMousedown
  };

})();
