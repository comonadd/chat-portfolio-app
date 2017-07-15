/**
 * @file firebase.ts
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import firebase from 'firebase';

/**
 * @summary
 * The Firebase configuration object.
 */
const fbConfig = {
  apiKey: "AIzaSyC0YpGGTT3hBK6nTFIy0OhL4DF_Ucpe8Jw",
  authDomain: "chat-portfolio-app.firebaseapp.com",
  databaseURL: "https://chat-portfolio-app.firebaseio.com",
  projectId: "chat-portfolio-app",
  storageBucket: "chat-portfolio-app.appspot.com",
  messagingSenderId: "957903827137"
};

// Initialize the Firebase application
firebase.initializeApp(fbConfig);

export let fb = firebase;
export let fbDbRef = firebase.database().ref();
export let fbStorageRef = firebase.storage().ref();
