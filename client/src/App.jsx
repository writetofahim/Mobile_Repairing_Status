import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Test from "./Test";
import Main from "./layout/main/Main";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Status from "./pages/status/Status";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/status", element: <Status /> },
      { path: "/login", element: <Login /> },
      { path: "/about", element: <About /> },
    ],
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
