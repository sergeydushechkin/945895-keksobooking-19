'use strict';

(function () {

  // Деактивирует страницу
  var deactivatePage = function () {
    window.form.setAdFormDisabled(true);
    window.form.removeFormListeners();
    window.filters.setMapFilterDisabled(true);
    window.map.disableMap();
    window.map.closeCard();
    window.pins.clear();
    window.pins.resetMain();
    window.filters.mapFilterForm.reset();
    window.map.offers = [];

    window.form.pageActive = false;
    window.form.setAddressField();
  };

  // Активирует страницу
  var activatePage = function () {
    window.form.setAdFormDisabled(false);
    window.form.addFormListeners();
    window.map.enableMap();

    window.form.pageActive = true;
  };

  /* -------------------------Экспорт------------------------- */

  window.init = {
    deactivatePage: deactivatePage,
    activatePage: activatePage,
  };

  /* -------------------------Основной код------------------------- */

  deactivatePage();

  window.pins.main.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.KeyCodes.ENTER_KEY && !window.form.pageActive) {
      activatePage();
    }
  });

  window.pins.main.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      if (!window.form.pageActive) {
        activatePage();
        window.form.setAddressField();
      }
      window.map.onMainPinMousedown(evt);
    }
  });

})();
