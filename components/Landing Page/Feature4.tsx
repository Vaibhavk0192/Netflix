import React, { useEffect, useState } from "react";

interface FreatureProps {
  image: string;
  text1: string;
  text2: string;
}

const Feature: React.FC<FreatureProps> = ({ image, text1, text2 }) => {
  return (
    <div className="h-[80%] mb-2">
      <div className=" flex justify-between w-full h-full box-border min-h-auto bg-black lg:py-0 sm:py-6">
        <div className="flex-wrap-reverse md:flex-wrap-reverse flex items-center justify-between w-full  lg:mx-32 sm:flex-wrap sm:px-1 ">
          <img
            src={image}
            className="h-[24rem] w-[36rem] self-center box-border flex lg:justify-center sm:justify-center items-center basis-1/2 sm:h-2/3 lg:mb-0 sm:mb-5 flex-wrap"
          ></img>

          <div className="gap-4 lg:w-[34rem] box-border self-center flex flex-col h-auto sm: w-full text-white flex-wrap">
            <span className="lg:text-[2.85rem] font-black lg:text-left mb-4 sm:text-3xl sm:text-center">
              {text1}
            </span>
            <span className="text-[1.35rem] font-medium lg:text-left  sm:text-center">
              {text2}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
