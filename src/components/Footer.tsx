const Footer = () => {
  return (
    <footer className="w-full h-[100px] bg-secondaryBg rounded-t-[50px] text-white flex flex-col gap-1 items-center justify-center py-6 px-12 sm:flex-row sm:justify-between">
      <p>
        Created by {" "}
        <span className="font-semibold">
          <a href="https://devlinksshare.vercel.app/share/@kset03" target="_blank">
            Kaung Set
          </a>
        </span>
      </p>
      <p>
        Designed by {" "}
        <span className="font-semibold">
          <a href="https://www.frontendmentor.io/challenges" target="_blank">
            Frontend Mentor
          </a>
        </span>
      </p>
    </footer>
  );
};
export default Footer;
