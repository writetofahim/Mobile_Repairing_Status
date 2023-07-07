import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Main = () => {
  return (
    <div className="main container mx-auto relative">
      {/* nav */}
      <div className=" nav z-20 left-0 right-0 top-0 print:hidden block ">
        <Navbar />
      </div>
      <div className="h-screen pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;