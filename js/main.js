'use strict';

var TITLES = ['Хостел Like Home', 'Маэстро Хостел', 'Сдам квартиру', 'Бабушка Хаус', 'Сдам недорого', 'Отель Звездный'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKTIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var DESCRIPTIONS = [
  'Апартаменты с внутренним двориком и бесплатным Wi-Fi, расположены в 7 км от башни.',
  'Апартаменты с видом на город расположены в Центральном районе, всего в 600 метрах от музея и в 1,1 км от сада.',
  'Дом для отпуска состоит из спален, гостиной, полностью оборудованной кухни с микроволновой печью и чайником, а также ванной комнаты с душем и феном',
  'К услугам гостей круглосуточная стойка регистрации, общая кухня, общий лаундж, прачечная и автомат по продаже напитков и закусок.',
  'Отличный выбор, если вам интересны парки, прогулки у реки и атмосфера.',
  'Все апартаменты располагают гостиной зоной с диваном, обеденной зоной и полностью оборудованной кухней с микроволновой печью, холодильником и плитой. В распоряжении гостей собственная ванная комната с душем, феном и бесплатными туалетно-косметическими принадлежностями.'
];

/* -------------------------Константы------------------------- */
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;
var OFFERS_AMOUNT = 8;

var MAIN_PIN_INACTIVE_RADIUS = 32;
var MAIN_PIN_WIDTH = 64;
var MAIN_PIN_HEIGHT = 80;

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

/* -------------------------Переменные------------------------- */
var map = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var mainPin = document.querySelector('.map__pin--main');

var mapFilterForm = document.querySelector('.map__filters');
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

// Для проверки состояния страницы
var pageActive = false;
var currentCard;
/* -------------------------Функции------------------------- */

// Перемешивает значения массива для случайной выборки
var mixArray = function (array) {
  var mixedArray = array.slice();
  for (var i = 0; i < mixedArray.length; i++) {
    var swapIndex = Math.floor(Math.random() * mixedArray.length);
    var value = mixedArray[swapIndex];

    mixedArray[swapIndex] = mixedArray[i];
    mixedArray[i] = value;
  }

  return mixedArray;
};

// Получить случайное количество, случайных элементов из массива
var getElements = function (array, min, max) {
  var elements = [];
  var mixedElements = mixArray(array);
  for (var elementNum = 0; elementNum < Math.floor(Math.random() * (max - min) + min); elementNum++) {
    elements[elementNum] = mixedElements[elementNum];
  }
  return elements;
};

// Генерируем предложения
var generateOffers = function (amount) {
  var offers = [];

  for (var offersIndex = 0; offersIndex < amount; offersIndex++) {
    var xCoord = Math.floor(Math.random() * 1100);
    var yCoord = Math.floor(Math.random() * (PIN_Y_MAX - PIN_Y_MIN) + PIN_Y_MIN);

    offers[offersIndex] = {
      author: {
        avatar: 'img/avatars/user0' + (offersIndex + 1) + '.png'
      },
      location: {
        x: xCoord,
        y: yCoord
      },
      offer: {
        title: TITLES[Math.floor(Math.random() * TITLES.length)],
        address: xCoord + ', ' + yCoord,
        price: Math.floor(Math.random() * 10000),
        type: TYPES[Math.floor(Math.random() * TYPES.length)],
        rooms: Math.floor(Math.random() * 2 + 1),
        guests: Math.floor(Math.random() * 4 + 1),
        checkin: CHECKTIME[Math.floor(Math.random() * CHECKTIME.length)],
        checkout: CHECKTIME[Math.floor(Math.random() * CHECKTIME.length)],
        features: getElements(FEATURES, 3, 5),
        description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
        photos: getElements(PHOTOS, 1, 3)
      }
    };
  }

  return offers;
};

// Создаем метку
var createPin = function (blank, offerNum) {
  var pin = pinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');

  pin.dataset.offerNum = offerNum;
  pin.style.top = (blank.location.y - pin.style.height) + 'px';
  pin.style.left = (blank.location.x - pin.style.width / 2) + 'px';
  pinImage.src = blank.author.avatar;
  pinImage.alt = blank.offer.title;

  return pin;
};

// Наполняем фрагмент метками
var setPins = function (blanks) {
  var mapPins = document.createDocumentFragment();

  for (var pinIndex = 0; pinIndex < blanks.length; pinIndex++) {
    mapPins.appendChild(createPin(blanks[pinIndex], pinIndex));
  }

  return mapPins;
};

// Делаем список удобств карточки
var renderCardFeatures = function (cardFeatures) {
  var featuresFragment = document.createDocumentFragment();
  for (var featuresIndex = 0; featuresIndex < cardFeatures.length; featuresIndex++) {
    var child = document.createElement('li');
    child.classList.add('popup__feature');
    child.classList.add('popup__feature--' + cardFeatures[featuresIndex]);
    featuresFragment.appendChild(child);
  }
  return featuresFragment;
};

// Делаем список фотографик карточки
var renderCardPhotos = function (offerPhotos) {
  var photosFragment = document.createDocumentFragment();
  for (var photoNum = 0; photoNum < offerPhotos.length; photoNum++) {
    var child = document.createElement('img');
    child.classList.add('popup__photo');
    child.src = offerPhotos[photoNum];
    child.alt = 'Фотография жилья';
    child.width = '45';
    child.height = '40';
    photosFragment.appendChild(child);
  }
  return photosFragment;
};

// Очищаем и заполняем указанными элементами
var fillCardElements = function (popupParent, childs) {
  popupParent.innerHTML = '';
  popupParent.appendChild(childs);
};

// Создаем карточку объявления
var makeCard = function (cardData) {
  var card = mapCardTemplate.cloneNode(true);
  var housingTypes = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом', palace: 'Дворец'};

  card.querySelector('.popup__title').textContent = cardData.offer.title;
  card.querySelector('.popup__text--address').textContent = cardData.offer.address;
  card.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = housingTypes[cardData.offer.type];
  card.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
  card.querySelector('.popup__description').textContent = cardData.offer.description;
  card.querySelector('.popup__avatar').src = cardData.author.avatar;

  fillCardElements(card.querySelector('.popup__features'), renderCardFeatures(cardData.offer.features));
  fillCardElements(card.querySelector('.popup__photos'), renderCardPhotos(cardData.offer.photos));

  return card;
};

// Закрытие карточки
var closeCard = function () {
  if (currentCard) {
    currentCard.removeEventListener('click', onCardCloseClick);
    currentCard.parentElement.removeChild(currentCard);
    currentCard = undefined;
  }
};

// Открытие карточки
var openCard = function (offer) {
  closeCard();
  currentCard = makeCard(offer);
  map.insertBefore(currentCard, map.querySelector('.map__filters-container'));
  currentCard.addEventListener('click', onCardCloseClick);
};

// Переключить состояние набору элементов
var setElementsState = function (elements, state) {
  for (var elementIndex = 0; elementIndex < elements.length; elementIndex++) {
    elements[elementIndex].disabled = state;
  }
};

// Изменяет состояние формы объявления, true - выключить, false - включить
var setAdFormDisabled = function (state) {
  if (state) {
    adForm.classList.add('ad-form--disabled');
  } else {
    adForm.classList.remove('ad-form--disabled');
  }
  setElementsState(adFormFieldsets, state);
};

// Изменяет состояние формы фильтра
var setMapFilterDisabled = function (state) {
  var filterSelects = mapFilterForm.querySelectorAll('select');

  mapFilterForm.querySelector('.map__features').disabled = state;
  setElementsState(filterSelects, state);
};

// Деактивирует страницу
var deactivatePage = function () {
  setAdFormDisabled(true);
  setMapFilterDisabled(true);
  closeCard();

  adFormSubmit.removeEventListener('click', onAdFormSubmitClick);
  selectRoomCapacity.removeEventListener('change', onSelectCapacityChange);
  selectRoomNumber.removeEventListener('change', onSelectRoomChange);
  inputTitle.removeEventListener('input', onTitleInput);
  selectType.removeEventListener('change', onTypeChange);
  inputPrice.removeEventListener('input', onPriceInput);
  selectTime.addEventListener('change', onTimeChange);

  document.removeEventListener('keydown', onEscKeydown);
  map.removeEventListener('click', onMapClick);
  map.removeEventListener('keydown', onMapKeydown);
  pageActive = false;
};

// Активирует страницу
var activatePage = function () {
  map.appendChild(setPins(offers));
  document.querySelector('.map').classList.remove('map--faded');
  setAdFormDisabled(false);
  setMapFilterDisabled(false);

  adFormSubmit.addEventListener('click', onAdFormSubmitClick);
  selectRoomCapacity.addEventListener('change', onSelectCapacityChange);
  selectRoomNumber.addEventListener('change', onSelectRoomChange);
  inputTitle.addEventListener('input', onTitleInput);
  selectType.addEventListener('change', onTypeChange);
  inputPrice.addEventListener('input', onPriceInput);
  selectTime.addEventListener('change', onTimeChange);

  document.addEventListener('keydown', onEscKeydown);
  map.addEventListener('click', onMapClick);
  map.addEventListener('keydown', onMapKeydown);
  pageActive = true;
};

// Заполняет поле адреса
var setAddressField = function () {
  if (pageActive) {
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

/* -------------------------Обработчики------------------------- */

// Изменение количества гостей
var onSelectCapacityChange = function () {
  validateCapacity();
};

// Изменение количества комнат
var onSelectRoomChange = function () {
  validateCapacity();
};

// Клике по кнопке отправить
var onAdFormSubmitClick = function () {
  validateCapacity();
  validateTitle();
  validateType();
};

var onTitleInput = function () {
  validateTitle();
};

var onTypeChange = function () {
  validateType();
};

var onPriceInput = function () {
  validatePrice();
};

var onTimeChange = function (evt) {
  if (evt.target === selectTimein) {
    selectTimeout.value = selectTimein.value;
  } else if (evt.target === selectTimeout) {
    selectTimein.value = selectTimeout.value;
  }
};

var onCardCloseClick = function () {
  closeCard();
};

var onEscKeydown = function (evt) {
  if (evt.key === ESC_KEY) {
    closeCard();
  }
};

var onMapClick = function (evt) {
  var parent = evt.target.parentElement;
  if (parent.classList.contains('map__pin') && !parent.classList.contains('map__pin--main')) {
    openCard(offers[parent.dataset.offerNum]);
    evt.stopPropagation();
  }
};

var onMapKeydown = function (evt) {
  if (evt.key === ENTER_KEY) {
    var target = evt.target;
    if (target.classList.contains('map__pin') && !target.classList.contains('map__pin--main')) {
      openCard(offers[target.dataset.offerNum]);
      evt.stopPropagation();
    }
  }
};
/* -------------------------Основной код------------------------- */
var offers = generateOffers(OFFERS_AMOUNT);
deactivatePage();
setAddressField();

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY && !pageActive) {
    activatePage();
  }
});

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    if (!pageActive) {
      activatePage();
    }

    setAddressField();
  }
});
