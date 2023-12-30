import React, { useState } from "react";
import Questions from "./questions";
import { QuesAndAns } from "./Ques";

const FrequentQues = () => {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

  const toggleAnswerVisibility = (index: number) => {
    setVisibleIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <div className="relative flex justify-center w-full h-full box-border min-h-auto lg:py-14 sm:py-18 bg-black">
        <div className="flex flex-col items-center w-full">
          <div className="box-border inherit h-auto block mx-auto text-white px-6 w-4/5">
            <h2 className="text-[3rem] font-bold text-center mb-4">
              Frequently Asked Questions
            </h2>
            <div>
              {QuesAndAns &&
                QuesAndAns.map((quesAndAns, i) => (
                  <Questions
                    key={i}
                    index={i}
                    quess={quesAndAns.question}
                    anss={quesAndAns.answer}
                    anss1={quesAndAns.answer1 || ""}
                    isVisible={visibleIndex === i}
                    toggleVisibility={() => toggleAnswerVisibility(i)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequentQues;
