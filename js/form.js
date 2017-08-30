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
})();
