import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

const Main = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-[1400px] mx-auto overflow-hidden  relative">
        <div className="w-[30%] h-96 bg-yellow-200 absolute left-0 top-16 -z-10 print:hidden block"></div>
        <div className="w-[30%] h-96 bg-blue-100 absolute right-0 bottom-0 -z-10 print:hidden block"></div>

        <div className="w-full backdrop-blur-2xl relative  bg-gradient-to-b from-slate-50 to-white pb-5 pt-20">
          <Outlet />
        </div>
        <Footer />
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
