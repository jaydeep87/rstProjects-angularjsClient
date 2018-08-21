/**
 * Created by jaydeep verma on 03/08/2018.
 */
(function(){
    var DebugService = function(){
        var factory = {};
        /**
         * LogData services
         * @param data
         */
        factory.logData = function(data){
           alert(JSON.stringify(data));
            console.log(JSON.stringify(data));
        };


        return factory;

    };
    angular.module('rst_app').factory('DebugService',DebugService);
})();