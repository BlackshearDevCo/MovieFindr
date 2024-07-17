type Nullable<T> = T | null;

type Maybe<T> = T | undefined;

type ApiMoviesParams = {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
};

type SWRData<T> = {
  data: T;
  totalPages: number;
};

type MoviePreview = {
  id: string;
  title: string;
  posterUrl?: string;
  genres?: Genre[];
};

type Genre = {
  id: string;
  title: string;
  movies?: MoviePreview[];
};

type Movie = {
  id: string;
  title: string;
  posterUrl?: string;
  rating?: string;
  summary?: string;
  duration?: string;
  directors?: string[];
  mainActors?: string[];
  datePublished?: string;
  ratingValue?: number;
  bestRating?: number;
  worstRating?: number;
  writers?: string[];
  genres?: Genre[];
};
