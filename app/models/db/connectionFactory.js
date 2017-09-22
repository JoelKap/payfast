var firebase = require('firebase-admin');
var serviceAccount = require("./firebase-key.json");

var conn = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://payfast-api.firebaseio.com"
}).database();

function getConnection(){
    conn.goOnline;
    return conn;
}

module.exports = function(){
    return getConnection;
}