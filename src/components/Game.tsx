import Score from "./Score";
import GameBoard from "./GameBoard";
import useRealTimeQuery from "../hooks/useRealTimeQuery";

type Players = {
    player1: {
      id: number;
      name: string,
      score: number
    },
    player2: {
      id: number;
      name: string,
      score: number
    }
}


const Game = () => {
  const roomId = "-NhIHewGVZZKzeawo7o1"
  const path = `rooms/${roomId}/players`
  const {data: players} = useRealTimeQuery<Players>(path);
  
  return (
    <section className="max-w-[600px] mx-auto grid grid-areas-layout grid-cols-2 gap-6 lg:max-w-[1020px] lg:grid-cols-boardLayout lg:grid-areas-lgLayout lg:items-center">
     {players &&  <>
      <Score name={players.player1.name} score={players.player1.score} />
      <Score name={players.player2.name} score={players.player2.score} />
     </>}
      <GameBoard />
    </section>
  );
};
export default Game;
