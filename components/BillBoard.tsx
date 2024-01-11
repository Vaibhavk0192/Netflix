import useBillBoard from "@/hooks/useBillBoard";
import React, { useCallback, useState } from "react";
import PlayButton from "./PlayButton";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";

import { AiOutlineInfoCircle } from "react-icons/ai";
import useInfoModal from "@/hooks/useInfoModal";

const BillBoard = () => {
  const { openModal } = useInfoModal();
  const { data, error, isLoading } = useBillBoard();

  const [isMuted, setisMuted] = useState(true);

  const toggleMute = () => {
    setisMuted((prev) => !prev);
  };

  const handleOpenModel = useCallback(() => {
    openModal(data && data[0]?.id);
  }, [openModal, data && data[0]?.id]);

  return (
    <div className="relative lg:h-[95%] mb-5 sm:h-[50%] md:h-[45%] max-sm:h-[30%]">
      <video
        poster={!isLoading ? data[0]?.thumbnailUrl : ""}
        className="w-full h-full object-cover brightness-[60%] transition duration-500 "
        autoPlay
        muted={isMuted}
        loop
        src={!isLoading ? data[0]?.videoUrl : ""}
      ></video>
      <div className="absolute lg:top-[50%] sm:top-[40%] w-full h-[30%] md:pl-16 max-md:pl-6 max-sm:top-[50%] ">
        <p className="text-white lg:text-7xl sm:text-5xl h-[45%] font-bold drop-shadow-xl max-sm:text-[5xl]">
          {!isLoading ? data[0]?.title : ""}
        </p>
        <p className="text-white text-[10px] md:text-[15px] max-sm:text-[8px] lg:mt-6 w-[80%] md:w-[80%] lg:w-[50%] drop-shadow-xl sm:mt-4">
          {!isLoading ? data[0]?.description : ""}
        </p>
        <div className="flex flex-row items-center md:mt-6 justify-between flex-shrink sm:mt-4 max-sm:mt-4">
          <div className="flex flex-row items-center flex-shrink">
          <PlayButton  movieId={data && data[0]?.id} />
          <button
            onClick={handleOpenModel}
            className="
            bg-white
            text-white
              bg-opacity-30 rounded-md 
              lg:py-1 md:py-2 max-sm:py-1 sm:py-1.5
              lg:px-2 md:px-4 max-sm:px-2 sm:px-2
              w-auto 
              md:text-xs lg:text-lg max-sm:text-[0.565rem]
              font-semibold
              flex
              flex-row
              items-center
              justify-around
              hover:bg-opacity-20
              transition
              ml-3
              mr-1 size-auto"    
          >
            <AiOutlineInfoCircle
              className="w-4 md:w-7 mr-2 font-bold lg:size-8 sm:size-6 max-sm:size-4"
            />
            More Info
          </button>
          </div>
          <div className="flex items-center gap-2 right-0">
            <div
              onClick={toggleMute}
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 border border-white rounded-full flex justify-center items-center transition hover:border-neutral-300"
            >
              {isMuted ? (
                <GiSpeakerOff  className="text-white max-sm:size-4 sm:size-8" />
              ) : (
                <GiSpeaker  className="text-white max-sm:size-4 sm:size-8" />
              )}
            </div>
            <div className="text-white max-sm:text-xs bg-black bg-opacity-35 sm:pl-4  sm:pr-10 max-sm:pl-2 max-sm:pr-4 sm:py-1.5 max-sm:py-1  border-l bottom-2">{!isLoading ? data[0]?.tag : ""}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillBoard;
