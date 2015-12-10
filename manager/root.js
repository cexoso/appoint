var rootController=require("../controller/rootController");
function init(app){
    app.all("/proxy/*",function(req,res,next){
        var proxy=req.url.match(/\/proxy\/([^\/\?]+)/)[1];
        rootController.proxy(req,res);
    });    
}


module.exports=init;