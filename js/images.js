'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Устанавливает изображение в виде фона элемента
  var setBackground = function (element, imageData) {
    element.style.backgroundSize = 'cover';
    element.style.backgroundImage = 'url(' + imageData + ')';
  };

  // Загружает выбранное изображение в элемент
  var load = function (fileInput, imageElement) {
    var filename = fileInput.files[0].name.toLowerCase();

    var matches = FILE_TYPES.some(function (extension) {
      return filename.endsWith(extension);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (imageElement.tagName === 'IMG') {
          imageElement.src = reader.result;
        } else {
          setBackground(imageElement, reader.result);
        }
      });

      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  /* ---------------Экспорт--------------- */

  window.images = {
    load: load
  };

})();
