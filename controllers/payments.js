module.exports = function(app){
    app.get('/payments', function(req, res){
        res.send('payment');
    });

    app.post('/payments/payment', function(req, res) {
        var payment = req.body;
        payment.status = "created";
        payment.date = new Date;
        res.json(payment);
    });
}