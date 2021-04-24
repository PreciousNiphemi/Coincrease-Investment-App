import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyCJ-xNc9uZPd0356ohkTMRxb9VbJ8XUzLk",
    authDomain: "coincrease-investment.firebaseapp.com",
    projectId: "coincrease-investment",
    storageBucket: "coincrease-investment.appspot.com",
    messagingSenderId: "1028214060958",
    appId: "1:1028214060958:web:e86681da56c0028777088f",
    measurementId: "G-PM4RFP5553"
  };

  firebase.initializeApp(config);
  const db = firebase.firestore();
  const auth = firebase.auth()
  const storage = firebase.storage();

  export {db, auth, storage};

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional