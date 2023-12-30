"use client";
import { IoIosArrowForward } from "react-icons/io";

const GetStarted = () => {
  return (
    <div className="flex flex-wrap items-center">
      <button className="bg-[#e50914]  rounded text-white text-sm font-semibold mr-4 px-5 py-4 self-center lg:text-[1.5rem] flex-row flex justify-between lg:w-[13rem] sm: w-[10rem] text-[1.1rem]">
        Get Started
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default GetStarted;
