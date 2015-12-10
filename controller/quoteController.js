var mysql = require('mysql');
var sqlParams=require(__dirname+"/file.json").mysql;
var Promise = require("bluebird");
var defer = Promise.defer();
var connection = mysql.createConnection(sqlParams);  
connection.connect();
connection.query("select a.id,a.trouble_detail_repair_id,c.name,a.brand_model_id,b.name,a.price,a.offergoal from phone_trouble_type_detail_repair_price a left join phone_brand_model b on b.id = a.brand_model_id left join phone_trouble_type_detail c on c.id = a.trouble_detail_repair_id where trouble_detail_repair_id in (1,5) and brand_model_id in (1,2,3,4,5,6,7) and offergoal='tengxun' order by trouble_detail_repair_id, brand_model_id", function(err, rows, fields) {
  if (err) throw err; 
  console.log("rows")
});
return defer.promise;

 connection.end();