(function() {
    'use strict';
    app.factory('Place', Place);

    function Place($http) {
        return {
            getPlaces: function(query) {
                return $http.get('server/json/' + query)
                    .then(function(result) {
                        //console.log(result.data);
                        return result.data;
                    });
            }
        }
    }
}).call(this);
