"use strict"

const views = require('co-views')

let render = views('view/', {ext: 'ejs'})

// GET /mise/index
const getHome = function * (next) {
	this.body = yield render('home.ejs', {
		title: "作業中感情サポートソリューション"
	})
}

const getLogin = function * (next) {
	this.body = yield render({})
}

module.exports = {
	getHome: getHome
}
