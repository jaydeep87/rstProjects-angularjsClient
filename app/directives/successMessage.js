/**
 * Created by jaydeep verma on 03/08/2018.
 */
/****************** success-message directive *********************************/
(function () {
    'use strict';
    app = angular.module('rst_app');
    app.directive('successMessage', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                name: '='
            },
            template: '<div style="width: 100%; z-index: 99999; position: fixed; top: 16%;"> <div class="alert alert-success text-center" style="width: 300px; margin:auto;">{{name}}</div></div>'
        }
    });

})();

