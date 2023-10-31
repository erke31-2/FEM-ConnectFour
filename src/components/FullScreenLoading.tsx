const FullScreenLoading = ({customClass}: {customClass?: string}) => {
  return (
    <main className={`w-full h-screen flex justify-center items-center gap-x-1 ${customClass}`}>
        <div className="animate-bounce w-6 h-6 rounded-full bg-p1Bg"/>
        <div className="animate-bounce w-6 h-6 rounded-full bg-p2Bg" style={{animationDelay: '0.1s'}}/>
        <div className="animate-bounce w-6 h-6 rounded-full bg-p1Bg" style={{animationDelay: '0.2s'}}/>
    </main>
  )
}
export default FullScreenLoading