'use strict';

(function () {
  window.initializeFilters = function (evt, element, callback) {
    var newFilter = evt.target.value;
    if (element.classList.length > 1) {
      element.classList.remove(element.classList[element.classList.length - 1]);
    }
    callback(element, newFilter);
  };
})();
