/**
 * Created by jaydeep verma on 03/08/2018.
 */
(function(){
    var LocalStorageService = function(){
        var factory = {};
        /**
         *
         * get service
         */
        factory.get = function(key){
            return JSON.parse(sessionStorage.getItem(key));
           // return sessionStorage.getItem(key);
        };
        /**
         *set service
         */
        factory.set = function(key, val) {
            return sessionStorage.setItem(key, JSON.stringify(val));
           // return sessionStorage.setItem(key, val);
        };
        /**
         * unset service
         */
        factory.unset = function(key) {
            return sessionStorage.removeItem(key);
        };

        /**
         * clear all session storage
         */
        factory.clear = function(){
            return sessionStorage.clear();
        };
        return factory;

    };
    angular.module('rst_app').factory('LocalStorageService',LocalStorageService);
})();
