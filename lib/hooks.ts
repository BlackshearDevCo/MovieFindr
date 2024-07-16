import useSWR from "swr";
import {
  ApiMoviesParams,
  getAuthTokenRoute,
  getMoviesRoute,
} from "@/lib/routes/api";

export const useAuthToken = () => {
  "use client";
  const { data } = useSWR(getAuthTokenRoute());
  return data?.token;
};

export const useFetch = (path: string) => {
  const token = useAuthToken();
  const { data, ...rest } = useSWR([path, token], ([resource, token]) =>
    fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}${resource}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json())
  );
  return { data: data?.data, ...rest };
};

export const useMovies = (params?: ApiMoviesParams) => {
  return useFetch(getMoviesRoute(params));
};
