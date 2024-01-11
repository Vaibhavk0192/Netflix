import React, { useCallback } from "react";
import { BsFillPlayFill, BsChevronDown } from "react-icons/bs";
import { FaThumbsUp } from "react-icons/fa";
import FavouriteButton from "./FavouriteButton";  
import useInfoModal from "@/hooks/useInfoModal";
import { AiOutlineInfoCircle } from "react-icons/ai";
import MovieDesc from "./Icons component/movieDesc";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  data: Record<string, any>;
  profile: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, profile }) => {
  const { openModal } = useInfoModal();
  const router = useRouter();
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]  ">
      <img
        {...(window.innerWidth < 640  && { onClick: () =>  openModal(data && data?.id) })}
        src={data.thumbnailUrl}
        alt="Movie"
        draggable={false}
        className=" cursor-pointer object-cover transition duration shadow-xl 
      rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
      />

      <div className=" opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        <img
          src={data.thumbnailUrl}
          alt="Movie"
          draggable={false}
          className=" cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[18vw]"
        />

        <div className=" z-10 bg-zinc-800 sm:p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md ">
          <div className="flex flex-row items-center justify-between ">
            <div className="flex flex-row items-center gap-3">
              <div
                onClick={() => router.push(`/watch/${data?.id}`)}
                className="cursor-pointer sm:w-6 sm:h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              >
                <BsFillPlayFill size={35} />
              </div>
              <FavouriteButton movieId={data?.id} profile={profile} />
              <div
                onClick={() => router.push(`/watch/${data?.id}`)}
                className="cursor-pointer sm:w-6 sm:h-6 lg:w-10 lg:h-10  border-2 border-white rounded-full flex justify-center items-center transition hover:border-neutral-300"
              >
                <FaThumbsUp className="text-white hover:text-neutral-300 lg:size-5 md:size-3 sm:size-2" />
              </div>
            </div>

            <div className=" cursor-pointer sm:w-6 sm:h-6 lg:w-10 lg:h-10 border-2 border-white rounded-full flex justify-center items-center transition hover:border-neutral-300">
              <BsChevronDown
                onClick={() => openModal(data && data?.id)}
                className="text-white hover:text-neutral-300 size-auto"
              />
            </div>
          </div>
          <MovieDesc tag={data.tag} duration={data.duration} />
          <p className="text-white text-sm mt-4">{data.tagDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
