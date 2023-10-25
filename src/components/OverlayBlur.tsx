import useGameStore from "../store/store";

const OverlayBlur = () => {
  const roomId = useGameStore((state) => state.gameId);
  return (
    <section className="fixed inset-0 flex justify-center items-center backdrop-blur-lg">
      <article className="w-full max-w-[400px] shadow-overlayShadow p-6 flex justify-center items-center flex-col gap-y-4 rounded-lg bg-white/30">
        <span className="text-xl">Waiting for friend...</span>
        <p className="text-lg font-medium text-center">
          Share the Room Id below with your friend to play.
        </p>
        <span className="border-2 border-white py-2 px-6 tracking-wide rounded-md font-bold">
          {roomId}
        </span>
      </article>
    </section>
  );
};
export default OverlayBlur;
