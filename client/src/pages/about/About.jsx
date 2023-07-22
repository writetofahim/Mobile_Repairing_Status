import React from "react";
import Test from "./Test";
const handleStatusClick = (status) => {
  console.log(status);
};
const About = () => {
  return (
    <div>
      <Test handleStatusClick={handleStatusClick} />
    </div>
  );
};

export default About;
