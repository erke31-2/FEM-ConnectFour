import { Link } from "react-router-dom";
import Logo from "./Logo";
import Rules from "./Rules";

const Navbar = () => {
  const currentUrl = window.location.href;
  const isGamePage = currentUrl.slice(currentUrl.lastIndexOf("/") + 1) === "play";
  return (
    <>
      <nav className="w-[95%] max-w-[1020px] mx-auto text-white flex items-center justify-between">
        <Link
          className="bg-secondaryBg text-center uppercase font-semibold py-[10px] w-[135px] rounded-full"
          to={"/"}
        >
          Menu
        </Link>
        <Logo />
        {isGamePage ? (
          <button className="bg-secondaryBg uppercase font-semibold py-[10px] w-[135px] rounded-full">
            Restart
          </button>
        ) : (
          <Rules />
        )}
      </nav>
    </>
  );
};
export default Navbar;
