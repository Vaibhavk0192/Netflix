 import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from 'next/navigation';

interface PlayButtonProps {
  movieId: string;
}
const PlayButton: React.FC<PlayButtonProps> = ({movieId}) => {
    const router=useRouter()
  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className=" bg-white 
     lg:px-2 md:px-4 sm:px-1 max-sm:px-1 lg:py-1
    rounded-md 
    text-xs lg:text-lg 
    font-semibold
    flex
    flex-row
    items-center
    justify-center
    hover:bg-neutral-300
    transition
    "
    >
      <BsFillPlayFill className="mr-0.5 ml-2" size={30} />
      <span className="mr-5 ">Play</span>
    </button>
  );
};

export default PlayButton;
