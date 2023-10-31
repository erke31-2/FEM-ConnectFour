import type { GamePlayer } from "../store/store";
import type { PlayersInfo } from "./ScoreBoard";
import useAskForNewGameMutation from "../hooks/useAskForNewGameMutation";
import useRealTimeQuery from "../hooks/useRealTimeQuery";
import { restartNewGame, updateRealTimeData } from "../firebase/service";
import Logo from "./Logo";

interface ShowWinnerProps{
    winner: number,
    currentPlayer?: GamePlayer,
    playersInfo?: PlayersInfo,
    roomId: string
}

const ShowWinner = ({winner, currentPlayer, playersInfo, roomId}: ShowWinnerProps) => {
    const path = `rooms/${roomId}/newGame`;
    const { data: newGame, isLoading } = useRealTimeQuery<{askedBy: number}>(path);
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


  if(isLoading){
    return (
    <div className="absolute -bottom-[80px] text-white w-[250px] py-3 px-2 text-center rounded-2xl border-2 border-black shadow-boardShadow  left-0 right-0 mx-auto uppercase flex flex-col gap-y-3">
      <div className="w-[30%] h-10"/>
      <div className="w-[10%] h-6"/>
    </div>
    )
  }

  return (
   <>
    <article className={`${winner === 0 ? "bg-gray-700 -bottom-[100px]" : winner === 1 ? "bg-p1Bg -bottom-[130px]" : "bg-p2Bg -bottom-[130px]" } absolute text-white w-[250px] py-3 px-2 text-center rounded-2xl border-2 border-black shadow-boardShadow  left-0 right-0 mx-auto uppercase flex flex-col gap-y-3`}>
      {winner !== 0 && (
        <h3 className="font-bold text-xl">
          {currentPlayer?.id === winner ? "You" : playersInfo?.[winner === 1 ? 1 : 2].name}
        </h3>
      )}
      <span className="text-5xl font-medium">
        {winner === 0 ? "Tie" : "Wins"}
      </span>
      {currentPlayer ? 
      <button className="uppercase bg-secondaryBg rounded-full w-[150px] h-[35px] mx-auto font-semibold hover:bg-primaryBg" onClick={() => askForNewGame({ path: newGamePath, playerId: currentPlayer?.id })}
        disabled={isPending}
        >
         Play Again
      </button> : (
        <p className="font-semibold">THIS GAME!</p>
      )}
    </article>
    {newGame?.askedBy !== 0 && currentPlayer && newGame?.askedBy !== currentPlayer.id && (
        <div className="fixed bg-white/20 inset-0 flex justify-center items-center">
          <article className="bg-white p-6 rounded-lg flex flex-col gap-y-6 items-center shadow-boardShadow border-4 border-black">
            <Logo />
            <h2 className="text-xl font-light text-center">
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
export default ShowWinner;
