// var rootController=require("../controller/quoteController");
function init(app){    
    app.get("/quote",function(req,res,next){
        console.log(req.query);
        res.json(req.query);
    });        
}
module.exports=init;