import ScoreBoard from "./ScoreBoard";
import GameBoard from "./GameBoard";

const Game = () => {
  return (
    <section className="max-w-[600px] mx-auto grid grid-areas-layout grid-cols-2 gap-6 lg:max-w-[1020px] lg:grid-cols-boardLayout lg:grid-areas-lgLayout lg:items-center">
      <ScoreBoard />
      <GameBoard />
    </section>
  );
};
export default Game;
