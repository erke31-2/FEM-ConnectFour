import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="w-full h-[150px] flex flex-col items-center justify-around">
      <h1 className="text-center font-bold text-3xl text-white">
        Connect Four Game
      </h1>
      <Navbar />
    </header>
  );
};
export default Header;
