'use strict';

(function () {
  var mapFilterForm = document.querySelector('.map__filters');

  var housingType = mapFilterForm.querySelector('#housing-type');

  // Переключает состояния(активная/не активная) формы фильтрации
  var setMapFilterDisabled = function (state) {
    var filterSelects = mapFilterForm.querySelectorAll('select');
    mapFilterForm.querySelector('.map__features').disabled = state;
    window.util.setElementsState(filterSelects, state);

    if (!state) {
      mapFilterForm.addEventListener('change', onFilteFormChange);
    } else {
      mapFilterForm.removeEventListener('change', onFilteFormChange);
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

  // Общая фильтрация меток
  var applyFilters = function (data) {
    return data
      .filter(function (element) {
        return (
          filterHousingType(element)
        );
      })
      .slice();
  };

  /* -------------------------Обработчики------------------------- */
  var onFilteFormChange = function () {
    window.map.filteredOffers = applyFilters(window.map.offers);
    reloadFilteredPins();
  };

  /* -------------------------Экспорт------------------------- */
  window.filters = {
    setMapFilterDisabled: setMapFilterDisabled
  };

})();
