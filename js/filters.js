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

  var HOUSING_ROOMS_ANY = 'any';
  var HOUSING_TYPE_ANY = 'any';
  var HOUSING_GUESTS_ANY = 'any';

  var mapFilterForm = document.querySelector('.map__filters');

  var housingType = mapFilterForm.querySelector('#housing-type');
  var housingPrice = mapFilterForm.querySelector('#housing-price');
  var housingRooms = mapFilterForm.querySelector('#housing-rooms');
  var housingGuests = mapFilterForm.querySelector('#housing-guests');
  var housingFeatures = mapFilterForm.querySelector('.map__features');

  var filterSelects = mapFilterForm.querySelectorAll('select');

  // Переключает состояния(активная/не активная) формы фильтрации
  var setMapFilterDisabled = function (state) {
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
    window.pins.clear();
    window.pins.render(window.map.container, window.map.filteredOffers);
  };

  // Фильтрация типа жилья
  var filterHousingType = function (offerData) {
    return housingType.value === HOUSING_TYPE_ANY ? true : offerData.offer.type === housingType.value;
  };

  // Фильтрация цены жилья
  var filterHousingPrice = function (offerData) {
    switch (housingPrice.value) {
      case PriceTypeMap.LOW:
        return offerData.offer.price < PriceValueMap.MIN;
      case PriceTypeMap.MIDDLE:
        return offerData.offer.price >= PriceValueMap.MIN && offerData.offer.price <= PriceValueMap.MAX;
      case PriceTypeMap.HIGH:
        return offerData.offer.price > PriceValueMap.MAX;
      default:
        return true;
    }
  };

  // Фильтрация количества комнат
  var filterHousingRooms = function (offerData) {
    return housingRooms.value === HOUSING_ROOMS_ANY ? true : parseInt(housingRooms.value, 10) === offerData.offer.rooms;
  };

  // Фильтрация количества гостей
  var filterHousingGuests = function (offerData) {
    return housingGuests.value === HOUSING_GUESTS_ANY ? true : parseInt(housingGuests.value, 10) === offerData.offer.guests;
  };

  // Фильтрация удобств
  var filterHousingFeatures = function (offerData) {
    var filterResult = true;
    var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
    for (var i = 0; i < checkedFeatures.length; i++) {
      if (offerData.offer.features.indexOf(checkedFeatures[i].value) === -1) {
        filterResult = false;
        break;
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
      });
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
