'use strict';
angular.module('controller')
.controller('queryCtrl',['$scope','$http',function(s,$http){
    s.data={};
    s.query=function(){

        $http.get("/resources/appoint",{
            params:s.data
        }).success(function(d){
            s.data_query=d;
        });        
    }
    s.pay=function(d){
        console.log(d);
    }
}]);