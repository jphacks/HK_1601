"use strict"

const views = require('co-views')

let render = views('view/', {ext: 'ejs'})

// GET /mise/index
const getHome = function * (next) {
	this.body = yield render('home.ejs', {
	})
}

module.exports = {
	getHome: getHome
}
