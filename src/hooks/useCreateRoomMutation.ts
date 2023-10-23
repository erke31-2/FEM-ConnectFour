import { useMutation } from "@tanstack/react-query";
import { createRoom, CreateRoomParams } from "../firebase/firebase";
import useGameStore from "../store/store";
import { useNavigate } from "react-router-dom";

const useCreateRoomMutation = () => {
  const setCurrentPlayer = useGameStore((state) => state.setCurrentPlayer);
  const setGameId = useGameStore((state) => state.setGameId);
  const navigate = useNavigate();

  return useMutation<string, Error, CreateRoomParams>({
    mutationFn: ({ roomName, name }) => createRoom({ roomName, name }),

    onSuccess: (roomId) => {
      setCurrentPlayer({ id: 1, name: "Player 1" });
      setGameId(roomId);
      navigate("/play");
    },
    onError: (err) => {
        console.log(err.message);
    }
  });
};
export default useCreateRoomMutation;
