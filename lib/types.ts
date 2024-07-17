type Nullable<T> = T | null;

type Maybe<T> = T | undefined;

type SWRData<T> = {
  data: T;
  totalPages: number;
};

type MovieShort = {
  id: string;
  title: string;
  posterUrl?: string;
};

type Genre = {
  id: string;
  title: string;
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
