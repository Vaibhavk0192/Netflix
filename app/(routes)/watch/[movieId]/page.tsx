"use client";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { useParams } from "next/navigation";

import useMovie from "@/hooks/useMovie";

const Watch = () => {
  const params = useParams<{ movieId: string }>();
  const movieId = params.movieId;
  const { data } = useMovie(movieId);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className=" fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-opacity-70">
        <AiOutlineArrowLeft className="text-white" size={30} />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light mr-2">Watching:</span>
          {data?.title}
        </p>
      </nav>

      <video
        autoPlay
        controls
        src={data?.videoUrl}
        className="w-full h-full"
      ></video>
    </div>
  );
};

export default Watch;
