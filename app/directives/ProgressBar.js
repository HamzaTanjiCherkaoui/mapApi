(function() {
    'use strict';

    app.directive('progressBar', ProgressBar);

    function ProgressBar($interval) {
        return {
            restrict: 'A',
            template: '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: {{percent}}%;">{{percent}}%</div></div>',
            link: function (scope, element) {
                for (var i = 1; i <= 100; i++) {
                    scope.percent = i;
                }
            },
        };
    }
}).call(this);
