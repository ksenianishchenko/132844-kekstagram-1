'use strict';

(function () {
  window.galleryOverlay = document.querySelector('.gallery-overlay');

  window.onPictureClickHandler = function (currentPicture) {
    var currentTarget = currentPicture.currentTarget;
    currentPicture.preventDefault();
    window.galleryOverlay.classList.remove('hidden');
    window.galleryOverlay.querySelector('.gallery-overlay-image').src = currentTarget.getElementsByTagName('img')[0].src;
    window.galleryOverlay.querySelector('.likes-count').textContent = currentTarget.querySelector('.picture-likes').textContent;
    window.galleryOverlay.querySelector('.comments-count').textContent = currentTarget.querySelector('.picture-comments').textContent;
  };
})();
