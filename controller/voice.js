'use strict'

const voiceService = require('../model/voiceService.js')
const firebase = require('../firebase.js').database()
const q = require('q')

// POST /api/v1/voice
const postVoice = function * (next) {
	const userID = 1
	let list = []
	let postedWords = voiceService.analysisMorph(this.request.body.words)
	let les = yield postedWords
	for (var i = 0; i < les.result[0].length; i++) {
		let result = voiceService.filterByStressWords(userID, les.result[0][i][0])
		list.push(result)
	}

	this.body = les.result[0]
}

const getVoice = function * (next) {
	const userID = 1
	let list = []
	let postedWords = voiceService.analysisMorph(this.query.words)
	let les = yield postedWords
	for (var i = 0; i < les.result[0].length; i++) {
		let result = voiceService.filterByStressWords(userID, les.result[0][i][0])
		list.push(result)
	}

	this.body = les.result[0]
}


module.exports = {
	postVoice: postVoice,
	getVoice: getVoice
}
