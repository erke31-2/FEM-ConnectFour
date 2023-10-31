import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { checkRoomExists } from "../firebase/service";
import FullScreenLoading from "../components/FullScreenLoading";
import Game from "../components/Game";
import { toast } from "sonner";

const GamePage = () => {
  const { roomId } = useParams();
  //?check room exist with that id or not
  const { data: isValidRoomId, isLoading } = useQuery({
    queryKey: ["checkRoomIdValid", roomId],
    queryFn: () => checkRoomExists(roomId ?? ""),
  });

  if (isLoading) {
    return <FullScreenLoading />;
  }
  
  if (!isValidRoomId) {
    toast.error(`Game Room doesn't exist with this id (${roomId})`);
    return <Navigate to={"/"} />;
  }

  if (roomId && isValidRoomId) {
    return (
      <main className="w-full px-6 mb-16">
        <Game roomId={roomId} />
      </main>
    );
  }
};
export default GamePage;
