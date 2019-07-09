import firebase from 'firebase'

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAQV1cxR-gbqVa3MllmStTh_KdusrC1TFY',
  authDomain: 'racestation-cb275.firebaseapp.com',
  databaseURL: 'https://racestation-cb275.firebaseio.com',
  projectId: 'racestation-cb275',
  storageBucket: 'racestation-cb275.appspot.com',
  messagingSenderId: '1084241240847',
  appId: '1:1084241240847:web:cbf70dcf9f6daeaa'
}

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()
