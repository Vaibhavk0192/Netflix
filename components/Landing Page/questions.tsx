import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

interface QuestionProps {
  quess: string;
  anss: string;
  anss1: string;
  index: number;
  isVisible: boolean;
  toggleVisibility: () => void;
}

const Questions: React.FC<QuestionProps> = ({
  quess,
  anss,
  anss1,
  index,
  isVisible,
  toggleVisibility,
}) => {
  return (
    <div>
      <div
        className="p-0 m-0 text-lg w-full mt-2 h-[5.30rem] mb-[0.125rem] cursor-pointer"
        onClick={toggleVisibility}
      >
        <div className="bg-[rgb(45,45,45)] text-white sm:text-[1.425rem] max-sm:text-[1.1rem] mb-2 h-full flex items-center sm:px-6 max-sm:px-2 hover:bg-[#414141] justify-between">
          <span>{quess}</span>
          {isVisible ? (
            <RxCross1 size={37} className="transition delay-100" />
          ) : (
            <AiOutlinePlus size={45} className="transition del10" />
          )}
        </div>
      </div>
      {isVisible && (
        <div className="m-0 text-lg w-full bg-[rgb(45,45,45)] sm:px-6 max-sm:px-2 py-10 delay-100">
          <span className="text-white sm:text-[1.425rem] max-sm:text-[0.8rem]  flex items-center ">
            {anss}
          </span>
          <br />
          <span className="text-white sm:text-[1.425rem] max-sm:text-[0.8rem]  flex items-center ">
            {anss1}
          </span>
        </div>
      )}
    </div>
  );
};

export default Questions;
