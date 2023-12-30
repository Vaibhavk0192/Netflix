import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import userCurrentUser from "@/hooks/useCurrentuser";
import useFavourites from "@/hooks/useFavourites";

interface FavouriteButtonProps {
  movieId: string;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavourites } = useFavourites();
  const { data: currentUser, mutate } = userCurrentUser();

  const isFavourite = useMemo(() => {
    const list = currentUser?.currentUser?.favouriteIds || [];
    return list.includes(movieId);
  }, [currentUser?.currentUser?.favouriteIds]);

  const toggleFavourites = useCallback(async () => {
    let response;
    if (isFavourite) {
      response = await axios.delete("api/favourite", { data: { movieId } });
    } else {
      response = await axios.post("api/favourite", { movieId });
    }
    const updatedfavouriteIds = response?.data?.favouriteIds;
    mutate({
      ...currentUser,
      favouriteIds: updatedfavouriteIds,
    });

    mutateFavourites();
  }, [movieId, isFavourite, currentUser, mutate, mutateFavourites]);

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
