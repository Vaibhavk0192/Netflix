import useBillBoard from "@/hooks/useBillBoard";
import React, { useCallback ,useState} from "react";
import PlayButton from "./PlayButton";
import { GiSpeaker , GiSpeakerOff} from "react-icons/gi"

import { AiOutlineInfoCircle } from "react-icons/ai";
import useInfoModal from "@/hooks/useInfoModal";

const BillBoard = () => {
  const { openModal } = useInfoModal();
  const { data, error, isLoading } = useBillBoard();

  const[isMuted,setisMuted]=useState(true)

  const toggleMute=()=>{
    setisMuted((prev)=>!prev)
  }
  
  
  const handleOpenModel = useCallback(() => {
    openModal(data&&data[0]?.id);
  }, [openModal, data&&data[0]?.id]);

  return (
    <div className="relative h-[95%] mb-5">
      <video
        poster={!isLoading ? data[0]?.thumbnailUrl : ""}
        className="w-full h-full object-cover brightness-[60%] transition duration-500 "
        autoPlay
        muted={isMuted}
        loop
        src={!isLoading ? data[0]?.videoUrl : ""}
      ></video>
      <div className="absolute top-[50%] ml-4 md:ml-16 w-[95%] h-[30%]">
        <p className="text-white text-7xl h-[45%] font-bold drop-shadow-xl">
          {!isLoading ? data[0]?.title : ""}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-6 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {!isLoading ? data[0]?.description : ""}
        </p>
        <div className="flex flex-row items-center mt-6 ">
          <PlayButton movieId={ data&&data[0]?.id} />
          <button
            onClick={handleOpenModel}
            className="
            bg-white
            text-white
              bg-opacity-30 rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              justify-center
              hover:bg-opacity-20
              transition
              ml-3 "   
          >
            <AiOutlineInfoCircle className="w-4 md:w-7 mr-2 font-bold" size={30} />
            More Info
          </button>
          <div
           onClick={toggleMute}
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 border border-white rounded-full flex justify-center items-center transition hover:border-neutral-300 ml-[71%]"
            >
              {isMuted ? <GiSpeakerOff size={30} className="text-white"/> : <GiSpeaker size={30} className="text-white" />}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BillBoard;
