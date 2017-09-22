module.exports = function(app){
    app.get('/payments', function(req, res){
        res.send('payment');
    });

    app.post('/payments/payment', function(req, res) {
        var payment = req.body;
        payment.status = "created";
        payment.date = new Date;

        var conn = app.models.db.connectionFactory();
        var paymentDAO = new app.models.db.PaymentDAO(conn);
        paymentDAO.insert(payment);

        res.json(payment);
    });
}