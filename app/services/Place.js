(function() {
    'use strict';
    app.factory('Place', Place);

    function Place($http) {
        return {
            getPlaces: function(query) {
                return $http.get('server/json/' + query)
                    .then(function(result) {
                        return result.data;
                    });
            }
        }
    }
}).call(this);
