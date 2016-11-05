'use strict'

const koa = require('koa')
const cors = require('kcors')
const serve = require('koa-static')
const https = require('https')
const http = require('http')
const fs = require('fs')
const app = koa()
const options = {
	key: fs.readFileSync('keys/decrypt_server.key'),
	cert: fs.readFileSync('keys/server.crt')
}

const origins = {
  origin: '*',
  resource: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With']
}

const port = 8080
const securePort = 4430

app.use(cors(origins))
app.use(serve(__dirname + '/public'));


app.on('error', function (err) {
	log.error('server error', err);
});

const router = require('./controller/routes.js')(app)

https.createServer(options, app.callback()).listen(securePort, function () {
 	console.log('Secure Server start')
})
http.createServer(app.callback()).listen(port, function () {
	console.log('Server start')
})
