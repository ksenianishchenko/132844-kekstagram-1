'use strict';

(function () {
  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  var uploadFile = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.upload-form');
  var uploadRormSubmitButton = document.querySelector('.upload-form-submit');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var uploadFormDescription = document.querySelector('.upload-form-description');
  var uploadEffectLevelLine = document.querySelector('.upload-effect-level-line');
  var uploadEffectLevelPin = uploadEffectLevelLine.querySelector('.upload-effect-level-pin');
  var uploadEffectLevelVal = uploadEffectLevelLine.querySelector('.upload-effect-level-val');
  var uploadEffectLevel = document.querySelector('.upload-effect-level');
  var uploadResizeControlButtonDec = document.querySelector('.upload-resize-controls-button-dec');
  var uploadResizeControlButtonInc = document.querySelector('.upload-resize-controls-button-inc');
  var uploadResizeControlValue = document.querySelector('.upload-resize-controls-value');
  var uploadEffect = document.querySelectorAll('input[name=effect]');
  var uploadImage = document.querySelector('.upload-image');
  var formFilters = document.querySelector('.filters');
  var chackedFilter;

  var filters = {
    none: {filterId: 'none'},
    chrome: {filterId: 'grayscale', factor: 1, type: ''},
    sepia: {filterId: 'sepia', factor: 1, type: ''},
    marvin: {filterId: 'invert', factor: 100, type: '%'},
    phobos: {filterId: 'blur', factor: 3, type: 'px'},
    heat: {filterId: 'brightness', factor: 3, type: ''}
  };

  effectImagePreview = document.querySelector('.effect-image-preview');

  uploadFile.addEventListener('click', function () {
    window.util.uploadOverlayClassRemove();
  });

  uploadFormCancel.addEventListener('click', function () {
    window.util.uploadOverlayClassAdd();
  });

  uploadFormCancel.addEventListener('keydown', function (evt) {
    window.util.onEnterPress(evt, window.util.uploadOverlayClassAdd);
  });

  var uploadFormSubmit = uploadForm.submit;

  uploadRormSubmitButton.addEventListener('keydown', function (evt) {
    window.util.onEnterPress(evt, uploadFormSubmit);
  });

  uploadFormHashtags.addEventListener('invalid', function (evt) {
    uploadFormHashtags.setCustomValidity('');
    uploadFormHashtags.style.border = 'none';
    if (!uploadFormHashtags.validity.valid) {
      uploadFormHashtags.style.border = '2px solid red';
      if (uploadFormHashtags.validity.patternMismatch) {
        uploadFormHashtags.setCustomValidity('хэш-тег начинается с символа `#` (решётка) и состоит из одного слова, нельзя указать больше пяти хэш-тегов, максимальная длина одного хэш-тега 20 символов');
      } else if (uploadFormHashtags.validity.rangeOverflow) {
        uploadFormHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      }
    }
  });

  uploadFormDescription.addEventListener('invalid', function () {
    uploadFormDescription.setCustomValidity('');
    uploadFormDescription.style.border = 'none';
    if (!uploadFormDescription.validity.valid) {
      uploadFormDescription.style.border = '2px solid red';
    }
  });

  uploadForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(uploadForm), function () {
      window.uploadOverlay.classList.add('hidden');
      uploadImage.classList.remove('hidden');
    }, window.onPicturesErrorLoad);
    evt.preventDefault();
    uploadForm.reset();
  });

  uploadEffectLevel.classList.add('hidden');

  var filterDefault = function (filterDefaultName, element) {
    var filterDefaultChacked = filters[filterDefaultName];
    if (filterDefaultName === 'none') {
      element.style.filter = filterDefaultChacked.filterId;
    } else {
      element.style.filter = filterDefaultChacked.filterId + '(' + filterDefaultChacked.factor + filterDefaultChacked.type + ')';
    }
  };

  var applyFilter = function (element, filter) {
    chackedFilter = filter;
    element.classList.add('effect-' + chackedFilter);
    uploadEffectLevelPin.style.left = '100%';
    uploadEffectLevelVal.style.width = '100%';
    filterDefault(chackedFilter, effectImagePreview);
    uploadEffectLevel.classList.add('hidden');
    if (chackedFilter !== 'none') {
      uploadEffectLevel.classList.remove('hidden');
      uploadEffectLevelPin.addEventListener('mousedown', onMousePress);
    }
  };

  for (var effect = 0; effect < uploadEffect.length; effect++) {
    uploadEffect[effect].addEventListener('change', function (evt) {
      window.initializeFilters(evt, effectImagePreview, applyFilter);
      document.removeEventListener('mousedown', onMousePress);
    });
  }

  var onMousePress = function (evt) {
    var effectLineCoord = getCoords(uploadEffectLevelLine);
    var rigthRange = effectLineCoord.left + uploadEffectLevelLine.offsetWidth;
    var startLeftCoord = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var ShiftX = startLeftCoord - moveEvt.clientX;
      if (moveEvt.clientX < effectLineCoord.left) {
        ShiftX = 0;
        startLeftCoord = moveEvt.clientX;
      } else if (startLeftCoord > rigthRange) {
        ShiftX = 0;
      }
      startLeftCoord = moveEvt.clientX;
      uploadEffectLevelPin.style.left = (uploadEffectLevelPin.offsetLeft - ShiftX) + 'px';
      uploadEffectLevelVal.style.width = (uploadEffectLevelVal.offsetWidth - ShiftX) + 'px';
      addFilter(chackedFilter, effectImagePreview, uploadEffectLevelVal, uploadEffectLevelLine, ShiftX);
    };

    var addFilter = function (filterName, target, effectLevelElement, effectLineElement, shiftX) {
      var filter = filters[filterName];
      target.style.filter = filter.filterId + '(' + ((effectLevelElement.offsetWidth - shiftX)) * filter.factor / effectLineElement.offsetWidth + filter.type + ')';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    function getCoords(elem) {
      var box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }
  };

  var adjustScale = function (element, scale) {
    element.style.transform = 'scale(' + scale + ')';
  };

  uploadResizeControlButtonDec.addEventListener('click', function () {
    window.initializeScale(uploadResizeControlValue, effectImagePreview, -25, adjustScale);
  });

  uploadResizeControlButtonInc.addEventListener('click', function () {
    window.initializeScale(uploadResizeControlValue, effectImagePreview, +25, adjustScale);
  });

  formFilters.classList.remove('hidden');
})();
