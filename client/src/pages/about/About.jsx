import React from "react";

const About = () => {
  const handleCheck = (e) => {
    console.log(e.key);
  };
  return (
    <div>
      hello about
      <input type="text" onKeyDown={handleCheck} />
    </div>
  );
};

export default About;
