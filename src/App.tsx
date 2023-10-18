import Header from "./components/Header";
import Game from "./components/Game";
import Footer from "./components/Footer";
const App = () => {
  return (
    <>
      <Header />
      <main className="w-full py-12 px-6">
        <Game />
      </main>
      <Footer />
    </>
  );
};
export default App;
