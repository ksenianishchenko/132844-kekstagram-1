'use strict';

(function () {
  var element = document.querySelector('.gallery-overlay');
  window.galleryOverlay = {
    hide: function () {
      if (!element.classList.contains('hidden')) {
        element.classList.add('hidden');
      }
    },
    show: function () {
      element.classList.remove('hidden');
    },

    onClickHandler: function (currentPicture) {
      var currentTarget = currentPicture.currentTarget;
      currentPicture.preventDefault();
      element.classList.remove('hidden');
      element.querySelector('.gallery-overlay-image').src = currentTarget.getElementsByTagName('img')[0].src;
      element.querySelector('.likes-count').textContent = currentTarget.querySelector('.picture-likes').textContent;
      element.querySelector('.comments-count').textContent = currentTarget.querySelector('.picture-comments').textContent;
    }
  };
})();
