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

var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;
var OFFERS_AMOUNT = 8;

// Получаем случайное количество фото
var getPhotos = function (min, max) {
  var photos = [];
  for (var photoNum = 0; photoNum < Math.floor(Math.random() * (max - min) + min); photoNum++) {
    photos[photoNum] = PHOTOS[Math.floor(Math.random() * PHOTOS.length)];
  }
  return photos;
};

// Получаем случайное количество удобств
var getFeatures = function (min, max) {
  var features = [];
  for (var featuresNum = 0; featuresNum < Math.floor(Math.random() * (max - min) + min); featuresNum++) {
    features[featuresNum] = FEATURES[Math.floor(Math.random() * FEATURES.length)];
  }
  return features;
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
        features: getFeatures(3, 5),
        description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
        photos: getPhotos(1, 3)
      }
    };
  }

  return offers;
};

// Создаем метку
var createPin = function (blank) {
  var pin = pinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');

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
    mapPins.appendChild(createPin(blanks[pinIndex]));
  }

  return mapPins;
};

// Заполняем поля карты, если пусто то прячем
var fillCardField = function (parent, childClass, string) {
  var child = parent.querySelector(childClass);

  if (string) {
    child.textContent = string;
  } else {
    child.style.display = 'none';
  }

  return;
};

// Получаем читабельные варианты типа жилья
var getHousingType = function (type) {
  if (type === 'flat') {
    return 'Квартира';
  }
  if (type === 'bungalo') {
    return 'Бунгало';
  }
  if (type === 'house') {
    return 'Дом';
  }
  if (type === 'palace') {
    return 'Дворец';
  }

  return null;
};

// Ищем удобства которые не перечислены в списке предложения, для удаления из DOM
var findUnusedFeatures = function (cardFeatures) {
  var unusedFeatures = [];

  for (var i = 0; i < FEATURES.length; i++) {
    var finded = false;
    for (var j = 0; j < cardFeatures.length; j++) {
      if (FEATURES[i] === cardFeatures[j]) {
        finded = true;
        break;
      }
    }
    if (!finded) {
      unusedFeatures.push(FEATURES[i]);
    }
  }

  return unusedFeatures;
};

// Заполняем список удобств
var fillCardFeatures = function (popupFeatures, cardFeatures) {
  if (!cardFeatures) {
    popupFeatures.style.display = 'none';
    return;
  }

  var unusedFeatures = findUnusedFeatures(cardFeatures);
  for (var unusedIndex = 0; unusedIndex < unusedFeatures.length; unusedIndex++) {
    var child = popupFeatures.querySelector('.popup__feature--' + unusedFeatures[unusedIndex]);
    popupFeatures.removeChild(child);
  }
};

// Создаем теги с фото
var createPhotoTag = function (tagTemplate, photo) {
  var tag = tagTemplate.cloneNode();
  tag.src = photo;
  return tag;
};

// Добавляем фотографии к карточке
var addCardPhotos = function (popupPhotos, offerPhotos) {
  if (!offerPhotos) {
    popupPhotos.style.display = 'none';
    return;
  }

  var photoTemplate = popupPhotos.querySelector('.popup__photo');
  var photosFragment = document.createDocumentFragment();

  for (var photoNum = 0; photoNum < offerPhotos.length; photoNum++) {
    photosFragment.appendChild(createPhotoTag(photoTemplate, offerPhotos[photoNum]));
  }

  // Удаляем пустой шаблонный тег и добавляем сгенерированные
  popupPhotos.removeChild(photoTemplate);
  popupPhotos.appendChild(photosFragment);
};

// Создаем карточку объявления
var makeCard = function (cardData) {
  var card = mapCardTemplate.cloneNode(true);

  fillCardField(card, '.popup__title', cardData.offer.title);
  fillCardField(card, '.popup__text--address', cardData.offer.address);
  fillCardField(card, '.popup__text--price', cardData.offer.price + '₽/ночь');
  fillCardField(card, '.popup__text--capacity', cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей');
  fillCardField(card, '.popup__text--time', 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout);
  fillCardField(card, '.popup__description', cardData.offer.description);
  fillCardField(card, '.popup__avatar', cardData.author.avatar);
  fillCardField(card, '.popup__type', getHousingType(cardData.offer.type));

  fillCardFeatures(card.querySelector('.popup__features'), cardData.offer.features);
  // card.querySelector('.popup__features').textContent = getCard;
  // card.querySelector('.popup__photos').appendChild(makeCardPhotos(cardData.offer.photos));

  return card;
};

var map = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

document.querySelector('.map').classList.remove('map--faded');

var offers = generateOffers(OFFERS_AMOUNT);
map.appendChild(setPins(offers));
map.insertBefore(makeCard(offers[0]), map.querySelector('.map__filters-container'));
