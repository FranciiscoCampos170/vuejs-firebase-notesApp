import firebase from 'firebase'
//import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAUmEp6QXf7wAMpFvYZIRdrPICnXvULZ-4",
    authDomain: "vuejs-firebase-notesapp.firebaseapp.com",
    databaseURL: "https://vuejs-firebase-notesapp.firebaseio.com",
    projectId: "vuejs-firebase-notesapp",
    storageBucket: "vuejs-firebase-notesapp.appspot.com",
    messagingSenderId: "515372062991",
    appId: "1:515372062991:web:450360b4756b7387bb467a",
    measurementId: "G-QDS1XVBTSM"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
