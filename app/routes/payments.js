module.exports = function(app){
    app.get('/payments', function(req, res){
        res.send('payment');
    });

    app.post('/payments/payment', function(req, res, next) {
        var validator = app.utils.paymentValidator;

        var errors = validator.check(req);
        if(errors){
            res.status(400).json(errors);
            return;            
        }

        var payment = req.body;
        payment.status = "created";
        payment.date = new Date;

        var conn = app.models.db.connectionFactory();
        var paymentDAO = new app.models.db.PaymentDAO(conn);
        paymentDAO.insert(payment);

        res.status(201).json(payment);
    });
}