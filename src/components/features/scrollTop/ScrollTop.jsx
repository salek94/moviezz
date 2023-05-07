import React from "react";
import "./ScrollTop.scss";
import { FaArrowUp } from "react-icons/fa";

const ScrollTop = () => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll" onClick={handleScrollTop}>
      <FaArrowUp />
    </div>
  );
};

export default ScrollTop;
