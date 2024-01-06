import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { LuSubtitles } from "react-icons/lu";
import HDTag from "./Icons component/HD";
import Tag from "./Icons component/Tag";
import ADTag from "./Icons component/ADTAG";

interface InfoModelProps {
  visible?: boolean;
  onClose: any;
}

const InfoModel: React.FC<InfoModelProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible); // to turn it into boolean we use !!
  const { movieId } = useInfoModal();
  const { data = {} } = useMovie(movieId);
  const [isMuted, setisMuted] = useState(true);

  const toggleMute = () => {
    setisMuted((prev) => !prev);
  };

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
      <div className="relative w-full mx-auto max-w-[70rem] rounded-md overflow-hidden">
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
            <div className="absolute bottom-[10%] left-10 w-[92.5%]">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {data?.title}
              </p>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-4 items-center">
                  <PlayButton movieId={data?.id} />
                </div>
                <div
                  onClick={toggleMute}
                  className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 border border-white rounded-full flex justify-center items-center transition hover:border-neutral-300 border-opacity-50"
                >
                  {isMuted ? (
                    <GiSpeakerOff
                      size={30}
                      className="text-white text-opacity-50"
                    />
                  ) : (
                    <GiSpeaker
                      size={30}
                      className="text-white text-opacity-50"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="px-12 py-8 flex w-full text-[#9ca3af] font-normal  ">
            <div className="basis-4/6  flex flex-col">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-green-400 font-semibold lg:text-[20px] sm:text-[px]">
                  97% Match
                </span>
                <span>{data.year}</span>
                <span>{data.duration}</span>
                <HDTag />
                <ADTag />
                <LuSubtitles size={25} />
              </div>
              <div className="flex flex-row flex-wrap mt-4 gap-3">
                <Tag tag={data.tag} />
                <span className="text-white text-md ">
                  {data.tagDescription}
                </span>
              </div>

              <div className="mt-10">
                <span className="text-white ">{data.description}</span>
              </div>
            </div>

            <div className="basis-2/6 flex flex-col text-sm pl-8">
              <div className="flex flex-row items-start ">
                <span>
                  Cast:
                  <span className="ml-4 text-white">{data.cast}</span>
                </span>
              </div>
              <div className="flex flex-row items-start gap-3 mt-4">
                <span>Genre:</span>
                <span className="text-white">{data.genre}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModel;
