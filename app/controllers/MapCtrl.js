(function() {
    'use strict';

    app.controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope', 'uiGmapGoogleMapApi', 'Place'];

    function MapCtrl($scope, uiGmapGoogleMapApi, Place) {
        var PARIS = {
            latitude: 48.856127,
            longitude: 2.353735
        };

        var colors = {
            '#style2': "#FC4A4A",
            "#style1": "#F65151",
            "#style4": "#ED5A5A",

            "#style3": "#FDA44B",
            "#style8": "#F6A351",
            "#style6": "#EDA35A",

            "#style7": "#FDE24B",
            "#style10": "#F6DD51",
            "#style5": "#EDD75A",

            "#style12": "#E2FD4B",
            "#style14": "#DDF651",
            "#style11": "#D7ED5A",

            "#style9": "#4AB76C",
            "#style13": "#59A671"
        };

        $scope.entity = {
            location: '',
            rooms: 1,
            buildingPeriod: 'inf1946',
            kindOfLocation: 'furnished',
            flatSize: 0
        };
        $scope.polywindow = {
            closeClick: function() {
                $scope.polywindow.show = false;
            },
            coords: PARIS,
            show: false
        };
        $scope.map = {
            center: PARIS,
            pan: true,
            zoom: 12,
            refresh: false,
            events: {},
            bounds: {},
            polys: [],
            getPolyFill: function(model) {
                return model.fill;
            },
            polyEvents: {
                click: function(gPoly, eventName, polyModel) {
                    showInfoWindow(polyModel);
                }
            },
            draw: undefined
        };


        uiGmapGoogleMapApi.then(function() {
            addPolygonsToMap();
            $scope.search = function() {
                $scope.map.polys = [];
                addPolygonsToMap();
            }
        });

        $scope.$watch('location', function() {
            if ($scope.location != undefined) {
                $scope.map.center = $scope.location;
                $scope.map.zoom = 15;
                moveToPolygon([$scope.location.latitude, $scope.location.longitude]);
            }
        });

        function addPolygonsToMap() {
            var rawPolys = [];
            var query = 'drihl_' + $scope.entity.rooms + '_';
            query += $scope.entity.kindOfLocation == 'furnished' ? 'meuble' : 'non-meuble';
            query += '_' + $scope.entity.buildingPeriod + '.json';
            Place.getPlaces(query).then(function(data) {
                $.each(data.features, function(index, item) {
                    var polygon = {
                        id: index,
                        stroke: {
                            color: '#34495e',
                            weight: 1
                        },
                        visible: true,
                        fill: {
                            color: colors[item.properties.styleUrl],
                            opacity: 0.7
                        },
                        data: item.properties
                    };

                    polygon.path = $.map(item.geometry.coordinates[0], function(elem) {
                        return {
                            latitude: parseFloat(elem[1]),
                            longitude: parseFloat(elem[0])
                        };
                    });
                    rawPolys.push(polygon);
                });
                //hide the info window
                $scope.polywindow.show = false;
                $scope.map.polys = rawPolys;

                if ($scope.location != undefined)
                    moveToPolygon([$scope.location.latitude, $scope.location.longitude]);
            });
        }

        function moveToPolygon(point) {
            $.each($scope.map.polys, function(index, item) {
                var p = {
                    latitude: point[0],
                    longitude: point[1]
                }
                if (isPointInPoly(p, item.path)) {
                    showInfoWindow(item);
                    $scope.currentPrice = {
                        median: item.data.ref,
                        max: item.data.refmaj,
                        min: item.data.refmin,
                        global: $scope.entity.flatSize * parseFloat(item.data.ref)
                    };
                }
            });
            return null;
        }

        function isPointInPoly(pt, poly) {
            for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
                ((poly[i].longitude <= pt.longitude && pt.longitude < poly[j].longitude) || (poly[j].longitude <= pt.longitude && pt.longitude < poly[i].longitude)) && (pt.latitude < (poly[j].latitude - poly[i].latitude) * (pt.longitude - poly[i].longitude) / (poly[j].longitude - poly[i].longitude) + poly[i].latitude) && (c = !c);
            return c;
        };

        function showInfoWindow(polygon) {
            $scope.polywindow.coords = getCenter(polygon.path);
            $scope.polywindow.show = true;
            $scope.polywindow.data = polygon.data;
        }

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
