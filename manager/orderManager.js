var orderController=require("../controller/orderController");
var bodyParser=require('body-parser');
function init(app){    
    app.post("/resources/appoint",bodyParser.json(),function(req,res,next){
        orderController.postAppoint(req.body).then(function(d){
            res.json(d);    
        })        
    });        
    app.get("/resources/appoint",function(req,res,next){
        orderController.getAppoint(req.query).then(function(d){
            res.json(d);
        })        
    });
}
module.exports=init;