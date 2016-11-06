'use strict'

const views = require('co-views')
const q = require('q')
const firebase = require('../firebase.js')

const provider = new firebase.auth.GoogleAuthProvider()

let render = views('view/', {ext: 'ejs'})

// GET /mise/index
const getHome = function * (next) {
	this.body = yield render('home.ejs', {
		title: '作業中感情サポートソリューション'
	})
}

// GET /login
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

// GET /mypage/:id
const getMyPage = function * (next) {
	const deferred = q.defer()
	const db = firebase.database()
	const stressLog = db.ref('stressLog/' + this.params.id)
	stressLog.on('value', function (snapshot) {
		console.log(snapshot.val())
		const data = snapshot.val()
		deferred.resolve({message: 'ok', result: data})
	})
	console.log(deferred.promise)
	const res = deferred.promise
	this.body = yield render('mypage.ejs', {
		title: this.params.id,
		userId: this.params.id,
		data: res.result
	})

	
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
	getMyPage: getMyPage,
	getVoiceTest: getVoiceTest
}
