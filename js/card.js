'use strict';

(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Делает список удобств карточки
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

  // Делает список фотографик карточки
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

  // Очищает и заполняем указанными элементами
  var fillCardElements = function (popupParent, childs) {
    popupParent.innerHTML = '';
    popupParent.appendChild(childs);
  };

  // Создает карточку объявления
  var makeCard = function (cardData) {
    var card = mapCardTemplate.cloneNode(true);
    var housingTypesMap = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом', palace: 'Дворец'};

    card.querySelector('.popup__title').textContent = cardData.offer.title;
    card.querySelector('.popup__text--address').textContent = cardData.offer.address;
    card.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = housingTypesMap[cardData.offer.type];
    card.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    card.querySelector('.popup__description').textContent = cardData.offer.description;
    card.querySelector('.popup__avatar').src = cardData.author.avatar;

    fillCardElements(card.querySelector('.popup__features'), renderCardFeatures(cardData.offer.features));
    fillCardElements(card.querySelector('.popup__photos'), renderCardPhotos(cardData.offer.photos));

    return card;
  };

  /* -------------------------Экспорт------------------------- */

  window.card = {
    makeCard: makeCard
  };

})();
