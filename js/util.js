'use strict';

(function () {
  var Enum = {
    ESC_KEY: 'Escape',
    ENTER_KEY: 'Enter'
  };

  // Переключить состояние набору элементов
  var setElementsState = function (elements, state) {
    for (var elementIndex = 0; elementIndex < elements.length; elementIndex++) {
      elements[elementIndex].disabled = state;
    }
  };

  /* -------------------------Экспорт------------------------- */

  window.util = {
    setElementsState: setElementsState,
    Enum: Enum
  };

})();
