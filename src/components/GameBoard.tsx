import { useQueryClient } from "@tanstack/react-query";
import useRealTimeQuery from "../hooks/useRealTimeQuery";
import useGameStore from "../store/store";
import useUpdateGameBoardMutation from "../hooks/useUpdateGameBoardMutation";
import ShowWinner from "./ShowWinner";
import ShowTurn from "./ShowTurn";
import Token from "./Token";
import type { PlayersInfo } from "./ScoreBoard";
import FullScreenLoading from "./FullScreenLoading";

export type GameInfo = {
  board: Array<number[]>,
  turn: number,
  winner?: number
}

const GameBoard: React.FC<{roomId: string}> = ({roomId}) => {
  const queryClient = useQueryClient();

  const {mutate: updateGameBoard, isPending} = useUpdateGameBoardMutation(roomId);
  //*game current player data
  const getCurrentPlayerFromGame = useGameStore(state => state.getCurrentPlayerFromGame);
  const currentPlayer = getCurrentPlayerFromGame(roomId);
  //*game data
  const gamePath = `rooms/${roomId}/game`
  const { data, isLoading } = useRealTimeQuery<GameInfo>(gamePath);

  //*game players
  const playerInfoPath = `rooms/${roomId}/players`;
  const playersInfo = queryClient.getQueryData<PlayersInfo>([playerInfoPath]) 

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

  if(isLoading){
    return <FullScreenLoading customClass="grid-in-game"/>
  }


  return (
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
        {data?.winner ? 
          <ShowWinner winner={data.winner} currentPlayer={currentPlayer} playersInfo={playersInfo} roomId={roomId}/> 
          : 
          <ShowTurn turn={data?.turn} currentPlayer={currentPlayer} />}
      </div>
  );
};
export default GameBoard;