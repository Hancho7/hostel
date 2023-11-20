import { Outlet } from "react-router-dom";
import Navbar from "../components/navBar.jsx";
import Footer from "../components/footer.jsx";

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
