'use strict';

(function () {
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

  var closePictureOverlay = function () {
    window.galleryOverlay.hide();
    document.removeEventListener('keydown', window.util.onElementPress);
  };

  window.util.uploadOverlayHide();

  galleryOverlayClose.addEventListener('click', function () {
    window.galleryOverlay.hide();
  });

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    window.util.onEnterPress(evt, closePictureOverlay);
  });

  window.addEventListener('keydown', function (evt) {
    window.util.onEscPress(evt, window.galleryOverlay.hide);
  });

})();
