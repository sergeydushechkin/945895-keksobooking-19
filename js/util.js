'use strict';

(function () {
  var KeyCodes = {
    ESC_KEY: 'Escape',
    ENTER_KEY: 'Enter'
  };

  // Переключить состояние набору элементов
  var setElementsState = function (elements, state) {
    for (var elementIndex = 0; elementIndex < elements.length; elementIndex++) {
      elements[elementIndex].disabled = state;
    }
  };

  // Показ сообщений
  var showMessage = function (text, color) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center;';
    node.style.top = '3px';
    node.style.color = color;
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '24px';

    node.textContent = text;
    document.body.insertAdjacentElement('afterbegin', node);

    setTimeout(function () {
      node.parentElement.removeChild(node);
    }, 2000);
  };

  /* -------------------------Экспорт------------------------- */

  window.util = {
    setElementsState: setElementsState,
    showMessage: showMessage,
    KeyCodes: KeyCodes
  };

})();
