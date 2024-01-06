import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useCurrentProfile from "@/hooks/useCurrentProfile";
import useFavourites from "@/hooks/useFavourites";

interface FavouriteButtonProps {
  movieId: string;
  profile: string;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  movieId,
  profile,
}) => {
  const { data: favouritesIds, mutate } = useCurrentProfile(profile);
  const { mutate: mutateFavourites } = useFavourites(profile);

  const isFavourite = useMemo(() => {
    const list = favouritesIds?.favourites || [];
    return list.includes(movieId);
  }, [favouritesIds?.favourites]);

  const toggleFavourites = useCallback(async () => {
    console.log(isFavourite);
    let response;
    if (isFavourite) {
      try {
        response = await fetch("/api/favourite", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId: movieId,
            profile: profile,
          }),
        });
        if (response) {
          const res = await response.json();
          console.log(res.favourites);
          const updatedfavouriteIds = res?.favourites;
          mutate({
            ...favouritesIds,
            favourites: updatedfavouriteIds,
          });
          mutateFavourites();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        response = await fetch("/api/favourite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId: movieId,
            profile: profile,
          }),
        });
        if (response) {
          const res = await response.json();
          const updatedfavouriteIds = res?.favourites;
          mutate({
            ...favouritesIds,
            favourites: updatedfavouriteIds,
          });
          mutateFavourites();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [movieId, isFavourite, mutate,mutateFavourites]);

  const Iconed = isFavourite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={() => {
        toggleFavourites();
      }}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center 
      items-center transition hover:border-neutral-300"
    >
      <Iconed className="text-white" size={25} />
    </div>
  );
};

export default FavouriteButton;
