import React from "react";
import bgTooltip from "../../../assets/bg_tooltip.png";

const Tooltip = () => {
  return (
    <div>
      <div>
        <div className="relative">
          <img className="" src={bgTooltip} alt="" />
          <p className="text-xs absolute top-6 left-4">Minimum 4 digit</p>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
