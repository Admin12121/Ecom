import React from "react";
import "./style.css";

const ProductNotFound = () => {
  return (
    <span className="w-full h-[100vh] flex flex-col items-center justify-center">
      <h1 className="text-[6vw] top-[40%] font-bold absolute">Product Not Found</h1>
      <div className="box">
        <div className="face opposite"></div>
        <div className="face bottom"></div>
        <div className="face back"></div>
        <div className="face right"></div>
        <div className="face left">
          <div className="icons">
            <div className="umbrella"></div>
            <div className="orientation">
              <div className="base"></div>
            </div>
            <div className="glass"></div>
          </div>
        </div>
        <div className="face front">
          <div className="recycled">
            <div className="arrow"></div>
            <div className="arrow"></div>
            <div className="arrow"></div>
          </div>
          <div className="label"></div>
          <div className="ball"></div>
        </div>
        <div className="face top">
          <div className="cover-back"></div>
          <div className="cover-right"></div>
          <div className="cover-left"></div>
          <div className="cover-front"></div>
        </div>
      </div>
    </span>
  );
};

export default ProductNotFound;
