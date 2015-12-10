var mysql = require('mysql');
var sqlParams=require(__dirname+"/file.json").mysql;
// console.log(sqlParams)
//创建连接  
var connection = mysql.createConnection(sqlParams);  

// connection.config.queryFormat = function (query, values) {
//     console.log(query)
//     return query;
// };
var sql=mysql.format('SELECT * FROM phone_trouble_type_detail_repair_price where ?', {
  trouble_detail_repair_id:5,
  brand_model_id:11
});
connection.connect();
connection.query(sql,function(err, rows, fields) {
  if (err) throw err; 
  console.log(rows)
});
// connection.query('INSERT INTO user SET ?', {
//   code:'011',
//   password:'0011',
//   sex:0,
//   telphone:'18677291450',
//   type:9  
// }, function(err, result) {
//   if (err) throw err; 
//   console.log(result.insertId);
// });
connection.end();

// var sql = "SELECT * FROM ?? WHERE ?";
// var inserts = ['users', {id:123,q:321}];
// sql = mysql.format(sql, inserts);
// console.log(sql)



// select a.id,a.trouble_detail_repair_id,c.name,a.brand_model_id,b.name,a.price,a.offergoal
// from phone_trouble_type_detail_repair_price a
// left join phone_brand_model b on b.id = a.brand_model_id
// left join phone_trouble_type_detail c on c.id = a.trouble_detail_repair_id
// where trouble_detail_repair_id in (1,5) and brand_model_id in (1,2,3,4,5,6,7)
// and offergoal='tengxun' order by trouble_detail_repair_id, brand_model_id
