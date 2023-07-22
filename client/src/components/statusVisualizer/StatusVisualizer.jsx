import React from "react";
import { GiSolderingIron } from "react-icons/gi";
import { MdDoneOutline, MdIncompleteCircle } from "react-icons/md";

const StatusVisualizer = ({
  working,
  almost,
  done,
  handleStatusClick,
  label,
}) => {
  return (
    <div>
      {/* status */}
      <div className="flex items-center gap-3 mt-5">
        <label htmlFor="">{label}</label>

        {/* working */}
        <div className=" relative">
          <span className="relative flex h-16 w-16">
            <span
              className={` absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 ${
                working && "animate-ping"
              }`}
            ></span>
            <span className="relative inline-flex rounded-full  bg-sky-500">
              <button
                onClick={() => handleStatusClick("working")}
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

          <p className="text-center text-xs mt-2">Working on</p>
        </div>

        {/* almost */}
        <div>
          <button
            onClick={() => handleStatusClick("almost")}
            className={` bg-yellow-400 hover:bg-blue-300 px-2 py-1 rounded-full w-16 h-16 flex justify-center items-center duration-500 ${
              almost && "ring-2"
            }`}
          >
            <MdIncompleteCircle
              className={`text-3xl ${almost && "text-white animate-bounce"}`}
            />
          </button>
          <p className="text-center text-xs mt-2">Almost</p>
        </div>

        {/* done */}
        <div>
          <button
            onClick={() => handleStatusClick("done")}
            className={`bg-green-500 hover:bg-blue-300 px-2 py-1 rounded-full w-16 h-16 flex justify-center items-center duration-500 ${
              done && "ring-2"
            }`}
          >
            <MdDoneOutline
              className={`text-3xl ${done && "text-white animate-bounce"}`}
            />
          </button>
          <p className="text-center text-xs mt-2">Done</p>
        </div>
      </div>
    </div>
  );
};

export default StatusVisualizer;
