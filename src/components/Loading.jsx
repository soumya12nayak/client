import React from "react";
// import "./Loading.css"; // Ensure you create this CSS file

const Loading = () => {
  return (
    <div className="loader-container">
      <div className="energy-core">
        <div className="core-glow"></div>
        <div className="core-spin">
          <div className="side front"></div>
          <div className="side back"></div>
          <div className="side top"></div>
          <div className="side bottom"></div>
          <div className="side left"></div>
          <div className="side right"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
