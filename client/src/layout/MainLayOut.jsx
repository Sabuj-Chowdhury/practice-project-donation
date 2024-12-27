import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const MainLayOut = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar></Navbar>
      {/* Outlet */}
      <div className="min-h-[calc(100vh-301px)]">
        <Outlet />
      </div>
      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default MainLayOut;
