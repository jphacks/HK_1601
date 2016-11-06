<main-menu>
	<ul class="uk-navbar-nav uk-navbar-flip">
		<li><a href="{ url }" onclick={ setUrl }>マイページ</a></li>
	</ul>

	<style type="text/scss">
		
	</style>

	<script type="babel">
		const q = require('q')
		const firebase = require('../../../firebase.js')

		// let provider = new firebase.auth.GoogleAuthProvider()
		let uid
		let _this = this
		let usersID

		this.on('mount', (function () {
			// let currentUser = firebase.auth().currentUser
			let currentUser = GetCurrentLoginUserID()
			console.log('uid : ' + currentUser)
		}))


		this.on('mount', function () {
			let a = firebase.auth().onAuthStateChanged(function (user) {
				const deferred = q.defer()
				try {
					console.log(user.uid)
					uid = user.uid
					usersID = uid
					deferred.resolve({uid: uid})
				} catch(e) {
					console.log(e);
				}
				let b = deferred.promise
				console.log(b)
				return b
			})
			console.log(usersID)
		})

		this.setUrl = function (e) {
			url = '/mypage/' + GetCurrentLoginUserID()
			location.href = url;
		}
	</script>
</main-menu>