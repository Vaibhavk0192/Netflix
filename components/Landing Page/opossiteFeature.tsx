import React, { useEffect, useState } from "react";

interface FreatureProps {
  image: string;
  text1: string;
  text2: string;
}

const OppositeFeature: React.FC<FreatureProps> = ({ image, text1, text2 }) => {
  return (
    <div className="h-[80%] mb-2">
      <div className=" flex justify-between w-full h-full box-border min-h-auto bg-black lg:py-0 sm:py-6">
        <div className=" md:flex-wrap flex items-center justify-between w-full  lg:mx-32 sm:flex-wrap max-sm:flex-wrap sm:px-1 ">
          

          <div className="gap-4 lg:w-[34rem] max-lg:w-auto box-border self-center m-auto flex flex-col h-auto sm: w-full text-white flex-wrap max-lg:px-4">
            <span className="lg:text-[2.85rem] max-lg:text-[1.5rem] font-black lg:text-left sm:mb-4 sm:text-3xl max-lg:text-center">
              {text1}
            </span>
            <span className="text-[1.35rem] font-medium lg:text-left  max-lg:text-center">
              {text2}
            </span>
          </div>
          <img
            src={image}
            className="md:h-[24rem] md: w-[36rem] max-sm:h-[16rem] max-sm:w-[20rem] self-center box-border flex lg:justify-center sm:justify-center items-center basis-1/2 sm:h-2/3 lg:mb-0 sm:mb-5 flex-wrap max-lg:mx-auto"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default OppositeFeature;
