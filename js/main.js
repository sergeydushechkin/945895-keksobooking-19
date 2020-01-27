'use strict';

var TITLES = ['Объявление', 'Сдается', 'Сдам квартиру', 'Недорого', 'Сдам недорого', 'Во временное пользование'];
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
var generateAvatars = function () {
  for (var i = 0; i < OFFERS_AMOUNT; i++) {
    avatars[i] = 'img/avatars/user0' + (i + 1) + '.png';
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
  var offers = [];

  for (var i = 0; i < amount; i++) {
    var author = {};
    author.avatar = avatars[i];

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

    offers[i] = blank;
  }

  return offers;
};


generateAvatars();
var offers = generateOffers(OFFERS_AMOUNT);
document.querySelector('.map').classList.remove('map--faded');
