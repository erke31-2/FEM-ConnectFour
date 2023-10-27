import { useQueryClient } from "@tanstack/react-query";
import { restartNewGame, updateRealTimeData } from "../firebase/service";
import useRealTimeQuery from "../hooks/useRealTimeQuery";
import useGameStore from "../store/store";
import Logo from "./Logo";
import { PlayersInfo } from "./ScoreBoard";
import useAskForNewGameMutation from "../hooks/useAskForNewGameMutation";

interface WinnerAndTurnProps {
  winner?: number;
  turn?: number;
}

interface PlayNewGame {
  askedBy: number;
}

const WinnerAndTurn: React.FC<WinnerAndTurnProps> = ({ winner, turn }) => {
  const queryClient = useQueryClient();
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const roomId = useGameStore((state) => state.gameId);
  const playerInfoPath = `rooms/${roomId}/players`;
  const playersInfo = queryClient.getQueryData<PlayersInfo>([playerInfoPath]) 
  const path = `rooms/${roomId}/newGame`;
  const { data: newGame } = useRealTimeQuery<PlayNewGame>(path);
  const newGamePath = `rooms/${roomId}/newGame/askedBy`;
  const {mutate: askForNewGame, isPending} = useAskForNewGameMutation();
  
  const handleNewGameAsk = (answer: string) => {
    if (answer === "No") {
      updateRealTimeData({ path: newGamePath, updatedValue: 0 });
    } else {
      restartNewGame(roomId!);
      updateRealTimeData({ path: newGamePath, updatedValue: 0 });
    }
  };

  return (
    <>
      {winner !== undefined ? (
          <article className={`${ winner === 0 ? "bg-gray-700 -bottom-[100px]" : winner === 1 ? "bg-p1Bg -bottom-[130px]" : "bg-p2Bg -bottom-[130px]"} absolute text-white w-[250px] py-3 px-2 text-center rounded-2xl border-2 border-black shadow-boardShadow  left-0 right-0 mx-auto uppercase flex flex-col gap-y-3`}>
            {winner !== 0 && <h2 className="font-bold text-lg">{currentPlayer?.id === winner ? "You" : playersInfo?.[winner === 1 ? 1 : 2].name}</h2>}
            <span className="text-5xl font-medium">{winner === 0 ? "Tie" : "Wins"}</span>
            <button className="uppercase bg-secondaryBg rounded-full w-[150px] h-[35px] mx-auto font-semibold hover:bg-primaryBg" onClick={() => askForNewGame({path: newGamePath, playerId: currentPlayer!.id})} disabled={isPending}>
              Play Again
            </button>
          </article>
      ) : (
        <article className={`${ turn === 1 ? "bg-p1Bg" : "bg-p2Bg" } absolute text-white w-[230px] py-6 flex flex-col items-center gap-y-1 rounded-2xl border-2 border-black shadow-boardShadow -bottom-[55px] left-0 right-0 mx-auto`}>
          <p className="uppercase font-bold">
            {currentPlayer?.id === turn ? "Your" : `Player ${turn}'s`} turn
          </p>
        </article>
      )}
      {newGame?.askedBy !== 0 && newGame?.askedBy !== currentPlayer?.id && (
        <div className="fixed bg-white/20 inset-0 flex justify-center items-center">
          <article className="bg-white p-6 rounded-lg flex flex-col gap-y-6 items-center shadow-boardShadow border-4 border-black">
            <Logo />
            <h2 className="text-xl font-light">
              <span className="font-semibold">{playersInfo?.[newGame?.askedBy === 1 ? 1 : 2].name}</span> want to play one more game.
            </h2>
            <div className="w-full flex justify-between px-1">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleNewGameAsk("No")}>
                No, Cancel it
              </button>
              <button className="bg-primaryBg text-white px-4 py-2 rounded-md" onClick={() => handleNewGameAsk("Yes")}>
                Play One More
              </button>
            </div>
          </article>
        </div>
      )}
    </>
  );
};
export default WinnerAndTurn;
