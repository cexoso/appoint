var mysql = require('mysql');
var Promise = require("bluebird");
var conn=require(process.cwd()+"/server/sqlPool.js");
var sql=require(process.cwd()+"/sql/appointSQL.json");
function postAppoint(params){    
    var defer = Promise.defer();    
    var s=mysql.format(sql.appoint_post,params);
    console.log(params)
    conn.query(s,function(err, result) {
        if (err) throw err; 
        defer.resolve(result);        
    });    
    return defer.promise;
}

function getAppoint(query){    
    var defer = Promise.defer();
    var s=mysql.format(sql.appoint_get,query);
    conn.query(s,function(err, result) {
        if (err) throw err; 
        defer.resolve(result);        
    });    
    return defer.promise;
}

 module.exports.postAppoint=postAppoint;
 module.exports.getAppoint=getAppoint;