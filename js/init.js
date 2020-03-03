'use strict';

(function () {

  // Деактивирует страницу
  var deactivatePage = function () {
    window.form.setAdFormDisabled(true);
    window.form.removeFormListeners();
    window.filters.setMapFilterDisabled(true);
    window.map.enableMap();
    window.map.closeCard();
    window.pins.clearPins();
    window.pins.resetMainPin();
    window.form.setAddressField();
    window.filters.mapFilterForm.reset();
    window.map.offers = [];

    window.form.pageActive = false;
  };

  // Активирует страницу
  var activatePage = function () {
    window.form.setAdFormDisabled(false);
    window.form.addFormListeners();
    window.map.disableMap();

    window.form.pageActive = true;
  };

  /* -------------------------Экспорт------------------------- */

  window.init = {
    deactivatePage: deactivatePage,
    activatePage: activatePage,
  };

  /* -------------------------Основной код------------------------- */

  deactivatePage();

  window.pins.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.Enum.ENTER_KEY && !window.form.pageActive) {
      activatePage();
    }
  });

  window.pins.mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      if (!window.form.pageActive) {
        activatePage();
        window.form.setAddressField();
      }
      window.map.onMainPinMousedown(evt);
    }
  });

})();
