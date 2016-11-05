const config = require('./config.js')
const firebase = require('firebase');

firebase.initializeApp(config.firebaseCfg)
// firebaseコネクト

module.exports = firebase
