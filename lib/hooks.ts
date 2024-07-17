import useSWR from "swr";
import {
  ApiMoviesParams,
  ApiParams,
  getAuthTokenRoute,
  getGenresRoute,
  getMovieRoute,
  getMoviesRoute,
} from "@/lib/routes/api";

export const useAuthToken = () => {
  const { data } = useSWR(getAuthTokenRoute());
  return data?.token;
};

export const useFetch = <T>(path: string) => {
  const token = useAuthToken();
  const { data, ...rest } = useSWR<T>([path, token], ([resource, token]) =>
    fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}${resource}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json())
  );

  return { data, ...rest };
};

export const useMovies = (params?: ApiMoviesParams) => {
  const { data } = useFetch<SWRData<Movie[]>>(getMoviesRoute(params));
  return { data: data?.data, totalPages: data?.totalPages };
};

export const useGenres = (params?: ApiParams) => {
  const { data } = useFetch<SWRData<Genre[]>>(getGenresRoute(params));
  return { data: data?.data, totalPages: data?.totalPages };
};

export const useMovie = (id: string) => {
  return useFetch<Movie>(getMovieRoute(id));
};
