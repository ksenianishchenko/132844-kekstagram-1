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
var uploadImageForm = document.querySelector('.upload-image');
var uploadFormCancel = document.querySelector('.upload-form-cancel');
var uploadFile = document.querySelector('#upload-file');
var uploadForm = document.querySelector('.upload-form');
var uploadRormSubmit = document.querySelector('.upload-form-submit');
var uploadEffect = document.querySelectorAll('input[name=effect]');
var effectImagePreview = document.querySelector('.effect-image-preview');
var uploadResizeControlButtonDec = document.querySelector('.upload-resize-controls-button-dec');
var uploadResizeControlButtonInc = document.querySelector('.upload-resize-controls-button-inc');
var uploadResizeControlValue = document.querySelector('.upload-resize-controls-value');
var uploadResizeControlValueDef = 100;
var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
var uploadFormDescription = document.querySelector('.upload-form-description');
var ESC_KEYCODE = 27;
var ESC_ENTER = 13;

var onElementPress = function (evt) {
  if (evt.keyCode === ESC_ENTER) {
    onPictureClickHandler();
  } else if (evt.keyCode === ESC_KEYCODE) {
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
  if (evt.keyCode === ESC_ENTER) {
    closePictureOverlay();
  }
});

uploadFile.addEventListener('click', function () {
  uploadOverlay.classList.remove('hidden');
  uploadImageForm.classList.add('hidden');
});

uploadFormCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('hidden');
  uploadImageForm.classList.remove('hidden');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    uploadOverlay.classList.add('hidden');
    uploadImageForm.classList.remove('hidden');
  }
});

uploadFormCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_ENTER) {
    uploadOverlay.classList.add('hidden');
    uploadImageForm.classList.remove('hidden');
  }
});

uploadRormSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_ENTER) {
    uploadForm.submit();
  }
});

var onFilterEffectChange = function (evt) {
  var chackedFilter = evt.target.value;
  if (effectImagePreview.classList.length > 1) {
    effectImagePreview.classList.remove(effectImagePreview.classList[effectImagePreview.classList.length - 1]);
  }

  effectImagePreview.classList.add('effect-' + chackedFilter);
};

for (var effect = 0; effect < uploadEffect.length; effect++) {
  uploadEffect[effect].addEventListener('change', onFilterEffectChange);
}

var uploadResizeNewValue = function () {
  var newValue = uploadResizeControlValueDef + '%';
  uploadResizeControlValue.value = newValue;
  effectImagePreview.style.transform = 'scale(0.' + uploadResizeControlValueDef + ')';
  if (uploadResizeControlValueDef === 100) {
    effectImagePreview.style.transform = 'scale(1)';
  }
};

uploadResizeControlButtonDec.addEventListener('click', function () {
  if (uploadResizeControlValueDef > 25) {
    uploadResizeControlValueDef -= 25;
    uploadResizeNewValue();
  }
});

uploadResizeControlButtonInc.addEventListener('click', function () {
  if (uploadResizeControlValueDef < 100) {
    uploadResizeControlValueDef += 25;
    uploadResizeNewValue();
  }
});

uploadFormHashtags.addEventListener('invalid', function (evt) {
  uploadFormHashtags.style.border = 'none;';
  if (!uploadFormHashtags.validity.valid) {
    uploadFormHashtags.style.border = '2px solid red';
    if (uploadFormHashtags.validity.patternMismatch) {
      uploadFormHashtags.setCustomValidity('хэш-тег начинается с символа `#` (решётка) и состоит из одного слова, нельзя указать больше пяти хэш-тегов, максимальная длина одного хэш-тега 20 символов');
    } else if (uploadFormHashtags.validity.rangeOverflow) {
      uploadFormHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    }
  } else {
    uploadFormHashtags.setCustomValidity('');
  }
});

uploadFormDescription.addEventListener('invalid', function () {
  uploadFormDescription.style.border = 'none';
  if (!uploadFormDescription.validity.valid) {
    uploadFormDescription.style.border = '2px solid red';
  } else {
    uploadFormDescription.setCustomValidity('');
  }
});

uploadForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (uploadFormHashtags.validity.valid && uploadFormDescription.validity.valid) {
    uploadForm.submit();
  }
});
