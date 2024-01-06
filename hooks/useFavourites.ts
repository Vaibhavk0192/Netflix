import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useFavourites = (id?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/favourites/${id}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading, mutate };
};

export default useFavourites;
