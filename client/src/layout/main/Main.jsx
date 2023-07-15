import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Main = () => {
  return (
    <>
      <Navbar />
      <div className="w-[30%] h-96 bg-yellow-200 absolute left-0 top-16 -z-10 print:hidden block"></div>
      <div className="w-[30%] h-96 bg-blue-100 absolute right-0 bottom-0 -z-10 print:hidden block"></div>

      <div className="backdrop-blur-2xl relative h-[calc(100vh-0px)] w-screen overflow-x-scroll  bg-gradient-to-b from-slate-50 to-slate-200/50 pt-20">
        <Outlet />
      </div>

      {/* modal */}
      {/* {isModalOpen && (
        <div className="h-screen w-full bg-black/50 absolute top-0 left-0 flex justify-center items-center">
          <div className="bg-white rounded-md">I am a modal</div>
        </div>
      )} */}
    </>
  );
};

export default Main;
