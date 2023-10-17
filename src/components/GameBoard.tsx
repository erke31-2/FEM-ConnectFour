import TokenOne from "./TokenOne";

const GameBoard = () => {
  const array = Array.from({ length: 40 }, (_, index) => index + 1);
  return (
    <section className="w-[90%] max-w-[500px] mx-auto bg-white grid grid-cols-7 gap-2 px-2 pt-2 pb-10 rounded-2xl border-[3px] border-black shadow-boardShadow relative mb-16">
        {array.map(a => (
            <div key={a} className="w-full aspect-square bg-primaryBg border-[3px] border-black shadow-boardInnerShadow md:shadow-boardInnerShadowMd lg:shadow-boardInnerShadowLg rounded-full" /> 
        ))}
        <TokenOne size="full"/>
        <TokenOne size="full"/>
        <div className="absolute bg-p1Bg text-white w-[230px] py-6 flex flex-col items-center gap-y-1 rounded-2xl border-2 border-black shadow-boardShadow -bottom-[85px] left-0 right-0 mx-auto">
            <p className="uppercase">Player 1&apos; turn</p>
            <span className="text-4xl">35s</span>
        </div>
    </section>
  );
};
export default GameBoard;
