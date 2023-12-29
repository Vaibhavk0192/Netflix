import useBillBoard from "@/hooks/useBillBoard";
import React, { useCallback } from "react";
import PlayButton from "./PlayButton";

import { AiOutlineInfoCircle } from "react-icons/ai";
import useInfoModal from "@/hooks/useInfoModal";

const BillBoard = () => {
  const { openModal } = useInfoModal();
  const { data, error, isLoading } = useBillBoard();
  
  const handleOpenModel = useCallback(() => {
    openModal(data&&data[0]?.id);
  }, [openModal, data&&data[0]?.id]);

  return (
    <div className="relative h-[56.25vw]">
      <video
        poster={!isLoading ? data[0]?.thumbnailUrl : ""}
        className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500"
        autoPlay
        muted
        loop
        src={!isLoading ? data[0]?.videoUrl : ""}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {!isLoading ? data[0]?.title : ""}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {!isLoading ? data[0]?.description : ""}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={ data&&data[0]?.id} />
          <button
            onClick={handleOpenModel}
            className="
            bg-white
            text-white
              bg-opacity-30 
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            "
          >
            <AiOutlineInfoCircle className="w-4 md:w-7 mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillBoard;
