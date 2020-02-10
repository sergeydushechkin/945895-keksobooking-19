'use strict';

(function () {
  var Enum = {
    ESC_KEY: 'Escape',
    ENTER_KEY: 'Enter',
    PIN_X_MIN: 0,
    PIN_X_MAX: 1136,
    PIN_Y_MIN: 130,
    PIN_Y_MAX: 630,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    OFFERS_AMOUNT: 8,
    MAIN_PIN_WIDTH: 64,
    MAIN_PIN_HEIGHT: 80
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
