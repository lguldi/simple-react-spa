import React from "react";

const SVG = props => {
  const style = props.style || {};
  const fill = props.fill || "#333";
  const width = props.width || "100%";
  const className = props.className || "";
  const viewBox = props.viewBox || "0 0 32 32";
  const pathD = props.pathD || "";
  return (
    <svg
      width={width}
      style={style}
      height={width}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={`svg-icon ${className || ""}`}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path fill={fill} d={pathD} />
    </svg>
  );
};

export default SVG;
