import React from "react";
import coverImg from "../../assets/sliderImg/img2.jpeg";

const Home = () => {
  return (
    <div className=" bg-white">
      <div className=" bg-blue-500 bg-gradient-to-b from-blue-500 to-white ">
        <img src={coverImg} className="w-full h-96 object-cover" alt="" />
        <div className="bg-white rounded-t-3xl w-[calc(100%-200px)] mx-auto mt-[100px]">
          <h1 className="  p-20 text-transparent text-6xl bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 text-center">
            We service any of{" "}
            <span className="text-green-500">mobile phone.</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
