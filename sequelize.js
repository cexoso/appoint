var dbConfig=require(process.cwd()+'/file.json');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password,{
    host:dbConfig.host,
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        idle:10000
    }    
});
var User = sequelize.define('sq_test', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

