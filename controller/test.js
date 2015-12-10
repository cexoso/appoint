var operator=require("../server/operator");
var p=require("bluebird");

operator.Do(function(db){
  var promises=[];
  (function(){
    var defer=p.defer();    
    promises.push(defer.promise);
    db.collection('person').insertOne({
      name:"xiongjie",
      fav:"lol",
      time:new Date()
    },function(err,result){
        console.log(result)
        // defer.resolve(result);
    });    
  })();
  (function(){
    var defer=p.defer();    
    promises.push(defer.promise);
    var cursor=db.collection("person").find({name:"cexoso"});
    cursor.each(function(err, doc) {
      console.log(1);
      console.log(doc);
    });
    // defer.resolve("");
  })();
  return p.all(promises);
});