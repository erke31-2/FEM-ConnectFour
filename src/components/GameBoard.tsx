import { useEffect, useState } from "react";
import Token from "./Token";
const numRows = 6
const numCols = 7
const initialTime = 35
const initialBoard = Array.from({length: numRows}, () => Array.from({length: numCols}, () => 0))

const GameBoard = () => {
  const [player, setPlayer] = useState(1);
  const [board, setBoard] = useState<Array<number[]>>(initialBoard);
  const [time, setTime] = useState(initialTime)
  const updateBoard = (colIndex: number, player: number) => {
    const updatedBoard = [...board]
    //?filter through the last row(length-1) and check given col
    for(let row = updatedBoard.length - 1; row >= 0; row--){
      if(updatedBoard[row][colIndex] === 0){
        updatedBoard[row][colIndex] = player;
        break;
      }
    }
    //*update board
    setBoard(updatedBoard)
    setPlayer(player === 1 ? 2 : 1);
    setTime(initialTime)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if(time > 0){
        setTime(time -1)
      }else{
        setPlayer(player === 1 ? 2 : 1)
        setTime(initialTime)
      }
    }, 1000);
    return () => clearTimeout(timer)
  },[player, time])


  return (
    <div className="grid-in-game w-full mx-auto bg-white grid grid-cols-7 gap-2 px-2 pt-2 pb-10 rounded-2xl border-[3px] border-black shadow-boardShadow relative mb-16">
        {board.map((row, rowIndex) => (
          row.map((slot, colIndex) => (
            slot === 1 ? <Token key={`${rowIndex}-${colIndex}-1`} bgClass="bg-p1Bg"/> : 
            slot === 2 ? <Token key={`${rowIndex}-${colIndex}-2`} bgClass="bg-p2Bg"/> : 
            <div key={`${rowIndex}-${colIndex}`} className="w-full aspect-square bg-primaryBg border-[3px] border-black shadow-boardInnerShadow md:shadow-boardInnerShadowMd lg:shadow-boardInnerShadowLg rounded-full cursor-pointer" onClick={() => updateBoard(colIndex, player)}/> 
          ))
        ))} 
        <div className="absolute bg-p1Bg text-white w-[230px] py-6 flex flex-col items-center gap-y-1 rounded-2xl border-2 border-black shadow-boardShadow -bottom-[95px] left-0 right-0 mx-auto">
            <p className="uppercase">Player {player}&apos; turn</p>
            <span className="text-4xl">{time}s</span>
        </div>
    </div>
  );
};
export default GameBoard;
