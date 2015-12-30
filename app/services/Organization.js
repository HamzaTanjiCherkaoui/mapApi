(function() {
    'use strict';

    app.factory('Organization', Organization);

    function Organization(Restangular) {
        return Restangular.service('organizations');
    }
}).call(this);
