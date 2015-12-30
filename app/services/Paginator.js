(function() {
    'use strict';

    app.service('Paginator', Paginator);

    Paginator.$inject = ['$window', '$document'];

    function Paginator($window, $document) {
        this.currentPage = 1;
        this.offsetItems = 0;
        this.limitItems  = 10;
        this.itemPerPage = 10;

        this.reset          = reset;
        this.scroller       = scroller;
        this.nextPage       = nextPage;
        this.prevPage       = prevPage;
        this.hasNextPage    = hasNextPage;
        this.hasPrevPage    = hasPrevPage;
        this.setTotalItems  = setTotalItems;

        function setTotalItems(totalItems) {
            this.totalItems = totalItems;
            this.totalPages = Math.round(totalItems / this.itemPerPage);

            return this;
        }

        function hasPrevPage() {
            return this.currentPage == 1;
        }

        function hasNextPage() {
            return this.currentPage == this.totalPages;
        }

        function reset() {
            this.currentPage = 1;
            this.offsetItems = 0;
            this.limitItems  = 10;
            this.itemPerPage = 10;
        }

        function nextPage() {
            this.currentPage++;
            this.offsetItems = (this.currentPage - 1) * this.itemPerPage;
            this.limitItems  = this.currentPage * this.itemPerPage;

            if(this.currentPage == this.totalPages) this.limitItems = this.totalItems;

            return this;
        }

        function prevPage() {
            this.currentPage--;
            this.offsetItems = (this.currentPage - 1) * this.itemPerPage;
            this.limitItems  = this.currentPage * this.itemPerPage;

            if(this.currentPage == 1) this.offsetItems = 0;

            return this;
        }

        function scroller(callback) {
            $window = angular.element($window);

            if(callback == 'off') {
                $window.off('scroll');

                return;
            }

            $window.on('scroll', scrollFunction);

            function scrollFunction() {
                if($window.scrollTop() + $window.height() - $document.height() == 0) {
                    callback();
                }
            }
        }

        return this;
    }
}).call(this);
