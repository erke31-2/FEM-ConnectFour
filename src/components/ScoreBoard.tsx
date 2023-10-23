import { PlayersInfo } from "./Game";
import Score from "./Score";



const ScoreBoard: React.FC<PlayersInfo> = ({player1, player2}) => {
  return (
    <>
      {player1 && (
        <Score info={player1}/>
      )}
      {player2 && (
        <Score info={player2} />
      )}
    </>
  );
};
export default ScoreBoard;
