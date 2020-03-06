'use strict';

(function () {

  // Деактивирует страницу
  var deactivatePage = function () {
    window.form.setDisabled(true);
    window.form.removeListeners();
    window.filters.setMapFilterDisabled(true);
    window.map.disable();
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
    window.form.setDisabled(false);
    window.form.addListeners();
    window.map.enable();

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
