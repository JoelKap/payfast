module.exports = function(app){
    app.get('/payments', function(req, res){
        res.send('payment');
    });

    app.post('/payments/payment', function(req, res) {
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
        var paymentID = paymentDAO.insert(payment);

        res.location('payments/payment/' + paymentID);
        res.status(201).json(payment);
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