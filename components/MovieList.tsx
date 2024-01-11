import React from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
  profile: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title, profile }) => {
  if (!Array.isArray(data) || isEmpty(data)) {
    return null;
  }
  return (
    <div className="px-4 md:px-12 sm:mt-10 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4 ">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2 sm:mb-10 max-sm:mb-6">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
