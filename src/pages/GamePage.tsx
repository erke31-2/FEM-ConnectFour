import Game from "../components/Game";
import OverlayBlur from "../components/OverlayBlur";
import useRealTimeQuery from "../hooks/useRealTimeQuery";
import useGameStore from "../store/store";
const GamePage = () => {
  const roomId = useGameStore(state => state.gameId);
  const path = `rooms/${roomId}/roomFull`
  const {data: isRoomFull} = useRealTimeQuery<boolean>(path);
  return (
    <main className="w-full px-6 mb-16">
      <Game />
      {!isRoomFull && <OverlayBlur />}
    </main>
  );
};
export default GamePage;
