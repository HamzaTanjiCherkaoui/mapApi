(function() {
    'use strict';

    app.controller('NotificationCtrl', NotificationCtrl);

    NotificationCtrl.$inject = ['$scope', '$interval'];

    function NotificationCtrl($scope, $interval) {
        $scope.class = '';
        $scope.type = '';
        $scope.message = '';

        $scope.$on('notification', function(event, type, message) {
            $scope.class = 'in';
            $scope.type = type;
            $scope.message = message;

            var interval = $interval(function () {
                $scope.class = 'hide';
                $interval.cancel(interval);
            }, 2000);
        });
    };
}).call(this);
