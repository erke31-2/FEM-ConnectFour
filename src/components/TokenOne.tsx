interface TokenOneProps{
    size: string;
}
const TokenOne: React.FC<TokenOneProps> = ({ size }) => {
  return (
    <div className={`w-[${size}] aspect-square bg-p1Bg rounded-full border-4 shadow-tokenInnerShadow border-black`}/>
  )
}
export default TokenOne