import { useState } from "react";
import useCreateRoomMutation from "../hooks/useCreateRoomMutation";

const CreateRoom = () => {
  const { mutateAsync: creatingRoom, isPending } = useCreateRoomMutation();
  const [roomName, setRoomName] = useState("");
  const [name, setName] = useState("");

  const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    creatingRoom({ roomName, name})
  }

  return (
    <main className="w-full max-w-[300px] mx-auto flex flex-col gap-y-10 items-center">
      <form className="flex flex-col gap-y-4 w-full" onSubmit={handleCreateRoom}>
        <input
          type="text"
          placeholder="Type a Room Name"
          className="py-2 px-4 rounded-md outline-none border border-primaryBg focus:outline-white"
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
        <button className="bg-green-600 text-white py-2 rounded-md font-medium hover:opacity-80 shadow-tokenShadow" type="submit" disabled={isPending}>
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
