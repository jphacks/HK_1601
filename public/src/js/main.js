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

require('../tags/google-login.tag')
require('../tags/login-out-btn.tag')

riot.mount('*')
