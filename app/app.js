var app = (function() {
    'use strict';

    angular
        .module('app', ['ngRoute', 'app.person', 'uiGmapgoogle-maps'])
        .config(config);

    function config($routeProvider, RestangularProvider, uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyATIKqJAOJrzmO9yhyIkamolOX0a8Xi2xg',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
        $routeProvider.
        when('/', {
            controller: 'MainCtrl',
            templateUrl: 'partials/home.html'
        }).
        when('/persons/:id?', {
            controller: 'PersonCtrl',
            controllerAs: 'pc',
            templateUrl: 'partials/persons.html',
            resolve: {
                personId: function($route) {
                    return $route.current.params.id;
                }
            }
        }).
        when('/organizations', {
            controller: 'OrganizationCtrl',
            templateUrl: 'partials/organizations.html'
        }).
        when('/map', {
            controller: 'MapCtrl',
            templateUrl: 'partials/map.html'
        }).
        otherwise({
            redirectTo: '/'
        });

        RestangularProvider.
        setBaseUrl('https://api.mongolab.com/api/1/databases/appartoo-angular-demo/collections').
        setRestangularFields({
            id: '_id.$oid',
        }).
        setDefaultRequestParams({
            apiKey: '7ynrQkHpx5sosRC0C7DUHw1DQYTBnJD_',
            l: 10,
            s: "{'_id':-1}"
        });

        /**
         * Response JSON-LD
        addResponseInterceptor(function(data, operation, what, url, response, deferred) {
            var data = data[0];

            function populateHref(data) {
                if (data['@id']) {
                    data.href = data['@id'].substring(1);
                }
            }

            populateHref(data);

            if (operation === 'getList') {
                var collection = data['hydra:member'];
                collection.metadata = {};

                angular.forEach(data, function (value, key) {
                    if ('hydra:member' !== key) {
                        collection.metadata[key] = value;
                    }
                });

                angular.forEach(collection, function (value) {
                    populateHref(value);
                });
            }

            return collection;
        });
        */
    }

    return angular.module('app');
}).call(app);
