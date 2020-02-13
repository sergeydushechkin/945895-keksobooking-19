'use strict';

(function () {

  var mainPin = document.querySelector('.map__pin--main');

  // Деактивирует страницу
  var deactivatePage = function () {
    window.form.setAdFormDisabled(true);
    window.form.removeFormListeners();
    window.map.setMapFilterDisabled(true);
    window.map.removeMapListeners();
    window.map.closeCard();

    window.form.pageActive = false;
  };

  // Активирует страницу
  var activatePage = function () {
    window.form.setAdFormDisabled(false);
    window.form.addFormListeners();
    window.map.setMapFilterDisabled(false);
    window.map.addMapListeners();

    window.form.pageActive = true;
  };

  /* -------------------------Экспорт------------------------- */

  window.init = {
    deactivatePage: deactivatePage,
    activatePage: activatePage,
  };

  /* -------------------------Основной код------------------------- */

  deactivatePage();
  window.form.setAddressField();

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.Enum.ENTER_KEY && !window.form.pageActive) {
      activatePage();
    }
  });

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      if (!window.form.pageActive) {
        activatePage();
        window.form.setAddressField();
      }
      window.map.onMainPinMousedown(evt);
    }
  });

})();
