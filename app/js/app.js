'use strict';
angular.module('appoint', [  
  'ui.router',  
  'controller',
  'directive',
  'services',
  'templates'
]).config(['$stateProvider',
'$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider.state('view',{
        url:"/*url?:params",
        templateUrl:function(p){            
            var url="pages/"+p.url+"/"+p.url+".html";
            return url;
        },
        resolve:{
            ctrl:['$http','$stateParams','$q',function(http,p,q){
                var defer=q.defer();                  
                var url="pages/"+p.url+"/"+p.url+"Ctrl.js";                
                http.get(url).success(function(d){
                    var arr=d.match(/\.controller[\s\S]*$/igm);
                    var body=(arr!=null?arr[0]:".controller(function()[])");
                    Function("angular.module('appoint').register"+body)();                    
                    defer.resolve('OK');
                })
                return defer.promise;
            }]
        }
    });
}]).config(["$controllerProvider", "$compileProvider", "$filterProvider", "$provide",function($controllerProvider, $compileProvider, $filterProvider, $provide){
    angular.module('appoint').register = {
        controller: $controllerProvider.register,
        directive: $compileProvider.directive,
        filter: $filterProvider.register,
        factory: $provide.factory,
        service: $provide.service
    };
}]);

angular.module('controller', []);
angular.module('directive', []);
angular.module('services', []);
angular.module('templates', []);
