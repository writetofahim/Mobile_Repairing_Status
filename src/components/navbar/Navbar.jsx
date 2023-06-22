import React from "react";
import { CiLogin } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  // menu
  const menus = [
    { id: 1, menu: "Home", path: "/" },
    { id: 2, menu: "Status", path: "/status" },
    { id: 3, menu: "About", path: "/about" },
  ];
  return (
    <div className=" flex justify-between items-center h-16 px-16">
      {/* logo */}
      <div>
        <span>Logo</span>
      </div>

      {/* nav and others */}
      <div className="flex gap-6">
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
          className="border-l pl-6 flex gap-1
         items-center"
        >
          <CiLogin className="text-lg" />
          <span>Login</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
