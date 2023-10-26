import { DataSnapshot, get, onValue, ref, set, update } from "firebase/database";
import { initialBoard } from "../constants/constants";
import { generateGameId } from "../helpers/main";
import { database } from "./config";


export interface RealTimeSubscribeParams {
  path: string;
  callback: (value: unknown) => void;
}

export interface CreateRoomParams {
  roomName: string;
  name: string;
}
export interface JoinRoomParams {
  roomId: string;
  name: string;
}

export const subscribeRealTimeData = ({ path, callback }: RealTimeSubscribeParams) => {
  const databaseRef = ref(database, path);
  const cb = (snapshot: DataSnapshot) => {
    callback(snapshot.val());
  };
  const unsubscribe = onValue(databaseRef, (snapshot) => cb(snapshot));
  return unsubscribe;
};

export const createRoom = async ({ roomName, name }: CreateRoomParams) => {
  const roomId = generateGameId();
  const newRoomRef = ref(database, `rooms/${roomId}`);
  const roomData = {
    roomName,
    roomFull: false,
    players: {
      1: {
        id: 1,
        name: name,
        score: 0,
      },
    },
    game: {
      board: initialBoard,
      turn: 1,
    },
    newGame: {
      askedBy: 0,
    },
  };
  await set(newRoomRef, roomData).catch((err) => {
    if (err instanceof Error) throw new Error("Failed to Create Room!");
  });
  return roomId;
};

export const joinRoom = async ({
  roomId,
  name,
}: {
  roomId: string;
  name: string;
}) => {
  const roomExists = await checkRoomExists(roomId);
  if (!roomExists) throw new Error(`Room with ID "${roomId}" does not exist!`);

  const roomFull = await checkRoomFull(roomId);
  if (roomFull)
    throw new Error(`Room with Id "${roomId}" is already full of players!`);

  const roomRef = ref(database, `rooms/${roomId}`);
  const updatedRoomData = {
    ["players/2"]: {
      id: 2,
      name,
      score: 0,
    },
    roomFull: true,
  };
  await update(roomRef, updatedRoomData);
  return roomId;
};

export const checkRoomExists = async (roomId: string) => {
  const roomRef = ref(database, `rooms/${roomId}`);
  const roomSnapShot = await get(roomRef);
  return roomSnapShot.exists();
};

export const checkRoomFull = async (roomId: string) => {
  const roomRef = ref(database, `rooms/${roomId}/roomFull`);
  const roomFullSnapShot = await get(roomRef);
  return roomFullSnapShot.val() as boolean;
};

export const restartNewGame = (roomId: string) => {
  const gamePath = `rooms/${roomId}/game`;
  const resetGameData = {
    board: initialBoard,
    turn: 1,
  };
  updateRealTimeData({ path: gamePath, updatedValue: resetGameData });
};

export const updateRealTimeData = ({ path, updatedValue }: { path: string, updatedValue: unknown;}) => {
  const databaseRef = ref(database, path);
  set(databaseRef, updatedValue);
}; 