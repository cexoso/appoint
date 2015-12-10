var mysql = require('mysql');
var conn=require(process.cwd()+"/server/sqlPool.js");
var sql=require(process.cwd()+"/sql/resourceSQL.json");
var Promise = require("bluebird");
function query(table,params){    
    var defer = Promise.defer();
    var s=mysql.format(sql[table],params);
    conn.query(s,function(err, rows, fields) {
      if (err) throw err; 
      defer.resolve(rows);
    });
    
    return defer.promise;
}

function queryPrice(table,params){    
    var defer = Promise.defer();
    
    var s=mysql.format(sql[table],[
        {trouble_detail_repair_id:params.trouble_detail_repair_id},
        {brand_model_id:params.brand_model_id},
        {offergoal:params.offergoal}
    ]);
    conn.query(s,function(err, rows, fields) {
      if (err) throw err; 
      defer.resolve(rows);
    });
    return defer.promise;
}

 module.exports.query=query;
 module.exports.queryPrice=queryPrice;