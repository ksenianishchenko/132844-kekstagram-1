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

window.pictures = getPicturesArray(25);
