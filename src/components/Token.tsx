interface TokenProps{
  bgClass: string
}
const Token: React.FC<TokenProps> = ({bgClass}) => {
  return (
    <div className={`${bgClass} w-full aspect-square rounded-full border-4  shadow-tokenInnerShadow border-black`}/>
  )
}
export default Token 