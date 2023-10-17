const Header = () => {
  return (
    <header className="w-full">
      <h1 className="text-center font-bold text-3xl text-white my-6">
        Connect Four Game
      </h1>
      <nav className="w-[90%] max-w-[1020px] mx-auto text-white flex items-center justify-between">
        <button className="bg-secondaryBg uppercase font-semibold py-[10px] w-[120px] rounded-full">
          Menu
        </button>
        <div className="w-[40px] h-[40px] grid grid-cols-2 gap-1">
          <div className='`w-full aspect-square bg-p1Bg rounded-full shadow-tokenShadow border-2 border-black'/>
          <div className='`w-full aspect-square bg-p2Bg rounded-full shadow-tokenShadow border-2 border-black'/>
          <div className='`w-full aspect-square bg-p2Bg rounded-full shadow-tokenShadow border-2 border-black'/>
          <div className='`w-full aspect-square bg-p1Bg rounded-full shadow-tokenShadow border-2 border-black'/>
        </div>
        <button className="bg-secondaryBg uppercase font-semibold py-[10px] w-[120px] rounded-full">
          Restart
        </button>
      </nav>
    </header>
  );
};
export default Header;
