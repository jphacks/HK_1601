'use strict'

const views = require('co-views')
const firebase = require('../firebase.js')

const provider = new firebase.auth.GoogleAuthProvider()

let render = views('view/', {ext: 'ejs'})

// GET /mise/index
const getHome = function * (next) {
	this.body = yield render('home.ejs', {
		title: '作業中感情サポートソリューション'
	})
}

const getLoginPage = function * (next) {
	this.body = yield render('login.ejs', {
		title: 'ログイン'
	})
}

// POST /google_login
const postGoogleLogin = function * (next) {
	firebase.auth().signInWithPopup(provider).then(function (result) {
		var token = result.credential.accessToken
		var user = result.user
	}).catch(function (error) {
		var errorCode = error.code
		var errorMessage = error.message
		var email = error.email
		var credential = error.credential
	})
	this.body = yield render({})
}

const getVoiceTest = function * (next) {
	this.body = yield render('voicetest.ejs', {
		title: 'SAKASA　音声認識'
	})
}

module.exports = {
	getHome: getHome,
	getLoginPage: getLoginPage,
	postGoogleLogin: postGoogleLogin,
	getVoiceTest: getVoiceTest
}
