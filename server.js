var express = require('express');
var app = express();

var data ={
  ipaddress: null,
  language: null,
  software: null
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("*", function(request, response){
  response.writeHead(200, "application/json; charset=utf-8");

  var ip = request.connection.remoteAddress;
  while(ip.indexOf(":") != -1){
    ip = ip.slice(ip.indexOf(":")+1);
  }
  data.ipaddress = ip;
  var al = request.headers["accept-language"];
  data.language = al.slice(0,al.indexOf(","));
  var ua = request.headers["user-agent"];
  data.software = ua.slice(ua.indexOf("(")+1, ua.indexOf(")"));
  response.end(JSON.stringify(data));
});

var listener = app.listen(8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
