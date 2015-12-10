var mysql = require('mysql');
var sqlParams=require(__dirname+"/file.json").mysql;
var sql=mysql.format('SELECT * FROM ?? WHERE  ?', ['phone_brand',{
  1:"1"
}]);
console.log(sql);