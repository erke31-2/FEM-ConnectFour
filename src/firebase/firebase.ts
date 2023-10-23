import { initializeApp } from "firebase/app";
import { DataSnapshot, get, getDatabase, onValue, ref, set, update } from "firebase/database";
import { initialBoard } from "../constants/constants";
import { generateGameId } from "../helpers/main";
const firebaseConfig = {
  apiKey: "AIzaSyCtSOWb6wnn3rZJrWejBGmVfCSsS7lJlB4",
  authDomain: "first-firebase-64573.firebaseapp.com",
  databaseURL: "https://first-firebase-64573-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "first-firebase-64573",
  storageBucket: "first-firebase-64573.appspot.com",
  messagingSenderId: "1032428004345",
  appId: "1:1032428004345:web:b2665d8ad1b8a190b59328",
  measurementId: "G-T1LSBN2NQ0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export interface RealTimeSubscribeParams {
  path: string;
  callback: (value: unknown) => void;
}

export interface CreateRoomParams {
  roomName: string;
  name: string
}
export interface JoinRoomParams {
  roomId: string;
  name: string
}
export const realTimeData = ({ path, callback }: RealTimeSubscribeParams) => {
  const databaseRef = ref(database, path);
  const cb = (snapshot: DataSnapshot) => {
    callback(snapshot.val());
  };
  const unsubscribe = onValue(databaseRef, (snapshot) => cb(snapshot));
  return unsubscribe;
};

export const createRoom = async ({roomName, name}: CreateRoomParams) => {
  const roomId = generateGameId();
  const newRoomRef = ref(database, `rooms/${roomId}`);
  const roomData = {
    roomName,
    players: {
      player1: {
        id: 1,
        name: name,
        score: 0
      }, 
    },
    game: {
      board: initialBoard,
      turn: 1,
      winner: ""
    },
    roomFull: false 
  }
  await set(newRoomRef, roomData);
  return roomId
}

export const joinRoom = async ({roomId, name}: {roomId: string, name: string}) => {
  const roomExists = await checkRoomExists(roomId);
  if(!roomExists) throw new Error(`Room with ID ${roomId} does not exist!`);
  
  const roomRef = ref(database, `rooms/${roomId}`);
  const updatedRoomData = {
    ['players/player2']: {
      id: 2,
      name,
      score: 0
    },
    roomFull: true
  }
  await update(roomRef, updatedRoomData);
  return roomId
}

export const checkRoomExists = async (roomId: string) => {
  const roomRef = ref(database, `rooms/${roomId}`);
  const roomSnapShot = await get(roomRef);
  return roomSnapShot.exists()
}


export const updateRealTimeData = ({path, updatedValue}: {path: string, updatedValue: unknown}) => {
  const databaseRef = ref(database, path);
  set(databaseRef, updatedValue)
}