const Logo = () => {
  return (
    <div className="w-[40px] h-[40px] grid grid-cols-2 gap-1">
      <div className="`w-full aspect-square bg-p1Bg rounded-full shadow-tokenShadow border-2 border-black" />
      <div className="`w-full aspect-square bg-p2Bg rounded-full shadow-tokenShadow border-2 border-black" />
      <div className="`w-full aspect-square bg-p2Bg rounded-full shadow-tokenShadow border-2 border-black" />
      <div className="`w-full aspect-square bg-p1Bg rounded-full shadow-tokenShadow border-2 border-black" />
    </div>
  );
};
export default Logo;
