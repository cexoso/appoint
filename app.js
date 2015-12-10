process.on('uncaughtException', function (err) {
    console.log(err.stack);
});
var express=require('express');
var app = express();
var server = require('http').Server(app);
server.listen(80);
app.use(express.static('app'));
app.use(express.static('bower_components'));

require('./manager/root.js')(app);
require('./manager/quoteManager.js')(app);
require('./manager/resourceManager.js')(app);
require('./manager/orderManager.js')(app);


