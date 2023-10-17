interface ScoreProps{
    name: string;
    score: number;
}
const Score: React.FC<ScoreProps> = ({name, score}) => {
  return (
    <article className="w-[45%] border-2 border-black py-4 flex flex-col items-center justify-center gap-y-1 rounded-3xl shadow-boardShadow">
        <h2 className="uppercase text-lg font-medium tracking-wider">{name}</h2>
        <span className="text-4xl font-mono font-semibold">{score}</span>
    </article>
  )
}
export default Score