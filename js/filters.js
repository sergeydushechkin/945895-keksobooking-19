'use strict';

(function () {
  var PriceTypeMap = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var PriceValueMap = {
    MIN: 10000,
    MAX: 50000
  };

  var mapFilterForm = document.querySelector('.map__filters');

  var housingType = mapFilterForm.querySelector('#housing-type');
  var housingPrice = mapFilterForm.querySelector('#housing-price');
  var housingRooms = mapFilterForm.querySelector('#housing-rooms');
  var housingGuests = mapFilterForm.querySelector('#housing-guests');
  var housingFeatures = mapFilterForm.querySelectorAll('.map__checkbox');

  // Переключает состояния(активная/не активная) формы фильтрации
  var setMapFilterDisabled = function (state) {
    var filterSelects = mapFilterForm.querySelectorAll('select');
    mapFilterForm.querySelector('.map__features').disabled = state;
    window.util.setElementsState(filterSelects, state);

    if (!state) {
      mapFilterForm.addEventListener('change', onFilterFormChange);
    } else {
      mapFilterForm.removeEventListener('change', onFilterFormChange);
    }
  };

  // Перезагружает отфильтрованные метки
  var reloadFilteredPins = function () {
    window.map.closeCard();
    window.pins.clearPins();
    window.pins.renderPins(window.map.map, window.map.filteredOffers);
  };

  // Фильтрация типа жилья
  var filterHousingType = function (element) {
    return housingType.value === 'any' ? true : element.offer.type === housingType.value;
  };

  // Фильтрация цены жилья
  var filterHousingPrice = function (element) {
    switch (housingPrice.value) {
      case PriceTypeMap.LOW:
        return element.offer.price < PriceValueMap.MIN;
      case PriceTypeMap.MIDDLE:
        return element.offer.price >= PriceValueMap.MIN && element.offer.price <= PriceValueMap.MAX;
      case PriceTypeMap.HIGH:
        return element.offer.price > PriceValueMap.MAX;
      default:
        return true;
    }
  };

  // Фильтрация количества комнат
  var filterHousingRooms = function (element) {
    return housingRooms.value === 'any' ? true : parseInt(housingRooms.value, 10) === element.offer.rooms;
  };

  // Фильтрация количества гостей
  var filterHousingGuests = function (element) {
    return housingGuests.value === 'any' ? true : parseInt(housingGuests.value, 10) === element.offer.guests;
  };

  // Фильтрация удобств
  var filterHousingFeatures = function (element) {
    var filterResult = true;
    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked) {
        // Можно было объединить(&&) if'ы, разделил чтобы не делать лишнюю "медленную" проверку если чекбокс не установлен
        if (element.offer.features.indexOf(housingFeatures[i].value) === -1) {
          filterResult = false;
          break;
        }
      }
    }
    return filterResult;
  };

  // Общая фильтрация меток
  var applyFilters = function (data) {
    return data
      .filter(function (offer) {
        return (
          filterHousingType(offer) &&
          filterHousingPrice(offer) &&
          filterHousingRooms(offer) &&
          filterHousingGuests(offer) &&
          filterHousingFeatures(offer)
        );
      })
      .slice();
  };

  /* -------------------------Обработчики------------------------- */
  var onFilterFormChange = window.debounce(function () {
    window.map.filteredOffers = applyFilters(window.map.offers);
    reloadFilteredPins();
  });

  /* -------------------------Экспорт------------------------- */
  window.filters = {
    mapFilterForm: mapFilterForm,
    setMapFilterDisabled: setMapFilterDisabled
  };

})();
