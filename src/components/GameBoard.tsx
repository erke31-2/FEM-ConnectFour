import Token from "./Token";
import useRealTimeQuery from "../hooks/useRealTimeQuery";
import useGameStore from "../store/store";
import WinnerAndTurn from "./WinnerAndTurn";
import useUpdateGameBoardMutation from "../hooks/useUpdateGameBoardMutation";

export type Game = {
  board: Array<number[]>,
  turn: number,
  winner?: number
}

const GameBoard: React.FC<{roomId: string}> = ({roomId}) => {
  const {mutate: updateGameBoard, isPending} = useUpdateGameBoardMutation()
  const currentPlayer = useGameStore(state => state.currentPlayer)
  const gamePath = `rooms/${roomId}/game`
  const { data } = useRealTimeQuery<Game>(gamePath);
  const updateBoard = (colIndex: number, player: number) => {
    if(data && data.turn === currentPlayer?.id && !isPending){
      const updatedBoard = [...data.board];
      //TODO: make sure token is in the lowest row possible
      for (let row = updatedBoard.length - 1; row >= 0; row--) {
        if (updatedBoard[row][colIndex] === 0) {
          updatedBoard[row][colIndex] = player;
          break;
        }
      }
      updateGameBoard({updatedBoard, player})
    }
    return
  };

  return (
    <>
      <div className="grid-in-game w-full mx-auto bg-white grid grid-cols-7 gap-2 px-2 pt-2 pb-10 rounded-2xl border-[3px] border-black shadow-boardShadow relative mb-16 mt-6">
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
      <WinnerAndTurn winner={data?.winner} turn={data?.turn}/>
      </div>
    </>
  );
};
export default GameBoard;


// const isWinner = checkForWin(updatedBoard, player);
// const isFullBoard = checkForFullBoard(updatedBoard)
// let updatedValue;
// if(isWinner){
//   const key = player === 1 ? 1 : 2
//   const winnerInfo = playersInfo?.[key]
//   updatedValue  = {
//     board: updatedBoard,
//     turn: 0,
//     winner: winnerInfo?.id
//   } 
//   const scorePath = `rooms/${roomId}/players/${player}/score`;
//   updateRealTimeData({path: scorePath, updatedValue: winnerInfo!.score + 1})
// }else if(isFullBoard && !isWinner){
//   updatedValue = {
//     board: updatedBoard,
//     turn: 0,
//     winner: 0
//   }
// }else{
//   updatedValue = {
//     board: updatedBoard,
//     turn: player === 1 ? 2 : 1,
//   }
// }

// queryClient.setQueryData([gamePath], updatedValue)
// updateRealTimeData({path: gamePath, updatedValue })