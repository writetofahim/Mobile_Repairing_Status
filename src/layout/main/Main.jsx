import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Main = () => {
  return (
    <div className="main container mx-auto">
      {/* nav */}
      <div className="nav w-[100vw] absolute left-0 right-0 top-0">
        <Navbar />
      </div>
      <div className="h-screen pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
