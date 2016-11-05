const config = require('./config.js')
const firebase = require('firebase');

firebase.initializeApp(config.firebase.pro)
// firebaseコネクト

module.exports = firebase
