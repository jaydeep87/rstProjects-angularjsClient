/**
 * Created by jaydeep verma on 03/08/2018.
 */
(function () {
    'use strict';
    app = angular.module('rst_app');
    app.directive('errorMessage', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                name: '='
            },
            template: '<div style="width: 300px; left:43%; z-index: 99999; position: fixed; top: 16%;"> <div class="alert alert-danger text-center text-capitalize">{{name}}</div></div>'
        }
    });

})();
