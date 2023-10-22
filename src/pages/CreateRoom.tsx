import { push, ref, set } from "firebase/database";
import { useState } from "react";
import { database } from "../firebase/firebase";
import { initialBoard } from "../constants/constants";
import useGameStore from "../store/store";

const CreateRoom = () => {
  const setCurrentPlayer = useGameStore((state) => state.setCurrentPlayer)
  const setGameId = useGameStore((state) => state.setGameId)
  const [roomName, setRoomName] = useState("");
  const [name, setName] = useState("");

  const createRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomListRef = ref(database, "rooms");
    const newRoomRef = push(roomListRef);
    set(newRoomRef, {
      roomName,
      players: {
        player1: {
          id: 1,
          name: name ?? "Player 1",
          score: 0
        },
        player2: {} 
      },
      game: {
        board: initialBoard,
        turn: 1,
        winner: ""
      } 
    }).then(() => {
      setGameId(newRoomRef.key ?? "");
      setCurrentPlayer({id: 1, name: name ?? "Player 1"});
    }).catch((err) => {
      if(err instanceof Error){
        console.log(err.message);
      }
    })
  }


  return (
    <main className="w-full max-w-[300px] mx-auto flex flex-col gap-y-10">
      <form className="flex flex-col gap-y-4 w-full" onSubmit={createRoom}>
        <input
          type="text"
          placeholder="Type a Room Name"
          className="py-2 px-4 rounded-md outline-none focus:outline-white"
          autoComplete="on"
          id="roomName"
          min={4}
          max={10}
          required
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Your Name (Optional)"
          className="py-2 px-4 rounded-md outline-none focus:outline-white"
          autoComplete="on"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-green-600 text-white py-2 rounded-md font-medium hover:opacity-80" type="submit">
          Create Room
        </button>
      </form>
      <label htmlFor="roomName" className="text-sm font-medium text-sky-100">
        Type a Room Name to generate a Room Id!
      </label>
    </main>
  );
};
export default CreateRoom;
