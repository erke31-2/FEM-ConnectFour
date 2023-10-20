import { ref, update } from "firebase/database";
import { useState } from "react";
import { database } from "../firebase/firebase";
const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  //-Nh7oJoh-MKzarS24Lvv

  const joinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // update(ref(database, `rooms/${roomId}`))
    update(ref(database, `rooms/${roomId}/players/player2`), {
          id: 2,
          name: name ?? "Player 2",
          score: 0
    })
  }

  return (
    <main className="w-full max-w-[300px] mx-auto flex flex-col gap-y-8 items-center">
      <form className="flex flex-col gap-y-3 w-full" onSubmit={joinRoom}>
        <input
          type="text"
          placeholder="Enter a Room Id"
          className="py-2 px-4 rounded-md outline-none focus:outline-white"
          autoComplete="on"
          id="roomId"
          required
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
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
        <button
          className="bg-green-600 text-white py-2 rounded-md font-medium hover:opacity-80"
          type="submit"
        >
          Join Room
        </button>
      </form>
      <label htmlFor="roomId" className="text-sm font-medium text-sky-100">
        Enter Room Id to Enter Game Room!
      </label>
    </main> 
  )
}
export default JoinRoom