/**
 * Created by jaydeep verma on 03/08/2018.
 */
(function () {
  'use strict';
  var loader = function(){
    return {
      restrict: 'E',
      replace:true,
      scope: true,
      template: '<div class="loader"><img style="height: 50px; width: 50px" src="app/assets/images/loader.gif"/></div>',
      link: function (scope, element, attr) {
        scope.$watch('loader', function (val) {
          if (val)  $(element).show();
          else  $(element).hide();
        });
      }
    }
  };
  angular.module('rst_app').directive('loader',loader);
})();
