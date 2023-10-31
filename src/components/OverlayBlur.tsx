import { useState } from "react";

const OverlayBlur = ({roomId}: {roomId: string}) => {
  const link = `https://connectfour-six.vercel.app/join-room?roomId=${roomId}`;
  const [hasCopied, setIsCopied] = useState(false);
  const copyText = () => {
    navigator.clipboard.writeText(link).then(() => setIsCopied(true));
  };

  return (
    <section className="fixed inset-0 flex justify-center items-center backdrop-blur-lg p-4">
      <article className="w-full max-w-[400px] shadow-overlayShadow p-6 flex flex-col justify-center items-center  gap-y-4 rounded-lg bg-white/30">
        <span className="text-xl">Waiting for friend...</span>
        <p className="text-lg font-medium text-center">
          Share the Room Id or Link below with your friend to play.
        </p>
        <span className="bg-black text-white text-center py-2 px-4 tracking-wide rounded-md font-bold">
          {roomId}
        </span>
        <div className="text-white w-full flex flex-col">
          <button
            className="w-fit text-xs p-2 font-bold ml-auto"
            onClick={copyText}
          >
            {hasCopied ? "Copied!" : "Copy Link"}
          </button>
          <div className="flex items-center whitespace-nowrap overflow-x-scroll bg-black p-3 rounded-md">
            <p className="inline">{link}</p>
          </div>
        </div>
      </article>
    </section>
  );
};
export default OverlayBlur;
