import useRealTimeQuery from "../hooks/useRealTimeQuery";
import Score from "./Score";

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
  const playerInfoPath = `rooms/${roomId}/players`;
  const { data: playersInfo } = useRealTimeQuery<PlayersInfo>(playerInfoPath);
  return (
    <>
      {playersInfo?.[1] && <Score info={playersInfo[1]} />}
      {playersInfo?.[2] && <Score info={playersInfo[2]} />}
    </>
  );
};
export default ScoreBoard;
