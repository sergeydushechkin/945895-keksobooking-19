'use strict';

(function () {

  var MAIN_PIN_INACTIVE_RADIUS = 32;
  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 80;

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');

  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var addressField = adForm.querySelector('#address');

  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectRoomCapacity = adForm.querySelector('#capacity');
  var inputTitle = adForm.querySelector('#title');
  var selectType = adForm.querySelector('#type');
  var inputPrice = adForm.querySelector('#price');
  var selectTime = adForm.querySelector('.ad-form__element--time');
  var selectTimein = selectTime.querySelector('#timein');
  var selectTimeout = selectTime.querySelector('#timeout');

  var mainPin = document.querySelector('.map__pin--main');

  var avatarImage = document.querySelector('.ad-form-header__preview img');
  var avatarInput = document.querySelector('.ad-form__field input[type=file]');
  var housePhoto = document.querySelector('.ad-form__photo');
  var houseUpload = document.querySelector('.ad-form__upload input[type=file]');

  // Для проверки состояния страницы
  var pageActive = false;

  // Изменяет состояние формы объявления, true - выключить, false - включить
  var setAdFormDisabled = function (state) {
    if (state) {
      adForm.classList.add('ad-form--disabled');
    } else {
      adForm.classList.remove('ad-form--disabled');
    }
    window.util.setElementsState(adFormFieldsets, state);
  };

  // Заполняет поле адреса
  var setAddressField = function () {
    if (window.form.pageActive) {
      addressField.value = (mainPin.offsetLeft + MAIN_PIN_WIDTH / 2) + ', ' + (mainPin.offsetTop + MAIN_PIN_HEIGHT);
    } else {
      addressField.value = (mainPin.offsetLeft + MAIN_PIN_INACTIVE_RADIUS) + ', ' + (mainPin.offsetTop + MAIN_PIN_INACTIVE_RADIUS);
    }
  };

  // Устанавливает сообщение валидации и выделяет цветом
  var setValidity = function (element, message) {
    if (message) {
      element.classList.add('ad-form__error');
    } else {
      element.classList.remove('ad-form__error');
    }

    element.setCustomValidity(message);
  };

  // Валидация полей с комнатами и гостями
  var validateCapacity = function () {
    var rooms = parseInt(selectRoomNumber.value, 10);
    var capacity = parseInt(selectRoomCapacity.value, 10);
    var validityMessage = '';

    if (rooms === 1 && capacity !== 1) {
      validityMessage = 'В 1-ой комнате может быть только 1 гость';
    } else if (rooms === 2 && (capacity < 1 || capacity > 2)) {
      validityMessage = 'В 2-х комнатах может от 1 до 2-х гостей';
    } else if (rooms === 3 && (capacity < 1 || capacity > 3)) {
      validityMessage = 'В 3-х комнатах может быть от 1 до 3-х гостей';
    } else if (rooms === 100 && capacity !== 0) {
      validityMessage = 'В 100 комнатах не может быть гостей';
    }

    setValidity(selectRoomCapacity, validityMessage);
  };

  // Валидация поля заголовка
  var validateTitle = function () {
    var validityMessage = '';
    if (inputTitle.value.length < 30) {
      validityMessage = 'Заголовок должен содержать не менее 30 символов';
    } else if (inputTitle.value.length > 100) {
      validityMessage = 'Заголовок должен содержать не более  100 символов';
    }
    setValidity(inputTitle, validityMessage);
  };

  // Валидация поля цена
  var validatePrice = function () {
    var validityMessage = '';
    var minPrice = parseInt(inputPrice.min, 10);

    if (inputPrice.value < minPrice) {
      validityMessage = 'Цена за ночь не может быть меньше чем ' + minPrice;
    } else if (inputPrice.value > 1000000) {
      validityMessage = 'Цена за ночь не может быть больше чем 1000000';
    }
    setValidity(inputPrice, validityMessage);
  };

  // Валидация поля типа жилья и проверка цены
  var validateType = function () {
    var minPrice = 0;
    switch (selectType.value) {
      case ('bungalo'):
        minPrice = 0;
        break;
      case ('flat'):
        minPrice = 1000;
        break;
      case ('house'):
        minPrice = 5000;
        break;
      case ('palace'):
        minPrice = 10000;
        break;
    }
    inputPrice.min = minPrice;
    inputPrice.placeholder = minPrice;
    validatePrice();
  };

  // Добавляет обработчики формы
  var addFormListeners = function () {
    adForm.addEventListener('submit', onAdFormSubmit);
    adFormSubmit.addEventListener('click', onAdFormSubmitClick);
    selectRoomCapacity.addEventListener('change', onSelectCapacityChange);
    selectRoomNumber.addEventListener('change', onSelectRoomChange);
    inputTitle.addEventListener('input', onTitleInput);
    selectType.addEventListener('change', onTypeChange);
    inputPrice.addEventListener('input', onPriceInput);
    selectTime.addEventListener('change', onTimeChange);
    avatarInput.addEventListener('change', onAvatarInputChange);
    houseUpload.addEventListener('change', onHouseUploadChange);
  };

  // Удаляет обработчики формы
  var removeFormListeners = function () {
    adForm.removeEventListener('submit', onAdFormSubmit);
    adFormSubmit.removeEventListener('click', onAdFormSubmitClick);
    selectRoomCapacity.removeEventListener('change', onSelectCapacityChange);
    selectRoomNumber.removeEventListener('change', onSelectRoomChange);
    inputTitle.removeEventListener('input', onTitleInput);
    selectType.removeEventListener('change', onTypeChange);
    inputPrice.removeEventListener('input', onPriceInput);
    selectTime.removeEventListener('change', onTimeChange);
    avatarInput.removeEventListener('change', onAvatarInputChange);
    houseUpload.removeEventListener('change', onHouseUploadChange);
  };

  // Сбрасывает форму
  var resetAdForm = function () {
    avatarImage.src = 'img/muffin-grey.svg';
    housePhoto.style.backgroundImage = '';
    adForm.reset();
  };

  /* -------------------------Обработчики------------------------- */

  // При изменении количества гостей
  var onSelectCapacityChange = function () {
    validateCapacity();
  };

  // При изменении количества комнат
  var onSelectRoomChange = function () {
    validateCapacity();
  };

  // При клике по кнопке отправить
  var onAdFormSubmitClick = function () {
    validateCapacity();
    validateTitle();
    validateType();
  };

  // При вводе заголовка
  var onTitleInput = function () {
    validateTitle();
  };

  // При зменении типа жилья
  var onTypeChange = function () {
    validateType();
  };

  // При вводе цены
  var onPriceInput = function () {
    validatePrice();
  };

  // При изменении времени заезда/выезда
  var onTimeChange = function (evt) {
    if (evt.target === selectTimein) {
      selectTimeout.value = selectTimein.value;
    } else if (evt.target === selectTimeout) {
      selectTimein.value = selectTimeout.value;
    }
  };

  // Успешная отправка формы
  var onAdFormSubmitSuccess = function () {
    resetAdForm();
    window.popups.showSuccessMessage();
  };

  // Ошибка отправки формы
  var onAdFormSubmitError = function () {
    window.popups.showErrorMessage();
  };

  // При отправке формы
  var onAdFormSubmit = function (evt) {
    window.network.send(new FormData(adForm), onAdFormSubmitSuccess, onAdFormSubmitError);
    evt.preventDefault();
  };

  // При изменении инпута с фотографией жилья
  var onHouseUploadChange = function () {
    window.images.loadImage(houseUpload, housePhoto);
  };

  // При изменении инпута с аватаром
  var onAvatarInputChange = function () {
    window.images.loadImage(avatarInput, avatarImage);
  };


  /* -------------------------Экспорт------------------------- */

  window.form = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    mainPin: mainPin,
    pageActive: pageActive,
    setAdFormDisabled: setAdFormDisabled,
    setAddressField: setAddressField,
    addFormListeners: addFormListeners,
    removeFormListeners: removeFormListeners
  };

})();
