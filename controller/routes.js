"strict mode"

const Router     = require('koa-router')
const json       = require('koa-json')

const home       = require('./home.js')
const voice      = require('./voice.js')
const motion     = require('./motion.js')
const face       = require('./face.js')
const statistics = require('./statistics.js')


const route = (app, render) => {
	app.use(json())

	const APIv1 = new Router({
		prefix: '/api/v1'
	})

	const route = new Router()

	APIv1
		// .get('/voice', )
		// .post('/voice', )

		.get('/motion', motion.getMotion)
		.post('/motion', motion.postMotion)

		// .get('/face')
		// .post('/face')

	route
		.get('/', home.getHome)
		// .get('statistics')

	app
		.use(route.routes())
		.use(route.allowedMethods())
		.use(APIv1.routes())
		.use(APIv1.allowedMethods())
}

module.exports = route
