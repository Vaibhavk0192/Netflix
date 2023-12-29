"use client";
import React from "react";

import { useParams } from "next/navigation";

import useMovie from "@/hooks/useMovie";

const Watch = () => {
  const params = useParams<{ movieId: string }>(); // Use movieId instead of item

  const movieId = params.movieId;

  // Assuming useMovie takes a movieId as an argument
  const { data } = useMovie(movieId);
  console.log(data);

  return (
    <div>
      {data?.title}
      <div>
        <video autoPlay controls src={data?.videoUrl}></video>
      </div>
    </div>
  );
};

export default Watch;
