(function() {
    'use strict';

    app.controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope', 'uiGmapGoogleMapApi', 'Place'];

    function MapCtrl($scope, uiGmapGoogleMapApi, Place) {

        $scope.entity = {
            location: '',
            rooms: 2,
            buildingPeriod: 'inf1946',
            kindOfLocation: 'furnished'
        }

        $scope.polygonList = [];
        $scope.markersList = [];
        $scope.$watch('location', function() {
            if($scope.location != undefined)
                $scope.map.center = $scope.location;
        });
        uiGmapGoogleMapApi
            .then(function(maps) {
                $scope.map = {
                    center: {
                        latitude: 48.856127,
                        longitude: 2.353735
                    },
                    zoom: 13
                };

                $scope.search = function() {
                    //move the map

                    //get query from form data
                    var query = 'drihl_' + $scope.entity.rooms + '_';
                    query += $scope.entity.kindOfLocation == 'furnished' ? 'meuble' : 'non-meuble';
                    query += '_' + $scope.entity.buildingPeriod + '.json';

                    $scope.polygonList = [];
                    $scope.markersList = [];

                    Place.getPlaces(query).then(function(data) {
                        $.each(data.features, function(i, item) {
                            //add plygons
                            var polygon = {
                                stroke: {
                                    color: '#603455',
                                    weight: 1
                                },
                                visible: true,
                                fill: {
                                    color: '#ff0000',
                                    opacity: 0.5
                                }
                            };
                            polygon.path = $.map(item.geometry.coordinates[0], function(elem) {
                                return {
                                    latitude: parseFloat(elem[1]),
                                    longitude: parseFloat(elem[0])
                                };
                            });
                            $scope.polygonList.push(polygon);
                            //add markers
                            if (item.properties) {
                                var marker = getCenter(polygon.path);
                                marker.id = item.properties.idQuartier;
                                marker.data = item.properties;
                                $scope.markersList.push(marker);
                            }
                        });
                    });
                }
            });

        function getCenter(coordinates) {
            var latList = $.map(coordinates, function(item) {
                return item.latitude;
            });
            var lngList = $.map(coordinates, function(item) {
                return item.longitude;
            });
            var maxLat = Math.max.apply(Math, latList);
            var minLat = Math.min.apply(Math, latList);
            var maxLng = Math.max.apply(Math, lngList);
            var minLng = Math.min.apply(Math, lngList);
            return {
                latitude: minLat + (maxLat - minLat) / 2,
                longitude: minLng + (maxLng - minLng) / 2
            };
        }
    };
}).call(this);
