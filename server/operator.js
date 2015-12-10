var p=require("bluebird");
var db=require("./mongodbAPI/db");

function Do(callback){
    var defer=p.defer();
    db.getDB().then(function(d){
        callback(d).timeout(1000).then(function(){
            defer.resolve(d);
        }).catch(p.TimeoutError,function(e){
            console.log(e+"数据库连接关闭");
            d.release();
        });
        return defer.promise;
    },function(d){         
        return p.reject(d);
    }).then(function(d){    
        console.log("数据库连接关闭");    
        d.release();
    },function(d){
        console.log(d);
    });    
}
module.exports.Do=Do;