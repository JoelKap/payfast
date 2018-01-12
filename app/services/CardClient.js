var restify = require('restify');

function CardClient(){
  this._client = restify.createJsonClient({
    url: 'http://localhost:3001'
  });
}

CardClient.prototype.authorize = function(card, callback){
  client.post('/cards/authorize', card, callback);
}

module.exports = function(){
  return CardClient;
}
