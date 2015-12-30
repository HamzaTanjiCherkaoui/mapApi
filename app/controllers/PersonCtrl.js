(function() {
    'use strict';

    angular
        .module('app.person', ['restangular'])
        .controller('PersonCtrl', PersonCtrl);

    PersonCtrl.$inject = ['$filter', 'Person', 'Restangular', 'Notifier', 'Paginator', 'personId'];

    function PersonCtrl($filter, Person, Restangular, Notifier, Paginator, personId) {
        var $this = this;

        if(typeof personId != 'undefined') {
            $this.personView = true;

            Person.one(personId).get().then(function (response) {
                $this.person = response;
            });

            return;
        }

        $this.edit              = edit;
        $this.save              = save;
        $this.refresh           = refresh;
        $this.remove            = remove;
        $this.nextPage          = nextPage;
        $this.prevPage          = prevPage;
        $this.paginator         = Paginator;
        $this.setDisplayMode    = setDisplayMode;

        /**
         * Retrieve the people resource
         */
        Person.getList({l : Paginator.itemPerPage}).then(function(data) {
            $this.people = data;
        });

        /**
         * Retrieve the total of people resource
         */
        Restangular.one('people').get({c:true}).then(function(data) {
            Paginator.setTotalItems(data);
        });

        /**
         * Save a new or edited person
         */
        function save(personId) {
            if(typeof personId == 'undefined') {
                Person.post($this.person).then(function() {
                    $this.refresh();
                    Notifier('The person was saved');
                });

                return;
            }

            $this.person.put().then(function() {
                $this.refresh();
            });

            Notifier('The person was updated');
        }

        /**
         * Remove a person
         */
        function remove(personId) {
            Person.one(personId).remove().then(function(data) {
                $this.refresh();
                Notifier('The person was deleted');
            });
        }

        /**
         * Retrieve a person for editing
         */
        function edit(personId) {
            Person.one(personId).get().then(function(data) {
                data.birthDate = $filter('date')(data.birthDate, 'yyyy-MM-dd');

                $this.person = data;
            });
        }

        /**
         * Refrech the people resource
         */
        function refresh() {
            Person.getList().then(function(response) {
                $this.people = response;
                Paginator.reset();
            });
        }

        /**
         * Paginator, next page
         */
        function nextPage() {
            Person.getList({'sk': Paginator.nextPage().offsetItems}).then(function(data) {
                $this.people = data;
           });
        }

        /**
         * Paginator, previous page
         */
        function prevPage() {
             Person.getList({'sk': Paginator.prevPage().offsetItems}).then(function(data) {
                 $this.people = data;
            });
        }

        /**
         * Switch the displaying mode
         * $param string mode (list|grid)
         */
        function setDisplayMode(mode) {
            $this.displayMode = mode;

            if(mode == 'list') {
                Paginator.scroller('off');

                return;
            }

            Paginator.scroller(function () {
                Person.getList({sk: Paginator.itemPerPage }).then(function(people) {
                    angular.forEach(people, function(person) {
                        $this.people.push(person);
                    })

                    Paginator.itemPerPage += 10;
                });
            });
        }
    }
}).call(this);

/**
 * angular resource example
 *
app.controller('PersonCtrl', function($scope, $http) {
  $http.get('http://localhost:8000/persons').success(function(data) {
    $scope.response = data;

    $scope.data = function (object) {
      return $scope.response['hydra:' + object];
    }

    var currentPage = 1;

    if($scope.response['@id'].indexOf('page') > 0) {
      currentPage = $scope.response['@id'].replace(/^.*page=/, '');
    }

    $scope.currentPage = (currentPage - 1) * $scope.response['hydra:itemsPerPage'];
    $scope.itemPerPage = $scope.response['hydra:itemsPerPage'] * currentPage;

    $scope.goToPage = function (page) {
      var action = 'http://localhost:8000' + page;

      $http.get(action).success(function(data, $scopeRoot) {
        $scopeRoot.response = data;
      });
    };
  });
});
*/
