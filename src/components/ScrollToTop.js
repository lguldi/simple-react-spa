import React, { useEffect, useState } from "react";

const ScrollToTop = (props) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return (_) => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]);

  if (!showButton) {
    return null;
  } else {
  }
  return (
    <button
      title="Back to Top"
      style={{
        backgroundColor: "#00274c",
        borderRadius: "6px",
        bottom: ".2em",
        color: "#FFF",
        display: "inline",
        fontFamily: "curier new",
        fontSize: "32px",
        fontWeight: "600",
        opacity: ".6",
        padding: "14px 15px 4px 15px",
        verticalAlign: "baseline",
        position: "fixed",
        right: ".2em"
      }}
      onClick={() => {
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
      }}
    >
      ^
    </button>
  );
};

export default ScrollToTop;
