import { PlayerInfo } from "./ScoreBoard"
const Score = ({info}: {info: PlayerInfo}) => {
  return (
    <article className="w-full border-[3px] border-black py-4 flex flex-col items-center justify-center gap-y-1 rounded-3xl shadow-boardShadow bg-white lg:h-[40%]">
        <h2 className="uppercase text-lg font-medium tracking-wider">{info.name}</h2>
        <p>({`Player ${info.id}`})</p>
        <span className="text-4xl font-mono font-semibold">{info.score}</span>
    </article>
  )
}
export default Score