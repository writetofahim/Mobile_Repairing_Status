import React, { useState } from "react";
import { GiSolderingIron } from "react-icons/gi";
import { MdDoneOutline, MdIncompleteCircle } from "react-icons/md";

const Status = () => {
  const [working, setWorking] = useState(false);
  const [almost, setAlmost] = useState(false);
  const [done, setDone] = useState(false);

  const user = "admin";

  const handleStatusToggle = (status) => {
    setAlmost(false);
    setDone(false);
    setWorking(false);
    switch (status) {
      case "working":
        setWorking((prevWorking) => !prevWorking);
        break;
      case "almost":
        setAlmost((prevAlmost) => !prevAlmost);
        break;
      case "done":
        setDone((prevDone) => !prevDone);
        break;
      default:
        break;
    }
  };

  return (
    <div className="">
      <div className="h-screen flex flex-col justify-center items-center">
        <div>
          <label htmlFor="">Last 4 digits of Customer's phn. no: </label>
          <input
            type="text"
            placeholder="ex: 3344"
            className="w-24 h-10 p-2 border rounded"
          />
        </div>

        <div className="flex items-center gap-3 mt-5">
          <label htmlFor="">Status: </label>

          <span className="relative flex h-16 w-16">
            <span
              className={` absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 ${
                working && "animate-ping"
              }`}
            ></span>
            <span className="relative inline-flex rounded-full  bg-sky-500">
              <button
                onClick={() => handleStatusToggle("working")}
                className={` bg-yellow-300 hover:bg-blue-300 px-2 py-1 rounded-full w-16 h-16 flex justify-center items-center duration-500 ${
                  working && "ring-2"
                }`}
              >
                <GiSolderingIron
                  className={`text-3xl ${working && "text-white "}`}
                />
              </button>
            </span>
          </span>

          <button
            onClick={() => handleStatusToggle("almost")}
            className={` bg-yellow-400 hover:bg-blue-300 px-2 py-1 rounded-full w-16 h-16 flex justify-center items-center duration-500 ${
              almost && "ring-2"
            }`}
          >
            <MdIncompleteCircle
              className={`text-3xl ${almost && "text-white animate-bounce"}`}
            />
          </button>

          <button
            onClick={() => handleStatusToggle("done")}
            className={`bg-green-500 hover:bg-blue-300 px-2 py-1 rounded-full w-16 h-16 flex justify-center items-center duration-500 ${
              done && "ring-2"
            }`}
          >
            <MdDoneOutline
              className={`text-3xl ${done && "text-white animate-bounce"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Status;
