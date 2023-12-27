"use client";
import Navbar from "../components/Navbar";
import BillBoard from "../components/BillBoard";
import MovieList from "../components/MovieList";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import useMovieList from "@/hooks/useMovieList";

export default function Home() {
  const { data: movies = [] } = useMovieList();
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
      </div>
    </>
  );
}
