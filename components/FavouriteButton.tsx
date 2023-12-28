import axios from "axios";
import React, { useCallback, useMemo } from "react";

import userCurrentUser from "@/hooks/useCurrentuser";
import useFavourites from "@/hooks/useFavourites";

interface FavouriteButtonProps {
  movieId: string;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavourites } = useFavourites();
  const { data: currentUser, mutate } = userCurrentUser();

  const isFavourite = useMemo(() => {
    const list = currentUser?.favouriteIds || [];
    return list.includes(movieId);
  }, [currentUser.movieId]);

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

  return <div></div>;
};

export default FavouriteButton;
