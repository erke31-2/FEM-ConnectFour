import Score from "./Score";
const ScoreBoard = () => {
  return (
    <section className="w-[90%] mx-auto flex items-center justify-between">
      <Score name="Player 1" score={20} />
      <Score name="Player 2" score={14} />
    </section>
  );
};
export default ScoreBoard;
