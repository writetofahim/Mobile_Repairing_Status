import React, { useContext, useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { CiLogin, CiLogout } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContexts";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { logout } = useContext(AuthContext);
  const value = localStorage.getItem("user");
  const user = JSON.parse(value);
  const [background, setBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // console.log(window.pageYOffset);
      if (window.pageYOffset > 50) {
        setBackground(true);
      } else {
        setBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => {
        console.log("Removing");
      });
    };
  }, []);

  const menus = [
    { id: 1, menu: "Home", path: "/" },
    { id: 2, menu: "Status", path: "/status" },
    { id: 3, menu: "About", path: "/about" },
  ];

  return (
    <div
      className={`print:hidden fixed backdrop-blur-xl bg-white transition-all duration-500 top-0 z-40  w-full ${
        background ? "shadow-md bg-white/70" : ""
      }`}
    >
      {/* desktop */}
      <div className="container md:flex hidden   mx-auto justify-between items-center h-16 md:px-16 px-5 ">
        {/* logo */}
        <div className="">
          <span>Logo</span>
        </div>

        {/* nav and others */}
        <div className="md:flex gap-5">
          {/* nav */}
          <nav>
            <ul className="flex gap-5">
              {menus.map(({ menu, path }, i) => (
                <li key={i} className="">
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive ? "text-green-500" : ""
                    }
                  >
                    {menu}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* others */}
          <div
            className="border-l pl-4 flex gap-1
         items-center"
          >
            {/* <CiLogin className="text-lg" /> */}
            <NavLink
              onClick={user ? logout : null}
              to={user ? "#" : "/login"}
              // className={({ isActive }) => (isActive ? "text-green-500" : "")}
            >
              <span className="flex justify-center items-center gap-1">
                {user ? (
                  <>
                    <CiLogout className="text-xl" />
                    {user.fullName}
                  </>
                ) : (
                  <>
                    <CiLogin className="text-xl" />
                    Login
                  </>
                )}
              </span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* mobile nav */}
      <div className="md:hidden flex justify-between items-center h-16 px-5">
        <div
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="text-3xl"
        >
          {showMobileMenu ? <RxCross2 /> : <BiMenu />}
        </div>
        <div>Logo</div>
      </div>

      <div
        className={` bg-blue-100 backdrop-blur-2xl absolute top-16 transition-all ease-in-out  duration-300 h-screen z-20 w-60 p-5  ${
          showMobileMenu ? "translate-x-0" : "-translate-x-60"
        }`}
      >
        <nav className="">
          <ul className="flex flex-col gap-5 text-lg">
            {menus.map(({ menu, path }, i) => (
              <li key={i} className="text-center">
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? "text-green-500" : ""
                  }
                >
                  {menu}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* others */}
        <div
          className="flex gap-1
         items-center justify-center text-lg mt-5 cursor-pointer"
        >
          <NavLink
            to={"/login"}
            className={({ isActive }) => (isActive ? "text-green-500" : "")}
          >
            <span>Login</span>
          </NavLink>
          <CiLogin className="text-lg" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
