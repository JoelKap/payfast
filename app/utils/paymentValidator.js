var validator = function(){
}

validator.check = function(req){
    req.assert('method', 'You must choose a payment method').notEmpty();
    req.assert('value', 'You must input a valid value (e.g. 22.50)').notEmpty().isFloat();
    req.assert('currency', 'You must choose a valid currency (e.g. BRL, USD)').isIn(['BRL', 'USD']);
    req.assert('description', 'You must describe the payment').notEmpty();

    return req.validationErrors();
}

module.exports = function(){
    return validator;
}