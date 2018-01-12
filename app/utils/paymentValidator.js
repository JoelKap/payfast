var validator = function(){
}

validator.check = function(req){
    req.assert('payment.method', 'You must choose a payment method').notEmpty();
    req.assert('payment.value', 'You must input a valid value (e.g. 22.50)').notEmpty().isFloat();
    req.assert('payment.currency', 'You must choose a valid currency (e.g. BRL, USD)').isIn(['BRL', 'USD']);
    req.assert('payment.description', 'You must describe the payment').notEmpty();

    return req.validationErrors();
}

module.exports = function(){
    return validator;
}
