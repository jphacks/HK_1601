<google-login>
	<a id="google-login-btn" href="#" onClick={ login }>Googleアカウントでログインする</a>
	<a href="#" onclick={ showLoginUser }>ログイン中ユーザ</a>

	<style type="text/scss">
	
	</style>

	<script type="babel">
		const axios = require('axios');
		const q = require('q');
		const firebase = require('../../../firebase.js')

		const provider = new firebase.auth.GoogleAuthProvider()

		let token

		this.login = (e) => {
			firebase.auth().signInWithPopup(provider).then(function (result) {
				token = result.credential.accessToken
				var user = result.user
				location.href = "/voicetest";
			}).catch(function (error) {
				var errorCode = error.code
				var errorMessage = error.message
				var email = error.email
				var credential = error.credential
			})
		}

		this.showLoginUser = (e) => {
			let user = firebase.auth().currentUser
			let uid
			console.log(user)
			if (user != null) {
				uid = user.uid;
				console.log(uid)
			}
		}

	</script>
</google-login>
