import Token from "./Token";
import useRealTimeQuery from "../hooks/useRealTimeQuery";
import { updateRealTimeData } from "../firebase/firebase";
import { useQueryClient } from "@tanstack/react-query";
import useGameStore from "../store/store";
import { checkForWin } from "../helpers/main";
import WinnerAndTurn from "./WinnerAndTurn";

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
  const { data } = useRealTimeQuery<Game>(gamePath);
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
          turn: player === 1 ? 2 : 1,
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
