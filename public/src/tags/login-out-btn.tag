<login-out-btn>
	<a href="#" onclick={ loginOut }>ログアウト</a>
	<style type="text/scss">
	
	</style>

	<script type="babel">
		const firebase = require('../../../firebase.js')
		let provider = new firebase.auth.GoogleAuthProvider()

		// this.on('mount', function() {
		// // (function() {
		// 	console.log('uid is ' + sessionStorage.getItem('access_count_uid'))
		// 	if (sessionStorage.getItem('access_count_uid') === null) {
		// 		firebase.auth().signOut().then(function() {
		// 			console.log('logout')
		// 			// _this.loginstatus = 'ログイン'
		// 			// location.href = "/login";
		// 		}, function(error) {
		// 			console.log('failed logout')
		// 		})
		// 	}
		// })

		this.loginOut = (e) => {
			let user = firebase.auth().currentUser
			let uid
			// console.log(user)
			// if (user !== null) {
				firebase.auth().signOut().then(function() {
					console.log('logout')
					// _this.loginstatus = 'ログイン'
					sessionStorage.clear()
					location.href = "/login";
				}, function(error) {
					console.log('failed logout')
				})
			// } else {
			// 	firebase.auth().signInWithPopup(provider).then(function (result) {
			// 		token = result.credential.accessToken
			// 		var user = result.user
			// 		location.href = "/voicetest";
			// 	}).catch(function (error) {
			// 		var errorCode = error.code
			// 		var errorMessage = error.message
			// 		var email = error.email
			// 		var credential = error.credential
			// 	})
			// }
		}

	</script>
</login-out-btn>