'use strict';
angular.module('controller')
.controller('appointCtrl',['$scope','info',"$stateParams","$location","$http","$state",function(s,info,$stateParams,$location,$http,$state){
    var qo=info.get("quickOrder");
    var data={};
    var select={};
    var getDate=(function(){
        var now=new Date();
        var y=now.getYear();
        var m=now.getMonth();
        var d=now.getDate();
        return function(day,str,nextstr){
            var obj={name:str};
            var delte=day-now.getDay();
            if(delte<0){
                delte+=7;
                obj.name=nextstr;
            };
            obj.value=new Date(1900+y,m,d+delte);
            return obj;
        };
    })();
    var dateArr=[
        getDate(2,'周二,科兴科学园','下周二,科兴科学园'),
        getDate(4,'周四,科兴科学园','下周四,科兴科学园'),
        getDate(6,'周六,科兴科学园','下周六,科兴科学园')
    ];
    var timeArr=[
        {value:'9-10',name:'9点到10点'},
        {value:'11-12',name:'11点到12点'},
        {value:'12-13',name:'12点到13点'},
        {value:'13-14',name:'13点到14点'}
    ];
    select.times=timeArr;
    select.dates=dateArr.sort(function(k,v){
        if(k.value>v.value){
            return true;
        }else{
            return false;
        }
    });
    s.select=select;
    s.data=data;
    if(qo){
        var obj=qo.obj;
        data.brand=obj.brandid.name;
        data.model=obj.brand_model_id.name;
        data.troubleDetail=obj.trouble_detail_repair_id.name;
    }
    s.data_submit=[];
    s.submit=function(){        
        s.appoint_form.$setPristine();
        $http.post("/resources/appoint",s.data).success(function(d){            
            s.data_submit.push(angular.extend({},s.data));
            console.log(d);
        });
    }    
}]);