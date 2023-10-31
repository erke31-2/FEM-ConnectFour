import { toast } from "sonner";
import useRealTimeQuery from "../hooks/useRealTimeQuery";
import useGameStore from "../store/store";
import Score from "./Score";
import { useEffect } from "react";

export interface PlayerInfo {
  id: number;
  name: string;
  score: number;
}
export interface PlayersInfo {
  1: PlayerInfo;
  2: PlayerInfo;
}

const ScoreBoard: React.FC<{ roomId: string }> = ({ roomId }) => {
  const getCurrentPlayerFromGame = useGameStore((state) => state.getCurrentPlayerFromGame);
  const currentPlayer = getCurrentPlayerFromGame(roomId);
  const playerInfoPath = `rooms/${roomId}/players`;
  const { data: playersInfo } = useRealTimeQuery<PlayersInfo>(playerInfoPath);
  useEffect(() => {
    if(!currentPlayer && playersInfo){
      toast.message(`You're watching ${playersInfo[1].name} vs ${playersInfo?.[2].name} game`)
    }
  }, [currentPlayer, playersInfo])
  return (
    <>
      {playersInfo?.[1] && <Score info={playersInfo[1]} currentPlayer={currentPlayer}/>}
      {playersInfo?.[2] && <Score info={playersInfo[2]} currentPlayer={currentPlayer}/>}
    </>
  );
};
export default ScoreBoard;
