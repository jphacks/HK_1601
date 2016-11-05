"use strict"

const views = require('co-views')

let render = views('view/', {ext: 'ejs'})

// GET /mise/index
const getMotion = function * (next) {
	var ua = this.request.header['user-agent'].toLowerCase();

	if (ua.indexOf("android") != -1 || ua.indexOf("iphone") != -1 || ua.indexOf("ipod") != -1) {
		var renderText = {title: "SAKASA - motion", uaText: ''};
	} else {
		var renderText = {title: "SAKASA - motion", uaText: 'Android/iPhoneにてアクセスしてください'};
	}

	this.body = yield render('motion.ejs', renderText);
}

module.exports = {
	getMotion: getMotion
}
