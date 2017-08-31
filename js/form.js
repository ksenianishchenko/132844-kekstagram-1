'use strict';

(function () {
  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  var uploadFile = document.querySelector('#upload-file');
  var uploadForm = document.querySelector('.upload-form');
  var uploadRormSubmitButton = document.querySelector('.upload-form-submit');
  var uploadEffect = document.querySelectorAll('input[name=effect]');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadResizeControlButtonDec = document.querySelector('.upload-resize-controls-button-dec');
  var uploadResizeControlButtonInc = document.querySelector('.upload-resize-controls-button-inc');
  var uploadResizeControlValue = document.querySelector('.upload-resize-controls-value');
  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var uploadFormDescription = document.querySelector('.upload-form-description');
  var uploadResizeControlValueDef = 100;
  var uploadEffectLevelLine = document.querySelector('.upload-effect-level-line');
  var uploadEffectLevelPin = uploadEffectLevelLine.querySelector('.upload-effect-level-pin');
  var uploadEffectLevelVal = uploadEffectLevelLine.querySelector('.upload-effect-level-val');
  var uploadEffectLevel = document.querySelector('.upload-effect-level');

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

  uploadEffectLevel.classList.add('hidden');
  var chackedFilter;

  var onFilterEffectChange = function (evt) {
    chackedFilter = evt.target.value;
    if (effectImagePreview.classList.length > 1) {
      effectImagePreview.classList.remove(effectImagePreview.classList[effectImagePreview.classList.length - 1]);
      document.removeEventListener('mousedown', OnMousePress);
    }
    if (chackedFilter !== 'none') {
      uploadEffectLevelPin.style.left = '100%';
      uploadEffectLevelVal.style.width = '100%';
      if (chackedFilter === 'chrome') {
        effectImagePreview.style.filter = 'grayscale(1)';
      } else if (chackedFilter === 'sepia') {
        effectImagePreview.style.filter = 'sepia(1)';
      } else if (chackedFilter === 'marvin') {
        effectImagePreview.style.filter = 'invert(100%)';
      } else if (chackedFilter === 'phobos') {
        effectImagePreview.style.filter = 'blur(3px)';
      } else if (chackedFilter === 'heat') {
        effectImagePreview.style.filter = 'brightness(3)';
      }
      uploadEffectLevel.classList.remove('hidden');
      uploadEffectLevelPin.addEventListener('mousedown', OnMousePress);
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
    evt.preventDefault();
    if (uploadFormHashtags.validity.valid && uploadFormDescription.validity.valid) {
      uploadForm.submit();
    }
  });

  var OnMousePress = function (evt) {
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
      if (chackedFilter === 'chrome') {
        effectImagePreview.style.filter = 'grayscale(' + (uploadEffectLevelVal.offsetWidth - ShiftX) / uploadEffectLevelLine.offsetWidth + ')';
      } else if (chackedFilter === 'sepia') {
        effectImagePreview.style.filter = 'sepia(' + (uploadEffectLevelVal.offsetWidth - ShiftX) / uploadEffectLevelLine.offsetWidth + ')';
      } else if (chackedFilter === 'marvin') {
        effectImagePreview.style.filter = 'invert(' + ((uploadEffectLevelVal.offsetWidth - ShiftX)) * 100 / uploadEffectLevelLine.offsetWidth + '%)';
      } else if (chackedFilter === 'phobos') {
        effectImagePreview.style.filter = 'blur(' + ((uploadEffectLevelVal.offsetWidth - ShiftX)) * 3 / uploadEffectLevelLine.offsetWidth + 'px)';
      } else if (chackedFilter === 'heat') {
        effectImagePreview.style.filter = 'brightness(' + ((uploadEffectLevelVal.offsetWidth - ShiftX)) * 3 / uploadEffectLevelLine.offsetWidth + ')';
      }
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
})();
