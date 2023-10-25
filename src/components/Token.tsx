interface TokenProps{
  bgClass: string
}
const Token: React.FC<TokenProps> = ({bgClass}) => {
  return (
    <div className={`${bgClass} w-full aspect-square rounded-full border-4  shadow-tokenInnerShadow border-black flex justify-center items-center`}>
      <div className="w-[25%] aspect-square rounded-full bg-white"/>
    </div>
  )
}
export default Token 