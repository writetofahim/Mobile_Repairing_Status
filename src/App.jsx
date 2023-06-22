import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
]);

const App = () => {
  return (
    <>
      <div className="w-[30%] h-96 bg-blue-100 absolute left-0 top-0 -z-10"></div>
      <div className="w-[30%] h-96 bg-blue-100 absolute right-0 bottom-0 -z-10"></div>
      <div className="backdrop-blur-3xl">
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
