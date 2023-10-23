import Token from "./Token";
import useRealTimeQuery from "../hooks/useRealTimeQuery";
import { updateRealTimeData } from "../firebase/firebase";
import { useQueryClient } from "@tanstack/react-query";
import useGameStore from "../store/store";
import { checkForWin } from "../helpers/main";

type Game = {
  board: Array<number[]>,
  turn: number,
  winner: string
}
interface GameBoardProps{
  updatePlayerScore: (key: 'player1' | 'player2') => void
}

const GameBoard: React.FC<GameBoardProps> = ({updatePlayerScore}) => {
  const queryClient = useQueryClient()
  const roomId = useGameStore(state =>  state.gameId);
  const currentPlayer = useGameStore(state => state.currentPlayer)
  const gamePath = `rooms/${roomId}/game`
  const {data} = useRealTimeQuery<Game>(gamePath);
  const updateBoard = (colIndex: number, player: number) => {
    if(data && data.turn === currentPlayer?.id){
      const updatedBoard = [...data.board];
      //?filter through the last row(length-1) and check given col
      for (let row = updatedBoard.length - 1; row >= 0; row--) {
        if (updatedBoard[row][colIndex] === 0) {
          updatedBoard[row][colIndex] = player;
          break;
        }
      }
      let updatedValue;
      if(checkForWin(updatedBoard, player)){
        updatedValue  = {
          board: updatedBoard,
          turn: 0,
          winner: `Player ${player}`
        }
        const key = player === 1 ? "player1" : "player2"
        updatePlayerScore(key)
      }else{
        updatedValue = {
          board: updatedBoard,
          turn: data.turn === 1 ? 2 : 1,
          winner: ""
        }
      }

      queryClient.setQueryData([gamePath], updatedValue)
      updateRealTimeData({path: gamePath, updatedValue })
    }
    return
  };

  return (
    <>
      <div className="grid-in-game w-full mx-auto bg-white grid grid-cols-7 gap-2 px-2 pt-2 pb-10 rounded-2xl border-[3px] border-black shadow-boardShadow relative mb-16">
        {data?.board.map((row, rowIndex) =>
          row.map((slot, colIndex) =>
            slot === 1 ? (
              <Token key={`${rowIndex}-${colIndex}-1`} bgClass="bg-p1Bg" />
            ) : slot === 2 ? (
              <Token key={`${rowIndex}-${colIndex}-2`} bgClass="bg-p2Bg" />
            ) : (
              <div
                key={`${rowIndex}-${colIndex}-0`}
                className="w-full aspect-square bg-primaryBg border-[3px] border-black shadow-boardInnerShadow md:shadow-boardInnerShadowMd lg:shadow-boardInnerShadowLg rounded-full cursor-pointer"
                onClick={() => updateBoard(colIndex, data.turn)}
              />
            )
          )
        )}
        {data?.winner ? (
         <article className={`${data?.winner === "Player 1" ? "bg-p1Bg" : "bg-p2Bg"} absolute text-white w-[250px] py-5 px-2 text-center rounded-2xl border-2 border-black shadow-boardShadow -bottom-[130px] left-0 right-0 mx-auto uppercase flex flex-col gap-y-3`}>
           <h2 className="font-bold">{data.winner}</h2>
           <span className="text-4xl font-bold">Wins</span>
           <button className="uppercase bg-secondaryBg px-5 py-1 rounded-full w-fit mx-auto font-semibold">Play Again</button>
         </article>
        ): (
        <article className={`${data?.turn === 1 ? "bg-p1Bg" : "bg-p2Bg"} absolute text-white w-[230px] py-6 flex flex-col items-center gap-y-1 rounded-2xl border-2 border-black shadow-boardShadow -bottom-[55px] left-0 right-0 mx-auto`}>
          <p className="uppercase font-bold">Player {data?.turn}&apos; turn</p>
        </article>
        )}
      </div>
    </>
  );
};
export default GameBoard;
