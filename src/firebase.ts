import firebase from "firebase";
import { User, Message } from "+/store/types";
import { getCurrentTime } from "./util";

export const firebaseConfig = {
  apiKey: "AIzaSyC0YpGGTT3hBK6nTFIy0OhL4DF_Ucpe8Jw",
  authDomain: "chat-portfolio-app.firebaseapp.com",
  databaseURL: "https://chat-portfolio-app.firebaseio.com",
  projectId: "chat-portfolio-app",
  storageBucket: "chat-portfolio-app.appspot.com",
  messagingSenderId: "957903827137"
};

export const rrfConfig = {
  userProfile: "users"
};

firebase.initializeApp(firebaseConfig);

export const firebaseLogout = () => {
  return new Promise((resolve: any, reject: any) => {
    firebase
      .auth()
      .signOut()
      .then(resolve)
      .catch(reject);
  });
};

export interface FirebaseCreateUserInfo {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const firebaseCreateUser = (newUserInfo: FirebaseCreateUserInfo) => {
  const { email, password, firstName, lastName } = newUserInfo;
  return new Promise((resolve: any, reject: any) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        if (firebase.auth().currentUser !== null) {
          const currUser = firebase.auth().currentUser as any;
          currUser
            .updateProfile({
              id: currUser.uid,
              displayName: `${firstName} ${lastName}`
            })
            .then(function() {
              console.log("successfully updated profile");
              resolve(firebase.auth().currentUser);
            })
            .catch(function(error: any) {
              console.log("failed to update profile");
              reject(error);
            });
        } else {
          console.log("there is no current user");
          reject(new Error("failed to sign in"));
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const firebaseAddMessage = ({ authorID, text }: Partial<Message>) => {
  const newMsgData = { authorID, text, date: getCurrentTime() };
  return new Promise((resolve: any, reject: any) => {
    const msgDbRef = firebase.database().ref("messages");
    const newMsgRef = msgDbRef.push();
    const newMsgID = newMsgRef.key;
    const completeNewMsgData = { ...newMsgData, id: newMsgID };
    msgDbRef.set(completeNewMsgData);
    resolve(completeNewMsgData);
  });
};

export default firebase;
