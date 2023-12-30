import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

interface QuestionProps {
  quess: string;
  anss: string;
  anss1: string;
}

const Questions: React.FC<QuestionProps> = ({ quess, anss, anss1 }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const[Index ,setIndex]=useState(0)

  const toggleAnswerVisibility = () => {
    setIsAnswerVisible((prev) => !prev);
  };

  return (
    <div>
      <div
        className="p-0 m-0 text-lg w-full mt-2 h-[5.30rem] mb-[0.125rem] cursor-pointer"
        onClick={toggleAnswerVisibility}
      >
        <div className="bg-[rgb(45,45,45)] text-white text-[1.425rem] mb-2 h-full flex items-center px-6 hover:bg-[#414141] justify-between">
          <span>{quess}</span>
          {isAnswerVisible  ? <RxCross1 size={37}  className="transition delay-100" /> : <AiOutlinePlus size={45} className="transition del10"/>}
        </div>
      </div>
      {isAnswerVisible && (
        <div className="m-0 text-lg w-full bg-[rgb(45,45,45)] px-6 py-10 delay-100">
          <span className="text-white text-[1.425rem] flex items-center ">{anss}</span>
          <br/>
          <span className="text-white text-[1.425rem] flex items-center ">{anss1}</span>
        </div>
      )}
    </div>
  );
};

export default Questions;
