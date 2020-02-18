'use strict';

(function () {
  var mapFilterForm = document.querySelector('.map__filters');

  // Изменяет состояние формы фильтра
  var setMapFilterDisabled = function (state) {
    var filterSelects = mapFilterForm.querySelectorAll('select');
    mapFilterForm.querySelector('.map__features').disabled = state;
    window.util.setElementsState(filterSelects, state);
  };

  /* -------------------------Обработчики------------------------- */

  /* -------------------------Экспорт------------------------- */
  window.filters = {
    setMapFilterDisabled: setMapFilterDisabled
  };

})();
