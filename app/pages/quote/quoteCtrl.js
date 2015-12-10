'use strict';
angular.module('controller')
.controller('quoteCtrl',['$scope','$http','info','$state','searchparse','$location',function(s,$http,info,$state,searchparse,$location){
    var select={};
    var data={};
    var quote=[];
    s.data=data;
    s.select=select;
    $http.get("resource/phone_brand",{
        params:{
            producetype:200001
        }
    }).success(function(d){
        select.phone_brand=d;            
    });
    s.$watch("data.brandid",function(n){
        if(!n) return;
        $http.get("resource/phone_brand_model",{
            cache:true,
            params:{
                brandid:n.id
            }
        }).success(function(d){
            select.phone_brand_model=d;
            data.brand_model_id=select.phone_brand_model[0];
        }); 
    });

    $http.get("resource/phone_trouble_type").success(function(d){
        select.phone_trouble_type=d;            
    });
    s.$watch("data.troubleid",function(n){        
        if(!n) return;
        $http.get("resource/phone_trouble_type_detail",{
            cache:true,
            params:{
                troubleid:n.id
            }
        }).success(function(d){
            select.phone_trouble_type_detail=d;
            data.trouble_detail_repair_id=select.phone_trouble_type_detail[0];
        }); 
    });    
    s.query=function(){
        $http.get("phone_trouble_type_detail_repair_price",{
            cache:true,
            params:angular.extend({
                offergoal:'tengxun'
            },{
                trouble_detail_repair_id:data.trouble_detail_repair_id.id,
                brand_model_id:data.brand_model_id.id                
            })
        }).success(function(d){
            console.log(d);
            s.quote=d;
        }); 
    }
    console.log($location);
    s.quickOrder=function(){
        info.put("quickOrder",data);        
        $state.go('view',{url:"appoint"});
    }
}]);