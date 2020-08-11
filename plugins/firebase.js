// add firebase to the project
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCePicmKAzWHb8vHeDK9rE5dRoQC1jHjV4",
  authDomain: "conftracker.firebaseapp.com",
  databaseURL: "https://conftracker.firebaseio.com",
  projectId: "conftracker",
  storageBucket: "conftracker.appspot.com",
  messagingSenderId: "652169406802",
  appId: "1:652169406802:web:3e8eeb72b18b79e99bf28b",
  measurementId: "G-5VSHPD28NV"
};

let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}

export default app.firestore()
