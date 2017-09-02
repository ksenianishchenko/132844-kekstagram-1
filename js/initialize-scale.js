'use strict';

(function () {
  window.initializeScale = function (source, target, step, callback) {
    var scale = parseFloat(source.value) + step;
    if (scale > 100 || scale < 25) {
      return;
    }
    source.value = scale + '%';
    callback(target, scale / 100);
  };
})();
