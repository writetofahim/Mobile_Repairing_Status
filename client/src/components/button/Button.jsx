import React from "react";

const Button = ({ name }) => {
  return (
    <button className="bg-gradient-to-r from-blue-400 to-cyan-500 px-3 py-1 rounded-sm text-white text-lg">
      {name}
    </button>
  );
};

export default Button;
