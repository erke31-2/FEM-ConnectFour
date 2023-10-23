import { useMutation } from "@tanstack/react-query";
import { joinRoom, JoinRoomParams } from "../firebase/firebase";
import useGameStore from "../store/store";
import { useNavigate } from "react-router-dom";

const useJoinRoomMutation = () => {
  const setCurrentPlayer = useGameStore((state) => state.setCurrentPlayer);
  const setGameId = useGameStore((state) => state.setGameId);
  const navigate = useNavigate();

  return useMutation<string, Error, JoinRoomParams>({
    mutationFn: ({ roomId, name }) => joinRoom({roomId, name}),

    onSuccess: (roomId) => {
      setCurrentPlayer({ id: 2, name: "Player 2" });
      setGameId(roomId);
      navigate("/play");
    },
    onError: (err) => {
        console.log(err.message);
    }
  });
};
export default useJoinRoomMutation;
