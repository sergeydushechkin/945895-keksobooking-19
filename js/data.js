'use strict';

(function () {

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

  var OFFERS_AMOUNT = 8;
  var PIN_Y_MIN = 130;
  var PIN_Y_MAX = 630;

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

  // Генерирует предложения
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

  /* -------------------------Экспорт------------------------- */

  window.data = {
    generateOffers: generateOffers,
    offers: generateOffers(OFFERS_AMOUNT)
  };

})();
