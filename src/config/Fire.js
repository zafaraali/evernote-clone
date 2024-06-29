import firebase from 'firebase';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: 'evernote-clone-fc6cc.firebaseapp.com',
  databaseURL: 'https://evernote-clone-fc6cc.firebaseio.com',
  projectId: 'evernote-clone-fc6cc',
  storageBucket: 'evernote-clone-fc6cc.appspot.com',
  messagingSenderId: '873642341032',
  appId: '1:873642341032:web:74cf93d6c741628a'
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
