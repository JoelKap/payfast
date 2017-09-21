var firebase = require('firebase-admin');
var serviceAccount = require("./firebase-key.json");

function createDBConnection(){
    return firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: "https://payfast-api.firebaseio.com"
    }).database();
}

module.exports = function(){
    return createDBConnection;
}