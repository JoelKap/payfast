var soap = require('soap');

function CorreiosSOAPClient(){
  this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
}

CorreiosSOAPClient.prototype.getDeadline = function(args, callback){
  soap.createClient(this._url, function(error, client){
              client.CalcPrazo(args, callback);
          });
}
