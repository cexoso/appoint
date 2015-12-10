var resourceController=require("../controller/resourceController");
var resources=[
    'phone_brand',
    'phone_brand_model',
    'phone_trouble_type',    
    'phone_trouble_type_detail'
];
function init(app){    
    app.get("/resource/*",function(req,res,next){
        var resource=req.params[0];
        if(resources.indexOf(resource)>-1){
            resourceController.query(resource,req.query).then(function(d){
                res.json(d);
            });
        }else{
            // res.sendStatus(500);
            next();
        }
    });        
    app.get("/phone_trouble_type_detail_repair_price",function(req,res,next){        
        resourceController.queryPrice("phone_trouble_type_detail_repair_price",req.query).then(function(d){
            res.json(d);
        });
    })
}
module.exports=init;