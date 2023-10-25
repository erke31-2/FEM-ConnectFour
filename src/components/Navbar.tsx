import { Link } from "react-router-dom";
import Logo from "./Logo";
import Rules from "./Rules";

const Navbar = () => {
  return (
    <nav className="w-[90%] max-w-[1020px] mx-auto text-white flex items-center justify-between">
      <Link className="bg-secondaryBg text-center uppercase font-semibold py-[10px] w-[135px] rounded-full" to={"/"}>
        Menu
      </Link>
      <Logo />
      <Rules />
    </nav>
  );
};
export default Navbar;
