import ScoreBoard from "./ScoreBoard";
import GameBoard from "./GameBoard";
import useRealTimeQuery from "../hooks/useRealTimeQuery";
import useGameStore from "../store/store";
import { updateRealTimeData } from "../firebase/firebase";

export type PlayerInfo = {
  id: number,
  name: string;
  score: number
}

export type PlayersInfo = {
  player1: PlayerInfo
  player2: PlayerInfo
};

const Game = () => {
  const roomId = useGameStore((state) => state.gameId);
  const path = `rooms/${roomId}/players`;
  const { data: players } = useRealTimeQuery<PlayersInfo>(path);

  const updatePlayerScore = (key: 'player1'|'player2') => {
    const scorePath = `rooms/${roomId}/players/${key}/score`
    const winnerInfo = players?.[key]
    if(winnerInfo){
      updateRealTimeData({path: scorePath, updatedValue: winnerInfo.score + 1})
    }
  }  

  return (
    <section className="max-w-[600px] mx-auto grid grid-areas-layout grid-cols-2 gap-4 lg:max-w-[1020px] lg:grid-cols-boardLayout lg:grid-areas-lgLayout lg:items-center">
      {players && <ScoreBoard player1={players?.player1} player2={players?.player2}/>}
      <GameBoard updatePlayerScore={updatePlayerScore}/>
    </section>
  );
};
export default Game;
