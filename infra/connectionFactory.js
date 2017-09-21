var firebase = require('firebase');
var config = require('./DBConfig');

function createDBConnection(){
    firebase.initializeApp(config);
}

module.exports = function(){
    return createDBConnection;
}