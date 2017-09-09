'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content;
  var picturesContainer = document.querySelector('.pictures');
  var filtersContainer = document.querySelector('.filters');
  var picturesArray = [];
  var filterChecked;

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
    picturesArray = pictures;
    updatePictures(picturesArray);
  };

  var updatePictures = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPictures(array[i]));
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

  var updatePicturesArray = function () {
    document.querySelectorAll('.picture').forEach(function (c) {
      c.parentNode.removeChild(c);
    });
    if (filterChecked === 'discussed') {
      var newPicturesDiscussed = picturesArray.slice();
      newPicturesDiscussed.sort(function (commentFirst, commentSecond) {
        if (commentSecond.comments.length > commentFirst.comments.length) {
          return 1;
        } else if (commentSecond.comments.length < commentFirst.comments.length) {
          return -1;
        } else {
          return 0;
        }
      });
      updatePictures(newPicturesDiscussed);
    } else if (filterChecked === 'popular') {
      var newPicturesPopular = picturesArray.slice();
      newPicturesPopular.sort(function (likeFirst, likeSecond) {
        if (likeSecond.likes > likeFirst.likes) {
          return 1;
        } else if (likeSecond.likes < likeFirst.likes) {
          return -1;
        } else {
          return 0;
        }
      });
      updatePictures(newPicturesPopular);
    } else if (filterChecked === 'recommend') {
      updatePictures(picturesArray);
    } else if (filterChecked === 'random') {
      var newPicturesRandom = [];
      var picturesArrayCopy = picturesArray.slice();
      for (var i = 0; i < 10; i++) {
        var randomPictureIndex = Math.floor(Math.random() * picturesArrayCopy.length);
        newPicturesRandom.push(picturesArrayCopy[randomPictureIndex]);
        var left = picturesArrayCopy.slice(0, randomPictureIndex);
        var right = picturesArrayCopy.slice(randomPictureIndex + 1);
        picturesArrayCopy = left.concat(right);
      }
      updatePictures(newPicturesRandom);
    }
  };

  filtersContainer.addEventListener('change', function (evt) {
    filterChecked = evt.target.value;
    window.debounce(updatePicturesArray);
  });
})();
