import { PlayerInfo } from "./ScoreBoard"
const Score = ({info}: {info: PlayerInfo}) => {
  return (
    <article className={`${info.id === 1 ? "bg-p1Bg" : "bg-p2Bg"} w-full border-[3px] border-black py-4 flex flex-col items-center justify-center gap-y-1 rounded-3xl shadow-boardShadow lg:h-[40%] text-white`}>
        <h2 className="uppercase text-lg font-medium tracking-wider text-center">{info.name}</h2>
        <p>({`Player ${info.id}`})</p>
        <span className="text-5xl font-mono font-semibold">{info.score}</span>
    </article>
  )
}
export default Score