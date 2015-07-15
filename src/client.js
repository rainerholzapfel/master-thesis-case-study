// Client
var client = restify.createJsonClient({
  url: 'http://localhost:8080',
  version: '~1.0'
});

client.post('/user', { name: "John Doe" }, function (err, req, res, obj) {
  if(err) console.log("An error ocurred:", err);
  else console.log('POST    /user   returned: %j', obj);
  
  client.get('/user/0', function (err, req, res, obj) {
    if(err) console.log("An error ocurred:", err);
    else console.log('GET     /user/0 returned: %j', obj);
    
    client.put('/user/0', { country: "USA" }, function (err, req, res, obj) {
      if(err) console.log("An error ocurred:", err);
      else console.log('PUT     /user/0 returned: %j', obj);
      
      client.del('/user/0', function (err, req, res, obj) {
        if(err) console.log("An error ocurred:", err);
        else console.log('DELETE  /user/0 returned: %j', obj);
        
        client.get('/', function (err, req, res, obj) {
          if(err) console.log("An error ocurred:", err);
          else console.log('GET     /       returned: %j', obj);
        });
      });
    });
  });
});
