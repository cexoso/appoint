var mysql = require('mysql');
var sqlParams=require(process.cwd()+"/file.json").mysql;
connectionpool = mysql.createPool(sqlParams);
connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
              res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('SELECT * FROM ?? WHERE 1=1 and ?', ['phone_brand',{
              producetype:200001
            }],function(err, rows, fields) {
              if (err) throw err; 
              console.log(rows)
            });
            connection.release();
        }
    });