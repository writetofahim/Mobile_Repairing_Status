import React from "react";

const Test = ({ handleStatusClick }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleStatusClick("working")}
        className="bg-blue-400"
      >
        working
      </button>
      <button
        onClick={() => handleStatusClick("almost")}
        className="bg-blue-400"
      >
        almost
      </button>
      <button onClick={() => handleStatusClick("done")} className="bg-blue-400">
        done
      </button>
    </div>
  );
};

export default Test;
