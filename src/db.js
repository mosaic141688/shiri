import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyAaGx9BDbpuEq0foZHDNMvuRONUEdhID1E",
  authDomain: "support-11bd7.firebaseapp.com",
  databaseURL: "https://support-11bd7.firebaseio.com",
  projectId: "support-11bd7",
  storageBucket: "support-11bd7.appspot.com",
  messagingSenderId: "1091418876767"
};
const app = firebase.initializeApp(config);

export const db = app.database();
