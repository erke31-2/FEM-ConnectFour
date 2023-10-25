import { useMutation } from "@tanstack/react-query";
import { JoinRoomParams, joinRoom } from "../firebase/service";
import useGameStore from "../store/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
      toast.success("Welcome, Have a good time here.")
    },
    onError: (err) => {
        toast.error(err.message);
    },
  });
};
export default useJoinRoomMutation;
