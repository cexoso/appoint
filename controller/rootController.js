httpProxy = require('http-proxy');  
var proxy = httpProxy.createProxyServer({});  
proxy.on('error', function (err, req, res) {
    console.log("error: \n"+err);
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });    
    res.end(err+"");
});
function _proxy(req, res){
    console.log("_proxy");
    proxy.web(req, res,{ target: 'http://www.baidu.cn/'});
}

module.exports.proxy=_proxy;