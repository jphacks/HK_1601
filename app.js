"use strict"

const koa = require('koa')
const cors = require('kcors')
const serve = require('koa-static')
const app = koa()

const origins = {
  origin: '*',
  resource: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With']
}

app.use(cors(origins))
app.use(serve(__dirname + '/public'));

app.listen(8080, function() {
	console.log('Server start');
})

app.on('error', function(err) {
	log.error('server error', err);
});

const router = require('./controller/routes.js')(app)
