import { useState } from "react";
import useJoinRoomMutation from "../hooks/useJoinRoomMutation";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const { mutateAsync: joinRoom, isPending } = useJoinRoomMutation();

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimRoomId = roomId.trim();
    joinRoom({roomId: trimRoomId, name})
  }

  return (
    <main className="w-full max-w-[300px] mx-auto flex flex-col gap-y-10 items-center">
      <form className="flex flex-col gap-y-3 w-full" onSubmit={handleJoinRoom}>
        <input
          type="text"
          placeholder="Enter a Room Id"
          className="py-2 px-4 rounded-md outline-none border border-primaryBg focus:outline-white" 
          autoComplete="on"
          id="roomId"
          required
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
          <input
          type="text"
          placeholder="Enter Your Name (Optional)"
          className="py-2 px-4 rounded-md outline-none border border-primaryBg focus:outline-white"
          autoComplete="on"
          id="name"
          min={3}
          max={8}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-green-600 text-white py-2 rounded-md font-medium hover:opacity-80"
          type="submit"
          disabled={isPending}
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