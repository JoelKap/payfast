var app = require('./config/custom-express')();

var port = 3000;
app.listen(port, function(){
    console.log("Server listening on port " + port);
});

