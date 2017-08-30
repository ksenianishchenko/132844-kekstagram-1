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

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < window.pictures.length; i++) {
    fragment.appendChild(renderPictures(window.pictures[i]));
  }
  picturesContainer.appendChild(fragment);
})();
