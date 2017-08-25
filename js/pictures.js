'use strict';
var PICTURES_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var randomNamber = function (max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getPicturesArray = function (countOfPictures) {
  var picturesArray = [];
  for (var i = 0; i < countOfPictures; i++) {
    var pictureObject = {
      url: 'photos/' + (randomNamber(25, 1)) + '.jpg',
      likes: randomNamber(200, 15),
      comments: []
    };
    var exists = false;
    for (var j = 0; j < picturesArray.length; j++) {
      if (picturesArray[j].url === pictureObject.url) {
        exists = true;
        break;
      }
    }
    if (exists) {
      i--;
    } else {
      var totalComments = randomNamber(0, 6);
      for (var c = 0; c < totalComments; c++) {
        pictureObject.comments.push(PICTURES_COMMENTS[randomNamber(PICTURES_COMMENTS.length, 0)]);
      }
      picturesArray.push(pictureObject);
    }
  }
  return picturesArray;
};
var pictures = getPicturesArray(25);
var pictureTemplate = document.querySelector('#picture-template').content;
var picturesContainer = document.querySelector('.pictures');
var uploadOverlay = document.querySelector('.upload-overlay');
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

var onElementPress = function (evt) {
  if (evt.keyCode === 13) {
    onPictureClickHandler();
  } else if (evt.keyCode === 27) {
    closePictureOverlay();
  }
};

var closePictureOverlay = function () {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onElementPress);
};

var onPictureClickHandler = function (currentPicture) {
  var currentTarget = currentPicture.currentTarget;
  currentPicture.preventDefault();
  galleryOverlay.classList.remove('hidden');
  galleryOverlay.querySelector('.gallery-overlay-image').src = currentTarget.getElementsByTagName('img')[0].src;
  galleryOverlay.querySelector('.likes-count').textContent = currentTarget.querySelector('.picture-likes').textContent;
  galleryOverlay.querySelector('.comments-count').textContent = currentTarget.querySelector('.picture-comments').textContent;
};

var renderPictures = function (element) {
  var pictureElement = pictureTemplate.cloneNode(true).children[0];
  pictureElement.getElementsByTagName('img')[0].src = element.url;
  pictureElement.querySelector('.picture-likes').textContent = element.likes;
  pictureElement.querySelector('.picture-comments').textContent = element.comments.length;
  pictureElement.addEventListener('click', onPictureClickHandler);
  pictureElement.addEventListener('keydown', onElementPress);
  return pictureElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPictures(pictures[i]));
}
picturesContainer.appendChild(fragment);

uploadOverlay.classList.add('hidden');

galleryOverlayClose.addEventListener('click', function () {
  galleryOverlay.classList.add('hidden');
});

galleryOverlayClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closePictureOverlay();
  }
});
