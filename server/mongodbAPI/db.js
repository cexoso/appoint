var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test';
var p=require("bluebird");

function getDB(){
    var defer=p.defer();
    MongoClient.connect(url, function(err, db) {                
        if(err){
            console.log(err);
            defer.reject(err);
        }else{
            db.__proto__.release=release;
            defer.resolve(db);
        }
    });
    return defer.promise;
}
function release(db1){
    var db=this||db1;
    db.close();
}



module.exports.getDB=getDB;
module.exports.release=release;//release should be call like this db.release(); or release(db);