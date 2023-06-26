import React, { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menus = [
    { id: 1, menu: "Home", path: "/" },
    { id: 2, menu: "Status", path: "/status" },
    { id: 3, menu: "About", path: "/about" },
  ];
  return (
    <div className=" z-20 flex justify-between items-center h-16 md:px-16 px-5 ">
      {/* logo */}
      <div className="">
        <span>Logo</span>
      </div>

      {/* nav and others */}
      <div className="md:flex gap-5 hidden">
        {/* nav */}
        <nav>
          <ul className="flex gap-5">
            {menus.map(({ menu, path }, i) => (
              <li key={i} className="">
                <NavLink to={path}>{menu}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* others */}
        <div
          className="border-l pl-4 flex gap-1
         items-center"
        >
          <CiLogin className="text-lg" />
          <span>Login</span>
        </div>
      </div>

      <div onClick={() => setShowMobileMenu(!showMobileMenu)}>x</div>

      {/* mobile nav */}
      <div
        className={`bg-blue-200  absolute top-12 transition-all ease-in-out  duration-500 backdrop-blur-2xl h-screen z-20 w-60 p-5 ${
          showMobileMenu ? "right-0" : "-right-60"
        }`}
      >
        <nav className="">
          <ul className="flex flex-col gap-5 text-lg">
            {menus.map(({ menu, path }, i) => (
              <li key={i} className="text-center">
                <NavLink to={path}>{menu}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* others */}
        <div
          className="flex gap-1
         items-center justify-center text-lg mt-5"
        >
          <span>Login</span>
          <CiLogin className="text-lg" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
