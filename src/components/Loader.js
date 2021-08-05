import React from "react";

const Loader = (props) => {
  const align = props.align ? props.align : "center";
  const message = props.message || "Loading...";

  const marginLeft = align === "left" ? "0" : "auto";
  const marginRight = align === "right" ? "0" : "auto";

  return (
    <div className="loader-container" style={{ textAlign: align }}>
      <div
        style={{
          display: "inline-block",
          marginLeft: marginLeft,
          marginRight: marginRight,
          textAlign: "center",
          width: "auto"
        }}
      >
        <div className="loader"></div>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default Loader;
