import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { checkRoomExists } from "../firebase/firebase";
import useGameStore from "../store/store";
import FullScreenLoading from "../components/FullScreenLoading";
import Game from "../components/Game";

const GamePage = () => {
  const roomId = useGameStore(state => state.gameId);
  //?check room exist with that id or not
  const { data: validRoomId, isLoading } = useQuery({
    queryKey: ["checkRoomIdValid", roomId],
    queryFn: () => checkRoomExists(roomId ?? "")
  })
 
  if(isLoading){
    return <FullScreenLoading />
  }

  if(roomId && validRoomId){
    return (
      <main className="w-full px-6 mb-16">
        <Game roomId={roomId}/>
      </main>
    );
  }

  return <Navigate to={"/"}/>
 
};
export default GamePage;
