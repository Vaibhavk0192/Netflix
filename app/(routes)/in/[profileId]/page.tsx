  "use client";
  import Navbar from "@/components/Navbar";
  import BillBoard from "@/components/BillBoard";
  import MovieList from "@/components/MovieList";
  import { useSession } from "next-auth/react";
  import { redirect, useParams} from "next/navigation";
  import useMovieList from "@/hooks/useMovieList";
  import useFavourites from "@/hooks/useFavourites";
  import InfoModel from "@/components/InfoModel";
  import useInfoModal from "@/hooks/useInfoModal";

  export default function Home() {
    const { data: movies = [] } = useMovieList();
    const { isOpen, closeModal } = useInfoModal();
    const { data: session, status } = useSession({
      required: true,
      onUnauthenticated() {
        redirect("/auth");
      },
    });
    const params = useParams<{ profileId: string }>();
    const profileId = params.profileId;
    const { data: favourites } = useFavourites(profileId);
    if (status === "loading") {
      return <p>Loading...</p>;
    }

    return (
      <>
        <InfoModel visible={isOpen} onClose={closeModal} />
        <Navbar />
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
