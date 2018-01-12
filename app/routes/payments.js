module.exports = function(app){
    const BASE_URL = "http://localhost:3000";
    const PAYMENT_CREATED = 'created';
    const PAYMENT_CONFIRMED = 'confirmed';
    const PAYMENT_CANCELED = 'canceled';

    app.get('/payments', function(req, res){
        res.send('payment');
    });

    //Confirm payment
    app.put('/payments/payment/:id', function(req, res){
      var id = req.params.id;

      var conn = app.models.db.connectionFactory();
      var paymentDAO = new app.models.db.PaymentDAO(conn);

      paymentDAO.update(id, {status:'confirmed'}, function(error){
        if(error){
          res.status(500).send(error);
        }else{
          res.json({
            id: id,
            status: PAYMENT_CONFIRMED
          });
        }
      });
    });

    //Cancel payments
    app.delete('/payments/payment/:id', function(req, res){
      var id = req.params.id;

      var conn = app.models.db.connectionFactory();
      var paymentDAO = new app.models.db.PaymentDAO(conn);

      paymentDAO.update(id, {status:PAYMENT_CANCELED}, function(error){
        if(error){
          res.status(500).send(error);
        }else{
          res.status(204).send();
        }
      });
    });

    //  Create payment
    app.post('/payments/payment', function(req, res) {
        var validator = app.utils.paymentValidator;

        var errors = validator.check(req);
        if(errors){
            res.status(400).json(errors);
            return;
        }

        var payment = req.body['payment'];
        if(payment.method == 'card'){
          var card = req.body['card'];

          var cardClient = new app.services.CardClient();
          cardClient.authorize(card, function(error, creq, cres, cret){
            if(error){
              res.status(400).send(error);
              return
            }
          });
        }
        
        payment.status = PAYMENT_CREATED;
        payment.date = new Date;

        var conn = app.models.db.connectionFactory();
        var paymentDAO = new app.models.db.PaymentDAO(conn);
        payment.id = paymentDAO.insert(payment);

        res.location('payments/payment/' + payment.id);
        var response = {
          payment_data: payment,
          links: [
            {
              href: BASE_URL+'/payments/payment/'+payment.id,
              rel: 'confirm',
              method: 'PUT'
            },
            {
              href: BASE_URL+'/payments/payment/'+payment.id,
              rel: 'cancel',
              method: 'DELETE'
            }

          ]
        }
        res.status(201).json(response);
    });

    app.get('/payments/payment/:paymentID', function(req, res){
        var paymentID = req.params.paymentID;
        var conn = app.models.db.connectionFactory();
        var paymentDAO = new app.models.db.PaymentDAO(conn);

        paymentDAO.searchByID(paymentID, function(payment){
            if(payment.exists()){
                res.json(payment);
            }else{
                res.status(404).json({
                    id: 'not found'
                })
            }
        });

    });
}
