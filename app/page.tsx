"use client";
import Navbar from "../components/Navbar";
import BillBoard from "../components/BillBoard";
import MovieList from "../components/MovieList";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import useMovieList from "@/hooks/useMovieList";
import useFavourites from "@/hooks/useFavourites";

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favourites = [] } = useFavourites();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favourites} />
      </div>
    </>
  );
}
