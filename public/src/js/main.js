const riot         = require('riot')
const firebase = require('../../../firebase.js')

let provider = new firebase.auth.GoogleAuthProvider()

GetCurrentLoginUserID = () => {
	let user = firebase.auth().currentUser
	let uid
	if (user != null) {
		uid = user.uid;
	}
	return uid
}

GetNameOfLoginUser = () => {
	let user = firebase.auth().currentUser
	let uid
	if (user != null) {
		name = user.name;
	}
	return name
}

require('../tags/google-login.tag')
require('../tags/login-out-btn.tag')

riot.mount('*')
