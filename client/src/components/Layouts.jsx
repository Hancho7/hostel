import Navbar from "./navBar";
import Footer from "./footer";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar className="fixed" />
      {children}
      <Footer />
    </>
  );
};

export const NavBarLayout = ({ children, bgColor }) => {
  return (
    <>
      <Navbar bgColor={bgColor} />
      {children}
    </>
  );
};
