import { Outlet } from "react-router-dom";
import Navbar from "../components/navBar";
import Footer from "../components/footer";

export function Components() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Components;
