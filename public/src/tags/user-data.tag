<user-data>
	<p>{ username }</p>
	<p>{ stress }</p>
	<p>検出期間中、<span class="data"></span>個ストレスワードが検出されました</p>
	<script type="babel">
		const firebase = require('../../../firebase.js')
		const $ = require('jquery')
		let provider = new firebase.auth.GoogleAuthProvider()
		const _this = this
		const db = firebase.database()
		const stressLog = db.ref('stressLog/' + $('.user-id').text())
		stressLog.on('value', function (snapshot) {
			console.log(snapshot.val())
			console.log($('.user-id').text())
			const data = snapshot.val()
			let a = ''
			let num = 0
			if (data != null) {
				Object.keys(data).forEach(function(key){
					let value = this[key];
					console.log([key, ':', value].join(' '));
					a = a + [key, ':', value].join(' ')
					num++
				})
			}
			$('.data').text(num)
		})
		this.on('*', () => {
			this.username = sessionStorage.getItem('access_count_name')
			console.log(sessionStorage.getItem('access_count_name'))
			let user = firebase.auth().currentUser
			try {
				console.log(user);
				// this.username = user.displayName
			} catch (e) {
				console.log(e);
			}
		})
	</script>
</user-data>