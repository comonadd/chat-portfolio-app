import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { User, Message } from "+/store/types";
import { getCurrentTime } from "./util";

export const firebaseConfig = {
  apiKey: "AIzaSyArJLoRL6PF5rgFBY-bBAbTDxp_aZFZ2dA",
  authDomain: "chat-app-1b43f.firebaseapp.com",
  databaseURL: "https://chat-app-1b43f.firebaseio.com",
  projectId: "chat-app-1b43f",
  storageBucket: "",
  messagingSenderId: "929009643264",
  appId: "1:929009643264:web:3f02f12a99fc3df3"
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
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const firebaseCreateUser = (newUserInfo: FirebaseCreateUserInfo) => {
  const { email, password, firstName, lastName, username } = newUserInfo;
  return new Promise((resolve: any, reject: any) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        if (firebase.auth().currentUser !== null) {
          const currUser = firebase.auth().currentUser as any;
          const id = currUser.uid;
          currUser
            .updateProfile({
              id,
              firstName,
              lastName,
              username
            })
            .then(() => {
              firebase
                .database()
                .ref(`users/${id}`)
                .set({
                  id,
                  firstName,
                  lastName,
                  username,
                  email
                });
              resolve(firebase.auth().currentUser);
            })
            .catch((error: any) => {
              reject(error);
            });
        } else {
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

export const firebaseFetchAllUsers = () => {
  return new Promise((resolve: any, reject: any) => {
    firebase
      .database()
      .ref("users")
      .on(
        "value",
        (snapshot: any) => {
          resolve(snapshot.val());
        },
        (err: Error) => {
          reject(err);
        }
      );
  });
};

export default firebase;
