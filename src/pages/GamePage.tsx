import { Navigate } from "react-router-dom";
import Game from "../components/Game";
import OverlayBlur from "../components/OverlayBlur";
import useRealTimeQuery from "../hooks/useRealTimeQuery";
import useGameStore from "../store/store";
import { useQuery } from "@tanstack/react-query";
import { checkRoomExists } from "../firebase/firebase";
import FullScreenLoading from "../components/FullScreenLoading";

const GamePage = () => {
  const roomId = useGameStore(state => state.gameId);
  const path = `rooms/${roomId}/roomFull`
  const {data: isRoomFull} = useRealTimeQuery<boolean>(path);
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
        <Game />
        {!isRoomFull && <OverlayBlur />}
      </main>
    );
  }

  return <Navigate to={"/"}/>
 
};
export default GamePage;
