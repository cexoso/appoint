angular.module('services').
    service('info',[function(){
        var events={};
        function e(name,obj){
            this.name=name;
            this.obj=obj; 
        }
        function put(name,obj){
            events[name]=new e(name,obj);
        }
        function get(name){
            var o=events[name];
            if(o){
                delete events[name];
                return o
            }else{
                return null;
            }
        }
        return {
            put:put,
            get:get
        }
}]).service("searchparse",function(){
    return function(o){
        var str="";
        var isAnd=false;
        for(key in o){
            var p=(isAnd?"&":(isAnd=true,""))+key+"="+o[key];
            str+=p;
        }
        return str;
    }
})