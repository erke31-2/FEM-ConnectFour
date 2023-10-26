import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkForFullBoard, checkForWin } from "../helpers/main";
import useGameStore from "../store/store";
import { updateRealTimeData } from "../firebase/service";
import { PlayersInfo } from "../components/ScoreBoard";
import { toast } from "sonner";

interface useUpdateGameBoardMutationProps {
  updatedBoard: Array<number[]>;
  player: number;
}

const useUpdateGameBoardMutation = () => {
  const queryClient = useQueryClient();
  const roomId = useGameStore((state) => state.gameId);
  const gamePath = `rooms/${roomId}/game`;
  const playerInfoPath = `rooms/${roomId}/players`;
  const playersInfo = queryClient.getQueryData<PlayersInfo>([playerInfoPath]) 
  return useMutation<void, Error, useUpdateGameBoardMutationProps>({
    mutationFn: async ({ updatedBoard, player }) => {
      const isWinner = checkForWin(updatedBoard, player);
      const isFullBoard = checkForFullBoard(updatedBoard);
      let updatedValue;
      if (isWinner) {
        const key = player === 1 ? 1 : 2;
        const winnerInfo = playersInfo?.[key];
        updatedValue = {
          board: updatedBoard,
          turn: 0,
          winner: winnerInfo?.id,
        };
        const scorePath = `rooms/${roomId}/players/${player}/score`;
        updateRealTimeData({
          path: scorePath,
          updatedValue: winnerInfo!.score + 1,
        }); 
      } else if (isFullBoard) {
        updatedValue = {
          board: updatedBoard,
          turn: 0,
          winner: 0,
        };
      } else {
        updatedValue = {
          board: updatedBoard,
          turn: player === 1 ? 2 : 1,
        };
      }
      queryClient.setQueryData([gamePath], updatedValue)
      updateRealTimeData({ path: gamePath, updatedValue });
    },
    onError: () => {
      toast.error("Error in updating moves!")
    }
  });
};
export default useUpdateGameBoardMutation;
