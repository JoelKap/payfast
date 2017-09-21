function PaymentDAO(database){
    this._collection = database.ref('payments');
}

PaymentDAO.prototype.insert = function(payment, callback){
    var ref = this._collection.push(payment, callback);
    return ref.key;
}

PaymentDAO.prototype.list = function (callback, onError){
    this._collection.once('value').then(callback).catch(onError);
}

PaymentDAO.prototype.searchByID = function(id, callback, onError){
    this._collection.child(id).once('value').then(callback).catch(onError);
}

module.exports = function(){
    return PaymentDAO;
}