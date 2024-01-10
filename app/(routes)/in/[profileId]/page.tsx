"use client";
import Navbar from "@/components/Navbar";
import BillBoard from "@/components/BillBoard";
import MovieList from "@/components/MovieList";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import useMovieList from "@/hooks/useMovieList";
import useFavourites from "@/hooks/useFavourites";
import InfoModel from "@/components/InfoModel";
import useInfoModal from "@/hooks/useInfoModal";
import useProfiles from "@/hooks/useProfiles";

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { isOpen, closeModal } = useInfoModal();
  const { data: profiles } = useProfiles();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });
  const params = useParams<{ profileId: string }>();
  const profileId = params.profileId;
  const { data: favourites } = useFavourites(profileId);
  if (status === "loading") {
    return;
  }
  return (
    <>
      <InfoModel visible={isOpen} onClose={closeModal} />
      <Navbar profileData={profiles && profiles.User} profileId={profileId} />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} profile={profileId} />
        <MovieList
          title="My List"
          data={favourites?.favouriteMovies}
          profile={profileId}
        />
      </div>
    </>
  );
}
