import Score from "./Score";
import GameBoard from "./GameBoard";
const Game = () => {
  return (
    <section className="max-w-[600px] mx-auto grid grid-areas-layout gap-6 lg:max-w-[1020px] lg:grid-cols-boardLayout lg:grid-areas-lgLayout lg:items-center">
      <Score name="Player 1" score={12} />
      <Score name="Player 2" score={20} />
      <GameBoard />
    </section>
  );
};
export default Game;
