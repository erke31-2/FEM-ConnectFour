import { useMutation } from "@tanstack/react-query";
import { JoinRoomParams, joinRoom } from "../firebase/service";
import useGameStore, { Game } from "../store/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useJoinRoomMutation = () => {
  const addNewGame = useGameStore((state) => state.addNewGame)
  const navigate = useNavigate();

  return useMutation<Game, Error, JoinRoomParams>({
    mutationFn: ({ roomId, name }) => joinRoom({roomId, name}),
    onSuccess: (game) => {
      addNewGame(game)
      navigate(`/play/${game.gameId}`);
      toast.success("Welcome, Have a good time here.")
    },
    onError: (err) => {
        toast.error(err.message);
    },
  });
};
export default useJoinRoomMutation;
