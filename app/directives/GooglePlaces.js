(function() {
    'use strict';

    app.directive('googlePlaces', googlePlaces);

    function googlePlaces() {
        return {
            restrict: 'E',
            replace: true,
            // transclude:true,
            scope: {
                location: '='
            },
            template: '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level form-control"/>',
            link: function($scope, elm, attrs) {
                var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
                google.maps.event.addListener(autocomplete, 'place_changed', function() {
                    var place = autocomplete.getPlace();
                    //console.log(place);
                    $scope.location = {
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng()
                    };
                    $scope.$apply();
                });
            }
        }
    }

}).call(this);
