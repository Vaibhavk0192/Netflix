import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./PlayButton";
import FavouriteButton from "./FavouriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import { GiSpeaker , GiSpeakerOff} from "react-icons/gi"

interface InfoModelProps {
  visible?: boolean;
  onClose: any;
}

const InfoModel: React.FC<InfoModelProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible); // to turn it into boolean we use !!
  const { movieId } = useInfoModal();
  console.log(movieId);
  const { data = {} } = useMovie(movieId);
  const[isMuted,setisMuted]=useState(true)

  const toggleMute=()=>{
    setisMuted((prev)=>!prev)
  }
  

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-full mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md w-full`}
        >
          <div className="relative h-96 w-full">
            <video
              poster={data?.thumbnailUrl}
              autoPlay
              muted={isMuted}
              loop
              src={data?.videoUrl}
              className="w-full brightness-[60%] object-cover h-full"
            />
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
            >
              <AiOutlineClose className="text-white w-6" />
            </div>
            <div className="absolute bottom-[10%] left-10 w-[90%]">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {data?.title}
              </p>
              <div className="flex flex-row gap-4 items-center ">
                <PlayButton movieId={data?.id} />
                <FavouriteButton movieId={data?.id} />
                <div
           onClick={toggleMute}
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 border border-white rounded-full flex justify-center items-center transition hover:border-neutral-300 ml-[65%]"
            >
              {isMuted ? <GiSpeakerOff size={30} className="text-white"/> : <GiSpeaker size={30} className="text-white" />}
            </div>
              </div>
            </div>
          </div>

          <div className="px-12 py-8">
            <div className="flex flex-row items-center gap-2 mb-8">
              <p className="text-green-400 font-semibold text-lg">New</p>
              <p className="text-white text-lg">{data?.duration}</p>
              <p className="text-white text-lg">{data?.genre}</p>
            </div>
            <p className="text-white text-lg">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModel;
