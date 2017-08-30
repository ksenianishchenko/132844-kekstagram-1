'use strict';

(function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  var uploadImageForm = document.querySelector('.upload-image');

  var closePictureOverlay = function () {
    window.galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', window.util.onElementPress);
  };

  uploadOverlay.classList.add('hidden');


  galleryOverlayClose.addEventListener('click', function () {
    window.galleryOverlay.classList.add('hidden');
  });

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    window.util.onEnterPress(evt, closePictureOverlay);
  });

  document.addEventListener('keydown', function (evt) {
    window.util.onEscPress(evt, window.util.uploadOverlayClassAdd);
  });

  window.util = (function () {
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;

    return {
      onElementPress: function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          window.onPictureClickHandler();
        } else if (evt.keyCode === ESC_KEYCODE) {
          closePictureOverlay();
        }
      },
      onEscPress: function (evt, action) {
        if (evt.keyCode === ESC_KEYCODE) {
          action();
        }
      },
      onEnterPress: function (evt, action) {
        if (evt.keyCode === ENTER_KEYCODE) {
          action();
        }
      },
      uploadOverlayClassAdd: function () {
        uploadOverlay.classList.add('hidden');
        uploadImageForm.classList.remove('hidden');
      },
      uploadOverlayClassRemove: function () {
        uploadOverlay.classList.remove('hidden');
        uploadImageForm.classList.add('hidden');
      }
    };
  })();
})();
