'use strict';

(function () {

  // Переключить состояние набору элементов
  var setElementsState = function (elements, state) {
    for (var elementIndex = 0; elementIndex < elements.length; elementIndex++) {
      elements[elementIndex].disabled = state;
    }
  };

  /* -------------------------Экспорт------------------------- */

  window.util = {
    setElementsState: setElementsState
  };

})();
