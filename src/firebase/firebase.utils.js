import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC2cDJgXtnRQVwU_35yt_5NlPShc_JkKns",
    authDomain: "clothing-store-db-18226.firebaseapp.com",
    databaseURL: "https://clothing-store-db-18226.firebaseio.com",
    projectId: "clothing-store-db-18226",
    storageBucket: "clothing-store-db-18226.appspot.com",
    messagingSenderId: "570779593298",
    appId: "1:570779593298:web:e80c597263785fc4910d8b",
    measurementId: "G-RNJ5H6XSFC"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
