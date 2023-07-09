import { createContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Test from "./Test";
import Main from "./layout/main/Main";
import Home from "./pages/home/Home";
import Status from "./pages/status/Status";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/status", element: <Status /> },
    ],
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

export const ModalContext = createContext();
const modalData = "This is a modal data";
const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="w-[30%] h-96 bg-blue-100 absolute left-0 top-0 -z-10 print:hidden block"></div>
      <div className="w-[30%] h-96 bg-gray-100 absolute right-0 bottom-0 -z-10 print:hidden block"></div>
      <div className="backdrop-blur-2xl">
        <ModalContext.Provider value={modalData}>
          <RouterProvider router={router} />
        </ModalContext.Provider>
      </div>
    </>
  );
};

export default App;
