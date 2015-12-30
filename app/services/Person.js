(function() {
    'use strict';

    app.factory('Person', Person);

    function Person(Restangular) {
        return Restangular.service('people');
    }
}).call(this);
