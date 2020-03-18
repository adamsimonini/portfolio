// add firebase to the project
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyD79FMkYA2RZaG4_te3JYuDOqbaNMzAgU8",
    authDomain: "conf-tracker.firebaseapp.com",
    databaseURL: "https://conf-tracker.firebaseio.com",
    projectId: "conf-tracker",
    storageBucket: "conf-tracker.appspot.com",
    messagingSenderId: "379273649333",
    appId: "1:379273649333:web:62fdb340f7e1f9bfa1f2fc",
    measurementId: "G-32TGXYJT9C"
};

let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}

export const db = app.database()
