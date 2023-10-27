import { useState } from "react";
import useGameStore from "../store/store";

const OverlayBlur = () => {
  const roomId = useGameStore((state) => state.gameId);
  const link = `http://localhost:3000/join-room?roomId=${roomId}`
  const [hasCopied, setIsCopied] = useState(false);
  const copyText = () => {
    navigator.clipboard.writeText(link).then(() => setIsCopied(true))
  }

  return (
    <section className="fixed inset-0 flex justify-center items-center backdrop-blur-lg">
      <article className="w-full max-w-[400px] shadow-overlayShadow p-6 flex justify-center items-center flex-col gap-y-4 rounded-lg bg-white/30">
        <span className="text-xl">Waiting for friend...</span>
        <p className="text-lg font-medium text-center">
          Share the Room Id or Link below with your friend to play.
        </p>
        <span className="bg-black text-white text-center py-2 px-4 tracking-wide rounded-md font-bold">
          {roomId}
        </span>
        <div className="text-white flex flex-col items-end">
          <button className="w-fit text-xs px-2 py-1 font-bold" onClick={copyText}>
            {hasCopied ? "Copied!" : "Copy Link"}
          </button>
          <p className="bg-black p-3 rounded-md whitespace-nowrap">{link}</p>
        </div>
      </article>
    </section>
  );
};
export default OverlayBlur;
