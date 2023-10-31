import { useMutation } from "@tanstack/react-query";
import { createRoom, CreateRoomParams } from "../firebase/service";
import useGameStore, { Game } from "../store/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const useCreateRoomMutation = () => {
  const navigate = useNavigate();
  const addNewGame = useGameStore((state) => state.addNewGame)
  return useMutation<Game, Error, CreateRoomParams>({
    mutationFn: ({ roomName, name }) => createRoom({ roomName, name }),

    onSuccess: (game) => {
      addNewGame(game)
      navigate(`/play/${game.gameId}`);
      toast.success("Game Room is ready! Invite your friend to play.")
    },
    onError: (err) => {
        toast.error(err.message)
    }
  });
};
export default useCreateRoomMutation;
