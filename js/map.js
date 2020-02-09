'use strict';

(function () {

  var mapFilterForm = document.querySelector('.map__filters');
  var map = document.querySelector('.map__pins');

  // Изменяет состояние формы фильтра
  var setMapFilterDisabled = function (state) {
    var filterSelects = mapFilterForm.querySelectorAll('select');

    mapFilterForm.querySelector('.map__features').disabled = state;
    window.util.setElementsState(filterSelects, state);

    if (!state) {
      map.appendChild(window.pins.setPins(window.data.offers));
      document.querySelector('.map').classList.remove('map--faded');
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

  var onCardCloseClick = function () {
    closeCard();
  };

  var onEscKeydown = function (evt) {
    if (evt.key === window.util.Enum.ESC_KEY) {
      window.map.closeCard();
    }
  };

  var onMapClick = function (evt) {
    var parent = evt.target.parentElement;
    if (parent.classList.contains('map__pin') && !parent.classList.contains('map__pin--main')) {
      window.map.openCard(window.data.offers[parent.dataset.offerNum]);
      evt.stopPropagation();
    }
  };

  var onMapKeydown = function (evt) {
    if (evt.key === window.util.Enum.ENTER_KEY) {
      var target = evt.target;
      if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
        window.map.openCard(window.data.offers[target.dataset.offerNum]);
        evt.stopPropagation();
      }
    }
  };

  /* -------------------------Экспорт------------------------- */

  window.map = {
    setMapFilterDisabled: setMapFilterDisabled,
    closeCard: closeCard,
    openCard: openCard,
    addMapListeners: addMapListeners,
    removeMapListeners: removeMapListeners
  };

})();
