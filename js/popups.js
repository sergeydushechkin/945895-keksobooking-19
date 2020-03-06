'use strict';

(function () {

  var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
  var successPopup = successPopupTemplate.cloneNode(true);

  var errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorPopup = errorPopupTemplate.cloneNode(true);
  var errorPopupButton = errorPopup.querySelector('.error__button');

  // Закрывает сообщение об успешной отправке формы
  var closeSuccessMessage = function () {
    successPopup.parentElement.removeChild(successPopup);
    document.removeEventListener('click', onSuccessMessageClick);
    document.removeEventListener('keydown', onSuccessMessageKeydown);
    window.init.deactivatePage();
  };

  // Показывает сообщение об успешной отправке формы
  var showSuccessMessage = function () {
    document.querySelector('main').appendChild(successPopup);
    document.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageKeydown);
  };

  // Закрывает сообщение об успешной отправке формы
  var closeErrorMessage = function () {
    errorPopup.parentElement.removeChild(errorPopup);
    errorPopupButton.removeEventListener('click', onErrorButtonClick);
    document.removeEventListener('click', onErrorMessageClick);
    document.removeEventListener('keydown', onErrorMessageKeydown);
  };

  // Показывает сообщение об ошибке отправки формы
  var showErrorMessage = function () {
    document.querySelector('main').appendChild(errorPopup);
    errorPopupButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageKeydown);
  };

  /* -------------------------Обработчики------------------------- */

  // Обработчики сообщения об успехе
  var onSuccessMessageClick = function () {
    closeSuccessMessage();
  };

  var onSuccessMessageKeydown = function (evt) {
    if (evt.key === window.util.KeyCodes.ESC_KEY) {
      closeSuccessMessage();
    }
  };

  // Обработчики сообщения об ошибке
  var onErrorButtonClick = function () {
    closeErrorMessage();
  };

  var onErrorMessageClick = function () {
    closeErrorMessage();
  };

  var onErrorMessageKeydown = function (evt) {
    if (evt.key === window.util.KeyCodes.ESC_KEY) {
      closeErrorMessage();
    }
  };

  /* -------------------------Экспорт------------------------- */

  window.popups = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };
})();
