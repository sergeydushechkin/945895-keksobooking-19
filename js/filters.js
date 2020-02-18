'use strict';

(function () {
  var mapFilterForm = document.querySelector('.map__filters');

  var housingType = mapFilterForm.querySelector('#housing-type');

  // Добавляет обработчики фильтрам
  var addFiltersListeners = function () {
    housingType.addEventListener('change', onHousingTypeChange);
  };

  // Удаляет обработчики фильтрам
  var removeFiltersListeners = function () {
    housingType.removeEventListener('change', onHousingTypeChange);
  };

  // Изменяет состояние формы фильтра
  var setMapFilterDisabled = function (state) {
    var filterSelects = mapFilterForm.querySelectorAll('select');
    mapFilterForm.querySelector('.map__features').disabled = state;
    window.util.setElementsState(filterSelects, state);
    if (!state) {
      addFiltersListeners();
    } else {
      removeFiltersListeners();
    }
  };

  /* -------------------------Обработчики------------------------- */
  var onHousingTypeChange = function () {
    if (housingType.value !== 'any') {
      window.map.filteredOffers = window.map.offers.filter(function (offer) {
        return offer.offer.type === housingType.value;
      });
    } else {
      window.map.filteredOffers = window.map.offers.slice();
    }

    window.map.closeCard();
    window.pins.clearPins();
    window.pins.renderPins(window.map.map, window.map.filteredOffers);
  };

  /* -------------------------Экспорт------------------------- */
  window.filters = {
    setMapFilterDisabled: setMapFilterDisabled
  };

})();
