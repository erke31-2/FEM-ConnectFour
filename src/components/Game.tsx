import Score from "./Score";
import GameBoard from "./GameBoard";
import { useEffect, useState } from "react";
import { off, onValue, ref } from "firebase/database";

type Players = {
    player1: {
      id: number;
      name: string,
      score: number
    },
    player2: {
      id: number;
      name: string,
      score: number
    }
}


import { database } from "../firebase/firebase";
const Game = () => {
  const [players, setPlayers] = useState<Players>();
  const roomId = "-NhCl81fw0IGtEJXQgju"
  useEffect(() => {
    const playerRef = ref(database, `rooms/${roomId}/players`);
    onValue(playerRef, (snapshot) => {
      const data: Players = snapshot.val();
      setPlayers(data);
      console.log("Listening Players Info");
    })
    return () => off(playerRef)
  }, [roomId])
  return (
    <section className="max-w-[600px] mx-auto grid grid-areas-layout grid-cols-2 gap-6 lg:max-w-[1020px] lg:grid-cols-boardLayout lg:grid-areas-lgLayout lg:items-center">
     {players &&  <>
      <Score name={players.player1.name} score={players.player1.score} />
      <Score name={players.player2.name} score={players.player2.score} />
     </>}
      <GameBoard />
    </section>
  );
};
export default Game;
