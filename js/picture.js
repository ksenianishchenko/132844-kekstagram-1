'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content;
  var picturesContainer = document.querySelector('.pictures');
  var renderPictures = function (element) {
    var pictureElement = pictureTemplate.cloneNode(true).children[0];
    pictureElement.getElementsByTagName('img')[0].src = element.url;
    pictureElement.querySelector('.picture-likes').textContent = element.likes;
    pictureElement.querySelector('.picture-comments').textContent = element.comments.length;
    pictureElement.addEventListener('click', window.onPictureClickHandler);
    pictureElement.addEventListener('keydown', window.util.onElementPress);
    return pictureElement;
  };

  var onPicturesLoad = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPictures(pictures[i]));
    }
    picturesContainer.appendChild(fragment);
  };

  window.onPicturesErrorLoad = function (errorMessage) {
    var divElement = document.createElement('div');
    divElement.style.width = '500px';
    divElement.style.height = '70px';
    divElement.style.background = 'red';
    divElement.style.position = 'absolute';
    divElement.style.zIndex = 1000;
    divElement.style.left = '35%';
    divElement.style.top = '20%';
    divElement.style.fontSize = '21px';
    divElement.style.textAlign = 'center';
    divElement.style.paddingTop = '30px';
    divElement.style.color = 'blue';
    divElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', divElement);
  };

  window.backend.load(onPicturesLoad, window.onPicturesErrorLoad);
})();
