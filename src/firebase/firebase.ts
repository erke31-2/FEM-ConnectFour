import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCtSOWb6wnn3rZJrWejBGmVfCSsS7lJlB4",
  authDomain: "first-firebase-64573.firebaseapp.com",
  databaseURL: "https://first-firebase-64573-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "first-firebase-64573",
  storageBucket: "first-firebase-64573.appspot.com",
  messagingSenderId: "1032428004345",
  appId: "1:1032428004345:web:b2665d8ad1b8a190b59328",
  measurementId: "G-T1LSBN2NQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);


// export const listenDataBase = (roomId: string) => {
//   const roomRef = ref(database, `rooms/${roomId}`);
//   onValue(roomRef, (snapshot) => {
//     const data = snapshot.val();
//     return data
//   })
// }