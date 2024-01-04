import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useCurrentProfile = (id?: string) => {
  const { data, error, isLoading,mutate } = useSWR(
    id ? `/api/profiles/${id}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading,mutate };
};

export default useCurrentProfile;
