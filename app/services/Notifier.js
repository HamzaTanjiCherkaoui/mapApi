(function() {
    'use strict';

    app.factory('Notifier', Notifier);
    Notifier.$inspect = ['$rootScope'];

    function Notifier($rootScope) {
        return function (message, type, broadcast) {
            type = type || 'success';
            broadcast = broadcast || 'notification';

            $rootScope.$broadcast(broadcast, type, message);
        }
    }
}).call(this);
