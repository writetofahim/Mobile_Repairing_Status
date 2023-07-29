import React from "react";
const handleStatusClick = (status) => {
  console.log(status);
};
const About = () => {
  return (
    <div>
      <h1 className=" p-20 text-transparent text-6xl bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 text-center">
        About
        <span className="text-green-500">Us.</span>
      </h1>
    </div>
  );
};

export default About;
