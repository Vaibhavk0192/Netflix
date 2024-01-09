"use client";
import { IoIosArrowForward } from "react-icons/io";

const GetStarted = () => {
  return (
    <div className="flex flex-wrap items-center">
      <button className="bg-[#e50914]  rounded text-white text-sm font-semibold lg:mr-4 
      max-sm:px-5 max-sm:py-2
      max-sm:mt-1
      px-5 py-4 
      self-center 
      lg:text-[1.5rem] 
      items-center flex justify-between 
      lg:w-[13rem] sm:w-[10rem] 
      text-[1.1rem]">
        Get Started
      <IoIosArrowForward className="ml-2" />
      </button>
    </div>
  );
};

export default GetStarted;
