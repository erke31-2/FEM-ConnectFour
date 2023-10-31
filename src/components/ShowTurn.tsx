import type { GamePlayer } from "../store/store";

interface ShowTurnProps {
  turn?: number;
  currentPlayer?: GamePlayer;
}
const ShowTurn = ({ turn, currentPlayer }: ShowTurnProps) => {
  return (
    <article className={`${ turn === 1 ? "bg-p1Bg" : "bg-p2Bg" } absolute text-white w-[230px] py-6 flex flex-col items-center gap-y-1 rounded-2xl border-2 border-black shadow-boardShadow -bottom-[55px] left-0 right-0 mx-auto`} >
      <h3 className="uppercase font-semibold">
        <span className="font-bold">
          {currentPlayer?.id === turn ? "Your" : `Player ${turn}'s`}
        </span>{" "}
        turn
      </h3>
    </article>
  );
};
export default ShowTurn;
