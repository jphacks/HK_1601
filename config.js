const FBcfg = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyCjsEWpibw7mwoifF7vmw-H4w6MihG2AkU",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "batoiyasu.firebaseapp.com",
  databaseURL: process.env.FIREBASE_DATABASE_URL || "https://batoiyasu.firebaseio.com",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "batoiyasu.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGEING_SENDER_ID || "507006825662"
}

module.exports = {
	firebaseCfg: FBcfg
}
