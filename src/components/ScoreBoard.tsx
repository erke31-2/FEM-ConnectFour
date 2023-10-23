import useRealTimeQuery from "../hooks/useRealTimeQuery";
import useGameStore from "../store/store";
import Score from "./Score";

export type PlayerInfo = {
  id: number,
  name: string;
  score: number
}
type PlayersInfo = {
  player1: PlayerInfo
  player2: PlayerInfo
};

const ScoreBoard = () => {
  const roomId = useGameStore((state) => state.gameId);
  const path = `rooms/${roomId}/players`;
  const { data: players } = useRealTimeQuery<PlayersInfo>(path);
  return (
    <>
      {players?.player1 && (
        <Score info={players.player1}/>
      )}
      {players?.player2 && (
        <Score info={players.player2} />
      )}
    </>
  );
};
export default ScoreBoard;
