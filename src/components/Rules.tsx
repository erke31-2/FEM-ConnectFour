import { useState } from "react";

const Rules = () => {
  const [showRules, setShowRules] = useState(false);
  return (
    <>
      <button
        className="bg-secondaryBg uppercase font-semibold py-[10px] w-[135px] rounded-full"
        onClick={() => setShowRules(true)}
      >
        Game Rules
      </button>
      {showRules && (
        <div className="fixed inset-0 flex justify-center items-center w-full h-screen z-50 bg-white/20">
          <article className="bg-white text-black w-[95%] max-w-[500px] p-7 rounded-xl shadow-boardShadow border-4 border-black flex flex-col gap-y-5 relative">
            <h2 className="text-center text-2xl font-bold">RULES</h2>
            <div>
              <h3 className="text-xl font-semibold">Objectives</h3>
              <p className="font-light text-base pl-1">
                Connect 4 is a simple and engaging two-player strategy game.The
                objective is to be the first player to form a horizontal,
                vertical, or diagonal line of four of their own colored discs in
                the game board which is typically a 6x7 grid.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">How to Play</h3>
              <ul className="font-light flex flex-col gap-y-2">
                <li>
                  <h4 className="text-lg font-medium pl-1">1.Creating a Game Room:</h4>
                  <p className="pl-3 text-base font-light">
                    The first player who initiated the game by creating a game
                    room, will get a unique Room ID for the created game
                    room.Then, share it with friend to play.
                  </p>
                </li>
                <li>
                  <h4 className="text-lg font-medium pl-1">2.Joining a Game Room:</h4>
                  <p className="pl-3 text-base font-light">
                    The friend or opponent who received the shared Room ID from
                    the first player, has to navigate to "Join Room" and enter
                    the input with Room Id.
                  </p>
                </li>
                <li>
                  <h4 className="text-lg font-medium pl-1">3.Starting the Game:</h4>
                  <p className="pl-3 text-base font-light">
                    Once both players are in the same game room, the game can
                    begin. Players take turns making their moves on the virtual
                    Connect 4 game board.
                  </p>
                </li>
              </ul>
            </div>
            <button
              className="absolute -bottom-6 left-[50%] -translate-x-1/2 bg-p1Bg rounded-full w-[10%] aspect-square text-xl font-bold text-white"
              onClick={() => setShowRules(false)}
            >
              X
            </button>
          </article>
        </div>
      )}
    </>
  );
};
export default Rules;
