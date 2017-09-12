'use strict';

(function () {
  var uploadImageForm = document.querySelector('.upload-image');
  var uploadOverlay = document.querySelector('.upload-overlay');

  window.util = (function () {
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;
    return {
      onElementPress: function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          window.galleryOverlay.show();
        } else if (evt.keyCode === ESC_KEYCODE) {
          window.galleryOverlay.hide();
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
      uploadOverlayHide: function () {
        uploadOverlay.classList.add('hidden');
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
