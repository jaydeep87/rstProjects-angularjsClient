/**
 * Created by Lenovo on 03-08-2018.
 */
var app = angular.module('rst_app');
app.directive('match', function(){
    return {
        restrict:'A',
        controller:function($scope){
            $scope.confirmed = false;
            $scope.doConfirm = function(values){
                if(values === $scope.confirm){
                    $scope.confirmed = true;
                }
                else
                {
                    $scope.confirmed = false;
                }
            }
        },
        link:function(scope, element, attrs, ctrl){
            attrs.$observe('match', function(){
//                   scope.matches = JSON.parse(attrs.match);
//                   alert(typeof attrs.match +"/"+attrs.match);
                scope.doConfirm(attrs.match);
            });
            scope.$watch('confirm', function(){
//                   scope.matches = JSON.parse(attrs.match);
                scope.doConfirm(attrs.match);
            })
        }
    }
});