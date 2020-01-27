'use strict';

var TITLES = ['Хостел Like Home', 'Маэстро Хостел', 'Сдам квартиру', 'Бабушка Хаус', 'Сдам недорого', 'Отель Звездный'];
var TYPES = ['palace', 'flat', 'house'];
var CHECKTIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var DESCRIPTIONS = [
  'Апартаменты с внутренним двориком и бесплатным Wi-Fi, расположены в 7 км от собора.',
  'Апартаменты с видом на город и Wi-Fi расположены в Центральном районе , всего в 600 метрах от музея и в 1,1 км от сада.',
  'Дом для отпуска состоит из спален, гостиной, полностью оборудованной кухни с микроволновой печью и чайником, а также ванной комнаты с душем и феном',
  'К услугам гостей круглосуточная стойка регистрации, общая кухня, общий лаундж, прачечная и автомат по продаже напитков и закусок.',
  'Отличный выбор, если вам интересны парки, прогулки у реки и атмосфера.',
  'Все апартаменты располагают гостиной зоной с диваном, обеденной зоной и полностью оборудованной кухней с микроволновой печью, холодильником и плитой. В распоряжении гостей собственная ванная комната с душем, феном и бесплатными туалетно-косметическими принадлежностями.'
];

var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;
var OFFERS_AMOUNT = 8;
var avatars = [];

// Генерируем пути к аватарам
var generateAvatars = function (amount) {
  for (var avatarIndex = 0; avatarIndex < amount; avatarIndex++) {
    avatars[avatarIndex] = 'img/avatars/user0' + (avatarIndex + 1) + '.png';
  }
};

// Получаем случайное количество фото
var getPhotos = function (min, max) {
  var photos = [];
  for (var photoNum = 0; photoNum < Math.floor(Math.random() * (max - min) + min); photoNum++) {
    photos[photoNum] = PHOTOS[Math.floor(Math.random() * PHOTOS.length)];
  }
  return photos;
};

// Генерируем предложения
var generateOffers = function (amount) {
  var generatedOffers = [];

  for (var offersIndex = 0; offersIndex < amount; offersIndex++) {
    var author = {};
    author.avatar = avatars[offersIndex];

    var location = {};
    location.x = Math.floor(Math.random() * 1100);
    location.y = Math.floor(Math.random() * (PIN_Y_MAX - PIN_Y_MIN) + PIN_Y_MIN);

    var offer = {};
    offer.title = TITLES[Math.floor(Math.random() * TITLES.length)];
    offer.address = location.x + ', ' + location.y;
    offer.price = Math.floor(Math.random() * 10000);
    offer.type = TYPES[Math.floor(Math.random() * TYPES.length)];
    offer.rooms = Math.floor(Math.random() * 2 + 1);
    offer.guests = Math.floor(Math.random() * 4 + 1);
    offer.checkin = CHECKTIME[Math.floor(Math.random() * CHECKTIME.length)];
    offer.checkout = CHECKTIME[Math.floor(Math.random() * CHECKTIME.length)];
    offer.features = FEATURES[Math.floor(Math.random() * FEATURES.length)];
    offer.description = DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)];
    offer.photos = getPhotos(1, 3);

    var blank = {};
    blank.author = author;
    blank.offer = offer;
    blank.location = location;

    generatedOffers[offersIndex] = blank;
  }

  return generatedOffers;
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

var map = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

document.querySelector('.map').classList.remove('map--faded');

generateAvatars(OFFERS_AMOUNT);
var offers = generateOffers(OFFERS_AMOUNT);
map.appendChild(setPins(offers));
