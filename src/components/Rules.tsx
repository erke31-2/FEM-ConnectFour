import { useState } from "react";

const Rules = () => {
    const [showRules, setShowRules] = useState(false);
  return (
    <>
      <button className="bg-secondaryBg uppercase font-semibold py-[10px] w-[135px] rounded-full" onClick={() => setShowRules(true)}>
        Game Rules
      </button>
      {showRules && 
      <div className="fixed inset-0 flex justify-center items-center w-full h-screen">
        <article className="bg-white text-black w-[95%] max-w-[500px] p-7 rounded-xl shadow-boardShadow border-4 border-black flex flex-col gap-y-5 relative">
          <h2 className="text-center text-2xl font-semibold">RULES</h2>
          <div>
            <h3 className="text-lg font-medium">Objectives</h3>
            <p className="font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              possimus soluta sint sunt nemo, magnam quas veniam quae aliquam
              reprehenderit asperiores quisquam, vero sapiente praesentium.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">How to Play</h3>
            <ul className="font-light flex flex-col gap-y-[2px]">
              <li>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam,
                impedit!
              </li>
              <li>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam,
                impedit!
              </li>
              <li>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam,
                impedit!
              </li>
            </ul>
          </div>
          <button className="absolute -bottom-6 left-[50%] -translate-x-1/2 bg-p1Bg rounded-full w-[10%] aspect-square text-xl font-bold text-white" onClick={() => setShowRules(false)}>
            X
          </button>
        </article>
      </div>
      }
    </>
  );
};
export default Rules;
