import ScoreBoard from "./ScoreBoard";
import GameBoard from "./GameBoard";
import OverlayBlur from "./OverlayBlur";
import useRealTimeQuery from "../hooks/useRealTimeQuery";

const Game: React.FC<{roomId: string}> = ({roomId}) => {
  //listen room has two player,, if not show roomId to join
  const path = `rooms/${roomId}/roomFull`
  const {data: isRoomFull} = useRealTimeQuery<boolean>(path)

  return (
    <>
    <section className="max-w-[600px] mx-auto grid grid-areas-layout grid-cols-2 gap-4 lg:max-w-[1020px] lg:grid-cols-boardLayout lg:grid-areas-lgLayout lg:items-center">
      <ScoreBoard roomId={roomId}/>
      <GameBoard roomId={roomId}/>
    </section>
    {!isRoomFull && <OverlayBlur />}
    </>
  );
};
export default Game;
