"strict mode"

const Router = require('koa-router')()
const json = require('koa-json')

const homeController = require('./home.js')


const route = (app, render) => {
	app.use(json())

	Router.get('/', homeController.getHome)

	app
		.use(Router.routes())
		.use(Router.allowedMethods());
}

module.exports = route
