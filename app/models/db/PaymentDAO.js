function PaymentDAO(database){
    this._collection = database.ref('payments');
}

PaymentDAO.prototype.insert = function(payment){
    var ref = this._collection.push(payment);
    return ref.key;
}

PaymentDAO.prototype.list = function (callback){
    this._collection
    .once('value')
    .then(callback);
}

PaymentDAO.prototype.searchByID = function(id, callback){
    this._collection
    .child(id)
    .once('value')
    .then(callback);
}

module.exports = function(){
    return PaymentDAO;
}