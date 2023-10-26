import { useState } from "react";
import useJoinRoomMutation from "../hooks/useJoinRoomMutation";
import { useLocation } from "react-router-dom";

const JoinRoom = () => {
  const location = useLocation();
  const roomIdParams = new URLSearchParams(location.search).get("roomId");
  const [roomId, setRoomId] = useState(roomIdParams || "");
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
          placeholder="Enter Your Name"
          className="py-2 px-4 rounded-md outline-none border border-primaryBg focus:outline-white"
          autoComplete="on"
          id="name"
          min={3}
          max={8}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-green-600 text-white h-10 rounded-md font-medium hover:opacity-80 disabled:cursor-not-allowed disabled:hover:opacity-100" type="submit" disabled={isPending}>
          {isPending ? <div className="w-5 h-5 rounded-full animate-spin border-2 border-b-primaryBg  mx-auto"/> : "Join Room"}
        </button>
      </form>
      <label htmlFor="roomId" className="text-sm font-medium text-sky-100">
        Enter Room Id to Enter Game Room!
      </label>
    </main> 
  )
}
export default JoinRoom