module.exports = function(app){

  app.post('/correios/deadline', function(req, res){
    var delivery = req.body;

    var client = new app.servicos.CorreiosSOAPClient();
    client.getDeadline(delivery, function(error, result){
                if (error){
                  res.status(500).send(error);
                  return;
                }
                res.json(resultado);
              });

  });
}
