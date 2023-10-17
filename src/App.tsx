import Header from "./components/Header";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./components/GameBoard";
import Footer from "./components/Footer";
const App = () => {
  return (
    <>
      <Header />
      <main className="w-full py-12 flex flex-col gap-y-10">
        <ScoreBoard />
        <GameBoard />
      </main>
      <Footer />
    </>
  );
};
export default App;
