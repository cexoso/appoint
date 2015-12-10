var mysql = require('mysql');
var sqlParams=require(process.cwd()+"/file.json").mysql;
var pool  = mysql.createPool(Object.assign({
    connectionLimit:10
},sqlParams));
module.exports=pool;