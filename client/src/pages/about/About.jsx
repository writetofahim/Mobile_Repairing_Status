import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div>
      hello about
      <button onClick={() => navigate(-1)}>go back</button>
    </div>
  );
};

export default About;
