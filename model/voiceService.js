'use strict'

const fs = require('fs')
const axios = require('axios')
const q = require('q')
const moment = require('moment')
const firebase = require('../firebase.js').database()

const wordListJson = require('../data/word_list.json')

const gooApiID = '607f83a68afd2e7315c370519cbc40fa12d05ef1c1a83d184d3528ba936e7ef9'

const analysisMorph = function (text) {
	const deferred = q.defer()
	const url = 'https://labs.goo.ne.jp/api/morph'
	axios.post(url, {
		app_id: gooApiID,
		sentence: text,
		info_filter: 'form'
	}).then((res) => {
		const result = res.data.word_list
		deferred.resolve({message: 'ok', result: result})
	}).catch((err) => {
		console.error(err)
		deferred.reject(err)
	})
	return deferred.promise
}

const filterByStressWords = function (userID, word) {
	const deferred = q.defer()
	let key = ''
	for (var i = 0; i < wordListJson.wordList.length; i++) {
		wordListJson.wordList[i]
		if (word === wordListJson.wordList[i]) {
			key = saveStressLog(userID, word)
			console.log('save log');
			break
		}
	}
	if (!key) console.log('not saved log');
	deferred.resolve({key: key})
	return deferred.promise
}

const fileterByHappyWords = function (words) {
	// body...
}

const saveStressLog = function (userID, word) {
	const deferred = q.defer()
	const m = moment()
	const nowTime = m.format('YYYY/MM/DD HH:mm:ss')
	const log = firebase.ref('stressLog/' + userID).push()
	log.set({
		date: nowTime,
		word: word
	}, (err) => {
		if (err) throw err
		deferred.resolve({logKey: log.key})
	})
	return deferred.promise
}


module.exports = {
	analysisMorph: analysisMorph,
	filterByStressWords: filterByStressWords,
	saveStressLog: saveStressLog
}
