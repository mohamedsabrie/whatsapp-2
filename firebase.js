import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAEyI-uZdQ8BMQWzfBTSyVFB_5DjsgmFOI",
    authDomain: "whatsapp-2-617b7.firebaseapp.com",
    projectId: "whatsapp-2-617b7",
    storageBucket: "whatsapp-2-617b7.appspot.com",
    messagingSenderId: "589088342737",
    appId: "1:589088342737:web:362eba98db227f2dac3bf0"
  };

  const app = !(firebase.apps.length)
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();



  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, provider}