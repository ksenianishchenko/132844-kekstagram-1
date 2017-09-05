'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/kekstagram';

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onLoad(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.timeout = 10000;
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    return xhr;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };

})();
