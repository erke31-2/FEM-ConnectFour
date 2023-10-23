import { Link } from "react-router-dom";

const Home = () => {
  return (
      <main className="w-full max-w-[350px] mx-auto flex flex-col items-center justify-center gap-y-4 text-center p-4">
        <Link to={"/create-room"} className="bg-p1Bg text-slate-200 hover:opacity-80 text-lg font-medium py-3 rounded-lg w-full shadow-tokenShadow">Create a Room</Link>
        <Link to={"/join-room"} className="bg-p2Bg text-slate-900 hover:opacity-80 text-lg font-medium py-3 rounded-lg w-full shadow-tokenShadow">Join a Room</Link>
      </main>

  );
};
export default Home;
