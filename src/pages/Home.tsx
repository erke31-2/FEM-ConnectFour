import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGameStore from "../store/store";

const Home = () => {
  const [showRecent, setShowRecent] = useState(true);
  const games = useGameStore((state) => state.games);
  const clearAllGames = useGameStore((state) => state.clearAllGames)
  const navigate = useNavigate();
  return (
    <main className="w-full relative h-[calc(100vh-250px)] flex justify-center items-center">
      <section className="w-full max-w-[350px] flex flex-col mx-auto gap-y-3 text-center">
        <Link
          to={"/create-room"}
          className="bg-p1Bg text-slate-200 hover:opacity-80 text-lg font-medium py-3 rounded-lg w-full shadow-tokenShadow"
        >
          Create a Room
        </Link>
        <Link
          to={"/join-room"}
          className="bg-p2Bg text-slate-900 hover:opacity-80 text-lg font-medium py-3 rounded-lg w-full shadow-tokenShadow"
        >
          Join a Room
        </Link>
      </section>
      <article className={`absolute top-0 left-0 text-white ease-in duration-300 grid grid-cols-10 rounded-md ${showRecent ? "translate-x-0" : "-translate-x-[90%]"} ease-in duration-300`}>
        <h2 className="col-span-9 font-medium bg-secondaryBg flex justify-center items-center text-lg p-3">
          5 Most Recently Games
        </h2>
        <button className={`col-span-1  py-4 bg-secondaryBg font-bold ${showRecent ? "rounded-l-md rotate-180" : "rounded-r-md rotate-0"}`} title="Show Recent Games" onClick={() => setShowRecent(!showRecent)}>
         &gt;
        </button>
        <ul className="col-span-9 bg-secondaryBg pb-3 px-3">
         {games.length <= 0 ? (
          <li className="text-sm text-center">No Recent Game</li>
         ) : (
          games.map(g => (
            <li key={g.gameId} className="border-b border-white p-2 hover:bg-white/20 duration-150 cursor-pointer" onClick={() => navigate(`/play/${g.gameId}`)}>
              <p><span className="font-semibold">Game Id({g.gameId}) as {g.player.name}</span></p>
            </li>
          ))
         )}
        </ul>
        <div className="col-span-1 bg-transparent" />
        <button className="col-span-9 bg-secondaryBg rounded-b-md underline hover:text-primaryBg transition pt-1 pb-3" onClick={clearAllGames} aria-hidden={!showRecent} tabIndex={showRecent ? 0 : -1}>Clear All Recent Games</button>
      </article>
    </main>
  );
};
export default Home;
