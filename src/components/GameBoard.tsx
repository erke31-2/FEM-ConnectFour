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


const GameBoard = () => {
  const queryClient = useQueryClient()
  const roomId = useGameStore(state =>  state.gameId);
  const currentPlayer = useGameStore(state => state.currentPlayer)
  const path = `rooms/${roomId}/game`
  const {data} = useRealTimeQuery<Game>(path);
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
      }else{
        updatedValue = {
          board: updatedBoard,
          turn: data.turn === 1 ? 2 : 1,
          winner: ""
        }
      }

      queryClient.setQueryData([path], updatedValue)
      updateRealTimeData({path, updatedValue })
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
         <div className={`${data?.winner === "Player 1" ? "bg-p1Bg" : "bg-p2Bg"} absolute text-white w-[250px] py-6 px-2 text-center flex flex-col items-center gap-y-1 rounded-2xl border-2 border-black shadow-boardShadow -bottom-[55px] left-0 right-0 mx-auto`}>
           <p className="uppercase font-bold">{data.winner} win this game!</p>
         </div>
        ): (
        <div className={`${data?.turn === 1 ? "bg-p1Bg" : "bg-p2Bg"} absolute text-white w-[230px] py-6 flex flex-col items-center gap-y-1 rounded-2xl border-2 border-black shadow-boardShadow -bottom-[55px] left-0 right-0 mx-auto`}>
          <p className="uppercase font-bold">Player {data?.turn}&apos; turn</p>
        </div>
        )}
      </div>
    </>
  );
};
export default GameBoard;


// {data?.winner && (
//   <>
//     <div className="fixed inset-0 bg-gray-800/50 w-full min-h-screen" />
//     <article className="fixed bg-black text-secondaryBg top-[200px] w-[80%] max-w-[450px] p-8 rounded-xl flex flex-col gap-y-6 left-[50%] -translate-x-1/2 items-center z-50">
//       <h2 className="text-lg font-semibold">{data.winner} win this Game!</h2>
//       <div className="flex flex-col gap-y-1">
//         <span>Player 1&apos;s score: 23</span>
//         <span>Player 2&apos;s score: 12</span>
//       </div>
//       <div className="flex flex-col gap-y-4">
//         <button className="bg-primaryBg text-white px-8 py-1 rounded-sm">
//           Go To Home Page
//         </button>
//         {/* <button className="bg-white py-1 px-8 rounded-sm" onClick={()=>setWinner("")}>
//           Play Again
//         </button> */}
//       </div>
//     </article>
//   </>
// )}
