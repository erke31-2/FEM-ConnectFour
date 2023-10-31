import ScoreBoard from "./ScoreBoard";
import GameBoard from "./GameBoard";
import OverlayBlur from "./OverlayBlur";
import useRealTimeQuery from "../hooks/useRealTimeQuery";
import FullScreenLoading from "./FullScreenLoading";

const Game: React.FC<{ roomId: string }> = ({ roomId }) => {
  //?listen room has two player, if not show roomId to join
  const path = `rooms/${roomId}/roomFull`;
  const { data: isRoomFull, isLoading } = useRealTimeQuery<boolean>(path);
  
  if(isLoading){
    return <FullScreenLoading />
  }

  if(!isRoomFull){
    return <OverlayBlur roomId={roomId}/>
  }

  return (
      <section className="max-w-[600px] mx-auto grid grid-areas-layout grid-cols-2 gap-4 lg:max-w-[1020px] lg:grid-cols-boardLayout lg:grid-areas-lgLayout lg:items-center">
        <ScoreBoard roomId={roomId} />
        <GameBoard roomId={roomId} />
      </section>

  );
};
export default Game;
